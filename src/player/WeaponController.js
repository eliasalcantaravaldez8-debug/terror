import * as THREE from 'three';
import { WEAPONS, WeaponState, newWeaponState } from '../weapons/WeaponData.js';
import { makeWeaponModel, makeGrenade } from '../weapons/WeaponModels.js';
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

    this.models = {};
    for (const id of Object.keys(WEAPONS)) this.models[id] = makeWeaponModel(id, mats, 'high');
    for (const k of Object.keys(this.models)) {
      const m = this.models[k];
      m.rotation.y = Math.PI; // face -Z (camera forward)
      m.visible = false;
      m.traverse((o) => { if (o.isMesh) { o.castShadow = false; o.frustumCulled = false; } });
      if (m.userData.magazine) m.userData.magazine.userData.baseY = m.userData.magazine.position.y;
      if (m.userData.pump) m.userData.pump.userData.baseZ = m.userData.pump.position.z;
      if (m.userData.slide) m.userData.slide.userData.baseZ = m.userData.slide.position.z;
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
    data.slots?.forEach((s, i) => { this.slots[i] = newWeaponState(s.id || (i === 0 ? 'vk7' : 'p11'), s.mag, s.reserve); });
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

  /** Swap the primary weapon for a picked-up one. Returns the dropped weapon's state. */
  swapPrimary(id, mag, reserve) {
    const old = this.slots[0];
    this.slots[0] = newWeaponState(id, mag, reserve);
    old.cancelReload();
    this.currentIndex = 0;
    this.setVisibleModel();
    this._startState('draw');
    return old;
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
      if (input.actionPressed('melee') && (this.state === 'idle' || this.state === 'reload')) { w.cancelReload(); this._melee(); }
    }
    if (this.state === 'draw' && this.stateT > def.drawTime) this.state = 'idle';
    if (this.state === 'reload' && w.reloading <= 0) this.state = 'idle';
    if (this.state === 'grenade') this._updateGrenadeThrow();
    if (this.state === 'melee' && this.stateT > 0.5) this.state = 'idle';

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
    const origin = cam.position.clone();
    const pellets = def.pellets || 1;
    let hit = null;
    for (let i = 0; i < pellets; i++) {
      // spread cone (shotguns use a fixed pattern spread, others the dynamic crosshair spread)
      const spread = (pellets > 1 ? lerp(def.spreadHip, def.spreadAds, this.adsT) : this.spreadNow) * DEG * 0.5;
      const r = Math.sqrt(Math.random()) * spread, a = Math.random() * Math.PI * 2;
      _dir.set(Math.cos(a) * Math.tan(r), Math.sin(a) * Math.tan(r), -1).normalize().applyQuaternion(cam.quaternion);
      const h = game.combat.fireHitscan(player, origin, _dir.clone(), def, { quiet: i > 0 });
      if (!hit) hit = h;
    }
    if (pellets > 1) player.shotsFired += 0; // counted once per trigger pull
    this.pumpT = def.pump ? 0 : -1;
    // muzzle world position (approx. from viewmodel offset)
    const muzzleWorld = _v.set(0.11 * (1 - this.adsT), -0.09 * (1 - this.adsT) - 0.03, -0.75).applyQuaternion(cam.quaternion).add(cam.position);
    game.effects.muzzleFlash(muzzleWorld, _dir, def.type === 'pistol' || def.type === 'smg' ? 0.7 : def.type === 'shotgun' ? 1.5 : 1.0);
    game.pipeline.vmFlash.intensity = 3;
    if (this.shotsInBurst % 3 === 1 || def.type !== 'rifle') game.effects.tracer(muzzleWorld.clone(), hit.point.clone(), 420);
    // casing
    const right = _v2.set(1, 0, 0).applyQuaternion(cam.quaternion);
    const ej = muzzleWorld.clone().addScaledVector(_dir, -0.5);
    if (!def.pump) game.effects.casing(ej, right.multiplyScalar(2.5 + Math.random()).add(new THREE.Vector3(0, 2 + Math.random(), 0)).add(player.vel));
    game.audio.playShot(cam.position, def.sound, true);
    // recoil
    const k = this.adsT > 0.5 ? 0.7 : 1;
    player.recoil.pitch += def.recoilPitch * DEG * k * (0.8 + Math.random() * 0.4);
    player.pitch += def.recoilPitch * DEG * 0.45 * k;
    player.recoil.yaw += (Math.random() - 0.45) * def.recoilYaw * DEG * 2 * k;
    this.kick = Math.min(1.8, this.kick + ({ pistol: 0.9, shotgun: 1.6, dmr: 1.2, smg: 0.35 }[def.type] ?? 0.55));
    this.kickRot += (Math.random() - 0.5) * 0.6;
    player.addTrauma(0.04);
    game.events.emit('playerShot', {});
  }

  /** Rifle-butt strike: instant takedown of a hostile within arm's reach in front of the player. */
  _melee() {
    const game = this.game, p = game.player;
    this._startState('melee');
    game.audio._burst?.(game.audio.sfx, { dur: 0.18, type: 'bandpass', freq: 900, q: 0.8, gain: 0.35, freqEnd: 300 });
    const eye = p.getEye(new THREE.Vector3());
    let best = null, bestD = 3.0; // short lunge range
    for (const a of game.actors) {
      if (a.team !== 'enemy' || !a.alive || !a.model.root.visible) continue;
      const c = a.getAimPoint(new THREE.Vector3());
      const d = Math.hypot(c.x - eye.x, c.z - eye.z);
      if (d > bestD || Math.abs(c.y - eye.y) > 1.4) continue;
      const dir = new THREE.Vector3(c.x - eye.x, 0, c.z - eye.z).normalize();
      const f = new THREE.Vector3(p.forward.x, 0, p.forward.z).normalize();
      if (dir.dot(f) < 0.55) continue;
      best = a; bestD = d;
    }
    if (!best) return;
    const c = best.getAimPoint(new THREE.Vector3());
    const dir = new THREE.Vector3().subVectors(c, eye).normalize();
    best.takeDamage(999, eye, { zone: 'chest', dir, shooter: p, melee: true });
    p.kills++;
    game.effects.bloodHit(c, dir);
    game.audio.playImpact(c, 'flesh');
    game.audio.playHitmarker(true);
    game.events.emit('hitmarker', { kill: true });
    game.hud.feed('ABATE CORPO A CORPO');
    p.addTrauma(0.35);
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
    const hip = def.type === 'pistol' ? new THREE.Vector3(0.14, -0.15, -0.36)
      : def.type === 'smg' ? new THREE.Vector3(0.14, -0.15, -0.3) : new THREE.Vector3(0.15, -0.155, -0.26);
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
    // melee strike: shove the rifle forward and across
    if (this.state === 'melee') {
      const k = clamp(this.stateT / 0.42, 0, 1);
      const env = Math.sin(k * Math.PI) * (k < 0.35 ? k / 0.35 : 1);
      pos.z -= 0.2 * env; pos.x -= 0.12 * env; pos.y += 0.05 * env;
      rot.z += 0.9 * env; rot.y += 0.6 * env; rot.x += 0.15 * env;
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
    if (mag) mag.position.y = mag.userData.baseY - magOffset;
    if (model.userData.slide) model.userData.slide.position.z = model.userData.slide.userData.baseZ - this.kick * 0.03;
    // pump-action cycle after each shot
    const pump = model.userData.pump;
    if (pump) {
      let pz = 0;
      if (this.pumpT >= 0) {
        this.pumpT += dt;
        const k = clamp((this.pumpT - 0.18) / 0.45, 0, 1);
        pz = Math.sin(k * Math.PI) * 0.08;
        if (k > 0 && !this._pumpSnd) { this._pumpSnd = true; this.game.audio.playFoley('bolt'); }
        if (k >= 1) { this.pumpT = -1; this._pumpSnd = false; }
      }
      pump.position.z = pump.userData.baseZ - pz;
    }
    // magnified scope: hide the viewmodel and show the scope overlay when fully aimed
    const scoped = !!def.scope && this.adsT > 0.85 && this.state !== 'reload';
    this.game.hud.setScope?.(scoped);
    this.scoped = scoped;

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
    } else if (this.state === 'reload' && magOffset > 0.02 && mag) {
      frontW = _v.copy(mag.position); mag.parent.localToWorld(frontW);
      frontW.y -= 0.02;
    } else {
      if (pump) { frontW = _v.set(0, -0.035, 0); pump.localToWorld(frontW); }
      else { frontW = _v.copy(anchors.gripFront); model.localToWorld(frontW); }
    }
    solveTwoBone(this.arms.L.upper, this.arms.L.lower, 0.34, 0.36, frontW, _v2.set(-0.7, -0.6, 0.1));
    const showArms = low < 0.98 && !scoped;
    this.vm.visible = showArms;
    // left hand rides the pump
    if (pump && this.pumpT >= 0) { /* IK target already follows gripFront on the model */ }

    // muzzle light decay
    const pl = this.game.pipeline.vmFlash;
    pl.intensity = Math.max(0, pl.intensity - dt * 40);
  }
}
