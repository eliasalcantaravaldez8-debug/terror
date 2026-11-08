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
    // troca de segmento ao entrar no cruzamento
    if (p > P - ROAD / 2 - 0.5) {
      const [fx, fz] = DIRS[this.d];
      this.a += fx; this.b += fz; this.d = this.next; this.next = this.chooseNext();
      L = this.lane(this.a, this.b, this.d);
      p = (car.x - L.ox) * L.fx + (car.z - L.oz) * L.fz;
    }
    const turning = this.next !== this.d;
    const look = 4.5 + Math.abs(car.speed) * 0.45;
    const tp = Math.max(p, -6) + look;
    const tx = L.ox + L.fx * tp, tz = L.oz + L.fz * tp;
    // perseguição pura
    const s = Math.sin(car.heading), c = Math.cos(car.heading);
    const dx = tx - car.x, dz = tz - car.z;
    const lzT = dx * s + dz * c, lxT = dx * c - dz * s;
    const ld2 = Math.max(4, lxT * lxT + lzT * lzT);
    const angle = Math.atan(2 * car.T.wheelBase * lxT / ld2);
    const maxSteer = 0.62 / (1 + Math.abs(car.speed) * 0.07);
    const steer = Math.max(-1, Math.min(1, angle / maxSteer));
    // velocidade alvo
    let target = this.cruise;
    const toIntersection = P - ROAD / 2 - p;
    if (turning && toIntersection < 18) target = Math.min(target, 5.5);
    if (p < 0) target = Math.min(target, 6); // ainda fazendo a curva
    const stopP = P - ROAD / 2 - 3.8 - car.T.L / 2;
    const distStop = stopP - p;
    const light = ctx.lights.state(AXIS[this.d]);
    if (light !== 'G' && distStop > -0.5 && distStop < 35) {
      if (!(light === 'Y' && distStop < 5)) target = Math.min(target, Math.sqrt(2 * 3.5 * Math.max(0, distStop - 0.3)));
    }
    // obstáculos à frente (carros, jogador, pedestres)
    let blockedByPlayer = false;
    const checkObs = (ox, oz, halfLen, width) => {
      const ddx = ox - car.x, ddz = oz - car.z;
      if (ddx * ddx + ddz * ddz > 900) return;
      const fwd = ddx * s + ddz * c, side = ddx * c - ddz * s;
      if (fwd > 0 && fwd < 26 && Math.abs(side - steer * fwd * 0.08) < width) {
        const gap = fwd - car.T.L / 2 - halfLen;
        target = Math.min(target, Math.max(0, gap - 2.2) * 0.8);
        return true;
      }
      return false;
    };
    for (const o of ctx.cars) if (o !== car) checkObs(o.x, o.z, o.T.L / 2, 1.9);
    if (ctx.player.mode === 'foot') blockedByPlayer = checkObs(ctx.player.x, ctx.player.z, 0.3, 1.6);
    for (const n of ctx.npcs) if (n.dodge > 0) checkObs(n.x, n.z, 0.3, 1.5);
    if (blockedByPlayer && car.speed < 0.5) this.honk += dt; else this.honk = 0;
    const err = target - car.speed;
    const input = { throttle: Math.max(0, Math.min(1, err * 0.45)), brake: Math.max(0, Math.min(1, -err * 0.7)), steer, handbrake: 0 };
    if (target < 0.3 && car.speed < 0.6) { input.brake = 1; input.throttle = 0; }
    car.update(dt, input, ctx.cars);
  }
}

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
    const car = makeCar(pick(['sedan', 'hatch', 'suv', 'pickup', 'taxi', 'sedan', 'police']));
    drivers.push(new TrafficDriver(car, a, b, d));
  }
  return drivers;
}
