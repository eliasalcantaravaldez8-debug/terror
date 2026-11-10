import * as THREE from 'three';
import { MissionBase, setTimeoutGame } from './MissionBase.js';
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
  cp_lobby: 'Saguão do Halden',
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
      { x: -1, z: -83 }, { x: 2.5, z: -83.2, kind: 'smg' }, { x: 7.6, z: -86 }, { x: 3, z: -74, kind: 'smg' }, { x: -6.3, z: -90.5 },
      { x: -60, z: -62, delay: 2 }, { x: 60, z: -61, delay: 3.5 },
      { balcony: { x: -11, z: -80 } },
    ],
  },
  {
    id: 'w3', zone: { x0: -11, x1: 11, z0: -168, z1: -108 },
    enemies: [
      { x: 0, z: -153.7, kind: 'mg' },
      { x: -3.5, z: -113.4, kind: 'smg' }, { x: -6.2, z: -124.9 }, { x: 4.5, z: -138.7, kind: 'shotgun' }, { x: -4, z: -147.4 }, { x: 6.5, z: -151.2 },
      { x: -6, y: 15, z: -168.6, static: true, face: [0, 1] }, { x: 11.4, y: 13.5, z: -150, static: true, face: [-1, 0] },
      { x: -6, z: -164, delay: 6 }, { x: 6, z: -164, delay: 9 },
    ],
  },
  {
    // inside the Halden lobby — dormant until the breach
    id: 'w4', zone: { x0: -23, x1: 23, z0: -186, z1: -169 },
    enemies: [
      { x: -2, y: 0.4, z: -179.3, kind: 'shotgun' }, { x: 2.2, y: 0.4, z: -179.3, kind: 'smg' }, { x: -7, y: 0.4, z: -183.1 }, { x: 7, y: 0.4, z: -183.1 },
      { x: -12, y: 0.4, z: -177.2, kind: 'smg' }, { x: 12, y: 0.4, z: -177.3, kind: 'shotgun' }, { x: 6, y: 0.4, z: -184.2 }, { x: -18.4, y: 0.4, z: -181.4 },
    ],
  },
  {
    // counter-attack while the servers download — they come in through the front door
    id: 'w5', zone: { x0: -23, x1: 23, z0: -196, z1: -169 },
    enemies: [
      { x: -3, z: -162, delay: 4, kind: 'smg' }, { x: 3, z: -162, delay: 6, kind: 'shotgun' }, { x: 0, z: -160, delay: 11 },
      { x: -4, z: -161, delay: 16 }, { x: 4, z: -161, delay: 21, kind: 'smg' }, { x: 0, z: -162, delay: 26 }, { x: -2, z: -160, delay: 31 },
    ],
  },
];
const DOWNLOAD_TIME = 40;

export class Mission01 extends MissionBase {
  constructor(game) {
    super(game, MISSION_ID, { waves: WAVES, checkpoints: CHECKPOINTS, title: 'Primeiro Contato' });
    this.number = 1;
    this.completeText = {
      top: 'MISSÃO 1 CONCLUÍDA', main: 'PRIMEIRO CONTATO',
      body: 'Os códigos encontrados no Halden pertencem ao próprio Comando da Coalizão.<br>Alguém de dentro está ajudando o VÉRTICE — e a equipe Iron perdeu contato com Bastião.<br><b>A seguir: Missão 2 — Sinal Morto.</b>',
    };
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

  // ------------------------------------------------------------ setup
  spawnSquad() { super.spawnSquad(['kane', 'ruiz', 'okafor', 'briggs']); }

  /** Called when another mission takes over the world. */
  exit() {
    this.heli.removeColliders(this.game.world);
    this.heliParts.root.visible = false;
    this.wingParts.root.visible = false;
    this.heliAudio?.stop();
    this.heliAudio = null;
    if (this.lzSmoke) { this.game.effects.removeEmitter(this.lzSmoke); this.lzSmoke = null; }
  }

  /** Reset world state and start from a checkpoint id. */
  start(checkpoint = 'start') {
    const g = this.game;
    this.resetWorld();
    g.effects.rainIntensity = g.pipeline.setTimeOfDay('morning').rain;
    g.mats.setNightLights(0);
    this.setEastGate(true, false);
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
    this._setDoor(checkpoint === 'cp_lobby');
    this.download = null;
    if (carDestroyed) g.effects.addFire({ x: car.x, y: 0.9, z: car.z }, 1.1, true);

    // weapons placed in the level
    g.pickups.add({ weaponId: 'brk12', position: new THREE.Vector3(-6.2, 1.03, 10.5), yaw: 0.4 });
    g.pickups.add({ weaponId: 'lr6', position: new THREE.Vector3(9.6, 1.03, -66), yaw: 1.4 });
    g.pickups.add({ weaponId: 'mk9', position: new THREE.Vector3(-9.5, 1.03, -100), yaw: 2.2 });
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
      case 'cp_lobby':
        this._placeSquad([[-3, -175], [3, -176], [6, -173]]);
        p.reset(new THREE.Vector3(0, 0.4, -171), PI);
        for (let i = 0; i < 4; i++) this.waves[i] = { soldiers: [], active: true, done: true };
        this._stageServers(true);
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
    if (!this.waves[3]) this.spawnWave(3);
    g.squad.setAnchor(0, -163.5, { radius: 3, facing: PI, combat: false });
    g.hud.setObjective('Entre no Edifício Halden', new THREE.Vector3(0, 2, -167.6));
    g.audio.setMusicIntensity(0.25);
    g.audio.battleIntensity = 0.3;
    if (!fromCheckpoint) {
      g.dialogue.sequence([
        { speaker: 'KANE', text: 'Área limpa! Todos em posição na porta.' },
        { speaker: 'RUIZ', text: 'Bandeiras do Vértice na fachada... eles queriam que a gente visse isso.' },
        { speaker: 'KANE', text: 'Capitão, a porta é sua. Carga de arrombamento pronta. Quando estiver pronto.' },
      ]);
      setTimeoutGame(g, 1.5, () => this.saveCheckpoint('cp_halden'));
    }
  }

  /** Called by the interaction system. */
  onInteract(it) {
    if (it.id === 'haldenDoor' && this.stage === 'door') { this._breach(); return true; }
    if (it.id === 'serverTerminal' && this.stage === 'servers') { this._startDownload(); return true; }
    return false;
  }
  interactAllowed(it) {
    if (it.id === 'haldenDoor') return this.stage === 'door';
    if (it.id === 'serverTerminal') return this.stage === 'servers';
    return true;
  }

  _setDoor(open) { this.setHaldenDoor(open); }

  // ------------------------------------------------------------ Halden interior
  _breach() {
    const g = this.game;
    this.stage = 'breach';
    g.hud.setObjective('Afaste-se da porta', null);
    g.dialogue.say({ speaker: 'KANE', text: 'Carga posicionada! Afastem-se... Rompendo!' });
    setTimeoutGame(g, 2.2, () => {
      const pos = new THREE.Vector3(0, 0.6, -167.7);
      g.effects.explosion(pos, 0.55);
      g.audio.playExplosion(pos, 0.7);
      const pd = g.player.pos.distanceTo(pos);
      g.player.addTrauma(Math.max(0.2, 1 - pd / 15));
      if (pd < 2.5) g.player.takeDamage(35, pos);
      g.audio.concussion(1.6, 0.6);
      this._setDoor(true);
      g.city.namedProps.halden.setOpen(0);
      this.doorAnim = { t: 0 };
      g.slowMotion(0.4, 0.9);
      this._startLobby();
    });
  }

  _startLobby() {
    const g = this.game;
    this.stage = 'lobby';
    for (const s of this.waves[3].soldiers) s.brain.activate();
    this.activateWave(3);
    g.squad.setAnchor(0, -171.5, { radius: 6, facing: PI, combat: true });
    g.hud.setObjective('Limpe o saguão do Edifício Halden', new THREE.Vector3(0, 1.8, -178));
    g.audio.setMusicIntensity(1);
    g.audio.battleIntensity = 0.6;
    setTimeoutGame(g, 0.8, () => g.dialogue.say({ speaker: 'RUIZ', text: 'Contatos no saguão! Atrás do balcão e das colunas!' }));
  }

  _stageServers(fromCheckpoint) {
    const g = this.game;
    this.stage = 'servers';
    g.squad.setAnchor(0, -199.5, { radius: 5, facing: 0, combat: false });
    g.hud.setObjective('Chegue à sala dos servidores e inicie o download', new THREE.Vector3(0, 1.6, -197.6));
    g.audio.setMusicIntensity(0.3);
    g.audio.battleIntensity = 0.3;
    if (!fromCheckpoint) {
      g.dialogue.sequence([
        { speaker: 'KANE', text: 'Saguão limpo!' },
        { speaker: 'RUIZ', text: 'A sala dos servidores fica no fim do corredor. Se o relé está aqui, é lá.' },
        { speaker: 'KANE', text: 'Capitão, conecte o terminal. Okafor, cobre o corredor.' },
      ]);
      setTimeoutGame(g, 1.5, () => this.saveCheckpoint('cp_lobby'));
    }
  }

  _startDownload() {
    const g = this.game;
    this.stage = 'download';
    this.download = { t: 0 };
    if (!this.waves[4]) this.spawnWave(4);
    this.activateWave(4);
    g.squad.setAnchor(0, -199.2, { radius: 6, facing: 0, combat: true });
    g.hud.setObjective('Defenda a sala dos servidores durante o download', new THREE.Vector3(0, 1.6, -191));
    g.hud.setProgress(0);
    g.audio.setMusicIntensity(0.9);
    g.audio.playFoley('ammo');
    g.dialogue.sequence([
      { speaker: 'OKAFOR', text: 'Download iniciado. Quarenta segundos.' },
      { speaker: 'BASTIÃO', radio: true, text: 'Iron, Bastião. Veículos do Vértice se aproximando do Halden. Muitos.' },
      { speaker: 'KANE', text: 'Eles vão entrar pela porta da frente. Segurem o corredor!' },
    ]);
  }

  _twist() {
    const g = this.game;
    this.stage = 'twist';
    g.hud.setProgress(null);
    g.hud.setObjective(null);
    g.squad.setCombat(false);
    g.audio.setMusicIntensity(0.4);
    g.audio.battleIntensity = 0.2;
    g.dialogue.sequence([
      { speaker: 'OKAFOR', text: 'Download completo. Abrindo os arquivos...' },
      { speaker: 'RUIZ', text: 'Capitão... estes códigos de autorização. São nossos. São do Comando da Coalizão.' },
      { speaker: 'KANE', text: 'Impossível. Ninguém fora do alto comando tem esses códigos.' },
      { speaker: 'RUIZ', text: 'Alguém de dentro está entregando tudo ao Vértice. Rotas, horários... até a nossa zona de pouso.' },
      { speaker: 'KANE', text: 'Então a emboscada não foi azar. Eles sabiam que a gente vinha. Briggs...' },
      { speaker: 'BASTIÃO', radio: true, text: 'Iron, Bastião. Interrompam a transmissão dos dados imediatamente. Repito, interrompam—', onDone: () => { g.audio.radioStatic(2.5); g.audio.concussion(0.6, 0.2); } },
      { speaker: 'KANE', text: 'Bastião? Bastião, responda!' },
      { speaker: 'OKAFOR', text: 'O canal caiu, sargento. Estamos sozinhos.', onDone: () => {
        g.audio.stinger();
        g.fade.to(1, 2.5);
        setTimeoutGame(g, 2.8, () => g.completeMission());
      } },
    ]);
  }

  // ------------------------------------------------------------ update
  update(dt) {
    const g = this.game, p = g.player;
    this.updateCommon(dt);

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
      case 'lobby':
        if (this.waveCleared(3)) this._stageServers(false);
        break;
      case 'download': {
        const d = this.download;
        if (d.t < DOWNLOAD_TIME) {
          d.t += dt;
          g.hud.setProgress(Math.min(1, d.t / DOWNLOAD_TIME));
          if (d.t >= DOWNLOAD_TIME) {
            g.hud.setProgress(1);
            if (!this.waveCleared(4)) { g.hud.setObjective('Download completo — elimine os hostis restantes', null); g.dialogue.say({ speaker: 'OKAFOR', text: 'Dados copiados! Ainda tem gente no saguão!' }); }
          }
        } else if (this.waveCleared(4)) this._twist();
        break;
      }
    }
    // breach door swing
    if (this.doorAnim) {
      this.doorAnim.t += dt;
      const k = Math.min(1, this.doorAnim.t / 0.35);
      g.city.namedProps.halden.setOpen(1 - Math.pow(1 - k, 3));
      if (k >= 1) this.doorAnim = null;
    }
    // squad keeps up with an aggressive player during combat
    if (['lobby', 'download'].includes(this.stage)) {
      const w = this.waves[this.stage === 'lobby' ? 3 : 4];
      const alive = w ? w.soldiers.filter((s) => s.alive && !s.hiddenUntilActive) : [];
      const left = w ? w.soldiers.filter((s) => s.alive).length : 0;
      if (alive.length > 0 && left <= 2) for (const s of alive) if (!s.brain.rush) { s.brain.rush = true; s.brain.relocateT = 0; }
    }
    if (['wave1', 'wave2', 'wave3'].includes(this.stage)) {
      const a = g.squad.anchor;
      if (p.pos.z < a.z - 18 && p.pos.z > -166) g.squad.setAnchor(0, Math.max(p.pos.z + 6, a.z - 20), { radius: 8, facing: PI, combat: true });
      // remaining hostiles push the player when few are left
      const w = this.waves[{ wave1: 0, wave2: 1, wave3: 2, lobby: 3, download: 4 }[this.stage]];
      const alive = w ? w.soldiers.filter((s) => s.alive && !s.isStatic) : [];
      if (alive.length > 0 && alive.length <= 2) for (const s of alive) if (!s.brain.rush) { s.brain.rush = true; s.brain.relocateT = 0; }
    }
  }
}

export { setTimeoutGame };
