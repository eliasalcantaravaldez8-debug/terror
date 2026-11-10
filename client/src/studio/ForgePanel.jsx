// NEXPLAY FORGE no Studio: ferramentas disponíveis, estilo do projeto, criação/importação de assets,
// acompanhamento das etapas e teste automático de cada asset dentro do motor do jogo.
import { useEffect, useRef, useState } from 'react';
import { api, sandboxPerms, postTarget } from '../api.js';
import { sandboxInfo } from './Preview.jsx';
import { useLoad, Loader, useToast } from '../components/ui.jsx';
import PixelEditor from './PixelEditor.jsx';

const STEP_ICON = { running: '◐', done: '●', failed: '✕', skipped: '⤼', pending: '○' };
const CAT_LABEL = { character: 'Personagem', creature: 'Criatura', animal: 'Animal', vehicle: 'Veículo', building: 'Construção', house: 'Casa', furniture: 'Móvel', prop: 'Objeto', weapon: 'Arma', tree: 'Árvore', plant: 'Planta', rock: 'Rocha', terrain_piece: 'Peça de cenário', item: 'Item' };
const VOXEL_EXAMPLE = JSON.stringify({ size: [12, 12, 12], palette: { w: '#c8a165', r: '#b33a3a', d: '#5b3a22', g: '#7dd3fc' }, shapes: [
  { type: 'box', from: [1, 0, 1], to: [10, 6, 10], color: 'w', hollow: true }, { type: 'box', from: [5, 0, 1], to: [6, 3, 1], color: 'd' },
  { type: 'box', from: [2, 3, 1], to: [3, 4, 1], color: 'g' }, { type: 'pyramid', center: [5.5, 7, 5.5], radius: 6, height: 5, color: 'r' }] }, null, 1);

export default function ForgePanel({ project, doc, apply, jobs, reloadJobs, dropPoint }) {
  const toast = useToast();
  const tools = useLoad(() => api.get('/pipeline/tools'), []);
  const [mode, setMode] = useState(doc.meta.dimension === '2d' ? 'pixel' : 'model3d');
  const [f, setF] = useState({ prompt: '', name: '', category: 'prop', style: 'auto', provider: 'auto', entityType: 'model' });
  const [voxel, setVoxel] = useState(VOXEL_EXAMPLE);
  const [busy, setBusy] = useState(false);
  const fileRef = useRef(null);
  const refImage = useRef(null);
  const place = () => ({ position: doc.meta.dimension === '2d' ? [96, 400, 0] : (dropPoint?.() || [0, 0, 0]) });

  const submit = async (body) => {
    setBusy(true);
    try { await api.post(`/pipeline/projects/${project.id}/jobs`, { place: place(), ...body }); toast('Enviado para a linha de produção.', 'ok'); reloadJobs(); } catch (e) { toast(e.message, 'error'); } finally { setBusy(false); }
  };
  const importFile = async (file, extra = {}) => {
    if (!file) return;
    setBusy(true);
    try {
      const form = new FormData();
      form.append('file', file);
      const p = place().position;
      Object.entries({ category: f.category, style: f.style, name: f.name || '', x: p[0], y: p[1], z: p[2], ...extra }).forEach(([k, v]) => v !== undefined && v !== '' && form.append(k, String(v)));
      await api.upload(`/pipeline/projects/${project.id}/import`, form);
      toast('Arquivo enviado para aprimoramento e integração.', 'ok'); reloadJobs();
    } catch (e) { toast(e.message, 'error'); } finally { setBusy(false); }
  };

  return (
    <Loader state={tools}>{(t) => {
      const avail = Object.fromEntries(t.tools.map((x) => [x.id, x.available]));
      const style = doc.artStyle;
      return (
        <div className="stack" style={{ gap: 10 }}>
          <div className="small"><b className="gradient-text">NEXPLAY FORGE</b> <span className="muted">— linha de produção de assets</span></div>
          <div className="card" style={{ padding: 8 }}>
            <div className="tiny muted">Estilo visual do projeto (identidade única)</div>
            <select className="input" style={{ padding: 6, marginTop: 4 }} value={style || ''} onChange={(e) => apply([{ op: 'set_art_style', style: e.target.value }])}>
              <option value="" disabled>Escolha…</option>{t.styles.map((s) => <option key={s.id} value={s.id}>{s.label} ({s.dimension.toUpperCase()})</option>)}
            </select>
            {style && <div className="tiny muted" style={{ marginTop: 4 }}>{t.styles.find((s) => s.id === style)?.description}</div>}
            <button className="btn sm ghost" style={{ marginTop: 4 }} onClick={async () => {
              const r = await api.post('/pipeline/classify', { text: `${doc.meta.name} ${doc.meta.description || ''} ${doc.meta.genre}`, dimension: doc.meta.dimension });
              apply([{ op: 'set_art_style', style: r.style }]); toast(`Estilo sugerido: ${r.style} — ${r.reason}`, 'ok');
            }}>Sugerir pelo projeto</button>
          </div>
          <details>
            <summary className="tiny" style={{ cursor: 'pointer' }}>Ferramentas ({t.tools.filter((x) => x.available).length}/{t.tools.length} disponíveis) · gerações por IA hoje: {t.quota.used}/{t.quota.limit}</summary>
            {t.tools.map((x) => <div key={x.id} className="tiny" style={{ padding: '4px 0', borderBottom: '1px solid var(--line)' }}><b>{x.available ? '🟢' : '⚪'} {x.name}</b> <span className="muted">— {x.note}</span><div className="muted">Licença: {x.license}</div></div>)}
          </details>
          <div className="row" style={{ gap: 4 }}>
            {[['model3d', 'IA 3D'], ['voxel', 'Voxel'], ['pixel', 'Pixel art'], ['import', 'Importar']].map(([k, l]) => <button key={k} className={`btn sm ${mode === k ? 'primary' : ''}`} onClick={() => setMode(k)}>{l}</button>)}
          </div>
          {mode === 'model3d' && (
            <div className="stack" style={{ gap: 6 }}>
              {!avail.tripo && !avail.meshy && <div className="warn-box tiny">Nenhum gerador 3D por IA configurado (Tripo AI / Meshy AI). Use voxel, importe um .glb ou peça ao administrador para configurar as chaves. O Blender {avail.blender ? 'está' : 'não está'} disponível para aprimorar modelos importados.</div>}
              <textarea className="input" style={{ minHeight: 60 }} placeholder="Ex.: medieval wooden cart with two wheels, worn paint" value={f.prompt} onChange={(e) => setF({ ...f, prompt: e.target.value })} />
              <div className="row" style={{ gap: 4 }}>
                <input className="input" style={{ flex: 1, padding: 6 }} placeholder="Nome" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
                <select className="input" style={{ width: 'auto', padding: 6 }} value={f.category} onChange={(e) => setF({ ...f, category: e.target.value })}>{t.categories.map((c) => <option key={c} value={c}>{CAT_LABEL[c] || c}</option>)}</select>
              </div>
              <div className="row" style={{ gap: 4 }}>
                <select className="input" style={{ flex: 1, padding: 6 }} value={f.provider} onChange={(e) => setF({ ...f, provider: e.target.value })}><option value="auto">Ferramenta automática</option><option value="tripo" disabled={!avail.tripo}>Tripo AI</option><option value="meshy" disabled={!avail.meshy}>Meshy AI</option></select>
                {['character', 'creature'].includes(f.category) && <select className="input" style={{ width: 'auto', padding: 6 }} value={f.entityType} onChange={(e) => setF({ ...f, entityType: e.target.value })}><option value="character">Personagem</option><option value="npc">NPC</option></select>}
              </div>
              <div className="row" style={{ gap: 4 }}>
                <button className="btn sm primary" disabled={busy || (!avail.tripo && !avail.meshy) || f.prompt.trim().length < 3} onClick={() => submit({ kind: 'model3d', prompt: f.prompt, name: f.name || undefined, category: f.category, style: f.style, provider: f.provider, entityType: ['character', 'creature'].includes(f.category) ? (f.entityType === 'npc' ? 'npc' : 'character') : undefined })}>Gerar modelo</button>
                <label className="btn sm" style={{ opacity: !avail.tripo && !avail.meshy ? 0.5 : 1 }}>De uma imagem<input ref={refImage} hidden type="file" accept="image/png,image/jpeg" disabled={!avail.tripo && !avail.meshy} onChange={(e) => importFile(e.target.files[0], { mode: 'reference', prompt: f.prompt, provider: f.provider })} /></label>
              </div>
            </div>
          )}
          {mode === 'voxel' && (
            <div className="stack" style={{ gap: 6 }}>
              <input className="input" style={{ padding: 6 }} placeholder="Nome" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
              <textarea className="code" style={{ minHeight: 160 }} spellCheck={false} value={voxel} onChange={(e) => setVoxel(e.target.value)} />
              <p className="tiny muted">Formas: box, sphere, ellipsoid, cylinder, cone, pyramid, line, voxel (hollow/erase opcionais) ou camadas. No modo fácil, peça à IA Diretora de Arte: “crie uma casa voxel com telhado vermelho”.</p>
              <button className="btn sm primary" disabled={busy} onClick={() => { let spec; try { spec = JSON.parse(voxel); } catch (e) { toast(`JSON inválido: ${e.message}`, 'error'); return; } submit({ kind: 'voxel', name: f.name || 'Voxel', voxelSpec: spec, category: f.category }); }}>Construir voxel</button>
            </div>
          )}
          {mode === 'pixel' && <PixelEditor busy={busy} onSubmit={({ name, spec, role }) => submit({ kind: 'sprite', name, spriteSpec: spec, role })} />}
          {mode === 'import' && (
            <div className="stack" style={{ gap: 6 }}>
              <select className="input" style={{ padding: 6 }} value={f.category} onChange={(e) => setF({ ...f, category: e.target.value })}>{t.categories.map((c) => <option key={c} value={c}>{CAT_LABEL[c] || c}</option>)}</select>
              <label className="btn sm primary">Escolher arquivo<input ref={fileRef} hidden type="file" accept=".glb,.vox,.png,.jpg,.jpeg,.webp,.kra,.ora" onChange={(e) => importFile(e.target.files[0], /\.(png|jpe?g|webp|kra|ora)$/i.test(e.target.files[0]?.name || '') ? { pixelArt: String(style === 'pixel') } : {})} /></label>
              <p className="tiny muted">.glb (Blender, Tripo, Meshy, Sketchfab…) passa por reparo, escala, Blender, rigging (personagens), LODs e colisão. .vox vem do MagicaVoxel. .png/.jpg/.webp viram sprites; .kra/.ora (Krita) usam a imagem composta. Verifique se você tem direito de usar o arquivo.</p>
            </div>
          )}
          <div className="tiny muted" style={{ marginTop: 6 }}>Produção</div>
          {jobs.length ? jobs.slice(0, 12).map((j) => <JobCard key={j.id} job={j} projectId={project.id} onCancel={async () => { await api.post(`/pipeline/jobs/${j.id}/cancel`); reloadJobs(); }} />) : <p className="tiny muted">Nenhum asset produzido ainda.</p>}
        </div>
      );
    }}</Loader>
  );
}

function JobCard({ job, projectId, onCancel }) {
  const active = ['queued', 'running', 'integrating'].includes(job.status);
  return (
    <div className="card" style={{ padding: 8, borderColor: job.status === 'failed' ? 'var(--danger)' : active ? 'var(--cyan)' : undefined }}>
      <div className="row between tiny"><b>{job.prompt.slice(0, 40) || job.kind}</b><span className={`pill ${job.status === 'done' ? 'green' : job.status === 'failed' ? 'red' : 'cyan'}`} style={{ fontSize: 10 }}>{job.status}</span></div>
      <div className="tiny muted">{job.kind} · {job.provider} · estilo {job.style}</div>
      {job.steps.map((s) => <div key={s.name} className="tiny" title={s.detail || ''} style={{ color: s.status === 'failed' ? '#fda4af' : undefined }}>{STEP_ICON[s.status] || '○'} {s.name}{s.detail ? <span className="muted"> — {s.detail.slice(0, 140)}</span> : null}</div>)}
      {job.error && <div className="tiny" style={{ color: '#fda4af' }}>{job.error}</div>}
      {job.result?.provenance && <div className="tiny muted">Origem: {job.result.provenance.tool}. {job.result.provenance.license}</div>}
      <div className="row" style={{ gap: 4, marginTop: 4 }}>
        {active && <button className="btn sm ghost" onClick={onCancel}>Cancelar</button>}
        {job.status === 'done' && job.style === 'voxel' && job.result?.assetId && <a className="btn sm ghost" href={`/api/pipeline/projects/${projectId}/assets/${job.result.assetId}/vox`}>.vox (MagicaVoxel)</a>}
      </div>
    </div>
  );
}

/** Executa, um por vez, o teste de cada asset novo dentro do motor real (player isolado). */
export function ForgeTester({ project, jobs, onTested }) {
  const frame = useRef(null);
  const [current, setCurrent] = useState(null);
  const [sb, setSb] = useState(null);
  const origin = sb?.origin;
  const tried = useRef(new Set());
  useEffect(() => { sandboxInfo().then(setSb); }, []);
  useEffect(() => {
    if (current || !origin) return;
    const next = jobs.find((j) => j.status === 'done' && j.result?.entityId && !j.result?.test && !tried.current.has(j.id));
    if (next) { tried.current.add(next.id); setCurrent(next); }
  }, [jobs, current, origin]);
  useEffect(() => {
    if (!current) return undefined;
    let done = false;
    const finish = async (result) => {
      if (done) return; done = true;
      try { await api.post(`/pipeline/jobs/${current.id}/test`, result); } catch { /* registrado como falha no próximo ciclo */ }
      setCurrent(null); onTested();
    };
    const onMsg = async (ev) => {
      if (ev.source !== frame.current?.contentWindow || ev.origin !== origin) return;
      const m = ev.data || {};
      if (m.type === 'nexplay:waiting') {
        const { doc } = await api.get(`/projects/${project.id}`);
        const assets = {};
        await Promise.all((doc.assets || []).map(async (a) => { if (!a.assetId) return; const r = await fetch(`/api/projects/${project.id}/assets/${a.assetId}/file`, { credentials: 'same-origin' }); if (r.ok) assets[a.id] = await r.arrayBuffer(); }));
        frame.current.contentWindow.postMessage({ type: 'nexplay:load', doc, assets, test: { entityId: current.result.entityId, jobId: current.id } }, postTarget(origin), Object.values(assets));
      } else if (m.type === 'nexplay:test_result' && m.jobId === current.id) finish(sanitize(m.result));
    };
    window.addEventListener('message', onMsg);
    const timeout = setTimeout(() => finish({ loaded: false, error: 'O teste não respondeu em 60 s.' }), 60_000);
    return () => { window.removeEventListener('message', onMsg); clearTimeout(timeout); };
  }, [current]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!current || !sb) return null;
  return (
    <div style={{ position: 'absolute', right: 10, bottom: 10, width: 320, zIndex: 5 }} className="card">
      <div className="tiny"><b>Teste no jogo:</b> {current.prompt.slice(0, 40)}</div>
      <iframe ref={frame} title="Teste do asset" src={`${sb.url}/runtime/player.html`} sandbox={sandboxPerms(origin, '')} referrerPolicy="origin" style={{ width: '100%', height: 170, border: 0, borderRadius: 8, marginTop: 6 }} />
    </div>
  );
}

function sanitize(r = {}) {
  const out = { loaded: !!r.loaded };
  for (const k of ['triangles', 'drawCalls']) if (Number.isFinite(r[k])) out[k] = Math.max(0, Math.round(r[k]));
  if (Number.isFinite(r.fps)) out.fps = Math.min(1000, Math.max(0, r.fps));
  if (Number.isFinite(r.groundOffset)) out.groundOffset = r.groundOffset;
  if (Array.isArray(r.size) && r.size.length === 3 && r.size.every(Number.isFinite)) out.size = r.size;
  if (r.error) out.error = String(r.error).slice(0, 290);
  return out;
}
