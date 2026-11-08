// Céu em degradê, sol/lua, estrelas e presets de iluminação leves (sem pós-processamento pesado).
import * as THREE from 'three';
import { nightMats } from './materials.js';
import { setHeadlights } from './vehicle.js';

export const TIMES = {
  dia: { label: 'Dia', top: 0x3f7fd0, horizon: 0xbcd6ee, bottom: 0x8aa0b0, sun: [0.35, 0.8, 0.45], sunColor: 0xfff3dd, sunI: 2.8, hemiSky: 0xbfd8ff, hemiGround: 0x6a6050, hemiI: 1.4, fog: 0xb9cfe0, fogD: 0.0032, night: 0, exposure: 1.0 },
  entardecer: { label: 'Entardecer', top: 0x2a3a6a, horizon: 0xf09a5a, bottom: 0x5a4a50, sun: [-0.7, 0.16, 0.45], sunColor: 0xffb878, sunI: 2.6, hemiSky: 0xa8b0d8, hemiGround: 0x6a5848, hemiI: 1.45, fog: 0xb09080, fogD: 0.0036, night: 0.5, exposure: 1.15 },
  noite: { label: 'Noite', top: 0x050812, horizon: 0x1a2440, bottom: 0x0a0c14, sun: [0.3, 0.6, -0.5], sunColor: 0x8aa0d8, sunI: 0.6, hemiSky: 0x40508a, hemiGround: 0x2a2420, hemiI: 0.8, fog: 0x161c2c, fogD: 0.0055, night: 1, exposure: 1.25 },
};

export class Sky {
  constructor(scene, renderer, far = 340) {
    this.far = far;
    this.scene = scene; this.renderer = renderer;
    this.uniforms = { top: { value: new THREE.Color() }, horizon: { value: new THREE.Color() }, bottom: { value: new THREE.Color() }, sunDir: { value: new THREE.Vector3() }, sunCol: { value: new THREE.Color() } };
    const m = new THREE.ShaderMaterial({
      uniforms: this.uniforms, side: THREE.BackSide, depthWrite: false, fog: false,
      vertexShader: 'varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
      fragmentShader: `uniform vec3 top; uniform vec3 horizon; uniform vec3 bottom; uniform vec3 sunDir; uniform vec3 sunCol; varying vec3 vP;
        void main(){ float h = vP.y; vec3 c = h > 0.0 ? mix(horizon, top, pow(min(1.0, h * 1.6), 0.7)) : mix(horizon, bottom, min(1.0, -h * 4.0));
          float s = max(0.0, dot(normalize(vP), normalize(sunDir)));
          c += sunCol * (pow(s, 600.0) * 1.5 + pow(s, 12.0) * 0.25);
          gl_FragColor = vec4(c, 1.0); }`,
    });
    this.dome = new THREE.Mesh(new THREE.SphereGeometry(1, 24, 12), m);
    this.dome.frustumCulled = false; this.dome.renderOrder = -1; this.dome.scale.setScalar(far * 0.92);
    scene.add(this.dome);
    // estrelas
    const sg = new THREE.BufferGeometry(); const pts = [];
    for (let i = 0; i < 900; i++) { const v = new THREE.Vector3().randomDirection(); if (v.y < 0.05) v.y = Math.abs(v.y) + 0.05; v.normalize().multiplyScalar(far * 0.88); pts.push(v.x, v.y, v.z); }
    sg.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    this.stars = new THREE.Points(sg, new THREE.PointsMaterial({ color: 0xffffff, size: 1.6, sizeAttenuation: false, fog: false, transparent: true, opacity: 0 }));
    this.stars.frustumCulled = false;
    scene.add(this.stars);
    this.hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
    scene.add(this.hemi);
    this.sun = new THREE.DirectionalLight(0xffffff, 2);
    scene.add(this.sun, this.sun.target);
    scene.fog = new THREE.FogExp2(0x888888, 0.004);
    this.sunDir = new THREE.Vector3();
    this.night = 0;
  }
  setShadows(enabled, size, extent) {
    this.sun.castShadow = enabled;
    if (enabled) {
      this.sun.shadow.mapSize.set(size, size);
      const c = this.sun.shadow.camera;
      c.left = -extent; c.right = extent; c.top = extent; c.bottom = -extent; c.near = 1; c.far = 400;
      c.updateProjectionMatrix();
      this.sun.shadow.bias = -0.0006; this.sun.shadow.normalBias = 0.03;
      this.extent = extent; this.size = size;
    }
  }
  apply(name) {
    const t = TIMES[name]; this.current = name;
    this.uniforms.top.value.setHex(t.top); this.uniforms.horizon.value.setHex(t.horizon); this.uniforms.bottom.value.setHex(t.bottom);
    this.sunDir.set(...t.sun).normalize();
    this.uniforms.sunDir.value.copy(this.sunDir);
    this.uniforms.sunCol.value.setHex(t.sunColor).multiplyScalar(t.night > 0.9 ? 0.6 : 1);
    this.sun.color.setHex(t.sunColor); this.sun.intensity = t.sunI;
    this.hemi.color.setHex(t.hemiSky); this.hemi.groundColor.setHex(t.hemiGround); this.hemi.intensity = t.hemiI;
    this.scene.fog.color.setHex(t.fog); this.scene.fog.density = t.fogD;
    this.renderer.toneMappingExposure = t.exposure;
    this.stars.material.opacity = t.night > 0.9 ? 0.9 : t.night > 0.4 ? 0.2 : 0;
    this.night = t.night;
    for (const n of nightMats) {
      const v = n.base + (n.night - n.base) * t.night;
      if (n.opacity) n.mat.opacity = v;
      else n.mat.emissiveIntensity = v;
    }
    setHeadlights(t.night > 0.4);
  }
  follow(x, z) {
    this.dome.position.set(x, 0, z); this.stars.position.set(x, 0, z);
    // luz direcional acompanha o jogador; posição "presa" a texels para evitar tremulação das sombras
    let sx = x, sz = z;
    if (this.sun.castShadow) {
      const texel = (this.extent * 2) / this.size;
      sx = Math.round(x / texel) * texel; sz = Math.round(z / texel) * texel;
    }
    this.sun.target.position.set(sx, 0, sz);
    this.sun.position.set(sx + this.sunDir.x * 150, this.sunDir.y * 150, sz + this.sunDir.z * 150);
  }
}
