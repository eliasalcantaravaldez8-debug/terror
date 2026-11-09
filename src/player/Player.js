import * as THREE from 'three';
import { clamp, lerp, damp } from '../utils/math.js';

const STAND_H = 1.8, CROUCH_H = 1.15, STAND_EYE = 1.66, CROUCH_EYE = 1.04, RADIUS = 0.36;
const _fwd = new THREE.Vector3(), _right = new THREE.Vector3(), _wish = new THREE.Vector3();
const _q = new THREE.Quaternion(), _e = new THREE.Euler(0, 0, 0, 'YXZ');

/**
 * First-person player: movement (walk/sprint/crouch/jump), collision,
 * camera (bob, recoil, shake, mount), health with regeneration.
 */
export class Player {
  constructor(game) {
    this.game = game;
    this.team = 'ally';
    this.isPlayer = true;
    this.name = 'Cap. Daniel Mercer';
    this.pos = new THREE.Vector3(0, 0, 0);
    this.vel = new THREE.Vector3();
    this.yaw = 0; this.pitch = 0;
    this.height = STAND_H;
    this.eyeHeight = STAND_EYE;
    this.crouched = false; this.crouchToggle = false;
    this.sprinting = false;
    this.onGround = true;
    this.maxHealth = 100;
    this.health = 100;
    this.alive = true;
    this.lastDamageTime = -100;
    this.time = 0;
    this.invulnerable = false;
    this.mount = null; // { object: Object3D, offset: Vector3, yawLimit, pitchLimit }
    this.mountYaw = 0; this.mountPitch = 0;
    this.recoil = { pitch: 0, yaw: 0 };
    this.trauma = 0;
    this.bobPhase = 0; this.bobAmount = 0;
    this.landDip = 0;
    this.standUpT = 1;
    this.movementLocked = false;
    this.adsAmount = 0;
    this.stepAcc = 0;
    this.kills = 0; this.shotsFired = 0; this.shotsHit = 0; this.headshots = 0;
    this.hitSpheres = [
      { c: new THREE.Vector3(), r: 0.16, zone: 'head' },
      { c: new THREE.Vector3(), r: 0.28, zone: 'chest' },
      { c: new THREE.Vector3(), r: 0.24, zone: 'legs' },
    ];
    this.camPos = new THREE.Vector3();
    this.camQuat = new THREE.Quaternion();
    this.forward = new THREE.Vector3(0, 0, -1);
    this.velocityForAI = new THREE.Vector3();
    this.inside = false; // inside a vehicle cabin (affects audio)
  }

  reset(pos, yaw) {
    this.pos.copy(pos);
    this.vel.set(0, 0, 0);
    this.yaw = yaw; this.pitch = 0;
    this.health = this.maxHealth;
    this.alive = true;
    this.crouched = false; this.crouchToggle = false;
    this.mount = null;
    this.recoil.pitch = this.recoil.yaw = 0;
    this.trauma = 0;
    this.lastDamageTime = -100;
    this.movementLocked = false;
    this.height = STAND_H; this.eyeHeight = STAND_EYE;
  }

  get isCrouched() { return this.crouched; }
  get moving() { return Math.hypot(this.vel.x, this.vel.z) > 0.5; }

  setMount(object, offset, { yawLimit = 2.6, pitchLimit = 1.2 } = {}) {
    this.mount = { object, offset: offset.clone(), yawLimit, pitchLimit };
    this.mountYaw = 0; this.mountPitch = -0.05;
  }

  /** Leave the seat: convert mount-relative look into world look and stand up. */
  dismount(standPos) {
    if (!this.mount) return;
    const obj = this.mount.object;
    obj.updateWorldMatrix(true, false);
    obj.getWorldQuaternion(_q);
    _e.setFromQuaternion(_q, 'YXZ');
    this.yaw = _e.y + Math.PI + this.mountYaw;
    this.pitch = this.mountPitch;
    this.mount = null;
    this.pos.copy(standPos);
    this.vel.set(0, 0, 0);
    this.standUpT = 0;
    // low cabin ceiling: start hunched; headroom check keeps us crouched until outside
    this.crouched = true;
    this.crouchToggle = false;
    this.height = CROUCH_H;
    this.eyeHeight = CROUCH_EYE;
  }

  getEye(out = new THREE.Vector3()) { return out.set(this.pos.x, this.pos.y + this.eyeHeight, this.pos.z); }
  getAimPoint(out = new THREE.Vector3()) { return out.set(this.pos.x, this.pos.y + this.eyeHeight - 0.4, this.pos.z); }

  updateHitSpheres() {
    const e = this.eyeHeight;
    this.hitSpheres[0].c.set(this.pos.x, this.pos.y + e - 0.05, this.pos.z);
    this.hitSpheres[1].c.set(this.pos.x, this.pos.y + e - 0.45, this.pos.z);
    this.hitSpheres[2].c.set(this.pos.x, this.pos.y + e * 0.45, this.pos.z);
  }

  addTrauma(a) { this.trauma = clamp(this.trauma + a, 0, 1); }

  takeDamage(amount, fromPos, info = {}) {
    if (!this.alive || this.invulnerable) return;
    const diff = this.game.difficulty?.playerDamage ?? 1;
    this.health -= amount * diff;
    this.lastDamageTime = this.time;
    this.addTrauma(0.25 + amount / 120);
    this.game.audio.playHurt();
    if (fromPos) {
      const ang = Math.atan2(fromPos.x - this.pos.x, fromPos.z - this.pos.z);
      this.game.events.emit('playerDamaged', { angle: ang, amount });
    }
    if (this.health <= 0) {
      this.health = 0;
      this.alive = false;
      this.game.events.emit('playerDied', info);
    }
  }

  heal(amount) { this.health = Math.min(this.maxHealth, this.health + amount); }

  update(dt, input, sensitivity, invertY) {
    this.time += dt;
    // regen
    if (this.alive && this.time - this.lastDamageTime > 4.2 && this.health < this.maxHealth) {
      this.health = Math.min(this.maxHealth, this.health + 32 * dt);
    }
    // look
    const m = input.consumeMouse();
    const adsMul = lerp(1, this.game.weapons?.current?.def.scope ? 0.28 : 0.55, this.adsAmount);
    const sens = 0.0022 * sensitivity * adsMul;
    const dy = (invertY ? -m.y : m.y) * sens;
    if (this.mount) {
      this.mountYaw = clamp(this.mountYaw - m.x * sens, -this.mount.yawLimit, this.mount.yawLimit);
      this.mountPitch = clamp(this.mountPitch - dy, -this.mount.pitchLimit, this.mount.pitchLimit);
    } else {
      this.yaw -= m.x * sens;
      this.pitch = clamp(this.pitch - dy, -1.5, 1.5);
    }
    // recoil recovery
    this.recoil.pitch = damp(this.recoil.pitch, 0, 6, dt);
    this.recoil.yaw = damp(this.recoil.yaw, 0, 6, dt);
    this.trauma = Math.max(0, this.trauma - dt * 0.9);
    this.landDip = damp(this.landDip, 0, 8, dt);
    this.standUpT = Math.min(1, this.standUpT + dt * 1.6);

    if (this.mount || !this.alive) { this.vel.set(0, 0, 0); return; }

    // crouch
    if (input.actionPressed('crouchToggle')) this.crouchToggle = !this.crouchToggle;
    let wantCrouch = this.crouchToggle || input.action('crouchHold');
    // sprint
    const fwdIn = (input.action('forward') ? 1 : 0) - (input.action('back') ? 1 : 0);
    const sideIn = (input.action('right') ? 1 : 0) - (input.action('left') ? 1 : 0);
    const wantsSprint = input.action('sprint') && fwdIn > 0 && !this.movementLocked;
    if (wantsSprint && wantCrouch && this.crouchToggle) { this.crouchToggle = false; wantCrouch = input.action('crouchHold'); }
    this.sprinting = wantsSprint && !wantCrouch && this.onGround && this.adsAmount < 0.3;
    if (!wantCrouch && this.crouched) {
      // check headroom
      const ceil = this.game.world.ceilingHeight(this.pos.x, this.pos.z, RADIUS, this.pos.y + 0.5);
      if (ceil - this.pos.y < STAND_H) wantCrouch = true;
    }
    this.crouched = wantCrouch;
    this.height = this.crouched ? CROUCH_H : STAND_H;
    this.eyeHeight = damp(this.eyeHeight, this.crouched ? CROUCH_EYE : STAND_EYE, 12, dt);

    // movement
    const maxSpeed = this.movementLocked ? 0 : this.sprinting ? 6.4 : this.crouched ? 2.0 : lerp(3.9, 2.3, this.adsAmount);
    _fwd.set(-Math.sin(this.yaw), 0, -Math.cos(this.yaw));
    _right.set(Math.cos(this.yaw), 0, -Math.sin(this.yaw));
    _wish.set(0, 0, 0).addScaledVector(_fwd, fwdIn).addScaledVector(_right, sideIn);
    if (_wish.lengthSq() > 1) _wish.normalize();
    _wish.multiplyScalar(maxSpeed);
    const accel = this.onGround ? 11 : 2.5;
    this.vel.x = damp(this.vel.x, _wish.x, accel, dt);
    this.vel.z = damp(this.vel.z, _wish.z, accel, dt);
    if (this.onGround && input.actionPressed('jump') && !this.crouched && !this.movementLocked) {
      this.vel.y = 4.7;
      this.onGround = false;
    }
    this.vel.y -= 15 * dt;
    const world = this.game.world;
    const prevY = this.pos.y;
    // sub-step for robustness
    const steps = Math.max(1, Math.ceil((Math.hypot(this.vel.x, this.vel.z) * dt) / 0.25));
    for (let i = 0; i < steps; i++) {
      this.pos.x += (this.vel.x * dt) / steps;
      this.pos.z += (this.vel.z * dt) / steps;
      world.resolveCylinder(this.pos, RADIUS, this.height, 0.45);
    }
    this.pos.y += this.vel.y * dt;
    const ground = world.groundHeight(this.pos.x, this.pos.z, RADIUS, Math.max(prevY, this.pos.y) + 0.46);
    if (this.pos.y <= ground) {
      if (!this.onGround && this.vel.y < -5) { this.landDip = Math.min(0.12, -this.vel.y * 0.012); this.game.audio.playFootstep('concrete', 1.6); }
      this.pos.y = ground;
      this.vel.y = 0;
      this.onGround = true;
    } else if (this.pos.y - ground > 0.05) {
      this.onGround = false;
    }
    // ceiling
    const ceil = world.ceilingHeight(this.pos.x, this.pos.z, RADIUS * 0.8, this.pos.y + 0.3);
    if (this.pos.y + this.height > ceil) { this.pos.y = Math.min(this.pos.y, ceil - this.height); if (this.vel.y > 0) this.vel.y = 0; }

    // head bob & footsteps
    const hs = Math.hypot(this.vel.x, this.vel.z);
    this.bobAmount = damp(this.bobAmount, this.onGround ? clamp(hs / 4, 0, 1.6) : 0, 8, dt);
    if (this.onGround && hs > 0.3) {
      const prev = Math.sin(this.bobPhase);
      this.bobPhase += dt * (this.sprinting ? 12.5 : this.crouched ? 6 : 9.2);
      const cur = Math.sin(this.bobPhase);
      if ((prev < 0) !== (cur < 0)) this.game.audio.playFootstep('concrete', this.sprinting ? 1.3 : this.crouched ? 0.45 : 0.85);
    }
    this.velocityForAI.copy(this.vel);
    this.updateHitSpheres();
  }

  /** Compute final camera transform (writes camera). */
  updateCamera(camera, dt, baseFov) {
    const t = this.time;
    const shake = this.trauma * this.trauma;
    const sx = (Math.sin(t * 37) + Math.sin(t * 23.3)) * 0.5 * shake * 0.035;
    const sy = (Math.sin(t * 41.7) + Math.sin(t * 17.1)) * 0.5 * shake * 0.035;
    const sr = Math.sin(t * 29.3) * shake * 0.03;
    if (this.mount) {
      const obj = this.mount.object;
      obj.updateWorldMatrix(true, false);
      const p = this.mount.offset.clone();
      obj.localToWorld(p);
      obj.getWorldQuaternion(_q);
      // vehicles face +Z locally while the camera looks down -Z: rotate by PI
      _e.set(this.mountPitch + sy, Math.PI + this.mountYaw + sx, sr, 'YXZ');
      const local = new THREE.Quaternion().setFromEuler(_e);
      camera.position.copy(p);
      camera.quaternion.copy(_q).multiply(local);
      this.inside = true;
    } else {
      const ads = this.adsAmount;
      const bobK = this.bobAmount * (1 - ads * 0.8);
      const bobY = Math.abs(Math.sin(this.bobPhase)) * 0.045 * bobK - this.landDip;
      const bobX = Math.cos(this.bobPhase) * 0.03 * bobK;
      const rise = (1 - this.standUpT);
      const eye = this.pos.y + this.eyeHeight - rise * 0.6 + bobY;
      _right.set(Math.cos(this.yaw), 0, -Math.sin(this.yaw));
      camera.position.set(this.pos.x + _right.x * bobX, eye, this.pos.z + _right.z * bobX);
      _e.set(this.pitch + this.recoil.pitch + sy, this.yaw + this.recoil.yaw + sx, sr + Math.cos(this.bobPhase) * 0.004 * bobK, 'YXZ');
      camera.quaternion.setFromEuler(_e);
      this.inside = false;
    }
    const targetFov = baseFov * lerp(1, this.game.weapons?.current?.def.adsFov ?? 0.75, this.adsAmount) * (this.sprinting ? 1.06 : 1);
    camera.fov = damp(camera.fov, targetFov, 12, dt);
    camera.updateProjectionMatrix();
    this.camPos.copy(camera.position);
    this.camQuat.copy(camera.quaternion);
    this.forward.set(0, 0, -1).applyQuaternion(camera.quaternion);
  }
}
