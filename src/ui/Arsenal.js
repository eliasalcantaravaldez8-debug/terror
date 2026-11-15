import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { WEAPONS } from '../weapons/WeaponData.js';
import { makeWeaponModel } from '../weapons/WeaponModels.js';
import { Loadout, SLOTS, OPTICS, MUZZLES, MAGS, CAMOS, ARSENAL_PRIMARY, ARSENAL_SECONDARY, statBars } from '../weapons/Loadout.js';

const TYPE = { rifle: 'Fuzil de assalto', smg: 'Submetralhadora', lmg: 'Metralhadora leve', shotgun: 'Escopeta', dmr: 'Fuzil de precisão semiautomático', sniper: 'Fuzil de precisão de ferrolho', pistol: 'Pistola' };
const BLURB = {
  vk7: 'Fuzil padrão da equipe Iron. Versátil, controlável, aceita qualquer acessório.',
  kr4: 'Bullpup compacto: cano longo num corpo curto. Rajada de 3 tiros muito precisa.',
  mk9: 'Silenciador integrado e alta cadência. Ideal para infiltração e interiores.',
  vkm: 'Alimentada por fita de 100 cartuchos. Pesada e lenta para mirar, mas não para de atirar.',
  brk12: 'Escopeta de bomba com 9 chumbos por tiro. Devastadora a curta distância.',
  lr6: 'Fuzil de atirador designado: semiautomático, luneta de aumento médio.',
  sr50: 'Ferrolho manual e calibre pesado. Um tiro, um abate — e o ferrolho tem de ser manejado.',
  p11: 'Pistola de serviço confiável. Aceita silenciador e carregador estendido.',
  r44: 'Revólver de seis tiros em calibre magnum. Lento para recarregar, enorme poder de parada.',
};
const SLOT_LABEL = { optic: 'Mira', muzzle: 'Boca do cano', mag: 'Carregador', camo: 'Camuflagem' };
const SLOT_DATA = { optic: OPTICS, muzzle: MUZZLES, mag: MAGS, camo: CAMOS };

/**
 * Arsenal screen: pick the starting primary/secondary and customise each weapon
 * (optic, muzzle device, magazine, camouflage) with a live 3D preview and real stats.
 */
export class Arsenal {
  constructor(game, menus) {
    this.game = game;
    this.menus = menus;
    this.sel = Loadout.data.primary;
    this.changed = new Set();
  }

  open(back) {
    this.back = back;
    const m = this.menus;
    m.current = 'arsenal';
    m._show(`
      <h2>ARSENAL</h2>
      <div class="arsenal">
        <div class="ars-list">
          <div class="ars-group">Primárias</div>
          ${ARSENAL_PRIMARY.map((id) => `<button class="ars-w" data-id="${id}">${WEAPONS[id].name}<small>${TYPE[WEAPONS[id].type]}</small></button>`).join('')}
          <div class="ars-group">Secundárias</div>
          ${ARSENAL_SECONDARY.map((id) => `<button class="ars-w" data-id="${id}">${WEAPONS[id].name}<small>${TYPE[WEAPONS[id].type]}</small></button>`).join('')}
        </div>
        <div class="ars-center">
          <div class="ars-view"><canvas id="ars-canvas"></canvas><div class="ars-drag">arraste para girar</div></div>
          <div class="ars-title"><b id="ars-name"></b><span id="ars-type"></span></div>
          <p id="ars-blurb" class="ars-blurb"></p>
          <div id="ars-stats" class="ars-stats"></div>
        </div>
        <div class="ars-right">
          <div id="ars-slots"></div>
          <div class="ars-loadout" id="ars-loadout"></div>
          <button id="ars-equip" class="primary">Equipar</button>
        </div>
      </div>
      <div class="menu-buttons ars-foot"><button id="ars-back" class="primary">Voltar</button></div>`, 'arsenal-menu');
    const root = m.root;
    root.querySelectorAll('.ars-w').forEach((b) => b.addEventListener('click', (e) => { e.stopPropagation(); this.game.audio.uiClick(); this.select(b.dataset.id); }));
    m._bind('ars-back', () => this.close());
    m._bind('ars-equip', () => {
      if (ARSENAL_PRIMARY.includes(this.sel)) Loadout.setLoadout(this.sel, null); else Loadout.setLoadout(null, this.sel);
      this.game.audio.playFoley?.('bolt');
      this._renderLoadout();
    });
    this._initPreview(root.querySelector('#ars-canvas'));
    this.select(this.sel);
  }

  close() {
    cancelAnimationFrame(this._raf);
    this._raf = null;
    if (this.model) this.scene.remove(this.model);
    this.renderer?.dispose();
    this.renderer?.forceContextLoss?.();
    this.renderer = null;
    if (this.changed.size) this.game.weapons.applyLoadoutChanges([...this.changed]);
    this.changed.clear();
    this.back?.();
  }

  _initPreview(canvas) {
    try {
      this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch { this.renderer = null; return; }
    const r = this.renderer;
    r.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    r.toneMapping = THREE.ACESFilmicToneMapping;
    r.outputColorSpace = THREE.SRGBColorSpace;
    const w = canvas.clientWidth || 520, h = canvas.clientHeight || 280;
    r.setSize(w, h, false);
    this.scene = new THREE.Scene();
    const pm = new THREE.PMREMGenerator(r);
    this.scene.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture;
    pm.dispose();
    this.scene.add(new THREE.HemisphereLight(0xdfe6ee, 0x2a2622, 0.6));
    const key = new THREE.DirectionalLight(0xfff1dc, 2.2); key.position.set(2, 3, 2); this.scene.add(key);
    const rim = new THREE.DirectionalLight(0x9fc2ff, 1.2); rim.position.set(-2, 1, -3); this.scene.add(rim);
    this.camera = new THREE.PerspectiveCamera(28, w / h, 0.01, 20);
    this.camera.position.set(0, 0.25, 2.2); this.camera.lookAt(0, 0, 0);
    this.spin = 0.6; this.dragV = 0;
    let dragging = false, lx = 0;
    canvas.addEventListener('pointerdown', (e) => { dragging = true; lx = e.clientX; canvas.setPointerCapture(e.pointerId); });
    canvas.addEventListener('pointerup', () => { dragging = false; });
    canvas.addEventListener('pointermove', (e) => { if (dragging) { this.dragV = (e.clientX - lx) * 0.01; this.spin += this.dragV; lx = e.clientX; } });
    const loop = () => {
      this._raf = requestAnimationFrame(loop);
      if (!this.renderer) return;
      if (!dragging) { this.spin += 0.004 + this.dragV; this.dragV *= 0.92; }
      if (this.model) this.model.rotation.y = this.spin;
      this.renderer.render(this.scene, this.camera);
    };
    loop();
  }

  _rebuildModel() {
    if (!this.scene) return;
    if (this.model) this.scene.remove(this.model);
    const g = makeWeaponModel(this.sel, this.game.mats, 'high', Loadout.get(this.sel));
    // centre and frame
    const box = new THREE.Box3().setFromObject(g), c = box.getCenter(new THREE.Vector3()), size = box.getSize(new THREE.Vector3());
    const holder = new THREE.Group();
    g.position.sub(c); holder.add(g);
    this.model = holder;
    this.scene.add(holder);
    const len = Math.max(size.x, size.y, size.z);
    // fit the full length horizontally (the model spins about Y)
    const tanH = Math.tan(THREE.MathUtils.degToRad(this.camera.fov) / 2) * this.camera.aspect;
    const dist = Math.max((len * 0.55) / tanH, (len * 0.3) / Math.tan(THREE.MathUtils.degToRad(this.camera.fov) / 2));
    this.camera.position.set(0, dist * 0.16, dist); this.camera.lookAt(0, 0, 0);
  }

  select(id) {
    this.sel = id;
    const root = this.menus.root;
    root.querySelectorAll('.ars-w').forEach((b) => b.classList.toggle('active', b.dataset.id === id));
    const def = Loadout.getDef(id);
    root.querySelector('#ars-name').textContent = def.name;
    root.querySelector('#ars-type').textContent = TYPE[def.type] + (def.modes ? ' · ' + def.modes.map((x) => ({ auto: 'auto', burst: 'rajada', semi: 'semi' })[x]).join('/') : def.boltAction ? ' · ferrolho' : '');
    root.querySelector('#ars-blurb').textContent = BLURB[id] || '';
    this._renderSlots();
    this._renderStats();
    this._renderLoadout();
    this._rebuildModel();
  }

  _renderSlots() {
    const id = this.sel, a = Loadout.get(id), sl = { ...SLOTS[id], camo: Object.keys(CAMOS) };
    const el = this.menus.root.querySelector('#ars-slots');
    el.innerHTML = Object.entries(sl).filter(([, opts]) => opts?.length).map(([slot, opts]) => `
      <div class="ars-slot"><div class="ars-slot-h">${SLOT_LABEL[slot]}</div>
        <div class="ars-opts">${opts.map((o) => `<button class="ars-o ${a[slot] === o ? 'active' : ''}" data-slot="${slot}" data-v="${o}" title="${SLOT_DATA[slot][o].desc || ''}">${slot === 'camo' && CAMOS[o].colors ? `<i class="sw" style="background:linear-gradient(135deg,${CAMOS[o].colors.join(',')})"></i>` : ''}${SLOT_DATA[slot][o].name}</button>`).join('')}</div>
        <div class="ars-desc">${SLOT_DATA[slot][a[slot]]?.desc || ''}</div>
      </div>`).join('') || '<p class="ars-desc">Esta arma não aceita acessórios.</p>';
    el.querySelectorAll('.ars-o').forEach((b) => b.addEventListener('click', (e) => {
      e.stopPropagation();
      if (Loadout.set(id, b.dataset.slot, b.dataset.v)) {
        this.changed.add(id);
        this.game.audio.playFoley?.(b.dataset.slot === 'camo' ? 'draw' : 'magIn');
        this._renderSlots(); this._renderStats(); this._rebuildModel();
      }
    }));
  }

  _renderStats() {
    const base = statBars(WEAPONS[this.sel]), cur = statBars(Loadout.getDef(this.sel));
    const def = Loadout.getDef(this.sel);
    const el = this.menus.root.querySelector('#ars-stats');
    el.innerHTML = Object.keys(cur).filter((k) => !k.startsWith('_')).map((k) => {
      const d = cur[k] - base[k];
      return `<div class="ars-stat"><span>${k}</span><div class="bar"><i style="width:${Math.round(Math.min(base[k], cur[k]) * 100)}%"></i>${d ? `<em class="${d > 0 ? 'up' : 'down'}" style="left:${Math.round(Math.min(base[k], cur[k]) * 100)}%;width:${Math.round(Math.abs(d) * 100)}%"></em>` : ''}</div></div>`;
    }).join('') + `<div class="ars-nums">Dano ${Math.round(def.damage)}${def.pellets ? '×' + def.pellets : ''} · ${Math.round(60 / def.fireInterval)} disparos/min · carregador ${def.magSize}${def.suppressed ? ' · silenciada' : ''}</div>`;
  }

  _renderLoadout() {
    const d = Loadout.data;
    const el = this.menus.root.querySelector('#ars-loadout');
    el.innerHTML = `<div class="ars-slot-h">Equipamento inicial</div><div>Primária: <b>${WEAPONS[d.primary].name}</b></div><div>Secundária: <b>${WEAPONS[d.secondary].name}</b></div><small>Usado ao iniciar uma missão (a Missão 5 exige armas silenciosas).</small>`;
    const eq = this.menus.root.querySelector('#ars-equip');
    const isPri = ARSENAL_PRIMARY.includes(this.sel);
    const equipped = isPri ? d.primary === this.sel : d.secondary === this.sel;
    eq.textContent = equipped ? 'Equipada' : isPri ? 'Equipar como primária' : 'Equipar como secundária';
    eq.disabled = equipped;
  }
}
