import { clamp } from '../utils/math.js';

/**
 * Static/dynamic axis-aligned box world with a uniform spatial hash.
 * Provides: character (vertical cylinder) collision resolution, ground queries
 * and fast ray casts (2D DDA over the hash + slab tests). The ground plane y=0
 * is always solid.
 */
export class CollisionWorld {
  constructor(cellSize = 8) {
    this.cellSize = cellSize;
    this.boxes = [];
    this.cells = new Map();
    this._stamp = 1;
    this._nextId = 1;
  }

  _key(cx, cz) { return (cx + 4096) * 8192 + (cz + 4096); }

  /** Add a box from min/max corners. opts: { tag, cover, bulletProof } */
  addBox(minX, minY, minZ, maxX, maxY, maxZ, opts = {}) {
    const b = {
      id: this._nextId++,
      min: { x: Math.min(minX, maxX), y: Math.min(minY, maxY), z: Math.min(minZ, maxZ) },
      max: { x: Math.max(minX, maxX), y: Math.max(minY, maxY), z: Math.max(minZ, maxZ) },
      tag: opts.tag || 'static',
      cover: !!opts.cover,
      surface: opts.surface || 'concrete',
      enabled: true,
      stamp: 0,
      userData: opts.userData || null,
    };
    this.boxes.push(b);
    const cs = this.cellSize;
    const x0 = Math.floor(b.min.x / cs), x1 = Math.floor(b.max.x / cs);
    const z0 = Math.floor(b.min.z / cs), z1 = Math.floor(b.max.z / cs);
    for (let cx = x0; cx <= x1; cx++) {
      for (let cz = z0; cz <= z1; cz++) {
        const k = this._key(cx, cz);
        let list = this.cells.get(k);
        if (!list) { list = []; this.cells.set(k, list); }
        list.push(b);
      }
    }
    return b;
  }

  /** Box from center (x,z), bottom y and full sizes. */
  addBlock(cx, y0, cz, sx, sy, sz, opts) {
    return this.addBox(cx - sx / 2, y0, cz - sz / 2, cx + sx / 2, y0 + sy, cz + sz / 2, opts);
  }

  removeBox(b) {
    if (!b) return;
    b.enabled = false;
    const cs = this.cellSize;
    for (let cx = Math.floor(b.min.x / cs); cx <= Math.floor(b.max.x / cs); cx++) {
      for (let cz = Math.floor(b.min.z / cs); cz <= Math.floor(b.max.z / cs); cz++) {
        const list = this.cells.get(this._key(cx, cz));
        if (list) { const i = list.indexOf(b); if (i >= 0) list.splice(i, 1); }
      }
    }
    const i = this.boxes.indexOf(b);
    if (i >= 0) this.boxes.splice(i, 1);
  }

  query(minX, minZ, maxX, maxZ, out = []) {
    out.length = 0;
    const stamp = ++this._stamp;
    const cs = this.cellSize;
    for (let cx = Math.floor(minX / cs); cx <= Math.floor(maxX / cs); cx++) {
      for (let cz = Math.floor(minZ / cs); cz <= Math.floor(maxZ / cs); cz++) {
        const list = this.cells.get(this._key(cx, cz));
        if (!list) continue;
        for (const b of list) {
          if (b.stamp === stamp || !b.enabled) continue;
          b.stamp = stamp;
          if (b.max.x < minX || b.min.x > maxX || b.max.z < minZ || b.min.z > maxZ) continue;
          out.push(b);
        }
      }
    }
    return out;
  }

  /**
   * Push a vertical cylinder (feet at pos.y) out of all boxes it penetrates.
   * Boxes whose top is below pos.y + stepHeight are ignored (they can be stepped on).
   * Returns true if any collision happened.
   */
  resolveCylinder(pos, radius, height, stepHeight = 0.45) {
    const cands = this.query(pos.x - radius - 0.05, pos.z - radius - 0.05, pos.x + radius + 0.05, pos.z + radius + 0.05, this._q1 || (this._q1 = []));
    let any = false;
    for (let iter = 0; iter < 4; iter++) {
      let pushed = false;
      for (const b of cands) {
        if (b.max.y <= pos.y + stepHeight || b.min.y >= pos.y + height) continue;
        const cx = clamp(pos.x, b.min.x, b.max.x);
        const cz = clamp(pos.z, b.min.z, b.max.z);
        const dx = pos.x - cx, dz = pos.z - cz;
        const d2 = dx * dx + dz * dz;
        if (d2 >= radius * radius) continue;
        if (d2 > 1e-10) {
          const d = Math.sqrt(d2);
          const push = radius - d + 1e-4;
          pos.x += (dx / d) * push;
          pos.z += (dz / d) * push;
        } else {
          const l = pos.x - b.min.x, r = b.max.x - pos.x, n = pos.z - b.min.z, f = b.max.z - pos.z;
          const m = Math.min(l, r, n, f);
          if (m === l) pos.x = b.min.x - radius;
          else if (m === r) pos.x = b.max.x + radius;
          else if (m === n) pos.z = b.min.z - radius;
          else pos.z = b.max.z + radius;
        }
        pushed = true;
        any = true;
      }
      if (!pushed) break;
    }
    return any;
  }

  /** Highest walkable surface under a circle that is at most `maxY` high. */
  groundHeight(x, z, radius, maxY) {
    const r = radius * 0.6;
    const cands = this.query(x - r, z - r, x + r, z + r, this._q2 || (this._q2 = []));
    let h = 0;
    for (const b of cands) {
      if (b.max.y > maxY || b.max.y <= h) continue;
      const cx = clamp(x, b.min.x, b.max.x), cz = clamp(z, b.min.z, b.max.z);
      if ((x - cx) ** 2 + (z - cz) ** 2 <= r * r) h = b.max.y;
    }
    return h;
  }

  /** Lowest ceiling above (x, y, z) inside radius; Infinity if none. */
  ceilingHeight(x, z, radius, fromY) {
    const cands = this.query(x - radius, z - radius, x + radius, z + radius, this._q3 || (this._q3 = []));
    let c = Infinity;
    for (const b of cands) {
      if (b.min.y < fromY || b.min.y >= c) continue;
      const cx = clamp(x, b.min.x, b.max.x), cz = clamp(z, b.min.z, b.max.z);
      if ((x - cx) ** 2 + (z - cz) ** 2 < radius * radius) c = b.min.y;
    }
    return c;
  }

  /**
   * Ray cast. `d` must be normalized. Returns { t, point, normal, box, surface } or null.
   * filter(box) -> false to ignore a box.
   */
  raycast(o, d, maxDist, filter = null) {
    const cs = this.cellSize;
    let best = maxDist, hitBox = null, hitAxis = -1, hitSign = 0;
    // Ground plane
    if (d.y < -1e-6 && o.y >= 0) {
      const tg = -o.y / d.y;
      if (tg < best) { best = tg; hitBox = null; hitAxis = 1; hitSign = 1; }
    }
    let cx = Math.floor(o.x / cs), cz = Math.floor(o.z / cs);
    const stepX = d.x > 0 ? 1 : -1, stepZ = d.z > 0 ? 1 : -1;
    const adx = Math.abs(d.x), adz = Math.abs(d.z);
    const tDeltaX = adx > 1e-9 ? cs / adx : Infinity;
    const tDeltaZ = adz > 1e-9 ? cs / adz : Infinity;
    let tMaxX = adx > 1e-9 ? (d.x > 0 ? (cx + 1) * cs - o.x : o.x - cx * cs) / adx : Infinity;
    let tMaxZ = adz > 1e-9 ? (d.z > 0 ? (cz + 1) * cs - o.z : o.z - cz * cs) / adz : Infinity;
    const stamp = ++this._stamp;
    let t = 0;
    let guard = 0;
    while (t <= best && guard++ < 4096) {
      const list = this.cells.get(this._key(cx, cz));
      if (list) {
        for (const b of list) {
          if (b.stamp === stamp || !b.enabled) continue;
          b.stamp = stamp;
          if (filter && !filter(b)) continue;
          const r = rayBox(o, d, b, best);
          if (r) { best = r.t; hitBox = b; hitAxis = r.axis; hitSign = r.sign; }
        }
      }
      if (tMaxX < tMaxZ) { t = tMaxX; tMaxX += tDeltaX; cx += stepX; }
      else { t = tMaxZ; tMaxZ += tDeltaZ; cz += stepZ; }
      if (t > maxDist) break;
    }
    if (hitAxis < 0) return null;
    const normal = { x: 0, y: 0, z: 0 };
    normal[AXES[hitAxis]] = hitSign;
    return {
      t: best,
      point: { x: o.x + d.x * best, y: o.y + d.y * best, z: o.z + d.z * best },
      normal,
      box: hitBox,
      surface: hitBox ? hitBox.surface : 'ground',
    };
  }

  /** True when the segment a->b is not blocked by static geometry. */
  lineOfSight(a, b, filter = null) {
    const dx = b.x - a.x, dy = b.y - a.y, dz = b.z - a.z;
    const len = Math.hypot(dx, dy, dz);
    if (len < 1e-6) return true;
    const d = { x: dx / len, y: dy / len, z: dz / len };
    return this.raycast(a, d, len - 0.05, filter) === null;
  }
}

const AXES = ['x', 'y', 'z'];

export function rayBox(o, d, b, maxT) {
  let tmin = 0, tmax = maxT, axis = -1, sign = 0;
  for (let i = 0; i < 3; i++) {
    const a = AXES[i];
    const da = d[a], oa = o[a];
    if (Math.abs(da) < 1e-12) {
      if (oa < b.min[a] || oa > b.max[a]) return null;
      continue;
    }
    const inv = 1 / da;
    let t1 = (b.min[a] - oa) * inv, t2 = (b.max[a] - oa) * inv;
    let s = -1;
    if (t1 > t2) { const tmp = t1; t1 = t2; t2 = tmp; s = 1; }
    if (t1 > tmin) { tmin = t1; axis = i; sign = s; }
    if (t2 < tmax) tmax = t2;
    if (tmin > tmax) return null;
  }
  if (axis < 0) return null; // origin inside the box: ignore
  return { t: tmin, axis, sign };
}

/** Ray vs sphere; returns distance or -1. */
export function raySphere(o, d, c, r, maxT) {
  const ox = o.x - c.x, oy = o.y - c.y, oz = o.z - c.z;
  const b = ox * d.x + oy * d.y + oz * d.z;
  const cc = ox * ox + oy * oy + oz * oz - r * r;
  const disc = b * b - cc;
  if (disc < 0) return -1;
  const t = -b - Math.sqrt(disc);
  if (t < 0 || t > maxT) return -1;
  return t;
}
