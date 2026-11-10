// Direção de arte: catálogo de estilos, classificação automática do pedido e roteamento de ferramentas.
// Um projeto tem UM estilo (doc.artStyle) para manter a identidade visual consistente.

export const ART_STYLES = {
  realistic: {
    label: 'Realista',
    dimension: '3d',
    description: 'Modelos detalhados, materiais PBR, iluminação avançada e sombras suaves.',
    textureMax: 2048, triangleBudget: 60000, lodRatios: [1, 0.45, 0.15], shading: 'smooth',
    preferredProviders: ['tripo', 'meshy'], meshyArtStyle: 'realistic',
    rendering: { quality: 'high', ssao: true, bloom: 0.25 },
  },
  stylized: {
    label: 'Estilizado / cartoon',
    dimension: '3d',
    description: 'Formas expressivas, cores vivas, materiais simples e contornos suaves.',
    textureMax: 1024, triangleBudget: 25000, lodRatios: [1, 0.5, 0.2], shading: 'smooth',
    preferredProviders: ['meshy', 'tripo'], meshyArtStyle: 'sculpture',
    rendering: { quality: 'high', ssao: false, bloom: 0.35 },
  },
  lowpoly: {
    label: 'Low Poly',
    dimension: '3d',
    description: 'Geometria simplificada, sombreamento facetado e paleta reduzida.',
    textureMax: 512, triangleBudget: 3000, lodRatios: [1, 0.6], shading: 'flat',
    preferredProviders: ['tripo', 'meshy'], meshyArtStyle: 'sculpture',
    rendering: { quality: 'medium', ssao: false, bloom: 0.3 },
  },
  voxel: {
    label: 'Voxel',
    dimension: '3d',
    description: 'Modelos em blocos (estilo MagicaVoxel / Minecraft), sombreamento facetado e cores sólidas.',
    textureMax: 256, triangleBudget: 20000, lodRatios: [1], shading: 'flat',
    preferredProviders: ['voxel'],
    rendering: { quality: 'medium', ssao: true, bloom: 0.2 },
  },
  pixel: {
    label: 'Pixel art',
    dimension: '2d',
    description: 'Sprites em grade de pixels, paleta limitada, animações quadro a quadro e filtragem "nearest".',
    textureMax: 512, preferredProviders: ['pixel'],
  },
  illustrated: {
    label: '2D desenhado',
    dimension: '2d',
    description: 'Ilustrações e sprites desenhados (ex.: feitos no Krita), animações 2D suaves.',
    textureMax: 2048, preferredProviders: ['upload', 'pixel'],
  },
};

const RULES = [
  ['voxel', /\b(voxel|blocos?|minecraft|cubic|cúbic|estilo de blocos)\b/i],
  ['pixel', /\b(pixel ?art|pixelad|8[- ]?bits?|16[- ]?bits?|retr[oô]|sprite)/i],
  ['illustrated', /\b(desenhad|ilustrad|hand[- ]?drawn|cartoon 2d|anima[çc][aã]o 2d|estilo de desenho)/i],
  ['lowpoly', /\b(low[- ]?poly|lowpoly|poucos pol[ií]gonos|facetad|minimalista 3d)/i],
  ['stylized', /\b(cartoon|estilizad|fofo|infantil|colorid|fantasia|toon|anime)\b/i],
  ['realistic', /\b(realist|realism|fotorreal|aaa|detalhad|cinematogr|hiper ?real|ultra ?real)/i],
];

/** Classifica o estilo pedido. Retorna { style, confidence, reason }. */
export function classifyStyle(text = '', { dimension } = {}) {
  for (const [style, re] of RULES) {
    const m = text.match(re);
    if (m) {
      if (dimension && ART_STYLES[style].dimension !== dimension) continue;
      return { style, confidence: 0.85, reason: `Pedido menciona "${m[0]}".` };
    }
  }
  if (dimension === '2d') return { style: 'pixel', confidence: 0.4, reason: 'Projeto 2D sem estilo explícito: pixel art como padrão.' };
  if (/\b(sobreviv|corrida|futebol|tiro|terror|militar|cidade)\b/i.test(text)) return { style: 'realistic', confidence: 0.55, reason: 'Gênero costuma usar visual realista.' };
  return { style: 'stylized', confidence: 0.35, reason: 'Sem pistas de estilo: estilizado como padrão seguro.' };
}

/** Altura-alvo (m) por categoria, usada para normalizar a escala de modelos gerados. */
export const CATEGORY_SIZE = {
  character: 1.8, creature: 1.6, animal: 1.0, vehicle: 4.4, building: 8, house: 7, furniture: 1.0,
  prop: 1.0, weapon: 1.0, tree: 7, plant: 1.2, rock: 1.5, terrain_piece: 10, item: 0.4,
};

/** Escolhe o provedor: o preferido do estilo que estiver disponível, ou o pedido explicitamente. */
export function routeProvider(style, available, requested) {
  if (requested && requested !== 'auto') {
    if (!available[requested]) return { provider: null, reason: `${requested} não está configurado neste servidor.` };
    return { provider: requested, reason: 'Escolhido pelo usuário.' };
  }
  for (const p of ART_STYLES[style]?.preferredProviders || []) if (available[p]) return { provider: p, reason: `Melhor ferramenta disponível para o estilo ${ART_STYLES[style].label}.` };
  return { provider: null, reason: 'Nenhuma ferramenta de geração 3D configurada (Tripo AI ou Meshy AI). Use voxel, importe um .glb ou configure uma chave de API.' };
}

export { styleConflict } from '../../shared/project.js';
