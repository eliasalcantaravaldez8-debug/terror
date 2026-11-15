import { WEAPONS } from './WeaponData.js';

/**
 * Weapon customisation (Arsenal): optic, muzzle device, magazine and camouflage per
 * weapon, plus the starting loadout used by missions that do not force one.
 * Attachments change both the viewmodel and the weapon's real stats (getDef).
 */
export const OPTICS = {
  iron: { name: 'Mira mecânica', desc: 'Campo de visão amplo, mira mais rápida', adsFov: 0.82, adsTime: -0.03 },
  reddot: { name: 'Ponto vermelho', desc: 'Ponto de 2 MOA, equilíbrio geral', adsFov: 0.72 },
  holo: { name: 'Holográfica', desc: 'Retículo de anel, ótima a curta distância', adsFov: 0.75, spreadAds: 0.9 },
  x3: { name: 'Prismática 3x', desc: 'Aumento 3x, mais precisa, mira mais lenta', adsFov: 0.42, adsTime: 0.07, spreadAds: 0.6 },
};
export const MUZZLES = {
  none: { name: 'Quebra-chamas', desc: 'Padrão de fábrica' },
  comp: { name: 'Compensador', desc: '-22% recuo vertical, clarão maior', recoil: 0.78 },
  supp: { name: 'Silenciador', desc: 'Tiro abafado (não alerta guardas), -8% dano e alcance', suppressed: true },
};
export const MAGS = {
  std: { name: 'Padrão', desc: 'Capacidade original' },
  ext: { name: 'Estendido', desc: '+50% munição, recarga e mira mais lentas', mag: 1.5 },
};
export const CAMOS = {
  none: { name: 'Fábrica', colors: null },
  woodland: { name: 'Floresta', colors: ['#3d4430', '#5b5a3a', '#2a2a22', '#6e6247'] },
  desert: { name: 'Deserto', colors: ['#a38f6a', '#8a7551', '#c2ad86', '#6e5d43'] },
  urban: { name: 'Urbano digital', colors: ['#5e6164', '#8a8d8f', '#3c3e40', '#a9abac'] },
  night: { name: 'Noite', colors: ['#1d2126', '#2b3138', '#14171a', '#353c44'] },
  tiger: { name: 'Listras', colors: ['#4a4d2e', '#1e1f17', '#6b6a44', '#2f3121'], stripes: true },
  arctic: { name: 'Ártico', colors: ['#d9dcdc', '#a7adb0', '#eef0f0', '#7d8487'] },
};

/** Which customisation slots each weapon supports (defaults first). */
export const SLOTS = {
  vk7: { optic: ['reddot', 'holo', 'x3', 'iron'], muzzle: ['none', 'comp', 'supp'], mag: ['std', 'ext'] },
  kr4: { optic: ['holo', 'reddot', 'x3', 'iron'], muzzle: ['none', 'comp', 'supp'], mag: ['std', 'ext'] },
  mk9: { optic: ['reddot', 'holo', 'iron'], mag: ['std', 'ext'] },
  vkm: { optic: ['x3', 'reddot', 'holo', 'iron'], muzzle: ['none', 'comp'] },
  brk12: { optic: ['iron', 'reddot', 'holo'] },
  lr6: { muzzle: ['none', 'comp', 'supp'] },
  sr50: { muzzle: ['none', 'supp'] },
  p11: { muzzle: ['none', 'supp'], mag: ['std', 'ext'] },
  r44: {},
  p11s: {},
};

/** Weapons offered in the Arsenal (p11s is the mission-5 issue pistol). */
export const ARSENAL_PRIMARY = ['vk7', 'kr4', 'mk9', 'vkm', 'brk12', 'lr6', 'sr50'];
export const ARSENAL_SECONDARY = ['p11', 'r44'];

const KEY = 'ironshadow.loadout.v1';

function defaults() {
  const attach = {};
  for (const id of Object.keys(SLOTS)) {
    const s = SLOTS[id];
    attach[id] = { optic: s.optic?.[0] ?? null, muzzle: s.muzzle?.[0] ?? null, mag: s.mag?.[0] ?? null, camo: 'none' };
  }
  return { attach, primary: 'vk7', secondary: 'p11' };
}

class LoadoutStore {
  constructor() {
    this.data = defaults();
    this.version = 0; // bumps on every change (def cache key)
    this.storage = null;
    this._cache = new Map();
  }

  load(storage = globalThis.localStorage) {
    this.storage = storage;
    try {
      const raw = storage?.getItem(KEY);
      if (raw) {
        const d = JSON.parse(raw);
        const base = defaults();
        for (const id of Object.keys(base.attach)) Object.assign(base.attach[id], this._sanitize(id, d.attach?.[id] || {}));
        if (ARSENAL_PRIMARY.includes(d.primary)) base.primary = d.primary;
        if (ARSENAL_SECONDARY.includes(d.secondary)) base.secondary = d.secondary;
        this.data = base;
      }
    } catch { /* ignore corrupted storage */ }
    this.version++; this._cache.clear();
    return this;
  }

  _sanitize(id, a) {
    const s = SLOTS[id] || {}, out = {};
    if (a.optic && s.optic?.includes(a.optic)) out.optic = a.optic;
    if (a.muzzle && s.muzzle?.includes(a.muzzle)) out.muzzle = a.muzzle;
    if (a.mag && s.mag?.includes(a.mag)) out.mag = a.mag;
    if (a.camo && CAMOS[a.camo]) out.camo = a.camo;
    return out;
  }

  save() { try { this.storage?.setItem(KEY, JSON.stringify(this.data)); } catch { /* ignore */ } }

  get(id) { return this.data.attach[id] || { optic: null, muzzle: null, mag: null, camo: 'none' }; }

  set(id, slot, value) {
    const clean = this._sanitize(id, { [slot]: value });
    if (!(slot in clean)) return false;
    this.data.attach[id][slot] = value;
    this.version++; this._cache.clear();
    this.save();
    return true;
  }

  setLoadout(primary, secondary) {
    if (primary && ARSENAL_PRIMARY.includes(primary)) this.data.primary = primary;
    if (secondary && ARSENAL_SECONDARY.includes(secondary)) this.data.secondary = secondary;
    this.save();
  }

  reset() { this.data = defaults(); this.version++; this._cache.clear(); this.save(); }

  /** Effective weapon definition: base stats modified by the fitted attachments. */
  getDef(id) {
    const base = WEAPONS[id] || WEAPONS.vk7;
    const hit = this._cache.get(base.id);
    if (hit) return hit;
    const def = applyAttachments(base, this.get(base.id));
    this._cache.set(base.id, def);
    return def;
  }
}

/** Pure stat modifier (unit tested). */
export function applyAttachments(base, a = {}) {
  const def = { ...base, attach: { ...a } };
  const o = a.optic && OPTICS[a.optic];
  if (o && !base.scope) {
    def.adsFov = o.adsFov;
    def.adsTime = Math.max(0.1, base.adsTime + (o.adsTime || 0));
    if (o.spreadAds) def.spreadAds = base.spreadAds * o.spreadAds;
  }
  const mz = a.muzzle && MUZZLES[a.muzzle];
  if (mz?.recoil) { def.recoilPitch = base.recoilPitch * mz.recoil; def.recoilYaw = base.recoilYaw * 0.85; def.flashScale = 1.35; }
  if (mz?.suppressed) {
    def.suppressed = true;
    def.sound = base.type === 'pistol' ? 'suppressed' : 'suppressedRifle';
    def.damage = base.damage * 0.92;
    def.falloffEnd = base.falloffEnd * 0.92;
  }
  const mg = a.mag && MAGS[a.mag];
  if (mg?.mag) {
    def.magSize = Math.round(base.magSize * mg.mag);
    def.reserveMax = base.reserveMax + (def.magSize - base.magSize) * 3;
    def.reloadTime = base.reloadTime * 1.15;
    def.reloadEmptyTime = base.reloadEmptyTime * 1.15;
    def.adsTime = def.adsTime + 0.02;
  }
  return def;
}

/** Normalised stat bars for the Arsenal screen (0..1). */
export function statBars(def) {
  const rpm = 60 / def.fireInterval;
  const dps = def.damage * (def.pellets || 1) * Math.min(rpm, 900) / 60;
  return {
    Dano: Math.min(1, def.damage * (def.pellets || 1) / 160),
    Cadência: Math.min(1, rpm / 950),
    Alcance: Math.min(1, def.falloffEnd / 320),
    Precisão: Math.max(0, Math.min(1, 1 - def.spreadAds / 1.2 - def.spreadHip / 14)),
    Controle: Math.max(0, Math.min(1, 1 - def.recoilPitch / 3.4)),
    Mobilidade: Math.max(0, Math.min(1, (def.moveMul ?? 1) * 1.15 - def.adsTime * 1.2)),
    _dps: dps,
  };
}

export const Loadout = new LoadoutStore();
