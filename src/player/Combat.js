import * as THREE from 'three';
import { raySphere } from '../physics/CollisionWorld.js';
import { damageAtDistance } from '../weapons/WeaponData.js';
import { makeGrenade } from '../weapons/WeaponModels.js';

const _o = new THREE.Vector3(), _d = new THREE.Vector3(), _tmp = new THREE.Vector3();
const ZONE_MULT = { head: null, chest: 1, pelvis: 0.9, legs: 0.7 };
const bulletFilter = (b) => b.tag !== 'bounds';

/**
 * Damage resolution shared by player & AI: hitscan bullets, grenades,
 * scripted rockets and area explosions.
 */
export class Combat {
  constructor(game) {
    this.game = game;
    this.grenades = [];
    this.rockets = [];
  }

  actors() { return this.game.actors; }

  /**
   * Fire a hitscan bullet. def: weapon definition ({damage, range, headMultiplier, falloff...}).
   * Returns { point, actor, zone, dist }.
   */
  fireHitscan(shooter, origin, dir, def, opts = {}) {
    const game = this.game;
    const range = def.range || 300;
    const wh = game.world.raycast(origin, dir, range, bulletFilter);
    let best = wh ? wh.t : range;
    let hitActor = null, hitZone = null;
    for (const a of this.actors()) {
      if (a === shooter || !a.alive || a.team === shooter.team) continue;
      // coarse reject: distance from actor centre to ray
      const c = a.hitSpheres[1].c;
      _tmp.subVectors(c, origin);
      const proj = _tmp.dot(dir);
      if (proj < 0 || proj > best + 1) continue;
      const perp2 = _tmp.lengthSq() - proj * proj;
      if (perp2 > 2.0) continue;
      for (const s of a.hitSpheres) {
        const t = raySphere(origin, dir, s.c, s.r, best);
        if (t >= 0 && t < best) { best = t; hitActor = a; hitZone = s.zone; }
      }
    }
    const point = new THREE.Vector3().copy(origin).addScaledVector(dir, best);
    if (hitActor) {
      let dmg = damageAtDistance(def, best);
      dmg *= hitZone === 'head' ? (def.headMultiplier || 2.5) : ZONE_MULT[hitZone] || 1;
      if (opts.damageScale) dmg *= opts.damageScale;
      const wasAlive = hitActor.alive;
      hitActor.takeDamage(dmg, origin, { zone: hitZone, dir: dir.clone(), shooter, point });
      if (!hitActor.isPlayer) {
        game.effects.bloodHit(point, dir);
        game.audio.playImpact(point, 'flesh');
      }
      if (shooter.isPlayer) {
        shooter.shotsHit++;
        const killed = wasAlive && !hitActor.alive;
        if (killed) { shooter.kills++; if (hitZone === 'head') shooter.headshots++; }
        game.events.emit('hitmarker', { kill: killed, head: hitZone === 'head' });
        game.audio.playHitmarker(killed);
      }
    } else if (wh) {
      game.effects.impact(wh.point, wh.normal, wh.surface);
      if (!opts.quiet) game.audio.playImpact(wh.point, wh.surface);
      // AI awareness: bullets landing near enemies suppress them
      this.suppressNear(wh.point, shooter);
    }
    // near-miss whizz for the player
    const p = game.player;
    if (!shooter.isPlayer && p.alive && hitActor !== p) {
      const eye = p.getEye(_o);
      _tmp.subVectors(eye, origin);
      const proj = _tmp.dot(dir);
      if (proj > 2 && proj < best) {
        const perp = Math.sqrt(Math.max(0, _tmp.lengthSq() - proj * proj));
        if (perp < 2.2) {
          game.audio.playWhiz(new THREE.Vector3().copy(origin).addScaledVector(dir, proj));
          p.addTrauma(0.05);
          game.events.emit('nearMiss', {});
        }
      }
    }
    return { point, actor: hitActor, zone: hitZone, dist: best };
  }

  suppressNear(point, shooter) {
    for (const a of this.actors()) {
      if (a.isPlayer || !a.alive || a.team === shooter.team) continue;
      const d = a.pos.distanceTo(point);
      if (d < 2.5) a.suppress?.(1 - d / 2.5);
    }
  }

  // ---------------------------------------------------------------- grenades
  throwGrenade(thrower, pos, vel) {
    const mesh = makeGrenade(this.game.mats);
    mesh.position.copy(pos);
    this.game.scene.add(mesh);
    this.grenades.push({ mesh, vel: vel.clone(), fuse: 3.0, thrower, bounces: 0 });
  }

  updateGrenades(dt) {
    const world = this.game.world;
    for (let i = this.grenades.length - 1; i >= 0; i--) {
      const g = this.grenades[i];
      g.fuse -= dt;
      g.vel.y -= 9.8 * dt;
      const step = g.vel.length() * dt;
      if (step > 1e-5) {
        _d.copy(g.vel).normalize();
        const hit = world.raycast(g.mesh.position, _d, step + 0.05, bulletFilter);
        if (hit) {
          g.mesh.position.copy(hit.point).addScaledVector(new THREE.Vector3(hit.normal.x, hit.normal.y, hit.normal.z), 0.05);
          const n = new THREE.Vector3(hit.normal.x, hit.normal.y, hit.normal.z);
          g.vel.reflect(n).multiplyScalar(0.38);
          if (g.vel.length() > 1) this.game.audio.playGrenadeBounce(g.mesh.position);
        } else {
          g.mesh.position.addScaledVector(g.vel, dt);
        }
      }
      g.mesh.rotation.x += dt * 8; g.mesh.rotation.z += dt * 5;
      if (g.fuse <= 0) {
        this.game.scene.remove(g.mesh);
        this.grenades.splice(i, 1);
        this.explode(g.mesh.position.clone(), { radius: 9, damage: 220, source: g.thrower });
      }
    }
    for (let i = this.rockets.length - 1; i >= 0; i--) {
      const r = this.rockets[i];
      r.t += dt;
      const k = Math.min(1, r.t / r.duration);
      r.mesh.position.lerpVectors(r.from, r.to, k);
      r.mesh.position.y += Math.sin(k * Math.PI) * 1.2;
      this.game.effects.smoke.spawn({ x: r.mesh.position.x, y: r.mesh.position.y, z: r.mesh.position.z, vx: (Math.random() - 0.5) * 0.4, vy: 0.3, vz: (Math.random() - 0.5) * 0.4, life: 2.5, size: 0.3, endSize: 1.8, color: [0.7, 0.7, 0.68], alpha: 0.6, drag: 1 });
      this.game.effects.fire.spawn({ x: r.mesh.position.x, y: r.mesh.position.y, z: r.mesh.position.z, life: 0.08, size: 0.5, endSize: 0.2, color: [1, 0.7, 0.3], alpha: 1, fadeIn: 0 });
      if (k >= 1) {
        this.game.scene.remove(r.mesh);
        this.rockets.splice(i, 1);
        this.explode(r.to.clone(), { radius: 8, damage: 160, source: r.source, scale: 1.3 });
        r.onExplode?.();
      }
    }
  }

  /** Scripted RPG rocket from -> to. */
  fireRocket(from, to, source, onExplode) {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.6, 8), this.game.mats.darkMetal());
    mesh.rotation.x = Math.PI / 2;
    this.game.scene.add(mesh);
    const duration = from.distanceTo(to) / 70;
    this.rockets.push({ mesh, from: from.clone(), to: to.clone(), t: 0, duration, source, onExplode });
    this.game.audio.playShot(from, 'sniper', false);
    this.game.effects.muzzleFlash(from, new THREE.Vector3().subVectors(to, from).normalize(), 2);
  }

  explode(pos, { radius = 8, damage = 200, source = null, scale = 1 } = {}) {
    const game = this.game;
    game.effects.explosion(pos, scale);
    game.audio.playExplosion(pos, scale);
    const center = _o.copy(pos).setY(pos.y + 0.5);
    for (const a of this.actors()) {
      if (!a.alive) continue;
      const aim = a.getAimPoint(new THREE.Vector3());
      const d = aim.distanceTo(center);
      if (d > radius) continue;
      if (!game.world.lineOfSight(center, aim, bulletFilter)) continue;
      const k = Math.pow(1 - d / radius, 1.3);
      const dmg = damage * k * (a.isPlayer ? 0.55 : 1);
      const wasAlive = a.alive;
      a.takeDamage(dmg, pos, { zone: 'chest', dir: new THREE.Vector3().subVectors(aim, center).normalize(), explosion: true, shooter: source });
      if (source?.isPlayer && wasAlive && !a.alive) { source.kills++; game.events.emit('hitmarker', { kill: true }); }
    }
    const pd = game.player.pos.distanceTo(pos);
    game.player.addTrauma(Math.max(0, 1 - pd / 40) * 0.9);
    if (pd < 14) game.audio.concussion(2.2, 1 - pd / 14);
    game.events.emit('explosion', { pos, dist: pd });
  }

  reset() {
    for (const g of this.grenades) this.game.scene.remove(g.mesh);
    for (const r of this.rockets) this.game.scene.remove(r.mesh);
    this.grenades.length = 0;
    this.rockets.length = 0;
  }
}
