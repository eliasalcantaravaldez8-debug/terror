import * as THREE from 'three';
import { MissionBase, setTimeoutGame } from './MissionBase.js';
import { FOB } from '../world/FobBuilder.js';
import { Soldier } from '../ai/Soldier.js';
import { APPEARANCE } from '../characters/SoldierModel.js';
import { Loadout } from '../weapons/Loadout.js';
import { buildHelicopter, HelicopterController } from '../world/Helicopter.js';

/**
 * MISSION 7 — "QUEDA"
 * Night, rain. The team delivers the recording to Major Hale at FOB Bastião —
 * and Hale is Serrat's man. Disarmed to their sidearms, they fight out of the
 * command post in the dark, re-arm at the armory, cross the base to the helipad
 * and hold until Falcon 2-1 pulls them out. By morning they are declared traitors.
 */
export const MISSION7_ID = 'm07';
const PI = Math.PI;
const HOLD_TIME = 50;
const C = FOB.toc;

const CHECKPOINTS = {
  start: 'FOB Bastião — portão',
  m7_armory: 'FOB Bastião — fuga do centro de comando',
  m7_yard: 'FOB Bastião — arsenal',
  m7_hold: 'FOB Bastião — heliponto',
};

const WAVES = [
  {
    // the garrison: friendly-looking until the lights go out
    id: 'garrison', look: 'coalition', zone: { x0: 324, x1: 476, z0: 1324, z1: 1476 }, faceYaw: PI,
    enemies: [
      { x: 391, z: 1458 }, { x: 410, z: 1460, kind: 'smg' }, { x: 372, z: 1430 }, { x: 430, z: 1426, kind: 'mg' },
      { x: 350, z: 1412 }, { x: 446, z: 1439, kind: 'shotgun' }, { x: 388, z: 1372 }, { x: 418, z: 1373, kind: 'smg' },
      { x: 470, z: 1400 }, { x: 330, z: 1444 },
    ],
  },
  {
    // after the armory: tower gunners and troops pouring out of the tents
    id: 'reinforce', look: 'coalition', zone: { x0: 324, x1: 476, z0: 1324, z1: 1476 }, faceYaw: 0,
    enemies: [
      { x: FOB.towers[0][0], y: 5.0, z: FOB.towers[0][1], static: true, face: [1, 1] },
      { x: FOB.towers[1][0], y: 5.0, z: FOB.towers[1][1], static: true, face: [-1, 1], kind: 'mg' },
      { x: FOB.towers[3][0], y: 5.0, z: FOB.towers[3][1], static: true, face: [-1, -1] },
      { x: 345, z: 1407, delay: 2 }, { x: 367, z: 1407, delay: 4, kind: 'smg' }, { x: 345, z: 1441, delay: 6, kind: 'shotgun' },
      { x: 367, z: 1441, delay: 9 }, { x: 345, z: 1407, delay: 13, kind: 'mg' }, { x: 367, z: 1407, delay: 17, rush: true },
    ],
  },
  {
    // military police inside the command post
    id: 'toc', look: 'coalition', zone: { x0: 381, x1: 419, z0: 1339, z1: 1359 }, faceYaw: PI,
    enemies: [
      { x: 393.5, z: 1345.5, kind: 'smg', cap: true }, { x: 406.5, z: 1345.5, kind: 'smg', cap: true },
      { x: 386, z: 1356 }, { x: 414, z: 1356, kind: 'shotgun' }, { x: 391, z: 1357.5, cap: true }, { x: 409, z: 1357.5, kind: 'smg', cap: true },
    ],
  },
  {
    // the hold at the helipad
    id: 'hold', look: 'coalition', zone: { x0: 324, x1: 400, z0: 1324, z1: 1400 }, faceYaw: 0,
    enemies: [
      { x: 395, z: 1392, delay: 2, rush: true }, { x: 380, z: 1400, delay: 4 }, { x: 330, z: 1400, delay: 7, kind: 'smg' },
      { x: 410, z: 1360, delay: 10, kind: 'mg' }, { x: 395, z: 1392, delay: 14, kind: 'shotgun' }, { x: 380, z: 1400, delay: 18 },
      { x: 345, z: 1407, delay: 22, rush: true }, { x: 410, z: 1360, delay: 26 }, { x: 367, z: 1407, delay: 30, kind: 'smg', rush: true },
    ],
  },
];

export class Mission07 extends MissionBase {
  constructor(game) {
    super(game, MISSION7_ID, { waves: WAVES, checkpoints: CHECKPOINTS, title: 'Queda' });
    this.number = 7;
    this.nightVision = true;
    this.completeText = {
      top: 'MISSÃO 7 CONCLUÍDA', main: 'QUEDA',
      body: 'Hale era do Serrat desde o início. Ao amanhecer, todos os canais da coalizão repetem a mesma ordem: a equipe Iron é traidora — atirar à vista.<br>Mas Okafor trocou os discos: a gravação verdadeira continua com eles.<br><b>A campanha continua na Missão 8 — Montanha (em desenvolvimento).</b>',
    };
    this.heliParts = buildHelicopter(game.mats, { interior: false });
    this.heliParts.root.visible = false;
    game.scene.add(this.heliParts.root);
    this.heli = new HelicopterController(this.heliParts, [{ t: 0, x: 0, y: 0, z: 0, yaw: 0, pitch: 0, roll: 0 }]);
    this.hale = null;
    this.flares = [];
  }

  // ------------------------------------------------------------ base power
  _setPower(on) {
    const g = this.game, P = g.city.namedProps;
    for (const d of P.fobLights) if (d._req) d._req.intensity = on ? d.intensity : 0;
    const off = g.mats.paint('#141414', 197);
    for (const mesh of P.fobEmissive) {
      if (!mesh.userData.litMat) mesh.userData.litMat = mesh.material;
      mesh.material = on ? mesh.userData.litMat : off;
    }
    if (!on && !this.alarmLight) this.alarmLight = g.effects.requestLight({ pos: new THREE.Vector3(400, 3.6, 1362), color: 0xff2a1a, intensity: 0, distance: 26, decay: 1.4 });
    if (on && this.alarmLight) { g.effects.removeLight(this.alarmLight); this.alarmLight = null; }
    this.power = on;
  }

  exit() {
    const g = this.game;
    this._setPower(true);
    g.pipeline.setNightVision(false);
    this.heliParts.root.visible = false;
    this.heliAudio?.stop(); this.heliAudio = null;
    for (const f of this.flares) g.effects.removeLight(f.light);
    this.flares = [];
    if (this.hale) { this.hale.dispose(); this.hale = null; }
  }

  start(checkpoint = 'start') {
    const g = this.game, p = g.player;
    this.resetWorld();
    this.exit();
    g.setRegion('fob');
    this.checkpoint = checkpoint;
    const tod = g.pipeline.setTimeOfDay('night');
    g.effects.rainIntensity = tod.rain * 1.4;
    g.mats.setNightLights(2.2);
    g.hud.setCombatHud(true);
    this.spawnSquad(['kane', 'ruiz', 'okafor']);
    this.flareT = 8;
    this.holdT = 0;

    // weapons racked in the armory (the player's own primary among them)
    const own = Loadout.data.primary;
    const rack = [own, 'vkm', 'sr50', 'brk12'].map((id, i, a) => (a.indexOf(id) !== i ? 'kr4' : id));
    if (checkpoint === 'start' || checkpoint === 'm7_armory') {
      rack.forEach((id, i) => g.pickups.add({ weaponId: id, position: new THREE.Vector3(FOB.racks[i].x, FOB.racks[i].y, FOB.racks[i].z), yaw: PI / 2 }));
    }

    switch (checkpoint) {
      case 'start': {
        this._setPower(true);
        g.weapons.setSidearmOnly();
        g.weapons.setLowered(true);
        this.spawnWave(0);
        for (const s of this.waves[0].soldiers) s.yaw = s.faceYaw = Math.random() * PI * 2;
        this.spawnWave(1);
        this.spawnWave(2);
        this._spawnHale();
        p.reset(new THREE.Vector3(FOB.start.x, 0, FOB.start.z), 0);
        this.placeSquad([[398, 1476], [402, 1477], [444, 1452]], 0);
        this._ruizAtTrucks(true);
        this._intro();
        break;
      }
      case 'm7_armory':
        this._setPower(false);
        if (g.weapons.slots.length > 1 && !g.weapons.slots.some((s) => s.def.slot === 'secondary')) g.weapons.setSidearmOnly();
        g.weapons.setLowered(false);
        this.spawnWave(0); this.activateWave(0);
        this.spawnWave(1);
        this.markWavesDone([2]);
        p.reset(new THREE.Vector3(411, 0, 1334), PI / 2);
        this.placeSquad([[409, 1333], [413, 1333], [411, 1331]], -PI / 2);
        this._stageArmory(true);
        break;
      case 'm7_yard':
        this._setPower(false);
        g.weapons.setLowered(false);
        this.markWavesDone([0, 2]);
        this.spawnWave(1);
        p.reset(new THREE.Vector3(446, 0, 1388), PI / 2);
        this.placeSquad([[442, 1390], [449, 1391], [445, 1392]], PI / 2);
        this._stageYard(true);
        break;
      case 'm7_hold':
        this._setPower(false);
        g.weapons.setLowered(false);
        this.markWavesDone([0, 1, 2]);
        p.reset(new THREE.Vector3(352, 0, 1350), PI / 2);
        this.placeSquad([[348, 1352], [355, 1349], [350, 1356]], -PI / 2);
        this._stageHold(true);
        break;
    }
  }

  _spawnHale() {
    const g = this.game;
    const s = new Soldier(g, { team: 'enemy', name: 'HALE', id: 'hale', x: 400, z: 1340.3, kind: 'smg', invulnerable: true, appearance: APPEARANCE.coalition(g.mats, { cap: true, armband: false, skin: '#c49a7a' }) });
    s.yaw = 0; s.faceYaw = 0;
    g.actors.push(s);
    g.dialogue.registerActor('HALE', s);
    this.hale = s;
  }

  _ruizAtTrucks(on) {
    const r = this.squadById.ruiz;
    if (!r) return;
    r.scripted = on;
    if (on) { r.pos.set(444, 0, 1452); r.yaw = PI; }
  }

  // ------------------------------------------------------------ arrival
  _intro() {
    const g = this.game;
    this.stage = 'arrive';
    g.fade.set(1); g.fade.to(0, 3);
    g.audio.setMusicIntensity(0.1);
    g.audio.battleIntensity = 0;
    g.squad.setAnchor(400, 1366, { radius: 4, facing: 0, combat: false });
    g.hud.setObjective('Entregue a gravação ao Major Hale no centro de comando', new THREE.Vector3(FOB.desk.x, 1.6, FOB.desk.z));
    this.schedule(1.2, () => g.hud.titleCard(['OPERATION: IRON SHADOW', 'MISSÃO 7 — QUEDA', 'FOB Bastião · 18 de março de 2029 · 23:10', 'Fronteira de Kessel'], 7000));
    g.dialogue.sequence([
      { speaker: 'SOLDADO DE BASTIÃO', text: 'Equipe Iron? O major espera vocês no centro de comando. Armas longas ficam no arsenal — protocolo da base.', gap: 0.6 },
      { speaker: 'KANE', text: 'Não gosto de entregar o fuzil.' },
      { speaker: 'OKAFOR', text: 'É uma base da coalizão, sargento. Se não confiarmos neles, não confiamos em mais ninguém.' },
      { speaker: 'RUIZ', radio: true, text: 'Eu fico com os caminhões. Qualquer coisa, chamem.' },
    ]);
    this.schedule(9, () => g.hud.toast('Sem armas longas: só a pistola, e guardada. E para interagir.', 5000));
  }

  _betrayal() {
    const g = this.game;
    this.stage = 'betrayal';
    g.hud.setObjective(null);
    g.audio.setMusicIntensity(0.35);
    g.squad.setAnchor(400, 1353, { radius: 3, facing: 0, combat: false });
    g.dialogue.sequence([
      { speaker: 'HALE', text: 'Capitão Mercer. Finalmente.' },
      { speaker: 'MERCER', text: 'A confissão do Serrat, major. Cada palavra.' },
      { speaker: 'HALE', text: 'Eu sei o que tem aí. Eu estava naquela sala quando ele ensaiou o discurso.' },
      { speaker: 'HALE', text: 'O comando unificado vai acontecer, capitão. Com ou sem a sua gravação. Prendam-nos.' },
      { speaker: 'SOLDADO DE BASTIÃO', text: 'Mãos onde eu possa ver! Agora!' },
      { speaker: 'KANE', radio: true, text: 'Ruiz... apaga as luzes.' },
      { speaker: 'RUIZ', radio: true, text: 'Com prazer.', onDone: () => this._lightsOut() },
    ]);
  }

  _lightsOut() {
    const g = this.game, G0 = FOB.generator;
    this.stage = 'escape';
    g.audio.playShot(new THREE.Vector3(444, 1.5, 1452), 'sniper', false);
    setTimeoutGame(g, 0.25, () => {
      g.effects.explosion(new THREE.Vector3(G0.x, 1.2, G0.z), 1.6);
      g.audio.playExplosion(new THREE.Vector3(G0.x, 1.2, G0.z), 1.6);
      this.genFire = g.effects.addFire({ x: G0.x, y: 1.6, z: G0.z }, 1.2, true);
      this._setPower(false);
      g.slowMotion(0.3, 1.8);
      g.weapons.setLowered(false);
      this.activateWave(2);
      this.activateWave(0);
      for (const s of this.waves[0].soldiers) s.faceYaw = null;
      this._ruizAtTrucks(false);
      g.audio.setMusicIntensity(1);
      g.audio.battleIntensity = 1;
      g.squad.setAnchor(400, 1352, { radius: 4, facing: PI, combat: true });
      // Hale slips out of the back door
      this.hale.moveTo(411, 1333, 4.5);
      g.hud.setObjective('Sobreviva — saia do centro de comando', new THREE.Vector3(411, 1.4, 1337));
      g.hud.toast('N: visão noturna', 4000);
      g.dialogue.sequence([
        { speaker: 'KANE', text: 'Abaixem-se! Okafor, a prova!' },
        { speaker: 'OKAFOR', text: 'Está comigo! O disco que ele pegou está vazio!' },
        { speaker: 'HALE', radio: true, text: 'A todas as unidades de Bastião: a equipe Iron é hostil. Ninguém sai desta base.' },
      ]);
    });
  }

  _stageArmory(fromCheckpoint) {
    const g = this.game;
    this.stage = 'armory';
    g.squad.setAnchor(430, 1372, { radius: 6, facing: PI / 2, combat: true });
    g.hud.setObjective('Recupere armas longas no arsenal', new THREE.Vector3((FOB.armory.x0 + FOB.armory.x1) / 2, 1.4, FOB.armory.z0 + 1));
    if (!fromCheckpoint) {
      g.dialogue.say({ speaker: 'KANE', text: 'Arsenal a leste! Peguem os fuzis, pistola não segura essa base!' });
      setTimeoutGame(g, 1, () => this.saveCheckpoint('m7_armory'));
    }
  }

  _stageYard(fromCheckpoint) {
    const g = this.game;
    this.stage = 'yard';
    this.activateWave(1);
    g.squad.setAnchor(400, 1380, { radius: 9, facing: -PI / 2, combat: true });
    g.hud.setObjective('Atravesse a base até o heliponto', new THREE.Vector3(FOB.helipad.x, 1.2, FOB.helipad.z));
    g.audio.setMusicIntensity(1);
    if (!fromCheckpoint) {
      setTimeoutGame(g, 1, () => this.saveCheckpoint('m7_yard'));
      g.dialogue.sequence([
        { speaker: 'RUIZ', radio: true, text: 'Falcon 2-1, aqui é Iron! Extração em Bastião, heliponto noroeste, agora!' },
        { speaker: 'FALCON 2-1', radio: true, text: 'Bastião?! ...Entendido. Um minuto. Fiquem vivos até lá.' },
        { speaker: 'OKAFOR', text: 'Torres de vigia! Fiquem longe dos holofotes de emergência!', gap: 2 },
      ]);
    }
  }

  _stageHold(fromCheckpoint) {
    const g = this.game;
    this.stage = 'hold';
    this.holdT = 0;
    this.spawnWave(3);
    this.activateWave(3);
    g.squad.setAnchor(FOB.helipad.x + 6, FOB.helipad.z + 6, { radius: 7, facing: 0.6, combat: true });
    g.hud.setObjective('Defenda o heliponto até o Falcon pousar', new THREE.Vector3(FOB.helipad.x, 1.2, FOB.helipad.z));
    g.hud.setProgress(0);
    if (!fromCheckpoint) {
      setTimeoutGame(g, 1, () => this.saveCheckpoint('m7_hold'));
      g.dialogue.say({ speaker: 'KANE', text: 'Heliponto! Formem um perímetro! Eles vêm das barracas!' });
    }
  }

  _falconIn() {
    const g = this.game, P = FOB.helipad;
    this.stage = 'board';
    g.hud.setProgress(null);
    this.heli.setKeys([
      { t: 0, x: P.x - 200, y: 70, z: P.z - 160, yaw: PI * 0.25, pitch: 0.12, roll: 0 },
      { t: 9, x: P.x - 30, y: 22, z: P.z - 20, yaw: PI * 0.25, pitch: -0.05, roll: 0.05 },
      { t: 14, x: P.x, y: 3, z: P.z, yaw: PI * 0.5, pitch: -0.08, roll: 0 },
      { t: 17, x: P.x, y: 0.4, z: P.z, yaw: PI * 0.5, pitch: 0, roll: 0 },
    ], 0);
    this.heli.turbulence = 0.5; this.heli.rpm = 1;
    this.heliParts.root.visible = true;
    this.heliAudio = g.audio.createHelicopter();
    if (this.heliAudio) { this.heliAudio.setInside(false); this.heliAudio.setRPM(1); this.heliAudio.setVolume(0.9, 1); }
    g.hud.setObjective('Embarque no Falcon', new THREE.Vector3(P.x, 1.5, P.z));
    g.dialogue.say({ speaker: 'FALCON 2-1', radio: true, text: 'Falcon 2-1 no heliponto! Todo mundo pra dentro, eles têm um lançador!' });
  }

  _extract() {
    const g = this.game;
    this.stage = 'ending';
    g.hud.setObjective(null);
    g.audio.setMusicIntensity(0.3);
    g.dialogue.sequence([
      { speaker: 'FALCON 2-1', radio: true, text: 'Todos a bordo! Saindo de Bastião!' },
      { speaker: 'HALE', radio: true, text: 'A todas as unidades da coalizão: a equipe Iron atacou FOB Bastião e matou soldados aliados. Estão declarados traidores. Atirem à vista.' },
      { speaker: 'KANE', text: 'Pronto. Agora os procurados somos nós.' },
      { speaker: 'OKAFOR', text: 'Mas a prova continua aqui. E agora sabemos quem mais estava naquela sala.', onDone: () => { g.fade.to(1, 2.5); setTimeoutGame(g, 2.8, () => g.completeMission()); } },
    ]);
  }

  onInteract(it) {
    if (it.id === 'haleDesk' && this.stage === 'arrive') { this._betrayal(); return true; }
    return false;
  }
  interactAllowed(it) {
    if (it.id === 'haleDesk') return this.stage === 'arrive';
    return it.kind === 'ammo' && this.stage !== 'arrive';
  }

  // ------------------------------------------------------------ update
  _updateFlares(dt) {
    const g = this.game;
    if (!this.power && ['armory', 'yard', 'hold', 'board'].includes(this.stage)) {
      this.flareT -= dt;
      if (this.flareT <= 0) {
        this.flareT = 16 + Math.random() * 8;
        const pos = new THREE.Vector3(340 + Math.random() * 120, 70, 1340 + Math.random() * 120);
        this.flares.push({ pos, life: 22, light: g.effects.requestLight({ pos, color: 0xfff1d0, intensity: 0, distance: 120, decay: 1.2 }) });
        g.audio.playShot(new THREE.Vector3(pos.x, 1, pos.z), 'pistol', false);
      }
    }
    for (let i = this.flares.length - 1; i >= 0; i--) {
      const f = this.flares[i];
      f.life -= dt;
      f.pos.y = Math.max(4, f.pos.y - dt * 2.6);
      f.pos.x += Math.sin(g.time * 0.4 + i) * dt * 0.6;
      f.light.pos.copy(f.pos);
      f.light.intensity = (f.life > 20 ? (22 - f.life) / 2 : Math.min(1, f.life / 3)) * (16 + Math.sin(g.time * 23 + i) * 3);
      if (Math.random() < 0.6) g.effects.flashes.spawn({ x: f.pos.x, y: f.pos.y, z: f.pos.z, life: 0.08, size: 1.4, endSize: 1, color: [1, 0.95, 0.8], alpha: 1, fadeIn: 0 });
      if (Math.random() < 0.3) g.effects.smoke.spawn({ x: f.pos.x, y: f.pos.y + 0.5, z: f.pos.z, life: 4, size: 0.6, endSize: 2.5, color: [0.7, 0.7, 0.7], alpha: 0.25, drag: 1 });
      if (f.life <= 0) { g.effects.removeLight(f.light); this.flares.splice(i, 1); }
    }
  }

  update(dt) {
    const g = this.game, p = g.player;
    const activeIdx = { escape: 2, armory: 0, yard: 1, hold: 3, board: 3 }[this.stage] ?? null;
    this.updateCommon(dt, activeIdx);
    if (g.input.actionPressed('nightVision') && g.state === 'playing' && !this.power) { g.pipeline.setNightVision(!g.pipeline.nightVision); g.audio.uiClick(); }
    if (this.alarmLight) this.alarmLight.intensity = Math.max(0, Math.sin(g.time * 5)) * 5;
    this._updateFlares(dt);
    // Ruiz holds by the trucks until the lights go out
    const r = this.squadById.ruiz;
    if (r?.scripted) { r.pos.set(444, 0, 1452); r.yaw = PI; }
    if (this.hale?.alive && this.stage !== 'arrive' && this.stage !== 'betrayal' && this.hale.arrived && this.hale.pos.z < 1336) {
      this.hale.alive = false; this.hale.model.root.visible = false;
    }
    if (this.heliParts.root.visible) {
      this.heli.update(dt, this.t);
      this.heliAudio?.setPosition(this.heli.position);
      g.effects.rotorWash(this.heli.position, Math.max(0, 1 - this.heli.position.y / 16), dt);
    }
    switch (this.stage) {
      case 'escape': {
        const outside = p.pos.z < C.z0 - 0.5 || p.pos.z > C.z1 + 0.5 || p.pos.x < C.x0 || p.pos.x > C.x1;
        if (this.waveCleared(2) || (outside && this.waves[2].soldiers.filter((s) => s.alive).length <= 2)) this._stageArmory(false);
        break;
      }
      case 'armory':
        if (g.weapons.slots.length > 1) this._stageYard(false);
        break;
      case 'yard': {
        const near = Math.hypot(p.pos.x - FOB.helipad.x, p.pos.z - FOB.helipad.z) < 16;
        const left = this.waves[1].soldiers.filter((s) => s.alive).length;
        if (near && left <= 4) {
          for (const s of this.waves[1].soldiers) if (s.alive && s.isStatic) { /* tower gunners stay */ }
          this._stageHold(false);
        }
        break;
      }
      case 'hold':
        this.holdT += dt;
        g.hud.setProgress(Math.min(1, this.holdT / HOLD_TIME));
        if (this.holdT >= HOLD_TIME) this._falconIn();
        break;
      case 'board':
        if (this.heli.done && Math.hypot(p.pos.x - FOB.helipad.x, p.pos.z - FOB.helipad.z) < 7) this._extract();
        break;
    }
  }
}
