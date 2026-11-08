import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

/**
 * Accumulates static geometry per material and emits one merged mesh per material.
 * Keeps draw calls low for the whole city.
 */
export class GeometryBatcher {
  constructor() { this.buckets = new Map(); }

  _bucket(mat) {
    let b = this.buckets.get(mat);
    if (!b) { b = { pos: [], nrm: [], uv: [], geoms: [] }; this.buckets.set(mat, b); }
    return b;
  }

  /** Quad from 4 corners (counter-clockwise seen from the front). */
  quad(mat, p0, p1, p2, p3, n, uv0, uv1, uv2, uv3) {
    const b = this._bucket(mat);
    const P = [p0, p1, p2, p0, p2, p3], U = [uv0, uv1, uv2, uv0, uv2, uv3];
    for (let i = 0; i < 6; i++) {
      b.pos.push(P[i][0], P[i][1], P[i][2]);
      b.nrm.push(n[0], n[1], n[2]);
      b.uv.push(U[i][0], U[i][1]);
    }
  }

  /**
   * Axis-aligned box with world-scaled UVs. `sides` / `top` / `bottom` materials (null = skip).
   * tile: {w, h, u0, v0} metres covered by one texture repeat on the sides.
   */
  box(x0, y0, z0, x1, y1, z1, { sides, top = null, bottom = null, tile = { w: 4, h: 4 }, topTile = 4, skipFaces = '' }) {
    const tw = tile.w, th = tile.h, u0 = tile.u0 || 0, v0 = tile.v0 || 0;
    const vy0 = (y0 - (tile.yBase ?? y0)) / th + v0, vy1 = (y1 - (tile.yBase ?? y0)) / th + v0;
    if (sides) {
      // +Z face (front)
      if (!skipFaces.includes('pz')) this.quad(sides, [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1], [0, 0, 1],
        [u0, vy0], [u0 + (x1 - x0) / tw, vy0], [u0 + (x1 - x0) / tw, vy1], [u0, vy1]);
      // -Z face
      if (!skipFaces.includes('nz')) this.quad(sides, [x1, y0, z0], [x0, y0, z0], [x0, y1, z0], [x1, y1, z0], [0, 0, -1],
        [u0, vy0], [u0 + (x1 - x0) / tw, vy0], [u0 + (x1 - x0) / tw, vy1], [u0, vy1]);
      // +X face
      if (!skipFaces.includes('px')) this.quad(sides, [x1, y0, z1], [x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [1, 0, 0],
        [u0, vy0], [u0 + (z1 - z0) / tw, vy0], [u0 + (z1 - z0) / tw, vy1], [u0, vy1]);
      // -X face
      if (!skipFaces.includes('nx')) this.quad(sides, [x0, y0, z0], [x0, y0, z1], [x0, y1, z1], [x0, y1, z0], [-1, 0, 0],
        [u0, vy0], [u0 + (z1 - z0) / tw, vy0], [u0 + (z1 - z0) / tw, vy1], [u0, vy1]);
    }
    if (top) this.quad(top, [x0, y1, z1], [x1, y1, z1], [x1, y1, z0], [x0, y1, z0], [0, 1, 0],
      [x0 / topTile, z1 / topTile], [x1 / topTile, z1 / topTile], [x1 / topTile, z0 / topTile], [x0 / topTile, z0 / topTile]);
    if (bottom) this.quad(bottom, [x0, y0, z0], [x1, y0, z0], [x1, y0, z1], [x0, y0, z1], [0, -1, 0],
      [0, 0], [1, 0], [1, 1], [0, 1]);
  }

  /** Add an arbitrary BufferGeometry (already transformed) to a material bucket. */
  addGeometry(mat, geom) {
    const g = geom.index ? geom.toNonIndexed() : geom;
    for (const k of Object.keys(g.attributes)) if (!['position', 'normal', 'uv'].includes(k)) g.deleteAttribute(k);
    if (!g.attributes.uv) g.setAttribute('uv', new THREE.Float32BufferAttribute(new Float32Array(g.attributes.position.count * 2), 2));
    this._bucket(mat).geoms.push(g);
  }

  build(parent, { castShadow = true, receiveShadow = true } = {}) {
    const meshes = [];
    for (const [mat, b] of this.buckets) {
      const parts = [...b.geoms];
      if (b.pos.length) {
        const g = new THREE.BufferGeometry();
        g.setAttribute('position', new THREE.Float32BufferAttribute(b.pos, 3));
        g.setAttribute('normal', new THREE.Float32BufferAttribute(b.nrm, 3));
        g.setAttribute('uv', new THREE.Float32BufferAttribute(b.uv, 2));
        parts.push(g);
      }
      if (!parts.length) continue;
      const merged = parts.length === 1 ? parts[0] : mergeGeometries(parts, false);
      merged.computeBoundingSphere();
      merged.computeBoundingBox();
      const mesh = new THREE.Mesh(merged, mat);
      mesh.castShadow = castShadow;
      mesh.receiveShadow = receiveShadow;
      mesh.matrixAutoUpdate = false;
      mesh.updateMatrix();
      parent.add(mesh);
      meshes.push(mesh);
    }
    this.buckets.clear();
    return meshes;
  }
}
