// PARTIDA DE FUTEBOL SIMULADA POR IA no Estádio de Westhaven.
// 11 x 11 (goleiro, 4 defensores, 4 meias, 2 atacantes) + árbitro. A bola tem física (gravidade, quique, atrito na grama).
// Cada jogador decide: chutar, cruzar, passar (para o companheiro mais livre e com linha de passe), driblar, marcar e dar bote.
// Saídas de bola: lateral, escanteio, tiro de meta, falta, gol (comemoração) e saída de centro.
// Tempo: 90 minutos simulados = 2 min reais por tempo + 10 s de intervalo (os jogadores vão para o túnel e voltam).
import * as THREE from 'three';
import { Humanoid } from './humanoid.js';
import { ST } from './stadium.js';
import { CURB } from './city.js';

export const HALF_REAL = 120, INTERVAL_REAL = 10;
const GW = 7.32 / 2, GH = 2.44, L = ST.FL / 2, WD = ST.FW / 2, BR = 0.11;
export const HOME = { name: 'Westhaven FC', short: 'WESTHAVEN', shirt: 0x1a4aa8, pants: 0xf2f2f2, gk: 0x1a1a1a };
export const AWAYS = [
  { name: 'Los Valles United', short: 'LOS VALLES', shirt: 0xb01a1a, pants: 0x111111, gk: 0x2a8a2a },
  { name: 'Blackwood Athletic', short: 'BLACKWOOD', shirt: 0x2a2a2a, pants: 0x2a2a2a, gk: 0xd8a01a },
  { name: 'Porto da Baía EC', short: 'PORTO DA BAÍA', shirt: 0x1a8a4a, pants: 0xf2f2f2, gk: 0x8a1a8a },
  { name: 'Atlético Monte Verde', short: 'MONTE VERDE', shirt: 0xe8c21a, pants: 0x1a3a8a, gk: 0x111111 },
];
// formação 4-4-2 para o time que ataca para +x
const FORM = [['GK', -L + 1.5, 0], ['DF', -L + 13, -17], ['DF', -L + 11, -6], ['DF', -L + 11, 6], ['DF', -L + 13, 17], ['MF', -L + 30, -19], ['MF', -L + 27, -6], ['MF', -L + 27, 6], ['MF', -L + 30, 19], ['FW', -L + 41, -6], ['FW', -L + 41, 6]];
const SKINS = [0xf1c8a4, 0xd9a47c, 0xb57a52, 0x8d5a3a, 0x6a3f26, 0xe8bc94];
const rr = (a, b) => a + Math.random() * (b - a);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
function ballTexture() {
  const c = document.createElement('canvas'); c.width = 256; c.height = 128; const g = c.getContext('2d'); g.fillStyle = '#f4f4f4'; g.fillRect(0, 0, 256, 128);
  g.fillStyle = '#151515'; for (let i = 0; i < 12; i++) { const x = (i % 6) * 44 + (i > 5 ? 22 : 0) + 10, y = i > 5 ? 86 : 30; g.beginPath(); for (let k = 0; k < 5; k++) { const a = k / 5 * Math.PI * 2 - Math.PI / 2; g.lineTo(x + Math.cos(a) * 12, y + Math.sin(a) * 12); } g.fill(); }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}

export class Match {
  constructor(scene, opts = {}) {
    this.scene = scene; this.sound = opts.sound || (() => {}); this.ox = opts.ox ?? ST.x; this.oz = opts.oz ?? ST.z; this.home = HOME; this.away = opts.away || AWAYS[0];
    this.state = 'walkout'; this.half = 1; this.t = 0; this.stateT = 0; this.score = [0, 0]; this.events = []; this.excite = 0.3; this.cheerSide = 0; this.over = false;
    this.kickoffTeam = 0; this.firstKick = 0; this.visible = true; this.y = CURB;
    this.ball = { x: 0, z: 0, y: BR, vx: 0, vz: 0, vy: 0, owner: null, last: 0 };
    this.ballMesh = new THREE.Mesh(new THREE.SphereGeometry(BR, 18, 12), new THREE.MeshLambertMaterial({ map: ballTexture() })); this.ballMesh.castShadow = true; scene.add(this.ballMesh);
    this.players = [];
    for (let team = 0; team < 2; team++) {
      const kit = team ? this.away : this.home;
      FORM.forEach(([role, bx, bz], i) => {
        const gk = role === 'GK';
        const look = { skin: SKINS[Math.floor(Math.random() * SKINS.length)], hair: Math.random() < 0.5 ? 0x1a1410 : 0x3a2a1a, hairStyle: Math.random() < 0.3 ? 'bald' : 'short', shirt: gk ? kit.gk : kit.shirt, pants: gk ? 0x111111 : kit.pants, shoes: 0x111111, build: rr(0.95, 1.08), height: rr(0.96, 1.05), longSleeve: gk, jacket: null, hat: null, tie: null };
        const model = new Humanoid(look); scene.add(model.root);
        this.players.push({ team, role, i, bx, bz, x: 0, z: 0, vx: 0, vz: 0, heading: 0, model, maxV: gk ? 6.2 : rr(6.6, 7.9), skill: rr(0.85, 1.15), kickCd: 0, think: 0, hidden: false, tackleCd: 0 });
      });
    }
    this.ref = { x: 0, z: 0, vx: 0, vz: 0, heading: 0, maxV: 6.5, model: new Humanoid({ skin: 0xd9a47c, hair: 0x1a1410, shirt: 0x111111, pants: 0x111111, shoes: 0x111111, longSleeve: false, hairStyle: 'short' }) }; scene.add(this.ref.model.root);
    // todos começam no túnel
    this.tunnel = opts.tunnel || [0, WD + 8];
    for (const p of this.allPeople()) { p.x = this.tunnel[0] + rr(-1.5, 1.5); p.z = this.tunnel[1] + rr(0, 4); }
    this.setDirs();
  }
  allPeople() { return [...this.players, this.ref]; }
  setDirs() { this.dir = this.half === 1 ? [1, -1] : [-1, 1]; } // +1 = ataca para +x
  get minute() { return Math.min(90, Math.floor((this.half - 1) * 45 + (this.t / HALF_REAL) * 45)); }
  clock() { if (this.state === 'interval') return 'INTERVALO'; if (this.over) return 'FIM DE JOGO'; return `${this.half}º TEMPO  ${String(this.minute).padStart(2, '0')}'`; }
  target(p) { // posição tática conforme a bola e quem tem a posse
    const d = this.dir[p.team], b = this.ball; const att = (this.ball.owner ? this.ball.owner.team : this.ball.last) === p.team;
    if (p.role === 'GK') { const gx = -d * L; return [gx + d * clamp(2 + Math.abs(b.x - gx) * 0.03, 1.2, 5), clamp(b.z * 0.3, -GW + 0.4, GW - 0.4)]; }
    let x = d * p.bx + b.x * 0.55 + d * (att ? 7 : -4); const z = p.bz * (att ? 1.05 : 0.85) + b.z * 0.25;
    if (p.role === 'FW' && att) x = Math.max(d * x, d * b.x + 4) * d;
    return [clamp(x, -L + 2, L - 2), clamp(z, -WD + 1.5, WD - 1.5)];
  }
  move(p, tx, tz, spd, dt) {
    const dx = tx - p.x, dz = tz - p.z, d = Math.hypot(dx, dz); let want = d > 0.3 ? Math.min(spd, d * 2.2) : 0;
    const wx = d > 0.01 ? dx / d * want : 0, wz = d > 0.01 ? dz / d * want : 0; const k = Math.min(1, dt * 5);
    p.vx += (wx - p.vx) * k; p.vz += (wz - p.vz) * k; p.x += p.vx * dt; p.z += p.vz * dt;
    if (Math.hypot(p.vx, p.vz) > 0.4) p.heading = Math.atan2(p.vx, p.vz);
  }
  face(p, x, z) { p.heading = Math.atan2(x - p.x, z - p.z); }
  kick(p, tx, tz, speed, loft = 0) {
    const b = this.ball; const dx = tx - b.x, dz = tz - b.z, d = Math.hypot(dx, dz) || 1;
    b.vx = dx / d * speed; b.vz = dz / d * speed; b.vy = loft; b.owner = null; b.last = p.team; b.y = Math.max(b.y, BR);
    p.kickCd = 0.55; p.model.kick(Math.min(1.4, speed / 18)); this.face(p, tx, tz); if (this.visible) this.sound('kick');
  }
  nearestTo(x, z, team, exclude = null, noGK = false) { let best = null, bd = 1e9; for (const p of this.players) { if (p.team !== team || p === exclude || p.hidden || (noGK && p.role === 'GK')) continue; const d = Math.hypot(p.x - x, p.z - z); if (d < bd) { bd = d; best = p; } } return [best, bd]; }
  openness(x, z, team) { let m = 99; for (const q of this.players) if (q.team !== team) m = Math.min(m, Math.hypot(q.x - x, q.z - z)); return m; }
  laneClear(ax, az, bx, bz, team) { let m = 99; const vx = bx - ax, vz = bz - az, L2 = vx * vx + vz * vz || 1; for (const q of this.players) { if (q.team === team) continue; const t = clamp(((q.x - ax) * vx + (q.z - az) * vz) / L2, 0, 1); m = Math.min(m, Math.hypot(q.x - ax - vx * t, q.z - az - vz * t)); } return m; }
  // ------------- jogador com a bola -------------
  decide(p) {
    const d = this.dir[p.team], gx = d * L; const distG = Math.hypot(gx - p.x, p.z);
    const pressure = this.openness(p.x, p.z, p.team);
    if (p.role === 'GK') { const best = this.bestPass(p, 10, 45); if (best) this.kick(p, best.x, best.z, clamp(Math.hypot(best.x - p.x, best.z - p.z) * 0.75 + 6, 10, 26), Math.hypot(best.x - p.x, best.z - p.z) > 25 ? 6 : 1); else this.kick(p, 0, rr(-15, 15), 24, 8); return; }
    if (distG < 24 && Math.abs(p.z) < 17 && Math.random() < (distG < 14 ? 0.8 : 0.45) * p.skill) { this.shoot(p, gx, distG); return; }
    if (Math.abs(p.z) > 16 && d * p.x > L - 26 && Math.random() < 0.6) { // cruzamento na área
      const fw = this.players.filter((q) => q.team === p.team && q !== p && q.role !== 'GK' && d * q.x > L - 20);
      const tg = fw.length ? fw[Math.floor(Math.random() * fw.length)] : { x: gx - d * 9, z: 0 };
      this.kick(p, tg.x + rr(-1.5, 1.5), tg.z + rr(-2, 2), clamp(Math.hypot(tg.x - p.x, tg.z - p.z) * 0.85 + 6, 14, 24), 7.5); this.lastCross = { team: p.team, t: 2 }; return;
    }
    const best = this.bestPass(p, 6, 36);
    if (best && (pressure < 3.2 || best.score > 9 || Math.random() < 0.35)) { const dd = Math.hypot(best.x - p.x, best.z - p.z); this.kick(p, best.x + best.vx * 0.3, best.z + best.vz * 0.3, clamp(dd * 0.85 + 5, 8, 24), dd > 24 ? 4.5 : 0.4); return; }
    p.dribble = 0.5 + Math.random() * 0.6; // dribla mais um pouco
  }
  bestPass(p, dmin, dmax) {
    const d = this.dir[p.team]; let best = null, bs = -1e9;
    for (const q of this.players) {
      if (q.team !== p.team || q === p || q.hidden || (q.role === 'GK' && p.role !== 'GK')) continue;
      const dist = Math.hypot(q.x - p.x, q.z - p.z); if (dist < dmin || dist > dmax) continue;
      const lane = this.laneClear(p.x, p.z, q.x, q.z, p.team); if (lane < 1.6) continue;
      const score = d * (q.x - p.x) * 0.55 + Math.min(8, this.openness(q.x, q.z, p.team)) * 1.3 + Math.min(4, lane) * 1.2 - dist * 0.12 + rr(-1.5, 1.5);
      if (score > bs) { bs = score; best = q; }
    }
    return best ? { x: best.x, z: best.z, vx: best.vx, vz: best.vz, score: bs } : null;
  }
  shoot(p, gx, distG) {
    const side = Math.random() < 0.5 ? -1 : 1, err = (1.3 + distG * 0.05) / p.skill;
    const tz = clamp(side * rr(GW * 0.35, GW - 0.35) + rr(-err, err), -GW - 2.5, GW + 2.5);
    const speed = rr(20, 27) * Math.min(1.1, p.skill), loft = rr(1.2, 4.5) + (distG > 18 ? 1.5 : 0);
    this.kick(p, gx, tz, speed, loft); this.lastShot = { team: p.team, t: 1.5 }; this.excite = Math.max(this.excite, 0.75);
  }
  // ------------- passo da simulação -------------
  update(dt) {
    if (this.over) return;
    dt = Math.min(dt, 0.1); let n = Math.ceil(dt / (1 / 30)); const h = dt / n;
    while (n-- > 0) this.step(h);
  }
  step(dt) {
    this.stateT += dt; this.excite = Math.max(0.25, this.excite - dt * 0.12); if (this.goalT > 0) this.goalT -= dt;
    const S = this.state;
    if (S === 'walkout' || S === 'walkback') { // entram em campo pelo túnel
      let ok = true; for (const p of this.allPeople()) { p.hidden = false; const [tx, tz] = p === this.ref ? [0, -3] : this.kickoffPos(p); this.move(p, tx, tz, 5, dt); if (Math.hypot(tx - p.x, tz - p.z) > 0.8) ok = false; }
      if ((ok && this.stateT > 4) || this.stateT > 16) this.setPiece('kickoff', this.half === 1 ? this.firstKick : 1 - this.firstKick, [0, 0]);
      this.animate(dt); return;
    }
    if (S === 'toTunnel') {
      let all = true; for (const p of this.allPeople()) { if (p.hidden) continue; all = false; this.move(p, this.tunnel[0], this.tunnel[1] + 2, 4.2, dt); if (Math.hypot(p.x - this.tunnel[0], p.z - this.tunnel[1] - 2) < 1.6) { p.hidden = true; p.model.root.visible = false; } }
      this.ballMesh.visible = false;
      if (all || this.stateT > 25) { if (this.half === 1) { this.state = 'interval'; this.stateT = 0; } else { this.over = true; this.state = 'over'; } }
      this.animate(dt); return;
    }
    if (S === 'interval') { if (this.stateT >= INTERVAL_REAL) { this.half = 2; this.t = 0; this.setDirs(); this.state = 'walkback'; this.stateT = 0; for (const p of this.allPeople()) { p.x = this.tunnel[0] + rr(-1.5, 1.5); p.z = this.tunnel[1] + rr(1, 3); p.hidden = false; p.model.root.visible = this.visible; } this.ballMesh.visible = this.visible; } return; }
    // relógio do jogo (corre durante a bola rolando, bolas paradas e comemorações)
    this.t += dt;
    if (this.t >= HALF_REAL && S !== 'goal') { this.sound('whistle3'); this.events.push({ t: this.minute, type: this.half === 1 ? 'intervalo' : 'fim' }); this.state = 'toTunnel'; this.stateT = 0; this.ball.owner = null; return; }
    if (S === 'goal') { this.celebrate(dt); if (this.stateT > 6) this.setPiece('kickoff', this.concede, [0, 0]); this.animate(dt); return; }
    if (S === 'dead') { this.deadBall(dt); this.animate(dt); return; }
    this.play(dt); this.animate(dt);
  }
  kickoffPos(p) { const d = this.dir[p.team]; let x = d * p.bx * 0.95, z = p.bz; x = d > 0 ? Math.min(x, -1) : Math.max(x, 1); if (p.role === 'FW' && this.kickoffTeam === p.team) { x = -d * 0.6; z = p.bz > 0 ? 0.8 : -9; } return [x, z]; }
  setPiece(type, team, spot) {
    this.state = 'dead'; this.stateT = 0; const b = this.ball; b.owner = null; b.vx = b.vz = b.vy = 0; b.x = spot[0]; b.z = spot[1]; b.y = BR;
    this.sp = { type, team, spot }; this.kickoffTeam = team;
    let taker;
    if (type === 'goalkick') taker = this.players.find((p) => p.team === team && p.role === 'GK');
    else if (type === 'kickoff') taker = this.players.find((p) => p.team === team && p.role === 'FW');
    else [taker] = this.nearestTo(spot[0], spot[1], team, null, true);
    this.sp.taker = taker; if (type !== 'kickoff') this.sound('whistle');
  }
  deadBall(dt) {
    const sp = this.sp, b = this.ball; const tk = sp.taker;
    for (const p of this.players) {
      if (p === tk) { const d = this.dir[p.team]; const bx = sp.spot[0] - (sp.type === 'throw' ? 0 : d * 0.7), bz = sp.spot[1] + (sp.type === 'throw' ? Math.sign(sp.spot[1]) * 0.6 : 0); this.move(p, bx, bz, 6, dt); this.face(p, 0, 0); continue; }
      let [tx, tz] = sp.type === 'kickoff' ? this.kickoffPos(p) : this.target(p);
      if (p.team !== sp.team && Math.hypot(tx - sp.spot[0], tz - sp.spot[1]) < 9.2) { const a = Math.atan2(tz - sp.spot[1], tx - sp.spot[0]); tx = sp.spot[0] + Math.cos(a) * 9.2; tz = sp.spot[1] + Math.sin(a) * 9.2; }
      this.move(p, tx, tz, 5.5, dt);
    }
    this.moveRef(dt);
    const ready = Math.hypot(tk.x - (sp.spot[0]), tk.z - sp.spot[1]) < 1.6;
    if (this.stateT > (sp.type === 'kickoff' ? 2.2 : 1.6) && ready) {
      this.state = 'play'; this.stateT = 0; const d = this.dir[sp.team], gx = d * L;
      if (sp.type === 'kickoff') { this.sound('whistle'); const [mate] = this.nearestTo(-d * 8, 0, sp.team, tk, true); this.kick(tk, mate ? mate.x : -d * 8, mate ? mate.z : 0, 9); }
      else if (sp.type === 'throw') { tk.model.throwIn(); const best = this.bestPass(tk, 4, 18) || { x: tk.x + d * 8, z: tk.z * 0.7 }; this.kick(tk, best.x, best.z, 10, 3); tk.model.kickT = 0; }
      else if (sp.type === 'corner') { const tg = this.players.filter((q) => q.team === sp.team && q.role !== 'GK' && q !== tk); const t2 = tg.sort((a, c) => Math.hypot(a.x - (gx - d * 8), a.z) - Math.hypot(c.x - (gx - d * 8), c.z))[0]; this.kick(tk, t2 ? t2.x : gx - d * 9, t2 ? t2.z : 0, 19, 8); this.lastCross = { team: sp.team, t: 2 }; }
      else if (sp.type === 'goalkick') { const best = this.bestPass(tk, 15, 50); this.kick(tk, best ? best.x : 0, best ? best.z : rr(-15, 15), 25, 9); }
      else if (sp.type === 'penalty') { this.shoot(tk, gx, 11); }
      else { const distG = Math.hypot(gx - b.x, b.z); if (distG < 27 && Math.random() < 0.6) this.shoot(tk, gx, distG); else { const best = this.bestPass(tk, 6, 30); this.kick(tk, best ? best.x : tk.x + d * 10, best ? best.z : tk.z, 15, 1); } }
    }
  }
  play(dt) {
    const b = this.ball;
    for (const p of this.players) { p.kickCd -= dt; p.think -= dt; p.tackleCd -= dt; if (p.dribble) p.dribble -= dt; }
    if (this.lastShot) { this.lastShot.t -= dt; if (this.lastShot.t <= 0) this.lastShot = null; }
    // física da bola
    if (b.owner) { const o = b.owner; const ahead = 0.55; b.x = o.x + Math.sin(o.heading) * ahead; b.z = o.z + Math.cos(o.heading) * ahead; b.vx = o.vx; b.vz = o.vz; b.y = BR; b.vy = 0; }
    else {
      b.x += b.vx * dt; b.z += b.vz * dt; b.y += b.vy * dt;
      if (b.y > BR) { b.vy -= 9.8 * dt; b.vx *= 1 - dt * 0.05; b.vz *= 1 - dt * 0.05; }
      else { b.y = BR; if (b.vy < -1.2) { b.vy = -b.vy * 0.52; b.vx *= 0.88; b.vz *= 0.88; } else b.vy = 0; const f = 1 - dt * 0.75; b.vx *= f; b.vz *= f; if (Math.hypot(b.vx, b.vz) < 0.15) b.vx = b.vz = 0; }
    }
    // gol / fora
    if (Math.abs(b.x) > L + BR) {
      const side = Math.sign(b.x); const scorer = this.dir[0] === side ? 0 : 1;
      if (Math.abs(b.z) < GW && b.y < GH) { this.goal(scorer); return; }
      const defending = 1 - scorer; // time que defende este lado
      if (b.last === defending) this.setPiece('corner', scorer, [side * (L - 0.3), Math.sign(b.z || 1) * (WD - 0.3)]);
      else this.setPiece('goalkick', defending, [side * (L - 5.5), 0]);
      return;
    }
    if (Math.abs(b.z) > WD + BR) { this.setPiece('throw', 1 - b.last, [clamp(b.x, -L + 1, L - 1), Math.sign(b.z) * (WD - 0.05)]); return; }
    // goleiros: defesa
    for (const gk of this.players.filter((p) => p.role === 'GK')) {
      const d = this.dir[gk.team], own = -d * L; const toward = -d * b.vx;
      if (!b.owner && toward > 6 && Math.abs(b.x - own) < 30) {
        const tHit = Math.abs((own - b.x) / (b.vx || 1e-6)); const zHit = b.z + b.vz * tHit;
        if (Math.abs(zHit) < GW + 1) { this.move(gk, own + d * 0.8, clamp(zHit, -GW, GW), 7.5, dt); gk.diving = true; }
        if (Math.hypot(b.x - gk.x, b.z - gk.z) < 1.5 + gk.skill * 0.3 && b.y < 2.6 && gk.kickCd <= 0) {
          const sp = Math.hypot(b.vx, b.vz); const save = clamp(0.78 - (sp - 18) * 0.025 + (gk.skill - 1) * 0.5, 0.35, 0.92);
          if (Math.random() < save) {
            this.excite = Math.max(this.excite, 0.7); this.events.push({ t: this.minute, type: 'defesa', team: gk.team });
            if (sp < 21 && b.y < 1.7 && Math.random() < 0.55) { b.owner = gk; b.last = gk.team; gk.hold = 1.3; gk.model.throwIn(); }
            else { b.vx = -b.vx * 0.35; b.vz = rr(-6, 6); b.vy = rr(1.5, 4); b.last = gk.team; gk.kickCd = 0.8; }
          } else gk.kickCd = 1;
        }
      } else gk.diving = false;
    }
    // posse: quem chega na bola domina
    if (!b.owner && b.y < 0.7) {
      let best = null, bd = 0.85; for (const p of this.players) { if (p.kickCd > 0 || p.hidden) continue; const d = Math.hypot(p.x - b.x, p.z - b.z); if (d < bd && (Math.hypot(b.vx, b.vz) < 14 || p.role === 'GK')) { bd = d; best = p; } }
      if (best) { b.owner = best; b.last = best.team; best.think = rr(0.15, 0.45); }
    } else if (!b.owner && b.y < 2.2 && this.lastCross) { // cabeceio após cruzamento
      for (const p of this.players) { if (p.team !== this.lastCross.team || p.kickCd > 0) continue; if (Math.hypot(p.x - b.x, p.z - b.z) < 1.0) { const d = this.dir[p.team]; this.kick(p, d * L, rr(-GW + 0.5, GW - 0.5), rr(13, 18), rr(-1, 1.5)); this.lastCross = null; this.lastShot = { team: p.team, t: 1 }; break; } }
    }
    if (this.lastCross) { this.lastCross.t -= dt; if (this.lastCross.t <= 0) this.lastCross = null; }
    // cada time
    for (let team = 0; team < 2; team++) {
      const owner = b.owner; const iHave = owner && owner.team === team;
      // quem vai na bola (o mais perto, ou no ponto de interceptação)
      const ix = b.x + b.vx * 0.35, iz = b.z + b.vz * 0.35;
      const [chaser] = this.nearestTo(ix, iz, team, null, true);
      for (const p of this.players) {
        if (p.team !== team) continue;
        if (p.role === 'GK') { if (owner === p) { p.hold = (p.hold || 0) - dt; this.move(p, p.x, p.z, 0, dt); if (p.hold <= 0) this.decide(p); continue; } if (!p.diving) { const [tx, tz] = this.target(p); this.move(p, tx, tz, 5, dt); } continue; }
        if (owner === p) { // conduz a bola
          const d = this.dir[team]; const [opp, od] = this.nearestTo(p.x, p.z, 1 - team);
          let tx = p.x + d * 6, tz = p.z * 0.92; if (opp && od < 4) tz += (p.z > opp.z ? 1 : -1) * 3; // desvia do marcador
          this.move(p, tx, clamp(tz, -WD + 2, WD - 2), Math.min(p.maxV * 0.82, 6.6), dt);
          if (p.think <= 0 && (!p.dribble || p.dribble <= 0 || od < 1.6)) { p.think = rr(0.25, 0.5); this.decide(p); }
          continue;
        }
        if (p === chaser && !iHave) { this.move(p, ix, iz, p.maxV, dt); // pressiona/disputa
          if (owner && owner.team !== team && Math.hypot(owner.x - p.x, owner.z - p.z) < 1.15 && p.tackleCd <= 0) {
            p.tackleCd = 0.9; p.model.kick(0.6);
            const r = Math.random();
            if (r < 0.1 * (2 - p.skill)) { // falta
              this.events.push({ t: this.minute, type: 'falta', team }); this.sound('whistle'); const d2 = this.dir[owner.team];
              const inBox = Math.abs(owner.x - d2 * L) < 16.5 && Math.abs(owner.z) < 20.2; this.setPiece(inBox && Math.random() < 0.5 ? 'penalty' : 'free', owner.team, inBox ? [d2 * (L - 11), 0] : [owner.x, owner.z]); return;
            }
            if (r < 0.55) { b.owner = null; b.vx = rr(-5, 5); b.vz = rr(-5, 5); b.last = team; owner.kickCd = 0.6; this.excite = Math.max(this.excite, 0.45); }
          }
          continue;
        }
        const [tx, tz] = this.target(p); this.move(p, tx, tz, iHave ? p.maxV * 0.75 : p.maxV * 0.65, dt);
      }
    }
    this.moveRef(dt);
    // empolgação da torcida: bola perto do gol
    const near = Math.min(Math.abs(b.x - L), Math.abs(b.x + L)); if (near < 20) this.excite = Math.max(this.excite, 0.55 + (20 - near) * 0.01);
  }
  moveRef(dt) { const b = this.ball; const tx = clamp(b.x - 10, -L + 5, L - 5), tz = clamp(b.z > 0 ? b.z - 10 : b.z + 10, -WD + 3, WD - 3); this.move(this.ref, tx, tz, 6, dt); }
  goal(team) {
    this.score[team]++; this.concede = 1 - team; this.state = 'goal'; this.stateT = 0; this.goalT = 6; this.cheerSide = team; this.excite = 1;
    const b = this.ball; b.owner = null; b.vx *= 0.15; b.vz *= 0.15; b.vy = 0; b.x = Math.sign(b.x) * (L + 1.2);
    this.events.push({ t: this.minute, type: 'gol', team }); this.sound(team === 0 ? 'goalHome' : 'goalAway'); this.sound('whistle');
    const [sc] = this.nearestTo(b.x, b.z, team, null, true); this.scorer = sc;
  }
  celebrate(dt) { const side = Math.sign(this.ball.x) || 1; for (const p of this.players) { if (p.team === this.cheerSide && p.role !== 'GK') this.move(p, side * (L - 3) + rr(-0.5, 0.5), (WD - 4) * (p.i % 2 ? 1 : -1) * 0.7, 6, dt); else this.move(p, p.x, p.z, 0, dt); } this.moveRef(dt); }
  // anima os modelos (só com o jogador por perto)
  animate(dt) {
    const b = this.ball; this.ballMesh.position.set(this.ox + b.x, this.y + b.y, this.oz + b.z);
    if (!this.visible) return;
    this.ballMesh.rotation.x += b.vz * dt / BR; this.ballMesh.rotation.z -= b.vx * dt / BR;
    for (const p of this.allPeople()) {
      if (p.hidden) continue; const r = p.model.root; r.visible = true;
      r.position.set(this.ox + p.x, this.y, this.oz + p.z); r.rotation.y = p.heading; r.updateMatrix && r.updateMatrix();
      const sp = Math.hypot(p.vx, p.vz); const cheer = this.state === 'goal' && p.team === this.cheerSide && sp < 1;
      p.model.update(dt, { speed: sp, grounded: true, mode: 'foot', aim: false, talk: false });
      if (cheer && p.model.bones) { const B = p.model.bones; B.shoulderL.rotation.x = -2.8; B.shoulderR.rotation.x = -2.8; B.shoulderL.updateMatrix(); B.shoulderR.updateMatrix(); }
    }
  }
  setVisible(v) { this.visible = v; this.ballMesh.visible = v && this.state !== 'interval' && this.state !== 'toTunnel'; for (const p of this.allPeople()) p.model.root.visible = v && !p.hidden; }
  dispose() { this.scene.remove(this.ballMesh); for (const p of this.allPeople()) this.scene.remove(p.model.root); }
}
