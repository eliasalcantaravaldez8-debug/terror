// Rotas da NEXPLAY AI (comandos, especialidades, Autopilot, cota).
import { Router } from 'express';
import { all } from '../db/index.js';
import { config } from '../config.js';
import { HttpError } from '../lib/security.js';
import { requireAuth } from '../lib/auth.js';
import { parse, z, id } from '../lib/validate.js';
import { hasFeature } from '../lib/services.js';
import { SPECIALISTS, aiTier } from '../ai/specialists.js';
import { runCommand, aiQuota } from '../ai/agent.js';
import { startAutopilot, approveAutopilot, cancelAutopilot, getRun } from '../ai/autopilot.js';
import { loadProject, saveRevision } from './projects.js';
import { one } from '../db/index.js';

const r = Router();

r.get('/status', requireAuth, (req, res) => {
  res.json({
    configured: config.ai.enabled,
    provider: config.ai.provider === 'mock' ? 'mock' : 'anthropic',
    quota: aiQuota(req.user.id),
    tier: aiTier(aiQuota(req.user.id).plan),
    autopilot: hasFeature(req.user.id, 'autopilot'),
    specialists: Object.entries(SPECIALISTS).map(([key, s]) => ({ key, name: s.name, description: s.description })),
  });
});

r.get('/projects/:projectId/conversation', requireAuth, (req, res) => {
  const { project } = loadProject(req, 'view');
  res.json({ messages: all('SELECT id, role, specialist, content, changes, version_id, created_at FROM ai_conversations WHERE project_id=? AND user_id=? ORDER BY id DESC LIMIT 60', project.id, req.user.id)
    .reverse().map((m) => ({ ...m, changes: JSON.parse(m.changes) })) });
});

/**
 * Executa um comando. Resposta em streaming NDJSON: eventos de progresso e, por fim, {type:'result'}.
 * O modo "team" (PRO/DELUXE) encadeia especialidades: a primeira executa e a IA Testadora verifica.
 */
r.post('/projects/:projectId/command', requireAuth, async (req, res) => {
  const { project } = loadProject(req, 'edit');
  const b = parse(z.object({ prompt: z.string().trim().min(2).max(8000), specialist: z.enum(Object.keys(SPECIALISTS)).default('criadora'), withTester: z.boolean().default(false) }), req.body);
  res.setHeader('Content-Type', 'application/x-ndjson; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Accel-Buffering', 'no');
  const send = (ev) => { if (!res.writableEnded) res.write(`${JSON.stringify(ev)}\n`); };
  try {
    let result = await runCommand({ req, project, specialist: b.specialist, prompt: b.prompt, saveRevision, onEvent: send });
    if (b.withTester && b.specialist !== 'tester' && result.changes.length) {
      if (!aiTier(aiQuota(req.user.id).plan).team) throw new HttpError(402, 'Equipe de especialidades disponível nos planos PRO e DELUXE.', 'plan_required');
      send({ type: 'phase', message: 'IA Testadora verificando as alterações…' });
      const fresh = one('SELECT * FROM projects WHERE id=?', project.id);
      const test = await runCommand({ req, project: fresh, specialist: 'tester', prompt: `Verifique e corrija problemas nas alterações recém-feitas para o pedido: "${b.prompt}". Alterações: ${result.changes.map((c) => c.label).join('; ').slice(0, 4000)}`, saveRevision, onEvent: send });
      result = { ...test, text: `${result.text}\n\n— IA Testadora —\n${test.text}`, changes: [...result.changes, ...test.changes], limitations: [...result.limitations, ...test.limitations] };
    }
    send({ type: 'result', text: result.text, changes: result.changes, limitations: result.limitations, validation: result.validation, versionId: result.versionId, revision: result.revision, quota: aiQuota(req.user.id) });
  } catch (e) {
    send({ type: 'error', status: e.status || 500, code: e.code, message: e.status ? e.message : 'Erro interno na IA.' });
    if (!e.status) console.error(e);
  }
  res.end();
});

r.post('/projects/:projectId/autopilot', requireAuth, (req, res) => {
  const { project } = loadProject(req, 'edit');
  const b = parse(z.object({ request: z.string().trim().min(10).max(8000) }), req.body);
  const runId = startAutopilot({ user: req.user, project, request: b.request, saveRevision });
  res.status(202).json({ runId });
});

r.get('/autopilot', requireAuth, (req, res) => {
  res.json({ runs: all('SELECT id, project_id, request, status, created_at, updated_at FROM autopilot_runs WHERE user_id=? ORDER BY id DESC LIMIT 30', req.user.id) });
});
r.get('/autopilot/:runId', requireAuth, (req, res) => {
  const run = getRun(parse(id, req.params.runId), req.user.id);
  for (const s of run.plan.steps || []) delete s.pendingDoc;
  res.json({ run });
});
r.post('/autopilot/:runId/approve', requireAuth, (req, res) => {
  const b = parse(z.object({ decision: z.enum(['approve', 'reject']).default('approve') }), req.body);
  approveAutopilot({ user: req.user, runId: parse(id, req.params.runId), decision: b.decision, saveRevision });
  res.json({ ok: true });
});
r.post('/autopilot/:runId/cancel', requireAuth, (req, res) => {
  cancelAutopilot(req.user, parse(id, req.params.runId));
  res.json({ ok: true });
});

export default r;
