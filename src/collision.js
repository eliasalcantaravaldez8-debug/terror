// Sistema de colisão leve: caixas estáticas (AABB) num grid espacial + caixas orientadas dinâmicas (carros).
const CELL = 16;

export class CollisionWorld {
  constructor() {
    this.boxes = [];
    this.grid = new Map();
    this.dynamic = new Set(); // objetos com getOBB()
    this.groundFn = () => 0;
    this._stamp = 0;
  }
  key(cx, cz) { return cx * 73856093 ^ cz * 19349663; }
  addBox(minX, minY, minZ, maxX, maxY, maxZ, tag = 'static') {
    const b = { minX, minY, minZ, maxX, maxY, maxZ, tag, stamp: 0 };
    this.boxes.push(b);
    for (let cx = Math.floor(minX / CELL); cx <= Math.floor(maxX / CELL); cx++)
      for (let cz = Math.floor(minZ / CELL); cz <= Math.floor(maxZ / CELL); cz++) {
        const k = this.key(cx, cz);
        if (!this.grid.has(k)) this.grid.set(k, []);
        this.grid.get(k).push(b);
      }
    return b;
  }
  disableBox(b) { b.maxY = -100; b.minY = -101; }
  // caixa centrada com rotação de 0/90 graus
  addCentered(x, y0, z, w, h, d) { return this.addBox(x - w / 2, y0, z - d / 2, x + w / 2, y0 + h, z + d / 2); }
  query(minX, minZ, maxX, maxZ) {
    const out = [];
    const st = ++this._stamp;
    for (let cx = Math.floor(minX / CELL); cx <= Math.floor(maxX / CELL); cx++)
      for (let cz = Math.floor(minZ / CELL); cz <= Math.floor(maxZ / CELL); cz++) {
        const list = this.grid.get(this.key(cx, cz));
        if (!list) continue;
        for (const b of list) if (b.stamp !== st) { b.stamp = st; out.push(b); }
      }
    return out;
  }
  // Altura do chão sob um círculo (terreno + topos de caixas baixas o bastante para subir)
  groundAt(x, z, r, feetY, step = 0.4) {
    let g = this.groundFn(x, z);
    for (const b of this.query(x - r, z - r, x + r, z + r)) {
      if (b.maxY <= feetY + step && b.maxY > g &&
        x + r > b.minX && x - r < b.maxX && z + r > b.minZ && z - r < b.maxZ) g = b.maxY;
    }
    return g;
  }
  // Empurra um círculo (cilindro vertical) para fora das caixas. Retorna {x,z,hit}
  resolveCircle(x, z, r, y0, y1, step = 0.4, ignore = null, fromCar = false) {
    let hit = false; let nx = 0, nz = 0;
    for (let iter = 0; iter < 3; iter++) {
      let moved = false;
      for (const b of this.query(x - r, z - r, x + r, z + r)) {
        if (b.maxY <= y0 + step || b.minY >= y1) continue;
        const cx = Math.max(b.minX, Math.min(x, b.maxX));
        const cz = Math.max(b.minZ, Math.min(z, b.maxZ));
        let dx = x - cx, dz = z - cz;
        const d2 = dx * dx + dz * dz;
        if (d2 >= r * r) continue;
        if (d2 > 1e-8) {
          const d = Math.sqrt(d2);
          dx /= d; dz /= d;
          x = cx + dx * r; z = cz + dz * r;
        } else {
          // centro dentro da caixa: sai pelo lado mais próximo
          const l = x - b.minX, rgt = b.maxX - x, t = z - b.minZ, bt = b.maxZ - z;
          const m = Math.min(l, rgt, t, bt);
          if (m === l) { x = b.minX - r; dx = -1; dz = 0; }
          else if (m === rgt) { x = b.maxX + r; dx = 1; dz = 0; }
          else if (m === t) { z = b.minZ - r; dx = 0; dz = -1; }
          else { z = b.maxZ + r; dx = 0; dz = 1; }
        }
        nx += dx; nz += dz; hit = true; moved = true;
      }
      // obstáculos dinâmicos (carros)
      for (const o of this.dynamic) {
        if (o === ignore || !o.collidable) continue;
        if (Math.abs(o.x - x) > 7 + r || Math.abs(o.z - z) > 7 + r) continue; // filtro rápido (carros e pessoas longe)
        const res = o.pushCircleOut(x, z, r, y0, y1, fromCar);
        if (res) { x = res.x; z = res.z; nx += res.nx; nz += res.nz; hit = true; moved = true; }
      }
      if (!moved) break;
    }
    const nl = Math.hypot(nx, nz) || 1;
    return { x, z, hit, nx: nx / nl, nz: nz / nl };
  }
  // Raio contra caixas: retorna distância do primeiro impacto (ou maxDist)
  raycast(ox, oy, oz, dx, dy, dz, maxDist) {
    const ex = ox + dx * maxDist, ez = oz + dz * maxDist;
    let best = maxDist;
    const cand = this.query(Math.min(ox, ex), Math.min(oz, ez), Math.max(ox, ex), Math.max(oz, ez));
    for (const b of cand) {
      let tmin = 0, tmax = best;
      const o = [ox, oy, oz], d = [dx, dy, dz];
      const mn = [b.minX, b.minY, b.minZ], mx = [b.maxX, b.maxY, b.maxZ];
      let ok = true;
      for (let a = 0; a < 3; a++) {
        if (Math.abs(d[a]) < 1e-9) { if (o[a] < mn[a] || o[a] > mx[a]) { ok = false; break; } }
        else {
          let t1 = (mn[a] - o[a]) / d[a], t2 = (mx[a] - o[a]) / d[a];
          if (t1 > t2) { const t = t1; t1 = t2; t2 = t; }
          tmin = Math.max(tmin, t1); tmax = Math.min(tmax, t2);
          if (tmin > tmax) { ok = false; break; }
        }
      }
      if (ok && tmin < best) best = tmin;
    }
    // carros (caixas orientadas)
    for (const o of this.dynamic) {
      if (!o.rayHit || o === this.rayIgnore) continue;
      const t = o.rayHit(ox, oy, oz, dx, dy, dz, best);
      if (t < best) best = t;
    }
    // terreno plano (y = chão)
    if (dy < -1e-6) {
      const g = this.groundFn(ox, oz) + 0.05;
      const t = (g - oy) / dy;
      if (t > 0 && t < best) best = t;
    }
    return best;
  }
}
