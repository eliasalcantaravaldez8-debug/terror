import * as THREE from 'three';
import { clamp } from '../utils/math.js';

const _a = new THREE.Vector3(), _b = new THREE.Vector3(), _c = new THREE.Vector3();
const losFilter = (b) => b.tag !== 'bounds';

/** Shared attack-token pool: limits how many hostiles may *accurately* fire at the player at once. */
export class AttackTokens {
  constructor(max = 2) { this.max = max; this.holders = new Map(); }
  request(agent, duration, time) {
    for (const [a, until] of this.holders) if (until < time || !a.alive) this.holders.delete(a);
    if (this.holders.has(agent)) { this.holders.set(agent, time + duration); return true; }
    if (this.holders.size < this.max) { this.holders.set(agent, time + duration); return true; }
    return false;
  }
  clear() { this.holders.clear(); }
}

function visible(game, from, target) {
  return game.world.lineOfSight(from, target.getAimPoint(_c), losFilter);
}

/**
 * Hostile behaviour: take cover inside its wave zone, peek & fire bursts,
 * relocate when flanked or after a while, react to suppression.
 */
export class EnemyBrain {
  constructor(soldier, { zone = null, awareness = 0 } = {}) {
    this.s = soldier;
    this.zone = zone;
    this.active = false;
    this.target = null;
    this.cover = null;
    this.phase = 'idle'; // idle | moving | hide | peek
    this.phaseT = 0;
    this.retarget = 0;
    this.relocateT = 6 + Math.random() * 6;
    this.spotted = new Map(); // target -> time first seen
    this.awareness = awareness;
    this.rush = false;
  }

  activate() {
    if (this.active) return;
    this.active = true;
    this.phase = 'decide';
    this.s.aimT = 0.6;
  }

  onDamaged(fromPos) {
    if (!this.active) this.activate();
    if (this.phase === 'peek' && Math.random() < 0.5) { this.phase = 'hide'; this.phaseT = 0; }
  }

  chooseTarget() {
    const s = this.s, game = s.game;
    const eye = s.getEye(_a);
    let best = null, bestScore = -Infinity;
    for (const t of game.actors) {
      if (t.team === s.team || !t.alive) continue;
      const d = eye.distanceTo(t.getAimPoint(_b));
      if (d > 140) continue;
      const vis = visible(game, eye, t);
      let score = -d * 0.05 + (vis ? 5 : 0) + (t.isPlayer ? 2.5 : 0);
      if (score > bestScore) { bestScore = score; best = { t, vis }; }
    }
    if (best) {
      this.target = best.t;
      this.targetVisible = best.vis;
      if (best.vis && !this.spotted.has(best.t)) this.spotted.set(best.t, s.time);
    }
  }

  pickCover() {
    const s = this.s, game = s.game;
    if (!this.target) return false;
    const threatEye = this.target.getEye(new THREE.Vector3());
    const threatAim = this.target.getAimPoint(new THREE.Vector3());
    let desired = { x: s.pos.x, z: s.pos.z }, radius = 14, zone = this.zone;
    const z = this.zone;
    const outside = z && (s.pos.x < z.x0 || s.pos.x > z.x1 || s.pos.z < z.z0 || s.pos.z > z.z1);
    if (this.rush) {
      desired = { x: s.pos.x + (threatEye.x - s.pos.x) * 0.45, z: s.pos.z + (threatEye.z - s.pos.z) * 0.45 };
      radius = 16; zone = null;
    } else if (outside) {
      // reinforcements entering the fight: head for the nearest part of the zone
      desired = { x: Math.min(z.x1 - 2, Math.max(z.x0 + 2, s.pos.x)), z: Math.min(z.z1 - 2, Math.max(z.z0 + 2, s.pos.z)) };
      radius = 18;
    }
    const p = game.cover.findCover(s, desired, radius, threatEye, threatAim, { zone, preferDist: this.rush ? 12 : 24 });
    if (!p) {
      if (outside || this.rush) return s.moveTo(desired.x, desired.z, 4.6);
      return false;
    }
    game.cover.release(s);
    p.owner = s;
    this.cover = p;
    return s.moveTo(p.x, p.z, 4.6 + Math.random() * 0.6);
  }

  update(dt) {
    const s = this.s, game = s.game;
    if (!this.active) {
      s.aimT = 0; s.crouchT = 0;
      return;
    }
    this.phaseT += dt;
    this.retarget -= dt;
    this.relocateT -= dt;
    if (this.retarget <= 0 || !this.target || !this.target.alive) {
      this.chooseTarget();
      this.retarget = 0.35 + Math.random() * 0.3;
    }
    if (!this.target) { s.aimT = 0.3; return; }
    s.aimTarget = this.target;

    if (s.isStatic) { this._fightFromSpot(dt, 1.2); return; }

    switch (this.phase) {
      case 'decide':
        if (this.pickCover()) { this.phase = 'moving'; this.phaseT = 0; }
        else { this.phase = 'peek'; this.phaseT = 0; }
        break;
      case 'moving':
        s.crouchT = 0; s.aimT = 0.3;
        // fire on the move occasionally
        if (this.targetVisible && s.burstLeft === 0 && Math.random() < dt * 0.6) this._fire(0.35);
        if (s.arrived || this.phaseT > 12) { this.phase = 'hide'; this.phaseT = 0; this.hideFor = 0.4 + Math.random() * 0.8; }
        break;
      default:
        this._fightFromSpot(dt, this.cover ? this.cover.h : 0);
        if (this.relocateT <= 0 || (this.cover && this.target && !game.cover.isProtected(this.cover, this.target.getEye(_a)) && this.phase === 'hide' && Math.random() < dt * 2)) {
          this.relocateT = 9 + Math.random() * 9;
          this.phase = 'decide';
        }
    }
  }

  /** Hide/peek cycle at current spot. coverH: height of the cover in front. */
  _fightFromSpot(dt, coverH) {
    const s = this.s;
    // elevated shooters step back from the edge to hide and up to the parapet to fire
    if (s.staticBase && s.edgeFace) {
      const back = this.phase === 'peek' ? 0 : 1.1;
      const tx = s.staticBase.x - s.edgeFace.x * back, tz = s.staticBase.z - s.edgeFace.z * back;
      const k = 1 - Math.exp(-5 * dt);
      s.pos.x += (tx - s.pos.x) * k; s.pos.z += (tz - s.pos.z) * k;
    }
    const lowCover = coverH > 0.7 && coverH < 1.45;
    if (this.phase !== 'hide' && this.phase !== 'peek') { this.phase = 'hide'; this.phaseT = 0; this.hideFor = 1; }
    if (this.phase === 'hide') {
      s.crouchT = lowCover || s.isStatic ? 1 : 0;
      s.aimT = 0.4;
      if (this.phaseT > this.hideFor + s.suppression * 2.5) { this.phase = 'peek'; this.phaseT = 0; this.peekFor = 1.4 + Math.random() * 1.8; this.fired = false; }
    } else {
      s.crouchT = 0;
      s.aimT = 1;
      if (this.phaseT > 0.35 && !this.fired) {
        this.fired = true;
        this.chooseTarget();
        if (this.targetVisible) this._fire(1);
        else if (Math.random() < 0.35) this._fire(0.2); // blind suppression
        else this.relocateT -= 3;
      }
      if (s.burstLeft === 0 && this.phaseT > this.peekFor) { this.phase = 'hide'; this.phaseT = 0; this.hideFor = 1.0 + Math.random() * 2.0; }
    }
  }

  _fire(quality) {
    const s = this.s, game = s.game, t = this.target;
    if (!t) return;
    const eye = s.getEye(_a);
    const d = eye.distanceTo(t.getAimPoint(_b));
    let chance = (s.kind === 'sniper' ? 0.55 : 0.2) * clamp(1.35 - d / 55, 0.3, 1.15) * quality * s.weapon.accuracy;
    if (t.isPlayer) {
      if (t.isCrouched) chance *= 0.7;
      if (t.moving) chance *= 0.72;
      const seen = this.spotted.get(t);
      const ramp = seen === undefined ? 0.2 : clamp((s.time - seen) / 3, 0.25, 1);
      chance *= ramp;
      if (!game.ai.tokens.request(s, 2.2, game.time)) chance *= 0.12;
      chance *= game.difficulty.enemyAccuracy;
    } else chance *= 0.6;
    s.startBurst(t, clamp(chance, 0, 0.8));
  }
}

/**
 * Squad-mate behaviour: follow the squad anchor set by the mission, take cover
 * near it facing the threat, engage visible hostiles, give callouts.
 */
export class AllyBrain {
  constructor(soldier, squad) {
    this.s = soldier;
    this.squad = squad;
    this.cover = null;
    this.target = null;
    this.retarget = 0;
    this.repath = 0;
    this.phase = 'hide';
    this.phaseT = 0;
    this.lastAnchorVersion = -1;
    this.calloutCooldown = 5 + Math.random() * 5;
  }

  onReload() { if (Math.random() < 0.3) this.squad.bark(this.s, 'reload'); }

  chooseTarget() {
    const s = this.s, game = s.game;
    const eye = s.getEye(_a);
    let best = null, bestD = Infinity;
    for (const t of game.actors) {
      if (t.team === s.team || !t.alive || !t.brain?.active) continue;
      const d = eye.distanceTo(t.getAimPoint(_b));
      if (d > 120 || d >= bestD) continue;
      if (!visible(game, eye, t)) continue;
      best = t; bestD = d;
    }
    this.target = best;
  }

  threatPoint() {
    const game = this.s.game;
    // average of active hostiles, else anchor facing
    let n = 0; _a.set(0, 0, 0);
    for (const t of game.actors) {
      if (t.team === 'enemy' && t.alive && t.brain?.active) { _a.add(t.getEye(_b)); n++; }
    }
    if (n) return _a.divideScalar(n).clone();
    const an = this.squad.anchor;
    return new THREE.Vector3(an.x + Math.sin(an.facing) * 30, 1.6, an.z + Math.cos(an.facing) * 30);
  }

  update(dt) {
    const s = this.s, game = s.game, squad = this.squad;
    this.phaseT += dt;
    this.retarget -= dt;
    this.repath -= dt;
    this.calloutCooldown -= dt;
    const anchor = squad.anchorFor(s);
    const combat = squad.combat;
    if (this.retarget <= 0) { this.chooseTarget(); this.retarget = 0.5 + Math.random() * 0.4; }

    // re-position when the anchor changes, or when far from it
    const distAnchor = Math.hypot(s.pos.x - anchor.x, s.pos.z - anchor.z);
    if (this.lastAnchorVersion !== squad.anchorVersion || (distAnchor > anchor.radius + 6 && this.repath <= 0)) {
      this.lastAnchorVersion = squad.anchorVersion;
      this.repath = 3;
      const threat = this.threatPoint();
      game.cover.release(s);
      this.cover = null;
      let p = null;
      if (combat) p = game.cover.findCover(s, anchor, anchor.radius, threat, threat, { preferDist: 25, maxEval: 12 });
      if (p) { p.owner = s; this.cover = p; s.moveTo(p.x, p.z, combat ? 5.0 : 3.6); }
      else s.moveTo(anchor.x + (Math.random() - 0.5) * 3, anchor.z + (Math.random() - 0.5) * 3, combat ? 5 : 3.4);
      this.phase = 'moving';
    }

    if (!combat) {
      s.crouchT = s.arrived ? 0.0 : 0;
      s.aimT = s.arrived ? 0.25 : 0.1;
      s.aimTarget = null;
      s.lookPoint = s.arrived ? squad.lookPointFor(s) : null;
      return;
    }
    s.lookPoint = null;
    s.aimTarget = this.target || null;
    if (this.phase === 'moving') {
      s.crouchT = 0;
      s.aimT = 0.4;
      if (s.arrived) { this.phase = 'hide'; this.phaseT = 0; }
      return;
    }
    const lowCover = this.cover && this.cover.h < 1.45;
    if (this.phase === 'hide') {
      s.crouchT = lowCover ? 1 : 0.6;
      s.aimT = 0.6;
      if (!s.aimTarget) { s.lookPoint = this.threatPoint(); }
      if (this.phaseT > 0.8 + Math.random() * 0.8 && this.target) { this.phase = 'peek'; this.phaseT = 0; this.fired = false; }
    } else {
      s.crouchT = lowCover ? 0 : 0.6;
      s.aimT = 1;
      if (this.phaseT > 0.3 && !this.fired && this.target) {
        this.fired = true;
        const d = s.pos.distanceTo(this.target.pos);
        const chance = clamp(0.2 * (1.3 - d / 70), 0.06, 0.25) * game.difficulty.allyAccuracy;
        s.startBurst(this.target, chance);
        if (this.calloutCooldown <= 0) { this.calloutCooldown = 9 + Math.random() * 10; squad.bark(s, 'contact', this.target); }
      }
      if (s.burstLeft === 0 && this.phaseT > 1.8) { this.phase = 'hide'; this.phaseT = 0; }
    }
  }
}
