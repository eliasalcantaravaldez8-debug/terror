import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CollisionWorld, rayBox, raySphere } from '../../src/physics/CollisionWorld.js';

test('raycast hits nearest box face with correct normal', () => {
  const w = new CollisionWorld(8);
  w.addBox(10, 0, -1, 11, 3, 1);
  w.addBox(20, 0, -1, 21, 3, 1);
  const hit = w.raycast({ x: 0, y: 1, z: 0 }, { x: 1, y: 0, z: 0 }, 100);
  assert.ok(hit);
  assert.ok(Math.abs(hit.t - 10) < 1e-6);
  assert.deepEqual(hit.normal, { x: -1, y: 0, z: 0 });
});

test('raycast travels across many cells and negative coordinates', () => {
  const w = new CollisionWorld(8);
  w.addBox(-101, 0, -101, -99, 5, -99);
  const d = { x: -1 / Math.SQRT2, y: 0, z: -1 / Math.SQRT2 };
  const hit = w.raycast({ x: 0, y: 1, z: 0 }, d, 300);
  assert.ok(hit && hit.box);
  assert.ok(hit.t > 138 && hit.t < 142);
});

test('raycast hits ground plane when pointing down', () => {
  const w = new CollisionWorld();
  const hit = w.raycast({ x: 0, y: 2, z: 0 }, { x: 0, y: -1, z: 0 }, 10);
  assert.equal(hit.surface, 'ground');
  assert.ok(Math.abs(hit.t - 2) < 1e-6);
});

test('lineOfSight blocked by wall and clear over low cover', () => {
  const w = new CollisionWorld();
  w.addBox(4, 0, -2, 5, 1.0, 2);
  assert.equal(w.lineOfSight({ x: 0, y: 0.8, z: 0 }, { x: 10, y: 0.8, z: 0 }), false);
  assert.equal(w.lineOfSight({ x: 0, y: 1.6, z: 0 }, { x: 10, y: 1.6, z: 0 }), true);
});

test('cylinder is pushed out of a wall and can step onto a curb', () => {
  const w = new CollisionWorld();
  w.addBox(1, 0, -5, 2, 3, 5);
  const p = { x: 0.8, y: 0, z: 0 };
  w.resolveCylinder(p, 0.4, 1.8);
  assert.ok(p.x <= 0.6 + 1e-3);
  w.addBox(-5, 0, -5, -3, 0.15, 5); // curb
  const q = { x: -3.1, y: 0, z: 0 };
  w.resolveCylinder(q, 0.4, 1.8);
  assert.equal(q.x, -3.1, 'curb below step height must not block');
  assert.equal(w.groundHeight(-3.5, 0, 0.4, 0.5), 0.15);
});

test('removeBox stops collisions', () => {
  const w = new CollisionWorld();
  const b = w.addBox(-1, 0, -1, 1, 2, 1);
  w.removeBox(b);
  assert.equal(w.raycast({ x: -5, y: 1, z: 0 }, { x: 1, y: 0, z: 0 }, 10), null);
});

test('primitive helpers', () => {
  assert.equal(rayBox({ x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 1 }, { min: { x: -1, y: -1, z: 5 }, max: { x: 1, y: 1, z: 6 } }, 100).t, 5);
  assert.ok(Math.abs(raySphere({ x: 0, y: 0, z: 0 }, { x: 1, y: 0, z: 0 }, { x: 5, y: 0, z: 0 }, 1, 100) - 4) < 1e-9);
});
