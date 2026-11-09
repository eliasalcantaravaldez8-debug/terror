import * as THREE from 'three';
import { SoldierModel, APPEARANCE } from '../characters/SoldierModel.js';
import { clamp, damp, dampAngle, wrapAngle } from '../utils/math.js';

const _v = new THREE.Vector3(), _v2 = new THREE.Vector3(), _dir = new THREE.Vector3();
const DEG = Math.PI / 180;

/** AI weapon profiles (fictional). */
export const AI_WEAPONS = {
  rifleman: { name: 'rifle', damage: 11, range: 250, fireInterval: 0.11, burst: [3, 6], mag: 30, reload: 2.6, sound: 'rifle', headMultiplier: 2, falloffStart: 30, falloffEnd: 120, minDamageScale: 0.6, accuracy: 1 },
  ally: { name: 'rifle', damage: 22, range: 300, fireInterval: 0.12, burst: [3, 5], mag: 30, reload: 2.4, sound: 'rifle', headMultiplier: 3, falloffStart: 40, falloffEnd: 120, minDamageScale: 0.6, accuracy: 1 },
  mg: { name: 'mg', damage: 9, range: 250, fireInterval: 0.085, burst: [8, 14], mag: 100, reload: 4, sound: 'mg', headMultiplier: 2, falloffStart: 30, falloffEnd: 120, minDamageScale: 0.6, accuracy: 0.8 },
  smg: { name: 'smg', damage: 8, range: 150, fireInterval: 0.075, burst: [5, 9], mag: 32, reload: 2.0, sound: 'pistol', headMultiplier: 2, falloffStart: 15, falloffEnd: 60, minDamageScale: 0.5, accuracy: 0.85 },
  shotgun: { name: 'shotgun', damage: 26, range: 45, fireInterval: 1.0, burst: [1, 2], mag: 7, reload: 3, sound: 'sniper', headMultiplier: 1.5, falloffStart: 6, falloffEnd: 25, minDamageScale: 0.2, accuracy: 1.2 },
  sniper: { name: 'sniper', damage: 58, range: 600, fireInterval: 1.6, burst: [1, 1], mag: 5, reload: 3.5, sound: 'sniper', headMultiplier: 1.5, falloffStart: 300, falloffEnd: 600, minDamageScale: 1, accuracy: 1.6 },
};

/**
 * A soldier actor (ally or hostile): locomotion along nav paths, collision,
 * aiming, burst fire, damage & death. Decision making lives in a Brain.
 */
export class Soldier {
  constructor(game, o) {
    this.game = game;
    this.team = o.team;
    this.name = o.name || (o.team === 'enemy' ? 'Hostil' : 'Soldado');
    this.id = o.id || this.name;
    this.kind = o.kind || (o.team === 'enemy' ? 'rifleman' : 'ally');
    const appearance = o.appearance || (o.team === 'enemy' ? APPEARANCE.enemy(game.mats, o.look) : APPEARANCE.ally(game.mats, o.look));
    this.weaponModelId = { sniper: 'lr6', smg: 'mk9', shotgun: 'brk12' }[this.kind] || 'vk7';
    this.model = new SoldierModel(game.mats, appearance, { weapon: this.weaponModelId });
    game.scene.add(this.model.root);
    this.pos = new THREE.Vector3(o.x, o.y || 0, o.z);
    this.yaw = o.yaw ?? 0;
    this.vel = new THREE.Vector3();
    this.maxHealth = o.health ?? 100;
    this.health = this.maxHealth;
    this.alive = true;
    this.invulnerable = !!o.invulnerable;
    this.isStatic = !!o.static;
    this.weapon = { ...AI_WEAPONS[this.kind] };
    this.ammo = this.weapon.mag;
    this.reloadT = 0;
    this.brain = null;
    // locomotion
    this.path = null; this.pathIdx = 0;
    this.speed = 0; this.targetSpeed = 0;
    this.arrived = true;
    this.goal = null;
    this.crouchT = 0; this.aimT = 0; this.seated = 0; this.talk = 0;
    this.aimTarget = null; // actor
    this.aimPoint = new THREE.Vector3();
    this.lookPoint = null;
    this.faceYaw = null;
    this.burstLeft = 0; this.shotTimer = 0; this.hitChance = 0.2;
    this.suppression = 0;
    this.lastHitTime = -10;
    this.time = Math.random() * 10;
    this.scripted = false;
    this.ignoreCollision = false;
    this.radius = 0.34;
    this.groundY = this.pos.y;
    this.onKilled = null;
    this.hitSpheres = this.model.hitSpheres;
    this.syncModel(0);
  }

  get isCrouched() { return this.crouchT > 0.5; }
  get isPlayer() { return false; }

  getEye(out = new THREE.Vector3()) { return out.set(this.pos.x, this.pos.y + (this.crouchT > 0.5 ? 1.05 : 1.62), this.pos.z); }
  getAimPoint(out = new THREE.Vector3()) { return out.copy(this.hitSpheres[1].c); }

  // ------------------------------------------------------------ commands
  moveTo(x, z, speed = 4.2) {
    if (this.isStatic) return false;
    const nav = this.game.nav;
    const path = nav.findPath(this.pos.x, this.pos.z, x, z);
    if (!path || !path.length) { this.path = null; this.arrived = true; return false; }
    this.path = path; this.pathIdx = 0;
    this.targetSpeed = speed;
    this.arrived = false;
    this.goal = { x, z };
    return true;
  }
  /** Straight-line move ignoring the nav grid (used for scripted exits). */
  moveDirect(points, speed = 2.5) {
    this.path = points.map((p) => ({ x: p.x, z: p.z }));
    this.pathIdx = 0; this.targetSpeed = speed; this.arrived = false;
    this.goal = points[points.length - 1];
  }
  stop() { this.path = null; this.arrived = true; this.targetSpeed = 0; }

  suppress(amount) {
    this.suppression = clamp(this.suppression + amount * 0.6, 0, 1);
  }

  /** Start a burst at target with the given per-shot hit chance. */
  startBurst(target, hitChance, shots = null) {
    if (this.reloadT > 0 || !this.alive) return;
    const [a, b] = this.weapon.burst;
    this.burstLeft = shots ?? (a + Math.floor(Math.random() * (b - a + 1)));
    this.aimTarget = target;
    this.hitChance = hitChance;
    this.shotTimer = Math.min(this.shotTimer, 0.08);
  }

  takeDamage(amount, fromPos, info = {}) {
    if (!this.alive) return;
    this.lastHitTime = this.time;
    this.model.hitKick = Math.min(1, this.model.hitKick + 0.6);
    this.suppress(0.8);
    this.brain?.onDamaged?.(fromPos, info);
    if (this.invulnerable) return;
    this.health -= amount;
    if (this.health <= 0) this.die(info);
  }

  die(info = {}) {
    if (!this.alive) return;
    this.alive = false;
    this.health = 0;
    this.burstLeft = 0;
    this.stop();
    this.game.cover?.release(this);
    // fall away from the shot
    let dirSign = -1;
    if (info.dir) {
      const fwdX = Math.sin(this.yaw), fwdZ = Math.cos(this.yaw);
      dirSign = info.dir.x * fwdX + info.dir.z * fwdZ > 0 ? 1 : -1;
    }
    this.model.baseY = this.pos.y;
    this.model.groundY = this.game.world.groundHeight(this.pos.x, this.pos.z, 0.5, this.pos.y + 0.1);
    this.model.die(dirSign, this.game.scene);
    if (this.model.weaponDropped && this.team === 'enemy') {
      const ws = this.weapon;
      this.game.pickups?.add({ weaponId: this.weaponModelId, mesh: this.model.weapon, mag: Math.max(0, this.ammo), reserve: Math.round(ws.mag * (1 + Math.random())) });
    }
    this.game.events.emit('soldierKilled', { soldier: this, info });
    this.onKilled?.(this, info);
  }

  /** Remove from the scene entirely. */
  dispose() {
    this.game.scene.remove(this.model.root);
    if (this.model.weaponDropped) this.game.scene.remove(this.model.weapon);
    this.game.cover?.release(this);
  }

  // ------------------------------------------------------------ update
  update(dt) {
    this.time += dt;
    if (this.attachedSeat) return; // driven by the vehicle it sits in
    this.suppression = Math.max(0, this.suppression - dt * 0.35);
    if (!this.alive) { this.model.update(dt, {}); return; }
    if (this.brain && !this.scripted) this.brain.update(dt);
    this._locomotion(dt);
    this._firing(dt);
    this.syncModel(dt);
  }

  _locomotion(dt) {
    const world = this.game.world;
    let wantX = 0, wantZ = 0;
    if (this.path && this.pathIdx < this.path.length) {
      const wp = this.path[this.pathIdx];
      const dx = wp.x - this.pos.x, dz = wp.z - this.pos.z;
      const d = Math.hypot(dx, dz);
      const last = this.pathIdx === this.path.length - 1;
      if (d < (last ? 0.25 : 0.6)) {
        this.pathIdx++;
        if (this.pathIdx >= this.path.length) { this.path = null; this.arrived = true; }
      } else {
        const slow = last ? clamp(d / 1.2, 0.3, 1) : 1;
        wantX = (dx / d) * this.targetSpeed * slow;
        wantZ = (dz / d) * this.targetSpeed * slow;
      }
    }
    // separation from other actors
    if (!this.ignoreCollision) {
      for (const a of this.game.actors) {
        if (a === this || !a.alive) continue;
        const dx = this.pos.x - a.pos.x, dz = this.pos.z - a.pos.z;
        const d2 = dx * dx + dz * dz;
        if (d2 < 0.81 && d2 > 1e-6 && Math.abs(a.pos.y - this.pos.y) < 1) {
          const d = Math.sqrt(d2);
          const push = (0.9 - d) * 3;
          wantX += (dx / d) * push; wantZ += (dz / d) * push;
        }
      }
    }
    this.vel.x = damp(this.vel.x, wantX, 9, dt);
    this.vel.z = damp(this.vel.z, wantZ, 9, dt);
    if (this.isStatic) { this.vel.set(0, 0, 0); }
    this.pos.x += this.vel.x * dt;
    this.pos.z += this.vel.z * dt;
    if (!this.isStatic) {
      if (!this.ignoreCollision) world.resolveCylinder(this.pos, this.radius, 1.7, 0.45);
      const g = world.groundHeight(this.pos.x, this.pos.z, this.radius, this.pos.y + 0.46);
      this.pos.y = g > this.pos.y ? damp(this.pos.y, g, 25, dt) : Math.max(g, this.pos.y - 6 * dt);
    }
    this.speed = Math.hypot(this.vel.x, this.vel.z);

    // facing
    let targetYaw = null;
    if (this.aimTarget && this.aimTarget.alive !== false && (this.aimT > 0.2 || this.burstLeft > 0)) {
      const p = this.aimTarget.getAimPoint ? this.aimTarget.getAimPoint(_v) : this.aimTarget;
      targetYaw = Math.atan2(p.x - this.pos.x, p.z - this.pos.z);
    } else if (this.lookPoint) {
      targetYaw = Math.atan2(this.lookPoint.x - this.pos.x, this.lookPoint.z - this.pos.z);
    } else if (this.speed > 0.6) {
      targetYaw = Math.atan2(this.vel.x, this.vel.z);
    } else if (this.faceYaw !== null) targetYaw = this.faceYaw;
    if (targetYaw !== null) this.yaw = dampAngle(this.yaw, targetYaw, this.speed > 3 ? 7 : 9, dt);
  }

  _firing(dt) {
    if (this.reloadT > 0) {
      this.reloadT -= dt;
      if (this.reloadT <= 0) this.ammo = this.weapon.mag;
      return;
    }
    if (this.burstLeft <= 0 || !this.aimTarget || this.aimTarget.alive === false) { this.burstLeft = 0; return; }
    // need to face target before firing
    const tp = this.aimTarget.getAimPoint(_v2);
    const yawTo = Math.atan2(tp.x - this.pos.x, tp.z - this.pos.z);
    if (Math.abs(wrapAngle(yawTo - this.yaw)) > 0.35 || this.aimT < 0.6) return;
    this.shotTimer -= dt;
    if (this.shotTimer > 0) return;
    this.shotTimer = this.weapon.fireInterval * (0.9 + Math.random() * 0.25);
    this.burstLeft--;
    this.ammo--;
    if (this.ammo <= 0) { this.reloadT = this.weapon.reload; this.burstLeft = 0; this.brain?.onReload?.(); }
    this.shootOnce(this.aimTarget, this.hitChance);
  }

  shootOnce(target, hitChance) {
    const game = this.game;
    const muzzle = this.model.getMuzzle(new THREE.Vector3());
    const eye = this.getEye(new THREE.Vector3());
    const origin = muzzle;
    let aim;
    if (Math.random() < hitChance) {
      const spheres = target.hitSpheres;
      const s = this.kind === 'sniper' ? spheres[1] : spheres[Math.random() < 0.15 ? 0 : 1];
      aim = s.c.clone();
    } else {
      aim = target.getAimPoint(new THREE.Vector3());
      // miss: offset perpendicular to the line of fire
      _dir.subVectors(aim, origin).normalize();
      const side = new THREE.Vector3(-_dir.z, 0, _dir.x).normalize();
      const m = 0.55 + Math.random() * 1.6;
      aim.addScaledVector(side, (Math.random() < 0.5 ? -1 : 1) * m * (0.5 + Math.random()));
      aim.y += (Math.random() - 0.35) * m;
    }
    // shoot from the eye line (prevents muzzle-in-cover artefacts) but show FX at the muzzle
    const dir = new THREE.Vector3().subVectors(aim, eye).normalize();
    const res = game.combat.fireHitscan(this, eye, dir, this.weapon, { damageScale: this.team === 'enemy' ? game.difficulty.enemyDamage : 1 });
    game.effects.muzzleFlash(muzzle, dir, this.kind === 'sniper' ? 1.4 : 0.8, Math.random() < 0.6);
    if (Math.random() < (this.kind === 'mg' ? 0.6 : 0.4)) game.effects.tracer(muzzle.clone(), res.point.clone(), 330);
    game.audio.playShot(muzzle, this.weapon.sound, false);
    this.model.fireKick = 1;
    game.events.emit('aiShot', { soldier: this });
  }

  syncModel(dt) {
    const m = this.model;
    m.root.position.copy(this.pos);
    if (!m.dead) m.root.rotation.set(0, this.yaw, 0);
    // local movement direction for the legs
    const fx = Math.sin(this.yaw), fz = Math.cos(this.yaw);
    let mx = 0, mz = 1;
    if (this.speed > 0.1) {
      const vx = this.vel.x / this.speed, vz = this.vel.z / this.speed;
      mz = vx * fx + vz * fz;
      mx = vx * fz - vz * fx;
    }
    let aimPitch = 0;
    if (this.aimTarget && this.aimTarget.getAimPoint) {
      const tp = this.aimTarget.getAimPoint(_v2);
      const e = this.getEye(_v);
      aimPitch = Math.atan2(tp.y - e.y, Math.hypot(tp.x - e.x, tp.z - e.z));
    }
    const aiming = this.burstLeft > 0 ? 1 : this.aimT;
    m.update(dt, {
      speed: this.speed, moveX: mx, moveZ: mz,
      crouch: this.burstLeft > 0 && this.crouchT < 0.5 ? 0 : this.crouchT,
      aim: this.speed > 3.5 && this.burstLeft === 0 ? 0 : aiming,
      aimPitch, seated: this.seated, talk: this.talk,
      lookYaw: this.headYaw || 0, lookPitch: this.headPitch || 0,
    });
  }
}
