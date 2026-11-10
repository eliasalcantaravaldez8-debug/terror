// NEXPLAY FORGE — linha de produção de assets 2D/3D.
// Fluxo 3D:  GERAÇÃO (Tripo/Meshy/voxel/upload) → INSPEÇÃO → REPARO → ESCALA/ORIGEM → BLENDER (aprimoramento)
//            → RIGGING (personagens) → TEXTURAS → LODs → COLISÃO → SALVAR → INTEGRAR NO PROJETO → TESTE NO JOGO.
// Fluxo 2D:  SPRITE (especificação da IA / imagem / Krita) → FOLHA DE SPRITES → SALVAR → INTEGRAR → TESTE.
import fs from 'node:fs';
import path from 'node:path';
import { one, all, run, getSetting } from '../db/index.js';
import { config } from '../config.js';
import { HttpError, randomToken } from '../lib/security.js';
import { entitlements, notify } from '../lib/services.js';
import { applyOps, newId } from '../ai/project.js';
import { ART_STYLES, CATEGORY_SIZE, routeProvider } from './styles.js';
import { PROVIDERS } from './providers.js';
import { detectBlender, runBlender } from './blender.js';
import { readGlb, writeGlb, inspect, repair, normalize, flatShade, limitTextures, fitBudget, buildLods, collisionFromBounds } from './gltf.js';
import { gridFromSpec, gridToGlb, parseVox, writeVox } from './voxel.js';
import { spriteFromSpec, spriteFromImage, spriteFromLayeredFile } from './pixel.js';

const PAID = ['tripo', 'meshy'];
const queue = [];
let active = 0;
const MAX_PARALLEL = Number(process.env.FORGE_PARALLEL || 2);
const controllers = new Map();
let saveRevisionFn = null;
export const setSaveRevision = (fn) => { saveRevisionFn = fn; };

// ───────── Ferramentas disponíveis (honesto: o que realmente funciona neste servidor) ─────────
export function toolStatus() {
  const blender = detectBlender();
  return [
    { id: 'tripo', name: 'Tripo AI', kind: '3D por IA', available: PROVIDERS.tripo.configured(), uses: ['Personagens', 'Veículos', 'Construções e objetos', 'Modelo a partir de imagem', 'Rigging e animações'],
      note: PROVIDERS.tripo.configured() ? 'Configurado (TRIPO_API_KEY). Cada geração consome créditos da sua conta Tripo.' : 'Defina TRIPO_API_KEY para ativar.', license: PROVIDERS.tripo.license, paid: true },
    { id: 'meshy', name: 'Meshy AI', kind: '3D por IA', available: PROVIDERS.meshy.configured(), uses: ['Modelos estilizados', 'Objetos e personagens', 'Modelo a partir de imagem', 'Texturas PBR'],
      note: PROVIDERS.meshy.configured() ? 'Configurado (MESHY_API_KEY). Cada geração consome créditos da sua conta Meshy.' : 'Defina MESHY_API_KEY para ativar.', license: PROVIDERS.meshy.license, paid: true },
    { id: 'blender', name: 'Blender', kind: 'Produção 3D (headless)', available: !!blender, uses: ['Limpeza de geometria', 'Normais e materiais', 'Low poly / sombreamento', 'Orçamento de polígonos', 'Rigging automático + animações'],
      note: blender ? `Blender ${blender.version} via ${blender.mode === 'bpy' ? 'módulo Python bpy' : 'binário'}.` : 'Não encontrado. Defina BLENDER_PATH ou NEXPLAY_BPY_PYTHON. Sem Blender, o processamento usa o otimizador interno (sem rigging).', license: 'GPL — uso livre, inclusive comercial, dos modelos produzidos.', paid: false },
    { id: 'gltf', name: 'Otimizador glTF interno', kind: 'Processamento 3D', available: true, uses: ['Inspeção', 'Reparo', 'Escala e origem', 'Texturas', 'LODs (meshoptimizer)', 'Colisão'], note: 'Sempre disponível (gltf-transform + meshoptimizer + sharp).', license: 'MIT', paid: false },
    { id: 'voxel', name: 'Voxel (compatível com MagicaVoxel)', kind: 'Voxel', available: true, uses: ['Personagens voxel', 'Casas e cenários em blocos', 'Importar/exportar .vox'],
      note: 'Gerador interno a partir de especificação da IA + leitura/escrita do formato .vox. O MagicaVoxel é um aplicativo de desktop sem API: use-o para editar e reimporte o .vox.', license: 'Formato aberto; MagicaVoxel é gratuito.', paid: false },
    { id: 'pixel', name: 'Pixel art e sprites', kind: '2D', available: true, uses: ['Personagens e inimigos', 'Folhas de sprites animadas', 'Objetos e itens', 'Ladrilhos'], note: 'Gerador interno (a IA desenha pixel a pixel) + editor de pixels no Studio.', license: 'Produção própria.', paid: false },
    { id: 'krita', name: 'Krita / OpenRaster', kind: '2D', available: true, uses: ['Importar ilustrações (.kra/.ora)', 'Cenários e personagens desenhados'], note: 'Importa a imagem composta de arquivos .kra/.ora. O Krita é um aplicativo de desktop: desenhe nele e envie o arquivo.', license: 'GPL — arte produzida é sua.', paid: false },
  ];
}

// ───────── Jobs ─────────
function jobView(j) {
  return { id: j.id, projectId: j.project_id, kind: j.kind, provider: j.provider, style: j.style, category: j.category, prompt: j.prompt, status: j.status,
    steps: JSON.parse(j.steps), result: JSON.parse(j.result), error: j.error, createdAt: j.created_at, updatedAt: j.updated_at };
}
export const getJob = (id) => { const j = one('SELECT * FROM asset_jobs WHERE id=?', id); return j && jobView(j); };
export const listJobs = (projectId) => all('SELECT * FROM asset_jobs WHERE project_id=? ORDER BY id DESC LIMIT 60', projectId).map(jobView);

function step(jobId, name, status, detail) {
  const j = one('SELECT steps FROM asset_jobs WHERE id=?', jobId);
  const steps = JSON.parse(j.steps);
  const existing = steps.find((s) => s.name === name);
  if (existing) Object.assign(existing, { status, detail: detail ?? existing.detail, at: new Date().toISOString() });
  else steps.push({ name, status, detail: detail ?? null, at: new Date().toISOString() });
  run('UPDATE asset_jobs SET steps=?, updated_at=? WHERE id=?', JSON.stringify(steps), new Date().toISOString(), jobId);
}
const setJob = (id, patch) => {
  const sets = []; const vals = [];
  for (const [k, v] of Object.entries(patch)) { sets.push(`${k}=?`); vals.push(typeof v === 'object' && v !== null ? JSON.stringify(v) : v); }
  run(`UPDATE asset_jobs SET ${sets.join(', ')}, updated_at=? WHERE id=?`, ...vals, new Date().toISOString(), id);
};

export function quotaFor(userId) {
  const plan = entitlements(userId).code;
  const limits = getSetting('pipeline_limits', { free: 3, pro: 12, deluxe: 60 });
  const day = new Date().toISOString().slice(0, 10);
  const used = Number(one(`SELECT COUNT(*) AS c FROM asset_jobs WHERE user_id=? AND created_at >= ? AND provider IN ('tripo','meshy') AND status <> 'failed'`, userId, day).c);
  return { plan, limit: limits[plan] ?? 3, used, remaining: Math.max(0, (limits[plan] ?? 3) - used) };
}

/**
 * Cria um job. params: { prompt, category, style, provider, image:{buffer,mime}, voxelSpec, spriteSpec, upload:{buffer,name},
 *   entityType, place:{position,rotation}, placeholderId, name, targetHeight, rig, frameWidth, frameHeight }
 */
export function createJob({ userId, project, kind, params }) {
  const doc = JSON.parse(project.data);
  const projectStyle = doc.artStyle || null;
  let style = params.style && params.style !== 'auto' ? params.style : projectStyle;
  if (!style) style = kind === 'sprite' ? 'pixel' : kind === 'voxel' ? 'voxel' : 'stylized';
  if (!ART_STYLES[style]) throw new HttpError(400, 'Estilo desconhecido.');
  let provider = kind === 'voxel' ? 'voxel' : kind === 'sprite' ? 'pixel' : kind === 'import' ? 'upload' : null;
  if (kind === 'model3d') {
    if (style === 'voxel') throw new HttpError(400, 'Para o estilo voxel use a criação voxel (especificação) ou importe um .vox.');
    const avail = Object.fromEntries(Object.entries(PROVIDERS).map(([k, p]) => [k, p.configured()]));
    const r = routeProvider(style, avail, params.provider);
    if (!r.provider) throw new HttpError(503, r.reason, 'provider_not_configured');
    provider = r.provider;
    const q = quotaFor(userId);
    if (q.remaining <= 0) throw new HttpError(429, `Limite diário de ${q.limit} gerações por IA externa no plano ${q.plan.toUpperCase()} atingido.`, 'forge_limit');
  }
  const running = Number(one(`SELECT COUNT(*) AS c FROM asset_jobs WHERE user_id=? AND status IN ('queued','running','integrating')`, userId).c);
  if (running >= 6) throw new HttpError(429, 'Muitos assets em produção ao mesmo tempo. Aguarde alguns terminarem.', 'forge_busy');
  const stored = { ...params };
  // Arquivos enviados ficam em disco temporário, não no banco.
  for (const k of ['image', 'upload']) {
    if (params[k]?.buffer) {
      const f = path.join(config.dataDir, 'tmp', `forge-${randomToken(8)}`);
      fs.writeFileSync(f, params[k].buffer);
      stored[k] = { file: f, mime: params[k].mime, name: params[k].name };
    }
  }
  const id = run(`INSERT INTO asset_jobs(project_id, user_id, kind, provider, style, category, prompt, params) VALUES (?,?,?,?,?,?,?,?)`,
    project.id, userId, kind, provider, style, params.category || (kind === 'sprite' ? 'sprite' : 'prop'), String(params.prompt || params.name || '').slice(0, 2000), JSON.stringify(stored)).lastInsertRowid;
  queue.push(id);
  pump();
  return getJob(id);
}

export function cancelJob(id, userId) {
  const j = one('SELECT * FROM asset_jobs WHERE id=? AND user_id=?', id, userId);
  if (!j) throw new HttpError(404, 'Job não encontrado.');
  if (['done', 'failed', 'canceled'].includes(j.status)) return;
  controllers.get(id)?.abort();
  const qi = queue.indexOf(id); if (qi >= 0) queue.splice(qi, 1);
  setJob(id, { status: 'canceled' });
}

function pump() {
  while (active < MAX_PARALLEL && queue.length) {
    const id = queue.shift();
    active++;
    execute(id).finally(() => { active--; pump(); });
  }
}

/** Retoma jobs interrompidos por reinício do servidor (os que ainda não chamaram provedores pagos recomeçam). */
export function recoverJobs() {
  for (const j of all(`SELECT id, provider, status FROM asset_jobs WHERE status IN ('queued','running','integrating')`)) {
    if (j.status !== 'queued' && PAID.includes(j.provider)) setJob(j.id, { status: 'failed', error: 'Servidor reiniciado durante a geração. Tente novamente.' });
    else { setJob(j.id, { status: 'queued' }); queue.push(j.id); }
  }
  pump();
}

async function execute(id) {
  const j = one('SELECT * FROM asset_jobs WHERE id=?', id);
  if (!j || j.status === 'canceled') return;
  const ac = new AbortController();
  controllers.set(id, ac);
  setJob(id, { status: 'running', error: null });
  const params = JSON.parse(j.params);
  const read = (k) => (params[k]?.file ? { buffer: fs.readFileSync(params[k].file), mime: params[k].mime, name: params[k].name } : null);
  try {
    const project = one('SELECT * FROM projects WHERE id=?', j.project_id);
    if (!project) throw new Error('Projeto não existe mais.');
    let produced;
    if (j.kind === 'sprite') produced = await produceSprite(j, params, read('upload'));
    else {
      let source; let externalId = null; let provenance;
      if (j.kind === 'model3d') {
        step(id, 'Geração', 'running', `${PROVIDERS[j.provider].name}: "${j.prompt.slice(0, 80)}"`);
        const out = await PROVIDERS[j.provider].generate({ prompt: j.prompt, image: read('image'), style: j.style, faceLimit: ART_STYLES[j.style].triangleBudget },
          { signal: ac.signal, onProgress: (s) => step(id, 'Geração', 'running', `${PROVIDERS[j.provider].name}: ${Math.round(s.progress || 0)}%`) });
        source = out.buffer; externalId = out.externalId;
        setJob(id, { external_id: externalId });
        provenance = { tool: PROVIDERS[j.provider].name, license: PROVIDERS[j.provider].license };
        step(id, 'Geração', 'done', `${(source.length / 1024).toFixed(0)} KB recebidos`);
      } else if (j.kind === 'voxel') {
        step(id, 'Voxel', 'running');
        const grid = params.voxelSpec ? gridFromSpec(params.voxelSpec) : parseVox(read('upload').buffer);
        const g = await gridToGlb(grid, { voxelSize: params.voxelSize || 0.1, name: params.name || 'voxel' });
        source = g.buffer;
        params.voxBuffer = writeVox(grid);
        provenance = { tool: params.voxelSpec ? 'NEXPLAY Voxel' : 'MagicaVoxel (.vox importado)', license: 'Produção própria.' };
        step(id, 'Voxel', 'done', `${g.voxels} voxels → ${g.triangles} triângulos (malha otimizada)`);
      } else { // import
        const up = read('upload');
        step(id, 'Importação', 'running', up.name);
        if (/\.vox$/i.test(up.name)) {
          const grid = parseVox(up.buffer);
          source = (await gridToGlb(grid, { voxelSize: params.voxelSize || 0.1 })).buffer;
          params.voxBuffer = up.buffer;
          provenance = { tool: 'MagicaVoxel (.vox)', license: 'Do autor do arquivo.' };
        } else {
          source = up.buffer;
          provenance = { tool: 'Upload (.glb)', license: 'Do autor do arquivo.' };
        }
        step(id, 'Importação', 'done');
      }
      produced = await process3d(j, params, source, { externalId, signal: ac.signal, provenance });
    }
    setJob(id, { status: 'integrating', result: produced.result });
    step(id, 'Integração no jogo', 'running', 'Aguardando o projeto para adicionar o asset…');
    await integrate(j, params, produced);
    step(id, 'Integração no jogo', 'done', produced.result.entityId ? 'Entidade adicionada/atualizada no projeto.' : 'Asset disponível no projeto.');
    step(id, 'Teste no jogo', 'pending', 'Abra o Studio: o teste roda no motor real e corrige problemas encontrados.');
    setJob(id, { status: 'done', result: produced.result });
    notify(j.user_id, 'forge', 'Asset pronto na NEXPLAY FORGE', j.prompt.slice(0, 80), `/studio/${j.project_id}`);
  } catch (e) {
    const canceled = ac.signal.aborted;
    setJob(id, { status: canceled ? 'canceled' : 'failed', error: canceled ? 'Cancelado.' : String(e.message).slice(0, 600) });
    const steps = JSON.parse(one('SELECT steps FROM asset_jobs WHERE id=?', id).steps);
    const cur = steps.find((s) => s.status === 'running');
    if (cur) step(id, cur.name, 'failed', String(e.message).slice(0, 300));
  } finally {
    controllers.delete(id);
    for (const k of ['image', 'upload']) if (params[k]?.file) fs.rmSync(params[k].file, { force: true });
  }
}

/** Processamento 3D completo. */
async function process3d(j, params, source, { externalId, signal, provenance }) {
  const id = j.id;
  const st = ART_STYLES[j.style];
  const blender = detectBlender();
  const isCharacter = ['character', 'creature'].includes(j.category);
  const operations = [];

  step(id, 'Inspeção', 'running');
  let doc = await readGlb(source);
  const before = await inspect(doc);
  if (before.issues.some((x) => x.severity === 'error')) throw new Error(`Modelo inválido: ${before.issues.map((x) => x.message).join(' ')}`);
  step(id, 'Inspeção', 'done', `${before.triangles.toLocaleString('pt-BR')} triângulos, ${before.materials} materiais, ${before.textures.length} texturas${before.issues.length ? ` · ${before.issues.map((x) => x.message).join(' ')}` : ''}`);

  step(id, 'Reparo e escala', 'running');
  await repair(doc);
  const target = params.targetHeight || CATEGORY_SIZE[j.category] || 1;
  const norm = normalize(doc, { targetHeight: target, keepScale: j.style === 'voxel' && !params.targetHeight && (!j.category || j.category === 'prop') });
  operations.push(`escala ×${norm.scale.toFixed(3)} (altura ${target} m), origem no centro da base`);
  step(id, 'Reparo e escala', 'done', operations.at(-1));

  let buffer = await writeGlb(doc);
  if (blender && j.kind !== 'voxel') {
    step(id, 'Blender: aprimoramento', 'running', `Blender ${blender.version}`);
    const io = tmpPair(buffer);
    try {
      const rep = await runBlender('refine.py', { input: io.input, output: io.output, style: j.style, triangleBudget: st.triangleBudget || 60000 });
      buffer = fs.readFileSync(io.output);
      operations.push(...rep.operations.map((o) => `Blender: ${o}`));
      step(id, 'Blender: aprimoramento', 'done', rep.operations.join('; '));
    } finally { io.clean(); }
  } else {
    step(id, 'Otimização interna', 'running');
    doc = await readGlb(buffer);
    const fit = await fitBudget(doc, st.triangleBudget || 60000);
    if (fit.simplified) operations.push(`simplificado para ${fit.triangles} triângulos`);
    if (st.shading === 'flat') { await flatShade(doc); operations.push('sombreamento facetado'); }
    buffer = await writeGlb(doc);
    step(id, 'Otimização interna', 'done', blender ? operations.slice(-2).join('; ') : `${operations.slice(-2).join('; ') || 'nada a reduzir'} (Blender indisponível: sem refino avançado)`);
  }

  let rigInfo = null;
  if (isCharacter && params.rig !== false && !(await inspect(await readGlb(buffer))).skins) {
    step(id, 'Rigging e animações', 'running');
    if (j.provider === 'tripo' && externalId && process.env.FORGE_TRIPO_RIG !== '0') {
      try {
        const anims = await PROVIDERS.tripo.rigAndAnimate(externalId, ['idle', 'walk', 'run'], { signal });
        buffer = anims.walk || anims.idle || buffer;
        rigInfo = { method: 'Tripo AI (rig + retarget)', animations: Object.keys(anims), extra: anims };
      } catch (e) { operations.push(`rigging da Tripo falhou (${e.message}); usando Blender`); }
    }
    if (!rigInfo && blender) {
      const io = tmpPair(buffer);
      try {
        const rep = await runBlender('autorig.py', { input: io.input, output: io.output });
        buffer = fs.readFileSync(io.output);
        rigInfo = { method: `Blender (esqueleto automático, pesos ${rep.weights})`, animations: rep.animations || [], pose: rep.pose };
      } finally { io.clean(); }
    }
    if (rigInfo) step(id, 'Rigging e animações', 'done', `${rigInfo.method}: ${rigInfo.animations.join(', ')}`);
    else step(id, 'Rigging e animações', 'skipped', 'Sem Blender nem rigging do provedor: o personagem fica estático (pode ser usado como objeto).');
  }

  step(id, 'Texturas e LODs', 'running');
  doc = await readGlb(buffer);
  if (st.textureMax) { try { await limitTextures(doc, st.textureMax); } catch (e) { operations.push(`texturas mantidas (${e.message})`); } }
  const after = await inspect(doc);
  const skinned = after.skins > 0;
  const ratios = skinned ? [1] : (st.lodRatios || [1]);
  const lods = await buildLods(doc, ratios);
  step(id, 'Texturas e LODs', 'done', `LODs: ${lods.map((l) => l.triangles.toLocaleString('pt-BR')).join(' / ')} triângulos${skinned ? ' (personagem animado: LOD único)' : ''}`);

  const collision = collisionFromBounds(after.bounds, isCharacter ? 'capsule' : 'box');
  step(id, 'Colisão', 'done', `${collision.type} ${after.bounds.size.map((v) => v.toFixed(2)).join(' × ')} m`);

  step(id, 'Salvar na NEXPLAY CLOUD', 'running');
  const name = (params.name || j.prompt || 'modelo').slice(0, 40).replace(/[^\p{L}\p{N} _-]+/gu, '').trim() || 'modelo';
  const meta = { style: j.style, category: j.category, triangles: after.triangles, bounds: after.bounds, animations: after.animations, skinned, collision, provenance, operations, before: { triangles: before.triangles }, rig: rigInfo && { method: rigInfo.method } };
  const saved = lods.map((l, i) => saveAsset(j, `${name}${i ? `_lod${i}` : ''}.glb`, 'model', 'model/gltf-binary', l.buffer, i ? { lodOf: true, triangles: l.triangles } : meta));
  if (params.voxBuffer) meta.vox = saveAsset(j, `${name}.vox`, 'model', 'application/octet-stream', Buffer.from(params.voxBuffer), { voxSource: true }).id;
  if (meta.vox) run('UPDATE project_assets SET meta=? WHERE id=?', JSON.stringify(meta), saved[0].id);
  step(id, 'Salvar na NEXPLAY CLOUD', 'done', `${saved.length} arquivo(s)`);
  return {
    kind: '3d', name, assets: saved, meta,
    result: { assetId: saved[0].id, lodAssetIds: saved.slice(1).map((s) => s.id), triangles: after.triangles, lodTriangles: lods.map((l) => l.triangles), animations: after.animations, skinned, collision, operations, style: j.style, provenance },
  };
}

async function produceSprite(j, params, upload) {
  step(j.id, 'Sprite', 'running');
  let out;
  if (params.spriteSpec) out = await spriteFromSpec(params.spriteSpec);
  else if (upload && /\.(kra|ora)$/i.test(upload.name)) out = await spriteFromLayeredFile(upload.buffer, params);
  else if (upload) out = await spriteFromImage(upload.buffer, params);
  else throw new Error('Nada para produzir: envie uma imagem ou uma especificação de sprite.');
  out.meta.style = j.style;
  out.meta.provenance = { tool: params.spriteSpec ? 'NEXPLAY Pixel' : upload?.name?.match(/\.(kra|ora)$/i) ? 'Krita/OpenRaster' : 'Imagem enviada', license: params.spriteSpec ? 'Produção própria.' : 'Do autor do arquivo.' };
  step(j.id, 'Sprite', 'done', `${out.meta.frames} quadro(s) de ${out.meta.frameWidth}×${out.meta.frameHeight} px · animações: ${Object.keys(out.meta.animations).join(', ')}`);
  const name = (params.name || j.prompt || 'sprite').slice(0, 40).replace(/[^\p{L}\p{N} _-]+/gu, '').trim() || 'sprite';
  const saved = saveAsset(j, `${name}.png`, 'texture', 'image/png', out.png, { sprite: out.meta, style: j.style });
  step(j.id, 'Salvar na NEXPLAY CLOUD', 'done');
  return { kind: 'sprite', name, assets: [saved], meta: out.meta, result: { assetId: saved.id, sprite: out.meta, style: j.style } };
}

function tmpPair(buffer) {
  const dir = fs.mkdtempSync(path.join(config.dataDir, 'tmp', 'forge-'));
  const input = path.join(dir, 'in.glb'); const output = path.join(dir, 'out.glb');
  fs.writeFileSync(input, buffer);
  return { input, output, clean: () => fs.rmSync(dir, { recursive: true, force: true }) };
}

function saveAsset(j, name, kind, mime, buffer, meta) {
  const ext = { 'model/gltf-binary': 'glb', 'image/png': 'png' }[mime] || 'bin';
  const key = `${randomToken(18)}.${ext}`;
  fs.writeFileSync(path.join(config.dataDir, 'assets', key), buffer);
  const owner = one('SELECT owner_id FROM projects WHERE id=?', j.project_id).owner_id;
  const r = run('INSERT INTO project_assets(project_id, owner_id, name, kind, mime, storage_key, size_bytes, meta) VALUES (?,?,?,?,?,?,?,?)',
    j.project_id, owner, name, kind, mime, key, buffer.length, JSON.stringify(meta || {}));
  return { id: r.lastInsertRowid, name, kind, storageKey: key };
}

/** Adiciona o asset ao documento do projeto (e substitui o marcador provisório criado pela IA, se houver). */
async function integrate(j, params, produced) {
  if (!saveRevisionFn) throw new Error('Integração indisponível.');
  const deadline = Date.now() + (params.placeholderId ? 10 * 60_000 : 0);
  for (;;) {
    const project = one('SELECT * FROM projects WHERE id=?', j.project_id);
    const doc = JSON.parse(project.data);
    const placeholder = params.placeholderId && doc.entities.find((e) => e.id === params.placeholderId);
    if (params.placeholderId && !placeholder && Date.now() < deadline) { await new Promise((r) => setTimeout(r, 4000)); continue; }
    const assetEntries = produced.assets.map((a) => ({ id: `a${a.id}`, assetId: a.id, name: a.name, kind: a.kind === 'texture' ? 'texture' : a.kind, storageKey: a.storageKey }));
    const ops = [];
    let entityId = placeholder?.id || null;
    const props = produced.kind === 'sprite'
      ? { shape: params.role === 'enemy' ? 'enemy' : 'custom', role: params.role || 'decoration', asset: `a${produced.assets[0].id}`, frames: produced.meta, width: (params.displayWidth || produced.meta.frameWidth * (produced.meta.pixelArt ? 2 : 1)), height: (params.displayHeight || produced.meta.frameHeight * (produced.meta.pixelArt ? 2 : 1)), style: j.style, forgeJob: j.id }
      : { asset: `a${produced.assets[0].id}`, lods: produced.assets.slice(1).map((a) => `a${a.id}`), collision: produced.meta.collision, style: j.style, animations: produced.meta.animations, forgeJob: j.id, pendingJob: null };
    const isCharacter = produced.kind === '3d' && ['character', 'creature'].includes(j.category);
    if (placeholder) ops.push({ op: 'update_entity', id: placeholder.id, patch: { props } });
    else if (params.place) {
      entityId = newId('frg');
      const type = produced.kind === 'sprite' ? 'sprite' : isCharacter ? (params.entityType === 'npc' ? 'npc' : 'character') : 'model';
      const finalProps = type === 'character' || type === 'npc' ? { ...props, model: props.asset, asset: undefined } : props;
      ops.push({ op: 'add_entity', entity: { id: entityId, type, name: produced.name, props: finalProps, transform: { position: params.place.position || [0, 0, 0], rotation: params.place.rotation || [0, 0, 0] },
        components: { ...(produced.kind === '3d' && !isCharacter ? { physics: { body: params.solid === false ? 'none' : 'static' } } : {}), ...(params.ai ? { ai: params.ai } : {}) } } });
    }
    if (placeholder && ['character', 'npc'].includes(placeholder.type)) ops[0].patch.props = { ...props, model: props.asset };
    if (produced.kind === 'sprite' && params.role === 'player' && entityId) ops.push({ op: 'set_player', patch: { entityId } });
    if (produced.kind === 'sprite' && params.role === 'enemy' && entityId && !placeholder) ops[0].entity.components = { ai: { speed: 80 } };
    let { doc: next } = applyOps(doc, ops);
    next.assets = [...(next.assets || []), ...assetEntries];
    try {
      saveRevisionFn(project, j.user_id, next, { source: 'ai', label: `FORGE: ${produced.name}`, baseRevision: project.revision });
    } catch (e) {
      if (e.code === 'revision_conflict' && Date.now() < deadline + 60_000) { await new Promise((r) => setTimeout(r, 1500)); continue; }
      throw e;
    }
    produced.result.entityId = entityId;
    return;
  }
}

/** Resultado do teste no motor (enviado pelo Studio) + correções automáticas seguras. */
export function recordTest(jobId, userId, report) {
  const j = one('SELECT * FROM asset_jobs WHERE id=? AND user_id=?', jobId, userId);
  if (!j) throw new HttpError(404, 'Job não encontrado.');
  const result = JSON.parse(j.result);
  const fixes = [];
  const project = one('SELECT * FROM projects WHERE id=?', j.project_id);
  const doc = JSON.parse(project.data);
  const e = result.entityId && doc.entities.find((x) => x.id === result.entityId);
  const ops = [];
  if (e && report.loaded && Number.isFinite(report.groundOffset) && Math.abs(report.groundOffset) > 0.05 && Math.abs(report.groundOffset) < 50) {
    ops.push({ op: 'update_entity', id: e.id, patch: { transform: { position: [e.transform.position[0], Math.round((e.transform.position[1] - report.groundOffset) * 1000) / 1000, e.transform.position[2]] } } });
    fixes.push(`altura ajustada em ${(-report.groundOffset).toFixed(2)} m para apoiar no chão`);
  }
  if (e && report.fps && report.fps < 30 && (e.props?.lods || []).length && !e.props.lodBias) {
    ops.push({ op: 'update_entity', id: e.id, patch: { props: { lodBias: 0.5 } } });
    fixes.push('LODs ativados mais cedo para recuperar FPS');
  }
  if (ops.length) {
    const { doc: next } = applyOps(doc, ops);
    saveRevisionFn(project, userId, next, { source: 'ai', label: 'FORGE: correções do teste no jogo', baseRevision: project.revision });
  }
  // Aprovado = carregou no motor. Desempenho é aviso (depende do aparelho que executou o teste).
  const passed = !!report.loaded;
  const performance = report.fps ? (report.fps >= 50 ? 'ok' : report.fps >= 25 ? 'medium' : 'low') : 'unknown';
  result.test = { ...report, passed, performance, fixes, at: new Date().toISOString() };
  setJob(jobId, { result });
  step(jobId, 'Teste no jogo', passed ? 'done' : 'failed', `${report.loaded ? 'carregou no motor' : `NÃO carregou${report.error ? `: ${report.error}` : ''}`} · ${report.triangles ?? '?'} triângulos na cena · ${report.drawCalls ?? '?'} draw calls · ${report.fps ? `${Math.round(report.fps)} FPS neste aparelho${performance === 'low' ? ' (baixo: considere qualidade menor ou LODs)' : ''}` : 'FPS n/d'}${fixes.length ? ` · correções: ${fixes.join('; ')}` : ''}`);
  return { passed, fixes };
}
