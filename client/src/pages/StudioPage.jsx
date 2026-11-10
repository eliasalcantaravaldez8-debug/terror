import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api, ago } from '../api.js';
import { useLoad, Loader, Avatar, GameRail, ActionButton, Field, Tabs, ReportButton } from '../components/ui.jsx';
import { useAuth } from '../auth.jsx';

const ROLE = { owner: 'Dono', admin: 'Administrador', developer: 'Programação', artist: 'Arte', designer: 'Design', tester: 'Testes' };

export default function StudioPage() {
  const { slug } = useParams();
  const { user } = useAuth();
  const s = useLoad(() => api.get(`/studios/${slug}`), [slug, user?.id]);
  const [tab, setTab] = useState('jogos');
  const [m, setM] = useState({ username: '', role: 'developer' });
  const [post, setPost] = useState({ title: '', body: '' });
  const [edit, setEdit] = useState(null);
  return (
    <Loader state={s}>{(d) => {
      const st = d.studio; const manage = ['owner', 'admin'].includes(d.myRole); const member = !!d.myRole;
      const upload = async (kind, file) => { const f = new FormData(); f.append('file', file); await api.upload(`/studios/${slug}/image?kind=${kind}`, f); s.reload(); };
      return (
        <div className="stack">
          <div className="profile-head"><div className="profile-banner" style={{ background: st.bannerUrl ? `url(${st.bannerUrl}) center/cover` : `linear-gradient(135deg, ${st.accentColor}, #0e7490)` }} />
            <div className="profile-body"><div className="avatar" style={{ width: 100, height: 100, borderRadius: 24, background: st.accentColor, fontSize: 40 }}>{st.logoUrl ? <img src={st.logoUrl} alt="" /> : st.name[0]}</div>
              <div style={{ flex: 1 }}><h1 style={{ margin: 0 }}>{st.name}</h1><p className="muted" style={{ margin: 0 }}>{st.description}</p></div>
              {manage && <div className="row"><label className="btn sm">Logo<input hidden type="file" accept="image/*" onChange={(e) => upload('logo', e.target.files[0])} /></label><label className="btn sm">Capa<input hidden type="file" accept="image/*" onChange={(e) => upload('banner', e.target.files[0])} /></label><button className="btn sm" onClick={() => setEdit({ name: st.name, description: st.description, accentColor: st.accentColor })}>Editar</button></div>}
              {user && !member && <ReportButton type="studio" id={st.id} />}
            </div>
          </div>
          {edit && <div className="card stack"><Field label="Nome"><input className="input" value={edit.name} onChange={(e) => setEdit({ ...edit, name: e.target.value })} /></Field><Field label="Descrição"><textarea className="input" value={edit.description} onChange={(e) => setEdit({ ...edit, description: e.target.value })} /></Field><Field label="Cor"><input type="color" value={edit.accentColor} onChange={(e) => setEdit({ ...edit, accentColor: e.target.value })} /></Field><ActionButton className="btn primary" onClick={async () => { await api.patch(`/studios/${slug}`, edit); setEdit(null); s.reload(); }}>Salvar</ActionButton></div>}
          <div className="card row" style={{ justifyContent: 'space-around' }}>{[['games', 'jogos'], ['players30d', 'jogadores (30d)'], ['reviews', 'avaliações'], ['avgRating', 'nota média']].map(([k, l]) => <div className="stat" key={k}><b>{d.stats[k] ?? '—'}</b><span>{l}</span></div>)}</div>
          <Tabs value={tab} onChange={setTab} tabs={[['jogos', 'Jogos'], ['equipe', `Equipe (${d.members.length})`], ['novidades', 'Novidades']]} />
          {tab === 'jogos' && (d.games.length ? <GameRail games={d.games} /> : <p className="muted">Nenhum jogo publicado ainda.</p>)}
          {tab === 'equipe' && (
            <div className="stack">
              {d.members.map((u) => <div key={u.id} className="card row between" style={{ padding: 10 }}><Link to={`/u/${u.username}`} className="row"><Avatar user={u} size={34} />{u.displayName}</Link><div className="row"><span className="pill">{ROLE[u.studioRole]}</span>{manage && u.studioRole !== 'owner' && <ActionButton className="btn sm ghost" onClick={async () => { await api.del(`/studios/${slug}/members/${u.username}`); s.reload(); }}>Remover</ActionButton>}</div></div>)}
              {manage && <div className="card row"><input className="input" style={{ maxWidth: 220 }} placeholder="Usuário" value={m.username} onChange={(e) => setM({ ...m, username: e.target.value })} /><select className="input" style={{ width: 'auto' }} value={m.role} onChange={(e) => setM({ ...m, role: e.target.value })}>{Object.entries(ROLE).filter(([k]) => k !== 'owner').map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select><ActionButton className="btn primary" ok="Integrante adicionado!" onClick={async () => { await api.post(`/studios/${slug}/members`, m); s.reload(); }}>Adicionar</ActionButton></div>}
            </div>
          )}
          {tab === 'novidades' && (
            <div className="stack">
              {member && <div className="card stack"><Field label="Título"><input className="input" value={post.title} onChange={(e) => setPost({ ...post, title: e.target.value })} /></Field><Field label="Texto"><textarea className="input" value={post.body} onChange={(e) => setPost({ ...post, body: e.target.value })} /></Field><ActionButton className="btn primary" onClick={async () => { await api.post(`/studios/${slug}/posts`, post); setPost({ title: '', body: '' }); s.reload(); }}>Publicar</ActionButton></div>}
              {d.posts.map((p) => <div key={p.id} className="card"><h3>{p.title}</h3><div className="tiny muted">{p.display_name} · {ago(p.created_at)}</div><p className="mt" style={{ whiteSpace: 'pre-wrap' }}>{p.body}</p></div>)}
              {!d.posts.length && <p className="muted">Sem publicações.</p>}
            </div>
          )}
        </div>
      );
    }}</Loader>
  );
}
