import * as THREE from 'three';
import { MissionBase, setTimeoutGame } from './MissionBase.js';
import { VALLEY, VILLAGE, roadZ, terrainHeight } from '../world/valleyLayout.js';
import { Truck, ConvoyTruck } from '../ai/Vehicles.js';
import { DoorGunner } from '../player/DoorGunner.js';

/**
 * MISSION 6 — "COMBOIO"
 * Dusk in the Kessel valley. The team escorts the recording to FOB Bastião in a
 * three-truck convoy; the player mans the heavy machine gun on the lead truck
 * through two ambushes, then the convoy is stopped by a burning roadblock in the
 * village of Dravik: clear the village, blow the roadblock, hold the counterattack.
 */
export const MISSION6_ID = 'm06';
const PI = Math.PI;
const SPACING = 17;

const CHECKPOINTS = {
  start: 'Vale de Kessel — comboio',
  m6_ride2: 'Vale de Kessel — desfiladeiro',
  m6_village: 'Vila de Dravik',
  m6_charge: 'Bloqueio da estrada',
};

const RIDE_FROM = -3480;
const STOP_X = VILLAGE.convoyStop[0];

/** Hostile riflemen on the valley sides for each ride ambush (terrain positions). */
function slopeWave(id, xs, side, kinds) {
  const enemies = [];
  xs.forEach((x, i) => {
    const z = roadZ(x) + side * (38 + (i % 3) * 9);
    enemies.push({ x, z, y: terrainHeight(x, z), static: true, kind: kinds[i % kinds.length], id: `${id}${i}` });
  });
  return { id, zone: null, enemies };
}

const RZ = (x) => roadZ(x);
const WAVES = [
  null, // ambush 1 (built at runtime)
  null, // ambush 2 (RPG ridge, runtime)
  {
    id: 'village', zone: { x0: -2520, x1: -2378, z0: -228, z1: -138 }, faceYaw: -PI / 2,
    enemies: [
      { x: -2485.1, y: 11.05, z: -200.4, static: true, face: [-1, 0.3], kind: 'sniper' },
      { x: -2443, z: -176 }, { x: -2472, z: -185, kind: 'smg' }, { x: -2485, z: -190 }, { x: -2460, z: RZ(-2460) + 4, kind: 'shotgun' },
      { x: -2430, z: RZ(-2430) - 3, kind: 'mg' }, { x: -2440, z: -215 }, { x: -2410, z: -175, kind: 'smg' },
      { x: -2398, z: -182 }, { x: -2450, z: -150 }, { x: -2490, z: -160 }, { x: -2420, z: -188 },
    ],
  },
  {
    id: 'counter', zone: { x0: -2520, x1: -2378, z0: -228, z1: -138 }, faceYaw: -PI / 2,
    enemies: [
      { x: -2382, z: RZ(-2382) + 2, delay: 2, rush: true }, { x: -2382, z: RZ(-2382) - 2, delay: 4, kind: 'smg' },
      { x: -2430, z: -228, delay: 6 }, { x: -2470, z: -228, delay: 8, kind: 'shotgun' }, { x: -2382, z: RZ(-2382), delay: 11, kind: 'mg' },
      { x: -2440, z: -140, delay: 13 }, { x: -2400, z: -140, delay: 15, kind: 'smg' }, { x: -2455, z: -228, delay: 18 },
      { x: -2382, z: RZ(-2382) + 3, delay: 21, rush: true },
    ],
  },
];

/** Road polyline on the terrain from `x0` to `x1`. */
function roadPath(x0, x1, step = 15) {
  const pts = [];
  const dir = Math.sign(x1 - x0);
  for (let x = x0; dir > 0 ? x <= x1 : x >= x1; x += step * dir) pts.push(new THREE.Vector3(x, terrainHeight(x, roadZ(x)) + 0.1, roadZ(x)));
  if (pts[pts.length - 1].x !== x1) pts.push(new THREE.Vector3(x1, terrainHeight(x1, roadZ(x1)) + 0.1, roadZ(x1)));
  return pts;
}

export class Mission06 extends MissionBase {
  constructor(game) {
    super(game, MISSION6_ID, { waves: WAVES, checkpoints: CHECKPOINTS, title: 'Comboio' });
    this.number = 6;
    this.completeText = {
      top: 'MISSÃO 6 CONCLUÍDA', main: 'COMBOIO',
      body: 'Dravik está livre e a estrada para a fronteira aberta. O Major Hale espera a equipe em FOB Bastião, a última base que ainda responde ao Comando.<br>Pela primeira vez em dias, parece que alguém do lado certo está ouvindo.<br><b>A seguir: Missão 7 — Queda.</b>',
    };
    this.gunner = new DoorGunner(game, { heightAt: terrainHeight, style: 'hmg' });
    this.convoy = [];
    this.hostiles = [];
    this.rockets = [];
    this.colliders = [];
  }

  exit() {
    const g = this.game;
    this.gunner.setActive(false);
    g.player.mount = null;
    for (const t of this.convoy) t.dispose();
    this.convoy = [];
    for (const b of this.colliders) g.world.removeBox(b);
    this.colliders = [];
    const rb = g.city.namedProps.roadblock;
    rb.group.visible = false;
    if (rb.box) { g.world.removeBox(rb.box); rb.box = null; }
    if (rb.fires) { for (const f of rb.fires) g.effects.removeEmitter(f); rb.fires = null; }
    this.rockets = [];
    this.engine?.stop(); this.engine = null;
  }

  start(checkpoint = 'start') {
    const g = this.game, p = g.player;
    this.resetWorld();
    this.exit();
    g.pipeline.setNightVision(false);
    g.setRegion('village');
    this.checkpoint = checkpoint;
    const tod = g.pipeline.setTimeOfDay('dusk');
    g.effects.rainIntensity = tod.rain * 0.4;
    g.mats.setNightLights(1.2);
    this.hostiles = [];
    this._a1done = checkpoint === 'm6_ride2'; this._a2done = false; this.rpg = null; this._rocketAt = 0;
    this.spawnSquad(['kane', 'ruiz', 'okafor']);
    g.hud.setCombatHud(true);
    g.audio.setMusicIntensity(0.3);
    g.audio.battleIntensity = 0.4;

    // the convoy (lead truck carries the heavy machine gun)
    const path = roadPath(RIDE_FROM, STOP_X);
    this.convoy = [0, 1, 2].map((i) => new ConvoyTruck(g, path, { turret: i === 0, color: [0x4b5236, 0x454b34, 0x50553b][i], heightAt: terrainHeight }));
    this.pathLen = this.convoy[0].length;
    // roadblock (visible and solid in this mission only) + parked trucks as cover in the village
    const rb = g.city.namedProps.roadblock;
    rb.group.visible = true;
    rb.box = g.world.addBox(rb.x - 4, 0, rb.z - 6.5, rb.x + 4.5, 2.6, rb.z + 6.5, { tag: 'car', cover: true, surface: 'metal' });
    rb.fires = [g.effects.addFire({ x: rb.x, y: 1.2, z: rb.z - 2.4 }, 1.4, true), g.effects.addFire({ x: rb.x + 2.2, y: 1.0, z: rb.z + 2.6 }, 1.1, false)];
    for (const x of VILLAGE.convoyStop.slice(0, 2)) { const z = roadZ(x); this.colliders.push(g.world.addBox(x - 3.6, 0, z - 1.6, x + 3.6, 2.9, z + 1.6, { tag: 'car', cover: true, surface: 'metal' })); }
    g.nav.rebuild();
    g.pickups.add({ weaponId: 'kr4', position: new THREE.Vector3(-2516, 1.03, -176.4), yaw: 0.3 });
    g.pickups.add({ weaponId: 'sr50', position: new THREE.Vector3(-2455, 0.6, -186.6), yaw: 1.2 });

    if (checkpoint === 'start' || checkpoint === 'm6_ride2') {
      this._setupRide(checkpoint === 'm6_ride2');
    } else {
      this._parkConvoy();
      this.markWavesDone([0, 1]);
      this.placeSquad([[-2526, roadZ(-2526) + 3], [-2524, roadZ(-2524) - 3], [-2530, roadZ(-2530) + 4]], PI / 2);
      g.weapons.setLowered(false);
      if (checkpoint === 'm6_village') {
        p.reset(new THREE.Vector3(-2527, 0, roadZ(-2527) + 2.5), -PI / 2);
        this.spawnWave(2);
        this._startVillage(true);
      } else {
        p.reset(new THREE.Vector3(-2452, 0, roadZ(-2452) + 3), -PI / 2);
        this.markWavesDone([2]);
        this._startCharge(true);
      }
    }
  }

  // ------------------------------------------------------------ ride
  _setupRide(second) {
    const g = this.game, p = g.player;
    this.stage = 'ride';
    const lead = this.convoy[0];
    const d0 = second ? 470 : 2 * SPACING + 4;
    this.convoy.forEach((t, i) => { t.dist = Math.max(0, d0 - i * SPACING); t.target = t.dist; t.speed = 0; t._place(); });
    lead.target = this.pathLen;
    this.ambush = second ? 1 : 0;
    // squad rides in the trucks
    for (const s of g.squad.members) { s.scripted = true; s.model.root.visible = false; }
    p.reset(new THREE.Vector3(), 0);
    p.setMount(lead.root, new THREE.Vector3(0, 3.75, 1.15), { yawLimit: PI * 0.97, pitchLimit: 0.5, pitchMin: -0.55, baseYaw: 0 });
    p.mountPitch = -0.05;
    if (lead.turret) lead.turret.visible = false;
    this.gunner.setActive(true);
    this.engine?.stop();
    this.engine = g.audio.createEngine();
    if (this.engine) { this.engine.setRPM(0.3); this.engine.setVolume(0.5, 1); }
    g.fade.set(1); g.fade.to(0, 2.5);
    if (!second) {
      this.markWavesDone([]);
      this.schedule(1.5, () => g.hud.titleCard(['OPERATION: IRON SHADOW', 'MISSÃO 6 — COMBOIO', 'Vale de Kessel · 18 de março de 2029 · 18:05', 'Escolta da prova para FOB Bastião'], 7000));
      g.dialogue.sequence([
        { speaker: 'HALE', radio: true, text: 'Equipe Iron, aqui é o Major Hale, FOB Bastião. Ouvi a gravação. Se for verdade, a coalizão inteira foi enganada.', gap: 0.6 },
        { speaker: 'KANE', radio: true, text: 'É verdade, major. E o Serrat sabe que ela existe.' },
        { speaker: 'HALE', radio: true, text: 'Então tragam-na até mim. Bastião fica do outro lado do vale. Estrada única, sem cobertura aérea.' },
        { speaker: 'OKAFOR', radio: true, text: 'Capitão, a Bigorna no teto é sua. Calibre pesado, cuidado com o aquecimento do cano.' },
      ]);
      this.schedule(10, () => g.hud.toast('Botão esquerdo: metralhadora pesada · mova o mouse para girar a torreta', 5000));
      g.hud.setObjective('Proteja o comboio até FOB Bastião', null);
    } else {
      this.markWavesDone([0]);
      g.hud.setObjective('Proteja o comboio no desfiladeiro', null);
      g.dialogue.say({ speaker: 'KANE', radio: true, text: 'Desfiladeiro à frente. Lugar perfeito para uma emboscada. Olhos nas encostas.' });
    }
  }

  /** First ambush: technicals on the road ahead + riflemen on the north slope. */
  _ambush1() {
    const g = this.game;
    this.ambush = 1;
    this.WAVES[0] = slopeWave('a1_', [-3230, -3215, -3200, -3185, -3170, -3150], -1, ['rifleman', 'mg', 'rifleman']);
    this.spawnWave(0, true);
    this._spawnTechnicals([-3080, -3060], -3190);
    this.convoy[0].target = this.convoy[0].dist + 70; // creep forward
    this.convoy[0].maxSpeed = 4;
    g.audio.setMusicIntensity(1); g.audio.battleIntensity = 1;
    g.hud.setObjective('Destrua os veículos armados à frente', null);
    g.dialogue.sequence([
      { speaker: 'RUIZ', radio: true, text: 'Técnicos na estrada, doze horas! E atiradores na encosta à esquerda!' },
      { speaker: 'KANE', radio: true, text: 'Não paramos! Capitão, limpa a estrada!' },
    ]);
  }

  /** Second ambush in the gorge: RPG team on the south ridge, a technical from behind. */
  _ambush2() {
    const g = this.game;
    this.ambush = 2;
    const xs = [-2880, -2870, -2860, -2845, -2830];
    this.WAVES[1] = slopeWave('a2_', xs, 1, ['rifleman', 'rifleman', 'mg']);
    const list = this.spawnWave(1, true);
    this.rpg = list.filter((s, i) => i % 2 === 0);
    for (const s of this.rpg) s.rpgCool = 2 + Math.random() * 2;
    this._spawnTechnicals([-3150], -2990, true);
    this.convoy[0].target = this.convoy[0].dist + 60;
    this.convoy[0].maxSpeed = 4;
    g.audio.setMusicIntensity(1);
    g.hud.setObjective('Elimine a equipe de foguetes na crista à direita', null);
    g.dialogue.sequence([
      { speaker: 'OKAFOR', radio: true, text: 'Lançadores de foguete na crista à direita!' },
      { speaker: 'RUIZ', radio: true, text: 'Técnico vindo por trás!', gap: 2 },
    ]);
    this._rocketAt = this.t + 2.2; // the first rocket hits the last truck
  }

  _spawnTechnicals(xs, stopX, fromBehind = false) {
    const g = this.game;
    xs.forEach((x, i) => {
      const path = roadPath(x, stopX - (fromBehind ? 0 : i * 18) * Math.sign(x - stopX) * -1, 12);
      const t = new Truck(g, path, { speed: fromBehind ? 13 : 9, delay: i * 2, color: 0x6a5a3e });
      t.killText = 'TÉCNICO DESTRUÍDO';
      t.health = t.maxHealth = 520;
      const gun = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.4, 8), g.mats.darkMetal());
      gun.rotation.x = PI / 2; gun.position.set(0, 3.2, -1.0); t.root.add(gun);
      t.gunCool = 2 + i;
      g.actors.push(t);
      this.hostiles.push(t);
    });
  }

  _fireRocket(from, target, hitsTruck = null) {
    const g = this.game;
    const dir = target.clone().sub(from);
    const len = dir.length();
    this.rockets.push({ pos: from.clone(), vel: dir.normalize().multiplyScalar(55), left: len / 55, target, hitsTruck });
    g.audio.playShot(from, 'shotgun', false);
    g.effects.smoke.spawn({ x: from.x, y: from.y, z: from.z, life: 2, size: 1, endSize: 4, color: [0.6, 0.6, 0.6], alpha: 0.6, drag: 1.5 });
  }

  _destroyTruck(t) {
    const g = this.game;
    if (t.destroyed) return;
    t.destroyed = true;
    t.target = t.dist; t.speed = 0;
    t.root.traverse((o) => { if (o.isMesh) o.material = g.mats.burned(); });
    t.fire = g.effects.addFire({ x: t.pos.x, y: t.pos.y + 1.2, z: t.pos.z }, 1.5, true);
  }

  _parkConvoy() {
    const lead = this.convoy[0];
    this.convoy.forEach((t, i) => { t.dist = this.pathLen - i * SPACING; t.target = t.dist; t.speed = 0; t._place(); });
    lead.root.updateMatrixWorld(true);
  }

  _arriveVillage() {
    const g = this.game, p = g.player;
    this.stage = 'arrive';
    this.gunner.setActive(false);
    if (this.convoy[0].turret) this.convoy[0].turret.visible = true;
    this.engine?.setVolume(0.08, 1.5);
    g.dialogue.sequence([
      { speaker: 'KANE', radio: true, text: 'Estrada bloqueada! Caminhões em chamas atravessados na vila!' },
      { speaker: 'HALE', radio: true, text: 'Dravik estava limpa há uma hora. Alguém sabia exatamente por onde vocês passariam.' },
    ]);
    g.fade.to(1, 0.6);
    setTimeoutGame(g, 0.7, () => {
      p.mount = null;
      p.reset(new THREE.Vector3(-2527, 0, roadZ(-2527) + 2.5), -PI / 2);
      g.weapons.setLowered(false);
      for (const s of g.squad.members) { s.scripted = false; s.model.root.visible = true; }
      this.placeSquad([[-2526, roadZ(-2526) + 3], [-2524, roadZ(-2524) - 3], [-2530, roadZ(-2530) + 4]], PI / 2);
      for (const h of this.hostiles) h.alive = false;
      for (const i of [0, 1]) for (const s of this.waves[i]?.soldiers || []) { s.alive = false; s.model.root.visible = false; }
      this.markWavesDone([0, 1]);
      this.spawnWave(2);
      g.fade.to(0, 0.8);
      this._startVillage(false);
      this.saveCheckpoint('m6_village');
    });
  }

  // ------------------------------------------------------------ village
  _startVillage(fromCheckpoint) {
    const g = this.game;
    this.stage = 'village';
    this.activateWave(2);
    g.squad.setAnchor(-2500, roadZ(-2500), { radius: 9, facing: -PI / 2, combat: true });
    g.hud.setObjective('Tome a vila de Dravik', new THREE.Vector3(-2455, 1.5, -186));
    g.audio.setMusicIntensity(1);
    g.dialogue.say({ speaker: fromCheckpoint ? 'KANE' : 'RUIZ', text: fromCheckpoint ? 'Pela vila! Cuidado com a torre da igreja!' : 'Atirador na torre da igreja! Todos para trás das casas!' });
    this._villageProgress = 0;
  }

  _startCharge(fromCheckpoint) {
    const g = this.game;
    this.stage = 'charge';
    g.squad.setAnchor(-2455, roadZ(-2455), { radius: 7, facing: -PI / 2, combat: false });
    const rb = g.city.namedProps.roadblock;
    g.hud.setObjective('Plante a carga no bloqueio da estrada', new THREE.Vector3(rb.x - 2.4, 1.2, rb.z));
    g.audio.setMusicIntensity(0.35);
    if (!fromCheckpoint) {
      g.dialogue.say({ speaker: 'KANE', text: 'Vila limpa! Okafor, a carga. Capitão, coloque no caminhão da frente.' });
      setTimeoutGame(g, 1, () => this.saveCheckpoint('m6_charge'));
    }
  }

  _plantCharge() {
    const g = this.game;
    this.stage = 'hold';
    this.chargeT = 30;
    this.spawnWave(3);
    this.activateWave(3);
    g.audio.playFoley('magIn');
    g.hud.setProgress(0);
    g.squad.setAnchor(-2462, roadZ(-2462), { radius: 9, facing: -PI / 2, combat: true });
    g.hud.setObjective('Afaste-se e segure a posição até a detonação', new THREE.Vector3(-2470, 1.5, -188));
    g.audio.setMusicIntensity(1);
    g.dialogue.sequence([
      { speaker: 'OKAFOR', text: 'Carga armada! Trinta segundos!' },
      { speaker: 'RUIZ', text: 'Reforços do leste e pelos campos ao norte!', gap: 1.5 },
    ]);
  }

  _detonate() {
    const g = this.game, rb = g.city.namedProps.roadblock;
    this.stage = 'clear';
    g.hud.setProgress(null);
    g.effects.explosion(new THREE.Vector3(rb.x, 1.5, rb.z), 3);
    g.audio.playExplosion(new THREE.Vector3(rb.x, 1.5, rb.z), 2.5);
    g.player.addTrauma(0.6);
    const d = g.player.pos.distanceTo(new THREE.Vector3(rb.x, 0, rb.z));
    if (d < 9) g.player.takeDamage((9 - d) * 12, new THREE.Vector3(rb.x, 1, rb.z));
    // the wrecks are blown off the road
    rb.group.children.forEach((t, i) => { t.position.z += (i ? 6 : -7); t.rotation.y += i ? 0.8 : -0.7; t.rotation.z = i ? 0.4 : -0.3; });
    if (rb.box) { g.world.removeBox(rb.box); rb.box = null; g.nav.rebuild(); }
    g.hud.setObjective('Elimine os últimos atacantes', null);
    g.dialogue.say({ speaker: 'KANE', text: 'Estrada aberta! Acabem com eles!' });
  }

  _finish() {
    const g = this.game;
    this.stage = 'ending';
    g.hud.setObjective(null);
    g.audio.setMusicIntensity(0.25);
    g.dialogue.sequence([
      { speaker: 'KANE', text: 'Dravik está limpa. Todos inteiros?' },
      { speaker: 'OKAFOR', text: 'A prova está segura, sargento. Três cópias, em três lugares diferentes.' },
      { speaker: 'HALE', radio: true, text: 'Bom trabalho, Iron. Minha equipe espera vocês no portão de Bastião. Ninguém mais precisa saber da rota.' },
      { speaker: 'RUIZ', text: 'Ninguém mais... Como o Vértice sabia da nossa rota, então?', onDone: () => { g.fade.to(1, 2.5); setTimeoutGame(g, 2.8, () => g.completeMission()); } },
    ]);
  }

  onInteract(it) {
    if (it.id === 'roadblockCharge' && this.stage === 'charge') { this._plantCharge(); return true; }
    return false;
  }
  interactAllowed(it) {
    if (it.id === 'roadblockCharge') return this.stage === 'charge';
    return it.kind === 'ammo';
  }

  // ------------------------------------------------------------ update
  _updateTechnicals(dt) {
    const g = this.game, p = g.player;
    for (const t of this.hostiles) {
      if (!t.alive || t.delay > 0) continue;
      const d = t.pos.distanceTo(p.pos);
      if (d > 170) continue;
      t.gunCool -= dt;
      if (t.gunCool > 0) continue;
      t.burst = t.burst > 0 ? t.burst - 1 : 7;
      t.gunCool = t.burst > 0 ? 0.11 : 1.6 + Math.random() * 1.2;
      const muzzle = new THREE.Vector3(0, 3.2, 0.2).applyMatrix4(t.root.matrixWorld);
      const aim = p.getAimPoint(new THREE.Vector3()).add(new THREE.Vector3((Math.random() - 0.5) * 3, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 3).multiplyScalar(Math.min(1, d / 40)));
      const dir = aim.sub(muzzle).normalize();
      const res = g.combat.fireHitscan(t, muzzle, dir, { damage: 7, range: 260, headMultiplier: 1, falloffStart: 40, falloffEnd: 200, minDamageScale: 0.6 }, { damageScale: g.difficulty.enemyDamage });
      g.effects.muzzleFlash(muzzle, dir, 1, Math.random() < 0.4);
      if (Math.random() < 0.5) g.effects.tracer(muzzle.clone(), res.point.clone(), 330);
      g.audio.playShot(muzzle, 'mg', false);
    }
  }

  _updateRockets(dt) {
    const g = this.game, p = g.player;
    // RPG gunners fire while alive
    if (this.stage === 'ride' && this.rpg) {
      for (const s of this.rpg) {
        if (!s.alive) continue;
        s.rpgCool -= dt;
        if (s.rpgCool > 0) continue;
        s.rpgCool = 5 + Math.random() * 2.5;
        const lead = this.convoy[0];
        const miss = new THREE.Vector3((Math.random() - 0.5) * 9, Math.random() * 3, (Math.random() - 0.5) * 9);
        this._fireRocket(s.getEye(new THREE.Vector3()), lead.pos.clone().add(new THREE.Vector3(0, 2.4, 0)).add(miss));
      }
      if (this._rocketAt && this.t >= this._rocketAt) {
        this._rocketAt = 0;
        const last = this.convoy[2], s = this.rpg.find((x) => x.alive) || this.rpg[0];
        this._fireRocket(s.getEye(new THREE.Vector3()), last.pos.clone().add(new THREE.Vector3(0, 1.8, 0)), last);
      }
    }
    for (let i = this.rockets.length - 1; i >= 0; i--) {
      const r = this.rockets[i];
      r.pos.addScaledVector(r.vel, dt);
      r.left -= dt;
      g.effects.smoke.spawn({ x: r.pos.x, y: r.pos.y, z: r.pos.z, life: 1.6, size: 0.4, endSize: 1.6, color: [0.75, 0.74, 0.72], alpha: 0.5, drag: 2 });
      g.effects.flashes.spawn({ x: r.pos.x, y: r.pos.y, z: r.pos.z, life: 0.05, size: 0.5, endSize: 0.3, color: [1, 0.7, 0.3], alpha: 1, fadeIn: 0 });
      if (r.left > 0) continue;
      this.rockets.splice(i, 1);
      g.effects.explosion(r.pos, 1.4);
      g.audio.playExplosion(r.pos, 1.3);
      const d = r.pos.distanceTo(p.camPos);
      if (d < 7) { p.takeDamage((7 - d) * 9 * g.difficulty.enemyDamage, r.pos); p.addTrauma(0.5); }
      else if (d < 25) p.addTrauma(0.2);
      if (r.hitsTruck) {
        this._destroyTruck(r.hitsTruck);
        g.dialogue.say({ speaker: 'KANE', radio: true, text: 'Comboio três atingido! Briggs, saiam daí! ...Iron, eles estão bem, seguimos com dois!' });
      }
    }
  }

  update(dt) {
    const g = this.game, p = g.player;
    const activeIdx = { village: 2, hold: 3, clear: 3 }[this.stage] ?? null;
    this.updateCommon(dt, activeIdx);
    this._updateRockets(dt);
    if (this.stage === 'ride' || this.stage === 'arrive') {
      const lead = this.convoy[0];
      for (const t of this.convoy) {
        if (t !== lead && !t.destroyed) t.target = Math.max(t.target, lead.dist - this.convoy.indexOf(t) * SPACING);
        t.update(dt);
      }
      for (const h of this.hostiles) h.update?.(dt);
      for (const s of g.squad.members) if (s.scripted) s.pos.copy(this.convoy[1].pos).add(new THREE.Vector3(0, 1.2, 0));
      this.engine?.setRPM(0.3 + Math.min(1, lead.speed / 12) * 0.35);
    }
    if (this.stage === 'ride') {
      this.gunner.update(dt, g.input);
      this._updateTechnicals(dt);
      const lead = this.convoy[0];
      if (this.ambush === 0 && lead.dist > 120) this._ambush1();
      if (this.ambush === 1) {
        const techs = this.hostiles.filter((h) => h.alive);
        const w = this.waves[0];
        const infantryLeft = w ? w.soldiers.filter((s) => s.alive).length : 0;
        if (!techs.length && infantryLeft <= 2 && !this._a1done) {
          this._a1done = true;
          lead.maxSpeed = 12; lead.target = this.pathLen;
          for (const s of w?.soldiers || []) if (s.alive) s.alive = false, s.model.root.visible = false;
          g.hud.setObjective('Proteja o comboio até FOB Bastião', null);
          g.dialogue.say({ speaker: 'KANE', radio: true, text: 'Estrada livre! Seguindo, seguindo!' });
          setTimeoutGame(g, 2, () => this.saveCheckpoint('m6_ride2'));
        }
        if (this._a1done && lead.dist > 560) this._ambush2();
      }
      if (this.ambush === 2) {
        const rpgLeft = this.rpg.filter((s) => s.alive).length;
        const techs = this.hostiles.filter((h) => h.alive);
        if (!rpgLeft && !techs.length && !this._a2done) {
          this._a2done = true;
          lead.maxSpeed = 12; lead.target = this.pathLen;
          for (const s of this.waves[1]?.soldiers || []) if (s.alive) s.alive = false, s.model.root.visible = false;
          g.hud.setObjective('Proteja o comboio até FOB Bastião', null);
          g.dialogue.say({ speaker: 'OKAFOR', radio: true, text: 'Crista limpa! Dravik logo à frente, depois é a fronteira.' });
        }
      }
      if (lead.dist >= this.pathLen - 0.3 && lead.speed < 0.2) this._arriveVillage();
    }
    switch (this.stage) {
      case 'village': {
        const w = this.waves[2];
        if (w) {
          const left = w.soldiers.filter((s) => s.alive).length;
          if (left <= 7 && this._villageProgress === 0) { this._villageProgress = 1; g.squad.setAnchor(-2470, roadZ(-2470), { radius: 9, facing: -PI / 2, combat: true }); }
          if (left <= 3 && this._villageProgress === 1) { this._villageProgress = 2; g.squad.setAnchor(-2448, roadZ(-2448), { radius: 9, facing: -PI / 2, combat: true }); }
        }
        if (this.waveCleared(2)) this._startCharge(false);
        break;
      }
      case 'hold':
        this.chargeT -= dt;
        g.hud.setProgress(1 - Math.max(0, this.chargeT) / 30);
        if (this.chargeT <= 0) this._detonate();
        break;
      case 'clear':
        if (this.waveCleared(3)) this._finish();
        break;
    }
  }
}
