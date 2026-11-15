/**
 * Kessel valley (Mission 4): a mountain valley west of Teresk with a road along
 * its floor and a VÉRTICE radar/air base at its eastern end. Absolute coordinates.
 */
export const VALLEY = {
  x0: -3700, x1: -1500, z0: -1000, z1: 1000,
  road: { x0: -3600, x1: -1900 },
  base: { x: -1800, z: 0, flatR: 150, fence: { x0: -1880, x1: -1720, z0: -75, z1: 75 } },
  runway: { x0: -1990, x1: -1560, z0: -112, z1: -86 },
  lz: { x: -1792, z: 42 },
  // AA batteries the helicopter must clear (on the valley sides)
  aa: [
    { id: 'aa1', x: -3060, side: 1 },
    { id: 'aa2', x: -2620, side: -1 },
    { id: 'aa3', x: -2200, side: 1 },
  ],
};

/** Dravik, a mountain village on the valley road (Mission 6). The ground is flat inside flatR. */
export const VILLAGE = {
  x: -2450, flatR: 140,
  bounds: { x0: -2575, x1: -2370, z0: -235, z1: -130 },
  roadblock: { x: -2438 },
  convoyStop: [-2532, -2548, -2564],
};

/** Road centre-line z for a given x (gentle curves along the valley floor). */
export function roadZ(x) {
  const t = (x - VALLEY.road.x0) / 260;
  return 150 * Math.sin(t) + 40 * Math.sin(t * 2.3 + 1);
}

function hash(x, z) {
  const s = Math.sin(x * 127.1 + z * 311.7) * 43758.5453;
  return s - Math.floor(s);
}
function vnoise(x, z) {
  const xi = Math.floor(x), zi = Math.floor(z), xf = x - xi, zf = z - zi;
  const u = xf * xf * (3 - 2 * xf), v = zf * zf * (3 - 2 * zf);
  const a = hash(xi, zi), b = hash(xi + 1, zi), c = hash(xi, zi + 1), d = hash(xi + 1, zi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
function fbm(x, z) {
  let s = 0, a = 0.5, f = 1;
  for (let i = 0; i < 5; i++) { s += a * vnoise(x * f, z * f); f *= 2.02; a *= 0.5; }
  return s;
}

/** Terrain height (metres). Valley floor along the road, mountains on both sides, flat air base. */
export function terrainHeight(x, z) {
  const rz = roadZ(Math.min(Math.max(x, VALLEY.road.x0), VALLEY.road.x1));
  const d = Math.abs(z - rz);
  const n = fbm(x / 180, z / 180);
  let h = 1.2 + n * 6;
  const slope = Math.max(0, d - 55);
  h += Math.pow(slope, 1.18) * 0.42 * (0.6 + n * 0.9);
  h += Math.max(0, fbm(x / 90 + 7, z / 90 - 3) - 0.45) * 60 * Math.min(1, slope / 120);
  // flatten the air base and its runway
  const B = VALLEY.base;
  const db = Math.hypot(x - B.x, z - B.z);
  const flat = Math.min(1, Math.max(0, (db - B.flatR) / 90));
  const R = VALLEY.runway;
  const inRunway = x > R.x0 - 40 && x < R.x1 + 40 && z > R.z0 - 40 && z < R.z1 + 30;
  // flatten the village of Dravik
  const dv = Math.hypot(x - VILLAGE.x, z - VILLAGE.z);
  const fv = Math.min(1, Math.max(0, (dv - VILLAGE.flatR) / 70));
  const k = inRunway ? 0 : Math.min(flat, fv);
  return -0.05 * (1 - k) + h * k;
}

VILLAGE.z = roadZ(VILLAGE.x);
