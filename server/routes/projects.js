// NEXPLAY STUDIO + NEXPLAY CLOUD: projetos, versões, colaboradores, assets e backup.
import { Router } from 'express';
import multer from 'multer';
import fs from 'node:fs';
import path from 'node:path';
import { one, all, run, tx } from '../db/index.js';
import { config } from '../config.js';
import { HttpError, rateLimiter } from '../lib/security.js';
import { requireAuth, publicUser } from '../lib/auth.js';
import { parse, z, text, id } from '../lib/validate.js';
import { entitlements, assertStorage, storageUsedBytes, notify, hasFeature } from '../lib/services.js';
import { validateAsset, saveAsset } from '../lib/uploads.js';
import { createProject, GENRE_TEMPLATES, validateProject, PROJECT_FORMAT, applyOps } from '../ai/project.js';

const r = Router();
const assetUpload = multer({ storage: multer.memoryStorage(), limits: { fileSize: config.limits.assetUploadMB * 1024 * 1024, files: 1 } });
const saveLimiter = rateLimiter({ windowMs: 60_000, max: 40, key: (req) => `ps:${req.user?.id}` });
const MAX_DOC_BYTES = 8 * 1024 * 1024;

/** Carrega projeto verificando permissão: 'view' (dono, editor, leitor) ou 'edit' (dono, editor). */
export function loadProject(req, need = 'view') {
  const p = one('SELECT * FROM projects WHERE id=?', parse(id, req.params.projectId ?? req.params.id));
  if (!p) throw new HttpError(404, 'Projeto não encontrado.');
  if (p.owner_id === req.user.id || req.user.role === 'admin') return { project: p, role: 'owner' };
  const m = one('SELECT role FROM project_members WHERE project_id=? AND user_id=?', p.id, req.user.id);
  if (!m || (need === 'edit' && m.role !== 'editor')) throw new HttpError(403, 'Sem permissão neste projeto.');
  return { project: p, role: m.role };
}

const summary = (p, role) => ({
  id: p.id, name: p.name, dimension: p.dimension, template: p.template, mode: p.mode, revision: p.revision,
  sizeBytes: p.size_bytes, thumbnail: p.thumbnail, createdAt: p.created_at, updatedAt: p.updated_at, role,
  owner: publicUser(one('SELECT * FROM users WHERE id=?', p.owner_id)),
});

/**
 * Grava uma nova revisão do documento + snapshot no histórico, respeitando limites do plano.
 * Usa controle otimista (baseRevision) para não sobrescrever trabalho de colaboradores.
 */
export function saveRevision(project, userId, doc, { source, label = '', baseRevision } = {}) {
  const data = JSON.stringify(doc);
  const size = Buffer.byteLength(data);
  if (size > MAX_DOC_BYTES) throw new HttpError(413, 'Projeto excede 8 MB. Mova dados grandes para assets.');
  const plan = entitlements(project.owner_id);
  return tx(() => {
    const current = one('SELECT revision, size_bytes FROM projects WHERE id=?', project.id);
    if (baseRevision !== undefined && baseRevision !== current.revision) {
      throw new HttpError(409, 'O projeto foi alterado em outro lugar. Recarregue para ver a versão mais recente.', 'revision_conflict');
    }
    assertStorage(project.owner_id, Math.max(0, size - current.size_bytes) + size);
    const revision = current.revision + 1;
    run('UPDATE projects SET data=?, size_bytes=?, revision=?, updated_at=? WHERE id=?', data, size, revision, new Date().toISOString(), project.id);
    const v = run('INSERT INTO project_versions(project_id, revision, label, source, author_id, data, size_bytes) VALUES (?,?,?,?,?,?,?)',
      project.id, revision, label, source, userId, data, size);
    // Poda: mantém apenas o número de versões do plano (versões nomeadas manualmente são preservadas primeiro).
    const keep = plan.version_history;
    const extra = all(`SELECT id FROM project_versions WHERE project_id=? ORDER BY (source='manual' AND label<>'') ASC, id ASC`, project.id);
    if (extra.length > keep) for (const row of extra.slice(0, extra.length - keep)) run('DELETE FROM project_versions WHERE id=?', row.id);
    return { revision, versionId: v.lastInsertRowid };
  });
}

r.get('/templates', (_req, res) => res.json({ templates: GENRE_TEMPLATES }));

r.get('/', requireAuth, (req, res) => {
  const own = all('SELECT * FROM projects WHERE owner_id=? ORDER BY updated_at DESC', req.user.id).map((p) => summary(p, 'owner'));
  const shared = all(`SELECT p.*, m.role AS mrole FROM project_members m JOIN projects p ON p.id=m.project_id WHERE m.user_id=? ORDER BY p.updated_at DESC`, req.user.id)
    .map((p) => summary(p, p.mrole));
  const plan = entitlements(req.user.id);
  res.json({
    projects: own, shared,
    storage: { usedBytes: storageUsedBytes(req.user.id), limitBytes: plan.storage_mb * 1024 * 1024 },
    limits: { maxProjects: plan.max_projects, versionHistory: plan.version_history, plan: plan.code },
  });
});

r.post('/', requireAuth, saveLimiter, (req, res) => {
  const b = parse(z.object({ name: text(60).pipe(z.string().min(1)), dimension: z.enum(['2d', '3d']), template: z.enum(GENRE_TEMPLATES), mode: z.enum(['easy', 'advanced']).default('easy') }), req.body);
  const plan = entitlements(req.user.id);
  if (Number(one('SELECT COUNT(*) AS c FROM projects WHERE owner_id=?', req.user.id).c) >= plan.max_projects) {
    throw new HttpError(402, `Seu plano ${plan.name} permite até ${plan.max_projects} projetos.`, 'project_limit');
  }
  const doc = createProject({ name: b.name, dimension: b.dimension, template: b.template });
  const data = JSON.stringify(doc);
  assertStorage(req.user.id, Buffer.byteLength(data) * 2);
  const pid = tx(() => {
    const p = run('INSERT INTO projects(owner_id, name, dimension, template, mode, data, size_bytes) VALUES (?,?,?,?,?,?,?)',
      req.user.id, b.name, b.dimension, b.template, b.mode, data, Buffer.byteLength(data));
    run('INSERT INTO project_versions(project_id, revision, label, source, author_id, data, size_bytes) VALUES (?,?,?,?,?,?,?)',
      p.lastInsertRowid, 1, 'Projeto criado', 'manual', req.user.id, data, Buffer.byteLength(data));
    return p.lastInsertRowid;
  });
  res.status(201).json({ project: summary(one('SELECT * FROM projects WHERE id=?', pid), 'owner') });
});

r.get('/:id', requireAuth, (req, res) => {
  const { project, role } = loadProject(req, 'view');
  res.json({ project: summary(project, role), doc: JSON.parse(project.data), assets: assetsOf(project.id) });
});

r.put('/:id', requireAuth, saveLimiter, (req, res) => {
  const { project } = loadProject(req, 'edit');
  const b = parse(z.object({ doc: z.record(z.string(), z.any()), baseRevision: z.number().int(), source: z.enum(['manual', 'autosave']).default('autosave'), label: text(80).default('') }), req.body);
  if (b.doc.format !== PROJECT_FORMAT) throw new HttpError(400, 'Documento inválido.');
  const report = validateProject(b.doc);
  const saved = saveRevision(project, req.user.id, b.doc, { source: b.source, label: b.label, baseRevision: b.baseRevision });
  res.json({ ...saved, validation: report });
});

r.patch('/:id', requireAuth, (req, res) => {
  const { project, role } = loadProject(req, 'edit');
  const b = parse(z.object({ name: text(60).pipe(z.string().min(1)).optional(), mode: z.enum(['easy', 'advanced']).optional(), thumbnail: z.string().max(400_000).regex(/^data:image\/(png|jpeg|webp);base64,/).optional() }), req.body);
  run('UPDATE projects SET name=COALESCE(?,name), mode=COALESCE(?,mode), thumbnail=COALESCE(?,thumbnail) WHERE id=?', b.name ?? null, b.mode ?? null, b.thumbnail ?? null, project.id);
  res.json({ project: summary(one('SELECT * FROM projects WHERE id=?', project.id), role) });
});

r.delete('/:id', requireAuth, (req, res) => {
  const { project, role } = loadProject(req, 'edit');
  if (role !== 'owner') throw new HttpError(403, 'Apenas o dono pode excluir o projeto.');
  for (const a of all('SELECT storage_key FROM project_assets WHERE project_id=?', project.id)) fs.rmSync(path.join(config.dataDir, 'assets', a.storage_key), { force: true });
  run('DELETE FROM projects WHERE id=?', project.id);
  res.json({ ok: true });
});

/** Aplica operações estruturadas (mesmo formato usado pela IA) — útil para integrações e testes. */
r.post('/:id/ops', requireAuth, saveLimiter, (req, res) => {
  const { project } = loadProject(req, 'edit');
  const b = parse(z.object({ ops: z.array(z.record(z.string(), z.any())).min(1).max(200), baseRevision: z.number().int(), label: text(80).default('') }), req.body);
  let result;
  try { result = applyOps(JSON.parse(project.data), b.ops); } catch (e) { throw new HttpError(400, e.message); }
  const saved = saveRevision(project, req.user.id, result.doc, { source: 'manual', label: b.label, baseRevision: b.baseRevision });
  res.json({ ...saved, changes: result.changes, doc: result.doc });
});

r.post('/:id/validate', requireAuth, (req, res) => {
  const { project } = loadProject(req, 'view');
  res.json(validateProject(JSON.parse(project.data)));
});

// ───────── Histórico de versões ─────────
r.get('/:id/versions', requireAuth, (req, res) => {
  const { project } = loadProject(req, 'view');
  res.json({ versions: all(`SELECT v.id, v.revision, v.label, v.source, v.size_bytes, v.created_at, u.username FROM project_versions v
    LEFT JOIN users u ON u.id=v.author_id WHERE v.project_id=? ORDER BY v.id DESC`, project.id) });
});

r.post('/:id/versions', requireAuth, (req, res) => {
  const { project } = loadProject(req, 'edit');
  const { label } = parse(z.object({ label: text(80).pipe(z.string().min(1)) }), req.body);
  const saved = saveRevision(project, req.user.id, JSON.parse(project.data), { source: 'manual', label });
  res.status(201).json(saved);
});

r.get('/:id/versions/:versionId', requireAuth, (req, res) => {
  const { project } = loadProject(req, 'view');
  const v = one('SELECT * FROM project_versions WHERE id=? AND project_id=?', parse(id, req.params.versionId), project.id);
  if (!v) throw new HttpError(404, 'Versão não encontrada.');
  res.json({ version: { id: v.id, revision: v.revision, label: v.label, source: v.source, createdAt: v.created_at }, doc: JSON.parse(v.data) });
});

r.post('/:id/versions/:versionId/restore', requireAuth, (req, res) => {
  const { project } = loadProject(req, 'edit');
  const v = one('SELECT * FROM project_versions WHERE id=? AND project_id=?', parse(id, req.params.versionId), project.id);
  if (!v) throw new HttpError(404, 'Versão não encontrada.');
  const saved = saveRevision(project, req.user.id, JSON.parse(v.data), { source: 'restore', label: `Restaurado da revisão ${v.revision}` });
  res.json(saved);
});

// ───────── Colaboradores ─────────
r.get('/:id/members', requireAuth, (req, res) => {
  const { project } = loadProject(req, 'view');
  res.json({ members: all('SELECT m.role, u.* FROM project_members m JOIN users u ON u.id=m.user_id WHERE m.project_id=?', project.id).map((u) => ({ ...publicUser(u), role: u.role })) });
});

r.post('/:id/members', requireAuth, (req, res) => {
  const { project, role } = loadProject(req, 'edit');
  if (role !== 'owner') throw new HttpError(403, 'Apenas o dono pode gerenciar colaboradores.');
  const b = parse(z.object({ username: z.string().max(40), role: z.enum(['editor', 'viewer']) }), req.body);
  const u = one('SELECT * FROM users WHERE username=?', b.username);
  if (!u || u.id === project.owner_id) throw new HttpError(404, 'Usuário não encontrado.');
  const limit = hasFeature(project.owner_id, 'studio_extra_tools') ? 20 : 3;
  if (Number(one('SELECT COUNT(*) AS c FROM project_members WHERE project_id=?', project.id).c) >= limit) throw new HttpError(402, `Limite de ${limit} colaboradores no seu plano.`);
  run('INSERT INTO project_members(project_id, user_id, role) VALUES (?,?,?) ON CONFLICT(project_id, user_id) DO UPDATE SET role=excluded.role', project.id, u.id, b.role);
  notify(u.id, 'project_share', `${req.user.display_name} compartilhou o projeto "${project.name}" com você`, `Permissão: ${b.role === 'editor' ? 'edição' : 'visualização'}`, `/studio/${project.id}`);
  res.json({ ok: true });
});

r.delete('/:id/members/:username', requireAuth, (req, res) => {
  const { project, role } = loadProject(req, 'view');
  const u = one('SELECT * FROM users WHERE username=?', req.params.username);
  if (!u) throw new HttpError(404, 'Usuário não encontrado.');
  if (role !== 'owner' && u.id !== req.user.id) throw new HttpError(403, 'Sem permissão.');
  run('DELETE FROM project_members WHERE project_id=? AND user_id=?', project.id, u.id);
  res.json({ ok: true });
});

// ───────── Assets ─────────
function assetsOf(projectId) {
  return all('SELECT id, name, kind, mime, size_bytes, storage_key, meta, created_at FROM project_assets WHERE project_id=? ORDER BY id DESC', projectId)
    .map((a) => ({ ...a, meta: JSON.parse(a.meta || '{}'), url: `/api/projects/${projectId}/assets/${a.id}/file` }));
}

r.post('/:id/assets', requireAuth, assetUpload.single('file'), (req, res) => {
  const { project } = loadProject(req, 'edit');
  if (!req.file) throw new HttpError(400, 'Envie um arquivo.');
  const t = validateAsset(req.file.originalname, req.file.buffer);
  assertStorage(project.owner_id, req.file.size);
  const key = saveAsset(req.file.buffer, t.ext);
  const name = text(80).parse(path.basename(req.file.originalname));
  const a = run('INSERT INTO project_assets(project_id, owner_id, name, kind, mime, storage_key, size_bytes) VALUES (?,?,?,?,?,?,?)',
    project.id, project.owner_id, name, t.kind === 'texture' ? 'texture' : t.kind, t.mime, key, req.file.size);
  res.status(201).json({ asset: { id: a.lastInsertRowid, name, kind: t.kind, mime: t.mime, storage_key: key, url: `/api/projects/${project.id}/assets/${a.lastInsertRowid}/file` } });
});

r.get('/:id/assets/:assetId/file', requireAuth, (req, res) => {
  const { project } = loadProject(req, 'view');
  const a = one('SELECT * FROM project_assets WHERE id=? AND project_id=?', parse(id, req.params.assetId), project.id);
  if (!a) throw new HttpError(404, 'Asset não encontrado.');
  res.setHeader('Content-Type', a.mime);
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Content-Disposition', 'inline');
  res.sendFile(path.join(config.dataDir, 'assets', a.storage_key));
});

r.delete('/:id/assets/:assetId', requireAuth, (req, res) => {
  const { project } = loadProject(req, 'edit');
  const a = one('SELECT * FROM project_assets WHERE id=? AND project_id=?', parse(id, req.params.assetId), project.id);
  if (!a) throw new HttpError(404, 'Asset não encontrado.');
  run('DELETE FROM project_assets WHERE id=?', a.id);
  fs.rmSync(path.join(config.dataDir, 'assets', a.storage_key), { force: true });
  res.json({ ok: true });
});

// ───────── Backup (exportar/importar) ─────────
r.get('/:id/export', requireAuth, (req, res) => {
  const { project } = loadProject(req, 'view');
  const assets = all('SELECT * FROM project_assets WHERE project_id=?', project.id).map((a) => ({
    name: a.name, kind: a.kind, mime: a.mime, storageKey: a.storage_key,
    data: fs.readFileSync(path.join(config.dataDir, 'assets', a.storage_key)).toString('base64'),
  }));
  res.setHeader('Content-Disposition', `attachment; filename="${project.name.replace(/[^\w.-]+/g, '_')}.nexplay.json"`);
  res.json({ format: 'nexplay-backup', version: 1, exportedAt: new Date().toISOString(), project: { name: project.name, dimension: project.dimension, template: project.template, mode: project.mode }, doc: JSON.parse(project.data), assets });
});

r.post('/import', requireAuth, (req, res) => {
  const b = parse(z.object({ format: z.literal('nexplay-backup'), project: z.object({ name: text(60), dimension: z.enum(['2d', '3d']), template: z.string().max(30), mode: z.enum(['easy', 'advanced']) }),
    doc: z.record(z.string(), z.any()), assets: z.array(z.object({ name: z.string().max(80), storageKey: z.string().max(80), data: z.string() })).max(500).default([]) }), req.body);
  if (b.doc.format !== PROJECT_FORMAT) throw new HttpError(400, 'Backup inválido.');
  const plan = entitlements(req.user.id);
  if (Number(one('SELECT COUNT(*) AS c FROM projects WHERE owner_id=?', req.user.id).c) >= plan.max_projects) throw new HttpError(402, 'Limite de projetos do plano atingido.');
  const buffers = b.assets.map((a) => ({ ...a, buf: Buffer.from(a.data, 'base64') }));
  const data = JSON.stringify(b.doc);
  assertStorage(req.user.id, Buffer.byteLength(data) * 2 + buffers.reduce((s, a) => s + a.buf.length, 0));
  const pid = tx(() => {
    const p = run('INSERT INTO projects(owner_id, name, dimension, template, mode, data, size_bytes) VALUES (?,?,?,?,?,?,?)',
      req.user.id, b.project.name, b.project.dimension, b.project.template, b.project.mode, data, Buffer.byteLength(data));
    const doc = b.doc;
    for (const a of buffers) {
      const t = validateAsset(a.name, a.buf);
      const key = saveAsset(a.buf, t.ext);
      run('INSERT INTO project_assets(project_id, owner_id, name, kind, mime, storage_key, size_bytes) VALUES (?,?,?,?,?,?,?)', p.lastInsertRowid, req.user.id, a.name, t.kind, t.mime, key, a.buf.length);
      for (const ref of doc.assets || []) if (ref.storageKey === a.storageKey) ref.storageKey = key;
    }
    const finalData = JSON.stringify(doc);
    run('UPDATE projects SET data=?, size_bytes=? WHERE id=?', finalData, Buffer.byteLength(finalData), p.lastInsertRowid);
    run('INSERT INTO project_versions(project_id, revision, label, source, author_id, data, size_bytes) VALUES (?,?,?,?,?,?,?)', p.lastInsertRowid, 1, 'Importado de backup', 'import', req.user.id, finalData, Buffer.byteLength(finalData));
    return p.lastInsertRowid;
  });
  res.status(201).json({ project: summary(one('SELECT * FROM projects WHERE id=?', pid), 'owner') });
});

export default r;
