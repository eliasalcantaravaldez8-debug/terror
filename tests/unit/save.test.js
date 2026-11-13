import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SaveSystem } from '../../src/core/SaveSystem.js';
import { Settings, DEFAULT_SETTINGS } from '../../src/core/Settings.js';

class MemStorage { constructor() { this.m = new Map(); } getItem(k) { return this.m.has(k) ? this.m.get(k) : null; } setItem(k, v) { this.m.set(k, String(v)); } removeItem(k) { this.m.delete(k); } }

test('checkpoint save round-trip', () => {
  const s = new SaveSystem(new MemStorage());
  assert.equal(s.hasSave(), false);
  assert.ok(s.save({ mission: 'm01', checkpoint: 'cp_street', weapons: { grenades: 2 } }));
  const d = s.load();
  assert.equal(d.checkpoint, 'cp_street');
  assert.equal(d.weapons.grenades, 2);
  s.clear();
  assert.equal(s.load(), null);
});

test('corrupted or incomplete saves are rejected', () => {
  const st = new MemStorage();
  st.setItem('ironshadow.save.v1', '{not json');
  assert.equal(new SaveSystem(st).load(), null);
  st.setItem('ironshadow.save.v1', JSON.stringify({ version: 1, mission: 'm01' }));
  assert.equal(new SaveSystem(st).load(), null);
});

test('settings persist and fall back to defaults', () => {
  const st = new MemStorage();
  const a = new Settings(st);
  assert.equal(a.get('quality'), DEFAULT_SETTINGS.quality);
  a.set('sensitivity', 1.7);
  assert.equal(new Settings(st).get('sensitivity'), 1.7);
});

test('campaign progress unlocks missions independently of checkpoints', () => {
  const s = new SaveSystem(new MemStorage());
  assert.deepEqual(s.progress().unlocked, ['m01']);
  s.unlock('m02'); s.unlock('m02');
  assert.deepEqual(s.progress().unlocked, ['m01', 'm02']);
  s.clear();
  assert.deepEqual(s.progress().unlocked, ['m01', 'm02'], 'clearing the checkpoint keeps progress');
});
