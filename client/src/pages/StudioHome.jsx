// NEXPLAY STUDIO — lista de projetos do criador e criação de projetos NOVOS.
// "Criar jogo" (/studio/novo) sempre cria um projeto independente, em branco por padrão;
// nunca reabre um projeto existente nem carrega um jogo pronto sem o criador pedir.
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { api, GENRE_LABEL, ago } from '../api.js';
import { useLoad, Loader, Modal, Field, ActionButton, Empty, useToast } from '../components/ui.jsx';
import { Icon } from '../components/icons.jsx';

const GENRES = ['acao', 'aventura', 'terror', 'sobrevivencia', 'corrida', 'plataforma', 'mundo_aberto', 'futebol', 'esportes', 'rpg', 'estrategia', 'puzzle', 'simulacao', 'tiro', 'luta', 'casual', 'musical', 'educativo', 'outro'];
// Gêneros que têm um modelo com conteúdo de exemplo (opcional).
const TEMPLATE_FOR = { futebol: 'futebol', acao: 'acao', terror: 'terror', sobrevivencia: 'sobrevivencia', corrida: 'corrida', plataforma: 'plataforma', mundo_aberto: 'mundo_aberto', aventura: 'aventura' };
const fmtBytes = (b) => (b > 1e9 ? `${(b / 1e9).toFixed(2)} GB` : `${(b / 1e6).toFixed(1)} MB`);

export default function StudioHome() {
  const loc = useLocation();
  const s = useLoad(() => api.get('/projects'), []);
  const [creating, setCreating] = useState(loc.pathname === '/studio/novo');
  const [renaming, setRenaming] = useState(null);
  const nav = useNavigate();
  const toast = useToast();
  const remove = async (p) => {
    if (!confirm(`Excluir o projeto "${p.name}"? O projeto, o histórico de versões e os assets dele serão apagados. Jogos já publicados a partir dele continuam no Arcade.`)) return;
    try { await api.del(`/projects/${p.id}`); toast('Projeto excluído.'); s.reload(); } catch (x) { toast(x.message, 'error'); }
  };
  return (
    <div>
      <div className="row between">
        <div><h1>NEXPLAY STUDIO</h1><p className="muted">Crie jogos 2D e 3D com ferramentas visuais, código e a NEXPLAY AI. Cada projeto é salvo separadamente na NEXPLAY CLOUD.</p></div>
        <div className="row">
          <Link className="btn" to="/enviar-jogo"><Icon name="upload" /> Enviar jogo pronto</Link>
          <label className="btn"><Icon name="download" /> Importar backup<input type="file" accept=".json" hidden onChange={async (e) => { const f = e.target.files[0]; if (!f) return; try { const d = await api.post('/projects/import', JSON.parse(await f.text())); nav(`/studio/${d.project.id}`); } catch (x) { toast(x.message, 'error'); } }} /></label>
          <button className="btn primary" onClick={() => setCreating(true)}><Icon name="plus" /> Criar jogo</button>
        </div>
      </div>
      <Loader state={s}>{(d) => (
        <>
          <div className="card mb">
            <div className="row between small"><span><Icon name="cloud" size={16} /> NEXPLAY CLOUD — plano {d.limits.plan.toUpperCase()}</span><span>{fmtBytes(d.storage.usedBytes)} de {fmtBytes(d.storage.limitBytes)} · {d.projects.length}/{d.limits.maxProjects} projetos · histórico de {d.limits.versionHistory} versões</span></div>
            <div className="progress mt"><i style={{ width: `${Math.min(100, (d.storage.usedBytes / d.storage.limitBytes) * 100)}%` }} /></div>
          </div>
          {d.projects.length || d.shared.length ? (
            <>
              <h3>Meus projetos</h3>
              <div className="games-grid">
                {[...d.projects, ...d.shared].map((p) => (
                  <div key={p.id} className="game-card">
                    <Link to={`/studio/${p.id}`} className="game-cover">{p.thumbnail ? <img src={p.thumbnail} alt="" /> : <div style={{ display: 'grid', placeItems: 'center', height: '100%' }}><Icon name="cube" size={40} style={{ opacity: 0.4 }} /></div>}<div className="tags"><span className="pill">{p.dimension.toUpperCase()}</span>{p.role !== 'owner' && <span className="pill cyan">Compartilhado</span>}</div></Link>
                    <div className="game-info">
                      <div className="game-title">{p.name}</div>
                      <div className="game-meta"><span>{GENRE_LABEL[p.genre] || 'Sem gênero'}{p.blank ? '' : ' · modelo'}</span><span>rev. {p.revision} · {ago(p.updatedAt)}</span></div>
                      <div className="tiny muted">Projeto nº {p.id}</div>
                      <div className="row" style={{ gap: 6, marginTop: 8 }}>
                        <Link className="btn sm primary" to={`/studio/${p.id}`}><Icon name="settings" /> Abrir</Link>
                        {p.role === 'owner' && <button className="btn sm" onClick={() => setRenaming(p)}>Renomear</button>}
                        {p.role === 'owner' && <button className="btn sm danger" onClick={() => remove(p)} aria-label={`Excluir ${p.name}`}>Excluir</button>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <Empty icon="cube" title="Nenhum projeto ainda">
              Crie um projeto novo em branco, ou envie um jogo que você já fez em outra ferramenta.
              <div className="row mt" style={{ justifyContent: 'center' }}><button className="btn primary" onClick={() => setCreating(true)}><Icon name="plus" /> Criar jogo</button><Link className="btn" to="/enviar-jogo"><Icon name="upload" /> Enviar jogo pronto</Link></div>
            </Empty>
          )}
        </>
      )}</Loader>
      {creating && <NewProject onClose={() => { setCreating(false); if (loc.pathname === '/studio/novo') nav('/studio', { replace: true }); }} onCreated={(p) => nav(`/studio/${p.id}`, { replace: true })} />}
      {renaming && <RenameProject project={renaming} onClose={() => setRenaming(null)} onDone={() => { setRenaming(null); s.reload(); }} />}
    </div>
  );
}

function NewProject({ onClose, onCreated }) {
  const [v, setV] = useState({ name: '', dimension: '3d', genre: '', start: 'blank', mode: 'easy' });
  const [err, setErr] = useState(null);
  const template = TEMPLATE_FOR[v.genre];
  return (
    <Modal title="Criar jogo — novo projeto" onClose={onClose} wide>
      <div className="stack">
        <Field label="Nome do projeto"><input className="input" autoFocus value={v.name} onChange={(e) => setV({ ...v, name: e.target.value })} maxLength={60} placeholder="Ex.: Fuga da Cidade Neon" /></Field>
        <Field label="Tipo">
          <div className="grid cols-2">
            {[['3d', '3D', 'Mundo em três dimensões, câmera em terceira/primeira pessoa.'], ['2d', '2D', 'Fases vistas de lado ou de cima, com sprites e mapa de blocos.']].map(([d, l, h]) => (
              <button key={d} type="button" className="card" style={{ textAlign: 'left', cursor: 'pointer', borderColor: v.dimension === d ? 'var(--cyan)' : undefined }} onClick={() => setV({ ...v, dimension: d })}><b>{l}</b><div className="small muted">{h}</div></button>
            ))}
          </div>
        </Field>
        <Field label="Gênero">
          <select className="input" value={v.genre} onChange={(e) => setV({ ...v, genre: e.target.value, start: 'blank' })}>
            <option value="">Escolha o gênero…</option>
            {GENRES.map((g) => <option key={g} value={g}>{GENRE_LABEL[g]}</option>)}
          </select>
        </Field>
        <Field label="Começar com" hint="O projeto em branco tem só o básico para você construir: chão, luz e o personagem do jogador.">
          <div className="grid cols-2">
            <button type="button" className="card" style={{ textAlign: 'left', cursor: 'pointer', borderColor: v.start === 'blank' ? 'var(--cyan)' : undefined }} onClick={() => setV({ ...v, start: 'blank' })}><b>Projeto em branco</b> <span className="pill green">recomendado</span><div className="small muted">Estrutura inicial vazia. Nada de jogos prontos.</div></button>
            <button type="button" className="card" disabled={!template} style={{ textAlign: 'left', cursor: template ? 'pointer' : 'not-allowed', opacity: template ? 1 : 0.5, borderColor: v.start === 'template' ? 'var(--cyan)' : undefined }} onClick={() => template && setV({ ...v, start: 'template' })}><b>Modelo de exemplo</b><div className="small muted">{template ? `Cópia editável do modelo de ${GENRE_LABEL[template]} (cenário e missão de exemplo).` : 'Não há modelo para este gênero.'}</div></button>
          </div>
        </Field>
        <Field label="Modo de edição">
          <div className="grid cols-2">
            <button type="button" className="card" style={{ textAlign: 'left', cursor: 'pointer', borderColor: v.mode === 'easy' ? 'var(--cyan)' : undefined }} onClick={() => setV({ ...v, mode: 'easy' })}><b>Modo fácil</b><div className="small muted">Ferramentas visuais, sem programação.</div></button>
            <button type="button" className="card" style={{ textAlign: 'left', cursor: 'pointer', borderColor: v.mode === 'advanced' ? 'var(--cyan)' : undefined }} onClick={() => setV({ ...v, mode: 'advanced' })}><b>Modo avançado</b><div className="small muted">Editor de código, scripts e JSON do projeto.</div></button>
          </div>
        </Field>
        {err && <div className="error-box small">{err}</div>}
        <ActionButton className="btn primary lg" onClick={async () => {
          setErr(null);
          if (!v.name.trim()) return setErr('Dê um nome ao projeto.');
          if (!v.genre) return setErr('Escolha um gênero.');
          try {
            const d = await api.post('/projects', { name: v.name.trim(), dimension: v.dimension, genre: v.genre, mode: v.mode, template: v.start === 'template' && template ? template : 'vazio' });
            onCreated(d.project);
          } catch (x) { setErr(x.message); }
        }}><Icon name="plus" /> Criar projeto</ActionButton>
      </div>
    </Modal>
  );
}

function RenameProject({ project, onClose, onDone }) {
  const [name, setName] = useState(project.name);
  const [genre, setGenre] = useState(project.genre || 'outro');
  return (
    <Modal title="Renomear projeto" onClose={onClose}>
      <div className="stack">
        <Field label="Nome"><input className="input" value={name} maxLength={60} onChange={(e) => setName(e.target.value)} /></Field>
        <Field label="Gênero"><select className="input" value={genre} onChange={(e) => setGenre(e.target.value)}>{GENRES.map((g) => <option key={g} value={g}>{GENRE_LABEL[g]}</option>)}</select></Field>
        <ActionButton className="btn primary" onClick={async () => { await api.patch(`/projects/${project.id}`, { name: name.trim(), genre }); onDone(); }}>Salvar</ActionButton>
      </div>
    </Modal>
  );
}
