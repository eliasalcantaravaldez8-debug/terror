// NEXPLAY AI AUTOPILOT — desenvolvimento automático em etapas, com aprovação, testes e histórico.
// Fluxo: planejamento → aprovação do plano → etapas (cada uma vira uma revisão desfazível) →
// teste após cada etapa → correção automática → pausa para aprovar alterações destrutivas.
import { one, run } from '../db/index.js';
import { HttpError } from '../lib/security.js';
import { SPECIALISTS, aiTier } from './specialists.js';
import { createMessage } from './provider.js';
import { runSpecialist, assertQuota, markRunning, startForgeJobs } from './agent.js';
import { getJob } from '../pipeline/index.js';
import { summarizeProject, validateProject } from './project.js';
import { entitlements } from '../lib/services.js';

const controllers = new Map(); // runId → AbortController

const PLAN_TOOL = {
  name: 'submit_plan',
  description: 'Envia o plano de desenvolvimento em etapas.',
  input_schema: {
    type: 'object',
    properties: {
      summary: { type: 'string', description: 'Resumo do que será construído.' },
      steps: {
        type: 'array', minItems: 1, maxItems: 14,
        items: { type: 'object', properties: {
          title: { type: 'string' },
          specialist: { type: 'string', enum: Object.keys(SPECIALISTS) },
          instructions: { type: 'string', description: 'Instruções detalhadas e autocontidas para a especialidade.' },
          important: { type: 'boolean', description: 'true se a etapa altera/remove partes existentes de forma significativa.' },
        }, required: ['title', 'specialist', 'instructions', 'important'] },
      },
      limitations: { type: 'array', items: { type: 'string' }, description: 'Partes do pedido que o motor não consegue atender totalmente.' },
    },
    required: ['summary', 'steps'],
  },
};

const PLANNER_PROMPT = `Você é o planejador do NEXPLAY AI AUTOPILOT. Divida o pedido do usuário em etapas executáveis por especialistas
(${Object.entries(SPECIALISTS).map(([k, v]) => `${k}: ${v.description}`).join(' | ')}).
Ordem típica: direção de arte e assets (artdirector: define o estilo e produz modelos 3D/voxel/sprites) → estrutura/cenário (artist3d) → materiais (texture) → personagens e animação (animation) → mecânicas e sistemas (gameplay/programmer) → menus/UI (programmer) → testes (tester).
Cada etapa deve ser autocontida e concreta (o que criar, onde, com que parâmetros). Preserve o que já existe no projeto.
Seja honesto em "limitations" sobre o que não é possível (ex.: modelos fotorrealistas específicos sem assets importados, licenças de clubes/jogadores reais).
Responda chamando a ferramenta submit_plan. Escreva em português do Brasil.`;

function log(runId, entry) {
  const r = one('SELECT log FROM autopilot_runs WHERE id=?', runId);
  const list = JSON.parse(r.log);
  list.push({ at: new Date().toISOString(), ...entry });
  run('UPDATE autopilot_runs SET log=?, updated_at=? WHERE id=?', JSON.stringify(list.slice(-400)), new Date().toISOString(), runId);
}

const setStatus = (runId, status, extra = {}) => {
  const sets = ['status=?', 'updated_at=?'];
  const vals = [status, new Date().toISOString()];
  for (const [k, v] of Object.entries(extra)) { sets.push(`${k}=?`); vals.push(typeof v === 'string' || typeof v === 'number' || v === null ? v : JSON.stringify(v)); }
  run(`UPDATE autopilot_runs SET ${sets.join(', ')} WHERE id=?`, ...vals, runId);
};

export function getRun(runId, userId) {
  const r = one('SELECT * FROM autopilot_runs WHERE id=? AND user_id=?', runId, userId);
  if (!r) throw new HttpError(404, 'Execução não encontrada.');
  return { id: r.id, projectId: r.project_id, request: r.request, status: r.status, plan: JSON.parse(r.plan), log: JSON.parse(r.log), currentStep: r.current_step, baseVersionId: r.base_version_id, createdAt: r.created_at, updatedAt: r.updated_at };
}

/** Inicia o planejamento (assíncrono). */
export function startAutopilot({ user, project, request, saveRevision }) {
  if (!entitlements(user.id).features.includes('autopilot')) throw new HttpError(402, 'O AUTOPILOT é exclusivo do plano DELUXE.', 'plan_required');
  if (one(`SELECT 1 FROM autopilot_runs WHERE user_id=? AND status IN ('planning','running')`, user.id)) throw new HttpError(429, 'Você já tem um Autopilot em execução.', 'ai_busy');
  assertQuota(user.id);
  const base = saveRevision(project, user.id, JSON.parse(project.data), { source: 'manual', label: 'Antes do Autopilot' });
  const runId = run('INSERT INTO autopilot_runs(project_id, user_id, request, status, base_version_id) VALUES (?,?,?,?,?)', project.id, user.id, request, 'planning', base.versionId).lastInsertRowid;
  log(runId, { kind: 'info', message: 'Entendendo o pedido e montando o plano…' });
  const ac = new AbortController();
  controllers.set(runId, ac);
  markRunning(user.id, 1);
  (async () => {
    try {
      const doc = JSON.parse(one('SELECT data FROM projects WHERE id=?', project.id).data);
      const tier = aiTier(entitlements(user.id).code);
      const msg = await createMessage({
        system: PLANNER_PROMPT, tools: [PLAN_TOOL], effort: tier.effort, maxTokens: 16000, signal: ac.signal,
        messages: [{ role: 'user', content: `Projeto atual (resumo):\n${JSON.stringify(summarizeProject(doc)).slice(0, 60_000)}\n\nPedido (faça um plano e chame submit_plan):\n${request}` }],
      });
      run('INSERT INTO ai_usage(user_id, project_id, specialist, kind, input_tokens, output_tokens) VALUES (?,?,?,?,?,?)', user.id, project.id, 'planner', 'autopilot_step', msg.usage?.input_tokens || 0, msg.usage?.output_tokens || 0);
      const call = msg.content.find((b) => b.type === 'tool_use' && b.name === 'submit_plan');
      if (!call || !Array.isArray(call.input?.steps) || !call.input.steps.length) {
        const text = msg.content.filter((b) => b.type === 'text').map((b) => b.text).join(' ');
        throw new Error(msg.stop_reason === 'refusal' ? 'A IA recusou este pedido.' : `Não foi possível gerar um plano. ${text.slice(0, 300)}`);
      }
      const steps = call.input.steps.filter((s) => SPECIALISTS[s.specialist]).map((s, i) => ({ ...s, index: i, status: 'pending' }));
      setStatus(runId, 'awaiting_approval', { plan: { summary: call.input.summary, steps, limitations: call.input.limitations || [] } });
      log(runId, { kind: 'plan', message: `Plano com ${steps.length} etapas pronto. Revise e aprove para começar.` });
    } catch (e) {
      setStatus(runId, ac.signal.aborted ? 'canceled' : 'failed');
      log(runId, { kind: 'error', message: e.message });
    } finally {
      controllers.delete(runId);
      markRunning(user.id, -1);
    }
  })();
  return runId;
}

/** Aprova o plano (ou alteração pendente) e continua a execução. */
export function approveAutopilot({ user, runId, decision = 'approve', saveRevision }) {
  const r = one('SELECT * FROM autopilot_runs WHERE id=? AND user_id=?', runId, user.id);
  if (!r) throw new HttpError(404, 'Execução não encontrada.');
  if (r.status !== 'awaiting_approval' && r.status !== 'paused') throw new HttpError(400, 'Nada aguardando aprovação.');
  const plan = JSON.parse(r.plan);
  const project = one('SELECT * FROM projects WHERE id=?', r.project_id);
  const pendingStep = plan.steps.find((s) => s.status === 'needs_approval');
  if (pendingStep) {
    if (decision === 'approve') {
      saveRevision(project, user.id, pendingStep.pendingDoc, { source: 'autopilot', label: `Autopilot: ${pendingStep.title}` });
      pendingStep.status = 'done';
      log(runId, { kind: 'step', step: pendingStep.index, message: `Alterações aprovadas: ${pendingStep.title}` });
    } else {
      pendingStep.status = 'skipped';
      log(runId, { kind: 'step', step: pendingStep.index, message: `Alterações descartadas: ${pendingStep.title}` });
    }
    delete pendingStep.pendingDoc;
  } else if (decision !== 'approve') {
    setStatus(runId, 'canceled', { plan });
    log(runId, { kind: 'info', message: 'Plano recusado.' });
    return;
  }
  setStatus(runId, 'running', { plan });
  executeSteps({ user, runId, saveRevision });
}

export function cancelAutopilot(user, runId) {
  const r = one('SELECT * FROM autopilot_runs WHERE id=? AND user_id=?', runId, user.id);
  if (!r) throw new HttpError(404, 'Execução não encontrada.');
  controllers.get(runId)?.abort();
  if (!['completed', 'failed', 'canceled'].includes(r.status)) {
    setStatus(runId, 'canceled');
    log(runId, { kind: 'info', message: 'Autopilot cancelado pelo usuário. Etapas concluídas permanecem no histórico de versões.' });
  }
}

function executeSteps({ user, runId, saveRevision }) {
  const ac = new AbortController();
  controllers.set(runId, ac);
  markRunning(user.id, 1);
  (async () => {
    try {
      for (;;) {
        const r = one('SELECT * FROM autopilot_runs WHERE id=?', runId);
        if (r.status !== 'running') return;
        const plan = JSON.parse(r.plan);
        const step = plan.steps.find((s) => s.status === 'pending');
        if (!step) {
          const project = one('SELECT * FROM projects WHERE id=?', r.project_id);
          const final = validateProject(JSON.parse(project.data));
          setStatus(runId, 'completed');
          log(runId, { kind: 'done', message: `Autopilot concluído. ${final.errors.length ? `${final.errors.length} erro(s) restantes` : 'Sem erros na validação'}; ${final.warnings.length} aviso(s). Teste o resultado na pré-visualização.`, validation: final });
          return;
        }
        step.status = 'running';
        setStatus(runId, 'running', { plan, current_step: step.index });
        log(runId, { kind: 'step', step: step.index, message: `Etapa ${step.index + 1}/${plan.steps.length}: ${step.title} (${SPECIALISTS[step.specialist].name})` });
        const project = one('SELECT * FROM projects WHERE id=?', r.project_id);
        const context = `Pedido geral do usuário: ${r.request}\nPlano: ${plan.summary}\nEtapa atual (${step.index + 1}/${plan.steps.length}): ${step.title}\n\n${step.instructions}`;
        let result = await runSpecialist({ userId: user.id, doc: JSON.parse(project.data), specialist: step.specialist, prompt: context, signal: ac.signal,
          onEvent: (ev) => { if (ev.type === 'tool') log(runId, { kind: 'tool', step: step.index, message: `${SPECIALISTS[ev.specialist].name} → ${ev.tool}` }); } });
        run('INSERT INTO ai_usage(user_id, project_id, specialist, kind, input_tokens, output_tokens) VALUES (?,?,?,?,?,?)', user.id, project.id, step.specialist, 'autopilot_step', result.usage.input, result.usage.output);
        // IA Testadora: valida e tenta corrigir os erros desta etapa.
        const check = validateProject(result.doc);
        if (check.errors.length && step.specialist !== 'tester') {
          log(runId, { kind: 'test', step: step.index, message: `Testes encontraram ${check.errors.length} erro(s). IA Testadora corrigindo…` });
          const fix = await runSpecialist({ userId: user.id, doc: result.doc, specialist: 'tester', signal: ac.signal,
            prompt: `Corrija estes erros causados pela etapa "${step.title}" sem desfazer o trabalho dela:\n- ${check.errors.join('\n- ')}` });
          run('INSERT INTO ai_usage(user_id, project_id, specialist, kind, input_tokens, output_tokens) VALUES (?,?,?,?,?,?)', user.id, project.id, 'tester', 'autopilot_step', fix.usage.input, fix.usage.output);
          result = { ...result, doc: fix.doc, changes: [...result.changes, ...fix.changes], limitations: [...result.limitations, ...fix.limitations] };
        }
        const after = validateProject(result.doc);
        step.result = { text: result.text, changes: result.changes.map((c) => c.label).slice(0, 60), limitations: result.limitations, errors: after.errors, warnings: after.warnings.slice(0, 10) };
        const destructive = result.changes.some((c) => c.destructive);
        if (destructive && !step.important) {
          // Alteração destrutiva não prevista no plano: pausa para o usuário decidir.
          step.status = 'needs_approval';
          step.pendingDoc = result.doc;
          setStatus(runId, 'paused', { plan });
          log(runId, { kind: 'approval', step: step.index, message: `A etapa "${step.title}" quer remover ou substituir partes existentes. Aprove ou descarte para continuar.` });
          return;
        }
        if (result.changes.length) {
          try {
            saveRevision(project, user.id, result.doc, { source: 'autopilot', label: `Autopilot: ${step.title}`, baseRevision: project.revision });
          } catch (e) {
            if (e.code === 'revision_conflict') {
              setStatus(runId, 'failed', { plan });
              log(runId, { kind: 'error', message: 'O projeto foi editado durante o Autopilot. Execução interrompida para não sobrescrever seu trabalho.' });
              return;
            }
            throw e;
          }
        }
        // Assets encomendados à NEXPLAY FORGE nesta etapa: espera ficarem prontos antes da próxima etapa.
        const jobIds = result.changes.length ? startForgeJobs(user.id, project.id, result) : [];
        if (jobIds.length) {
          log(runId, { kind: 'forge', step: step.index, message: `NEXPLAY FORGE produzindo ${jobIds.length} asset(s)…` });
          const until = Date.now() + 25 * 60_000;
          let pending = jobIds;
          while (pending.length && Date.now() < until && !ac.signal.aborted) {
            await new Promise((r) => setTimeout(r, 5000));
            const states = pending.map((jid) => getJob(jid));
            for (const jb of states.filter((x) => ['done', 'failed', 'canceled'].includes(x.status))) {
              log(runId, { kind: jb.status === 'done' ? 'forge_done' : 'error', step: step.index, message: jb.status === 'done' ? `Asset pronto e integrado: ${jb.prompt.slice(0, 60)}` : `Asset não produzido (${jb.prompt.slice(0, 40)}): ${jb.error}` });
            }
            pending = states.filter((x) => !['done', 'failed', 'canceled'].includes(x.status)).map((x) => x.id);
          }
          if (pending.length) log(runId, { kind: 'forge', step: step.index, message: `${pending.length} asset(s) ainda em produção; continuarão em segundo plano.` });
        }
        step.status = 'done';
        setStatus(runId, 'running', { plan });
        log(runId, { kind: 'step_done', step: step.index, message: `Concluída: ${step.title} — ${result.changes.length} alteração(ões).${result.limitations.length ? ` Limitações: ${result.limitations.map((l) => l.task).join('; ')}` : ''}` });
      }
    } catch (e) {
      const aborted = ac.signal.aborted;
      const r = one('SELECT plan FROM autopilot_runs WHERE id=?', runId);
      const plan = JSON.parse(r.plan);
      for (const s of plan.steps) if (s.status === 'running') s.status = aborted ? 'canceled' : 'failed';
      setStatus(runId, aborted ? 'canceled' : 'failed', { plan });
      log(runId, { kind: 'error', message: aborted ? 'Cancelado.' : `Falha: ${e.message}. As etapas concluídas continuam salvas no histórico.` });
    } finally {
      controllers.delete(runId);
      markRunning(user.id, -1);
    }
  })();
}

/** Ao reiniciar o servidor, execuções em andamento não podem continuar em memória. */
export function recoverAutopilotRuns() {
  run(`UPDATE autopilot_runs SET status='failed', log=json_insert(log, '$[#]', json_object('at', ?, 'kind', 'error', 'message', 'Servidor reiniciado durante a execução. Etapas concluídas foram preservadas.'))
    WHERE status IN ('planning','running')`, new Date().toISOString());
}
