// "Criar com IA": um chat onde o criador descreve o jogo, a IA Criadora monta o projeto inteiro pelas
// ferramentas reais do NEXPLAY Studio e o criador testa na hora. Cada pedido seguinte ("melhore os gráficos",
// "deixe mais difícil") altera o MESMO projeto e vira uma versão que pode ser desfeita.
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api, GENRE_LABEL } from '../api.js';
import { useLoad, useToast } from '../components/ui.jsx';
import { Icon } from '../components/icons.jsx';
import Preview from '../studio/Preview.jsx';

const IDEAS = [
  'Um jogo de terror numa floresta à noite, com chuva, onde preciso achar 3 páginas e fugir de um monstro.',
  'Um jogo de plataforma 2D com moedas, espinhos e inimigos, e uma bandeira no final.',
  'Uma corrida 3D num circuito com rivais e três voltas.',
  'Um jogo de futebol 3D num estádio à noite com torcida.',
  'Um jogo de aventura numa ilha com ruínas e um tesouro escondido.',
];
// Pedido feito antes de o projeto existir: sobrevive à troca de rota /criar-com-ia → /criar-com-ia/:id.
let pendingPrompt = null;
const NEXT = ['Upgrade em tudo: gráficos, jogabilidade, menus e desafio', 'Melhore os gráficos', 'Deixe mais difícil', 'Adicione mais inimigos', 'Mude para noite com chuva', 'Adicione placar e cronômetro', 'Crie uma segunda fase'];
const STEP = {
  get_project_overview: 'Analisando o jogo…', get_entities: 'Analisando objetos…', read_script: 'Lendo o código…', add_entities: 'Montando o cenário e os objetos…',
  update_entities: 'Ajustando objetos…', remove_entities: 'Removendo objetos…', set_material: 'Aplicando materiais e texturas…', set_environment: 'Ajustando céu, clima e luz…',
  set_rendering: 'Melhorando os gráficos…', write_script: 'Programando mecânicas…', delete_script: 'Limpando código…', set_player: 'Configurando o jogador e os controles…',
  upsert_mission: 'Criando o objetivo do jogo…', remove_mission: 'Ajustando objetivos…', upsert_dialogue: 'Escrevendo diálogos…', set_system: 'Criando sistemas do jogo…',
  set_ui: 'Criando menu e HUD…', validate_project: 'Testando o projeto…', report_limitation: 'Registrando uma limitação…', get_forge_tools: 'Verificando ferramentas de arte…',
  set_art_style: 'Definindo o estilo visual…', generate_3d_model: 'Encomendando modelo 3D…', create_voxel_model: 'Criando modelo voxel…', create_pixel_sprite: 'Desenhando sprite…',
};

/** Escolhe 2D/3D, gênero e um nome a partir do primeiro pedido (a IA monta o resto). */
function guess(text) {
  const t = text.toLowerCase();
  const dimension = /\b2d\b|plataforma|pixel|side.?scroll|estilo mario|de lado/.test(t) ? '2d' : '3d';
  const rules = [[/terror|medo|assombr|zumbi|monstro/, 'terror'], [/futebol|gol\b|estádio/, 'futebol'], [/corrida|carro|circuito|kart/, 'corrida'], [/sobreviv/, 'sobrevivencia'],
    [/plataforma/, 'plataforma'], [/mundo aberto|cidade|vila/, 'mundo_aberto'], [/tiro|atirar|arma/, 'tiro'], [/luta|lutador/, 'luta'], [/rpg|missões|magia/, 'rpg'],
    [/puzzle|quebra-cabeça|enigma/, 'puzzle'], [/aventura|tesouro|ilha|explor/, 'aventura'], [/ação|inimigos|combate/, 'acao']];
  const genre = rules.find(([re]) => re.test(t))?.[1] || (dimension === '2d' ? 'plataforma' : 'aventura');
  let rest = text.trim(); for (let i = 0; i < 6; i++) rest = rest.replace(/^(crie|cria|criar|faça|faz|fazer|quero|eu|me|um|uma|jogo|game|de|do|da|em)\s+/i, '');
  const words = rest.split(/\s+/).slice(0, 5).join(' ');
  const name = (words.charAt(0).toUpperCase() + words.slice(1)).replace(/[.,;:!?]+$/, '');
  return { dimension, genre, name: name.slice(0, 60) || 'Meu jogo' };
}

export default function AIChat() {
  const { id } = useParams();
  const nav = useNavigate();
  const toast = useToast();
  const status = useLoad(() => api.get('/ai/status'), []);
  const [project, setProject] = useState(null);
  const [messages, setMessages] = useState([]);
  const [live, setLive] = useState(null); // { prompt, steps: [] }
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const [testing, setTesting] = useState(null); // { doc, revision }
  const end = useRef(null);

  const load = async (pid) => {
    const [p, c] = await Promise.all([api.get(`/projects/${pid}`), api.get(`/ai/projects/${pid}/conversation`)]);
    setProject(p.project); setMessages(c.messages);
    return p;
  };
  useEffect(() => {
    if (!id) { setProject(null); setMessages([]); return; }
    load(id).then(() => { if (pendingPrompt) { const pr = pendingPrompt; pendingPrompt = null; send(pr, Number(id)); } }).catch((e) => toast(e.message, 'error'));
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { end.current?.scrollIntoView({ block: 'end', behavior: 'smooth' }); }, [messages, live]);

  const send = async (prompt, pid = project?.id) => {
    prompt = prompt.trim();
    if (!prompt || busy) return;
    if (!pid) {
      // Primeiro pedido: cria um projeto NOVO e em branco; a IA monta o jogo nele.
      try {
        const g = guess(prompt);
        const d = await api.post('/projects', { name: g.name, dimension: g.dimension, genre: g.genre, template: 'vazio' });
        pendingPrompt = prompt; setText('');
        nav(`/criar-com-ia/${d.project.id}`, { replace: !!id });
      } catch (e) { toast(e.message, 'error'); }
      return;
    }
    setBusy(true); setText(''); setLive({ prompt, steps: [] });
    let result = null;
    try {
      await api.stream(`/ai/projects/${pid}/command`, { prompt, specialist: 'criadora' }, (ev) => {
        if (ev.type === 'tool') setLive((l) => (l.steps[l.steps.length - 1] === STEP[ev.tool] ? l : { ...l, steps: [...l.steps, STEP[ev.tool] || 'Trabalhando…'] }));
        if (ev.type === 'tool_error') setLive((l) => ({ ...l, steps: [...l.steps, `⚠ ${ev.message.slice(0, 120)}`] }));
        if (ev.type === 'error') throw new Error(ev.message);
        if (ev.type === 'result') result = ev;
      });
      await load(pid);
      if (result?.changes?.length) toast('Pronto! Toque em "Testar o jogo".', 'ok');
    } catch (e) { toast(e.message, 'error'); await load(pid).catch(() => {}); } finally { setLive(null); setBusy(false); }
  };

  const test = async () => {
    const d = await api.get(`/projects/${project.id}`);
    setTesting({ doc: d.doc, revision: d.project.revision });
  };
  const undo = async (versionId) => {
    const { versions } = await api.get(`/projects/${project.id}/versions`);
    const i = versions.findIndex((v) => v.id === versionId);
    if (i < 0 || !versions[i + 1]) return toast('Essa versão não está mais no histórico.', 'error');
    await api.post(`/projects/${project.id}/versions/${versions[i + 1].id}/restore`);
    await load(project.id); toast('Alteração desfeita.', 'ok');
  };

  const st = status.data;
  const hasGame = messages.some((m) => m.role === 'assistant' && m.changes?.changes?.length);
  const lastAssistant = [...messages].reverse().find((m) => m.role === 'assistant');

  return (
    <div className="aichat">
      <div className="aichat-head">
        <div style={{ minWidth: 0 }}>
          <div className="row" style={{ gap: 8 }}><Icon name="sparkles" size={18} /><b className="gradient-text">Criar com IA</b></div>
          {project ? <div className="small muted" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{project.name} · {project.dimension.toUpperCase()}</div> : <div className="small muted">Descreva o jogo que você quer.</div>}
        </div>
        <div className="row" style={{ gap: 6, flexWrap: 'nowrap' }}>
          {project && hasGame && <button className="btn sm primary" onClick={test} disabled={busy}><Icon name="play" /> Testar</button>}
          {project && <Link className="btn sm" to={`/studio/${project.id}`} title="Abrir no editor do Studio"><Icon name="settings" /> Editor</Link>}
          {project && <Link className="btn sm ghost" to="/criar-com-ia" title="Começar outro jogo"><Icon name="plus" /></Link>}
        </div>
      </div>

      <div className="aichat-msgs">
        {st && !st.configured && <div className="warn-box small">{st.note || 'A IA ainda não está configurada neste servidor (falta a chave ANTHROPIC_API_KEY).'}</div>}
        {!project && !id && (
          <div className="aichat-hello">
            <div className="aichat-orb"><Icon name="sparkles" size={30} /></div>
            <h2>O que você quer criar hoje?</h2>
            <p className="muted small">Escreva do seu jeito. A IA monta o jogo, você testa, e depois pede o que quiser mudar: “melhore os gráficos”, “deixe mais difícil”…</p>
            <div className="stack" style={{ gap: 6, width: '100%' }}>{IDEAS.map((x) => <button key={x} className="aichat-idea" onClick={() => setText(x)}>{x}</button>)}</div>
          </div>
        )}
        {messages.map((m) => (
          <div key={m.id} className={`aichat-bubble ${m.role}`}>
            {m.content}
            {m.role === 'assistant' && m.changes?.changes?.length > 0 && (
              <div className="aichat-actions">
                <button className="btn sm primary" onClick={test} disabled={busy}><Icon name="play" /> Testar o jogo</button>
                {m.version_id && <button className="btn sm ghost" onClick={() => undo(m.version_id)} disabled={busy}><Icon name="undo" size={14} /> Desfazer</button>}
                <details className="tiny muted" style={{ width: '100%' }}><summary>{m.changes.changes.length} alteração(ões) no projeto</summary>{m.changes.changes.slice(0, 60).map((c, i) => <div key={i}>• {c.label}</div>)}</details>
              </div>
            )}
            {m.role === 'assistant' && m.content.startsWith('Erro:') && !busy && (() => { const prev = messages[messages.indexOf(m) - 1]; return prev?.role === 'user' ? <div className="aichat-actions"><button className="btn sm primary" onClick={() => send(prev.content)}><Icon name="undo" size={14} /> Tentar de novo</button></div> : null; })()}
            {m.changes?.limitations?.length > 0 && <div className="warn-box tiny" style={{ marginTop: 6 }}>Não deu para fazer: {m.changes.limitations.map((l) => `${l.task} (${l.reason})`).join('; ')}</div>}
          </div>
        ))}
        {live && (
          <>
            <div className="aichat-bubble user">{live.prompt}</div>
            <div className="aichat-bubble assistant">
              <div className="row" style={{ gap: 8 }}><div className="spinner" style={{ width: 18, height: 18, margin: 0 }} /> <b>{project && !hasGame ? 'Criando seu jogo…' : 'Trabalhando no seu pedido…'}</b></div>
              {live.steps.slice(-6).map((s, i) => <div key={i} className="tiny muted">✓ {s}</div>)}
              <div className="tiny muted">Isso pode levar alguns minutos.</div>
            </div>
          </>
        )}
        {project && !busy && lastAssistant && hasGame && (
          <div className="aichat-next">{NEXT.map((x) => <button key={x} className="pill" onClick={() => send(x)}>{x}</button>)}</div>
        )}
        <div ref={end} />
      </div>

      <form className="aichat-input" onSubmit={(e) => { e.preventDefault(); send(text); }}>
        <textarea className="input" rows={2} value={text} disabled={busy} onChange={(e) => setText(e.target.value)} placeholder={project ? 'Peça uma mudança… ex.: melhore os gráficos' : 'Ex.: um jogo de terror numa floresta à noite…'}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey && !matchMedia('(pointer: coarse)').matches) { e.preventDefault(); send(text); } }} />
        <button className="btn primary" type="submit" disabled={busy || !text.trim() || (st && !st.configured)} aria-label="Enviar"><Icon name="sparkles" /> {project ? 'Enviar' : 'Criar'}</button>
      </form>

      {testing && (
        <div className="aichat-test">
          <div className="aichat-test-bar">
            <button className="btn sm" onClick={() => setTesting(null)}>← Voltar ao chat</button>
            <span className="small muted">{project.name}</span>
          </div>
          <div style={{ flex: 1, minHeight: 0 }}><Preview key={testing.revision} doc={testing.doc} projectId={project.id} /></div>
        </div>
      )}
    </div>
  );
}

export { guess };
