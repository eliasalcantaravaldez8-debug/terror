import * as THREE from 'three';
import { GeometryBatcher } from './GeometryBatcher.js';
import { TextureFactory } from '../render/TextureFactory.js';
import { mulberry32, randRange } from '../utils/math.js';
import {
  BUILDINGS, STYLES, SHOPS, HALDEN, PROPS, BOUNDS, MISSION_RECT, ROAD,
  STATION, EAST_BUILDINGS, STATION_PROPS,
} from './districtLayout.js';
import {
  buildCarParts, jerseyBarrierGeometry, sandbagWallGeometry, streetLampGeometry,
  utilityPoleGeometry, treeGeometry, dumpsterGeometry, crateGeometry,
} from './PropModels.js';

const GF = 4.5; // ground floor height
const FH = 3.0; // upper floor height

/**
 * Builds the Teresk district: mission buildings with colliders, streets,
 * cover props, street furniture and a procedural background city.
 */
export class CityBuilder {
  constructor(scene, world, mats) {
    this.scene = scene;
    this.world = world;
    this.mats = mats;
    this.rnd = mulberry32(1337);
    this.root = new THREE.Group();
    this.root.name = 'city';
    scene.add(this.root);
    this.near = new GeometryBatcher();
    this.far = new GeometryBatcher();
    this.coverBoxes = [];
    this.interactables = [];
    this.namedProps = {};
    this.instanceLists = new Map(); // key -> {parts, transforms: [{m, color}]}
    this.balconySpots = [];
  }

  build() {
    this.buildGround();
    for (const b of BUILDINGS) this.buildBuilding(b, this.near, true);
    this.buildHalden();
    this.buildProps(PROPS);
    this.buildStation();
    this.buildStreetFurniture();
    this.buildBoundaries();
    this.buildBackgroundCity();
    this.near.build(this.root, { castShadow: true, receiveShadow: true });
    this.far.build(this.root, { castShadow: false, receiveShadow: true });
    this.flushInstances();
    return this;
  }

  // ------------------------------------------------------------------ ground
  buildGround() {
    const m = this.mats;
    // Huge asphalt ground
    const G = 7000;
    const ground = new THREE.PlaneGeometry(G, G);
    ground.rotateX(-Math.PI / 2);
    const uv = ground.attributes.uv;
    for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * G / 7, uv.getY(i) * G / 7);
    const gm = new THREE.Mesh(ground, m.asphalt());
    gm.receiveShadow = true;
    gm.matrixAutoUpdate = false;
    this.root.add(gm);

    // Plaza paving (slightly raised decal-ish plane)
    const B = this.near;
    const plazaMat = m.plaza();
    B.quad(plazaMat, [-30, 0.012, 54], [30, 0.012, 54], [30, 0.012, 6], [-30, 0.012, 6], [0, 1, 0],
      [-30 / 6, 54 / 6], [30 / 6, 54 / 6], [30 / 6, 6 / 6], [-30 / 6, 6 / 6]);

    // Sidewalks along the avenue & cross street (raised 15 cm, collidable but steppable)
    const sw = m.pavers();
    const curb = m.concrete('#8c8a84', 35);
    const addWalk = (x0, z0, x1, z1) => {
      B.box(x0, 0, z0, x1, 0.15, z1, { sides: curb, top: sw, tile: { w: 1, h: 1 }, topTile: 2 });
      this.world.addBox(x0, 0, z0, x1, 0.15, z1, { tag: 'curb', surface: 'concrete' });
    };
    const H = ROAD.halfWidth, S = ROAD.sidewalk;
    // west sidewalk segments (gaps for cross street)
    addWalk(-H - S, -55, -H, 5);
    addWalk(-H - S, -168, -H, -68);
    addWalk(H, -55, H + S, 5);
    addWalk(H, -168, H + S, -68);
    // cross street sidewalks
    addWalk(-70, -55, -H - S, -52);
    addWalk(H + S, -55, 70, -52);
    addWalk(-70, -71, -H - S, -68);
    addWalk(H + S, -71, 70, -68);

    // Road markings
    const lm = m.lineMarking();
    for (let z = 2; z > -166; z -= 6) {
      if (z < -54 && z > -70) continue;
      B.quad(lm, [-0.08, 0.02, z], [0.08, 0.02, z], [0.08, 0.02, z - 3], [-0.08, 0.02, z - 3], [0, 1, 0], [0, 0], [0, 1], [3, 1], [3, 0]);
    }
    for (const x of [-H + 0.4, H - 0.4]) {
      for (const [za, zb] of [[4, -54], [-70, -166]]) {
        B.quad(lm, [x - 0.07, 0.02, za], [x + 0.07, 0.02, za], [x + 0.07, 0.02, zb], [x - 0.07, 0.02, zb], [0, 1, 0], [0, 0], [0, 1], [(za - zb) / 4, 1], [(za - zb) / 4, 0]);
      }
    }
    // zebra crossings at the cross street
    for (const zc of [-53.5, -69.5]) {
      for (let x = -H + 0.6; x < H - 0.5; x += 1.0) {
        B.quad(lm, [x, 0.02, zc + 1.4], [x + 0.5, 0.02, zc + 1.4], [x + 0.5, 0.02, zc - 1.4], [x, 0.02, zc - 1.4], [0, 1, 0], [0, 0], [0, 1], [1, 1], [1, 0]);
      }
    }
  }

  // ------------------------------------------------------------------ buildings
  buildBuilding(b, B, collide) {
    const m = this.mats;
    const style = STYLES[b.style] || STYLES.beige;
    const facade = m.facade(style);
    const shop = m.shop(SHOPS[(b.shop || 0) % SHOPS.length]);
    const roof = m.roof();
    const trim = m.concrete(style.band, 37);
    const height = GF + (b.floors - 1) * FH;
    const u0 = Math.floor(this.rnd() * 4) * 0.25;
    // ground floor (shops)
    B.box(b.x0, 0, b.z0, b.x1, GF, b.z1, { sides: shop, tile: { w: 12, h: GF, u0 } });
    // upper floors
    if (b.floors > 1) B.box(b.x0, GF, b.z0, b.x1, height, b.z1, { sides: facade, top: roof, tile: { w: 12, h: 6, u0, yBase: GF }, topTile: 6 });
    else B.box(b.x0, GF - 0.01, b.z0, b.x1, GF, b.z1, { top: roof });
    // cornice over shops and parapet on the roof
    B.box(b.x0 - 0.25, GF - 0.1, b.z0 - 0.25, b.x1 + 0.25, GF + 0.25, b.z1 + 0.25, { sides: trim, top: trim, bottom: trim, tile: { w: 4, h: 4 } });
    const p = 0.3, ph = 0.75;
    B.box(b.x0 - 0.15, height, b.z0 - 0.15, b.x1 + 0.15, height + ph, b.z0 + p, { sides: trim, top: trim, tile: { w: 4, h: 4 } });
    B.box(b.x0 - 0.15, height, b.z1 - p, b.x1 + 0.15, height + ph, b.z1 + 0.15, { sides: trim, top: trim, tile: { w: 4, h: 4 } });
    B.box(b.x0 - 0.15, height, b.z0 + p, b.x0 + p, height + ph, b.z1 - p, { sides: trim, top: trim, tile: { w: 4, h: 4 } });
    B.box(b.x1 - p, height, b.z0 + p, b.x1 + 0.15, height + ph, b.z1 - p, { sides: trim, top: trim, tile: { w: 4, h: 4 } });

    if (collide) {
      this.world.addBox(b.x0, 0, b.z0, b.x1, height, b.z1, { tag: 'building', surface: 'concrete' });
      // parapet colliders (so rooftop enemies have cover)
      this.world.addBox(b.x0 - 0.15, height, b.z0 - 0.15, b.x1 + 0.15, height + ph, b.z0 + p, { tag: 'parapet' });
      this.world.addBox(b.x0 - 0.15, height, b.z1 - p, b.x1 + 0.15, height + ph, b.z1 + 0.15, { tag: 'parapet' });
      this.world.addBox(b.x0 - 0.15, height, b.z0 + p, b.x0 + p, height + ph, b.z1 - p, { tag: 'parapet' });
      this.world.addBox(b.x1 - p, height, b.z0 + p, b.x1 + 0.15, height + ph, b.z1 - p, { tag: 'parapet' });
    }

    // window sills (real geometry for depth) on faces that look at the street
    if (b.floors > 1 && collide) this.addSills(b, height, trim);
    if (b.balconies) this.addBalconies(b, trim);
    this.addRoofProps(b, height, B);
  }

  addSills(b, height, mat) {
    const faces = [];
    const cx = (b.x0 + b.x1) / 2;
    // only faces looking toward the avenue / plaza
    if (cx < 0) faces.push('px'); else faces.push('nx');
    if (b.z1 > 0 && b.z0 > 0) faces.push('nz');
    const list = this._inst('sill', () => {
      const g = new THREE.BoxGeometry(1.55, 0.08, 0.16);
      return [{ geometry: g, material: mat }];
    });
    const ac = this._inst('acunit', () => {
      const g = new THREE.BoxGeometry(0.8, 0.55, 0.32); g.translate(0, 0, 0.16);
      return [{ geometry: g, material: this.mats.paint('#cfcfc8', 59) }];
    });
    const m4 = new THREE.Matrix4();
    for (const face of faces) {
      const len = face === 'px' || face === 'nx' ? b.z1 - b.z0 : b.x1 - b.x0;
      const bays = Math.floor(len / 3);
      for (let f = 1; f < (height - GF) / FH + 1 - 0.01; f++) {
        const y = GF + (f - 1) * FH + 1.0;
        for (let k = 0; k < bays; k++) {
          const along = 1.5 + 3 * k;
          let x, z, rot;
          if (face === 'px') { x = b.x1 + 0.07; z = b.z1 - along; rot = Math.PI / 2; }
          else if (face === 'nx') { x = b.x0 - 0.07; z = b.z0 + along; rot = -Math.PI / 2; }
          else { x = b.x1 - along; z = b.z0 - 0.07; rot = Math.PI; }
          m4.makeRotationY(rot).setPosition(x, y, z);
          list.transforms.push({ m: m4.clone() });
          if (this.rnd() < 0.08) {
            const mm = new THREE.Matrix4().makeRotationY(rot).setPosition(x + (face === 'px' ? 0.0 : 0), y - 0.6, z);
            ac.transforms.push({ m: mm });
          }
        }
      }
    }
  }

  addBalconies(b, mat) {
    const cx = (b.x0 + b.x1) / 2;
    const face = cx < 0 ? 'px' : 'nx';
    const len = b.z1 - b.z0;
    const list = this._inst('balcony', () => {
      const slab = new THREE.BoxGeometry(1.2, 0.15, 2.6); slab.translate(0.6, 0, 0);
      const rail = [];
      const front = new THREE.BoxGeometry(0.05, 0.95, 2.6); front.translate(1.18, 0.55, 0); rail.push(front);
      for (const z of [-1.28, 1.28]) { const s = new THREE.BoxGeometry(1.2, 0.95, 0.05); s.translate(0.6, 0.55, z); rail.push(s); }
      return [{ geometry: slab, material: mat }, ...rail.map((g) => ({ geometry: g, material: this.mats.darkMetal() }))];
    });
    const floors = b.floors;
    for (let f = 2; f < floors; f++) {
      for (let k = 0; k < Math.floor(len / 6); k++) {
        if (this.rnd() < 0.45) continue;
        const z = b.z0 + 3 + k * 6 + 1.5;
        const y = GF + (f - 1) * FH;
        const x = face === 'px' ? b.x1 : b.x0;
        const m4 = new THREE.Matrix4().makeRotationY(face === 'px' ? 0 : Math.PI).setPosition(x, y, z);
        list.transforms.push({ m: m4 });
        const x0 = face === 'px' ? x : x - 1.2, x1 = face === 'px' ? x + 1.2 : x;
        this.world.addBox(x0, y - 0.08, z - 1.3, x1, y + 0.08, z + 1.3, { tag: 'balcony' });
        const rx = face === 'px' ? x + 1.15 : x - 1.15;
        this.world.addBox(rx - 0.04, y, z - 1.3, rx + 0.04, y + 1.05, z + 1.3, { tag: 'balcony' });
        this.balconySpots.push({ x: face === 'px' ? x + 0.6 : x - 0.6, y: y + 0.08, z, building: b.id, face });
      }
    }
  }

  addRoofProps(b, height, B) {
    const m = this.mats;
    const n = Math.floor(((b.x1 - b.x0) * (b.z1 - b.z0)) / 160);
    for (let i = 0; i < n; i++) {
      const x = randRange(this.rnd, b.x0 + 2, b.x1 - 2), z = randRange(this.rnd, b.z0 + 2, b.z1 - 2);
      const r = this.rnd();
      if (r < 0.35) {
        B.box(x - 0.6, height, z - 0.5, x + 0.6, height + 0.9, z + 0.5, { sides: m.paint('#b5b5ad', 61), top: m.paint('#b5b5ad', 61), tile: { w: 1, h: 1 } });
      } else if (r < 0.55) {
        const g = new THREE.CylinderGeometry(1.0, 1.0, 1.8, 14); g.translate(x, height + 1.9, z);
        B.addGeometry(m.paint('#7d7f78', 63), g);
        for (const [dx, dz] of [[-0.7, -0.7], [0.7, -0.7], [-0.7, 0.7], [0.7, 0.7]]) {
          const l = new THREE.CylinderGeometry(0.05, 0.05, 1.0, 5); l.translate(x + dx, height + 0.5, z + dz);
          B.addGeometry(m.darkMetal(), l);
        }
      } else if (r < 0.7) {
        const g = new THREE.CylinderGeometry(0.03, 0.05, 6, 5); g.translate(x, height + 3, z);
        B.addGeometry(m.darkMetal(), g);
      } else {
        B.box(x - 1.4, height, z - 1.4, x + 1.4, height + 2.6, z + 1.4, { sides: m.concrete('#8f8c85', 39), top: m.roof(), tile: { w: 4, h: 4 } });
      }
    }
  }

  buildHalden() {
    const m = this.mats, B = this.near, h = HALDEN, W = this.world;
    const stone = m.concrete('#b4ad9c', 41);
    const facade = m.facade({ wall: '#b2ab9a', frame: '#3a3a38', band: '#a19a88', seed: 17, damage: 0.4 });
    const H = 6 + 3 * 3;
    const FL = 0.4; // interior floor level
    const DX = 1.8, DH = 4.4; // door half-width / top
    // ---- exterior shell (podium with a real doorway) + upper floors
    B.box(h.x0, 0, h.z0, h.x1, 6, h.z1, { sides: stone, tile: { w: 6, h: 6 }, skipFaces: 'pz' });
    const front = (xa, xb, ya, yb) => B.quad(stone, [xa, ya, h.z1], [xb, ya, h.z1], [xb, yb, h.z1], [xa, yb, h.z1], [0, 0, 1],
      [xa / 6, ya / 6], [xb / 6, ya / 6], [xb / 6, yb / 6], [xa / 6, yb / 6]);
    front(h.x0, -DX, 0, 6); front(DX, h.x1, 0, 6); front(-DX, DX, DH, 6);
    B.box(h.x0, 6, h.z0, h.x1, H, h.z1, { sides: facade, top: m.roof(), tile: { w: 12, h: 6, yBase: 6 }, topTile: 6 });
    B.box(h.x0 - 0.4, H, h.z0 - 0.4, h.x1 + 0.4, H + 0.15, h.z1 + 0.4, { sides: stone, top: stone, tile: { w: 4, h: 4 } });
    B.box(h.x0 - 0.4, H + 0.15, h.z1 - 0.4, h.x1 + 0.4, H + 0.8, h.z1 + 0.4, { sides: stone, top: stone, tile: { w: 4, h: 4 } });
    W.addBox(h.x0 - 0.4, H, h.z1 - 0.4, h.x1 + 0.4, H + 0.8, h.z1 + 0.4, { tag: 'parapet' });

    // ---- collision shell with interior spaces: lobby, corridor, server room
    const wz = h.z1 - 0.5; // inner face of the front wall
    const ix0 = h.x0 + 0.5, ix1 = h.x1 - 0.5, iz0 = h.z0 + 0.5;
    const LB = -186, CB = -196; // lobby back wall, corridor end
    const bld = { tag: 'building' };
    W.addBox(-23.5, 0, iz0, 23.5, FL, h.z1, { tag: 'floor' });
    W.addBox(h.x0, 0, wz, -DX, H, h.z1, bld); W.addBox(DX, 0, wz, h.x1, H, h.z1, bld); W.addBox(-DX, DH, wz, DX, H, h.z1, bld);
    W.addBox(h.x0, 0, h.z0, h.x1, H, iz0, bld);
    W.addBox(h.x0, 0, h.z0, ix0, H, h.z1, bld); W.addBox(ix1, 0, h.z0, h.x1, H, h.z1, bld);
    W.addBox(ix0, 6, LB, ix1, H, wz, bld); // lobby ceiling / upper floors
    W.addBox(ix0, 0, CB, -2, H, LB, bld); W.addBox(2, 0, CB, ix1, H, LB, bld); // solid block around the corridor
    W.addBox(-2, 3.4, CB, 2, H, LB, bld); // corridor ceiling
    W.addBox(ix0, 4.5, iz0, ix1, H, CB, bld); // server room ceiling
    const doorBox = W.addBox(-DX, 0, wz, DX, DH, h.z1, { tag: 'door', surface: 'wood' });

    // ---- interior surfaces (inward facing)
    const plaster = m.concrete('#a8a196', 53), ceil = m.concrete('#6e6a63', 55);
    const marble = new THREE.MeshStandardMaterial({ ...TextureFactory.pavers(29, '#6f6a62', 48), roughness: 0.4, envMapIntensity: 0.5 });
    const tiles = new THREE.MeshStandardMaterial({ ...TextureFactory.pavers(31, '#4a4c4e', 32), roughness: 0.6 });
    const wall = (mat, ax, az, bx, bz, y0, y1) => {
      const dx = bx - ax, dz = bz - az, len = Math.hypot(dx, dz);
      B.quad(mat, [ax, y0, az], [bx, y0, bz], [bx, y1, bz], [ax, y1, az], [-dz / len, 0, dx / len], [0, y0 / 3], [len / 3, y0 / 3], [len / 3, y1 / 3], [0, y1 / 3]);
    };
    const flat = (mat, x0, z0, x1, z1, y, up, t = 3) => {
      if (up) B.quad(mat, [x0, y, z1], [x1, y, z1], [x1, y, z0], [x0, y, z0], [0, 1, 0], [x0 / t, z1 / t], [x1 / t, z1 / t], [x1 / t, z0 / t], [x0 / t, z0 / t]);
      else B.quad(mat, [x0, y, z0], [x1, y, z0], [x1, y, z1], [x0, y, z1], [0, -1, 0], [x0 / t, z0 / t], [x1 / t, z0 / t], [x1 / t, z1 / t], [x0 / t, z1 / t]);
    };
    // lobby
    wall(plaster, ix1, wz, DX, wz, FL, 6); wall(plaster, -DX, wz, ix0, wz, FL, 6); wall(plaster, DX, wz, -DX, wz, DH, 6);
    wall(plaster, ix0, LB, -2, LB, FL, 6); wall(plaster, 2, LB, ix1, LB, FL, 6); wall(plaster, -2, LB, 2, LB, 3.4, 6);
    wall(plaster, ix0, wz, ix0, LB, FL, 6); wall(plaster, ix1, LB, ix1, wz, FL, 6);
    flat(marble, ix0, LB, ix1, wz, FL, true, 4); flat(ceil, ix0, LB, ix1, wz, 6, false);
    // door reveal
    wall(stone, -DX, h.z1, -DX, wz, 0, DH); wall(stone, DX, wz, DX, h.z1, 0, DH);
    // corridor
    wall(plaster, -2, LB, -2, CB, FL, 3.4); wall(plaster, 2, CB, 2, LB, FL, 3.4);
    flat(tiles, -2, CB, 2, LB, FL, true); flat(ceil, -2, CB, 2, LB, 3.4, false);
    // server room
    const grey = m.concrete('#7c7f80', 57);
    wall(grey, ix1, CB, 2, CB, FL, 4.5); wall(grey, -2, CB, ix0, CB, FL, 4.5); wall(grey, 2, CB, -2, CB, 3.4, 4.5);
    wall(grey, ix0, iz0, ix1, iz0, FL, 4.5); wall(grey, ix0, CB, ix0, iz0, FL, 4.5); wall(grey, ix1, iz0, ix1, CB, FL, 4.5);
    flat(tiles, ix0, iz0, ix1, CB, FL, true); flat(ceil, ix0, iz0, ix1, CB, 4.5, false);

    // ---- lobby furniture / cover
    const cover = (x0, y0, z0, x1, y1, z1, mat, tag = 'furniture') => {
      B.box(x0, y0, z0, x1, y1, z1, { sides: mat, top: mat, tile: { w: 2, h: 2 } });
      const b = W.addBox(x0, y0, z0, x1, y1, z1, { tag, cover: true, surface: 'wood' });
      this.coverBoxes.push(b);
    };
    const wood = m.wood(), leather = m.polymer(0x3b2a20);
    cover(-3, FL, -178.6, 3, FL + 1.1, -177.4, wood, 'desk'); // reception desk
    B.box(-3.1, FL + 1.1, -178.7, 3.1, FL + 1.16, -177.3, { sides: m.darkMetal(), top: m.darkMetal(), tile: { w: 2, h: 2 } });
    for (const [x, z] of [[-7, -174], [7, -174], [-7, -182], [7, -182], [-15, -174], [15, -174], [-15, -182], [15, -182]]) {
      const g = new THREE.CylinderGeometry(0.5, 0.5, 6 - FL, 16); g.translate(x, FL + (6 - FL) / 2, z);
      B.addGeometry(m.concrete('#c4bdac', 43), g);
      W.addBlock(x, FL, z, 1.0, 6 - FL, 1.0, { tag: 'column', cover: true });
    }
    cover(-13.1, FL, -176.5, -10.9, FL + 0.85, -175.6, leather, 'sofa');
    cover(10.9, FL, -176.6, 13.1, FL + 0.85, -175.7, leather, 'sofa');
    cover(-19, FL, -180.6, -17.8, FL + 1.0, -178, m.paint('#5a5f5c', 75), 'cabinet');
    cover(18, FL, -171.5, 19.2, FL + 1.0, -169.5, m.paint('#5a5f5c', 75), 'cabinet');
    cover(4.5, FL, -183.6, 7.5, FL + 0.95, -182.9, m.sandbag(), 'sandbags');
    cover(-7.5, FL, -183.6, -4.5, FL + 0.95, -182.9, m.sandbag(), 'sandbags');
    // collapsed ceiling slab (visual + low cover)
    const slab = new THREE.BoxGeometry(4, 0.3, 2.5); slab.rotateZ(0.25); slab.rotateY(0.4); slab.translate(-11, FL + 0.6, -171.5);
    B.addGeometry(ceil, slab);
    const sb = W.addBox(-13, FL, -172.8, -9, FL + 1.0, -170.2, { tag: 'slab', cover: true }); this.coverBoxes.push(sb);

    // ---- server room racks with blinking LED panels
    const led = this.makeRackTexture();
    const rackMat = new THREE.MeshStandardMaterial({ map: led, emissiveMap: led, emissive: 0xffffff, emissiveIntensity: 0.9, roughness: 0.5, metalness: 0.4 });
    this.rackMat = rackMat;
    for (const z of [-199.5, -202.6]) {
      for (const [xa, xb] of [[-20, -4], [4, 20]]) {
        B.box(xa, FL, z - 0.5, xb, FL + 2.1, z + 0.5, { sides: rackMat, top: m.darkMetal(), tile: { w: 2, h: 2.1, yBase: FL } });
        const b = W.addBox(xa, FL, z - 0.5, xb, FL + 2.1, z + 0.5, { tag: 'rack', cover: true, surface: 'metal' });
        this.coverBoxes.push(b);
      }
    }
    // central terminal desk
    cover(-1.2, FL, -198.4, 1.2, FL + 0.95, -197.6, m.darkMetal(), 'terminal');
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 0.45), m.emissive(0x2f78c0, 0.55));
    screen.position.set(0, FL + 1.3, -198.3); this.root.add(screen);
    this.terminalScreen = screen;

    // ---- interior lighting (constant light count)
    const l1 = new THREE.PointLight(0xffe2b8, 9, 26, 1.6); l1.position.set(0, 5.4, -176); this.root.add(l1);
    const l2 = new THREE.PointLight(0x7fb4ff, 7, 22, 1.6); l2.position.set(0, 4.0, -200); this.root.add(l2);
    this.interiorLights = [l1, l2];
    for (const [x, z] of [[-8, -172], [8, -172], [-8, -180], [8, -180], [0, -191], [-10, -200], [10, -200]]) {
      const panel = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.3), m.emissive(z < -186 ? 0xa8c8ff : 0xfff0d8, z === -180 ? 0.15 : 1.6));
      panel.rotation.x = Math.PI / 2; panel.position.set(x, (z < -196 ? 4.5 : z < -186 ? 3.4 : 6) - 0.02, z);
      this.root.add(panel);
    }

    // ---- portico: low steps up to the floor level, columns, pediment
    for (let s = 0; s < 4; s++) {
      const z1 = h.z1 + 4 - s * 1.0;
      B.box(-10, s * 0.1, h.z1, 10, (s + 1) * 0.1, z1, { sides: stone, top: stone, tile: { w: 3, h: 3 }, topTile: 3 });
      W.addBox(-10, 0, h.z1, 10, (s + 1) * 0.1, z1, { tag: 'steps' });
    }
    const colMat = m.concrete('#c4bdac', 43);
    for (let i = 0; i < 6; i++) {
      const x = -8.5 + i * 3.4;
      const g = new THREE.CylinderGeometry(0.45, 0.5, 7.8, 16); g.translate(x, FL + 3.9, h.z1 + 2.6);
      B.addGeometry(colMat, g);
      W.addBlock(x, FL, h.z1 + 2.6, 0.95, 7.8, 0.95, { tag: 'column', cover: true });
    }
    B.box(-10, 8.2, h.z1, 10, 9.4, h.z1 + 3.4, { sides: stone, top: stone, bottom: stone, tile: { w: 4, h: 4 } });
    // door frame (posts + lintel) and two swinging leaves
    for (const x of [-DX - 0.1, DX + 0.1]) { const p = new THREE.BoxGeometry(0.2, DH, 0.25); p.translate(x, DH / 2, h.z1 + 0.05); B.addGeometry(m.darkMetal(), p); }
    const lin = new THREE.BoxGeometry(DX * 2 + 0.4, 0.25, 0.25); lin.translate(0, DH + 0.1, h.z1 + 0.05); B.addGeometry(m.darkMetal(), lin);
    const leaves = [];
    for (const side of [-1, 1]) {
      const pivot = new THREE.Group();
      pivot.position.set(side * DX, FL, h.z1 - 0.05);
      const leaf = new THREE.Mesh(new THREE.BoxGeometry(DX, DH - FL - 0.05, 0.12), m.wood());
      leaf.position.set(-side * DX / 2, (DH - FL) / 2, 0);
      leaf.castShadow = leaf.receiveShadow = true;
      const handle = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.4, 0.08), m.metalPole());
      handle.position.set(-side * (DX - 0.2), 1.1, 0.1); leaf.add(handle);
      pivot.add(leaf);
      this.root.add(pivot);
      leaves.push({ pivot, side });
    }
    this.namedProps.halden = {
      leaves, doorBox, open: false,
      setOpen: (amount) => { for (const l of leaves) l.pivot.rotation.y = -l.side * amount * 1.55; },
    };
    // VÉRTICE banners hanging between the columns
    const bannerTex = this.makeBannerTexture();
    const banner = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 6), new THREE.MeshStandardMaterial({ map: bannerTex, side: THREE.DoubleSide, roughness: 0.9 }));
    banner.position.set(-5.1, 5.0, h.z1 + 3.05);
    banner.castShadow = true;
    this.root.add(banner);
    const banner2 = banner.clone(); banner2.position.x = 5.1; this.root.add(banner2);
    this.interactables.push({ id: 'haldenDoor', x: 0, y: 1.6, z: h.z1 + 0.3, radius: 2.6, prompt: 'Arrombar a porta do Edifício Halden' });
    this.interactables.push({ id: 'serverTerminal', x: 0, y: FL + 1.2, z: -197.6, radius: 2.0, prompt: 'Iniciar o download dos servidores' });
    this.indoorRects = [{ x0: h.x0, x1: h.x1, z0: h.z0, z1: h.z1 }];
  }

  makeRackTexture() {
    const c = document.createElement('canvas'); c.width = 128; c.height = 128;
    const x = c.getContext('2d');
    x.fillStyle = '#16181a'; x.fillRect(0, 0, 128, 128);
    for (let u = 0; u < 12; u++) {
      x.fillStyle = u % 2 ? '#202326' : '#1b1d20'; x.fillRect(4, 4 + u * 10, 120, 8);
      for (let k = 0; k < 6; k++) {
        if (Math.random() < 0.55) { x.fillStyle = ['#2bff6a', '#3fa0ff', '#ffb02b', '#2bff6a'][k % 4]; x.fillRect(80 + k * 6, 6 + u * 10, 3, 3); }
      }
      x.fillStyle = '#0c0d0e'; x.fillRect(8, 6 + u * 10, 60, 3);
    }
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping;
    return t;
  }

  makeBannerTexture() {
    const c = document.createElement('canvas'); c.width = 128; c.height = 296;
    const x = c.getContext('2d');
    x.fillStyle = '#141414'; x.fillRect(0, 0, 128, 296);
    x.fillStyle = '#8f1212'; x.fillRect(0, 0, 128, 18); x.fillRect(0, 278, 128, 18);
    // Fictional VÉRTICE emblem: inverted chevron over a bar
    x.fillStyle = '#b01818';
    x.beginPath(); x.moveTo(20, 80); x.lineTo(64, 170); x.lineTo(108, 80); x.lineTo(90, 80); x.lineTo(64, 135); x.lineTo(38, 80); x.closePath(); x.fill();
    x.fillRect(30, 190, 68, 10);
    x.fillStyle = '#d8d0c0'; x.font = 'bold 18px Arial'; x.textAlign = 'center'; x.fillText('VÉRTICE', 64, 240);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }

  // ------------------------------------------------------------------ props
  _inst(key, partsFn) {
    let l = this.instanceLists.get(key);
    if (!l) { l = { parts: partsFn(), transforms: [] }; this.instanceLists.set(key, l); }
    return l;
  }

  flushInstances() {
    for (const [key, l] of this.instanceLists) {
      if (!l.transforms.length) continue;
      for (const part of l.parts) {
        const im = new THREE.InstancedMesh(part.geometry, part.material, l.transforms.length);
        l.transforms.forEach((t, i) => {
          im.setMatrixAt(i, t.m);
          if (part.paint) im.setColorAt(i, new THREE.Color(t.color ?? 0xffffff));
        });
        im.instanceMatrix.needsUpdate = true;
        if (im.instanceColor) im.instanceColor.needsUpdate = true;
        im.castShadow = true; im.receiveShadow = true;
        im.computeBoundingSphere();
        im.name = key;
        this.root.add(im);
      }
    }
  }

  /** Collider for a rotated rectangle footprint (AABB of the rotated rect). */
  footprintCollider(x, z, w, l, h, rot, opts) {
    const c = Math.abs(Math.cos(rot)), s = Math.abs(Math.sin(rot));
    const hx = (w * c + l * s) / 2, hz = (w * s + l * c) / 2;
    // shrink slightly when rotated so the AABB does not feel like an invisible wall
    const shrink = Math.min(c, s) * 0.35;
    const box = this.world.addBox(x - hx + shrink, 0, z - hz + shrink, x + hx - shrink, h, z + hz - shrink, opts);
    if (opts && opts.cover) this.coverBoxes.push(box);
    return box;
  }

  buildProps(list) {
    const m = this.mats;
    const rnd = this.rnd;
    const carCache = {};
    const carParts = (kind, burned) => {
      const k = kind + burned;
      if (!carCache[k]) carCache[k] = buildCarParts(kind, m, { burned });
      return carCache[k];
    };
    for (const p of list) {
      const rot = p.rot || 0;
      const mat4 = new THREE.Matrix4().makeRotationY(rot).setPosition(p.x, 0, p.z);
      switch (p.type) {
        case 'car': case 'van': case 'burnedCar': {
          const kind = p.type === 'van' ? 'van' : 'car';
          const burned = p.type === 'burnedCar';
          const info = carParts(kind, burned);
          if (p.id === 'rpgTarget') {
            // standalone so it can be swapped to a burned wreck when destroyed
            const intact = new THREE.Group();
            for (const part of info.parts) {
              const mesh = new THREE.Mesh(part.geometry, part.paint ? part.material.clone() : part.material);
              if (part.paint) mesh.material.color.setHex(p.color);
              mesh.castShadow = mesh.receiveShadow = true;
              intact.add(mesh);
            }
            intact.position.set(p.x, 0, p.z); intact.rotation.y = rot;
            this.root.add(intact);
            const wreck = new THREE.Group();
            for (const part of carParts(kind, true).parts) {
              const mesh = new THREE.Mesh(part.geometry, part.material);
              mesh.castShadow = mesh.receiveShadow = true;
              wreck.add(mesh);
            }
            wreck.position.copy(intact.position); wreck.rotation.y = rot + 0.25; wreck.visible = false;
            this.root.add(wreck);
            this.namedProps[p.id] = { intact, wreck, x: p.x, z: p.z };
          } else {
            const l = this._inst(kind + (burned ? '_b' : ''), () => info.parts);
            l.transforms.push({ m: mat4, color: p.color ?? 0x888888 });
          }
          this.footprintCollider(p.x, p.z, info.width, info.length, info.height - 0.15, rot, { tag: 'car', cover: true, surface: 'metal' });
          break;
        }
        case 'barrier': {
          const l = this._inst('barrier', () => [{ geometry: jerseyBarrierGeometry(3), material: m.barrier() }]);
          l.transforms.push({ m: mat4 });
          this.footprintCollider(p.x, p.z, 3, 0.64, 0.82, rot + Math.PI / 2, { tag: 'barrier', cover: true });
          break;
        }
        case 'sandbags': {
          const geoms = sandbagWallGeometry(p.len, 5, rnd);
          for (const g of geoms) { g.applyMatrix4(mat4); this.near.addGeometry(m.sandbag(), g); }
          this.footprintCollider(p.x, p.z, p.len, 0.75, 0.95, rot, { tag: 'sandbags', cover: true, surface: 'dirt' });
          break;
        }
        case 'dumpster': {
          const l = this._inst('dumpster', () => dumpsterGeometry().map((g) => ({ geometry: g, material: m.paint('#2f4a36', 65) })));
          l.transforms.push({ m: mat4 });
          this.footprintCollider(p.x, p.z, 1.9, 1.1, 1.35, rot, { tag: 'dumpster', cover: true, surface: 'metal' });
          break;
        }
        case 'planter': {
          this.near.box(p.x - 1.1, 0, p.z - 1.1, p.x + 1.1, 0.85, p.z + 1.1, { sides: m.barrier(), top: m.concrete('#3d3426', 45), tile: { w: 2, h: 2 } });
          const col = this.world.addBox(p.x - 1.1, 0, p.z - 1.1, p.x + 1.1, 0.85, p.z + 1.1, { tag: 'planter', cover: true });
          this.coverBoxes.push(col);
          const tree = treeGeometry(rnd);
          for (const g of tree) { g.translate(p.x, 0.85, p.z); this.near.addGeometry(m.concrete('#3b3128', 47), g); }
          break;
        }
        case 'bus': {
          this.buildBus(p.x, p.z, rot);
          break;
        }
        case 'kiosk': {
          this.near.box(p.x - 1.5, 0, p.z - 1.2, p.x + 1.5, 2.6, p.z + 1.2, { sides: m.paint('#56634f', 67), top: m.paint('#56634f', 67), tile: { w: 2, h: 2 } });
          this.near.box(p.x - 1.8, 2.6, p.z - 1.5, p.x + 1.8, 2.75, p.z + 1.5, { sides: m.darkMetal(), top: m.darkMetal(), bottom: m.darkMetal(), tile: { w: 2, h: 2 } });
          this.world.addBox(p.x - 1.5, 0, p.z - 1.2, p.x + 1.5, 2.6, p.z + 1.2, { tag: 'kiosk', surface: 'metal' });
          break;
        }
        case 'crates': {
          const l = this._inst('crate', () => crateGeometry().map((g) => ({ geometry: g, material: this.mats.paint('#4a5139', 69) })));
          l.transforms.push({ m: mat4 });
          const box = this.world.addBox(p.x - 0.6, 0, p.z - 0.35, p.x + 0.6, 1.0, p.z + 0.35, { tag: 'crate', cover: true });
          this.coverBoxes.push(box);
          if (p.ammo) this.interactables.push({ id: 'ammo' + this.interactables.length, kind: 'ammo', x: p.x, y: 0.8, z: p.z, radius: 1.8, prompt: 'Reabastecer munição' });
          break;
        }
      }
    }
  }

  /** Teresk TV station compound + east extension of the cross street. */
  buildStation() {
    const m = this.mats, B = this.near, W = this.world, S = STATION;
    for (const b of EAST_BUILDINGS) if (!b.skip) this.buildBuilding(b, B, true);
    // sidewalks along the extension
    const sw = m.pavers(), curb = m.concrete('#8c8a84', 35);
    for (const [x0, z0, x1, z1] of [[70, -71, 95, -68], [70, -55, 95, -52]]) {
      B.box(x0, 0, z0, x1, 0.15, z1, { sides: curb, top: sw, tile: { w: 1, h: 1 }, topTile: 2 });
      W.addBox(x0, 0, z0, x1, 0.15, z1, { tag: 'curb' });
    }
    // perimeter wall with a gate on the west side
    const wallMat = m.concrete('#8d8a82', 59), w = S.wall;
    const wall = (x0, z0, x1, z1) => {
      B.box(x0, 0, z0, x1, w.h, z1, { sides: wallMat, top: wallMat, tile: { w: 3, h: 3 } });
      W.addBox(x0, 0, z0, x1, w.h, z1, { tag: 'building' });
    };
    wall(w.x0, w.z0, w.x0 + 0.5, w.gateZ0); wall(w.x0, w.gateZ1, w.x0 + 0.5, w.z1);
    wall(w.x0, w.z0, w.x1, w.z0 + 0.5); wall(w.x0, w.z1 - 0.5, w.x1, w.z1); wall(w.x1 - 0.5, w.z0, w.x1, w.z1);
    // gate posts + sign
    for (const z of [w.gateZ0 - 0.4, w.gateZ1 + 0.4]) {
      B.box(w.x0 - 0.2, 0, z - 0.4, w.x0 + 0.7, 4.6, z + 0.4, { sides: m.paint('#6a6f6a', 77), top: m.paint('#6a6f6a', 77), tile: { w: 2, h: 2 } });
      W.addBox(w.x0 - 0.2, 0, z - 0.4, w.x0 + 0.7, 4.6, z + 0.4, { tag: 'building' });
    }
    const signC = document.createElement('canvas'); signC.width = 512; signC.height = 96;
    const sx = signC.getContext('2d'); sx.fillStyle = '#1d2a3a'; sx.fillRect(0, 0, 512, 96);
    sx.fillStyle = '#e8e2d0'; sx.font = 'bold 54px Arial'; sx.textAlign = 'center'; sx.fillText('TV TERESK · KANAL 3', 256, 66);
    const signT = new THREE.CanvasTexture(signC); signT.colorSpace = THREE.SRGBColorSpace;
    const sign = new THREE.Mesh(new THREE.PlaneGeometry(9.5, 1.6), new THREE.MeshStandardMaterial({ map: signT, roughness: 0.6 }));
    sign.position.set(w.x0 - 0.25, 5.2, (w.gateZ0 + w.gateZ1) / 2); sign.rotation.y = -Math.PI / 2; this.root.add(sign);
    B.box(w.x0 - 0.2, 4.3, w.gateZ0 - 0.4, w.x0 + 0.1, 6.1, w.gateZ1 + 0.4, { sides: m.darkMetal(), top: m.darkMetal(), tile: { w: 2, h: 2 } });
    // compound yard (concrete slab)
    const yard = m.concrete('#7b7a76', 61);
    B.quad(yard, [w.x0 + 0.5, 0.013, w.z1 - 0.5], [w.x1 - 0.5, 0.013, w.z1 - 0.5], [w.x1 - 0.5, 0.013, w.z0 + 0.5], [w.x0 + 0.5, 0.013, w.z0 + 0.5], [0, 1, 0],
      [w.x0 / 4, w.z1 / 4], [w.x1 / 4, w.z1 / 4], [w.x1 / 4, w.z0 / 4], [w.x0 / 4, w.z0 / 4]);
    // main station building with satellite dishes
    this.buildBuilding({ ...S.main, style: 'soviet', shop: 1 }, B, true);
    const mainH = 4.5 + (S.main.floors - 1) * 3;
    for (const [dx, dz, r] of [[118, -86, 2.2], [126, -80, 1.6], [128, -88, 1.2]]) {
      const dish = new THREE.Mesh(new THREE.SphereGeometry(r, 20, 10, 0, Math.PI * 2, 0, Math.PI * 0.35), m.paint('#d8d6cf', 79));
      dish.material.side = THREE.DoubleSide;
      dish.position.set(dx, mainH + r * 0.9, dz); dish.rotation.set(-Math.PI / 2 + 0.6, 0, 0.9);
      dish.castShadow = true; this.root.add(dish);
      const leg = new THREE.CylinderGeometry(0.1, 0.12, r * 0.9, 8); leg.translate(dx, mainH + r * 0.45, dz); B.addGeometry(m.darkMetal(), leg);
    }
    // transmitter shed + control panel
    const sh = S.shed;
    B.box(sh.x0, 0, sh.z0, sh.x1, sh.h, sh.z1, { sides: m.paint('#8c8f86', 81), top: m.roof(), tile: { w: 3, h: 3 } });
    W.addBox(sh.x0, 0, sh.z0, sh.x1, sh.h, sh.z1, { tag: 'building', surface: 'metal' });
    B.box(sh.x0 - 0.25, 0.6, S.panel.z - 0.7, sh.x0, 2.0, S.panel.z + 0.7, { sides: m.darkMetal(), top: m.darkMetal(), tile: { w: 1, h: 1 } });
    const scr = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.5), m.emissive(0x48ff8a, 0.45));
    scr.position.set(sh.x0 - 0.26, 1.55, S.panel.z); scr.rotation.y = -Math.PI / 2; this.root.add(scr);
    this.stationScreen = scr;
    for (let i = 0; i < 6; i++) { // cable bundles to the mast
      const c = new THREE.CylinderGeometry(0.04, 0.04, 9, 6); c.rotateZ(Math.PI / 2); c.rotateY(-0.9 + i * 0.02); c.translate(119.5, 0.05 + i * 0.05, -46); B.addGeometry(m.rubber(), c);
    }
    // lattice transmission mast with aviation lights
    const ms = S.mast, steel = m.paint('#b23a2a', 83), steel2 = m.paint('#d8d6cf', 85);
    const legs = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
    const seg = 6;
    for (let i = 0; i < Math.ceil(ms.h / seg); i++) {
      const y0 = i * seg, y1 = Math.min(ms.h, y0 + seg);
      const w0 = 2.0 * (1 - y0 / ms.h * 0.75), w1 = 2.0 * (1 - y1 / ms.h * 0.75);
      const mat = i % 2 ? steel : steel2;
      for (let k = 0; k < 4; k++) {
        const [ax, az] = legs[k], [bx, bz] = legs[(k + 1) % 4];
        const p0 = new THREE.Vector3(ms.x + ax * w0, y0, ms.z + az * w0), p1 = new THREE.Vector3(ms.x + ax * w1, y1, ms.z + az * w1);
        const q0 = new THREE.Vector3(ms.x + bx * w0, y0, ms.z + bz * w0), q1 = new THREE.Vector3(ms.x + bx * w1, y1, ms.z + bz * w1);
        for (const [a, b, r] of [[p0, p1, 0.09], [p0, q1, 0.04], [q0, p1, 0.04], [p1, q1, 0.05]]) {
          const len = a.distanceTo(b);
          const g = new THREE.CylinderGeometry(r, r, len, 5);
          g.translate(0, len / 2, 0);
          g.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.clone().sub(a).normalize()));
          g.translate(a.x, a.y, a.z);
          B.addGeometry(mat, g);
        }
      }
    }
    W.addBox(ms.x - 2.1, 0, ms.z - 2.1, ms.x + 2.1, 3, ms.z + 2.1, { tag: 'mast', surface: 'metal' });
    const beacon = m.emissive(0xff2010, 3);
    for (const y of [ms.h, ms.h * 0.66, ms.h * 0.33]) {
      const b = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 8), beacon); b.position.set(ms.x, y + 0.2, ms.z); this.root.add(b);
    }
    this.mastBeacon = beacon;
    // guard tower
    const tw = S.tower;
    for (const [dx, dz] of legs) { const g = new THREE.CylinderGeometry(0.12, 0.12, tw.h, 6); g.translate(tw.x + dx * 1.3, tw.h / 2, tw.z + dz * 1.3); B.addGeometry(m.darkMetal(), g); }
    B.box(tw.x - 1.6, tw.h - 0.15, tw.z - 1.6, tw.x + 1.6, tw.h, tw.z + 1.6, { sides: m.wood(), top: m.wood(), bottom: m.wood(), tile: { w: 2, h: 2 } });
    B.box(tw.x - 1.6, tw.h, tw.z - 1.6, tw.x + 1.6, tw.h + 1.0, tw.z - 1.5, { sides: m.wood(), top: m.wood(), tile: { w: 2, h: 2 } });
    B.box(tw.x - 1.6, tw.h, tw.z + 1.5, tw.x + 1.6, tw.h + 1.0, tw.z + 1.6, { sides: m.wood(), top: m.wood(), tile: { w: 2, h: 2 } });
    B.box(tw.x - 1.6, tw.h, tw.z - 1.5, tw.x - 1.5, tw.h + 1.0, tw.z + 1.5, { sides: m.wood(), top: m.wood(), tile: { w: 2, h: 2 } });
    B.box(tw.x - 1.7, tw.h + 2.4, tw.z - 1.7, tw.x + 1.7, tw.h + 2.55, tw.z + 1.7, { sides: m.darkMetal(), top: m.darkMetal(), bottom: m.darkMetal(), tile: { w: 2, h: 2 } });
    W.addBox(tw.x - 1.6, tw.h - 0.15, tw.z - 1.6, tw.x + 1.6, tw.h, tw.z + 1.6, { tag: 'platform' });
    W.addBox(tw.x - 1.6, tw.h, tw.z - 1.6, tw.x - 1.5, tw.h + 1.0, tw.z + 1.6, { tag: 'parapet' });
    for (const [dx, dz] of legs) W.addBlock(tw.x + dx * 1.3, 0, tw.z + dz * 1.3, 0.3, tw.h - 0.2, 0.3, { tag: 'pole' });
    // shipping containers (tall cover)
    const contMat = [m.paint('#7a3a28', 87), m.paint('#2f5266', 89), m.paint('#5d6b3a', 91)];
    for (const [cx, cz, rot, ci] of [[104, -78, 0, 0], [104.2, -82, 0, 1], [118, -46.5, Math.PI / 2, 2], [128, -60, 0, 1]]) {
      const lx = rot ? 2.4 : 6, lz = rot ? 6 : 2.4;
      B.box(cx - lx / 2, 0, cz - lz / 2, cx + lx / 2, 2.6, cz + lz / 2, { sides: contMat[ci], top: contMat[ci], tile: { w: 2, h: 2.6 } });
      const b = W.addBox(cx - lx / 2, 0, cz - lz / 2, cx + lx / 2, 2.6, cz + lz / 2, { tag: 'container', cover: true, surface: 'metal' });
      this.coverBoxes.push(b);
    }
    // generators (low cover)
    for (const [gx, gz] of [[110, -66], [124, -70]]) {
      B.box(gx - 1, 0, gz - 0.6, gx + 1, 1.2, gz + 0.6, { sides: m.paint('#c9b13a', 93), top: m.paint('#c9b13a', 93), tile: { w: 1, h: 1 } });
      this.coverBoxes.push(W.addBox(gx - 1, 0, gz - 0.6, gx + 1, 1.2, gz + 0.6, { tag: 'generator', cover: true, surface: 'metal' }));
    }
    this.buildProps(STATION_PROPS);
    this.interactables.push({ id: 'transmitter', x: S.panel.x, y: S.panel.y, z: S.panel.z, radius: 2.0, prompt: 'Ligar o transmissor de longo alcance' });
  }

  buildBus(x, z, rot) {
    const m = this.mats;
    const g = new THREE.Group();
    const body = new THREE.Mesh(new THREE.BoxGeometry(2.5, 2.4, 11), m.burned());
    body.position.y = 1.55; g.add(body);
    const roofG = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.1, 10.8), m.burned());
    roofG.position.y = 2.8; g.add(roofG);
    const win = new THREE.Mesh(new THREE.BoxGeometry(2.52, 0.9, 9.6), new THREE.MeshStandardMaterial({ color: 0x050505, roughness: 1 }));
    win.position.y = 2.0; g.add(win);
    for (const wz of [-3.6, 3.6]) for (const sx of [-1, 1]) {
      const w = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.3, 12), m.burned());
      w.rotation.z = Math.PI / 2; w.position.set(sx * 1.1, 0.42, wz); g.add(w);
    }
    g.traverse((o) => { if (o.isMesh) { o.castShadow = o.receiveShadow = true; } });
    g.position.set(x, 0, z); g.rotation.y = rot;
    g.updateMatrixWorld(true);
    // bake into the near batch
    g.traverse((o) => {
      if (!o.isMesh) return;
      const geo = o.geometry.clone().applyMatrix4(o.matrixWorld);
      this.near.addGeometry(o.material, geo);
    });
    this.footprintCollider(x, z, 2.5, 11, 2.8, rot, { tag: 'bus', cover: true, surface: 'metal' });
  }

  buildStreetFurniture() {
    const m = this.mats;
    const lamp = this._inst('lamp', () => streetLampGeometry().map((g) => ({ geometry: g, material: m.metalPole() })));
    const pole = this._inst('upole', () => utilityPoleGeometry().map((g) => ({ geometry: g, material: m.wood() })));
    const poles = [];
    for (let z = 0; z > -165; z -= 24) {
      if (z < -52 && z > -72) continue;
      for (const side of [-1, 1]) {
        const x = side * (ROAD.halfWidth + 0.6);
        lamp.transforms.push({ m: new THREE.Matrix4().makeRotationY(side < 0 ? 0 : Math.PI).setPosition(x, 0.15, z) });
        this.world.addBlock(x, 0, z, 0.3, 7, 0.3, { tag: 'pole', surface: 'metal' });
      }
      const px = ROAD.halfWidth + 2.4;
      const pz = z - 12;
      if (!(pz < -52 && pz > -72) && pz > -165) {
        pole.transforms.push({ m: new THREE.Matrix4().setPosition(-px, 0.15, pz) });
        this.world.addBlock(-px, 0, pz, 0.35, 9, 0.35, { tag: 'pole', surface: 'wood' });
        poles.push(new THREE.Vector3(-px, 8.55, pz));
      }
    }
    // sagging power lines between poles
    const pts = [];
    for (let i = 0; i < poles.length - 1; i++) {
      for (const ox of [-0.8, 0, 0.8]) {
        const a = poles[i].clone().add(new THREE.Vector3(ox, 0, 0)), b = poles[i + 1].clone().add(new THREE.Vector3(ox, 0, 0));
        const N = 12;
        for (let k = 0; k < N; k++) {
          const t0 = k / N, t1 = (k + 1) / N;
          const p0 = a.clone().lerp(b, t0); p0.y -= Math.sin(Math.PI * t0) * 0.9;
          const p1 = a.clone().lerp(b, t1); p1.y -= Math.sin(Math.PI * t1) * 0.9;
          pts.push(p0, p1);
        }
      }
    }
    // a few lines crossing the street to buildings
    for (let i = 0; i < poles.length; i += 2) {
      const a = poles[i], b = new THREE.Vector3(ROAD.halfWidth + 3.0, 9.5, a.z + 2);
      for (let k = 0; k < 12; k++) {
        const t0 = k / 12, t1 = (k + 1) / 12;
        const p0 = a.clone().lerp(b, t0); p0.y -= Math.sin(Math.PI * t0) * 1.2;
        const p1 = a.clone().lerp(b, t1); p1.y -= Math.sin(Math.PI * t1) * 1.2;
        pts.push(p0, p1);
      }
    }
    const lg = new THREE.BufferGeometry().setFromPoints(pts);
    this.root.add(new THREE.LineSegments(lg, new THREE.LineBasicMaterial({ color: 0x111111 })));

    // scattered debris (no collision): chunks of concrete, bricks
    const debris = this._inst('debris', () => {
      const g = new THREE.DodecahedronGeometry(0.18, 0);
      return [{ geometry: g, material: m.concrete('#5f5b54', 49) }];
    });
    const rnd = this.rnd;
    for (let i = 0; i < 260; i++) {
      const z = randRange(rnd, -165, 50);
      // debris gathers along curbs and building feet, less in the middle of the road
      const edge = rnd() < 0.75;
      const halfW = z > 6 ? 29 : 10.8;
      const x = edge ? (rnd() < 0.5 ? -1 : 1) * randRange(rnd, halfW - 3.5, halfW) : randRange(rnd, -halfW, halfW);
      const s = 0.25 + rnd() * rnd() * 1.6;
      const mm = new THREE.Matrix4().compose(
        new THREE.Vector3(x, 0.05 * s + (Math.abs(x) > 8 ? 0.15 : 0), z),
        new THREE.Quaternion().setFromEuler(new THREE.Euler(rnd() * 3, rnd() * 3, rnd() * 3)),
        new THREE.Vector3(s, s * 0.6, s * (0.7 + rnd() * 0.6)),
      );
      debris.transforms.push({ m: mm });
    }
    // rubble piles at building feet (low, steppable visual mounds)
    const pile = this._inst('rubble', () => {
      const g = new THREE.IcosahedronGeometry(1, 2);
      const pos = g.attributes.position;
      const r2 = mulberry32(99);
      for (let i = 0; i < pos.count; i++) {
        const v = new THREE.Vector3().fromBufferAttribute(pos, i);
        const k = 0.75 + r2() * 0.45;
        v.multiplyScalar(k);
        if (v.y < 0) v.y *= 0.1;
        pos.setXYZ(i, v.x, v.y, v.z);
      }
      g.computeVertexNormals();
      return [{ geometry: g, material: m.concrete('#857f74', 51) }];
    });
    for (const [x, z, s] of [[-10.6, -27, 1.6], [10.8, -48, 1.3], [-10.7, -102, 2.0], [10.5, -118, 1.5], [-10.5, -60.5, 1.0], [24, 52, 1.8]]) {
      pile.transforms.push({ m: new THREE.Matrix4().compose(new THREE.Vector3(x, 0, z), new THREE.Quaternion(), new THREE.Vector3(s * 1.4, s * 0.45, s * 1.6)) });
    }
  }

  buildBoundaries() {
    for (const b of BOUNDS) this.world.addBox(b.x0, 0, b.z0, b.x1, 30, b.z1, { tag: 'bounds' });
    const R = MISSION_RECT;
    this.world.addBox(R.x0 - 2, 0, R.z0, R.x0, 30, R.z1, { tag: 'bounds' });
    this.world.addBox(R.x1, 0, R.z0, R.x1 + 2, 30, R.z1, { tag: 'bounds' });
    this.world.addBox(R.x0, 0, R.z0 - 2, R.x1, 30, R.z0, { tag: 'bounds' });
    this.world.addBox(R.x0, 0, R.z1, R.x1, 30, R.z1 + 2, { tag: 'bounds' });
  }

  /** Procedural skyline outside the play space (visible from the helicopter). */
  buildBackgroundCity() {
    const R = MISSION_RECT;
    const styles = Object.keys(STYLES);
    const rnd = mulberry32(4242);
    const block = 46, roadW = 14;
    for (let bx = -360; bx < 360; bx += block + roadW) {
      for (let bz = -480; bz < 560; bz += block + roadW) {
        const x0 = bx, z0 = bz, x1 = bx + block, z1 = bz + block;
        if (x1 > R.x0 - 6 && x0 < R.x1 + 6 && z1 > R.z0 - 6 && z0 < R.z1 + 6) continue;
        const dist = Math.hypot(bx, bz);
        // subdivide block into 1-4 buildings
        const splits = rnd() < 0.5 ? 2 : 1;
        for (let i = 0; i < splits; i++) {
          for (let j = 0; j < 2; j++) {
            const w = block / splits, d = block / 2;
            const bxa = x0 + i * w + 1, bza = z0 + j * d + 1;
            const floors = 3 + Math.floor(rnd() * (dist < 250 ? 6 : 10));
            const bw = Math.max(9, Math.floor((w - 2) / 3) * 3), bd = Math.max(9, Math.floor((d - 2) / 3) * 3);
            this.buildBuilding({ x0: bxa, x1: bxa + bw, z0: bza, z1: bza + bd, floors, style: styles[Math.floor(rnd() * styles.length)], shop: Math.floor(rnd() * 3) }, this.far, false);
          }
        }
      }
    }
  }
}
