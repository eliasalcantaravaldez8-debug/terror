import * as THREE from 'three';
import { MissionBase, setTimeoutGame } from './MissionBase.js';
import { STATION } from '../world/districtLayout.js';

/**
 * MISSION 2 — "SINAL MORTO"
 * Dusk, same day. Radio silence after the Halden twist. The squad crosses
 * Teresk to the TV station's long-range transmitter to reach headquarters —
 * and someone else answers.
 */
export const MISSION2_ID = 'm02';
const PI = Math.PI;

const CHECKPOINTS = {
  start: 'Sala dos servidores do Halden',
  m2_avenue: 'Avenida Verkhov ao entardecer',
  m2_cross: 'Rua transversal leste',
  m2_station: 'Estação de TV de Teresk',
};

const WAVES = [
  {
    // patrol moving up the avenue toward the Halden
    id: 'p1', zone: { x0: -11, x1: 11, z0: -150, z1: -100 }, faceYaw: PI,
    enemies: [
      { x: -3.5, z: -113.4 }, { x: 3.5, z: -128, kind: 'smg' }, { x: -6.2, z: -125 }, { x: 4.5, z: -138.7 },
      { x: 0, z: -105, delay: 5, kind: 'shotgun' }, { x: 6, z: -103, delay: 8 },
    ],
  },
  {
    // roadblock on the east cross street
    id: 'p2', zone: { x0: 20, x1: 95, z0: -70, z1: -53 }, faceYaw: -PI / 2,
    enemies: [
      { x: 30, z: -59, kind: 'smg' }, { x: 41, z: -66 }, { x: 52, z: -58 }, { x: 62, z: -64, kind: 'mg' },
      { x: 76, z: -60 }, { x: 85, z: -66, kind: 'shotgun' },
      { x: 80, y: 13.5, z: -68.45, static: true, face: [0, 1] },
      { x: 88, z: -59, delay: 7 }, { x: 90, z: -64, delay: 10, kind: 'smg' },
    ],
  },
  {
    // station compound garrison
    id: 'p3', zone: { x0: 97, x1: 133, z0: -95, z1: -31 }, faceYaw: -PI / 2,
    enemies: [
      { id: 'tower', x: 101, y: 5, z: -40, static: true, kind: 'sniper', face: [-1, 0] },
      { x: 105, z: -62 }, { x: 108, z: -71, kind: 'smg' }, { x: 112.5, z: -57.2 }, { x: 107, z: -47.2, kind: 'shotgun' },
      { x: 120, z: -62 }, { x: 125, z: -70, kind: 'mg' }, { x: 129, z: -56 },
    ],
  },
  {
    // counter-attack while the transmitter warms up: through the gate and from the north yard
    id: 'p4', zone: { x0: 97, x1: 133, z0: -95, z1: -31 }, faceYaw: -PI / 2,
    enemies: [
      { x: 88, z: -61, delay: 3 }, { x: 86, z: -63, delay: 5, kind: 'smg' }, { x: 120, z: -93, delay: 9 },
      { x: 112, z: -93, delay: 12, kind: 'shotgun' }, { x: 88, z: -60, delay: 16 }, { x: 125, z: -93, delay: 20, kind: 'smg' },
      { x: 87, z: -62, delay: 25, kind: 'shotgun' }, { x: 116, z: -93, delay: 29 },
    ],
  },
];
const TRANSMIT_TIME = 35;

export class Mission02 extends MissionBase {
  constructor(game) {
    super(game, MISSION2_ID, { waves: WAVES, checkpoints: CHECKPOINTS, title: 'Sinal Morto' });
    this.number = 2;
    this.completeText = {
      top: 'MISSÃO 2 CONCLUÍDA', main: 'SINAL MORTO',
      body: 'O transmissor foi religado — e quem respondeu não era a coalizão.<br>Uma voz desconhecida sabe o nome de Mercer e promete o fim da Força-Tarefa Iron ao amanhecer.<br><b>Continua na Missão 3 — Porto de Vareny.</b>',
    };
  }

  start(checkpoint = 'start') {
    const g = this.game, p = g.player;
    this.resetWorld();
    this.checkpoint = checkpoint;
    this.transmit = null;
    this.ended = false;
    // dusk, heavier rain, the street is now open to the east
    const tod = g.pipeline.setTimeOfDay('dusk');
    g.effects.rainIntensity = tod.rain;
    g.mats.setNightLights(1.6);
    this.setEastGate(false, false);
    this.setHaldenDoor(true, true);
    const car = g.city.namedProps.rpgTarget;
    car.intact.visible = false; car.wreck.visible = true;
    g.pickups.add({ weaponId: 'lr6', position: new THREE.Vector3(-1.2, 1.4, -197.9), yaw: 0.2 });
    g.pickups.add({ weaponId: 'mk9', position: new THREE.Vector3(9.6, 1.03, -66), yaw: 1.2 });
    g.pickups.add({ weaponId: 'brk12', position: new THREE.Vector3(118, 1.03, -40), yaw: 2.0 });

    this.spawnSquad(['kane', 'ruiz', 'okafor']);
    g.weapons.setLowered(false);
    g.hud.setCombatHud(true);
    g.squad.setCombat(false);
    g.audio.setMusicIntensity(0.2);
    g.audio.battleIntensity = 0.6;

    switch (checkpoint) {
      case 'start':
        this.placeSquad([[-3, -199, 0.4], [3, -199.5, 0.4], [6, -197, 0.4]], 0);
        p.reset(new THREE.Vector3(0, 0.4, -197), 0);
        this.spawnWave(0); this.spawnWave(1); this.spawnWave(2);
        this._intro();
        break;
      case 'm2_avenue':
        this.placeSquad([[-3, -160], [3, -161], [5, -158]]);
        p.reset(new THREE.Vector3(0, 0, -158), 0);
        this.spawnWave(0); this.spawnWave(1); this.spawnWave(2);
        this._stageAvenue(true);
        break;
      case 'm2_cross':
        this.placeSquad([[-3, -60, 0], [3, -63], [6, -58]], -PI / 2);
        p.reset(new THREE.Vector3(5, 0, -61), -PI / 2);
        this.markWavesDone([0]);
        this.spawnWave(1); this.spawnWave(2);
        this._stageCross(true);
        break;
      case 'm2_station':
        this.placeSquad([[90, -60], [91, -64], [88, -62]], -PI / 2);
        p.reset(new THREE.Vector3(86, 0, -61.5), -PI / 2);
        this.markWavesDone([0, 1]);
        this.spawnWave(2);
        this._stageStation(true);
        break;
    }
  }

  // ------------------------------------------------------------ stages
  _intro() {
    const g = this.game;
    this.stage = 'exit';
    g.fade.set(1); g.fade.to(0, 2.5);
    g.squad.setAnchor(0, -190, { radius: 4, facing: PI, combat: false });
    g.hud.setObjective(null);
    this.schedule(1.5, () => g.hud.titleCard(['OPERATION: IRON SHADOW', 'MISSÃO 2 — SINAL MORTO', 'Distrito de Teresk · 14 de março de 2029 · 17:48', 'Sem contato com o comando'], 7000));
    g.dialogue.sequence([
      { speaker: 'KANE', text: 'Ainda nada do Bastião?', gap: 0.6 },
      { speaker: 'OKAFOR', text: 'Nada. Todos os canais da coalizão estão mudos. Ou derrubaram a rede... ou alguém cortou a gente de fora.' },
      { speaker: 'RUIZ', text: 'A estação de TV de Teresk tem um transmissor de longo alcance. De lá falamos direto com o QG em Varna, sem passar pelo Bastião.' },
      { speaker: 'KANE', text: 'Então é pra lá. Leste, pela rua transversal. Antes que escureça de vez.', onDone: () => this._stageAvenue(false) },
    ]);
  }

  _stageAvenue(fromCheckpoint) {
    const g = this.game;
    this.stage = 'avenue';
    g.hud.setObjective('Saia do Edifício Halden e siga para o sul pela avenida', new THREE.Vector3(0, 1.5, -120));
    g.squad.setAnchor(0, -150, { radius: 6, facing: 0, combat: false });
    if (!fromCheckpoint) this.schedule(0.5, () => g.hud.toast('Objetivo: estação de TV de Teresk', 3000));
  }

  _startPatrol() {
    const g = this.game;
    this.stage = 'patrol';
    this.activateWave(0);
    g.squad.setAnchor(0, -150, { radius: 7, facing: 0, combat: true });
    g.hud.setObjective('Elimine a patrulha do Vértice na avenida', new THREE.Vector3(0, 1.5, -125));
    g.audio.setMusicIntensity(0.85);
    g.dialogue.say({ speaker: 'OKAFOR', text: 'Patrulha do Vértice subindo a avenida! Eles estão voltando pro Halden!' });
  }

  _stageCross(fromCheckpoint) {
    const g = this.game;
    this.stage = 'toCross';
    g.squad.setAnchor(14, -61, { radius: 6, facing: -PI / 2, combat: false });
    g.hud.setObjective('Siga para leste pela rua transversal', new THREE.Vector3(35, 1.5, -61));
    g.audio.setMusicIntensity(0.3);
    if (!fromCheckpoint) {
      g.dialogue.sequence([
        { speaker: 'KANE', text: 'Avenida limpa. Pelo cruzamento, para o leste. Fiquem nas sombras.' },
        { speaker: 'RUIZ', text: 'Escurecendo rápido. Pelo menos a chuva cobre o barulho.' },
      ]);
      setTimeoutGame(g, 1.5, () => this.saveCheckpoint('m2_cross'));
    }
  }

  _startRoadblock() {
    const g = this.game;
    this.stage = 'roadblock';
    this.activateWave(1);
    g.squad.setAnchor(24, -61, { radius: 7, facing: -PI / 2, combat: true });
    g.hud.setObjective('Rompa o bloqueio na rua transversal', new THREE.Vector3(60, 1.5, -61));
    g.audio.setMusicIntensity(1);
    g.dialogue.say({ speaker: 'KANE', text: 'Bloqueio! Eles estão protegendo o caminho para a estação. Sabem para onde vamos!' });
  }

  _stageStation(fromCheckpoint) {
    const g = this.game;
    this.stage = 'toStation';
    g.squad.setAnchor(88, -61.5, { radius: 5, facing: -PI / 2, combat: false });
    g.hud.setObjective('Entre no complexo da estação de TV', new THREE.Vector3(97, 1.5, -61.5));
    g.audio.setMusicIntensity(0.35);
    if (!fromCheckpoint) {
      g.dialogue.sequence([
        { speaker: 'OKAFOR', text: 'Bloqueio caiu. A estação fica logo à frente, atrás do muro.' },
        { speaker: 'RUIZ', text: 'Torre de vigia à esquerda do portão. Cuidado com o atirador.' },
      ]);
      setTimeoutGame(g, 1.5, () => this.saveCheckpoint('m2_station'));
    }
  }

  _startCompound() {
    const g = this.game;
    this.stage = 'compound';
    this.activateWave(2);
    g.squad.setAnchor(99.5, -61.5, { radius: 6, facing: -PI / 2, combat: true });
    g.hud.setObjective('Tome o complexo da estação', new THREE.Vector3(115, 1.5, -60));
    g.audio.setMusicIntensity(1);
    g.dialogue.say({ speaker: 'KANE', text: 'Contato no pátio! Usem os contêineres e os geradores!' });
  }

  _stageTransmitter() {
    const g = this.game;
    this.stage = 'transmitter';
    g.squad.setAnchor(112, -48, { radius: 6, facing: -PI / 2, combat: false });
    g.hud.setObjective('Ligue o transmissor no galpão', new THREE.Vector3(STATION.panel.x, 1.6, STATION.panel.z));
    g.audio.setMusicIntensity(0.3);
    g.dialogue.sequence([
      { speaker: 'KANE', text: 'Pátio limpo!' },
      { speaker: 'OKAFOR', text: 'O painel do transmissor fica na lateral do galpão. Capitão, é com o senhor.' },
    ]);
  }

  _startTransmit() {
    const g = this.game;
    this.stage = 'transmit';
    this.transmit = { t: 0 };
    if (!this.waves[3]) this.spawnWave(3);
    this.activateWave(3);
    g.city.stationScreen.material = g.mats.emissive(0x48ff8a, 1.6);
    g.squad.setAnchor(108, -52, { radius: 7, facing: -PI / 2, combat: true });
    g.hud.setObjective('Defenda o transmissor até a portadora estabilizar', new THREE.Vector3(STATION.panel.x, 1.6, STATION.panel.z));
    g.hud.setProgress(0);
    g.audio.setMusicIntensity(0.95);
    g.audio.playFoley('ammo');
    g.dialogue.sequence([
      { speaker: 'OKAFOR', text: 'Transmissor aquecendo. Trinta e poucos segundos até a portadora.' },
      { speaker: 'RUIZ', text: 'Veículos no portão! E tem mais gente vindo pelo pátio norte!' },
    ]);
  }

  _ending() {
    const g = this.game;
    this.stage = 'ending';
    g.hud.setProgress(null);
    g.hud.setObjective(null);
    g.squad.setCombat(false);
    g.audio.setMusicIntensity(0.35);
    g.audio.battleIntensity = 0.2;
    g.dialogue.sequence([
      { speaker: 'OKAFOR', text: 'Portadora estável. Canal aberto para Varna.' },
      { speaker: 'KANE', text: 'Varna, aqui é Iron Seis. Solicitamos extração imediata no distrito de Teresk. Câmbio.' },
      { speaker: 'VOZ DESCONHECIDA', radio: true, text: 'Capitão Daniel Mercer. Você abriu arquivos que não eram seus.' },
      { speaker: 'KANE', text: 'Quem está falando? Identifique-se!' },
      { speaker: 'VOZ DESCONHECIDA', radio: true, text: 'Alguém que já esteve do seu lado. O Bastião não vai responder. Varna também não. Ao amanhecer, a Força-Tarefa Iron deixa de existir.', onDone: () => g.audio.radioStatic(2.5) },
      { speaker: 'RUIZ', text: 'Ele sabia o seu nome, capitão...' },
      { speaker: 'KANE', text: 'Desliga isso. A gente sai de Teresk do nosso jeito.', onDone: () => {
        g.audio.stinger();
        g.fade.to(1, 2.5);
        setTimeoutGame(g, 2.8, () => g.completeMission());
      } },
    ]);
  }

  // ------------------------------------------------------------ interactions
  onInteract(it) {
    if (it.id === 'transmitter' && this.stage === 'transmitter') { this._startTransmit(); return true; }
    return false;
  }
  interactAllowed(it) {
    if (it.id === 'transmitter') return this.stage === 'transmitter';
    return it.kind === 'ammo';
  }

  // ------------------------------------------------------------ update
  update(dt) {
    const g = this.game, p = g.player;
    const activeIdx = { patrol: 0, roadblock: 1, compound: 2, transmit: 3 }[this.stage] ?? null;
    this.updateCommon(dt, activeIdx);
    // blinking aviation lights on the mast
    if (g.city.mastBeacon) g.city.mastBeacon.emissiveIntensity = (this.t % 1.6) < 0.5 ? 4 : 0.2;
    // sniper glint on the guard tower
    const tw = this.named.tower;
    if (tw && tw.alive && tw.brain.active && tw.brain.phase === 'peek' && (this.t * 10) % 1 < 0.5) {
      const e = tw.getEye(new THREE.Vector3());
      g.effects.flashes.spawn({ x: e.x - 0.3, y: e.y, z: e.z, life: 0.08, size: 0.8, endSize: 0.5, color: [1, 1, 0.9], alpha: 0.9, fadeIn: 0 });
    }
    switch (this.stage) {
      case 'avenue':
        if (p.pos.z > -150) this._startPatrol();
        break;
      case 'patrol':
        if (this.waveCleared(0)) this._stageCross(false);
        break;
      case 'toCross':
        if (p.pos.x > 18 && p.pos.z < -50 && p.pos.z > -72) this._startRoadblock();
        break;
      case 'roadblock':
        if (this.waveCleared(1)) this._stageStation(false);
        break;
      case 'toStation':
        if (p.pos.x > 93) this._startCompound();
        break;
      case 'compound':
        if (this.waveCleared(2)) this._stageTransmitter();
        break;
      case 'transmit': {
        const tr = this.transmit;
        if (tr.t < TRANSMIT_TIME) {
          tr.t += dt;
          g.hud.setProgress(Math.min(1, tr.t / TRANSMIT_TIME));
          if (tr.t >= TRANSMIT_TIME && !this.waveCleared(3)) {
            g.hud.setObjective('Sinal pronto — elimine os hostis restantes', null);
            g.dialogue.say({ speaker: 'OKAFOR', text: 'Portadora pronta! Limpem o pátio para eu abrir o canal!' });
          }
        } else if (this.waveCleared(3)) this._ending();
        break;
      }
    }
    // keep the squad close to an aggressive player
    if (['patrol', 'roadblock', 'compound'].includes(this.stage)) {
      const a = g.squad.anchor;
      if (Math.hypot(p.pos.x - a.x, p.pos.z - a.z) > 22) g.squad.setAnchor(p.pos.x, p.pos.z, { radius: 8, facing: a.facing, combat: true });
    }
  }
}
