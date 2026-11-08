// Motor da história: missões em etapas (checkpoints), cutscenes, diálogos com escolhas, objetivos,
// seguidores, sistema de alerta (furtividade), binóculos e fotografias.
import * as THREE from 'three';
import { NPC } from './npc.js';
import { Vehicle } from './vehicle.js';
import { CHARACTERS } from './characters.js';

export class Fail extends Error { constructor(msg) { super(msg); this.fail = true; } }
class Abort extends Error { constructor() { super('abort'); this.abort = true; } }
const $ = (id) => document.getElementById(id);
const lerp = (a, b, t) => a + (b - a) * t;
const ease = (t) => t * t * (3 - 2 * t);

export const ALERT_STATES = [[0, 'Ninguém percebeu nada'], [25, 'Suspeita'], [50, 'Segurança em alerta'], [75, 'Procurando algo suspeito'], [100, 'ALARME ATIVADO']];

export class Story {
  constructor(G) {
    this.G = G; this.t = 0; this.waiters = []; this.entities = new Map(); this.followers = [];
    this.fade = 0; this.fadeTarget = 0; this.fadeSpeed = 2; this.cut = false; this.current = null;
    this.marker = this.makeMarker(); G.scene.add(this.marker);
    this.alert = null; this.cameras = [];
    this.advance = false; this.choice = -1;
  }
  makeMarker() {
    const g = new THREE.Group();
    const m = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 40, 16, 1, true), new THREE.MeshBasicMaterial({ color: 0xffc23a, transparent: true, opacity: 0.22, depthWrite: false, side: THREE.DoubleSide, fog: false }));
    m.position.y = 20; g.add(m);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.2, 0.08, 6, 24), new THREE.MeshBasicMaterial({ color: 0xffd25a, fog: false }));
    ring.rotation.x = Math.PI / 2; ring.position.y = 0.2; g.add(ring);
    g.visible = false; return g;
  }
  // ---------- tempo e espera ----------
  update(dt) {
    this.t += dt;
    const ws = this.waiters; this.waiters = [];
    for (const w of ws) {
      let ok = false;
      try { ok = w.pred(dt); } catch (e) { w.rej(e); continue; }
      if (ok) w.res(ok); else this.waiters.push(w);
    }
    if (this.failChecks) for (const f of this.failChecks) { const msg = f(); if (msg) { this.fail(msg); break; } }
    // fade
    if (this.fade !== this.fadeTarget) {
      const d = Math.sign(this.fadeTarget - this.fade) * dt * this.fadeSpeed;
      this.fade = Math.abs(this.fadeTarget - this.fade) < Math.abs(d) ? this.fadeTarget : this.fade + d;
      $('fade').style.opacity = this.fade;
    }
    // marcador
    const tgt = this.objTarget && this.resolve(this.objTarget);
    this.marker.visible = !!tgt && !this.cut;
    if (tgt) { this.marker.position.set(tgt[0], this.G.world.groundFn(tgt[0], tgt[1]), tgt[1]); this.marker.rotation.y += dt; }
    // câmera de cutscene
    if (this.shotState) {
      const s = this.shotState; s.t = Math.min(s.dur, s.t + dt); const k = s.dur > 0 ? ease(s.t / s.dur) : 1;
      const p = s.from.map((v, i) => lerp(v, s.from2[i], k)), l = s.look.map((v, i) => lerp(v, s.look2[i], k));
      this.G.camera.position.set(...p); this.G.camera.lookAt(...l);
    }
    if (this.alert) this.updateAlert(dt);
    this.updateCameras(dt);
  }
  wait(sec) { const end = this.t + sec; return this.until(() => this.t >= end || (this.cut && this.skipCut)); }
  until(pred) { return new Promise((res, rej) => this.waiters.push({ pred, res, rej })); }
  fail(msg) { const e = new Fail(msg); const ws = this.waiters; this.waiters = []; ws.forEach((w) => w.rej(e)); }
  abort() { const e = new Abort(); const ws = this.waiters; this.waiters = []; ws.forEach((w) => w.rej(e)); }
  // tarefa paralela (não derruba a missão se falhar/abortar)
  task(fn) { fn().catch((e) => { if (!e.fail && !e.abort) console.error(e); }); }
  resolve(t) { if (!t) return null; if (typeof t === 'function') return t(); if (Array.isArray(t)) return t; return [t.x, t.z]; }
  // ---------- tela ----------
  async fadeOut(sec = 0.8) { this.fadeCalls = (this.fadeCalls || 0) + 1; this.fadeTarget = 1; this.fadeSpeed = this.skipCut ? 8 : 1 / sec; await this.until(() => this.fade >= 1); }
  async fadeIn(sec = 0.8) { this.fadeCalls = (this.fadeCalls || 0) + 1; this.fadeTarget = 0; this.fadeSpeed = this.skipCut ? 8 : 1 / sec; await this.until(() => this.fade <= 0); }
  async card(title, sub = '', sec = 3) {
    $('card-title').textContent = title; $('card-sub').textContent = sub; $('card').style.opacity = 1;
    await this.wait(this.skipCut ? 0.4 : sec); $('card').style.opacity = 0; await this.wait(0.3);
  }
  letterbox(v) { document.body.classList.toggle('cine', v); }
  // ---------- cutscene ----------
  async cutscene(fn) {
    this.cut = true; this.skipCut = false; this.G.inputLocked = true; this.letterbox(true);
    try { await fn(); } finally { this.endCut(); }
  }
  endCut() {
    this.cut = false; this.skipCut = false; this.G.inputLocked = false; this.letterbox(false); this.shotState = null; this.G.camOverride = false;
    this.hideDialog();
    const p = this.G.player; const yaw = (p.mode === 'car' && this.G.car ? this.G.car.heading : p.heading) + Math.PI;
    this.G.cam.yaw = yaw; this.G.cam.pitch = 0.22; this.G.cam.initialized = false;
  }
  shot(from, look, dur = 0, from2 = from, look2 = look) {
    // corte suave: se já havia uma câmera de cena, desliza até o novo enquadramento
    const cam = this.G.camera;
    if (dur === 0 && this.shotState && from === from2) { const d = new THREE.Vector3(); cam.getWorldDirection(d); const p = cam.position.toArray(); this.shotState = { from: p, look: [p[0] + d.x * 4, p[1] + d.y * 4, p[2] + d.z * 4], from2: from, look2: look, dur: 0.55, t: 0 }; this.G.camOverride = true; return; }
    this.G.camOverride = true; this.shotState = { from, look, from2, look2, dur, t: 0 };
  }
  // aproxima a câmera do alvo se houver parede no caminho (evita tela preta dentro de construções)
  safe(from, look) {
    const dx = from[0] - look[0], dy = from[1] - look[1], dz = from[2] - look[2]; const L = Math.hypot(dx, dy, dz) || 1;
    this.G.world.rayIgnore = null;
    const hit = this.G.world.raycast(look[0], look[1], look[2], dx / L, dy / L, dz / L, L);
    if (hit >= L) return from;
    const k = Math.max(0.6, hit - 0.35) / L;
    return [look[0] + dx * k, look[1] + dy * k, look[2] + dz * k];
  }
  // enquadramento automático de dois personagens
  frame(a, b, side = 1, dist = 3.2, h = 1.6) {
    const mx = (a.x + b.x) / 2, mz = (a.z + b.z) / 2, my = Math.max(a.y || 0, b.y || 0);
    let dx = b.x - a.x, dz = b.z - a.z; const d = Math.hypot(dx, dz) || 1; dx /= d; dz /= d;
    const px = -dz * side, pz = dx * side; const k = Math.max(dist, d * 1.3);
    const look = [mx, my + 1.4, mz];
    this.shot(this.safe([mx + px * k - dx * 0.6, my + h, mz + pz * k - dz * 0.6], look), look);
  }
  over(who, at, dist = 2.3) { // por cima do ombro
    let dx = at.x - who.x, dz = at.z - who.z; const d = Math.hypot(dx, dz) || 1; dx /= d; dz /= d;
    const look = [at.x, (at.y || 0) + 1.45, at.z];
    this.shot(this.safe([who.x - dx * dist - dz * 0.7, (who.y || 0) + 1.9, who.z - dz * dist + dx * 0.7], look), look);
  }
  // ---------- diálogo ----------
  showDialog(name, text, hint = '[E] / clique para continuar') {
    $('dialog').style.display = 'block'; $('dialog-name').textContent = name; $('dialog-text').textContent = text;
    $('dialog-choices').innerHTML = ''; $('dialog-hint').textContent = hint;
  }
  hideDialog() { $('dialog').style.display = 'none'; }
  async say(who, text, opts = {}) {
    const name = typeof who === 'string' ? who : who.name;
    const speaker = typeof who === 'object' ? who : null;
    if (speaker && speaker.model) speaker.talking = !opts.noAnim;
    if (opts.sub) { // legenda durante o jogo (não trava o jogador)
      this.showDialog(name, text, ''); await this.wait(opts.time || Math.min(6, 1.6 + text.length * 0.045));
      if (speaker) speaker.talking = false; this.hideDialog(); return;
    }
    this.showDialog(name, text);
    this.advance = false; const t0 = this.t;
    const autoT = Math.min(7, 2.2 + text.length * 0.05);
    await this.until(() => (this.advance && this.t - t0 > 0.35) || (this.cut && this.skipCut) || (this.G.settings.autoDialog && this.t - t0 > autoT));
    this.advance = false; if (speaker) speaker.talking = false;
  }
  async choose(options, title = 'Ethan') {
    $('dialog').style.display = 'block'; $('dialog-name').textContent = title; $('dialog-text').textContent = '';
    $('dialog-hint').textContent = 'Escolha com 1, 2, 3 ou clique';
    const box = $('dialog-choices'); box.innerHTML = '';
    options.forEach((o, i) => { const b = document.createElement('button'); b.className = 'choice'; b.textContent = `${i + 1}. ${o.text}`; b.onclick = () => { this.choice = i; }; box.appendChild(b); });
    this.choice = -1; this.G.unlockPointer && this.G.unlockPointer();
    const i = await this.until(() => this.choice >= 0 && this.choice < options.length ? this.choice + 1 : false) - 1;
    box.innerHTML = ''; this.hideDialog(); this.G.relockPointer && this.G.relockPointer();
    const o = options[i];
    if (o.trait) { const tr = this.G.campaign().traits; tr[o.trait] = (tr[o.trait] || 0) + 1; this.G.toast('Personalidade: +1 ' + TRAIT_NAMES[o.trait]); }
    if (o.line) await this.say(this.G.campaign().char === 'ryan' ? 'Ryan' : 'Ethan', o.line);
    return i;
  }
  // ---------- objetivos ----------
  objective(text, target = null) { this.objText = text; this.objTarget = target; $('objective').textContent = text ? 'OBJETIVO: ' + text : ''; $('objective').style.display = text ? 'block' : 'none'; if (text) this.G.toast(text, 2.2); }
  clearObjective() { this.objective('', null); }
  near(target, r) { const p = this.resolve(target); const P = this.G.player; return p && Math.hypot(P.x - p[0], P.z - p[1]) < r; }
  async goto(target, r, text, opts = {}) {
    this.objective(text, target);
    await this.until(() => this.near(target, r) && (!opts.foot || this.G.player.mode === 'foot') && (!opts.car || this.G.player.mode === 'car'));
    this.clearObjective();
  }
  async press(target, r, prompt) { // espera o jogador apertar E perto de um ponto
    this.G.storyPrompt = null;
    await this.until(() => {
      const ok = this.near(target, r) && this.G.player.mode === 'foot';
      this.G.storyPrompt = ok ? prompt : null;
      if (ok && this.G.consumeInteract && this.G.consumeInteract()) { this.G.storyPrompt = null; return true; }
      return false;
    });
  }
  // ---------- entidades ----------
  npc(key, look, opts = {}) {
    const old = this.entities.get(key); if (old && !old.removed) { if (opts.x !== undefined) { old.x = opts.x; old.z = opts.z; old.y = opts.y ?? this.G.world.groundAt(old.x, old.z, 0.3, this.G.world.groundFn(old.x, old.z) + 0.3); } return old; }
    const L = typeof look === 'string' ? CHARACTERS[look].look : look;
    const n = new NPC(this.G.scene, this.G.world, L, { name: typeof look === 'string' ? CHARACTERS[look].name : 'NPC', ...opts });
    n.storyKey = key; n.role = opts.role || 'story';
    this.G.npcs.push(n); this.G.world.dynamic.add(n); this.entities.set(key, n);
    return n;
  }
  car(key, type, color, x, z, h) {
    const old = this.entities.get(key); if (old && !old.removed) { old.place(x, z, h); old.speed = 0; return old; }
    const c = new Vehicle(type, color, this.G.world); c.place(x, z, h);
    this.G.scene.add(c.group); this.G.world.dynamic.add(c); this.G.cars.push(c); this.entities.set(key, c); c.storyKey = key;
    return c;
  }
  get(key) { const e = this.entities.get(key); return e && !e.removed ? e : null; }
  despawn(key) {
    const e = this.entities.get(key); if (!e) return; this.entities.delete(key);
    const G = this.G;
    if (e instanceof NPC) { if (e.inCar) this.unseat(e); e.remove(); G.npcs.splice(G.npcs.indexOf(e), 1); G.world.dynamic.delete(e); this.followers = this.followers.filter((f) => f !== e); }
    else { if (G.car === e) G.forceExitCar(); e.removed = true; G.scene.remove(e.group); G.world.dynamic.delete(e); G.cars.splice(G.cars.indexOf(e), 1); G.aiDrivers = G.aiDrivers.filter((d) => d.car !== e); }
  }
  cleanup() {
    for (const k of [...this.entities.keys()]) this.despawn(k);
    this.followers = []; this.G.aiDrivers = []; this.clearObjective(); this.stopAlert(); this.clearCameras();
    this.failChecks = null; this.G.storyPrompt = null; this.hideDialog(); this.letterbox(false);
    this.cut = false; this.G.inputLocked = false; this.G.camOverride = false; this.shotState = null; this.G.carsLocked = false;
    this.G.scope = null; $('scope').style.display = 'none'; this.G.player.pose = null;
  }
  // ---------- seguidores (entram no carro com o jogador) ----------
  follow(npc, ally = false) {
    if (!this.followers.includes(npc)) this.followers.push(npc);
    npc.behavior = ally ? 'ally' : 'follow'; npc.team = 'ally';
    const i = this.followers.indexOf(npc);
    npc.followSlot = (p) => { const a = p.heading + Math.PI + (i - (this.followers.length - 1) / 2) * 0.7; return [p.x + Math.sin(a) * 2.2, p.z + Math.cos(a) * 2.2]; };
  }
  unfollow(npc) { this.followers = this.followers.filter((f) => f !== npc); if (npc.inCar) this.unseat(npc); npc.behavior = 'stand'; }
  seat(npc, car, i) {
    const seats = [[-0.38, -0.1], [0.4, -1.05], [-0.4, -1.05]];
    const s = i === -1 ? [0.38, -0.1] : seats[i]; if (!s) { npc.model.root.visible = false; npc.inCar = car; npc.collidable = false; return; }
    this.G.scene.remove(npc.model.root); car.body.add(npc.model.root);
    npc.model.root.position.set(s[0], car.seat.y, s[1]); npc.model.root.rotation.set(0, 0, 0);
    npc.model.update(0.5, { mode: 'sit' }); npc.inCar = car; npc.collidable = false;
  }
  unseat(npc) {
    const car = npc.inCar; if (!car) return;
    if (npc.model.root.parent) npc.model.root.parent.remove(npc.model.root);
    this.G.scene.add(npc.model.root); npc.model.root.visible = true; npc.inCar = null; npc.collidable = true;
    const [x, z] = car.doorPos(-1); npc.x = x + (Math.random() - 0.5); npc.z = z + (Math.random() - 0.5); npc.y = this.G.world.groundAt(npc.x, npc.z, 0.3, this.G.world.groundFn(npc.x, npc.z) + 0.3);
    npc.sync();
  }
  onEnterCar(car) { this.followers.forEach((f, i) => this.seat(f, car, i)); }
  onExitCar() { this.followers.forEach((f) => this.unseat(f)); }
  teleportFollower(n) { const p = this.G.player; const a = Math.random() * 6.28; n.x = p.x + Math.sin(a) * 2.5; n.z = p.z + Math.cos(a) * 2.5; n.y = this.G.world.groundAt(n.x, n.z, 0.3, p.y + 0.3); }
  // ---------- jogador ----------
  placePlayer(x, z, h = 0) {
    const G = this.G; if (G.car) G.forceExitCar();
    G.player.place(x, z, h); G.cam.yaw = h + Math.PI; G.cam.pitch = 0.22; G.cam.initialized = false;
    this.followers.forEach((f) => { if (f.inCar) this.unseat(f); this.teleportFollower(f); });
  }
  putInCar(car) { const G = this.G; if (G.car) G.forceExitCar(); G.player.place(car.x, car.z, car.heading); G.enterCarDirect(car); }
  // ---------- furtividade: alerta 0-100 ----------
  startAlert(opts = {}) {
    this.alert = { value: 0, range: opts.range || 13, fov: opts.fov || 0.85, rate: opts.rate || 70, seenBodies: new Set(), failAt100: opts.failAt100 !== false };
    $('alert').style.display = 'block'; this.renderAlert();
  }
  stopAlert() { this.alert = null; $('alert').style.display = 'none'; }
  addAlert(v) { if (!this.alert) return; this.alert.value = Math.min(100, Math.max(0, this.alert.value + v)); }
  renderAlert() {
    const a = this.alert; if (!a) return;
    let label = ALERT_STATES[0][1]; for (const [v, l] of ALERT_STATES) if (a.value >= v) label = l;
    $('alert-fill').style.width = a.value + '%'; $('alert-label').textContent = `ALERTA ${Math.round(a.value)} — ${label}`;
    $('alert-fill').style.background = a.value >= 75 ? '#d83a2a' : a.value >= 50 ? '#e08a2a' : a.value >= 25 ? '#d8c02a' : '#6aa86a';
  }
  canSee(ex, ey, ez, heading, tx, ty, tz, range, fov) {
    const dx = tx - ex, dz = tz - ez; const d = Math.hypot(dx, dz); if (d > range || d < 0.01) return 0;
    const fx = Math.sin(heading), fz = Math.cos(heading); const cos = (dx * fx + dz * fz) / d;
    if (cos < Math.cos(fov)) return 0;
    const dy = ty - ey; const L = Math.hypot(dx, dy, dz);
    this.G.world.rayIgnore = null;
    const hit = this.G.world.raycast(ex, ey, ez, dx / L, dy / L, dz / L, L);
    if (hit < L - 0.4) return 0;
    return 1 - d / range;
  }
  updateAlert(dt) {
    const a = this.alert, G = this.G, P = G.player; let seen = false;
    const night = G.sky.night > 0.6 ? 0.8 : 1;
    for (const g of G.npcs) {
      if (g.behavior !== 'guard' || g.removed) continue;
      const v = this.canSee(g.x, g.y + 1.6, g.z, g.heading, P.x, P.y + (P.crouch ? 0.8 : 1.4), P.z, a.range * night, a.fov);
      if (v > 0) {
        seen = true;
        const mult = (P.crouch ? 0.45 : 1) * (P.speed > 4 ? 1.6 : 1);
        a.value += a.rate * v * mult * dt;
        g.investigate = [P.x, P.z]; g.alertLevel = a.value;
        if (Math.hypot(g.x - P.x, g.z - P.z) < 1.8 && a.value > 40) a.value = 100;
      }
      // corpo de segurança nocauteado
      for (const b of G.npcs) {
        if (b.behavior === 'down' && b.team === 'enemy' && !a.seenBodies.has(b) && this.canSee(g.x, g.y + 1.6, g.z, g.heading, b.x, b.y + 0.3, b.z, a.range * 0.8, a.fov) > 0) {
          a.seenBodies.add(b); a.value += 25; g.investigate = [b.x, b.z]; g.alertLevel = a.value; G.toast('Um segurança encontrou um colega desacordado!');
        }
      }
    }
    for (const c of this.cameras) {
      if (c.disabled > 0) continue;
      const v = this.canSee(c.x, c.y, c.z, c.heading, P.x, P.y + (P.crouch ? 0.8 : 1.4), P.z, 14, 0.5);
      if (v > 0) { seen = true; a.value += a.rate * 0.9 * v * dt * (a.camFactor ?? 1); }
    }
    if (!seen && a.value < 100) a.value = Math.max(0, a.value - 2.5 * dt);
    a.value = Math.min(100, a.value);
    if (a.value >= 100 && a.failAt100) { this.renderAlert(); this.fail('ALARME ATIVADO — MISSÃO FRACASSADA'); return; }
    this.renderAlert();
  }
  // ---------- câmeras de segurança (missão de Ryan) ----------
  addCamera(x, y, z, yaw, sweep) {
    const g = new THREE.Group();
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.18, 0.4), new THREE.MeshLambertMaterial({ color: 0x2a2a2a }));
    const led = new THREE.Mesh(new THREE.SphereGeometry(0.04, 6, 4), new THREE.MeshBasicMaterial({ color: 0xff2020 }));
    led.position.set(0, 0.05, 0.21);
    const coneMat = new THREE.MeshBasicMaterial({ color: 0xff3020, transparent: true, opacity: 0.12, depthWrite: false, side: THREE.DoubleSide });
    const cone = new THREE.Mesh(new THREE.ConeGeometry(Math.tan(0.5) * 14, 14, 16, 1, true), coneMat);
    cone.rotation.x = -Math.PI / 2; cone.position.z = 7; cone.rotation.order = 'XYZ';
    const tilt = new THREE.Group(); tilt.rotation.x = 0.35; tilt.add(body, led, cone);
    g.add(tilt); g.position.set(x, y, z); this.G.scene.add(g);
    const cam = { x, y, z, base: yaw, sweep, heading: yaw, disabled: 0, g, led, coneMat, t: Math.random() * 6 };
    this.cameras.push(cam); return cam;
  }
  updateCameras(dt) {
    for (const c of this.cameras) {
      c.t += dt; c.disabled = Math.max(0, c.disabled - dt);
      if (c.disabled <= 0) c.heading = c.base + Math.sin(c.t * 0.5) * c.sweep;
      c.g.rotation.y = c.heading;
      c.led.material.color.setHex(c.disabled > 0 ? 0x202020 : 0xff2020);
      c.coneMat.opacity = c.disabled > 0 ? 0 : 0.12;
    }
  }
  clearCameras() { for (const c of this.cameras) this.G.scene.remove(c.g); this.cameras = []; }
  // ---------- binóculos ----------
  async binoculars(target, hold = 1.4) {
    const G = this.G; G.scope = { fov: 9 }; $('scope').style.display = 'block'; G.player.pose = 'binoculars';
    let held = 0;
    await this.until((dt) => {
      const cam = G.camera; const dir = new THREE.Vector3(); cam.getWorldDirection(dir);
      const to = new THREE.Vector3(target[0] - cam.position.x, target[1] - cam.position.y, target[2] - cam.position.z).normalize();
      const ang = dir.angleTo(to);
      held = ang < 0.04 ? held + dt : 0;
      $('scope-hint').textContent = held > 0 ? 'Focando...' : 'Use o mouse para observar a mansão';
      return held >= hold;
    });
    G.scope = null; $('scope').style.display = 'none'; G.player.pose = null;
  }
  // ---------- fotografias ----------
  capture(cam, w = 480, h = 300, filter = null) {
    // renderiza na tela e copia imediatamente (mantém tom e cores corretos)
    const G = this.G; const cv = G.renderer.domElement;
    const asp = cam.aspect; cam.aspect = cv.width / cv.height; cam.updateProjectionMatrix();
    G.renderer.render(G.scene, cam);
    const c = document.createElement('canvas'); c.width = w; c.height = h; const g = c.getContext('2d');
    const sa = w / h; let sw = cv.width, sh = cv.width / sa; if (sh > cv.height) { sh = cv.height; sw = sh * sa; }
    g.drawImage(cv, (cv.width - sw) / 2, (cv.height - sh) / 2, sw, sh, 0, 0, w, h);
    cam.aspect = asp; cam.updateProjectionMatrix();
    if (filter) filter(g, w, h);
    return c;
  }
}
export const TRAIT_NAMES = { inteligencia: 'Inteligência', frieza: 'Frieza', carisma: 'Carisma', manipulacao: 'Manipulação', impulsividade: 'Impulsividade' };
