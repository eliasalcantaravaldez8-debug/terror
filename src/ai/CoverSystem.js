/**
 * Cover points generated around cover-tagged colliders. Points know their
 * outward normal and cover height; evaluation uses real line-of-sight tests.
 */
const coverFilter = (b) => b.tag !== 'bounds';

export class CoverSystem {
  constructor(world, nav) {
    this.world = world;
    this.nav = nav;
    this.points = [];
  }

  build() {
    this.points.length = 0;
    for (const b of this.world.boxes) {
      if (!b.cover || !b.enabled) continue;
      const h = b.max.y - b.min.y;
      if (h < 0.7) continue;
      const off = 0.55;
      const sides = [
        { nx: 0, nz: 1, x0: b.min.x, x1: b.max.x, z: b.max.z + off, along: 'x' },
        { nx: 0, nz: -1, x0: b.min.x, x1: b.max.x, z: b.min.z - off, along: 'x' },
        { nx: 1, nz: 0, z0: b.min.z, z1: b.max.z, x: b.max.x + off, along: 'z' },
        { nx: -1, nz: 0, z0: b.min.z, z1: b.max.z, x: b.min.x - off, along: 'z' },
      ];
      for (const s of sides) {
        const len = s.along === 'x' ? s.x1 - s.x0 : s.z1 - s.z0;
        const n = Math.max(1, Math.floor(len / 1.3));
        for (let i = 0; i < n; i++) {
          const t = (i + 0.5) / n;
          const x = s.along === 'x' ? s.x0 + (s.x1 - s.x0) * t : s.x;
          const z = s.along === 'x' ? s.z : s.z0 + (s.z1 - s.z0) * t;
          if (this.nav && !this.nav.isWalkable(x, z)) continue;
          this.points.push({ x, z, nx: s.nx, nz: s.nz, h: b.max.y, box: b, owner: null });
        }
      }
    }
    return this.points;
  }

  /** Is the point protected from `threatEye` when crouched? */
  isProtected(p, threatEye) {
    return !this.world.lineOfSight(threatEye, { x: p.x, y: 0.95, z: p.z }, coverFilter);
  }
  /** Can a soldier standing (or peeking) at the point see the target? */
  canShoot(p, targetPos, standEye = 1.6) {
    return this.world.lineOfSight({ x: p.x, y: standEye, z: p.z }, targetPos, coverFilter);
  }

  release(owner) { for (const p of this.points) if (p.owner === owner) p.owner = null; }

  /**
   * Find the best cover for `agent` against `threatEye` (vector) around `desired` within `radius`.
   * zone (optional): {x0,x1,z0,z1} restricts candidates.
   */
  findCover(agent, desired, radius, threatEye, threatAim, { zone = null, preferDist = 22, maxEval = 16 } = {}) {
    const cands = [];
    for (const p of this.points) {
      if (p.owner && p.owner !== agent) continue;
      if (zone && (p.x < zone.x0 || p.x > zone.x1 || p.z < zone.z0 || p.z > zone.z1)) continue;
      const d = Math.hypot(p.x - desired.x, p.z - desired.z);
      if (d > radius) continue;
      // quick directional test: threat must be on the far side of the cover
      const tx = threatEye.x - p.x, tz = threatEye.z - p.z;
      const tl = Math.hypot(tx, tz) || 1;
      if ((tx * -p.nx + tz * -p.nz) / tl < 0.25) continue;
      cands.push({ p, d });
    }
    cands.sort((a, b) => a.d - b.d);
    let best = null, bestScore = -Infinity;
    for (let i = 0; i < Math.min(maxEval, cands.length); i++) {
      const { p, d } = cands[i];
      const prot = this.isProtected(p, threatEye);
      const shoot = p.h < 1.45 ? this.canShoot(p, threatAim) : false;
      const travel = Math.hypot(p.x - agent.pos.x, p.z - agent.pos.z);
      const dThreat = Math.hypot(p.x - threatEye.x, p.z - threatEye.z);
      let score = (prot ? 10 : 0) + (shoot ? 6 : 0) - d * 0.25 - travel * 0.12 - Math.abs(dThreat - preferDist) * 0.08;
      // avoid clustering
      for (const q of this.points) if (q.owner && q.owner !== agent && Math.hypot(q.x - p.x, q.z - p.z) < 1.6) score -= 4;
      if (score > bestScore) { bestScore = score; best = p; }
    }
    return best;
  }
}
