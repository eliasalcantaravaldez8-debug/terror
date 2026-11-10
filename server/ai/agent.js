// Laço do agente da NEXPLAY AI: modelo ↔ ferramentas sobre uma cópia do projeto.
// Ao final, as alterações viram UMA nova revisão (fonte "ai"), que pode ser desfeita no histórico.
import { one, run, all } from '../db/index.js';
import { HttpError } from '../lib/security.js';
import { entitlements } from '../lib/services.js';
import { SPECIALISTS, aiTier } from './specialists.js';
import { toolsFor, executeTool } from './tools.js';
import { createMessage, AIUnavailableError, Anthropic, isRetryableJsonError } from './provider.js';
import { config } from '../config.js';
import { toolStatus, quotaFor, createJob } from '../pipeline/index.js';

// ───────── Cotas por plano ─────────
const running = new Map(); // userId → número de execuções simultâneas

export function aiQuota(userId) {
  const plan = entitlements(userId);
  const dayStart = new Date().toISOString().slice(0, 10);
  const used = Number(one(`SELECT COUNT(*) AS c FROM ai_usage WHERE user_id=? AND created_at >= ? AND status <> 'unavailable'`, userId, dayStart).c);
  return { plan: plan.code, dailyLimit: plan.ai_daily_commands, used, remaining: plan.ai_daily_commands == null ? null : Math.max(0, plan.ai_daily_commands - used), perMinute: plan.ai_per_minute };
}

export function assertQuota(userId) {
  const q = aiQuota(userId);
  if (q.dailyLimit != null && q.used >= q.dailyLimit) {
    throw new HttpError(429, `Você usou os ${q.dailyLimit} comandos de IA de hoje no plano ${q.plan.toUpperCase()}. O limite renova à meia-noite (UTC).`, 'ai_daily_limit');
  }
  const minuteAgo = new Date(Date.now() - 60_000).toISOString();
  const lastMinute = Number(one('SELECT COUNT(*) AS c FROM ai_usage WHERE user_id=? AND created_at >= ?', userId, minuteAgo).c);
  if (lastMinute >= q.perMinute) throw new HttpError(429, 'Muitos comandos em sequência. Aguarde um minuto (proteção contra abuso).', 'ai_rate');
  const concurrent = running.get(userId) || 0;
  const maxConcurrent = q.plan === 'deluxe' ? 2 : 1;
  if (concurrent >= maxConcurrent) throw new HttpError(429, 'Já existe uma tarefa de IA em andamento. Aguarde terminar.', 'ai_busy');
  return q;
}

function recordUsage(userId, projectId, specialist, kind, usage, status) {
  run('INSERT INTO ai_usage(user_id, project_id, specialist, kind, input_tokens, output_tokens, status) VALUES (?,?,?,?,?,?,?)',
    userId, projectId, specialist, kind, usage.input || 0, usage.output || 0, status);
}

/**
 * Executa um especialista sobre o documento. Não grava no banco: retorna o novo doc e o relatório.
 * history: mensagens anteriores (texto) para contexto de conversa.
 */
export async function runSpecialist({ userId, doc, specialist, prompt, history = [], onEvent = () => {}, signal }) {
  const spec = SPECIALISTS[specialist];
  if (!spec) throw new HttpError(400, 'Especialidade inválida.');
  const tier = aiTier(entitlements(userId).code);
  const state = { doc, changes: [], limitations: [], lastValidation: null, forgeRequests: [], forge: spec.tools.some((t) => /forge|3d_model|voxel|pixel/.test(t)) ? { tools: toolStatus(), quota: quotaFor(userId), projectStyle: doc.artStyle || null } : null };
  const tools = toolsFor(spec.tools);
  const messages = [...history, { role: 'user', content: prompt }];
  const usage = { input: 0, output: 0 };
  let finalText = '';
  let jsonRetries = 0;
  let stopReason = null;

  for (let i = 0; i < Math.min(tier.maxIterations, config.ai.maxToolIterations + 16); i++) {
    if (signal?.aborted) throw new HttpError(499, 'Tarefa cancelada.');
    let msg;
    try {
      msg = await createMessage({ system: spec.prompt, messages, tools, effort: tier.effort, maxTokens: tier.maxTokens, signal,
        onText: (t) => onEvent({ type: 'text', specialist, text: t }) });
      jsonRetries = 0;
    } catch (err) {
      if (err instanceof AIUnavailableError) throw new HttpError(503, err.message, 'ai_unavailable');
      if (isRetryableJsonError(err) && jsonRetries++ < 2) continue;
      if (err instanceof Anthropic.RateLimitError) throw new HttpError(503, 'A IA está sobrecarregada no momento. Tente novamente em instantes.', 'ai_overloaded');
      if (err instanceof Anthropic.AuthenticationError) throw new HttpError(503, 'Credencial da IA inválida no servidor.', 'ai_unavailable');
      if (err instanceof Anthropic.APIError) throw new HttpError(502, `Falha na IA (${err.status}).`, 'ai_error');
      throw err;
    }
    usage.input += msg.usage?.input_tokens || 0;
    usage.output += msg.usage?.output_tokens || 0;
    stopReason = msg.stop_reason;
    const texts = msg.content.filter((b) => b.type === 'text').map((b) => b.text).join('\n').trim();
    if (texts) finalText = texts;

    if (msg.stop_reason === 'refusal') {
      finalText = 'A IA recusou este pedido por motivos de segurança. Reformule o pedido.';
      break;
    }
    if (msg.stop_reason === 'pause_turn') { messages.push({ role: 'assistant', content: msg.content }); continue; }
    const toolUses = msg.content.filter((b) => b.type === 'tool_use');
    if (!toolUses.length) break;
    if (msg.stop_reason === 'max_tokens') {
      // Entrada de ferramenta possivelmente truncada: não executa, pede para continuar em partes menores.
      messages.push({ role: 'assistant', content: msg.content });
      messages.push({ role: 'user', content: toolUses.map((t) => ({ type: 'tool_result', tool_use_id: t.id, is_error: true, content: 'Entrada truncada (limite de tokens). Divida em chamadas menores.' })) });
      continue;
    }
    messages.push({ role: 'assistant', content: msg.content });
    const results = [];
    for (const t of toolUses) {
      onEvent({ type: 'tool', specialist, tool: t.name });
      try {
        if (!spec.tools.includes(t.name)) throw new Error('Ferramenta não disponível para esta especialidade.');
        const out = executeTool(state, t.name, t.input);
        results.push({ type: 'tool_result', tool_use_id: t.id, content: out.length > 60_000 ? `${out.slice(0, 60_000)}…(truncado)` : out });
      } catch (e) {
        const message = e?.issues ? `Entrada inválida: ${e.issues.map((x) => `${x.path.join('.')}: ${x.message}`).join('; ')}` : e.message;
        results.push({ type: 'tool_result', tool_use_id: t.id, is_error: true, content: message });
        onEvent({ type: 'tool_error', specialist, tool: t.name, message });
      }
    }
    messages.push({ role: 'user', content: results });
  }
  return { doc: state.doc, changes: state.changes, limitations: state.limitations, validation: state.lastValidation, text: finalText, usage, stopReason, forgeRequests: state.forgeRequests };
}

/** Comando de IA completo para o Studio: cota, execução, gravação de revisão e histórico de conversa. */
export async function runCommand({ req, project, specialist, prompt, saveRevision, onEvent }) {
  const userId = req.user.id;
  assertQuota(userId);
  running.set(userId, (running.get(userId) || 0) + 1);
  try {
    const priorRows = all(`SELECT role, content FROM ai_conversations WHERE project_id=? AND user_id=? AND role IN ('user','assistant') ORDER BY id DESC LIMIT 6`, project.id, userId).reverse();
    const history = [];
    for (const m of priorRows) {
      if (history.length && history[history.length - 1].role === m.role) continue; // alterna papéis
      history.push({ role: m.role, content: m.content });
    }
    if (history.length && history[0].role !== 'user') history.shift();
    if (history.length && history[history.length - 1].role === 'user') history.pop();
    run('INSERT INTO ai_conversations(project_id, user_id, role, specialist, content) VALUES (?,?,?,?,?)', project.id, userId, 'user', specialist, prompt);
    let result;
    try {
      result = await runSpecialist({ userId, doc: JSON.parse(project.data), specialist, prompt, history, onEvent });
    } catch (e) {
      recordUsage(userId, project.id, specialist, 'command', {}, e.code === 'ai_unavailable' ? 'unavailable' : 'error');
      throw e;
    }
    recordUsage(userId, project.id, specialist, 'command', result.usage, 'ok');
    let versionId = null;
    let revision = project.revision;
    if (result.changes.length) {
      const saved = saveRevision(project, userId, result.doc, { source: 'ai', label: `IA (${SPECIALISTS[specialist].name}): ${prompt.slice(0, 60)}`, baseRevision: project.revision });
      versionId = saved.versionId;
      revision = saved.revision;
    }
    const jobs = startForgeJobs(userId, project.id, result);
    run('INSERT INTO ai_conversations(project_id, user_id, role, specialist, content, changes, version_id) VALUES (?,?,?,?,?,?,?)',
      project.id, userId, 'assistant', specialist, result.text || '(sem resposta)', JSON.stringify({ changes: result.changes, limitations: result.limitations }), versionId);
    return { ...result, versionId, revision, forgeJobs: jobs };
  } finally {
    running.set(userId, Math.max(0, (running.get(userId) || 1) - 1));
  }
}

/** Cria na NEXPLAY FORGE os assets encomendados pela IA (após salvar a revisão com os marcadores). */
export function startForgeJobs(userId, projectId, result) {
  const jobs = [];
  for (const req of result.forgeRequests || []) {
    try {
      const project = one('SELECT * FROM projects WHERE id=?', projectId);
      jobs.push(createJob({ userId, project, kind: req.kind, params: { ...req.params, placeholderId: req.placeholderId } }).id);
    } catch (e) {
      result.limitations.push({ task: `Produzir "${req.params.name}"`, reason: e.message });
    }
  }
  return jobs;
}

export function markRunning(userId, delta) {
  running.set(userId, Math.max(0, (running.get(userId) || 0) + delta));
}
