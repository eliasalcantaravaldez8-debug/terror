import * as THREE from 'three';
import { clamp, damp } from '../utils/math.js';

const _o = new THREE.Vector3(), _d = new THREE.Vector3(), _p = new THREE.Vector3();
const DEG = Math.PI / 180;

/** Door minigun stats (fictional "M-6 Ventania"). */
const GUN = { damage: 55, range: 700, headMultiplier: 1.5, falloffStart: 200, falloffEnd: 700, minDamageScale: 0.7, fireInterval: 1 / 28, spread: 0.7, heatRate: 0.16, spinUp: 3.5 };
/** Truck-mounted heavy machine gun (fictional "K-12 Bigorna"): slower, harder hitting, no spin-up. */
const HMG = { damage: 95, range: 800, headMultiplier: 1.6, falloffStart: 250, falloffEnd: 800, minDamageScale: 0.75, fireInterval: 1 / 9.5, spread: 0.45, heatRate: 0.1, spinUp: 40 };

/**
 * Helicopter door gunner: a pintle-mounted rotary gun shown in the viewmodel layer.
 * Spin-up, heat/overheat, hits on soldiers, vehicles and the terrain heightfield.
 */
export class DoorGunner {
  constructor(game, { heightAt = null, style = 'minigun' } = {}) {
    this.game = game;
    this.heightAt = heightAt;
    this.style = style;
    this.gun = style === 'hmg' ? HMG : GUN;
    this.active = false;
    this.spin = 0; this.heat = 0; this.overheated = false;
    this.cool = 0; this.shot = 0;
    const m = game.mats;
    const gun = new THREE.Group();
    const metal = m.weapon('metal', '#2a2c2e'), dark = m.weapon('metal', '#17181a'), olive = m.weapon('cerakote', '#4f5638');
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.16, 0.5), metal); body.position.set(0, 0, 0.05); gun.add(body);
    this.barrels = new THREE.Group(); this.barrels.position.set(0, 0, 0.3); gun.add(this.barrels);
    for (let i = 0; i < 6; i++) {
      const a = i / 6 * Math.PI * 2;
      const b = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.9, 8), dark);
      b.rotation.x = Math.PI / 2; b.position.set(Math.cos(a) * 0.045, Math.sin(a) * 0.045, 0.45); this.barrels.add(b);
    }
    for (const z of [0.15, 0.75]) { const ring = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.04, 14), metal); ring.rotation.x = Math.PI / 2; ring.position.z = z; this.barrels.add(ring); }
    const box = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.2, 0.26), olive); box.position.set(-0.2, -0.06, -0.02); gun.add(box);
    for (const s of [-1, 1]) { const h = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.16, 8), m.rubber()); h.rotation.x = 0.4; h.position.set(s * 0.12, -0.04, -0.28); gun.add(h); }
    const grips = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.03, 0.03), metal); grips.position.set(0, 0.02, -0.25); gun.add(grips);
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.04, 0.5, 8), metal); post.position.set(0, -0.3, 0); gun.add(post);
    if (style === 'hmg') { gun.clear(); this._buildHMG(gun); }
    gun.traverse((o) => { if (o.isMesh) o.frustumCulled = false; });
    gun.visible = false;
    this.model = gun;
    game.pipeline.vmScene.add(gun);
    this.base = style === 'hmg' ? new THREE.Vector3(0.0, -0.3, -0.62) : new THREE.Vector3(0.02, -0.32, -0.6);
  }

  /** Heavy machine gun on a ring mount: perforated barrel jacket, spade grips, ammo can, gun shield. */
  _buildHMG(gun) {
    const m = this.game.mats;
    const metal = m.weapon('metal', '#2a2c2e'), dark = m.weapon('metal', '#151617'), olive = m.weapon('cerakote', '#4f5638');
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.17, 0.62), metal); body.position.set(0, 0, 0.0); gun.add(body);
    const cover = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.03, 0.34), dark); cover.position.set(0, 0.1, 0.1); gun.add(cover);
    const jacket = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.55, 14, 1, true), dark); jacket.rotation.x = Math.PI / 2; jacket.position.set(0, 0.0, 0.58); gun.add(jacket);
    for (let i = 0; i < 8; i++) { const hole = new THREE.Mesh(new THREE.BoxGeometry(0.094, 0.018, 0.03), m.weapon('metal', '#060606')); hole.position.set(0, 0.0, 0.36 + i * 0.06); gun.add(hole); }
    const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 1.0, 12), dark); barrel.rotation.x = Math.PI / 2; barrel.position.set(0, 0, 0.75); gun.add(barrel);
    const hider = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.034, 0.1, 12), dark); hider.rotation.x = Math.PI / 2; hider.position.set(0, 0, 1.27); gun.add(hider);
    this.barrels = new THREE.Group(); gun.add(this.barrels);
    for (const s of [-1, 1]) { const h = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.13, 8), m.rubber()); h.position.set(s * 0.1, -0.03, -0.38); gun.add(h); }
    const yoke = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.03, 0.04), metal); yoke.position.set(0, -0.03, -0.32); gun.add(yoke);
    const trig = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.03, 0.03), dark); trig.position.set(0, -0.03, -0.3); gun.add(trig);
    const can = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.2, 0.3), olive); can.position.set(-0.17, -0.06, 0.05); gun.add(can);
    const belt = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.03, 0.12), m.weapon('metal', '#a8843c')); belt.position.set(-0.1, 0.04, 0.08); gun.add(belt);
    const sightR = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.06, 0.02), dark); sightR.position.set(0, 0.11, -0.18); gun.add(sightR);
    const sightF = new THREE.Mesh(new THREE.BoxGeometry(0.01, 0.07, 0.01), dark); sightF.position.set(0, 0.075, 0.82); gun.add(sightF);
    const cradle = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.3, 0.08), metal); cradle.position.set(0, -0.24, 0.0); gun.add(cradle);
    // gun shield with a sight window
    const shieldMat = m.weapon('metal', '#24261f').clone(); shieldMat.side = THREE.DoubleSide;
    for (const sx of [-1, 1]) { const p = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.46, 0.015), shieldMat); p.position.set(sx * 0.32, -0.04, 0.72); p.rotation.y = sx * 0.18; gun.add(p); }
    const lowP = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.16, 0.015), shieldMat); lowP.position.set(0, -0.2, 0.72); gun.add(lowP);
  }

  setActive(on) {
    this.active = on;
    this.model.visible = on;
    this.spin = 0; this.heat = 0; this.overheated = false;
    this.game.weapons.setLowered(on);
    if (on) this.game.weapons.lowered = 1;
  }

  /** Ray vs terrain heightfield (march then bisect). Returns distance or Infinity. */
  _terrainHit(o, d, max) {
    if (!this.heightAt) return Infinity;
    let prev = 0;
    for (let t = 3; t < max; t += 3) {
      const x = o.x + d.x * t, y = o.y + d.y * t, z = o.z + d.z * t;
      if (y < this.heightAt(x, z)) {
        let a = prev, b = t;
        for (let i = 0; i < 6; i++) { const m = (a + b) / 2; if (o.y + d.y * m < this.heightAt(o.x + d.x * m, o.z + d.z * m)) b = m; else a = m; }
        return b;
      }
      prev = t;
    }
    return Infinity;
  }

  update(dt, input) {
    if (!this.active) return;
    const g = this.game, cam = g.pipeline.camera, p = g.player;
    // keep the player's world position on the helicopter (enemies aim at it)
    p.pos.set(cam.position.x, cam.position.y - p.eyeHeight, cam.position.z);
    p.updateHitSpheres();
    const firing = input.fireHeld() && !this.overheated;
    this.spin = damp(this.spin, firing ? 1 : 0, firing ? this.gun.spinUp : 1.5, dt);
    if (this.style !== 'hmg') this.barrels.rotation.z += this.spin * dt * 40;
    this.heat = clamp(this.heat + (firing && this.spin > 0.8 ? dt * this.gun.heatRate : -dt * 0.28), 0, 1);
    if (this.heat >= 1) { this.overheated = true; g.hud.toast('ARMA SUPERAQUECIDA', 1500); g.audio.playDryFire(); }
    if (this.overheated && this.heat < 0.35) this.overheated = false;
    this.cool -= dt;
    let kick = 0;
    while (firing && this.spin > 0.8 && this.cool <= 0) {
      this.cool += this.gun.fireInterval;
      this._fire(cam);
      kick = 1;
    }
    if (!firing) this.cool = Math.max(this.cool, 0);
    // viewmodel: follow the view with a slight lag, shake while firing
    const t = g.time;
    this.model.position.copy(this.base);
    const hk = this.style === 'hmg' ? 2.5 : 1;
    if (kick) { this.model.position.x += (Math.random() - 0.5) * 0.008 * hk; this.model.position.y += (Math.random() - 0.5) * 0.008 * hk; this.model.position.z += 0.015 * hk; }
    this.model.rotation.set(Math.sin(t * 1.3) * 0.003, Math.PI, 0); // built along +Z, camera looks down -Z
    g.hud.setGunHeat?.(this.heat, this.overheated, this.style === 'hmg' ? 'K-12 BIGORNA' : 'M-6 VENTANIA');
  }

  _fire(cam) {
    const g = this.game, p = g.player;
    this.shot++;
    _o.copy(cam.position);
    const G = this.gun, hmg = this.style === 'hmg';
    const r = Math.random() * G.spread * DEG, a = Math.random() * Math.PI * 2;
    _d.set(Math.cos(a) * Math.tan(r), Math.sin(a) * Math.tan(r), -1).normalize().applyQuaternion(cam.quaternion);
    const tTerrain = this._terrainHit(_o, _d, G.range);
    const def = { ...G, range: Math.min(G.range, tTerrain) };
    const hit = g.combat.fireHitscan(p, _o.clone(), _d.clone(), def, { quiet: !hmg && this.shot % 3 !== 0 });
    if (!hit.actor && tTerrain < G.range && hit.dist >= tTerrain - 0.5) {
      _p.copy(_o).addScaledVector(_d, tTerrain);
      if (hmg || this.shot % 2 === 0) g.effects.dust.spawn({ x: _p.x, y: _p.y + 0.3, z: _p.z, vy: 2, life: 1.4, size: 1, endSize: 4, color: [0.5, 0.46, 0.38], alpha: 0.7, drag: 2 });
      if (this.shot % 4 === 0) g.effects.sparks.spawn({ x: _p.x, y: _p.y + 0.2, z: _p.z, vy: 5, life: 0.3, size: 0.12, endSize: 0.04, color: [1, 0.8, 0.5], alpha: 1, gravity: 9, fadeIn: 0 });
    }
    const muzzle = _p.set(0.0, hmg ? -0.3 : -0.08, hmg ? -1.9 : -1.2).applyQuaternion(cam.quaternion).add(cam.position);
    if (hmg || this.shot % 2 === 0) g.effects.muzzleFlash(muzzle, _d, hmg ? 1.8 : 1.3, this.shot % 6 === 0);
    if (this.shot % 3 === 0) g.effects.tracer(muzzle.clone(), hit.point.clone(), 600);
    if (hmg || this.shot % 2 === 0) g.audio.playShot(cam.position, hmg ? 'sniper' : 'mg', true);
    if (hmg && this.shot % 2 === 0) g.effects.casing(_p.set(0.12, -0.35, -0.6).applyQuaternion(cam.quaternion).add(cam.position), new THREE.Vector3((Math.random() - 0.5), -1, (Math.random() - 0.5)));
    p.addTrauma(hmg ? 0.03 : 0.012);
    p.shotsFired++;
  }
}
