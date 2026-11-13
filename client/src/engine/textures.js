// Gerador de texturas PBR procedurais (albedo + normal + rugosidade) por predefinição de material.
// Tileáveis, com semente, geradas uma vez e reutilizadas (cache).
import * as THREE from 'three';
import { makeNoise2D, tileableFbm } from './noise.js';

const cache = new Map();
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const mix = (a, b, t) => a + (b - a) * t;
const hex = (h) => { const c = new THREE.Color(h); return [c.r, c.g, c.b]; };
const mix3 = (a, b, t) => [mix(a[0], b[0], t), mix(a[1], b[1], t), mix(a[2], b[2], t)];

// Cada predefinição: height(u,v,n) ∈ [0,1], color(h,u,v,n) → [r,g,b] linear-ish sRGB, rough(h,u,v,n), metal, normalStrength
const PRESETS = {
  grass: {
    height: (u, v, n) => clamp(0.5 + tileableFbm(n.a, u, v, 24, 4) * 1.4 + tileableFbm(n.b, u, v, 96, 2) * 0.6),
    color: (h, u, v, n) => {
      const patch = clamp(0.5 + tileableFbm(n.c, u, v, 6, 3) * 1.6);
      // Albedo de grama mais claro (grama real reflete ~20%): cenas com pouca luz continuam legíveis.
      const base = mix3(hex('#4f8a2c'), hex('#8aab3e'), patch);
      return mix3(mix3(base, hex('#3d6522'), (1 - h) * 0.8), hex('#a3a25a'), clamp((h - 0.85) * 3));
    },
    rough: () => 0.92, metal: 0, normal: 1.2,
  },
  pitch: {
    height: (u, v, n) => clamp(0.5 + tileableFbm(n.a, u, v, 64, 3) * 1.2),
    color: (h, u, v, n) => {
      const stripe = Math.floor(v * 12) % 2 === 0 ? 1 : 0.86; // faixas de corte do gramado
      const c = mix3(hex('#2f6e2a'), hex('#4c9a3a'), clamp(h * 0.8 + tileableFbm(n.c, u, v, 8, 3) * 0.6));
      return c.map((x) => x * stripe);
    },
    rough: () => 0.9, metal: 0, normal: 0.6,
  },
  dirt: {
    height: (u, v, n) => clamp(0.5 + tileableFbm(n.a, u, v, 10, 5) * 1.5 + tileableFbm(n.b, u, v, 60, 2) * 0.4),
    color: (h, u, v, n) => mix3(mix3(hex('#56402c'), hex('#8a6a48'), h), hex('#66523c'), clamp(tileableFbm(n.c, u, v, 4, 3) + 0.5)),
    rough: (h) => 0.85 + h * 0.1, metal: 0, normal: 1.5,
  },
  sand: {
    height: (u, v, n) => clamp(0.5 + Math.sin((u + tileableFbm(n.a, u, v, 4, 3) * 0.3) * 60) * 0.15 + tileableFbm(n.b, u, v, 80, 2) * 0.5),
    color: (h) => mix3(hex('#b89a6a'), hex('#e0c99a'), h), rough: () => 0.95, metal: 0, normal: 0.8,
  },
  rock: {
    height: (u, v, n) => clamp(0.5 + tileableFbm(n.a, u, v, 6, 6) * 1.8),
    color: (h, u, v, n) => mix3(mix3(hex('#4b4a48'), hex('#8a8682'), h), hex('#5c5a4a'), clamp(tileableFbm(n.c, u, v, 3, 3) + 0.4)),
    rough: (h) => 0.75 + (1 - h) * 0.2, metal: 0, normal: 2.2,
  },
  stone: {
    height: (u, v, n) => {
      const cells = 6; const x = u * cells; const y = v * cells;
      const gx = Math.abs((x % 1) - 0.5); const gy = Math.abs((y % 1) - 0.5);
      const mortar = clamp((0.5 - Math.max(gx, gy)) * 18);
      return clamp(mortar * (0.6 + tileableFbm(n.a, u, v, 16, 4) * 0.9));
    },
    color: (h, u, v, n) => mix3(hex('#3e3c39'), mix3(hex('#7d7870'), hex('#9b958b'), clamp(tileableFbm(n.c, u, v, 6, 2) + 0.5)), clamp(h * 1.5)),
    rough: () => 0.85, metal: 0, normal: 2,
  },
  concrete: {
    height: (u, v, n) => clamp(0.5 + tileableFbm(n.a, u, v, 30, 4) * 0.6 + (n.r(u, v) > 0.997 ? -0.4 : 0)),
    color: (h, u, v, n) => { const g = mix(0.48, 0.62, h) + tileableFbm(n.c, u, v, 3, 3) * 0.1; return [g, g * 0.99, g * 0.97]; },
    rough: () => 0.9, metal: 0, normal: 0.7,
  },
  asphalt: {
    height: (u, v, n) => clamp(0.5 + tileableFbm(n.a, u, v, 120, 2) * 1.2),
    color: (h, u, v, n) => { const g = mix(0.07, 0.17, h) + tileableFbm(n.c, u, v, 4, 3) * 0.04; return [g, g, g * 1.03]; },
    rough: (h) => 0.75 + h * 0.2, metal: 0, normal: 1,
  },
  brick: {
    height: (u, v) => {
      const rows = 8; const y = v * rows; const row = Math.floor(y);
      const x = u * 4 + (row % 2) * 0.5;
      const bx = Math.abs((x % 1) - 0.5); const by = Math.abs((y % 1) - 0.5);
      return clamp((0.5 - Math.max(bx * 0.95, by * 0.98)) * 20);
    },
    color: (h, u, v, n) => {
      const tint = tileableFbm(n.c, Math.floor(u * 4 + (Math.floor(v * 8) % 2) * 0.5) / 4, Math.floor(v * 8) / 8, 8, 1);
      return mix3(hex('#8b8178'), mix3(hex('#7a2e1f'), hex('#a34a2f'), clamp(tint + 0.5)), clamp(h * 2));
    },
    rough: () => 0.88, metal: 0, normal: 2,
  },
  wood: {
    height: (u, v, n) => clamp(0.5 + Math.sin((u * 40) + tileableFbm(n.a, u, v, 3, 3) * 18) * 0.25 + tileableFbm(n.b, u, v, 50, 2) * 0.3),
    color: (h) => mix3(hex('#5a3820'), hex('#9a6a3c'), h), rough: (h) => 0.65 + h * 0.15, metal: 0, normal: 1,
  },
  bark: {
    height: (u, v, n) => clamp(0.5 + tileableFbm(n.a, u * 6, v, 4, 5) * 1.6),
    color: (h) => mix3(hex('#2b1e14'), hex('#5e4632'), h), rough: () => 0.95, metal: 0, normal: 2.5,
  },
  planks: {
    height: (u, v, n) => {
      const boards = 6; const x = u * boards; const gap = Math.abs((x % 1) - 0.5) > 0.47 ? 0 : 1;
      return clamp(gap * (0.6 + Math.sin(v * 30 + Math.floor(x) * 7 + tileableFbm(n.a, u, v, 4, 3) * 10) * 0.15));
    },
    color: (h, u) => mix3(hex('#4a2f1b'), mix3(hex('#7d5532'), hex('#a0703f'), (Math.floor(u * 6) * 0.37) % 1), clamp(h * 1.4)),
    rough: () => 0.7, metal: 0, normal: 1.5,
  },
  metal: {
    height: (u, v, n) => clamp(0.5 + tileableFbm(n.a, u * 0.2, v * 8, 20, 2) * 0.25),
    color: (h) => mix3(hex('#8e9499'), hex('#b7bcc0'), h), rough: (h) => 0.3 + h * 0.15, metal: 1, normal: 0.4,
  },
  rusty_metal: {
    height: (u, v, n) => clamp(0.5 + tileableFbm(n.a, u, v, 8, 5) * 1.2),
    color: (h, u, v, n) => { const rust = clamp(tileableFbm(n.c, u, v, 5, 5) * 2 + 0.5); return mix3(hex('#7d8084'), mix3(hex('#6b2f12'), hex('#a4531f'), h), rust); },
    rough: (h, u, v, n) => mix(0.35, 0.9, clamp(tileableFbm(n.c, u, v, 5, 5) * 2 + 0.5)), metal: (h, u, v, n) => 1 - clamp(tileableFbm(n.c, u, v, 5, 5) * 2 + 0.5), normal: 1.4,
  },
  gold: { height: (u, v, n) => clamp(0.5 + tileableFbm(n.a, u, v, 30, 2) * 0.2), color: () => hex('#d4a537'), rough: () => 0.25, metal: 1, normal: 0.3 },
  plastic: { height: () => 0.5, color: () => [0.8, 0.8, 0.8], rough: () => 0.45, metal: 0, normal: 0 },
  rubber: { height: (u, v, n) => clamp(0.5 + tileableFbm(n.a, u, v, 80, 2) * 0.5), color: () => [0.08, 0.08, 0.08], rough: () => 0.9, metal: 0, normal: 0.5 },
  fabric: {
    height: (u, v) => 0.5 + Math.sin(u * 400) * Math.sin(v * 400) * 0.3,
    color: () => [0.6, 0.6, 0.6], rough: () => 0.95, metal: 0, normal: 0.8,
  },
  leather: { height: (u, v, n) => clamp(0.5 + tileableFbm(n.a, u, v, 60, 3) * 0.9), color: (h) => mix3(hex('#3a2416'), hex('#5f3a22'), h), rough: () => 0.6, metal: 0, normal: 1 },
  glass: { height: () => 0.5, color: () => [0.9, 0.95, 1], rough: () => 0.05, metal: 0, normal: 0 },
  marble: {
    height: (u, v, n) => clamp(0.5 + tileableFbm(n.a, u, v, 4, 5) * 0.4),
    color: (h, u, v, n) => { const vein = Math.abs(Math.sin((u + v + tileableFbm(n.a, u, v, 3, 6) * 2.5) * 12)); return mix3(hex('#9a958e'), hex('#efece6'), clamp(vein * 1.2)); },
    rough: () => 0.15, metal: 0, normal: 0.3,
  },
  snow: { height: (u, v, n) => clamp(0.5 + tileableFbm(n.a, u, v, 8, 4) * 0.8), color: (h) => mix3(hex('#cfd8e6'), hex('#ffffff'), h), rough: () => 0.75, metal: 0, normal: 0.6 },
  ice: { height: (u, v, n) => clamp(0.5 + tileableFbm(n.a, u, v, 5, 4) * 0.5), color: (h) => mix3(hex('#9cc7e0'), hex('#e6f6ff'), h), rough: () => 0.1, metal: 0, normal: 0.6 },
  lava: { height: (u, v, n) => clamp(0.5 + tileableFbm(n.a, u, v, 6, 5) * 1.5), color: (h) => mix3(hex('#ff6a00'), hex('#1a0a05'), clamp(h * 1.6 - 0.2)), rough: () => 0.8, metal: 0, normal: 1.5 },
  skin: { height: (u, v, n) => clamp(0.5 + tileableFbm(n.a, u, v, 90, 2) * 0.2), color: () => hex('#c58c62'), rough: () => 0.55, metal: 0, normal: 0.2 },
  water: { height: (u, v, n) => clamp(0.5 + tileableFbm(n.a, u, v, 10, 4) * 0.8), color: () => hex('#1e5f74'), rough: () => 0.05, metal: 0, normal: 1 },
  custom: { height: () => 0.5, color: () => [0.8, 0.8, 0.8], rough: () => 0.6, metal: 0, normal: 0 },
};

export const PRESET_DEFAULTS = Object.fromEntries(Object.entries(PRESETS).map(([k, p]) => [k, { metal: typeof p.metal === 'number' ? p.metal : 0.5 }]));

/** Gera (ou reaproveita) o trio de texturas PBR de uma predefinição. */
export function presetTextures(preset, size = 512, seed = 7) {
  const key = `${preset}:${size}:${seed}`;
  if (cache.has(key)) return cache.get(key);
  const p = PRESETS[preset] || PRESETS.custom;
  const n = { a: makeNoise2D(seed), b: makeNoise2D(seed + 1), c: makeNoise2D(seed + 2), r: (u, v) => { const x = Math.sin(u * 12.9898 * size + v * 78.233 * size) * 43758.5453; return x - Math.floor(x); } };
  const H = new Float32Array(size * size);
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) H[y * size + x] = p.height(x / size, y / size, n);
  const albedo = new Uint8ClampedArray(size * size * 4);
  const normal = new Uint8ClampedArray(size * size * 4);
  const orm = new Uint8ClampedArray(size * size * 4); // R=AO, G=rugosidade, B=metalicidade (padrão glTF)
  const strength = (p.normal ?? 1) * 4;
  const at = (x, y) => H[((y + size) % size) * size + ((x + size) % size)];
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = y * size + x; const u = x / size; const v = y / size; const h = H[i];
      const c = p.color(h, u, v, n);
      albedo[i * 4] = clamp(c[0]) * 255; albedo[i * 4 + 1] = clamp(c[1]) * 255; albedo[i * 4 + 2] = clamp(c[2]) * 255; albedo[i * 4 + 3] = 255;
      const dx = (at(x + 1, y) - at(x - 1, y)) * strength;
      const dy = (at(x, y + 1) - at(x, y - 1)) * strength;
      const len = Math.hypot(dx, dy, 1);
      normal[i * 4] = ((-dx / len) * 0.5 + 0.5) * 255; normal[i * 4 + 1] = ((dy / len) * 0.5 + 0.5) * 255; normal[i * 4 + 2] = ((1 / len) * 0.5 + 0.5) * 255; normal[i * 4 + 3] = 255;
      const metal = typeof p.metal === 'function' ? p.metal(h, u, v, n) : p.metal;
      const ao = clamp(0.55 + h * 0.6);
      orm[i * 4] = ao * 255; orm[i * 4 + 1] = clamp(p.rough(h, u, v, n)) * 255; orm[i * 4 + 2] = clamp(metal) * 255; orm[i * 4 + 3] = 255;
    }
  }
  const toTex = (data, srgb) => {
    const t = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
    t.generateMipmaps = true;
    t.minFilter = THREE.LinearMipmapLinearFilter;
    t.magFilter = THREE.LinearFilter;
    t.anisotropy = 8;
    t.needsUpdate = true;
    return t;
  };
  const out = { map: toTex(albedo, true), normalMap: toTex(normal, false), ormMap: toTex(orm, false), metalDefault: typeof p.metal === 'number' ? p.metal : 0.5 };
  cache.set(key, out);
  return out;
}

export function textureSizeFor(quality) {
  return { low: 128, medium: 256, high: 512, ultra: 1024 }[quality] || 512;
}

/** Cria material PBR a partir da definição do projeto. */
export function buildMaterial(def = {}, { quality = 'high', assetTexture: explicitTexture } = {}) {
  const assetTexture = explicitTexture || def.__texture || null;
  const preset = def.preset || 'custom';
  const tex = preset === 'custom' && !def.map ? null : presetTextures(preset, textureSizeFor(quality));
  const isGlass = preset === 'glass' || (def.opacity ?? 1) < 1;
  const params = {
    color: def.color ? new THREE.Color(def.color) : new THREE.Color(0xffffff),
    roughness: def.roughness ?? 1,
    metalness: def.metalness ?? (tex ? 1 : 0),
    envMapIntensity: 1,
  };
  if (tex) {
    params.map = assetTexture || tex.map;
    params.normalMap = tex.normalMap;
    params.roughnessMap = tex.ormMap;
    params.metalnessMap = tex.ormMap;
    params.aoMap = tex.ormMap;
    params.aoMapIntensity = 0.6;
    const ns = def.normalStrength ?? 1;
    params.normalScale = new THREE.Vector2(ns, ns);
    if (def.metalness == null) params.metalness = 1; // metalnessMap (canal B) determina o valor final
  } else if (assetTexture) params.map = assetTexture;
  if (def.emissive) { params.emissive = new THREE.Color(def.emissive); params.emissiveIntensity = def.emissiveIntensity ?? 1; }
  if (preset === 'lava') { params.emissive = new THREE.Color('#ff4500'); params.emissiveMap = tex.map; params.emissiveIntensity = def.emissiveIntensity || 1.5; }
  const mat = isGlass
    ? new THREE.MeshPhysicalMaterial({ ...params, transmission: preset === 'glass' ? 0.95 : 0, transparent: true, opacity: def.opacity ?? 0.35, roughness: def.roughness ?? 0.05, metalness: 0, thickness: 0.1, ior: 1.5 })
    : new THREE.MeshStandardMaterial(params);
  const scale = def.textureScale ?? 1;
  for (const k of ['map', 'normalMap', 'roughnessMap', 'metalnessMap', 'aoMap', 'emissiveMap']) {
    if (mat[k] && mat[k] !== assetTexture) {
      // Clona a referência para permitir repetição diferente por material sem regerar pixels.
      mat[k] = mat[k].clone();
      mat[k].repeat.set(scale, scale);
      mat[k].needsUpdate = true;
    }
  }
  if (!tex && def.roughness == null) mat.roughness = 0.6;
  return mat;
}
