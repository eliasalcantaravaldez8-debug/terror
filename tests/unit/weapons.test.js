import { test } from 'node:test';
import assert from 'node:assert/strict';
import { WEAPONS, WeaponState, damageAtDistance } from '../../src/weapons/WeaponData.js';

test('fire consumes ammo and respects fire interval', () => {
  const w = new WeaponState(WEAPONS.vk7, 3, 10);
  assert.ok(w.fire());
  assert.equal(w.mag, 2);
  assert.equal(w.fire(), false, 'cooldown must block');
  w.update(WEAPONS.vk7.fireInterval + 0.001);
  assert.ok(w.fire());
  w.update(1); assert.ok(w.fire());
  w.update(1); assert.equal(w.fire(), false, 'empty mag');
});

test('reload moves ammo from reserve and takes time', () => {
  const w = new WeaponState(WEAPONS.vk7, 0, 45);
  assert.ok(w.startReload());
  assert.equal(w.fire(), false);
  assert.equal(w.update(1.0), false);
  assert.equal(w.update(5.0), true);
  assert.equal(w.mag, 30);
  assert.equal(w.reserve, 15);
  assert.equal(w.canReload(), false, 'full mag');
});

test('partial reserve reload', () => {
  const w = new WeaponState(WEAPONS.p11, 2, 5);
  w.startReload(); w.update(10);
  assert.equal(w.mag, 7);
  assert.equal(w.reserve, 0);
  assert.equal(w.startReload(), false);
});

test('damage falloff is monotonic and clamped', () => {
  const d = WEAPONS.vk7;
  assert.equal(damageAtDistance(d, 5), d.damage);
  assert.equal(damageAtDistance(d, 1000), d.damage * d.minDamageScale);
  assert.ok(damageAtDistance(d, 60) < d.damage && damageAtDistance(d, 60) > d.damage * d.minDamageScale);
});
