import * as THREE from 'three';
import { TextureFactory as TF } from './TextureFactory.js';

/**
 * Central material library. All world/character materials are created here so
 * swapping a placeholder for an authored PBR material is a one-line change.
 */
function withRepeat(set, rx, ry) {
  const out = {};
  for (const k of Object.keys(set)) {
    const t = set[k].clone();
    t.repeat.set(rx, ry);
    t.needsUpdate = true;
    out[k] = t;
  }
  return out;
}

export class Materials {
  constructor() {
    this.cache = new Map();
  }
  get(key, fn) {
    if (!this.cache.has(key)) this.cache.set(key, fn());
    return this.cache.get(key);
  }

  asphalt() {
    return this.get('asphalt', () => new THREE.MeshStandardMaterial({ ...TF.asphalt(), roughness: 1, metalness: 0, envMapIntensity: 0.9 }));
  }
  pavers() {
    return this.get('pavers', () => new THREE.MeshStandardMaterial({ ...TF.pavers(), roughness: 0.9, metalness: 0 }));
  }
  plaza() {
    return this.get('plaza', () => new THREE.MeshStandardMaterial({ ...TF.pavers(23, '#7c766c', 21), roughness: 0.95 }));
  }
  concrete(tint = '#9a978f', seed = 31) {
    return this.get('concrete' + tint + seed, () => new THREE.MeshStandardMaterial({ ...TF.concrete(seed, tint), roughness: 0.92 }));
  }
  barrier() {
    return this.get('barrier', () => new THREE.MeshStandardMaterial({ ...TF.concrete(33, '#a8a49a', { panels: false }), roughness: 0.9 }));
  }
  roof() {
    return this.get('roof', () => new THREE.MeshStandardMaterial({ ...TF.roof(), roughness: 0.95 }));
  }
  facade(style) {
    return this.get('facade' + JSON.stringify(style), () => new THREE.MeshStandardMaterial({ ...TF.facade(style), roughness: 1, metalness: 0, envMapIntensity: 1.2 }));
  }
  shop(style) {
    return this.get('shop' + JSON.stringify(style), () => new THREE.MeshStandardMaterial({ ...TF.shopfront(style), roughness: 1, envMapIntensity: 1.2 }));
  }
  paint(color, seed = 51) {
    return this.get('paint' + color + seed, () => new THREE.MeshStandardMaterial({ ...TF.paintedMetal(color, seed), roughness: 0.6, metalness: 0.35 }));
  }
  carPaint() {
    // white base so per-instance color tints it
    return this.get('carPaint', () => new THREE.MeshStandardMaterial({ ...TF.paintedMetal('#d8d8d8', 55, true), roughness: 0.45, metalness: 0.4 }));
  }
  burned() {
    return this.get('burned', () => new THREE.MeshStandardMaterial({ ...TF.burned(), roughness: 0.95, metalness: 0.3 }));
  }
  glass() {
    return this.get('glass', () => new THREE.MeshStandardMaterial({ color: 0x1a2028, roughness: 0.05, metalness: 0.9, envMapIntensity: 1.4 }));
  }
  rubber() {
    return this.get('rubber', () => new THREE.MeshStandardMaterial({ color: 0x151515, roughness: 0.9 }));
  }
  darkMetal() {
    return this.get('darkMetal', () => new THREE.MeshStandardMaterial({ color: 0x2a2b2d, roughness: 0.45, metalness: 0.8 }));
  }
  gunMetal() {
    return this.get('gunMetal', () => new THREE.MeshStandardMaterial({ ...TF.paintedMetal('#2c2d2f', 57, false), roughness: 0.5, metalness: 0.7 }));
  }
  /** Weapon finishes. kind: metal | polymer | cerakote */
  weapon(kind = 'metal', color = '#26282a') {
    return this.get('wpn' + kind + color, () => new THREE.MeshStandardMaterial({
      ...TF.weaponFinish(kind, color, 201 + color.length * 7 + kind.length),
      roughness: 1, metalness: kind === 'metal' ? 0.55 : kind === 'cerakote' ? 0.25 : 0.05, envMapIntensity: 1.3,
    }));
  }
  skinTex(tone = '#c29a7b', stubble = false) {
    return this.get('skinT' + tone + stubble, () => new THREE.MeshStandardMaterial({ ...TF.skin(tone, 301, stubble), roughness: 0.62, metalness: 0 }));
  }
  webbing(color = '#77704f') {
    return this.get('web' + color, () => new THREE.MeshStandardMaterial({ ...TF.webbing(color), roughness: 0.92 }));
  }
  polymer(color = 0x2b2a27) {
    return this.get('polymer' + color, () => new THREE.MeshStandardMaterial({ color, roughness: 0.75, metalness: 0.05 }));
  }
  wood() {
    return this.get('wood', () => new THREE.MeshStandardMaterial({ ...TF.wood(), roughness: 0.85 }));
  }
  sandbag() {
    return this.get('sandbag', () => new THREE.MeshStandardMaterial({ ...TF.sandbag(), roughness: 1 }));
  }
  metalPole() {
    return this.get('pole', () => new THREE.MeshStandardMaterial({ color: 0x55585a, roughness: 0.5, metalness: 0.75 }));
  }
  heliPaint() {
    return this.get('heli', () => new THREE.MeshStandardMaterial({ ...TF.paintedMetal('#3f4636', 101, true), roughness: 0.62, metalness: 0.3 }));
  }
  heliInterior() {
    return this.get('heliInt', () => new THREE.MeshStandardMaterial({ ...TF.paintedMetal('#5d6152', 103, true), roughness: 0.75, metalness: 0.2 }));
  }
  canvasSeat() {
    return this.get('seat', () => new THREE.MeshStandardMaterial({ ...TF.fabric(105, ['#6d2b25', '#5f241f', '#7a342c']), roughness: 1 }));
  }
  lineMarking() {
    return this.get('lines', () => new THREE.MeshStandardMaterial({
      map: TF.lineMarking(), transparent: true, roughness: 0.7, depthWrite: false,
      polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -4,
    }));
  }
  // --- characters
  camoAlly() {
    return this.get('camoAlly', () => new THREE.MeshStandardMaterial({ ...TF.fabric(81, ['#6e6a4c', '#8a805d', '#4a4834', '#a59c79', '#5a4a33'], 7), roughness: 0.95 }));
  }
  camoEnemy() {
    return this.get('camoEnemy', () => new THREE.MeshStandardMaterial({ ...TF.fabric(83, ['#3a3c3e', '#2a2b2d', '#4b4d4f', '#1e1f20'], 6), roughness: 0.95 }));
  }
  vestAlly() {
    return this.get('vestAlly', () => new THREE.MeshStandardMaterial({ ...TF.fabric(85, ['#77704f', '#6b6447', '#827a58'], 3), roughness: 0.9 }));
  }
  vestEnemy() {
    return this.get('vestEnemy', () => new THREE.MeshStandardMaterial({ ...TF.fabric(87, ['#252627', '#2e2f31', '#1c1d1e'], 3), roughness: 0.9 }));
  }
  helmetAlly() {
    return this.get('helmetAlly', () => new THREE.MeshStandardMaterial({ ...TF.fabric(89, ['#6f6a4e', '#837b5a', '#5a563f'], 4), roughness: 0.85, metalness: 0.05 }));
  }
  skin(tone = 0xc29a7b) {
    return this.get('skin' + tone, () => new THREE.MeshStandardMaterial({ color: tone, roughness: 0.65, metalness: 0 }));
  }
  glove() {
    return this.get('glove', () => new THREE.MeshStandardMaterial({ color: 0x2c2a25, roughness: 0.85 }));
  }
  boot() {
    return this.get('boot', () => new THREE.MeshStandardMaterial({ color: 0x4a3d2c, roughness: 0.8 }));
  }
  balaclava() {
    return this.get('balaclava', () => new THREE.MeshStandardMaterial({ ...TF.fabric(93, ['#1c1c1d', '#232324', '#18181a'], 8), roughness: 1 }));
  }
  armband() {
    return this.get('armband', () => new THREE.MeshStandardMaterial({ color: 0x8a1414, roughness: 0.8 }));
  }
  lens() {
    return this.get('lens', () => new THREE.MeshStandardMaterial({ color: 0x0a0a0a, roughness: 0.05, metalness: 1 }));
  }
  emissive(color, intensity = 2) {
    return this.get('emi' + color + intensity, () => new THREE.MeshStandardMaterial({ color: 0x000000, emissive: color, emissiveIntensity: intensity }));
  }
  tiled(base, rx, ry) { return withRepeat(base, rx, ry); }
}
