import { Link, useParams } from 'react-router-dom';
import { api, ago } from '../api.js';
import { useAuth } from '../auth.jsx';
import { useLoad, Loader, Avatar, PlanBadge, ActionButton, GameRail, ReportButton, Empty } from '../components/ui.jsx';
import { Icon } from '../components/icons.jsx';
import { ActivityList } from './Community.jsx';

const RARITY = { common: '', rare: 'cyan', epic: '', legendary: 'gold' };

export default function Profile() {
  const { username } = useParams();
  const { user } = useAuth();
  const s = useLoad(() => api.get(`/users/${username}`), [username, user?.id]);
  return (
    <Loader state={s}>{(d) => {
      const u = d.user; const r = d.relation; const me = user?.username === u.username;
      const theme = d.equippedItems?.find((i) => i.kind === 'theme');
      const effect = d.equippedItems?.find((i) => i.kind === 'effect' || i.kind === 'exclusive');
      const badge = d.equippedItems?.find((i) => i.kind === 'badge');
      const act = async (method, path) => { await (method === 'del' ? api.del(path) : api.post(path)); s.reload(); };
      return (
        <div className="stack fade-in">
          <div className="profile-head">
            <div className="profile-banner" style={{ backgroundImage: u.bannerUrl ? `url(${u.bannerUrl})` : theme ? `linear-gradient(135deg, ${theme.data.from}, ${theme.data.to})` : undefined }} />
            <div className="profile-body">
              <Avatar user={u} size={110} />
              <div style={{ flex: 1, minWidth: 220 }}>
                <h1 style={{ margin: 0 }} className={effect?.data?.particle === 'glitch' ? 'effect-glitch' : effect?.data?.style === 'holo' ? 'effect-holo' : ''}>{u.displayName} {badge && <span title={badge.name}>{badge.data.icon}</span>}</h1>
                <div className="row small muted">@{u.username} <PlanBadge plan={u.plan} />{u.role && <span className="pill">{u.role === 'admin' ? 'Equipe NEXPLAY' : 'Moderador'}</span>}</div>
              </div>
              <div className="row">
                {me && <Link className="btn" to="/configuracoes"><Icon name="settings" /> Editar perfil</Link>}
                {user && !me && r && (
                  <>
                    {r.friend ? <button className="btn" onClick={() => act('del', `/users/${u.username}/friend`)}>Amigos ✓</button>
                      : r.pendingIncoming ? <ActionButton className="btn primary" onClick={() => act('post', `/users/${u.username}/friend`)}>Aceitar amizade</ActionButton>
                        : r.pendingOutgoing ? <button className="btn" onClick={() => act('del', `/users/${u.username}/friend`)}>Pedido enviado</button>
                          : <ActionButton className="btn primary" onClick={() => act('post', `/users/${u.username}/friend`)}>Adicionar amigo</ActionButton>}
                    <button className="btn" onClick={() => act(r.following ? 'del' : 'post', `/users/${u.username}/follow`)}>{r.following ? 'Seguindo' : 'Seguir'}</button>
                    {r.friend && <Link className="btn" to={`/mensagens/${u.username}`}><Icon name="chat" /> Mensagem</Link>}
                    <button className="btn ghost" onClick={() => act(r.blockedByMe ? 'del' : 'post', `/users/${u.username}/block`)}>{r.blockedByMe ? 'Desbloquear' : 'Bloquear'}</button>
                    <ReportButton type="user" id={u.id} />
                  </>
                )}
              </div>
            </div>
          </div>
          {d.restricted ? <Empty icon="lock" title="Perfil privado">Este perfil é visível apenas para amigos.</Empty> : (
            <>
              {u.bio && <div className="card" style={{ whiteSpace: 'pre-wrap' }}>{u.bio}</div>}
              <div className="card row" style={{ justifyContent: 'space-around' }}>
                {[['playHours', 'horas jogadas'], ['gamesPlayed', 'jogos'], ['achievements', 'conquistas'], ['friends', 'amigos'], ['followers', 'seguidores'], ['following', 'seguindo'], ['reviews', 'avaliações'], ['gamesPublished', 'publicados']].map(([k, l]) => <div className="stat" key={k}><b>{d.stats[k]}</b><span>{l}</span></div>)}
              </div>
              {d.games.length > 0 && <><h2>Jogos publicados</h2><GameRail games={d.games} /></>}
              {d.favorites.length > 0 && <><h2>Favoritos</h2><GameRail games={d.favorites} /></>}
              <div className="grid cols-2">
                <div className="card"><h3>Conquistas e medalhas</h3>
                  {d.medals.map((m) => <div key={m.code + m.awarded_at} className="row small" style={{ padding: '4px 0' }}><span className="pill gold">🏅 {m.name}</span><span className="muted">{m.reason}</span></div>)}
                  {d.achievements.length ? d.achievements.map((a) => <div key={a.code} className="row small" style={{ padding: '4px 0' }}><span className={`pill ${RARITY[a.rarity]}`}>🏆 {a.name}</span><span className="muted">{a.description} · {ago(a.unlocked_at)}</span></div>) : !d.medals.length && <p className="muted small">Nenhuma conquista ainda.</p>}
                </div>
                <div className="card"><h3>Atividade recente</h3><ActivityList items={d.activity} /></div>
              </div>
            </>
          )}
        </div>
      );
    }}</Loader>
  );
}
