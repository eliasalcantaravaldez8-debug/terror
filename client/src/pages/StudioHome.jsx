import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api, GENRE_LABEL, ago } from '../api.js';
import { useLoad, Loader, Modal, Field, ActionButton, Empty, useToast } from '../components/ui.jsx';
import { Icon } from '../components/icons.jsx';

const TEMPLATES = ['futebol', 'acao', 'terror', 'sobrevivencia', 'corrida', 'plataforma', 'mundo_aberto', 'aventura', 'vazio'];
const fmtBytes = (b) => (b > 1e9 ? `${(b / 1e9).toFixed(2)} GB` : `${(b / 1e6).toFixed(1)} MB`);

export default function StudioHome() {
  const s = useLoad(() => api.get('/projects'), []);
  const [creating, setCreating] = useState(false);
  const nav = useNavigate();
  const toast = useToast();
  return (
    <div>
      <div className="row between"><div><h1>NEXPLAY STUDIO</h1><p className="muted">Crie jogos 2D e 3D com ferramentas visuais, código e a NEXPLAY AI. Seus projetos ficam salvos na NEXPLAY CLOUD.</p></div>
        <div className="row"><label className="btn"><Icon name="upload" /> Importar backup<input type="file" accept=".json" hidden onChange={async (e) => { const f = e.target.files[0]; if (!f) return; try { const d = await api.post('/projects/import', JSON.parse(await f.text())); nav(`/studio/${d.project.id}`); } catch (x) { toast(x.message, 'error'); } }} /></label><button className="btn primary" onClick={() => setCreating(true)}><Icon name="plus" /> Novo projeto</button></div></div>
      <Loader state={s}>{(d) => (
        <>
          <div className="card mb">
            <div className="row between small"><span><Icon name="cloud" size={16} /> NEXPLAY CLOUD — plano {d.limits.plan.toUpperCase()}</span><span>{fmtBytes(d.storage.usedBytes)} de {fmtBytes(d.storage.limitBytes)} · {d.projects.length}/{d.limits.maxProjects} projetos · histórico de {d.limits.versionHistory} versões</span></div>
            <div className="progress mt"><i style={{ width: `${Math.min(100, (d.storage.usedBytes / d.storage.limitBytes) * 100)}%` }} /></div>
          </div>
          {d.projects.length || d.shared.length ? (
            <div className="games-grid">
              {[...d.projects, ...d.shared].map((p) => (
                <Link key={p.id} to={`/studio/${p.id}`} className="game-card">
                  <div className="game-cover">{p.thumbnail ? <img src={p.thumbnail} alt="" /> : <div style={{ display: 'grid', placeItems: 'center', height: '100%' }}><Icon name="cube" size={40} style={{ opacity: 0.4 }} /></div>}<div className="tags"><span className="pill">{p.dimension.toUpperCase()}</span>{p.role !== 'owner' && <span className="pill cyan">Compartilhado</span>}</div></div>
                  <div className="game-info"><div className="game-title">{p.name}</div><div className="game-meta"><span>{GENRE_LABEL[p.template]}</span><span>rev. {p.revision} · {ago(p.updatedAt)}</span></div></div>
                </Link>
              ))}
            </div>
          ) : <Empty icon="cube" title="Nenhum projeto ainda">Comece por um modelo de gênero (futebol, terror, corrida…) ou um projeto vazio.<div className="mt"><button className="btn primary" onClick={() => setCreating(true)}>Criar primeiro projeto</button></div></Empty>}
        </>
      )}</Loader>
      {creating && <NewProject onClose={() => setCreating(false)} onCreated={(p) => nav(`/studio/${p.id}`)} />}
    </div>
  );
}

function NewProject({ onClose, onCreated }) {
  const [v, setV] = useState({ name: 'Meu jogo', dimension: '3d', template: 'aventura', mode: 'easy' });
  return (
    <Modal title="Novo projeto" onClose={onClose} wide>
      <div className="stack">
        <Field label="Nome"><input className="input" value={v.name} onChange={(e) => setV({ ...v, name: e.target.value })} maxLength={60} /></Field>
        <div className="row">{['3d', '2d'].map((d) => <button key={d} className={`btn ${v.dimension === d ? 'primary' : ''}`} onClick={() => setV({ ...v, dimension: d })}>{d.toUpperCase()}</button>)}</div>
        <Field label="Tipo de jogo (ponto de partida editável)">
          <div className="palette-grid" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(120px,1fr))' }}>{TEMPLATES.map((t) => <button key={t} style={{ borderColor: v.template === t ? 'var(--cyan)' : undefined }} onClick={() => setV({ ...v, template: t })}><b>{GENRE_LABEL[t]}</b></button>)}</div>
        </Field>
        <Field label="Modo">
          <div className="grid cols-2">
            <button className="card" style={{ textAlign: 'left', cursor: 'pointer', borderColor: v.mode === 'easy' ? 'var(--cyan)' : undefined }} onClick={() => setV({ ...v, mode: 'easy' })}><b>Modo fácil</b><div className="small muted">Ferramentas visuais, sem programação.</div></button>
            <button className="card" style={{ textAlign: 'left', cursor: 'pointer', borderColor: v.mode === 'advanced' ? 'var(--cyan)' : undefined }} onClick={() => setV({ ...v, mode: 'advanced' })}><b>Modo avançado</b><div className="small muted">Editor de código, scripts e JSON do projeto.</div></button>
          </div>
        </Field>
        <ActionButton className="btn primary lg" onClick={async () => { const d = await api.post('/projects', v); onCreated(d.project); }}>Criar projeto</ActionButton>
      </div>
    </Modal>
  );
}
