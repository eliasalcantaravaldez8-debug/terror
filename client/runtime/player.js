// Player do NEXPLAY STUDIO na origem isolada.
// Modo 1 (jogo publicado): /runtime/player.html#<token> → busca /p/<token>/project.json.
// Modo 2 (pré-visualização no Studio): recebe o projeto do app principal via postMessage.
import { Game } from '../src/engine/game.js';
import { Game2D } from '../src/engine/game2d.js';

const stage = document.getElementById('stage');
const status = document.getElementById('msg');
const parentOrigin = (() => { try { return document.referrer ? new URL(document.referrer).origin : '*'; } catch { return '*'; } })();
const post = (msg) => window.parent !== window && window.parent.postMessage(msg, parentOrigin);
let game = null;

async function run(doc, assetUrl, test) {
  game?.dispose();
  // Preferência de qualidade gráfica escolhida pelo jogador (menu Gráficos).
  try { const q = localStorage.getItem('nx_quality'); if (q && doc.settings?.rendering && !test) doc.settings.rendering.quality = q; } catch { /* sem armazenamento */ }
  stage.innerHTML = '';
  const opts = {
    assetUrl,
    onEvent: (name, data) => post({ type: 'nexplay:event', name, data: safe(data) }),
    onLog: (kind, message) => post({ type: 'nexplay:log', kind, message: String(message).slice(0, 500) }),
  };
  try {
    game = doc.meta.dimension === '2d' ? new Game2D(stage, doc, opts) : new Game(stage, doc, opts);
    if (test) game.testMode = true;
    await game.init();
    document.getElementById('status')?.remove();
    post({ type: 'nexplay:ready' });
    if (test) {
      const result = await game.runTest(test.entityId).catch((e) => ({ loaded: false, error: e.message }));
      post({ type: 'nexplay:test_result', jobId: test.jobId, result });
    }
  } catch (e) {
    status.textContent = `Não foi possível iniciar o jogo: ${e.message}`;
    post({ type: 'nexplay:log', kind: 'error', message: e.stack || e.message });
  }
}

function safe(v) { try { return JSON.parse(JSON.stringify(v ?? null)); } catch { return null; } }

const token = location.hash.slice(1);
if (token) {
  fetch(`/p/${token}/project.json`).then(async (r) => {
    if (!r.ok) throw new Error(r.status === 403 ? 'Sessão expirada. Abra o jogo novamente pela NEXPLAY.' : 'Build indisponível.');
    const doc = await r.json();
    run(doc, (asset) => `/p/${token}/assets/${asset.storageKey}`);
  }).catch((e) => { status.textContent = e.message; });
} else {
  // Pré-visualização: só aceita mensagens da janela que embutiu o player.
  window.addEventListener('message', (ev) => {
    if (ev.source !== window.parent || (parentOrigin !== '*' && ev.origin !== parentOrigin)) return;
    const msg = ev.data;
    if (msg?.type === 'nexplay:load') {
      const urls = new Map();
      for (const [id, buf] of Object.entries(msg.assets || {})) urls.set(id, URL.createObjectURL(new Blob([buf])));
      run(msg.doc, (asset) => urls.get(asset.id) || null, msg.test || null);
    }
  });
  post({ type: 'nexplay:waiting' });
}
