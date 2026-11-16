import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

const KEEP = new Set(['position', 'normal', 'uv']);
/** Shared material for plain-coloured parts: colours are baked into vertex colours. */
const FLAT = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.78, metalness: 0.05 });
const _c = new THREE.Color();

function prepare(geo, matrix) {
  let g = geo.index ? geo.toNonIndexed() : geo.clone();
  for (const k of Object.keys(g.attributes)) if (!KEEP.has(k)) g.deleteAttribute(k);
  g.morphAttributes = {};
  if (!g.attributes.uv) g.setAttribute('uv', new THREE.Float32BufferAttribute(new Float32Array(g.attributes.position.count * 2), 2));
  if (!g.attributes.normal) g.computeVertexNormals();
  g.applyMatrix4(matrix);
  return g;
}

/**
 * Merge the static meshes under `group` into one mesh per material (draw-call reduction).
 * - shallow (default): only direct Mesh children of the group are merged, each child
 *   Group keeps its own transform (use on animated skeleton joints).
 * - deep: every mesh below the group is flattened into the group's space, except
 *   subtrees listed in `keep` (named parts that animate, e.g. magazine / pump).
 */
export function mergeStatic(group, { deep = false, keep = [], castShadow = true } = {}) {
  group.updateMatrixWorld(true);
  const inv = new THREE.Matrix4().copy(group.matrixWorld).invert();
  const buckets = new Map();
  const victims = [];
  const visit = (node) => {
    for (const child of node.children) {
      if (keep.includes(child)) continue;
      if (child.isMesh && !child.isInstancedMesh && child.geometry?.attributes?.position) {
        const m = deep ? new THREE.Matrix4().multiplyMatrices(inv, child.matrixWorld) : child.matrix.clone();
        const flat = child.material?.userData?.flat;
        const key = flat ? FLAT : child.material;
        let list = buckets.get(key);
        if (!list) { list = []; buckets.set(key, list); }
        const g = prepare(child.geometry, m);
        if (flat) {
          _c.copy(child.material.color);
          const n = g.attributes.position.count, arr = new Float32Array(n * 3);
          for (let i = 0; i < n; i++) { arr[i * 3] = _c.r; arr[i * 3 + 1] = _c.g; arr[i * 3 + 2] = _c.b; }
          g.setAttribute('color', new THREE.Float32BufferAttribute(arr, 3));
        }
        list.push(g);
        victims.push(child);
      } else if (deep && !child.isMesh) visit(child);
    }
  };
  visit(group);
  if (victims.length < 2) return group;
  for (const v of victims) v.parent.remove(v);
  for (const [mat, geos] of buckets) {
    const merged = geos.length === 1 ? geos[0] : mergeGeometries(geos, false);
    if (!merged) continue;
    merged.computeBoundingSphere();
    const mesh = new THREE.Mesh(merged, mat);
    mesh.castShadow = castShadow;
    mesh.receiveShadow = true;
    group.add(mesh);
  }
  return group;
}

/** Shallow-merge every Group in a hierarchy (skeleton-friendly). */
export function mergeHierarchy(root, { skip = [] } = {}) {
  const groups = [];
  root.traverse((o) => { if (!o.isMesh && !skip.includes(o)) groups.push(o); });
  for (const g of groups) {
    let inSkip = false;
    for (let p = g; p; p = p.parent) if (skip.includes(p)) { inSkip = true; break; }
    if (!inSkip) mergeStatic(g);
  }
  return root;
}

/**
 * Turn a rigid joint hierarchy into ONE skinned mesh (rigid skinning: each vertex
 * follows exactly one joint). Joints keep animating as Groups; a Bone child of each
 * joint drives the GPU skinning. Result: one draw call per material instead of one
 * per part. Subtrees in `skip` (e.g. the held weapon) stay separate.
 */
export function skinHierarchy(root, { skip = [], boundsRadius = 2.3 } = {}) {
  root.updateMatrixWorld(true);
  const inv = new THREE.Matrix4().copy(root.matrixWorld).invert();
  const joints = [];
  const meshes = [];
  const walk = (node) => {
    if (skip.includes(node)) return;
    joints.push(node);
    const ji = joints.length - 1;
    for (const c of [...node.children]) {
      if (skip.includes(c)) continue;
      if (c.isMesh) meshes.push({ mesh: c, ji });
      else walk(c);
    }
  };
  walk(root);
  const buckets = new Map();
  for (const { mesh, ji } of meshes) {
    const flat = mesh.material?.userData?.flat;
    const key = flat ? FLAT : mesh.material;
    const g = prepare(mesh.geometry, new THREE.Matrix4().multiplyMatrices(inv, mesh.matrixWorld));
    const n = g.attributes.position.count;
    const col = new Float32Array(n * 3).fill(1);
    if (flat) for (let i = 0; i < n; i++) { col[i * 3] = mesh.material.color.r; col[i * 3 + 1] = mesh.material.color.g; col[i * 3 + 2] = mesh.material.color.b; }
    g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
    const si = new Uint16Array(n * 4), sw = new Float32Array(n * 4);
    for (let i = 0; i < n; i++) { si[i * 4] = ji; sw[i * 4] = 1; }
    g.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(si, 4));
    g.setAttribute('skinWeight', new THREE.Float32BufferAttribute(sw, 4));
    let list = buckets.get(key);
    if (!list) { list = []; buckets.set(key, list); }
    list.push(g);
    mesh.parent.remove(mesh);
  }
  const mats = [], parts = [];
  for (const [mat, geos] of buckets) { mats.push(mat); parts.push(geos.length === 1 ? geos[0] : mergeGeometries(geos, false)); }
  const geo = mergeGeometries(parts, true);
  const bones = joints.map((j) => { const b = new THREE.Bone(); j.add(b); return b; });
  root.updateMatrixWorld(true);
  const skinned = new THREE.SkinnedMesh(geo, mats);
  skinned.castShadow = true; skinned.receiveShadow = true;
  root.add(skinned);
  skinned.updateMatrixWorld(true);
  skinned.bind(new THREE.Skeleton(bones), skinned.matrixWorld);
  skinned.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0.9, 0), boundsRadius);
  return skinned;
}
