// Criação/edição de jogo, envio de builds, mídia, devlogs, beta, conquistas e estatísticas.
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api, GENRE_LABEL, MODE_LABEL, PLATFORM_LABEL, STAGE_LABEL } from '../api.js';
import { useLoad, Loader, Field, ActionButton, Tabs, useToast, Avatar } from '../components/ui.jsx';
import { Icon } from '../components/icons.jsx';

const EMPTY = { title: '', shortDescription: '', description: '', genre: 'acao', tags: [], ageRating: 'L', platforms: 'both', controls: '', modes: ['solo'], maxPlayers: 1, priceCents: 0, acceptsCredits: true, acceptsDonations: false, releaseStage: 'released', expectedRelease: null, betaMode: 'closed', studioId: null, rightsConfirmed: false };

export default function GameEditor() {
  const { id } = useParams();
  const isNew = !id;
  const s = useLoad(() => (isNew ? Promise.resolve(null) : api.get(`/games/${id}`)), [id]);
  return <Loader state={isNew ? { loading: false, data: { new: true } } : s}>{(d) => <Editor key={id || 'new'} data={d} reload={s.reload} />}</Loader>;
}

function Editor({ data, reload }) {
  const nav = useNavigate();
  const toast = useToast();
  const g = data.game;
  const [tab, setTab] = useState('info');
  const [v, setV] = useState(g ? {
    title: g.title, shortDescription: g.shortDescription, description: g.description, genre: g.genre, tags: g.tags, ageRating: g.ageRating, platforms: g.platforms,
    controls: g.controls, modes: g.modes, maxPlayers: g.maxPlayers, priceCents: g.priceCents, acceptsCredits: g.acceptsCredits, acceptsDonations: g.acceptsDonations,
    releaseStage: g.releaseStage, expectedRelease: g.expectedRelease, betaMode: g.betaMode, studioId: g.studio ? undefined : null, rightsConfirmed: g.rightsConfirmed,
  } : EMPTY);
  const studios = useLoad(() => api.get('/studios/mine'), []);
  const set = (k) => (e) => setV({ ...v, [k]: e?.target ? (e.target.type === 'checkbox' ? e.target.checked : e.target.value) : e });
  const toggleMode = (m) => setV((s) => ({ ...s, modes: s.modes.includes(m) ? s.modes.filter((x) => x !== m) : [...s.modes, m] }));
  const save = async () => {
    const body = { ...v, maxPlayers: Number(v.maxPlayers), priceCents: Number(v.priceCents), expectedRelease: v.expectedRelease || null };
    if (body.studioId === undefined) delete body.studioId;
    if (g) { await api.patch(`/games/${g.id}`, body); toast('Salvo!', 'ok'); reload(); }
    else { const d = await api.post('/games', body); nav(`/criador/jogos/${d.game.id}`); }
  };
  const statusText = g && { draft: 'Rascunho — envie para revisão quando estiver pronto.', pending_review: 'Em revisão pela moderação.', published: 'Publicado no catálogo.', in_development: 'Visível em LANÇAMENTOS.', rejected: `Recusado: ${g.moderationNotes || ''}`, removed: 'Removido.' }[g.status];
  return (
    <div className="stack">
      <div className="row between"><h1 style={{ margin: 0 }}>{g ? g.title : 'Novo jogo'}</h1>{g && <div className="row"><Link className="btn" to={`/jogo/${g.slug}`}><Icon name="eye" /> Ver página</Link>{['draft', 'rejected'].includes(g.status) && <ActionButton className="btn primary" ok="Enviado para revisão!" onClick={async () => { await api.post(`/games/${g.id}/submit`); reload(); }}>Enviar para revisão</ActionButton>}</div>}</div>
      {g && <div className={g.status === 'rejected' ? 'error-box' : 'info-box'}>{statusText}</div>}
      {g && <Tabs value={tab} onChange={setTab} tabs={[['info', 'Informações'], ['midia', 'Capa e mídia'], ['builds', 'Builds e versões'], ['novidades', 'Devlogs e novidades'], ['beta', 'Testes beta'], ['conquistas', 'Conquistas'], ['stats', 'Estatísticas']]} />}
      {tab === 'info' && (
        <div className="card stack">
          <div className="grid cols-2">
            <Field label="Título"><input className="input" value={v.title} onChange={set('title')} maxLength={80} /></Field>
            <Field label="Gênero"><select className="input" value={v.genre} onChange={set('genre')}>{Object.entries(GENRE_LABEL).filter(([k]) => k !== 'vazio').map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select></Field>
          </div>
          <Field label="Descrição curta"><input className="input" value={v.shortDescription} onChange={set('shortDescription')} maxLength={200} /></Field>
          <Field label="Descrição completa" hint="Mínimo de 50 caracteres para publicar."><textarea className="input" value={v.description} onChange={set('description')} style={{ minHeight: 160 }} /></Field>
          <Field label="Controles"><textarea className="input" value={v.controls} onChange={set('controls')} placeholder="Ex.: WASD para mover, espaço para pular. No celular: joystick virtual." /></Field>
          <div className="grid cols-3">
            <Field label="Classificação indicativa"><select className="input" value={v.ageRating} onChange={set('ageRating')}>{['L', '10', '12', '14', '16', '18'].map((a) => <option key={a} value={a}>{a === 'L' ? 'Livre' : `${a} anos`}</option>)}</select></Field>
            <Field label="Compatibilidade"><select className="input" value={v.platforms} onChange={set('platforms')}>{Object.entries(PLATFORM_LABEL).map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select></Field>
            <Field label="Tags (separadas por vírgula)"><input className="input" value={v.tags.join(', ')} onChange={(e) => setV({ ...v, tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean).slice(0, 10) })} /></Field>
          </div>
          <Field label="Modos de jogo (declare apenas o que o jogo realmente suporta)">
            <div className="row">{Object.entries(MODE_LABEL).map(([k, l]) => <label key={k} className="check"><input type="checkbox" checked={v.modes.includes(k)} onChange={() => toggleMode(k)} /> {l}</label>)}</div>
          </Field>
          <div className="grid cols-3">
            <Field label="Máximo de jogadores"><input className="input" type="number" min={1} max={256} value={v.maxPlayers} onChange={set('maxPlayers')} /></Field>
            <Field label="Preço (R$)" hint="0 = grátis"><input className="input" type="number" min={0} step="0.01" value={v.priceCents / 100} onChange={(e) => setV({ ...v, priceCents: Math.round(Number(e.target.value) * 100) })} /></Field>
            <Field label="Estúdio"><Loader state={studios}>{(d) => <select className="input" value={v.studioId ?? ''} onChange={(e) => setV({ ...v, studioId: e.target.value ? Number(e.target.value) : null })}><option value="">{g?.studio ? `${g.studio.name} (atual)` : 'Pessoal'}</option>{d.studios.filter((x) => ['owner', 'admin', 'developer'].includes(x.myRole)).map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}</select>}</Loader></Field>
          </div>
          <div className="grid cols-3">
            <Field label="Estágio"><select className="input" value={v.releaseStage} onChange={set('releaseStage')}>{Object.entries(STAGE_LABEL).map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select></Field>
            <Field label="Previsão de lançamento" hint="AAAA-MM ou AAAA-MM-DD"><input className="input" value={v.expectedRelease || ''} onChange={set('expectedRelease')} placeholder="2027-03" /></Field>
            <Field label="Teste beta"><select className="input" value={v.betaMode} onChange={set('betaMode')}><option value="closed">Fechado (aprovação)</option><option value="open">Aberto a todos logados</option><option value="none">Sem beta</option></select></Field>
          </div>
          <label className="check"><input type="checkbox" checked={v.acceptsCredits} onChange={set('acceptsCredits')} /> Participar de compras com créditos NEXPLAY</label>
          <label className="check"><input type="checkbox" checked={v.acceptsDonations} onChange={set('acceptsDonations')} /> Aceitar doações</label>
          <label className="check"><input type="checkbox" checked={v.rightsConfirmed} onChange={set('rightsConfirmed')} /> <span>Confirmo que desenvolvi este jogo ou tenho autorização para distribuí-lo, e que ele segue as <Link to="/termos" target="_blank">regras da NEXPLAY</Link>.</span></label>
          <div><ActionButton className="btn primary" onClick={save}>{g ? 'Salvar alterações' : 'Criar jogo'}</ActionButton></div>
        </div>
      )}
      {g && tab === 'midia' && <MediaTab data={data} reload={reload} />}
      {g && tab === 'builds' && <BuildsTab data={data} reload={reload} />}
      {g && tab === 'novidades' && <UpdatesTab g={g} reload={reload} updates={data.updates} />}
      {g && tab === 'beta' && <BetaTab g={g} />}
      {g && tab === 'conquistas' && <AchievementsTab g={g} list={data.achievements} reload={reload} />}
      {g && tab === 'stats' && <StatsTab g={g} />}
    </div>
  );
}

function MediaTab({ data, reload }) {
  const g = data.game;
  const [video, setVideo] = useState('');
  const up = async (path, files, field = 'file') => { const f = new FormData(); for (const file of files) f.append(field, file); await api.upload(path, f); reload(); };
  return (
    <div className="grid cols-2">
      <div className="card stack"><h3>Capa</h3>{g.coverUrl && <img src={g.coverUrl} alt="" style={{ width: '100%', borderRadius: 12 }} />}<label className="btn"><Icon name="upload" /> Enviar capa (16:10 recomendado)<input type="file" accept="image/png,image/jpeg,image/webp" hidden onChange={(e) => e.target.files[0] && up(`/games/${g.id}/cover`, [e.target.files[0]])} /></label></div>
      <div className="card stack"><h3>Imagens e vídeos</h3>
        <div className="media-strip">{data.media.map((m) => <div key={m.id} className="stack" style={{ gap: 4 }}>{m.kind === 'video_embed' ? <div className="card center small">Vídeo</div> : <img src={m.url} alt="" />}<ActionButton className="btn sm danger" onClick={async () => { await api.del(`/games/${g.id}/media/${m.id}`); reload(); }}>Remover</ActionButton></div>)}</div>
        <label className="btn"><Icon name="upload" /> Enviar imagens<input type="file" accept="image/png,image/jpeg,image/webp,image/gif" multiple hidden onChange={(e) => up(`/games/${g.id}/media`, e.target.files, 'files')} /></label>
        <div className="row"><input className="input" style={{ flex: 1 }} placeholder="Link do YouTube ou Vimeo" value={video} onChange={(e) => setVideo(e.target.value)} /><ActionButton className="btn" onClick={async () => { const f = new FormData(); f.append('videoUrl', video); await api.upload(`/games/${g.id}/media`, f); setVideo(''); reload(); }}>Adicionar vídeo</ActionButton></div>
      </div>
    </div>
  );
}

function BuildsTab({ data, reload }) {
  const g = data.game;
  const toast = useToast();
  const [v, setV] = useState({ version: '1.0.0', changelog: '', downloadable: false });
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const projects = useLoad(() => api.get('/projects'), []);
  const [projectId, setProjectId] = useState(g.studioProjectId || '');
  const [result, setResult] = useState(null);
  return (
    <div className="grid cols-2">
      <div className="card stack">
        <h3>Enviar build HTML5 (.zip)</h3>
        <p className="small muted">O .zip precisa ter <code>index.html</code> na raiz. Compatível com exportações Web de Godot, Unity WebGL, Construct, GameMaker, Phaser, Three.js, Babylon.js etc. Para multiplayer, conquistas e dados do jogador, inclua o <a href="/runtime/sdk/nexplay-sdk.js" onClick={(e) => e.preventDefault()}>NEXPLAY SDK</a> (veja docs/SDK.md).</p>
        <Field label="Versão"><input className="input" value={v.version} onChange={(e) => setV({ ...v, version: e.target.value })} /></Field>
        <Field label="Notas da versão"><textarea className="input" value={v.changelog} onChange={(e) => setV({ ...v, changelog: e.target.value })} /></Field>
        <label className="check"><input type="checkbox" checked={v.downloadable} onChange={(e) => setV({ ...v, downloadable: e.target.checked })} /> Oferecer download do .zip para quem tem acesso</label>
        <input type="file" accept=".zip" onChange={(e) => setFile(e.target.files[0])} />
        <button className="btn primary" disabled={!file || busy} onClick={async () => {
          setBusy(true); setResult(null);
          try { const f = new FormData(); f.append('file', file); f.append('version', v.version); f.append('changelog', v.changelog); f.append('downloadable', String(v.downloadable)); setResult(await api.upload(`/games/${g.id}/versions`, f)); reload(); } catch (x) { toast(x.message, 'error'); } finally { setBusy(false); }
        }}>{busy ? 'Enviando e verificando…' : 'Enviar build'}</button>
        {result?.scan && <div className={result.scan.status === 'passed' ? 'info-box' : 'warn-box'}>Verificação automática: <b>{result.scan.status}</b> · {result.fileCount} arquivos.{result.scan.findings.length > 0 && <ul>{result.scan.findings.slice(0, 8).map((f, i) => <li key={i}>{f.file}: {f.rule} ({f.severity})</li>)}</ul>}</div>}
      </div>
      <div className="card stack">
        <h3>Publicar a partir do NEXPLAY STUDIO</h3>
        <Loader state={projects}>{(d) => <Field label="Projeto"><select className="input" value={projectId} onChange={(e) => setProjectId(e.target.value)}><option value="">Escolha…</option>{d.projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}</select></Field>}</Loader>
        <ActionButton className="btn primary" disabled={!projectId} onClick={async () => { const r = await api.post(`/games/${g.id}/versions/from-project`, { projectId: Number(projectId), version: v.version, changelog: v.changelog }); toast(`Versão criada. ${r.validation.warnings.length} aviso(s).`, 'ok'); reload(); }}>Gerar build da versão {v.version}</ActionButton>
        <p className="small muted">O projeto é validado pela IA Testadora (sem chamar a IA: verificações automáticas) e copiado como build imutável. Publicações e atualizações passam por moderação.</p>
        <h3 className="mt">Versões</h3>
        {data.versions.map((x) => <div key={x.id} className="row between small" style={{ borderBottom: '1px solid var(--line)', padding: '6px 0' }}><span><b>{x.version}</b> · {x.build_kind}{x.id === g.currentVersionId && <span className="pill green" style={{ marginLeft: 6 }}>atual</span>}</span><span>verificação: {x.scan_status} · revisão: {x.review_status}</span><Link className="btn sm" to={`/jogo/${g.slug}/jogar?versao=${x.id}`}>Testar</Link></div>)}
        {!data.versions.length && <p className="muted small">Nenhuma versão enviada.</p>}
      </div>
    </div>
  );
}

function UpdatesTab({ g, updates, reload }) {
  const [v, setV] = useState({ kind: 'devlog', title: '', body: '' });
  const [img, setImg] = useState(null);
  return (
    <div className="grid cols-2">
      <div className="card stack"><h3>Nova publicação</h3>
        <Field label="Tipo"><select className="input" value={v.kind} onChange={(e) => setV({ ...v, kind: e.target.value })}><option value="devlog">Devlog</option><option value="news">Novidade</option><option value="patch">Notas de atualização</option></select></Field>
        <Field label="Título"><input className="input" value={v.title} onChange={(e) => setV({ ...v, title: e.target.value })} /></Field>
        <Field label="Texto"><textarea className="input" value={v.body} onChange={(e) => setV({ ...v, body: e.target.value })} style={{ minHeight: 160 }} /></Field>
        <input type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={(e) => setImg(e.target.files[0])} />
        <ActionButton className="btn primary" ok="Publicado! Seguidores foram notificados." onClick={async () => { const f = new FormData(); Object.entries(v).forEach(([k, x]) => f.append(k, x)); if (img) f.append('image', img); await api.upload(`/games/${g.id}/updates`, f); setV({ kind: 'devlog', title: '', body: '' }); reload(); }}>Publicar</ActionButton>
      </div>
      <div className="stack">{updates.map((u) => <div key={u.id} className="card"><b>{u.title}</b><div className="small muted">{new Date(u.created_at).toLocaleString('pt-BR')}</div></div>)}</div>
    </div>
  );
}

function BetaTab({ g }) {
  const s = useLoad(() => api.get(`/games/${g.id}/beta`), [g.id]);
  const [name, setName] = useState('');
  const setStatus = async (username, status) => { await api.post(`/games/${g.id}/beta/${username}`, { status }); s.reload(); };
  return (
    <div className="card stack">
      <p className="small muted">Modo atual: <b>{g.betaMode === 'closed' ? 'fechado (você aprova os testadores)' : g.betaMode === 'open' ? 'aberto' : 'sem beta'}</b>. O beta vale para jogos em LANÇAMENTOS que tenham build enviado.</p>
      <div className="row"><input className="input" style={{ maxWidth: 260 }} placeholder="Convidar usuário" value={name} onChange={(e) => setName(e.target.value)} /><ActionButton className="btn" onClick={() => setStatus(name, 'granted')}>Conceder acesso</ActionButton></div>
      <Loader state={s}>{(d) => (d.testers.length ? d.testers.map((t) => <div key={t.id} className="row between"><span className="row"><Avatar user={t} size={28} />{t.displayName} <span className="pill">{t.status}</span></span><div className="row"><button className="btn sm" onClick={() => setStatus(t.username, 'granted')}>Aprovar</button><button className="btn sm ghost" onClick={() => setStatus(t.username, 'denied')}>Negar</button></div></div>) : <p className="muted small">Nenhum pedido ainda.</p>)}</Loader>
    </div>
  );
}

function AchievementsTab({ g, list, reload }) {
  const [v, setV] = useState({ code: '', name: '', description: '', rarity: 'common' });
  return (
    <div className="grid cols-2">
      <div className="card stack"><h3>Nova conquista</h3>
        <Field label="Código (usado no SDK)" hint="letras minúsculas, números e _"><input className="input" value={v.code} onChange={(e) => setV({ ...v, code: e.target.value })} /></Field>
        <Field label="Nome"><input className="input" value={v.name} onChange={(e) => setV({ ...v, name: e.target.value })} /></Field>
        <Field label="Descrição"><input className="input" value={v.description} onChange={(e) => setV({ ...v, description: e.target.value })} /></Field>
        <Field label="Raridade"><select className="input" value={v.rarity} onChange={(e) => setV({ ...v, rarity: e.target.value })}><option value="common">Comum</option><option value="rare">Rara</option><option value="epic">Épica</option><option value="legendary">Lendária</option></select></Field>
        <ActionButton className="btn primary" onClick={async () => { await api.post(`/games/${g.id}/achievements`, v); reload(); }}>Criar</ActionButton>
        <p className="tiny muted">No jogo: <code>NEXPLAY.unlockAchievement('{v.code || 'codigo'}')</code>. Conquistas de jogos não concedem NC (prevenção de fraude).</p>
      </div>
      <div className="card">{list.map((a) => <div key={a.code} className="small" style={{ padding: '4px 0' }}><b>{a.name}</b> <span className="muted">({a.code}) — {a.description}</span></div>)}{!list.length && <p className="muted small">Nenhuma conquista.</p>}</div>
    </div>
  );
}

function StatsTab({ g }) {
  const s = useLoad(() => api.get(`/games/${g.id}/analytics`), [g.id]);
  return (
    <Loader state={s}>{(d) => (
      <div className="stack">
        <div className="grid cols-4">
          {[['Visualizações', d.views], ['Jogadores', d.totalPlayers], ['Minutos jogados', d.totalPlayMinutes], ['Lista de desejos', d.wishlists], ['Seguidores', d.followers], ['Avaliação', d.rating.avg ?? '—'], ['Vendas', d.revenue.sales], ['Doações', d.revenue.donations]].map(([l, x]) => <div key={l} className="card"><div className="small muted">{l}</div><div className="kpi">{x}</div></div>)}
        </div>
        <div className="card"><h3>Jogadores por dia (30 dias)</h3>{d.daily.length ? <div className="bar-chart">{d.daily.map((x) => <i key={x.day} title={`${x.day}: ${x.players}`} style={{ height: `${(x.players / Math.max(...d.daily.map((y) => y.players))) * 100}%` }} />)}</div> : <p className="muted small">Sem dados ainda.</p>}</div>
        {d.advanced ? <div className="card"><h3>Estatísticas avançadas</h3><p>Sessão média: <b>{d.advanced.avgSessionMinutes} min</b> · Jogadores que voltaram: <b>{d.advanced.returningPlayers}</b></p><p className="small">Distribuição de notas: {d.advanced.ratingDistribution.map((r) => `${r.rating}★: ${r.c}`).join(' · ') || '—'}</p></div>
          : <div className="info-box">Estatísticas avançadas (retenção, sessão média, distribuição de notas) estão disponíveis nos planos PRO e DELUXE.</div>}
      </div>
    )}</Loader>
  );
}
