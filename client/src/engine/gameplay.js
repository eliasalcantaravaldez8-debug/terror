// Gameplay do runtime: entrada, controles do jogador, física simples (gravidade, colisões, bola),
// IA de NPCs, pickups/triggers, missões, diálogos e sistemas (partida de futebol, corrida).
import * as THREE from 'three';

const DEG = Math.PI / 180;
const tmp = new THREE.Vector3();

export class Input {
  constructor(target) {
    this.down = new Set();
    this.justPressed = new Set();
    this.mouse = { dx: 0, dy: 0, buttons: 0 };
    this.touch = { x: 0, y: 0, active: false, jump: false, action: false };
    const kd = (e) => { if (!this.down.has(e.code)) this.justPressed.add(e.code); this.down.add(e.code); if (['Space', 'ArrowUp', 'ArrowDown'].includes(e.code)) e.preventDefault(); };
    const ku = (e) => this.down.delete(e.code);
    const mm = (e) => { if (document.pointerLockElement) { this.mouse.dx += e.movementX; this.mouse.dy += e.movementY; } };
    const md = (e) => { this.mouse.buttons = e.buttons; this.justPressed.add(`Mouse${e.button}`); };
    const mu = (e) => { this.mouse.buttons = e.buttons; };
    window.addEventListener('keydown', kd); window.addEventListener('keyup', ku);
    window.addEventListener('mousemove', mm); target.addEventListener('mousedown', md); window.addEventListener('mouseup', mu);
    window.addEventListener('blur', () => this.down.clear());
    this.dispose = () => { window.removeEventListener('keydown', kd); window.removeEventListener('keyup', ku); window.removeEventListener('mousemove', mm); target.removeEventListener('mousedown', md); window.removeEventListener('mouseup', mu); };
  }
  isDown(code) { return this.down.has(code); }
  pressed(code) { return this.justPressed.has(code); }
  axis() {
    let x = (this.isDown('KeyD') || this.isDown('ArrowRight') ? 1 : 0) - (this.isDown('KeyA') || this.isDown('ArrowLeft') ? 1 : 0);
    let y = (this.isDown('KeyW') || this.isDown('ArrowUp') ? 1 : 0) - (this.isDown('KeyS') || this.isDown('ArrowDown') ? 1 : 0);
    if (this.touch.active) { x = this.touch.x; y = this.touch.y; }
    const l = Math.hypot(x, y);
    return l > 1 ? { x: x / l, y: y / l } : { x, y };
  }
  endFrame() { this.justPressed.clear(); this.mouse.dx = 0; this.mouse.dy = 0; this.touch.jump = false; this.touch.action = false; }
}

/** Resolve colisão de um círculo (personagem) contra AABBs e colisores circulares no plano XZ. */
export function collide(world, pos, radius, feetY) {
  for (const c of world.colliders) {
    if (c.walkable && c.max.y <= feetY + 0.45) continue;
    if (feetY > c.max.y - 0.05 || feetY + 1.7 < c.min.y) continue;
    const cx = THREE.MathUtils.clamp(pos.x, c.min.x, c.max.x);
    const cz = THREE.MathUtils.clamp(pos.z, c.min.z, c.max.z);
    const dx = pos.x - cx; const dz = pos.z - cz; const d2 = dx * dx + dz * dz;
    if (d2 < radius * radius) {
      if (d2 > 1e-8) { const d = Math.sqrt(d2); pos.x = cx + (dx / d) * radius; pos.z = cz + (dz / d) * radius; }
      else {
        const pen = [pos.x - c.min.x, c.max.x - pos.x, pos.z - c.min.z, c.max.z - pos.z];
        const i = pen.indexOf(Math.min(...pen));
        if (i === 0) pos.x = c.min.x - radius; else if (i === 1) pos.x = c.max.x + radius; else if (i === 2) pos.z = c.min.z - radius; else pos.z = c.max.z + radius;
      }
    }
  }
  for (const c of world.circleColliders) {
    if (feetY > c.top) continue;
    const dx = pos.x - c.x; const dz = pos.z - c.z; const d = Math.hypot(dx, dz); const min = radius + c.r;
    if (d < min && d > 1e-6) { pos.x = c.x + (dx / d) * min; pos.z = c.z + (dz / d) * min; }
  }
}

// ───────── Controle do jogador ─────────
export class PlayerController {
  constructor(game) {
    this.g = game;
    const cfg = game.doc.player;
    this.cfg = cfg;
    this.kind = cfg.controller;
    this.rec = cfg.entityId ? game.world.entities.get(cfg.entityId) : null;
    this.vel = new THREE.Vector3();
    this.yaw = this.rec ? this.rec.object.rotation.y : 0;
    this.pitch = -0.15;
    this.onGround = true;
    this.camDist = cfg.cameraDistance || 6;
    this.speedNow = 0;
    this.kickCooldown = 0;
    this.health = cfg.health || 100;
    if (this.kind === 'first_person' && this.rec) this.rec.object.visible = false;
  }

  get object() { return this.rec?.object; }

  update(dt) {
    const { input, world, camera } = this.g;
    if (!this.rec) { this.freeCamera(dt); return; }
    if (this.kind === 'vehicle') return this.vehicle(dt);
    const o = this.rec.object;
    const sens = 0.0024;
    if (document.pointerLockElement || this.kind === 'first_person') {
      this.yaw -= input.mouse.dx * sens; this.pitch = THREE.MathUtils.clamp(this.pitch - input.mouse.dy * sens, -1.2, 0.9);
    }
    if (input.isDown('KeyQ')) this.yaw += dt * 2.2;
    if (input.isDown('KeyE') && this.kind !== 'soccer') this.yaw -= dt * 2.2;
    const ax = input.axis();
    const sprint = input.isDown('ShiftLeft') || input.isDown('ShiftRight');
    const max = (this.cfg.speed || 5) * (sprint ? (this.cfg.sprintMultiplier || 1.7) : 1);
    const fwd = new THREE.Vector3(Math.sin(this.yaw), 0, Math.cos(this.yaw));
    const right = new THREE.Vector3(-fwd.z, 0, fwd.x);
    const wish = new THREE.Vector3().addScaledVector(fwd, ax.y).addScaledVector(right, ax.x);
    const accel = this.onGround ? 14 : 4;
    const target = wish.multiplyScalar(max);
    this.vel.x = THREE.MathUtils.damp(this.vel.x, target.x, accel, dt);
    this.vel.z = THREE.MathUtils.damp(this.vel.z, target.z, accel, dt);
    if ((input.pressed('Space') || input.touch.jump) && this.onGround) { this.vel.y = this.cfg.jumpForce || 6; this.onGround = false; this.g.audio.play('jump'); }
    this.vel.y += (this.g.doc.settings.physics?.gravity ?? -9.81) * 1.6 * dt;
    const p = o.position;
    p.addScaledVector(this.vel, dt);
    collide(world, p, 0.38, p.y);
    const ground = world.groundAt(p.x, p.z, p.y);
    if (p.y <= ground) { p.y = ground; if (this.vel.y < -12) this.damage(Math.floor((-this.vel.y - 12) * 4)); this.vel.y = 0; this.onGround = true; } else if (p.y > ground + 0.05) this.onGround = false;
    this.speedNow = Math.hypot(this.vel.x, this.vel.z);
    if (this.speedNow > 0.3) {
      const face = Math.atan2(this.vel.x, this.vel.z);
      o.rotation.y = THREE.MathUtils.lerp(o.rotation.y, o.rotation.y + angleDiff(o.rotation.y, face), Math.min(1, dt * 12));
    }
    const anim = this.rec.animator;
    if (anim && !['kick', 'pass', 'attack'].includes(anim.clip)) {
      anim.play(!this.onGround ? (this.vel.y > 0 ? 'jump' : 'fall') : this.speedNow > max * 0.8 && sprint ? 'sprint' : this.speedNow > 3.2 ? 'run' : this.speedNow > 0.3 ? 'walk' : 'idle');
      anim.cadence = THREE.MathUtils.clamp(this.speedNow / (anim.clip === 'walk' ? 1.6 : anim.clip === 'run' ? 4.5 : 6.5), 0.6, 1.4);
    }
    if (this.footT === undefined) this.footT = 0;
    this.footT += dt * this.speedNow;
    if (this.onGround && this.footT > 1.6) { this.footT = 0; this.g.audio.play('step', { volume: 0.25 }); }
    // Ações
    this.kickCooldown -= dt;
    const act = input.pressed('KeyF') || input.pressed('Mouse0') || input.touch.action;
    if (act && this.kickCooldown <= 0) {
      this.kickCooldown = 0.45;
      if (this.kind === 'soccer' || this.g.ball) anim?.play('kick'); else anim?.play('attack');
      this.g.playerAction(this.kind === 'soccer' ? (input.isDown('ShiftLeft') ? 'shoot' : 'pass') : 'attack');
    }
    if (input.pressed('KeyE')) this.g.interact();
    this.updateCamera(dt);
  }

  updateCamera(dt) {
    const cam = this.g.camera; const o = this.rec.object;
    if (this.kind === 'first_person') {
      cam.position.set(o.position.x, o.position.y + 1.65 * (this.rec.height || 1.8) / 1.8, o.position.z);
      cam.rotation.set(this.pitch, this.yaw + Math.PI, 0, 'YXZ');
      return;
    }
    const dist = this.kind === 'soccer' ? 9 : this.camDist;
    const height = this.kind === 'soccer' ? 5 : 2.2;
    const back = new THREE.Vector3(-Math.sin(this.yaw) * Math.cos(this.pitch), -Math.sin(this.pitch), -Math.cos(this.yaw) * Math.cos(this.pitch));
    const desired = o.position.clone().add(new THREE.Vector3(0, height * 0.6, 0)).addScaledVector(back, dist);
    desired.y = Math.max(desired.y, this.g.world.groundAt(desired.x, desired.z) + 0.6);
    cam.position.lerp(desired, 1 - Math.exp(-dt * 10));
    tmp.copy(o.position).y += 1.4;
    cam.lookAt(tmp);
  }

  vehicle(dt) {
    const { input, world, camera } = this.g;
    const o = this.rec.object;
    const ax = input.axis();
    const maxSpeed = this.cfg.speed || 38;
    this.speedNow += (ax.y > 0 ? ax.y * 16 : ax.y * 26) * dt;
    if (ax.y === 0) this.speedNow = THREE.MathUtils.damp(this.speedNow, 0, 0.9, dt);
    if (input.isDown('Space')) this.speedNow = THREE.MathUtils.damp(this.speedNow, 0, 4, dt);
    this.speedNow = THREE.MathUtils.clamp(this.speedNow, -maxSpeed * 0.3, maxSpeed);
    const onRoad = world.roads.some((r) => r.isOnRoad(o.position.x, o.position.z));
    if (!onRoad) this.speedNow = Math.min(this.speedNow, maxSpeed * 0.45);
    const steer = -ax.x * THREE.MathUtils.clamp(Math.abs(this.speedNow) / 8, 0, 1) * 1.6 * Math.sign(this.speedNow || 1);
    o.rotation.y += steer * dt;
    o.position.x += Math.sin(o.rotation.y) * this.speedNow * dt;
    o.position.z += Math.cos(o.rotation.y) * this.speedNow * dt;
    const before = o.position.clone();
    collide(world, o.position, 1.1, o.position.y);
    if (before.distanceToSquared(o.position) > 1e-4) { this.speedNow *= 0.5; this.g.audio.play('hit', { volume: 0.5 }); }
    const ahead = world.groundAt(o.position.x + Math.sin(o.rotation.y) * 1.8, o.position.z + Math.cos(o.rotation.y) * 1.8);
    const behind = world.groundAt(o.position.x - Math.sin(o.rotation.y) * 1.8, o.position.z - Math.cos(o.rotation.y) * 1.8);
    o.position.y = THREE.MathUtils.damp(o.position.y, (ahead + behind) / 2, 12, dt);
    o.rotation.x = THREE.MathUtils.damp(o.rotation.x, Math.atan2(behind - ahead, 3.6), 8, dt);
    for (const w of this.rec.wheels || []) w.children.forEach((c) => { c.rotation.x += this.speedNow * dt * 2.8; });
    if (this.rec.wheels) for (const i of [0, 1]) this.rec.wheels[i].rotation.y = steer * 0.35;
    const back = new THREE.Vector3(-Math.sin(o.rotation.y), 0, -Math.cos(o.rotation.y));
    const desired = o.position.clone().addScaledVector(back, 9).add(new THREE.Vector3(0, 3.5, 0));
    camera.position.lerp(desired, 1 - Math.exp(-dt * 6));
    camera.lookAt(o.position.x, o.position.y + 1, o.position.z);
    this.g.audio.engine?.(Math.abs(this.speedNow) / maxSpeed);
  }

  freeCamera(dt) {
    const { input, camera } = this.g;
    const ax = input.axis();
    this.yaw -= input.mouse.dx * 0.0024; this.pitch = THREE.MathUtils.clamp(this.pitch - input.mouse.dy * 0.0024, -1.4, 1.4);
    camera.rotation.set(this.pitch, this.yaw, 0, 'YXZ');
    const f = new THREE.Vector3(0, 0, -1).applyEuler(camera.rotation); const r = new THREE.Vector3(1, 0, 0).applyEuler(camera.rotation);
    camera.position.addScaledVector(f, ax.y * dt * 12).addScaledVector(r, ax.x * dt * 12);
  }

  damage(n) {
    if (n <= 0) return;
    this.health = Math.max(0, this.health - n);
    this.g.audio.play('hit');
    this.g.hud.flash('#ef4444');
    if (this.health <= 0) { this.rec?.animator?.play('die'); this.g.gameOver('Você foi derrotado.'); }
  }
}

export const angleDiff = (a, b) => { let d = (b - a) % (Math.PI * 2); if (d > Math.PI) d -= Math.PI * 2; if (d < -Math.PI) d += Math.PI * 2; return d; };

// ───────── Bola (física de esfera) ─────────
export class BallPhysics {
  constructor(game, rec) {
    this.g = game; this.rec = rec; this.r = rec.radius || 0.11;
    this.vel = new THREE.Vector3(); this.spin = new THREE.Vector3();
    this.restitution = rec.e.components?.physics?.restitution ?? 0.6;
    this.home = rec.object.position.clone();
  }
  kick(dir, power, lift = 0.2) {
    this.vel.copy(dir).setY(0).normalize().multiplyScalar(power); this.vel.y = power * lift;
    this.g.audio.play('kick');
  }
  reset() { this.rec.object.position.copy(this.home); this.vel.set(0, 0, 0); }
  update(dt) {
    const p = this.rec.object.position;
    this.vel.y += -9.81 * dt;
    p.addScaledVector(this.vel, dt);
    const ground = this.g.world.groundAt(p.x, p.z) + this.r;
    if (p.y < ground) {
      p.y = ground;
      if (this.vel.y < -1) { this.vel.y = -this.vel.y * this.restitution; } else this.vel.y = 0;
      const fr = Math.exp(-dt * 0.9);
      this.vel.x *= fr; this.vel.z *= fr;
    } else { this.vel.x *= Math.exp(-dt * 0.05); this.vel.z *= Math.exp(-dt * 0.05); }
    // Colisões com paredes/traves
    for (const c of this.g.world.colliders) {
      if (p.y - this.r > c.max.y || p.y + this.r < c.min.y) continue;
      const cx = THREE.MathUtils.clamp(p.x, c.min.x, c.max.x); const cz = THREE.MathUtils.clamp(p.z, c.min.z, c.max.z);
      const dx = p.x - cx; const dz = p.z - cz; const d = Math.hypot(dx, dz);
      if (d < this.r && d > 1e-6) { const nx = dx / d; const nz = dz / d; p.x = cx + nx * this.r; p.z = cz + nz * this.r; const vn = this.vel.x * nx + this.vel.z * nz; if (vn < 0) { this.vel.x -= (1 + this.restitution) * vn * nx; this.vel.z -= (1 + this.restitution) * vn * nz; this.g.audio.play('hit', { volume: 0.3 }); } }
    }
    const sp = Math.hypot(this.vel.x, this.vel.z);
    if (sp > 0.01) { const axis = new THREE.Vector3(this.vel.z, 0, -this.vel.x).normalize(); this.rec.object.rotateOnWorldAxis(axis, (sp * dt) / this.r); }
  }
}

// ───────── IA de NPCs ─────────
export class NPCBrain {
  constructor(game, rec) {
    this.g = game; this.rec = rec;
    const ai = rec.e.components?.ai || {};
    this.ai = ai; this.behavior = ai.behavior || 'idle';
    this.home = rec.object.position.clone();
    this.target = null; this.wait = 0; this.cooldown = 0;
    this.health = rec.e.components?.health?.max ?? 50;
    this.dead = false;
    this.pathT = Math.random();
  }
  moveTowards(dest, speed, dt) {
    const o = this.rec.object; const d = tmp.copy(dest).sub(o.position); d.y = 0;
    const dist = d.length();
    if (dist < 0.1) return dist;
    d.normalize();
    const step = Math.min(dist, speed * dt);
    o.position.addScaledVector(d, step);
    collide(this.g.world, o.position, 0.36, o.position.y);
    o.position.y = this.g.world.groundAt(o.position.x, o.position.z, o.position.y + 0.5);
    o.rotation.y += angleDiff(o.rotation.y, Math.atan2(d.x, d.z)) * Math.min(1, dt * 8);
    return dist;
  }
  update(dt) {
    if (this.dead) return;
    const o = this.rec.object; const player = this.g.player?.object; const anim = this.rec.animator;
    const speed = this.ai.speed || 2; const det = this.ai.detectRadius || 15;
    const pd = player ? o.position.distanceTo(player.position) : Infinity;
    this.cooldown -= dt;
    let moving = 0;
    switch (this.behavior) {
      case 'wander': {
        if (!this.target || this.wait > 0) { this.wait -= dt; if (this.wait <= 0) { const r = this.ai.radius || 10; this.target = this.home.clone().add(new THREE.Vector3((Math.random() - 0.5) * 2 * r, 0, (Math.random() - 0.5) * 2 * r)); } }
        if (this.target && this.wait <= 0) { if (this.moveTowards(this.target, speed, dt) < 0.3) { this.wait = 1 + Math.random() * 3; } else moving = speed; }
        break;
      }
      case 'patrol': {
        const r = this.ai.radius || 8;
        if (player && pd < det) { if (pd > 1.4) { this.moveTowards(player.position, speed * 1.4, dt); moving = speed * 1.4; } else this.attack(); }
        else { this.pathT += dt * speed / (r * 6.28); const dest = this.home.clone().add(new THREE.Vector3(Math.cos(this.pathT * 6.28) * r, 0, Math.sin(this.pathT * 6.28) * r)); this.moveTowards(dest, speed, dt); moving = speed; }
        break;
      }
      case 'chase_player': {
        if (player && pd < det * 2.2) { if (pd > 1.3) { this.moveTowards(player.position, speed * (pd < det ? 1.5 : 1), dt); moving = speed; } else this.attack(); }
        break;
      }
      case 'follow_player': if (player && pd > 3) { this.moveTowards(player.position, Math.max(speed, pd > 8 ? 6 : speed), dt); moving = speed; } break;
      case 'flee_player': if (player && pd < det) { const away = o.position.clone().add(o.position.clone().sub(player.position).setY(0).normalize().multiplyScalar(5)); this.moveTowards(away, speed * 1.5, dt); moving = speed; } break;
      case 'guard': if (player && pd < det) { o.rotation.y += angleDiff(o.rotation.y, Math.atan2(player.position.x - o.position.x, player.position.z - o.position.z)) * dt * 4; if (pd < 1.5) this.attack(); } break;
      case 'soccer_player': case 'goalkeeper': moving = this.g.match?.npcThink(this, dt) || 0; break;
      default: if (player && pd < 4) o.rotation.y += angleDiff(o.rotation.y, Math.atan2(player.position.x - o.position.x, player.position.z - o.position.z)) * dt * 3;
    }
    if (anim && !['attack', 'kick', 'pass', 'hit', 'goalkeeper_dive'].includes(anim.clip)) {
      anim.play(moving > 4 ? 'run' : moving > 0.2 ? 'walk' : this.rec.e.components?.ai?.dialogueId && pd < 4 ? 'talk' : 'idle');
      anim.cadence = THREE.MathUtils.clamp(moving / (moving > 4 ? 4.5 : 1.6), 0.6, 1.3);
    }
  }
  attack() {
    if (this.cooldown > 0) return;
    this.cooldown = 1.2;
    this.rec.animator?.play('attack');
    setTimeout(() => { if (!this.dead && this.g.player?.object && this.rec.object.position.distanceTo(this.g.player.object.position) < 1.8) this.g.player.damage(this.ai.attackDamage || 10); }, 280);
  }
  hurt(n) {
    if (this.dead) return;
    this.health -= n;
    this.rec.animator?.play('hit');
    if (this.health <= 0) { this.dead = true; this.rec.animator?.play('die'); this.g.emit('npc_defeated', { id: this.rec.e.id, name: this.rec.e.name }); this.g.missions.progress('npc', 1); }
  }
}

// ───────── Missões e diálogos ─────────
export class Missions {
  constructor(game) {
    this.g = game;
    this.list = structuredClone(game.doc.missions || []);
    this.state = {}; // missionId → { status, progress: {objId: n} }
    this.activeId = null;
    const first = this.list[0];
    if (first) this.start(first.id);
  }
  start(id) {
    const m = this.list.find((x) => x.id === id);
    if (!m || this.state[id]?.status === 'done') return;
    this.state[id] = { status: 'active', progress: Object.fromEntries(m.objectives.map((o) => [o.id, 0])) };
    this.activeId = id;
    this.g.hud.toast(`Missão: ${m.title}`);
    this.refresh();
  }
  active() { return this.list.find((m) => m.id === this.activeId) || null; }
  progress(target, n = 1) {
    for (const m of this.list) {
      const st = this.state[m.id];
      if (!st || st.status !== 'active') continue;
      let changed = false;
      for (const o of m.objectives) {
        if ((o.target === target || (o.type === 'defeat' && target === 'npc' && o.target === 'npc')) && st.progress[o.id] < (o.count || 1)) {
          st.progress[o.id] = Math.min(o.count || 1, st.progress[o.id] + n); changed = true;
          this.g.emit('objective_progress', { mission: m.id, objective: o.id, value: st.progress[o.id] });
        }
      }
      if (changed && m.objectives.every((o) => st.progress[o.id] >= (o.count || 1))) {
        st.status = 'done';
        this.g.score += m.reward?.score || 0;
        this.g.audio.play('goal');
        this.g.hud.toast(`Missão concluída: ${m.title}!`, 4000);
        this.g.emit('mission_complete', { id: m.id });
        if (m.next) this.start(m.next); else if (this.list.every((x) => this.state[x.id]?.status === 'done')) this.g.victory();
      }
    }
    this.refresh();
  }
  refresh() {
    const m = this.active(); const st = m && this.state[m.id];
    if (!m || !st) return this.g.hud.setObjective(null);
    const o = m.objectives.find((x) => st.progress[x.id] < (x.count || 1));
    this.g.hud.setObjective(st.status === 'done' ? `${m.title} ✓` : o ? `${o.description || o.target}${(o.count || 1) > 1 ? ` (${st.progress[o.id]}/${o.count})` : ''}` : m.title);
  }
}

// ───────── Partida de futebol ─────────
export class SoccerMatch {
  constructor(game, cfg) {
    this.g = game; this.cfg = cfg;
    this.score = [0, 0];
    this.clock = (cfg.durationMinutes || 6) * 60;
    this.goals = [...game.world.entities.values()].filter((r) => r.goal);
    this.pause = 0;
  }
  teamGoalFor(team) { // gol que o time ATACA: time 0 ataca o gol em z negativo
    return this.goals.sort((a, b) => a.object.position.z - b.object.position.z)[team === 0 ? 0 : 1];
  }
  update(dt) {
    if (this.over) return;
    if (this.pause > 0) { this.pause -= dt; if (this.pause <= 0) this.kickoff(); return; }
    this.clock -= dt;
    if (this.clock <= 0) { this.clock = 0; this.over = true; this.g.hud.toast(`Fim de jogo! ${this.score[0]} x ${this.score[1]}`, 6000); this.g.emit('match_end', { score: this.score }); if (this.score[0] > this.score[1]) this.g.victory(); }
    const ball = this.g.ball;
    if (!ball) return;
    const p = ball.rec.object.position;
    for (const goal of this.goals) {
      const gp = goal.object.position; const gw = goal.goal.width; const gh = goal.goal.height;
      const behind = gp.z < 0 ? p.z < gp.z : p.z > gp.z;
      if (behind && Math.abs(p.x - gp.x) < gw / 2 && p.y < gh) {
        const scorer = gp.z < 0 ? 0 : 1;
        this.score[scorer]++;
        this.g.audio.play('goal');
        this.g.hud.toast(`GOOOL! ${this.cfg.teams?.[scorer]?.name || `Time ${scorer + 1}`}`, 3000);
        this.g.emit('goal', { team: scorer, score: this.score });
        for (const r of this.g.world.entities.values()) if (r.e.components?.ai?.team === scorer || (scorer === 0 && r === this.g.player?.rec)) r.animator?.play('celebrate');
        this.pause = 3;
        ball.vel.set(0, 0, 0);
        break;
      }
    }
    if (Math.abs(p.x) > 40 || Math.abs(p.z) > 58) { ball.reset(); }
    this.g.hud.setHud({ score: `${this.score[0]} x ${this.score[1]}`, timer: this.clock });
  }
  kickoff() {
    this.g.ball?.reset();
    for (const r of this.g.world.entities.values()) if (r.npcBrain) r.object.position.copy(r.npcBrain.home);
  }
  npcThink(brain, dt) {
    const ball = this.g.ball; if (!ball || this.pause > 0 || this.over) return 0;
    const o = brain.rec.object; const bp = ball.rec.object.position; const ai = brain.ai;
    const attackGoal = this.teamGoalFor(ai.team); const ownGoal = this.teamGoalFor(ai.team === 0 ? 1 : 0);
    if (!attackGoal || !ownGoal) return 0;
    const speed = ai.speed || 6;
    if (ai.behavior === 'goalkeeper') {
      const gx = THREE.MathUtils.clamp(bp.x, -3.2, 3.2); const gz = ownGoal.object.position.z + Math.sign(-ownGoal.object.position.z) * 1.2;
      const d = brain.moveTowards(new THREE.Vector3(gx, 0, gz), speed * 0.8, dt);
      if (o.position.distanceTo(bp) < 1.4 && brain.cooldown <= 0) { brain.cooldown = 1; brain.rec.animator?.play('goalkeeper_dive'); ball.kick(attackGoal.object.position.clone().sub(bp), 18, 0.45); }
      return d > 0.2 ? speed * 0.8 : 0;
    }
    // Quem está mais perto da bola no time vai nela; os outros mantêm posição por função.
    const mates = [...this.g.world.entities.values()].filter((r) => r.npcBrain && r.npcBrain.ai.team === ai.team && r.npcBrain.ai.behavior === 'soccer_player');
    const closest = mates.reduce((a, b) => (a.object.position.distanceTo(bp) < b.object.position.distanceTo(bp) ? a : b), mates[0]);
    let dest;
    if (closest === brain.rec) dest = bp.clone().add(bp.clone().sub(attackGoal.object.position).setY(0).normalize().multiplyScalar(0.5));
    else {
      const depth = { defender: 0.25, midfielder: 0.5, forward: 0.78 }[ai.role] ?? 0.5;
      const z = THREE.MathUtils.lerp(ownGoal.object.position.z, attackGoal.object.position.z, depth);
      dest = new THREE.Vector3(brain.home.x * 0.8 + bp.x * 0.2, 0, THREE.MathUtils.lerp(z, bp.z, 0.35));
    }
    const d = brain.moveTowards(dest, speed, dt);
    if (o.position.distanceTo(bp) < 1.1 && brain.cooldown <= 0) {
      brain.cooldown = 0.8;
      const toGoal = attackGoal.object.position.clone().sub(bp);
      const near = toGoal.length() < 25;
      brain.rec.animator?.play(near ? 'kick' : 'pass');
      ball.kick(toGoal.add(new THREE.Vector3((Math.random() - 0.5) * 6, 0, 0)), near ? 22 : 11, near ? 0.25 : 0.08);
    }
    return d > 0.3 ? speed : 0;
  }
}

// ───────── Corrida ─────────
export class RaceSystem {
  constructor(game, cfg) {
    this.g = game; this.laps = cfg.laps || 3; this.lap = 0; this.t = 0; this.last = null; this.road = game.world.roads[0];
    this.progress = 0; this.finished = false;
  }
  update(dt) {
    if (this.finished || !this.road || !this.g.player?.object) return;
    this.t += dt;
    const p = this.g.player.object.position.clone().sub(this.road.object.position);
    // Progresso ao longo da curva (amostragem)
    let best = 0; let bd = Infinity;
    for (let i = 0; i < 120; i++) { const q = this.road.curve.getPointAt(i / 120); const d = (q.x - p.x) ** 2 + (q.z - p.z) ** 2; if (d < bd) { bd = d; best = i / 120; } }
    if (this.progress > 0.85 && best < 0.15) { this.lap++; this.g.hud.toast(this.lap >= this.laps ? 'Última volta concluída!' : `Volta ${this.lap + 1}/${this.laps}`); this.g.audio.play('pickup'); }
    this.progress = best;
    if (this.lap >= this.laps) { this.finished = true; this.g.hud.toast(`Chegada! Tempo: ${fmt(this.t)}`, 6000); this.g.emit('race_finish', { time: this.t }); this.g.victory(); }
    this.g.hud.setHud({ timer: this.t, objective: `Volta ${Math.min(this.lap + 1, this.laps)}/${this.laps}` });
  }
}

export const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
export { DEG };
