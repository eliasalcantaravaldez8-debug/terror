// Cachorros e gatos: malha única com esqueleto (1 chamada de desenho por animal), formas anatômicas
// (peito fundo, cintura, ancas, joelho e jarrete, focinho), pelagem por raça com cor por vértice + textura de pelo.
// Animação: andar (trote), correr (galope), parado (respira, abana o rabo, ofega), sentar e deitar.
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
const GEO_CACHE = {};

const damp = (a, b, k, dt) => a + (b - a) * (1 - Math.exp(-k * dt));
const rr = (a, b) => a + Math.random() * (b - a);

// textura de pelo: fios finos claros/escuros sobre cinza claro (multiplica a cor de cada parte)
let furTex = null;
function fur() {
  if (furTex) return furTex;
  const c = document.createElement('canvas'); c.width = c.height = 256; const g = c.getContext('2d');
  g.fillStyle = '#d8d8d8'; g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 5200; i++) {
    const x = Math.random() * 256, y = Math.random() * 256, l = 3 + Math.random() * 7, a = Math.PI / 2 + (Math.random() - 0.5) * 0.6;
    const v = Math.random() < 0.5 ? 255 : 120 + Math.random() * 60;
    g.strokeStyle = `rgba(${v},${v},${v},${0.18 + Math.random() * 0.25})`; g.lineWidth = 0.6 + Math.random() * 0.8;
    g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(a) * l, y + Math.sin(a) * l); g.stroke();
  }
  furTex = new THREE.CanvasTexture(c); furTex.wrapS = furTex.wrapT = THREE.RepeatWrapping; furTex.colorSpace = THREE.SRGBColorSpace; furTex.anisotropy = 4;
  return furTex;
}
let MAT = null;
function mat() { if (!MAT) MAT = new THREE.MeshLambertMaterial({ vertexColors: true }); return MAT; }

// raças (cores da pelagem por região do corpo)
const C = (h) => new THREE.Color(h);
export const BREEDS = {
  caramelo: { sp: 'dog', name: 'vira-lata caramelo', size: 1.0, ear: 'semi', base: 0xb98a55, light: 0xe2c9a0, dark: 0x7e5a36, tail: 'dog', eye: 0x3a2210 },
  labrador: { sp: 'dog', name: 'labrador', size: 1.12, ear: 'flop', base: 0x2a2622, light: 0x36302b, dark: 0x1a1714, tail: 'otter', eye: 0x3a2210 },
  dourado: { sp: 'dog', name: 'labrador dourado', size: 1.1, ear: 'flop', base: 0xd2aa72, light: 0xeedcb8, dark: 0xb08a58, tail: 'otter', eye: 0x3a2210 },
  pastor: { sp: 'dog', name: 'pastor-alemão', size: 1.18, ear: 'up', base: 0xa87a4c, light: 0xcfa878, dark: 0x1c1712, tail: 'brush', eye: 0x4a2a10, saddle: true },
  beagle: { sp: 'dog', name: 'beagle', size: 0.78, ear: 'flop', base: 0xa86e3e, light: 0xf4f0e8, dark: 0x1a1612, tail: 'dog', eye: 0x3a2210, saddle: true, tri: true },
  laranja: { sp: 'cat', name: 'gato laranja', size: 1.0, base: 0xd29a5e, light: 0xf2dcb8, dark: 0xa86a32, stripes: true, eye: 0xc8a020 },
  preto: { sp: 'cat', name: 'gato preto', size: 1.0, base: 0x161616, light: 0x222222, dark: 0x0c0c0c, eye: 0x9ab820 },
  cinza: { sp: 'cat', name: 'gato cinza', size: 0.95, base: 0x8c8c8a, light: 0xd0cec8, dark: 0x4e4e4c, stripes: true, eye: 0x7ab040 },
  frajola: { sp: 'cat', name: 'gato frajola', size: 1.0, base: 0x141414, light: 0xf4f4f0, dark: 0x0c0c0c, tux: true, eye: 0xc8b030 },
  siames: { sp: 'cat', name: 'gato siamês', size: 0.95, base: 0xe6d8c0, light: 0xf2ead8, dark: 0x3e2a20, points: true, eye: 0x4a8ae0 },
};
export const DOG_NAMES = ['Caramelo', 'Thor', 'Pandora', 'Bob', 'Luna', 'Pipoca', 'Rex', 'Mel', 'Paçoca', 'Fred'];
export const CAT_NAMES = ['Mingau', 'Nina', 'Tom', 'Mia', 'Frida', 'Salem', 'Bolinha', 'Félix', 'Tigrinho', 'Lua'];

export class Animal {
  constructor(breedKey) {
    const B = this.breed = BREEDS[breedKey]; this.breedKey = breedKey; this.dog = B.sp === 'dog';
    const k = B.size * (this.dog ? 1 : 0.5);
    // proporções (cachorro médio ~52 cm na cernelha; gato ~25 cm)
    const P = this.P = this.dog
      ? { legH: 0.3 * k, len: 0.62 * k, girth: 0.31 * k, neck: 0.2 * k, head: 0.125 * k, snout: 0.12 * k, tail: 0.36 * k }
      : { legH: 0.32 * k, len: 0.66 * k, girth: 0.32 * k, neck: 0.12 * k, head: 0.15 * k, snout: 0.035 * k, tail: 0.6 * k };
    this.root = new THREE.Group(); this.root.isAnimal = true;
    this.bones = {}; const bones = [];
    const bn = (name, parent, x, y, z) => { const b = new THREE.Bone(); b.name = name; b.position.set(x, y, z); if (parent) parent.add(b); this.bones[name] = b; bones.push(b); return b; };
    const bodyY = P.legH + P.girth * 0.42; this.bodyY = bodyY;
    const body = bn('body', null, 0, bodyY, 0);
    const chest = bn('chest', body, 0, 0.02 * k, P.len * 0.28);
    const neck = bn('neck', chest, 0, P.girth * 0.25, P.len * 0.16);
    const head = bn('head', neck, 0, P.neck * 0.8, P.neck * (this.dog ? 0.45 : 0.3));
    const jaw = bn('jaw', head, 0, -P.head * 0.35, P.head * 0.35);
    const earL = bn('earL', head, P.head * 0.55, P.head * 0.6, -P.head * 0.15), earR = bn('earR', head, -P.head * 0.55, P.head * 0.6, -P.head * 0.15);
    const hips = bn('hips', body, 0, 0.0, -P.len * 0.3);
    // pernas: dianteiras retas; traseiras com joelho para frente e jarrete para trás
    const fa = (P.legH + P.girth * 0.12) * 0.52, fb = (P.legH + P.girth * 0.12) * 0.48;
    const ha = P.legH * 0.55 / Math.cos(0.35), hb = P.legH * 0.62 / Math.cos(0.5);
    for (const [s, n] of [[1, 'L'], [-1, 'R']]) {
      const sh = bn('shoulder' + n, chest, s * P.girth * 0.3, -P.girth * 0.18, 0.02 * k);
      const el = bn('elbow' + n, sh, 0, -fa, 0); bn('pawF' + n, el, 0, -fb, 0);
      const hp = bn('hip' + n, hips, s * P.girth * 0.3, -P.girth * 0.08, 0);
      const hk = bn('hock' + n, hp, 0, -ha, 0); bn('pawH' + n, hk, 0, -hb, 0);
    }
    this.ha = ha; this.hb = hb;
    // rabo: 6 segmentos
    let tp = hips; const tseg = P.tail / 6;
    for (let i = 0; i < 6; i++) tp = bn('tail' + i, tp, 0, i === 0 ? P.girth * 0.18 : 0, i === 0 ? -P.girth * 0.38 : -tseg);
    this.tseg = tseg;
    // pose de descanso (antes de gerar a malha): ângulos das traseiras e do rabo
    this.bones.hipL.rotation.x = this.bones.hipR.rotation.x = -0.35;
    this.bones.hockL.rotation.x = this.bones.hockR.rotation.x = 0.85;
    this.bones.pawHL.rotation.x = this.bones.pawHR.rotation.x = -0.5;
    body.updateMatrixWorld(true);
    // ---------- malha (gerada uma vez por raça e compartilhada) ----------
    if (Animal.onlyRig) { this.bonesArr = bones; this.D = { fa, fb, ha, hb, tseg, k }; return; } // só o esqueleto (para gerar a malha aos poucos)
    const geo = GEO_CACHE[breedKey] || (GEO_CACHE[breedKey] = this.buildGeometry(bones, { fa, fb, ha, hb, tseg, k }));
    // malha ligada ao esqueleto na pose de descanso
    const mesh = new THREE.SkinnedMesh(geo, mat()); mesh.add(body);
    body.updateMatrixWorld(true);
    mesh.bind(new THREE.Skeleton(bones), new THREE.Matrix4());
    mesh.castShadow = true; mesh.receiveShadow = false; mesh.frustumCulled = true;
    this.mesh = mesh; this.root.add(mesh); this.boneList = bones;
    for (const b of bones) b.matrixAutoUpdate = false;
    this.rest = {}; for (const b of bones) this.rest[b.name] = { p: b.position.clone(), r: b.rotation.clone() };
    this.cur = {}; for (const b of bones) this.cur[b.name] = b.rotation.clone();
    this.bodyY = bodyY; this.phase = Math.random() * 6; this.t = Math.random() * 10; this.sitK = 0; this.lieK = 0; this.wagAmp = 0.25; this.speed = 0; this.pant = 0;
  }
  // corpo = superfície implícita (união suave de elipsoides e cones arredondados) => silhueta orgânica, sem "bolinhas"
  // detalhes finos (orelhas, olhos, nariz, língua, bigodes) = peças à parte presas ao osso
  *buildGeometryIter(bones, D) {
    const P = this.P, B = this.breed, dog = this.dog, g = P.girth, L = P.len, H = P.head, k = D.k;
    const W = (n) => new THREE.Vector3().setFromMatrixPosition(this.bones[n].matrixWorld);
    const loc = (n, x, y, z) => new THREE.Vector3(x, y, z).applyMatrix4(this.bones[n].matrixWorld);
    const bi = (n) => bones.indexOf(this.bones[n]);
    const prims = []; // {type:'e'|'c', ..., bone, part}
    const ell = (bone, part, c, r) => prims.push({ t: 'e', c, r, bone: bi(bone), part, mr: Math.min(r.x, r.y, r.z) });
    const cone = (bone, part, a, b2, ra, rb, bone2) => prims.push({ t: 'c', a, b: b2, ra, rb, bone: bi(bone), bone2: bone2 ? bi(bone2) : -1, part });
    const V = (x, y, z) => new THREE.Vector3(x, y, z);
    // tronco
    ell('chest', 'body', loc('chest', 0, dog ? -0.015 * k : 0, 0.0), V(g * 0.47, g * (dog ? 0.6 : 0.5), L * 0.33));
    ell('body', 'body', loc('body', 0, dog ? 0.035 * k : 0.005 * k, -0.02 * k), V(g * (dog ? 0.37 : 0.43), g * (dog ? 0.4 : 0.45), L * 0.32));
    ell('hips', 'body', loc('hips', 0, 0.005 * k, -0.01 * k), V(g * 0.42, g * 0.47, L * 0.24));
    // pescoço, crânio, bochechas, focinho e mandíbula
    cone('neck', 'neck', loc('chest', 0, g * 0.18, L * 0.18), loc('head', 0, -H * 0.25, -H * 0.35), g * (dog ? 0.3 : 0.32), g * (dog ? 0.21 : 0.26), 'head');
    ell('head', 'head', loc('head', 0, 0, -H * 0.05), V(H * (dog ? 0.95 : 1.04), H * (dog ? 0.88 : 0.9), H * (dog ? 1.05 : 0.95)));
    if (dog) {
      ell('head', 'cheek', loc('head', 0, -H * 0.3, H * 0.25), V(H * 0.8, H * 0.62, H * 0.75));
      cone('head', 'snout', loc('head', 0, -H * 0.2, H * 0.45), loc('head', 0, -H * 0.3, H * 0.62 + P.snout), H * 0.47, H * 0.32);
      cone('jaw', 'jaw', loc('jaw', 0, 0, 0.0), loc('jaw', 0, -H * 0.02, P.snout * 0.85), H * 0.3, H * 0.2);
    } else {
      for (const s of [1, -1]) ell('head', 'cheek', loc('head', s * H * 0.42, -H * 0.3, H * 0.4), V(H * 0.5, H * 0.42, H * 0.45));
      ell('head', 'snout', loc('head', 0, -H * 0.3, H * 0.7), V(H * 0.44, H * 0.32, H * 0.3));
      ell('jaw', 'jaw', loc('jaw', 0, -H * 0.1, H * 0.25), V(H * 0.28, H * 0.16, H * 0.25));
    }
    // pernas (cones arredondados entre as articulações) e patas
    for (const n of ['L', 'R']) {
      cone('shoulder' + n, 'leg', loc('shoulder' + n, 0, g * 0.12, 0.0), W('elbow' + n), g * (dog ? 0.23 : 0.21), g * (dog ? 0.13 : 0.13));
      cone('elbow' + n, 'legLow', W('elbow' + n), W('pawF' + n), g * (dog ? 0.115 : 0.12), g * (dog ? 0.095 : 0.1));
      ell('pawF' + n, 'paw', loc('pawF' + n, 0, g * 0.025, g * 0.05), V(g * 0.12, g * 0.075, g * 0.16));
      cone('hip' + n, 'thigh', loc('hip' + n, 0, g * 0.05, -g * 0.02), W('hock' + n), g * 0.28, g * (dog ? 0.1 : 0.11));
      ell('hip' + n, 'thigh', loc('hip' + n, 0, -D.ha * 0.32, 0.0), V(g * 0.22, D.ha * 0.45, g * 0.3));
      cone('hock' + n, 'legLow', W('hock' + n), W('pawH' + n), g * (dog ? 0.105 : 0.11), g * (dog ? 0.09 : 0.095));
      ell('pawH' + n, 'paw', loc('pawH' + n, 0, g * 0.025, g * 0.05), V(g * 0.12, g * 0.075, g * 0.16));
    }
    // rabo
    const tb = B.tail === 'otter' ? 0.17 : B.tail === 'brush' ? 0.16 : dog ? 0.11 : 0.1;
    for (let i = 0; i < 6; i++) {
      const a = W('tail' + i), b2 = i < 5 ? W('tail' + (i + 1)) : loc('tail5', 0, 0, -D.tseg);
      const r0 = g * tb * (1 - (i / 6) * (dog ? 0.7 : 0.3)), r1 = g * tb * (1 - ((i + 1) / 6) * (dog ? 0.7 : 0.3));
      cone('tail' + i, 'tail', a, b2, Math.max(0.008, r0) * (B.tail === 'brush' && i > 0 ? 1.35 : 1), Math.max(0.006, r1) * (B.tail === 'brush' && i > 1 ? 1.3 : 1));
    }
    // SDFs
    const _p = new THREE.Vector3(), _q = new THREE.Vector3(), _ba = new THREE.Vector3();
    const sd = (pr, p) => {
      if (pr.t === 'e') { _q.subVectors(p, pr.c); const k0 = Math.hypot(_q.x / pr.r.x, _q.y / pr.r.y, _q.z / pr.r.z); return (k0 - 1) * pr.mr; }
      _ba.subVectors(pr.b, pr.a); _q.subVectors(p, pr.a); const h = THREE.MathUtils.clamp(_q.dot(_ba) / _ba.lengthSq(), 0, 1);
      return _q.addScaledVector(_ba, -h).length() - (pr.ra + (pr.rb - pr.ra) * h);
    };
    const smin = (a, b2, kk) => { const h = Math.max(kk - Math.abs(a - b2), 0) / kk; return Math.min(a, b2) - h * h * kk * 0.25; };
    // a união suave só junta partes vizinhas (pernas não grudam umas nas outras)
    const KB = 0.045 * k * (dog ? 1 : 0.8), KL = 0.018 * k;
    const legLike = (pr) => pr.part === 'legLow' || pr.part === 'paw';
    // caixa de cada peça (só as peças perto do ponto entram na conta => bem mais rápido)
    for (const pr of prims) { const bb = new THREE.Box3(); if (pr.t === 'e') { bb.expandByPoint(_p.copy(pr.c).add(pr.r)); bb.expandByPoint(_p.copy(pr.c).sub(pr.r)); } else { for (const [pt, r] of [[pr.a, pr.ra], [pr.b, pr.rb]]) { bb.expandByPoint(_p.copy(pt).addScalar(r)); bb.expandByPoint(_p.copy(pt).addScalar(-r)); } } bb.expandByScalar(KB + 0.01); pr.bb = bb; }
    const field = (p) => { let dB = 0.2, dL = 0.2; for (const pr of prims) { const b4 = pr.bb; if (p.x < b4.min.x || p.x > b4.max.x || p.y < b4.min.y || p.y > b4.max.y || p.z < b4.min.z || p.z > b4.max.z) continue; const d = sd(pr, p); if (legLike(pr)) dL = smin(dL, d, KL); else dB = smin(dB, d, KB); } return smin(dB, dL, KL); };
    // grade
    const box = new THREE.Box3(); for (const pr of prims) { if (pr.t === 'e') { box.expandByPoint(_p.copy(pr.c).add(pr.r)); box.expandByPoint(_p.copy(pr.c).sub(pr.r)); } else { for (const [pt, r] of [[pr.a, pr.ra], [pr.b, pr.rb]]) { box.expandByPoint(_p.copy(pt).addScalar(r)); box.expandByPoint(_p.copy(pt).addScalar(-r)); } } }
    box.expandByScalar(0.03 * k);
    const C = box.getCenter(new THREE.Vector3()), size = box.getSize(new THREE.Vector3()), E = Math.max(size.x, size.y, size.z) / 2 * 1.06;
    // campo amostrado numa grade e malha por "surface nets" (vértices compartilhados, feito em fatias para não travar)
    const res = 70, half = res / 2, R2 = res * res; const F = new Float32Array(res * R2);
    const gp = (i) => (i - half) / half * E;
    for (let z = 0; z < res; z++) { for (let y = 0; y < res; y++) for (let x = 0; x < res; x++) { _p.set(C.x + gp(x), C.y + gp(y), C.z + gp(z)); F[x + y * res + z * R2] = -field(_p); } yield; }
    const cellV = new Int32Array(res * R2).fill(-1); const vp = [];
    const E12 = [[0, 1], [2, 3], [4, 5], [6, 7], [0, 2], [1, 3], [4, 6], [5, 7], [0, 4], [1, 5], [2, 6], [3, 7]];
    const cv = new Float32Array(8);
    for (let z = 0; z < res - 1; z++) {
      for (let y = 0; y < res - 1; y++) for (let x = 0; x < res - 1; x++) {
        let mask = 0;
        for (let c = 0; c < 8; c++) { const v = F[(x + (c & 1)) + (y + ((c >> 1) & 1)) * res + (z + (c >> 2)) * R2]; cv[c] = v; if (v > 0) mask |= 1 << c; }
        if (mask === 0 || mask === 255) continue;
        let sx = 0, sy = 0, sz = 0, cnt = 0;
        for (const [a2, b4] of E12) { const va = cv[a2], vb = cv[b4]; if ((va > 0) === (vb > 0)) continue; const t = va / (va - vb);
          sx += (a2 & 1) + ((b4 & 1) - (a2 & 1)) * t; sy += ((a2 >> 1) & 1) + (((b4 >> 1) & 1) - ((a2 >> 1) & 1)) * t; sz += (a2 >> 2) + ((b4 >> 2) - (a2 >> 2)) * t; cnt++; }
        cellV[x + y * res + z * R2] = vp.length / 3; vp.push(C.x + gp(x + sx / cnt), C.y + gp(y + sy / cnt), C.z + gp(z + sz / cnt));
      }
      if (z % 2) yield;
    }
    const idx = [];
    const quad = (a2, b4, c, d, flip) => { if (a2 < 0 || b4 < 0 || c < 0 || d < 0) return; if (flip) idx.push(a2, b4, c, a2, c, d); else idx.push(a2, c, b4, a2, d, c); };
    const cid = (x, y, z) => (x < 0 || y < 0 || z < 0 || x >= res - 1 || y >= res - 1 || z >= res - 1) ? -1 : cellV[x + y * res + z * R2];
    for (let z = 1; z < res - 1; z++) {
      for (let y = 1; y < res - 1; y++) for (let x = 1; x < res - 1; x++) {
        const v0 = F[x + y * res + z * R2] > 0;
        if (v0 !== (F[x + 1 + y * res + z * R2] > 0)) quad(cid(x, y - 1, z - 1), cid(x, y, z - 1), cid(x, y, z), cid(x, y - 1, z), v0);
        if (v0 !== (F[x + (y + 1) * res + z * R2] > 0)) quad(cid(x - 1, y, z - 1), cid(x - 1, y, z), cid(x, y, z), cid(x, y, z - 1), v0);
        if (v0 !== (F[x + y * res + (z + 1) * R2] > 0)) quad(cid(x - 1, y - 1, z), cid(x, y - 1, z), cid(x, y, z), cid(x - 1, y, z), v0);
      }
      if (z % 4 === 0) yield;
    }
    const n = vp.length / 3; const pos = new Float32Array(vp);
    const body = new THREE.BufferGeometry(); body.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    body.setIndex(idx); body.computeVertexNormals();
    yield;
    // cor e pesos de cada vértice: até 3 ossos mais próximos com peso suave (juntas dobram sem quebrar)
    const col = new Float32Array(n * 3), si = new Uint16Array(n * 4), sw = new Float32Array(n * 4);
    const noise = (x, y, z) => Math.sin(x * 91.7 + y * 47.3) * Math.sin(y * 63.1 + z * 29.9) * Math.sin(z * 77.7 + x * 13.1);
    for (let i = 0; i < n; i++) {
      if (i % 600 === 599) yield;
      _p.fromArray(pos, i * 3);
      const ds = []; prims.forEach((pr, j) => { const b4 = pr.bb; if (_p.x < b4.min.x - 0.02 || _p.x > b4.max.x + 0.02 || _p.y < b4.min.y - 0.02 || _p.y > b4.max.y + 0.02 || _p.z < b4.min.z - 0.02 || _p.z > b4.max.z + 0.02) return; ds.push([sd(pr, _p), j]); }); if (!ds.length) ds.push([0, 0]); ds.sort((a2, b3) => a2[0] - b3[0]);
      const pr0 = prims[ds[0][1]]; const c = this.coat(_p, pr0.part);
      // variação sutil de pelo (manchinhas e sombreado do pelo), sem textura esticada
      const v = 1 + noise(_p.x * 6, _p.y * 6, _p.z * 6) * 0.05 + noise(_p.x * 40, _p.y * 40, _p.z * 40) * 0.035;
      col[i * 3] = c.r * v; col[i * 3 + 1] = c.g * v; col[i * 3 + 2] = c.b * v;
      const wb = new Map();
      for (let t = 0; t < Math.min(3, ds.length); t++) {
        const pr = prims[ds[t][1]]; const w = Math.exp(-(ds[t][0] - ds[0][0]) / (0.012 * k));
        let bone = pr.bone;
        if (pr.t === 'c' && pr.bone2 >= 0) { _ba.subVectors(pr.b, pr.a); const h = THREE.MathUtils.clamp(_q.subVectors(_p, pr.a).dot(_ba) / _ba.lengthSq(), 0, 1); wb.set(pr.bone2, (wb.get(pr.bone2) || 0) + w * h); wb.set(bone, (wb.get(bone) || 0) + w * (1 - h)); continue; }
        wb.set(bone, (wb.get(bone) || 0) + w);
      }
      const arr = [...wb.entries()].sort((a2, b3) => b3[1] - a2[1]).slice(0, 4); const tot = arr.reduce((s2, e) => s2 + e[1], 0);
      arr.forEach(([b3, w], j) => { si[i * 4 + j] = b3; sw[i * 4 + j] = w / tot; });
    }
    body.setAttribute('color', new THREE.BufferAttribute(col, 3)); body.setAttribute('skinIndex', new THREE.BufferAttribute(si, 4)); body.setAttribute('skinWeight', new THREE.BufferAttribute(sw, 4));
    // ---- detalhes rígidos ----
    const parts = [body]; const tmp = new THREE.Vector3();
    const add = (bone, geo, part, m) => {
      let gg = geo.index ? geo.toNonIndexed() : geo.clone();
      for (const a2 of Object.keys(gg.attributes)) if (!['position', 'normal'].includes(a2)) gg.deleteAttribute(a2);
      gg.applyMatrix4(m); const pp = gg.attributes.position, nn = pp.count, cc = new Float32Array(nn * 3);
      for (let i = 0; i < nn; i++) { tmp.fromBufferAttribute(pp, i); const c = this.coat(tmp, part); cc[i * 3] = c.r; cc[i * 3 + 1] = c.g; cc[i * 3 + 2] = c.b; }
      gg.setAttribute('color', new THREE.BufferAttribute(cc, 3));
      const s2 = new Uint16Array(nn * 4), w2 = new Float32Array(nn * 4); const b4 = bones.indexOf(this.bones[bone]);
      for (let i = 0; i < nn; i++) { s2[i * 4] = b4; w2[i * 4] = 1; }
      gg.setAttribute('skinIndex', new THREE.BufferAttribute(s2, 4)); gg.setAttribute('skinWeight', new THREE.BufferAttribute(w2, 4)); parts.push(gg);
    };
    const at = (bone, x = 0, y = 0, z = 0, sx = 1, sy = 1, sz = 1, rx = 0, ry = 0, rz = 0) => new THREE.Matrix4().multiplyMatrices(this.bones[bone].matrixWorld,
      new THREE.Matrix4().compose(new THREE.Vector3(x, y, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(rx, ry, rz)), new THREE.Vector3(sx, sy, sz)));
    const Sph = (r, w = 14, h = 10) => new THREE.SphereGeometry(r, w, h);
    // orelhas: folha fina com curvatura (cone achatado) — de pé, semi-caídas ou caídas
    const earGeo = (w, h, th) => { const gg = new THREE.ConeGeometry(w, h, 10, 3, false, 0, Math.PI); gg.scale(1, 1, th); return gg; };
    if (dog) {
      for (const [s, eb] of [[1, 'earL'], [-1, 'earR']]) {
        if (B.ear === 'up') add(eb, earGeo(H * 0.4, H * 1.2, 0.35), 'ear', at(eb, 0, H * 0.5, 0, 1, 1, 1, -0.15, Math.PI, s * -0.18));
        else if (B.ear === 'semi') { add(eb, earGeo(H * 0.36, H * 0.75, 0.3), 'ear', at(eb, 0, H * 0.3, 0, 1, 1, 1, -0.1, Math.PI, s * -0.3)); add(eb, earGeo(H * 0.22, H * 0.38, 0.3), 'ear', at(eb, s * -H * 0.06, H * 0.58, H * 0.14, 1, 1, 1, 1.1, Math.PI, s * -0.3)); }
        else add(eb, Sph(H * 0.5, 12, 10), 'ear', at(eb, s * H * 0.14, -H * 0.45, 0.0, 0.22, 1.25, 0.72, 0, 0, s * 0.12));
      }
      add('head', Sph(H * 0.2), 'nose', at('head', 0, -H * 0.16, H * 0.62 + P.snout * 1.02, 1.2, 0.8, 0.85));
      for (const s of [1, -1]) { add('head', Sph(H * 0.15), 'eye', at('head', s * H * 0.4, H * 0.18, H * 0.66)); add('head', Sph(H * 0.045, 6, 5), 'eyeHi', at('head', s * H * 0.43, H * 0.25, H * 0.79)); }
      add('jaw', new THREE.BoxGeometry(H * 0.32, H * 0.05, P.snout * 0.95), 'tongue', at('jaw', 0, H * 0.04, P.snout * 0.6, 1, 1, 1, 0.2, 0, 0));
    } else {
      for (const [s, eb] of [[1, 'earL'], [-1, 'earR']]) { add(eb, earGeo(H * 0.42, H * 0.78, 0.4), 'ear', at(eb, -s * H * 0.02, H * 0.3, 0, 1, 1, 1, -0.12, Math.PI, s * -0.3)); add(eb, earGeo(H * 0.28, H * 0.55, 0.2), 'innerEar', at(eb, -s * H * 0.02, H * 0.27, H * 0.04, 1, 1, 1, -0.12, Math.PI, s * -0.3)); }
      add('head', Sph(H * 0.1, 8, 6), 'nose', at('head', 0, -H * 0.16, H * 0.98, 1.2, 0.7, 0.7));
      for (const s of [1, -1]) {
        add('head', Sph(H * 0.22, 16, 12), 'eye', at('head', s * H * 0.4, H * 0.1, H * 0.74, 1.05, 0.85, 0.55));
        add('head', Sph(H * 0.21, 8, 8), 'pupil', at('head', s * H * 0.4, H * 0.1, H * 0.8, 0.26, 0.82, 0.5));
        add('head', Sph(H * 0.05, 6, 5), 'eyeHi', at('head', s * H * 0.46, H * 0.19, H * 0.85));
        for (const w of [-1, 0, 1]) add('head', new THREE.CylinderGeometry(0.0012, 0.0006, H * 1.7, 3), 'whisker', at('head', s * H * 0.8, -H * 0.32 + w * H * 0.05, H * 0.86, 1, 1, 1, 0, w * 0.15, s * (Math.PI / 2 + 0.12 * w)));
      }
    }
    parts[0] = parts[0].toNonIndexed();
    const geo = mergeGeometries(parts, false);
    geo.computeBoundingSphere(); geo.boundingSphere.radius = Math.max(0.5, L);
    return geo;
  }
  buildGeometry(bones, D) { const it = this.buildGeometryIter(bones, D); let r; while (!(r = it.next()).done); return r.value; }
  // cor da pelagem no ponto p (coordenadas do animal, +z = frente) para a parte do corpo
  coat(p, part) {
    const B = this.breed, P = this.P;
    if (part === 'eye') return this.dog ? C(B.eye) : C(B.eye);
    if (part === 'pupil') return C(0x050505);
    if (part === 'eyeHi') return C(0xffffff);
    if (part === 'nose') return C(this.dog ? 0x141210 : (B.base === 0x161616 || B.tux ? 0x1a1a1a : B.points ? 0x3a2a24 : 0xc87a7a));
    if (part === 'tongue') return C(0xd85a6a);
    if (part === 'innerEar') return C(B.points ? 0x6a4a3a : 0xd89a9a);
    if (part === 'whisker') return C(0xf4f4f4);
    const top = this.bodyY + P.girth * 0.15; // linha do dorso
    let c = C(B.base);
    const below = p.y < this.bodyY - P.girth * 0.18; // barriga/peito
    if (this.dog) {
      if (B.saddle && (part === 'body' || part === 'neck' || part === 'tail') && p.y > top - P.girth * 0.12 && p.z < P.len * 0.35) c = C(B.dark);
      if (below && (part === 'body' || part === 'neck')) c = C(B.light);
      if (part === 'legLow' || part === 'paw') c = B.tri ? C(B.light) : c.clone().lerp(C(B.light), 0.45);
      if (part === 'snout' || part === 'jaw') c = B.tri ? C(B.light) : C(B.saddle ? B.dark : B.base).lerp(C(B.dark), 0.25);
      if (part === 'cheek' && B.saddle && !B.tri) c = C(B.dark).lerp(C(B.base), 0.3);
      if (part === 'brow') c = B.saddle && !B.tri ? C(B.base).lerp(C(B.light), 0.4) : C(B.base);
      if (part === 'ear') c = B.saddle && !B.tri ? C(B.dark) : C(B.base).lerp(C(B.dark), 0.35);
      if (part === 'tail' && B.tri && p.z < -P.len * 0.3 - P.tail * 0.75) c = C(B.light); // ponta branca do beagle
      if (B.tri && part === 'neck' && p.y < this.bodyY + P.girth * 0.3) c = C(B.light);
    } else {
      if (B.stripes && (part === 'body' || part === 'tail' || part === 'head' || part === 'leg' || part === 'thigh')) {
        const s = Math.sin(p.z * 70 + Math.sin(p.x * 30) * 1.5) * 0.5 + 0.5; if (s > 0.62 && !below) c = C(B.dark).lerp(C(B.base), 0.2);
      }
      if (below || part === 'cheek' || part === 'snout' || part === 'jaw') c = c.clone().lerp(C(B.light), B.tux ? 1 : 0.7);
      if (B.tux && (part === 'paw' || part === 'legLow') ) c = C(B.light);
      if (B.tux && part === 'cheek') c = C(B.base);
      if (B.points && (part === 'snout' || part === 'ear' || part === 'paw' || part === 'legLow' || part === 'tail' || part === 'jaw' || part === 'cheek')) c = C(B.dark).lerp(C(B.base), 0.15);
    }
    return c;
  }
  setRot(name, x, y, z, k, dt) { const c = this.cur[name]; c.x = damp(c.x, x, k, dt); c.y = damp(c.y, y, k, dt); c.z = damp(c.z, z, k, dt); }
  // anima conforme a velocidade (m/s) e o estado: 'stand' | 'sit' | 'lie'; look: ângulo da cabeça; wag: 0..1 felicidade
  animate(dt, o) {
    const P = this.P, R = this.rest; this.t += dt;
    const sp = o.speed || 0; const run = Math.min(1, Math.max(0, (sp - 1.8) / 2));
    const stride = this.dog ? (0.55 + run * 0.5) * this.breed.size : 0.42 * this.breed.size;
    this.phase += dt * sp / stride * Math.PI;
    const ph = this.phase, mv = Math.min(1, sp / 0.5);
    const sitT = o.pose === 'sit' ? 1 : 0, lieT = o.pose === 'lie' ? 1 : 0;
    this.sitK = damp(this.sitK, sitT, 4, dt); this.lieK = damp(this.lieK, lieT, 3, dt);
    const sk = this.sitK, lk = this.lieK;
    const K = 14;
    // pernas: trote (diagonais juntas) ou galope (dianteiras juntas, traseiras juntas)
    const legs = [['L', 0, 0], ['R', Math.PI, Math.PI]];
    for (const [n, oF, oH] of legs) {
      const fOff = run > 0.5 ? (n === 'L' ? 0 : 0.5) : oF, hOff = run > 0.5 ? Math.PI + (n === 'L' ? 0 : 0.5) : oH + Math.PI;
      const sF = Math.sin(ph + fOff), cF = Math.cos(ph + fOff), sH = Math.sin(ph + hOff), cH = Math.cos(ph + hOff);
      const amp = (0.38 + run * 0.35) * mv;
      let shx = sF * amp, elx = Math.max(0, cF) * (0.9 + run * 0.5) * mv;
      let hpx = R['hip' + n].r.x + sH * amp, hkx = R['hock' + n].r.x + Math.max(0, cH) * (0.55 + run * 0.4) * mv, pwx = R['pawH' + n].r.x;
      // sentar: traseiras dobradas no chão, dianteiras retas (compensa a inclinação do corpo)
      shx = shx * (1 - sk) + sk * 0.55; elx *= (1 - sk);
      hpx = hpx * (1 - sk) + sk * -1.55; hkx = hkx * (1 - sk) + sk * 2.55; pwx = pwx * (1 - sk) + sk * -1.0;
      // deitar: dianteiras esticadas para frente, traseiras recolhidas
      shx = shx * (1 - lk) + lk * -1.45; elx = elx * (1 - lk) + lk * 0.1;
      hpx = hpx * (1 - lk) + lk * -1.35; hkx = hkx * (1 - lk) + lk * 2.5; pwx = pwx * (1 - lk) + lk * -1.1;
      this.setRot('shoulder' + n, shx, 0, 0, K, dt); this.setRot('elbow' + n, elx, 0, 0, K, dt);
      this.setRot('hip' + n, hpx, 0, (n === 'L' ? -0.08 : 0.08) * lk, K, dt); this.setRot('hock' + n, hkx, 0, 0, K, dt); this.setRot('pawH' + n, pwx, 0, 0, K, dt);
      this.setRot('pawF' + n, -elx * 0.6 - lk * 0.0, 0, 0, K, dt);
    }
    // corpo: balanço, inclinação ao sentar/deitar, respiração
    const bob = Math.abs(Math.sin(ph)) * 0.012 * mv * (1 + run * 1.5);
    const breathe = Math.sin(this.t * (this.pant > 0.5 ? 9 : 2.2)) * (this.pant > 0.5 ? 0.012 : 0.006);
    const bodyPitch = -sk * 0.62 + (run > 0.5 ? Math.sin(ph * 2) * 0.06 : 0);
    const bodyDrop = sk * P.legH * 0.55 + lk * (P.legH * 0.9 + P.girth * 0.05);
    this.setRot('body', bodyPitch, 0, 0, 8, dt);
    const b = this.bones.body; b.position.set(R.body.p.x, R.body.p.y - bodyDrop + bob, R.body.p.z - sk * P.len * 0.25);
    this.setRot('chest', breathe * 2 - lk * 0.0, 0, 0, 10, dt);
    // cabeça olha para o alvo; ao deitar apoia mais baixo
    const look = THREE.MathUtils.clamp(o.look || 0, -1.1, 1.1);
    this.setRot('neck', (this.dog ? -0.15 : 0.0) + sk * 0.35 + lk * 0.7 + run * 0.35, look * 0.5, 0, 6, dt);
    this.setRot('head', -sk * 0.15 - lk * 0.45 + Math.sin(ph * 2) * 0.03 * mv, look * 0.5, Math.sin(this.t * 0.7) * 0.05 * (1 - mv), 6, dt);
    // boca: ofegante (cachorro com calor ou depois de correr)
    this.pant = damp(this.pant, this.dog && (run > 0.3 || o.happy > 0.5 || o.pant) ? 1 : 0, 1.5, dt);
    this.setRot('jaw', this.dog ? this.pant * (0.35 + Math.sin(this.t * 9) * 0.06) : (o.meow ? 0.35 : 0), 0, 0, 12, dt);
    // orelhas: mexem de leve; para trás quando foge
    const earBack = o.scared ? 0.6 : 0;
    this.setRot('earL', -earBack + Math.sin(this.t * 1.3) * 0.05, 0, 0, 8, dt); this.setRot('earR', -earBack + Math.sin(this.t * 1.1 + 1) * 0.05, 0, 0, 8, dt);
    // rabo: cachorro abana (mais rápido quando feliz); gato levanta o rabo em curva e balança devagar
    const happy = o.happy || 0;
    for (let i = 0; i < 6; i++) {
      let x, y;
      if (this.dog) {
        const up = o.scared ? 0.9 : -0.55 - happy * 0.35 + lk * 0.9 + sk * 0.7; // negativo = para cima
        x = (i === 0 ? up : 0.12) + (this.breed.tail === 'otter' ? 0.05 : 0); y = Math.sin(this.t * (6 + happy * 10)) * (0.18 + happy * 0.35) * (i === 0 ? 1 : 0.35) * (1 - lk * 0.7);
      } else {
        const curl = mv > 0.2 ? 1 : (1 - sk) * 0.6;
        x = i === 0 ? (o.scared ? 0.6 : -1.25 * curl + (1 - curl) * 0.9) : (o.scared ? 0.1 : 0.1 + curl * 0.12 + (1 - curl) * 0.05);
        y = Math.sin(this.t * 1.6 - i * 0.6) * (0.12 + (1 - curl) * 0.2);
      }
      this.setRot('tail' + i, x, y, 0, 9, dt);
    }
    for (const bn of this.boneList) { const c = this.cur[bn.name]; bn.rotation.set(c.x, c.y, c.z); bn.updateMatrix(); }
  }
}

// gera as malhas das raças em segundo plano, alguns milissegundos por quadro (sem travar o jogo)
let warm = null;
export function breedReady(k) { return !!GEO_CACHE[k]; }
export function warmBreeds(budgetMs = 6) {
  const t0 = performance.now();
  while (performance.now() - t0 < budgetMs) {
    if (!warm) { const k = Object.keys(BREEDS).find((b) => !GEO_CACHE[b]); if (!k) return true; Animal.onlyRig = true; const a = new Animal(k); Animal.onlyRig = false; warm = { k, it: a.buildGeometryIter(a.bonesArr, a.D) }; }
    const r = warm.it.next(); if (r.done) { GEO_CACHE[warm.k] = r.value; warm = null; }
  }
  return false;
}
// ---------------- comportamento (IA simples) ----------------
export class Pet {
  constructor(scene, world, breedKey, x, z, name) {
    this.a = new Animal(breedKey); this.world = world; this.scene = scene; this.name = name; this.dog = this.a.dog;
    this.x = x; this.z = z; this.heading = Math.random() * 6.28; this.home = [x, z]; this.y = world.groundFn(x, z);
    this.state = 'idle'; this.timer = rr(1, 4); this.pose = 'stand'; this.speed = 0; this.happy = 0; this.r = this.dog ? 0.32 * this.a.breed.size : 0.18;
    scene.add(this.a.root); this.sync();
    this.label = (this.dog ? 'cachorro' : 'gato');
  }
  remove() { this.scene.remove(this.a.root); this.removed = true; } // geometria é compartilhada por raça
  sync() { const r = this.a.root; r.position.set(this.x, this.y, this.z); r.rotation.y = this.heading; }
  goTo(tx, tz, sp, dt) {
    const dx = tx - this.x, dz = tz - this.z, d = Math.hypot(dx, dz); if (d < 0.25) return true;
    let want = Math.atan2(dx, dz); let da = want - this.heading; while (da > Math.PI) da -= 2 * Math.PI; while (da < -Math.PI) da += 2 * Math.PI;
    this.heading += THREE.MathUtils.clamp(da, -dt * 4, dt * 4);
    const v = Math.abs(da) > 1.2 ? sp * 0.3 : sp; this.speed = damp(this.speed, v, 6, dt);
    const nx = this.x + Math.sin(this.heading) * this.speed * dt, nz = this.z + Math.cos(this.heading) * this.speed * dt;
    const res = this.world.resolveCircle(nx, nz, this.r, this.y + 0.05, this.y + 0.6, 0.25, null);
    if (res.hit && Math.hypot(res.x - this.x, res.z - this.z) < this.speed * dt * 0.2) this.blocked = (this.blocked || 0) + dt; else this.blocked = 0;
    this.x = res.x; this.z = res.z;
    return this.blocked > 1.2; // preso: desiste do alvo
  }
  // ctx: { player, cars, threat: [x,z]|null, petting }
  update(dt, ctx) {
    const P = ctx.player; const dP = Math.hypot(P.x - this.x, P.z - this.z);
    this.timer -= dt; let look = 0, scared = false, pant = false;
    // perigo: carro rápido chegando ou tiros por perto => foge
    for (const c of ctx.cars) {
      if (Math.abs(c.speed) < 3) continue; const dx = this.x - c.x, dz = this.z - c.z; const d = Math.hypot(dx, dz); if (d > 7) continue;
      const toward = (-dx * c.velX - dz * c.velZ) / (d * Math.abs(c.speed) + 1e-6);
      if (toward > 0.3 || d < 2.4) { this.flee(c.x, c.z, 3.5); if (d < 1.6 && !this.yelped) { this.yelped = true; ctx.sound && ctx.sound(this.dog ? 'yelp' : 'hiss'); const k = 3 / (d + 0.3); this.x += dx / (d || 1) * Math.min(1.2, k * dt * 4); this.z += dz / (d || 1) * Math.min(1.2, k * dt * 4); } }
    }
    if (ctx.threat && Math.hypot(ctx.threat[0] - this.x, ctx.threat[1] - this.z) < 25) this.flee(ctx.threat[0], ctx.threat[1], 5);
    if (!this.dog && P.mode === 'foot' && P.speed > 3.5 && dP < 4 && this.state !== 'flee' && !this.petted) this.flee(P.x, P.z, 2.5);
    if (this.petted > 0) { this.petted -= dt; this.state = 'petted'; }
    switch (this.state) {
      case 'flee': {
        scared = true; const [fx, fz] = this.fleeTo; if (this.goTo(fx, fz, this.dog ? 5 : 4.2, dt) || this.timer <= 0) { this.state = 'idle'; this.timer = rr(2, 5); this.yelped = false; }
        this.pose = 'stand'; break;
      }
      case 'walk': {
        const done = this.goTo(this.target[0], this.target[1], this.dog ? 1.15 : 0.8, dt) || Math.hypot(this.target[0] - this.x, this.target[1] - this.z) < 0.4;
        if (done || this.timer <= 0) { this.state = 'idle'; this.timer = rr(3, 9); this.pose = Math.random() < 0.35 ? 'sit' : Math.random() < 0.4 ? 'lie' : 'stand'; }
        break;
      }
      case 'follow': { // cachorro curioso segue o jogador um pouco
        pant = true;
        if (dP > 2.2) this.goTo(P.x, P.z, dP > 6 ? 3.2 : 1.5, dt); else { this.speed = damp(this.speed, 0, 8, dt); this.face(P.x, P.z, dt); }
        if (this.timer <= 0 || dP > 25 || P.mode !== 'foot') { this.state = 'walk'; this.target = this.home; this.timer = 20; }
        this.pose = 'stand'; break;
      }
      case 'petted': {
        this.speed = damp(this.speed, 0, 8, dt); this.face(P.x, P.z, dt); this.pose = this.dog ? 'sit' : 'lie'; this.happy = 1;
        if (this.petted <= 0) { this.petted = 0; this.state = 'idle'; this.timer = rr(2, 4); if (this.dog && Math.random() < 0.6) { this.state = 'follow'; this.timer = rr(10, 20); } }
        break;
      }
      default: { // parado: olha o jogador se perto; às vezes passeia ao redor de casa
        this.speed = damp(this.speed, 0, 8, dt);
        if (dP < 6 && P.mode === 'foot') { look = this.lookAngle(P.x, P.z); if (this.dog) this.happy = damp(this.happy, 0.8, 2, dt); }
        else this.happy = damp(this.happy, 0, 1, dt);
        if (this.dog && dP < 3.5 && P.mode === 'foot' && Math.random() < dt * 0.15) { this.state = 'follow'; this.timer = rr(8, 16); this.pose = 'stand'; }
        if (this.timer <= 0) {
          const a = Math.random() * 6.28, r = rr(2, this.dog ? 10 : 6);
          this.target = [this.home[0] + Math.sin(a) * r, this.home[1] + Math.cos(a) * r]; this.state = 'walk'; this.timer = 12; this.pose = 'stand';
          if (this.dog && Math.random() < 0.25 && dP < 30) ctx.sound && ctx.sound('bark');
          if (!this.dog && Math.random() < 0.15 && dP < 15) { ctx.sound && ctx.sound('meow'); this.meowT = 0.6; }
        }
      }
    }
    if (this.meowT > 0) this.meowT -= dt;
    this.y = damp(this.y, this.world.groundAt(this.x, this.z, 0.15, this.y + 0.1, 0.3), 12, dt);
    this.a.animate(dt, { speed: this.speed, pose: this.pose, look, happy: this.happy, scared, pant, meow: this.meowT > 0 });
    this.sync();
  }
  face(x, z, dt) { const want = Math.atan2(x - this.x, z - this.z); let da = want - this.heading; while (da > Math.PI) da -= 2 * Math.PI; while (da < -Math.PI) da += 2 * Math.PI; this.heading += THREE.MathUtils.clamp(da, -dt * 3, dt * 3); }
  lookAngle(x, z) { let a = Math.atan2(x - this.x, z - this.z) - this.heading; while (a > Math.PI) a -= 2 * Math.PI; while (a < -Math.PI) a += 2 * Math.PI; return a; }
  flee(x, z, t) { const dx = this.x - x, dz = this.z - z, d = Math.hypot(dx, dz) || 1; this.fleeTo = [this.x + dx / d * 12, this.z + dz / d * 12]; this.state = 'flee'; this.timer = t; this.pose = 'stand'; this.petted = 0; }
  pet() { this.petted = 3.5; this.state = 'petted'; }
}
