import * as THREE from 'three';
import { WEAPONS, WeaponState } from '../weapons/WeaponData.js';
import { makeRifle, makePistol, makeGrenade } from '../weapons/WeaponModels.js';
import { solveTwoBone } from '../characters/IK.js';
import { clamp, lerp, damp, easeInOut } from '../utils/math.js';

const _v = new THREE.Vector3(), _v2 = new THREE.Vector3(), _dir = new THREE.Vector3();
const _q = new THREE.Quaternion(), _e = new THREE.Euler();
const DEG = Math.PI / 180;

/**
 * Player weapons: first-person viewmodel (arms + weapon) with procedural
 * animation (sway, bob, sprint, ADS, recoil, reload, draw), firing, grenades.
 */
export class WeaponController {
  constructor(game) {
    this.game = game;
    const mats = game.mats;
    this.vm = new THREE.Group();
    game.pipeline.vmScene.add(this.vm);
    this.pivot = new THREE.Group();
    this.vm.add(this.pivot);

    this.models = {
      vk7: makeRifle(mats, 'high'),
      p11: makePistol(mats),
    };
    for (const k of Object.keys(this.models)) {
      const m = this.models[k];
      m.rotation.y = Math.PI; // face -Z (camera forward)
      m.visible = false;
      m.traverse((o) => { if (o.isMesh) { o.castShadow = false; o.frustumCulled = false; } });
      this.pivot.add(m);
    }
    this.grenadeModel = makeGrenade(mats);
    this.grenadeModel.visible = false;
    this.vm.add(this.grenadeModel);

    // arms
    this.arms = {};
    const sleeve = mats.camoAlly(), glove = mats.glove();
    for (const side of ['L', 'R']) {
      const sh = new THREE.Group();
      sh.position.set(side === 'L' ? -0.17 : 0.24, -0.3, side === 'L' ? 0.02 : 0.1);
      this.vm.add(sh);
      const upper = new THREE.Group(); sh.add(upper);
      const um = new THREE.Mesh(new THREE.CapsuleGeometry(0.052, 0.26, 4, 10), sleeve); um.position.y = -0.17; upper.add(um);
      const lower = new THREE.Group(); lower.position.y = -0.34; upper.add(lower);
      const lm = new THREE.Mesh(new THREE.CapsuleGeometry(0.045, 0.24, 4, 10), sleeve); lm.position.y = -0.15; lower.add(lm);
      const cuff = new THREE.Mesh(new THREE.CylinderGeometry(0.046, 0.046, 0.05, 10), mats.vestAlly()); cuff.position.y = -0.29; lower.add(cuff);
      const hand = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.1, 0.045), glove); hand.position.y = -0.35; lower.add(hand);
      for (let f = 0; f < 4; f++) {
        const fm = new THREE.Mesh(new THREE.CapsuleGeometry(0.009, 0.04, 2, 6), glove);
        fm.position.set(-0.027 + f * 0.018, -0.41, 0.012); lower.add(fm);
      }
      [um, lm, cuff, hand].forEach((m) => (m.frustumCulled = false));
      this.arms[side] = { sh, upper, lower };
    }

    this.slots = [new WeaponState(WEAPONS.vk7), new WeaponState(WEAPONS.p11, 15, 45)];
    this.currentIndex = 0;
    this.grenades = 3;
    this.state = 'idle'; // idle | draw | reload | holster | grenade | lowered
    this.stateT = 0;
    this.drawT = 1;
    this.lowered = 1; // 1 = fully lowered (in helicopter)
    this.wantLowered = true;
    this.kick = 0; this.kickRot = 0;
    this.sway = new THREE.Vector2();
    this.swayVel = new THREE.Vector2();
    this.reloadStageFired = {};
    this.spreadNow = 2;
    this.triggerReleased = true;
    this.shotsInBurst = 0;
    this.adsT = 0;
    this.enabled = true;
    this.setVisibleModel();
  }

  get current() { return this.slots[this.currentIndex]; }

  serialize() { return { slots: this.slots.map((s) => s.serialize()), current: this.currentIndex, grenades: this.grenades }; }
  restore(data) {
    if (!data) return;
    data.slots?.forEach((s, i) => { if (this.slots[i]) { this.slots[i].mag = s.mag; this.slots[i].reserve = s.reserve; } });
    this.currentIndex = data.current || 0;
    this.grenades = data.grenades ?? 3;
    this.setVisibleModel();
  }
  resetLoadout() {
    this.slots = [new WeaponState(WEAPONS.vk7), new WeaponState(WEAPONS.p11, 15, 45)];
    this.currentIndex = 0; this.grenades = 3; this.state = 'idle';
    this.setVisibleModel();
  }

  setVisibleModel() {
    for (const k of Object.keys(this.models)) this.models[k].visible = k === this.current.def.id;
  }

  setLowered(v) { this.wantLowered = v; if (!v && this.lowered > 0.5) this._startState('draw'); }

  _startState(s) {
    this.state = s; this.stateT = 0; this.reloadStageFired = {};
    if (s === 'draw') this.game.audio.playFoley('draw');
  }

  switchTo(i) {
    if (i === this.currentIndex || !this.slots[i] || this.state === 'grenade') return;
    this.current.cancelReload();
    this.currentIndex = i;
    this.setVisibleModel();
    this._startState('draw');
  }

  refillAmmo() {
    for (const s of this.slots) s.refill();
    this.grenades = 3;
    this.game.audio.playFoley('ammo');
  }

  update(dt, input) {
    const game = this.game, player = game.player;
    const w = this.current, def = w.def;
    this.stateT += dt;
    if (w.update(dt)) this.state = 'idle';

    this.lowered = damp(this.lowered, this.wantLowered ? 1 : 0, 5, dt);
    const canAct = this.enabled && !this.wantLowered && player.alive && !player.mount && this.lowered < 0.3;

    if (canAct) {
      if (input.actionPressed('weapon1')) this.switchTo(0);
      if (input.actionPressed('weapon2')) this.switchTo(1);
      if (input.actionPressed('swap') || input.wheel !== 0) this.switchTo(this.currentIndex === 0 ? 1 : 0);
      if (input.actionPressed('reload') && w.canReload() && this.state === 'idle') { w.startReload(); this._startState('reload'); }
      if (input.actionPressed('grenade') && this.grenades > 0 && this.state === 'idle') { w.cancelReload(); this._startState('grenade'); }
    }
    if (this.state === 'draw' && this.stateT > def.drawTime) this.state = 'idle';
    if (this.state === 'reload' && w.reloading <= 0) this.state = 'idle';
    if (this.state === 'grenade') this._updateGrenadeThrow();

    // ADS
    const wantAds = canAct && input.aimHeld() && this.state !== 'grenade' && !player.sprinting;
    this.adsT = damp(this.adsT, wantAds && this.state !== 'reload' ? 1 : 0, 1 / def.adsTime * 2.2, dt);
    player.adsAmount = this.adsT;

    // firing
    if (!input.fireHeld()) { this.triggerReleased = true; this.shotsInBurst = 0; }
    const firing = canAct && input.fireHeld() && this.state === 'idle' && (def.auto || this.triggerReleased);
    if (firing && player.sprinting) player.sprinting = false;
    if (firing) {
      if (w.mag <= 0) {
        if (this.triggerReleased) { game.audio.playDryFire(); this.triggerReleased = false; }
        if (w.canReload()) { w.startReload(); this._startState('reload'); }
      } else if (w.fire()) {
        this.triggerReleased = false;
        this._shoot(def);
        if (w.mag === 0 && w.canReload()) { /* auto-reload after short delay */ this._autoReload = 0.35; }
      }
    }
    if (this._autoReload > 0) {
      this._autoReload -= dt;
      if (this._autoReload <= 0 && w.canReload() && this.state === 'idle') { w.startReload(); this._startState('reload'); }
    }

    // spread for crosshair
    const moveK = clamp(Math.hypot(player.vel.x, player.vel.z) / 4, 0, 1.5);
    const base = lerp(def.spreadHip, def.spreadAds, this.adsT);
    this.spreadNow = damp(this.spreadNow, base + moveK * def.spreadMove * (1 - this.adsT * 0.85) + (player.crouched ? -0.5 : 0) + this.kick * 3, 14, dt);
    this.spreadNow = Math.max(def.spreadAds, this.spreadNow);

    this._animate(dt, input);
  }

  _shoot(def) {
    const game = this.game, player = game.player;
    player.shotsFired++;
    this.shotsInBurst++;
    const cam = game.pipeline.camera;
    // spread cone
    const spread = this.spreadNow * DEG * 0.5;
    const r = Math.sqrt(Math.random()) * spread, a = Math.random() * Math.PI * 2;
    _dir.set(Math.cos(a) * Math.tan(r), Math.sin(a) * Math.tan(r), -1).normalize().applyQuaternion(cam.quaternion);
    const origin = cam.position.clone();
    const hit = game.combat.fireHitscan(player, origin, _dir.clone(), def);
    // muzzle world position (approx. from viewmodel offset)
    const muzzleWorld = _v.set(0.11 * (1 - this.adsT), -0.09 * (1 - this.adsT) - 0.03, -0.75).applyQuaternion(cam.quaternion).add(cam.position);
    game.effects.muzzleFlash(muzzleWorld, _dir, def.type === 'pistol' ? 0.7 : 1.0);
    game.pipeline.vmFlash.intensity = 3;
    if (this.shotsInBurst % 3 === 1 || def.type === 'pistol') game.effects.tracer(muzzleWorld.clone(), hit.point.clone(), 420);
    // casing
    const right = _v2.set(1, 0, 0).applyQuaternion(cam.quaternion);
    const ej = muzzleWorld.clone().addScaledVector(_dir, -0.5);
    game.effects.casing(ej, right.multiplyScalar(2.5 + Math.random()).add(new THREE.Vector3(0, 2 + Math.random(), 0)).add(player.vel));
    game.audio.playShot(cam.position, def.sound, true);
    // recoil
    const k = this.adsT > 0.5 ? 0.7 : 1;
    player.recoil.pitch += def.recoilPitch * DEG * k * (0.8 + Math.random() * 0.4);
    player.pitch += def.recoilPitch * DEG * 0.45 * k;
    player.recoil.yaw += (Math.random() - 0.45) * def.recoilYaw * DEG * 2 * k;
    this.kick = Math.min(1.5, this.kick + (def.type === 'pistol' ? 0.9 : 0.55));
    this.kickRot += (Math.random() - 0.5) * 0.6;
    player.addTrauma(0.04);
    game.events.emit('playerShot', {});
  }

  _updateGrenadeThrow() {
    const t = this.stateT;
    if (t > 0.1 && !this.reloadStageFired.pin) { this.reloadStageFired.pin = true; this.game.audio.playFoley('pin'); }
    if (t > 0.55 && !this.reloadStageFired.throw) {
      this.reloadStageFired.throw = true;
      this.grenades--;
      const cam = this.game.pipeline.camera;
      const dir = new THREE.Vector3(0, 0.15, -1).normalize().applyQuaternion(cam.quaternion);
      const pos = cam.position.clone().addScaledVector(dir, 0.6).add(new THREE.Vector3(0, -0.1, 0));
      const vel = dir.multiplyScalar(17).add(this.game.player.vel.clone().multiplyScalar(0.5));
      vel.y += 2.5;
      this.game.combat.throwGrenade(this.game.player, pos, vel);
    }
    if (t > 0.95) { this.state = 'draw'; this.stateT = this.current.def.drawTime * 0.5; }
  }

  _animate(dt, input) {
    const player = this.game.player;
    const def = this.current.def;
    const model = this.models[def.id];
    const anchors = model.userData.anchors;
    const ads = easeInOut(clamp(this.adsT, 0, 1));
    this.kick = damp(this.kick, 0, 14, dt);
    this.kickRot = damp(this.kickRot, 0, 10, dt);

    // mouse sway (lags behind look)
    const md = { x: input.mouseDX, y: input.mouseDY };
    this.swayVel.x = damp(this.swayVel.x, -md.x * 0.0009, 10, dt);
    this.swayVel.y = damp(this.swayVel.y, md.y * 0.0009, 10, dt);
    this.sway.x = damp(this.sway.x, this.swayVel.x, 8, dt);
    this.sway.y = damp(this.sway.y, this.swayVel.y, 8, dt);
    const swayK = 1 - ads * 0.85;

    // positions
    const hip = def.type === 'pistol' ? new THREE.Vector3(0.14, -0.15, -0.36) : new THREE.Vector3(0.15, -0.155, -0.26);
    const sight = anchors.sight;
    const adsPos = new THREE.Vector3(sight.x, -sight.y, -(def.type === 'pistol' ? 0.34 : 0.24) + sight.z);
    const pos = hip.lerp(adsPos, ads);
    const rot = new THREE.Euler(0, 0, 0);
    // bob
    const bob = player.bobAmount * (1 - ads * 0.9);
    pos.x += Math.cos(player.bobPhase) * 0.012 * bob;
    pos.y += -Math.abs(Math.sin(player.bobPhase)) * 0.016 * bob;
    // idle breathing
    const t = player.time;
    pos.y += Math.sin(t * 1.6) * 0.0025 * (1 - ads * 0.7);
    pos.x += Math.sin(t * 0.8) * 0.0015 * (1 - ads * 0.7);
    // sprint pose
    this._sprint = damp(this._sprint || 0, player.sprinting ? 1 : 0, 8, dt);
    const sp = this._sprint;
    pos.x += -0.05 * sp; pos.y += -0.05 * sp; pos.z += 0.03 * sp;
    rot.y += 0.55 * sp; rot.x += -0.25 * sp; rot.z += 0.25 * sp;
    pos.y += Math.sin(player.bobPhase * 2) * 0.01 * sp;
    // crouch tilt
    this._crouch = damp(this._crouch || 0, player.crouched ? 1 : 0, 6, dt);
    rot.z += 0.05 * this._crouch * (1 - ads);
    // sway
    pos.x += this.sway.x * swayK; pos.y += this.sway.y * swayK;
    rot.y += this.sway.x * 2 * swayK; rot.x += this.sway.y * 2 * swayK;
    // recoil kick
    pos.z += this.kick * (def.type === 'pistol' ? 0.035 : 0.045) * (1 - ads * 0.4);
    rot.x += this.kick * 0.06 * (1 - ads * 0.5);
    rot.z += this.kickRot * 0.03;
    // reload
    let magOffset = 0;
    if (this.state === 'reload') {
      const w = this.current;
      const p = 1 - w.reloading / w.reloadTotal;
      const env = Math.sin(clamp(p, 0, 1) * Math.PI);
      rot.z += 0.55 * env; rot.x += 0.25 * env; pos.y -= 0.05 * env; pos.x -= 0.03 * env;
      if (p > 0.15 && p < 0.7) magOffset = Math.sin(clamp((p - 0.15) / 0.55, 0, 1) * Math.PI) * 0.25;
      if (p > 0.22 && !this.reloadStageFired.out) { this.reloadStageFired.out = true; this.game.audio.playFoley('magOut'); }
      if (p > 0.62 && !this.reloadStageFired.in) { this.reloadStageFired.in = true; this.game.audio.playFoley('magIn'); }
      if (w.reloadTotal === def.reloadEmptyTime && p > 0.84 && !this.reloadStageFired.bolt) { this.reloadStageFired.bolt = true; this.game.audio.playFoley('bolt'); }
    }
    // draw
    let low = this.lowered;
    if (this.state === 'draw') low = Math.max(low, 1 - clamp(this.stateT / def.drawTime, 0, 1));
    if (this.state === 'grenade') {
      const g = this.stateT;
      low = Math.max(low, clamp(g / 0.2, 0, 1) * (g < 0.8 ? 1 : 1 - (g - 0.8) / 0.15));
    }
    low = easeInOut(clamp(low, 0, 1));
    pos.y -= 0.32 * low; rot.x -= 0.7 * low; pos.x += 0.05 * low;

    this.pivot.position.copy(pos);
    this.pivot.rotation.copy(rot);
    const mag = model.userData.magazine;
    if (mag) mag.position.y = (def.type === 'pistol' ? 0 : -0.01) - magOffset;
    if (model.userData.slide) model.userData.slide.position.z = 0.04 - this.kick * 0.03;

    // grenade in left hand during throw
    const gThrow = this.state === 'grenade';
    this.grenadeModel.visible = gThrow && this.stateT < 0.55;
    if (gThrow) {
      const g = this.stateT;
      const up = clamp(g / 0.3, 0, 1);
      this.grenadeModel.position.set(-0.12 + up * 0.05, -0.25 + up * 0.15, -0.35 - Math.max(0, g - 0.4) * 1.5);
    }

    // arms IK onto grips
    this.vm.updateMatrixWorld(true);
    const rearW = _v.copy(anchors.gripRear); model.localToWorld(rearW);
    solveTwoBone(this.arms.R.upper, this.arms.R.lower, 0.34, 0.36, rearW, _v2.set(0.6, -0.6, 0.3));
    let frontW;
    if (gThrow && this.stateT < 0.6) {
      frontW = this.grenadeModel.position.clone();
    } else if (this.state === 'reload' && magOffset > 0.02) {
      frontW = _v.copy(mag.position); mag.parent.localToWorld(frontW);
      frontW.y -= 0.02;
    } else {
      frontW = _v.copy(anchors.gripFront); model.localToWorld(frontW);
    }
    solveTwoBone(this.arms.L.upper, this.arms.L.lower, 0.34, 0.36, frontW, _v2.set(-0.7, -0.6, 0.1));
    const showArms = low < 0.98;
    this.vm.visible = showArms;

    // muzzle light decay
    const pl = this.game.pipeline.vmFlash;
    pl.intensity = Math.max(0, pl.intensity - dt * 40);
  }
}
