/**
 * Fictional weapon definitions. Ballistics are hitscan with falloff; values are
 * tuned for game feel, not real-world simulation.
 */
export const WEAPONS = {
  vk7: {
    id: 'vk7',
    name: 'VK-7',
    type: 'rifle',
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
  },
  p11: {
    id: 'p11',
    name: 'P-11',
    type: 'pistol',
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
  }
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
  refill() { this.reserve = this.def.reserveMax - this.mag; }
  serialize() { return { mag: this.mag, reserve: this.reserve }; }
}
