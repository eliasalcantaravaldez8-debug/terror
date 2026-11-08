// Personagem humanoide com esqueleto (SkinnedMesh) e animação procedural com transições suaves.
// Estados: parado, andando, correndo, pulando/caindo, aterrissando, sentado (dirigindo), conversando.
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { colorize } from './geo.js';

const sharedMat = new THREE.MeshLambertMaterial({ vertexColors: true });

function prep(g, color, matrix, boneIndex) {
  let n = g.index ? g.toNonIndexed() : g;
  if (n === g) n = g.clone();
  for (const k of Object.keys(n.attributes)) if (!['position', 'normal'].includes(k)) n.deleteAttribute(k);
  n.applyMatrix4(matrix);
  colorize(n, color);
  const c = n.attributes.position.count;
  const si = new Uint16Array(c * 4), sw = new Float32Array(c * 4);
  for (let i = 0; i < c; i++) { si[i * 4] = boneIndex; sw[i * 4] = 1; }
  n.setAttribute('skinIndex', new THREE.BufferAttribute(si, 4));
  n.setAttribute('skinWeight', new THREE.BufferAttribute(sw, 4));
  return n;
}

const M = (x = 0, y = 0, z = 0, sx = 1, sy = 1, sz = 1, rx = 0, ry = 0, rz = 0) =>
  new THREE.Matrix4().compose(new THREE.Vector3(x, y, z),
    new THREE.Quaternion().setFromEuler(new THREE.Euler(rx, ry, rz)), new THREE.Vector3(sx, sy, sz));

const damp = (a, b, k, dt) => a + (b - a) * (1 - Math.exp(-k * dt));

export const DEFAULT_LOOK = {
  skin: 0xc68a64, hair: 0x2b1d14, shirt: 0x34495e, pants: 0x2c2f38, shoes: 0x1d1d1d,
  jacket: null, hairStyle: 'short', height: 1.0, build: 1.0, hat: null, beard: false, badge: false, tie: null,
};

export class Humanoid {
  constructor(look = {}) {
    this.look = { ...DEFAULT_LOOK, ...look };
    const L = this.look;
    this.root = new THREE.Group();
    this.root.name = 'humanoid';
    this.bones = {};
    const B = (name, parent, x, y, z) => {
      const b = new THREE.Bone(); b.name = name; b.position.set(x, y, z);
      if (parent) parent.add(b);
      this.bones[name] = b; return b;
    };
    const s = L.build;
    // Esqueleto (unidades em metros, altura ~1.80m)
    const hips = B('hips', null, 0, 0.98, 0);
    const spine = B('spine', hips, 0, 0.12, 0);
    const chest = B('chest', spine, 0, 0.22, 0);
    const neck = B('neck', chest, 0, 0.24, 0);
    const head = B('head', neck, 0, 0.08, 0);
    const shL = B('shoulderL', chest, 0.19 * s, 0.18, 0);
    const shR = B('shoulderR', chest, -0.19 * s, 0.18, 0);
    const elL = B('elbowL', shL, 0, -0.29, 0);
    const elR = B('elbowR', shR, 0, -0.29, 0);
    const haL = B('handL', elL, 0, -0.27, 0);
    const haR = B('handR', elR, 0, -0.27, 0);
    const thL = B('thighL', hips, 0.1 * s, -0.04, 0);
    const thR = B('thighR', hips, -0.1 * s, -0.04, 0);
    const knL = B('kneeL', thL, 0, -0.44, 0);
    const knR = B('kneeR', thR, 0, -0.44, 0);
    const ftL = B('footL', knL, 0, -0.44, 0);
    const ftR = B('footR', knR, 0, -0.44, 0);
    const boneList = Object.values(this.bones);
    hips.updateMatrixWorld(true);
    const idx = (b) => boneList.indexOf(b);
    const parts = [];
    const wp = (b) => new THREE.Vector3().setFromMatrixPosition(b.matrixWorld);
    // adiciona geometria em coordenadas relativas ao osso
    const add = (bone, geo, color, x = 0, y = 0, z = 0, sx = 1, sy = 1, sz = 1, rx = 0, ry = 0, rz = 0) => {
      const p = wp(bone);
      parts.push(prep(geo, color, M(p.x + x, p.y + y, p.z + z, sx, sy, sz, rx, ry, rz), idx(bone)));
    };
    const top = L.jacket ?? L.shirt;
    const cap = (r, l) => new THREE.CapsuleGeometry(r, l, 3, 8);
    const sph = (r) => new THREE.SphereGeometry(r, 12, 9);
    const bx = (w, h, d) => new THREE.BoxGeometry(w, h, d);
    // quadril / pelve
    add(hips, cap(0.15 * s, 0.08), L.pants, 0, -0.02, 0, 1.15, 1, 0.75, 0, 0, Math.PI / 2);
    // cinto
    add(hips, new THREE.CylinderGeometry(0.165 * s, 0.165 * s, 0.05, 12), 0x221a14, 0, 0.06, 0, 1.05, 1, 0.72);
    // abdômen e tronco
    add(spine, cap(0.15 * s, 0.12), top, 0, 0.08, 0, 1.15, 1, 0.75);
    add(chest, cap(0.18 * s, 0.12), top, 0, 0.1, 0, 1.12, 1, 0.72);
    if (L.jacket) {
      // gola e abertura da jaqueta mostrando a camisa
      add(chest, bx(0.1, 0.4, 0.02), L.shirt, 0, 0.02, 0.135);
      add(chest, new THREE.TorusGeometry(0.085, 0.03, 6, 12), L.jacket, 0, 0.27, 0, 1, 1, 1, Math.PI / 2);
    }
    if (L.tie) add(chest, bx(0.05, 0.24, 0.02), L.tie, 0, 0.1, 0.14);
    if (L.badge) add(chest, bx(0.05, 0.06, 0.02), 0xd4af37, 0.09, 0.17, 0.135);
    // pescoço e cabeça
    add(neck, new THREE.CylinderGeometry(0.055, 0.06, 0.1, 8), L.skin, 0, 0.02, 0);
    add(head, sph(0.115), L.skin, 0, 0.11, 0.005, 0.92, 1.08, 1);
    add(head, sph(0.03), L.skin, 0, 0.1, 0.11, 0.8, 1, 0.9); // nariz
    add(head, sph(0.016), 0xf5f5f5, 0.042, 0.135, 0.095); add(head, sph(0.016), 0xf5f5f5, -0.042, 0.135, 0.095);
    add(head, sph(0.009), 0x1a1a1a, 0.042, 0.135, 0.108); add(head, sph(0.009), 0x1a1a1a, -0.042, 0.135, 0.108);
    add(head, bx(0.04, 0.008, 0.01), L.hair, 0.042, 0.163, 0.1); add(head, bx(0.04, 0.008, 0.01), L.hair, -0.042, 0.163, 0.1);
    add(head, bx(0.045, 0.008, 0.01), 0x8a4a40, 0, 0.055, 0.105); // boca
    add(head, sph(0.025), L.skin, 0.108, 0.11, 0, 0.5, 1, 0.8); add(head, sph(0.025), L.skin, -0.108, 0.11, 0, 0.5, 1, 0.8);
    if (L.beard) add(head, sph(0.1), L.hair, 0, 0.06, 0.03, 0.95, 0.6, 0.85);
    if (L.hairStyle === 'short') add(head, new THREE.SphereGeometry(0.122, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.55), L.hair, 0, 0.125, -0.008, 0.95, 1.05, 1.05, -0.2);
    else if (L.hairStyle === 'long') {
      add(head, new THREE.SphereGeometry(0.125, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.6), L.hair, 0, 0.125, -0.01, 0.97, 1.05, 1.05, -0.15);
      add(head, bx(0.22, 0.26, 0.06), L.hair, 0, 0.0, -0.08);
    } else if (L.hairStyle === 'bun') {
      add(head, new THREE.SphereGeometry(0.122, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.55), L.hair, 0, 0.125, -0.008, 0.95, 1.05, 1.05, -0.2);
      add(head, sph(0.06), L.hair, 0, 0.2, -0.1);
    } else if (L.hairStyle === 'bald') { /* nada */ }
    if (L.hat === 'police') {
      add(head, new THREE.CylinderGeometry(0.13, 0.125, 0.08, 14), L.hatColor ?? 0x1b2a4a, 0, 0.225, 0);
      add(head, new THREE.CylinderGeometry(0.14, 0.14, 0.015, 14), 0x111111, 0, 0.19, 0.03, 1, 1, 1.15);
      add(head, bx(0.04, 0.035, 0.01), 0xd4af37, 0, 0.23, 0.128);
    } else if (L.hat === 'cap') {
      add(head, new THREE.SphereGeometry(0.125, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.5), L.hatColor ?? 0xaa2222, 0, 0.14, 0);
      add(head, bx(0.16, 0.012, 0.1), L.hatColor ?? 0xaa2222, 0, 0.15, 0.13);
    }
    // braços
    for (const [sh, el, ha, side] of [[shL, elL, haL, 1], [shR, elR, haR, -1]]) {
      add(sh, sph(0.07 * s), top, 0, 0, 0);
      add(sh, cap(0.052 * s, 0.2), top, 0, -0.145, 0);
      add(el, cap(0.045 * s, 0.19), L.jacket ? L.jacket : (L.longSleeve ? L.shirt : L.skin), 0, -0.13, 0);
      add(ha, sph(0.05), L.skin, 0, -0.04, 0.005, 0.75, 1.15, 0.9);
      add(ha, sph(0.022), L.skin, 0.028 * side, -0.02, 0.03); // polegar
    }
    // pernas
    for (const [th, kn, ft] of [[thL, knL, ftL], [thR, knR, ftR]]) {
      add(th, cap(0.075 * s, 0.32), L.pants, 0, -0.21, 0);
      add(kn, cap(0.06 * s, 0.33), L.pants, 0, -0.21, 0);
      add(ft, bx(0.1, 0.07, 0.25), L.shoes, 0, -0.02, 0.05);
      add(ft, bx(0.105, 0.02, 0.26), 0x0e0e0e, 0, -0.055, 0.05);
    }
    const geo = mergeGeometries(parts, false);
    parts.forEach((p) => p.dispose());
    geo.computeBoundingSphere();
    geo.boundingSphere.radius = 1.4;
    geo.boundingSphere.center.set(0, 0.9, 0);
    const mesh = new THREE.SkinnedMesh(geo, sharedMat);
    mesh.add(hips);
    mesh.bind(new THREE.Skeleton(boneList));
    mesh.castShadow = true;
    mesh.frustumCulled = true;
    this.mesh = mesh;
    this.root.add(mesh);
    this.root.scale.setScalar(L.height);
    this.rest = {};
    for (const [k, b] of Object.entries(this.bones)) this.rest[k] = b.position.clone();
    this.cur = {}; // rotações atuais (x,y,z) por osso para transições suaves
    for (const k of Object.keys(this.bones)) this.cur[k] = new THREE.Vector3();
    this.hipY = 0; this.hipZ = 0;
    this.phase = 0;
    this.idleT = Math.random() * 10;
    this.landT = 0;
    this.lookYaw = 0;
  }

  // p: {speed, grounded, vy, mode: 'foot'|'sit', talk, turn, accel}
  update(dt, p) {
    const T = {}; // alvos
    for (const k of Object.keys(this.bones)) T[k] = [0, 0, 0];
    const speed = p.speed || 0;
    this.idleT += dt;
    let hipY = 0, hipZ = 0;
    const blendK = 12;
    if (p.mode === 'sit') {
      T.thighL = [-1.45, 0, 0.05]; T.thighR = [-1.45, 0, -0.05];
      T.kneeL = [1.2, 0, 0]; T.kneeR = [1.2, 0, 0];
      T.footL = [0.05, 0, 0]; T.footR = [0.05, 0, 0];
      T.shoulderL = [-0.95, 0, 0.12 + (p.steer || 0) * 0.25]; T.shoulderR = [-0.95, 0, -0.12 + (p.steer || 0) * 0.25];
      T.elbowL = [-0.55, 0, 0]; T.elbowR = [-0.55, 0, 0];
      T.spine = [-0.08, 0, 0]; T.head = [0.05, -(p.steer || 0) * 0.25, 0];
      hipY = -0.42; hipZ = -0.05;
    } else if (!p.grounded) {
      const up = p.vy > 0 ? 1 : 0;
      T.thighL = [-0.7 * up - 0.25, 0, 0.05]; T.thighR = [-0.15 - 0.2 * (1 - up), 0, -0.05];
      T.kneeL = [1.1 * up + 0.4, 0, 0]; T.kneeR = [0.6, 0, 0];
      T.shoulderL = [-0.6, 0, 0.5]; T.shoulderR = [-0.3, 0, -0.5];
      T.elbowL = [-0.6, 0, 0]; T.elbowR = [-0.5, 0, 0];
      T.spine = [0.12, 0, 0]; T.head = [-0.1, 0, 0];
    } else {
      const run = THREE.MathUtils.smoothstep(speed, 2.6, 5.2);
      const move = Math.min(1, speed / 1.0);
      const cycle = THREE.MathUtils.lerp(1.45, 2.7, run); // metros por ciclo (dois passos)
      this.phase += (speed / cycle) * Math.PI * 2 * dt;
      const ph = this.phase;
      const sA = Math.sin(ph), sB = Math.sin(ph + Math.PI);
      const thighAmp = THREE.MathUtils.lerp(0.42, 0.85, run) * move;
      const armAmp = THREE.MathUtils.lerp(0.32, 0.75, run) * move;
      T.thighL = [-sA * thighAmp - run * 0.15, 0, 0.03];
      T.thighR = [-sB * thighAmp - run * 0.15, 0, -0.03];
      const knee = (s, c) => (Math.max(0, Math.cos(c - 0.3)) * THREE.MathUtils.lerp(0.75, 1.6, run) + 0.08) * move;
      T.kneeL = [knee(sA, ph), 0, 0]; T.kneeR = [knee(sB, ph + Math.PI), 0, 0];
      T.footL = [Math.max(0, -sA) * 0.3 * move - 0.05 * move, 0, 0];
      T.footR = [Math.max(0, -sB) * 0.3 * move - 0.05 * move, 0, 0];
      T.shoulderL = [sA * armAmp, 0, 0.08 + run * 0.08]; T.shoulderR = [sB * armAmp, 0, -0.08 - run * 0.08];
      T.elbowL = [-(THREE.MathUtils.lerp(0.25, 1.35, run) * move + 0.12) - Math.max(0, sA) * 0.2 * move, 0, 0];
      T.elbowR = [-(THREE.MathUtils.lerp(0.25, 1.35, run) * move + 0.12) - Math.max(0, sB) * 0.2 * move, 0, 0];
      const lean = run * 0.22 + THREE.MathUtils.clamp((p.accel || 0) * 0.03, -0.12, 0.15);
      T.spine = [lean, Math.sin(ph) * 0.08 * move, -(p.turn || 0) * 0.06];
      T.chest = [0, -Math.sin(ph) * 0.12 * move, 0];
      T.hips = [0, Math.sin(ph) * 0.1 * move, -(p.turn || 0) * 0.05];
      hipY = -Math.abs(Math.cos(ph)) * THREE.MathUtils.lerp(0.03, 0.07, run) * move + 0.01 * move - run * 0.04;
      // respiração / parado
      const idle = 1 - move;
      const br = Math.sin(this.idleT * 1.6);
      T.chest[0] += br * 0.02 * idle;
      T.shoulderL[2] += (0.06 + br * 0.01) * idle; T.shoulderR[2] -= (0.06 + br * 0.01) * idle;
      T.elbowL[0] -= 0.1 * idle; T.elbowR[0] -= 0.1 * idle;
      T.hips[2] += Math.sin(this.idleT * 0.4) * 0.03 * idle;
      T.thighL[2] += 0.04 * idle; T.thighR[2] -= 0.04 * idle;
      // olhar ao redor quando parado
      T.head = [0, Math.sin(this.idleT * 0.35) * 0.35 * idle * (Math.sin(this.idleT * 0.11) > 0.3 ? 1 : 0.2) + this.lookYaw, 0];
      if (p.talk) {
        const t = this.idleT * 3;
        T.head[0] += Math.sin(t * 1.3) * 0.06;
        T.shoulderR = [-0.45 - Math.sin(t) * 0.15, 0, -0.2];
        T.elbowR = [-1.1 + Math.sin(t * 1.7) * 0.2, 0.3, 0];
      }
      // aterrissagem: agachamento rápido
      if (this.landT > 0) {
        this.landT -= dt;
        const k = Math.max(0, this.landT / 0.25);
        hipY -= 0.12 * k; T.thighL[0] -= 0.5 * k; T.thighR[0] -= 0.5 * k;
        T.kneeL[0] += 0.9 * k; T.kneeR[0] += 0.9 * k; T.spine[0] += 0.25 * k;
      }
    }
    for (const [k, b] of Object.entries(this.bones)) {
      const c = this.cur[k], t = T[k];
      c.x = damp(c.x, t[0], blendK, dt); c.y = damp(c.y, t[1], blendK, dt); c.z = damp(c.z, t[2], blendK, dt);
      b.rotation.set(c.x, c.y, c.z);
    }
    this.hipY = damp(this.hipY, hipY, 14, dt);
    this.hipZ = damp(this.hipZ, hipZ, 14, dt);
    this.bones.hips.position.set(this.rest.hips.x, this.rest.hips.y + this.hipY, this.rest.hips.z + this.hipZ);
  }
  land(strength) { this.landT = 0.25 * Math.min(1, strength); }
}
