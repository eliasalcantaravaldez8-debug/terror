// Trânsito com IA: segue faixas da direita, faz curvas nos cruzamentos, respeita semáforos e evita colisões.
import { N, P, ROAD, LANE, roadC } from './city.js';
import { mats } from './materials.js';
import { rand, pick } from './textures.js';

const DIRS = [[0, 1], [1, 0], [0, -1], [-1, 0]]; // +z, +x, -z, -x
const AXIS = ['NS', 'EW', 'NS', 'EW'];
const CYCLE = 26;
export class TrafficLights {
  constructor() { this.t = 0; }
  state(axis) {
    const t = this.t % CYCLE;
    if (axis === 'NS') return t < 10 ? 'G' : t < 12.5 ? 'Y' : 'R';
    return t >= 13 && t < 23 ? 'G' : t >= 23 && t < 25.5 ? 'Y' : 'R';
  }
  update(dt) {
    this.t += dt;
    const M = mats();
    const off = M.tlOff;
    const on = [0xff2a1a, 0xffb21a, 0x2aff6a];
    for (const ax of ['NS', 'EW']) {
      const s = this.state(ax); const idx = s === 'R' ? 0 : s === 'Y' ? 1 : 2;
      M.tl[ax].forEach((m, i) => m.color.setHex(i === idx ? on[i] : off[i]));
    }
  }
}

export class TrafficDriver {
  constructor(car, a, b, d) {
    this.car = car; this.a = a; this.b = b; this.d = d; // nó de origem (a: índice x, b: índice z), direção
    this.next = this.chooseNext();
    this.cruise = 9 + rand() * 4;
    this.honk = 0;
    const [fx, fz] = DIRS[d];
    const [rx, rz] = [-fz, fx];
    const start = 8 + rand() * 40;
    car.place(roadC(a) + fx * start + rx * LANE, roadC(b) + fz * start + rz * LANE, Math.atan2(fx, fz));
    car.driver = 'ai';
  }
  validDir(a, b, d) { const [fx, fz] = DIRS[d]; const na = a + fx, nb = b + fz; return na >= 0 && na <= N && nb >= 0 && nb <= N; }
  chooseNext() {
    const [fx, fz] = DIRS[this.d];
    const na = this.a + fx, nb = this.b + fz;
    const opts = [];
    for (const [nd, w] of [[this.d, 3], [(this.d + 1) % 4, 1], [(this.d + 3) % 4, 1]]) if (this.validDir(na, nb, nd)) for (let i = 0; i < w; i++) opts.push(nd);
    if (!opts.length) opts.push((this.d + 2) % 4);
    return pick(opts);
  }
  lane(a, b, d) {
    const [fx, fz] = DIRS[d]; return { ox: roadC(a) + -fz * LANE, oz: roadC(b) + fx * LANE, fx, fz };
  }
  update(dt, ctx) {
    const car = this.car;
    let L = this.lane(this.a, this.b, this.d);
    let p = (car.x - L.ox) * L.fx + (car.z - L.oz) * L.fz;
    if (p > P - ROAD / 2 - 0.5) {
      const [fx, fz] = DIRS[this.d];
      this.a += fx; this.b += fz; this.d = this.next; this.next = this.chooseNext();
      L = this.lane(this.a, this.b, this.d);
      p = (car.x - L.ox) * L.fx + (car.z - L.oz) * L.fz;
    }
    const turning = this.next !== this.d;
    const leftTurn = this.next === (this.d + 1) % 4;
    // ultrapassagem de obstáculo parado (ex.: carro largado na faixa)
    this.overtakeT = Math.max(0, (this.overtakeT || 0) - dt);
    const off = this.overtakeT > 0 ? -3.4 : 0;
    const look = 4.5 + Math.abs(car.speed) * 0.45;
    const tp = Math.max(p, -6) + look;
    const tx = L.ox + L.fx * tp - L.fz * off, tz = L.oz + L.fz * tp + L.fx * off;
    const s = Math.sin(car.heading), c = Math.cos(car.heading);
    const dx = tx - car.x, dz = tz - car.z;
    const lzT = dx * s + dz * c, lxT = dx * c - dz * s;
    const ld2 = Math.max(4, lxT * lxT + lzT * lzT);
    const angle = Math.atan(2 * car.T.wheelBase * lxT / ld2);
    const maxSteer = (car.T.steer || 0.62) / (1 + Math.abs(car.speed) * 0.07);
    const steer = Math.max(-1, Math.min(1, angle / maxSteer));
    // velocidade alvo
    let target = this.cruise;
    const toIntersection = P - ROAD / 2 - p;
    if (toIntersection < 22) target = Math.min(target, turning ? 5 : 8.5);
    if (p < 0) target = Math.min(target, 6);
    const stopP = P - ROAD / 2 - 3.8 - car.T.L / 2;
    const distStop = stopP - p;
    const stopAt = (d) => { target = Math.min(target, Math.sqrt(2 * 3.5 * Math.max(0, d - 0.3))); };
    const light = ctx.lights.state(AXIS[this.d]);
    if (light !== 'G' && distStop > -0.5 && distStop < 35) {
      if (!(light === 'Y' && distStop < 4)) stopAt(distStop);
    }
    // cruzamento ocupado / conversão à esquerda cede passagem
    const [fx0, fz0] = DIRS[this.d];
    const ix = roadC(this.a + fx0), iz = roadC(this.b + fz0);
    const approaching = distStop > -0.5 && distStop < 14;
    const inside = Math.abs(car.x - ix) < 7 && Math.abs(car.z - iz) < 7;
    if (approaching || (leftTurn && inside)) {
      for (const o of ctx.cars) {
        if (o === car || o.removed) continue;
        const ox = o.x - ix, oz = o.z - iz;
        if (Math.abs(ox) > 40 || Math.abs(oz) > 40) continue;
        const dot = Math.sin(o.heading) * s + Math.cos(o.heading) * c;
        const oInside = Math.abs(ox) < 7 && Math.abs(oz) < 7;
        // alguém atravessando dentro do cruzamento
        if (approaching && oInside && dot < 0.8 && Math.abs(o.speed) > 0.3) stopAt(distStop);
        // conversão à esquerda: espera quem vem no sentido contrário
        if (leftTurn && dot < -0.7 && Math.abs(o.speed) > 1) {
          const toI = -(ox * Math.sin(o.heading) + oz * Math.cos(o.heading));
          if (toI > -4 && toI < 32) { if (approaching) stopAt(distStop); else if (inside) target = Math.min(target, 0); }
        }
      }
    }
    // obstáculos: previsão de colisão pelo tempo até a aproximação máxima
    const vx = car.velX, vz = car.velZ;
    let blockedBy = null;
    const checkObs = (o, ox, oz, ovx, ovz, halfLen, width) => {
      const rx = ox - car.x, rz = oz - car.z;
      if (rx * rx + rz * rz > 1200) return;
      const fwd = rx * s + rz * c, side = rx * c - rz * s;
      // à frente na mesma faixa
      if (fwd > 0 && fwd < 28 && Math.abs(side - steer * fwd * 0.08) < width) {
        const gap = fwd - car.T.L / 2 - halfLen;
        target = Math.min(target, Math.max(0, gap - 2.5) * 0.75);
        if (gap < 6) blockedBy = o;
      }
      // trajetórias que se cruzam nos próximos 2,5 s
      const wx = ovx - vx, wz = ovz - vz; const w2 = wx * wx + wz * wz;
      if (w2 > 1 && fwd > -2) {
        const tca = -(rx * wx + rz * wz) / w2;
        if (tca > 0 && tca < 2.5) {
          const mx = rx + wx * tca, mz = rz + wz * tca;
          if (mx * mx + mz * mz < (halfLen + car.T.L / 2) ** 2 * 0.55 + 2) target = Math.min(target, Math.max(0, Math.abs(car.speed) * (tca / 2.5) - 2));
        }
      }
    };
    for (const o of ctx.cars) if (o !== car && !o.removed) checkObs(o, o.x, o.z, o.velX, o.velZ, o.T.L / 2, 2.0);
    if (ctx.player.mode === 'foot') checkObs(ctx.player, ctx.player.x, ctx.player.z, 0, 0, 0.4, 1.7);
    for (const n of ctx.npcs) if (n.dodge > 0 || n.behavior === 'panic' || (n.alive && !n.inCar && Math.abs(n.x - car.x) < 12 && Math.abs(n.z - car.z) < 12 && Math.abs(car.x - n.x) + Math.abs(car.z - n.z) < 12 && ctxRoad(n))) checkObs(n, n.x, n.z, 0, 0, 0.3, 1.5);
    // preso atrás de algo parado (sem semáforo) => ultrapassa quando a contramão está livre
    if (blockedBy && Math.abs(blockedBy.speed || 0) < 0.3 && blockedBy.driver !== 'ai' && light === 'G' && car.speed < 0.5) this.blockT = (this.blockT || 0) + dt; else this.blockT = 0;
    if (this.blockT > 5 && !this.overtakeT) {
      const free = !ctx.cars.some((o) => o !== car && Math.abs(o.speed) > 1 && (Math.sin(o.heading) * s + Math.cos(o.heading) * c) < -0.7 && Math.hypot(o.x - car.x, o.z - car.z) < 45);
      if (free) { this.overtakeT = 4.5; this.blockT = 0; }
    }
    if (this.overtakeT > 0) target = Math.max(target, 4);
    if (blockedBy === ctx.player && car.speed < 0.5) this.honk += dt; else this.honk = 0;
    const err = target - car.speed;
    const input = { throttle: Math.max(0, Math.min(1, err * 0.45)), brake: Math.max(0, Math.min(1, -err * 0.8)), steer, handbrake: 0 };
    if (target < 0.3 && car.speed < 0.6) { input.brake = 1; input.throttle = 0; }
    car.update(dt, input, ctx.cars);
  }
}
// pedestre na pista? (fora das calçadas)
function ctxRoad(n) { const u = (v) => { const k = ((v + 228 + 6) % P + P) % P; return k < ROAD; }; return u(n.x) || u(n.z); }

export function spawnTraffic(count, makeCar, avoid) {
  const drivers = [];
  let tries = 0;
  while (drivers.length < count && tries++ < 400) {
    const a = Math.floor(rand() * (N + 1)), b = Math.floor(rand() * (N + 1)), d = Math.floor(rand() * 4);
    const [fx, fz] = DIRS[d];
    if (a + fx < 0 || a + fx > N || b + fz < 0 || b + fz > N) continue;
    const x = roadC(a) + fx * P / 2, z = roadC(b) + fz * P / 2;
    if (Math.hypot(x - avoid.x, z - avoid.z) < 40) continue;
    if (drivers.some((dr) => dr.a === a && dr.b === b && dr.d === d)) continue;
    const car = makeCar(pick(['sedan', 'hatch', 'popular', 'suv', 'pickup', 'taxi', 'sedan', 'police', 'luxo', 'coupe', 'classico', 'besouro']));
    const drv = new TrafficDriver(car, a, b, d);
    // não nasce em cima de outro carro
    if (drivers.some((dr) => Math.hypot(dr.car.x - car.x, dr.car.z - car.z) < 12)) { car.place(car.x + DIRS[d][0] * 14, car.z + DIRS[d][1] * 14, car.heading); }
    drivers.push(drv);
  }
  return drivers;
}
