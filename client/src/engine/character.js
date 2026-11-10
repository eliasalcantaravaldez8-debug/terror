// Personagem humanoide procedural com esqueleto hierárquico e animações procedurais
// (ciclos de marcha/corrida com contrapeso de braços, respiração, saltos, chutes, comemorações…)
// com transições suaves entre clipes. Modelos .glb importados usam AnimationMixer (ver world.js).
import * as THREE from 'three';
import { presetTextures, textureSizeFor } from './textures.js';

const BUILD = { athletic: [1, 1], thin: [0.82, 1.04], heavy: [1.25, 0.98] };

function capsule(r, len, mat, seg = 10) {
  const m = new THREE.Mesh(new THREE.CapsuleGeometry(r, len, 4, seg), mat);
  m.castShadow = true; m.receiveShadow = true;
  return m;
}

function limb(parent, name, r, len, mat, offset) {
  const pivot = new THREE.Group();
  pivot.name = name;
  pivot.position.copy(offset);
  const m = capsule(r, len, mat);
  m.position.y = -len / 2 - r * 0.2;
  pivot.add(m);
  parent.add(pivot);
  return pivot;
}

export function buildCharacter(e, quality) {
  const p = e.props || {};
  const height = p.height || 1.8;
  const k = height / 1.8;
  const [wide, tall] = BUILD[p.build] || BUILD.athletic;
  const tsize = textureSizeFor(quality === 'ultra' ? 'high' : 'medium');
  const fabric = presetTextures('fabric', tsize);
  const skinTex = presetTextures('skin', tsize);
  const mat = (color, tex, rough) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0, ...(tex ? { normalMap: tex.normalMap, normalScale: new THREE.Vector2(0.4, 0.4) } : {}) });
  const skin = mat(p.skinColor || '#c58c62', skinTex, 0.55);
  const shirt = mat(p.shirtColor || '#7c3aed', fabric, 0.85);
  const pants = mat(p.pantsColor || '#1f2937', fabric, 0.9);
  const shoes = mat(p.shoesColor || '#111827', null, 0.5);
  const hairM = mat(p.hairColor || '#1b1410', null, 0.7);

  const root = new THREE.Group();
  root.name = e.name;
  const rig = new THREE.Group();
  rig.scale.set(k * wide, k * tall, k * wide);
  root.add(rig);

  const hips = new THREE.Group(); hips.position.y = 0.98; rig.add(hips);
  const pelvis = capsule(0.15, 0.12, pants); pelvis.rotation.z = Math.PI / 2; hips.add(pelvis);
  const spine = new THREE.Group(); spine.position.y = 0.08; hips.add(spine);
  const torso = capsule(0.17, 0.32, shirt); torso.position.y = 0.24; torso.scale.set(1.15, 1, 0.75); spine.add(torso);
  const chest = new THREE.Group(); chest.position.y = 0.42; spine.add(chest);
  const neck = new THREE.Group(); neck.position.y = 0.1; chest.add(neck);
  const neckMesh = capsule(0.05, 0.06, skin); neckMesh.position.y = 0.03; neck.add(neckMesh);
  const head = new THREE.Group(); head.position.y = 0.14; neck.add(head);
  const skull = new THREE.Mesh(new THREE.SphereGeometry(0.115, 20, 16), skin); skull.scale.set(0.92, 1.08, 1); skull.castShadow = true; skull.position.y = 0.06; head.add(skull);
  // Rosto: olhos e nariz para dar leitura de direção.
  const eyeMat = new THREE.MeshStandardMaterial({ color: p.eyesGlow || '#111', emissive: p.eyesGlow || '#000', emissiveIntensity: p.eyesGlow ? 3 : 0, roughness: 0.3 });
  for (const s of [-1, 1]) { const eye = new THREE.Mesh(new THREE.SphereGeometry(0.014, 8, 6), eyeMat); eye.position.set(s * 0.04, 0.08, 0.1); head.add(eye); }
  const nose = new THREE.Mesh(new THREE.ConeGeometry(0.014, 0.04, 6), skin); nose.rotation.x = Math.PI / 2; nose.position.set(0, 0.05, 0.115); head.add(nose);
  if (p.hair !== 'bald') {
    const hairG = p.hair === 'long' ? new THREE.SphereGeometry(0.125, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.62) : new THREE.SphereGeometry(0.122, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.45);
    const hair = new THREE.Mesh(hairG, hairM); hair.position.y = 0.075; hair.rotation.x = -0.25; hair.castShadow = true; head.add(hair);
    if (p.hair === 'long') { const back = capsule(0.09, 0.16, hairM); back.position.set(0, -0.03, -0.07); head.add(back); }
    if (p.hair === 'mohawk') { hair.scale.set(0.3, 1.3, 1.1); }
  }
  const shoulderY = 0.02;
  const lUpper = limb(chest, 'lUpperArm', 0.05, 0.24, shirt, new THREE.Vector3(0.22, shoulderY, 0));
  const lFore = limb(lUpper, 'lForeArm', 0.042, 0.22, skin, new THREE.Vector3(0, -0.3, 0));
  const rUpper = limb(chest, 'rUpperArm', 0.05, 0.24, shirt, new THREE.Vector3(-0.22, shoulderY, 0));
  const rFore = limb(rUpper, 'rForeArm', 0.042, 0.22, skin, new THREE.Vector3(0, -0.3, 0));
  for (const fore of [lFore, rFore]) { const hand = new THREE.Mesh(new THREE.SphereGeometry(0.045, 10, 8), skin); hand.position.y = -0.3; hand.scale.set(0.8, 1.1, 0.6); fore.add(hand); }
  const lThigh = limb(hips, 'lThigh', 0.075, 0.34, pants, new THREE.Vector3(0.1, -0.06, 0));
  const lShin = limb(lThigh, 'lShin', 0.06, 0.34, pants, new THREE.Vector3(0, -0.44, 0));
  const rThigh = limb(hips, 'rThigh', 0.075, 0.34, pants, new THREE.Vector3(-0.1, -0.06, 0));
  const rShin = limb(rThigh, 'rShin', 0.06, 0.34, pants, new THREE.Vector3(0, -0.44, 0));
  for (const shin of [lShin, rShin]) {
    const foot = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.07, 0.24), shoes);
    foot.position.set(0, -0.46, 0.05); foot.castShadow = true; shin.add(foot);
  }
  const bones = { hips, spine, chest, neck, head, lUpper, lFore, rUpper, rFore, lThigh, lShin, rThigh, rShin };
  const anim = new ProceduralAnimator(bones, e.components?.animation);
  return { object: root, animator: anim, height };
}

// Poses parametrizadas: cada clipe é uma função (t, fase) → rotações dos ossos.
const CLIPS = {
  idle: (t) => ({ spineX: Math.sin(t * 1.6) * 0.02, chestX: Math.sin(t * 1.6) * 0.015, headY: Math.sin(t * 0.4) * 0.15, lUpperZ: 0.08, rUpperZ: -0.08, lForeX: -0.1, rForeX: -0.1, hipsY: Math.sin(t * 1.6) * 0.005 }),
  walk: (t, ph) => gait(ph, 0.55, 0.35, 0.03, 0.05),
  run: (t, ph) => gait(ph, 0.95, 0.9, 0.07, 0.18),
  sprint: (t, ph) => gait(ph, 1.15, 1.2, 0.09, 0.28),
  dribble: (t, ph) => ({ ...gait(ph, 0.85, 0.6, 0.06, 0.22), headX: 0.25 }),
  jump: () => ({ lThighX: -0.9, lShinX: 1.2, rThighX: -0.3, rShinX: 0.6, lUpperX: -2.2, rUpperX: -2.2, spineX: 0.1 }),
  fall: (t) => ({ lThighX: -0.4, rThighX: -0.2, lShinX: 0.5, rShinX: 0.4, lUpperZ: 1.2 + Math.sin(t * 8) * 0.2, rUpperZ: -1.2 - Math.sin(t * 8) * 0.2 }),
  crouch: () => ({ hipsY: -0.35, lThighX: -1.4, rThighX: -1.4, lShinX: 1.9, rShinX: 1.9, spineX: 0.5, lUpperX: -0.5, rUpperX: -0.5 }),
  kick: (t, ph) => { const k = Math.sin(Math.min(ph, 1) * Math.PI); return { rThighX: -1.7 * k + 0.6 * (1 - k), rShinX: 0.3 * k + 1.2 * (1 - k) * (ph < 0.5 ? 1 : 0), lUpperX: -0.9 * k, rUpperZ: -0.6 * k, spineX: -0.25 * k, lUpperZ: 0.5 * k }; },
  pass: (t, ph) => { const k = Math.sin(Math.min(ph, 1) * Math.PI); return { rThighX: -0.9 * k, rThighZ: 0.4 * k, lUpperZ: 0.4 * k, spineY: 0.3 * k }; },
  celebrate: (t) => ({ lUpperZ: 2.6 + Math.sin(t * 10) * 0.2, rUpperZ: -2.6 - Math.sin(t * 10) * 0.2, hipsY: Math.abs(Math.sin(t * 6)) * 0.25, lForeX: -0.3, rForeX: -0.3, headX: -0.3 }),
  wave: (t) => ({ rUpperZ: -2.6, rForeZ: Math.sin(t * 9) * 0.6, lUpperZ: 0.1, headY: -0.2 }),
  attack: (t, ph) => { const k = Math.sin(Math.min(ph, 1) * Math.PI); return { rUpperX: -1.8 * k, rForeX: -0.4 * (1 - k), spineY: -0.5 * k, lThighX: -0.3 * k }; },
  hit: (t, ph) => ({ spineX: -0.4 * Math.sin(Math.min(ph, 1) * Math.PI), headX: -0.3 }),
  die: (t, ph) => { const k = Math.min(ph, 1); return { rootX: -Math.PI / 2 * k, hipsY: -0.75 * k, lUpperZ: 1.2 * k, rUpperZ: -1.2 * k }; },
  talk: (t) => ({ ...CLIPS.idle(t), rUpperX: -0.4 + Math.sin(t * 3) * 0.15, rForeX: -0.9, headY: Math.sin(t * 2) * 0.2 }),
  sit: () => ({ hipsY: -0.45, lThighX: -1.55, rThighX: -1.55, lShinX: 1.55, rShinX: 1.55, lUpperX: -0.3, rUpperX: -0.3 }),
  drive: () => ({ hipsY: -0.4, lThighX: -1.4, rThighX: -1.4, lShinX: 1.2, rShinX: 1.2, lUpperX: -1.1, rUpperX: -1.1, lForeX: -0.6, rForeX: -0.6 }),
  swim: (t) => ({ rootX: -1.3, lUpperX: Math.sin(t * 4) * 2.5, rUpperX: Math.sin(t * 4 + Math.PI) * 2.5, lThighX: Math.sin(t * 6) * 0.4, rThighX: -Math.sin(t * 6) * 0.4 }),
  climb: (t) => ({ lUpperX: -2.6 + Math.sin(t * 4) * 0.4, rUpperX: -2.6 - Math.sin(t * 4) * 0.4, lThighX: -0.8 + Math.sin(t * 4) * 0.5, rThighX: -0.8 - Math.sin(t * 4) * 0.5, lShinX: 1, rShinX: 1 }),
  goalkeeper_dive: (t, ph) => { const k = Math.min(ph, 1); return { rootZ: 1.3 * k, lUpperZ: 2.8 * k, rUpperZ: 0.6 * k, hipsY: -0.5 * k }; },
};

function gait(ph, legAmp, armAmp, bounce, lean) {
  const s = Math.sin(ph); const c = Math.cos(ph);
  const lift = (x) => Math.max(0, Math.sin(x)) ** 1.5;
  return {
    hipsY: Math.abs(Math.cos(ph)) * bounce - bounce * 0.5,
    hipsYaw: s * 0.12 * legAmp,
    spineX: lean, spineY: -s * 0.15 * armAmp, chestX: 0.02,
    lThighX: -s * legAmp, rThighX: s * legAmp,
    lShinX: lift(ph + Math.PI) * legAmp * 1.5 + 0.08, rShinX: lift(ph) * legAmp * 1.5 + 0.08,
    lUpperX: s * armAmp, rUpperX: -s * armAmp, lUpperZ: 0.1, rUpperZ: -0.1,
    lForeX: -0.25 - armAmp * 0.5 - Math.max(0, c) * 0.2, rForeX: -0.25 - armAmp * 0.5 - Math.max(0, -c) * 0.2,
    headX: -lean * 0.6,
  };
}

const KEYS = ['hipsY', 'hipsYaw', 'spineX', 'spineY', 'chestX', 'headX', 'headY', 'lThighX', 'rThighX', 'lThighZ', 'rThighZ', 'lShinX', 'rShinX', 'lUpperX', 'rUpperX', 'lUpperZ', 'rUpperZ', 'lForeX', 'rForeX', 'lForeZ', 'rForeZ', 'rootX', 'rootZ'];
const ONESHOT = new Set(['kick', 'pass', 'attack', 'hit', 'die', 'goalkeeper_dive']);

export class ProceduralAnimator {
  constructor(bones, def = {}) {
    this.b = bones;
    this.clip = def?.clip || 'idle';
    this.prev = null;
    this.blend = 1;
    this.speed = def?.speed ?? 1;
    this.phase = 0;
    this.t = 0;
    this.oneShotT = 0;
    this.cadence = 1; // ajustado pela velocidade real de deslocamento
    this.after = null;
  }

  play(clip, { speed, then } = {}) {
    if (!CLIPS[clip]) return;
    if (clip === this.clip && !ONESHOT.has(clip)) return;
    this.prev = this.clip;
    this.clip = clip;
    this.blend = 0;
    this.oneShotT = 0;
    if (speed) this.speed = speed;
    this.after = ONESHOT.has(clip) ? (then ?? (clip === 'die' ? null : this.prev)) : null;
  }

  update(dt, root) {
    this.t += dt;
    const gaitRate = { walk: 7, run: 10.5, sprint: 12.5, dribble: 10 }[this.clip] || 6;
    this.phase += dt * gaitRate * this.speed * this.cadence;
    if (ONESHOT.has(this.clip)) {
      this.oneShotT += dt * this.speed * 1.8;
      if (this.oneShotT >= 1 && this.after) this.play(this.after);
    }
    this.blend = Math.min(1, this.blend + dt * 6);
    const cur = CLIPS[this.clip](this.t, ONESHOT.has(this.clip) ? this.oneShotT : this.phase);
    const old = this.prev && this.blend < 1 ? CLIPS[this.prev](this.t, this.phase) : null;
    const w = this.blend * this.blend * (3 - 2 * this.blend);
    const v = {};
    for (const k of KEYS) v[k] = old ? THREE.MathUtils.lerp(old[k] || 0, cur[k] || 0, w) : (cur[k] || 0);
    const b = this.b;
    b.hips.position.y = 0.98 + v.hipsY;
    b.hips.rotation.y = v.hipsYaw;
    b.spine.rotation.set(v.spineX, v.spineY, 0);
    b.chest.rotation.x = v.chestX;
    b.head.rotation.set(v.headX, v.headY, 0);
    b.lThigh.rotation.set(v.lThighX, 0, v.lThighZ); b.rThigh.rotation.set(v.rThighX, 0, -v.rThighZ);
    b.lShin.rotation.x = v.lShinX; b.rShin.rotation.x = v.rShinX;
    b.lUpper.rotation.set(v.lUpperX, 0, v.lUpperZ); b.rUpper.rotation.set(v.rUpperX, 0, v.rUpperZ);
    b.lFore.rotation.set(v.lForeX, 0, v.lForeZ); b.rFore.rotation.set(v.rForeX, 0, v.rForeZ);
    if (root) { root.children[0].rotation.x = v.rootX; root.children[0].rotation.z = v.rootZ; }
  }
}

export const CLIP_NAMES = Object.keys(CLIPS);

/**
 * Animador para personagens com modelo GLB (ex.: produzidos pela NEXPLAY FORGE): mesma interface do
 * ProceduralAnimator (play/update/cadence/clip), usando os clipes do arquivo com transição suave.
 */
const ALIASES = { sprint: ['sprint', 'run'], dribble: ['dribble', 'run'], fall: ['fall', 'jump'], kick: ['kick', 'attack'], pass: ['pass', 'kick'], celebrate: ['celebrate', 'dance', 'wave'], die: ['die', 'death'], hit: ['hit', 'hurt'], talk: ['talk', 'idle'] };
export class MixerAnimator {
  constructor(mixer, clips, initial = 'idle') {
    this.mixer = mixer;
    this.clips = clips;
    this.cadence = 1;
    this.clip = null;
    this.action = null;
    this.play(initial);
  }

  find(name) {
    const want = ALIASES[name] || [name];
    for (const w of want) {
      const c = this.clips.find((x) => x.name.toLowerCase() === w) || this.clips.find((x) => x.name.toLowerCase().includes(w));
      if (c) return c;
    }
    return null;
  }

  play(name) {
    if (name === this.clip) return;
    const c = this.find(name);
    if (!c) return;
    const next = this.mixer.clipAction(c);
    const oneShot = ['kick', 'pass', 'attack', 'hit', 'die', 'jump'].includes(name);
    next.reset();
    next.setLoop(oneShot ? THREE.LoopOnce : THREE.LoopRepeat, Infinity);
    next.clampWhenFinished = oneShot;
    if (this.action && this.action !== next) next.crossFadeFrom(this.action, 0.2, false);
    next.play();
    this.action = next;
    this.clip = name;
  }

  update(dt) {
    if (this.action) this.action.timeScale = this.cadence;
    this.mixer.update(dt);
  }
}
