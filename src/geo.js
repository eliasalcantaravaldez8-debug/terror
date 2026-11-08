// Utilitários de geometria e agrupamento (batching) para desempenho.
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

const _m = new THREE.Matrix4();
const _q = new THREE.Quaternion();
const _e = new THREE.Euler();
const _s = new THREE.Vector3();
const _p = new THREE.Vector3();

export function mat(x = 0, y = 0, z = 0, ry = 0, rx = 0, rz = 0, sx = 1, sy = 1, sz = 1) {
  _e.set(rx, ry, rz, 'YXZ');
  _q.setFromEuler(_e);
  _p.set(x, y, z); _s.set(sx, sy, sz);
  return new THREE.Matrix4().compose(_p, _q, _s);
}

// Caixa com UV em metros (tile = tamanho da textura em metros)
export function box(w, h, d, tu = 1, tv = tu) {
  const g = new THREE.BoxGeometry(w, h, d);
  const uv = g.attributes.uv;
  // ordem das faces: +x, -x, +y, -y, +z, -z (4 vértices cada)
  const dims = [[d, h], [d, h], [w, d], [w, d], [w, h], [w, h]];
  for (let f = 0; f < 6; f++) {
    for (let v = 0; v < 4; v++) {
      const i = f * 4 + v;
      uv.setXY(i, uv.getX(i) * dims[f][0] / tu, uv.getY(i) * dims[f][1] / tv);
    }
  }
  return g;
}

export function plane(w, d, tu = 1, tv = tu) {
  const g = new THREE.PlaneGeometry(w, d);
  g.rotateX(-Math.PI / 2);
  const uv = g.attributes.uv;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * w / tu, uv.getY(i) * d / tv);
  return g;
}

// Telhado de duas águas (prisma) - comprimento ao longo de X
export function gableRoof(w, d, h, overhang = 0.4, tile = 2) {
  const W = w / 2 + overhang, D = d / 2 + overhang;
  const pos = [], uv = [];
  const tri = (a, b, c, ua, ub, uc) => { pos.push(...a, ...b, ...c); uv.push(...ua, ...ub, ...uc); };
  const A = [-W, 0, -D], B = [W, 0, -D], C = [W, 0, D], Dd = [-W, 0, D], E = [-W, h, 0], F = [W, h, 0];
  const slope = Math.hypot(D, h) / tile, len = (2 * W) / tile;
  // lado -z
  tri(A, E, F, [0, 0], [0, slope], [len, slope]); tri(A, F, B, [0, 0], [len, slope], [len, 0]);
  // lado +z
  tri(C, F, E, [0, 0], [0, slope], [len, slope]); tri(C, E, Dd, [0, 0], [len, slope], [len, 0]);
  // empenas
  tri(Dd, E, A, [0, 0], [0.5, 0.5], [1, 0]); tri(B, F, C, [0, 0], [0.5, 0.5], [1, 0]);
  // base
  tri(A, B, C, [0, 0], [1, 0], [1, 1]); tri(A, C, Dd, [0, 0], [1, 1], [0, 1]);
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.computeVertexNormals();
  return g;
}

export function cyl(rt, rb, h, seg = 10) { return new THREE.CylinderGeometry(rt, rb, h, seg); }

function normalize(g) {
  let n = g.index ? g.toNonIndexed() : g;
  for (const k of Object.keys(n.attributes)) {
    if (!['position', 'normal', 'uv', 'color'].includes(k)) n.deleteAttribute(k);
  }
  if (!n.attributes.uv) {
    n.setAttribute('uv', new THREE.Float32BufferAttribute(new Float32Array(n.attributes.position.count * 2), 2));
  }
  if (!n.attributes.normal) n.computeVertexNormals();
  return n;
}

export function colorize(g, color) {
  const c = new THREE.Color(color);
  const n = g.attributes.position.count;
  const arr = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) { arr[i * 3] = c.r; arr[i * 3 + 1] = c.g; arr[i * 3 + 2] = c.b; }
  g.setAttribute('color', new THREE.BufferAttribute(arr, 3));
  return g;
}

// Junta muitas geometrias por material => poucas chamadas de desenho
export class Batcher {
  // áreas de piso duro/construções junto ao chão (usadas para não nascer grama em cima)
  static hardGrid = new Map(); static HARD_CELL = 8; static soft = new Set(); static recordHard = true;
  static addHard(x0, z0, x1, z1) {
    const C = Batcher.HARD_CELL; const r = [x0, z0, x1, z1];
    for (let i = Math.floor(x0 / C); i <= Math.floor(x1 / C); i++) for (let j = Math.floor(z0 / C); j <= Math.floor(z1 / C); j++) {
      const k = i + ',' + j; let l = Batcher.hardGrid.get(k); if (!l) { l = []; Batcher.hardGrid.set(k, l); } l.push(r);
    }
  }
  constructor() { this.groups = new Map(); }
  add(geometry, material, matrix, color) {
    if (material.isPaint) { color = material.color; material = material.mat; }
    let g = normalize(geometry);
    if (g === geometry) g = geometry.clone();
    if (material.isSign) {
      // remapeia uv 0..1 para a região da placa no atlas
      const r = material.region; const uv = g.attributes.uv;
      for (let i = 0; i < uv.count; i++) {
        const u = Math.min(1, Math.max(0, uv.getX(i))), v = Math.min(1, Math.max(0, uv.getY(i)));
        uv.setXY(i, r.u0 + (r.u1 - r.u0) * u, r.v0 + (r.v1 - r.v0) * v);
      }
      material = material.mat;
    }
    if (matrix) g.applyMatrix4(matrix);
    if (Batcher.recordHard && !Batcher.soft.has(material)) {
      g.computeBoundingBox(); const b = g.boundingBox;
      if (b.min.y < 0.4 && b.max.y > 0.158) Batcher.addHard(b.min.x, b.min.z, b.max.x, b.max.z); // acima do nível do gramado
    }
    if (material.vertexColors) colorize(g, color ?? 0xffffff);
    else if (g.attributes.color) g.deleteAttribute('color');
    if (!this.groups.has(material)) this.groups.set(material, []);
    this.groups.get(material).push(g);
  }
  flush(parent, opts = {}) {
    const meshes = [];
    for (const [material, list] of this.groups) {
      if (!list.length) continue;
      const merged = mergeGeometries(list, false);
      list.forEach((g) => g.dispose());
      merged.computeBoundingSphere();
      const mesh = new THREE.Mesh(merged, material);
      const cast = material.userData.castShadow ?? opts.castShadow ?? true;
      mesh.castShadow = cast;
      mesh.receiveShadow = material.userData.receiveShadow ?? true;
      mesh.matrixAutoUpdate = false;
      mesh.updateMatrix();
      parent.add(mesh);
      meshes.push(mesh);
    }
    this.groups.clear();
    return meshes;
  }
}
