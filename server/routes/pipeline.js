// Rotas da NEXPLAY FORGE (linha de produção de assets).
import { Router } from 'express';
import multer from 'multer';
import path from 'node:path';
import { one } from '../db/index.js';
import { config } from '../config.js';
import { HttpError, rateLimiter } from '../lib/security.js';
import { requireAuth } from '../lib/auth.js';
import { parse, z, text, id } from '../lib/validate.js';
import { loadProject, saveRevision } from './projects.js';
import { toolStatus, createJob, listJobs, getJob, cancelJob, recordTest, quotaFor, setSaveRevision } from '../pipeline/index.js';
import { ART_STYLES, classifyStyle, CATEGORY_SIZE } from '../pipeline/styles.js';
import { detectImage } from '../lib/uploads.js';

setSaveRevision(saveRevision);
const r = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 150 * 1024 * 1024, files: 1 } });
const limiter = rateLimiter({ windowMs: 60_000, max: 20, key: (req) => `forge:${req.user?.id}` });
const vec3 = z.array(z.number().finite()).length(3);

r.get('/tools', requireAuth, (req, res) => {
  res.json({ tools: toolStatus(), styles: Object.entries(ART_STYLES).map(([k, s]) => ({ id: k, label: s.label, dimension: s.dimension, description: s.description })), categories: Object.keys(CATEGORY_SIZE), quota: quotaFor(req.user.id) });
});

r.post('/classify', requireAuth, (req, res) => {
  const b = parse(z.object({ text: z.string().max(4000), dimension: z.enum(['2d', '3d']).optional() }), req.body);
  res.json(classifyStyle(b.text, b));
});

r.get('/projects/:projectId/jobs', requireAuth, (req, res) => {
  const { project } = loadProject(req, 'view');
  res.json({ jobs: listJobs(project.id), quota: quotaFor(req.user.id) });
});

const voxelSpec = z.object({
  size: vec3, palette: z.record(z.string().max(2), z.string().regex(/^#?[0-9a-fA-F]{6}$/)),
  shapes: z.array(z.record(z.string(), z.any())).max(400).default([]),
  layers: z.array(z.object({ y: z.number().int(), rows: z.array(z.string().max(256)).max(256) })).max(256).optional(),
});
const spriteSpec = z.object({
  width: z.number().int(), height: z.number().int(), palette: z.record(z.string().max(1), z.string()),
  frames: z.array(z.object({ rows: z.array(z.string().max(128)) })).min(1).max(64),
  animations: z.record(z.string().max(30), z.array(z.number().int())).optional(), fps: z.number().int().min(1).max(30).optional(),
});
const jobBody = z.object({
  kind: z.enum(['model3d', 'voxel', 'sprite']),
  prompt: text(1500).default(''),
  name: text(40).optional(),
  category: z.enum(Object.keys(CATEGORY_SIZE)).default('prop'),
  style: z.enum(['auto', ...Object.keys(ART_STYLES)]).default('auto'),
  provider: z.enum(['auto', 'tripo', 'meshy']).default('auto'),
  targetHeight: z.number().positive().max(500).optional(),
  place: z.object({ position: vec3.optional(), rotation: vec3.optional() }).optional(),
  entityType: z.enum(['character', 'npc']).optional(),
  role: z.enum(['player', 'enemy', 'decoration', 'item']).optional(),
  rig: z.boolean().optional(),
  voxelSpec: voxelSpec.optional(),
  voxelSize: z.number().positive().max(2).optional(),
  spriteSpec: spriteSpec.optional(),
});

r.post('/projects/:projectId/jobs', requireAuth, limiter, (req, res) => {
  const { project } = loadProject(req, 'edit');
  const b = parse(jobBody, req.body);
  if (b.kind === 'model3d' && b.prompt.length < 3) throw new HttpError(400, 'Descreva o modelo.');
  if (b.kind === 'voxel' && !b.voxelSpec) throw new HttpError(400, 'Envie a especificação voxel ou importe um .vox.');
  if (b.kind === 'sprite' && !b.spriteSpec) throw new HttpError(400, 'Envie a especificação do sprite ou importe uma imagem.');
  res.status(202).json({ job: createJob({ userId: req.user.id, project, kind: b.kind, params: b }) });
});

/** Importa e aprimora: .glb, .vox (MagicaVoxel), .png/.jpg/.webp (sprites), .kra/.ora (Krita) — e imagem de referência para gerar 3D. */
r.post('/projects/:projectId/import', requireAuth, limiter, upload.single('file'), (req, res) => {
  const { project } = loadProject(req, 'edit');
  if (!req.file) throw new HttpError(400, 'Envie um arquivo.');
  const ext = path.extname(req.file.originalname).toLowerCase();
  const f = parse(z.object({
    mode: z.enum(['asset', 'reference']).default('asset'),
    prompt: text(1500).default(''), name: text(40).optional(),
    category: z.enum(Object.keys(CATEGORY_SIZE)).default('prop'), style: z.enum(['auto', ...Object.keys(ART_STYLES)]).default('auto'),
    provider: z.enum(['auto', 'tripo', 'meshy']).default('auto'),
    frameWidth: z.coerce.number().int().positive().optional(), frameHeight: z.coerce.number().int().positive().optional(),
    pixelArt: z.enum(['true', 'false']).optional(), place: z.enum(['true', 'false']).default('true'),
    x: z.coerce.number().default(0), y: z.coerce.number().default(0), z: z.coerce.number().default(0),
    entityType: z.enum(['character', 'npc']).optional(),
  }), req.body);
  const common = { name: f.name || path.basename(req.file.originalname, ext), prompt: f.prompt, category: f.category, style: f.style, entityType: f.entityType,
    place: f.place === 'true' ? { position: [f.x, f.y, f.z] } : undefined };
  let job;
  if (f.mode === 'reference') {
    const img = detectImage(req.file.buffer);
    if (!img || !['png', 'jpg'].includes(img.ext)) throw new HttpError(400, 'A imagem de referência precisa ser PNG ou JPG.');
    job = createJob({ userId: req.user.id, project, kind: 'model3d', params: { ...common, provider: f.provider, prompt: f.prompt || common.name, image: { buffer: req.file.buffer, mime: img.mime } } });
  } else if (ext === '.glb') {
    if (req.file.buffer.subarray(0, 4).toString('latin1') !== 'glTF') throw new HttpError(400, 'Arquivo .glb inválido.');
    job = createJob({ userId: req.user.id, project, kind: 'import', params: { ...common, upload: { buffer: req.file.buffer, name: req.file.originalname } } });
  } else if (ext === '.vox') {
    job = createJob({ userId: req.user.id, project, kind: 'import', params: { ...common, style: f.style === 'auto' ? 'voxel' : f.style, upload: { buffer: req.file.buffer, name: req.file.originalname } } });
  } else if (['.png', '.jpg', '.jpeg', '.webp', '.kra', '.ora'].includes(ext)) {
    if (!['.kra', '.ora'].includes(ext) && !detectImage(req.file.buffer)) throw new HttpError(400, 'Imagem inválida.');
    job = createJob({ userId: req.user.id, project, kind: 'sprite', params: { ...common, style: f.style === 'auto' ? (f.pixelArt === 'true' ? 'pixel' : 'illustrated') : f.style,
      frameWidth: f.frameWidth, frameHeight: f.frameHeight, pixelArt: f.pixelArt === 'true', upload: { buffer: req.file.buffer, name: req.file.originalname } } });
  } else throw new HttpError(400, 'Formatos aceitos: .glb, .vox, .png, .jpg, .webp, .kra, .ora.');
  res.status(202).json({ job });
});

r.get('/jobs/:id', requireAuth, (req, res) => {
  const j = getJob(parse(id, req.params.id));
  if (!j) throw new HttpError(404, 'Job não encontrado.');
  req.params.projectId = j.projectId;
  loadProject(req, 'view');
  res.json({ job: j });
});

r.post('/jobs/:id/cancel', requireAuth, (req, res) => { cancelJob(parse(id, req.params.id), req.user.id); res.json({ ok: true }); });

r.post('/jobs/:id/test', requireAuth, (req, res) => {
  const b = parse(z.object({ loaded: z.boolean(), triangles: z.number().int().nonnegative().optional(), drawCalls: z.number().int().nonnegative().optional(),
    fps: z.number().nonnegative().max(1000).optional(), groundOffset: z.number().finite().optional(), size: vec3.optional(), error: text(300).optional() }), req.body);
  res.json(recordTest(parse(id, req.params.id), req.user.id, b));
});

/** Baixa o .vox original de um asset voxel (para editar no MagicaVoxel). */
r.get('/projects/:projectId/assets/:assetId/vox', requireAuth, (req, res) => {
  const { project } = loadProject(req, 'view');
  const a = one('SELECT * FROM project_assets WHERE id=? AND project_id=?', parse(id, req.params.assetId), project.id);
  const voxId = a && JSON.parse(a.meta || '{}').vox;
  const v = voxId && one('SELECT * FROM project_assets WHERE id=? AND project_id=?', voxId, project.id);
  if (!v) throw new HttpError(404, 'Este asset não tem um .vox associado.');
  res.download(path.join(config.dataDir, 'assets', v.storage_key), v.name);
});

export default r;
