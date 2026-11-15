import * as THREE from 'three';

const _a = new THREE.Vector3(), _b = new THREE.Vector3(), _d = new THREE.Vector3();
const losFilter = (b) => b.tag !== 'bounds';

/**
 * Stealth director for night infiltration: guards patrol routes with flashlights,
 * build up awareness of the player from sight (view cone, distance, light, stance),
 * hearing (sprinting, gunshots) and discovered bodies. When any guard is sure, the
 * alarm goes off and every guard switches to normal combat behaviour.
 */
export class StealthDirector {
  constructor(game, { lamps = [], viewDist = 26, onAlarm = null } = {}) {
    this.game = game;
    this.lamps = lamps;
    this.viewDist = viewDist;
    this.onAlarm = onAlarm;
    this.guards = [];
    this.alarm = false;
    this.maxAwareness = 0;
    this.focus = null;
    this._beamGeo = new THREE.ConeGeometry(1.6, 11, 18, 1, true);
    this._beamGeo.translate(0, -5.5, 0);
    this._beamGeo.rotateX(-Math.PI / 2);
    this._beamMat = new THREE.MeshBasicMaterial({ color: 0xfff2d0, transparent: true, opacity: 0.07, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide });
    this._unsub = game.events.on('playerShot', (e) => this.onShot(e));
  }

  dispose() { this._unsub?.(); }

  /** Register a soldier as a guard. route: [{x,z,wait}] (null = sentry looking at `faceYaw`). */
  addGuard(soldier, route = null) {
    const beam = new THREE.Mesh(this._beamGeo, this._beamMat);
    beam.position.set(-0.04, 0.12, 0.6);
    soldier.model.weaponMount.add(beam);
    const g = { s: soldier, route, wp: 0, wait: 0, awareness: 0, beam, investigate: null };
    this.guards.push(g);
    if (route) soldier.moveTo(route[0].x, route[0].z, 1.4);
    return g;
  }

  /** How visible the player is right now (stance, light, movement). */
  _visibility() {
    const p = this.game.player;
    let k = p.crouched ? 0.55 : 1;
    if (p.sprinting) k *= 1.35;
    for (const [x, z] of this.lamps) if (Math.hypot(p.pos.x - x, p.pos.z - z) < 8) { k *= 1.7; break; }
    return k;
  }

  onShot(e) {
    if (this.alarm) return;
    const p = this.game.player;
    for (const g of this.guards) {
      if (!g.s.alive) continue;
      const d = g.s.pos.distanceTo(p.pos);
      if (!e.suppressed && d < 75) { this.raise(g); return; }
      if (e.suppressed && d < 11) { g.awareness = Math.max(g.awareness, 0.6); g.investigate = p.pos.clone(); }
    }
  }

  raise(g) {
    if (this.alarm) return;
    this.alarm = true;
    for (const x of this.guards) {
      x.beam.visible = false;
      if (x.s.alive) { x.s.brain.activate(); x.s.speed = 0; }
    }
    this.game.audio.stinger();
    this.game.hud.feed('ALARME DISPARADO');
    this.onAlarm?.(g);
  }

  update(dt) {
    const game = this.game, p = game.player;
    this.maxAwareness = 0;
    this.focus = null;
    if (this.alarm) return;
    const vis = this._visibility();
    const pEye = p.getEye(_a);
    const pChest = p.getAimPoint(_b);
    for (const g of this.guards) {
      const s = g.s;
      if (!s.alive) { g.beam.visible = false; continue; }
      // ---- patrol / sentry behaviour
      if (g.investigate) {
        if (!g._goingTo) { s.moveTo(g.investigate.x, g.investigate.z, 1.8); g._goingTo = true; }
        if (s.arrived) { g.wait -= dt; if (g.wait <= -3) { g.investigate = null; g._goingTo = false; g.wait = 0; if (g.route) s.moveTo(g.route[g.wp].x, g.route[g.wp].z, 1.4); } }
      } else if (g.route) {
        if (s.arrived) {
          g.wait += dt;
          if (g.wait > (g.route[g.wp].wait ?? 2)) {
            g.wait = 0;
            g.wp = (g.wp + 1) % g.route.length;
            s.moveTo(g.route[g.wp].x, g.route[g.wp].z, 1.4);
          }
        }
      }
      s.aimT = g.awareness > 0.5 ? 0.6 : 0.15;
      // ---- perception
      const eye = s.getEye(_d);
      const dx = pChest.x - eye.x, dz = pChest.z - eye.z;
      const dist = Math.hypot(dx, dz);
      const range = this.viewDist * vis;
      let seen = false;
      if (dist < range) {
        const fx = Math.sin(s.yaw), fz = Math.cos(s.yaw);
        const cos = (dx * fx + dz * fz) / (dist || 1);
        if ((cos > 0.42 || dist < 2.5) && game.world.lineOfSight(eye, pChest, losFilter)) {
          seen = true;
          g.awareness += dt * (1.9 * (1 - dist / range) + 0.3) * (dist < 6 ? 2 : 1);
          if (g.awareness > 0.45) { s.lookPoint = pEye.clone(); s.stop(); }
        }
      }
      if (!seen && p.sprinting && dist < 8) { g.awareness += dt * 0.9; s.lookPoint = pEye.clone(); }
      if (!seen && !(p.sprinting && dist < 8)) {
        g.awareness = Math.max(0, g.awareness - dt * 0.22);
        if (g.awareness < 0.3 && s.lookPoint && !g.investigate) { s.lookPoint = null; if (g.route && s.arrived) s.moveTo(g.route[g.wp].x, g.route[g.wp].z, 1.4); }
      }
      // ---- discovered bodies
      if (!g._bodyCheck || (g._bodyCheck -= dt) <= 0) {
        g._bodyCheck = 0.5;
        for (const o of this.guards) {
          if (o.s.alive || o.s === s || o._found) continue;
          const bp = o.s.pos;
          if (Math.hypot(bp.x - eye.x, bp.z - eye.z) < 14 && game.world.lineOfSight(eye, { x: bp.x, y: bp.y + 0.4, z: bp.z }, losFilter)) {
            o._found = true; g.awareness = Math.max(g.awareness, 0.7); g.investigate = bp.clone();
            game.hud.feed('UM GUARDA ENCONTROU UM CORPO');
          }
        }
      }
      if (g.awareness >= 1) { this.raise(g); return; }
      if (g.awareness > this.maxAwareness) { this.maxAwareness = g.awareness; this.focus = s; }
    }
    game.hud.setStealth?.(this.maxAwareness, this.focus ? Math.atan2(this.focus.pos.x - p.pos.x, this.focus.pos.z - p.pos.z) : null);
  }
}
