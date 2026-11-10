// NEXPLAY STUDIO — editor principal.
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api, ago } from '../api.js';
import { useLoad, Loader, Modal, ActionButton, useToast, Avatar } from '../components/ui.jsx';
import { Icon } from '../components/icons.jsx';
import { applyOps, validateProject, newId } from '../../../shared/project.js';
import { EditorViewport } from './viewport.js';
import { Palette, Hierarchy, Inspector, EnvironmentPanel, MissionsPanel, AssetsPanel } from './panels.jsx';
import AIPanel from './AIPanel.jsx';
import Preview from './Preview.jsx';
import Editor2D from './Editor2D.jsx';
import CodeEditor from './CodeEditor.jsx';

export default function StudioEditor() {
  const { id } = useParams();
  const s = useLoad(() => api.get(`/projects/${id}`), [id]);
  return <Loader state={s}>{(d) => <Editor key={id} initial={d} reload={s.reload} />}</Loader>;
}

function Editor({ initial, reload }) {
  const toast = useToast();
  const project = initial.project;
  const readOnly = project.role === 'viewer';
  const [doc, setDoc] = useState(initial.doc);
  const [revision, setRevision] = useState(project.revision);
  const [assets, setAssets] = useState(initial.assets);
  const [selectedId, setSelectedId] = useState(null);
  const [view, setView] = useState('scene'); // scene | play | code
  const [left, setLeft] = useState('add');
  const [right, setRight] = useState('inspector');
  const [mode, setMode] = useState(project.mode);
  const [saveState, setSaveState] = useState('salvo');
  const [validation, setValidation] = useState(() => validateProject(initial.doc));
  const [logs, setLogs] = useState([]);
  const [modal, setModal] = useState(null);
  const [aiBusy, setAiBusy] = useState(false);
  const [gizmo, setGizmo] = useState('translate');
  const undoStack = useRef([]);
  const redoStack = useRef([]);
  const lastCoalesce = useRef(null);
  const vpBox = useRef(null);
  const vp = useRef(null);
  const saveTimer = useRef(null);
  const docRef = useRef(doc);
  docRef.current = doc;
  const revRef = useRef(revision);
  revRef.current = revision;
  const is3d = doc.meta.dimension === '3d';
  const assetUrl = useCallback((a) => (a.assetId ? `/api/projects/${project.id}/assets/${a.assetId}/file` : null), [project.id]);

  // ───── Aplicar alterações (mesmo modelo de operações usado pela IA) ─────
  const commit = useCallback((next, { coalesce } = {}) => {
    if (readOnly) { toast('Você tem acesso somente de leitura a este projeto.', 'error'); return; }
    if (!(coalesce && lastCoalesce.current === coalesce)) {
      undoStack.current.push(docRef.current);
      if (undoStack.current.length > 100) undoStack.current.shift();
    }
    lastCoalesce.current = coalesce || null;
    redoStack.current = [];
    setDoc(next);
    setSaveState('alterado');
  }, [readOnly, toast]);

  const apply = useCallback((ops, post, opts) => {
    try {
      let { doc: next } = applyOps(docRef.current, ops);
      if (post) next = post(structuredClone(next)) || next;
      commit(next, opts);
      return next;
    } catch (e) { toast(e.message, 'error'); return null; }
  }, [commit, toast]);

  const undo = () => { const prev = undoStack.current.pop(); if (!prev) return; redoStack.current.push(docRef.current); lastCoalesce.current = null; setDoc(prev); setSaveState('alterado'); };
  const redo = () => { const next = redoStack.current.pop(); if (!next) return; undoStack.current.push(docRef.current); setDoc(next); setSaveState('alterado'); };

  // ───── Salvamento automático na NEXPLAY CLOUD ─────
  const save = useCallback(async (source = 'autosave', label = '') => {
    clearTimeout(saveTimer.current);
    setSaveState('salvando');
    try {
      const r = await api.put(`/projects/${project.id}`, { doc: docRef.current, baseRevision: revRef.current, source, label });
      setRevision(r.revision); revRef.current = r.revision;
      setValidation(r.validation);
      setSaveState('salvo');
      return r;
    } catch (e) {
      setSaveState('erro');
      if (e.code === 'revision_conflict') setModal('conflict'); else toast(e.message, 'error');
      return null;
    }
  }, [project.id, toast]);
  useEffect(() => {
    if (saveState !== 'alterado' || readOnly) return undefined;
    saveTimer.current = setTimeout(() => save('autosave'), 2500);
    return () => clearTimeout(saveTimer.current);
  }, [doc, saveState, save, readOnly]);
  useEffect(() => {
    const warn = (e) => { if (saveState === 'alterado' || saveState === 'salvando') { e.preventDefault(); e.returnValue = ''; } };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [saveState]);

  // ───── Viewport 3D ─────
  useEffect(() => {
    if (!is3d || view !== 'scene' || !vpBox.current) return undefined;
    vp.current = new EditorViewport(vpBox.current, docRef.current, {
      assetUrl,
      onSelect: (sid) => { setSelectedId(sid); if (sid) setRight('inspector'); },
      onTransform: (eid, t) => apply([{ op: 'update_entity', id: eid, patch: { transform: t } }]),
    });
    return () => { vp.current?.dispose(); vp.current = null; };
  }, [is3d, view]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { vp.current?.setDoc(doc); }, [doc]);
  useEffect(() => { if (vp.current && vp.current.selectedId !== selectedId) vp.current.select(selectedId, false); }, [selectedId]);
  useEffect(() => { vp.current?.setMode(gizmo); }, [gizmo]);
  useEffect(() => {
    const k = (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') { e.preventDefault(); if (e.shiftKey) redo(); else undo(); }
      else if ((e.ctrlKey || e.metaKey) && e.key === 's') { e.preventDefault(); save('manual', 'Salvo manualmente'); }
      else if (e.key === 'g') setGizmo('translate'); else if (e.key === 'r') setGizmo('rotate'); else if (e.key === 's') setGizmo('scale');
      else if ((e.key === 'Delete' || e.key === 'Backspace') && selectedId) { apply([{ op: 'remove_entity', id: selectedId }]); setSelectedId(null); }
      else if (e.key === 'f' && selectedId) vp.current?.focus(selectedId);
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }); // eslint-disable-line react-hooks/exhaustive-deps

  const addEntity = (type, name, props, components = {}) => {
    const pos = vp.current?.dropPoint() || [0, 0, 0];
    const eid = newId(type.slice(0, 3));
    const isWorldSpace = type === 'vegetation';
    apply([{ op: 'add_entity', entity: { id: eid, type, name, props: structuredClone(props), components: structuredClone(components), transform: { position: isWorldSpace ? [pos[0], 0, pos[2]] : [pos[0], type === 'light' ? pos[1] + 4 : 0, pos[2]] } } }]);
    setSelectedId(eid);
  };
  const duplicate = (eid) => {
    const e = doc.entities.find((x) => x.id === eid);
    if (!e) return;
    const copy = structuredClone(e); copy.id = newId(e.type.slice(0, 3)); copy.name = `${e.name} (cópia)`;
    copy.transform.position = [e.transform.position[0] + 2, e.transform.position[1], e.transform.position[2] + 2];
    apply([{ op: 'add_entity', entity: copy }]); setSelectedId(copy.id);
  };
  const reloadFromServer = async () => {
    const d = await api.get(`/projects/${project.id}`);
    undoStack.current.push(docRef.current);
    setDoc(d.doc); setRevision(d.project.revision); revRef.current = d.project.revision; setAssets(d.assets);
    setValidation(validateProject(d.doc)); setSaveState('salvo');
  };
  const selected = doc.entities.find((e) => e.id === selectedId) || null;
  const log = (kind, message) => setLogs((l) => [...l.slice(-199), { kind, message, at: new Date() }]);

  return (
    <div className="studio">
      <div className="studio-toolbar">
        <Link to="/studio" className="btn sm ghost">← Projetos</Link>
        <b style={{ whiteSpace: 'nowrap' }}>{project.name}</b>
        <span className={`pill ${saveState === 'salvo' ? 'green' : saveState === 'erro' ? 'red' : ''}`} title={`Revisão ${revision}`}>{{ salvo: 'Salvo na nuvem', alterado: 'Alterações…', salvando: 'Salvando…', erro: 'Erro ao salvar' }[saveState]}</span>
        <button className="btn sm" onClick={undo} title="Desfazer (Ctrl+Z)"><Icon name="undo" /></button>
        <button className="btn sm" onClick={redo} title="Refazer (Ctrl+Shift+Z)" style={{ transform: 'scaleX(-1)' }}><Icon name="undo" /></button>
        <span style={{ width: 8 }} />
        {[['scene', 'cube', is3d ? 'Cena' : 'Mapa'], ['play', 'play', 'Testar'], ['code', 'code', 'Código']].filter(([k]) => k !== 'code' || mode === 'advanced').map(([k, icon, l]) => <button key={k} className={`btn sm ${view === k ? 'primary' : ''}`} onClick={() => { if (k === 'play' && saveState === 'alterado') save(); setView(k); }}><Icon name={icon} /> {l}</button>)}
        {is3d && view === 'scene' && <span className="row" style={{ gap: 4 }}>{[['translate', 'move', 'G'], ['rotate', 'rotate', 'R'], ['scale', 'scale', 'S']].map(([m, ic, key]) => <button key={m} title={`${m} (${key})`} className={`btn sm ${gizmo === m ? 'primary' : ''}`} onClick={() => setGizmo(m)}><Icon name={ic} /></button>)}</span>}
        <span style={{ marginLeft: 'auto' }} />
        <select className="input" style={{ width: 'auto', padding: '6px 8px' }} value={mode} onChange={async (e) => { setMode(e.target.value); await api.patch(`/projects/${project.id}`, { mode: e.target.value }); }}><option value="easy">Modo fácil</option><option value="advanced">Modo avançado</option></select>
        <span className={`pill ${validation.errors.length ? 'red' : validation.warnings.length ? 'gold' : 'green'}`} style={{ cursor: 'pointer' }} onClick={() => setModal('validation')}>{validation.errors.length} erros · {validation.warnings.length} avisos</span>
        <button className="btn sm" onClick={() => setModal('versions')}><Icon name="history" /> Versões</button>
        {project.role === 'owner' && <button className="btn sm" onClick={() => setModal('share')}><Icon name="users" /> Compartilhar</button>}
        <a className="btn sm" href={`/api/projects/${project.id}/export`}><Icon name="download" /> Backup</a>
        <ActionButton className="btn sm primary" ok="Versão salva" onClick={async () => { await save('manual', `Salvo em ${new Date().toLocaleString('pt-BR')}`); if (vp.current) await api.patch(`/projects/${project.id}`, { thumbnail: vp.current.snapshot() }); }}><Icon name="save" /> Salvar versão</ActionButton>
        <Link className="btn sm" to="/criador/jogos/novo" title="Crie o jogo e gere o build a partir deste projeto na aba Builds"><Icon name="upload" /> Publicar</Link>
      </div>

      <div className="studio-panel">
        <div className="tabs" style={{ marginBottom: 8 }}>{[['add', 'Criar'], ['tree', 'Cena'], ['world', 'Mundo'], ['missions', 'Missões'], ['assets', 'Assets']].map(([k, l]) => <button key={k} className={`tab ${left === k ? 'active' : ''}`} style={{ padding: '6px 8px', fontSize: 12 }} onClick={() => setLeft(k)}>{l}</button>)}</div>
        {left === 'add' && <Palette onAdd={addEntity} dimension={doc.meta.dimension} />}
        {left === 'tree' && <Hierarchy doc={doc} selectedId={selectedId} onSelect={setSelectedId} onFocus={(eid) => vp.current?.focus(eid)} onDuplicate={duplicate} onDelete={(eid) => { apply([{ op: 'remove_entity', id: eid }]); setSelectedId(null); }} />}
        {left === 'world' && <EnvironmentPanel doc={doc} setSettings={(patch) => apply([{ op: 'set_settings', patch }], null, { coalesce: `env:${Object.keys(patch).join()}` })} setPlayer={(patch) => apply([{ op: 'set_player', patch }])} />}
        {left === 'missions' && <MissionsPanel doc={doc} apply={apply} />}
        {left === 'assets' && <AssetsPanel projectId={project.id} doc={doc} assets={assets} apply={apply} onUploaded={() => api.get(`/projects/${project.id}`).then((d) => setAssets(d.assets))} />}
      </div>

      <div className="viewport" style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, position: 'relative', minHeight: 0 }}>
          {view === 'scene' && (is3d ? <div ref={vpBox} style={{ position: 'absolute', inset: 0 }} /> : <Editor2D doc={doc} apply={apply} />)}
          {view === 'play' && <Preview key={revision} doc={doc} projectId={project.id} onLog={log} onEvent={(n, d) => log('event', `${n} ${d ? JSON.stringify(d) : ''}`)} />}
          {view === 'code' && <CodeEditor doc={doc} apply={apply} validation={validation} />}
          {aiBusy && <div className="pill cyan" style={{ position: 'absolute', top: 10, right: 10 }}>A IA está trabalhando no projeto…</div>}
        </div>
        {(view === 'play' || logs.some((l) => l.kind === 'error')) && (
          <div className="console">{logs.length ? logs.slice(-60).map((l, i) => <div key={i} style={{ color: l.kind === 'error' ? '#fda4af' : l.kind === 'event' ? '#67e8f9' : '#c4b5fd' }}>[{l.at.toLocaleTimeString('pt-BR')}] {l.message}</div>) : <span className="muted">Console da pré-visualização (logs de scripts e eventos do jogo).</span>}</div>
        )}
      </div>

      <div className="studio-panel right">
        <div className="tabs" style={{ marginBottom: 8 }}>{[['inspector', 'Inspetor'], ['ai', 'NEXPLAY AI']].map(([k, l]) => <button key={k} className={`tab ${right === k ? 'active' : ''}`} onClick={() => setRight(k)}>{l}</button>)}</div>
        {right === 'inspector' && <Inspector doc={doc} entity={selected} scripts={Object.keys(doc.scripts)} update={(eid, patch) => apply([{ op: 'update_entity', id: eid, patch }], null, { coalesce: `ent:${eid}:${Object.keys(patch).join()}` })} setPlayer={(patch) => apply([{ op: 'set_player', patch }])} />}
        {right === 'ai' && (readOnly ? <p className="muted small">Somente leitura.</p> : (
          <AIPanel project={{ ...project, revision }} busy={aiBusy} setBusy={async (b) => { if (b && saveState !== 'salvo') await save(); setAiBusy(b); }} onChanged={reloadFromServer} />
        ))}
      </div>

      {modal === 'versions' && <VersionsModal projectId={project.id} onClose={() => setModal(null)} onRestored={async () => { await reloadFromServer(); setModal(null); }} />}
      {modal === 'share' && <ShareModal projectId={project.id} onClose={() => setModal(null)} />}
      {modal === 'validation' && (
        <Modal title="IA Testadora — verificações automáticas" onClose={() => setModal(null)}>
          <p className="small muted">{validation.stats && `${validation.stats.entities} entidades · ${validation.stats.scripts} scripts · ${validation.stats.missions} missões · vegetação ${validation.stats.vegetation?.toLocaleString('pt-BR')}`}</p>
          {validation.errors.map((e) => <div key={e} className="error-box small" style={{ marginBottom: 6 }}>{e}</div>)}
          {validation.warnings.map((w) => <div key={w} className="warn-box small" style={{ marginBottom: 6 }}>{w}</div>)}
          {!validation.errors.length && !validation.warnings.length && <div className="info-box">Nenhum problema encontrado.</div>}
          <p className="small muted mt">Para tentar corrigir automaticamente, use a NEXPLAY AI com a especialidade “IA Testadora”.</p>
        </Modal>
      )}
      {modal === 'conflict' && (
        <Modal title="Projeto alterado em outro lugar" onClose={() => setModal(null)}>
          <p>Outro colaborador (ou outra aba/computador) salvou uma versão mais nova. Para não sobrescrever o trabalho, escolha:</p>
          <div className="row"><ActionButton className="btn primary" onClick={async () => { await reloadFromServer(); setModal(null); }}>Carregar a versão mais recente</ActionButton>
            <ActionButton className="btn" onClick={async () => { const d = await api.get(`/projects/${project.id}`); revRef.current = d.project.revision; setRevision(d.project.revision); await save('manual', 'Versão local mantida após conflito'); setModal(null); }}>Manter a minha (vira nova versão)</ActionButton></div>
          <p className="tiny muted mt">Qualquer escolha pode ser desfeita pelo histórico de versões.</p>
        </Modal>
      )}
    </div>
  );
}

function VersionsModal({ projectId, onClose, onRestored }) {
  const s = useLoad(() => api.get(`/projects/${projectId}/versions`), [projectId]);
  const SRC = { manual: 'Manual', autosave: 'Automático', ai: 'NEXPLAY AI', autopilot: 'Autopilot', restore: 'Restauração', import: 'Importação' };
  return (
    <Modal title="Histórico de versões (NEXPLAY CLOUD)" onClose={onClose} wide>
      <Loader state={s}>{(d) => (
        <div className="table-wrap"><table className="table"><tbody>{d.versions.map((v) => (
          <tr key={v.id}><td>rev. {v.revision}</td><td><span className="pill">{SRC[v.source]}</span></td><td className="small">{v.label}</td><td className="small muted">{v.username ? `@${v.username}` : ''} · {ago(v.created_at)}</td>
            <td><ActionButton className="btn sm" onClick={async () => { await api.post(`/projects/${projectId}/versions/${v.id}/restore`); await onRestored(); }}>Restaurar</ActionButton></td></tr>
        ))}</tbody></table><p className="tiny muted">O número de versões guardadas depende do plano. Versões salvas manualmente com nome são preservadas por mais tempo.</p></div>
      )}</Loader>
    </Modal>
  );
}

function ShareModal({ projectId, onClose }) {
  const s = useLoad(() => api.get(`/projects/${projectId}/members`), [projectId]);
  const [v, setV] = useState({ username: '', role: 'editor' });
  return (
    <Modal title="Colaboradores" onClose={onClose}>
      <div className="stack">
        <div className="row"><input className="input" style={{ flex: 1 }} placeholder="Nome de usuário" value={v.username} onChange={(e) => setV({ ...v, username: e.target.value })} /><select className="input" style={{ width: 'auto' }} value={v.role} onChange={(e) => setV({ ...v, role: e.target.value })}><option value="editor">Pode editar</option><option value="viewer">Somente ver</option></select><ActionButton className="btn primary" ok="Convite enviado" onClick={async () => { await api.post(`/projects/${projectId}/members`, v); s.reload(); }}>Adicionar</ActionButton></div>
        <Loader state={s}>{(d) => d.members.map((m) => <div key={m.id} className="row between"><span className="row"><Avatar user={m} size={28} />{m.displayName} <span className="pill">{m.role === 'editor' ? 'edição' : 'leitura'}</span></span><ActionButton className="btn sm ghost" onClick={async () => { await api.del(`/projects/${projectId}/members/${m.username}`); s.reload(); }}>Remover</ActionButton></div>)}</Loader>
        <p className="tiny muted">Colaboradores acessam o projeto pela NEXPLAY CLOUD em qualquer computador. Edições simultâneas são protegidas contra sobrescrita.</p>
      </div>
    </Modal>
  );
}
