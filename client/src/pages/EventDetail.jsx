import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../api.js';
import { useAuth } from '../auth.jsx';
import { useLoad, Loader, GameCard, ActionButton, Avatar, Field } from '../components/ui.jsx';
import { Comments } from './GameDetail.jsx';
import { KIND, STATUS } from './Events.jsx';

export default function EventDetail() {
  const { slug } = useParams();
  const { user } = useAuth();
  const s = useLoad(() => api.get(`/community/events/${slug}`), [slug, user?.id]);
  const mine = useLoad(() => (user ? api.get('/games/mine') : Promise.resolve({ games: [] })), [user?.id]);
  const [gameId, setGameId] = useState('');
  return (
    <Loader state={s}>{({ event: e, entries, myVote, categories, comments }) => (
      <div className="stack fade-in">
        <div className="hero" style={{ minHeight: 220 }}>
          <div className="hero-orbs"><i style={{ width: 300, height: 300, background: e.kind === 'awards' ? '#f59e0b' : '#8b5cf6', left: '60%', top: -60 }} /></div>
          <div className="row"><span className="pill">{KIND[e.kind]}</span><span className={`pill ${STATUS[e.status][1]}`}>{STATUS[e.status][0]}</span></div>
          <h1 className="mt">{e.title}</h1>
          {e.theme && <p>Tema: <b>{e.theme}</b></p>}
          <p className="small muted">{new Date(e.startsAt).toLocaleString('pt-BR')} até {new Date(e.endsAt).toLocaleString('pt-BR')}{e.votingEndsAt ? ` · votação até ${new Date(e.votingEndsAt).toLocaleString('pt-BR')}` : ''}</p>
          <div className="row">
            {user && !e.joined && ['scheduled', 'active'].includes(e.status) && <ActionButton className="btn primary" ok="Inscrição confirmada!" onClick={async () => { await api.post(`/community/events/${slug}/join`); s.reload(); }}>Participar</ActionButton>}
            {e.joined && <span className="pill green">Você está participando</span>}
            {user && e.status === 'finished' && e.ncParticipation > 0 && <ActionButton className="btn" onClick={async () => { const r = await api.post(`/community/events/${slug}/claim`); alert(`+${r.credited} NC`); }}>Resgatar {e.ncParticipation} NC de participação</ActionButton>}
          </div>
        </div>
        <div className="card"><p style={{ whiteSpace: 'pre-wrap' }}>{e.description || 'Sem descrição.'}</p></div>
        {categories.length > 0 && (
          <div className="stack">
            <h2>Categorias</h2>
            {categories.map((c) => (
              <div key={c.id} className="card stack">
                <h3>{c.name}</h3>
                {c.nominees.length ? <div className="grid cols-4">{c.nominees.map((n) => (
                  <div key={n.id} className="stack" style={{ border: c.myVote === n.id ? '1px solid var(--cyan)' : '1px solid transparent', borderRadius: 16, padding: 4 }}>
                    {c.nomineeType === 'game' ? <GameCard game={n.subject} /> : c.nomineeType === 'user' ? <Link to={`/u/${n.subject.username}`} className="card row"><Avatar user={n.subject} /> {n.subject.displayName}</Link> : <Link to={`/estudios/${n.subject.slug}`} className="card">{n.subject.name}</Link>}
                    {c.winnerId === n.subject.id && <span className="pill gold">Vencedor</span>}
                    {n.votes !== undefined && <span className="small muted">{n.votes} votos</span>}
                    {user && ['active', 'voting'].includes(e.status) && <ActionButton className="btn sm" ok="Voto registrado!" onClick={async () => { await api.post(`/community/awards/${c.id}/vote`, { nomineeId: n.id }); s.reload(); }}>{c.myVote === n.id ? 'Seu voto' : 'Votar'}</ActionButton>}
                  </div>
                ))}</div> : <p className="muted small">Indicados ainda não anunciados.</p>}
              </div>
            ))}
          </div>
        )}
        {['game_jam', 'competition', 'festival'].includes(e.kind) && (
          <div className="stack">
            <h2>Jogos inscritos ({entries.length})</h2>
            {user && e.status === 'active' && (
              <Loader state={mine}>{(d) => (
                <div className="card row">
                  <Field label="Inscrever um jogo seu (já aprovado pela moderação)">
                    <select className="input" value={gameId} onChange={(ev) => setGameId(ev.target.value)}><option value="">Escolha…</option>{d.games.filter((g) => ['published', 'in_development'].includes(g.status)).map((g) => <option key={g.id} value={g.id}>{g.title}</option>)}</select>
                  </Field>
                  <ActionButton className="btn primary" disabled={!gameId} ok="Jogo inscrito!" onClick={async () => { await api.post(`/community/events/${slug}/entries`, { gameId: Number(gameId) }); s.reload(); }}>Inscrever</ActionButton>
                </div>
              )}</Loader>
            )}
            <div className="games-grid">{entries.map((x) => (
              <div key={x.entryId} className="stack">
                <GameCard game={x.game} />
                <div className="row">{x.rank && <span className="pill gold">#{x.rank}</span>}{x.votes !== undefined && <span className="small muted">{x.votes} votos</span>}
                  {user && (e.status === 'voting' || (e.status === 'active' && e.kind === 'festival')) && <ActionButton className="btn sm" ok="Voto registrado!" onClick={async () => { await api.post(`/community/events/${slug}/vote`, { entryId: x.entryId }); s.reload(); }}>{myVote === x.entryId ? 'Seu voto' : 'Votar'}</ActionButton>}
                </div>
              </div>
            ))}</div>
            {!entries.length && <p className="muted">Nenhum jogo inscrito ainda.</p>}
          </div>
        )}
        <h2>Discussão</h2>
        <Comments list={comments} onPost={async (body, parentId) => { await api.post(`/community/events/${slug}/comments`, { body, parentId }); s.reload(); }} />
      </div>
    )}</Loader>
  );
}
