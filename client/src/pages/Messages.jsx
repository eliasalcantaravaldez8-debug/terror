import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api, ago } from '../api.js';
import { useAuth } from '../auth.jsx';
import { useLoad, Loader, Avatar, ReportButton, useToast } from '../components/ui.jsx';

export default function Messages() {
  const { username } = useParams();
  const nav = useNavigate();
  const { refresh } = useAuth();
  const list = useLoad(() => api.get('/messages'), []);
  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <div className="chat">
        <div className="chat-list" style={{ padding: 8 }}>
          <h3 style={{ padding: '8px 8px 0' }}>Mensagens</h3>
          <Loader state={list}>{(d) => (d.conversations.length ? d.conversations.map((c) => (
            <div key={c.user.id} className={`chat-item ${c.user.username === username ? 'active' : ''}`} onClick={() => nav(`/mensagens/${c.user.username}`)}>
              <Avatar user={c.user} size={36} /><div style={{ minWidth: 0, flex: 1 }}><b>{c.user.displayName}</b><div className="tiny muted" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.lastMessage.fromMe ? 'Você: ' : ''}{c.lastMessage.body}</div></div>
              {c.unread > 0 && <span className="dot" style={{ position: 'static' }}>{c.unread}</span>}
            </div>
          )) : <p className="muted small" style={{ padding: 8 }}>Mensagens privadas são entre amigos. <Link to="/amigos">Encontre amigos</Link>.</p>)}</Loader>
        </div>
        {username ? <Thread key={username} username={username} onRead={() => { list.reload(); refresh(); }} /> : <div className="center muted" style={{ alignSelf: 'center' }}>Escolha uma conversa.</div>}
      </div>
    </div>
  );
}

function Thread({ username, onRead }) {
  const s = useLoad(() => api.get(`/messages/${username}`), [username]);
  const [body, setBody] = useState('');
  const end = useRef(null);
  const toast = useToast();
  useEffect(() => { onRead(); }, [s.data]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { const t = setInterval(() => s.reload(), 8000); return () => clearInterval(t); }, [username]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { end.current?.scrollIntoView({ block: 'end' }); }, [s.data?.messages?.length]);
  return (
    <Loader state={s}>{(d) => (
      <div className="chat-body">
        <div className="row between" style={{ padding: 12, borderBottom: '1px solid var(--line)' }}><Link to={`/u/${d.user.username}`} className="row"><Avatar user={d.user} size={32} /><b>{d.user.displayName}</b></Link></div>
        <div className="chat-msgs">
          {d.messages.map((m) => <div key={m.id} className={`msg ${m.fromMe ? 'me' : ''}`}>{m.body}<div className="tiny muted row between">{ago(m.createdAt)}{!m.fromMe && <ReportButton type="message" id={m.id} />}</div></div>)}
          <div ref={end} />
        </div>
        {d.canMessage ? (
          <form className="row" style={{ padding: 12, borderTop: '1px solid var(--line)' }} onSubmit={async (e) => { e.preventDefault(); if (!body.trim()) return; try { await api.post(`/messages/${username}`, { body }); setBody(''); s.reload(); } catch (x) { toast(x.message, 'error'); } }}>
            <input className="input" style={{ flex: 1 }} value={body} onChange={(e) => setBody(e.target.value)} placeholder="Escreva uma mensagem…" maxLength={2000} />
            <button className="btn primary">Enviar</button>
          </form>
        ) : <div className="muted small" style={{ padding: 12 }}>Você não pode enviar mensagens para este usuário (é preciso ser amigo e ele precisa aceitar mensagens).</div>}
      </div>
    )}</Loader>
  );
}
