import * as THREE from 'three';

/**
 * Procedural prop geometries (cars, barriers, lamps...). Each builder returns
 * an array of { geometry, material } parts in local space so they can be
 * instanced or merged by the caller.
 */
function extrudeProfile(points, width, bevel = 0.03) {
  const shape = new THREE.Shape();
  shape.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i++) shape.lineTo(points[i][0], points[i][1]);
  shape.closePath();
  const g = new THREE.ExtrudeGeometry(shape, { depth: width - bevel * 2, bevelEnabled: bevel > 0, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 2, curveSegments: 4 });
  // Shape is in (x=z-axis length, y=height); extruded along +Z: rotate so length goes along Z and width along X.
  g.translate(0, 0, -(width - bevel * 2) / 2);
  g.rotateY(-Math.PI / 2); // profile x (length) -> world +Z (front), extrusion -> width along X
  return g;
}

const CAR_PROFILES = {
  car: {
    length: 4.4, width: 1.78,
    body: [[-2.2, 0.32], [2.2, 0.32], [2.22, 0.62], [2.1, 0.9], [1.0, 0.98], [-1.7, 1.0], [-2.15, 0.92], [-2.24, 0.6]],
    cabin: [[0.95, 0.97], [0.25, 1.42], [-1.0, 1.44], [-1.6, 1.0]],
    wheelZ: [1.35, -1.35], wheelR: 0.33,
  },
  van: {
    length: 4.9, width: 1.95,
    body: [[-2.45, 0.35], [2.45, 0.35], [2.47, 0.7], [2.3, 1.05], [1.9, 1.15], [-2.45, 1.15]],
    cabin: [[1.9, 1.14], [1.3, 2.0], [-2.45, 2.02], [-2.45, 1.14]],
    wheelZ: [1.6, -1.65], wheelR: 0.36, tallCabinPaint: true,
  },
};

export function buildCarParts(kind, mats, { burned = false } = {}) {
  const p = CAR_PROFILES[kind];
  const parts = [];
  const bodyMat = burned ? mats.burned() : mats.carPaint();
  const body = extrudeProfile(p.body, p.width, 0.05);
  parts.push({ geometry: body, material: bodyMat, paint: !burned });
  if (p.tallCabinPaint) {
    const cab = extrudeProfile(p.cabin, p.width, 0.05);
    parts.push({ geometry: cab, material: bodyMat, paint: !burned });
    // windows as thin boxes on the sides/front
    if (!burned) {
      const ws = new THREE.BoxGeometry(p.width + 0.02, 0.55, 0.9); ws.translate(0, 1.6, 1.55);
      parts.push({ geometry: ws, material: mats.glass() });
      const wf = new THREE.BoxGeometry(p.width - 0.2, 0.6, 0.05); wf.rotateX(-0.6); wf.translate(0, 1.58, 1.62);
      parts.push({ geometry: wf, material: mats.glass() });
    }
  } else {
    const cab = extrudeProfile(p.cabin, p.width - 0.14, 0.04);
    parts.push({ geometry: cab, material: burned ? mats.burned() : mats.glass() });
    // roof skin & pillars in paint
    const roof = new THREE.BoxGeometry(p.width - 0.2, 0.05, 1.2); roof.translate(0, 1.44, -0.38);
    parts.push({ geometry: roof, material: bodyMat, paint: !burned });
    for (const sx of [-1, 1]) {
      const pil = new THREE.BoxGeometry(0.06, 0.48, 0.08); pil.translate(sx * (p.width / 2 - 0.1), 1.2, -0.38);
      parts.push({ geometry: pil, material: bodyMat, paint: !burned });
    }
  }
  // bumpers & trim
  const bf = new THREE.BoxGeometry(p.width + 0.02, 0.22, 0.18); bf.translate(0, 0.45, p.length / 2 + 0.02);
  const br = bf.clone(); br.translate(0, 0, -p.length - 0.04);
  parts.push({ geometry: bf, material: mats.polymer(0x1d1d1e) }, { geometry: br, material: mats.polymer(0x1d1d1e) });
  if (!burned) {
    for (const sx of [-1, 1]) {
      const hl = new THREE.BoxGeometry(0.34, 0.1, 0.04); hl.translate(sx * (p.width / 2 - 0.28), 0.74, p.length / 2 + 0.01);
      parts.push({ geometry: hl, material: mats.emissive(0xdedbd0, 0.25) });
      const tl = new THREE.BoxGeometry(0.3, 0.1, 0.04); tl.translate(sx * (p.width / 2 - 0.25), 0.8, -p.length / 2 - 0.01);
      parts.push({ geometry: tl, material: mats.emissive(0x7a0a08, 0.3) });
    }
  }
  // wheels
  const wr = burned ? p.wheelR * 0.8 : p.wheelR;
  for (const z of p.wheelZ) for (const sx of [-1, 1]) {
    const w = new THREE.CylinderGeometry(wr, wr, 0.22, 16); w.rotateZ(Math.PI / 2);
    w.translate(sx * (p.width / 2 - 0.1), wr, z);
    parts.push({ geometry: w, material: burned ? mats.burned() : mats.rubber() });
    if (!burned) {
      const hub = new THREE.CylinderGeometry(wr * 0.55, wr * 0.55, 0.23, 12); hub.rotateZ(Math.PI / 2);
      hub.translate(sx * (p.width / 2 - 0.1), wr, z);
      parts.push({ geometry: hub, material: mats.metalPole() });
    }
  }
  // underbody shadow block
  const under = new THREE.BoxGeometry(p.width - 0.1, 0.12, p.length - 0.6); under.translate(0, 0.3, 0);
  parts.push({ geometry: under, material: mats.polymer(0x111111) });
  return { parts, length: p.length, width: p.width, height: kind === 'van' ? 2.05 : 1.45 };
}

export function jerseyBarrierGeometry(length = 3) {
  const pts = [[-0.32, 0], [0.32, 0], [0.3, 0.08], [0.12, 0.28], [0.09, 0.82], [-0.09, 0.82], [-0.12, 0.28], [-0.3, 0.08]];
  const shape = new THREE.Shape();
  shape.moveTo(pts[0][0], pts[0][1]);
  for (const p of pts.slice(1)) shape.lineTo(p[0], p[1]);
  const g = new THREE.ExtrudeGeometry(shape, { depth: length, bevelEnabled: false });
  g.translate(0, 0, -length / 2);
  g.rotateY(Math.PI / 2); // length along X
  // planar UVs for concrete
  const pos = g.attributes.position, uv = g.attributes.uv;
  for (let i = 0; i < pos.count; i++) uv.setXY(i, (pos.getX(i) + pos.getZ(i)) * 0.5, pos.getY(i) * 0.5);
  return g;
}

/** A stacked sandbag wall along local X. Returns merged geometry. */
export function sandbagWallGeometry(len, rows = 3, rnd = Math.random) {
  const geoms = [];
  const bagL = 0.62, bagH = 0.19, bagD = 0.36;
  for (let r = 0; r < rows; r++) {
    const n = Math.floor(len / bagL);
    const off = (r % 2) * bagL / 2;
    for (let i = 0; i < n - (r % 2); i++) {
      for (const dz of [-0.19, 0.19]) {
        const g = new THREE.SphereGeometry(0.5, 10, 6);
        g.scale(bagL * 1.05, bagH * 1.3, bagD * 1.1);
        g.rotateY((rnd() - 0.5) * 0.15);
        g.translate(-len / 2 + off + bagL / 2 + i * bagL + (rnd() - 0.5) * 0.04, bagH / 2 + r * bagH * 0.92, dz * (r === rows - 1 ? 0.5 : 1));
        geoms.push(g);
      }
    }
  }
  return geoms;
}

export function streetLampGeometry() {
  const g = [];
  const pole = new THREE.CylinderGeometry(0.07, 0.11, 7, 8); pole.translate(0, 3.5, 0); g.push(pole);
  const arm = new THREE.CylinderGeometry(0.04, 0.05, 1.8, 6); arm.rotateZ(Math.PI / 2 - 0.15); arm.translate(0.85, 7.05, 0); g.push(arm);
  const head = new THREE.BoxGeometry(0.55, 0.12, 0.25); head.translate(1.7, 7.15, 0); g.push(head);
  const base = new THREE.CylinderGeometry(0.16, 0.2, 0.5, 8); base.translate(0, 0.25, 0); g.push(base);
  return g;
}

export function utilityPoleGeometry() {
  const g = [];
  const pole = new THREE.CylinderGeometry(0.12, 0.16, 9, 7); pole.translate(0, 4.5, 0); g.push(pole);
  const bar = new THREE.BoxGeometry(1.8, 0.1, 0.1); bar.translate(0, 8.4, 0); g.push(bar);
  for (const x of [-0.8, 0, 0.8]) { const ins = new THREE.CylinderGeometry(0.04, 0.05, 0.16, 6); ins.translate(x, 8.53, 0); g.push(ins); }
  return g;
}

/** Bare winter tree made of tapered cylinders (recursive). */
export function treeGeometry(rnd) {
  const geoms = [];
  const branch = (base, dir, len, rad, depth) => {
    const end = base.clone().addScaledVector(dir, len);
    const g = new THREE.CylinderGeometry(rad * 0.65, rad, len, 5, 1, false);
    g.translate(0, len / 2, 0);
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
    g.applyQuaternion(q);
    g.translate(base.x, base.y, base.z);
    geoms.push(g);
    if (depth <= 0 || rad < 0.02) return;
    const n = depth > 2 ? 2 : 3;
    for (let i = 0; i < n; i++) {
      const nd = dir.clone().add(new THREE.Vector3((rnd() - 0.5) * 1.4, rnd() * 0.5, (rnd() - 0.5) * 1.4)).normalize();
      branch(end, nd, len * (0.6 + rnd() * 0.2), rad * 0.62, depth - 1);
    }
  };
  branch(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0), 2.4, 0.2, 4);
  return geoms;
}

export function dumpsterGeometry() {
  const g = [];
  const body = new THREE.BoxGeometry(1.9, 1.15, 1.1); body.translate(0, 0.72, 0); g.push(body);
  const lid = new THREE.BoxGeometry(1.95, 0.06, 1.15); lid.rotateX(-0.08); lid.translate(0, 1.33, 0.02); g.push(lid);
  for (const x of [-0.8, 0.8]) for (const z of [-0.45, 0.45]) {
    const w = new THREE.CylinderGeometry(0.08, 0.08, 0.06, 8); w.rotateX(Math.PI / 2); w.translate(x, 0.08, z); g.push(w);
  }
  return g;
}

export function crateGeometry() {
  const g = [];
  const a = new THREE.BoxGeometry(1.2, 0.55, 0.7); a.translate(0, 0.275, 0); g.push(a);
  const b = new THREE.BoxGeometry(0.9, 0.45, 0.6); b.rotateY(0.2); b.translate(0.1, 0.78, 0); g.push(b);
  return g;
}
