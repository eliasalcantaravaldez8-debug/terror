// Pré-visualização: o projeto roda no player da ORIGEM ISOLADA (sandbox), onde scripts podem executar
// sem acesso à conta do usuário. O documento e os assets são enviados por postMessage.
import { useEffect, useRef, useState } from 'react';
import { api, sandboxPerms, postTarget } from '../api.js';

let sandboxCache = null;
/** { origin, url }: origin 'null' = modo de origem única (iframe opaco servido pelo próprio host). */
export async function sandboxInfo() {
  if (!sandboxCache) { const h = await api.get('/health'); sandboxCache = { origin: h.sandboxOrigin, url: h.sandboxUrl ?? h.sandboxOrigin }; }
  return sandboxCache;
}

export default function Preview({ doc, projectId, onLog, onEvent }) {
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
        frame.current.contentWindow.postMessage({ type: 'nexplay:load', doc: docRef.current, assets }, postTarget(origin), Object.values(assets));
      } else if (m.type === 'nexplay:log') onLog?.(m.kind, m.message);
      else if (m.type === 'nexplay:event') onEvent?.(m.name, m.data);
      else if (m.type === 'nexplay:ready') onLog?.('info', 'Pré-visualização iniciada.');
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
