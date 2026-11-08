import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CollisionWorld } from '../../src/physics/CollisionWorld.js';
import { NavGrid } from '../../src/ai/NavGrid.js';

test('A* routes around a wall and path stays walkable', () => {
  const w = new CollisionWorld();
  w.addBox(-1, 0, -10, 1, 3, 8); // wall with a gap at z>8
  const nav = new NavGrid(w, { minX: -20, minZ: -20, maxX: 20, maxZ: 20 });
  const path = nav.findPath(-5, 0, 5, 0);
  assert.ok(path && path.length >= 2);
  let prev = { x: -5, z: 0 };
  for (const p of path) {
    assert.ok(nav.lineFree(prev.x, prev.z, p.x, p.z), 'segment crosses blocked cell');
    prev = p;
  }
  const last = path[path.length - 1];
  assert.ok(Math.hypot(last.x - 5, last.z) < 1.0);
  assert.ok(path.some((p) => p.z > 8), 'should go through the gap');
});

test('low obstacles (curbs) are walkable, unreachable returns null', () => {
  const w = new CollisionWorld();
  w.addBox(-20, 0, -0.5, 20, 0.15, 0.5);
  const nav = new NavGrid(w, { minX: -20, minZ: -20, maxX: 20, maxZ: 20 });
  assert.ok(nav.isWalkable(0, 0));
  const w2 = new CollisionWorld();
  w2.addBox(-30, 0, -1, 30, 3, 1);
  const nav2 = new NavGrid(w2, { minX: -20, minZ: -20, maxX: 20, maxZ: 20 });
  assert.equal(nav2.findPath(0, -5, 0, 5), null);
});
