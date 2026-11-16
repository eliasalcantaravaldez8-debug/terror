// Small, dependency-free math helpers shared by gameplay code and unit tests.
export const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
export const lerp = (a, b, t) => a + (b - a) * t;
/** Frame-rate independent exponential smoothing. */
export const damp = (a, b, lambda, dt) => lerp(a, b, 1 - Math.exp(-lambda * dt));
export const smoothstep = (e0, e1, x) => {
  const t = clamp((x - e0) / (e1 - e0), 0, 1);
  return t * t * (3 - 2 * t);
};
export const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
export const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

/** Deterministic PRNG (mulberry32). */
export function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const wrapAngle = (a) => {
  while (a > Math.PI) a -= Math.PI * 2;
  while (a < -Math.PI) a += Math.PI * 2;
  return a;
};
export const dampAngle = (a, b, lambda, dt) => a + wrapAngle(b - a) * (1 - Math.exp(-lambda * dt));
export const randRange = (rng, a, b) => a + (b - a) * rng();
export const pick = (rng, arr) => arr[Math.floor(rng() * arr.length) % arr.length];
export const dist2D = (ax, az, bx, bz) => Math.hypot(ax - bx, az - bz);

/** Uniform Catmull-Rom on scalar arrays (used for camera / vehicle splines). */
export function catmull(p0, p1, p2, p3, t) {
  const t2 = t * t, t3 = t2 * t;
  return 0.5 * (2 * p1 + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3);
}

/**
 * Sample a list of keyframes [{t, ...numericFields}] at time `time` using Catmull-Rom.
 * Returns an object with the same numeric fields.
 */
export function sampleKeys(keys, time, fields) {
  if (time <= keys[0].t) return pickFields(keys[0], fields);
  const last = keys[keys.length - 1];
  if (time >= last.t) return pickFields(last, fields);
  let i = 0;
  while (i < keys.length - 2 && keys[i + 1].t < time) i++;
  const k0 = keys[Math.max(0, i - 1)], k1 = keys[i], k2 = keys[i + 1], k3 = keys[Math.min(keys.length - 1, i + 2)];
  const u = (time - k1.t) / (k2.t - k1.t);
  const out = {};
  for (const f of fields) out[f] = catmull(k0[f], k1[f], k2[f], k3[f], u);
  return out;
}
function pickFields(k, fields) {
  const o = {};
  for (const f of fields) o[f] = k[f];
  return o;
}
