// Ferramentas que a NEXPLAY AI usa para trabalhar no projeto. Cada chamada vira operações
// do modelo de projeto (applyOps), validadas antes de aplicar.
import { z } from 'zod';
import { applyOps, summarizeProject, validateProject, checkScriptSyntax, ENTITY_TYPES } from './project.js';

const vec3 = z.array(z.number().finite()).length(3);
const entityInput = z.object({
  type: z.enum(ENTITY_TYPES),
  name: z.string().max(80),
  id: z.string().regex(/^[a-zA-Z0-9_-]{1,60}$/).optional(),
  parent: z.string().max(60).nullable().optional(),
  position: vec3.optional(),
  rotation: vec3.optional(),
  scale: vec3.optional(),
  props: z.record(z.string(), z.any()).optional(),
  components: z.record(z.string(), z.any()).optional(),
  tags: z.array(z.string().max(30)).max(20).optional(),
});

const FORBIDDEN_SCRIPT = /\b(fetch|XMLHttpRequest|WebSocket|eval|Function\s*\(|import\s*\(|importScripts|document\.cookie|localStorage|sessionStorage|indexedDB|top\.|parent\.|window\.open)\b/;

export const TOOL_DEFS = {
  get_project_overview: {
    description: 'Retorna um resumo do projeto: metadados, configurações, jogador, lista de entidades (id, nome, tipo, posição), materiais, scripts, missões, diálogos e sistemas.',
    input_schema: { type: 'object', properties: {}, additionalProperties: false },
  },
  get_entities: {
    description: 'Retorna os dados completos (props, components, transform) de entidades por id/nome ou por tipo.',
    input_schema: { type: 'object', properties: { ids: { type: 'array', items: { type: 'string' } }, type: { type: 'string' } }, additionalProperties: false },
  },
  read_script: {
    description: 'Lê o código-fonte de um script do projeto.',
    input_schema: { type: 'object', properties: { name: { type: 'string' } }, required: ['name'], additionalProperties: false },
  },
  add_entities: {
    description: 'Adiciona uma ou mais entidades à cena (até 200 por chamada). Use props/components conforme o catálogo.',
    input_schema: { type: 'object', properties: { entities: { type: 'array', items: { type: 'object', properties: {
      type: { type: 'string', enum: ENTITY_TYPES }, name: { type: 'string' }, id: { type: 'string' }, parent: { type: 'string' },
      position: { type: 'array', items: { type: 'number' } }, rotation: { type: 'array', items: { type: 'number' } }, scale: { type: 'array', items: { type: 'number' } },
      props: { type: 'object' }, components: { type: 'object' }, tags: { type: 'array', items: { type: 'string' } },
    }, required: ['type', 'name'] } } }, required: ['entities'], additionalProperties: false },
  },
  update_entities: {
    description: 'Altera entidades existentes com mesclagem profunda. patch pode conter name, visible, transform {position, rotation, scale}, props, components, tags.',
    input_schema: { type: 'object', properties: { updates: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, patch: { type: 'object' } }, required: ['id', 'patch'] } } }, required: ['updates'], additionalProperties: false },
  },
  remove_entities: {
    description: 'Remove entidades (e seus filhos). Informe o motivo. Alteração destrutiva.',
    input_schema: { type: 'object', properties: { ids: { type: 'array', items: { type: 'string' } }, reason: { type: 'string' } }, required: ['ids', 'reason'], additionalProperties: false },
  },
  set_environment: {
    description: 'Mescla configurações de ambiente: céu, hora do dia, ciclo dia/noite, neblina, chuva, neve, vento, raios, exposição.',
    input_schema: { type: 'object', properties: { patch: { type: 'object' } }, required: ['patch'], additionalProperties: false },
  },
  set_rendering: {
    description: 'Mescla configurações de renderização: qualidade, sombras, bloom, SSAO, antialiasing.',
    input_schema: { type: 'object', properties: { patch: { type: 'object' } }, required: ['patch'], additionalProperties: false },
  },
  set_material: {
    description: 'Cria ou altera um material PBR do projeto (id curto, ex.: "madeira_velha").',
    input_schema: { type: 'object', properties: { id: { type: 'string' }, material: { type: 'object' } }, required: ['id', 'material'], additionalProperties: false },
  },
  write_script: {
    description: 'Cria ou substitui um script (código completo). attachedTo opcional liga o script a uma entidade (api.self).',
    input_schema: { type: 'object', properties: { name: { type: 'string' }, source: { type: 'string' }, attachedTo: { type: 'string' }, description: { type: 'string' } }, required: ['name', 'source'], additionalProperties: false },
  },
  delete_script: {
    description: 'Remove um script. Alteração destrutiva.',
    input_schema: { type: 'object', properties: { name: { type: 'string' } }, required: ['name'], additionalProperties: false },
  },
  set_player: {
    description: 'Configura o jogador: entityId, controller, speed, sprintMultiplier, jumpForce, cameraDistance, health.',
    input_schema: { type: 'object', properties: { patch: { type: 'object' } }, required: ['patch'], additionalProperties: false },
  },
  upsert_mission: {
    description: 'Cria/atualiza missão: {id, title, description, objectives:[{id,type,target,count,description}], reward:{score}, next}.',
    input_schema: { type: 'object', properties: { mission: { type: 'object' } }, required: ['mission'], additionalProperties: false },
  },
  remove_mission: {
    description: 'Remove uma missão pelo id.',
    input_schema: { type: 'object', properties: { id: { type: 'string' } }, required: ['id'], additionalProperties: false },
  },
  upsert_dialogue: {
    description: 'Cria/substitui diálogo: {id, speaker, lines:[{id, text, choices:[{text, next, startMission}]}]}.',
    input_schema: { type: 'object', properties: { dialogue: { type: 'object' } }, required: ['dialogue'], additionalProperties: false },
  },
  set_system: {
    description: 'Define dados de um sistema de jogo (ex.: career, league, transfers, inventory, shop). config=null remove. Combine com scripts que leem api.project.systems.',
    input_schema: { type: 'object', properties: { name: { type: 'string' }, config: {} }, required: ['name', 'config'], additionalProperties: false },
  },
  set_ui: {
    description: 'Mescla interface: hud {showHealth, showScore, showTimer, showMinimap, showObjective}, title, menus [{id, title, items:[{label, action:"start"|"resume"|"menu:<id>"|"event:<nome>"}]}].',
    input_schema: { type: 'object', properties: { patch: { type: 'object' } }, required: ['patch'], additionalProperties: false },
  },
  validate_project: {
    description: 'Executa as verificações automáticas (IA Testadora): referências, sintaxe de scripts, valores inválidos e orçamento de desempenho.',
    input_schema: { type: 'object', properties: {}, additionalProperties: false },
  },
  report_limitation: {
    description: 'Registra, com honestidade, algo do pedido que não foi possível fazer e por quê.',
    input_schema: { type: 'object', properties: { task: { type: 'string' }, reason: { type: 'string' }, workaround: { type: 'string' } }, required: ['task', 'reason'], additionalProperties: false },
  },
};

export function toolsFor(names) {
  return names.map((name) => ({ name, description: TOOL_DEFS[name].description, input_schema: TOOL_DEFS[name].input_schema }));
}

/**
 * Executa uma ferramenta sobre o estado de trabalho { doc, changes, limitations }.
 * Retorna string (conteúdo do tool_result). Lança Error para erro de ferramenta.
 */
export function executeTool(state, name, input) {
  const apply = (ops) => {
    const r = applyOps(state.doc, ops);
    state.doc = r.doc;
    state.changes.push(...r.changes);
    return r.changes.map((c) => c.label).join('\n') || 'ok';
  };
  switch (name) {
    case 'get_project_overview':
      return JSON.stringify(summarizeProject(state.doc));
    case 'get_entities': {
      const i = z.object({ ids: z.array(z.string()).optional(), type: z.string().optional() }).parse(input);
      let list = state.doc.entities;
      if (i.ids?.length) list = list.filter((e) => i.ids.includes(e.id) || i.ids.includes(e.name));
      if (i.type) list = list.filter((e) => e.type === i.type);
      return JSON.stringify(list.slice(0, 100));
    }
    case 'read_script': {
      const s = state.doc.scripts[z.object({ name: z.string() }).parse(input).name];
      if (!s) throw new Error('Script não encontrado.');
      return JSON.stringify(s);
    }
    case 'add_entities': {
      const i = z.object({ entities: z.array(entityInput).min(1).max(200) }).parse(input);
      return apply(i.entities.map((e) => ({ op: 'add_entity', entity: {
        ...e, transform: { position: e.position || [0, 0, 0], rotation: e.rotation || [0, 0, 0], scale: e.scale || [1, 1, 1] },
      } }))) + `\nIDs: ${state.doc.entities.slice(-i.entities.length).map((e) => `${e.name}=${e.id}`).join(', ')}`;
    }
    case 'update_entities': {
      const i = z.object({ updates: z.array(z.object({ id: z.string(), patch: z.record(z.string(), z.any()) })).min(1).max(200) }).parse(input);
      return apply(i.updates.map((u) => ({ op: 'update_entity', id: u.id, patch: u.patch })));
    }
    case 'remove_entities': {
      const i = z.object({ ids: z.array(z.string()).min(1).max(200), reason: z.string() }).parse(input);
      return apply(i.ids.map((idv) => ({ op: 'remove_entity', id: idv })));
    }
    case 'set_environment':
      return apply([{ op: 'set_settings', patch: { environment: z.object({ patch: z.record(z.string(), z.any()) }).parse(input).patch } }]);
    case 'set_rendering':
      return apply([{ op: 'set_settings', patch: { rendering: z.object({ patch: z.record(z.string(), z.any()) }).parse(input).patch } }]);
    case 'set_material': {
      const i = z.object({ id: z.string(), material: z.record(z.string(), z.any()) }).parse(input);
      return apply([{ op: 'set_material', id: i.id, material: i.material }]);
    }
    case 'write_script': {
      const i = z.object({ name: z.string(), source: z.string().max(200_000), attachedTo: z.string().optional(), description: z.string().optional() }).parse(input);
      if (FORBIDDEN_SCRIPT.test(i.source)) throw new Error('O script usa APIs bloqueadas pelo sandbox (rede, eval, storage ou acesso à página). Reescreva usando apenas a API do runtime.');
      const err = checkScriptSyntax(i.source);
      if (err) throw new Error(`Erro de sintaxe: ${err}`);
      let attached = i.attachedTo ?? null;
      if (attached) {
        const e = state.doc.entities.find((x) => x.id === attached || x.name === attached);
        if (!e) throw new Error(`Entidade não encontrada para attachedTo: ${attached}`);
        attached = e.id;
      }
      return apply([{ op: 'write_script', name: i.name, source: i.source, attachedTo: attached, description: i.description }]);
    }
    case 'delete_script':
      return apply([{ op: 'delete_script', name: z.object({ name: z.string() }).parse(input).name }]);
    case 'set_player':
      return apply([{ op: 'set_player', patch: z.object({ patch: z.record(z.string(), z.any()) }).parse(input).patch }]);
    case 'upsert_mission':
      return apply([{ op: 'upsert_mission', mission: z.object({ mission: z.record(z.string(), z.any()) }).parse(input).mission }]);
    case 'remove_mission':
      return apply([{ op: 'remove_mission', id: z.object({ id: z.string() }).parse(input).id }]);
    case 'upsert_dialogue':
      return apply([{ op: 'upsert_dialogue', dialogue: z.object({ dialogue: z.record(z.string(), z.any()) }).parse(input).dialogue }]);
    case 'set_system': {
      const i = z.object({ name: z.string(), config: z.any() }).parse(input);
      if (JSON.stringify(i.config ?? null).length > 500_000) throw new Error('Configuração grande demais (máx. 500 KB).');
      return apply([{ op: 'set_system', name: i.name, config: i.config ?? null }]);
    }
    case 'set_ui':
      return apply([{ op: 'set_ui', patch: z.object({ patch: z.record(z.string(), z.any()) }).parse(input).patch }]);
    case 'validate_project': {
      const rep = validateProject(state.doc);
      state.lastValidation = rep;
      return JSON.stringify(rep);
    }
    case 'report_limitation': {
      const i = z.object({ task: z.string(), reason: z.string(), workaround: z.string().optional() }).parse(input);
      state.limitations.push(i);
      return 'Registrado. Informe isso ao usuário no resumo final.';
    }
    default:
      throw new Error(`Ferramenta desconhecida: ${name}`);
  }
}

export { FORBIDDEN_SCRIPT };
