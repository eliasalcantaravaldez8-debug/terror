import * as THREE from 'three';

/**
 * Procedural, ORIGINAL fictional firearm models (no real-world brand replicas).
 * Built along +Z (muzzle forward). Returns a Group with named anchor points.
 */
function box(w, h, d, mat, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z);
  return m;
}
function cyl(r, len, mat, x = 0, y = 0, z = 0, seg = 12, open = false) {
  const g = new THREE.CylinderGeometry(r, r, len, seg, 1, open);
  g.rotateX(Math.PI / 2);
  const m = new THREE.Mesh(g, mat);
  m.position.set(x, y, z);
  return m;
}

/** VK-7 assault rifle (fictional). detail: 'high' for viewmodel, 'low' for AI. */
export function makeRifle(mats, detail = 'high') {
  const g = new THREE.Group();
  g.name = 'VK-7';
  const metal = mats.gunMetal(), poly = mats.polymer(0x2d2b27), tan = mats.polymer(0x6e634c), dark = mats.darkMetal();
  // receiver
  g.add(box(0.06, 0.075, 0.32, metal, 0, 0, 0.02));
  g.add(box(0.058, 0.03, 0.42, metal, 0, 0.05, 0.07)); // top rail base
  // handguard (tan polymer, vented)
  g.add(box(0.068, 0.07, 0.28, tan, 0, 0.005, 0.31));
  if (detail === 'high') {
    for (let i = 0; i < 5; i++) g.add(box(0.07, 0.012, 0.03, dark, 0, -0.012, 0.21 + i * 0.05));
  }
  // barrel + muzzle brake
  g.add(cyl(0.012, 0.22, dark, 0, 0.01, 0.55));
  const brake = cyl(0.019, 0.07, dark, 0, 0.01, 0.68);
  g.add(brake);
  // magazine (curved look: two angled boxes)
  const mag = new THREE.Group();
  const m1 = box(0.035, 0.12, 0.075, poly, 0, -0.08, 0.0); mag.add(m1);
  const m2 = box(0.035, 0.1, 0.07, poly, 0, -0.17, 0.025); m2.rotation.x = -0.25; mag.add(m2);
  mag.position.set(0, -0.01, 0.07);
  mag.name = 'magazine';
  g.add(mag);
  // pistol grip
  const grip = box(0.035, 0.11, 0.05, poly, 0, -0.08, -0.07); grip.rotation.x = 0.3; g.add(grip);
  // trigger guard
  g.add(box(0.012, 0.01, 0.07, metal, 0, -0.045, -0.02));
  // stock (collapsible)
  g.add(cyl(0.013, 0.16, metal, 0, 0.01, -0.2));
  const stock = box(0.045, 0.1, 0.13, tan, 0, -0.005, -0.3); g.add(stock);
  g.add(box(0.047, 0.11, 0.02, mats.rubber(), 0, -0.005, -0.37));
  // optic: compact red-dot (fictional)
  const optic = new THREE.Group();
  optic.add(box(0.04, 0.04, 0.09, dark, 0, 0.085, 0.06));
  const hoodMat = dark.clone(); hoodMat.side = THREE.DoubleSide;
  const hood = cyl(0.024, 0.08, hoodMat, 0, 0.115, 0.06, 20, true); optic.add(hood);
  // front/rear rings so the open tube reads as an optic
  for (const rz of [0.02, 0.1]) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.024, 0.004, 6, 20), dark);
    ring.position.set(0, 0.115, rz); optic.add(ring);
  }
  if (detail === 'high') {
    const lensMat = new THREE.MeshStandardMaterial({ color: 0x1a2a22, metalness: 0.9, roughness: 0.05, transparent: true, opacity: 0.35 });
    const lens = new THREE.Mesh(new THREE.CircleGeometry(0.02, 16), lensMat);
    lens.position.set(0, 0.115, 0.1); optic.add(lens);
    const dot = new THREE.Mesh(new THREE.CircleGeometry(0.0018, 8), new THREE.MeshBasicMaterial({ color: 0xff2a1a }));
    dot.position.set(0, 0.115, 0.098); dot.rotation.y = Math.PI; dot.name = 'reddot';
    optic.add(dot);
  }
  g.add(optic);
  // foregrip
  g.add(box(0.03, 0.08, 0.035, poly, 0, -0.065, 0.34));
  if (detail === 'high') {
    // charging handle & ejection port
    g.add(box(0.02, 0.015, 0.03, metal, 0.035, 0.04, -0.06));
    g.add(box(0.005, 0.025, 0.06, dark, 0.031, 0.01, 0.06));
    // sling swivel
    g.add(box(0.008, 0.02, 0.02, metal, -0.035, 0, -0.12));
  }
  g.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = detail === 'high'; } });

  const anchors = {
    muzzle: new THREE.Vector3(0, 0.01, 0.72),
    gripRear: new THREE.Vector3(0, -0.08, -0.07),
    gripFront: new THREE.Vector3(0, -0.06, 0.32),
    sight: new THREE.Vector3(0, 0.115, 0.03),
    ejection: new THREE.Vector3(0.04, 0.01, 0.06),
  };
  g.userData.anchors = anchors;
  g.userData.magazine = mag;
  return g;
}

/** P-11 sidearm (fictional). */
export function makePistol(mats) {
  const g = new THREE.Group();
  g.name = 'P-11';
  const metal = mats.gunMetal(), poly = mats.polymer(0x232323);
  const slide = box(0.03, 0.032, 0.19, metal, 0, 0.03, 0.04); slide.name = 'slide'; g.add(slide);
  g.add(box(0.028, 0.025, 0.16, poly, 0, 0.005, 0.03));
  const grip = box(0.028, 0.11, 0.045, poly, 0, -0.05, -0.02); grip.rotation.x = 0.22; g.add(grip);
  const mag = box(0.022, 0.09, 0.035, metal, 0, -0.06, -0.025); mag.rotation.x = 0.22; mag.name = 'magazine'; g.add(mag);
  g.add(box(0.008, 0.008, 0.01, metal, 0, 0.05, 0.12));
  g.add(box(0.02, 0.008, 0.01, metal, 0, 0.05, -0.04));
  g.add(cyl(0.006, 0.02, mats.darkMetal(), 0, 0.03, 0.14));
  g.traverse((o) => { if (o.isMesh) { o.castShadow = true; } });
  g.userData.anchors = {
    muzzle: new THREE.Vector3(0, 0.03, 0.15),
    gripRear: new THREE.Vector3(0, -0.04, -0.02),
    gripFront: new THREE.Vector3(0, -0.06, 0.0),
    sight: new THREE.Vector3(0, 0.056, 0.0),
    ejection: new THREE.Vector3(0.02, 0.04, 0.04),
  };
  g.userData.magazine = mag;
  g.userData.slide = slide;
  return g;
}

/** Long precision rifle for the enemy sniper (AI only). */
export function makeSniperRifle(mats) {
  const g = makeRifle(mats, 'low');
  const barrel = cyl(0.012, 0.45, mats.darkMetal(), 0, 0.01, 0.85);
  g.add(barrel);
  const scope = cyl(0.025, 0.3, mats.darkMetal(), 0, 0.12, 0.06, 12);
  g.add(scope);
  g.userData.anchors.muzzle.set(0, 0.01, 1.08);
  return g;
}

export function makeGrenade(mats) {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.035, 12, 10), mats.paint('#3b4430', 71));
  body.scale.set(1, 1.2, 1); g.add(body);
  const top = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.014, 0.03, 8), mats.darkMetal());
  top.position.y = 0.045; g.add(top);
  const lever = new THREE.Mesh(new THREE.BoxGeometry(0.008, 0.06, 0.012), mats.metalPole());
  lever.position.set(0.02, 0.02, 0); g.add(lever);
  g.traverse((o) => { if (o.isMesh) o.castShadow = true; });
  return g;
}
