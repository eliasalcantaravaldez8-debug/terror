// Motoristas com IA usados pelas missões e pela polícia.
// RouteDriver: segue uma rota de pontos (fugas de Victor e Lucas).
// ChaseDriver: persegue um alvo (polícia).  FollowDriver: segue o carro do jogador (escolta).
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

function steerTo(car, tx, tz) {
  const s = Math.sin(car.heading), c = Math.cos(car.heading);
  const dx = tx - car.x, dz = tz - car.z;
  let lz = dx * s + dz * c; const lx = dx * c - dz * s;
  if (lz < 0.5 && Math.abs(lx) < 2) lz = 0.5;
  const ld2 = Math.max(4, lx * lx + lz * lz);
  const angle = Math.atan(2 * car.T.wheelBase * lx / ld2);
  const maxSteer = 0.62 / (1 + Math.abs(car.speed) * 0.07);
  return { steer: clamp(angle / maxSteer, -1, 1), dist: Math.hypot(dx, dz), ahead: lz };
}
function speedControl(car, target) {
  const err = target - car.speed;
  return { throttle: clamp(err * 0.5, 0, 1), brake: clamp(-err * 0.6, 0, 1) };
}

export class RouteDriver {
  constructor(car, route, opts = {}) {
    this.car = car; this.route = route; this.i = 0; this.done = false;
    this.cruise = opts.speed || 24; this.rubber = opts.rubber ?? true; this.player = opts.player;
    this.stuckT = 0; this.reverseT = 0;
    car.driver = 'ai';
  }
  update(dt, ctx) {
    const car = this.car;
    if (this.done) { car.update(dt, { brake: 0, throttle: 0, steer: 0, handbrake: 1 }, ctx.cars); return; }
    if (!this.prev) this.prev = [car.x, car.z];
    let [tx, tz] = this.route[this.i];
    // segue a linha entre o ponto anterior e o atual (fica na faixa)
    const [ax, az] = this.i > 0 ? this.route[this.i - 1] : this.prev;
    const sx = tx - ax, sz = tz - az, sl = Math.hypot(sx, sz) || 1;
    const proj = ((car.x - ax) * sx + (car.z - az) * sz) / sl;
    const look = 6 + Math.abs(car.speed) * 0.45;
    const along = Math.min(sl, Math.max(0, proj) + look);
    const st = steerTo(car, ax + sx / sl * along, az + sz / sl * along);
    st.dist = Math.hypot(tx - car.x, tz - car.z);
    if (proj > sl - 4 || st.dist < 6) { this.i++; if (this.i >= this.route.length) { this.done = true; return; } }
    // curva à frente => reduz
    let target = this.cruise;
    if (this.i + 1 < this.route.length) {
      const [nx, nz] = this.route[this.i + 1];
      const a1 = Math.atan2(tx - car.x, tz - car.z), a2 = Math.atan2(nx - tx, nz - tz);
      let da = Math.abs(a2 - a1); if (da > Math.PI) da = Math.PI * 2 - da;
      if (st.dist < 35 && da > 0.6) target = Math.min(target, 7 + (1 - da / Math.PI) * 6);
    }
    if (this.rubber && this.player) {
      const pd = Math.hypot(this.player.x - car.x, this.player.z - car.z);
      if (pd > 90) target *= 0.6; else if (pd < 18) target *= 1.15;
    }
    let inp = { ...speedControl(car, target), steer: st.steer, handbrake: 0 };
    // destravar se ficar preso
    if (Math.abs(car.speed) < 1 && !this.done) this.stuckT += dt; else this.stuckT = 0;
    if (this.stuckT > 1.5) { this.reverseT = 1.2; this.stuckT = 0; this.stuckCount = (this.stuckCount || 0) + 1; }
    if (this.reverseT > 0) { this.reverseT -= dt; inp = { throttle: 0, brake: 1, steer: -st.steer, handbrake: 0 }; }
    // preso várias vezes seguidas: reaparece no próximo ponto da rota (a fuga continua)
    if (this.stuckCount >= 4 && this.i < this.route.length) {
      const [nx, nz] = this.route[this.i]; const [px, pz] = this.i > 0 ? this.route[this.i - 1] : [car.x, car.z];
      car.place(nx, nz, Math.atan2(nx - px, nz - pz)); car.speed = 8; this.stuckCount = 0; this.i = Math.min(this.i + 1, this.route.length - 1);
    }
    if (car.speed > 5) this.stuckCount = 0;
    car.update(dt, inp, ctx.cars);
  }
}

export class ChaseDriver {
  constructor(car, getTarget, opts = {}) {
    this.car = car; this.getTarget = getTarget; this.max = opts.speed || 26; this.stuckT = 0; this.reverseT = 0;
    car.driver = 'ai';
  }
  update(dt, ctx) {
    const car = this.car; const t = this.getTarget();
    if (!t) { car.update(dt, { brake: 1 }, ctx.cars); return; }
    const st = steerTo(car, t.x, t.z);
    let target = clamp(st.dist * 0.9, 0, this.max);
    if (st.dist < 8) target = Math.min(target, 4);
    let inp = { ...speedControl(car, target), steer: st.steer, handbrake: 0 };
    if (st.ahead < 0 && st.dist < 15) inp = { throttle: 0, brake: 1, steer: -st.steer, handbrake: 0 };
    if (Math.abs(car.speed) < 0.8 && st.dist > 10) this.stuckT += dt; else this.stuckT = 0;
    if (this.stuckT > 1.5) { this.reverseT = 1.1; this.stuckT = 0; }
    if (this.reverseT > 0) { this.reverseT -= dt; inp = { throttle: 0, brake: 1, steer: -st.steer, handbrake: 0 }; }
    car.update(dt, inp, ctx.cars);
    this.dist = st.dist;
  }
}

export class FollowDriver {
  constructor(car, getLeader) { this.car = car; this.getLeader = getLeader; car.driver = 'ai'; this.reverseT = 0; this.stuckT = 0; }
  update(dt, ctx) {
    const car = this.car; const L = this.getLeader();
    if (!L) { car.update(dt, { brake: 1 }, ctx.cars); return; }
    const hx = Math.sin(L.heading), hz = Math.cos(L.heading);
    const tx = L.x - hx * 11, tz = L.z - hz * 11;
    const st = steerTo(car, tx, tz);
    const lead = Math.abs(L.speed || 0);
    let target = st.dist < 4 ? Math.min(lead, 2) : clamp(lead + (st.dist - 8) * 0.6, 0, 34);
    let inp = { ...speedControl(car, target), steer: st.steer, handbrake: 0 };
    if (Math.abs(car.speed) < 0.8 && st.dist > 12) this.stuckT += dt; else this.stuckT = 0;
    if (this.stuckT > 2) { this.reverseT = 1.1; this.stuckT = 0; }
    if (this.reverseT > 0) { this.reverseT -= dt; inp = { throttle: 0, brake: 1, steer: -st.steer, handbrake: 0 }; }
    car.update(dt, inp, ctx.cars);
    this.dist = st.dist;
  }
}
