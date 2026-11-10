// Validação e armazenamento de arquivos enviados (imagens, assets, builds de jogos).
// Regras: lista de extensões permitidas, verificação de assinatura (magic bytes),
// proteção contra zip-slip, links simbólicos, bombas de descompressão e executáveis.
import fs from 'node:fs';
import path from 'node:path';
import AdmZip from 'adm-zip';
import { config } from '../config.js';
import { HttpError, randomToken } from './security.js';

export const IMAGE_TYPES = {
  png: { mime: 'image/png', magic: [[0x89, 0x50, 0x4e, 0x47]] },
  jpg: { mime: 'image/jpeg', magic: [[0xff, 0xd8, 0xff]] },
  webp: { mime: 'image/webp', magic: [[0x52, 0x49, 0x46, 0x46]] },
  gif: { mime: 'image/gif', magic: [[0x47, 0x49, 0x46, 0x38]] },
};

const startsWith = (buf, sig) => sig.every((b, i) => buf[i] === b);

export function detectImage(buf) {
  for (const [ext, t] of Object.entries(IMAGE_TYPES)) {
    if (t.magic.some((m) => startsWith(buf, m))) {
      if (ext === 'webp' && buf.subarray(8, 12).toString('ascii') !== 'WEBP') continue;
      return { ext, mime: t.mime };
    }
  }
  return null;
}

/** Salva imagem validada em storage/uploads e devolve a URL pública (/media/...). */
export function saveImage(buffer) {
  if (buffer.length > config.limits.imageUploadMB * 1024 * 1024) throw new HttpError(413, 'Imagem muito grande.');
  const t = detectImage(buffer);
  if (!t) throw new HttpError(400, 'Formato de imagem não suportado (use PNG, JPG, WEBP ou GIF).');
  const name = `${randomToken(16)}.${t.ext}`;
  fs.writeFileSync(path.join(config.dataDir, 'uploads', name), buffer);
  return `/media/${name}`;
}

// ───────── Assets de projeto do Studio ─────────
const ASSET_TYPES = {
  png: ['texture', 'image/png'], jpg: ['texture', 'image/jpeg'], jpeg: ['texture', 'image/jpeg'], webp: ['texture', 'image/webp'],
  mp3: ['audio', 'audio/mpeg'], ogg: ['audio', 'audio/ogg'], wav: ['audio', 'audio/wav'],
  glb: ['model', 'model/gltf-binary'],
};

export function validateAsset(originalName, buffer) {
  const ext = path.extname(originalName).slice(1).toLowerCase();
  const t = ASSET_TYPES[ext];
  if (!t) throw new HttpError(400, 'Tipo de asset não suportado (PNG, JPG, WEBP, MP3, OGG, WAV, GLB).');
  if (buffer.length > config.limits.assetUploadMB * 1024 * 1024) throw new HttpError(413, 'Asset muito grande.');
  const [kind, mime] = t;
  const ok = {
    texture: () => !!detectImage(buffer),
    audio: () => (ext === 'mp3' && (buffer.subarray(0, 3).toString('latin1') === 'ID3' || (buffer[0] === 0xff && (buffer[1] & 0xe0) === 0xe0)))
      || (ext === 'ogg' && buffer.subarray(0, 4).toString('latin1') === 'OggS')
      || (ext === 'wav' && buffer.subarray(0, 4).toString('latin1') === 'RIFF'),
    model: () => buffer.subarray(0, 4).toString('latin1') === 'glTF',
  }[kind]();
  if (!ok) throw new HttpError(400, 'O conteúdo do arquivo não corresponde à extensão.');
  return { kind, mime, ext };
}

export function saveAsset(buffer, ext) {
  const key = `${randomToken(18)}.${ext}`;
  fs.writeFileSync(path.join(config.dataDir, 'assets', key), buffer);
  return key;
}

// ───────── Builds HTML5 de jogos ─────────
const ALLOWED_GAME_EXT = new Set([
  'html', 'htm', 'js', 'mjs', 'css', 'json', 'map', 'txt', 'md', 'xml', 'csv',
  'png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'ico', 'avif', 'ktx2', 'basis', 'hdr', 'exr',
  'mp3', 'ogg', 'wav', 'm4a', 'aac', 'opus', 'flac', 'mp4', 'webm',
  'wasm', 'data', 'bin', 'glb', 'gltf', 'fbx', 'obj', 'mtl',
  'ttf', 'otf', 'woff', 'woff2', 'fnt', 'atlas', 'pck', 'unityweb', 'br', 'gz', 'mem', 'symbols', 'tmx', 'tsx', 'ldtk', 'skel',
]);
const BLOCKED_EXT = new Set(['exe', 'dll', 'bat', 'cmd', 'com', 'sh', 'ps1', 'vbs', 'msi', 'scr', 'jar', 'php', 'py', 'pl', 'cgi', 'asp', 'aspx', 'jsp', 'htaccess', 'apk', 'dmg', 'app', 'deb', 'rpm']);

const SUSPICIOUS = [
  [/coinhive|cryptonight|coin-hive|webminepool|cryptoloot|minero\.cc/i, 'crypto_miner', 'high'],
  [/eval\s*\(\s*atob\s*\(/i, 'obfuscated_eval', 'medium'],
  [/document\.cookie/i, 'cookie_access', 'low'],
  [/(top|parent)\.location\s*=/i, 'frame_navigation', 'medium'],
  [/navigator\.credentials|PaymentRequest\s*\(/i, 'sensitive_browser_api', 'medium'],
  [/<form[^>]+(password|senha)/i, 'credential_form', 'high'],
];

/**
 * Inspeciona e extrai um .zip de jogo HTML5 para storage/games/<destKey>.
 * Retorna relatório de verificação automática. A publicação ainda exige revisão humana.
 */
export function extractGameZip(zipPath, destKey) {
  let zip;
  try {
    zip = new AdmZip(zipPath);
  } catch {
    throw new HttpError(400, 'Arquivo .zip inválido ou corrompido.');
  }
  const entries = zip.getEntries();
  if (entries.length === 0) throw new HttpError(400, 'O .zip está vazio.');
  if (entries.length > config.limits.maxZipEntries) throw new HttpError(400, 'O .zip contém arquivos demais.');

  const maxTotal = config.limits.gameUploadMB * 1024 * 1024 * 3; // descompactado
  const findings = [];
  const files = [];
  let declared = 0;
  const seen = new Set();

  for (const e of entries) {
    const name = e.entryName.replace(/\\/g, '/');
    if (e.isDirectory) continue;
    const mode = (e.attr >>> 16) & 0o170000;
    if (mode === 0o120000) throw new HttpError(400, `Links simbólicos não são permitidos (${name}).`);
    if (name.startsWith('/') || name.split('/').some((p) => p === '..') || /^[a-zA-Z]:/.test(name) || name.includes('\0')) {
      throw new HttpError(400, `Caminho inválido no .zip (${name}).`);
    }
    if (name.startsWith('__MACOSX/') || name.endsWith('.DS_Store')) continue;
    const lower = name.toLowerCase();
    if (seen.has(lower)) throw new HttpError(400, `Arquivo duplicado no .zip (${name}).`);
    seen.add(lower);
    const ext = path.extname(lower).slice(1);
    if (BLOCKED_EXT.has(ext)) throw new HttpError(400, `Tipo de arquivo proibido: .${ext} (${name}).`);
    if (!ALLOWED_GAME_EXT.has(ext)) {
      findings.push({ file: name, rule: 'unknown_extension', severity: 'low' });
      continue; // ignorado (não extraído)
    }
    declared += e.header.size;
    if (declared > maxTotal) throw new HttpError(413, 'Conteúdo descompactado excede o limite.');
    files.push({ e, name, ext });
  }

  const dest = path.join(config.dataDir, 'games', destKey);
  fs.mkdirSync(dest, { recursive: true });
  let total = 0;
  for (const { e, name, ext } of files) {
    const data = e.getData();
    total += data.length;
    if (total > maxTotal) {
      fs.rmSync(dest, { recursive: true, force: true });
      throw new HttpError(413, 'Conteúdo descompactado excede o limite (bomba de descompressão?).');
    }
    if (['html', 'htm', 'js', 'mjs'].includes(ext) && data.length < 20 * 1024 * 1024) {
      const src = data.toString('utf8');
      for (const [re, rule, severity] of SUSPICIOUS) if (re.test(src)) findings.push({ file: name, rule, severity });
    }
    const out = path.join(dest, name);
    if (!out.startsWith(dest + path.sep)) throw new HttpError(400, 'Caminho inválido.');
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, data, { mode: 0o644 });
  }

  // Encontra index.html na raiz ou em uma única pasta de topo.
  const names = files.map((f) => f.name);
  let entry = names.find((n) => n.toLowerCase() === 'index.html');
  if (!entry) {
    const candidates = names.filter((n) => /^[^/]+\/index\.html$/i.test(n));
    if (candidates.length === 1) entry = candidates[0];
  }
  if (!entry) {
    fs.rmSync(dest, { recursive: true, force: true });
    throw new HttpError(400, 'O jogo precisa ter um index.html na raiz do .zip.');
  }
  const compat = detectEngine(dest, names);
  const high = findings.some((f) => f.severity === 'high');
  const medium = findings.some((f) => f.severity === 'medium');
  return {
    entry,
    fileCount: files.length,
    sizeBytes: total,
    scanStatus: high ? 'failed' : medium ? 'flagged' : 'passed',
    report: { findings, engine: compat.engine, compatibility: compat.notes, checkedAt: new Date().toISOString() },
  };
}

/**
 * Identifica a ferramenta que gerou o build (pelos arquivos) e aponta problemas conhecidos de execução no navegador.
 * Não substitui o teste: só orienta o criador e a moderação.
 */
export function detectEngine(dir, names) {
  const lower = names.map((n) => n.toLowerCase());
  const has = (re) => lower.some((n) => re.test(n));
  const read = (n) => { try { return fs.readFileSync(path.join(dir, n), 'utf8').slice(0, 400_000); } catch { return ''; } };
  const notes = [];
  let engine = 'html5';
  if (has(/\.pck$/) && has(/\.wasm$/)) {
    engine = 'godot';
    const html = names.filter((n) => /\.html?$/i.test(n)).map(read).join('\n');
    if (/GODOT_THREADS_ENABLED\s*=\s*true/.test(html) || /"ensureCrossOriginIsolationHeaders"\s*:\s*true/.test(html)) {
      notes.push({ level: 'error', text: 'Build do Godot exportado com suporte a threads: precisa de isolamento entre origens (SharedArrayBuffer), que não está disponível dentro do player da NEXPLAY. Exporte de novo com "Thread Support" desligado (Godot 4.3+).' });
    }
  } else if (has(/(^|\/)build\/[^/]+\.loader\.js$/) || has(/\.unityweb$/) || has(/\.framework\.js(\.(br|gz))?$/)) {
    engine = 'unity';
    if (has(/\.(wasm|data|framework\.js)\.br$/)) notes.push({ level: 'info', text: 'Build do Unity com compressão Brotli: a NEXPLAY envia o cabeçalho de compressão correto.' });
  } else if (has(/\.ue4\.js$/) || has(/ue4game/) || has(/\.uasset$/)) {
    engine = 'unreal';
    notes.push({ level: 'warn', text: 'A exportação HTML5 oficial do Unreal foi descontinuada (UE 4.24+). Builds antigos podem funcionar; versões novas do Unreal não exportam para navegador.' });
  } else if (has(/(^|\/)c3runtime\.js$/) || has(/(^|\/)c2runtime\.js$/)) engine = 'construct';
  else if (has(/phaser(\.min)?\.js$/)) engine = 'phaser';
  else if (has(/three(\.module)?(\.min)?\.js$/)) engine = 'threejs';
  if (!has(/\.wasm$/) && engine === 'godot') notes.push({ level: 'error', text: 'Faltou o arquivo .wasm do Godot no pacote.' });
  return { engine, notes };
}

/** Empacota um único arquivo .html como build (vira index.html). */
export function wrapHtmlAsZip(htmlPath, zipPath) {
  const z = new AdmZip();
  z.addFile('index.html', fs.readFileSync(htmlPath));
  z.writeZip(zipPath);
}
