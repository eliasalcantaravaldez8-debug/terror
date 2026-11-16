import * as THREE from 'three';
import { TextureFactory as TF } from '../render/TextureFactory.js';

/**
 * Varna summit estate (Mission 5): walled palace grounds at night. Absolute coords.
 * Gardens with tall hedges (break line of sight) and low hedges (cover), lamp posts
 * that light the paths, a security hut and the palace's conference hall terrace.
 */
export const ESTATE = {
  wall: { x0: -710, x1: -490, z0: 1610, z1: 1790, h: 3.4 },
  grate: { x0: -650, x1: -646, z: 1790 },
  start: { x: -648, z: 1826 },
  palace: { x0: -650, x1: -550, z0: 1620, z1: 1660, h: 13 },
  terrace: { x0: -632, x1: -568, z0: 1660, z1: 1668 },
  recordSpot: { x: -600, y: 1.9, z: 1660.4 },
  hut: { x0: -522, x1: -508, z0: 1696, z1: 1708 },
  terminal: { x: -522.4, y: 1.3, z: 1702 },
  extraction: { x: -648, z: 1812 },
  lamps: [[-648, 1775], [-612, 1752], [-588, 1752], [-648, 1728], [-552, 1728], [-600, 1700], [-660, 1680], [-540, 1680], [-600, 1676], [-515, 1720], [-690, 1640], [-700, 1765]],
  // tall hedges (block sight)  [x0, z0, x1, z1]
  tallHedges: [
    [-700, 1760, -660, 1761.4], [-636, 1760, -560, 1761.4], [-545, 1760, -500, 1761.4],
    [-690, 1715, -625, 1716.4], [-575, 1715, -510, 1716.4],
    [-676, 1690, -674.6, 1745], [-526, 1690, -524.6, 1745],
    [-700, 1688, -680, 1689.4], [-520, 1688, -500, 1689.4],
  ],
  // low hedges (crouch cover)
  lowHedges: [
    [-640, 1745, -620, 1746.2], [-580, 1745, -560, 1746.2], [-655, 1700, -640, 1701.2], [-560, 1700, -545, 1701.2],
    [-615, 1690, -585, 1691.2], [-700, 1735, -690, 1736.2], [-510, 1735, -500, 1736.2], [-640, 1672, -620, 1673.2], [-580, 1672, -560, 1673.2],
  ],
};

export function buildEstate(cb) {
  const m = cb.mats, B = cb.near, W = cb.world, E = ESTATE;
  const stone = m.concrete('#a39d90', 41), gravel = m.concrete('#7c776c', 129);
  // lawn and gravel paths
  const lawnTex = TF.fabric(131, ['#2f3d26', '#35452b', '#2a3622', '#3a4a2e'], 9);
  const lawn = new THREE.MeshStandardMaterial({ ...lawnTex, roughness: 1 });
  for (const t of Object.values(lawnTex)) { t.repeat.set(40, 40); }
  const w = E.wall;
  B.quad(lawn, [w.x0, 0.008, w.z1], [w.x1, 0.008, w.z1], [w.x1, 0.008, w.z0], [w.x0, 0.008, w.z0], [0, 1, 0], [0, 1], [1, 1], [1, 0], [0, 0]);
  const path = (x0, z0, x1, z1) => B.quad(gravel, [x0, 0.012, z1], [x1, 0.012, z1], [x1, 0.012, z0], [x0, 0.012, z0], [0, 1, 0], [x0 / 3, z1 / 3], [x1 / 3, z1 / 3], [x1 / 3, z0 / 3], [x0 / 3, z0 / 3]);
  path(-651, 1668, -645, 1790); path(-603, 1668, -597, 1760); path(-700, 1728, -500, 1734); path(-700, 1674, -500, 1680); path(-555, 1620, -530, 1700);
  // estate wall with the drainage grate in the south side
  const wallMat = m.concrete('#8a857a', 133);
  const wall = (x0, z0, x1, z1) => { B.box(x0, 0, z0, x1, w.h, z1, { sides: wallMat, top: stone, tile: { w: 3, h: 3 } }); W.addBox(x0, 0, z0, x1, w.h, z1, { tag: 'building' }); };
  wall(w.x0 - 0.6, w.z0, w.x0, w.z1 + 0.6); wall(w.x1, w.z0, w.x1 + 0.6, w.z1 + 0.6); wall(w.x0, w.z0 - 0.6, w.x1, w.z0);
  wall(w.x0, w.z1, E.grate.x0, w.z1 + 0.6); wall(E.grate.x1, w.z1, w.x1, w.z1 + 0.6);
  B.box(E.grate.x0, 2.2, w.z1, E.grate.x1, w.h, w.z1 + 0.6, { sides: wallMat, top: stone, bottom: wallMat, tile: { w: 3, h: 3 } });
  W.addBox(E.grate.x0, 2.2, w.z1, E.grate.x1, w.h, w.z1 + 0.6, { tag: 'building' });
  const bars = new THREE.Group();
  for (let i = 0; i <= 8; i++) { const b = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 2.2, 6), m.darkMetal()); b.position.set(E.grate.x0 + 0.2 + i * 0.45, 1.1, w.z1 + 0.3); bars.add(b); }
  for (const y of [0.4, 1.8]) { const b = new THREE.Mesh(new THREE.BoxGeometry(4, 0.08, 0.08), m.darkMetal()); b.position.set((E.grate.x0 + E.grate.x1) / 2, y, w.z1 + 0.3); bars.add(b); }
  cb.root.add(bars);
  cb.namedProps.grate = { bars, box: W.addBox(E.grate.x0, 0, w.z1, E.grate.x1, 2.2, w.z1 + 0.6, { tag: 'door', surface: 'metal' }) };
  cb.interactables.push({ id: 'grate', x: -648, y: 1.0, z: w.z1 + 1.1, radius: 2.2, prompt: 'Forçar a grade do canal de drenagem' });
  // outside strip (road + bushes) enclosed by bounds
  B.quad(m.asphalt(), [w.x0 - 10, 0.01, 1840], [w.x1 + 10, 0.01, 1840], [w.x1 + 10, 0.01, 1798], [w.x0 - 10, 0.01, 1798], [0, 1, 0], [0, 6], [30, 6], [30, 0], [0, 0]);
  for (const [x0, z0, x1, z1] of [[w.x0 - 12, 1791, w.x0 - 10, 1842], [w.x1 + 10, 1791, w.x1 + 12, 1842], [w.x0 - 12, 1842, w.x1 + 12, 1844]]) W.addBox(x0, 0, z0, x1, 30, z1, { tag: 'bounds' });
  // hedges
  const hedgeTex = TF.fabric(135, ['#24341d', '#2c3f22', '#1d2a17', '#33472a'], 5);
  const hedge = new THREE.MeshStandardMaterial({ ...hedgeTex, roughness: 1 });
  for (const t of Object.values(hedgeTex)) t.repeat.set(3, 1);
  for (const [x0, z0, x1, z1] of E.tallHedges) { B.box(x0, 0, z0, x1, 2.4, z1, { sides: hedge, top: hedge, tile: { w: 2, h: 2.4 } }); W.addBox(x0, 0, z0, x1, 2.4, z1, { tag: 'hedge', surface: 'dirt' }); }
  for (const [x0, z0, x1, z1] of E.lowHedges) { B.box(x0, 0, z0, x1, 1.05, z1, { sides: hedge, top: hedge, tile: { w: 2, h: 1 } }); cb.coverBoxes.push(W.addBox(x0, 0, z0, x1, 1.05, z1, { tag: 'hedge', cover: true, surface: 'dirt' })); }
  // fountain, statues, gazebo
  const basin = new THREE.CylinderGeometry(6, 6.3, 0.8, 32); basin.translate(-600, 0.4, 1725); B.addGeometry(stone, basin);
  const water = new THREE.Mesh(new THREE.CircleGeometry(5.6, 32), m.water()); water.rotation.x = -Math.PI / 2; water.position.set(-600, 0.7, 1725); cb.root.add(water);
  const spire = new THREE.CylinderGeometry(0.5, 0.9, 3, 12); spire.translate(-600, 1.5, 1725); B.addGeometry(stone, spire);
  cb.coverBoxes.push(W.addBox(-606, 0, 1719, -594, 0.8, 1731, { tag: 'fountain', cover: true }));
  for (const [x, z] of [[-630, 1740], [-570, 1740], [-630, 1705], [-570, 1705]]) {
    B.box(x - 0.7, 0, z - 0.7, x + 0.7, 1.6, z + 0.7, { sides: stone, top: stone, tile: { w: 1, h: 1 } });
    const fig = new THREE.CylinderGeometry(0.25, 0.4, 1.9, 8); fig.translate(x, 2.55, z); B.addGeometry(stone, fig);
    const head = new THREE.SphereGeometry(0.22, 10, 8); head.translate(x, 3.7, z); B.addGeometry(stone, head);
    W.addBox(x - 0.7, 0, z - 0.7, x + 0.7, 3.8, z + 0.7, { tag: 'statue' });
  }
  for (const [x, z] of [[-672, 1652], [-666, 1652], [-672, 1658], [-666, 1658]]) { const c = new THREE.CylinderGeometry(0.2, 0.2, 3, 10); c.translate(x, 1.5, z); B.addGeometry(stone, c); W.addBlock(x, 0, z, 0.4, 3, 0.4, { tag: 'pole' }); }
  B.box(-674, 3, 1650, -664, 3.4, 1660, { sides: stone, top: m.roof(), bottom: stone, tile: { w: 2, h: 2 } });
  // palace: facade with tall windows, cornices, portico columns, lit conference hall
  const P = E.palace;
  const facade = m.facade({ wall: '#d6cdb8', frame: '#efe9dc', band: '#bdb39c', seed: 61, damage: 0.0, shutters: true, shutterColor: '#3e4a3a' });
  B.box(P.x0, 0, P.z0, P.x1, P.h, P.z1, { sides: facade, top: m.roof(), tile: { w: 12, h: 6, yBase: 1 } });
  B.box(P.x0 - 0.4, P.h, P.z0 - 0.4, P.x1 + 0.4, P.h + 0.8, P.z1 + 0.4, { sides: stone, top: stone, tile: { w: 3, h: 3 } });
  W.addBox(P.x0, 0, P.z0, P.x1, P.h, P.z1, { tag: 'building' });
  const T = E.terrace;
  B.box(T.x0, 0, T.z0, T.x1, 0.4, T.z1, { sides: stone, top: stone, tile: { w: 2, h: 2 }, topTile: 2 });
  W.addBox(T.x0, 0, T.z0, T.x1, 0.4, T.z1, { tag: 'steps' });
  for (let i = 0; i < 6; i++) { const x = -625 + i * 10; const c = new THREE.CylinderGeometry(0.42, 0.48, 8.6, 16); c.translate(x, 0.4 + 4.3, 1666.5); B.addGeometry(stone, c); W.addBlock(x, 0.4, 1666.5, 0.9, 8.6, 0.9, { tag: 'column', cover: true }); }
  B.box(-630, 9, 1660, -570, 9.8, 1668, { sides: stone, top: stone, bottom: stone, tile: { w: 3, h: 3 } });
  const hallC = document.createElement('canvas'); hallC.width = 512; hallC.height = 128;
  const hx = hallC.getContext('2d');
  const gr = hx.createLinearGradient(0, 0, 0, 128); gr.addColorStop(0, '#ffd9a0'); gr.addColorStop(1, '#a8743c'); hx.fillStyle = gr; hx.fillRect(0, 0, 512, 128);
  hx.fillStyle = '#2a1d12'; for (let x = 0; x < 512; x += 64) hx.fillRect(x, 0, 6, 128);
  hx.fillStyle = 'rgba(40,25,15,0.55)'; for (let i = 0; i < 9; i++) { const x = 20 + i * 55; hx.fillRect(x, 70, 14, 40); hx.beginPath(); hx.arc(x + 7, 62, 8, 0, 7); hx.fill(); } // silhouettes
  const hallT = new THREE.CanvasTexture(hallC); hallT.colorSpace = THREE.SRGBColorSpace;
  const hall = new THREE.Mesh(new THREE.PlaneGeometry(40, 3.2), new THREE.MeshStandardMaterial({ color: 0x000000, emissive: 0xffffff, emissiveMap: hallT, emissiveIntensity: 1.2 }));
  hall.position.set(-600, 2.3, P.z1 + 0.03); cb.root.add(hall);
  cb.interactables.push({ id: 'record', x: E.recordSpot.x, y: E.recordSpot.y, z: E.recordSpot.z + 1.2, radius: 2.4, prompt: 'Apontar o microfone a laser para a janela do salão' });
  // limousines on the driveway
  cb.buildProps([
    { type: 'car', x: -542, z: 1636, rot: 0, color: 0x0d0d0f }, { type: 'car', x: -542, z: 1646, rot: 0, color: 0x0d0d0f },
    { type: 'van', x: -537, z: 1662, rot: 0, color: 0x15161a }, { type: 'car', x: -536, z: 1676, rot: Math.PI, color: 0x1a1b20 },
    { type: 'crates', x: -515, z: 1712, ammo: true },
  ]);
  // security hut with terminal
  const H = E.hut;
  B.box(H.x0, 0, H.z0, H.x1, 3, H.z1, { sides: m.paint('#cfc9bb', 137), top: m.roof(), tile: { w: 2, h: 2 } });
  W.addBox(H.x0, 0, H.z0, H.x1, 3, H.z1, { tag: 'building' });
  const scr = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 0.5), m.emissive(0x4ab0ff, 0.9)); scr.position.set(H.x0 - 0.03, 1.4, 1702); scr.rotation.y = -Math.PI / 2; cb.root.add(scr);
  cb.estateScreen = scr;
  cb.interactables.push({ id: 'hutTerminal', x: E.terminal.x - 0.6, y: E.terminal.y, z: E.terminal.z, radius: 2.0, prompt: 'Baixar a lista de convidados' });
  // lamp posts (lit with pooled lights) and wall floodlights
  const lampMat = m.emissive(0xffd9a0, 2.2);
  for (const [x, z] of E.lamps) {
    const pole = new THREE.CylinderGeometry(0.06, 0.09, 3.6, 8); pole.translate(x, 1.8, z); B.addGeometry(m.darkMetal(), pole);
    const globe = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 8), lampMat); globe.position.set(x, 3.75, z); cb.root.add(globe);
    W.addBlock(x, 0, z, 0.2, 3.6, 0.2, { tag: 'pole', surface: 'metal' });
    (cb.lightDefs ||= []).push({ pos: new THREE.Vector3(x, 3.6, z), color: 0xffcf90, intensity: 7, distance: 13, decay: 1.6, permanent: true });
  }
  for (const [x, z] of [[-708, 1612], [-492, 1612], [-708, 1788], [-492, 1788]]) {
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.35, 0.4), m.emissive(0xe8f0ff, 2.5)); head.position.set(x, 5.6, z); cb.root.add(head);
    const pole = new THREE.CylinderGeometry(0.08, 0.1, 5.6, 8); pole.translate(x, 2.8, z); B.addGeometry(m.darkMetal(), pole);
    cb.lightDefs.push({ pos: new THREE.Vector3(x, 5.4, z), color: 0xdfe8ff, intensity: 10, distance: 28, decay: 1.4, permanent: true });
  }
}
