import { useState } from 'react';
import { Link } from 'react-router-dom';
import { api, ago } from '../api.js';
import { useAuth } from '../auth.jsx';
import { useLoad, Loader, Tabs, Avatar, GameCard, ActionButton, Empty, Field } from '../components/ui.jsx';
import { Comments } from './GameDetail.jsx';

const ACT = {
  played: (a) => <>jogou <Link to={`/jogo/${a.game?.slug}`}><b>{a.game?.title}</b></Link></>,
  reviewed: (a) => <>avaliou <Link to={`/jogo/${a.game?.slug}`}><b>{a.game?.title}</b></Link> com {'★'.repeat(a.data.rating || 0)}</>,
  published: (a) => <>publicou <Link to={`/jogo/${a.game?.slug}`}><b>{a.game?.title}</b></Link></>,
  devlog: (a) => <>postou “{a.data.title}” em <Link to={`/jogo/${a.game?.slug}`}><b>{a.game?.title}</b></Link></>,
  purchased: (a) => <>adquiriu <Link to={`/jogo/${a.game?.slug}`}><b>{a.game?.title}</b></Link></>,
  friend: (a) => <>agora é amigo de <Link to={`/u/${a.data.with}`}><b>@{a.data.with}</b></Link></>,
  joined_event: (a) => <>entrou no evento <Link to={`/eventos/${a.data.slug}`}><b>{a.data.event}</b></Link></>,
  event_entry: (a) => <>inscreveu <b>{a.game?.title}</b> em <Link to={`/eventos/${a.data.slug}`}><b>{a.data.event}</b></Link></>,
};

export function ActivityList({ items }) {
  if (!items.length) return <div className="muted">Nenhuma atividade ainda.</div>;
  return <div className="stack">{items.map((a) => (
    <div key={a.id} className="card row" style={{ padding: 12 }}>
      <Avatar user={a.user} size={34} />
      <div style={{ flex: 1 }}><Link to={`/u/${a.user.username}`}><b>{a.user.displayName}</b></Link> {(ACT[a.type] || (() => a.type))(a)}</div>
      <span className="tiny muted">{ago(a.createdAt)}</span>
    </div>
  ))}</div>;
}

export default function Community() {
  const { user } = useAuth();
  const [tab, setTab] = useState(user ? 'amigos' : 'feed');
  return (
    <div>
      <h1>Comunidade</h1>
      <Tabs value={tab} onChange={setTab} tabs={[...(user ? [['amigos', 'Amigos e seguidos']] : []), ['feed', 'Feed público'], ['rankings', 'Rankings'], ['votacoes', 'Votações'], ['sugestoes', 'Sugestões']]} />
      {tab === 'amigos' && <FriendsFeed />}
      {tab === 'feed' && <PublicFeed />}
      {tab === 'rankings' && <Rankings />}
      {tab === 'votacoes' && <Polls />}
      {tab === 'sugestoes' && <Suggestions />}
    </div>
  );
}

function FriendsFeed() { const s = useLoad(() => api.get('/users/me/feed'), []); return <Loader state={s}>{(d) => (d.activity.length ? <ActivityList items={d.activity} /> : <Empty icon="users" title="Seu feed está vazio">Adicione amigos e siga criadores para ver o que estão jogando e criando.</Empty>)}</Loader>; }
function PublicFeed() { const s = useLoad(() => api.get('/community/feed'), []); return <Loader state={s}>{(d) => <ActivityList items={d.activity} />}</Loader>; }

function Rankings() {
  const s = useLoad(() => api.get('/community/rankings'), []);
  return (
    <Loader state={s}>{(d) => (
      <div className="stack">
        <h2>Melhor avaliados</h2>{d.topRated.length ? <div className="games-grid">{d.topRated.map((g) => <GameCard key={g.id} game={g} />)}</div> : <p className="muted">É preciso ao menos 3 avaliações para entrar no ranking.</p>}
        <h2>Mais jogados (30 dias)</h2>{d.mostPlayed.length ? <div className="games-grid">{d.mostPlayed.map((g) => <GameCard key={g.id} game={g} />)}</div> : <p className="muted">Sem dados ainda.</p>}
        <div className="grid cols-3">
          {[['Jogadores mais ativos', d.topPlayers, (u) => `${u.hours} h`], ['Criadores em alta', d.topCreators, (u) => `${u.players} jogadores`], ['Caçadores de conquistas', d.achievementHunters, (u) => `${u.achievements} conquistas`]].map(([t, list, f]) => (
            <div className="card" key={t}><h3>{t}</h3>{list.length ? list.map((u, i) => <div className="row" key={u.id} style={{ padding: '6px 0' }}><b style={{ width: 22 }}>{i + 1}</b><Avatar user={u} size={28} /><Link to={`/u/${u.username}`}>{u.displayName}</Link><span className="muted small" style={{ marginLeft: 'auto' }}>{f(u)}</span></div>) : <p className="muted small">Sem dados ainda.</p>}</div>
          ))}
        </div>
      </div>
    )}</Loader>
  );
}

function Polls() {
  const { user } = useAuth();
  const s = useLoad(() => api.get('/community/polls'), []);
  return <Loader state={s}>{(d) => (d.polls.length ? <div className="grid cols-2">{d.polls.map((p) => (
    <div key={p.id} className="card stack">
      <h3>{p.question}</h3>
      {p.options.map((o, i) => {
        const pct = p.total ? Math.round((p.counts[i] / p.total) * 100) : 0;
        return (
          <button key={i} className="btn" style={{ justifyContent: 'space-between', borderColor: p.myVote === i ? 'var(--cyan)' : undefined }} disabled={!user || !p.open} onClick={async () => { await api.post(`/community/polls/${p.id}/vote`, { option: i }); s.reload(); }}>
            <span>{o}</span><span className="muted small">{pct}%</span>
          </button>
        );
      })}
      <span className="tiny muted">{p.total} votos {p.open ? '' : '· encerrada'}</span>
    </div>
  ))}</div> : <Empty icon="chart" title="Nenhuma votação aberta">A equipe NEXPLAY publica votações sobre recursos, eventos e temas de Game Jams.</Empty>)}</Loader>;
}

function Suggestions() {
  const { user } = useAuth();
  const s = useLoad(() => api.get('/community/suggestions'), []);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [open, setOpen] = useState(null);
  return (
    <div className="stack">
      {user && (
        <div className="card stack">
          <h3>Sugerir um jogo ou recurso</h3>
          <Field label="Título"><input className="input" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={120} /></Field>
          <Field label="Descrição"><textarea className="input" value={body} onChange={(e) => setBody(e.target.value)} maxLength={3000} /></Field>
          <div><ActionButton className="btn primary" ok="Sugestão publicada!" onClick={async () => { await api.post('/community/suggestions', { title, body }); setTitle(''); setBody(''); s.reload(); }}>Publicar sugestão</ActionButton></div>
        </div>
      )}
      <Loader state={s}>{(d) => d.suggestions.map((x) => (
        <div key={x.id} className="card">
          <div className="row between"><h3 style={{ margin: 0 }}>{x.title}</h3><span className={`pill ${x.status === 'done' ? 'green' : x.status === 'planned' ? 'cyan' : x.status === 'declined' ? 'red' : ''}`}>{{ open: 'Aberta', planned: 'Planejada', done: 'Concluída', declined: 'Recusada' }[x.status]}</span></div>
          <p className="mt" style={{ whiteSpace: 'pre-wrap' }}>{x.body}</p>
          <div className="row small muted"><span>por @{x.user.username} · {ago(x.createdAt)}</span>
            <button className="btn sm" disabled={!user} onClick={async () => { await api.post(`/community/suggestions/${x.id}/vote`); s.reload(); }} style={{ borderColor: x.voted ? 'var(--cyan)' : undefined }}>▲ {x.votes}</button>
            <button className="btn sm ghost" onClick={() => setOpen(open === x.id ? null : x.id)}>Comentários</button>
          </div>
          {open === x.id && <SuggestionComments id={x.id} />}
        </div>
      ))}</Loader>
    </div>
  );
}
function SuggestionComments({ id }) { const s = useLoad(() => api.get(`/community/suggestions/${id}/comments`), [id]); return <div className="mt"><Loader state={s}>{(d) => <Comments list={d.comments} onPost={async (body, parentId) => { await api.post(`/community/suggestions/${id}/comments`, { body, parentId }); s.reload(); }} />}</Loader></div>; }
