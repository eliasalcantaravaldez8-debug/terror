import * as THREE from 'three';
import { Soldier } from '../ai/Soldier.js';
import { EnemyBrain, AllyBrain } from '../ai/Brains.js';

/** Game-time timeout (respects pause / slow motion). */
export function setTimeoutGame(game, delay, fn) {
  game.timers.push({ t: delay, fn });
}

/** Squad members shared by every mission. */
export const SQUAD = {
  kane: { id: 'kane', name: 'KANE', look: { beard: true, skin: 0xb88a6c } },
  ruiz: { id: 'ruiz', name: 'RUIZ', look: { skin: 0xc8a07e, backpack: false } },
  okafor: { id: 'okafor', name: 'OKAFOR', look: { skin: 0x5e4030, glasses: false } },
  briggs: { id: 'briggs', name: 'BRIGGS', look: { skin: 0xd8b090 } },
};

/**
 * Shared mission infrastructure: actor lifecycle, squad, enemy waves,
 * timeline, checkpoints, doors/barriers. Concrete missions extend this and
 * implement start(checkpoint), stage logic and interactions.
 */
export class MissionBase {
  constructor(game, id, { waves = [], checkpoints = {}, title = '' } = {}) {
    this.game = game;
    this.id = id;
    this.WAVES = waves;
    this.CHECKPOINTS = checkpoints;
    this.title = title;
    this.timeline = [];
    this.named = {};
    this.waves = [];
    this.squadById = {};
    this.t = 0;
    this.stage = null;
  }

  checkpointLabel(id) { return this.CHECKPOINTS[id] || ''; }

  /** Common reset performed at the beginning of start(). */
  resetWorld() {
    const g = this.game;
    this.clearActors();
    g.combat.reset();
    g.pickups.clear();
    g.effects.reset();
    g.dialogue.clear();
    g.hud.reset();
    this.timeline = [];
    this.named = {};
    this.waves = [];
    this.t = 0;
    this.stage = null;
    this.doorAnim = null;
  }

  clearActors() {
    const g = this.game;
    for (const a of g.actors) if (!a.isPlayer) a.dispose();
    g.actors.length = 0;
    g.actors.push(g.player);
    g.squad.clear();
    g.ai.tokens.clear();
  }

  spawnSquad(ids) {
    const g = this.game;
    this.squadById = {};
    for (const id of ids) {
      const d = SQUAD[id];
      const s = new Soldier(g, { team: 'ally', name: d.name, id: d.id, x: 0, z: 0, invulnerable: d.id !== 'briggs', look: d.look });
      s.brain = new AllyBrain(s, g.squad);
      g.actors.push(s);
      g.squad.add(s);
      g.dialogue.registerActor(d.name, s);
      this.squadById[d.id] = s;
    }
  }

  placeSquad(points, yaw = Math.PI) {
    ['kane', 'ruiz', 'okafor'].forEach((id, i) => {
      const s = this.squadById[id];
      if (!s || !points[i]) return;
      s.pos.set(points[i][0], points[i][2] ?? 0, points[i][1]);
      s.yaw = yaw;
    });
  }

  spawnWave(index, activateNow = false) {
    const g = this.game;
    const wave = this.WAVES[index];
    const list = [];
    for (const e of wave.enemies) {
      let x = e.x, y = e.y || 0, z = e.z, isStatic = !!e.static;
      if (e.balcony) {
        const spot = g.city.balconySpots.filter((b) => b.face === 'px').sort((a, b) => Math.hypot(a.x - e.balcony.x, a.z - e.balcony.z) - Math.hypot(b.x - e.balcony.x, b.z - e.balcony.z))[0];
        if (!spot) continue;
        x = spot.x + 0.2; y = spot.y; z = spot.z; isStatic = true;
      }
      const s = new Soldier(g, { team: 'enemy', x, y, z, kind: e.kind, static: isStatic, look: { cap: Math.random() < 0.3 && !isStatic, mask: Math.random() < 0.25 }, id: e.id, yaw: 0 });
      s.pos.y = y;
      s.groundY = y;
      s.brain = new EnemyBrain(s, { zone: wave.zone });
      s.brain.rush = !!e.rush;
      s.faceYaw = e.face ? Math.atan2(e.face[0], e.face[1]) : (wave.faceYaw ?? 0);
      if (e.face) { s.staticBase = s.pos.clone(); s.edgeFace = new THREE.Vector3(e.face[0], 0, e.face[1]); }
      s.waveIndex = index;
      s.spawnDelay = e.delay || 0;
      if (e.delay) { s.model.root.visible = false; s.alive = true; s.hiddenUntilActive = true; }
      g.actors.push(s);
      list.push(s);
      if (e.id) this.named[e.id] = s;
    }
    this.waves[index] = { soldiers: list, active: false, done: false, t: 0 };
    if (activateNow) this.activateWave(index);
    return list;
  }

  /** Activate a wave: wakes every visible soldier; delayed ones wake when they appear. */
  activateWave(index) {
    const w = this.waves[index];
    if (!w || w.active) return;
    w.active = true;
    w.t = 0;
    for (const s of w.soldiers) if (!s.hiddenUntilActive) s.brain.activate();
    this.game.audio.battleIntensity = 1;
  }

  markWavesDone(indices) { for (const i of indices) this.waves[i] = { soldiers: [], active: true, done: true }; }

  waveCleared(i) {
    const w = this.waves[i];
    if (!w || !w.active) return false;
    if (w.done) return true;
    if (w.soldiers.every((s) => !s.alive)) { w.done = true; return true; }
    return false;
  }

  saveCheckpoint(id) {
    const g = this.game;
    this.checkpoint = id;
    g.saves.save({ mission: this.id, checkpoint: id, weapons: g.weapons.serialize(), stats: g.stats });
    g.hud.toast('CHECKPOINT SALVO', 2200);
    g.events.emit('checkpoint', { id });
  }

  /** Open/close the Halden front door (collider + navigation). */
  setHaldenDoor(open, rebuild = true) {
    const g = this.game, d = g.city.namedProps.halden;
    if (open && d.doorBox) { g.world.removeBox(d.doorBox); d.doorBox = null; }
    if (!open && !d.doorBox) d.doorBox = g.world.addBox(-1.8, 0, -168.5, 1.8, 4.4, -168, { tag: 'door', surface: 'wood' });
    d.open = open;
    d.setOpen(open ? 1 : 0);
    this.doorAnim = null;
    if (rebuild) g.nav.rebuild();
  }

  /** Invisible barrier closing the east end of the cross street (only open in missions that go there). */
  setEastGate(closed, rebuild = true) {
    const g = this.game;
    if (closed && !g._eastGate) g._eastGate = g.world.addBox(69, 0, -68, 71, 30, -55, { tag: 'bounds' });
    if (!closed && g._eastGate) { g.world.removeBox(g._eastGate); g._eastGate = null; }
    if (rebuild) g.nav.rebuild();
  }

  /** Per-frame shared logic: timeline, delayed spawns, last-hostile rush. Call from update(). */
  updateCommon(dt, activeWaveIndex = null) {
    this.t += dt;
    while (this.timeline.length && this.timeline[0].at <= this.t) this.timeline.shift().fn();
    for (const w of this.waves) {
      if (!w || !w.active) continue;
      w.t += dt;
      for (const s of w.soldiers) {
        if (s.hiddenUntilActive && w.t >= s.spawnDelay) { s.hiddenUntilActive = false; s.model.root.visible = true; s.brain.activate(); }
      }
    }
    if (activeWaveIndex !== null) {
      const w = this.waves[activeWaveIndex];
      if (w) {
        const visible = w.soldiers.filter((s) => s.alive && !s.isStatic && !s.hiddenUntilActive);
        const left = w.soldiers.filter((s) => s.alive).length;
        if (visible.length > 0 && left <= 2) for (const s of visible) if (!s.brain.rush) { s.brain.rush = true; s.brain.relocateT = 0; }
      }
    }
  }

  schedule(at, fn) {
    this.timeline.push({ at: this.t + at, fn });
    this.timeline.sort((a, b) => a.at - b.at);
  }
}
