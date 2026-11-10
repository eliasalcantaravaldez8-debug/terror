// API LOCAL da versão sem servidor da NEXPLAY (link para celular).
// Implementa, no próprio navegador, as rotas que o NEXPLAY STUDIO usa: projetos (IndexedDB do aparelho),
// histórico de versões, importar/exportar backup e a NEXPLAY AI (especialistas e ferramentas reais do projeto,
// executadas com o Claude que a página do Artifact oferece). O que depende do servidor (contas, Arcade,
// publicação, envio de jogos, FORGE, comunidade) responde com um erro claro — nada é simulado.
import { ApiError } from '../src/api.js';
import { createProject, validateProject, GENRE_TEMPLATES, GAME_GENRES, PROJECT_FORMAT } from '../../shared/project.js';
import { SPECIALISTS } from '../../server/ai/specialists.js';
import { TOOL_DEFS, executeTool } from '../../server/ai/tools.js';

export const SERVER_ONLY = 'Esta função precisa do servidor da NEXPLAY e não existe na versão para celular (sem servidor).';
const FORGE_TOOLS = new Set(['get_forge_tools', 'generate_3d_model', 'create_voxel_model', 'create_pixel_sprite', 'set_art_style']);
const MAX_VERSIONS = 50;
const MAX_TOOLS = 16;
const TOOL_PRIORITY = ['get_project_overview', 'add_entities', 'update_entities', 'remove_entities', 'validate_project', 'set_environment', 'set_rendering',
  'set_material', 'set_player', 'upsert_mission', 'set_ui', 'write_script', 'get_entities', 'report_limitation', 'set_system', 'upsert_dialogue',
  'read_script', 'remove_mission', 'delete_script'];

import { localStore as store, storageMode } from '../src/localdb.js';
import { bundledGames } from '../src/bundledGames.js';

// ───────── Claude da página (capacidade "sample" do Artifact) ─────────
let samplePromise = null;
function getSample() {
  if (!samplePromise) samplePromise = (window.claude?.use ? window.claude.use('sample') : Promise.resolve(null)).catch(() => null);
  return samplePromise;
}

const LOCAL_USER = {
  id: 1, username: 'voce', displayName: 'Você', role: 'user', nc: 0, creditCents: 0, unreadMessages: 0, unreadNotifications: 0, avatarUrl: null,
  plan: { code: 'local', name: 'Local', features: ['studio_basic', 'ai_basic', 'ai_advanced', 'studio_extra_tools'] }, local: true,
};

const now = () => new Date().toISOString();
const size = (doc) => new Blob([JSON.stringify(doc)]).size;
function summary(p) {
  return {
    id: p.id, name: p.name, dimension: p.dimension, template: p.template, genre: p.genre || 'outro', blank: p.template === 'vazio', mode: p.mode,
    revision: p.revision, sizeBytes: p.sizeBytes, thumbnail: p.thumbnail || null, createdAt: p.createdAt, updatedAt: p.updatedAt, role: 'owner', owner: LOCAL_USER,
  };
}
async function loadProject(id) {
  const p = await store.get('projects', Number(id));
  if (!p) throw new ApiError(404, 'Projeto não encontrado neste aparelho.');
  return p;
}
async function saveRevision(p, doc, { source, label }) {
  p.doc = doc; p.revision += 1; p.updatedAt = now(); p.sizeBytes = size(doc);
  await store.put('projects', p);
  const versionId = await store.put('versions', { projectId: p.id, revision: p.revision, source, label: label || '', doc, createdAt: now() });
  const versions = (await store.byProject('versions', p.id)).sort((a, b) => a.id - b.id);
  for (const v of versions.slice(0, Math.max(0, versions.length - MAX_VERSIONS))) await store.del('versions', v.id);
  return { revision: p.revision, versionId };
}
async function createLocal({ name, dimension, template = 'vazio', genre, mode = 'easy', doc }) {
  if (!name?.trim()) throw new ApiError(400, 'Dê um nome ao projeto.');
  if (!['2d', '3d'].includes(dimension)) throw new ApiError(400, 'Escolha 2D ou 3D.');
  if (!GENRE_TEMPLATES.includes(template)) template = 'vazio';
  const g = GAME_GENRES.includes(genre) ? genre : (GAME_GENRES.includes(template) ? template : 'outro');
  const d = doc || createProject({ name: name.trim(), dimension, template, genre: g });
  const p = { name: name.trim().slice(0, 60), dimension, template, genre: g, mode, revision: 1, doc: d, sizeBytes: size(d), thumbnail: null, createdAt: now(), updatedAt: now() };
  p.id = await store.put('projects', p);
  await store.put('versions', { projectId: p.id, revision: 1, source: 'manual', label: 'Projeto criado', doc: d, createdAt: now() });
  return p;
}

// ───────── NEXPLAY AI local ─────────
async function aiCommand(projectId, { prompt, specialist }, onEvent) {
  const sample = await getSample();
  if (!sample) throw new ApiError(503, 'A NEXPLAY AI precisa do Claude desta página. Abra o link no app ou site do Claude e permita o uso quando for pedido.', 'ai_unavailable');
  const spec = SPECIALISTS[specialist];
  if (!spec) throw new ApiError(400, 'Especialidade inválida.');
  const p = await loadProject(projectId);
  const state = { doc: structuredClone(p.doc), changes: [], limitations: [], lastValidation: null, forgeRequests: [], forge: null };
  // O Claude da página aceita no máximo 16 ferramentas por chamada: ficam as mais importantes, nesta ordem.
  const names = spec.tools.filter((t) => !FORGE_TOOLS.has(t) && TOOL_DEFS[t])
    .sort((a, b) => (TOOL_PRIORITY.indexOf(a) + 1 || 99) - (TOOL_PRIORITY.indexOf(b) + 1 || 99)).slice(0, MAX_TOOLS);
  const tools = names.map((n) => ({
    name: n, description: TOOL_DEFS[n].description, inputSchema: TOOL_DEFS[n].input_schema,
    execute: (input) => {
      onEvent({ type: 'tool', specialist: spec.name, tool: n });
      try {
        const out = executeTool(state, n, input || {});
        return out.length > 30_000 ? `${out.slice(0, 30_000)}…(truncado)` : out;
      } catch (e) {
        const message = e?.issues ? `Entrada inválida: ${e.issues.map((x) => `${x.path.join('.')}: ${x.message}`).join('; ')}` : e.message;
        onEvent({ type: 'tool_error', specialist: spec.name, tool: n, message });
        throw new Error(message);
      }
    },
  }));
  // Conversa anterior (alternando papéis e terminando no pedido atual)
  const prior = (await store.byProject('convos', p.id)).sort((a, b) => a.id - b.id).slice(-6);
  const history = [];
  for (const m of prior) { if (history.length && history[history.length - 1].role === m.role) continue; history.push({ role: m.role, content: m.content }); }
  while (history.length && history[0].role !== 'user') history.shift();
  if (history.length && history[history.length - 1].role === 'user') history.pop();
  await store.put('convos', { projectId: p.id, role: 'user', specialist, content: prompt, createdAt: now() });
  const instructions = `${spec.prompt}\n\nObservação desta versão (sem servidor): as ferramentas da NEXPLAY FORGE (modelos 3D por IA, voxel, sprites) não estão disponíveis; use os geradores procedurais e registre a limitação com report_limitation quando algo depender delas. Trabalhe SEMPRE pelas ferramentas; responda em português, de forma curta, dizendo o que mudou.`;
  let r;
  try {
    r = await sample([...history, { role: 'user', content: `${instructions}\n\n---\nPedido do criador:\n${prompt}` }], { tools, modelTier: 'complex', cache: false });
  } catch (e) {
    const msg = { tool_limit: 'Limite de ferramentas da IA.', not_granted: 'Você não permitiu o uso do Claude nesta página. Abra as permissões do Artifact para liberar.', rate_limited: 'Muitos pedidos seguidos. Espere um pouco e tente de novo.' }[e?.code] || e?.message || 'Falha na IA.';
    await store.put('convos', { projectId: p.id, role: 'assistant', specialist, content: `Erro: ${msg}`, createdAt: now() });
    throw new ApiError(503, msg, e?.code || 'ai_error');
  }
  let versionId = null;
  if (state.changes.length) {
    const fresh = await loadProject(projectId);
    const saved = await saveRevision(fresh, state.doc, { source: 'ai', label: `IA (${spec.name}): ${prompt.slice(0, 60)}` });
    versionId = saved.versionId;
  }
  await store.put('convos', { projectId: p.id, role: 'assistant', specialist, content: r?.text || '(sem resposta)', changes: { changes: state.changes, limitations: state.limitations }, version_id: versionId, createdAt: now() });
  onEvent({ type: 'result', changes: state.changes, limitations: state.limitations, versionId });
}

// ───────── Jogos publicados dentro deste link (arquivos publicados junto com a página) ─────────
function bundledCard(g, i) {
  return {
    id: 100000 + i, slug: g.slug, title: g.title, shortDescription: g.shortDescription || '', coverUrl: g.cover ? `nexplay-games/${g.slug}/${g.cover}` : null,
    genre: g.genre || 'outro', tags: [], ageRating: g.ageRating || 'L', platforms: g.platforms || 'both', modes: g.multiplayer ? ['local'] : ['solo'], maxPlayers: g.maxPlayers || 1,
    priceCents: 0, status: 'published', releaseStage: 'released', rating: { avg: null, count: 0 }, views: 0, publishedAt: g.publishedAt || null,
    creator: { username: g.creator || 'criador', displayName: g.creator || 'Criador' }, studio: null, buildKind: 'html5', sourceEngine: g.engine || 'html5',
    stats: null, bundled: true,
  };
}

// ───────── Roteador ─────────
const EMPTY_HOME = { gameOfDay: null, featured: [], totalPublished: 0, nexplayChoice: [], weekly: [], recommended: [], popular: [], recent: [], upcoming: [] };

async function handle(method, url, body) {
  const [path, query = ''] = url.split('?');
  const q = new URLSearchParams(query);
  const seg = path.split('/').filter(Boolean);
  const m = (re) => path.match(re);
  let x;

  if (path === '/health') {
    const sample = await getSample();
    return { ok: true, standalone: true, storage: await storageMode(), services: { database: 'device', ai: sample ? 'configured' : 'not_configured', payments: 'not_configured', email: 'not_configured' }, sandboxOrigin: 'local', sandboxUrl: '', limits: { gameUploadMB: 0 } };
  }
  if (path === '/auth/me') return { user: LOCAL_USER };
  if (path.startsWith('/auth/')) throw new ApiError(503, 'Contas precisam do servidor. Nesta versão você usa um perfil local, só neste aparelho.');

  // Catálogo/Arcade: sem servidor não há jogos publicados (não inventamos nenhum).
  if (path === '/games/home') {
    const games = (await bundledGames()).map(bundledCard);
    return { ...EMPTY_HOME, totalPublished: games.length, recent: games };
  }
  if (path === '/games/arcade') {
    // Jogos publicados DENTRO deste link (enviados pelo criador). Sem servidor não há estatísticas de jogadores,
    // então as abas de ranking ficam vazias em vez de inventar números.
    const all = (await bundledGames()).map(bundledCard);
    const tab = q.get('tab') || 'new';
    const term = (q.get('q') || '').toLowerCase();
    let games = ['month', 'week', 'trending'].includes(tab) ? [] : all;
    if (tab === 'search') games = all.filter((g) => (!term || `${g.title} ${g.shortDescription}`.toLowerCase().includes(term)) && (!q.get('genre') || g.genre === q.get('genre')));
    return { totalPublished: all.length, tab, note: ['month', 'week', 'trending'].includes(tab) ? 'Rankings precisam do servidor (contagem real de jogadores).' : null, games, standalone: true };
  }
  if (path === '/games/meta') return { genres: GAME_GENRES, modes: ['solo'] };
  if (path === '/games' && method === 'GET') return { games: [], total: 0 };
  if ((x = m(/^\/games\/by-project\/\d+$/))) return { game: null };

  // Projetos
  if (path === '/projects/templates') return { templates: GENRE_TEMPLATES };
  if (path === '/projects' && method === 'GET') {
    const projects = (await store.all('projects')).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).map(summary);
    return { projects, shared: [], storage: { usedBytes: projects.reduce((s, p) => s + p.sizeBytes, 0), limitBytes: 200 * 1024 * 1024 }, limits: { maxProjects: 100, versionHistory: MAX_VERSIONS, plan: 'local' } };
  }
  if (path === '/projects' && method === 'POST') return { project: summary(await createLocal(body || {})) };
  if (path === '/projects/import' && method === 'POST') {
    if (body?.format !== 'nexplay-backup' || body?.doc?.format !== PROJECT_FORMAT) throw new ApiError(400, 'Backup inválido.');
    const pr = body.project || {};
    return { project: summary(await createLocal({ name: pr.name || body.doc.meta?.name || 'Projeto importado', dimension: pr.dimension || body.doc.meta?.dimension, template: pr.template, genre: body.doc.meta?.genre, mode: pr.mode, doc: body.doc })) };
  }
  if (seg[0] === 'projects' && /^\d+$/.test(seg[1] || '')) {
    const id = Number(seg[1]);
    const rest = seg.slice(2).join('/');
    if (!rest && method === 'GET') { const p = await loadProject(id); return { project: summary(p), doc: p.doc, assets: [] }; }
    if (!rest && method === 'PUT') {
      const p = await loadProject(id);
      if (body?.doc?.format !== PROJECT_FORMAT) throw new ApiError(400, 'Documento inválido.');
      if (body.baseRevision !== p.revision) throw new ApiError(409, 'O projeto foi alterado em outra aba.', 'revision_conflict');
      const saved = await saveRevision(p, body.doc, { source: body.source || 'autosave', label: body.label });
      return { ...saved, validation: validateProject(body.doc) };
    }
    if (!rest && method === 'PATCH') {
      const p = await loadProject(id);
      if (body.name !== undefined) { if (!String(body.name).trim()) throw new ApiError(400, 'Nome vazio.'); p.name = String(body.name).trim().slice(0, 60); }
      if (body.genre && GAME_GENRES.includes(body.genre)) p.genre = body.genre;
      if (body.mode) p.mode = body.mode;
      if (body.thumbnail) p.thumbnail = body.thumbnail;
      p.updatedAt = now();
      await store.put('projects', p);
      return { project: summary(p) };
    }
    if (!rest && method === 'DELETE') {
      await loadProject(id);
      for (const v of await store.byProject('versions', id)) await store.del('versions', v.id);
      for (const c of await store.byProject('convos', id)) await store.del('convos', c.id);
      await store.del('projects', id);
      return { ok: true };
    }
    if (rest === 'versions') {
      const versions = (await store.byProject('versions', id)).sort((a, b) => b.id - a.id)
        .map((v) => ({ id: v.id, revision: v.revision, source: v.source, label: v.label, username: 'voce', created_at: v.createdAt }));
      return { versions };
    }
    if ((x = rest.match(/^versions\/(\d+)\/restore$/))) {
      const v = await store.get('versions', Number(x[1]));
      if (!v || v.projectId !== id) throw new ApiError(404, 'Versão não encontrada.');
      const p = await loadProject(id);
      return saveRevision(p, v.doc, { source: 'restore', label: `Restaurada a rev. ${v.revision}` });
    }
    if (rest === 'members' && method === 'GET') return { members: [] };
    if (rest === 'export') {
      const p = await loadProject(id);
      return { format: 'nexplay-backup', project: { name: p.name, dimension: p.dimension, template: p.template, mode: p.mode }, doc: p.doc, assets: [] };
    }
    if (rest.startsWith('assets')) throw new ApiError(503, 'Enviar arquivos próprios (texturas, sons, modelos) precisa do servidor. Use os elementos da aba Criar.');
    throw new ApiError(503, SERVER_ONLY);
  }

  // NEXPLAY AI
  if (path === '/ai/status') {
    const sample = await getSample();
    return {
      configured: !!sample,
      note: sample ? null : 'A NEXPLAY AI usa o Claude desta página. Abra o link pelo app ou site do Claude (com sua conta) e permita quando for pedido.',
      quota: { plan: 'local', dailyLimit: null, used: 0, remaining: null },
      specialists: Object.entries(SPECIALISTS).map(([key, s]) => ({ key, name: s.name, description: s.description })),
      tier: { team: false },
    };
  }
  if ((x = m(/^\/ai\/projects\/(\d+)\/conversation$/))) {
    const rows = (await store.byProject('convos', Number(x[1]))).sort((a, b) => a.id - b.id).slice(-40);
    return { messages: rows.map((r) => ({ id: r.id, role: r.role, specialist: r.specialist, content: r.content, changes: r.changes || null, version_id: r.version_id || null })) };
  }
  if (path.startsWith('/ai/')) throw new ApiError(503, 'O AUTOPILOT roda no servidor. Nesta versão use os comandos da NEXPLAY AI.');

  // FORGE e demais áreas
  if (path === '/pipeline/tools') return { tools: [], styles: [], categories: [], quota: { used: 0, limit: 0 }, standalone: true };
  if ((x = m(/^\/pipeline\/projects\/\d+\/jobs$/)) && method === 'GET') return { jobs: [] };
  throw new ApiError(503, SERVER_ONLY, 'server_only');
}

export const api = {
  get: (u) => handle('GET', u),
  post: (u, b) => handle('POST', u, b ?? {}),
  put: (u, b) => handle('PUT', u, b),
  patch: (u, b) => handle('PATCH', u, b),
  del: (u) => handle('DELETE', u),
  upload: (u) => handle('UPLOAD', u),
  async stream(url, body, onEvent) {
    const x = url.match(/^\/ai\/projects\/(\d+)\/command$/);
    if (!x) throw new ApiError(503, SERVER_ONLY);
    await aiCommand(Number(x[1]), body, onEvent);
  },
};
