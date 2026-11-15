import * as THREE from 'three';
import { MissionBase, setTimeoutGame } from './MissionBase.js';
import { buildHelicopter, HelicopterController, SEATS, CABIN } from '../world/Helicopter.js';
import { SoldierModel, APPEARANCE } from '../characters/SoldierModel.js';
import { VALLEY, roadZ, terrainHeight } from '../world/valleyLayout.js';
import { Truck, AAGun } from '../ai/Vehicles.js';
import { DoorGunner } from '../player/DoorGunner.js';

/**
 * MISSION 4 — "CÉU CINZENTO"
 * The squad, now without official support, flies with Falcon 2-1 up the Kessel
 * valley. The player mans the door gun to knock out three AA batteries and a
 * convoy, then the team lands at VÉRTICE's radar base to find Serrat — who escapes
 * by jet.
 */
export const MISSION4_ID = 'm04';
const PI = Math.PI;
const CRUISE = 46; // metres above the valley floor
const SPEED = 24;

const CHECKPOINTS = {
  start: 'Vale de Kessel — voo de ataque',
  m4_aa2: 'Vale de Kessel — segunda bateria',
  m4_base: 'Base de radar de Kessel',
  m4_control: 'Centro de controle',
};

/** Ground positions on the terrain for the valley defenders. */
function valleyWave() {
  const list = [];
  for (const aa of VALLEY.aa) {
    const z0 = roadZ(aa.x) + 95;
    for (const [dx, dz, kind] of [[-9, -6, 'rifleman'], [8, -7, 'mg'], [-3, 9, 'rifleman'], [12, 6, 'rifleman']]) {
      const x = aa.x + dx, z = z0 + dz;
      list.push({ x, z, y: terrainHeight(x, z), static: true, kind });
    }
  }
  for (const x of [-3300, -2850, -2400, -2050]) {
    const z = roadZ(x) + 14;
    list.push({ x, z, y: terrainHeight(x, z), static: true, kind: 'rifleman' }, { x: x + 6, z: z + 3, y: terrainHeight(x + 6, z + 3), static: true, kind: 'rifleman' });
  }
  return { id: 'valley', zone: null, enemies: list };
}

const WAVES = [
  null, // valley defenders (built at runtime: they stand on the terrain)
  {
    id: 'base1', zone: { x0: -1878, x1: -1722, z0: -73, z1: 73 }, faceYaw: 0,
    enemies: [
      { x: -1808, z: 10.8 }, { x: -1786, z: -13.2, kind: 'mg' }, { x: -1771.4, z: -30 }, { x: -1822, z: -19.4, kind: 'smg' },
      { x: -1796, z: 0.6 }, { x: -1840, z: -2.2, kind: 'shotgun' }, { x: -1752, z: 0.5 }, { x: -1806, z: -41.2 },
      { x: -1850, y: 4.2, z: 34.6, static: true, face: [0, 1] },
    ],
  },
  {
    id: 'base2', zone: { x0: -1878, x1: -1722, z0: -73, z1: 73 }, faceYaw: 0,
    enemies: [
      { x: -1846, z: -50, delay: 2 }, { x: -1846, z: -48, delay: 4, kind: 'smg' }, { x: -1800, z: -70, delay: 6 },
      { x: -1790, z: -70, delay: 8, kind: 'shotgun' }, { x: -1846, z: -46, delay: 11 }, { x: -1805, z: -70, delay: 14, kind: 'smg' },
      { x: -1795, z: -70, delay: 18 }, { x: -1846, z: -44, delay: 22, kind: 'mg' },
    ],
  },
];

/** Flight path along the valley with hover holds facing each AA battery. */
function buildFlight() {
  const keys = [];
  let t = 0, prev = null;
  const holds = {};
  const push = (x, y, z, yaw, extra = {}) => {
    if (prev) t += Math.hypot(x - prev.x, y - prev.y, z - prev.z) / (extra.speed || SPEED);
    const k = { t, x, y, z, yaw, pitch: extra.pitch ?? 0.07, roll: extra.roll ?? 0 };
    keys.push(k); prev = k;
    return k;
  };
  const yawAt = (x) => { const dz = roadZ(x + 10) - roadZ(x - 10); return Math.atan2(20, dz); };
  const aaXs = VALLEY.aa.map((a) => a.x);
  let x = -3520;
  push(x, terrainHeight(x, roadZ(x)) + CRUISE, roadZ(x), yawAt(x));
  while (x < -1960) {
    x += 70;
    const near = aaXs.find((ax) => Math.abs(x - (ax - 150)) < 35 && !holds[ax]);
    if (near !== undefined) {
      // hover point: left door (+z side when heading east) faces the battery
      const hx = near - 150, hz = roadZ(hx) + 20;
      const az = roadZ(near) + 95;
      const yaw = Math.atan2(az - hz, -(near - hx));
      const k = push(hx, terrainHeight(hx, hz) + CRUISE - 8, hz, yaw, { pitch: -0.03, speed: SPEED * 0.6 });
      holds[near] = k.t;
      continue;
    }
    const z = roadZ(x);
    push(x, Math.max(terrainHeight(x, z), terrainHeight(x, z + 40)) + CRUISE, z, yawAt(x), { roll: Math.sin(x / 120) * 0.08 });
  }
  const L = VALLEY.lz;
  push(-1890, 42, 30, PI / 2, { pitch: -0.05 });
  push(-1830, 20, 40, PI / 2 + 0.4, { pitch: -0.12, speed: 14 });
  push(L.x - 4, 6, L.z, PI, { pitch: -0.1, speed: 9 });
  push(L.x, 1.5, L.z, PI, { pitch: -0.03, speed: 4 });
  push(L.x, 0, L.z, PI, { pitch: 0, speed: 2 });
  return { keys, holds: VALLEY.aa.map((a) => holds[a.x]) };
}

export class Mission04 extends MissionBase {
  constructor(game) {
    super(game, MISSION4_ID, { waves: WAVES, checkpoints: CHECKPOINTS, title: 'Céu Cinzento' });
    this.number = 4;
    this.completeText = {
      top: 'MISSÃO 4 CONCLUÍDA', main: 'CÉU CINZENTO',
      body: 'A base de Kessel caiu — mas Serrat decolou a tempo, rumo a Varna, onde a cúpula da coalizão se reúne amanhã à noite.<br>Sem ordens, sem apoio e com um piloto que acredita neles, a equipe Iron vai atrás dele.<br><b>Continua na Missão 5 — Infiltração Noturna.</b>',
    };
    this.parts = buildHelicopter(game.mats, { interior: true });
    this.parts.root.visible = false;
    game.scene.add(this.parts.root);
    const flight = buildFlight();
    this.flightKeys = flight.keys;
    this.holdTimes = flight.holds;
    this.heli = new HelicopterController(this.parts, this.flightKeys);
    this.pilots = [];
    for (const sx of [-1, 1]) {
      const m = new SoldierModel(game.mats, APPEARANCE.pilot(game.mats));
      m.seatHeight = 0.5;
      m.root.position.set(sx * 0.55, 0.62, 2.2);
      this.parts.body.add(m.root);
      this.pilots.push(m);
    }
    this.gunner = new DoorGunner(game, { heightAt: terrainHeight });
    this.vehicles = [];
  }

  exit() {
    this.gunner.setActive(false);
    this.parts.root.visible = false;
    this.heli.removeColliders(this.game.world);
    this.heliAudio?.stop(); this.heliAudio = null;
    this.game.player.mount = null;
  }

  start(checkpoint = 'start') {
    const g = this.game, p = g.player;
    this.resetWorld();
    for (const v of this.vehicles) v.dispose();
    this.vehicles = [];
    g.setRegion('base');
    this.checkpoint = checkpoint;
    const tod = g.pipeline.setTimeOfDay('overcast');
    g.effects.rainIntensity = tod.rain;
    g.mats.setNightLights(0);
    g.city.baseScreen.material = g.mats.emissive(0x48ff8a, 0.6);
    const jet = g.city.namedProps.jet;
    jet.position.set(VALLEY.runway.x0 + 30, 0, -99); jet.rotation.set(0, PI / 2, 0); jet.visible = true;
    this.jetT = -1;
    this.heliAudio?.stop(); this.heliAudio = null;
    this.heli.removeColliders(g.world);
    this.spawnSquad(['kane', 'ruiz', 'okafor']);
    g.hud.setCombatHud(true);
    g.squad.setCombat(false);
    g.audio.setMusicIntensity(0.3);
    g.audio.battleIntensity = 0.5;
    g.pickups.add({ weaponId: 'lr6', position: new THREE.Vector3(-1812, 1.03, 30), yaw: 0.6 });

    if (checkpoint === 'start' || checkpoint === 'm4_aa2') {
      this._setupFlight(checkpoint === 'm4_aa2' ? 1 : 0);
    } else {
      this.parts.root.visible = false;
      this.gunner.setActive(false);
      g.weapons.setLowered(false);
      this.markWavesDone([0]);
      this.placeSquad([[-1796, 46], [-1786, 44], [-1790, 52]]);
      if (checkpoint === 'm4_base') {
        p.reset(new THREE.Vector3(-1792, 0, 38), 0);
        this.spawnWave(1);
        this._startBase1(true);
      } else {
        p.reset(new THREE.Vector3(-1790, 0, 10), 0);
        this.markWavesDone([1]);
        this.spawnWave(2);
        this._startBase2(true);
      }
    }
  }

  // ------------------------------------------------------------ flight
  _seat(s, seat) {
    s.scripted = true; s.seated = 1; s.model.pose.seated = 1; s.model.seatHeight = 0.45;
    s.attachedSeat = seat;
    this.parts.body.add(s.model.root);
    s.model.root.position.set(seat.x, CABIN.floorY, seat.z);
    s.model.root.rotation.set(0, seat.yaw, 0);
  }

  _setupFlight(fromHold) {
    const g = this.game, p = g.player;
    this.stage = 'flight';
    this.holdIndex = fromHold;
    this.parts.root.visible = true;
    const startT = fromHold ? this.holdTimes[fromHold] - 8 : 0;
    this.heli.setKeys(this.flightKeys, startT);
    this.heli.rpm = 1; this.heli.turbulence = 0.7;
    this.heli.update(0, 0);
    for (const id of ['kane', 'ruiz', 'okafor']) this._seat(this.squadById[id], SEATS[id]);
    // gunner seat at the left door, looking out (left door faces +z when flying east)
    p.reset(new THREE.Vector3(), 0);
    p.setMount(this.parts.body, new THREE.Vector3(-1.05, CABIN.floorY + 1.3, -0.15), { yawLimit: 1.35, pitchLimit: 0.45, pitchMin: -1.1, baseYaw: -PI / 2 });
    p.mountPitch = -0.25;
    this.gunner.setActive(true);
    this.heliAudio = g.audio.createHelicopter();
    if (this.heliAudio) { this.heliAudio.setInside(true); this.heliAudio.setRPM(1); this.heliAudio.setVolume(0.75, 0.5); }
    // valley defenders, AA batteries and the convoy
    this.WAVES[0] = valleyWave();
    this.spawnWave(0, true);
    this.aa = VALLEY.aa.map((a) => {
      const z = roadZ(a.x) + 95;
      const gun = new AAGun(g, new THREE.Vector3(a.x, terrainHeight(a.x, z), z), { id: a.id });
      g.actors.push(gun); this.vehicles.push(gun);
      return gun;
    });
    for (let i = 0; i < fromHold; i++) { this.aa[i].alive = false; this.aa[i].root.visible = false; }
    const path = [];
    for (let x = -2980; x <= -1990; x += 25) { const z = roadZ(x); path.push(new THREE.Vector3(x, terrainHeight(x, z) + 0.1, z)); }
    this.trucks = [0, 1, 2, 3].map((i) => {
      const tr = new Truck(g, path, { speed: 9, delay: i * 2.2, color: [0x4a5038, 0x3f4433, 0x55553f, 0x4a5038][i] });
      g.actors.push(tr); this.vehicles.push(tr);
      return tr;
    });
    g.fade.set(1); g.fade.to(0, 2.5);
    if (!fromHold) {
      this.schedule(1.5, () => g.hud.titleCard(['OPERATION: IRON SHADOW', 'MISSÃO 4 — CÉU CINZENTO', 'Vale de Kessel · 16 de março de 2029 · 10:20', 'Voo não autorizado — Falcon 2-1'], 7000));
      g.dialogue.sequence([
        { speaker: 'FALCON 2-1', radio: true, text: 'Capitão Mercer. Nunca achei que fosse levar a equipe Iron de novo... muito menos sem autorização.', gap: 0.4 },
        { speaker: 'KANE', text: 'Obrigado por vir, Falcon. Ninguém mais na coalizão atende a gente.' },
        { speaker: 'OKAFOR', text: 'A cópia do Kestrel aponta uma base de radar no fim do vale de Kessel. Serrat coordena os voos do Vértice de lá.' },
        { speaker: 'RUIZ', text: 'Baterias antiaéreas ao longo do vale. Sem derrubar as três, a gente não pousa.' },
        { speaker: 'KANE', text: 'Capitão, a metralhadora da porta é sua. Mostra pra eles.' },
      ]);
      this.schedule(9, () => g.hud.toast('Botão esquerdo: metralhadora · cuidado com o superaquecimento', 5000));
    }
    this._objectiveAA();
  }

  _objectiveAA() {
    const left = this.aa.filter((a) => a.alive).length;
    const next = this.aa.find((a) => a.alive);
    this.game.hud.setObjective(left ? `Destrua as baterias antiaéreas (${3 - left}/3)` : 'Siga para a base de Kessel', next ? next.pos.clone().add(new THREE.Vector3(0, 3, 0)) : null);
  }

  _onAADestroyed(i) {
    const g = this.game;
    this._objectiveAA();
    g.dialogue.say({ speaker: 'FALCON 2-1', radio: true, text: ['Bateria um destruída! Seguindo pelo vale.', 'Segunda bateria no chão! Mais uma!', 'Última antiaérea destruída! O céu é nosso!'][i] });
    if (i === 0) setTimeoutGame(g, 3, () => this.saveCheckpoint('m4_aa2'));
    this.heli.playing = true;
  }

  _land() {
    const g = this.game, p = g.player;
    this.stage = 'landed';
    this.heli.playing = false; this.heli.turbulence = 0.1; this.heli.rpm = 0.85;
    this.heliAudio?.setRPM(0.8);
    this.gunner.setActive(false);
    g.fade.to(1, 0.5);
    setTimeoutGame(g, 0.6, () => {
      // everyone jumps out on the base side
      const L = VALLEY.lz;
      for (const [id, x, z] of [['kane', L.x - 4, L.z - 6], ['ruiz', L.x + 3, L.z - 7], ['okafor', L.x - 1, L.z - 9]]) {
        const s = this.squadById[id];
        s.attachedSeat = null; g.scene.attach(s.model.root);
        s.pos.set(x, 0, z); s.yaw = 0; s.seated = 0; s.scripted = false;
      }
      p.mount = null;
      p.reset(new THREE.Vector3(L.x, 0, L.z - 5), 0);
      g.weapons.setLowered(false);
      g.fade.to(0, 0.8);
      this.heliAudio?.setInside(false);
      // the valley is behind us: retire its defenders
      for (const v of this.vehicles) v.alive = false;
      for (const s of this.waves[0]?.soldiers || []) { s.alive = false; s.model.root.visible = false; }
      this.markWavesDone([0]);
      this.spawnWave(1);
      this._startBase1(false);
      this.saveCheckpoint('m4_base');
      setTimeoutGame(g, 3, () => this._heliDepart());
    });
  }

  _heliDepart() {
    const P = this.heli.position;
    this.heli.setKeys([
      { t: 0, x: P.x, y: 0, z: P.z, yaw: PI, pitch: 0, roll: 0 },
      { t: 3, x: P.x, y: 10, z: P.z + 4, yaw: PI + 0.4, pitch: -0.1, roll: 0.1 },
      { t: 9, x: P.x - 60, y: 45, z: P.z + 90, yaw: PI * 0.2, pitch: 0.15, roll: 0.2 },
      { t: 20, x: P.x - 300, y: 90, z: P.z + 300, yaw: PI * 0.2, pitch: 0.1, roll: 0 },
    ], 0);
    this.heli.turbulence = 0.5; this.heli.rpm = 1;
    this.departing = true;
    this.game.dialogue.say({ speaker: 'FALCON 2-1', radio: true, text: 'Vou orbitar fora do alcance do radar. Chamem quando terminarem.' });
  }

  // ------------------------------------------------------------ base
  _startBase1(fromCheckpoint) {
    const g = this.game;
    this.stage = 'base1';
    this.activateWave(1);
    g.squad.setAnchor(-1792, 30, { radius: 8, facing: PI, combat: true });
    g.hud.setObjective('Tome a base de radar de Kessel', new THREE.Vector3(-1795, 1.5, -10));
    g.audio.setMusicIntensity(1);
    g.dialogue.say({ speaker: fromCheckpoint ? 'KANE' : 'RUIZ', text: fromCheckpoint ? 'Avançar pela base! Centro de controle ao norte!' : 'Contato! Eles estão saindo dos bunkers!' });
  }

  _startBase2(fromCheckpoint) {
    const g = this.game;
    this.stage = 'base2';
    if (!this.waves[2]) this.spawnWave(2);
    this.activateWave(2);
    g.squad.setAnchor(-1795, -20, { radius: 8, facing: PI, combat: true });
    g.hud.setObjective('Segure a posição — reforços do hangar e da pista', new THREE.Vector3(-1820, 1.5, -55));
    g.audio.setMusicIntensity(1);
    g.dialogue.say({ speaker: 'OKAFOR', text: 'Reforços saindo do hangar e vindo da pista!' });
    if (!fromCheckpoint) setTimeoutGame(g, 1, () => this.saveCheckpoint('m4_control'));
  }

  _stageTerminal() {
    const g = this.game;
    this.stage = 'terminal';
    g.squad.setAnchor(-1777, -36, { radius: 5, facing: PI, combat: false });
    g.hud.setObjective('Acesse o centro de controle', new THREE.Vector3(-1777, 1.6, -43.3));
    g.audio.setMusicIntensity(0.3);
    g.dialogue.say({ speaker: 'KANE', text: 'Base limpa! Capitão, o terminal do centro de controle!' });
  }

  _openTerminal() {
    const g = this.game;
    this.stage = 'jet';
    g.hud.setObjective(null);
    g.city.baseScreen.material = g.mats.emissive(0xff4a3a, 1.2);
    g.dialogue.sequence([
      { speaker: 'OKAFOR', text: 'Plano de voo ativo... Capitão, o Serrat está aqui. Agora. No jato da pista!', onDone: () => { this.jetT = 0; } },
      { speaker: 'SERRAT', radio: true, text: 'Persistente, capitão. Mas atrasado. Nos vemos em Varna.' },
      { speaker: 'KANE', text: 'Falcon! Consegue alcançar aquele jato?' },
      { speaker: 'FALCON 2-1', radio: true, text: 'Num helicóptero? Nem em sonho, sargento.' },
      { speaker: 'RUIZ', text: 'O plano de voo diz Varna. A cúpula da coalizão é amanhã à noite. Ele vai estar no meio de todos eles.' },
      { speaker: 'KANE', text: 'Então é lá que a gente termina isso.', onDone: () => { g.fade.to(1, 2.5); setTimeoutGame(g, 2.8, () => g.completeMission()); } },
    ]);
  }

  onInteract(it) {
    if (it.id === 'baseTerminal' && this.stage === 'terminal') { this._openTerminal(); return true; }
    return false;
  }
  interactAllowed(it) {
    if (it.id === 'baseTerminal') return this.stage === 'terminal';
    return it.kind === 'ammo';
  }

  // ------------------------------------------------------------ update
  update(dt) {
    const g = this.game, p = g.player;
    const activeIdx = { base1: 1, base2: 2 }[this.stage] ?? null;
    this.updateCommon(dt, activeIdx);
    if (this.parts.root.visible) {
      this.heli.update(dt, this.t);
      this.heliAudio?.setPosition(this.heli.position);
      const ground = Math.max(0, 1 - (this.heli.position.y - terrainHeight(this.heli.position.x, this.heli.position.z)) / 16);
      if (ground > 0) g.effects.rotorWash(this.heli.position, ground * this.heli.rpm, dt);
      for (const m of this.pilots) m.update(dt, { seated: 1, aim: 0, crouch: 0, speed: 0, lookYaw: Math.sin(this.t * 0.4 + m.root.position.x) * 0.3 });
      if (this.departing && this.heli.done) { this.parts.root.visible = false; this.departing = false; this.heliAudio?.stop(); }
    }
    for (const s of g.squad.members) if (s.attachedSeat) {
      s.model.update(dt, { seated: 1, aim: 0, speed: 0, talk: s.talk, lookYaw: Math.sin(this.t * 0.5 + s.attachedSeat.x * 3) * 0.4 });
      s.model.root.getWorldPosition(s.pos);
    }
    if (this.stage === 'flight') {
      this.gunner.update(dt, g.input);
      // AA batteries open fire once the helicopter is in range; holds wait for them to fall
      this.aa.forEach((a, i) => {
        if (!a.alive) { if (!a._reported && a.health <= 0) { a._reported = true; this._onAADestroyed(i); } return; }
        a.active = a.pos.distanceTo(this.heli.position) < 430;
      });
      const hi = this.aa.findIndex((a) => a.alive);
      const holdT = hi >= 0 ? this.holdTimes[hi] : Infinity;
      if (this.heli.t >= holdT - 0.05) {
        this.heli.playing = false;
        if (!this._holdAnnounced?.[hi]) {
          (this._holdAnnounced ||= {})[hi] = true;
          g.dialogue.say({ speaker: 'FALCON 2-1', radio: true, text: ['Antiaérea à esquerda! Vou segurar o pairado — derruba ela!', 'Segunda bateria na encosta! Segurando posição!', 'Última antiaérea, perto da saída do vale! Fogo nela!'][hi] });
        }
      } else this.heli.playing = true;
      if (!this._convoyCall && this.trucks.some((t) => t.alive && t.delay <= 0 && t.pos.distanceTo(this.heli.position) < 300)) {
        this._convoyCall = true;
        g.dialogue.say({ speaker: 'OKAFOR', text: 'Comboio na estrada lá embaixo! Munição pra base deles!' });
      }
      if (this.heli.done) this._land();
    }
    if (this.jetT >= 0) {
      // Serrat's jet: taxi, roll and climb out over the valley
      this.jetT += dt;
      const jet = g.city.namedProps.jet, t = this.jetT;
      const dist = t < 4 ? 2 * t * t * 0.5 : 16 + (t - 4) * 8 + Math.pow(Math.max(0, t - 4), 2) * 2.4;
      jet.position.x = VALLEY.runway.x0 + 30 + dist;
      const climb = Math.max(0, dist - 260);
      jet.position.y = climb * 0.18;
      jet.rotation.x = -Math.min(0.22, climb * 0.002);
      if (dist > 50 && Math.random() < 0.6) g.effects.dust.spawn({ x: jet.position.x - 8, y: jet.position.y + 2, z: -99 + (Math.random() - 0.5) * 3, vx: -6, life: 1.4, size: 1, endSize: 4, color: [0.6, 0.6, 0.6], alpha: 0.3 });
      if (t > 40) { jet.visible = false; this.jetT = -1; }
    }
    switch (this.stage) {
      case 'base1': if (this.waveCleared(1)) this._startBase2(false); break;
      case 'base2': if (this.waveCleared(2)) this._stageTerminal(); break;
    }
  }
}
