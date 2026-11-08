// NPCs: pedestres nas calçadas, funcionários das lojas, policiais e personagens da história.
import { Humanoid } from './humanoid.js';
import { rand, rr, pick } from './textures.js';

const damp = (a, b, k, dt) => a + (b - a) * (1 - Math.exp(-k * dt));
function angDamp(a, b, k, dt) {
  let d = b - a; while (d > Math.PI) d -= Math.PI * 2; while (d < -Math.PI) d += Math.PI * 2;
  return a + d * (1 - Math.exp(-k * dt));
}

export class NPC {
  constructor(scene, world, look, opts = {}) {
    this.world = world;
    this.model = new Humanoid(look);
    scene.add(this.model.root);
    this.name = opts.name || 'Pedestre';
    this.role = opts.role || 'ped';
    this.lines = opts.lines || [];
    this.behavior = opts.behavior || 'stand';
    this.x = opts.x || 0; this.z = opts.z || 0; this.heading = opts.heading || 0;
    this.homeHeading = this.heading; this.homeX = this.x; this.homeZ = this.z;
    this.y = world.groundAt(this.x, this.z, 0.3, 5);
    this.speed = 0; this.vx = 0; this.vz = 0;
    this.r = 0.32; this.collidable = true;
    this.talking = false; this.dodge = 0; this.dodgeX = 0; this.dodgeZ = 0;
    this.wait = 0; this.lineIdx = 0;
    if (this.behavior === 'loop') {
      this.loop = opts.loop; this.s = rand() * this.loop.half * 8; this.dir = rand() < 0.5 ? 1 : -1;
      this.walk = rr(1.05, 1.5); this.lat = rr(-0.9, 0.3);
      const p = this.loopPos(this.s); this.x = p[0]; this.z = p[1];
    }
    if (this.behavior === 'patrol') { this.walk = 1.1; this.patrolT = rand() * 10; }
    this.stuck = 0; this.animSkip = 0; this.visibleDist = true;
    this.sync();
  }
  // posição ao longo do perímetro do quarteirão
  loopPos(s) {
    const h = this.loop.half + this.lat, L = h * 2, per = L * 4;
    s = ((s % per) + per) % per;
    const { cx, cz } = this.loop;
    if (s < L) return [cx - h + s, cz - h, 0];
    if (s < 2 * L) return [cx + h, cz - h + (s - L), 1];
    if (s < 3 * L) return [cx + h - (s - 2 * L), cz + h, 2];
    return [cx - h, cz + h - (s - 3 * L), 3];
  }
  pushCircleOut(x, z, r, y0, y1, fromCar) {
    if (fromCar || !this.collidable || !this.model.root.visible) return null;
    const dx = x - this.x, dz = z - this.z; const d = Math.hypot(dx, dz), R = r + this.r;
    if (d >= R || d < 1e-5) return null;
    const nx = dx / d, nz = dz / d;
    return { x: this.x + nx * R, z: this.z + nz * R, nx, nz };
  }
  // carro empurra NPC / NPC desvia de carros
  reactToCar(car, dt) {
    if (!car) return;
    const dx = this.x - car.x, dz = this.z - car.z; const d2 = dx * dx + dz * dz;
    if (d2 > 100) return;
    const sp = Math.abs(car.speed);
    if (sp > 2.5 && this.dodge <= 0) {
      // está na frente do carro?
      const [fx, fz] = car.forward; const ahead = (dx * fx + dz * fz) * Math.sign(car.speed);
      const side = dx * -fz + dz * fx;
      if (ahead > 0 && ahead < 3 + sp * 0.6 && Math.abs(side) < 2.4) {
        const sgn = side >= 0 ? 1 : -1;
        this.dodge = 0.7; this.dodgeX = -fz * sgn * 5; this.dodgeZ = fx * sgn * 5;
      }
    }
    const res = car.pushCircleOut(this.x, this.z, this.r, this.y, this.y + 1.7);
    if (res) { this.x = res.x; this.z = res.z; }
  }
  update(dt, ctx) {
    const { player } = ctx;
    const pdx = player.x - this.x, pdz = player.z - this.z;
    const pd = Math.hypot(pdx, pdz);
    let moveSpeed = 0; let wantHeading = this.heading;
    if (this.dodge > 0) {
      this.dodge -= dt;
      const nx = this.x + this.dodgeX * dt, nz = this.z + this.dodgeZ * dt;
      const res = this.world.resolveCircle(nx, nz, this.r, this.y, this.y + 1.7, 0.4, this);
      this.x = res.x; this.z = res.z; moveSpeed = 5; wantHeading = Math.atan2(this.dodgeX, this.dodgeZ);
    } else if (this.talking) {
      wantHeading = Math.atan2(pdx, pdz);
    } else if (this.behavior === 'loop') {
      if (this.wait > 0) { this.wait -= dt; }
      else {
        // espera se o jogador estiver bem à frente
        const [x1, z1] = this.loopPos(this.s + this.dir * 1.2);
        const blocked = Math.hypot(player.x - x1, player.z - z1) < 0.9 && player.mode === 'foot';
        if (!blocked) {
          const ns = this.s + this.dir * this.walk * dt;
          const [tx, tz] = this.loopPos(ns);
          const res = this.world.resolveCircle(tx, tz, this.r, this.y, this.y + 1.7, 0.4, this);
          const moved = Math.hypot(res.x - this.x, res.z - this.z);
          if (res.hit && moved < this.walk * dt * 0.3) { this.stuck += dt; } else this.stuck = 0;
          if (this.stuck > 1.2) { this.dir *= -1; this.stuck = 0; }
          wantHeading = Math.atan2(tx - this.x, tz - this.z);
          this.x = res.x; this.z = res.z; this.s = ns; moveSpeed = this.walk;
          if (rand() < dt * 0.04) this.wait = rr(2, 5);
        }
      }
    } else if (this.behavior === 'patrol') {
      this.patrolT += dt;
      const tx = this.homeX + Math.sin(this.patrolT * 0.12) * 6, tz = this.homeZ;
      const dx = tx - this.x, dz = tz - this.z; const d = Math.hypot(dx, dz);
      if (d > 0.3) { moveSpeed = Math.min(this.walk, d); wantHeading = Math.atan2(dx, dz); this.x += dx / d * moveSpeed * dt; this.z += dz / d * moveSpeed * dt; }
    } else {
      // parado: vira para o jogador se ele estiver perto
      wantHeading = pd < 4 ? Math.atan2(pdx, pdz) : this.homeHeading;
    }
    this.heading = angDamp(this.heading, wantHeading, 7, dt);
    this.speed = damp(this.speed, moveSpeed, 8, dt);
    this.y = damp(this.y, this.world.groundAt(this.x, this.z, 0.2, this.y), 20, dt);
    // anima com menor frequência quando está longe (economia)
    this.animSkip += dt;
    const step = pd > 45 ? 0.1 : 0;
    if (this.animSkip >= step) {
      this.model.update(this.animSkip, { speed: this.speed, grounded: true, mode: 'foot', talk: this.talking });
      this.animSkip = 0;
    }
    this.sync();
  }
  nextLine() {
    if (!this.lines.length) return null;
    const l = this.lines[this.lineIdx % this.lines.length];
    this.lineIdx++;
    return l;
  }
  sync() {
    this.model.root.position.set(this.x, this.y, this.z);
    this.model.root.rotation.y = this.heading;
  }
}
