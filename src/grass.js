// Grama 3D (tufos) perto da câmera, balançando com o vento.
// Só nasce em terreno de grama: evita ruas, calçadas, caminhos e construções (registrados pelo Batcher).
// Dividida em regiões pequenas; só as próximas da câmera são desenhadas (custo baixo para GPU integrada).
import * as THREE from 'three';
import { Batcher } from './geo.js';
import { rand, rr } from './textures.js';

function grassTex() {
  const c = document.createElement('canvas'); c.width = 128; c.height = 128; const g = c.getContext('2d');
  g.clearRect(0, 0, 128, 128);
  for (let i = 0; i < 26; i++) { // lâminas
    const x = 8 + rand() * 112, h = rr(60, 124), lean = rr(-18, 18), w = rr(3, 6);
    const gr = g.createLinearGradient(0, 128, 0, 128 - h); gr.addColorStop(0, '#2f4a1c'); gr.addColorStop(0.6, '#5f8a32'); gr.addColorStop(1, '#a8c060');
    g.fillStyle = gr; g.beginPath(); g.moveTo(x - w / 2, 128); g.quadraticCurveTo(x + lean * 0.3, 128 - h * 0.6, x + lean, 128 - h); g.quadraticCurveTo(x + lean * 0.3 + w * 0.3, 128 - h * 0.6, x + w / 2, 128); g.fill();
  }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.generateMipmaps = true; return t;
}

export class Grass {
  // rects: [[cx, cz, half]] áreas de grama; hard: grade de áreas proibidas; opts: {radius, spacing}
  constructor(scene, rects, groundFn, opts = {}) {
    this.radius = opts.radius || 50; this.cells = []; this.time = { value: 0 }; this.camPos = { value: new THREE.Vector3() };
    const tex = grassTex();
    const mat = new THREE.MeshLambertMaterial({ map: tex, alphaTest: 0.45, side: THREE.DoubleSide, vertexColors: false });
    mat.onBeforeCompile = (sh) => {
      sh.uniforms.gTime = this.time; sh.uniforms.gCam = this.camPos; sh.uniforms.gR = { value: this.radius };
      sh.vertexShader = 'uniform float gTime; uniform vec3 gCam; uniform float gR;\n' + sh.vertexShader.replace('#include <begin_vertex>', `#include <begin_vertex>
        vec4 gw = instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
        float fade = 1.0 - smoothstep(gR - 14.0, gR, distance(gw.xz, gCam.xz));
        transformed *= fade; // some suavemente na borda (sem "pipocar")
        float sway = sin(gTime * 1.7 + gw.x * 0.35 + gw.z * 0.27) * 0.5 + sin(gTime * 3.1 + gw.x * 0.9) * 0.2;
        transformed.x += sway * 0.12 * uv.y; transformed.z += sway * 0.06 * uv.y;`);
    };
    this.mat = mat;
    // tufo: 3 planos cruzados (6 triângulos)
    const parts = [];
    for (let i = 0; i < 3; i++) { const p = new THREE.PlaneGeometry(0.7, 0.42, 1, 1); p.translate(0, 0.21, 0); p.rotateY((i * Math.PI) / 3); parts.push(p); }
    const geo = new THREE.BufferGeometry();
    const pos = [], uv = [], nor = [];
    for (const p of parts) { const ni = p.index.array; for (const i of ni) { pos.push(p.attributes.position.getX(i), p.attributes.position.getY(i), p.attributes.position.getZ(i)); uv.push(p.attributes.uv.getX(i), p.attributes.uv.getY(i)); nor.push(0, 1, 0); } }
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); geo.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
    // posições candidatas, filtradas pelo que não é grama
    const CELL = 40, spacing = opts.spacing || 1.25; const byCell = new Map();
    const hard = Batcher.hardGrid; const HC = Batcher.HARD_CELL;
    const blocked = (x, z) => {
      const list = hard.get(Math.floor(x / HC) + ',' + Math.floor(z / HC)); if (!list) return false;
      for (const r of list) if (x > r[0] - 0.15 && x < r[2] + 0.15 && z > r[1] - 0.15 && z < r[3] + 0.15) return true;
      return false;
    };
    for (const [cx, cz, half] of rects) {
      for (let x = cx - half + 0.4; x < cx + half - 0.4; x += spacing) for (let z = cz - half + 0.4; z < cz + half - 0.4; z += spacing) {
        const px = x + rr(-0.45, 0.45) * spacing, pz = z + rr(-0.45, 0.45) * spacing;
        if (rand() < 0.25 || blocked(px, pz)) continue;
        const k = Math.floor(px / CELL) + ',' + Math.floor(pz / CELL);
        if (!byCell.has(k)) byCell.set(k, []); byCell.get(k).push([px, pz]);
      }
    }
    const m = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(), v = new THREE.Vector3(), col = new THREE.Color();
    let total = 0;
    for (const [k, pts] of byCell) {
      const im = new THREE.InstancedMesh(geo, mat, pts.length); let sx = 0, sz = 0;
      pts.forEach(([x, z], i) => {
        q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), rand() * Math.PI); const sc = rr(0.7, 1.35); s.set(sc, sc * rr(0.8, 1.3), sc);
        m.compose(v.set(x, groundFn(x, z) + 0.005, z), q, s); im.setMatrixAt(i, m);
        col.setHSL(rr(0.2, 0.28), rr(0.35, 0.55), rr(0.75, 1.0)); im.setColorAt(i, col); sx += x; sz += z;
      });
      im.computeBoundingSphere(); im.castShadow = false; im.receiveShadow = true; im.visible = false; scene.add(im);
      this.cells.push({ mesh: im, x: sx / pts.length, z: sz / pts.length }); total += pts.length;
    }
    this.total = total;
  }
  update(dt, cam) {
    this.time.value += dt; this.camPos.value.copy(cam);
    const R = this.radius + 30;
    for (const c of this.cells) c.mesh.visible = Math.abs(c.x - cam.x) < R && Math.abs(c.z - cam.z) < R;
  }
}
