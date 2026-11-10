// NEXPLAY STUDIO — modelo de documento de projeto (compartilhado por editor, IA, servidor e runtime).
// Formato JSON versionado. Toda alteração (editor, IA, Autopilot) passa por applyOps(), o que
// permite validar, desfazer e registrar histórico de forma uniforme.

export const PROJECT_FORMAT = 'nexplay-project';
export const PROJECT_VERSION = 1;

export const ENTITY_TYPES = [
  'primitive', 'model', 'terrain', 'water', 'light', 'character', 'npc', 'vegetation', 'structure',
  'particles', 'spawn', 'trigger', 'pickup', 'vehicle', 'ball', 'audio_source', 'sprite', 'tilemap', 'platform2d',
];
export const PRIMITIVE_SHAPES = ['box', 'sphere', 'cylinder', 'capsule', 'cone', 'plane', 'torus'];
export const MATERIAL_PRESETS = ['grass', 'dirt', 'sand', 'rock', 'stone', 'concrete', 'asphalt', 'brick', 'wood', 'bark',
  'planks', 'metal', 'rusty_metal', 'gold', 'plastic', 'rubber', 'fabric', 'leather', 'glass', 'marble', 'snow', 'ice',
  'water', 'lava', 'skin', 'pitch', 'custom'];
export const STRUCTURE_KINDS = ['cabin', 'house', 'tower', 'wall', 'fence', 'bridge', 'stadium', 'goal', 'ramp', 'crate',
  'barrel', 'lamp_post', 'bench', 'campfire', 'tent', 'ruins', 'checkpoint', 'road', 'grandstand'];
export const VEGETATION_KINDS = ['grass', 'trees', 'pines', 'bushes', 'flowers', 'rocks', 'dead_trees', 'mushrooms'];
export const ANIMATION_CLIPS = ['idle', 'walk', 'run', 'sprint', 'jump', 'fall', 'crouch', 'kick', 'pass', 'dribble',
  'celebrate', 'wave', 'attack', 'hit', 'die', 'talk', 'sit', 'drive', 'swim', 'climb', 'goalkeeper_dive'];
export const NPC_BEHAVIORS = ['idle', 'wander', 'patrol', 'follow_player', 'chase_player', 'flee_player', 'guard', 'soccer_player', 'goalkeeper', 'crowd'];
export const CONTROLLERS = ['third_person', 'first_person', 'vehicle', 'soccer', 'platformer2d', 'topdown2d', 'none'];
export const OBJECTIVE_TYPES = ['reach', 'collect', 'talk', 'defeat', 'survive', 'score', 'interact', 'custom'];
export const ART_STYLE_IDS = ['realistic', 'stylized', 'lowpoly', 'voxel', 'pixel', 'illustrated'];
const STYLE_COMPAT = { stylized: ['lowpoly'], lowpoly: ['stylized', 'voxel'], voxel: ['lowpoly'], pixel: [], illustrated: ['pixel'], realistic: [] };
/** Conflito de identidade visual entre o estilo do projeto e o de um asset (null = compatível). */
export function styleConflict(projectStyle, assetStyle) {
  if (!projectStyle || !assetStyle || projectStyle === assetStyle) return null;
  if ((STYLE_COMPAT[projectStyle] || []).includes(assetStyle)) return null;
  return `estilo "${assetStyle}" em projeto "${projectStyle}"`;
}

export const GENRE_TEMPLATES = ['futebol', 'acao', 'terror', 'sobrevivencia', 'corrida', 'plataforma', 'mundo_aberto', 'aventura', 'vazio'];

let counter = 0;
export function newId(prefix = 'e') {
  counter = (counter + 1) % 1e6;
  return `${prefix}_${Date.now().toString(36)}${counter.toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

const T = (position = [0, 0, 0], rotation = [0, 0, 0], scale = [1, 1, 1]) => ({ position, rotation, scale });

export function entity(type, name, props = {}, transform = T(), components = {}) {
  return { id: newId(type.slice(0, 3)), name, type, parent: null, visible: true, tags: [], transform, props, components };
}

export function defaultSettings(dimension) {
  return {
    environment: {
      sky: { type: 'procedural', turbidity: 2.5, rayleigh: 1.1, mieCoefficient: 0.004, mieDirectionalG: 0.8 },
      timeOfDay: 14,
      dayNightCycle: { enabled: false, minutesPerDay: 20 },
      fog: { enabled: true, color: '#b7cde0', density: 0.0022 },
      weather: { rain: { enabled: false, intensity: 0.6 }, snow: { enabled: false, intensity: 0.5 }, wind: 0.3, lightning: false },
      ambientIntensity: 0.35,
      exposure: 0.9,
    },
    rendering: {
      quality: 'high',
      shadows: { enabled: true, mapSize: 2048, softness: 2 },
      bloom: { enabled: true, strength: 0.3, threshold: 1.6, radius: 0.45 },
      ssao: { enabled: false },
      antialias: true,
      toneMapping: 'aces',
    },
    physics: { gravity: -9.81 },
    world2d: dimension === '2d' ? { width: 3200, height: 720, tileSize: 32, gravity: 1800, background: ['#1e1b4b', '#0e7490'], parallax: true } : undefined,
  };
}

function baseDoc(name, dimension, genre) {
  return {
    format: PROJECT_FORMAT,
    version: PROJECT_VERSION,
    meta: { name, genre, dimension, description: '' },
    settings: defaultSettings(dimension),
    player: { entityId: null, controller: dimension === '2d' ? 'platformer2d' : 'third_person', speed: dimension === '2d' ? 260 : 5, sprintMultiplier: 1.7, jumpForce: dimension === '2d' ? 640 : 6, cameraDistance: 6, health: 100 },
    entities: [],
    materials: {},
    scripts: {},
    missions: [],
    dialogues: [],
    ui: { hud: { showHealth: true, showScore: false, showTimer: false, showMinimap: false, showObjective: true }, menus: [], title: name },
    systems: {},
    assets: [],
    audio: { ambient: null, music: null },
  };
}

const mat = (preset, extra = {}) => ({ type: 'pbr', preset, color: null, roughness: null, metalness: null, textureScale: 1, normalStrength: 1, emissive: null, emissiveIntensity: 0, opacity: 1, map: null, ...extra });

/** Cria um projeto a partir de um modelo de gênero. Os modelos são pontos de partida editáveis, não jogos prontos. */
export function createProject({ name, dimension = '3d', template = 'vazio' }) {
  const doc = baseDoc(name, dimension, template);
  const add = (e) => { doc.entities.push(e); return e; };
  doc.materials.ground = mat('grass', { textureScale: 40 });

  if (dimension === '2d') {
    doc.settings.environment.fog.enabled = false;
    const player = add(entity('sprite', 'Jogador', { shape: 'hero', color: '#22d3ee', width: 32, height: 48 }, T([96, 560, 0]), { physics: { body: 'dynamic' }, health: { max: 3 } }));
    doc.player.entityId = player.id;
    add(entity('tilemap', 'Mapa', { tileSize: 32, palette: { 1: { color: '#4c1d95', solid: true, kind: 'ground' }, 2: { color: '#7c3aed', solid: true, kind: 'brick' }, 3: { color: '#f59e0b', solid: false, kind: 'coin' }, 4: { color: '#ef4444', solid: false, kind: 'hazard' }, 5: { color: '#22c55e', solid: false, kind: 'goal' } }, rows: defaultTilemap(template) }, T([0, 0, 0])));
    if (template === 'plataforma' || template === 'aventura') {
      doc.missions.push({ id: 'm_main', title: 'Chegue à bandeira', description: 'Atravesse a fase e toque a bandeira verde.', objectives: [{ id: 'o1', type: 'reach', target: 'goal', count: 1, description: 'Alcance a bandeira' }], reward: { score: 100 }, next: null });
      doc.ui.hud.showScore = true;
    }
    return doc;
  }

  const sun = add(entity('light', 'Sol', { kind: 'directional', color: '#fff4e0', intensity: 2.2, castShadow: true }, T([40, 80, 30])));
  add(entity('light', 'Céu (ambiente)', { kind: 'hemisphere', color: '#bcd7ff', groundColor: '#3b2f22', intensity: 0.6 }, T([0, 50, 0])));
  void sun;

  const terrain = (size = 400, heightScale = 6, preset = 'grass') => {
    doc.materials.ground.preset = preset;
    return add(entity('terrain', 'Terreno', { size, resolution: 256, heightScale, seed: 1337, noiseScale: 0.012, octaves: 5, flattenCenter: 40, material: 'ground' }, T(), { physics: { body: 'static' } }));
  };
  const hero = (pos = [0, 1, 0], colors = {}) => {
    const p = add(entity('character', 'Jogador', { height: 1.8, build: 'athletic', skinColor: '#c58c62', shirtColor: '#7c3aed', pantsColor: '#1f2937', shoesColor: '#111827', hair: 'short', hairColor: '#1b1410', ...colors }, T(pos), { physics: { body: 'kinematic' }, animation: { clip: 'idle', loop: true, speed: 1 }, health: { max: 100 } }));
    doc.player.entityId = p.id;
    return p;
  };

  switch (template) {
    case 'futebol': {
      doc.player.controller = 'soccer';
      doc.settings.environment.timeOfDay = 21;
      doc.settings.environment.fog = { enabled: true, color: '#1b2536', density: 0.0015 };
      doc.materials.pitch = mat('pitch', { textureScale: 1 });
      add(entity('primitive', 'Gramado', { shape: 'plane', size: [68, 105], material: 'pitch', markings: 'soccer' }, T([0, 0.01, 0], [-90, 0, 0]), { physics: { body: 'static' } }));
      add(entity('structure', 'Estádio', { kind: 'stadium', length: 105, width: 68, tiers: 3, capacity: 40000, crowd: true, crowdDensity: 0.85, roof: true, floodlights: 4, homeColor: '#7c3aed', awayColor: '#06b6d4' }, T()));
      add(entity('structure', 'Gol Norte', { kind: 'goal', width: 7.32, height: 2.44 }, T([0, 0, -52.5])));
      add(entity('structure', 'Gol Sul', { kind: 'goal', width: 7.32, height: 2.44 }, T([0, 0, 52.5], [0, 180, 0])));
      add(entity('ball', 'Bola', { radius: 0.11, preset: 'classic' }, T([0, 0.5, 0]), { physics: { body: 'dynamic', mass: 0.43, restitution: 0.6, friction: 0.4 } }));
      hero([0, 0, 8], { shirtColor: '#7c3aed', pantsColor: '#ffffff' }).transform.rotation = [0, 180, 0];
      doc.systems.match = { durationMinutes: 6, teams: [{ name: 'NEXPLAY FC', color: '#7c3aed' }, { name: 'Ciano United', color: '#06b6d4' }], playersPerTeam: 5, rules: { offside: false, fouls: true } };
      for (let i = 0; i < 4; i++) add(entity('npc', `Companheiro ${i + 1}`, { height: 1.8, shirtColor: '#7c3aed', pantsColor: '#ffffff', skinColor: ['#8d5524', '#e0ac69', '#c68642', '#f1c27d'][i] }, T([(i - 1.5) * 10, 0, 18]), { ai: { behavior: 'soccer_player', team: 0, role: ['defender', 'defender', 'midfielder', 'forward'][i], speed: 6 }, animation: { clip: 'idle', loop: true, speed: 1 } }));
      for (let i = 0; i < 5; i++) add(entity('npc', `Rival ${i + 1}`, { height: 1.8, shirtColor: '#06b6d4', pantsColor: '#0f172a', skinColor: ['#e0ac69', '#8d5524', '#f1c27d', '#c68642', '#ffdbac'][i] }, T([(i - 2) * 10, 0, -18]), { ai: { behavior: i === 0 ? 'goalkeeper' : 'soccer_player', team: 1, role: i === 0 ? 'goalkeeper' : ['defender', 'defender', 'midfielder', 'forward'][i - 1], speed: 6 }, animation: { clip: 'idle', loop: true, speed: 1 } }));
      doc.ui.hud = { showHealth: false, showScore: true, showTimer: true, showMinimap: true, showObjective: false };
      break;
    }
    case 'terror': {
      doc.settings.environment.timeOfDay = 0.5;
      doc.settings.environment.fog = { enabled: true, color: '#0b0d12', density: 0.045 };
      doc.settings.environment.weather.rain = { enabled: true, intensity: 0.8 };
      doc.settings.environment.weather.lightning = true;
      doc.settings.environment.ambientIntensity = 0.08;
      doc.player.controller = 'first_person';
      terrain(300, 4, 'dirt');
      add(entity('vegetation', 'Floresta morta', { kind: 'dead_trees', count: 900, area: [280, 280], seed: 7, minScale: 0.8, maxScale: 1.6, avoidCenter: 18 }, T()));
      add(entity('vegetation', 'Mato', { kind: 'grass', count: 60000, area: [200, 200], seed: 3, color: '#3f4a2a' }, T()));
      add(entity('structure', 'Cabana abandonada', { kind: 'cabin', style: 'abandoned', width: 6, depth: 5, doorOpen: true }, T([0, 0, -14])));
      add(entity('light', 'Lanterna', { kind: 'spot', color: '#ffe9b0', intensity: 30, distance: 30, angle: 28, castShadow: true, attachToCamera: true }, T([0, 1.6, 0])));
      add(entity('npc', 'Vulto', { height: 2.3, build: 'thin', skinColor: '#1a1a1a', shirtColor: '#050505', pantsColor: '#050505', eyesGlow: '#ff2020' }, T([10, 0, -40]), { ai: { behavior: 'chase_player', speed: 2.6, detectRadius: 22, attackDamage: 25 }, animation: { clip: 'walk', loop: true, speed: 0.7 } }));
      hero([0, 0, 6]);
      doc.missions.push({ id: 'm_main', title: 'Sobreviva à noite', description: 'Encontre as 3 páginas e chegue à cabana.', objectives: [{ id: 'o1', type: 'collect', target: 'page', count: 3, description: 'Páginas encontradas' }, { id: 'o2', type: 'reach', target: 'cabin_door', count: 1, description: 'Entre na cabana' }], reward: { score: 500 }, next: null });
      for (let i = 0; i < 3; i++) add(entity('pickup', `Página ${i + 1}`, { item: 'page', value: 1, glow: '#e5e7eb' }, T([[-30, 25, 40][i], 0.8, [20, -35, -60][i]])));
      add(entity('trigger', 'Porta da cabana', { size: [2, 3, 2], event: 'cabin_door' }, T([0, 1, -11])));
      doc.audio.ambient = 'rain_forest_night';
      break;
    }
    case 'corrida': {
      doc.player.controller = 'vehicle';
      doc.player.speed = 38;
      terrain(800, 3, 'grass');
      add(entity('structure', 'Pista', { kind: 'road', shape: 'circuit', radiusX: 180, radiusZ: 110, width: 14, curbs: true }, T()));
      add(entity('vehicle', 'Carro do jogador', { kind: 'sports_car', color: '#7c3aed', accent: '#22d3ee' }, T([180, 0.5, 0], [0, 0, 0]), { physics: { body: 'dynamic', mass: 1200 } }));
      doc.player.entityId = doc.entities[doc.entities.length - 1].id;
      for (let i = 0; i < 3; i++) add(entity('vehicle', `Rival ${i + 1}`, { kind: 'sports_car', color: ['#ef4444', '#f59e0b', '#22c55e'][i], ai: true }, T([174 + i * 4, 0.5, -8 - i * 6]), { ai: { behavior: 'patrol', path: 'circuit', speed: 30 + i * 2 } }));
      add(entity('vegetation', 'Árvores', { kind: 'trees', count: 600, area: [760, 760], seed: 11, avoidRoad: true }, T()));
      add(entity('structure', 'Arquibancada', { kind: 'grandstand', length: 60, crowd: true }, T([205, 0, 0], [0, -90, 0])));
      add(entity('structure', 'Largada', { kind: 'checkpoint', index: 0, finish: true }, T([180, 0, 0])));
      doc.systems.race = { laps: 3, checkpoints: 8 };
      doc.ui.hud = { showHealth: false, showScore: false, showTimer: true, showMinimap: true, showObjective: true };
      break;
    }
    case 'sobrevivencia': {
      doc.settings.environment.dayNightCycle = { enabled: true, minutesPerDay: 18 };
      doc.settings.environment.timeOfDay = 8;
      terrain(600, 18, 'grass');
      add(entity('water', 'Lago', { size: [140, 140], color: '#1e5f74', waveScale: 1 }, T([90, 1.2, 60])));
      add(entity('vegetation', 'Pinheiros', { kind: 'pines', count: 1500, area: [560, 560], seed: 21, avoidCenter: 25 }, T()));
      add(entity('vegetation', 'Grama', { kind: 'grass', count: 120000, area: [260, 260], seed: 4 }, T()));
      add(entity('vegetation', 'Pedras', { kind: 'rocks', count: 400, area: [500, 500], seed: 9 }, T()));
      add(entity('structure', 'Fogueira', { kind: 'campfire' }, T([4, 0, 4])));
      add(entity('structure', 'Barraca', { kind: 'tent', color: '#b45309' }, T([-4, 0, 6], [0, 30, 0])));
      hero([0, 0, 0]);
      doc.systems.survival = { hunger: true, thirst: true, stamina: true, crafting: [{ id: 'axe', name: 'Machado', requires: { wood: 3, stone: 2 } }, { id: 'campfire', name: 'Fogueira', requires: { wood: 5 } }] };
      doc.missions.push({ id: 'm_main', title: 'Primeira noite', description: 'Colete madeira e sobreviva até o amanhecer.', objectives: [{ id: 'o1', type: 'collect', target: 'wood', count: 10, description: 'Madeira' }, { id: 'o2', type: 'survive', target: 'night', count: 1, description: 'Sobreviva à noite' }], reward: { score: 200 }, next: null });
      for (let i = 0; i < 10; i++) add(entity('pickup', `Madeira ${i + 1}`, { item: 'wood', value: 1 }, T([Math.cos(i) * (12 + i * 3), 0.3, Math.sin(i) * (12 + i * 3)])));
      break;
    }
    case 'mundo_aberto': {
      doc.settings.environment.dayNightCycle = { enabled: true, minutesPerDay: 30 };
      terrain(1200, 40, 'grass');
      add(entity('water', 'Mar', { size: [3000, 3000], color: '#1d6f8a' }, T([0, -2, 0])));
      add(entity('vegetation', 'Floresta', { kind: 'trees', count: 4000, area: [1100, 1100], seed: 5, avoidCenter: 60 }, T()));
      add(entity('vegetation', 'Grama', { kind: 'grass', count: 150000, area: [300, 300], seed: 6 }, T()));
      add(entity('vegetation', 'Flores', { kind: 'flowers', count: 6000, area: [300, 300], seed: 8 }, T()));
      for (let i = 0; i < 6; i++) add(entity('structure', `Casa ${i + 1}`, { kind: 'house', floors: 1 + (i % 2), color: ['#e5e7eb', '#fde68a', '#fecaca', '#bfdbfe', '#d9f99d', '#e9d5ff'][i] }, T([-30 + (i % 3) * 22, 0, -30 + Math.floor(i / 3) * 24], [0, i * 25, 0])));
      add(entity('npc', 'Aldeã', { height: 1.65, shirtColor: '#be185d', pantsColor: '#334155', hair: 'long', hairColor: '#6b3e26' }, T([-8, 0, -12]), { ai: { behavior: 'wander', speed: 1.2, radius: 15, dialogueId: 'd_villager' }, animation: { clip: 'idle', loop: true, speed: 1 } }));
      add(entity('vehicle', 'Carro', { kind: 'pickup_truck', color: '#0e7490' }, T([12, 0.5, 4]), { physics: { body: 'dynamic', mass: 1600 } }));
      hero([0, 0, 0]);
      doc.dialogues.push({ id: 'd_villager', speaker: 'Aldeã', lines: [{ id: 'l1', text: 'Bem-vindo à vila! Dizem que há um tesouro no topo da montanha.', choices: [{ text: 'Vou procurar!', next: null, startMission: 'm_main' }, { text: 'Agora não.', next: null }] }] });
      doc.missions.push({ id: 'm_main', title: 'O tesouro da montanha', description: 'Fale com a aldeã e encontre o tesouro.', objectives: [{ id: 'o1', type: 'talk', target: 'd_villager', count: 1, description: 'Fale com a aldeã' }, { id: 'o2', type: 'collect', target: 'treasure', count: 1, description: 'Encontre o tesouro' }], reward: { score: 1000 }, next: null });
      add(entity('pickup', 'Tesouro', { item: 'treasure', value: 1, glow: '#facc15' }, T([180, 30, -220])));
      doc.ui.hud.showMinimap = true;
      break;
    }
    case 'acao':
    case 'aventura':
    default: {
      terrain(500, template === 'vazio' ? 0 : 10, 'grass');
      if (template !== 'vazio') {
        add(entity('vegetation', 'Árvores', { kind: 'trees', count: 1200, area: [460, 460], seed: 2, avoidCenter: 20 }, T()));
        add(entity('vegetation', 'Grama', { kind: 'grass', count: 90000, area: [220, 220], seed: 1 }, T()));
        add(entity('structure', 'Ruínas', { kind: 'ruins', size: 14 }, T([0, 0, -40])));
        if (template === 'acao') {
          for (let i = 0; i < 4; i++) add(entity('npc', `Inimigo ${i + 1}`, { height: 1.85, shirtColor: '#7f1d1d', pantsColor: '#1c1917' }, T([-15 + i * 10, 0, -35]), { ai: { behavior: 'patrol', speed: 2.5, radius: 10, detectRadius: 18, attackDamage: 10 }, health: { max: 60 }, animation: { clip: 'walk', loop: true, speed: 1 } }));
          doc.missions.push({ id: 'm_main', title: 'Limpe as ruínas', description: 'Derrote os guardas das ruínas.', objectives: [{ id: 'o1', type: 'defeat', target: 'npc', count: 4, description: 'Inimigos derrotados' }], reward: { score: 400 }, next: null });
        } else {
          doc.missions.push({ id: 'm_main', title: 'Explore as ruínas', description: 'Chegue ao centro das ruínas antigas.', objectives: [{ id: 'o1', type: 'reach', target: 'ruins_center', count: 1, description: 'Centro das ruínas' }], reward: { score: 200 }, next: null });
          add(entity('trigger', 'Centro das ruínas', { size: [4, 4, 4], event: 'ruins_center' }, T([0, 1, -40])));
        }
      }
      hero([0, 0, 0]);
    }
  }
  return doc;
}

function defaultTilemap(template) {
  const W = 100;
  const H = 22;
  const rows = Array.from({ length: H }, () => '0'.repeat(W).split(''));
  for (let x = 0; x < W; x++) { rows[H - 1][x] = '1'; rows[H - 2][x] = x % 17 === 9 || x % 17 === 10 ? '0' : '1'; }
  for (let x = 0; x < W; x++) if (rows[H - 2][x] === '0') rows[H - 1][x] = '4';
  if (template !== 'vazio') {
    for (const [x0, y, len] of [[12, 16, 5], [22, 13, 4], [34, 15, 6], [48, 12, 4], [60, 14, 5], [74, 11, 6], [86, 15, 4]]) {
      for (let x = x0; x < x0 + len; x++) rows[y][x] = '2';
      for (let x = x0; x < x0 + len; x += 2) rows[y - 2][x] = '3';
    }
    rows[H - 3][W - 4] = '5';
  }
  return rows.map((r) => r.join(''));
}

// ─────────────────────────── Operações ───────────────────────────
const isObj = (v) => v && typeof v === 'object' && !Array.isArray(v);
export function deepMerge(target, patch) {
  for (const [k, v] of Object.entries(patch)) {
    if (k === '__proto__' || k === 'constructor' || k === 'prototype') continue;
    if (v === undefined) continue;
    if (isObj(v) && isObj(target[k])) deepMerge(target[k], v);
    else target[k] = Array.isArray(v) ? structuredClone(v) : isObj(v) ? structuredClone(v) : v;
  }
  return target;
}

export const clone = (doc) => structuredClone(doc);

function findEntity(doc, ref) {
  return doc.entities.find((e) => e.id === ref) || doc.entities.find((e) => e.name === ref);
}

/**
 * Aplica uma lista de operações a uma CÓPIA do documento. Retorna { doc, changes }.
 * Lança Error com mensagem legível em caso de operação inválida (nada é aplicado).
 */
export function applyOps(source, ops) {
  const doc = clone(source);
  const changes = [];
  for (const op of ops) {
    switch (op.op) {
      case 'add_entity': {
        const e = op.entity;
        if (!ENTITY_TYPES.includes(e.type)) throw new Error(`Tipo de entidade inválido: ${e.type}`);
        const full = { id: e.id || newId(e.type.slice(0, 3)), name: e.name || e.type, type: e.type, parent: e.parent ?? null, visible: e.visible ?? true,
          tags: e.tags || [], transform: { position: [0, 0, 0], rotation: [0, 0, 0], scale: [1, 1, 1], ...(e.transform || {}) }, props: e.props || {}, components: e.components || {} };
        if (doc.entities.some((x) => x.id === full.id)) throw new Error(`ID duplicado: ${full.id}`);
        doc.entities.push(full);
        changes.push({ type: 'add', target: full.id, label: `Adicionado: ${full.name}` });
        break;
      }
      case 'update_entity': {
        const e = findEntity(doc, op.id);
        if (!e) throw new Error(`Entidade não encontrada: ${op.id}`);
        const { id: _ignored, type: newType, ...patch } = op.patch || {};
        if (newType && newType !== e.type) throw new Error('Não é possível trocar o tipo de uma entidade; remova e crie outra.');
        deepMerge(e, patch);
        changes.push({ type: 'update', target: e.id, label: `Alterado: ${e.name}` });
        break;
      }
      case 'remove_entity': {
        const e = findEntity(doc, op.id);
        if (!e) throw new Error(`Entidade não encontrada: ${op.id}`);
        const removed = new Set([e.id]);
        let grew = true;
        while (grew) { // remove filhos recursivamente
          grew = false;
          for (const x of doc.entities) if (x.parent && removed.has(x.parent) && !removed.has(x.id)) { removed.add(x.id); grew = true; }
        }
        doc.entities = doc.entities.filter((x) => !removed.has(x.id));
        if (removed.has(doc.player.entityId)) doc.player.entityId = null;
        changes.push({ type: 'remove', target: e.id, label: `Removido: ${e.name}${removed.size > 1 ? ` (+${removed.size - 1})` : ''}`, destructive: true });
        break;
      }
      case 'set_settings': {
        deepMerge(doc.settings, op.patch || {});
        changes.push({ type: 'settings', label: `Configurações: ${Object.keys(op.patch || {}).join(', ')}` });
        break;
      }
      case 'set_player': {
        deepMerge(doc.player, op.patch || {});
        changes.push({ type: 'player', label: 'Configuração do jogador alterada' });
        break;
      }
      case 'set_material': {
        if (!/^[a-zA-Z0-9_-]{1,40}$/.test(op.id)) throw new Error('ID de material inválido.');
        doc.materials[op.id] = deepMerge(doc.materials[op.id] || mat(op.material?.preset || 'custom'), op.material || {});
        changes.push({ type: 'material', target: op.id, label: `Material: ${op.id}` });
        break;
      }
      case 'write_script': {
        if (!/^[a-zA-Z0-9_.-]{1,60}$/.test(op.name)) throw new Error('Nome de script inválido.');
        const existed = !!doc.scripts[op.name];
        doc.scripts[op.name] = { source: String(op.source || ''), attachedTo: op.attachedTo ?? doc.scripts[op.name]?.attachedTo ?? null, description: op.description || doc.scripts[op.name]?.description || '' };
        changes.push({ type: 'script', target: op.name, label: `${existed ? 'Script alterado' : 'Script criado'}: ${op.name}`, destructive: existed });
        break;
      }
      case 'delete_script': {
        if (!doc.scripts[op.name]) throw new Error(`Script não encontrado: ${op.name}`);
        delete doc.scripts[op.name];
        changes.push({ type: 'script', target: op.name, label: `Script removido: ${op.name}`, destructive: true });
        break;
      }
      case 'upsert_mission': {
        const m = op.mission;
        if (!m?.id) throw new Error('Missão precisa de id.');
        const i = doc.missions.findIndex((x) => x.id === m.id);
        if (i >= 0) doc.missions[i] = deepMerge(doc.missions[i], m); else doc.missions.push({ objectives: [], reward: {}, next: null, description: '', ...m });
        changes.push({ type: 'mission', target: m.id, label: `Missão: ${m.title || m.id}` });
        break;
      }
      case 'remove_mission': {
        doc.missions = doc.missions.filter((x) => x.id !== op.id);
        changes.push({ type: 'mission', target: op.id, label: `Missão removida: ${op.id}`, destructive: true });
        break;
      }
      case 'upsert_dialogue': {
        const d = op.dialogue;
        if (!d?.id) throw new Error('Diálogo precisa de id.');
        const i = doc.dialogues.findIndex((x) => x.id === d.id);
        if (i >= 0) doc.dialogues[i] = d; else doc.dialogues.push(d);
        changes.push({ type: 'dialogue', target: d.id, label: `Diálogo: ${d.speaker || d.id}` });
        break;
      }
      case 'remove_dialogue': {
        doc.dialogues = doc.dialogues.filter((x) => x.id !== op.id);
        changes.push({ type: 'dialogue', target: op.id, label: `Diálogo removido: ${op.id}`, destructive: true });
        break;
      }
      case 'set_system': {
        if (!/^[a-zA-Z0-9_]{1,40}$/.test(op.name)) throw new Error('Nome de sistema inválido.');
        if (op.config === null) delete doc.systems[op.name]; else doc.systems[op.name] = op.config;
        changes.push({ type: 'system', target: op.name, label: `Sistema: ${op.name}` });
        break;
      }
      case 'set_ui': {
        deepMerge(doc.ui, op.patch || {});
        changes.push({ type: 'ui', label: 'Interface (HUD/menus) alterada' });
        break;
      }
      case 'set_meta': {
        deepMerge(doc.meta, op.patch || {});
        changes.push({ type: 'meta', label: 'Informações do projeto' });
        break;
      }
      case 'set_art_style': {
        if (!ART_STYLE_IDS.includes(op.style)) throw new Error(`Estilo desconhecido: ${op.style}`);
        doc.artStyle = op.style;
        changes.push({ type: 'style', label: `Estilo visual do projeto: ${op.style}` });
        break;
      }
      case 'set_audio': {
        deepMerge(doc.audio, op.patch || {});
        changes.push({ type: 'audio', label: 'Áudio' });
        break;
      }
      default:
        throw new Error(`Operação desconhecida: ${op.op}`);
    }
  }
  return { doc, changes };
}

// ─────────────────────────── Validação (IA Testadora) ───────────────────────────
const finite = (v) => typeof v === 'number' && Number.isFinite(v);

/**
 * Verificações estáticas do projeto. `checkScript` (opcional) compila scripts sem executá-los.
 * Retorna { errors, warnings, stats }.
 */
export function validateProject(doc, { checkScript } = {}) {
  const errors = [];
  const warnings = [];
  if (!doc || doc.format !== PROJECT_FORMAT) return { errors: ['Documento não é um projeto NEXPLAY.'], warnings, stats: {} };
  const ids = new Set();
  let vegetation = 0;
  let lights = 0;
  let shadowLights = 0;
  let npcs = 0;
  for (const e of doc.entities || []) {
    if (!e.id || ids.has(e.id)) errors.push(`Entidade com ID ausente ou duplicado: ${e.name || '?'}`);
    ids.add(e.id);
    if (!ENTITY_TYPES.includes(e.type)) errors.push(`Tipo inválido em "${e.name}": ${e.type}`);
    const t = e.transform || {};
    for (const k of ['position', 'rotation', 'scale']) {
      if (!Array.isArray(t[k]) || t[k].length !== 3 || !t[k].every(finite)) errors.push(`Transformação inválida (${k}) em "${e.name}".`);
    }
    if (Array.isArray(t.scale) && t.scale.some((s) => s === 0)) warnings.push(`"${e.name}" tem escala zero e ficará invisível.`);
    if (e.type === 'vegetation') vegetation += Number(e.props?.count || 0);
    if (e.type === 'light') { lights++; if (e.props?.castShadow) shadowLights++; }
    if (e.type === 'npc') {
      npcs++;
      if (e.components?.ai?.behavior && !NPC_BEHAVIORS.includes(e.components.ai.behavior)) warnings.push(`Comportamento de IA desconhecido em "${e.name}".`);
      const did = e.components?.ai?.dialogueId;
      if (did && !(doc.dialogues || []).some((d) => d.id === did)) errors.push(`"${e.name}" referencia diálogo inexistente: ${did}`);
    }
    if (e.type === 'primitive' && e.props?.shape && !PRIMITIVE_SHAPES.includes(e.props.shape)) errors.push(`Forma inválida em "${e.name}".`);
    if (e.type === 'structure' && e.props?.kind && !STRUCTURE_KINDS.includes(e.props.kind)) warnings.push(`Estrutura desconhecida em "${e.name}": ${e.props.kind} (será desenhada como bloco).`);
    if (e.props?.material && !doc.materials?.[e.props.material]) errors.push(`"${e.name}" usa material inexistente: ${e.props.material}`);
    const hasAsset = (ref) => (doc.assets || []).some((a) => a.id === ref);
    if (e.type === 'model' && !hasAsset(e.props?.asset)) {
      if (e.props?.pendingJob) warnings.push(`"${e.name}" aguarda a produção na NEXPLAY FORGE (job ${e.props.pendingJob}).`);
      else errors.push(`Modelo "${e.name}" sem asset .glb válido.`);
    }
    if (['character', 'npc'].includes(e.type) && e.props?.model && !hasAsset(e.props.model)) errors.push(`"${e.name}" usa modelo 3D inexistente.`);
    for (const l of e.props?.lods || []) if (!hasAsset(l)) errors.push(`"${e.name}" referencia LOD inexistente.`);
    if (e.type === 'sprite' && e.props?.asset && !hasAsset(e.props.asset)) errors.push(`Sprite "${e.name}" usa imagem inexistente.`);
    const conflict = styleConflict(doc.artStyle, e.props?.style);
    if (conflict) warnings.push(`Identidade visual: "${e.name}" tem ${conflict}.`);
    if (e.components?.animation?.clip && !ANIMATION_CLIPS.includes(e.components.animation.clip)) warnings.push(`Animação desconhecida em "${e.name}": ${e.components.animation.clip}`);
    if (e.components?.script && !doc.scripts?.[e.components.script]) errors.push(`"${e.name}" usa script inexistente: ${e.components.script}`);
  }
  for (const e of doc.entities || []) if (e.parent && !ids.has(e.parent)) errors.push(`"${e.name}" tem pai inexistente.`);
  if (doc.artStyle && !ART_STYLE_IDS.includes(doc.artStyle)) errors.push(`Estilo visual desconhecido: ${doc.artStyle}`);
  if (doc.artStyle && ['pixel', 'illustrated'].includes(doc.artStyle) && doc.meta?.dimension === '3d') warnings.push('Estilo 2D em projeto 3D: use sprites/planos ou mude o estilo.');
  if (doc.player?.entityId && !ids.has(doc.player.entityId)) errors.push('O jogador aponta para uma entidade inexistente.');
  if (!doc.player?.entityId && doc.player?.controller !== 'none') warnings.push('Nenhuma entidade definida como jogador.');
  if (doc.player?.controller && !CONTROLLERS.includes(doc.player.controller)) errors.push(`Controle de jogador inválido: ${doc.player.controller}`);
  for (const [name, m] of Object.entries(doc.materials || {})) {
    if (m.preset && !MATERIAL_PRESETS.includes(m.preset)) warnings.push(`Material "${name}" usa predefinição desconhecida: ${m.preset}`);
    if (m.map && !(doc.assets || []).some((a) => a.id === m.map)) errors.push(`Material "${name}" usa textura inexistente.`);
  }
  for (const [name, s] of Object.entries(doc.scripts || {})) {
    if (s.attachedTo && !ids.has(s.attachedTo)) errors.push(`Script "${name}" está ligado a entidade inexistente.`);
    if (typeof s.source !== 'string') errors.push(`Script "${name}" sem código.`);
    else if (s.source.length > 200_000) errors.push(`Script "${name}" excede 200 KB.`);
    else if (checkScript) {
      const err = checkScript(s.source);
      if (err) errors.push(`Erro de sintaxe em "${name}": ${err}`);
    }
  }
  const missionIds = new Set((doc.missions || []).map((m) => m.id));
  for (const m of doc.missions || []) {
    if (m.next && !missionIds.has(m.next)) errors.push(`Missão "${m.title}" aponta para próxima missão inexistente.`);
    for (const o of m.objectives || []) if (!OBJECTIVE_TYPES.includes(o.type)) errors.push(`Objetivo inválido em "${m.title}": ${o.type}`);
    if (!(m.objectives || []).length) warnings.push(`Missão "${m.title}" não tem objetivos.`);
  }
  for (const d of doc.dialogues || []) {
    const lineIds = new Set((d.lines || []).map((l) => l.id));
    for (const l of d.lines || []) for (const c of l.choices || []) {
      if (c.next && !lineIds.has(c.next)) errors.push(`Diálogo "${d.id}": escolha aponta para fala inexistente (${c.next}).`);
      if (c.startMission && !missionIds.has(c.startMission)) errors.push(`Diálogo "${d.id}": missão inexistente (${c.startMission}).`);
    }
  }
  // Orçamento de desempenho
  if (vegetation > 400_000) warnings.push(`Muita vegetação (${vegetation.toLocaleString('pt-BR')} instâncias): pode ficar lento em celulares.`);
  if (shadowLights > 4) warnings.push(`${shadowLights} luzes com sombra: considere reduzir para manter o FPS.`);
  if (lights > 32) warnings.push(`${lights} luzes na cena: o desempenho pode cair.`);
  if (npcs > 80) warnings.push(`${npcs} NPCs com IA: considere usar multidões instanciadas.`);
  if ((doc.entities || []).length > 5000) warnings.push('Mais de 5.000 entidades: considere agrupar objetos.');
  return { errors, warnings, stats: { entities: (doc.entities || []).length, vegetation, lights, npcs, scripts: Object.keys(doc.scripts || {}).length, missions: (doc.missions || []).length } };
}

/** Resumo compacto do projeto para dar contexto à IA sem enviar o documento inteiro. */
export function summarizeProject(doc, { full = false } = {}) {
  const ents = doc.entities.map((e) => {
    const base = { id: e.id, name: e.name, type: e.type, pos: e.transform.position.map((n) => Math.round(n * 100) / 100) };
    if (full) return { ...base, rot: e.transform.rotation, scale: e.transform.scale, props: e.props, components: e.components, parent: e.parent };
    const key = e.props?.kind || e.props?.shape || e.props?.preset;
    return key ? { ...base, kind: key } : base;
  });
  return {
    meta: doc.meta,
    artStyle: doc.artStyle || null,
    settings: doc.settings,
    player: doc.player,
    entities: ents,
    materials: doc.materials,
    scripts: Object.fromEntries(Object.entries(doc.scripts).map(([k, v]) => [k, { attachedTo: v.attachedTo, description: v.description, lines: v.source.split('\n').length }])),
    missions: doc.missions,
    dialogues: doc.dialogues.map((d) => ({ id: d.id, speaker: d.speaker, lines: d.lines.length })),
    systems: Object.keys(doc.systems),
    ui: doc.ui,
    assets: doc.assets,
  };
}
