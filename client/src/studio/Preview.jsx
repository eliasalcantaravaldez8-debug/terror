// Pré-visualização: o projeto roda no player da ORIGEM ISOLADA (sandbox), onde scripts podem executar
// sem acesso à conta do usuário. O documento e os assets são enviados por postMessage.
import { useEffect, useRef, useState } from 'react';
import { api } from '../api.js';

let sandboxOriginCache = null;
async function sandboxOrigin() {
  if (!sandboxOriginCache) sandboxOriginCache = (await api.get('/health')).sandboxOrigin;
  return sandboxOriginCache;
}

export default function Preview({ doc, projectId, onLog, onEvent }) {
  const frame = useRef(null);
  const [origin, setOrigin] = useState(null);
  const docRef = useRef(doc);
  docRef.current = doc;
  useEffect(() => { sandboxOrigin().then(setOrigin); }, []);
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
        frame.current.contentWindow.postMessage({ type: 'nexplay:load', doc: docRef.current, assets }, origin, Object.values(assets));
      } else if (m.type === 'nexplay:log') onLog?.(m.kind, m.message);
      else if (m.type === 'nexplay:event') onEvent?.(m.name, m.data);
      else if (m.type === 'nexplay:ready') onLog?.('info', 'Pré-visualização iniciada.');
    };
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, [origin, projectId]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!origin) return <div className="spinner" />;
  return (
    <iframe ref={frame} title="Pré-visualização" src={`${origin}/runtime/player.html`} style={{ width: '100%', height: '100%', border: 0, display: 'block' }}
      sandbox="allow-scripts allow-same-origin allow-pointer-lock" allow="fullscreen; gamepad; autoplay" referrerPolicy="origin" />
  );
}
