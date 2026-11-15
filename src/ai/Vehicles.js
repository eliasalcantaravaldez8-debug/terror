import * as THREE from 'three';
import { buildCarParts } from '../world/PropModels.js';

const _v = new THREE.Vector3(), _d = new THREE.Vector3();

/**
 * Destructible vehicle targets that behave as hostile actors (they can be hit by
 * Combat.fireHitscan like soldiers): convoy trucks driving along a path and
 * anti-aircraft guns that fire flak bursts at the player.
 */
class VehicleTarget {
  constructor(game, { team = 'enemy', health = 900, radius = 2.2 }) {
    this.game = game;
    this.team = team;
    this.alive = true;
    this.health = this.maxHealth = health;
    this.isVehicle = true;
    this.pos = new THREE.Vector3();
    this.yaw = 0;
    this.root = new THREE.Group();
    this.model = { root: this.root };
    this.hitSpheres = [{ c: new THREE.Vector3(), r: radius * 0.7, zone: 'chest' }, { c: new THREE.Vector3(), r: radius, zone: 'chest' }, { c: new THREE.Vector3(), r: radius * 0.7, zone: 'chest' }];
    this.brain = { active: true };
    game.scene.add(this.root);
  }
  get isPlayer() { return false; }
  getAimPoint(out = new THREE.Vector3()) { return out.copy(this.hitSpheres[1].c); }
  getEye(out = new THREE.Vector3()) { return out.copy(this.hitSpheres[1].c); }
  suppress() {}
  takeDamage(amount, fromPos, info = {}) {
    if (!this.alive) return;
    this.health -= amount * (info.explosion ? 1.5 : 1);
    if (this.hitFlash !== undefined) this.hitFlash = 0.08;
    if (this.health <= 0) this.destroy(info);
  }
  destroy(info = {}) {
    this.alive = false;
    const g = this.game;
    const p = this.hitSpheres[1].c.clone();
    g.effects.explosion(p, 1.8);
    g.audio.playExplosion(p, 1.6);
    const fire = g.effects.addFire({ x: p.x, y: p.y - 0.5, z: p.z }, 1.6, false);
    this.fire = fire;
    this.onDestroyed?.(this);
    if (this.wreckMat) this.root.traverse((o) => { if (o.isMesh) o.material = this.wreckMat; });
    g.events.emit('soldierKilled', { soldier: this, info });
    if (info.shooter?.isPlayer) g.hud.feed(this.killText || 'VEÍCULO DESTRUÍDO');
  }
  dispose() { this.game.scene.remove(this.root); if (this.fire) this.game.effects.removeEmitter(this.fire); }
}

/** Convoy truck following a polyline at constant speed (stops at the end). */
export class Truck extends VehicleTarget {
  constructor(game, path, { speed = 11, delay = 0, color = 0x4a5038 } = {}) {
    super(game, { health: 700, radius: 2.4 });
    this.path = path; this.speed = speed; this.delay = delay; this.dist = 0;
    this.killText = 'CAMINHÃO DESTRUÍDO';
    const parts = buildCarParts('van', game.mats);
    for (const part of parts.parts) {
      const mesh = new THREE.Mesh(part.geometry, part.paint ? part.material.clone() : part.material);
      if (part.paint) mesh.material.color.setHex(color);
      mesh.castShadow = true; this.root.add(mesh);
    }
    // canvas cargo box
    const box = new THREE.Mesh(new THREE.BoxGeometry(2.3, 2.2, 3.4), game.mats.vestAlly());
    box.position.set(0, 2.3, -1.2); box.castShadow = true; this.root.add(box);
    this.root.scale.setScalar(1.35);
    this.wreckMat = game.mats.burned();
    this._place(0);
  }
  _place(d) {
    let rem = d;
    for (let i = 0; i < this.path.length - 1; i++) {
      const a = this.path[i], b = this.path[i + 1];
      const l = a.distanceTo(b);
      if (rem <= l || i === this.path.length - 2) {
        const t = Math.min(1, rem / l);
        this.pos.lerpVectors(a, b, t);
        this.yaw = Math.atan2(b.x - a.x, b.z - a.z);
        break;
      }
      rem -= l;
    }
    this.root.position.copy(this.pos);
    this.root.rotation.set(0, this.yaw, 0);
    const fx = Math.sin(this.yaw), fz = Math.cos(this.yaw);
    this.hitSpheres[0].c.set(this.pos.x + fx * 2.5, this.pos.y + 1.6, this.pos.z + fz * 2.5);
    this.hitSpheres[1].c.set(this.pos.x, this.pos.y + 2.0, this.pos.z);
    this.hitSpheres[2].c.set(this.pos.x - fx * 2.5, this.pos.y + 2.0, this.pos.z - fz * 2.5);
  }
  update(dt) {
    if (!this.alive) return;
    if (this.delay > 0) { this.delay -= dt; return; }
    this.dist += this.speed * dt;
    this._place(this.dist);
  }
}

/** Twin-barrel anti-aircraft gun that fires flak at the player's helicopter. */
export class AAGun extends VehicleTarget {
  constructor(game, pos, { id } = {}) {
    super(game, { health: 650, radius: 1.9 });
    this.id = id;
    this.killText = 'ANTIAÉREA DESTRUÍDA';
    const m = game.mats, olive = m.paint('#4f5638', 127), dark = m.darkMetal();
    const base = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.6, 0.8, 16), olive); base.position.y = 0.4; this.root.add(base);
    this.turret = new THREE.Group(); this.turret.position.y = 0.8; this.root.add(this.turret);
    const body = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.4, 2.4), olive); body.position.y = 0.7; this.turret.add(body);
    this.barrels = new THREE.Group(); this.barrels.position.set(0, 1.2, 0.6); this.turret.add(this.barrels);
    for (const s of [-0.45, 0.45]) { const b = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.11, 3.2, 8), dark); b.rotation.x = Math.PI / 2; b.position.set(s, 0, 1.6); this.barrels.add(b); }
    const sand = m.sandbag();
    for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2; const s = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.7, 0.8), sand); s.position.set(Math.cos(a) * 3.6, 0.35, Math.sin(a) * 3.6); s.rotation.y = -a; this.root.add(s); }
    this.root.traverse((o) => { if (o.isMesh) o.castShadow = true; });
    this.pos.copy(pos);
    this.root.position.copy(pos);
    for (const h of this.hitSpheres) h.c.set(pos.x, pos.y + 1.6, pos.z);
    this.hitSpheres[0].c.y = pos.y + 0.8;
    this.cool = 2 + Math.random() * 2;
    this.burst = 0;
    this.active = false;
    this.wreckMat = game.mats.burned();
  }
  update(dt) {
    if (!this.alive) return;
    const g = this.game, p = g.player;
    const target = _v.copy(p.camPos);
    const dir = _d.subVectors(target, this.pos);
    const dist = dir.length();
    // aim
    const yaw = Math.atan2(dir.x, dir.z);
    this.turret.rotation.y += (yaw - this.turret.rotation.y) * Math.min(1, dt * 3);
    this.barrels.rotation.x = -Math.atan2(dir.y, Math.hypot(dir.x, dir.z));
    if (!this.active || dist > 420) return;
    this.cool -= dt;
    if (this.cool > 0) return;
    if (this.burst <= 0) { this.burst = 6; }
    this.cool = this.burst > 1 ? 0.14 : 2.4 + Math.random() * 1.6;
    this.burst--;
    const muzzle = this.barrels.localToWorld(new THREE.Vector3(0, 0, 3.2));
    const miss = new THREE.Vector3((Math.random() - 0.5) * 30, (Math.random() - 0.3) * 18, (Math.random() - 0.5) * 30).multiplyScalar(Math.min(1, dist / 150));
    const aim = target.clone().add(miss);
    g.effects.muzzleFlash(muzzle, dir.clone().normalize(), 2.2, Math.random() < 0.3);
    g.effects.tracer(muzzle, aim, 420);
    g.audio.playShot(muzzle, 'mg', false);
    // flak puff near the helicopter
    setTimeout(() => {
      if (!this.alive) return;
      g.effects.smoke.spawn({ x: aim.x, y: aim.y, z: aim.z, life: 3, size: 2, endSize: 6, color: [0.12, 0.12, 0.12], alpha: 0.8, drag: 1 });
      g.effects.flashes.spawn({ x: aim.x, y: aim.y, z: aim.z, life: 0.12, size: 4, endSize: 6, color: [1, 0.7, 0.4], alpha: 1, fadeIn: 0 });
      const d = aim.distanceTo(target);
      if (d < 9) { p.takeDamage((9 - d) * 1.6 * g.difficulty.enemyDamage, this.pos); p.addTrauma(0.25); }
      if (d < 25) g.audio.playExplosion(aim, 0.35);
    }, Math.min(900, dist * 2.4));
  }
}
