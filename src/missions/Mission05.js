import * as THREE from 'three';
import { MissionBase, setTimeoutGame } from './MissionBase.js';
import { ESTATE } from '../world/EstateBuilder.js';
import { StealthDirector } from '../ai/Stealth.js';
import { newWeaponState } from '../weapons/WeaponData.js';
import { buildHelicopter, HelicopterController } from '../world/Helicopter.js';

/**
 * MISSION 5 — "INFILTRAÇÃO NOTURNA"
 * Night, Varna. Alone and suppressed, the player slips into the summit estate,
 * steals the guest list, records Serrat's confession with a laser microphone and
 * escapes to Falcon 2-1 outside the south wall.
 */
export const MISSION5_ID = 'm05';
const PI = Math.PI;
const RECORD_TIME = 26;
const E = ESTATE;

const CHECKPOINTS = {
  start: 'Muro sul da propriedade',
  m5_gardens: 'Jardins da cúpula',
  m5_record: 'Terraço do salão de conferências',
  m5_escape: 'Fuga para o muro sul',
};

/** Guards: patrol routes and sentries. */
const GUARDS = [
  { route: [{ x: -648, z: 1770, wait: 3 }, { x: -620, z: 1770, wait: 1 }, { x: -620, z: 1752, wait: 2 }, { x: -648, z: 1752 }] },
  { route: [{ x: -690, z: 1731, wait: 2 }, { x: -640, z: 1731, wait: 1 }, { x: -610, z: 1731, wait: 3 }] },
  { route: [{ x: -560, z: 1731, wait: 2 }, { x: -510, z: 1731, wait: 3 }] },
  { route: [{ x: -600, z: 1708, wait: 2 }, { x: -600, z: 1682, wait: 2 }] },
  { route: [{ x: -690, z: 1677, wait: 3 }, { x: -640, z: 1677, wait: 1 }, { x: -560, z: 1677, wait: 1 }, { x: -510, z: 1677, wait: 3 }] },
  { route: [{ x: -540, z: 1700, wait: 2 }, { x: -540, z: 1660, wait: 2 }, { x: -530, z: 1640 }] },
  { route: [{ x: -690, z: 1705, wait: 2 }, { x: -690, z: 1650, wait: 3 }] },
  { sentry: { x: -518, z: 1712, yaw: -PI / 2 } },
  { sentry: { x: -632, z: 1669, yaw: 0.2 } },
  { sentry: { x: -568, z: 1669, yaw: -0.2 } },
  { sentry: { x: -700, z: 1775, yaw: PI / 2 } },
];

const WAVES = [
  null, // guards (built at runtime)
  {
    // reinforcements after the alarm: through the palace doors and the east gate
    id: 'alarm', zone: { x0: -705, x1: -495, z0: 1625, z1: 1785 }, faceYaw: 0,
    enemies: [
      { x: -600, z: 1670, delay: 3, kind: 'smg' }, { x: -590, z: 1670, delay: 5 }, { x: -540, z: 1690, delay: 8, kind: 'shotgun' },
      { x: -610, z: 1670, delay: 11 }, { x: -520, z: 1730, delay: 14, kind: 'smg' }, { x: -600, z: 1670, delay: 18, kind: 'mg' },
    ],
  },
];

export class Mission05 extends MissionBase {
  constructor(game) {
    super(game, MISSION5_ID, { waves: WAVES, checkpoints: CHECKPOINTS, title: 'Infiltração Noturna' });
    this.number = 5;
    this.nightVision = true;
    this.completeText = {
      top: 'MISSÃO 5 CONCLUÍDA', main: 'INFILTRAÇÃO NOTURNA',
      body: 'A confissão de Serrat está gravada: o VÉRTICE foi criado para assustar a coalizão até que ela lhe entregasse o comando.<br>Agora ele sabe que a prova existe — e vai usar tudo o que tem para recuperá-la.<br><b>Continua na Missão 6 — Comboio.</b>',
    };
    this.heliParts = buildHelicopter(game.mats, { interior: false });
    this.heliParts.root.visible = false;
    game.scene.add(this.heliParts.root);
    this.heli = new HelicopterController(this.heliParts, [{ t: 0, x: 0, y: 0, z: 0, yaw: 0, pitch: 0, roll: 0 }]);
  }

  exit() {
    this.stealth?.dispose(); this.stealth = null;
    this.game.pipeline.setNightVision(false);
    this.game.hud.setStealth?.(null);
    this.heliParts.root.visible = false;
    this.heliAudio?.stop(); this.heliAudio = null;
  }

  start(checkpoint = 'start') {
    const g = this.game, p = g.player;
    this.resetWorld();
    this.exit();
    g.setRegion('estate');
    this.checkpoint = checkpoint;
    const tod = g.pipeline.setTimeOfDay('night');
    g.effects.rainIntensity = tod.rain;
    g.mats.setNightLights(2.2);
    // silent loadout (kept from the checkpoint save when continuing)
    if (checkpoint === 'start' || g.weapons.slots[0].def.id !== 'mk9') {
      g.weapons.slots = [newWeaponState('mk9', 32, 160), newWeaponState('p11s', 15, 60)];
      g.weapons.currentIndex = 0; g.weapons.setVisibleModel(); g.weapons.grenades = 1;
    }
    g.weapons.setLowered(false);
    g.hud.setCombatHud(true);
    g.audio.setMusicIntensity(0.12);
    g.audio.battleIntensity = 0.1;
    g.city.estateScreen.material = g.mats.emissive(0x4ab0ff, 0.9);
    const grate = g.city.namedProps.grate;
    const open = checkpoint !== 'start';
    grate.bars.visible = !open;
    if (open && grate.box.enabled) { g.world.removeBox(grate.box); grate.box.enabled = false; }
    if (!open && !grate.box.enabled) { grate.box = g.world.addBox(E.grate.x0, 0, E.wall.z1, E.grate.x1, 2.2, E.wall.z1 + 0.6, { tag: 'door', surface: 'metal' }); }
    g.nav.rebuild();
    this.stealth = new StealthDirector(g, { lamps: E.lamps, onAlarm: () => this._onAlarm() });
    this._spawnGuards(checkpoint);
    this.recording = null;

    switch (checkpoint) {
      case 'start': p.reset(new THREE.Vector3(E.start.x, 0, E.start.z), 0); this._intro(); break;
      case 'm5_gardens': p.reset(new THREE.Vector3(-648, 0, 1786), 0); this._stageGardens(true); break;
      case 'm5_record': p.reset(new THREE.Vector3(-516, 0, 1694), PI); this._stageRecord(true); break;
      case 'm5_escape': p.reset(new THREE.Vector3(-600, 0.4, 1664), PI); this._startEscape(true); break;
    }
  }

  _spawnGuards(checkpoint) {
    const g = this.game;
    this.WAVES[0] = { id: 'guards', zone: { x0: -705, x1: -495, z0: 1625, z1: 1785 }, enemies: GUARDS.map((d) => d.route ? { x: d.route[0].x, z: d.route[0].z } : { x: d.sentry.x, z: d.sentry.z }) };
    const list = this.spawnWave(0);
    list.forEach((s, i) => {
      const d = GUARDS[i];
      s.faceYaw = d.sentry ? d.sentry.yaw : 0;
      s.yaw = s.faceYaw;
      this.stealth.addGuard(s, d.route || null);
    });
    if (checkpoint === 'm5_escape') this.stealth.raise(this.stealth.guards[0]);
  }

  // ------------------------------------------------------------ stages
  _intro() {
    const g = this.game;
    this.stage = 'approach';
    g.fade.set(1); g.fade.to(0, 3);
    g.hud.setObjective('Entre pelo canal de drenagem no muro sul', new THREE.Vector3(-648, 1, E.wall.z1));
    this.schedule(1.2, () => g.hud.titleCard(['OPERATION: IRON SHADOW', 'MISSÃO 5 — INFILTRAÇÃO NOTURNA', 'Varna · 17 de março de 2029 · 23:40', 'Cúpula da coalizão'], 7000));
    g.dialogue.sequence([
      { speaker: 'KANE', radio: true, text: 'Capitão, a cúpula está cheia de seguranças do Vértice disfarçados de guarda de honra. Um tiro alto e a noite acaba.', gap: 0.5 },
      { speaker: 'OKAFOR', radio: true, text: 'O canal de drenagem no muro sul leva direto aos jardins. A grade é velha, deve ceder.' },
      { speaker: 'RUIZ', radio: true, text: 'Estou na torre da igreja com o fuzil. Vejo o pátio, mas só atiro se der tudo errado.' },
      { speaker: 'KANE', radio: true, text: 'Armas silenciadas. Pegue a lista no posto de segurança e grave o Serrat. Sem ninguém ver.' },
    ]);
    this.schedule(8, () => g.hud.toast('N: visão noturna · C: agachar (menos visível) · V: abate silencioso', 6000));
  }

  _stageGardens(fromCheckpoint) {
    const g = this.game;
    this.stage = 'gardens';
    g.hud.setObjective('Chegue ao posto de segurança sem ser visto', new THREE.Vector3(E.terminal.x, 1.4, E.terminal.z));
    if (!fromCheckpoint) {
      g.dialogue.say({ speaker: 'OKAFOR', radio: true, text: 'Você está dentro. As patrulhas usam lanternas, fique fora do feixe e longe dos postes.' });
      setTimeoutGame(g, 1, () => this.saveCheckpoint('m5_gardens'));
    }
  }

  _stageRecord(fromCheckpoint) {
    const g = this.game;
    this.stage = 'toRecord';
    g.city.estateScreen.material = g.mats.emissive(0x48ff8a, 1.2);
    g.hud.setObjective('Grave a reunião pela janela do salão de conferências', new THREE.Vector3(E.recordSpot.x, 1.6, E.recordSpot.z));
    if (!fromCheckpoint) {
      g.dialogue.say({ speaker: 'OKAFOR', radio: true, text: 'Lista baixada. O Serrat está no salão de conferências, térreo. A janela grande do terraço.' });
      setTimeoutGame(g, 1, () => this.saveCheckpoint('m5_record'));
    }
  }

  _startRecording() {
    const g = this.game;
    this.stage = 'recording';
    this.recording = { t: 0 };
    g.hud.setObjective('Mantenha a posição enquanto o microfone grava', new THREE.Vector3(E.recordSpot.x, 1.6, E.recordSpot.z));
    g.hud.setProgress(0);
    g.audio.setMusicIntensity(0.4);
    g.dialogue.sequence([
      { speaker: 'OKAFOR', radio: true, text: 'Microfone a laser ativo. Fique perto da janela... gravando.' },
      { speaker: 'SERRAT', text: 'Senhores, o Vértice cumpriu seu papel. O medo uniu esta coalizão como nenhum tratado conseguiria.' },
      { speaker: 'SERRAT', text: 'Amanhã eu proponho o comando unificado. E vocês vão votar sim... porque a alternativa é o caos que nós mesmos criamos.' },
    ]);
    // a patrol drifts toward the terrace to keep things tense
    const near = this.stealth.guards.find((x) => x.s.alive && x.route && x.route.some((w) => w.z < 1690));
    if (near && !this.stealth.alarm) near.route = [{ x: -585, z: 1675, wait: 4 }, { x: -620, z: 1675, wait: 4 }];
  }

  _onAlarm() {
    const g = this.game;
    g.audio.setMusicIntensity(1);
    g.audio.battleIntensity = 0.8;
    if (!this.waves[1]) { this.spawnWave(1); this.activateWave(1); }
    if (this.stage !== 'escape') g.dialogue.say({ speaker: 'KANE', radio: true, text: 'Eles te viram! Saia da luz, capitão, e continue a missão!' });
  }

  _startEscape(fromCheckpoint) {
    const g = this.game;
    this.stage = 'escape';
    g.hud.setProgress(null);
    g.hud.setObjective('Fuja até o Falcon no muro sul', new THREE.Vector3(-648, 1, E.wall.z1));
    if (!this.stealth.alarm) this.stealth.raise(this.stealth.guards[0]);
    if (!fromCheckpoint) setTimeoutGame(g, 1, () => this.saveCheckpoint('m5_escape'));
    g.dialogue.sequence([
      { speaker: 'OKAFOR', radio: true, text: 'Pegamos! Cada palavra!' },
      { speaker: 'KANE', radio: true, text: 'Eles detectaram o laser! Sai daí, capitão!' },
      { speaker: 'FALCON 2-1', radio: true, text: 'Falcon 2-1 sobre o muro sul. Trinta segundos de pairado, não mais!' },
    ]);
    // Falcon hovers outside the south wall
    const X = E.extraction;
    this.heli.setKeys([
      { t: 0, x: X.x - 160, y: 70, z: X.z + 120, yaw: PI * 0.75, pitch: 0.1, roll: 0 },
      { t: 9, x: X.x - 20, y: 20, z: X.z + 18, yaw: PI * 0.9, pitch: -0.05, roll: 0 },
      { t: 13, x: X.x, y: 7, z: X.z + 2, yaw: PI, pitch: 0, roll: 0 },
    ], 0);
    this.heli.turbulence = 0.4; this.heli.rpm = 1;
    this.heliParts.root.visible = true;
    this.heliAudio = g.audio.createHelicopter();
    if (this.heliAudio) { this.heliAudio.setInside(false); this.heliAudio.setRPM(1); this.heliAudio.setVolume(0.9, 1); }
  }

  _extract() {
    const g = this.game;
    this.stage = 'ending';
    g.hud.setObjective(null);
    g.dialogue.sequence([
      { speaker: 'FALCON 2-1', radio: true, text: 'Capitão a bordo! Saindo!' },
      { speaker: 'KANE', radio: true, text: 'Com essa gravação, o Serrat cai. Mas antes ele vai jogar tudo o que tem contra nós.', onDone: () => { g.fade.to(1, 2.5); setTimeoutGame(g, 2.8, () => g.completeMission()); } },
    ]);
  }

  onInteract(it) {
    const g = this.game;
    if (it.id === 'grate' && this.stage === 'approach') {
      const grate = g.city.namedProps.grate;
      g.world.removeBox(grate.box); grate.box.enabled = false; grate.bars.visible = false;
      g.nav.rebuild();
      g.audio.playFoley('bolt'); g.audio.playGrenadeBounce(g.player.pos);
      this.stage = 'grateOpen';
      g.hud.setObjective('Entre nos jardins', new THREE.Vector3(-648, 1, 1784));
      return true;
    }
    if (it.id === 'hutTerminal' && this.stage === 'gardens') { g.audio.playFoley('ammo'); this._stageRecord(false); return true; }
    if (it.id === 'record' && this.stage === 'toRecord') { this._startRecording(); return true; }
    return false;
  }
  interactAllowed(it) {
    if (it.id === 'grate') return this.stage === 'approach';
    if (it.id === 'hutTerminal') return this.stage === 'gardens';
    if (it.id === 'record') return this.stage === 'toRecord';
    return it.kind === 'ammo';
  }

  update(dt) {
    const g = this.game, p = g.player;
    this.updateCommon(dt, this.stealth?.alarm ? 1 : null);
    this.stealth?.update(dt);
    if (!this.stealth?.alarm) g.hud.setStealth?.(this.stealth?.maxAwareness ?? 0, null);
    else g.hud.setStealth?.(1, null, true);
    // night vision goggles
    if (g.input.actionPressed('nightVision') && g.state === 'playing') {
      g.pipeline.setNightVision(!g.pipeline.nightVision);
      g.audio.uiClick();
    }
    if (this.heliParts.root.visible) {
      this.heli.update(dt, this.t);
      this.heliAudio?.setPosition(this.heli.position);
      g.effects.rotorWash(this.heli.position, Math.max(0, 1 - this.heli.position.y / 16), dt);
    }
    switch (this.stage) {
      case 'grateOpen': if (p.pos.z < 1786) this._stageGardens(false); break;
      case 'recording': {
        const r = this.recording;
        const near = Math.hypot(p.pos.x - E.recordSpot.x, p.pos.z - (E.recordSpot.z + 2.5)) < 9;
        if (near) r.t += dt; // only records while the player stays near the window
        g.hud.setProgress(Math.min(1, r.t / RECORD_TIME));
        if (!near && !r.warned) { r.warned = true; g.hud.toast('Volte para perto da janela para continuar gravando', 2500); }
        if (near) r.warned = false;
        if (r.t >= RECORD_TIME) this._startEscape(false);
        break;
      }
      case 'escape':
        if (p.pos.z > E.wall.z1 + 1.5 && this.heli.done) this._extract();
        break;
    }
  }
}
