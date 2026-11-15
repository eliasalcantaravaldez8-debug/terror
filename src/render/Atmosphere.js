import * as THREE from 'three';
import { Lensflare, LensflareElement } from 'three/examples/jsm/objects/Lensflare.js';

/**
 * Atmosphere layers on top of the physical sky:
 *  - an animated procedural cloud dome (fBm noise projected on a cloud plane, lit by the sun)
 *  - a lens flare on the sun
 *  - a screen-space "sun shafts" shader pass (radial light scattering)
 */
const CLOUD_VERT = /* glsl */`
  varying vec3 vDir;
  void main(){
    vDir = normalize(position);
    vec4 p = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * p;
    gl_Position.z = gl_Position.w * 0.9999; // behind everything but the sky
  }`;
const CLOUD_FRAG = /* glsl */`
  uniform float uTime, uCover, uDensity;
  uniform vec3 uSunDir, uSunColor, uSkyColor, uFogColor;
  varying vec3 vDir;
  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p){
    vec2 i = floor(p), f = fract(p); vec2 u = f*f*(3.0-2.0*f);
    return mix(mix(hash(i), hash(i+vec2(1,0)), u.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), u.x), u.y);
  }
  float fbm(vec2 p){ float s = 0.0, a = 0.5; for (int i = 0; i < 6; i++){ s += a * noise(p); p = p * 2.03 + vec2(1.7, 9.2); a *= 0.5; } return s; }
  void main(){
    vec3 d = normalize(vDir);
    if (d.y < 0.01) discard;
    vec2 uv = d.xz / (d.y + 0.08) * 0.9;
    vec2 wind = vec2(uTime * 0.006, uTime * 0.0025);
    float n = fbm(uv * 1.3 + wind);
    float detail = fbm(uv * 5.0 - wind * 2.0);
    float c = smoothstep(uCover, uCover + 0.28, n * 0.8 + detail * 0.25);
    // self-shadowing: sample toward the sun
    float n2 = fbm((uv + uSunDir.xz * 0.06) * 1.3 + wind);
    float shade = clamp(1.0 - (n2 - n) * 3.5, 0.45, 1.15);
    float sunAmt = pow(max(dot(d, uSunDir), 0.0), 8.0);
    vec3 col = mix(uSkyColor * 0.85, uSunColor, 0.35 + 0.4 * shade) * shade;
    col += uSunColor * sunAmt * (1.0 - c) * 0.6; // silver lining
    float horizon = smoothstep(0.0, 0.25, d.y);
    col = mix(uFogColor, col, horizon);
    float alpha = c * uDensity * smoothstep(0.01, 0.12, d.y);
    gl_FragColor = vec4(col, alpha);
    #include <colorspace_fragment>
  }`;

export const ShaftsShader = {
  uniforms: {
    tDiffuse: { value: null },
    uSun: { value: new THREE.Vector2(0.5, 0.5) },
    uIntensity: { value: 0 },
    uColor: { value: new THREE.Color(1, 0.8, 0.6) },
  },
  vertexShader: /* glsl */`varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
  fragmentShader: /* glsl */`
    uniform sampler2D tDiffuse; uniform vec2 uSun; uniform float uIntensity; uniform vec3 uColor; varying vec2 vUv;
    void main(){
      vec4 base = texture2D(tDiffuse, vUv);
      if (uIntensity <= 0.001) { gl_FragColor = base; return; }
      vec2 delta = (vUv - uSun) / 28.0 * 0.85;
      vec2 p = vUv; float illum = 0.0, decay = 1.0;
      for (int i = 0; i < 28; i++) {
        p -= delta;
        vec3 s = texture2D(tDiffuse, p).rgb;
        float l = max(dot(s, vec3(0.299, 0.587, 0.114)) - 0.74, 0.0);
        illum += l * decay; decay *= 0.94;
      }
      float falloff = 1.0 - smoothstep(0.0, 0.9, length((vUv - uSun) * vec2(1.6, 1.0)));
      gl_FragColor = vec4(base.rgb + uColor * illum * 0.055 * uIntensity * falloff, base.a);
    }`,
};

function flareTexture(size, draw) {
  const c = document.createElement('canvas'); c.width = c.height = size;
  draw(c.getContext('2d'), size);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export class Atmosphere {
  constructor(pipeline) {
    this.pipeline = pipeline;
    const mat = new THREE.ShaderMaterial({
      vertexShader: CLOUD_VERT, fragmentShader: CLOUD_FRAG, side: THREE.BackSide, transparent: true, depthWrite: false, fog: false,
      uniforms: {
        uTime: { value: 0 }, uCover: { value: 0.48 }, uDensity: { value: 0.9 },
        uSunDir: { value: pipeline.sunDir.clone() }, uSunColor: { value: new THREE.Color(1, 0.85, 0.7) },
        uSkyColor: { value: new THREE.Color(0.7, 0.75, 0.8) }, uFogColor: { value: new THREE.Color(0.6, 0.62, 0.64) },
      },
    });
    this.clouds = new THREE.Mesh(new THREE.SphereGeometry(1500, 48, 24), mat);
    this.clouds.renderOrder = -1;
    this.clouds.frustumCulled = false;
    pipeline.scene.add(this.clouds);

    // lens flare anchored far away along the sun direction
    const glow = flareTexture(256, (x, s) => { const g = x.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2); g.addColorStop(0, 'rgba(255,240,220,1)'); g.addColorStop(0.2, 'rgba(255,200,150,0.5)'); g.addColorStop(1, 'rgba(255,160,90,0)'); x.fillStyle = g; x.fillRect(0, 0, s, s); });
    const ring = flareTexture(128, (x, s) => { x.strokeStyle = 'rgba(180,200,255,0.35)'; x.lineWidth = 6; x.beginPath(); x.arc(s / 2, s / 2, s / 2 - 8, 0, 7); x.stroke(); });
    const dot = flareTexture(64, (x, s) => { const g = x.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2); g.addColorStop(0, 'rgba(255,220,180,0.6)'); g.addColorStop(1, 'rgba(255,220,180,0)'); x.fillStyle = g; x.fillRect(0, 0, s, s); });
    this.flareLight = new THREE.Object3D(); // empty anchor: no extra light cost
    this.flare = new Lensflare();
    this.flare.addElement(new LensflareElement(glow, 240, 0, new THREE.Color(1, 0.9, 0.8)));
    this.flare.addElement(new LensflareElement(dot, 60, 0.35));
    this.flare.addElement(new LensflareElement(ring, 110, 0.6));
    this.flare.addElement(new LensflareElement(dot, 90, 0.85));
    this.flare.addElement(new LensflareElement(ring, 160, 1.1));
    this.flareLight.add(this.flare);
    pipeline.scene.add(this.flareLight);
    this.shaftIntensity = 0;
  }

  /** Called when the time of day changes. preset: TIME_OF_DAY entry. */
  configure(t) {
    const u = this.clouds.material.uniforms;
    u.uSunDir.value.copy(this.pipeline.sunDir);
    u.uSunColor.value.setHex(t.sun);
    u.uSkyColor.value.setHex(t.sky);
    u.uFogColor.value.setHex(t.fog);
    u.uCover.value = t.cloudCover ?? 0.48;
    u.uDensity.value = t.cloudDensity ?? 0.9;
    this.shaftIntensity = t.shafts ?? 0.6;
  }

  setQuality(q) {
    this.clouds.visible = q.clouds !== false;
    this.flare.visible = q.flare !== false;
  }

  update(dt, camera, shaftsPass) {
    this.clouds.position.copy(camera.position);
    this.clouds.material.uniforms.uTime.value += dt;
    this.flareLight.position.copy(camera.position).addScaledVector(this.pipeline.sunDir, 1400);
    if (shaftsPass) {
      const sp = this.flareLight.position.clone().project(camera);
      const facing = camera.getWorldDirection(new THREE.Vector3()).dot(this.pipeline.sunDir);
      shaftsPass.uniforms.uSun.value.set(sp.x * 0.5 + 0.5, sp.y * 0.5 + 0.5);
      shaftsPass.uniforms.uIntensity.value = facing > 0.15 && sp.z < 1 ? this.shaftIntensity * Math.min(1, (facing - 0.15) * 2.5) : 0;
      shaftsPass.uniforms.uColor.value.copy(this.clouds.material.uniforms.uSunColor.value);
    }
  }
}
