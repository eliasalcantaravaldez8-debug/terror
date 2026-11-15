import * as THREE from 'three';
import { WEAPONS, WeaponState, newWeaponState } from '../weapons/WeaponData.js';
import { makeWeaponModel, makeGrenade } from '../weapons/WeaponModels.js';
import { Loadout } from '../weapons/Loadout.js';
import { solveTwoBone } from '../characters/IK.js';
import { clamp, lerp, damp, easeInOut } from '../utils/math.js';

const _v = new THREE.Vector3(), _v2 = new THREE.Vector3(), _dir = new THREE.Vector3();
const _q = new THREE.Quaternion(), _e = new THREE.Euler();
const DEG = Math.PI / 180;
const POUCH = new THREE.Vector3(-0.28, -0.52, -0.12); // vest magazine pouch, in camera space

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
    for (const id of Object.keys(WEAPONS)) this._buildModel(id);
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

    this.slots = this._startingSlots();
    this.currentIndex = 0;
    this.grenades = 3;
    this.burstLeft = 0;
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

  /** Build (or rebuild after an Arsenal change) the first-person model of a weapon. */
  _buildModel(id) {
    const old = this.models[id];
    if (old) { this.pivot.remove(old); old.traverse((o) => { if (o.isMesh && o.geometry && !o.geometry.parameters?.radiusTop) o.geometry.dispose?.(); }); }
    const m = makeWeaponModel(id, this.game.mats, 'high', Loadout.get(id));
    // face -Z (camera forward); mirrored on X so the right side of the weapon is on the right of the view
    m.rotation.y = Math.PI; m.scale.x = -1;
    m.visible = old ? old.visible : false;
    m.traverse((o) => { if (o.isMesh) { o.castShadow = false; o.frustumCulled = false; } });
    const u = m.userData;
    if (u.magazine) Object.assign(u.magazine.userData, { baseX: u.magazine.position.x, baseY: u.magazine.position.y, baseZ: u.magazine.position.z });
    for (const k of ['bolt', 'pump', 'slide', 'rbolt']) if (u[k]) u[k].userData.baseZ = u[k].position.z;
    this.models[id] = m;
    this.pivot.add(m);
    return m;
  }

  /** Re-read attachments after an Arsenal change: new models and updated stats for held weapons. */
  applyLoadoutChanges(ids = Object.keys(WEAPONS)) {
    for (const id of ids) this._buildModel(id);
    for (const s of this.slots) { s.def = Loadout.getDef(s.def.id); s.mag = Math.min(s.mag, s.def.magSize); }
    this.setVisibleModel();
    // compile the new camo/optic materials now, not on the first frame they are seen
    const pl = this.game.pipeline;
    try { for (const id of ids) this.models[id].visible = true; pl.renderer.compile(pl.vmScene, pl.vmCamera); } catch { /* compile is an optimisation only */ }
    this.setVisibleModel();
  }

  _startingSlots() {
    const d = Loadout.data;
    const pri = Loadout.getDef(d.primary), sec = Loadout.getDef(d.secondary);
    return [new WeaponState(pri), new WeaponState(sec, sec.magSize, sec.magSize * 3)];
  }

  serialize() { return { slots: this.slots.map((s) => s.serialize()), current: this.currentIndex, grenades: this.grenades }; }
  restore(data) {
    if (!data) return;
    if (data.slots?.length) this.slots = data.slots.map((s, i) => { const w = newWeaponState(s.id || (i === 0 ? 'vk7' : 'p11'), s.mag, s.reserve); w.modeIndex = s.mode || 0; return w; });
    this.currentIndex = Math.min(data.current || 0, this.slots.length - 1);
    this.grenades = data.grenades ?? 3;
    this.setVisibleModel();
  }
  resetLoadout() {
    this.slots = this._startingSlots();
    this.currentIndex = 0; this.grenades = 3; this.state = 'idle';
    this.setVisibleModel();
  }

  /** Disarmed down to the sidearm (Mission 7): a single slot until a long gun is picked up. */
  setSidearmOnly() {
    const sec = this.slots.find((s) => s.def.slot === 'secondary') || newWeaponState(Loadout.data.secondary);
    this.slots = [sec];
    this.currentIndex = 0; this.grenades = 0; this.state = 'idle'; this.burstLeft = 0;
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
    this.slideLocked = false;
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
    this.boltActT = (this.boltActT ?? 9) + dt;
    this.hammerT = (this.hammerT ?? 9) + dt;
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
      if (input.actionPressed('fireMode') && w.cycleMode()) { this.game.audio.playFoley('select'); this.burstLeft = 0; this.game.hud.toast('Modo de tiro: ' + ({ auto: 'automático', burst: 'rajada de 3', semi: 'semiautomático' })[w.mode], 1200); }
    }
    if (this.state === 'draw' && this.stateT > def.drawTime) this.state = 'idle';
    if (this.state === 'inspect' && (this.stateT > 2.4 || input.fireHeld() || input.aimHeld())) this.state = 'idle';
    if (canAct && input.actionPressed('inspect') && this.state === 'idle') this._startState('inspect');
    // weapon collision with walls in front of the player
    const cam0 = this.game.pipeline.camera;
    const fwd = _v2.set(0, 0, -1).applyQuaternion(cam0.quaternion);
    const wall = player.mount ? null : this.game.world.raycast(cam0.position, fwd, 0.85, (b) => b.tag !== 'bounds');
    this.tuck = damp(this.tuck || 0, wall ? clamp((0.85 - wall.t) / 0.4, 0, 1) : 0, 10, dt);
    // barrel smoke after a sustained burst
    if (!input.fireHeld() && (this._burstSmoke || 0) >= 5) { this._smokeT = 1.2; this._burstSmoke = 0; }
    if (!input.fireHeld() && (this._burstSmoke || 0) > 0) this._burstSmoke = 0;
    if (this._smokeT > 0) {
      this._smokeT -= dt;
      if (Math.random() < 0.5) {
        const mw = this._vmToWorld(this.models[def.id], this.models[def.id].userData.anchors.muzzle, new THREE.Vector3());
        this.game.effects.smoke.spawn({ x: mw.x, y: mw.y, z: mw.z, vy: 0.5, vx: (Math.random() - 0.5) * 0.1, life: 1.4, size: 0.03, endSize: 0.18, color: [0.85, 0.85, 0.85], alpha: 0.22, drag: 1.5, fadeIn: 0.2 });
      }
    }
    // magnified optics sway; hold breath (Shift) to steady the reticle for a few seconds
    const scopedNow = !!def.scope && this.adsT > 0.85;
    this.breath = this.breath ?? 1;
    const holding = scopedNow && input.action('sprint') && this.breath > 0 && !this.breathOut;
    if (holding) this.breath = Math.max(0, this.breath - dt / 4.5);
    else this.breath = Math.min(1, this.breath + dt / 3);
    if (this.breath <= 0) this.breathOut = 2;
    if (this.breathOut > 0) this.breathOut -= dt;
    if (scopedNow) {
      const amp = holding ? 0.12 : this.breathOut > 0 ? 2.2 : 1;
      const t = player.time;
      const sx = (Math.sin(t * 0.8) + Math.sin(t * 1.9) * 0.4) * 0.0035 * amp, sy = (Math.sin(t * 1.15 + 1) + Math.sin(t * 2.3) * 0.3) * 0.0028 * amp;
      player.yaw += sx - (this._swX || 0); player.pitch += sy - (this._swY || 0);
      this._swX = sx; this._swY = sy;
      if (!this._breathHint) { this._breathHint = true; this.game.hud.toast('Segure Shift para prender a respiração', 3000); }
    } else { this._swX = 0; this._swY = 0; }
    if (this.state === 'reload' && w.reloading <= 0) this.state = 'idle';
    if (this.state === 'grenade') this._updateGrenadeThrow();
    if (this.state === 'melee' && this.stateT > 0.5) this.state = 'idle';

    // ADS
    const wantAds = canAct && input.aimHeld() && this.state !== 'grenade' && !player.sprinting;
    this.adsT = damp(this.adsT, wantAds && this.state !== 'reload' ? 1 : 0, 1 / def.adsTime * 2.2, dt);
    player.adsAmount = this.adsT;

    // firing: auto / 3-round burst / semi, bolt-action needs the bolt cycled
    if (!input.fireHeld()) { this.triggerReleased = true; this.shotsInBurst = 0; }
    const mode = w.mode;
    const boltBusy = def.boltAction && (this.boltActT ?? 9) < def.fireInterval * 0.82;
    const firing = canAct && this.state === 'idle' && (this.tuck || 0) < 0.5 && !boltBusy &&
      (this.burstLeft > 0 || (input.fireHeld() && (mode === 'auto' || this.triggerReleased)));
    if (!canAct || this.state !== 'idle') this.burstLeft = 0;
    if (firing && player.sprinting) player.sprinting = false;
    if (firing) {
      if (w.mag <= 0) {
        this.burstLeft = 0;
        if (this.triggerReleased) { game.audio.playDryFire(); this.triggerReleased = false; }
        if (w.canReload()) { w.startReload(); this._startState('reload'); }
      } else if (w.fire()) {
        if (mode === 'burst') this.burstLeft = this.burstLeft > 0 ? this.burstLeft - 1 : (def.burst || 3) - 1;
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
    // muzzle & ejection port: viewmodel anchors converted to world space
    const model = this.models[def.id];
    const muzzleWorld = this._vmToWorld(model, model.userData.anchors.muzzle, _v);
    if (def.suppressed) {
      game.effects.smoke.spawn({ x: muzzleWorld.x, y: muzzleWorld.y, z: muzzleWorld.z, vy: 0.3, life: 0.6, size: 0.05, endSize: 0.25, color: [0.8, 0.8, 0.8], alpha: 0.18, drag: 2 });
    } else {
      game.effects.muzzleFlash(muzzleWorld, _dir, ({ pistol: def.revolver ? 1.1 : 0.7, smg: 0.6, shotgun: 1.6, dmr: 1.3, sniper: 1.8, lmg: 1.15 }[def.type] ?? 1.0) * (def.flashScale || 1));
      game.pipeline.vmFlash.intensity = 3;
    }
    this.boltT = 0;
    if (def.boltAction) { this.boltActT = 0; this.reloadStageFired.boltCycle = {}; }
    if (def.revolver) { this.cylTarget = (this.cylTarget || 0) + Math.PI / 3; this.hammerT = 0; }
    this._burstSmoke = (this._burstSmoke || 0) + 1;
    if (this.current.mag === 0 && def.type === 'pistol') this.slideLocked = true;
    if (this.shotsInBurst % 3 === 1 || def.type !== 'rifle') game.effects.tracer(muzzleWorld.clone(), hit.point.clone(), 420);
    // casing
    const right = _v2.set(1, 0, 0).applyQuaternion(cam.quaternion);
    const ej = this._vmToWorld(model, model.userData.anchors.ejection, new THREE.Vector3());
    if (!def.pump && !def.boltAction && !def.revolver) game.effects.casing(ej, right.multiplyScalar(2.5 + Math.random()).add(new THREE.Vector3(0, 2 + Math.random(), 0)).addScaledVector(_dir, -0.5).add(player.vel));
    game.audio.playShot(cam.position, def.sound, true);
    // recoil
    const k = this.adsT > 0.5 ? 0.7 : 1;
    player.recoil.pitch += def.recoilPitch * DEG * k * (0.8 + Math.random() * 0.4);
    player.pitch += def.recoilPitch * DEG * 0.45 * k;
    player.recoil.yaw += (Math.random() - 0.45) * def.recoilYaw * DEG * 2 * k;
    this.kick = Math.min(1.8, this.kick + (def.revolver ? 1.5 : { pistol: 0.9, shotgun: 1.6, dmr: 1.2, sniper: 1.8, lmg: 0.42, smg: 0.35 }[def.type] ?? 0.55));
    if (def.type === 'sniper') player.addTrauma(0.12);
    this.kickRot += (Math.random() - 0.5) * 0.6;
    player.addTrauma(0.04);
    game.events.emit('playerShot', { suppressed: !!def.suppressed, pos: player.pos.clone() });
  }

  /** Convert a point in a viewmodel weapon's local space to world space. */
  _vmToWorld(model, local, out) {
    const cam = this.game.pipeline.camera;
    out.copy(local); model.localToWorld(out); // -> view (camera) space, the vm camera sits at the origin
    return out.applyQuaternion(cam.quaternion).add(cam.position);
  }

  /** Throw the empty magazine out of the viewmodel into the world (it falls and bounces). */
  _dropMagazine(model) {
    const mag = model.userData.magazine;
    if (!mag) return;
    const p = this._vmToWorld(model, new THREE.Vector3(mag.position.x, mag.position.y - 0.08, mag.position.z), new THREE.Vector3());
    const cam = this.game.pipeline.camera;
    const v = new THREE.Vector3(0.4, -0.5, -0.3).applyQuaternion(cam.quaternion).add(this.game.player.vel);
    this.game.effects.dropMagazine?.(p, v);
  }

  /** Spent case out of the ejection port (bolt-action: when the bolt is drawn back). */
  _ejectCasing(model, speed = 1) {
    const cam = this.game.pipeline.camera;
    const right = new THREE.Vector3(1, 0, 0).applyQuaternion(cam.quaternion);
    const ej = this._vmToWorld(model, model.userData.anchors.ejection, new THREE.Vector3());
    this.game.effects.casing(ej, right.multiplyScalar((2 + Math.random()) * speed).add(new THREE.Vector3(0, 1.8, 0)).add(this.game.player.vel));
  }

  /** Revolver: six empty cases fall out of the swung-out cylinder. */
  _dumpRevolver(model) {
    const cyl = model.userData.cylinder;
    this.game.audio.playFoley('brass');
    for (let i = 0; i < 6; i++) {
      const a = i / 6 * Math.PI * 2;
      const p = new THREE.Vector3(Math.cos(a) * 0.013, Math.sin(a) * 0.013, -0.03); cyl.localToWorld(p);
      const cam = this.game.pipeline.camera;
      p.applyQuaternion(cam.quaternion).add(cam.position);
      this.game.effects.casing(p, new THREE.Vector3((Math.random() - 0.5) * 0.6, -1.2 - Math.random(), (Math.random() - 0.5) * 0.6).add(this.game.player.vel));
    }
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
      : def.type === 'smg' ? new THREE.Vector3(0.14, -0.15, -0.3) : def.bullpup ? new THREE.Vector3(0.13, -0.135, -0.42)
      : def.type === 'lmg' ? new THREE.Vector3(0.16, -0.17, -0.27) : new THREE.Vector3(0.15, -0.155, -0.26);
    const sight = anchors.sight;
    const adsPos = new THREE.Vector3(sight.x, -sight.y, -(def.type === 'pistol' ? 0.34 : anchors.eyeRelief ?? (def.bullpup ? 0.2 : 0.24)) + sight.z);
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
    // reload choreography: tilt -> mag out & drop -> hand to vest pouch -> new mag in -> (empty) bolt release
    let magOffset = 0, reloadHand = null, magHidden = false, magFromHand = 0, boltSlap = 0, crane = 0, coverOpen = 0;
    // bolt-action cycle after each shot: lift, pull back (eject), push forward, lock down
    let boltLift = 0, boltBack = 0;
    if (def.boltAction && this.boltActT < 1.2) {
      const t = this.boltActT, F = this.reloadStageFired.boltCycle || (this.reloadStageFired.boltCycle = {});
      const k1 = clamp((t - 0.22) / 0.11, 0, 1), k2 = clamp((t - 0.34) / 0.15, 0, 1), k3 = clamp((t - 0.6) / 0.15, 0, 1), k4 = clamp((t - 0.78) / 0.1, 0, 1);
      boltLift = easeInOut(k1) - easeInOut(k4); boltBack = easeInOut(k2) - easeInOut(k3);
      if (k1 > 0 && !F.a) { F.a = 1; this.game.audio.playFoley('boltUp'); }
      if (k2 > 0 && !F.b) { F.b = 1; this.game.audio.playFoley('boltBack'); }
      if (k2 >= 0.9 && !F.c) { F.c = 1; this._ejectCasing(model, 1.6); }
      if (k3 > 0 && !F.d) { F.d = 1; this.game.audio.playFoley('boltBack'); }
      if (k4 > 0 && !F.e) { F.e = 1; this.game.audio.playFoley('boltUp'); }
      const cyc = Math.max(boltLift, boltBack);
      rot.z -= 0.12 * cyc; rot.y += 0.05 * cyc; pos.y -= 0.01 * cyc;
    }
    if (this.state === 'reload') {
      const w = this.current;
      const p = clamp(1 - w.reloading / w.reloadTotal, 0, 1);
      const empty = w.reloadTotal === def.reloadEmptyTime;
      const env = Math.sin(clamp(p / 0.92, 0, 1) * Math.PI);
      const tilt = def.revolver ? 0.45 : 1;
      rot.z += 0.42 * env * tilt; rot.x += 0.08 * env; rot.y -= 0.12 * env * tilt; pos.y -= 0.02 * env; pos.x -= 0.04 * env;
      if (def.revolver) {
        // swing the cylinder out, muzzle up to dump the empties, speed loader in, close
        const open = clamp((p - 0.06) / 0.1, 0, 1) - clamp((p - 0.84) / 0.08, 0, 1);
        crane = open;
        const dump = Math.sin(clamp((p - 0.16) / 0.18, 0, 1) * Math.PI);
        const load = Math.sin(clamp((p - 0.5) / 0.3, 0, 1) * Math.PI);
        rot.x += 0.75 * dump - 0.25 * load; pos.y += 0.03 * dump;
        if (p > 0.3 && p < 0.52) reloadHand = 'pouch';
        else if (p >= 0.52 && p < 0.76) reloadHand = 'cyl';
        else if (p > 0.08 && p < 0.3) reloadHand = 'cyl';
        if (p > 0.07 && !this.reloadStageFired.open) { this.reloadStageFired.open = true; this.game.audio.playFoley('cylinder'); }
        if (p > 0.22 && !this.reloadStageFired.dump) { this.reloadStageFired.dump = true; this._dumpRevolver(model); }
        if (p > 0.72 && !this.reloadStageFired.in) { this.reloadStageFired.in = true; this.game.audio.playFoley('magIn'); }
        if (p > 0.86 && !this.reloadStageFired.close) { this.reloadStageFired.close = true; this.game.audio.playFoley('cylinder'); }
      } else if (!model.userData.magazine) {
        // tube-fed: thumb shells in one by one
        const cyc = (p * 6) % 1;
        reloadHand = cyc < 0.5 ? 'pouch' : 'port';
        if (cyc > 0.85 && !this.reloadStageFired['s' + Math.floor(p * 6)]) { this.reloadStageFired['s' + Math.floor(p * 6)] = true; this.game.audio.playFoley('magIn'); }
      } else {
        if (model.userData.cover) {
          // LMG: turned to show its left side; lift the feed cover, swap the ammo box, lay the belt, close the cover
          pos.x += 0.05 * env; pos.y -= 0.07 * env; rot.y -= 0.3 * env; rot.x -= 0.12 * env;
          coverOpen = clamp((p - 0.04) / 0.07, 0, 1) - clamp((p - 0.82) / 0.06, 0, 1);
          if (p > 0.05 && !this.reloadStageFired.cOpen) { this.reloadStageFired.cOpen = true; this.game.audio.playFoley('cover'); }
          if (p > 0.84 && !this.reloadStageFired.cClose) { this.reloadStageFired.cClose = true; this.game.audio.playFoley('cover'); }
          if (p > 0.74 && p < 0.84) reloadHand = 'port';
        }
        if (p > 0.12 && p < 0.3) magOffset = ((p - 0.12) / 0.18) * 0.12;
        if (p >= 0.3 && p < 0.52) { magHidden = true; reloadHand = 'pouch'; }
        if (p >= 0.52 && p < 0.7) { reloadHand = 'mag'; magFromHand = (p - 0.52) / 0.18; }
        if (p >= 0.7 && p < 0.78) magOffset = (1 - (p - 0.7) / 0.08) * 0.05;
        if (empty && p > 0.8 && p < 0.93) { reloadHand = 'bolt'; boltSlap = Math.sin(((p - 0.8) / 0.13) * Math.PI); }
        if (p > 0.18 && !this.reloadStageFired.out) { this.reloadStageFired.out = true; this.game.audio.playFoley('magOut'); }
        if (p > 0.3 && !this.reloadStageFired.drop) { this.reloadStageFired.drop = true; this._dropMagazine(model); }
        if (p > 0.73 && !this.reloadStageFired.in) { this.reloadStageFired.in = true; this.game.audio.playFoley('magIn'); }
        if (empty && p > 0.86 && !this.reloadStageFired.bolt) { this.reloadStageFired.bolt = true; this.game.audio.playFoley('bolt'); this.slideLocked = false; }
      }
      pos.y -= boltSlap * 0.012; rot.z -= boltSlap * 0.08;
    }
    // inspect: turn the weapon to show its left side, then the top
    if (this.state === 'inspect') {
      const k = clamp(this.stateT / 2.4, 0, 1);
      const a = Math.sin(Math.min(1, k * 1.6) * Math.PI * 0.5) * (1 - clamp((k - 0.8) / 0.2, 0, 1));
      const b = Math.sin(clamp((k - 0.45) / 0.35, 0, 1) * Math.PI);
      pos.x -= 0.1 * a; pos.y += 0.04 * a; pos.z += 0.06 * a;
      rot.y += 0.95 * a; rot.z -= 0.35 * a - 0.6 * b; rot.x += 0.15 * b;
    }
    // close to a wall: tuck the weapon up and back (cannot fire)
    pos.y += 0.05 * this.tuck; pos.z += 0.12 * this.tuck; pos.x -= 0.03 * this.tuck;
    rot.x += 0.95 * this.tuck; rot.y += 0.25 * this.tuck;
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
    if (mag) {
      mag.visible = !magHidden;
      mag.position.set(mag.userData.baseX ?? 0, mag.userData.baseY - magOffset, mag.userData.baseZ ?? mag.position.z);
      if (magFromHand > 0) {
        // fresh magazine travels from the vest up into the magwell
        const pouchLocal = model.worldToLocal(_v2.copy(POUCH));
        const k = easeInOut(magFromHand);
        mag.position.x = pouchLocal.x + (mag.userData.baseX - pouchLocal.x) * k;
        mag.position.y = pouchLocal.y + (mag.userData.baseY - 0.05 - pouchLocal.y) * k;
        mag.position.z = pouchLocal.z + (mag.userData.baseZ - pouchLocal.z) * k;
      }
    }
    // bolt carrier / slide cycle on every shot, slide locks back on an empty pistol
    this.boltT = Math.min(1, (this.boltT ?? 1) + dt / 0.06);
    const cycle = Math.sin(this.boltT * Math.PI);
    if (model.userData.bolt) model.userData.bolt.position.z = model.userData.bolt.userData.baseZ - cycle * 0.045;
    if (model.userData.slide) model.userData.slide.position.z = model.userData.slide.userData.baseZ - (this.slideLocked && def.type === 'pistol' ? 0.045 : cycle * 0.04);
    // manual bolt / revolver cylinder & hammer / LMG feed cover
    const ud = model.userData;
    if (ud.rbolt) { ud.rbolt.rotation.z = boltLift * 1.25; ud.rbolt.position.z = ud.rbolt.userData.baseZ - boltBack * 0.085; }
    if (ud.cylinder) {
      this.cylAngle = damp(this.cylAngle || 0, this.cylTarget || 0, 22, dt);
      ud.cylinder.rotation.z = this.cylAngle;
      ud.crane.rotation.z = easeInOut(crane) * 1.25;
      ud.hammer.rotation.x = -0.6 * clamp(this.hammerT / 0.28, 0, 1);
    }
    if (ud.cover) ud.cover.rotation.x = -easeInOut(coverOpen) * 1.2;
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
    if (ud.rbolt && (boltLift > 0.02 || boltBack > 0.02)) {
      // right hand leaves the grip to work the bolt handle
      const k = clamp(Math.max(boltLift, boltBack) * 3, 0, 1);
      const h = _v2.set(0.05, -0.008, -0.03); ud.rbolt.localToWorld(h);
      rearW.lerp(h, k);
    }
    solveTwoBone(this.arms.R.upper, this.arms.R.lower, 0.34, 0.36, rearW, _v2.set(0.6, -0.6, 0.3));
    let frontW;
    if (gThrow && this.stateT < 0.6) {
      frontW = this.grenadeModel.position.clone();
    } else if (reloadHand === 'pouch') {
      frontW = _v.copy(POUCH);
    } else if (reloadHand === 'mag' && mag) {
      frontW = _v.set(0, -0.08, 0); mag.localToWorld(frontW);
    } else if (reloadHand === 'cyl' && ud.cylinder) {
      frontW = _v.set(0, 0, -0.03); ud.cylinder.localToWorld(frontW);
    } else if (reloadHand === 'port') {
      frontW = _v.copy(anchors.ejection); model.localToWorld(frontW); frontW.y -= 0.03;
    } else if (reloadHand === 'bolt') {
      frontW = _v.copy(anchors.ejection); model.localToWorld(frontW);
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
