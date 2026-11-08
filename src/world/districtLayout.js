/**
 * Hand-authored layout of the Teresk district (Mission 1 play space).
 * Coordinates in metres. +Y up. The main avenue runs north along -Z.
 *
 *            Halden building (z -168..-200)
 *                     |
 *        LB6 |  avenue  | RB4/RB5
 *            |----------|    <- alley left z -117..-113
 *        LB4 |          | RB3
 *   ===== cross street z -68..-56 =====
 *        LB3 |          | RB2
 *  sniper LB2|          |    <- alley right z -28..-22
 *        LB1 |          | RB1
 *    --------+  PLAZA   +--------   (LZ at 0,0,30)
 */

const F = (o) => o; // marker for readability

export const ROAD = { halfWidth: 8, sidewalk: 3 };

// Facade style presets (procedural texture parameters).
export const STYLES = {
  beige: { wall: '#b9a88a', frame: '#ddd6c6', band: '#a5957a', seed: 3, damage: 0.35 },
  grey: { wall: '#8f9190', frame: '#c9c9c4', band: '#7c7e7d', seed: 5, damage: 0.45 },
  ochre: { wall: '#b38d56', frame: '#e2dccb', band: '#9b7a48', seed: 7, damage: 0.3, shutters: true, shutterColor: '#4b5a44' },
  blue: { wall: '#7f8c94', frame: '#e6e2d8', band: '#6c787f', seed: 9, damage: 0.4 },
  brick: { wall: '#8a5444', frame: '#d8d2c4', band: '#7a7166', seed: 11, brick: true, damage: 0.35 },
  pale: { wall: '#c7c0ae', frame: '#f0ece2', band: '#aea792', seed: 13, damage: 0.25, shutters: true, shutterColor: '#6a4a33' },
  soviet: { wall: '#9c9a93', frame: '#bcbab2', band: '#8a8880', seed: 15, damage: 0.55 },
};
export const SHOPS = [
  { wall: '#776f63', seed: 21, damage: 0.5 },
  { wall: '#6f6d68', seed: 23, damage: 0.35 },
  { wall: '#857660', seed: 25, damage: 0.45 },
];

/** Mission buildings (solid, collidable). x0<x1, z0<z1. */
export const BUILDINGS = [
  // --- plaza ring
  F({ id: 'PW', x0: -48, x1: -30, z0: 7, z1: 52, floors: 4, style: 'ochre', shop: 0 }),
  F({ id: 'PE', x0: 30, x1: 48, z0: 7, z1: 52, floors: 5, style: 'grey', shop: 1 }),
  F({ id: 'PS1', x0: -48, x1: -8, z0: 55, z1: 73, floors: 4, style: 'beige', shop: 2 }),
  F({ id: 'PS2', x0: 8, x1: 48, z0: 55, z1: 73, floors: 6, style: 'soviet', shop: 1 }),
  // --- avenue, west side
  F({ id: 'LB1', x0: -30, x1: -11, z0: -19, z1: 5, floors: 4, style: 'beige', shop: 0, balconies: true }),
  F({ id: 'LB2', x0: -26, x1: -11, z0: -46, z1: -22, floors: 8, style: 'soviet', shop: 1 }), // sniper tower
  F({ id: 'LB3', x0: -26, x1: -11, z0: -55, z1: -46, floors: 3, style: 'brick', shop: 2 }),
  F({ id: 'LB4', x0: -29, x1: -11, z0: -95, z1: -68, floors: 5, style: 'pale', shop: 0, balconies: true }),
  F({ id: 'LB5', x0: -26, x1: -11, z0: -113, z1: -95, floors: 3, style: 'grey', shop: 2 }),
  F({ id: 'LB6', x0: -29, x1: -11, z0: -168, z1: -117, floors: 6, style: 'ochre', shop: 1 }),
  // --- avenue, east side
  F({ id: 'RB1', x0: 11, x1: 30, z0: -22, z1: 5, floors: 3, style: 'blue', shop: 1 }),
  F({ id: 'RB2', x0: 11, x1: 29, z0: -55, z1: -28, floors: 5, style: 'brick', shop: 0, balconies: true }),
  F({ id: 'RB3', x0: 11, x1: 26, z0: -98, z1: -68, floors: 4, style: 'beige', shop: 2 }),
  F({ id: 'RB4', x0: 11, x1: 29, z0: -140, z1: -98, floors: 7, style: 'soviet', shop: 1 }),
  F({ id: 'RB5', x0: 11, x1: 26, z0: -167, z1: -140, floors: 4, style: 'pale', shop: 0 }),
  // --- cross street outer blocks
  F({ id: 'CW1', x0: -70, x1: -29, z0: -55, z1: -40, floors: 4, style: 'grey', shop: 0 }),
  F({ id: 'CW2', x0: -70, x1: -29, z0: -90, z1: -68, floors: 5, style: 'beige', shop: 1 }),
  F({ id: 'CE1', x0: 29, x1: 70, z0: -55, z1: -37, floors: 3, style: 'ochre', shop: 2 }),
  F({ id: 'CE2', x0: 26, x1: 70, z0: -92, z1: -68, floors: 6, style: 'blue', shop: 0 }),
  // --- behind blocks (fill gaps)
  F({ id: 'BW1', x0: -60, x1: -30, z0: -37, z1: 4, floors: 5, style: 'brick', shop: 2 }),
  F({ id: 'BE1', x0: 32, x1: 60, z0: -34, z1: 4, floors: 4, style: 'pale', shop: 0 }),
  F({ id: 'BW2', x0: -60, x1: -29, z0: -165, z1: -95, floors: 4, style: 'grey', shop: 1 }),
  F({ id: 'BE2', x0: 29, x1: 60, z0: -165, z1: -95, floors: 5, style: 'ochre', shop: 2 }),
];

/** The Halden building: objective at the end of the avenue. */
export const HALDEN = { x0: -24, x1: 24, z0: -205, z1: -168, door: { x: 0, y: 1.6, z: -167.6 } };

export const LZ = { x: 0, z: 30, yaw: Math.PI };

/** Sniper perch on LB2 roof. */
export const SNIPER_PERCH = { x: -13.2, y: 25.5, z: -35 };

/**
 * Cover props. type: car|van|burnedCar|barrier|sandbags|dumpster|planter|bus|crates
 * rot is yaw in radians (cars: keep near 0 or PI/2 for tight colliders).
 */
export const PROPS = [
  // plaza (allied side)
  { type: 'sandbags', x: -4, z: 7.5, len: 5, rot: 0 },
  { type: 'sandbags', x: 4.5, z: 7.5, len: 5, rot: 0 },
  { type: 'bus', x: 15, z: 16, rot: Math.PI / 2 + 0.05 },
  { type: 'planter', x: -13, z: 11 }, { type: 'planter', x: -20, z: 20 }, { type: 'planter', x: 20, z: 34 },
  { type: 'planter', x: -21, z: 38 }, { type: 'planter', x: 22, z: 44 },
  { type: 'kiosk', x: -22, z: 28 },
  { type: 'burnedCar', x: -9, z: 15, rot: 0.3 },
  { type: 'crates', x: -6, z: 10.5, ammo: true },
  // avenue wave 1 (z -5 .. -50)
  { type: 'car', x: 6.4, z: -6, rot: 0, color: 0x6b7f8f },
  { type: 'van', x: -6.3, z: -14, rot: Math.PI, color: 0xd8d4c8 },
  { type: 'car', x: 2.5, z: -21, rot: 0.25, color: 0x8a2a22 },
  { type: 'barrier', x: -4, z: -30, rot: 0 }, { type: 'barrier', x: -1, z: -30.3, rot: 0.08 },
  { type: 'dumpster', x: 12.6, z: -24.8, rot: Math.PI / 2 },
  { type: 'burnedCar', x: -5.5, z: -38, rot: -0.15 },
  { type: 'sandbags', x: 1.5, z: -44, len: 6, rot: 0 },
  { type: 'car', x: 6.5, z: -36, rot: Math.PI, color: 0x3c4a3a },
  // avenue wave 2 (crossroads)
  { type: 'car', x: -5.6, z: -47, rot: 0.05, color: 0x9aa0a3, id: 'rpgTarget' },
  { type: 'barrier', x: 4, z: -52, rot: -0.1 },
  { type: 'burnedCar', x: 14, z: -61, rot: Math.PI / 2 },
  { type: 'van', x: -20, z: -63, rot: Math.PI / 2 + 0.1, color: 0x3a5372 },
  { type: 'barrier', x: -3, z: -64, rot: 0.5 },
  { type: 'car', x: 3.5, z: -72, rot: -0.3, color: 0x2b2b2e },
  { type: 'sandbags', x: -1, z: -82, len: 7, rot: 0 },
  { type: 'sandbags', x: 6.5, z: -84, len: 3, rot: Math.PI / 2 },
  { type: 'burnedCar', x: -6.4, z: -88, rot: 0 },
  { type: 'dumpster', x: -9.5, z: -76, rot: 0 },
  { type: 'crates', x: 9.6, z: -66, ammo: true },
  // avenue wave 3 (to Halden)
  { type: 'car', x: 6.2, z: -104, rot: 0, color: 0xb8a77a },
  { type: 'barrier', x: -3.5, z: -112, rot: 0 }, { type: 'barrier', x: -0.5, z: -112.3, rot: 0.06 },
  { type: 'van', x: -6.2, z: -122, rot: 0, color: 0x5d5d58 },
  { type: 'burnedCar', x: 3, z: -128, rot: 0.6 },
  { type: 'sandbags', x: 4.5, z: -138, len: 5, rot: 0 },
  { type: 'barrier', x: -4, z: -146, rot: -0.12 },
  { type: 'sandbags', x: 0, z: -153, len: 8, rot: 0 },
  { type: 'car', x: -6.5, z: -158, rot: Math.PI, color: 0x445566 },
  { type: 'dumpster', x: 9.6, z: -150, rot: 0 },
  { type: 'crates', x: -9.5, z: -100, ammo: true },
];

/** Fires: burning wrecks / barrels (light + particles). */
export const FIRES = [
  { x: -9, y: 0.9, z: 15, size: 1.0 },
  { x: -5.5, y: 0.9, z: -38, size: 0.8 },
  { x: 14, y: 0.9, z: -61, size: 1.2 },
  { x: 3, y: 0.9, z: -128, size: 0.9 },
];

/** Distant smoke columns visible during the helicopter flight. */
export const SMOKE_COLUMNS = [
  { x: -120, z: -60 }, { x: 160, z: 120 }, { x: -60, z: 260 }, { x: 90, z: -240 }, { x: -210, z: 140 },
];

/** Invisible boundary walls (keep the player in the play space). */
export const BOUNDS = [
  // plaza south road exit
  { x0: -8, x1: 8, z0: 72, z1: 73.5 },
  // cross street ends
  { x0: -71, x1: -69, z0: -68, z1: -55 },
  { x0: 69, x1: 71, z0: -68, z1: -55 },
  // alleys
  { x0: 30, x1: 32, z0: -28, z1: -22 },
  { x0: -29, x1: -27, z0: -117, z1: -113 },
  { x0: -26, x1: -11, z0: -22, z1: -19 },
];

/** Region excluded from the procedural background city. */
export const MISSION_RECT = { x0: -72, x1: 72, z0: -210, z1: 76 };
