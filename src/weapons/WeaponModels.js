import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { SLOTS, CAMOS } from './Loadout.js';

let _camo = null; // camouflage material applied to furniture while a model is being built
/** Furniture (stock, handguard, shell) material: camo wrap when fitted, else the factory finish. */
function furn(mats, kind, color) { return _camo || mats.weapon(kind, color); }

/**
 * Procedural, ORIGINAL fictional firearm models (no real-world brand replicas).
 * Built along +Z (muzzle forward). Each returns a Group with named anchors:
 * muzzle, gripRear, gripFront, sight, ejection (+ userData.magazine / pump / slide).
 * Materials use worn PBR finishes from Materials.weapon().
 */
const _geoCache = new Map();
function rgeo(w, h, d, r) {
  const key = `${w}|${h}|${d}|${r}`;
  let g = _geoCache.get(key);
  if (!g) { g = new RoundedBoxGeometry(w, h, d, 2, Math.min(r, Math.min(w, h, d) * 0.45)); _geoCache.set(key, g); }
  return g;
}
/** Rounded box part. */
function rb(parent, w, h, d, mat, x = 0, y = 0, z = 0, r = 0.004) {
  const m = new THREE.Mesh(rgeo(w, h, d, r), mat);
  m.position.set(x, y, z);
  parent.add(m);
  return m;
}
function cyl(parent, r, len, mat, x = 0, y = 0, z = 0, seg = 14, open = false, r2 = r) {
  const g = new THREE.CylinderGeometry(r, r2, len, seg, 1, open);
  g.rotateX(Math.PI / 2);
  const m = new THREE.Mesh(g, mat);
  m.position.set(x, y, z);
  parent.add(m);
  return m;
}
/** Side-profile extrusion: points are [z, y]; extruded symmetric along X by `width`. */
function profile(parent, points, width, mat, bevel = 0.002) {
  const sh = new THREE.Shape();
  sh.moveTo(points[0][0], points[0][1]);
  for (const p of points.slice(1)) sh.lineTo(p[0], p[1]);
  sh.closePath();
  const g = new THREE.ExtrudeGeometry(sh, { depth: width - bevel * 2, bevelEnabled: bevel > 0, bevelSize: bevel, bevelThickness: bevel, bevelSegments: 1, curveSegments: 6 });
  g.translate(0, 0, -(width - bevel * 2) / 2);
  g.rotateY(-Math.PI / 2);
  // planar UVs from side view so textures map with real scale
  const pa = g.attributes.position, uv = g.attributes.uv;
  for (let i = 0; i < pa.count; i++) uv.setXY(i, pa.getZ(i) * 6 + pa.getX(i) * 6, pa.getY(i) * 6);
  const m = new THREE.Mesh(g, mat);
  parent.add(m);
  return m;
}
function rail(parent, len, mat, y, z0, detail) {
  rb(parent, 0.024, 0.008, len, mat, 0, y, z0 + len / 2, 0.002);
  if (detail) {
    const n = Math.floor(len / 0.01);
    const g = new THREE.BoxGeometry(0.026, 0.005, 0.005);
    const im = new THREE.InstancedMesh(g, mat, n);
    const m4 = new THREE.Matrix4();
    for (let i = 0; i < n; i++) im.setMatrixAt(i, m4.makeTranslation(0, y + 0.006, z0 + 0.005 + i * 0.01));
    parent.add(im);
  }
}
function finish(g, detail) {
  g.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = detail === 'high'; } });
  return g;
}
function redDot(mats, detail, y, z) {
  const optic = new THREE.Group();
  const dark = mats.weapon('metal', '#1d1f21');
  rb(optic, 0.028, 0.02, 0.08, dark, 0, y - 0.03, z, 0.004);
  const hoodMat = dark.clone(); hoodMat.side = THREE.DoubleSide;
  cyl(optic, 0.022, 0.07, hoodMat, 0, y, z, 22, true);
  for (const rz of [z - 0.035, z + 0.035]) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.022, 0.0035, 6, 22), dark);
    ring.position.set(0, y, rz); optic.add(ring);
  }
  rb(optic, 0.012, 0.012, 0.016, dark, 0.024, y, z, 0.002); // brightness knob
  if (detail === 'high') {
    const lens = new THREE.Mesh(new THREE.CircleGeometry(0.02, 20), new THREE.MeshStandardMaterial({ color: 0x1a2a22, metalness: 0.9, roughness: 0.05, transparent: true, opacity: 0.3 }));
    lens.position.set(0, y, z + 0.03); optic.add(lens);
    const dot = new THREE.Mesh(new THREE.CircleGeometry(0.0016, 8), new THREE.MeshBasicMaterial({ color: 0xff2a1a }));
    dot.position.set(0, y, z + 0.028); dot.rotation.y = Math.PI; optic.add(dot);
  }
  return optic;
}


/**
 * Extra realism for first-person weapons: a bolt carrier visible in the ejection port
 * (animated on each shot), folding iron sights, a light/laser module, magazine ribs,
 * sling loops and screws.
 */
function addDetails(g, mats, { port, rail = null, light = null, mag = null, ironFront = null, ironRear = null }) {
  const metal = mats.weapon('metal', '#3a3c3f'), dark = mats.weapon('metal', '#141516'), bright = mats.weapon('metal', '#8e8f8c');
  // bolt carrier glimpsed through the ejection port
  const bolt = new THREE.Group(); bolt.name = 'bolt';
  rb(bolt, 0.012, 0.018, 0.07, bright, 0, 0, 0, 0.002);
  rb(bolt, 0.014, 0.006, 0.012, metal, 0.004, 0.012, 0.02, 0.001); // extractor claw
  bolt.position.copy(port); g.add(bolt);
  g.userData.bolt = bolt;
  // folding iron sights on the rail
  if (ironRear) { rb(g, 0.03, 0.012, 0.02, dark, 0, ironRear.y, ironRear.z, 0.002); const ap = new THREE.Mesh(new THREE.TorusGeometry(0.006, 0.0025, 6, 12), dark); ap.position.set(0, ironRear.y + 0.012, ironRear.z); g.add(ap); }
  if (ironFront) { rb(g, 0.03, 0.012, 0.02, dark, 0, ironFront.y, ironFront.z, 0.002); rb(g, 0.003, 0.02, 0.003, dark, 0, ironFront.y + 0.014, ironFront.z, 0.001); }
  // weapon light + laser on the side rail
  if (light) {
    const body = cyl(g, 0.014, 0.08, dark, light.x, light.y, light.z, 14);
    body.name = 'light';
    const lens = new THREE.Mesh(new THREE.CircleGeometry(0.012, 14), mats.emissive(0xfff4dc, 0.6));
    lens.position.set(light.x, light.y, light.z + 0.041); g.add(lens);
    rb(g, 0.016, 0.014, 0.03, metal, light.x * 0.6, light.y + 0.012, light.z - 0.01, 0.002); // mount
    rb(g, 0.012, 0.012, 0.012, dark, light.x, light.y - 0.012, light.z - 0.03, 0.002); // pressure switch
  }
  // magazine ribs + witness holes
  if (mag) for (let i = 0; i < 4; i++) rb(mag, 0.036, 0.004, 0.06, dark, 0, -0.04 - i * 0.03, 0.03 + i * 0.006, 0.001);
  // screws / pins
  for (const [x, y, z] of [[0.027, 0.0, 0.06], [0.027, 0.0, -0.05], [0.027, 0.04, 0.12]]) cyl(g, 0.004, 0.003, bright, x, y, z, 8).rotation.set(0, 0, Math.PI / 2);
}

/** VK-7 assault rifle (fictional). */
export function makeRifle(mats, detail = 'high') {
  const g = new THREE.Group(); g.name = 'VK-7';
  const metal = mats.weapon('metal', '#2a2c2e'), poly = mats.weapon('polymer', '#2a2926'), tan = furn(mats, 'cerakote', '#7a6c52'), dark = mats.weapon('metal', '#18191a');
  // lower receiver with magwell and trigger guard
  profile(g, [[-0.09, -0.005], [0.03, -0.005], [0.035, -0.045], [0.11, -0.045], [0.12, -0.005], [0.15, -0.005], [0.15, 0.03], [-0.09, 0.03]], 0.05, metal);
  // upper receiver
  profile(g, [[-0.1, 0.03], [0.2, 0.03], [0.2, 0.07], [-0.08, 0.07], [-0.1, 0.06]], 0.054, metal);
  rail(g, 0.3, dark, 0.074, -0.08, detail === 'high');
  // handguard (tan, with vent cuts)
  rb(g, 0.064, 0.064, 0.29, tan, 0, 0.034, 0.34, 0.012);
  if (detail === 'high') {
    for (let i = 0; i < 6; i++) for (const sx of [-1, 1]) rb(g, 0.004, 0.012, 0.03, dark, sx * 0.032, 0.03, 0.235 + i * 0.042, 0.001);
    rail(g, 0.26, dark, 0.07, 0.21, true);
  }
  // barrel, gas block, muzzle device
  cyl(g, 0.011, 0.26, dark, 0, 0.035, 0.6);
  cyl(g, 0.016, 0.03, dark, 0, 0.04, 0.5);
  cyl(g, 0.017, 0.07, dark, 0, 0.035, 0.75, 12);
  if (detail === 'high') for (let i = 0; i < 3; i++) rb(g, 0.036, 0.006, 0.008, metal, 0, 0.035, 0.73 + i * 0.016, 0.001);
  // magazine (curved polymer)
  const mag = new THREE.Group(); mag.name = 'magazine';
  profile(mag, [[0.0, 0.0], [0.07, 0.0], [0.085, -0.12], [0.1, -0.2], [0.035, -0.21], [0.02, -0.12]], 0.03, poly);
  rb(mag, 0.034, 0.012, 0.07, poly, 0, -0.205, 0.07, 0.003);
  mag.position.set(0, -0.04, 0.04);
  g.add(mag);
  // pistol grip
  const grip = profile(g, [[-0.04, -0.005], [0.0, -0.005], [-0.01, -0.12], [-0.055, -0.12], [-0.06, -0.08]], 0.034, poly);
  grip.position.z = -0.03;
  // trigger guard + trigger
  rb(g, 0.008, 0.006, 0.06, metal, 0, -0.035, 0.0, 0.002);
  rb(g, 0.004, 0.02, 0.006, dark, 0, -0.02, 0.01, 0.001);
  // buffer tube + stock
  cyl(g, 0.014, 0.17, metal, 0, 0.04, -0.17);
  profile(g, [[-0.33, -0.04], [-0.22, -0.01], [-0.17, 0.02], [-0.17, 0.065], [-0.34, 0.065], [-0.35, 0.02]], 0.045, tan);
  rb(g, 0.047, 0.11, 0.018, mats.rubber(), 0, 0.012, -0.355, 0.004);
  if (detail === 'high') {
    rb(g, 0.02, 0.014, 0.035, metal, 0.03, 0.06, -0.06, 0.003); // charging handle
    rb(g, 0.004, 0.022, 0.06, dark, 0.028, 0.045, 0.07, 0.001); // ejection port
    rb(g, 0.006, 0.01, 0.015, metal, 0.027, 0.0, -0.03, 0.002); // selector
    cyl(g, 0.006, 0.012, metal, -0.03, 0.01, -0.12); // sling mount
    rb(g, 0.03, 0.07, 0.035, poly, 0, -0.035, 0.35, 0.01); // vertical foregrip
  }
  if (detail === 'high') addDetails(g, mats, { port: new THREE.Vector3(0.022, 0.048, 0.07), mag, light: { x: -0.045, y: 0.03, z: 0.4 } });
  finish(g, detail);
  g.userData.anchors = {
    muzzle: new THREE.Vector3(0, 0.035, 0.79),
    gripRear: new THREE.Vector3(0, -0.07, -0.06),
    gripFront: new THREE.Vector3(0, -0.04, 0.35),
    sight: new THREE.Vector3(0, 0.115, 0.03),
    ejection: new THREE.Vector3(0.04, 0.05, 0.07),
  };
  g.userData.magazine = mag;
  return g;
}

/** MK-9 compact submachine gun (fictional). */
export function makeSMG(mats, detail = 'high') {
  const g = new THREE.Group(); g.name = 'MK-9';
  const metal = mats.weapon('metal', '#2b2d2f'), poly = mats.weapon('polymer', '#242424'), dark = mats.weapon('metal', '#18191a');
  profile(g, [[-0.08, -0.03], [0.2, -0.03], [0.22, 0.0], [0.22, 0.06], [-0.08, 0.06]], 0.05, furn(mats, 'polymer', '#242424'));
  rail(g, 0.22, dark, 0.064, -0.05, detail === 'high');
  cyl(g, 0.01, 0.1, dark, 0, 0.025, 0.27);
  cyl(g, 0.02, 0.14, metal, 0, 0.025, 0.36, 16); // integral suppressor
  const mag = new THREE.Group(); mag.name = 'magazine';
  rb(mag, 0.026, 0.17, 0.035, poly, 0, -0.085, 0, 0.004);
  mag.position.set(0, -0.03, 0.06); mag.rotation.x = 0.08;
  g.add(mag);
  const grip = profile(g, [[-0.03, -0.03], [0.01, -0.03], [0.0, -0.13], [-0.045, -0.13], [-0.05, -0.09]], 0.032, poly);
  grip.position.z = -0.02;
  rb(g, 0.006, 0.006, 0.05, metal, 0, -0.04, 0.0, 0.002);
  // folding wire stock
  for (const sx of [-1, 1]) rb(g, 0.006, 0.006, 0.2, metal, sx * 0.022, 0.03, -0.17, 0.002);
  rb(g, 0.05, 0.08, 0.012, mats.rubber(), 0, 0.0, -0.27, 0.004);
  if (detail === 'high') { rb(g, 0.012, 0.012, 0.03, metal, -0.03, 0.05, 0.05, 0.003); rb(g, 0.03, 0.05, 0.03, poly, 0, -0.045, 0.17, 0.008); }
  if (detail === 'high') addDetails(g, mats, { port: new THREE.Vector3(0.02, 0.035, 0.06), mag, light: { x: -0.04, y: 0.02, z: 0.2 } });
  finish(g, detail);
  g.userData.anchors = {
    muzzle: new THREE.Vector3(0, 0.025, 0.43), gripRear: new THREE.Vector3(0, -0.08, -0.04),
    gripFront: new THREE.Vector3(0, -0.06, 0.17), sight: new THREE.Vector3(0, 0.1, 0.03), ejection: new THREE.Vector3(0.03, 0.04, 0.05),
  };
  g.userData.magazine = mag;
  return g;
}

/** BRK-12 pump shotgun (fictional). */
export function makeShotgun(mats, detail = 'high') {
  const g = new THREE.Group(); g.name = 'BRK-12';
  const metal = mats.weapon('metal', '#222426'), poly = mats.weapon('polymer', '#2e2b26'), olive = furn(mats, 'cerakote', '#4c5038'), dark = mats.weapon('metal', '#151617');
  profile(g, [[-0.08, -0.035], [0.16, -0.035], [0.18, 0.0], [0.18, 0.05], [-0.06, 0.06], [-0.08, 0.04]], 0.05, metal);
  cyl(g, 0.016, 0.5, dark, 0, 0.032, 0.42, 16); // barrel
  cyl(g, 0.014, 0.4, metal, 0, -0.005, 0.38, 12); // magazine tube
  const pump = new THREE.Group(); pump.name = 'pump';
  rb(pump, 0.052, 0.05, 0.16, olive, 0, -0.005, 0, 0.012);
  if (detail === 'high') for (let i = 0; i < 6; i++) rb(pump, 0.054, 0.004, 0.008, dark, 0, -0.005, -0.06 + i * 0.024, 0.001);
  pump.position.set(0, 0, 0.32); g.add(pump);
  const grip = profile(g, [[-0.05, -0.03], [-0.01, -0.03], [-0.02, -0.12], [-0.065, -0.12], [-0.07, -0.08]], 0.034, poly);
  grip.position.z = -0.02;
  rb(g, 0.006, 0.006, 0.06, metal, 0, -0.045, 0.02, 0.002);
  profile(g, [[-0.36, -0.05], [-0.2, -0.02], [-0.08, 0.0], [-0.08, 0.05], [-0.36, 0.055]], 0.044, olive);
  rb(g, 0.046, 0.11, 0.02, mats.rubber(), 0, 0.0, -0.37, 0.004);
  // ghost-ring rear sight + front post
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.009, 0.0025, 6, 14), dark); ring.position.set(0, 0.075, 0.12); g.add(ring);
  rb(g, 0.004, 0.018, 0.004, dark, 0, 0.055, 0.66, 0.001);
  finish(g, detail);
  g.userData.anchors = {
    muzzle: new THREE.Vector3(0, 0.032, 0.68), gripRear: new THREE.Vector3(0, -0.08, -0.05),
    gripFront: new THREE.Vector3(0, -0.03, 0.32), sight: new THREE.Vector3(0, 0.075, 0.12), ejection: new THREE.Vector3(0.03, 0.03, 0.07),
  };
  g.userData.pump = pump;
  g.userData.magazine = null;
  return g;
}

/** LR-6 designated marksman rifle with magnified scope (fictional). */
export function makeDMR(mats, detail = 'high') {
  const g = new THREE.Group(); g.name = 'LR-6';
  const metal = mats.weapon('metal', '#2a2c2e'), tan = furn(mats, 'cerakote', '#8a7a5c'), poly = mats.weapon('polymer', '#2a2926'), dark = mats.weapon('metal', '#18191a');
  profile(g, [[-0.1, -0.005], [0.03, -0.005], [0.035, -0.045], [0.1, -0.045], [0.11, -0.005], [0.16, -0.005], [0.16, 0.03], [-0.1, 0.03]], 0.052, metal);
  profile(g, [[-0.1, 0.03], [0.22, 0.03], [0.22, 0.07], [-0.1, 0.07]], 0.056, metal);
  rb(g, 0.068, 0.066, 0.36, tan, 0, 0.034, 0.4, 0.012);
  cyl(g, 0.012, 0.38, dark, 0, 0.035, 0.75);
  cyl(g, 0.02, 0.08, dark, 0, 0.035, 0.97, 10);
  const mag = new THREE.Group(); mag.name = 'magazine';
  rb(mag, 0.034, 0.12, 0.08, poly, 0, -0.06, 0.035, 0.005);
  mag.position.set(0, -0.04, 0.04); g.add(mag);
  const grip = profile(g, [[-0.04, -0.005], [0.0, -0.005], [-0.01, -0.12], [-0.055, -0.12], [-0.06, -0.08]], 0.034, poly);
  grip.position.z = -0.03;
  rb(g, 0.008, 0.006, 0.06, metal, 0, -0.035, 0.0, 0.002);
  profile(g, [[-0.4, -0.05], [-0.22, -0.02], [-0.1, 0.0], [-0.1, 0.07], [-0.4, 0.08]], 0.048, tan);
  rb(g, 0.05, 0.13, 0.02, mats.rubber(), 0, 0.012, -0.41, 0.004);
  rb(g, 0.04, 0.02, 0.12, tan, 0, 0.09, -0.27, 0.006); // cheek riser
  // scope
  const scopeMat = mats.weapon('metal', '#1c1d1e');
  cyl(g, 0.019, 0.2, scopeMat, 0, 0.115, 0.07, 18);
  cyl(g, 0.026, 0.06, scopeMat, 0, 0.115, 0.2, 18, false, 0.02);
  cyl(g, 0.023, 0.05, scopeMat, 0, 0.115, -0.06, 18, false, 0.019);
  cyl(g, 0.024, 0.03, scopeMat, 0, 0.142, 0.07, 10).rotation.x = 0; // turret
  for (const z of [0.0, 0.14]) rb(g, 0.03, 0.04, 0.018, dark, 0, 0.09, z, 0.003);
  if (detail === 'high') {
    const lens = new THREE.Mesh(new THREE.CircleGeometry(0.024, 20), new THREE.MeshStandardMaterial({ color: 0x223040, metalness: 1, roughness: 0.05 }));
    lens.position.set(0, 0.115, 0.231); g.add(lens);
  }
  if (detail === 'high') addDetails(g, mats, { port: new THREE.Vector3(0.024, 0.048, 0.07), mag });
  finish(g, detail);
  g.userData.anchors = {
    muzzle: new THREE.Vector3(0, 0.035, 1.01), gripRear: new THREE.Vector3(0, -0.07, -0.06),
    gripFront: new THREE.Vector3(0, -0.01, 0.4), sight: new THREE.Vector3(0, 0.115, -0.08), ejection: new THREE.Vector3(0.04, 0.05, 0.07),
  };
  g.userData.magazine = mag;
  return g;
}

/** P-11 sidearm (fictional). */
export function makePistol(mats, detail = 'high', { suppressed = false } = {}) {
  const g = new THREE.Group(); g.name = suppressed ? 'P-11S' : 'P-11';
  const metal = mats.weapon('metal', '#2b2d2f'), poly = mats.weapon('polymer', '#232323'), dark = mats.weapon('metal', '#18191a');
  const slide = new THREE.Group(); slide.name = 'slide';
  rb(slide, 0.029, 0.03, 0.19, metal, 0, 0, 0, 0.004);
  if (detail === 'high') for (let i = 0; i < 6; i++) for (const sx of [-1, 1]) rb(slide, 0.002, 0.022, 0.004, dark, sx * 0.015, 0, -0.07 + i * 0.008, 0.0005);
  rb(slide, 0.006, 0.008, 0.008, dark, 0, 0.019, 0.085, 0.001);
  rb(slide, 0.02, 0.008, 0.008, dark, 0, 0.019, -0.085, 0.001);
  slide.position.set(0, 0.03, 0.04); g.add(slide);
  rb(g, 0.027, 0.024, 0.16, poly, 0, 0.004, 0.03, 0.004);
  const grip = profile(g, [[-0.04, 0.0], [0.01, 0.0], [-0.005, -0.11], [-0.05, -0.11], [-0.06, -0.02]], 0.028, furn(mats, 'polymer', '#232323'));
  grip.position.z = 0.0;
  const mag = new THREE.Group(); mag.name = 'magazine';
  rb(mag, 0.022, 0.012, 0.04, dark, 0, -0.115, -0.03, 0.002);
  g.add(mag);
  rb(g, 0.006, 0.006, 0.045, poly, 0, -0.018, 0.02, 0.002);
  cyl(g, 0.006, 0.02, dark, 0, 0.03, 0.14);
  // fixed barrel (visible when the slide locks back) + optional suppressor
  cyl(g, 0.009, 0.1, mats.weapon('metal', '#8e8f8c'), 0, 0.034, 0.08, 10);
  if (suppressed) {
    cyl(g, 0.017, 0.16, mats.weapon('metal', '#1a1b1c'), 0, 0.03, 0.23, 16);
    for (const z of [0.16, 0.3]) cyl(g, 0.018, 0.008, mats.weapon('metal', '#2e3032'), 0, 0.03, z, 16);
  }
  finish(g, detail);
  g.userData.anchors = {
    muzzle: new THREE.Vector3(0, 0.03, 0.15), gripRear: new THREE.Vector3(0, -0.04, -0.025),
    gripFront: new THREE.Vector3(0, -0.06, -0.01), sight: new THREE.Vector3(0, 0.054, 0.0), ejection: new THREE.Vector3(0.02, 0.04, 0.04),
  };
  if (suppressed) g.userData.anchors.muzzle.set(0, 0.03, 0.32);
  g.userData.magazine = mag;
  g.userData.slide = slide;
  return g;
}

/** Long precision rifle for the enemy sniper (AI only). */
export function makeSniperRifle(mats) { return makeDMR(mats, 'low'); }

/** Default attachments (used by AI soldiers, pickups and the warm-up). */
export function defaultAttach(id) {
  const sl = SLOTS[id] || {};
  return { optic: sl.optic?.[0] ?? null, muzzle: sl.muzzle?.[0] ?? null, mag: sl.mag?.[0] ?? null, camo: 'none' };
}

/** Build a weapon with its fitted attachments (optic, muzzle device, magazine, camouflage). */
export function makeWeaponModel(id, mats, detail = 'high', attach = null) {
  const a = attach || defaultAttach(id);
  const camo = a.camo && CAMOS[a.camo]?.colors ? CAMOS[a.camo] : null;
  _camo = camo ? mats.weaponCamo(a.camo, camo.colors, camo.stripes) : null;
  let g;
  try {
    switch (id) {
      case 'mk9': g = makeSMG(mats, detail); break;
      case 'brk12': g = makeShotgun(mats, detail); break;
      case 'lr6': g = makeDMR(mats, detail); break;
      case 'p11': g = makePistol(mats, detail); break;
      case 'p11s': g = makePistol(mats, detail, { suppressed: true }); break;
      case 'kr4': g = makeBullpup(mats, detail); break;
      case 'vkm': g = makeLMG(mats, detail); break;
      case 'sr50': g = makeBoltRifle(mats, detail); break;
      case 'r44': g = makeRevolver(mats, detail); break;
      default: g = makeRifle(mats, detail);
    }
  } finally { _camo = null; }
  fitAttachments(g, id, a, mats, detail);
  return finish(g, detail);
}

export function makeGrenade(mats) {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.035, 14, 12), mats.weapon('cerakote', '#3b4430'));
  body.scale.set(1, 1.2, 1); g.add(body);
  const top = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.014, 0.03, 8), mats.darkMetal());
  top.position.y = 0.045; g.add(top);
  const lever = new THREE.Mesh(new THREE.BoxGeometry(0.008, 0.06, 0.012), mats.metalPole());
  lever.position.set(0.02, 0.02, 0); g.add(lever);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.01, 0.002, 6, 12), mats.metalPole());
  ring.position.set(-0.012, 0.055, 0); g.add(ring);
  g.traverse((o) => { if (o.isMesh) o.castShadow = true; });
  return g;
}

// ------------------------------------------------------------------ new weapons

/** KR-4 bullpup assault rifle (fictional): magazine behind the grip, carry rail, 3-round burst. */
export function makeBullpup(mats, detail = 'high') {
  const g = new THREE.Group(); g.name = 'KR-4';
  const shell = furn(mats, 'polymer', '#3d3c35'), metal = mats.weapon('metal', '#2a2c2e'), poly = mats.weapon('polymer', '#26261f'), dark = mats.weapon('metal', '#18191a');
  // one-piece polymer shell: butt, receiver housing and handguard
  profile(g, [[-0.31, -0.085], [-0.31, 0.05], [0.12, 0.055], [0.16, 0.032], [0.3, 0.032], [0.3, -0.022], [0.12, -0.03], [-0.21, -0.03], [-0.23, -0.085]], 0.062, shell);
  rb(g, 0.064, 0.16, 0.018, mats.rubber(), 0, -0.016, -0.315, 0.004); // butt pad
  rb(g, 0.05, 0.022, 0.12, shell, 0, 0.062, -0.23, 0.006); // cheek rest
  rail(g, 0.34, dark, 0.065, -0.21, detail === 'high'); // full-length carry rail
  for (const z of [-0.19, 0.11]) rb(g, 0.03, 0.012, 0.03, dark, 0, 0.058, z, 0.002); // rail risers
  if (detail === 'high') {
    for (let i = 0; i < 5; i++) for (const sx of [-1, 1]) rb(g, 0.004, 0.01, 0.022, dark, sx * 0.031, 0.006, 0.17 + i * 0.026, 0.001); // handguard vents
    rb(g, 0.016, 0.012, 0.022, metal, -0.034, 0.04, 0.2, 0.003); // forward charging handle
    rb(g, 0.004, 0.022, 0.07, dark, 0.031, 0.025, -0.12, 0.001); // ejection port
    rb(g, 0.012, 0.012, 0.012, metal, 0.03, -0.01, 0.02, 0.002); // selector
    rb(g, 0.05, 0.03, 0.1, dark, 0, -0.045, -0.16, 0.004); // magwell
  }
  // barrel & flash hider
  cyl(g, 0.011, 0.2, dark, 0, 0.012, 0.38);
  cyl(g, 0.016, 0.06, dark, 0, 0.012, 0.5, 12);
  if (detail === 'high') for (let i = 0; i < 4; i++) rb(g, 0.034, 0.004, 0.006, metal, 0, 0.012, 0.48 + i * 0.012, 0.001);
  // magazine behind the grip
  const mag = new THREE.Group(); mag.name = 'magazine';
  profile(mag, [[0, 0], [0.062, 0], [0.074, -0.1], [0.086, -0.165], [0.03, -0.175], [0.018, -0.1]], 0.03, poly);
  rb(mag, 0.034, 0.012, 0.064, poly, 0, -0.17, 0.058, 0.003);
  mag.position.set(0, -0.06, -0.2); g.add(mag);
  // pistol grip forward + long trigger bar
  profile(g, [[0.02, -0.03], [0.062, -0.03], [0.05, -0.135], [0.008, -0.135], [0.0, -0.09]], 0.034, poly);
  rb(g, 0.008, 0.006, 0.07, metal, 0, -0.062, 0.075, 0.002);
  rb(g, 0.004, 0.02, 0.006, dark, 0, -0.045, 0.078, 0.001);
  if (detail === 'high') addDetails(g, mats, { port: new THREE.Vector3(0.026, 0.026, -0.12), mag, light: { x: -0.042, y: 0.0, z: 0.25 } });
  finish(g, detail);
  g.userData.anchors = {
    muzzle: new THREE.Vector3(0, 0.012, 0.53), gripRear: new THREE.Vector3(0, -0.085, 0.03),
    gripFront: new THREE.Vector3(0, -0.03, 0.22), sight: new THREE.Vector3(0, 0.11, -0.07), ejection: new THREE.Vector3(0.04, 0.025, -0.12),
  };
  g.userData.magazine = mag;
  return g;
}

/** VKM-90 belt-fed light machine gun (fictional): 100-round box, hinged feed cover, bipod. */
export function makeLMG(mats, detail = 'high') {
  const g = new THREE.Group(); g.name = 'VKM-90';
  const metal = mats.weapon('metal', '#2b2d2f'), dark = mats.weapon('metal', '#161718'), olive = furn(mats, 'cerakote', '#55583e'), poly = mats.weapon('polymer', '#272725');
  const brass = mats.weapon('metal', '#a8843c');
  // receiver
  profile(g, [[-0.13, -0.025], [0.04, -0.025], [0.05, -0.06], [0.12, -0.06], [0.13, -0.025], [0.24, -0.025], [0.24, 0.07], [-0.13, 0.07]], 0.072, metal);
  // hinged feed cover (the optic rail sits on it and lifts with it)
  const cover = new THREE.Group(); cover.name = 'cover';
  cover.position.set(0, 0.07, -0.07);
  rb(cover, 0.074, 0.018, 0.21, metal, 0, 0.009, 0.105, 0.004);
  rail(cover, 0.17, dark, 0.022, 0.02, detail === 'high');
  if (detail === 'high') rb(cover, 0.02, 0.012, 0.03, dark, 0.04, 0.006, 0.2, 0.002); // cover latch
  g.add(cover);
  g.userData.cover = cover;
  // feed tray + belt on the left side
  rb(g, 0.02, 0.03, 0.08, dark, -0.045, 0.045, 0.06, 0.002);
  // ammunition box (the "magazine") with the belt running up into the feed tray
  const mag = new THREE.Group(); mag.name = 'magazine';
  rb(mag, 0.1, 0.13, 0.11, olive, -0.02, -0.075, 0, 0.008);
  rb(mag, 0.104, 0.012, 0.114, dark, -0.02, -0.008, 0, 0.002);
  if (detail === 'high') {
    for (let i = 0; i < 7; i++) {
      const t = i / 6;
      const rnd = cyl(mag, 0.0055, 0.05, brass, -0.055 - Math.sin(t * Math.PI) * 0.012, 0.0 + t * 0.06, 0.02, 8);
      rnd.rotation.set(0, Math.PI / 2, 0); // cartridges lie across the belt
      cyl(mag, 0.003, 0.012, dark, -0.055 - Math.sin(t * Math.PI) * 0.012 + 0.03, 0.0 + t * 0.06, 0.02, 6).rotation.set(0, Math.PI / 2, 0);
    }
  }
  mag.position.set(-0.01, -0.03, 0.04); g.add(mag);
  // heavy barrel, shroud, carry handle, gas tube, flash hider
  cyl(g, 0.016, 0.44, dark, 0, 0.03, 0.46, 16);
  rb(g, 0.074, 0.064, 0.22, olive, 0, 0.022, 0.34, 0.012);
  if (detail === 'high') for (let i = 0; i < 5; i++) for (const sx of [-1, 1]) rb(g, 0.004, 0.02, 0.026, dark, sx * 0.037, 0.022, 0.26 + i * 0.04, 0.001);
  cyl(g, 0.008, 0.3, metal, 0, 0.0, 0.42, 8);
  cyl(g, 0.022, 0.06, dark, 0, 0.03, 0.7, 12);
  for (const z of [0.48, 0.58]) rb(g, 0.012, 0.035, 0.012, metal, 0, 0.065, z, 0.002);
  rb(g, 0.02, 0.014, 0.13, poly, 0, 0.085, 0.53, 0.005);
  // folded bipod under the shroud
  rb(g, 0.04, 0.02, 0.03, metal, 0, -0.012, 0.62, 0.003);
  for (const sx of [-1, 1]) { cyl(g, 0.006, 0.22, metal, sx * 0.016, -0.018, 0.5, 8); rb(g, 0.012, 0.014, 0.02, mats.rubber(), sx * 0.016, -0.018, 0.39, 0.003); }
  // pistol grip + trigger
  profile(g, [[-0.04, -0.025], [0.0, -0.025], [-0.012, -0.13], [-0.056, -0.13], [-0.062, -0.085]], 0.036, poly).position.z = -0.01;
  rb(g, 0.008, 0.006, 0.06, metal, 0, -0.055, 0.0, 0.002);
  rb(g, 0.004, 0.02, 0.006, dark, 0, -0.04, 0.01, 0.001);
  // skeleton stock
  cyl(g, 0.015, 0.14, metal, 0, 0.035, -0.2);
  rb(g, 0.04, 0.012, 0.2, metal, 0, 0.055, -0.25, 0.003);
  const lower = rb(g, 0.04, 0.012, 0.21, metal, 0, -0.02, -0.25, 0.003); lower.rotation.x = -0.25;
  rb(g, 0.052, 0.14, 0.024, mats.rubber(), 0, 0.012, -0.36, 0.005);
  rb(g, 0.044, 0.03, 0.11, olive, 0, 0.074, -0.27, 0.006);
  if (detail === 'high') addDetails(g, mats, { port: new THREE.Vector3(0.03, 0.03, 0.05), light: { x: -0.046, y: 0.02, z: 0.36 } });
  finish(g, detail);
  g.userData.anchors = {
    muzzle: new THREE.Vector3(0, 0.03, 0.73), gripRear: new THREE.Vector3(0, -0.085, -0.04),
    gripFront: new THREE.Vector3(0, -0.012, 0.34), sight: new THREE.Vector3(0, 0.137, 0.0), ejection: new THREE.Vector3(0.04, 0.0, 0.05),
  };
  g.userData.magazine = mag;
  return g;
}

/** SR-50 bolt-action precision rifle (fictional): manual bolt, big scope, muzzle brake. */
export function makeBoltRifle(mats, detail = 'high') {
  const g = new THREE.Group(); g.name = 'SR-50';
  const metal = mats.weapon('metal', '#26282a'), dark = mats.weapon('metal', '#141516'), stock = furn(mats, 'cerakote', '#4b4f3c'), poly = mats.weapon('polymer', '#262624');
  // chassis stock with thumbhole grip and adjustable cheek piece
  profile(g, [[-0.46, -0.075], [-0.46, 0.06], [-0.3, 0.06], [-0.14, 0.03], [0.32, 0.03], [0.34, -0.005], [0.34, -0.035], [0.05, -0.04], [0.02, -0.05], [-0.06, -0.05], [-0.12, -0.13], [-0.17, -0.13], [-0.16, -0.06], [-0.3, -0.05]], 0.058, stock);
  rb(g, 0.06, 0.15, 0.02, mats.rubber(), 0, -0.006, -0.47, 0.005);
  rb(g, 0.04, 0.024, 0.14, stock, 0, 0.078, -0.33, 0.006);
  cyl(g, 0.006, 0.05, metal, 0, 0.055, -0.27, 8).rotation.set(Math.PI / 2, 0, 0);
  // round receiver + scope rail
  cyl(g, 0.022, 0.26, metal, 0, 0.048, 0.0, 18);
  rail(g, 0.24, dark, 0.074, -0.12, detail === 'high');
  // manual bolt: body inside the receiver, handle on the right (animated)
  const bolt = new THREE.Group(); bolt.name = 'rbolt';
  bolt.position.set(0, 0.048, -0.06);
  cyl(bolt, 0.012, 0.12, mats.weapon('metal', '#8e8f8c'), 0, 0, 0.0, 12);
  const arm = rb(bolt, 0.045, 0.008, 0.008, mats.weapon('metal', '#8e8f8c'), 0.026, 0, -0.03, 0.002);
  arm.rotation.z = -0.25;
  const knob = new THREE.Mesh(new THREE.SphereGeometry(0.011, 12, 10), dark); knob.position.set(0.05, -0.008, -0.03); bolt.add(knob);
  g.add(bolt);
  g.userData.rbolt = bolt;
  // fluted heavy barrel + muzzle brake
  cyl(g, 0.014, 0.52, dark, 0, 0.045, 0.39, 16);
  if (detail === 'high') for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2; rb(g, 0.003, 0.003, 0.3, metal, Math.cos(a) * 0.0135, 0.045 + Math.sin(a) * 0.0135, 0.44, 0.001); }
  cyl(g, 0.022, 0.07, dark, 0, 0.045, 0.68, 12);
  if (detail === 'high') for (const z of [0.665, 0.69]) for (const sx of [-1, 1]) rb(g, 0.006, 0.016, 0.01, mats.weapon('metal', '#0c0c0c'), sx * 0.021, 0.045, z, 0.001);
  // detachable 5-round magazine
  const mag = new THREE.Group(); mag.name = 'magazine';
  rb(mag, 0.036, 0.075, 0.085, poly, 0, -0.035, 0.03, 0.004);
  mag.position.set(0, -0.035, 0.02); g.add(mag);
  rb(g, 0.006, 0.006, 0.05, metal, 0, -0.052, -0.06, 0.002);
  rb(g, 0.004, 0.018, 0.006, dark, 0, -0.04, -0.055, 0.001);
  // large scope with turrets and parallax knob
  const sm = mats.weapon('metal', '#1b1c1d');
  const SY = 0.13;
  cyl(g, 0.02, 0.26, sm, 0, SY, 0.0, 20);
  cyl(g, 0.03, 0.08, sm, 0, SY, 0.16, 20, false, 0.021);
  cyl(g, 0.025, 0.06, sm, 0, SY, -0.15, 20, false, 0.02);
  const turret = cyl(g, 0.014, 0.03, dark, 0, SY + 0.03, 0.02, 12); turret.rotation.set(0, 0, 0); turret.geometry.rotateX(Math.PI / 2);
  const wind = cyl(g, 0.013, 0.026, dark, 0.03, SY, 0.02, 12); wind.geometry.rotateY(Math.PI / 2);
  for (const z of [-0.07, 0.08]) rb(g, 0.034, 0.05, 0.02, dark, 0, 0.1, z, 0.003);
  if (detail === 'high') {
    const lens = new THREE.Mesh(new THREE.CircleGeometry(0.028, 22), new THREE.MeshStandardMaterial({ color: 0x1c2a3c, metalness: 1, roughness: 0.04 }));
    lens.position.set(0, SY, 0.201); g.add(lens);
  }
  // folded bipod
  for (const sx of [-1, 1]) cyl(g, 0.006, 0.2, metal, sx * 0.018, -0.048, 0.22, 8);
  rb(g, 0.045, 0.018, 0.03, metal, 0, -0.045, 0.32, 0.003);
  finish(g, detail);
  g.userData.anchors = {
    muzzle: new THREE.Vector3(0, 0.045, 0.72), gripRear: new THREE.Vector3(0, -0.08, -0.12),
    gripFront: new THREE.Vector3(0, -0.035, 0.22), sight: new THREE.Vector3(0, SY, -0.2), ejection: new THREE.Vector3(0.04, 0.05, -0.02),
    boltHandle: new THREE.Vector3(0.05, 0.04, -0.09),
  };
  g.userData.magazine = mag;
  return g;
}

/** R-44 double-action revolver (fictional): six-shot swing-out cylinder, speed loader reload. */
export function makeRevolver(mats, detail = 'high') {
  const g = new THREE.Group(); g.name = 'R-44';
  const steel = mats.weapon('metal', '#3a3c3f'), dark = mats.weapon('metal', '#151617'), bright = mats.weapon('metal', '#9a9b98');
  const grip = furn(mats, 'polymer', '#4a3426');
  // frame + top strap + barrel with full underlug and ventilated rib
  profile(g, [[-0.045, 0.0], [-0.04, 0.05], [0.06, 0.05], [0.07, 0.035], [0.07, 0.0], [0.01, -0.012], [-0.02, -0.012]], 0.026, steel);
  cyl(g, 0.0095, 0.16, steel, 0, 0.036, 0.15, 14);
  rb(g, 0.018, 0.024, 0.15, steel, 0, 0.018, 0.145, 0.004);
  rb(g, 0.008, 0.006, 0.16, dark, 0, 0.049, 0.15, 0.001);
  rb(g, 0.004, 0.012, 0.006, mats.weapon('metal', '#c03a22'), 0, 0.057, 0.222, 0.001); // red ramp front sight
  rb(g, 0.014, 0.006, 0.01, dark, 0, 0.053, -0.03, 0.001); // rear notch sight
  // crane + cylinder (swing out to the left)
  const crane = new THREE.Group(); crane.name = 'crane';
  crane.position.set(-0.012, 0.0, 0.03);
  const cylinder = new THREE.Group(); cylinder.name = 'cylinder';
  cylinder.position.set(0.012, 0.024, 0);
  cyl(cylinder, 0.022, 0.052, steel, 0, 0, 0, 18);
  if (detail === 'high') for (let i = 0; i < 6; i++) {
    const a = i / 6 * Math.PI * 2;
    rb(cylinder, 0.004, 0.004, 0.04, dark, Math.cos(a + 0.52) * 0.022, Math.sin(a + 0.52) * 0.022, 0, 0.001); // flutes
    const ch = new THREE.Mesh(new THREE.CircleGeometry(0.0052, 10), mats.weapon('metal', '#a8843c'));
    ch.position.set(Math.cos(a) * 0.013, Math.sin(a) * 0.013, -0.0265); ch.rotation.y = Math.PI; cylinder.add(ch);
  }
  crane.add(cylinder);
  rb(crane, 0.006, 0.018, 0.04, steel, 0.0, 0.004, 0.0, 0.002);
  g.add(crane);
  g.userData.crane = crane; g.userData.cylinder = cylinder;
  // hammer (cocks and falls with each double-action pull)
  const hammer = new THREE.Group(); hammer.name = 'hammer';
  hammer.position.set(0, 0.04, -0.04);
  rb(hammer, 0.008, 0.03, 0.01, dark, 0, 0.012, -0.004, 0.002);
  rb(hammer, 0.012, 0.006, 0.014, dark, 0, 0.026, -0.01, 0.002);
  g.add(hammer); g.userData.hammer = hammer;
  // trigger guard + trigger + grip
  rb(g, 0.006, 0.005, 0.05, steel, 0, -0.03, 0.0, 0.002);
  rb(g, 0.004, 0.02, 0.006, bright, 0, -0.018, 0.006, 0.001);
  profile(g, [[-0.045, 0.004], [-0.01, -0.004], [-0.02, -0.1], [-0.064, -0.1], [-0.07, -0.02]], 0.032, grip);
  finish(g, detail);
  g.userData.anchors = {
    muzzle: new THREE.Vector3(0, 0.036, 0.232), gripRear: new THREE.Vector3(0, -0.045, -0.04),
    gripFront: new THREE.Vector3(0, -0.06, -0.03), sight: new THREE.Vector3(0, 0.058, -0.03), ejection: new THREE.Vector3(-0.02, 0.024, 0.03),
  };
  g.userData.magazine = null;
  return g;
}

// ------------------------------------------------------------------ attachments

/** Rail geometry per weapon: top of the optic rail, optic position, iron sight positions. */
const MOUNT = {
  vk7: { railTop: 0.079, opticZ: 0.05, ironRear: -0.06, ironFront: 0.44 },
  mk9: { railTop: 0.069, opticZ: 0.04, ironRear: -0.03, ironFront: 0.16 },
  kr4: { railTop: 0.073, opticZ: -0.06, ironRear: -0.17, ironFront: 0.1 },
  vkm: { railTop: 0.097, opticZ: 0.03, ironRear: -0.03, ironFront: 0.56, frontBase: 0.046, parent: 'cover' },
  brk12: { railTop: 0.063, opticZ: 0.02, builtInIron: true, addRail: true },
};

let _reticles = null;
function reticleTextures() {
  if (_reticles) return _reticles;
  const mk = (draw) => {
    const c = document.createElement('canvas'); c.width = c.height = 128;
    const x = c.getContext('2d'); x.clearRect(0, 0, 128, 128); draw(x);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
  };
  _reticles = {
    holo: mk((x) => { x.strokeStyle = '#ff3a26'; x.fillStyle = '#ff3a26'; x.lineWidth = 5; x.beginPath(); x.arc(64, 64, 44, 0, 7); x.stroke(); x.beginPath(); x.arc(64, 64, 5, 0, 7); x.fill(); for (const [a, b] of [[64, 6], [64, 122], [6, 64], [122, 64]]) { x.beginPath(); x.arc(a, b, 0.1, 0, 7); } }),
    chevron: mk((x) => { x.strokeStyle = '#ff4a2a'; x.lineWidth = 6; x.beginPath(); x.moveTo(44, 78); x.lineTo(64, 56); x.lineTo(84, 78); x.stroke(); x.strokeStyle = '#111'; x.lineWidth = 2; x.beginPath(); x.moveTo(64, 82); x.lineTo(64, 124); x.moveTo(0, 64); x.lineTo(30, 64); x.moveTo(98, 64); x.lineTo(128, 64); x.stroke(); }),
  };
  return _reticles;
}
function reticlePlane(tex, size) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(size, size), new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, toneMapped: false }));
  m.rotation.y = Math.PI; // faces the shooter (model is built along +Z)
  m.renderOrder = 2;
  return m;
}

/** Holographic sight: open window with a ring-and-dot reticle. */
function holoSight(mats, detail, y, z) {
  const o = new THREE.Group();
  const dark = mats.weapon('metal', '#1c1e20');
  rb(o, 0.036, 0.016, 0.085, dark, 0, y - 0.03, z, 0.004);
  for (const sx of [-1, 1]) rb(o, 0.005, 0.04, 0.04, dark, sx * 0.019, y - 0.004, z + 0.02, 0.002);
  rb(o, 0.043, 0.007, 0.045, dark, 0, y + 0.019, z + 0.02, 0.002);
rb(o, 0.03, 0.01, 0.03, dark, 0, y - 0.027, z - 0.03, 0.003); // battery/controls (below the sight line)
  if (detail === 'high') for (const sx of [-1, 1]) rb(o, 0.006, 0.005, 0.008, mats.weapon('metal', '#3a3c3f'), sx * 0.024, y - 0.02, z - 0.035, 0.001);
  const glass = new THREE.Mesh(new THREE.PlaneGeometry(0.034, 0.034), new THREE.MeshStandardMaterial({ color: 0x8fb4a6, metalness: 0.6, roughness: 0.05, transparent: true, opacity: 0.18, depthWrite: false }));
  glass.position.set(0, y, z + 0.035); o.add(glass);
  const ret = reticlePlane(reticleTextures().holo, 0.012); ret.position.set(0, y, z + 0.034); o.add(ret);
  return o;
}

/** 3x prism sight: an open tube you look through, chevron reticle on the ocular. */
function prismSight(mats, detail, y, z) {
  const o = new THREE.Group();
  const dark = mats.weapon('metal', '#1d1f21');
  const tubeMat = dark.clone(); tubeMat.side = THREE.DoubleSide;
  rb(o, 0.03, 0.014, 0.06, dark, 0, y - 0.034, z, 0.003); // mount
  cyl(o, 0.024, 0.09, tubeMat, 0, y, z, 24, true); // housing tube (open: the shooter looks through it)
  cyl(o, 0.027, 0.03, tubeMat, 0, y, z + 0.055, 24, true, 0.024); // objective bell
  for (const dz of [-0.045, 0.07]) { const ring = new THREE.Mesh(new THREE.TorusGeometry(0.025, 0.003, 6, 24), dark); ring.position.set(0, y, z + dz); o.add(ring); }
  rb(o, 0.034, 0.012, 0.07, dark, 0, y + 0.026, z, 0.004); // prism housing on top
  rb(o, 0.012, 0.01, 0.03, mats.weapon('metal', '#3a3c3f'), 0, y + 0.036, z - 0.005, 0.002); // backup dot
  rb(o, 0.012, 0.016, 0.016, dark, 0.03, y, z + 0.01, 0.002); // illumination knob
  if (detail === 'high') {
    const glass = new THREE.Mesh(new THREE.CircleGeometry(0.024, 24), new THREE.MeshStandardMaterial({ color: 0x9ab8c8, metalness: 0.7, roughness: 0.03, transparent: true, opacity: 0.12, depthWrite: false }));
    glass.position.set(0, y, z + 0.069); o.add(glass);
  }
  const ret = reticlePlane(reticleTextures().chevron, 0.04); ret.position.set(0, y, z - 0.044); o.add(ret);
  return o;
}

/** Fit optic, muzzle device, extended magazine and iron sights; moves the sight/muzzle anchors. */
function fitAttachments(g, id, a, mats, detail) {
  const M = MOUNT[id], anc = g.userData.anchors;
  const dark = mats.weapon('metal', '#18191a');
  if (M && a.optic) {
    const parent = M.parent ? g.userData[M.parent] : g;
    const off = M.parent ? parent.position : new THREE.Vector3();
    const holder = new THREE.Group(); holder.position.copy(off).negate(); parent.add(holder);
    if (M.addRail && a.optic !== 'iron') { rail(holder, 0.11, dark, M.railTop - 0.004, M.opticZ - 0.055, detail === 'high'); }
    const y = M.railTop + 0.04;
    if (a.optic === 'reddot') { holder.add(redDot(mats, detail, y, M.opticZ)); anc.sight.set(0, y, M.opticZ - 0.02); }
    else if (a.optic === 'holo') { holder.add(holoSight(mats, detail, M.railTop + 0.036, M.opticZ)); anc.sight.set(0, M.railTop + 0.036, M.opticZ - 0.02); }
    else if (a.optic === 'x3') { holder.add(prismSight(mats, detail, M.railTop + 0.046, M.opticZ)); anc.sight.set(0, M.railTop + 0.046, M.opticZ - 0.045); anc.eyeRelief = 0.11; }
    // iron sights: raised when used, folded flat behind an optic
    if (!M.builtInIron) {
      const up = a.optic === 'iron';
      const ry = M.railTop, line = ry + 0.02;
      rb(holder, 0.028, up ? 0.016 : 0.008, 0.02, dark, 0, ry + (up ? 0.008 : 0.004), M.ironRear, 0.002);
      if (up) { const ap = new THREE.Mesh(new THREE.TorusGeometry(0.006, 0.0026, 6, 14), dark); ap.position.set(0, line, M.ironRear); holder.add(ap); }
      const fb = M.frontBase ?? ry;
      const towerH = Math.max(0.008, (up ? line - 0.006 : ry + 0.008) - fb);
      rb(holder, 0.022, towerH, 0.016, dark, 0, fb + towerH / 2, M.ironFront, 0.002);
      if (up) { rb(holder, 0.003, 0.008, 0.003, dark, 0, line - 0.003, M.ironFront, 0.0008); for (const sx of [-1, 1]) rb(holder, 0.003, 0.012, 0.012, dark, sx * 0.009, line - 0.004, M.ironFront, 0.001); }
      if (up) anc.sight.set(0, line, M.ironRear - 0.01);
    }
  }
  // muzzle devices
  if (a.muzzle === 'comp' || a.muzzle === 'supp') {
    const m = anc.muzzle, pistol = id === 'p11' || id === 'r44';
    if (a.muzzle === 'comp') {
      cyl(g, 0.018, 0.065, dark, m.x, m.y, m.z + 0.02, 14);
      if (detail === 'high') for (let i = 0; i < 3; i++) rb(g, 0.022, 0.006, 0.008, mats.weapon('metal', '#0b0b0b'), m.x, m.y + 0.016, m.z + 0.0 + i * 0.016, 0.001);
      m.z += 0.05;
    } else {
      const r = pistol ? 0.016 : 0.021, len = pistol ? 0.15 : 0.18;
      cyl(g, r, len, mats.weapon('metal', '#1a1b1c'), m.x, m.y, m.z + len / 2 - 0.02, 18);
      for (const dz of [0.0, len - 0.03]) cyl(g, r + 0.001, 0.008, mats.weapon('metal', '#2e3032'), m.x, m.y, m.z + dz, 18);
      m.z += len - 0.02;
    }
  }
  // extended magazine
  const mag = g.userData.magazine;
  if (a.mag === 'ext' && mag) {
    if (id === 'p11') rb(mag, 0.024, 0.04, 0.046, mats.weapon('polymer', '#232323'), 0, -0.14, -0.03, 0.004);
    else mag.scale.y = 1.42;
  }
  g.userData.attach = { ...a };
}
