// Painel da NEXPLAY AI: comandos por especialidade (com streaming de progresso), equipe com IA Testadora,
// histórico, desfazer alterações da IA e o AUTOPILOT (DELUXE).
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api.js';
import { useAuth } from '../auth.jsx';
import { useLoad, Loader, useToast } from '../components/ui.jsx';
import { Icon } from '../components/icons.jsx';

const EXAMPLES = [
  'Crie uma floresta com árvores detalhadas, chuva e uma cabana.',
  'Adicione um estádio com torcida e iluminação noturna.',
  'Adicione personagens com animações naturais andando pela vila.',
  'Crie um sistema de placar e cronômetro com menu inicial.',
  'Melhore a iluminação e a qualidade das texturas.',
  'Corrija os problemas encontrados no meu jogo.',
];

export default function AIPanel({ project, onChanged, busy, setBusy }) {
  const { user, has } = useAuth();
  const toast = useToast();
  const status = useLoad(() => api.get('/ai/status'), []);
  const convo = useLoad(() => api.get(`/ai/projects/${project.id}/conversation`), [project.id]);
  const [specialist, setSpecialist] = useState('artist3d');
  const [prompt, setPrompt] = useState('');
  const [withTester, setWithTester] = useState(false);
  const [live, setLive] = useState([]);
  const [tab, setTab] = useState('chat');
  const end = useRef(null);
  useEffect(() => { end.current?.scrollIntoView({ block: 'end' }); }, [convo.data, live]);

  const run = async () => {
    if (!prompt.trim()) return;
    setBusy(true); setLive([{ kind: 'user', text: prompt }]);
    const sent = prompt; setPrompt('');
    let result = null;
    try {
      await api.stream(`/ai/projects/${project.id}/command`, { prompt: sent, specialist, withTester }, (ev) => {
        if (ev.type === 'tool') setLive((l) => [...l, { kind: 'tool', text: `${ev.specialist} → ${ev.tool}` }]);
        if (ev.type === 'tool_error') setLive((l) => [...l, { kind: 'err', text: `${ev.tool}: ${ev.message}` }]);
        if (ev.type === 'phase') setLive((l) => [...l, { kind: 'tool', text: ev.message }]);
        if (ev.type === 'error') throw new Error(ev.message);
        if (ev.type === 'result') result = ev;
      });
      if (result?.changes?.length) await onChanged();
      status.reload();
    } catch (e) { toast(e.message, 'error'); } finally { setLive([]); setBusy(false); convo.reload(); }
  };

  const undo = async (versionId) => {
    const { versions } = await api.get(`/projects/${project.id}/versions`);
    const i = versions.findIndex((v) => v.id === versionId);
    if (i < 0 || !versions[i + 1]) return toast('Versão anterior não está mais no histórico.', 'error');
    await api.post(`/projects/${project.id}/versions/${versions[i + 1].id}/restore`);
    await onChanged();
    toast('Alteração da IA desfeita (a versão anterior foi restaurada).', 'ok');
  };

  return (
    <Loader state={status}>{(st) => (
      <div className="ai-panel">
        <div className="row between" style={{ marginBottom: 8 }}>
          <b className="gradient-text">NEXPLAY AI</b>
          <span className="tiny muted">{st.quota.dailyLimit == null ? 'Comandos ilimitados' : `${st.quota.remaining}/${st.quota.dailyLimit} hoje`} · {st.quota.plan.toUpperCase()}</span>
        </div>
        {!st.configured && <div className="warn-box small">{st.note || 'A IA ainda não está configurada neste servidor (falta a chave ANTHROPIC_API_KEY). As ferramentas visuais e de código funcionam normalmente.'}</div>}
        <div className="tabs" style={{ marginBottom: 8 }}><button className={`tab ${tab === 'chat' ? 'active' : ''}`} onClick={() => setTab('chat')}>Comandos</button><button className={`tab ${tab === 'autopilot' ? 'active' : ''}`} onClick={() => setTab('autopilot')}>AUTOPILOT</button></div>
        {tab === 'chat' ? (
          <>
            <div className="ai-msgs">
              <Loader state={convo}>{(d) => (d.messages.length ? d.messages.map((m) => (
                <div key={m.id} className={`ai-msg ${m.role === 'user' ? 'user' : ''}`}>
                  {m.role === 'assistant' && <div className="tiny muted">{st.specialists.find((s) => s.key === m.specialist)?.name}</div>}
                  {m.content}
                  {m.changes?.changes?.length > 0 && <details className="tiny"><summary>{m.changes.changes.length} alteração(ões)</summary>{m.changes.changes.slice(0, 40).map((c, i) => <div key={i}>• {c.label}</div>)}</details>}
                  {m.changes?.limitations?.length > 0 && <div className="warn-box tiny" style={{ marginTop: 6 }}>Não foi possível: {m.changes.limitations.map((l) => `${l.task} (${l.reason})`).join('; ')}</div>}
                  {m.version_id && <button className="btn sm ghost" onClick={() => undo(m.version_id)}><Icon name="undo" size={12} /> Desfazer</button>}
                </div>
              )) : <div className="small muted">Descreva o que quer criar. A IA trabalha direto no projeto e cada resposta vira uma versão que você pode desfazer.<div className="stack" style={{ gap: 4, marginTop: 8 }}>{EXAMPLES.map((x) => <button key={x} className="btn sm ghost" style={{ justifyContent: 'flex-start', whiteSpace: 'normal', textAlign: 'left' }} onClick={() => setPrompt(x)}>{x}</button>)}</div></div>)}</Loader>
              {live.map((l, i) => <div key={i} className={`ai-msg ${l.kind === 'user' ? 'user' : ''}`} style={l.kind === 'err' ? { borderColor: 'var(--danger)' } : l.kind === 'tool' ? { fontSize: 11, opacity: 0.85 } : undefined}>{l.kind === 'tool' ? '⚙ ' : ''}{l.text}</div>)}
              {busy && <div className="spinner" style={{ margin: '8px auto', width: 22, height: 22 }} />}
              <div ref={end} />
            </div>
            <select className="input" style={{ padding: 6, fontSize: 13 }} value={specialist} onChange={(e) => setSpecialist(e.target.value)}>{st.specialists.map((s) => <option key={s.key} value={s.key}>{s.name} — {s.description}</option>)}</select>
            <textarea className="input" style={{ minHeight: 80, marginTop: 6 }} value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Ex.: Crie uma floresta com chuva e uma cabana iluminada…" onKeyDown={(e) => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) run(); }} />
            <div className="row between" style={{ marginTop: 6 }}>
              <label className="check tiny" title={st.tier.team ? '' : 'PRO ou DELUXE'}><input type="checkbox" checked={withTester} disabled={!st.tier.team} onChange={(e) => setWithTester(e.target.checked)} /> + IA Testadora</label>
              <button className="btn primary sm" disabled={busy || !st.configured || !prompt.trim()} onClick={run}><Icon name="sparkles" /> Executar</button>
            </div>
          </>
        ) : (
          st.quota.plan === 'local' ? <div className="info-box small">O <b>AUTOPILOT</b> (planejamento em etapas, testes e correções automáticas) roda no servidor da NEXPLAY. Nesta versão para celular, use a aba <b>Comandos</b>: cada pedido é feito pelo especialista escolhido e vira uma versão que você pode desfazer.</div>
          : has('autopilot') ? <Autopilot project={project} onChanged={onChanged} configured={st.configured} />
            : <div className="info-box small">O <b>NEXPLAY AI AUTOPILOT</b> divide pedidos complexos em etapas, executa cada especialista, testa, corrige e pede aprovação para mudanças importantes. Exclusivo do plano DELUXE. <Link to="/planos">Ver planos</Link>{!user && ''}</div>
        )}
      </div>
    )}</Loader>
  );
}

const STEP_ICON = { pending: '○', running: '◐', done: '●', failed: '✕', skipped: '⤼', needs_approval: '!', canceled: '✕' };

function Autopilot({ project, onChanged, configured }) {
  const toast = useToast();
  const [request, setRequest] = useState('');
  const [runId, setRunId] = useState(null);
  const [run, setRun] = useState(null);
  const lastDone = useRef(0);
  useEffect(() => {
    if (!runId) return undefined;
    let stop = false;
    const tick = async () => {
      try {
        const { run: r } = await api.get(`/ai/autopilot/${runId}`);
        if (stop) return;
        setRun(r);
        const done = r.log.filter((l) => l.kind === 'step_done' || l.kind === 'done').length;
        if (done > lastDone.current) { lastDone.current = done; onChanged(); }
        if (!['completed', 'failed', 'canceled'].includes(r.status)) setTimeout(tick, 2000);
      } catch (e) { toast(e.message, 'error'); }
    };
    tick();
    return () => { stop = true; };
  }, [runId]); // eslint-disable-line react-hooks/exhaustive-deps
  const decide = async (decision) => { await api.post(`/ai/autopilot/${runId}/approve`, { decision }); setRunId(null); setTimeout(() => setRunId(runId), 50); };
  if (!run) {
    return (
      <div className="stack" style={{ gap: 8 }}>
        <p className="small muted">Peça algo complexo. O Autopilot entende o pedido, monta um plano, executa as etapas com os especialistas, testa e corrige. Você aprova o plano e mudanças importantes; cada etapa fica no histórico de versões.</p>
        <textarea className="input" style={{ minHeight: 120 }} value={request} onChange={(e) => setRequest(e.target.value)} placeholder="Crie um jogo de futebol 3D com estádio, clubes, jogadores, campeonatos, transferências, modo carreira e menus." />
        <button className="btn primary" disabled={!configured || request.trim().length < 10} onClick={async () => { try { const r = await api.post(`/ai/projects/${project.id}/autopilot`, { request }); lastDone.current = 0; setRunId(r.runId); } catch (e) { toast(e.message, 'error'); } }}><Icon name="bolt" /> Iniciar Autopilot</button>
      </div>
    );
  }
  return (
    <div className="ai-msgs">
      <div className="row between"><span className="pill">{run.status}</span>{!['completed', 'failed', 'canceled'].includes(run.status) && <button className="btn sm danger" onClick={() => api.post(`/ai/autopilot/${runId}/cancel`)}>Cancelar</button>}</div>
      {run.plan?.summary && <div className="ai-msg"><b>Plano:</b> {run.plan.summary}</div>}
      {run.plan?.limitations?.length > 0 && <div className="warn-box tiny">Limitações previstas: {run.plan.limitations.join('; ')}</div>}
      {(run.plan?.steps || []).map((s) => (
        <div key={s.index} className="ai-msg" style={{ borderColor: s.status === 'running' ? 'var(--cyan)' : s.status === 'needs_approval' ? 'var(--gold)' : undefined }}>
          <b>{STEP_ICON[s.status]} {s.index + 1}. {s.title}</b> <span className="tiny muted">({s.specialist}){s.important ? ' · importante' : ''}</span>
          <div className="tiny muted">{s.instructions.slice(0, 220)}</div>
          {s.result && <details className="tiny"><summary>{s.result.changes.length} alterações · {s.result.errors.length} erros</summary>{s.result.text}{s.result.errors.map((e) => <div key={e} style={{ color: '#fecdd3' }}>• {e}</div>)}</details>}
        </div>
      ))}
      {run.status === 'awaiting_approval' && <div className="row"><button className="btn primary sm" onClick={() => decide('approve')}>Aprovar plano e executar</button><button className="btn sm" onClick={() => decide('reject')}>Recusar</button></div>}
      {run.status === 'paused' && <div className="row"><button className="btn primary sm" onClick={() => decide('approve')}>Aprovar alteração</button><button className="btn sm" onClick={() => decide('reject')}>Descartar etapa</button></div>}
      <details open={run.status !== 'completed'}><summary className="tiny muted">Registro</summary>{run.log.slice(-40).map((l, i) => <div key={i} className="tiny" style={{ color: l.kind === 'error' ? '#fecdd3' : undefined }}>{new Date(l.at).toLocaleTimeString('pt-BR')} {l.message}</div>)}</details>
      {['completed', 'failed', 'canceled'].includes(run.status) && <button className="btn sm" onClick={() => { setRun(null); setRunId(null); }}>Novo pedido</button>}
    </div>
  );
}
