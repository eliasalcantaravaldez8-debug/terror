import { test } from 'node:test';
import assert from 'node:assert/strict';
import { WEAPONS, WeaponState, newWeaponState } from '../../src/weapons/WeaponData.js';
import { Loadout, applyAttachments, statBars, SLOTS, CAMOS } from '../../src/weapons/Loadout.js';

function memoryStorage() {
  const m = new Map();
  return { getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, String(v)), removeItem: (k) => m.delete(k) };
}

test('attachments change the real stats', () => {
  const base = WEAPONS.vk7;
  const supp = applyAttachments(base, { muzzle: 'supp' });
  assert.equal(supp.suppressed, true);
  assert.equal(supp.sound, 'suppressedRifle');
  assert.ok(supp.damage < base.damage);
  const comp = applyAttachments(base, { muzzle: 'comp' });
  assert.ok(comp.recoilPitch < base.recoilPitch);
  const ext = applyAttachments(base, { mag: 'ext' });
  assert.equal(ext.magSize, 45);
  assert.ok(ext.reloadTime > base.reloadTime);
  const x3 = applyAttachments(base, { optic: 'x3' });
  assert.ok(x3.adsFov < base.adsFov && x3.adsTime > base.adsTime);
  const iron = applyAttachments(base, { optic: 'iron' });
  assert.ok(iron.adsTime < base.adsTime);
  // the base definition is never mutated
  assert.equal(WEAPONS.vk7.magSize, 30);
});

test('scoped rifles keep their scope magnification', () => {
  const d = applyAttachments(WEAPONS.sr50, { optic: 'reddot' });
  assert.equal(d.adsFov, WEAPONS.sr50.adsFov);
});

test('loadout store persists, sanitises and feeds newWeaponState', () => {
  const st = memoryStorage();
  Loadout.load(st);
  assert.equal(Loadout.set('vk7', 'mag', 'ext'), true);
  assert.equal(Loadout.set('vk7', 'optic', 'scope-of-doom'), false); // invalid option rejected
  assert.equal(Loadout.set('brk12', 'muzzle', 'supp'), false); // slot not supported by the shotgun
  assert.equal(Loadout.set('lr6', 'camo', 'tiger'), true);
  assert.equal(newWeaponState('vk7').def.magSize, 45);
  Loadout.load(st); // reload from storage
  assert.equal(Loadout.get('vk7').mag, 'ext');
  assert.equal(Loadout.get('lr6').camo, 'tiger');
  Loadout.setLoadout('vkm', 'r44');
  assert.equal(Loadout.data.primary, 'vkm');
  Loadout.setLoadout('p11', null); // a pistol cannot be the primary
  assert.equal(Loadout.data.primary, 'vkm');
  Loadout.reset();
  assert.equal(newWeaponState('vk7').def.magSize, 30);
});

test('every weapon has slots, every slot option exists, stat bars are normalised', () => {
  for (const id of Object.keys(WEAPONS)) {
    assert.ok(SLOTS[id], 'slots for ' + id);
    const bars = statBars(WEAPONS[id]);
    for (const [k, v] of Object.entries(bars)) if (!k.startsWith('_')) assert.ok(v >= 0 && v <= 1, `${id} ${k}=${v}`);
  }
  assert.ok(Object.keys(CAMOS).length >= 6);
});

test('fire modes cycle and burst/semi/auto are reported', () => {
  const kr = new WeaponState(WEAPONS.kr4);
  assert.equal(kr.mode, 'burst');
  assert.equal(kr.cycleMode(), true);
  assert.equal(kr.mode, 'semi');
  kr.cycleMode();
  assert.equal(kr.mode, 'burst');
  const sr = new WeaponState(WEAPONS.sr50);
  assert.equal(sr.mode, 'semi');
  assert.equal(sr.cycleMode(), false);
  const vkm = new WeaponState(WEAPONS.vkm);
  assert.equal(vkm.mode, 'auto');
  assert.equal(vkm.mag, 100);
});
