import { Loadout } from './Loadout.js';

/**
 * Fictional weapon definitions. Ballistics are hitscan with falloff; values are
 * tuned for game feel, not real-world simulation.
 */
export const WEAPONS = {
  vk7: {
    id: 'vk7',
    name: 'VK-7',
    type: 'rifle',
    slot: 'primary',
    magSize: 30,
    reserveMax: 210,
    fireInterval: 60 / 720,
    auto: true,
    damage: 34,
    headMultiplier: 3.0,
    falloffStart: 40,
    falloffEnd: 120,
    minDamageScale: 0.6,
    range: 400,
    spreadHip: 2.6, // degrees
    spreadAds: 0.12,
    spreadMove: 2.2,
    recoilPitch: 0.42, // degrees per shot
    recoilYaw: 0.22,
    recoilRecover: 7,
    adsTime: 0.22,
    adsFov: 0.72, // multiplier
    reloadTime: 2.25,
    reloadEmptyTime: 2.85,
    drawTime: 0.55,
    sound: 'rifle',
    modes: ['auto', 'semi'],
  },
  kr4: {
    id: 'kr4', name: 'KR-4', type: 'rifle', slot: 'primary', bullpup: true, modes: ['burst', 'semi'],
    magSize: 30, reserveMax: 210, fireInterval: 60 / 900, auto: true, burst: 3,
    damage: 31, headMultiplier: 3.0, falloffStart: 45, falloffEnd: 130, minDamageScale: 0.6, range: 400,
    spreadHip: 2.4, spreadAds: 0.1, spreadMove: 2.0, recoilPitch: 0.36, recoilYaw: 0.18, recoilRecover: 8,
    adsTime: 0.2, adsFov: 0.75, reloadTime: 2.5, reloadEmptyTime: 3.1, drawTime: 0.5, sound: 'rifle',
  },
  vkm: {
    id: 'vkm', name: 'VKM-90', type: 'lmg', slot: 'primary', modes: ['auto'], moveMul: 0.86, belt: true,
    magSize: 100, reserveMax: 300, fireInterval: 60 / 680, auto: true,
    damage: 33, headMultiplier: 2.4, falloffStart: 50, falloffEnd: 160, minDamageScale: 0.6, range: 450,
    spreadHip: 3.8, spreadAds: 0.22, spreadMove: 3.0, recoilPitch: 0.34, recoilYaw: 0.3, recoilRecover: 6,
    adsTime: 0.36, adsFov: 0.72, reloadTime: 5.4, reloadEmptyTime: 6.0, drawTime: 0.9, sound: 'mg',
  },
  sr50: {
    id: 'sr50', name: 'SR-50', type: 'sniper', slot: 'primary', scope: true, boltAction: true, moveMul: 0.92,
    magSize: 5, reserveMax: 30, fireInterval: 1.25, auto: false,
    damage: 150, headMultiplier: 2.5, falloffStart: 200, falloffEnd: 700, minDamageScale: 0.85, range: 900,
    spreadHip: 6.0, spreadAds: 0.0, spreadMove: 4.0, recoilPitch: 4.2, recoilYaw: 0.5, recoilRecover: 4,
    adsTime: 0.36, adsFov: 0.2, reloadTime: 3.0, reloadEmptyTime: 3.6, drawTime: 0.8, sound: 'sniper',
  },
  r44: {
    id: 'r44', name: 'R-44', type: 'pistol', slot: 'secondary', revolver: true,
    magSize: 6, reserveMax: 36, fireInterval: 0.36, auto: false,
    damage: 62, headMultiplier: 2.6, falloffStart: 20, falloffEnd: 60, minDamageScale: 0.55, range: 160,
    spreadHip: 2.0, spreadAds: 0.25, spreadMove: 1.8, recoilPitch: 3.0, recoilYaw: 0.6, recoilRecover: 6,
    adsTime: 0.19, adsFov: 0.82, reloadTime: 2.8, reloadEmptyTime: 2.8, drawTime: 0.45, sound: 'revolver',
  },
  mk9: {
    id: 'mk9', name: 'MK-9', type: 'smg', slot: 'primary',
    magSize: 32, reserveMax: 224, fireInterval: 60 / 880, auto: true,
    damage: 25, headMultiplier: 2.4, falloffStart: 15, falloffEnd: 55, minDamageScale: 0.55, range: 200,
    spreadHip: 2.0, spreadAds: 0.35, spreadMove: 1.2, recoilPitch: 0.3, recoilYaw: 0.25, recoilRecover: 9,
    adsTime: 0.17, adsFov: 0.8, reloadTime: 1.9, reloadEmptyTime: 2.3, drawTime: 0.45, sound: 'suppressed', suppressed: true, modes: ['auto', 'semi'],
  },
  brk12: {
    id: 'brk12', name: 'BRK-12', type: 'shotgun', slot: 'primary',
    magSize: 7, reserveMax: 35, fireInterval: 0.85, auto: false, pellets: 9, pump: true,
    damage: 17, headMultiplier: 1.6, falloffStart: 7, falloffEnd: 30, minDamageScale: 0.25, range: 70,
    spreadHip: 5.5, spreadAds: 3.8, spreadMove: 1.0, recoilPitch: 3.2, recoilYaw: 0.6, recoilRecover: 6,
    adsTime: 0.22, adsFov: 0.85, reloadTime: 2.6, reloadEmptyTime: 3.1, drawTime: 0.6, sound: 'shotgun',
  },
  lr6: {
    id: 'lr6', name: 'LR-6', type: 'dmr', slot: 'primary',
    magSize: 10, reserveMax: 60, fireInterval: 0.32, auto: false, scope: true,
    damage: 72, headMultiplier: 2.5, falloffStart: 90, falloffEnd: 300, minDamageScale: 0.8, range: 600,
    spreadHip: 4.0, spreadAds: 0.02, spreadMove: 3.0, recoilPitch: 1.8, recoilYaw: 0.3, recoilRecover: 5,
    adsTime: 0.3, adsFov: 0.3, reloadTime: 2.5, reloadEmptyTime: 3.0, drawTime: 0.65, sound: 'dmr',
  },
  p11s: {
    id: 'p11s', name: 'P-11S', type: 'pistol', slot: 'secondary', suppressed: true,
    magSize: 15, reserveMax: 75, fireInterval: 0.16, auto: false,
    damage: 28, headMultiplier: 2.8, falloffStart: 12, falloffEnd: 40, minDamageScale: 0.5, range: 120,
    spreadHip: 1.8, spreadAds: 0.3, spreadMove: 1.5, recoilPitch: 0.8, recoilYaw: 0.25, recoilRecover: 9,
    adsTime: 0.17, adsFov: 0.85, reloadTime: 1.7, reloadEmptyTime: 2.0, drawTime: 0.4, sound: 'suppressed',
  },
  p11: {
    id: 'p11',
    name: 'P-11',
    type: 'pistol',
    slot: 'secondary',
    magSize: 15,
    reserveMax: 75,
    fireInterval: 0.16,
    auto: false,
    damage: 30,
    headMultiplier: 2.6,
    falloffStart: 15,
    falloffEnd: 50,
    minDamageScale: 0.5,
    range: 150,
    spreadHip: 1.8,
    spreadAds: 0.35,
    spreadMove: 1.5,
    recoilPitch: 1.1,
    recoilYaw: 0.3,
    recoilRecover: 9,
    adsTime: 0.16,
    adsFov: 0.85,
    reloadTime: 1.6,
    reloadEmptyTime: 1.9,
    drawTime: 0.4,
    sound: 'pistol',
  },
};

/** Damage after distance falloff. Pure function (unit tested). */
export function damageAtDistance(w, dist) {
  if (dist <= w.falloffStart) return w.damage;
  if (dist >= w.falloffEnd) return w.damage * w.minDamageScale;
  const t = (dist - w.falloffStart) / (w.falloffEnd - w.falloffStart);
  return w.damage * (1 - t * (1 - w.minDamageScale));
}

/**
 * Ammo/state bookkeeping independent from rendering (unit tested).
 */
export class WeaponState {
  constructor(def, mag = def.magSize, reserve = def.reserveMax - def.magSize * 2) {
    this.def = def;
    this.mag = mag;
    this.reserve = reserve;
    this.cooldown = 0;
    this.reloading = 0;
    this.reloadTotal = 0;
    this.modeIndex = 0;
  }
  /** Current fire mode: 'auto' | 'burst' | 'semi' (single-mode weapons follow def.auto). */
  get mode() { return this.def.modes ? this.def.modes[this.modeIndex % this.def.modes.length] : this.def.auto ? 'auto' : 'semi'; }
  cycleMode() { if (this.def.modes && this.def.modes.length > 1) { this.modeIndex = (this.modeIndex + 1) % this.def.modes.length; return true; } return false; }
  canFire() { return this.mag > 0 && this.cooldown <= 0 && this.reloading <= 0; }
  fire() {
    if (!this.canFire()) return false;
    this.mag--;
    this.cooldown = this.def.fireInterval;
    return true;
  }
  canReload() { return this.reloading <= 0 && this.mag < this.def.magSize && this.reserve > 0; }
  startReload() {
    if (!this.canReload()) return false;
    this.reloadTotal = this.mag === 0 ? this.def.reloadEmptyTime : this.def.reloadTime;
    this.reloading = this.reloadTotal;
    return true;
  }
  cancelReload() { this.reloading = 0; }
  /** Advance timers; returns true when a reload completes this tick. */
  update(dt) {
    if (this.cooldown > 0) this.cooldown -= dt;
    if (this.reloading > 0) {
      this.reloading -= dt;
      if (this.reloading <= 0) {
        const need = this.def.magSize - this.mag;
        const take = Math.min(need, this.reserve);
        this.mag += take;
        this.reserve -= take;
        this.reloading = 0;
        return true;
      }
    }
    return false;
  }
  refill() { this.reserve = Math.max(0, this.def.reserveMax - this.mag); }
  serialize() { return { id: this.def.id, mag: this.mag, reserve: this.reserve, mode: this.modeIndex }; }
}

/** Create a weapon state by id (with optional ammo). */
export function newWeaponState(id, mag, reserve) {
  const def = Loadout.getDef(WEAPONS[id] ? id : 'vk7');
  return new WeaponState(def, mag ?? def.magSize, reserve ?? Math.max(0, def.reserveMax - def.magSize * 2));
}
