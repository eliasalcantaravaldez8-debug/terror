import * as THREE from 'three';
import { MissionBase, setTimeoutGame } from './MissionBase.js';
import { PORT } from '../world/portLayout.js';

/**
 * MISSION 3 — "PORTO DE VARENY"
 * Dawn, the next day. Okafor traced the unknown voice's transmission to a cargo
 * ship moored in Vareny. The squad storms the port, the player boards the ship
 * alone, finds who is behind VÉRTICE — and has to get off before it blows.
 */
export const MISSION3_ID = 'm03';
const PI = Math.PI;
const S = PORT.ship;

const CHECKPOINTS = {
  start: 'Estrada de acesso ao porto',
  m3_yard: 'Pátio de contêineres',
  m3_quay: 'Cais de Vareny',
  m3_deck: 'Prancha do navio Kestrel Star',
};

const WAVES = [
  {
    id: 'gate', zone: { x0: 975, x1: 1035, z0: 42, z1: 89 },
    enemies: [
      { id: 'gtower', x: 1013, y: 6, z: 70.6, static: true, face: [0, 1] },
      { x: 996, z: 67.2 }, { x: 1007, z: 65.6, kind: 'smg' }, { x: 1024, z: 58.6 }, { x: 984, z: 60 },
      { x: 999, z: 44.8, kind: 'mg' }, { x: 1000, z: 50, delay: 6 }, { x: 985, z: 52, delay: 9, kind: 'shotgun' },
    ],
  },
  {
    id: 'yard', zone: { x0: 942, x1: 1108, z0: -45, z1: 40 },
    enemies: [
      { x: 1000, z: 7.8 }, { x: 1010, z: -6.2, kind: 'smg' }, { x: 975, z: -6.2 }, { x: 1030, z: 7.8 },
      { x: 1045, z: -20.2, kind: 'shotgun' }, { x: 985, z: -20.2 },
      { id: 'crane', x: 1053, y: 15.4, z: 32.6, static: true, kind: 'sniper', face: [0, 1] },
      { x: 1000, z: -35, delay: 5, kind: 'smg' }, { x: 1020, z: -34, delay: 9 }, { x: 960, z: -34, delay: 12, kind: 'shotgun' },
    ],
  },
  {
    id: 'quay', zone: { x0: 935, x1: 1165, z0: -88, z1: -55 },
    enemies: [
      { x: 995, z: -65.4 }, { x: 1012, z: -74.4, kind: 'mg' }, { x: 1030, z: -67.4 }, { x: 1048, z: -64.4, kind: 'smg' },
      { x: 978, z: -73.4 }, { x: 1070, z: -70 },
      { x: 1000, y: 7, z: -93.6, static: true, face: [0, 1] }, { x: 1024, y: 7, z: -93.6, static: true, face: [0, 1], kind: 'smg' },
      { x: 1056, y: 7, z: -93.6, static: true, face: [0, 1] },
    ],
  },
  {
    // on deck: they hold their ground behind the cargo (no nav up there)
    id: 'deck', zone: { x0: 955, x1: 1090, z0: -113, z1: -93 }, faceYaw: 0,
    enemies: [
      { x: 1018, y: 7, z: -103.4, static: true }, { x: 1008.6, y: 7, z: -110.6, static: true, kind: 'shotgun' },
      { x: 988, y: 7, z: -103.2, static: true, kind: 'smg' }, { x: 1046, y: 7, z: -103.4, static: true },
      { x: 980, y: 7, z: -110.5, static: true }, { x: 978, y: 7, z: -96, static: true, delay: 6, kind: 'smg' },
      { x: 979, y: 7, z: -98, static: true, delay: 11, kind: 'shotgun' },
    ],
  },
];
const ESCAPE_TIME = 32;

export class Mission03 extends MissionBase {
  constructor(game) {
    super(game, MISSION3_ID, { waves: WAVES, checkpoints: CHECKPOINTS, title: 'Porto de Vareny' });
    this.number = 3;
    this.completeText = {
      top: 'MISSÃO 3 CONCLUÍDA', main: 'PORTO DE VARENY',
      body: 'O homem por trás do VÉRTICE tem nome: General Aldo Serrat, vice-comandante da coalizão.<br>O Kestrel Star afundou com parte das provas — mas a equipe Iron saiu viva, e agora sabe quem caçar.<br><b>Continua na Missão 4 — Céu Cinzento.</b>',
    };
    this.explosions = [];
  }

  start(checkpoint = 'start') {
    const g = this.game, p = g.player;
    this.resetWorld();
    g.setRegion('port');
    this.checkpoint = checkpoint;
    this.escape = null;
    this.blown = false;
    const tod = g.pipeline.setTimeOfDay('dawn');
    g.effects.rainIntensity = tod.rain;
    g.mats.setNightLights(0.5);
    g.city.shipScreen.material = g.mats.emissive(0x7fd0ff, 0.9);
    g.pickups.add({ weaponId: 'lr6', position: new THREE.Vector3(1000, 1.03, 76), yaw: 0.3 });
    g.pickups.add({ weaponId: 'brk12', position: new THREE.Vector3(1058, 1.03, -78), yaw: 1.1 });
    g.pickups.add({ weaponId: 'mk9', position: new THREE.Vector3(1010.5, 1.2, -5), yaw: 2.4 });
    this.spawnSquad(['kane', 'ruiz', 'okafor']);
    g.weapons.setLowered(false);
    g.hud.setCombatHud(true);
    g.squad.setCombat(false);
    g.audio.setMusicIntensity(0.2);
    g.audio.battleIntensity = 0.3;

    switch (checkpoint) {
      case 'start':
        this.placeSquad([[997, 125], [1003, 126], [1000, 130]], PI);
        p.reset(new THREE.Vector3(PORT.start.x, 0, PORT.start.z), 0);
        this.spawnWave(0); this.spawnWave(1); this.spawnWave(2);
        this._intro();
        break;
      case 'm3_yard':
        this.placeSquad([[996, 44], [1004, 43], [1000, 48]], PI);
        p.reset(new THREE.Vector3(1000, 0, 46), 0);
        this.markWavesDone([0]); this.spawnWave(1); this.spawnWave(2);
        this._stageToYard(true);
        break;
      case 'm3_quay':
        this.placeSquad([[997, -44], [1003, -45], [1000, -42]], PI);
        p.reset(new THREE.Vector3(1000, 0, -46), 0);
        this.markWavesDone([0, 1]); this.spawnWave(2);
        this._stageToQuay(true);
        break;
      case 'm3_deck':
        this.placeSquad([[1035, -74], [1046, -73], [1040, -70]], PI);
        p.reset(new THREE.Vector3(1040, 0, -74), 0);
        this.markWavesDone([0, 1, 2]);
        this._stageBoard(true);
        break;
    }
  }

  // ------------------------------------------------------------ stages
  _intro() {
    const g = this.game;
    this.stage = 'approach';
    g.fade.set(1); g.fade.to(0, 3);
    g.squad.setAnchor(1000, 100, { radius: 5, facing: 0 + PI, combat: false });
    g.hud.setObjective(null);
    this.schedule(1.2, () => g.hud.titleCard(['OPERATION: IRON SHADOW', 'MISSÃO 3 — PORTO DE VARENY', 'Costa de Vareny · 15 de março de 2029 · 05:41', 'O sinal veio do mar'], 7000));
    g.dialogue.sequence([
      { speaker: 'OKAFOR', text: 'Rastreei a transmissão de ontem. Ela não veio de Varna. Veio de um navio de carga atracado aqui, o Kestrel Star.', gap: 0.5 },
      { speaker: 'RUIZ', text: 'Bandeira de conveniência, carga declarada como peças agrícolas. Partida marcada para as seis e meia.' },
      { speaker: 'KANE', text: 'Então temos menos de uma hora. Entramos pelo portão, cruzamos o pátio e subimos a bordo.' },
      { speaker: 'KANE', text: 'Capitão, quem estava naquele rádio está naquele navio. Vamos buscar um nome.', onDone: () => this._stageApproach() },
    ]);
  }

  _stageApproach() {
    const g = this.game;
    this.stage = 'toGate';
    g.squad.setAnchor(1000, 96, { radius: 6, facing: PI, combat: false });
    g.hud.setObjective('Entre no porto pelo portão principal', new THREE.Vector3(1000, 1.5, 90));
  }

  _startGate() {
    const g = this.game;
    this.stage = 'gate';
    this.activateWave(0);
    g.squad.setAnchor(1000, 92, { radius: 7, facing: PI, combat: true });
    g.hud.setObjective('Neutralize a guarda do portão', new THREE.Vector3(1000, 1.5, 62));
    g.audio.setMusicIntensity(0.9);
    g.dialogue.say({ speaker: 'RUIZ', text: 'Guarda no portão! Torre de vigia à direita!' });
  }

  _stageToYard(fromCheckpoint) {
    const g = this.game;
    this.stage = 'toYard';
    g.squad.setAnchor(1000, 46, { radius: 6, facing: PI, combat: false });
    g.hud.setObjective('Atravesse o pátio de contêineres', new THREE.Vector3(1000, 1.5, 2));
    g.audio.setMusicIntensity(0.3);
    if (!fromCheckpoint) {
      g.dialogue.sequence([
        { speaker: 'KANE', text: 'Portão limpo. Pelo corredor central dos contêineres, devagar.' },
        { speaker: 'OKAFOR', text: 'Labirinto perfeito pra emboscada. Olhem em cima das pilhas.' },
      ]);
      setTimeoutGame(g, 1.5, () => this.saveCheckpoint('m3_yard'));
    }
  }

  _startYard() {
    const g = this.game;
    this.stage = 'yard';
    this.activateWave(1);
    g.squad.setAnchor(1000, 30, { radius: 7, facing: PI, combat: true });
    g.hud.setObjective('Abra caminho pelo pátio de contêineres', new THREE.Vector3(1000, 1.5, -30));
    g.audio.setMusicIntensity(1);
    g.dialogue.say({ speaker: 'KANE', text: 'Contato no pátio! E tem um atirador na cabine do guindaste!' });
  }

  _stageToQuay(fromCheckpoint) {
    const g = this.game;
    this.stage = 'toQuay';
    g.squad.setAnchor(1000, -44, { radius: 6, facing: PI, combat: false });
    g.hud.setObjective('Avance até o cais', new THREE.Vector3(1040, 1.5, -66));
    g.audio.setMusicIntensity(0.35);
    if (!fromCheckpoint) {
      g.dialogue.sequence([
        { speaker: 'RUIZ', text: 'Lá está o Kestrel Star. Motores aquecendo — fumaça na chaminé.' },
        { speaker: 'KANE', text: 'Eles vão zarpar. Pro cais, agora!' },
      ]);
      setTimeoutGame(g, 1.5, () => this.saveCheckpoint('m3_quay'));
    }
  }

  _startQuay() {
    const g = this.game;
    this.stage = 'quay';
    this.activateWave(2);
    g.squad.setAnchor(1000, -56, { radius: 8, facing: PI, combat: true });
    g.hud.setObjective('Tome o cais — atiradores no convés do navio', new THREE.Vector3(1040, 1.5, -80));
    g.audio.setMusicIntensity(1);
    g.dialogue.say({ speaker: 'OKAFOR', text: 'Fogo vindo do convés! Fiquem atrás dos contêineres!' });
  }

  _stageBoard(fromCheckpoint) {
    const g = this.game;
    this.stage = 'board';
    if (!this.waves[3]) this.spawnWave(3);
    g.squad.setAnchor(1040, -73, { radius: 6, facing: PI, combat: true });
    g.hud.setObjective('Suba a bordo pela prancha', new THREE.Vector3(1040, 2, -80));
    g.audio.setMusicIntensity(0.5);
    if (!fromCheckpoint) {
      g.dialogue.sequence([
        { speaker: 'KANE', text: 'A prancha só aguenta um de cada vez. Capitão, o senhor sobe — a gente cobre daqui de baixo!' },
        { speaker: 'RUIZ', text: 'Quando chegar lá em cima, procure a cabine de comando na popa.' },
      ]);
      setTimeoutGame(g, 1.0, () => this.saveCheckpoint('m3_deck'));
    }
  }

  _startDeck() {
    const g = this.game;
    this.stage = 'deck';
    this.activateWave(3);
    g.hud.setObjective('Limpe o convés do Kestrel Star', new THREE.Vector3(1010, 8.5, -104));
    g.audio.setMusicIntensity(1);
    g.dialogue.say({ speaker: 'KANE', text: 'Ele está a bordo! Fogo de cobertura no convés!' });
  }

  _stageTerminal() {
    const g = this.game;
    this.stage = 'terminal';
    g.hud.setObjective('Acesse o terminal na cabine de comando', new THREE.Vector3(S.terminal.x, S.terminal.y, S.terminal.z));
    g.audio.setMusicIntensity(0.3);
    g.dialogue.say({ speaker: 'OKAFOR', text: 'Convés limpo pelo que vejo daqui. A cabine fica junto à ponte, capitão.' });
  }

  _openTerminal() {
    const g = this.game;
    this.stage = 'reveal';
    g.hud.setObjective(null);
    g.city.shipScreen.material = g.mats.emissive(0xff4a3a, 1.4);
    g.audio.setMusicIntensity(0.4);
    g.dialogue.sequence([
      { speaker: 'OKAFOR', radio: true, text: 'Estou vendo pelo seu link de vídeo, capitão. Tem uma mensagem gravada... endereçada ao senhor.' },
      { speaker: 'SERRAT', radio: true, text: 'Capitão Mercer. Se está vendo isto, chegou mais longe do que eu previa.' },
      { speaker: 'SERRAT', radio: true, text: 'Meu nome é Aldo Serrat. Vice-comandante da coalizão. E o arquiteto do Vértice.' },
      { speaker: 'KANE', radio: true, text: 'Serrat... foi ele que assinou a nossa ordem de missão.' },
      { speaker: 'SERRAT', radio: true, text: 'Guerras precisam de inimigos, capitão. Eu dei um ao mundo. Este navio leva o resto das provas para o fundo do mar.' },
      { speaker: 'RUIZ', radio: true, text: 'Capitão! O sistema iniciou uma contagem! Cargas no porão!', onDone: () => this._startEscape() },
    ]);
  }

  _startEscape() {
    const g = this.game;
    this.stage = 'escape';
    this.escape = { t: ESCAPE_TIME };
    g.hud.setObjective(`SAIA DO NAVIO! ${ESCAPE_TIME}s`, new THREE.Vector3(1040, 1.5, -76));
    g.hud.setProgress(1);
    g.audio.stinger();
    g.audio.setMusicIntensity(1);
    g.dialogue.say({ speaker: 'KANE', radio: true, text: 'Pra prancha! Agora, capitão, corre!' });
  }

  _blowShip(playerSafe) {
    const g = this.game;
    if (this.blown) return;
    this.blown = true;
    this.stage = playerSafe ? 'ending' : 'dead';
    g.hud.setProgress(null);
    // deck blasts (high, visible from the quay) and hull breaches on the quay side
    const pts = [[1060, 10.5, -103], [1030, 4.5, -92.6], [1000, 11, -106], [975, 10, -103], [1050, 4, -92.6], [1015, 12, -100], [985, 4.5, -92.6], [1080, 9.5, -103]];
    pts.forEach(([x, y, z], i) => setTimeoutGame(g, i * 0.3, () => {
      const pos = new THREE.Vector3(x, y, z);
      g.effects.explosion(pos, 2.6);
      g.effects.explosion(pos.clone().add(new THREE.Vector3(0, 3, 0)), 1.6);
      g.audio.playExplosion(pos, 2);
      const f = g.effects.addFire({ x, y: S.deckY + 0.5, z: Math.min(z, -94) }, 2.4, i < 2);
      this.explosions.push(f);
      if (i % 2 === 0) g.effects.addSmokeColumn({ x, y: S.deckY, z: Math.min(z, -94) }, 0.8, [0.08, 0.08, 0.08]);
    }));
    g.player.addTrauma(1);
    g.audio.concussion(3, 0.8);
    if (!playerSafe) {
      setTimeoutGame(g, 0.4, () => g.player.takeDamage(999, new THREE.Vector3(1000, 8, -103), { cause: 'O navio explodiu com você a bordo.' }));
      return;
    }
    g.slowMotion(0.3, 2.2);
    g.hud.setObjective(null);
    setTimeoutGame(g, 2.5, () => g.dialogue.sequence([
      { speaker: 'RUIZ', text: 'Capitão! Você está bem?' },
      { speaker: 'KANE', text: 'Serrat afundou as provas... mas não afundou a gente. Agora a gente sabe quem caçar.' },
      { speaker: 'OKAFOR', text: 'E eu copiei parte da mensagem antes de cair. Não é muito. Mas é o começo.', onDone: () => {
        g.fade.to(1, 2.5);
        setTimeoutGame(g, 2.8, () => g.completeMission());
      } },
    ]));
  }

  // ------------------------------------------------------------ interactions
  onInteract(it) {
    if (it.id === 'shipTerminal' && this.stage === 'terminal') { this._openTerminal(); return true; }
    return false;
  }
  interactAllowed(it) {
    if (it.id === 'shipTerminal') return this.stage === 'terminal';
    return it.kind === 'ammo';
  }

  // ------------------------------------------------------------ update
  update(dt) {
    const g = this.game, p = g.player;
    const activeIdx = { gate: 0, yard: 1, quay: 2, deck: 3 }[this.stage] ?? null;
    this.updateCommon(dt, activeIdx);
    // gentle swell on the sea
    const n = g.city.seaMesh?.material.normalMap;
    if (n) { n.offset.x += dt * 0.004; n.offset.y += dt * 0.0025; }
    // glints for the elevated snipers
    for (const id of ['gtower', 'crane']) {
      const sn = this.named[id];
      if (sn && sn.alive && sn.brain.active && sn.brain.phase === 'peek' && sn.kind === 'sniper' && (this.t * 10) % 1 < 0.5) {
        const e = sn.getEye(new THREE.Vector3());
        g.effects.flashes.spawn({ x: e.x, y: e.y, z: e.z + 0.3, life: 0.08, size: 0.8, endSize: 0.5, color: [1, 1, 0.9], alpha: 0.9, fadeIn: 0 });
      }
    }
    switch (this.stage) {
      case 'toGate': if (p.pos.z < 96) this._startGate(); break;
      case 'gate': if (this.waveCleared(0)) this._stageToYard(false); break;
      case 'toYard': if (p.pos.z < 38) this._startYard(); break;
      case 'yard': if (this.waveCleared(1)) this._stageToQuay(false); break;
      case 'toQuay': if (p.pos.z < -48) this._startQuay(); break;
      case 'quay': if (this.waveCleared(2)) this._stageBoard(false); break;
      case 'board': if (p.pos.y > 5.5) this._startDeck(); break;
      case 'deck': if (this.waveCleared(3)) this._stageTerminal(); break;
      case 'escape': {
        const e = this.escape;
        e.t -= dt;
        g.hud.setProgress(Math.max(0, e.t / ESCAPE_TIME));
        const secs = Math.max(0, Math.ceil(e.t));
        if (secs !== e.shown) { e.shown = secs; g.hud.setObjective(`SAIA DO NAVIO! ${secs}s`, new THREE.Vector3(1040, 1.5, -76)); if (secs <= 5 && secs > 0) g.audio.radioSquelch(true); }
        const safe = p.pos.y < 1.2 && p.pos.z > PORT.quayEdge + 3;
        if (safe && e.t < ESCAPE_TIME - 0.5) this._blowShip(true);
        else if (e.t <= 0) this._blowShip(false);
        break;
      }
    }
    if (['gate', 'yard', 'quay'].includes(this.stage)) {
      const a = g.squad.anchor;
      if (Math.hypot(p.pos.x - a.x, p.pos.z - a.z) > 22 && p.pos.y < 1) g.squad.setAnchor(p.pos.x, p.pos.z, { radius: 8, facing: a.facing, combat: true });
    }
  }
}
