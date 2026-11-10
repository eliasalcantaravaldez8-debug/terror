// Publica um jogo pronto DENTRO do link sem servidor: verifica o pacote, extrai para
// dist/link-games/nexplay-games/<slug>/ e atualiza nexplay-games/manifest.json.
// Uso: node scripts/add-link-game.js <jogo.zip|jogo.html> --title "Nome" --genre futebol [--creator Nome] [--controls "..."] [--description "..."] [--platforms both] [--cover capa.png]
import fs from 'node:fs';
import path from 'node:path';
import AdmZip from 'adm-zip';

const args = process.argv.slice(2);
const src = args[0];
const opt = (k, d = '') => { const i = args.indexOf(`--${k}`); return i >= 0 ? args[i + 1] : d; };
if (!src || !fs.existsSync(src)) { console.error('Informe o arquivo do jogo (.zip ou .html).'); process.exit(1); }
const BLOCKED = /\.(exe|dll|bat|cmd|com|sh|ps1|vbs|msi|scr|jar|php|py|pl|cgi|asp|aspx|jsp|apk|aab|ipa|dmg|app|deb|rpm|x86_64)$/i;
const title = opt('title', path.basename(src).replace(/\.(zip|html?)$/i, ''));
const slug = title.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'jogo';
const root = path.resolve('dist/link-games/nexplay-games');
const dir = path.join(root, slug);
fs.rmSync(dir, { recursive: true, force: true });
fs.mkdirSync(dir, { recursive: true });
const files = [];
if (/\.html?$/i.test(src)) {
  fs.copyFileSync(src, path.join(dir, 'index.html')); files.push('index.html');
} else {
  const zip = new AdmZip(src);
  for (const e of zip.getEntries()) {
    const n = e.entryName.replace(/\\/g, '/');
    if (e.isDirectory || n.startsWith('__MACOSX/') || n.endsWith('.DS_Store')) continue;
    if (n.startsWith('/') || n.split('/').includes('..')) throw new Error(`Caminho inválido: ${n}`);
    if (BLOCKED.test(n)) throw new Error(`Arquivo proibido: ${n}`);
    if (((e.attr >>> 16) & 0o170000) === 0o120000) throw new Error(`Link simbólico: ${n}`);
    const out = path.join(dir, n);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, e.getData());
    files.push(n);
  }
}
let entry = files.find((f) => f.toLowerCase() === 'index.html') || files.find((f) => /^[^/]+\/index\.html$/i.test(f)) || (files.filter((f) => /\.html?$/i.test(f)).length === 1 ? files.find((f) => /\.html?$/i.test(f)) : null);
if (!entry) throw new Error('Não achei o index.html do jogo.');
let cover = null;
if (opt('cover')) { cover = `capa${path.extname(opt('cover')).toLowerCase()}`; fs.copyFileSync(opt('cover'), path.join(dir, cover)); }
const manifestPath = path.join(root, 'manifest.json');
const manifest = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, 'utf8')) : { games: [] };
manifest.games = manifest.games.filter((g) => g.slug !== slug);
manifest.games.unshift({ slug, title, description: opt('description'), shortDescription: opt('short', opt('description').slice(0, 140)), genre: opt('genre', 'outro'),
  platforms: opt('platforms', 'both'), controls: opt('controls'), creator: opt('creator', 'Criador'), entry, files, cover, publishedAt: new Date().toISOString() });
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log(`OK: ${title} (${slug}) · ${files.length} arquivo(s) · início ${entry}`);
