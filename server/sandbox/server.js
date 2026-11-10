// Origem isolada para EXECUTAR jogos. Nunca compartilha cookies/sessão com o app principal.
// Os arquivos só são servidos com um token de jogo assinado e válido.
import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { config, ROOT } from '../config.js';
import { one } from '../db/index.js';
import { verifyPlayToken } from '../lib/playtoken.js';

const MIME = {
  html: 'text/html; charset=utf-8', htm: 'text/html; charset=utf-8', js: 'text/javascript; charset=utf-8', mjs: 'text/javascript; charset=utf-8',
  css: 'text/css; charset=utf-8', json: 'application/json', map: 'application/json', txt: 'text/plain; charset=utf-8', md: 'text/plain; charset=utf-8',
  xml: 'application/xml', csv: 'text/csv', png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', gif: 'image/gif', webp: 'image/webp',
  svg: 'image/svg+xml', ico: 'image/x-icon', avif: 'image/avif', mp3: 'audio/mpeg', ogg: 'audio/ogg', wav: 'audio/wav', m4a: 'audio/mp4',
  aac: 'audio/aac', opus: 'audio/opus', flac: 'audio/flac', mp4: 'video/mp4', webm: 'video/webm', wasm: 'application/wasm',
  glb: 'model/gltf-binary', gltf: 'model/gltf+json', ttf: 'font/ttf', otf: 'font/otf', woff: 'font/woff', woff2: 'font/woff2',
};

export function createSandboxApp() {
  const app = express();
  app.disable('x-powered-by');
  app.set('trust proxy', config.trustProxy);

  app.use((req, res, next) => {
    // Só pode ser embutido pelo app principal; o próprio documento já é tratado como sandbox.
    res.setHeader('Content-Security-Policy', config.singleOrigin
      ? "sandbox allow-scripts allow-pointer-lock allow-orientation-lock allow-popups allow-forms allow-modals; frame-ancestors 'self'"
      : `sandbox allow-scripts allow-same-origin allow-pointer-lock allow-orientation-lock allow-popups allow-forms allow-modals; frame-ancestors ${config.appOrigin}`);
    // Documentos de origem opaca precisam de CORS para buscar os próprios arquivos (o acesso é protegido pelo token).
    if (config.singleOrigin) res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'no-referrer');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(), usb=()');
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    next();
  });

  app.get('/health', (_req, res) => res.json({ ok: true, role: 'sandbox' }));

  app.get('/p/:token/*rest', (req, res) => {
    const tok = verifyPlayToken(req.params.token);
    if (!tok) return res.status(403).type('text').send('Sessão de jogo expirada. Volte à NEXPLAY e abra o jogo novamente.');
    const v = one('SELECT * FROM game_versions WHERE id=?', tok.versionId);
    if (!v || !v.storage_key || v.scan_status === 'failed') return res.status(404).end();
    const rel = (Array.isArray(req.params.rest) ? req.params.rest.join('/') : String(req.params.rest || '')).replace(/\\/g, '/');
    const base = path.join(config.dataDir, 'games', v.storage_key);
    const file = path.normalize(path.join(base, rel));
    if (!file.startsWith(base + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) return res.status(404).end();
    let ext = path.extname(file).slice(1).toLowerCase();
    if (ext === 'br' || ext === 'gz') {
      // Builds Unity/Godot pré-comprimidos (.wasm.br, .data.gz…)
      res.setHeader('Content-Encoding', ext === 'br' ? 'br' : 'gzip');
      ext = path.extname(file.slice(0, -(ext.length + 1))).slice(1).toLowerCase();
    }
    res.setHeader('Content-Type', MIME[ext] || 'application/octet-stream');
    res.setHeader('Cache-Control', 'private, max-age=3600');
    fs.createReadStream(file).pipe(res);
  });

  return app;
}

/** Serve o player do NEXPLAY STUDIO (runtime) — build de produção ou Vite em desenvolvimento. */
export async function mountRuntime(app) {
  const dist = path.join(ROOT, 'dist', 'runtime');
  if (config.isProd || config.isTest) {
    if (fs.existsSync(dist)) app.use('/runtime', express.static(dist, { index: false }));
    return;
  }
  const { createServer } = await import('vite');
  const vite = await createServer({ configFile: path.join(ROOT, 'client', 'vite.runtime.config.js'), server: { middlewareMode: true, hmr: false }, appType: 'mpa' });
  app.use(vite.middlewares);
}
