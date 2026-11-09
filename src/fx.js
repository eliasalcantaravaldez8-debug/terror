// Efeitos de partículas leves (sprites reaproveitados): fumaça, fogo, faíscas e explosão.
// Um único conjunto de sprites para o jogo todo: não cria materiais novos durante a partida.
import * as THREE from 'three';

function radial(stops, size = 64) {
  const c = document.createElement('canvas'); c.width = c.height = size; const g = c.getContext('2d');
  const gr = g.createRadialGradient(size / 2, size / 2, 1, size / 2, size / 2, size / 2 - 1);
  for (const [o, col] of stops) gr.addColorStop(o, col);
  g.fillStyle = gr; g.fillRect(0, 0, size, size);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
function smokeTex() {
  const c = document.createElement('canvas'); c.width = c.height = 64; const g = c.getContext('2d');
  for (let i = 0; i < 9; i++) { // bolhas sobrepostas = nuvem irregular
    const x = 20 + Math.random() * 24, y = 20 + Math.random() * 24, r = 10 + Math.random() * 12;
    const gr = g.createRadialGradient(x, y, 1, x, y, r); gr.addColorStop(0, 'rgba(255,255,255,0.55)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
  }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}

const MAX = 140;
export class Fx {
  constructor(scene) {
    this.scene = scene; this.parts = [];
    const fireT = radial([[0, 'rgba(255,255,220,1)'], [0.25, 'rgba(255,190,70,0.95)'], [0.6, 'rgba(240,80,15,0.55)'], [1, 'rgba(120,20,0,0)']]);
    const flashT = radial([[0, 'rgba(255,255,240,1)'], [0.3, 'rgba(255,220,140,0.8)'], [1, 'rgba(255,120,30,0)']]);
    const sparkT = radial([[0, 'rgba(255,255,200,1)'], [0.4, 'rgba(255,200,80,0.8)'], [1, 'rgba(255,120,0,0)']], 32);
    const sm = smokeTex();
    // materiais por tipo (a cor de cada sprite varia pela opacidade e escala)
    this.mats = {
      smoke: new THREE.SpriteMaterial({ map: sm, color: 0x5a5a5a, transparent: true, depthWrite: false, fog: true }),
      black: new THREE.SpriteMaterial({ map: sm, color: 0x1c1c1c, transparent: true, depthWrite: false, fog: true }),
      fire: new THREE.SpriteMaterial({ map: fireT, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false }),
      flash: new THREE.SpriteMaterial({ map: flashT, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false }),
      spark: new THREE.SpriteMaterial({ map: sparkT, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false }),
    };
    // um sprite por partícula, mas com material clonado por tipo para poder mudar a opacidade individualmente
    this.pool = { smoke: [], black: [], fire: [], flash: [], spark: [] };
  }
  get(kind) {
    const pool = this.pool[kind];
    let s = pool.find((p) => !p.visible);
    if (!s) {
      if (this.parts.length >= MAX) { s = this.parts.shift(); s.visible = false; return this.get(kind); }
      s = new THREE.Sprite(this.mats[kind].clone()); s.kind = kind; s.renderOrder = kind === 'smoke' || kind === 'black' ? 2 : 3; this.scene.add(s); pool.push(s);
    }
    s.visible = true; this.parts.push(s); return s;
  }
  // kind, posição, velocidade, vida, tamanho inicial/final, opacidade
  emit(kind, x, y, z, vx, vy, vz, life, s0, s1, op = 1) {
    const s = this.get(kind); s.position.set(x, y, z); s.v = [vx, vy, vz]; s.life = s.t = life; s.s0 = s0; s.s1 = s1; s.op = op;
    s.scale.setScalar(s0); s.material.opacity = op; s.material.rotation = Math.random() * 6.28; return s;
  }
  smoke(x, y, z, k = 1, black = false) { this.emit(black ? 'black' : 'smoke', x + (Math.random() - 0.5) * 0.4, y, z + (Math.random() - 0.5) * 0.4, (Math.random() - 0.5) * 0.5, 1.2 + Math.random() * 0.8, (Math.random() - 0.5) * 0.5, 2.2 + Math.random(), 0.6 * k, 3.2 * k, black ? 0.75 : 0.55); }
  fire(x, y, z, k = 1) { this.emit('fire', x + (Math.random() - 0.5) * 0.7 * k, y, z + (Math.random() - 0.5) * 0.7 * k, (Math.random() - 0.5) * 0.3, 1.6 + Math.random() * 1.4, (Math.random() - 0.5) * 0.3, 0.45 + Math.random() * 0.3, 0.9 * k, 0.3 * k, 1); }
  spark(x, y, z) { this.emit('spark', x, y, z, (Math.random() - 0.5) * 6, 2 + Math.random() * 4, (Math.random() - 0.5) * 6, 0.3 + Math.random() * 0.3, 0.18, 0.05, 1); }
  explosion(x, y, z) {
    this.emit('flash', x, y + 1, z, 0, 0, 0, 0.35, 4, 11, 1);
    for (let i = 0; i < 26; i++) { const a = Math.random() * 6.28, sp = 2 + Math.random() * 6; this.emit('fire', x, y + 0.6 + Math.random(), z, Math.cos(a) * sp, 2 + Math.random() * 5, Math.sin(a) * sp, 0.6 + Math.random() * 0.5, 2.2, 0.6, 1); }
    for (let i = 0; i < 16; i++) this.spark(x, y + 1, z);
    for (let i = 0; i < 14; i++) { const a = Math.random() * 6.28, sp = 1 + Math.random() * 3; this.emit('black', x, y + 1 + Math.random(), z, Math.cos(a) * sp, 2.5 + Math.random() * 2, Math.sin(a) * sp, 3 + Math.random() * 1.5, 1.6, 6, 0.85); }
  }
  update(dt) {
    for (let i = this.parts.length - 1; i >= 0; i--) {
      const s = this.parts[i]; s.t -= dt;
      if (s.t <= 0) { s.visible = false; this.parts.splice(i, 1); continue; }
      const k = 1 - s.t / s.life; // 0 → 1
      s.position.x += s.v[0] * dt; s.position.y += s.v[1] * dt; s.position.z += s.v[2] * dt;
      if (s.kind === 'spark') s.v[1] -= 9.8 * dt; else { s.v[0] *= 1 - dt * 1.5; s.v[2] *= 1 - dt * 1.5; if (s.kind === 'fire') s.v[1] *= 1 - dt * 0.8; }
      s.scale.setScalar(s.s0 + (s.s1 - s.s0) * k);
      s.material.opacity = s.op * (s.kind === 'smoke' || s.kind === 'black' ? Math.min(1, k * 5) * (1 - k) : 1 - k * k);
    }
  }
}
