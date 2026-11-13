/**
 * 2D walkability grid rasterized from the collision world + A* path finding
 * with line-of-sight path smoothing. Used by allied and hostile AI.
 */
export class NavGrid {
  /** baseY: floor height of this grid (0 = ground; e.g. 7 for a ship's deck). */
  constructor(world, { minX, minZ, maxX, maxZ, cell = 1, agentRadius = 0.45, maxStep = 0.45, baseY = 0 }) {
    this.baseY = baseY;
    this.world = world;
    this.minX = minX; this.minZ = minZ;
    this.cell = cell;
    this.w = Math.ceil((maxX - minX) / cell);
    this.h = Math.ceil((maxZ - minZ) / cell);
    this.blocked = new Uint8Array(this.w * this.h);
    this.agentRadius = agentRadius;
    this.maxStep = maxStep;
    this.rebuild();
  }

  rebuild() {
    this.blocked.fill(0);
    for (const b of this.world.boxes) this.rasterize(b, 1);
  }

  rasterize(b, value) {
    if (!b.enabled || b.max.y <= this.baseY + this.maxStep || b.min.y > this.baseY + 1.7) return;
    const r = this.agentRadius;
    const x0 = Math.max(0, Math.floor((b.min.x - r - this.minX) / this.cell));
    const x1 = Math.min(this.w - 1, Math.floor((b.max.x + r - this.minX) / this.cell));
    const z0 = Math.max(0, Math.floor((b.min.z - r - this.minZ) / this.cell));
    const z1 = Math.min(this.h - 1, Math.floor((b.max.z + r - this.minZ) / this.cell));
    for (let z = z0; z <= z1; z++) for (let x = x0; x <= x1; x++) this.blocked[z * this.w + x] = value;
  }

  toCell(x, z) {
    return [Math.floor((x - this.minX) / this.cell), Math.floor((z - this.minZ) / this.cell)];
  }
  cellCenter(cx, cz) {
    return { x: this.minX + (cx + 0.5) * this.cell, z: this.minZ + (cz + 0.5) * this.cell };
  }
  inBounds(cx, cz) { return cx >= 0 && cz >= 0 && cx < this.w && cz < this.h; }
  isBlockedCell(cx, cz) { return !this.inBounds(cx, cz) || this.blocked[cz * this.w + cx] === 1; }
  isWalkable(x, z) { const [cx, cz] = this.toCell(x, z); return !this.isBlockedCell(cx, cz); }

  /** Nearest walkable cell (spiral search). */
  nearestFree(cx, cz, maxR = 12) {
    if (!this.isBlockedCell(cx, cz)) return [cx, cz];
    for (let r = 1; r <= maxR; r++) {
      for (let dz = -r; dz <= r; dz++) {
        for (let dx = -r; dx <= r; dx++) {
          if (Math.abs(dx) !== r && Math.abs(dz) !== r) continue;
          if (!this.isBlockedCell(cx + dx, cz + dz)) return [cx + dx, cz + dz];
        }
      }
    }
    return null;
  }

  /** Grid line-of-walk test (supercover sampling). */
  lineFree(ax, az, bx, bz) {
    const dx = bx - ax, dz = bz - az;
    const len = Math.hypot(dx, dz);
    const steps = Math.max(1, Math.ceil(len / (this.cell * 0.35)));
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      if (!this.isWalkable(ax + dx * t, az + dz * t)) return false;
    }
    return true;
  }

  /** A* search. Returns [{x,z},...] (excluding start) or null. */
  findPath(sx, sz, gx, gz, maxIter = 20000) {
    let [scx, scz] = this.toCell(sx, sz);
    let [gcx, gcz] = this.toCell(gx, gz);
    const s = this.nearestFree(scx, scz, 4);
    const g = this.nearestFree(gcx, gcz, 8);
    if (!s || !g) return null;
    [scx, scz] = s; [gcx, gcz] = g;
    const W = this.w;
    const start = scz * W + scx, goal = gcz * W + gcx;
    if (start === goal) return [{ x: gx, z: gz }];

    const n = this.w * this.h;
    if (!this._g || this._g.length !== n) {
      this._g = new Float32Array(n);
      this._parent = new Int32Array(n);
      this._seen = new Uint32Array(n);
      this._closed = new Uint32Array(n);
      this._gen = 0;
    }
    const gen = ++this._gen;
    const gScore = this._g, parent = this._parent, seen = this._seen, closed = this._closed;
    const heap = new MinHeap();
    const hfun = (i) => {
      const x = i % W, z = (i / W) | 0;
      const dx = Math.abs(x - gcx), dz = Math.abs(z - gcz);
      return (dx + dz) + (Math.SQRT2 - 2) * Math.min(dx, dz);
    };
    gScore[start] = 0; parent[start] = -1; seen[start] = gen;
    heap.push(start, hfun(start));
    let iter = 0;
    const DIRS = [[1, 0, 1], [-1, 0, 1], [0, 1, 1], [0, -1, 1], [1, 1, Math.SQRT2], [1, -1, Math.SQRT2], [-1, 1, Math.SQRT2], [-1, -1, Math.SQRT2]];
    while (heap.size > 0 && iter++ < maxIter) {
      const cur = heap.pop();
      if (cur === goal) break;
      if (closed[cur] === gen) continue;
      closed[cur] = gen;
      const x = cur % W, z = (cur / W) | 0;
      for (const [dx, dz, cost] of DIRS) {
        const nx = x + dx, nz = z + dz;
        if (this.isBlockedCell(nx, nz)) continue;
        if (dx !== 0 && dz !== 0 && (this.isBlockedCell(x + dx, z) || this.isBlockedCell(x, z + dz))) continue;
        const ni = nz * W + nx;
        const ng = gScore[cur] + cost;
        if (seen[ni] !== gen || ng < gScore[ni]) {
          seen[ni] = gen; gScore[ni] = ng; parent[ni] = cur;
          heap.push(ni, ng + hfun(ni));
        }
      }
    }
    if (seen[goal] !== gen) return null;
    const cells = [];
    for (let c = goal; c !== -1; c = parent[c]) cells.push(c);
    cells.reverse();
    const pts = cells.map((c) => this.cellCenter(c % W, (c / W) | 0));
    pts[pts.length - 1] = this.isWalkable(gx, gz) ? { x: gx, z: gz } : pts[pts.length - 1];
    // String pulling
    const out = [];
    let anchor = { x: sx, z: sz };
    let i = 0;
    while (i < pts.length) {
      let j = pts.length - 1;
      while (j > i && !this.lineFree(anchor.x, anchor.z, pts[j].x, pts[j].z)) j--;
      out.push(pts[j]);
      anchor = pts[j];
      i = j + 1;
    }
    return out;
  }
}

class MinHeap {
  constructor() { this.items = []; this.prio = []; }
  get size() { return this.items.length; }
  push(item, p) {
    const it = this.items, pr = this.prio;
    it.push(item); pr.push(p);
    let i = it.length - 1;
    while (i > 0) {
      const par = (i - 1) >> 1;
      if (pr[par] <= pr[i]) break;
      [it[par], it[i]] = [it[i], it[par]];
      [pr[par], pr[i]] = [pr[i], pr[par]];
      i = par;
    }
  }
  pop() {
    const it = this.items, pr = this.prio;
    const top = it[0];
    const lastI = it.pop(), lastP = pr.pop();
    if (it.length > 0) {
      it[0] = lastI; pr[0] = lastP;
      let i = 0;
      for (;;) {
        const l = 2 * i + 1, r = l + 1;
        let m = i;
        if (l < it.length && pr[l] < pr[m]) m = l;
        if (r < it.length && pr[r] < pr[m]) m = r;
        if (m === i) break;
        [it[m], it[i]] = [it[i], it[m]];
        [pr[m], pr[i]] = [pr[i], pr[m]];
        i = m;
      }
    }
    return top;
  }
}
