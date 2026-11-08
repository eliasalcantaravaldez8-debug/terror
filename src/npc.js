// NPCs: pedestres, funcionários, policiais, personagens da história, seguranças, aliados e inimigos.
// Comportamentos: stand, loop (calçada), patrol, guard (ronda), follow (segue o jogador), ally (segue e luta),
// hostile (ataca), scripted (vai até um ponto), flee (foge por uma rota), panic, down (nocauteado), chair, sleep.
import { Humanoid } from './humanoid.js';
import { Ragdoll, endRagdoll } from './ragdoll.js';
import { rand, rr } from './textures.js';

const damp = (a, b, k, dt) => a + (b - a) * (1 - Math.exp(-k * dt));
function angDamp(a, b, k, dt) {
  let d = b - a; while (d > Math.PI) d -= Math.PI * 2; while (d < -Math.PI) d += Math.PI * 2;
  return a + d * (1 - Math.exp(-k * dt));
}

export class NPC {
  static ragdolls = true;
  constructor(scene, world, look, opts = {}) {
    this.world = world; this.scene = scene;
    this.model = new Humanoid(look);
    scene.add(this.model.root);
    this.name = opts.name || 'Pedestre';
    this.role = opts.role || 'ped';
    this.lines = opts.lines || [];
    this.behavior = opts.behavior || 'stand';
    this.x = opts.x || 0; this.z = opts.z || 0; this.heading = opts.heading || 0;
    this.homeHeading = this.heading; this.homeX = this.x; this.homeZ = this.z;
    this.y = opts.y ?? world.groundAt(this.x, this.z, 0.3, world.groundFn(this.x, this.z) + 0.3);
    this.speed = 0;
    this.r = 0.32; this.collidable = true;
    this.talking = false; this.dodge = 0; this.dodgeX = 0; this.dodgeZ = 0;
    this.wait = 0; this.lineIdx = 0;
    this.team = opts.team || 'neutral';
    this.hp = opts.hp ?? 100; this.maxHp = this.hp;
    this.attackCd = rr(0.3, 1.2); this.damage = opts.damage ?? 7;
    this.route = opts.route || null; this.routeI = 0; this.routeDir = 1;
    this.walkSpeed = opts.walk ?? rr(1.05, 1.5);
    this.runSpeed = opts.run ?? 4.6;
    this.target = null; this.downT = 0; this.getUp = opts.getUp ?? 0;
    this.pose = opts.pose || null; this.lying = 0;
    this.interactable = opts.interactable ?? true;
    if (this.behavior === 'loop') {
      this.loop = opts.loop; this.s = rand() * this.loop.half * 8; this.dir = rand() < 0.5 ? 1 : -1;
      this.lat = rr(-0.9, 0.3);
      const p = this.loopPos(this.s); this.x = p[0]; this.z = p[1];
    }
    if (this.behavior === 'patrol') { this.walkSpeed = 1.1; this.patrolT = rand() * 10; }
    if (this.behavior === 'sleep') this.setLying(-Math.PI / 2, 0.55);
    this.stuck = 0; this.animSkip = 0;
    this.sync();
  }
  get alive() { return this.behavior !== 'down'; }
  setLying(angle, lift = 0.15) { this.lying = angle; this.lift = lift; }
  // impulse: velocidade do empurrão (tiro, soco, carro) em m/s; at: ponto do impacto
  knockDown(getUpAfter = 0, impulse = null, at = null) {
    if (this.ragdoll) { if (impulse) this.ragdoll.push(impulse, at); this.behavior = 'down'; this.downT = 0; this.getUp = getUpAfter; this.hp = 0; return; }
    this.behavior = 'down'; this.downT = 0; this.getUp = getUpAfter; this.hp = 0;
    this.collidable = false; this.interactable = false; this.speed = 0;
    if (NPC.ragdolls && !this.inCar && this.model.root.visible) {
      // sem impulso: cai para trás (em relação a quem está de frente)
      const imp = impulse || { x: -Math.sin(this.heading) * 1.6, y: 0.4, z: -Math.cos(this.heading) * 1.6 };
      this.setLying(0, 0); this.sync(); this.ragdoll = new Ragdoll(this.model, this.world, imp, at);
    } else this.setLying(Math.PI / 2, 0.15);
  }
  // levanta do ragdoll no lugar onde o corpo parou
  endRagdoll() {
    if (!this.ragdoll) return;
    const c = this.ragdoll.center(); this.x = c.x; this.z = c.z;
    this.y = this.world.groundAt(this.x, this.z, 0.3, this.y + 0.3);
    endRagdoll(this.model); this.ragdoll = null; this.model.root.rotation.set(0, this.heading, 0);
  }
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
    if (fromCar || !this.collidable || !this.model.root.visible || this.inCar) return null;
    if (y1 < this.y || y0 > this.y + 1.8) return null;
    const dx = x - this.x, dz = z - this.z; const d = Math.hypot(dx, dz), R = r + this.r;
    if (d >= R || d < 1e-5) return null;
    const nx = dx / d, nz = dz / d;
    return { x: this.x + nx * R, z: this.z + nz * R, nx, nz };
  }
  // carro empurra o NPC; NPC tenta desviar. Retorna true se foi atropelado.
  reactToCar(car, dt) {
    if (!car || this.inCar || this.behavior === 'down' || this.behavior === 'sleep' || this.behavior === 'chair') return false;
    const dx = this.x - car.x, dz = this.z - car.z; const d2 = dx * dx + dz * dz;
    if (d2 > 100) return false;
    const sp = Math.abs(car.speed);
    if (sp > 2.5 && this.dodge <= 0) {
      const [fx, fz] = car.forward; const ahead = (dx * fx + dz * fz) * Math.sign(car.speed);
      const side = dx * -fz + dz * fx;
      if (ahead > 0 && ahead < 3 + sp * 0.6 && Math.abs(side) < 2.4) {
        const sgn = side >= 0 ? 1 : -1;
        this.dodge = 0.7; this.dodgeX = -fz * sgn * 5; this.dodgeZ = fx * sgn * 5;
      }
    }
    const res = car.pushCircleOut(this.x, this.z, this.r + (sp > 6 ? 0.25 : 0), this.y, this.y + 1.7); // margem: o NPC pode já ter sido empurrado para fora neste quadro
    if (res) {
      this.x = res.x; this.z = res.z;
      if (sp > 6) { const k = Math.min(1.2, sp / 14); this.knockDown(this.role === 'ped' || this.role === 'police' ? 7 : 0, { x: car.velX * k + res.nx * 2, y: 2.5 + sp * 0.12, z: car.velZ * k + res.nz * 2 }, { x: this.x, y: this.y + 0.6, z: this.z }); return true; }
    }
    return false;
  }
  moveTo(tx, tz, speed, dt, stopDist = 0.4) {
    const dx = tx - this.x, dz = tz - this.z; const d = Math.hypot(dx, dz);
    if (d < stopDist) return { arrived: true, speed: 0, heading: this.heading };
    const s = Math.min(speed, d * 3);
    const res = this.world.resolveCircle(this.x + dx / d * s * dt, this.z + dz / d * s * dt, this.r, this.y, this.y + 1.7, 0.4, this);
    const moved = Math.hypot(res.x - this.x, res.z - this.z);
    this.x = res.x; this.z = res.z;
    if (moved < s * dt * 0.25 && s > 0.5) this.stuck += dt; else this.stuck = Math.max(0, this.stuck - dt);
    return { arrived: false, speed: s, heading: Math.atan2(dx, dz) };
  }
  update(dt, ctx) {
    const { player } = ctx;
    const pdx = player.x - this.x, pdz = player.z - this.z;
    const pd = Math.hypot(pdx, pdz);
    let moveSpeed = 0; let wantHeading = this.heading; let mode = 'foot'; let crouch = false;
    if (this.inCar) { this.sync(); return; }
    if (this.ragdoll) {
      if (this.behavior !== 'down') this.endRagdoll(); // uma missão reviveu/moveu o personagem
      else {
        this.downT += dt;
        if (pd < 90 && this.model.root.visible) this.ragdoll.update(dt);
        if (this.getUp > 0 && this.downT > this.getUp) { this.endRagdoll(); this.behavior = this.prevBehavior || 'panic'; this.collidable = true; this.hp = this.maxHp; this.interactable = true; this.panicT = 6; this.sync(); }
        return;
      }
    }
    if (this.behavior === 'down') {
      this.downT += dt;
      if (this.getUp > 0 && this.downT > this.getUp) { this.behavior = this.prevBehavior || 'panic'; this.setLying(0, 0); this.collidable = true; this.hp = this.maxHp; this.interactable = true; this.panicT = 6; }
      mode = 'lie';
    } else if (this.dodge > 0) {
      this.dodge -= dt;
      const res = this.world.resolveCircle(this.x + this.dodgeX * dt, this.z + this.dodgeZ * dt, this.r, this.y, this.y + 1.7, 0.4, this);
      this.x = res.x; this.z = res.z; moveSpeed = 5; wantHeading = Math.atan2(this.dodgeX, this.dodgeZ);
    } else if (this.talking) {
      wantHeading = Math.atan2(pdx, pdz);
      if (this.pose) mode = this.pose;
    } else switch (this.behavior) {
      case 'loop': {
        if (this.wait > 0) { this.wait -= dt; break; }
        const [x1, z1] = this.loopPos(this.s + this.dir * 1.2);
        const blocked = Math.hypot(player.x - x1, player.z - z1) < 0.9 && player.mode === 'foot';
        if (blocked) break;
        const ns = this.s + this.dir * this.walkSpeed * dt;
        const [tx, tz] = this.loopPos(ns);
        const res = this.world.resolveCircle(tx, tz, this.r, this.y, this.y + 1.7, 0.4, this);
        const moved = Math.hypot(res.x - this.x, res.z - this.z);
        if (res.hit && moved < this.walkSpeed * dt * 0.3) this.stuck += dt; else this.stuck = 0;
        if (this.stuck > 1.2) { this.dir *= -1; this.stuck = 0; }
        wantHeading = Math.atan2(tx - this.x, tz - this.z);
        this.x = res.x; this.z = res.z; this.s = ns; moveSpeed = this.walkSpeed;
        if (rand() < dt * 0.04) this.wait = rr(2, 5);
        break;
      }
      case 'patrol': {
        this.patrolT += dt;
        const r = this.moveTo(this.homeX + Math.sin(this.patrolT * 0.12) * 6, this.homeZ, this.walkSpeed, dt, 0.3);
        if (!r.arrived) { moveSpeed = r.speed; wantHeading = r.heading; }
        break;
      }
      case 'guard': {
        // ronda entre pontos; com alerta investiga o último ponto suspeito
        let tx, tz, sp = this.walkSpeed;
        if (this.investigate) { [tx, tz] = this.investigate; sp = this.alertLevel >= 75 ? 3.2 : 1.8; }
        else if (this.route) [tx, tz] = this.route[this.routeI];
        if (tx !== undefined) {
          const r = this.moveTo(tx, tz, sp, dt, 0.6);
          if (r.arrived || this.stuck > 2) {
            this.stuck = 0;
            if (this.investigate) { this.wait = 2.5; this.investigate = null; }
            else if (this.route) { this.wait = rr(1, 3); this.routeI += this.routeDir; if (this.routeI >= this.route.length || this.routeI < 0) { this.routeDir *= -1; this.routeI += this.routeDir * 2; this.routeI = Math.max(0, Math.min(this.route.length - 1, this.routeI)); } }
          } else if (this.wait > 0) this.wait -= dt;
          else { moveSpeed = r.speed; wantHeading = r.heading; }
        }
        if (this.wait > 0) { this.wait -= dt; moveSpeed = 0; this.lookT = (this.lookT || 0) + dt; wantHeading = this.heading + Math.sin(this.lookT * 1.5) * 0.04; }
        break;
      }
      case 'follow': case 'ally': {
        let tgt = null;
        if (this.behavior === 'ally') tgt = ctx.nearestEnemy ? ctx.nearestEnemy(this, 16) : null;
        if (tgt) { moveSpeed = this.fight(tgt, dt, ctx); wantHeading = Math.atan2(tgt.x - this.x, tgt.z - this.z); }
        else {
          const fp = this.followSlot ? this.followSlot(player) : [player.x, player.z];
          const d = Math.hypot(fp[0] - this.x, fp[1] - this.z);
          if (d > 1.2) {
            const r = this.moveTo(fp[0], fp[1], d > 5 ? this.runSpeed : 1.8, dt, 1.0);
            if (!r.arrived) { moveSpeed = r.speed; wantHeading = r.heading; }
            if (d > 40 && ctx.teleportFollower) ctx.teleportFollower(this);
          } else wantHeading = player.heading;
        }
        crouch = player.crouch && !tgt;
        break;
      }
      case 'hostile': {
        const tgt = ctx.nearestFoe ? ctx.nearestFoe(this, 40) : null;
        if (tgt) { moveSpeed = this.fight(tgt, dt, ctx); wantHeading = Math.atan2(tgt.x - this.x, tgt.z - this.z); } else this.aimPose = false;
        break;
      }
      case 'scripted': {
        if (this.goal) {
          const r = this.moveTo(this.goal[0], this.goal[1], this.goalSpeed || 1.5, dt, 0.35);
          if (r.arrived) { this.goal = null; if (this.onArrive) { const f = this.onArrive; this.onArrive = null; f(); } }
          else { moveSpeed = r.speed; wantHeading = r.heading; }
        } else if (this.faceTo) wantHeading = Math.atan2(this.faceTo[0] - this.x, this.faceTo[1] - this.z);
        if (this.pose) mode = this.pose;
        break;
      }
      case 'flee': {
        if (this.route && this.routeI < this.route.length) {
          const [tx, tz] = this.route[this.routeI];
          // corre mais quando o jogador se aproxima (a fuga sempre tem vantagem)
          const sp = pd < 8 ? this.runSpeed * 1.25 : pd > 25 ? this.runSpeed * 0.75 : this.runSpeed;
          const r = this.moveTo(tx, tz, sp, dt, 1.2);
          if (r.arrived || this.stuck > 1) { this.routeI++; this.stuck = 0; }
          else { moveSpeed = r.speed; wantHeading = r.heading; }
        } else this.fled = true;
        break;
      }
      case 'panic': {
        this.panicT = (this.panicT || 6) - dt;
        const from = this.panicFrom || [player.x, player.z];
        const dx = this.x - from[0], dz = this.z - from[1]; const d = Math.hypot(dx, dz) || 1;
        const r = this.moveTo(this.x + dx / d * 3, this.z + dz / d * 3, 4.2, dt, 0.1);
        moveSpeed = r.speed; wantHeading = r.heading;
        if (this.panicT <= 0) { this.behavior = this.loop ? 'loop' : 'stand'; this.panicFrom = null; }
        break;
      }
      case 'chair': mode = 'chair'; break;
      case 'sleep': mode = 'lie'; break;
      default:
        if (this.pose) mode = this.pose;
        wantHeading = pd < 4 && this.role !== 'story-static' ? Math.atan2(pdx, pdz) : this.homeHeading;
    }
    this.heading = angDamp(this.heading, wantHeading, 7, dt);
    this.speed = damp(this.speed, moveSpeed, 8, dt);
    if (this.behavior !== 'sleep' && this.behavior !== 'chair' && !this.fixedY) this.y = damp(this.y, this.world.groundAt(this.x, this.z, 0.2, this.y), 20, dt);
    // pedestres muito longe não são desenhados (a neblina já os esconderia)
    if (this.role === 'ped') this.model.mesh.visible = pd < 150;
    this.animSkip += dt;
    const stepT = pd > 45 ? 0.1 : 0;
    if (this.animSkip >= stepT) {
      this.model.update(this.animSkip, { speed: this.speed, grounded: true, mode, talk: this.talking && mode === 'foot', crouch, phone: this.phone, aim: this.aimPose && this.behavior === 'hostile' });
      this.animSkip = 0;
    }
    this.sync();
  }
  // aproxima e ataca um alvo (corpo a corpo). Retorna a velocidade de movimento.
  fight(tgt, dt, ctx) {
    const d = Math.hypot(tgt.x - this.x, tgt.z - this.z);
    this.attackCd -= dt;
    // no máximo 2 inimigos atacam o jogador ao mesmo tempo; os outros cercam
    const isPlayer = tgt === ctx.player;
    if (isPlayer && ctx.tokens) {
      if (ctx.tokens.has(this) || ctx.tokens.size < 2) { if (d < 3) ctx.tokens.add(this); }
      else { if (d < 2.8) return 0; const r = this.moveTo(tgt.x, tgt.z, 2.2, dt, 2.8); return r.speed; }
    }
    // armados: param e atiram de longe
    if (this.gun && d > 2 && d < 26 && ctx.npcShoot) {
      this.aimPose = true;
      if (this.attackCd <= 0) { this.attackCd = 1.3 + Math.random() * 0.9; ctx.npcShoot(this, tgt); }
      if (d > 14) { const r = this.moveTo(tgt.x, tgt.z, 2.2, dt, 12); return r.speed; }
      return 0;
    }
    this.aimPose = false;
    if (d > 1.25) { const r = this.moveTo(tgt.x, tgt.z, d > 4 ? this.runSpeed : 2.4, dt, 1.1); return r.speed; }
    if (this.attackCd <= 0) { this.attackCd = rr(1.1, 1.8); this.model.punch(); ctx.hit && ctx.hit(this, tgt, this.damage); }
    return 0;
  }
  nextLine() {
    if (!this.lines.length) return null;
    const l = this.lines[this.lineIdx % this.lines.length];
    this.lineIdx++;
    return l;
  }
  remove() { this.scene.remove(this.model.root); this.removed = true; this.collidable = false; }
  sync() {
    if (this.inCar || this.ragdoll) return;
    this.model.root.position.set(this.x, this.y + (this.lift || 0) * Math.min(1, Math.abs(this.lying)), this.z);
    this.model.root.rotation.set(this.lying || 0, this.heading, 0);
  }
}
