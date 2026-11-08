import * as THREE from 'three';
import { Soldier } from '../ai/Soldier.js';
import { EnemyBrain, AllyBrain } from '../ai/Brains.js';
import { SoldierModel, APPEARANCE } from '../characters/SoldierModel.js';
import { buildHelicopter, HelicopterController, SEATS, CABIN } from '../world/Helicopter.js';
import { LZ, FIRES, SMOKE_COLUMNS } from '../world/districtLayout.js';
import { clamp } from '../utils/math.js';

/**
 * MISSION 1 — "PRIMEIRO CONTATO"
 * Insertion by helicopter into the Teresk district, sniper ambush at the LZ,
 * push up Avenida Verkhov to the Halden building.
 */
export const MISSION_ID = 'm01';

const CHECKPOINTS = {
  start: 'Início — Inserção',
  cp_lz: 'Zona de pouso Eco',
  cp_street: 'Avenida Verkhov',
  cp_crossroads: 'Cruzamento',
  cp_halden: 'Edifício Halden',
};

// Flight path (helicopter root keys). yaw PI = heading north (-Z).
const PI = Math.PI;
const FLIGHT = [
  { t: 0, x: 160, y: 110, z: 900, yaw: PI + 0.17, pitch: 0.08, roll: 0 },
  { t: 14, x: 110, y: 95, z: 540, yaw: PI + 0.17, pitch: 0.08, roll: -0.1 },
  { t: 28, x: 50, y: 80, z: 280, yaw: PI + 0.05, pitch: 0.08, roll: 0.12 },
  { t: 40, x: -5, y: 55, z: 140, yaw: PI - 0.08, pitch: 0.06, roll: 0.1 },
  { t: 50, x: -8, y: 28, z: 72, yaw: PI, pitch: -0.06, roll: 0 },
  { t: 57, x: -2, y: 10, z: 42, yaw: PI, pitch: -0.15, roll: 0 },
  { t: 62, x: 0, y: 2.4, z: 31, yaw: PI, pitch: -0.05, roll: 0 },
  { t: 65, x: LZ.x, y: 0, z: LZ.z, yaw: PI, pitch: 0, roll: 0 },
];
const LANDED_T = 65;

const INTRO_LINES = [
  { at: 1.0, speaker: 'BASTIÃO', radio: true, text: 'Falcon 2-1, aqui é Bastião. Zona de pouso Eco confirmada. Tempo estimado: dois minutos.' },
  { at: 7.0, speaker: 'FALCON 2-1', radio: true, text: 'Bastião, Falcon 2-1. Entendido, dois minutos.' },
  { at: 11.0, speaker: 'KANE', text: 'Ouviram o homem. Dois minutos. Conferir equipamento.' },
  { at: 15.5, speaker: 'BRIGGS', text: 'Sargento, é verdade que o Vértice não passava de cinquenta caras há um ano?' },
  { at: 20.5, speaker: 'KANE', text: 'Era o que diziam. Agora derrubam redes elétricas em três países na mesma noite.' },
  { at: 26.0, speaker: 'RUIZ', text: 'A inteligência diz que o relé de comunicação deles está no Edifício Halden. Se pegarmos os servidores, pegamos os nomes.' },
  { at: 33.0, speaker: 'OKAFOR', text: 'Se os servidores ainda existirem.' },
  { at: 36.5, speaker: 'BRIGGS', text: 'Capitão... minha primeira operação real. Alguma dica?' },
  { at: 41.0, speaker: 'KANE', text: 'Fica colado no capitão e não faz nenhuma idiotice, Briggs.' },
  { at: 45.0, speaker: 'BRIGGS', text: 'Anotado. Nada de idiotice.' },
  { at: 48.5, speaker: 'FALCON 2-1', radio: true, text: 'Trinta segundos! A zona parece limpa... quieta demais.' },
  { at: 53.0, speaker: 'KANE', text: 'Quieto é bom. Quieto é raro.' },
  { at: 56.0, speaker: 'BASTIÃO', radio: true, text: 'Iron, Bastião. Drones não mostram movimento hostil. Boa caçada.' },
  { at: 61.0, speaker: 'FALCON 2-1', radio: true, text: 'Pousando, pousando!' },
  { at: 65.4, speaker: 'KANE', text: 'Pés no chão! Vai, vai, vai!' },
];

/** Enemy waves. y>0 = elevated static positions (rooftops/balconies). */
const WAVES = [
  {
    id: 'w1', zone: { x0: -11, x1: 11, z0: -52, z1: -6 },
    enemies: [
      { id: 'sniper', x: -14, y: 25.5, z: -22.45, kind: 'sniper', static: true, face: [0, 1] },
      { x: 16, y: 10.5, z: 4.55, static: true, face: [0, 1] },
      { x: -4, z: -31.4 }, { x: 2, z: -45 }, { x: 6.5, z: -38.8 }, { x: -6, z: -40.3 },
      { x: 25, z: -25, delay: 1.0, rush: false }, { x: 27, z: -26, delay: 4.5 },
    ],
  },
  {
    id: 'w2', zone: { x0: -22, x1: 22, z0: -96, z1: -54 },
    enemies: [
      { id: 'rpg', x: 11.5, y: 13.5, z: -73, static: true, face: [-1, 0] },
      { x: -1, z: -83 }, { x: 2.5, z: -83.2 }, { x: 7.6, z: -86 }, { x: 3, z: -74 }, { x: -6.3, z: -90.5 },
      { x: -60, z: -62, delay: 2 }, { x: 60, z: -61, delay: 3.5 },
      { balcony: { x: -11, z: -80 } },
    ],
  },
  {
    id: 'w3', zone: { x0: -11, x1: 11, z0: -168, z1: -108 },
    enemies: [
      { x: 0, z: -153.7, kind: 'mg' },
      { x: -3.5, z: -113.4 }, { x: -6.2, z: -124.9 }, { x: 4.5, z: -138.7 }, { x: -4, z: -147.4 }, { x: 6.5, z: -151.2 },
      { x: -6, y: 15, z: -168.6, static: true, face: [0, 1] }, { x: 11.4, y: 13.5, z: -150, static: true, face: [-1, 0] },
      { x: -6, z: -164, delay: 6 }, { x: 6, z: -164, delay: 9 },
    ],
  },
];

export class Mission01 {
  constructor(game) {
    this.game = game;
    this.id = MISSION_ID;
    this.heliParts = buildHelicopter(game.mats, { interior: true });
    game.scene.add(this.heliParts.root);
    this.heli = new HelicopterController(this.heliParts, FLIGHT);
    this.wingParts = buildHelicopter(game.mats, { interior: false });
    game.scene.add(this.wingParts.root);
    this.wing = new HelicopterController(this.wingParts, FLIGHT);
    // pilots (non-actor models, seated in the cockpit)
    this.pilots = [];
    for (const sx of [-1, 1]) {
      const m = new SoldierModel(game.mats, APPEARANCE.pilot(game.mats));
      m.seatHeight = 0.5;
      m.root.position.set(sx * 0.55, 0.62, 2.2);
      this.heliParts.body.add(m.root);
      this.pilots.push(m);
    }
    this.cabinLight = new THREE.PointLight(0xff3020, 0.0, 4, 2);
    this.cabinLight.position.set(0, 2.0, -0.2);
    this.heliParts.body.add(this.cabinLight);
    // persistent atmosphere
    for (const f of FIRES) { const e = game.effects.addFire(f, f.size, true); e.permanent = true; }
    for (const s of SMOKE_COLUMNS) { const e = game.effects.addSmokeColumn(s, 1.2); e.permanent = true; }
    this.lzSmoke = null;
    this.heliAudio = null;
  }

  checkpointLabel(id) { return CHECKPOINTS[id] || ''; }

  // ------------------------------------------------------------ setup
  clearActors() {
    const g = this.game;
    for (const a of g.actors) if (!a.isPlayer) a.dispose();
    g.actors.length = 0;
    g.actors.push(g.player);
    g.squad.clear();
    g.ai.tokens.clear();
  }

  spawnSquad() {
    const g = this.game;
    const defs = [
      { id: 'kane', name: 'KANE', look: { beard: true, skin: 0xb88a6c } },
      { id: 'ruiz', name: 'RUIZ', look: { skin: 0xc8a07e, backpack: false } },
      { id: 'okafor', name: 'OKAFOR', look: { skin: 0x5e4030, glasses: false } },
      { id: 'briggs', name: 'BRIGGS', look: { skin: 0xd8b090 } },
    ];
    this.squadById = {};
    for (const d of defs) {
      const s = new Soldier(g, { team: 'ally', name: d.name, id: d.id, x: 0, z: 0, invulnerable: d.id !== 'briggs', look: d.look });
      s.brain = new AllyBrain(s, g.squad);
      g.actors.push(s);
      g.squad.add(s);
      g.dialogue.registerActor(d.name, s);
      this.squadById[d.id] = s;
    }
  }

  spawnWave(index, activateNow = false) {
    const g = this.game;
    const wave = WAVES[index];
    const list = [];
    for (const e of wave.enemies) {
      let x = e.x, y = e.y || 0, z = e.z, isStatic = !!e.static;
      if (e.balcony) {
        const spot = g.city.balconySpots.filter((b) => b.face === 'px').sort((a, b) => Math.hypot(a.x - e.balcony.x, a.z - e.balcony.z) - Math.hypot(b.x - e.balcony.x, b.z - e.balcony.z))[0];
        if (!spot) continue;
        x = spot.x + 0.2; y = spot.y; z = spot.z; isStatic = true;
      }
      const s = new Soldier(g, { team: 'enemy', x, y, z, kind: e.kind, static: isStatic, look: { cap: Math.random() < 0.35 && !isStatic }, id: e.id, yaw: 0 });
      s.pos.y = y;
      s.groundY = y;
      s.brain = new EnemyBrain(s, { zone: wave.zone });
      s.brain.rush = !!e.rush;
      s.faceYaw = e.face ? Math.atan2(e.face[0], e.face[1]) : 0; // look toward the street
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

  activateWave(index) {
    const w = this.waves[index];
    if (!w || w.active) return;
    w.active = true;
    w.t = 0;
    this.game.audio.battleIntensity = 1;
  }

  /** Reset world state and start from a checkpoint id. */
  start(checkpoint = 'start') {
    const g = this.game;
    this.clearActors();
    g.combat.reset();
    g.effects.reset();
    g.dialogue.clear();
    g.hud.reset();
    this.timeline = [];
    this.named = {};
    this.waves = [];
    this.t = 0;
    this.stage = null;
    this.checkpoint = checkpoint;
    this.endTriggered = false;
    this.heli.removeColliders(g.world);
    this.heliParts.root.visible = false;
    this.wingParts.root.visible = false;
    this.heliAudio?.stop();
    this.heliAudio = null;
    if (this.lzSmoke) { g.effects.removeEmitter(this.lzSmoke); this.lzSmoke = null; }
    const car = g.city.namedProps.rpgTarget;
    const carDestroyed = ['cp_crossroads', 'cp_halden'].includes(checkpoint);
    car.intact.visible = !carDestroyed; car.wreck.visible = carDestroyed;
    if (carDestroyed) g.effects.addFire({ x: car.x, y: 0.9, z: car.z }, 1.1, true);

    this.spawnSquad();
    g.player.reset(new THREE.Vector3(), PI);
    g.weapons.setLowered(false);
    g.hud.setCombatHud(true);
    g.audio.setMusicIntensity(0);
    g.audio.battleIntensity = 0.2;
    g.squad.setCombat(false);

    const p = g.player;
    switch (checkpoint) {
      case 'start': this._setupIntro(); break;
      case 'cp_lz': {
        this._briggsDeadAt(new THREE.Vector3(2.9, 0, 30.6));
        this._placeSquad([[-3, 9.2], [3, 9.2], [6, 9.3]]);
        p.reset(new THREE.Vector3(2.0, 0, 27.5), PI);
        this.spawnWave(0, true);
        this.spawnWave(1); this.spawnWave(2);
        this._beginAmbushCombat(true);
        break;
      }
      case 'cp_street':
        this._briggsDeadAt(new THREE.Vector3(2.9, 0, 30.6));
        this._placeSquad([[-3, -4], [3, -6], [5, -2]]);
        p.reset(new THREE.Vector3(0, 0, 0), PI);
        this.waves[0] = { soldiers: [], active: true, done: true };
        this.spawnWave(1); this.spawnWave(2);
        this._stageAdvance1(true);
        break;
      case 'cp_crossroads':
        this._placeSquad([[-3, -58], [3, -60], [5, -57]]);
        p.reset(new THREE.Vector3(0, 0, -56), PI);
        this.waves[0] = { soldiers: [], active: true, done: true };
        this.waves[1] = { soldiers: [], active: true, done: true };
        this.spawnWave(2);
        this._stageAdvance2(true);
        break;
      case 'cp_halden':
        this._placeSquad([[-3, -160], [3, -161], [5, -158]]);
        p.reset(new THREE.Vector3(0, 0, -150), PI);
        for (let i = 0; i < 3; i++) this.waves[i] = { soldiers: [], active: true, done: true };
        this._stageDoor(true);
        break;
    }
    if (checkpoint !== 'start') {
      g.pipeline.scene.fog.density = g.pipeline.baseFogDensity * g.pipeline.quality.fogBoost;
      this._removeBriggsIfAlive();
    }
  }

  _placeSquad(points) {
    const ids = ['kane', 'ruiz', 'okafor'];
    ids.forEach((id, i) => {
      const s = this.squadById[id];
      s.pos.set(points[i][0], 0, points[i][1]);
      s.yaw = PI;
    });
  }

  _briggsDeadAt(pos) {
    const b = this.squadById.briggs;
    b.pos.copy(pos);
    b.yaw = PI * 0.6;
    b.syncModel(0.016);
    b.die({ dir: new THREE.Vector3(0.6, 0, 0.8) });
    b.model.deathT = 5;
    this.game.squad.members.splice(this.game.squad.members.indexOf(b), 1);
  }
  _removeBriggsIfAlive() { /* Briggs only survives in the intro */ }

  _beginAmbushCombat(fromCheckpoint) {
    const g = this.game;
    this.stage = 'wave1';
    g.squad.setAnchor(0, 9.4, { radius: 7, facing: PI, combat: true });
    g.hud.setObjective('Sobreviva à emboscada — elimine o atirador na torre', this.named.sniper ? this.named.sniper.pos.clone().add(new THREE.Vector3(0, 1.4, 0)) : null);
    g.audio.setMusicIntensity(0.85);
    g.audio.battleIntensity = 1;
    for (const s of this.waves[0].soldiers) if (!s.hiddenUntilActive) s.brain.activate();
    this.activateWave(0);
    if (fromCheckpoint) g.dialogue.say({ speaker: 'KANE', text: 'Atirador na torre, às onze horas! Mantenham a cabeça baixa!' });
  }

  // ------------------------------------------------------------ intro
  _setupIntro() {
    const g = this.game, p = g.player;
    this.stage = 'intro';
    g.hud.setCombatHud(false);
    g.hud.setObjective(null);
    g.weapons.setLowered(true);
    g.weapons.lowered = 1;
    g.fade.set(1);
    g.pipeline.scene.fog.density = 0.0034;
    this.heliParts.root.visible = true;
    this.wingParts.root.visible = true;
    this.heli.setKeys(FLIGHT, 0);
    this.heli.rpm = 1; this.heli.turbulence = 1;
    const wingKeys = FLIGHT.slice(0, 4).map((k) => ({ ...k, x: k.x + 34, y: k.y + 7, z: k.z + 22 }));
    wingKeys.push({ t: 50, x: 140, y: 85, z: 40, yaw: PI - 0.9, pitch: 0.1, roll: -0.3 });
    wingKeys.push({ t: 64, x: 420, y: 120, z: -120, yaw: PI - 1.0, pitch: 0.1, roll: 0 });
    this.wing.setKeys(wingKeys, 0);
    this.cabinLight.intensity = 1.6;
    // squad seated in the cabin
    for (const id of ['kane', 'ruiz', 'okafor', 'briggs']) this._seat(this.squadById[id], SEATS[id]);
    // player seat
    p.setMount(this.heliParts.body, new THREE.Vector3(SEATS.player.x, CABIN.floorY + 1.22, SEATS.player.z + 0.05), { yawLimit: 2.4, pitchLimit: 1.2 });
    g.audio.setAmbience({ wind: 0.02, rain: 0.02 });
    this.heliAudio = g.audio.createHelicopter();
    if (this.heliAudio) {
      this.heliAudio.setInside(true);
      this.heliAudio.setRPM(1);
      this.heliAudio.setVolume(0.0, 0.01);
      setTimeout(() => this.heliAudio?.setVolume(0.95, 2.5), 50);
    }
    this.timeline = INTRO_LINES.map((l) => ({ at: l.at, fn: () => g.dialogue.say({ speaker: l.speaker, text: l.text, radio: l.radio }) }));
    this.timeline.push({ at: 4.5, fn: () => g.fade.to(0, 3.5) });
    this.timeline.push({ at: 6.0, fn: () => g.hud.titleCard(['OPERATION: IRON SHADOW', 'MISSÃO 1 — PRIMEIRO CONTATO', 'Distrito de Teresk · 14 de março de 2029 · 06:12', 'Cap. Daniel Mercer — Força-Tarefa Iron'], 7000) });
    this.timeline.push({ at: 18, fn: () => g.hud.toast('Mova o mouse para olhar ao redor', 3500) });
    this.timeline.push({ at: 55, fn: () => { this.lzSmoke = g.effects.addColoredSmoke({ x: LZ.x - 6, y: 0.1, z: LZ.z - 7 }, [0.35, 0.55, 0.3]); } });
    this.timeline.push({ at: LANDED_T, fn: () => this._onLanded() });
    this.timeline.sort((a, b) => a.at - b.at);
  }

  _seat(s, seat) {
    s.scripted = true;
    s.seated = 1;
    s.model.pose.seated = 1;
    s.model.seatHeight = 0.45;
    s.attachedSeat = seat;
    this.heliParts.body.add(s.model.root);
    s.model.root.position.set(seat.x, CABIN.floorY, seat.z);
    s.model.root.rotation.set(0, seat.yaw, 0);
  }

  _unseat(s) {
    const g = this.game;
    s.attachedSeat = null;
    s.model.root.updateWorldMatrix(true, false);
    const wp = new THREE.Vector3();
    s.model.root.getWorldPosition(wp);
    g.scene.attach(s.model.root);
    s.pos.copy(wp);
    s.yaw = this.heliParts.root.rotation.y + (s === this.squadById.kane || s === this.squadById.ruiz ? PI : 0);
    s.seated = 0;
  }

  _onLanded() {
    const g = this.game;
    this.stage = 'disembark';
    this.heli.playing = false;
    this.heli.turbulence = 0.1;
    this.heli.rpm = 0.85;
    this.heliAudio?.setRPM(0.8);
    this.heli.addLandedColliders(g.world);
    const L = (x, z) => this.heli.localToWorld(x, 0, z);
    const kane = this.squadById.kane, ruiz = this.squadById.ruiz, ok = this.squadById.okafor, briggs = this.squadById.briggs;
    const exitRight = (s, delay, lz, dest) => setTimeoutGame(g, delay, () => {
      this._unseat(s);
      s.ignoreCollision = true;
      const a = L(0.6, lz), b = L(1.9, -0.1), c = L(3.6, -0.6);
      s.moveDirect([a, b, c], 2.6);
      s.onArrive = () => { s.ignoreCollision = false; s.scripted = false; };
      s._exitDest = dest;
    });
    exitRight(kane, 0.6, 0.4, null);
    exitRight(ruiz, 1.2, 0.3, null);
    exitRight(ok, 1.8, -0.6, null);
    setTimeoutGame(g, 1.0, () => {
      this._unseat(briggs);
      briggs.ignoreCollision = true;
      const a = L(-0.3, -0.75), b = L(-1.9, -0.3), c = L(-2.7, 0.3);
      briggs.moveDirect([a, b, c], 2.2);
      briggs.onArrive = () => { briggs.ignoreCollision = false; briggs.faceYaw = Math.atan2(g.player.pos.x - briggs.pos.x, g.player.pos.z - briggs.pos.z); };
    });
    // non-combat formation near the plaza edge
    g.squad.setAnchor(0, 12, { radius: 5, facing: PI, combat: false });
    // player stands up
    setTimeoutGame(g, 0.8, () => {
      const stand = this.heli.localToWorld(SEATS.player.x, CABIN.floorY, -0.72);
      g.player.dismount(stand);
      g.weapons.setLowered(false);
      g.hud.setCombatHud(true);
      g.hud.setObjective('Desembarque e siga a equipe', this.heli.localToWorld(-2.6, 1.0, 0));
      g.hud.toast('WASD para mover · Shift para correr', 4000);
    });
    this.waitT = 0;
    this.nagT = 14;
    this.spawnWave(0);
    this.spawnWave(1);
    this.spawnWave(2);
  }

  _triggerAmbush() {
    const g = this.game;
    this.stage = 'ambush';
    const briggs = this.squadById.briggs, sniper = this.named.sniper;
    const head = briggs.hitSpheres[0].c.clone();
    const from = sniper.model.getMuzzle(new THREE.Vector3());
    // the shot
    g.effects.tracer(from, head, 600);
    g.effects.bloodHit(head, new THREE.Vector3().subVectors(head, from).normalize());
    g.effects.bloodHit(head, new THREE.Vector3(0, 0.3, 0));
    g.audio.playImpact(head, 'flesh');
    g.audio.playShot(from, 'sniper', false);
    briggs.invulnerable = false;
    briggs.die({ dir: new THREE.Vector3().subVectors(head, from).normalize(), zone: 'head' });
    g.squad.members.splice(g.squad.members.indexOf(briggs), 1);
    g.slowMotion(0.3, 1.3);
    g.audio.concussion(2.8, 0.75);
    g.audio.stinger();
    g.player.addTrauma(0.5);
    const at = this.t;
    this.timeline.push(
      { at: at + 0.45, fn: () => g.dialogue.say({ speaker: 'RUIZ', text: 'BRIGGS! Homem abatido!' }) },
      { at: at + 1.6, fn: () => g.dialogue.say({ speaker: 'KANE', text: 'ATIRADOR! Na torre, às onze horas! Todo mundo pra cobertura!' }) },
      { at: at + 1.9, fn: () => this._heliDepart() },
      { at: at + 2.2, fn: () => this._beginAmbushCombat(false) },
      { at: at + 3.2, fn: () => g.dialogue.say({ speaker: 'FALCON 2-1', radio: true, text: 'Falcon recebendo fogo! Estamos saindo — boa sorte, Iron!' }) },
      { at: at + 5.5, fn: () => this.saveCheckpoint('cp_lz') },
      { at: at + 7.5, fn: () => g.dialogue.say({ speaker: 'KANE', text: 'Contatos na rua! Capitão, suprima a avenida e derrube aquele atirador!' }) },
      { at: at + 9, fn: () => g.hud.toast('Botão direito: mirar · Ctrl/C: agachar atrás da cobertura', 4500) },
    );
    this.timeline.sort((a, b) => a.at - b.at);
  }

  _heliDepart() {
    const g = this.game;
    this.heli.removeColliders(g.world);
    const P = this.heli.position;
    this.heli.setKeys([
      { t: 0, x: P.x, y: 0, z: P.z, yaw: PI, pitch: 0, roll: 0 },
      { t: 2.5, x: P.x, y: 7, z: P.z + 3, yaw: PI + 0.3, pitch: -0.1, roll: 0.15 },
      { t: 7, x: P.x + 40, y: 35, z: P.z + 40, yaw: PI + 1.2, pitch: 0.2, roll: 0.3 },
      { t: 16, x: P.x + 250, y: 90, z: P.z + 200, yaw: PI + 1.4, pitch: 0.15, roll: 0 },
    ], 0);
    this.heli.turbulence = 0.6; this.heli.rpm = 1;
    this.heliAudio?.setRPM(1);
    this.heliAudio?.setInside(false);
    this.departing = true;
  }

  saveCheckpoint(id) {
    const g = this.game;
    this.checkpoint = id;
    g.saves.save({ mission: MISSION_ID, checkpoint: id, weapons: g.weapons.serialize(), stats: g.stats });
    g.hud.toast('CHECKPOINT SALVO', 2200);
    g.events.emit('checkpoint', { id });
  }

  // ------------------------------------------------------------ stages after combat
  _stageAdvance1(fromCheckpoint) {
    const g = this.game;
    this.stage = 'advance1';
    g.squad.setAnchor(0, -30, { radius: 7, facing: PI, combat: false });
    g.hud.setObjective('Avance pela Avenida Verkhov até o cruzamento', new THREE.Vector3(0, 1.5, -42));
    g.audio.setMusicIntensity(0.3);
    g.audio.battleIntensity = 0.4;
    if (!fromCheckpoint) {
      g.dialogue.sequence([
        { speaker: 'KANE', text: 'Rua limpa! Briggs... droga.' },
        { speaker: 'RUIZ', text: 'Ele se foi, sargento. Foi rápido.' },
        { speaker: 'KANE', text: 'Então vamos fazer valer. Avançar pela avenida até o cruzamento. Olhos nos telhados.' },
      ]);
      setTimeoutGame(g, 1.5, () => this.saveCheckpoint('cp_street'));
    }
  }

  _startWave2() {
    const g = this.game;
    this.stage = 'wave2';
    for (const s of this.waves[1].soldiers) if (!s.hiddenUntilActive) s.brain.activate();
    this.activateWave(1);
    g.squad.setAnchor(0, -44, { radius: 8, facing: PI, combat: true });
    g.hud.setObjective('Limpe o cruzamento', new THREE.Vector3(0, 1.5, -78));
    g.audio.setMusicIntensity(0.9);
    g.audio.battleIntensity = 1;
    g.dialogue.say({ speaker: 'OKAFOR', text: 'Movimento no cruzamento! Ninho de sacos de areia, doze horas!' });
    const rpg = this.named.rpg;
    if (rpg && rpg.alive) {
      setTimeoutGame(g, 2.2, () => g.dialogue.say({ speaker: 'KANE', text: 'RPG! No telhado à direita!' }));
      setTimeoutGame(g, 3.3, () => {
        if (!rpg.alive) return;
        const car = g.city.namedProps.rpgTarget;
        const from = rpg.getEye(new THREE.Vector3());
        g.combat.fireRocket(from, new THREE.Vector3(car.x, 0.8, car.z), rpg, () => {
          car.intact.visible = false; car.wreck.visible = true;
          g.effects.addFire({ x: car.x, y: 0.9, z: car.z }, 1.1, true);
          g.effects.addSmokeColumn({ x: car.x, y: 1, z: car.z }, 0.35, [0.1, 0.1, 0.1]);
        });
      });
    }
  }

  _stageAdvance2(fromCheckpoint) {
    const g = this.game;
    this.stage = 'advance2';
    g.squad.setAnchor(0, -98, { radius: 7, facing: PI, combat: false });
    g.hud.setObjective('Avance até o Edifício Halden', new THREE.Vector3(0, 2, -166));
    g.audio.setMusicIntensity(0.3);
    g.audio.battleIntensity = 0.5;
    if (!fromCheckpoint) {
      g.dialogue.sequence([
        { speaker: 'OKAFOR', text: 'Cruzamento limpo.' },
        { speaker: 'KANE', text: 'O Halden fica no fim da avenida. Mantenham o ritmo e fiquem juntos.' },
        { speaker: 'BASTIÃO', radio: true, text: 'Iron, Bastião. Detectamos tráfego de rádio do Vértice saindo do Halden. Eles sabem que vocês estão chegando.' },
      ]);
      setTimeoutGame(g, 1.5, () => this.saveCheckpoint('cp_crossroads'));
    }
  }

  _startWave3() {
    const g = this.game;
    this.stage = 'wave3';
    for (const s of this.waves[2].soldiers) if (!s.hiddenUntilActive) s.brain.activate();
    this.activateWave(2);
    g.squad.setAnchor(0, -112, { radius: 8, facing: PI, combat: true });
    g.hud.setObjective('Rompa a defesa diante do Edifício Halden', new THREE.Vector3(0, 1.5, -153));
    g.audio.setMusicIntensity(1);
    g.audio.battleIntensity = 1;
    g.dialogue.say({ speaker: 'KANE', text: 'Metralhadora no ninho em frente ao prédio! Usem os carros, avancem por cobertura!' });
  }

  _stageDoor(fromCheckpoint) {
    const g = this.game;
    this.stage = 'door';
    g.squad.setAnchor(0, -163.5, { radius: 3, facing: PI, combat: false });
    g.hud.setObjective('Entre no Edifício Halden', new THREE.Vector3(0, 2, -167.6));
    g.audio.setMusicIntensity(0.25);
    g.audio.battleIntensity = 0.3;
    if (!fromCheckpoint) {
      g.dialogue.sequence([
        { speaker: 'KANE', text: 'Área limpa! Todos em posição na porta.' },
        { speaker: 'RUIZ', text: 'Bandeiras do Vértice na fachada... eles queriam que a gente visse isso.' },
        { speaker: 'KANE', text: 'Capitão, a porta é sua. Quando estiver pronto.' },
      ]);
      setTimeoutGame(g, 1.5, () => this.saveCheckpoint('cp_halden'));
    }
  }

  /** Called by the interaction system. */
  onInteract(it) {
    if (it.id === 'haldenDoor' && this.stage === 'door' && !this.endTriggered) {
      this.endTriggered = true;
      const g = this.game;
      g.dialogue.say({ speaker: 'KANE', text: 'Entrando!' });
      g.fade.to(1, 1.6);
      setTimeoutGame(g, 1.8, () => g.completeMission());
      return true;
    }
    return false;
  }
  interactAllowed(it) {
    if (it.id === 'haldenDoor') return this.stage === 'door';
    return true;
  }

  waveCleared(i) {
    const w = this.waves[i];
    if (!w || !w.active) return false;
    if (w.done) return true;
    if (w.soldiers.every((s) => !s.alive)) { w.done = true; return true; }
    return false;
  }

  // ------------------------------------------------------------ update
  update(dt) {
    const g = this.game, p = g.player;
    this.t += dt;
    while (this.timeline.length && this.timeline[0].at <= this.t) this.timeline.shift().fn();

    // helicopters
    if (this.heliParts.root.visible) {
      this.heli.update(dt, this.t);
      const hp = this.heli.position;
      this.heliAudio?.setPosition(hp);
      const ground = clamp(1 - hp.y / 16, 0, 1);
      if (ground > 0) g.effects.rotorWash(hp, ground * this.heli.rpm, dt);
      for (const m of this.pilots) m.update(dt, { seated: 1, aim: 0, crouch: 0, speed: 0, lookYaw: Math.sin(this.t * 0.4 + m.root.position.x) * 0.4 });
      if (this.departing && this.heli.done) { this.heliParts.root.visible = false; this.departing = false; this.heliAudio?.stop(); }
      this.cabinLight.intensity = p.mount ? 1.6 : 0.4;
    }
    if (this.wingParts.root.visible) {
      this.wing.update(dt, this.t + 1.3);
      if (this.wing.done) this.wingParts.root.visible = false;
    }
    // seated soldiers follow the cabin
    for (const s of g.squad.members) {
      if (s.attachedSeat) {
        s.model.update(dt, { seated: 1, aim: 0, speed: 0, talk: s.talk, lookYaw: Math.sin(this.t * 0.5 + s.attachedSeat.x * 3) * 0.5 + (s.talk ? 0.2 : 0) });
        s.model.root.getWorldPosition(s.pos);
      } else if (s.scripted && s.arrived && s.onArrive) { const f = s.onArrive; s.onArrive = null; f(); }
    }
    // delayed (hidden) spawns
    for (const w of this.waves) {
      if (!w || !w.active) continue;
      w.t += dt;
      for (const s of w.soldiers) {
        if (s.hiddenUntilActive && w.t >= s.spawnDelay) { s.hiddenUntilActive = false; s.model.root.visible = true; s.brain.activate(); }
      }
    }
    // sniper scope glint
    const sn = this.named.sniper;
    if (sn && sn.alive && sn.brain.active && sn.brain.phase === 'peek' && (this.t * 10) % 1 < 0.5) {
      const e = sn.getEye(new THREE.Vector3());
      g.effects.flashes.spawn({ x: e.x, y: e.y, z: e.z + 0.3, life: 0.08, size: 0.9, endSize: 0.6, color: [1, 1, 0.9], alpha: 0.9, fadeIn: 0 });
    }

    switch (this.stage) {
      case 'intro':
        break;
      case 'disembark': {
        this.waitT += dt;
        const local = this.heli.root.worldToLocal(p.pos.clone());
        const outside = Math.abs(local.x) > 1.5 || local.z < -2.2 || local.z > 1.6;
        if (outside && !p.mount && p.onGround && p.pos.y < 0.3) this._triggerAmbush();
        else if (this.waitT > this.nagT) {
          this.nagT += 20;
          g.dialogue.say({ speaker: 'KANE', text: 'Capitão! Precisamos do senhor aqui fora!' });
        }
        break;
      }
      case 'wave1':
        if (this.waveCleared(0)) this._stageAdvance1(false);
        break;
      case 'advance1':
        if (p.pos.z < -36) this._startWave2();
        break;
      case 'wave2':
        if (this.waveCleared(1)) this._stageAdvance2(false);
        break;
      case 'advance2':
        if (p.pos.z < -100) this._startWave3();
        break;
      case 'wave3':
        if (this.waveCleared(2)) this._stageDoor(false);
        break;
    }
    // squad keeps up with an aggressive player during combat
    if (['wave1', 'wave2', 'wave3'].includes(this.stage)) {
      const a = g.squad.anchor;
      if (p.pos.z < a.z - 18) g.squad.setAnchor(0, Math.max(p.pos.z + 6, a.z - 20), { radius: 8, facing: PI, combat: true });
      // remaining hostiles push the player when few are left
      const w = this.waves[{ wave1: 0, wave2: 1, wave3: 2 }[this.stage]];
      const alive = w ? w.soldiers.filter((s) => s.alive && !s.isStatic) : [];
      if (alive.length > 0 && alive.length <= 2) for (const s of alive) if (!s.brain.rush) { s.brain.rush = true; s.brain.relocateT = 0; }
    }
  }
}

/** Game-time timeout (respects pause / slow motion). */
export function setTimeoutGame(game, delay, fn) {
  game.timers.push({ t: delay, fn });
}
