// Provedor de modelo da NEXPLAY AI. Produção: API da Anthropic (Claude) via SDK oficial.
// "mock" existe SOMENTE para testes automatizados e nunca é ativado sem NEXPLAY_AI_PROVIDER=mock.
import Anthropic from '@anthropic-ai/sdk';
import { config } from '../config.js';

let client = null;
function anthropic() {
  if (!client) client = new Anthropic(); // lê ANTHROPIC_API_KEY do ambiente
  return client;
}

export class AIUnavailableError extends Error {}

/**
 * Executa um turno do modelo. Retorna a mensagem final (content, stop_reason, usage).
 * Usa streaming para evitar timeouts em respostas longas.
 */
export async function createMessage({ system, messages, tools, effort, maxTokens, signal, onText }) {
  if (config.ai.provider === 'mock') return mockMessage({ messages, tools });
  if (!config.ai.enabled) throw new AIUnavailableError('A NEXPLAY AI não está configurada neste servidor (defina ANTHROPIC_API_KEY).');
  const stream = anthropic().beta.messages.stream({
    model: config.ai.model,
    max_tokens: maxTokens,
    system,
    messages,
    tools: tools.map((t) => ({ ...t, eager_input_streaming: true })),
    thinking: { type: 'adaptive' },
    output_config: { effort },
    // Se um classificador de segurança recusar no modelo principal, a API tenta um modelo de fallback.
    betas: ['server-side-fallback-2026-07-01'],
    fallbacks: 'default',
  }, { signal });
  if (onText) stream.on('text', onText);
  return stream.finalMessage();
}

export function isRetryableJsonError(err) {
  return !(err instanceof Anthropic.APIError) && err instanceof SyntaxError;
}

export { Anthropic };

// ───────── Mock determinístico (testes) ─────────
function mockMessage({ messages }) {
  const last = messages[messages.length - 1];
  const usage = { input_tokens: 100, output_tokens: 50 };
  const isToolResult = Array.isArray(last.content) && last.content.some((b) => b.type === 'tool_result');
  const turns = messages.filter((m) => m.role === 'assistant').length;
  if (!isToolResult && turns === 0) {
    const text = typeof last.content === 'string' ? last.content : last.content.map((b) => b.text || '').join(' ');
    if (/plano|plan/i.test(text) && /submit_plan/.test(JSON.stringify(messages))) {
      return { stop_reason: 'tool_use', usage, content: [{ type: 'tool_use', id: 'mock_plan', name: 'submit_plan', input: { summary: 'Plano de teste', steps: [
        { title: 'Montar cenário', specialist: 'artist3d', instructions: 'Adicione um bloco de teste.', important: false },
        { title: 'Verificar', specialist: 'tester', instructions: 'Valide o projeto.', important: false },
      ] } }] };
    }
    if (/voxel/i.test(text)) {
      return { stop_reason: 'tool_use', usage, content: [{ type: 'tool_use', id: 'mock_vox', name: 'create_voxel_model', input: { name: 'Casa voxel', position: [2, 0, 2],
        spec: { size: [8, 8, 8], palette: { w: '#c8a165', r: '#a33' }, shapes: [{ type: 'box', from: [0, 0, 0], to: [7, 4, 7], color: 'w', hollow: true }, { type: 'pyramid', center: [3.5, 5, 3.5], radius: 4, height: 3, color: 'r' }] } } }] };
    }
    return { stop_reason: 'tool_use', usage, content: [
      { type: 'text', text: 'Vou adicionar o objeto pedido.' },
      { type: 'tool_use', id: 'mock_1', name: 'add_entities', input: { entities: [{ type: 'primitive', name: 'Bloco IA', position: [0, 1, 0], props: { shape: 'box', size: [1, 1, 1] } }] } },
    ] };
  }
  if (isToolResult && turns === 1) {
    return { stop_reason: 'tool_use', usage, content: [{ type: 'tool_use', id: 'mock_2', name: 'validate_project', input: {} }] };
  }
  return { stop_reason: 'end_turn', usage, content: [{ type: 'text', text: 'Pronto: adicionei "Bloco IA" e validei o projeto.' }] };
}
