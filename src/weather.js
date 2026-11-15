// CLIMA: chuva que começa e para sozinha. Gotas desenhadas na GPU em volta da câmera (custo quase zero),
// ruas e calçadas molhadas (mais escuras e brilhantes), céu fechado, mais neblina e som de chuva.
// Dentro de prédios (algo cobrindo a câmera) as gotas somem e o som fica abafado.
import * as THREE from 'three';

export class Weather {
  constructor(G, scene, maxDrops = 6000) {
    this.G = G; this.level = 0; this.target = 0; this.t = 60 + Math.random() * 120; this.dur = 0; this.covered = false; this.coverT = 0;
    // gotas: cada uma é um segmento (2 vértices) com posição-base aleatória numa caixa de 44 x 26 x 44 m
    const n = maxDrops, pos = new Float32Array(n * 6), end = new Float32Array(n * 2);
    for (let i = 0; i < n; i++) { const x = Math.random() * 44, y = Math.random() * 26, z = Math.random() * 44; pos.set([x, y, z, x, y, z], i * 6); end[i * 2] = 0; end[i * 2 + 1] = 1; }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('aEnd', new THREE.BufferAttribute(end, 1));
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1e6);
    this.u = { uTime: { value: 0 }, uCam: { value: new THREE.Vector3() }, uAlpha: { value: 0 } };
    const mat = new THREE.ShaderMaterial({
      uniforms: this.u, transparent: true, depthWrite: false, fog: false,
      vertexShader: `attribute float aEnd; uniform float uTime; uniform vec3 uCam; varying float vA;
        void main() { vec3 B = vec3(44.0, 26.0, 44.0); vec3 p = position;
          p.y = mod(p.y - uTime * 15.0, B.y); p.x += (26.0 - p.y) * 0.08; // queda com um pouco de vento
          vec3 w = uCam + mod(p - uCam + B * 0.5, B) - B * 0.5; w.y = uCam.y - 8.0 + p.y;
          w.y -= aEnd * 0.55; w.x += aEnd * 0.045; vA = 1.0 - aEnd * 0.6;
          gl_Position = projectionMatrix * viewMatrix * vec4(w, 1.0); }`,
      fragmentShader: `uniform float uAlpha; varying float vA; void main() { gl_FragColor = vec4(0.72, 0.78, 0.86, uAlpha * vA); }`,
    });
    this.drops = new THREE.LineSegments(g, mat); this.drops.frustumCulled = false; this.drops.renderOrder = 5; this.drops.visible = false; this.n = n;
    scene.add(this.drops);
    // materiais que molham: [material, cor base, especular base, brilho base]
    const M = G.mats();
    this.wet = [M.road, M.asphalt, M.parking, M.sidewalk, M.concreteFlat, M.cross].filter(Boolean).map((m) => ({ m, c: m.color.clone(), s: m.specular ? m.specular.clone() : null, sh: m.shininess }));
    this.amb = null;
  }
  // começa / para (códigos do celular ou o próprio clima)
  start(level = 1, dur = 180) { this.target = level; this.dur = dur; }
  stop() { this.target = 0; this.dur = 0; this.t = 120 + Math.random() * 160; }
  get raining() { return this.level > 0.05; }
  // som de chuva: ruído filtrado em laço
  sound(dt) {
    const G = this.G, ctx = G.audio && G.audio.ctx; if (!ctx || !G.settings.sound) return;
    if (!this.amb) {
      const len = 2, buf = ctx.createBuffer(1, ctx.sampleRate * len, ctx.sampleRate), d = buf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
      const src = ctx.createBufferSource(); src.buffer = buf; src.loop = true; const bp = ctx.createBiquadFilter(); bp.type = 'lowpass'; bp.frequency.value = 2600; const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 300;
      const gain = ctx.createGain(); gain.gain.value = 0; src.connect(hp); hp.connect(bp); bp.connect(gain); gain.connect(ctx.destination); src.start(); this.amb = { gain, bp };
    }
    const want = this.level * (this.covered ? 0.05 : 0.2);
    this.amb.gain.gain.value += (want - this.amb.gain.gain.value) * Math.min(1, dt * 2); this.amb.bp.frequency.value = this.covered ? 900 : 2600;
  }
  update(dt) {
    const G = this.G; if (!G.sky) return;
    // agenda: de vez em quando chove por alguns minutos
    if (this.target === 0 && (this.t -= dt) <= 0) { if (Math.random() < 0.35) this.start(0.45 + Math.random() * 0.55, 120 + Math.random() * 200); else this.t = 90 + Math.random() * 150; }
    if (this.target > 0 && this.dur > 0 && (this.dur -= dt) <= 0) this.stop();
    const k = this.level < this.target ? 0.08 : 0.05; // fecha devagar e abre devagar (dezenas de segundos)
    this.level += Math.sign(this.target - this.level) * Math.min(Math.abs(this.target - this.level), dt * k);
    const L = this.level, cam = G.camera.position;
    // dentro de algum lugar coberto: sem gotas
    if ((this.coverT -= dt) <= 0) { this.coverT = 0.3; this.covered = false; if (L > 0.01) for (const b of G.world.query(cam.x - 0.05, cam.z - 0.05, cam.x + 0.05, cam.z + 0.05)) if (b.minY > cam.y + 0.3 && b.minY < cam.y + 14) { this.covered = true; break; } }
    this.drops.visible = L > 0.01 && !this.covered;
    if (this.drops.visible) { this.u.uTime.value += dt; this.u.uCam.value.copy(cam); this.u.uAlpha.value = 0.22 + 0.3 * L; this.drops.geometry.setDrawRange(0, Math.floor(this.n * Math.min(1, L * 1.1)) * 2); }
    // céu fechado / neblina (o céu recalcula a cada meio segundo; aqui só muda o fator)
    if (Math.abs((G.sky.rain || 0) - L) > 0.02 || (L === 0 && G.sky.rain)) { G.sky.rain = L; G.sky.setHour(G.state.hour); }
    // chão molhado: mais escuro e com reflexo especular
    for (const w of this.wet) { w.m.color.copy(w.c).multiplyScalar(1 - 0.38 * L); if (w.s) { w.m.specular.setRGB(w.s.r + 0.45 * L, w.s.g + 0.45 * L, w.s.b + 0.48 * L); w.m.shininess = w.sh + 70 * L; } }
    this.sound(dt);
  }
}
