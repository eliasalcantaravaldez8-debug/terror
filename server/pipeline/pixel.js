// 2D: sprites em pixel art a partir de especificação (IA), importação de imagens/folhas de sprites,
// e de arquivos do Krita (.kra) e OpenRaster (.ora), que guardam a imagem final em mergedimage.png.
import sharp from 'sharp';
import AdmZip from 'adm-zip';

const hexRgba = (h) => {
  const s = String(h).replace('#', '');
  const n = parseInt(s.slice(0, 6), 16);
  const a = s.length === 8 ? parseInt(s.slice(6, 8), 16) : 255;
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255, a];
};

/**
 * spec = { width, height, palette:{ "k":"#rrggbb[aa]" }, frames:[ { rows:[ "..kk..", ... ] } ],
 *          animations:{ idle:[0,1], walk:[2,3,4,5] }, fps: 8 }   ('.' ou ' ' = transparente)
 * Gera uma folha de sprites horizontal em PNG.
 */
export async function spriteFromSpec(spec) {
  const w = spec.width; const h = spec.height;
  if (![w, h].every((n) => Number.isInteger(n) && n >= 4 && n <= 128)) throw new Error('Sprite: largura e altura entre 4 e 128 pixels.');
  const frames = spec.frames || [];
  if (!frames.length || frames.length > 64) throw new Error('Sprite: entre 1 e 64 quadros.');
  const palette = Object.fromEntries(Object.entries(spec.palette || {}).map(([k, v]) => [k, hexRgba(v)]));
  const raw = Buffer.alloc(w * frames.length * h * 4);
  let painted = 0;
  frames.forEach((f, fi) => {
    if ((f.rows || []).length !== h) throw new Error(`Sprite: o quadro ${fi} precisa ter ${h} linhas.`);
    f.rows.forEach((row, y) => {
      if ([...row].length !== w) throw new Error(`Sprite: quadro ${fi}, linha ${y} precisa ter ${w} caracteres.`);
      [...row].forEach((ch, x) => {
        if (ch === '.' || ch === ' ') return;
        const c = palette[ch];
        if (!c) throw new Error(`Sprite: cor "${ch}" não está na paleta.`);
        raw.set(c, ((y * w * frames.length) + fi * w + x) * 4);
        painted++;
      });
    });
  });
  if (!painted) throw new Error('Sprite vazio.');
  const png = await sharp(raw, { raw: { width: w * frames.length, height: h, channels: 4 } }).png({ palette: Object.keys(palette).length <= 256 }).toBuffer();
  const animations = spec.animations && Object.keys(spec.animations).length ? spec.animations : { idle: frames.map((_, i) => i) };
  for (const [name, list] of Object.entries(animations)) for (const i of list) if (i < 0 || i >= frames.length) throw new Error(`Animação "${name}" usa quadro inexistente (${i}).`);
  return { png, meta: { frameWidth: w, frameHeight: h, frames: frames.length, animations, fps: spec.fps || 8, pixelArt: true } };
}

/** Normaliza uma imagem enviada (PNG/JPG/WEBP) e define a grade de quadros. */
export async function spriteFromImage(buffer, { frameWidth, frameHeight, pixelArt = false, fps = 8 } = {}) {
  const img = sharp(buffer, { failOn: 'error' });
  const m = await img.metadata();
  if (!m.width || !m.height) throw new Error('Imagem inválida.');
  if (m.width > 8192 || m.height > 8192) throw new Error('Imagem maior que 8192 px.');
  const fw = frameWidth || m.width; const fh = frameHeight || m.height;
  if (m.width % fw || m.height % fh) throw new Error(`A imagem (${m.width}×${m.height}) não é múltipla do quadro ${fw}×${fh}.`);
  const cols = m.width / fw; const rows = m.height / fh;
  const png = await img.png().toBuffer();
  return { png, meta: { frameWidth: fw, frameHeight: fh, frames: cols * rows, columns: cols, animations: { idle: Array.from({ length: cols * rows }, (_, i) => i) }, fps, pixelArt } };
}

/** Krita (.kra) e OpenRaster (.ora): extrai a imagem composta (mergedimage.png). */
export async function spriteFromLayeredFile(buffer, opts = {}) {
  let zip;
  try { zip = new AdmZip(Buffer.from(buffer)); } catch { throw new Error('Arquivo .kra/.ora inválido.'); }
  const entry = zip.getEntries().find((e) => e.entryName === 'mergedimage.png');
  if (!entry) throw new Error('O arquivo não contém mergedimage.png (salve-o novamente no Krita).');
  const data = entry.getData();
  if (data.length > 64 * 1024 * 1024) throw new Error('Imagem composta grande demais.');
  return spriteFromImage(data, opts);
}
