// Página de jogo: executa o build em iframe ISOLADO (origem sandbox), conta tempo ativo,
// faz a ponte do NEXPLAY SDK (conquistas, dados do jogador, multiplayer).
import { useEffect, useRef, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { api } from '../api.js';
import { useAuth } from '../auth.jsx';
import { useLoad, Loader, useToast, Field, ActionButton } from '../components/ui.jsx';
import { Icon } from '../components/icons.jsx';

const SANDBOX_PERMS = 'allow-scripts allow-same-origin allow-pointer-lock allow-orientation-lock allow-popups allow-forms allow-modals';

export default function Play() {
  const { slug } = useParams();
  const [params] = useSearchParams();
  const { user } = useAuth();
  const toast = useToast();
  const info = useLoad(() => api.get(`/games/${slug}`), [slug]);
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);
  const [full, setFull] = useState(false);
  const frame = useRef(null);
  const ws = useRef(null);
  const [room, setRoom] = useState(null);
  const [peers, setPeers] = useState([]);
  const [code, setCode] = useState('');
  const [invite, setInvite] = useState('');

  useEffect(() => {
    let alive = true;
    api.post(`/games/${slug}/play`, { versionId: params.get('versao') ? Number(params.get('versao')) : undefined })
      .then((s) => alive && setSession(s)).catch((e) => alive && setError(e.message));
    return () => { alive = false; };
  }, [slug]); // eslint-disable-line react-hooks/exhaustive-deps

  // Heartbeat de tempo ativo (só conta com a aba visível).
  useEffect(() => {
    if (!session) return undefined;
    const t = setInterval(() => {
      api.post(`/games/sessions/${session.sessionId}/heartbeat`, { visible: document.visibilityState === 'visible' }).catch(() => {});
    }, 30_000);
    return () => clearInterval(t);
  }, [session]);

  const toGame = (msg) => frame.current?.contentWindow?.postMessage(msg, session?.sandboxOrigin || '*');

  // Ponte do SDK: mensagens vindas do jogo isolado.
  useEffect(() => {
    if (!session) return undefined;
    const onMsg = async (ev) => {
      if (ev.source !== frame.current?.contentWindow) return;
      if (ev.origin !== session.sandboxOrigin && !ev.origin.endsWith(new URL(session.sandboxOrigin).host)) return;
      const m = ev.data || {};
      if (m.type === 'nexplay:achievement') {
        try { const r = await api.post(`/games/${slug}/achievements/${encodeURIComponent(m.code)}/unlock`); if (r.unlocked) toast('Conquista desbloqueada!', 'ok'); } catch { /* conquista inexistente */ }
      } else if (m.type === 'nexplay:request' && m.kind === 'player') {
        toGame({ type: 'nexplay:reply', id: m.id, data: { username: user.username, displayName: user.displayName } });
      } else if (m.type === 'nexplay:mp:send' && ws.current?.readyState === 1) {
        ws.current.send(JSON.stringify({ t: m.t, name: m.name, data: m.data }));
      } else if (m.type === 'nexplay:log' && m.kind === 'error') {
        console.warn('[jogo]', m.message);
      }
    };
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, [session, user]); // eslint-disable-line react-hooks/exhaustive-deps

  const connect = (r, roomCode) => {
    ws.current?.close();
    const proto = location.protocol === 'https:' ? 'wss' : 'ws';
    const sock = new WebSocket(`${proto}://${location.host}/ws/rooms?room=${encodeURIComponent(r.id)}${roomCode ? `&code=${roomCode}` : ''}`);
    sock.onmessage = (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.t === 'welcome') setPeers(msg.peers);
      if (msg.t === 'peer_joined') setPeers((p) => [...p.filter((x) => x.id !== msg.peer.id), msg.peer]);
      if (msg.t === 'peer_left') setPeers((p) => p.filter((x) => x.id !== msg.peer));
      if (msg.t === 'error') toast(msg.message, 'error');
      toGame({ type: 'nexplay:mp', event: msg.t, data: msg });
    };
    sock.onclose = () => { setRoom((cur) => (cur?.id === r.id ? null : cur)); setPeers([]); };
    ws.current = sock;
    setRoom({ ...r, code: roomCode || r.code });
  };
  useEffect(() => () => ws.current?.close(), []);
  useEffect(() => {
    // Convite recebido por notificação: ?sala=<id>
    const sala = params.get('sala');
    if (sala && session) connect({ id: sala });
  }, [session]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Loader state={info}>
      {({ game }) => {
        const online = game.modes.some((m) => ['public_mp', 'private_rooms', 'coop', 'competitive'].includes(m)) && game.maxPlayers > 1;
        return (
          <div className="stack">
            <div className="row between">
              <div className="row"><Link to={`/jogo/${slug}`} className="btn sm ghost">← {game.title}</Link></div>
              <div className="row">
                <button className="btn sm" onClick={() => setFull(true)}><Icon name="monitor" /> Tela cheia</button>
              </div>
            </div>
            {error && <div className="error-box">{error}</div>}
            {session && (
              <iframe ref={frame} title={game.title} src={session.url} className={`play-frame ${full ? 'full' : ''}`}
                sandbox={SANDBOX_PERMS} allow="fullscreen; gamepad; autoplay; screen-wake-lock" referrerPolicy="origin" />
            )}
            {full && <button className="btn" style={{ position: 'fixed', top: 12, right: 12, zIndex: 310 }} onClick={() => setFull(false)}><Icon name="x" /> Sair da tela cheia</button>}
            {!session && !error && <div className="spinner" />}
            <p className="tiny muted">O jogo roda em um ambiente isolado da NEXPLAY: ele não tem acesso à sua conta, senha ou cookies.</p>
            {online && session && (
              <div className="card stack">
                <h3><Icon name="users" size={18} /> Multiplayer</h3>
                {room ? (
                  <>
                    <div className="row"><span className="pill green">Conectado à sala</span>{room.code && <span className="pill gold">Código: {room.code}</span>}<span className="small muted">{peers.length}/{game.maxPlayers} jogadores</span></div>
                    <div className="row small">{peers.map((p) => <span key={p.id} className="pill">{p.displayName}</span>)}</div>
                    <div className="row">
                      <input className="input" style={{ maxWidth: 220 }} placeholder="Convidar amigo (usuário)" value={invite} onChange={(e) => setInvite(e.target.value)} />
                      <ActionButton className="btn sm" ok="Convite enviado!" onClick={() => api.post(`/multiplayer/rooms/${room.id}/invite`, { username: invite })}>Convidar</ActionButton>
                      <button className="btn sm danger" onClick={() => ws.current?.close()}>Sair da sala</button>
                    </div>
                  </>
                ) : (
                  <div className="grid cols-3">
                    {game.modes.includes('public_mp') && <ActionButton className="btn primary" onClick={async () => { const d = await api.post(`/multiplayer/games/${game.id}/quickmatch`); connect(d.room); }}>Partida rápida</ActionButton>}
                    {game.modes.includes('private_rooms') && <ActionButton className="btn" onClick={async () => { const d = await api.post(`/multiplayer/games/${game.id}/rooms`, { visibility: 'private', mode: 'private_rooms' }); connect(d.room, d.room.code); }}>Criar sala privada</ActionButton>}
                    {game.modes.includes('private_rooms') && (
                      <form className="row" onSubmit={async (e) => { e.preventDefault(); try { const d = await api.post('/multiplayer/rooms/join', { code }); connect(d.room, code.toUpperCase()); } catch (x) { toast(x.message, 'error'); } }}>
                        <Field label=""><input className="input" placeholder="Código da sala" value={code} onChange={(e) => setCode(e.target.value)} maxLength={6} /></Field>
                        <button className="btn">Entrar</button>
                      </form>
                    )}
                  </div>
                )}
                <p className="tiny muted">O multiplayer funciona quando o jogo implementa o NEXPLAY SDK (salas, convites e mensagens em tempo real). Jogos locais (mesmo dispositivo) não precisam de sala.</p>
              </div>
            )}
          </div>
        );
      }}
    </Loader>
  );
}
