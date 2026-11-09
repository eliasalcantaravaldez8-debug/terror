import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

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

/** VK-7 assault rifle (fictional). */
export function makeRifle(mats, detail = 'high') {
  const g = new THREE.Group(); g.name = 'VK-7';
  const metal = mats.weapon('metal', '#2a2c2e'), poly = mats.weapon('polymer', '#2a2926'), tan = mats.weapon('cerakote', '#7a6c52'), dark = mats.weapon('metal', '#18191a');
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
  g.add(redDot(mats, detail, 0.115, 0.05));
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
  profile(g, [[-0.08, -0.03], [0.2, -0.03], [0.22, 0.0], [0.22, 0.06], [-0.08, 0.06]], 0.05, poly);
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
  g.add(redDot(mats, detail, 0.1, 0.04));
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
  const metal = mats.weapon('metal', '#222426'), poly = mats.weapon('polymer', '#2e2b26'), olive = mats.weapon('cerakote', '#4c5038'), dark = mats.weapon('metal', '#151617');
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
  const metal = mats.weapon('metal', '#2a2c2e'), tan = mats.weapon('cerakote', '#8a7a5c'), poly = mats.weapon('polymer', '#2a2926'), dark = mats.weapon('metal', '#18191a');
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
  finish(g, detail);
  g.userData.anchors = {
    muzzle: new THREE.Vector3(0, 0.035, 1.01), gripRear: new THREE.Vector3(0, -0.07, -0.06),
    gripFront: new THREE.Vector3(0, -0.01, 0.4), sight: new THREE.Vector3(0, 0.115, -0.08), ejection: new THREE.Vector3(0.04, 0.05, 0.07),
  };
  g.userData.magazine = mag;
  return g;
}

/** P-11 sidearm (fictional). */
export function makePistol(mats, detail = 'high') {
  const g = new THREE.Group(); g.name = 'P-11';
  const metal = mats.weapon('metal', '#2b2d2f'), poly = mats.weapon('polymer', '#232323'), dark = mats.weapon('metal', '#18191a');
  const slide = new THREE.Group(); slide.name = 'slide';
  rb(slide, 0.029, 0.03, 0.19, metal, 0, 0, 0, 0.004);
  if (detail === 'high') for (let i = 0; i < 6; i++) for (const sx of [-1, 1]) rb(slide, 0.002, 0.022, 0.004, dark, sx * 0.015, 0, -0.07 + i * 0.008, 0.0005);
  rb(slide, 0.006, 0.008, 0.008, dark, 0, 0.019, 0.085, 0.001);
  rb(slide, 0.02, 0.008, 0.008, dark, 0, 0.019, -0.085, 0.001);
  slide.position.set(0, 0.03, 0.04); g.add(slide);
  rb(g, 0.027, 0.024, 0.16, poly, 0, 0.004, 0.03, 0.004);
  const grip = profile(g, [[-0.04, 0.0], [0.01, 0.0], [-0.005, -0.11], [-0.05, -0.11], [-0.06, -0.02]], 0.028, poly);
  grip.position.z = 0.0;
  const mag = new THREE.Group(); mag.name = 'magazine';
  rb(mag, 0.022, 0.012, 0.04, dark, 0, -0.115, -0.03, 0.002);
  g.add(mag);
  rb(g, 0.006, 0.006, 0.045, poly, 0, -0.018, 0.02, 0.002);
  cyl(g, 0.006, 0.02, dark, 0, 0.03, 0.14);
  finish(g, detail);
  g.userData.anchors = {
    muzzle: new THREE.Vector3(0, 0.03, 0.15), gripRear: new THREE.Vector3(0, -0.04, -0.025),
    gripFront: new THREE.Vector3(0, -0.06, -0.01), sight: new THREE.Vector3(0, 0.054, 0.0), ejection: new THREE.Vector3(0.02, 0.04, 0.04),
  };
  g.userData.magazine = mag;
  g.userData.slide = slide;
  return g;
}

/** Long precision rifle for the enemy sniper (AI only). */
export function makeSniperRifle(mats) { return makeDMR(mats, 'low'); }

export function makeWeaponModel(id, mats, detail = 'high') {
  switch (id) {
    case 'mk9': return makeSMG(mats, detail);
    case 'brk12': return makeShotgun(mats, detail);
    case 'lr6': return makeDMR(mats, detail);
    case 'p11': return makePistol(mats, detail);
    default: return makeRifle(mats, detail);
  }
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
