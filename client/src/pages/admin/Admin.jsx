// Painel administrativo. A interface apenas reflete permissões: todas as rotas são verificadas no servidor.
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { api, brl, nc } from '../../api.js';
import { useAuth } from '../../auth.jsx';
import { useLoad, Loader, Tabs, ActionButton, Field, PlanBadge, useToast } from '../../components/ui.jsx';

export default function Admin() {
  const { isStaff, isAdmin } = useAuth();
  const [tab, setTab] = useState('overview');
  if (!isStaff) return <div className="error-box">Acesso negado.</div>;
  const tabs = [['overview', 'Visão geral'], ['moderation', 'Moderação de jogos'], ['content', 'Comentários e avaliações'], ['reports', 'Denúncias'], ['users', 'Usuários'],
    ...(isAdmin ? [['curation', 'CURADORIA'], ['events', 'Eventos e Awards'], ['rewards', 'Rewards'], ['plans', 'Planos e concessões'], ['settings', 'Configurações'], ['audit', 'Auditoria']] : [])];
  return (
    <div>
      <h1>Administração</h1>
      <Tabs tabs={tabs} value={tab} onChange={setTab} />
      {tab === 'overview' && <Overview />}
      {tab === 'moderation' && <Moderation />}
      {tab === 'content' && <Content />}
      {tab === 'reports' && <Reports />}
      {tab === 'users' && <Users />}
      {tab === 'curation' && <Curation />}
      {tab === 'events' && <EventsAdmin />}
      {tab === 'rewards' && <RewardsAdmin />}
      {tab === 'plans' && <PlansAdmin />}
      {tab === 'settings' && <SettingsAdmin />}
      {tab === 'audit' && <Audit />}
    </div>
  );
}

function Overview() {
  const s = useLoad(() => api.get('/admin/overview'), []);
  return <Loader state={s}>{(d) => <div className="grid cols-4">{[['Usuários', d.users], ['Novos (24h)', d.newUsers24h], ['Ativos (24h)', d.activeUsers24h], ['Jogos publicados', d.games], ['Jogos em revisão', d.pendingGames], ['Versões em revisão', d.pendingVersions], ['Denúncias abertas', d.openReports], ['Resgates retidos', d.heldRedemptions], ['Comandos de IA (24h)', d.aiCommands24h], ...d.subscriptions.map((x) => [`Assinantes ${x.plan_code.toUpperCase()}`, x.n])].map(([l, v]) => <div key={l} className="card"><div className="small muted">{l}</div><div className="kpi">{v}</div></div>)}</div>}</Loader>;
}

function Moderation() {
  const s = useLoad(() => api.get('/admin/moderation/games'), []);
  const [notes, setNotes] = useState({});
  const decide = async (gid, decision) => { await api.post(`/admin/moderation/games/${gid}`, { decision, notes: notes[gid] || '' }); s.reload(); };
  return (
    <Loader state={s}>{(d) => (
      <div className="stack">
        <h2>Jogos aguardando revisão ({d.games.length})</h2>
        {d.games.map((g) => (
          <div key={g.id} className="card stack">
            <div className="row between"><div><b>{g.title}</b> <span className="muted small">por @{g.creator.username} · {g.releaseStage}</span></div><div className="row"><Link className="btn sm" to={`/jogo/${g.slug}`} target="_blank">Ver página</Link><Link className="btn sm" to={`/jogo/${g.slug}/jogar`} target="_blank">Testar build</Link></div></div>
            <p className="small" style={{ whiteSpace: 'pre-wrap' }}>{g.description.slice(0, 600)}</p>
            <div className="small">Direitos confirmados: <b>{g.rightsConfirmed ? 'sim' : 'não'}</b> · Classificação: {g.ageRating} · Modos: {g.modes.join(', ')}</div>
            {g.versions.map((v) => <div key={v.id} className={v.scan_status === 'passed' ? 'info-box' : 'warn-box'}>Versão {v.version} ({v.build_kind}, {v.file_count} arquivos) — verificação: <b>{v.scan_status}</b>{v.scan_report.findings?.length > 0 && <ul>{v.scan_report.findings.slice(0, 10).map((f, i) => <li key={i}>{f.file}: {f.rule} ({f.severity})</li>)}</ul>}</div>)}
            <textarea className="input" placeholder="Notas para o criador (obrigatório ao recusar)" value={notes[g.id] || ''} onChange={(e) => setNotes({ ...notes, [g.id]: e.target.value })} style={{ minHeight: 60 }} />
            <div className="row"><ActionButton className="btn primary" ok="Aprovado" onClick={() => decide(g.id, 'approve')}>Aprovar e publicar</ActionButton><ActionButton className="btn danger" onClick={() => decide(g.id, 'reject')}>Recusar</ActionButton></div>
          </div>
        ))}
        <h2>Atualizações de jogos publicados ({d.versions.filter((v) => ['published', 'in_development'].includes(v.gameStatus)).length})</h2>
        {d.versions.filter((v) => ['published', 'in_development'].includes(v.gameStatus)).map((v) => (
          <div key={v.id} className="card row between"><div><b>{v.title}</b> — versão {v.version} <span className="small muted">({v.scanStatus})</span><div className="small muted">{v.changelog}</div></div>
            <div className="row"><Link className="btn sm" to={`/jogo/${v.slug}/jogar?versao=${v.id}`} target="_blank">Testar</Link><ActionButton className="btn sm primary" onClick={async () => { await api.post(`/admin/moderation/versions/${v.id}`, { decision: 'approve' }); s.reload(); }}>Aprovar</ActionButton><ActionButton className="btn sm danger" onClick={async () => { await api.post(`/admin/moderation/versions/${v.id}`, { decision: 'reject', notes: prompt('Motivo') || '' }); s.reload(); }}>Recusar</ActionButton></div></div>
        ))}
        <RemoveGame />
      </div>
    )}</Loader>
  );
}

function RemoveGame() {
  const [id, setId] = useState('');
  const [notes, setNotes] = useState('');
  return <div className="card row"><b>Remover/restaurar jogo publicado</b><input className="input" style={{ width: 120 }} placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} /><input className="input" style={{ flex: 1 }} placeholder="Motivo" value={notes} onChange={(e) => setNotes(e.target.value)} /><ActionButton className="btn danger" ok="Removido" onClick={() => api.post(`/admin/moderation/games/${id}`, { decision: 'remove', notes })}>Remover</ActionButton><ActionButton className="btn" ok="Restaurado" onClick={() => api.post(`/admin/moderation/games/${id}`, { decision: 'restore' })}>Restaurar</ActionButton></div>;
}

function Content() {
  const s = useLoad(() => api.get('/admin/moderation/content'), []);
  const hide = async (type, id, hidden) => { await api.post(`/admin/moderation/${type}/${id}/hide`, { hidden }); s.reload(); };
  return (
    <Loader state={s}>{(d) => (
      <div className="grid cols-2">
        <div className="card table-wrap"><h3>Comentários recentes</h3><table className="table"><tbody>{d.comments.map((c) => <tr key={c.id} style={{ opacity: c.hidden ? 0.5 : 1 }}><td>@{c.username}</td><td>{c.body}</td><td><button className="btn sm" onClick={() => hide('comment', c.id, !c.hidden)}>{c.hidden ? 'Mostrar' : 'Ocultar'}</button></td></tr>)}</tbody></table></div>
        <div className="card table-wrap"><h3>Avaliações recentes</h3><table className="table"><tbody>{d.reviews.map((r) => <tr key={r.id} style={{ opacity: r.hidden ? 0.5 : 1 }}><td>@{r.username}<div className="tiny muted">{r.title} · {r.rating}★</div></td><td>{r.body}</td><td><button className="btn sm" onClick={() => hide('review', r.id, !r.hidden)}>{r.hidden ? 'Mostrar' : 'Ocultar'}</button></td></tr>)}</tbody></table></div>
      </div>
    )}</Loader>
  );
}

function Reports() {
  const [status, setStatus] = useState('open');
  const s = useLoad(() => api.get(`/admin/reports?status=${status}`), [status]);
  return (
    <div className="stack">
      <div className="row">{['open', 'resolved', 'dismissed'].map((x) => <button key={x} className={`btn sm ${status === x ? 'primary' : ''}`} onClick={() => setStatus(x)}>{{ open: 'Abertas', resolved: 'Resolvidas', dismissed: 'Descartadas' }[x]}</button>)}</div>
      <Loader state={s}>{(d) => (d.reports.length ? d.reports.map((r) => (
        <div key={r.id} className="card stack">
          <div className="row between"><b>{r.target_type} #{r.target_id} — {r.reason}</b><span className="small muted">por @{r.reporter} · {new Date(r.created_at).toLocaleString('pt-BR')}</span></div>
          {r.preview && <div className="info-box small">{r.preview}</div>}
          {r.details && <div className="small">{r.details}</div>}
          {r.status === 'open' && <div className="row">
            <ActionButton className="btn sm primary" onClick={async () => { await api.post(`/admin/reports/${r.id}`, { status: 'resolved', resolution: prompt('Medida tomada') || '' }); s.reload(); }}>Resolver</ActionButton>
            <ActionButton className="btn sm" onClick={async () => { await api.post(`/admin/reports/${r.id}`, { status: 'dismissed' }); s.reload(); }}>Descartar</ActionButton>
            {['comment', 'review'].includes(r.target_type) && <ActionButton className="btn sm danger" ok="Ocultado" onClick={() => api.post(`/admin/moderation/${r.target_type}/${r.target_id}/hide`, { hidden: true })}>Ocultar conteúdo</ActionButton>}
          </div>}
          {r.resolution && <div className="small muted">Resolução: {r.resolution}</div>}
        </div>
      )) : <p className="muted">Nenhuma denúncia.</p>)}</Loader>
    </div>
  );
}

function Users() {
  const { isAdmin } = useAuth();
  const [q, setQ] = useState('');
  const s = useLoad(() => api.get(`/admin/users?q=${encodeURIComponent(q)}`), [q]);
  const [sel, setSel] = useState(null);
  const toast = useToast();
  return (
    <div className="stack">
      <input className="input" placeholder="Buscar por usuário, nome ou e-mail" value={q} onChange={(e) => setQ(e.target.value)} />
      <Loader state={s}>{(d) => (
        <div className="card table-wrap"><table className="table"><thead><tr><th>Usuário</th><th>Plano</th><th>Papel</th><th>Status</th><th>NC</th><th /></tr></thead>
          <tbody>{d.users.map((u) => <tr key={u.id}><td><b>@{u.username}</b><div className="tiny muted">{u.email} {u.emailVerified ? '✓' : '(não confirmado)'} · IP cadastro {u.signupIp}</div></td><td><PlanBadge plan={u.plan} />{u.plan === 'free' && 'FREE'}</td><td>{u.role}</td><td>{u.status}</td><td>{u.nc}</td><td><button className="btn sm" onClick={() => setSel(u)}>Gerenciar</button></td></tr>)}</tbody></table></div>
      )}</Loader>
      {sel && (
        <div className="card stack">
          <div className="row between"><h3 style={{ margin: 0 }}>@{sel.username}</h3><button className="btn sm ghost" onClick={() => setSel(null)}>Fechar</button></div>
          <div className="row">
            {['active', 'suspended', 'banned'].map((st) => <ActionButton key={st} className={`btn sm ${st === 'banned' ? 'danger' : ''}`} ok="Atualizado" onClick={async () => { await api.patch(`/admin/users/${sel.id}`, { status: st }); s.reload(); }}>{{ active: 'Reativar', suspended: 'Suspender', banned: 'Banir' }[st]}</ActionButton>)}
            <ActionButton className="btn sm" ok="Atualizado" onClick={() => api.patch(`/admin/users/${sel.id}`, { emailVerified: true })}>Marcar e-mail confirmado</ActionButton>
            {isAdmin && ['user', 'moderator', 'admin'].map((r) => <ActionButton key={r} className="btn sm" ok="Papel alterado" onClick={async () => { await api.patch(`/admin/users/${sel.id}`, { role: r }); s.reload(); }}>Tornar {r}</ActionButton>)}
          </div>
          {isAdmin && <GrantForms user={sel} onDone={() => { s.reload(); toast('Concedido!', 'ok'); }} />}
        </div>
      )}
    </div>
  );
}

function GrantForms({ user, onDone }) {
  const [plan, setPlan] = useState({ plan: 'pro', period: '30', note: '' });
  const [coins, setCoins] = useState({ amount: 100, reason: '', kind: 'admin_grant' });
  return (
    <div className="grid cols-2">
      <div className="stack"><h3>Conceder plano</h3>
        <div className="row"><select className="input" style={{ width: 'auto' }} value={plan.plan} onChange={(e) => setPlan({ ...plan, plan: e.target.value })}><option value="pro">PRO</option><option value="deluxe">DELUXE</option></select>
          <select className="input" style={{ width: 'auto' }} value={plan.period} onChange={(e) => setPlan({ ...plan, period: e.target.value })}><option value="7">7 dias</option><option value="30">30 dias</option><option value="90">90 dias</option><option value="permanent">Permanente</option></select></div>
        <input className="input" placeholder="Observação" value={plan.note} onChange={(e) => setPlan({ ...plan, note: e.target.value })} />
        <ActionButton className="btn primary" onClick={async () => { await api.post('/admin/grants', { userId: user.id, ...plan }); onDone(); }}>Conceder gratuitamente</ActionButton>
      </div>
      <div className="stack"><h3>Conceder NC</h3>
        <div className="row"><input className="input" type="number" style={{ width: 120 }} value={coins.amount} onChange={(e) => setCoins({ ...coins, amount: Number(e.target.value) })} /><select className="input" style={{ width: 'auto' }} value={coins.kind} onChange={(e) => setCoins({ ...coins, kind: e.target.value })}><option value="admin_grant">Concessão</option><option value="competition">Prêmio de competição</option><option value="event">Evento</option><option value="community_goal">Meta da comunidade</option></select></div>
        <input className="input" placeholder="Motivo (obrigatório, fica auditado)" value={coins.reason} onChange={(e) => setCoins({ ...coins, reason: e.target.value })} />
        <ActionButton className="btn" onClick={async () => { await api.post('/admin/rewards/grant', { userId: user.id, ...coins }); onDone(); }}>Conceder NC</ActionButton>
      </div>
    </div>
  );
}

function Curation() {
  const s = useLoad(() => api.get('/admin/curation'), []);
  const [p, setP] = useState({ gameId: '', kind: 'nexplay_choice', headline: '', recommendation: '', startsOn: '', endsOn: '' });
  const [c, setC] = useState({ title: '', description: '' });
  const [items, setItems] = useState({});
  const KIND = { featured: 'Destaque', nexplay_choice: 'Escolha da NEXPLAY', game_of_day: 'Jogo do Dia', weekly: 'Destaques da Semana' };
  return (
    <Loader state={s}>{(d) => (
      <div className="stack">
        <div className="card stack"><h3>Nova escolha</h3>
          {!d.eligible.length && <div className="info-box">Ainda não há jogos publicados para escolher.</div>}
          <div className="grid cols-3">
            <Field label="Jogo"><select className="input" value={p.gameId} onChange={(e) => setP({ ...p, gameId: e.target.value })}><option value="">Escolha…</option>{d.eligible.map((g) => <option key={g.id} value={g.id}>{g.title}</option>)}</select></Field>
            <Field label="Categoria"><select className="input" value={p.kind} onChange={(e) => setP({ ...p, kind: e.target.value })}>{Object.entries(KIND).map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select></Field>
            <Field label="Título do destaque"><input className="input" value={p.headline} onChange={(e) => setP({ ...p, headline: e.target.value })} /></Field>
          </div>
          <Field label="Recomendação"><textarea className="input" value={p.recommendation} onChange={(e) => setP({ ...p, recommendation: e.target.value })} /></Field>
          <div className="grid cols-2"><Field label="Início (opcional)"><input className="input" type="date" value={p.startsOn} onChange={(e) => setP({ ...p, startsOn: e.target.value })} /></Field><Field label="Fim (opcional)"><input className="input" type="date" value={p.endsOn} onChange={(e) => setP({ ...p, endsOn: e.target.value })} /></Field></div>
          <ActionButton className="btn primary" ok="Escolha publicada" onClick={async () => { await api.post('/admin/curation/picks', { ...p, gameId: Number(p.gameId), startsOn: p.startsOn || null, endsOn: p.endsOn || null }); s.reload(); }}>Publicar escolha</ActionButton>
        </div>
        <div className="card table-wrap"><h3>Escolhas</h3><table className="table"><tbody>{d.picks.map((x) => <tr key={x.id} style={{ opacity: x.active ? 1 : 0.5 }}><td><b>{x.title}</b><div className="tiny muted">{KIND[x.kind]} {x.starts_on && `· ${x.starts_on} → ${x.ends_on || '…'}`}</div></td><td className="small">{x.headline}</td><td><div className="row"><button className="btn sm" onClick={async () => { await api.patch(`/admin/curation/picks/${x.id}`, { active: !x.active }); s.reload(); }}>{x.active ? 'Retirar do destaque' : 'Reativar'}</button><button className="btn sm danger" onClick={async () => { await api.del(`/admin/curation/picks/${x.id}`); s.reload(); }}>Excluir</button></div></td></tr>)}</tbody></table>{!d.picks.length && <p className="muted small">Nenhuma escolha.</p>}</div>
        <div className="card stack"><h3>Coleções</h3>
          <div className="row"><input className="input" style={{ flex: 1 }} placeholder="Título da coleção" value={c.title} onChange={(e) => setC({ ...c, title: e.target.value })} /><input className="input" style={{ flex: 2 }} placeholder="Descrição" value={c.description} onChange={(e) => setC({ ...c, description: e.target.value })} /><ActionButton className="btn" onClick={async () => { await api.post('/admin/curation/collections', c); setC({ title: '', description: '' }); s.reload(); }}>Criar</ActionButton></div>
          {d.collections.map((col) => (
            <div key={col.id} className="card stack" style={{ background: 'var(--bg-2)' }}>
              <div className="row between"><b>{col.title}</b><div className="row"><button className="btn sm" onClick={async () => { await api.patch(`/admin/curation/collections/${col.id}`, { active: !col.active }); s.reload(); }}>{col.active ? 'Desativar' : 'Ativar'}</button><button className="btn sm danger" onClick={async () => { await api.del(`/admin/curation/collections/${col.id}`); s.reload(); }}>Excluir</button></div></div>
              <div className="small">{col.items.map((i) => i.title).join(', ') || 'Vazia'}</div>
              <div className="row"><select className="input" style={{ width: 'auto' }} value={items[col.id] || ''} onChange={(e) => setItems({ ...items, [col.id]: e.target.value })}><option value="">Adicionar jogo…</option>{d.eligible.map((g) => <option key={g.id} value={g.id}>{g.title}</option>)}</select>
                <ActionButton className="btn sm" onClick={async () => { await api.patch(`/admin/curation/collections/${col.id}`, { items: [...col.items.map((i) => ({ gameId: i.game_id, note: i.note })), { gameId: Number(items[col.id]), note: '' }] }); s.reload(); }}>Adicionar</ActionButton></div>
            </div>
          ))}
        </div>
      </div>
    )}</Loader>
  );
}

function EventsAdmin() {
  const s = useLoad(() => api.get('/admin/events'), []);
  const now = new Date();
  const iso = (d) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
  const [v, setV] = useState({ kind: 'game_jam', title: '', description: '', theme: '', startsAt: iso(now), endsAt: iso(new Date(now.getTime() + 7 * 864e5)), votingEndsAt: iso(new Date(now.getTime() + 10 * 864e5)), ncParticipation: 100 });
  const [poll, setPoll] = useState({ question: '', options: '' });
  return (
    <div className="stack">
      <div className="card stack"><h3>Criar evento</h3>
        <div className="grid cols-3">
          <Field label="Tipo"><select className="input" value={v.kind} onChange={(e) => setV({ ...v, kind: e.target.value })}><option value="game_jam">Game Jam</option><option value="competition">Competição</option><option value="festival">NEXPLAY FESTIVAL</option><option value="awards">NEXPLAY AWARDS</option><option value="event">Evento</option><option value="challenge">Desafio</option></select></Field>
          <Field label="Título"><input className="input" value={v.title} onChange={(e) => setV({ ...v, title: e.target.value })} /></Field>
          <Field label="Tema"><input className="input" value={v.theme} onChange={(e) => setV({ ...v, theme: e.target.value })} /></Field>
          <Field label="Início"><input className="input" type="datetime-local" value={v.startsAt} onChange={(e) => setV({ ...v, startsAt: e.target.value })} /></Field>
          <Field label="Fim"><input className="input" type="datetime-local" value={v.endsAt} onChange={(e) => setV({ ...v, endsAt: e.target.value })} /></Field>
          <Field label="Fim da votação"><input className="input" type="datetime-local" value={v.votingEndsAt} onChange={(e) => setV({ ...v, votingEndsAt: e.target.value })} /></Field>
        </div>
        <Field label="Descrição e regras"><textarea className="input" value={v.description} onChange={(e) => setV({ ...v, description: e.target.value })} /></Field>
        <Field label="NC por participação (enviar jogo ou votar)" hint="Respeita o teto semanal de ganhos."><input className="input" type="number" value={v.ncParticipation} onChange={(e) => setV({ ...v, ncParticipation: Number(e.target.value) })} /></Field>
        <p className="small muted">NEXPLAY AWARDS cria automaticamente as categorias Melhor Jogo, Melhor Multiplayer, Melhor Criador e Melhor Jogo Independente.</p>
        <ActionButton className="btn primary" ok="Evento criado" onClick={async () => { await api.post('/admin/events', { ...v, startsAt: new Date(v.startsAt).toISOString(), endsAt: new Date(v.endsAt).toISOString(), votingEndsAt: v.votingEndsAt ? new Date(v.votingEndsAt).toISOString() : null }); s.reload(); }}>Criar</ActionButton>
      </div>
      <Loader state={s}>{(d) => d.events.map((e) => <AwardsManager key={e.id} e={e} reload={s.reload} />)}</Loader>
      <div className="card stack"><h3>Nova votação da comunidade</h3><input className="input" placeholder="Pergunta" value={poll.question} onChange={(e) => setPoll({ ...poll, question: e.target.value })} /><input className="input" placeholder="Opções separadas por ;" value={poll.options} onChange={(e) => setPoll({ ...poll, options: e.target.value })} /><ActionButton className="btn" ok="Votação publicada" onClick={() => api.post('/admin/polls', { question: poll.question, options: poll.options.split(';').map((x) => x.trim()).filter(Boolean) })}>Publicar votação</ActionButton></div>
    </div>
  );
}

function AwardsManager({ e, reload }) {
  const detail = useLoad(() => api.get(`/community/events/${e.slug}`).catch(() => null), [e.slug]);
  const [nominee, setNominee] = useState({});
  return (
    <div className="card stack">
      <div className="row between"><div><b>{e.title}</b> <span className="pill">{e.kind}</span> <span className="small muted">{e.status}</span></div>
        <div className="row"><Link className="btn sm" to={`/eventos/${e.slug}`}>Abrir</Link>{['scheduled', 'draft'].includes(e.status) && <button className="btn sm danger" onClick={async () => { await api.patch(`/admin/events/${e.id}`, { status: 'canceled' }); reload(); }}>Cancelar</button>}<button className="btn sm" onClick={async () => { await api.patch(`/admin/events/${e.id}`, { status: 'finished' }); reload(); }}>Encerrar</button></div></div>
      <Loader state={detail}>{(d) => d && (
        <>
          {d.categories.map((c) => (
            <div key={c.id} className="small"><b>{c.name}</b> ({c.nomineeType}): {c.nominees.map((n) => <span key={n.id} className="pill" style={{ margin: 2 }}>{n.subject?.title || n.subject?.displayName || n.subject?.name} <button className="btn sm ghost" title="Definir vencedor" onClick={async () => { await api.post(`/admin/awards/categories/${c.id}/winner`, { nomineeId: n.id }); detail.reload(); }}>🏆</button><button className="btn sm ghost" onClick={async () => { await api.del(`/admin/awards/nominees/${n.id}`); detail.reload(); }}>✕</button></span>)}
              <span className="row"><input className="input" style={{ width: 140 }} placeholder={`ID do ${c.nomineeType === 'game' ? 'jogo' : c.nomineeType === 'user' ? 'usuário' : 'estúdio'}`} value={nominee[c.id] || ''} onChange={(x) => setNominee({ ...nominee, [c.id]: x.target.value })} /><ActionButton className="btn sm" onClick={async () => { await api.post(`/admin/awards/categories/${c.id}/nominees`, { nomineeId: Number(nominee[c.id]) }); detail.reload(); }}>Indicar</ActionButton></span>
            </div>
          ))}
          {d.entries.length > 0 && <div className="small">Inscrições: {d.entries.map((x) => <span key={x.entryId} className="pill" style={{ margin: 2 }}>{x.game.title} {x.votes !== undefined && `(${x.votes})`} <input style={{ width: 40 }} className="input" placeholder="#" onBlur={async (ev) => { if (ev.target.value) { await api.post(`/admin/events/${e.id}/entries/${x.entryId}/rank`, { rank: Number(ev.target.value) }); detail.reload(); } }} /></span>)}</div>}
        </>
      )}</Loader>
    </div>
  );
}

function RewardsAdmin() {
  const s = useLoad(() => api.get('/admin/rewards'), []);
  const [item, setItem] = useState({ code: '', kind: 'badge', name: '', description: '', priceNc: 500, data: '{"icon":"⭐"}' });
  const [ch, setCh] = useState({ code: '', title: '', description: '', period: 'weekly', metric: 'play_minutes', target: 60, ncReward: 50 });
  return (
    <Loader state={s}>{(d) => (
      <div className="stack">
        <div className="grid cols-3"><div className="card"><div className="small muted">NC emitidos</div><div className="kpi">{nc(d.totals.issued)}</div></div><div className="card"><div className="small muted">NC gastos/convertidos</div><div className="kpi">{nc(d.totals.spent)}</div></div><div className="card"><div className="small muted">Conversão</div>{d.tiers.map((t) => <div key={t.nc} className="small">{nc(t.nc)} → {brl(t.credit_cents)}</div>)}</div></div>
        <div className="card table-wrap"><h3>Resgates (retidos primeiro)</h3><table className="table"><tbody>{d.redemptions.map((r) => <tr key={r.id}><td>@{r.username}<div className="tiny muted">IP {r.ip} · cadastro {r.signup_ip}</div></td><td>{nc(r.tier_nc)} → {brl(r.credit_cents)}</td><td>{r.status}{r.risk_flags.length > 0 && <div className="tiny" style={{ color: '#fde68a' }}>{r.risk_flags.join(', ')}</div>}</td><td>{r.status === 'held' && <div className="row"><ActionButton className="btn sm primary" onClick={async () => { await api.post(`/admin/rewards/redemptions/${r.id}`, { approve: true }); s.reload(); }}>Aprovar</ActionButton><ActionButton className="btn sm danger" onClick={async () => { await api.post(`/admin/rewards/redemptions/${r.id}`, { approve: false }); s.reload(); }}>Recusar (devolve NC)</ActionButton></div>}</td></tr>)}</tbody></table>{!d.redemptions.length && <p className="muted small">Nenhum resgate.</p>}</div>
        <div className="card table-wrap"><h3>Loja de recompensas (preços)</h3><table className="table"><tbody>{d.items.map((i) => <tr key={i.id}><td><b>{i.name}</b><div className="tiny muted">{i.code} · {i.kind}{i.required_plan ? ` · ${i.required_plan}` : ''}</div></td><td><input className="input" type="number" defaultValue={i.price_nc} style={{ width: 110 }} onBlur={async (e) => { if (Number(e.target.value) !== i.price_nc) { await api.patch(`/admin/rewards/items/${i.id}`, { priceNc: Number(e.target.value) }); s.reload(); } }} /></td><td><button className="btn sm" onClick={async () => { await api.patch(`/admin/rewards/items/${i.id}`, { active: !i.active }); s.reload(); }}>{i.active ? 'Desativar' : 'Ativar'}</button></td></tr>)}</tbody></table>
          <div className="grid cols-3 mt"><input className="input" placeholder="código" value={item.code} onChange={(e) => setItem({ ...item, code: e.target.value })} /><select className="input" value={item.kind} onChange={(e) => setItem({ ...item, kind: e.target.value })}>{['frame', 'avatar', 'theme', 'effect', 'badge', 'exclusive'].map((k) => <option key={k}>{k}</option>)}</select><input className="input" placeholder="nome" value={item.name} onChange={(e) => setItem({ ...item, name: e.target.value })} /><input className="input" placeholder="descrição" value={item.description} onChange={(e) => setItem({ ...item, description: e.target.value })} /><input className="input" type="number" value={item.priceNc} onChange={(e) => setItem({ ...item, priceNc: Number(e.target.value) })} /><input className="input" placeholder='dados JSON {"icon":"⭐"}' value={item.data} onChange={(e) => setItem({ ...item, data: e.target.value })} /></div>
          <ActionButton className="btn mt" ok="Item criado" onClick={async () => { await api.post('/admin/rewards/items', { ...item, data: JSON.parse(item.data || '{}') }); s.reload(); }}>Criar item</ActionButton>
        </div>
        <div className="card table-wrap"><h3>Desafios</h3><table className="table"><tbody>{d.challenges.map((c) => <tr key={c.id}><td><b>{c.title}</b><div className="tiny muted">{c.period} · {c.metric} ≥ {c.target}</div></td><td><input className="input" type="number" defaultValue={c.nc_reward} style={{ width: 100 }} onBlur={async (e) => { await api.patch(`/admin/rewards/challenges/${c.id}`, { ncReward: Number(e.target.value) }); }} /> NC</td><td><button className="btn sm" onClick={async () => { await api.patch(`/admin/rewards/challenges/${c.id}`, { active: !c.active }); s.reload(); }}>{c.active ? 'Desativar' : 'Ativar'}</button></td></tr>)}</tbody></table>
          <div className="grid cols-3 mt"><input className="input" placeholder="código" value={ch.code} onChange={(e) => setCh({ ...ch, code: e.target.value })} /><input className="input" placeholder="título" value={ch.title} onChange={(e) => setCh({ ...ch, title: e.target.value })} /><input className="input" placeholder="descrição" value={ch.description} onChange={(e) => setCh({ ...ch, description: e.target.value })} /><select className="input" value={ch.period} onChange={(e) => setCh({ ...ch, period: e.target.value })}><option value="weekly">semanal</option><option value="event">evento</option><option value="community">comunidade</option><option value="once">uma vez</option></select><select className="input" value={ch.metric} onChange={(e) => setCh({ ...ch, metric: e.target.value })}>{['play_minutes', 'distinct_games', 'reviews_written', 'comments_written', 'event_participation', 'achievements_unlocked'].map((m) => <option key={m}>{m}</option>)}</select><div className="row"><input className="input" type="number" value={ch.target} onChange={(e) => setCh({ ...ch, target: Number(e.target.value) })} /><input className="input" type="number" value={ch.ncReward} onChange={(e) => setCh({ ...ch, ncReward: Number(e.target.value) })} /></div></div>
          <ActionButton className="btn mt" ok="Desafio criado" onClick={async () => { await api.post('/admin/rewards/challenges', ch); s.reload(); }}>Criar desafio</ActionButton>
        </div>
      </div>
    )}</Loader>
  );
}

function PlansAdmin() {
  const plans = useLoad(() => api.get('/admin/plans'), []);
  const grants = useLoad(() => api.get('/admin/grants'), []);
  return (
    <div className="stack">
      <Loader state={plans}>{(d) => (
        <div className="grid cols-3">{d.plans.map((p) => (
          <div key={p.code} className="card stack"><h3>{p.name}</h3>
            {[['priceCents', 'Preço (centavos)', p.price_cents], ...(p.code === 'free' ? [['aiDailyCommands', 'Comandos de IA/dia (PRO = 4×)', p.ai_daily_commands]] : []), ['aiPerMinute', 'IA por minuto (antiabuso)', p.ai_per_minute], ['storageMb', 'Armazenamento (MB)', p.storage_mb], ['versionHistory', 'Histórico de versões', p.version_history], ['maxProjects', 'Projetos', p.max_projects], ['maxPublishedGames', 'Jogos publicados', p.max_published_games]].map(([k, l, val]) => (
              <Field key={k} label={l}><input className="input" type="number" defaultValue={val} onBlur={async (e) => { if (Number(e.target.value) !== val) { await api.patch(`/admin/plans/${p.code}`, { [k]: Number(e.target.value) }); plans.reload(); } }} /></Field>
            ))}
            {p.code !== 'free' && <div className="small muted">IA/dia: {p.ai_daily_commands ?? 'sem limite de comandos'}</div>}
          </div>
        ))}</div>
      )}</Loader>
      <Loader state={grants}>{(d) => (
        <div className="card table-wrap"><h3>Histórico de assinaturas e concessões</h3><table className="table"><thead><tr><th>Usuário</th><th>Plano</th><th>Origem</th><th>Status</th><th>Período</th><th /></tr></thead>
          <tbody>{d.grants.map((g) => <tr key={g.id}><td>@{g.username}</td><td>{g.plan_code.toUpperCase()}</td><td>{g.source === 'admin_grant' ? `concedido por @${g.granted_by_username}` : 'pagamento'}</td><td>{g.status}</td><td className="small">{new Date(g.starts_at).toLocaleDateString('pt-BR')} → {g.ends_at ? new Date(g.ends_at).toLocaleDateString('pt-BR') : 'permanente'}<div className="tiny muted">{g.note}</div></td>
            <td>{g.source === 'admin_grant' && <div className="row"><select className="input" style={{ width: 'auto' }} id={`p${g.id}`} defaultValue="30"><option value="7">7d</option><option value="30">30d</option><option value="90">90d</option><option value="permanent">perm.</option></select><ActionButton className="btn sm" onClick={async () => { await api.post(`/admin/grants/${g.id}/renew`, { period: document.getElementById(`p${g.id}`).value }); grants.reload(); }}>Renovar</ActionButton>{g.status === 'active' && <ActionButton className="btn sm danger" onClick={async () => { await api.post(`/admin/grants/${g.id}/revoke`, { note: prompt('Motivo') || '' }); grants.reload(); }}>Revogar</ActionButton>}</div>}</td></tr>)}</tbody></table>
          <p className="small muted">Para conceder PRO/DELUXE a um usuário, use a aba Usuários → Gerenciar.</p></div>
      )}</Loader>
    </div>
  );
}

function SettingsAdmin() {
  const s = useLoad(() => api.get('/admin/settings'), []);
  return (
    <Loader state={s}>{(d) => (
      <div className="grid cols-2">
        <div className="card stack"><h3>Comissão da plataforma</h3><Field label="Comissão sobre vendas e doações (%)" hint="0% até ser definida."><input className="input" type="number" step="0.1" defaultValue={d.platformFeeBps / 100} onBlur={async (e) => { await api.patch('/admin/settings', { platformFeeBps: Math.round(Number(e.target.value) * 100) }); s.reload(); }} /></Field></div>
        <div className="card stack"><h3>Regras antifraude do REWARDS</h3>
          {Object.entries(d.rewards).map(([k, v]) => <Field key={k} label={k}>{typeof v === 'boolean' ? <select className="input" defaultValue={String(v)} onChange={async (e) => { await api.patch('/admin/settings', { rewards: { [k]: e.target.value === 'true' } }); }}><option value="true">sim</option><option value="false">não</option></select> : <input className="input" type="number" defaultValue={v} onBlur={async (e) => { await api.patch('/admin/settings', { rewards: { [k]: Number(e.target.value) } }); }} />}</Field>)}
        </div>
      </div>
    )}</Loader>
  );
}

function Audit() {
  const [f, setF] = useState('');
  const s = useLoad(() => api.get(`/admin/audit?action=${encodeURIComponent(f)}`), [f]);
  return (
    <div className="stack"><input className="input" placeholder="Filtrar por ação (ex.: plans., rewards., moderation.)" value={f} onChange={(e) => setF(e.target.value)} />
      <Loader state={s}>{(d) => <div className="card table-wrap"><table className="table"><tbody>{d.entries.map((e) => <tr key={e.id}><td className="small">{new Date(e.created_at).toLocaleString('pt-BR')}</td><td>@{e.username || 'sistema'}</td><td><b>{e.action}</b><div className="tiny muted">{e.target_type} {e.target_id}</div></td><td className="tiny" style={{ maxWidth: 420, wordBreak: 'break-word' }}>{e.details}</td><td className="tiny muted">{e.ip}</td></tr>)}</tbody></table></div>}</Loader>
    </div>
  );
}
