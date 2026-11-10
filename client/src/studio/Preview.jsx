// Pré-visualização: o projeto roda no player da ORIGEM ISOLADA (sandbox), onde scripts podem executar
// sem acesso à conta do usuário. O documento e os assets são enviados por postMessage.
import { useEffect, useRef, useState } from 'react';
import { api, sandboxPerms, postTarget } from '../api.js';
import { STANDALONE } from '../standalone.js';
import { Game } from '../engine/game.js';
import { Game2D } from '../engine/game2d.js';

let sandboxCache = null;
/** { origin, url }: origin 'null' = modo de origem única (iframe opaco servido pelo próprio host). */
export async function sandboxInfo() {
  if (!sandboxCache) { const h = await api.get('/health'); sandboxCache = { origin: h.sandboxOrigin, url: h.sandboxUrl ?? h.sandboxOrigin }; }
  return sandboxCache;
}

/**
 * Versão sem servidor: não há origem isolada nem conta para proteger (os dados são do próprio aparelho),
 * então o motor roda direto na página.
 */
function LocalPreview({ doc, onLog, onEvent, test, onTestResult }) {
  const box = useRef(null);
  useEffect(() => {
    let game = null; let dead = false;
    const el = document.createElement('div'); el.style.cssText = 'width:100%;height:100%';
    box.current.appendChild(el);
    const d = structuredClone(doc);
    try { const q = localStorage.getItem('nx_quality'); if (q && d.settings?.rendering && !test) d.settings.rendering.quality = q; } catch { /* sem armazenamento */ }
    const opts = { onEvent: (n, x) => onEvent?.(n, x), onLog: (k, m) => onLog?.(k, String(m).slice(0, 500)) };
    (async () => {
      try {
        game = d.meta.dimension === '2d' ? new Game2D(el, d, opts) : new Game(el, d, opts);
        if (test) game.testMode = true;
        await game.init();
        if (dead) return;
        onLog?.('info', 'Pré-visualização iniciada.');
        if (test?.full) onTestResult?.(await game.runGameTest().catch((e) => ({ ok: false, frames: 0, errors: [e.message] })));
      } catch (e) {
        onLog?.('error', `Não foi possível iniciar: ${e.message}`);
        if (test?.full) onTestResult?.({ ok: false, frames: 0, errors: [`Falha ao iniciar: ${e.message}`] });
      }
    })();
    return () => { dead = true; try { game?.dispose(); } catch { /* já liberado */ } el.remove(); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return <div ref={box} style={{ width: '100%', height: '100%', position: 'relative', background: '#000' }} />;
}

export default function Preview(props) {
  return STANDALONE ? <LocalPreview {...props} /> : <SandboxPreview {...props} />;
}

function SandboxPreview({ doc, projectId, onLog, onEvent, test = null, onTestResult }) {
  const frame = useRef(null);
  const [sb, setSb] = useState(null);
  const origin = sb?.origin;
  const docRef = useRef(doc);
  docRef.current = doc;
  useEffect(() => { sandboxInfo().then(setSb); }, []);
  useEffect(() => {
    if (!origin) return undefined;
    const onMsg = async (ev) => {
      if (ev.source !== frame.current?.contentWindow || ev.origin !== origin) return;
      const m = ev.data || {};
      if (m.type === 'nexplay:waiting') {
        const assets = {};
        await Promise.all((docRef.current.assets || []).map(async (a) => {
          if (!a.assetId) return;
          const r = await fetch(`/api/projects/${projectId}/assets/${a.assetId}/file`, { credentials: 'same-origin' });
          if (r.ok) assets[a.id] = await r.arrayBuffer();
        }));
        frame.current.contentWindow.postMessage({ type: 'nexplay:load', doc: docRef.current, assets, ...(test ? { test } : {}) }, postTarget(origin), Object.values(assets));
      } else if (m.type === 'nexplay:log') onLog?.(m.kind, m.message);
      else if (m.type === 'nexplay:event') onEvent?.(m.name, m.data);
      else if (m.type === 'nexplay:ready') onLog?.('info', 'Pré-visualização iniciada.');
      else if (m.type === 'nexplay:game_test_result') onTestResult?.(m.result || { ok: false, frames: 0, errors: ['Resultado vazio.'] });
    };
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, [origin, projectId]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!sb) return <div className="spinner" />;
  return (
    <iframe ref={frame} title="Pré-visualização" src={`${sb.url}/runtime/player.html`} style={{ width: '100%', height: '100%', border: 0, display: 'block' }}
      sandbox={sandboxPerms(origin, 'allow-pointer-lock')} allow="fullscreen; gamepad; autoplay" referrerPolicy="origin" />
  );
}
