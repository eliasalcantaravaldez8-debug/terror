import { useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { api, ago, brl, GENRE_LABEL, MODE_LABEL, PLATFORM_LABEL, STAGE_LABEL, isMobileDevice } from '../api.js';
import { useAuth } from '../auth.jsx';
import { useLoad, Loader, Stars, Avatar, ActionButton, ReportButton, Tabs, Modal, Field, useToast } from '../components/ui.jsx';
import { Icon } from '../components/icons.jsx';

export function Comments({ list, onPost, emptyText = 'Seja o primeiro a comentar.' }) {
  const { user } = useAuth();
  const [body, setBody] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const roots = list.filter((c) => !c.parentId);
  const kids = (id) => list.filter((c) => c.parentId === id);
  const C = ({ c, depth = 0 }) => (
    <div style={{ marginLeft: depth * 28 }} className="stack">
      <div className="row" style={{ alignItems: 'flex-start' }}>
        <Avatar user={c.user} size={32} />
        <div style={{ flex: 1 }}>
          <div className="small"><Link to={`/u/${c.user.username}`}><b>{c.user.displayName}</b></Link> <span className="muted">· {ago(c.createdAt)}</span></div>
          <div>{c.body}</div>
          <div className="row">{user && depth === 0 && <button className="btn sm ghost" onClick={() => setReplyTo(c.id)}>Responder</button>}<ReportButton type="comment" id={c.id} /></div>
        </div>
      </div>
      {kids(c.id).map((k) => <C key={k.id} c={k} depth={depth + 1} />)}
    </div>
  );
  return (
    <div className="stack">
      {user ? (
        <form className="stack" onSubmit={async (e) => { e.preventDefault(); await onPost(body, replyTo); setBody(''); setReplyTo(null); }}>
          {replyTo && <div className="small muted">Respondendo a um comentário · <button type="button" className="btn sm ghost" onClick={() => setReplyTo(null)}>cancelar</button></div>}
          <textarea className="input" value={body} onChange={(e) => setBody(e.target.value)} placeholder="Escreva um comentário…" maxLength={2000} style={{ minHeight: 70 }} />
          <div><button className="btn primary sm" disabled={!body.trim()}>Comentar</button></div>
        </form>
      ) : <div className="muted small"><Link to="/entrar">Entre</Link> para comentar.</div>}
      {roots.length ? roots.map((c) => <C key={c.id} c={c} />) : <div className="muted small">{emptyText}</div>}
    </div>
  );
}

export default function GameDetail() {
  const { slug } = useParams();
  const { user, refresh } = useAuth();
  const nav = useNavigate();
  const toast = useToast();
  const [params] = useSearchParams();
  const state = useLoad(() => api.get(`/games/${slug}`), [slug, user?.id]);
  const reviews = useLoad(() => api.get(`/games/${slug}/reviews`), [slug]);
  const comments = useLoad(() => api.get(`/games/${slug}/comments`), [slug]);
  const [tab, setTab] = useState('sobre');
  const [media, setMedia] = useState(null);
  const [rating, setRating] = useState(5);
  const [reviewBody, setReviewBody] = useState('');
  const [donate, setDonate] = useState(false);

  return (
    <Loader state={state}>
      {({ game, media: gallery, versions, updates, access, viewer, followers, achievements }) => {
        const mobile = isMobileDevice();
        const incompatible = (mobile && game.platforms === 'pc') || (!mobile && game.platforms === 'mobile');
        const toggle = async (list, on) => { await (on ? api.del(`/users/me/${list}/${game.id}`) : api.post(`/users/me/${list}/${game.id}`)); state.reload(); };
        return (
          <div className="fade-in">
            {params.get('compra') === 'sucesso' && <div className="info-box mb">Pagamento recebido pelo provedor. O jogo aparece na sua biblioteca assim que a confirmação chegar (geralmente em segundos).</div>}
            <div className="grid" style={{ gridTemplateColumns: 'minmax(0,1.6fr) minmax(280px,1fr)', alignItems: 'start' }}>
              <div className="stack">
                <div className="game-cover" style={{ borderRadius: 20, border: '1px solid var(--line-2)', aspectRatio: '16/8' }}>
                  {media?.kind === 'video_embed' ? <iframe src={media.url} title="Vídeo" style={{ width: '100%', height: '100%', border: 0 }} allow="encrypted-media; picture-in-picture" allowFullScreen sandbox="allow-scripts allow-same-origin allow-presentation" />
                    : (media?.url || game.coverUrl) ? <img src={media?.url || game.coverUrl} alt="" /> : <div style={{ display: 'grid', placeItems: 'center', height: '100%' }}><Icon name="gamepad" size={60} style={{ opacity: 0.3 }} /></div>}
                </div>
                {gallery.length > 0 && (
                  <div className="media-strip">
                    {game.coverUrl && <img src={game.coverUrl} alt="Capa" onClick={() => setMedia(null)} />}
                    {gallery.map((m) => (m.kind === 'video_embed'
                      ? <button key={m.id} className="card center" style={{ padding: 0, aspectRatio: '16/9', cursor: 'pointer' }} onClick={() => setMedia(m)}><Icon name="play" size={28} /><div className="tiny">Vídeo</div></button>
                      : <img key={m.id} src={m.url} alt="" onClick={() => setMedia(m)} />))}
                  </div>
                )}
              </div>
              <div className="card stack">
                <div className="row">{game.releaseStage !== 'released' && <span className="pill cyan">{STAGE_LABEL[game.releaseStage]}</span>}<span className="pill">{GENRE_LABEL[game.genre]}</span><span className="pill gold">Classificação {game.ageRating === 'L' ? 'Livre' : `${game.ageRating}+`}</span></div>
                <h1 style={{ margin: 0 }}>{game.title}</h1>
                <p className="muted">{game.shortDescription}</p>
                <div className="row small">
                  <Link to={game.studio ? `/estudios/${game.studio.slug}` : `/u/${game.creator.username}`} className="row"><Avatar user={game.creator} size={26} /> {game.studio?.name || game.creator.displayName}</Link>
                  <span className="muted">· {followers} seguidores</span>
                </div>
                <div className="row"><Stars value={game.rating.avg} /><span className="small muted">{game.rating.count} avaliações</span></div>
                <div className="small stack" style={{ gap: 4 }}>
                  <div><Icon name={game.platforms === 'mobile' ? 'phone' : 'monitor'} size={14} /> {PLATFORM_LABEL[game.platforms]}</div>
                  <div><Icon name="users" size={14} /> {game.modes.map((m) => MODE_LABEL[m]).join(' · ')}{game.maxPlayers > 1 ? ` · até ${game.maxPlayers} jogadores` : ''}</div>
                </div>
                {incompatible && <div className="warn-box">Este jogo foi marcado pelo criador como compatível apenas com {PLATFORM_LABEL[game.platforms]}. Pode não funcionar neste dispositivo.</div>}
                <div className="kpi">{game.priceCents ? brl(game.priceCents) : 'Grátis'}</div>
                {access.canPlay ? (
                  <Link className="btn primary lg" to={user ? `/jogo/${game.slug}/jogar` : `/entrar?next=/jogo/${game.slug}/jogar`}><Icon name="play" /> {access.isManager && game.status !== 'published' ? 'Testar build' : 'Jogar no navegador'}</Link>
                ) : access.reason === 'purchase_required' ? (
                  <div className="stack">
                    {game.acceptsCredits && <ActionButton className="btn primary lg" ok="Jogo adicionado à sua biblioteca!" onClick={async () => { if (!user) return nav('/entrar'); await api.post(`/payments/games/${game.id}/buy`, { method: 'credits' }); await refresh(); state.reload(); }}><Icon name="coin" /> Comprar com créditos NEXPLAY</ActionButton>}
                    <ActionButton className="btn lg" onClick={async () => { if (!user) return nav('/entrar'); const d = await api.post(`/payments/games/${game.id}/buy`, { method: 'card' }); window.location.href = d.url; }}>Comprar com cartão</ActionButton>
                    {user && <span className="tiny muted">Seus créditos: {brl(user.creditCents)}. Créditos só podem ser usados dentro da NEXPLAY.</span>}
                  </div>
                ) : access.reason === 'beta_required' ? (
                  access.betaStatus === 'requested' ? <div className="info-box">Pedido de acesso ao beta enviado. O criador vai analisar.</div>
                    : <ActionButton className="btn primary" ok="Pedido enviado!" onClick={async () => { if (!user) return nav('/entrar'); await api.post(`/games/${game.id}/beta/request`); state.reload(); }}>Pedir acesso ao teste beta</ActionButton>
                ) : access.reason === 'no_build' ? <div className="info-box">Ainda não há versão jogável. Siga o jogo para receber novidades.</div> : null}
                {versions.some((v) => v.has_download) && access.canPlay && <a className="btn" href={`/api/games/${game.id}/download/${versions.find((v) => v.has_download).id}`}><Icon name="download" /> Baixar ({versions.find((v) => v.has_download).version})</a>}
                {user && viewer && (
                  <div className="row">
                    <button className="btn sm" onClick={() => toggle('wishlist', viewer.wishlisted)}><Icon name="bookmark" /> {viewer.wishlisted ? 'Na lista de desejos' : 'Lista de desejos'}</button>
                    <button className="btn sm" onClick={() => toggle('favorites', viewer.favorited)}><Icon name="heart" /> {viewer.favorited ? 'Favorito' : 'Favoritar'}</button>
                    <button className="btn sm" onClick={async () => { await api.post(`/games/${game.id}/follow`, { follow: !viewer.following }); state.reload(); }}><Icon name="bell" /> {viewer.following ? 'Seguindo' : 'Seguir'}</button>
                  </div>
                )}
                <div className="row">
                  {game.acceptsDonations && <button className="btn sm" onClick={() => setDonate(true)}><Icon name="heart" /> Apoiar o criador</button>}
                  {access.isManager && <Link className="btn sm" to={`/criador/jogos/${game.id}`}><Icon name="settings" /> Gerenciar</Link>}
                  {user && <ReportButton type="game" id={game.id} />}
                </div>
              </div>
            </div>

            <Tabs value={tab} onChange={setTab} tabs={[['sobre', 'Sobre'], ['avaliacoes', `Avaliações (${game.rating.count})`], ['comentarios', 'Comentários'], ['novidades', `Novidades (${updates.length})`], ['versoes', 'Versões']]} />
            {tab === 'sobre' && (
              <div className="grid cols-2">
                <div className="card"><h3>Descrição</h3><p style={{ whiteSpace: 'pre-wrap' }}>{game.description || 'Sem descrição.'}</p>{game.expectedRelease && <p className="muted">Previsão de lançamento: {game.expectedRelease}</p>}</div>
                <div className="stack">
                  <div className="card"><h3>Controles</h3><p style={{ whiteSpace: 'pre-wrap' }} className="small">{game.controls || 'Não informado.'}</p></div>
                  {achievements.length > 0 && <div className="card"><h3>Conquistas do jogo</h3>{achievements.map((a) => <div key={a.code} className="small"><b>{a.name}</b> <span className="muted">— {a.description}</span></div>)}</div>}
                </div>
              </div>
            )}
            {tab === 'avaliacoes' && (
              <div className="stack">
                {user && game.status === 'published' && !access.isManager && (
                  <div className="card stack">
                    <h3>{viewer?.review ? 'Editar sua avaliação' : 'Avaliar'}</h3>
                    <div className="row">{[1, 2, 3, 4, 5].map((n) => <button key={n} className="btn sm" style={{ color: n <= rating ? 'var(--gold)' : undefined }} onClick={() => setRating(n)}>★</button>)}</div>
                    <textarea className="input" placeholder="O que achou? (avaliações com 80+ caracteres contam para desafios)" value={reviewBody} onChange={(e) => setReviewBody(e.target.value)} maxLength={4000} />
                    <div><ActionButton className="btn primary" ok="Avaliação publicada!" onClick={async () => { await api.post(`/games/${game.id}/reviews`, { rating, body: reviewBody }); reviews.reload(); state.reload(); }}>Publicar</ActionButton> <span className="tiny muted">É preciso ter jogado pelo menos 5 minutos.</span></div>
                  </div>
                )}
                <Loader state={reviews}>{(d) => (d.reviews.length ? d.reviews.map((r) => (
                  <div key={r.id} className="card">
                    <div className="row between"><div className="row"><Avatar user={r.user} size={30} /><Link to={`/u/${r.user.username}`}><b>{r.user.displayName}</b></Link><Stars value={r.rating} /></div><span className="tiny muted">{ago(r.createdAt)}</span></div>
                    {r.body && <p className="mt" style={{ whiteSpace: 'pre-wrap' }}>{r.body}</p>}
                    {user && <ReportButton type="review" id={r.id} />}
                  </div>
                )) : <div className="muted">Nenhuma avaliação ainda.</div>)}</Loader>
              </div>
            )}
            {tab === 'comentarios' && <Loader state={comments}>{(d) => <Comments list={d.comments} onPost={async (body, parentId) => { try { await api.post(`/games/${game.id}/comments`, { body, parentId }); comments.reload(); } catch (e) { toast(e.message, 'error'); } }} />}</Loader>}
            {tab === 'novidades' && (
              <div className="stack">{updates.length ? updates.map((u) => <UpdateCard key={u.id} u={u} />) : <div className="muted">Sem publicações do desenvolvedor ainda.</div>}</div>
            )}
            {tab === 'versoes' && (
              <div className="card table-wrap"><table className="table"><thead><tr><th>Versão</th><th>Data</th><th>Notas</th>{access.isManager && <th>Status</th>}</tr></thead>
                <tbody>{versions.map((v) => <tr key={v.id}><td><b>{v.version}</b>{v.id === game.currentVersionId && <span className="pill green" style={{ marginLeft: 6 }}>atual</span>}</td><td>{new Date(v.created_at).toLocaleDateString('pt-BR')}</td><td style={{ whiteSpace: 'pre-wrap' }}>{v.changelog || '—'}</td>{access.isManager && <td className="small">verificação: {v.scan_status} · revisão: {v.review_status}</td>}</tr>)}</tbody></table>
                {!versions.length && <div className="muted">Nenhuma versão publicada.</div>}
              </div>
            )}
            {donate && <DonateModal game={game} onClose={() => setDonate(false)} />}
          </div>
        );
      }}
    </Loader>
  );
}

function UpdateCard({ u }) {
  const [open, setOpen] = useState(false);
  const comments = useLoad(() => (open ? api.get(`/games/updates/${u.id}/comments`) : Promise.resolve({ comments: [] })), [open]);
  return (
    <div className="card">
      <div className="row between"><div className="row"><span className="pill">{{ devlog: 'Devlog', news: 'Novidade', patch: 'Atualização' }[u.kind]}</span><h3 style={{ margin: 0 }}>{u.title}</h3></div><span className="tiny muted">{u.display_name} · {ago(u.created_at)}</span></div>
      {u.media_url && <img src={u.media_url} alt="" style={{ width: '100%', borderRadius: 12, marginTop: 10, maxHeight: 360, objectFit: 'cover' }} />}
      <p className="mt" style={{ whiteSpace: 'pre-wrap' }}>{u.body}</p>
      <button className="btn sm ghost" onClick={() => setOpen(!open)}><Icon name="chat" /> {open ? 'Ocultar comentários' : 'Comentários'}</button>
      {open && <div className="mt"><Loader state={comments}>{(d) => <Comments list={d.comments} onPost={async (body, parentId) => { await api.post(`/games/updates/${u.id}/comments`, { body, parentId }); comments.reload(); }} />}</Loader></div>}
    </div>
  );
}

function DonateModal({ game, onClose }) {
  const [amount, setAmount] = useState(10);
  return (
    <Modal title={`Apoiar ${game.title}`} onClose={onClose}>
      <div className="stack">
        <p className="muted small">Doações vão para o criador conforme as regras da plataforma. O pagamento é processado pelo provedor de pagamentos.</p>
        <Field label="Valor (R$)"><input className="input" type="number" min={2} max={1000} value={amount} onChange={(e) => setAmount(Number(e.target.value))} /></Field>
        <ActionButton className="btn primary" onClick={async () => { const d = await api.post(`/payments/games/${game.id}/donate`, { amountCents: Math.round(amount * 100) }); window.location.href = d.url; }}>Continuar para pagamento</ActionButton>
      </div>
    </Modal>
  );
}
