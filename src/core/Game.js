import * as THREE from 'three';
import { EventBus } from './EventBus.js';
import { Input } from './Input.js';
import { Settings } from './Settings.js';
import { SaveSystem } from './SaveSystem.js';
import { RenderPipeline } from '../render/RenderPipeline.js';
import { Materials } from '../render/Materials.js';
import { TextureFactory } from '../render/TextureFactory.js';
import { CollisionWorld } from '../physics/CollisionWorld.js';
import { NavGrid } from '../ai/NavGrid.js';
import { CoverSystem } from '../ai/CoverSystem.js';
import { AttackTokens } from '../ai/Brains.js';
import { Squad } from '../ai/Squad.js';
import { CityBuilder } from '../world/CityBuilder.js';
import { Effects } from '../fx/Effects.js';
import { AudioEngine } from '../audio/AudioEngine.js';
import { Player } from '../player/Player.js';
import { WeaponController } from '../player/WeaponController.js';
import { Combat } from '../player/Combat.js';
import { Pickups } from '../player/Pickups.js';
import { HUD } from '../ui/HUD.js';
import { Menus } from '../ui/Menus.js';
import { Dialogue } from '../ui/Dialogue.js';
import { Mission01 } from '../missions/Mission01.js';
import { Mission02 } from '../missions/Mission02.js';

export const MISSION_ORDER = ['m01', 'm02'];

export const DIFFICULTY = {
  normal: { playerDamage: 1, enemyDamage: 1, enemyAccuracy: 1, allyAccuracy: 1, tokens: 2 },
};

const nextFrame = () => new Promise((r) => requestAnimationFrame(() => r()));

/**
 * Top-level game object: owns every system, the main loop and the
 * front-end state machine (loading -> menu -> playing <-> paused -> dead/complete).
 */
export class Game {
  constructor({ testMode = false } = {}) {
    this.testMode = testMode;
    this.events = new EventBus();
    this.settings = new Settings();
    this.saves = new SaveSystem();
    this.state = 'loading';
    this.time = 0;
    this.timeScale = 1;
    this.slowMo = null;
    this.timers = [];
    this.actors = [];
    this.difficulty = DIFFICULTY.normal;
    this.stats = { deaths: 0, startTime: 0, elapsed: 0 };
  }

  async init(onProgress = () => {}) {
    const container = document.getElementById('app');
    onProgress(0.05, 'Inicializando renderizador');
    this.pipeline = new RenderPipeline(container, this.settings);
    this.scene = this.pipeline.scene;
    TextureFactory.anisotropy = Math.min(8, this.pipeline.renderer.capabilities.getMaxAnisotropy());
    this.input = new Input(this.pipeline.renderer.domElement);
    this.audio = new AudioEngine(this.settings);
    this.mats = new Materials();
    this.world = new CollisionWorld(8);
    await nextFrame();
    onProgress(0.15, 'Gerando texturas e o distrito de Teresk');
    await nextFrame();
    this.city = new CityBuilder(this.scene, this.world, this.mats).build();
    onProgress(0.6, 'Construindo navegação e coberturas');
    await nextFrame();
    this.nav = new NavGrid(this.world, { minX: -75, minZ: -212, maxX: 138, maxZ: 78, cell: 0.75, agentRadius: 0.42 });
    this.cover = new CoverSystem(this.world, this.nav);
    this.cover.build();
    this.ai = { tokens: new AttackTokens(this.difficulty.tokens) };
    onProgress(0.7, 'Efeitos e áudio');
    await nextFrame();
    this.effects = new Effects(this.scene, this.pipeline, this.pipeline.quality);
    this.effects.onCasingLand = (p) => this.audio.playCasing(p);
    this.effects.indoorRects = this.city.indoorRects;
    this.player = new Player(this);
    this.actors.push(this.player);
    this.combat = new Combat(this);
    this.pickups = new Pickups(this);
    this.weapons = new WeaponController(this);
    this.squad = new Squad(this);
    this.dialogue = new Dialogue(this);
    this.hud = new HUD(this);
    this.menus = new Menus(this);
    this.fade = new Fade(document.getElementById('fade'));
    onProgress(0.85, 'Preparando a missão');
    await nextFrame();
    this.missions = { m01: new Mission01(this), m02: new Mission02(this) };
    this.mission = this.missions.m01;
    this.interactables = this.city.interactables;

    this.events.on('playerDied', () => this.onPlayerDied());
    this.events.on('soldierKilled', ({ soldier, info }) => {
      if (soldier.team === 'enemy') {
        const killer = info?.shooter;
        const s = this.squad.alive[Math.floor(Math.random() * this.squad.alive.length)];
        if (s && Math.random() < 0.35) this.squad.bark(s, killer?.isPlayer ? 'playerKill' : 'kill');
      }
    });
    this.input.onLockChange = (locked) => {
      if (!locked && this.state === 'playing' && !this.testMode && !this._ignoreUnlock && !this.input.lockFailed) this.pause();
    };
    this.pipeline.renderer.domElement.addEventListener('click', () => {
      if (this.state === 'playing' && !this.input.locked && !this.testMode) this.input.requestLock();
    });
    window.addEventListener('keydown', (e) => {
      if ((e.code === 'Escape' || e.code === 'KeyP') && this.state === 'paused' && this.menus.current === 'pause') { this.resume(); }
      else if (e.code === 'Escape' && this.state === 'playing' && this.input.lockFailed) this.pause();
      else if ((e.code === 'KeyP') && this.state === 'playing') this.pause();
    });

    // warm-up: compile shaders before the player sees anything
    onProgress(0.95, 'Compilando shaders');
    await nextFrame();
    this.pipeline.camera.position.set(0, 30, 80);
    this.pipeline.camera.lookAt(0, 0, -50);
    this.pipeline.renderer.compile(this.scene, this.pipeline.camera);
    onProgress(1, 'Pronto');
    this.state = 'menu';
    this.hud.show(false);
    this._clock = performance.now();
    this._menuCam = 0;
    requestAnimationFrame(() => this.loop());
  }

  // ------------------------------------------------------------ front-end flow
  showMainMenu() { this.state = 'menu'; this.hud.show(false); this.menus.main(); this.fade.set(0); }

  startNewCampaign() { this.startMission('m01'); }

  /** Start a mission from its beginning. */
  startMission(id) {
    this.audio.init();
    this.saves.clear();
    this.stats = { deaths: 0, startTime: this.time, elapsed: 0 };
    this.weapons.resetLoadout();
    this._startPlaying('start', null, id);
    if (id !== 'm01') this.mission.saveCheckpoint('start');
  }

  continueCampaign() {
    this.audio.init();
    const save = this.saves.load();
    if (!save) return this.startNewCampaign();
    this.stats = { deaths: 0, elapsed: 0, ...(save.stats || {}), startTime: this.time };
    this._startPlaying(save.checkpoint, save.weapons, save.mission);
  }

  _startPlaying(checkpoint, weaponsData = null, missionId = this.mission.id) {
    this.menus.hide();
    const next = this.missions[missionId] || this.missions.m01;
    if (next !== this.mission) { this.mission.exit?.(); this.mission = next; }
    this.timers.length = 0;
    this.timeScale = 1; this.slowMo = null;
    this.mission.start(checkpoint);
    if (weaponsData) this.weapons.restore(weaponsData);
    else if (checkpoint === 'start') this.weapons.resetLoadout();
    this.hud.show(true);
    this.state = 'playing';
    if (checkpoint !== 'start') { this.fade.set(1); this.fade.to(0, 1.2); this.hud.toast('Checkpoint: ' + this.mission.checkpointLabel(checkpoint)); }
    this.events.emit('missionStarted', { id: this.mission.id, checkpoint });
    if (!this.testMode) this.input.requestLock();
  }

  restartFromCheckpoint() {
    const save = this.saves.load();
    if (!save) return this._startPlaying('start');
    this._startPlaying(save.checkpoint, save.weapons, save.mission);
  }

  pause() {
    if (this.state !== 'playing') return;
    this.state = 'paused';
    this.menus.pause();
    this.input.exitLock();
    try { speechSynthesis.pause(); } catch { /* */ }
  }
  resume() {
    if (this.state !== 'paused') return;
    this.menus.hide();
    this.state = 'playing';
    this.input.consumeMouse();
    try { speechSynthesis.resume(); } catch { /* */ }
    if (!this.testMode) this.input.requestLock();
  }
  quitToMenu() {
    this.dialogue.clear();
    this.mission.heliAudio?.stop();
    this.audio.setMusicIntensity(0);
    this.audio.battleIntensity = 0;
    this.input.exitLock();
    this.showMainMenu();
  }

  onPlayerDied() {
    this.state = 'dead';
    this.stats.deaths = (this.stats.deaths || 0) + 1;
    this.dialogue.clear();
    this.audio.concussion(3, 1);
    this.fade.to(0.75, 1.5);
    setTimeout(() => { this.input.exitLock(); this.menus.death(); }, this.testMode ? 10 : 1600);
  }

  completeMission() {
    this.state = 'complete';
    const p = this.player;
    const secs = Math.round(this.stats.elapsed);
    const stats = {
      time: `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`,
      kills: p.kills, headshots: p.headshots, shots: p.shotsFired, hits: p.shotsHit, deaths: this.stats.deaths || 0,
    };
    const idx = MISSION_ORDER.indexOf(this.mission.id);
    const nextId = MISSION_ORDER[idx + 1] || null;
    if (nextId) {
      this.saves.unlock(nextId);
      this.saves.save({ mission: nextId, checkpoint: 'start', weapons: this.weapons.serialize(), stats: { deaths: 0 } });
    }
    stats.next = nextId;
    stats.text = this.mission.completeText;
    this.hud.show(false);
    this.input.exitLock();
    this.audio.setMusicIntensity(0.2);
    this.menus.missionComplete(stats);
    this.events.emit('missionComplete', stats);
  }

  slowMotion(scale, duration) { this.slowMo = { scale, t: duration, total: duration }; }

  // ------------------------------------------------------------ loop
  loop() {
    requestAnimationFrame(() => this.loop());
    const now = performance.now();
    let dt = (now - this._clock) / 1000;
    this._clock = now;
    dt = Math.min(dt, 0.05);
    if (this.state === 'playing' || this.state === 'dead') this.simulate(dt);
    else if (this.state === 'menu') this._menuCamera(dt);
    this.render(dt);
  }

  _menuCamera(dt) {
    this._menuCam += dt * 0.03;
    const cam = this.pipeline.camera;
    const a = this._menuCam;
    cam.position.set(Math.sin(a) * 40, 22 + Math.sin(a * 0.7) * 3, -40 + Math.cos(a) * 60);
    cam.lookAt(0, 6, -70);
    cam.fov = 60; cam.updateProjectionMatrix();
    this.effects.update(dt, cam.position, null, this.world);
    this.pipeline.updateShadowFocus(new THREE.Vector3(0, 0, -60));
    this.weapons.vm.visible = false;
  }

  /** One simulation step (also used by automated tests through advance()). */
  simulate(realDt) {
    let scale = this.timeScale;
    if (this.slowMo) {
      this.slowMo.t -= realDt;
      const k = Math.max(0, this.slowMo.t / this.slowMo.total);
      scale *= this.slowMo.scale + (1 - this.slowMo.scale) * (1 - k * k);
      if (this.slowMo.t <= 0) this.slowMo = null;
    }
    if (this.state === 'dead') scale *= 0.3;
    const dt = realDt * scale;
    this.time += dt;
    this.stats.elapsed = (this.stats.elapsed || 0) + dt;

    for (let i = this.timers.length - 1; i >= 0; i--) {
      const t = this.timers[i];
      t.t -= dt;
      if (t.t <= 0) { this.timers.splice(i, 1); t.fn(); }
    }
    const input = this.input;
    if (this.state === 'playing') {
      this.player.update(dt, input, this.settings.get('sensitivity'), this.settings.get('invertY'));
      this.weapons.update(dt, input);
      this.updateInteraction(input);
    }
    this.mission.update(dt);
    for (const a of this.actors) if (!a.isPlayer) a.update(dt);
    this.squad.update(dt);
    this.dialogue.update(dt);
    this.combat.updateGrenades(dt);

    const cam = this.pipeline.camera;
    this.player.updateCamera(cam, realDt, this.settings.get('fov'));
    this.effects.update(dt, cam.position, this.player.vel, this.world);
    const fwd = this.player.forward;
    this.audio.setListener(cam.position, fwd, new THREE.Vector3(0, 1, 0).applyQuaternion(cam.quaternion));
    this.audio.updateDistantBattle(dt);
    const indoor = this.city.indoorRects.some((r) => this.player.pos.x > r.x0 && this.player.pos.x < r.x1 && this.player.pos.z > r.z0 && this.player.pos.z < r.z1);
    if (indoor !== this._indoor && !this.player.mount) {
      this._indoor = indoor;
      this.audio.setAmbience(indoor ? { wind: 0.015, rain: 0.012 } : { wind: 0.07, rain: 0.045 });
      if (this.audio.reverbSend) this.audio.reverbSend.gain.value = indoor ? 0.9 : 0.55;
    }
    if (this.city.rackMat) this.city.rackMat.emissiveIntensity = 0.75 + Math.sin(this.time * 7) * 0.15;
    if (this.player.health < 30 && this.player.alive) {
      this._hb = (this._hb || 0) - dt;
      if (this._hb <= 0) { this._hb = 0.9; this.audio.playHeartbeat(1 - this.player.health / 30); }
    }
    const focus = this.player.mount ? this.mission.heli.position : this.player.pos.clone().addScaledVector(fwd.clone().setY(0).normalize(), 12);
    this.pipeline.updateShadowFocus(focus);
    // viewmodel light follows the view
    const inv = cam.quaternion.clone().invert();
    this.pipeline.vmSun.position.copy(this.pipeline.sunDir).applyQuaternion(inv);
    this.hud.update(realDt);
    this.fade.update(realDt);
    input.endFrame();
  }

  updateInteraction(input) {
    const p = this.player;
    if (p.mount) { this.hud.setPrompt(null); return; }
    const eye = p.getEye(new THREE.Vector3());
    let best = null, bestD = Infinity;
    for (const it of this.interactables) {
      if (!this.mission.interactAllowed(it)) continue;
      const d = Math.hypot(it.x - eye.x, it.y - eye.y, it.z - eye.z);
      if (d > it.radius + 0.6 || d >= bestD) continue;
      const dir = new THREE.Vector3(it.x - eye.x, it.y - eye.y, it.z - eye.z).normalize();
      if (dir.dot(p.forward) < 0.45 && d > 1.2) continue;
      best = it; bestD = d;
    }
    const pick = this.pickups.nearest(eye, p.forward, p.pos);
    if (pick && !best) { // mission objectives take priority over weapons on the ground
      this.hud.setPrompt(this.pickups.promptFor(pick));
      if (input.actionPressed('interact')) this.pickups.take(pick);
      return;
    }
    this.hud.setPrompt(best ? best.prompt : null);
    if (best && input.actionPressed('interact')) {
      if (best.kind === 'ammo') { this.weapons.refillAmmo(); this.hud.toast('Munição reabastecida'); }
      else this.mission.onInteract(best);
    }
  }

  render(dt) {
    const p = this.player;
    const dmg = this.state === 'playing' || this.state === 'dead' ? Math.max(0, 1 - p.health / p.maxHealth) : 0;
    this.pipeline.render(dt, { damage: dmg * dmg * 0.8 });
  }

  // ------------------------------------------------------------ test helpers
  /** Advance the simulation by `seconds` without rendering (automated tests). */
  advance(seconds, step = 1 / 30) {
    let t = 0;
    while (t < seconds) { this.simulate(step); t += step; }
  }
}

/** Full-screen fade overlay driven in real time. */
class Fade {
  constructor(el) { this.el = el; this.v = 0; this.target = 0; this.speed = 1; }
  set(v) { this.v = this.target = v; this.el.style.opacity = v; }
  to(v, dur) { this.target = v; this.speed = Math.abs(v - this.v) / Math.max(0.01, dur); }
  update(dt) {
    if (this.v === this.target) return;
    const d = this.target - this.v;
    const step = this.speed * dt;
    this.v = Math.abs(d) <= step ? this.target : this.v + Math.sign(d) * step;
    this.el.style.opacity = this.v.toFixed(3);
  }
}
