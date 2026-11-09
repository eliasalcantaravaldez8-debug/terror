// Personagem humanoide com esqueleto (SkinnedMesh) e animação procedural com transições suaves.
// Estados: parado, andando, correndo, pulando/caindo, aterrissando, sentado (dirigindo), conversando.
import * as THREE from 'three';
const _q1 = new THREE.Quaternion(), _q2 = new THREE.Quaternion(), _q3 = new THREE.Quaternion(), _q4 = new THREE.Quaternion(), _e1 = new THREE.Euler();
const _v1 = new THREE.Vector3(), _v2 = new THREE.Vector3(), _v3 = new THREE.Vector3(), _v4 = new THREE.Vector3(), _v5 = new THREE.Vector3(), _v6 = new THREE.Vector3(), _v7 = new THREE.Vector3(), _v8 = new THREE.Vector3(), _v9 = new THREE.Vector3();
const _X = new THREE.Vector3(1, 0, 0), _DOWN = new THREE.Vector3(0, -1, 0);
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
  static detail = 1;
  constructor(look = {}) {
    this.look = { ...DEFAULT_LOOK, ...look };
    const L = this.look;
    this.root = new THREE.Group();
    this.root.name = 'humanoid'; this.root.isHumanoidRoot = true;
    this.bones = {};
    const B = (name, parent, x, y, z) => {
      const b = new THREE.Bone(); b.name = name; b.position.set(x, y, z);
      if (parent) parent.add(b);
      this.bones[name] = b; return b;
    };
    const s = L.build; const F = !!L.female;
    // Esqueleto (unidades em metros, altura ~1.80m)
    const hips = B('hips', null, 0, 0.98, 0);
    const spine = B('spine', hips, 0, 0.12, 0);
    const chest = B('chest', spine, 0, 0.22, 0);
    const neck = B('neck', chest, 0, 0.24, 0);
    const head = B('head', neck, 0, 0.08, 0);
    const shW = (F ? 0.165 : 0.195) * s; // ombros: mais largos no homem
    const shL = B('shoulderL', chest, shW, F ? 0.17 : 0.18, 0);
    const shR = B('shoulderR', chest, -shW, F ? 0.17 : 0.18, 0);
    const elL = B('elbowL', shL, 0, -0.29, 0);
    const elR = B('elbowR', shR, 0, -0.29, 0);
    const haL = B('handL', elL, 0, -0.27, 0);
    const haR = B('handR', elR, 0, -0.27, 0);
    const thL = B('thighL', hips, (F ? 0.11 : 0.1) * s, -0.04, 0);
    const thR = B('thighR', hips, -(F ? 0.11 : 0.1) * s, -0.04, 0);
    const knL = B('kneeL', thL, 0, -0.44, 0);
    const knR = B('kneeR', thR, 0, -0.44, 0);
    const ftL = B('footL', knL, 0, -0.44, 0);
    const ftR = B('footR', knR, 0, -0.44, 0);
    const boneList = Object.values(this.bones);
    hips.updateMatrixWorld(true);
    for (const b of boneList) b.matrixAutoUpdate = false; // atualizadas só quando a animação roda (update/ragdoll)
    const idx = (b) => boneList.indexOf(b);
    const parts = [];
    const wp = (b) => new THREE.Vector3().setFromMatrixPosition(b.matrixWorld);
    // adiciona geometria em coordenadas relativas ao osso
    const add = (bone, geo, color, x = 0, y = 0, z = 0, sx = 1, sy = 1, sz = 1, rx = 0, ry = 0, rz = 0) => {
      const p = wp(bone);
      parts.push(prep(geo, color, M(p.x + x, p.y + y, p.z + z, sx, sy, sz, rx, ry, rz), idx(bone)));
    };
    const top = L.jacket ?? L.shirt;
    // detalhe conforme a qualidade gráfica (0 baixa, 1 média, 2 alta): menos polígonos = mais FPS
    const D = Humanoid.detail;
    const cap = (r, l) => new THREE.CapsuleGeometry(r, l, [2, 3, 4][D], [7, 9, 12][D]);
    const sph = (r) => new THREE.SphereGeometry(r, [9, 12, 16][D], [7, 9, 12][D]);
    const bx = (w, h, d) => new THREE.BoxGeometry(w, h, d);
    const sm = (r) => new THREE.SphereGeometry(r, [6, 8, 10][D], [5, 6, 8][D]); // peças pequenas do rosto
    // quadril / pelve (mais largo na mulher)
    add(hips, cap(0.15 * s, 0.08), L.pants, 0, -0.02, 0, F ? 1.28 : 1.15, 1, F ? 0.82 : 0.75, 0, 0, Math.PI / 2);
    if (!L.skirt) add(hips, new THREE.CylinderGeometry(0.165 * s, 0.165 * s, 0.05, 12), 0x221a14, 0, 0.06, 0, F ? 1.12 : 1.05, 1, 0.72); // cinto
    // abdômen e tronco: cintura fina e busto na mulher; peitoral e ombros largos no homem
    add(spine, cap(0.15 * s, 0.12), top, 0, 0.08, 0, F ? 0.98 : 1.15, 1, F ? 0.7 : 0.75);
    add(chest, cap(0.18 * s, 0.12), top, 0, 0.1, 0, F ? 1.0 : 1.18, 1, F ? 0.7 : 0.74);
    if (F) { for (const x of [-0.062, 0.062]) add(chest, sm(0.062 * s), top, x * s, 0.07, 0.09, 1, 0.9, 0.8); }
    else { add(chest, cap(0.1 * s, 0.2), top, 0, 0.18, 0.02, 1.0, 1, 0.8, 0, 0, Math.PI / 2); } // trapézio/peitoral
    if (L.skirt) { // saia ou vestido
      add(hips, new THREE.CylinderGeometry(0.16 * s, (L.skirt === 'long' ? 0.3 : 0.25) * s, L.skirt === 'long' ? 0.62 : 0.38, [8, 10, 14][D], 1, true), L.skirtColor ?? L.pants, 0, L.skirt === 'long' ? -0.27 : -0.15, 0, 1.1, 1, 0.85);
    }
    if (L.jacket) {
      // gola e abertura da jaqueta mostrando a camisa
      add(chest, bx(0.1, 0.4, 0.02), L.shirt, 0, 0.02, 0.135);
      add(chest, new THREE.TorusGeometry(0.085, 0.03, 6, 12), L.jacket, 0, 0.27, 0, 1, 1, 1, Math.PI / 2);
    }
    if (L.tie) add(chest, bx(0.05, 0.24, 0.02), L.tie, 0, 0.1, 0.14);
    if (L.badge) add(chest, bx(0.05, 0.06, 0.02), 0xd4af37, 0.09, 0.17, 0.135);
    // pescoço e cabeça
    add(neck, new THREE.CylinderGeometry(F ? 0.045 : 0.058, F ? 0.05 : 0.064, 0.1, 8), L.skin, 0, 0.02, 0);
    add(head, sph(0.115), L.skin, 0, 0.11, 0.005, F ? 0.9 : 0.93, 1.08, 1); // cabeça
    if (!F) add(head, sm(0.07), L.skin, 0, 0.05, 0.02, 1.18, 0.75, 1.0); // maxilar mais largo no homem
    // nariz: ponte apontando para a frente + ponta
    add(head, new THREE.ConeGeometry(F ? 0.016 : 0.019, 0.045, 6), L.skin, 0, 0.105, 0.112, 1, 1, 0.8, Math.PI / 2 + 0.5);
    add(head, sm(F ? 0.014 : 0.017), L.skin, 0, 0.088, 0.118);
    // olhos: branco, íris colorida, pupila e pálpebra por cima
    const iris = L.eyes ?? 0x4a3020;
    for (const x of [-0.042, 0.042]) {
      add(head, sm(0.016), 0xf2f0ea, x, 0.135, 0.097, 1.1, 0.85, 0.8);
      add(head, sm(0.0085), iris, x, 0.135, 0.1065); add(head, sm(0.0042), 0x050505, x, 0.135, 0.1125);
      add(head, sm(0.018), L.skin, x, 0.147, 0.099, 1.12, 0.5, 0.82); // pálpebra
      if (F) add(head, bx(0.034, 0.004, 0.006), 0x111111, x, 0.143, 0.113, 1, 1, 1, 0, 0, x > 0 ? -0.12 : 0.12); // cílios
      add(head, bx(F ? 0.034 : 0.044, F ? 0.006 : 0.011, 0.012), L.hair, x, 0.164, 0.103, 1, 1, 1, 0, 0, x > 0 ? (F ? -0.18 : -0.06) : (F ? 0.18 : 0.06)); // sobrancelha
    }
    // boca: lábios (coloridos na mulher)
    const lip = F ? (L.lips ?? 0xa83a4a) : new THREE.Color(L.skin).multiplyScalar(0.78).lerp(new THREE.Color(0x9a5a50), 0.25).getHex();
    add(head, cap(0.007, 0.03), lip, 0, 0.057, 0.106, 1, 1, 0.8, 0, 0, Math.PI / 2);
    add(head, cap(F ? 0.009 : 0.008, 0.026), lip, 0, 0.048, 0.103, 1, 1, 0.8, 0, 0, Math.PI / 2);
    add(head, sph(0.025), L.skin, 0.106, 0.11, 0, 0.5, 1, 0.8); add(head, sph(0.025), L.skin, -0.106, 0.11, 0, 0.5, 1, 0.8); // orelhas
    if (L.earrings) for (const x of [-0.108, 0.108]) add(head, sm(0.008), 0xe8c860, x, 0.085, 0.005);
    if (L.beard) { add(head, sph(0.085), L.hair, 0, 0.05, 0.035, 1.1, 0.7, 0.95); add(head, cap(0.012, 0.05), L.hair, 0, 0.072, 0.1, 1, 1, 0.8, 0, 0, Math.PI / 2); }
    const cap0 = (r, open) => new THREE.SphereGeometry(r, [8, 12, 14][D], [6, 8, 10][D], 0, Math.PI * 2, 0, Math.PI * open);
    if (L.hairStyle === 'short') add(head, cap0(0.122, 0.55), L.hair, 0, 0.125, -0.008, 0.95, 1.05, 1.05, -0.2);
    else if (L.hairStyle === 'long') { // cabelo longo com volume, caindo atrás e dos lados do rosto
      add(head, cap0(0.127, 0.55), L.hair, 0, 0.125, -0.01, 0.97, 1.06, 1.07, -0.24);
      add(head, cap(0.095, 0.24), L.hair, 0, -0.02, -0.065, 1.12, 1, 0.5);
      for (const x of [-0.098, 0.098]) add(head, cap(0.028, 0.15), L.hair, x, 0.04, -0.01, 1, 1, 0.8);
    } else if (L.hairStyle === 'ponytail') {
      add(head, cap0(0.124, 0.55), L.hair, 0, 0.125, -0.01, 0.96, 1.05, 1.05, -0.22);
      add(head, cap(0.033, 0.18), L.hair, 0, 0.07, -0.15, 1, 1, 1, 0.5, 0, 0);
    } else if (L.hairStyle === 'bob') {
      add(head, cap0(0.13, 0.55), L.hair, 0, 0.12, -0.012, 1.0, 1.05, 1.08, -0.28);
      add(head, cap(0.105, 0.05), L.hair, 0, 0.05, -0.045, 1.1, 1, 0.75);
    } else if (L.hairStyle === 'bun') {
      add(head, cap0(0.122, 0.55), L.hair, 0, 0.125, -0.008, 0.95, 1.05, 1.05, -0.2);
      add(head, sph(0.06), L.hair, 0, 0.2, -0.1);
    } else if (L.hairStyle === 'bald') { /* nada */ }
    if (L.hat === 'police') {
      add(head, new THREE.CylinderGeometry(0.13, 0.125, 0.08, 14), L.hatColor ?? 0x1b2a4a, 0, 0.225, 0);
      add(head, new THREE.CylinderGeometry(0.14, 0.14, 0.015, 14), 0x111111, 0, 0.19, 0.03, 1, 1, 1.15);
      add(head, bx(0.04, 0.035, 0.01), 0xd4af37, 0, 0.23, 0.128);
    } else if (L.hat === 'hood') {
      add(head, new THREE.SphereGeometry(0.15, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.62), L.hatColor ?? 0x111114, 0, 0.12, -0.02, 1, 1.1, 1.1, -0.35);
      add(neck, new THREE.CylinderGeometry(0.12, 0.16, 0.14, 12), L.hatColor ?? 0x111114, 0, 0.0, -0.02);
    } else if (L.hat === 'cap') {
      add(head, new THREE.SphereGeometry(0.125, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.5), L.hatColor ?? 0xaa2222, 0, 0.14, 0);
      add(head, bx(0.16, 0.012, 0.1), L.hatColor ?? 0xaa2222, 0, 0.15, 0.13);
    }
    // braços
    for (const [sh, el, ha, side] of [[shL, elL, haL, 1], [shR, elR, haR, -1]]) {
      const aw = F ? 0.85 : 1;
      add(sh, sph(0.07 * s * aw), top, 0, 0, 0);
      add(sh, cap(0.052 * s * aw, 0.2), top, 0, -0.145, 0);
      add(el, cap(0.045 * s * aw, 0.19), L.jacket ? L.jacket : (L.longSleeve ? L.shirt : L.skin), 0, -0.13, 0);
      add(ha, sph(0.05), L.skin, 0, -0.04, 0.005, 0.75 * aw, 1.15, 0.9);
      if (D > 0) add(ha, bx(0.06 * aw, 0.05, 0.03), L.skin, 0, -0.1, 0.008); // dedos
      add(ha, sph(0.022), L.skin, 0.028 * side, -0.02, 0.03); // polegar
    }
    // pernas
    for (const [th, kn, ft] of [[thL, knL, ftL], [thR, knR, ftR]]) {
      const legC = L.skirt ? L.skin : L.pants; const lw = F ? 0.9 : 1;
      add(th, cap(0.075 * s * lw, 0.32), L.skirt === 'long' ? L.skirtColor ?? L.pants : legC, 0, -0.21, 0);
      add(kn, cap(0.06 * s * lw, 0.33), legC, 0, -0.21, 0);
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
    mesh.bind(new THREE.Skeleton(boneList)); this.boneList = boneList;
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
    this.punchT = 0;
    this.root.rotation.order = 'YXZ';
  }
  punch() { this.punchT = 0.35; }

  // p: {speed, grounded, vy, mode: 'foot'|'sit', talk, turn, accel}
  update(dt, p) {
    const T = {}; // alvos
    for (const k of Object.keys(this.bones)) T[k] = [0, 0, 0];
    const speed = p.speed || 0;
    this.idleT += dt;
    let hipY = 0, hipZ = 0;
    const blendK = 12;
    if (p.mode === 'chair') {
      T.thighL = [-1.5, 0, 0.08]; T.thighR = [-1.5, 0, -0.08];
      T.kneeL = [1.5, 0, 0]; T.kneeR = [1.5, 0, 0];
      T.shoulderL = [-0.5, 0, 0.1]; T.shoulderR = [-0.5, 0, -0.1];
      T.elbowL = [-0.9, 0, 0]; T.elbowR = [-0.9, 0, 0];
      T.spine = [0.1, 0, 0]; T.head = [0.15 + Math.sin(this.idleT * 0.5) * 0.04, 0, 0];
      hipY = -0.46; hipZ = -0.05;
    } else if (p.mode === 'lie') {
      T.thighL = [0, 0, 0.12]; T.thighR = [0, 0, -0.12]; T.kneeL = [0.15, 0, 0]; T.kneeR = [0.25, 0, 0];
      T.shoulderL = [0, 0, 0.35]; T.shoulderR = [0, 0, -0.35]; T.elbowL = [-0.3, 0, 0]; T.elbowR = [-0.2, 0, 0];
      T.head = [0, 0.4, 0];
    } else if (p.mode === 'handsup') {
      T.shoulderL = [-2.9, 0, 0.35]; T.shoulderR = [-2.9, 0, -0.35]; T.elbowL = [-0.5, 0, 0]; T.elbowR = [-0.5, 0, 0];
      T.spine = [0.08, 0, 0]; T.head = [0.1 + Math.sin(this.idleT * 6) * 0.03, 0, 0];
      T.kneeL = [0.15, 0, 0]; T.kneeR = [0.15, 0, 0];
    } else if (p.mode === 'binoculars') {
      T.shoulderL = [-1.45, 0, -0.45]; T.shoulderR = [-1.45, 0, 0.45]; T.elbowL = [-1.9, 0, 0]; T.elbowR = [-1.9, 0, 0];
      T.head = [-0.05, 0, 0];
    } else if (p.mode === 'sit' && p.cfg) { // dirigindo com o layout do carro: IK de pernas e braços
      const r = this.sitIK(T, p.cfg, p.steer || 0, p.passenger, p.side || 1); hipY = r[0]; hipZ = r[1];
    } else if (p.mode === 'sit') { // dirigindo: costas no encosto, mãos no volante, pés nos pedais
      const st = p.steer || 0;
      T.thighL = [-1.4, 0, 0.08]; T.thighR = [-1.4, 0, -0.08];
      T.kneeL = [1.05, 0, 0]; T.kneeR = [1.05, 0, 0];
      T.footL = [-0.15, 0, 0]; T.footR = [-0.15, 0, 0];
      T.shoulderL = [-1.18 - st * 0.12, 0, 0.18 + st * 0.2]; T.shoulderR = [-1.18 + st * 0.12, 0, -0.18 + st * 0.2];
      T.elbowL = [-0.42, 0, 0]; T.elbowR = [-0.42, 0, 0];
      T.spine = [-0.12, 0, 0]; T.chest = [0.02, 0, 0]; T.head = [0.08, -st * 0.25, 0];
      hipY = -0.42; hipZ = -0.05;
    } else if (p.mode === 'moto') { // pilotando: pernas abertas nas pedaleiras, tronco inclinado, mãos no guidão
      const lean = p.lean ?? 0.35, st = p.steer || 0;
      T.thighL = [-1.05, 0, 0.32]; T.thighR = [-1.05, 0, -0.32];
      T.kneeL = [1.75, 0, 0]; T.kneeR = [1.75, 0, 0];
      T.footL = [-0.35, 0, 0]; T.footR = [-0.35, 0, 0];
      T.spine = [lean, 0, 0]; T.chest = [lean * 0.3, 0, 0]; T.head = [-lean * 0.9, -st * 0.2, 0];
      T.shoulderL = [-1.1 - lean * 0.6 - st * 0.1, 0, 0.32]; T.shoulderR = [-1.1 - lean * 0.6 + st * 0.1, 0, -0.32];
      T.elbowL = [-0.45, 0, 0]; T.elbowR = [-0.45, 0, 0];
      hipY = -0.1; hipZ = 0;
    } else if (!p.grounded) {
      const up = p.vy > 0 ? 1 : 0;
      T.thighL = [-0.7 * up - 0.25, 0, 0.05]; T.thighR = [-0.15 - 0.2 * (1 - up), 0, -0.05];
      T.kneeL = [1.1 * up + 0.4, 0, 0]; T.kneeR = [0.6, 0, 0];
      T.shoulderL = [-0.6, 0, 0.5]; T.shoulderR = [-0.3, 0, -0.5];
      T.elbowL = [-0.6, 0, 0]; T.elbowR = [-0.5, 0, 0];
      T.spine = [0.12, 0, 0]; T.head = [-0.1, 0, 0];
    } else if (p.crouch) {
      const move = Math.min(1, speed / 0.8);
      this.phase += (speed / 1.1) * Math.PI * 2 * dt;
      const sA = Math.sin(this.phase);
      T.thighL = [-1.0 - sA * 0.3 * move, 0, 0.1]; T.thighR = [-1.0 + sA * 0.3 * move, 0, -0.1];
      T.kneeL = [1.7, 0, 0]; T.kneeR = [1.7, 0, 0]; T.footL = [-0.5, 0, 0]; T.footR = [-0.5, 0, 0];
      T.spine = [0.45, 0, 0]; T.head = [-0.3, 0, 0];
      T.shoulderL = [-0.5, 0, 0.2]; T.shoulderR = [-0.5, 0, -0.2]; T.elbowL = [-1.2, 0, 0]; T.elbowR = [-1.2, 0, 0];
      hipY = -0.42;
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
    if (p.aim) { T.shoulderR = [-1.55, 0, 0.05]; T.elbowR = [-0.05, 0, 0]; T.shoulderL = [-1.35, 0, -0.55]; T.elbowL = [-0.55, 0, 0]; T.chest = [0, 0.1, 0]; T.head = [0, -0.1, 0]; }
    if (p.eat && !p.aim) { // leva o item à boca em mordidas/goles
      const k = Math.max(0, Math.sin(p.eat * 3.2)) ** 0.6;
      T.shoulderR = [-0.3 - 0.3 * k, 0, -0.08 + 0.3 * k]; T.elbowR = [-1.45 - 0.95 * k, 0, 0]; T.head = [-0.06 * k + 0.08, 0, 0];
    }
    if (p.phone) { T.shoulderR = [-0.35, 0, -0.25]; T.elbowR = [-2.4, 0.2, 0]; T.head = [0.05, 0.15, 0.1]; }
    if (this.punchT > 0) {
      this.punchT -= dt;
      const k = Math.sin(Math.min(1, (0.35 - this.punchT) / 0.35) * Math.PI);
      T.shoulderR = [-1.5 * k - 0.2, 0, -0.1]; T.elbowR = [-0.2 - (1 - k) * 1.4, 0, 0];
      T.shoulderL = [-0.6, 0, 0.2]; T.elbowL = [-1.6, 0, 0];
      T.spine = [T.spine[0] + 0.1, -0.35 * k, 0];
    }
    const blendK2 = this.punchT > 0 ? 30 : blendK;
    for (const [k, b] of Object.entries(this.bones)) {
      const c = this.cur[k], t = T[k];
      c.x = damp(c.x, t[0], blendK2, dt); c.y = damp(c.y, t[1], blendK2, dt); c.z = damp(c.z, t[2], blendK2, dt);
      b.rotation.set(c.x, c.y, c.z);
    }
    this.hipY = damp(this.hipY, hipY, 14, dt);
    this.hipZ = damp(this.hipZ, hipZ, 14, dt);
    this.bones.hips.position.set(this.rest.hips.x, this.rest.hips.y + this.hipY, this.rest.hips.z + this.hipZ);
    for (const b of this.boneList) b.updateMatrix();
  }
  // posição sentada calculada: quadril no assento, tronco inclinado para a cabeça caber, pés nos pedais e mãos no volante.
  // cfg está em coordenadas do carro; a raiz do boneco fica em root.position (também do carro) com escala root.scale.
  sitIK(T, cfg, st, passenger, side) {
    const s = this.root.scale.x, rp = this.root.position, R = this.rest;
    const my = (y) => (y - rp.y) / s, mz = (z) => (z - rp.z) / s, mx = (x) => (x - rp.x) / s;
    const hy = my(cfg.hipY), hz = mz(cfg.hipZ), th = cfg.recline;
    // tronco
    T.spine = [-th * 0.75, 0, 0]; T.chest = [-th * 0.25, 0, 0]; T.neck = [th * 0.2, 0, 0]; T.head = [th * 0.3, passenger ? 0 : -st * 0.25, 0];
    // pernas (IK de 2 ossos no plano y-z)
    const a = -R.kneeL.y, b = -R.footL.y;
    for (const sd of ['L', 'R']) {
      const ty = hy + R.thighL.y, tz = hz; // articulação da coxa
      const fy = my(cfg.footY + 0.02) , fz = mz(cfg.footZ - (sd === 'L' ? 0.06 : 0) - (passenger ? 0.05 : 0));
      let dy = fy - ty, dz = fz - tz; let L = Math.hypot(dy, dz); const Lm = (a + b) * 0.995; if (L > Lm) { dy *= Lm / L; dz *= Lm / L; L = Lm; }
      const rd = Math.atan2(-dz, -dy);
      const al = Math.acos(THREE.MathUtils.clamp((a * a + L * L - b * b) / (2 * a * L), -1, 1));
      const ga = Math.acos(THREE.MathUtils.clamp((a * a + b * b - L * L) / (2 * a * b), -1, 1));
      const thr = rd - al, kn = Math.PI - ga;
      T['thigh' + sd] = [thr, 0, sd === 'L' ? 0.07 : -0.07]; T['knee' + sd] = [kn, 0, 0]; T['foot' + sd] = [-(thr + kn) - 0.4, 0, 0];
    }
    if (passenger || !cfg.wheel) { // passageiro: mãos no colo
      T.shoulderL = [-0.55, 0, 0.12]; T.shoulderR = [-0.55, 0, -0.12]; T.elbowL = [-0.95, 0, 0]; T.elbowR = [-0.95, 0, 0];
      return [hy - R.hips.y, hz - R.hips.z];
    }
    // braços: IK até o aro do volante (10h10, girando com a direção)
    const qs = _q1.setFromEuler(_e1.set(T.spine[0], 0, 0)), qc = _q2.copy(qs).multiply(_q3.setFromEuler(_e1.set(T.chest[0], 0, 0)));
    const chestPos = _v1.set(0, hy, hz).add(_v2.copy(R.spine).applyQuaternion(_q4.identity())).add(_v3.copy(R.chest).applyQuaternion(qs));
    const tilt = cfg.wheelTilt, C = _v4.set(mx(cfg.wheel[0]), my(cfg.wheel[1]), mz(cfg.wheel[2]));
    const up = _v5.set(0, Math.cos(tilt), -Math.sin(tilt)), rimR = 0.17 / s;
    const toward = _v6.set(0, Math.sin(tilt), Math.cos(tilt)).multiplyScalar(-0.05 / s); // pulso um pouco antes do aro
    for (const sd of ['L', 'R']) {
      const sg = sd === 'L' ? 1 : -1;
      const sh = _v7.copy(R['shoulder' + sd]).applyQuaternion(qc).add(chestPos);
      const ph = (sd === 'L' ? 0.5 : Math.PI - 0.5) + st * 0.55;
      const H = _v8.copy(C).addScaledVector(_X, Math.cos(ph) * rimR).addScaledVector(up, Math.sin(ph) * rimR).add(toward);
      const la = -R.elbowL.y, lb = -R.handL.y + 0.04;
      const d = _v9.subVectors(H, sh); let Ld = d.length(); const Lmax = (la + lb) * 0.99; if (Ld > Lmax) { H.copy(sh).addScaledVector(d.normalize(), Lmax); d.subVectors(H, sh); Ld = Lmax; }
      const axis = d.clone().normalize();
      const xa = (la * la - lb * lb + Ld * Ld) / (2 * Ld), ha = Math.sqrt(Math.max(0, la * la - xa * xa));
      const pole = new THREE.Vector3(sg * 0.7, -0.75, 0).addScaledVector(axis, -new THREE.Vector3(sg * 0.7, -0.75, 0).dot(axis)).normalize();
      const E = sh.clone().addScaledVector(axis, xa).addScaledVector(pole, ha);
      const u = E.clone().sub(sh).normalize().applyQuaternion(_q4.copy(qc).invert());
      const qSh = new THREE.Quaternion().setFromUnitVectors(_DOWN, u);
      const f = H.clone().sub(E).normalize().applyQuaternion(_q4.copy(qc).multiply(qSh).invert());
      const qEl = new THREE.Quaternion().setFromUnitVectors(_DOWN, f);
      const e1 = new THREE.Euler().setFromQuaternion(qSh), e2 = new THREE.Euler().setFromQuaternion(qEl);
      T['shoulder' + sd] = [e1.x, e1.y, e1.z]; T['elbow' + sd] = [e2.x, e2.y, e2.z]; T['hand' + sd] = [0.2, 0, sg * -0.3];
    }
    return [hy - R.hips.y, hz - R.hips.z];
  }
  land(strength) { this.landT = 0.25 * Math.min(1, strength); }
}
