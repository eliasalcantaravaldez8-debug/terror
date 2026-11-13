import * as THREE from 'three';

/**
 * GPU-instanced billboard particles, CPU simulated.
 * One system per blend mode / texture. Supports per-particle size growth,
 * rotation, colour/alpha fades, gravity, drag and buoyancy.
 */
const VERT = /* glsl */`
  attribute vec3 iPos; attribute vec4 iColor; attribute vec2 iSizeRot;
  varying vec2 vUv; varying vec4 vColor; varying float vFogDepth;
  void main(){
    vUv = position.xy + 0.5;
    vColor = iColor;
    vec4 mv = modelViewMatrix * vec4(iPos, 1.0);
    float c = cos(iSizeRot.y), s = sin(iSizeRot.y);
    vec2 p = vec2(c*position.x - s*position.y, s*position.x + c*position.y) * iSizeRot.x;
    mv.xy += p;
    vFogDepth = -mv.z;
    gl_Position = projectionMatrix * mv;
  }`;
const FRAG = /* glsl */`
  uniform sampler2D map; uniform vec3 fogColor; uniform float fogDensity; uniform vec3 tint;
  varying vec2 vUv; varying vec4 vColor; varying float vFogDepth;
  void main(){
    vec4 t = texture2D(map, vUv);
    vec4 c = vec4(t.rgb * vColor.rgb * tint, t.a * vColor.a);
    float fog = 1.0 - exp(-fogDensity*fogDensity*vFogDepth*vFogDepth);
    c.rgb = mix(c.rgb, fogColor, fog * FOG_MIX);
    #ifdef ADDITIVE
      c.rgb *= c.a; c.a *= (1.0 - fog);
    #endif
    if (c.a < 0.003) discard;
    gl_FragColor = c;
    #include <colorspace_fragment>
  }`;

export class ParticleSystem {
  constructor(scene, { max = 1000, texture, additive = false, fog = null, tint = 0xffffff, renderOrder = 10 }) {
    this.max = max;
    const g = new THREE.InstancedBufferGeometry();
    const quad = new THREE.PlaneGeometry(1, 1);
    g.index = quad.index;
    g.setAttribute('position', quad.attributes.position);
    this.aPos = new THREE.InstancedBufferAttribute(new Float32Array(max * 3), 3).setUsage(THREE.DynamicDrawUsage);
    this.aCol = new THREE.InstancedBufferAttribute(new Float32Array(max * 4), 4).setUsage(THREE.DynamicDrawUsage);
    this.aSR = new THREE.InstancedBufferAttribute(new Float32Array(max * 2), 2).setUsage(THREE.DynamicDrawUsage);
    g.setAttribute('iPos', this.aPos);
    g.setAttribute('iColor', this.aCol);
    g.setAttribute('iSizeRot', this.aSR);
    g.instanceCount = 0;
    this.geometry = g;
    this.material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms: {
        map: { value: texture },
        fogColor: { value: fog ? fog.color : new THREE.Color(0x999999) },
        fogDensity: { value: fog ? fog.density : 0 },
        tint: { value: new THREE.Color(tint) },
      },
      defines: { FOG_MIX: additive ? '0.0' : '1.0', ...(additive ? { ADDITIVE: '' } : {}) },
      transparent: true,
      depthWrite: false,
      blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
    });
    this.fog = fog;
    this.mesh = new THREE.Mesh(g, this.material);
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = renderOrder;
    scene.add(this.mesh);

    // simulation state (structure of arrays)
    this.n = 0;
    this.px = new Float32Array(max); this.py = new Float32Array(max); this.pz = new Float32Array(max);
    this.vx = new Float32Array(max); this.vy = new Float32Array(max); this.vz = new Float32Array(max);
    this.life = new Float32Array(max); this.maxLife = new Float32Array(max);
    this.s0 = new Float32Array(max); this.s1 = new Float32Array(max);
    this.rot = new Float32Array(max); this.rotV = new Float32Array(max);
    this.r = new Float32Array(max); this.g = new Float32Array(max); this.b = new Float32Array(max);
    this.a0 = new Float32Array(max); this.grav = new Float32Array(max); this.drag = new Float32Array(max);
    this.fadeIn = new Float32Array(max);
  }

  /** opts: {x,y,z, vx,vy,vz, life, size, endSize, color:[r,g,b], alpha, gravity, drag, rotV, fadeIn} */
  spawn(o) {
    let i;
    if (this.n < this.max) i = this.n++;
    else i = Math.floor(Math.random() * this.max); // recycle
    this.px[i] = o.x; this.py[i] = o.y; this.pz[i] = o.z;
    this.vx[i] = o.vx || 0; this.vy[i] = o.vy || 0; this.vz[i] = o.vz || 0;
    this.life[i] = 0; this.maxLife[i] = o.life || 1;
    this.s0[i] = o.size || 1; this.s1[i] = o.endSize ?? o.size ?? 1;
    this.rot[i] = o.rot ?? Math.random() * 6.28; this.rotV[i] = o.rotV ?? (Math.random() - 0.5);
    const c = o.color || [1, 1, 1];
    this.r[i] = c[0]; this.g[i] = c[1]; this.b[i] = c[2];
    this.a0[i] = o.alpha ?? 1; this.grav[i] = o.gravity ?? 0; this.drag[i] = o.drag ?? 0;
    this.fadeIn[i] = o.fadeIn ?? 0.1;
  }

  _kill(i) {
    const j = --this.n;
    if (i === j) return;
    for (const arr of [this.px, this.py, this.pz, this.vx, this.vy, this.vz, this.life, this.maxLife, this.s0, this.s1, this.rot, this.rotV, this.r, this.g, this.b, this.a0, this.grav, this.drag, this.fadeIn]) arr[i] = arr[j];
  }

  update(dt, wind = null) {
    const wx = wind ? wind.x : 0, wz = wind ? wind.z : 0;
    for (let i = 0; i < this.n; i++) {
      this.life[i] += dt;
      if (this.life[i] >= this.maxLife[i]) { this._kill(i); i--; continue; }
      const d = Math.exp(-this.drag[i] * dt);
      this.vx[i] = this.vx[i] * d + wx * dt * 0.3;
      this.vz[i] = this.vz[i] * d + wz * dt * 0.3;
      this.vy[i] = this.vy[i] * d - this.grav[i] * dt;
      this.px[i] += this.vx[i] * dt; this.py[i] += this.vy[i] * dt; this.pz[i] += this.vz[i] * dt;
      if (this.py[i] < 0.02 && this.grav[i] > 0) { this.py[i] = 0.02; this.vy[i] *= -0.25; this.vx[i] *= 0.6; this.vz[i] *= 0.6; }
      this.rot[i] += this.rotV[i] * dt;
    }
    const P = this.aPos.array, C = this.aCol.array, S = this.aSR.array;
    for (let i = 0; i < this.n; i++) {
      const t = this.life[i] / this.maxLife[i];
      const fi = this.fadeIn[i] > 0 ? Math.min(1, t / this.fadeIn[i]) : 1;
      const a = this.a0[i] * fi * (1 - t) * (1 - t * 0.3);
      P[i * 3] = this.px[i]; P[i * 3 + 1] = this.py[i]; P[i * 3 + 2] = this.pz[i];
      C[i * 4] = this.r[i]; C[i * 4 + 1] = this.g[i]; C[i * 4 + 2] = this.b[i]; C[i * 4 + 3] = a;
      S[i * 2] = this.s0[i] + (this.s1[i] - this.s0[i]) * Math.sqrt(t); S[i * 2 + 1] = this.rot[i];
    }
    this.geometry.instanceCount = this.n;
    this.aPos.needsUpdate = this.aCol.needsUpdate = this.aSR.needsUpdate = true;
    if (this.fog) { this.material.uniforms.fogDensity.value = this.fog.density; }
  }

  clear() { this.n = 0; this.geometry.instanceCount = 0; }
}
