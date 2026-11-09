import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { GTAOPass } from 'three/examples/jsm/postprocessing/GTAOPass.js';
import { Sky } from 'three/examples/jsm/objects/Sky.js';

export const QUALITY_PRESETS = {
  low: { pixelRatio: 0.75, shadows: true, shadowSize: 1024, shadowRange: 30, post: false, bloom: false, msaa: 0, rain: 700, particles: 0.5, fogBoost: 1.25, farLights: false },
  medium: { pixelRatio: 1.0, shadows: true, shadowSize: 2048, shadowRange: 45, post: true, bloom: true, ao: false, msaa: 2, rain: 1600, particles: 0.8, fogBoost: 1.0, farLights: true },
  high: { pixelRatio: 1.5, shadows: true, shadowSize: 4096, shadowRange: 60, post: true, bloom: true, ao: true, msaa: 4, rain: 3000, particles: 1.0, fogBoost: 1.0, farLights: true },
};

/** Cinematic grade: vignette, contrast, subtle desaturation, film grain, damage tint. */
const GradeShader = {
  uniforms: {
    tDiffuse: { value: null },
    uTime: { value: 0 },
    uVignette: { value: 0.32 },
    uDamage: { value: 0 },
    uSaturation: { value: 0.86 },
    uFlash: { value: 0 },
  },
  vertexShader: /* glsl */`varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
  fragmentShader: /* glsl */`
    uniform sampler2D tDiffuse; uniform float uTime, uVignette, uDamage, uSaturation, uFlash; varying vec2 vUv;
    float rand(vec2 c){ return fract(sin(dot(c, vec2(12.9898,78.233))) * 43758.5453); }
    void main(){
      vec4 c = texture2D(tDiffuse, vUv);
      vec3 col = c.rgb;
      float l = dot(col, vec3(0.299,0.587,0.114));
      col = mix(vec3(l), col, uSaturation - uDamage*0.5);
      col = mix(col, col*vec3(1.04,1.0,0.94), 0.6);           // warm highlights
      col = (col - 0.5) * 1.06 + 0.5;                          // contrast
      vec2 d = vUv - 0.5;
      float v = smoothstep(0.85, 0.2, length(d) * (1.0 + uVignette));
      col *= mix(1.0, v, 0.9);
      float edge = smoothstep(0.25, 0.75, length(d*vec2(1.2,1.0)));
      col = mix(col, vec3(0.45,0.02,0.02), edge * uDamage * 0.85);
      col += (rand(vUv*vec2(1920.0,1080.0) + uTime) - 0.5) * 0.025;
      col += uFlash;
      gl_FragColor = vec4(max(col, 0.0), c.a);
    }`,
};

export class RenderPipeline {
  constructor(container, settings) {
    this.settings = settings;
    this.container = container;
    this.renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance', stencil: false });
    const r = this.renderer;
    r.outputColorSpace = THREE.SRGBColorSpace;
    r.toneMapping = THREE.ACESFilmicToneMapping;
    r.toneMappingExposure = 1.0;
    r.shadowMap.enabled = true;
    r.shadowMap.type = THREE.PCFSoftShadowMap;
    r.autoClear = false;
    container.appendChild(r.domElement);
    r.domElement.id = 'game-canvas';

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, 16 / 9, 0.05, 2500);
    this.vmScene = new THREE.Scene();
    this.vmCamera = new THREE.PerspectiveCamera(66, 16 / 9, 0.01, 10);

    this._setupEnvironment();
    this.applyQuality(settings.get('quality'));
    window.addEventListener('resize', () => this.resize());
    this.resize();
  }

  _setupEnvironment() {
    const scene = this.scene;
    // Sky dome (physically based scattering), low morning sun behind overcast haze.
    const sky = new Sky();
    sky.scale.setScalar(4000);
    const u = sky.material.uniforms;
    u.turbidity.value = 9;
    u.rayleigh.value = 1.6;
    u.mieCoefficient.value = 0.012;
    u.mieDirectionalG.value = 0.86;
    const sun = new THREE.Vector3();
    const elevation = 9, azimuth = 120;
    const phi = THREE.MathUtils.degToRad(90 - elevation), theta = THREE.MathUtils.degToRad(azimuth);
    sun.setFromSphericalCoords(1, phi, theta);
    u.sunPosition.value.copy(sun);
    this.sunDir = sun.clone().normalize();
    this.sky = sky;
    scene.add(sky);

    // Environment map for PBR reflections built from the sky.
    const pmrem = new THREE.PMREMGenerator(this.renderer);
    const envScene = new THREE.Scene();
    const sky2 = new Sky(); sky2.scale.setScalar(1000);
    Object.assign(sky2.material.uniforms.turbidity, { value: 10 });
    sky2.material.uniforms.rayleigh.value = 1.6;
    sky2.material.uniforms.mieCoefficient.value = 0.012;
    sky2.material.uniforms.mieDirectionalG.value = 0.86;
    sky2.material.uniforms.sunPosition.value.copy(sun);
    envScene.add(sky2);
    const ground = new THREE.Mesh(new THREE.CircleGeometry(900, 16), new THREE.MeshBasicMaterial({ color: 0x3a3732 }));
    ground.rotation.x = -Math.PI / 2; ground.position.y = -5;
    envScene.add(ground);
    this.envMap = pmrem.fromScene(envScene, 0.02).texture;
    scene.environment = this.envMap;
    this.vmScene.environment = this.envMap;
    pmrem.dispose();

    scene.fog = new THREE.FogExp2(0x9ea4a6, 0.0062);
    this.baseFogDensity = 0.0062;

    const hemi = new THREE.HemisphereLight(0xb9c6d2, 0x4a4136, 0.75);
    scene.add(hemi);
    const dir = new THREE.DirectionalLight(0xffd2a1, 2.4);
    dir.position.copy(sun).multiplyScalar(150);
    dir.castShadow = true;
    dir.shadow.bias = -0.0004;
    dir.shadow.normalBias = 0.03;
    scene.add(dir);
    scene.add(dir.target);
    this.sunLight = dir;
    this.hemi = hemi;

    // Viewmodel lighting mirrors the world.
    this.vmScene.add(new THREE.HemisphereLight(0xc4ced8, 0x5a5044, 1.35));
    const vdir = new THREE.DirectionalLight(0xffd2a1, 2.2);
    vdir.position.copy(sun);
    this.vmScene.add(vdir);
    this.vmSun = vdir;
    this.vmFlash = new THREE.PointLight(0xffb060, 0, 3, 2);
    this.vmFlash.position.set(0.1, -0.05, -0.8);
    this.vmScene.add(this.vmFlash);
  }

  applyQuality(name) {
    const q = QUALITY_PRESETS[name] || QUALITY_PRESETS.medium;
    this.quality = q;
    this.qualityName = name;
    const r = this.renderer;
    r.setPixelRatio(Math.min(window.devicePixelRatio || 1, q.pixelRatio));
    r.shadowMap.enabled = q.shadows;
    const s = this.sunLight.shadow;
    if (s.mapSize.x !== q.shadowSize) {
      s.mapSize.set(q.shadowSize, q.shadowSize);
      s.map?.dispose(); s.map = null;
    }
    const cam = s.camera;
    cam.left = cam.bottom = -q.shadowRange;
    cam.right = cam.top = q.shadowRange;
    cam.near = 1; cam.far = 400;
    cam.updateProjectionMatrix();
    this.scene.fog.density = this.baseFogDensity * q.fogBoost;
    this._buildComposer();
    this.scene.traverse((o) => { if (o.material) { const m = Array.isArray(o.material) ? o.material : [o.material]; m.forEach((mm) => (mm.needsUpdate = true)); } });
    this.resize();
  }

  _buildComposer() {
    this.composer?.dispose?.();
    this.composer = null;
    const q = this.quality;
    if (!q.post) return;
    const size = this.renderer.getDrawingBufferSize(new THREE.Vector2());
    const rt = new THREE.WebGLRenderTarget(Math.max(1, size.x), Math.max(1, size.y), { type: THREE.HalfFloatType, samples: q.msaa });
    const composer = new EffectComposer(this.renderer, rt);
    const world = new RenderPass(this.scene, this.camera);
    composer.addPass(world);
    if (q.ao) {
      // ground-truth ambient occlusion: contact shadows under cars, in corners, around characters
      const ao = new GTAOPass(this.scene, this.camera, size.x, size.y);
      ao.output = GTAOPass.OUTPUT.Default;
      ao.blendIntensity = 0.9;
      ao.updateGtaoMaterial({ radius: 0.6, distanceExponent: 1.5, thickness: 1.2, scale: 1.0, samples: 12 });
      composer.addPass(ao);
      this.ao = ao;
    }
    const vm = new RenderPass(this.vmScene, this.vmCamera);
    vm.clear = false;
    vm.clearDepth = true;
    composer.addPass(vm);
    if (q.bloom) {
      this.bloom = new UnrealBloomPass(new THREE.Vector2(size.x, size.y), q.ao ? 0.35 : 0.25, 0.5, 0.92);
      composer.addPass(this.bloom);
    }
    this.grade = new ShaderPass(GradeShader);
    composer.addPass(this.grade);
    composer.addPass(new OutputPass());
    this.composer = composer;
  }

  resize() {
    const w = window.innerWidth, h = window.innerHeight;
    this.renderer.setSize(w, h);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.vmCamera.aspect = w / h;
    this.vmCamera.updateProjectionMatrix();
    if (this.composer) {
      this.composer.setPixelRatio(this.renderer.getPixelRatio());
      this.composer.setSize(w, h);
    }
  }

  /** Keep the shadow frustum centred on the area of interest (texel-snapped). */
  updateShadowFocus(focus) {
    const d = this.sunLight;
    const range = this.quality.shadowRange;
    const texel = (range * 2) / this.quality.shadowSize;
    const fx = Math.round(focus.x / texel) * texel, fz = Math.round(focus.z / texel) * texel;
    d.target.position.set(fx, 0, fz);
    d.position.set(fx + this.sunDir.x * 150, this.sunDir.y * 150, fz + this.sunDir.z * 150);
    d.target.updateMatrixWorld();
  }

  render(dt, fx = {}) {
    const r = this.renderer;
    this.vmCamera.position.set(0, 0, 0);
    this.vmCamera.quaternion.identity();
    if (this.composer) {
      this.grade.uniforms.uTime.value += dt;
      this.grade.uniforms.uDamage.value = fx.damage || 0;
      this.grade.uniforms.uFlash.value = fx.flash || 0;
      this.composer.render(dt);
    } else {
      r.setRenderTarget(null);
      r.clear();
      r.render(this.scene, this.camera);
      r.clearDepth();
      r.render(this.vmScene, this.vmCamera);
    }
  }
}
