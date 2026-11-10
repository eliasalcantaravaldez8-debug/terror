// Terreno, água, vegetação instanciada (com vento), rochas e partículas.
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { Water } from 'three/examples/jsm/objects/Water.js';
import { makeNoise2D, fbm, rng } from './noise.js';
import { presetTextures, textureSizeFor } from './textures.js';

export const shared = { time: { value: 0 }, wind: { value: 0.3 } };

// ───────── Terreno ─────────
export function buildTerrain(e, materials, quality) {
  const p = e.props;
  const size = p.size || 400;
  const res = Math.min(Math.max(p.resolution || 256, 32), quality === 'low' ? 128 : 512);
  const noise = makeNoise2D(p.seed || 1);
  const hs = p.heightScale ?? 6;
  const ns = p.noiseScale ?? 0.012;
  const flat = p.flattenCenter ?? 0;
  const heights = new Float32Array((res + 1) * (res + 1));
  const geo = new THREE.PlaneGeometry(size, size, res, res);
  geo.rotateX(-Math.PI / 2);
  const pos = geo.attributes.position;
  const colors = new Float32Array(pos.count * 3);
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i); const z = pos.getZ(i);
    let h = fbm(noise, x * ns, z * ns, p.octaves || 5) * hs * 2;
    h += Math.max(0, fbm(noise, x * ns * 0.25 + 100, z * ns * 0.25, 3)) * hs * 3; // colinas largas
    const d = Math.hypot(x, z);
    if (flat > 0) h *= THREE.MathUtils.smoothstep(d, flat * 0.6, flat * 1.6);
    const edge = THREE.MathUtils.smoothstep(Math.max(Math.abs(x), Math.abs(z)), size * 0.42, size * 0.5);
    h = h * (1 - edge) - edge * 2;
    pos.setY(i, h);
    heights[i] = h;
  }
  geo.computeVertexNormals();
  const nrm = geo.attributes.normal;
  for (let i = 0; i < pos.count; i++) {
    // Tinta por inclinação: encostas íngremes mais escuras/rochosas, topos levemente mais claros.
    const slope = 1 - nrm.getY(i);
    const t = THREE.MathUtils.clamp(slope * 3.2, 0, 1);
    const hl = THREE.MathUtils.clamp(pos.getY(i) / (hs * 4 + 0.001), -0.3, 0.3);
    colors[i * 3] = THREE.MathUtils.lerp(1, 0.62, t) + hl * 0.2;
    colors[i * 3 + 1] = THREE.MathUtils.lerp(1, 0.58, t) + hl * 0.2;
    colors[i * 3 + 2] = THREE.MathUtils.lerp(1, 0.55, t) + hl * 0.1;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  const matDef = materials[p.material] || { preset: 'grass', textureScale: 40 };
  const tex = presetTextures(matDef.preset || 'grass', textureSizeFor(quality));
  const rep = (matDef.textureScale || 40) * (size / 400);
  const mk = (t) => { const c = t.clone(); c.repeat.set(rep, rep); c.needsUpdate = true; return c; };
  const mat = new THREE.MeshStandardMaterial({
    map: mk(tex.map), normalMap: mk(tex.normalMap), roughnessMap: mk(tex.ormMap), aoMap: mk(tex.ormMap), aoMapIntensity: 0.5,
    vertexColors: true, roughness: 1, metalness: 0, color: matDef.color ? new THREE.Color(matDef.color) : 0xffffff,
  });
  // Macro-variação para quebrar a repetição da textura em grandes distâncias.
  mat.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vWorldPosT;')
      .replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\nvWorldPosT = (modelMatrix * vec4(transformed,1.0)).xyz;');
    shader.fragmentShader = shader.fragmentShader.replace('#include <common>', `#include <common>
      varying vec3 vWorldPosT;
      float hashT(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
      float vnoiseT(vec2 p){ vec2 i=floor(p); vec2 f=fract(p); f=f*f*(3.0-2.0*f);
        return mix(mix(hashT(i),hashT(i+vec2(1,0)),f.x), mix(hashT(i+vec2(0,1)),hashT(i+vec2(1,1)),f.x), f.y); }`)
      .replace('#include <map_fragment>', `#include <map_fragment>
      float macro = vnoiseT(vWorldPosT.xz * 0.02) * 0.6 + vnoiseT(vWorldPosT.xz * 0.11) * 0.4;
      diffuseColor.rgb *= mix(0.78, 1.15, macro);`);
  };
  const mesh = new THREE.Mesh(geo, mat);
  mesh.receiveShadow = true;
  mesh.name = e.name;
  const step = size / res;
  const heightAt = (wx, wz) => {
    const gx = (wx + size / 2) / step; const gz = (wz + size / 2) / step;
    if (gx < 0 || gz < 0 || gx >= res || gz >= res) return -2;
    const x0 = Math.floor(gx); const z0 = Math.floor(gz); const fx = gx - x0; const fz = gz - z0;
    const h = (x, z) => heights[z * (res + 1) + x];
    return THREE.MathUtils.lerp(THREE.MathUtils.lerp(h(x0, z0), h(x0 + 1, z0), fx), THREE.MathUtils.lerp(h(x0, z0 + 1), h(x0 + 1, z0 + 1), fx), fz);
  };
  return { object: mesh, heightAt, size };
}

// ───────── Água ─────────
export function buildWater(e, quality, sunDir) {
  const [w, d] = e.props.size || [100, 100];
  const geo = new THREE.PlaneGeometry(w, d, 1, 1);
  if (quality === 'low') {
    const m = new THREE.Mesh(geo, new THREE.MeshPhysicalMaterial({ color: e.props.color || '#1e5f74', roughness: 0.08, metalness: 0, transparent: true, opacity: 0.85, transmission: 0.2 }));
    m.rotation.x = -Math.PI / 2;
    return { object: m };
  }
  const normals = presetTextures('water', 256, 11).normalMap.clone();
  normals.repeat.set(1, 1);
  const water = new Water(geo, {
    textureWidth: quality === 'ultra' ? 1024 : 512, textureHeight: quality === 'ultra' ? 1024 : 512,
    waterNormals: normals, sunDirection: sunDir.clone(), sunColor: 0xffffff,
    waterColor: new THREE.Color(e.props.color || '#1e5f74'), distortionScale: 2.2 * (e.props.waveScale ?? 1), fog: true,
  });
  water.rotation.x = -Math.PI / 2;
  water.material.uniforms.size.value = 6;
  return { object: water, update: (dt, _t, sun) => { water.material.uniforms.time.value += dt * 0.6; if (sun) water.material.uniforms.sunDirection.value.copy(sun); } };
}

// ───────── Vegetação ─────────
function windify(material, strength = 1, rigid = false) {
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = shared.time;
    shader.uniforms.uWind = shared.wind;
    shader.vertexShader = shader.vertexShader.replace('#include <common>', '#include <common>\nuniform float uTime; uniform float uWind;')
      .replace('#include <begin_vertex>', `#include <begin_vertex>
        #ifdef USE_INSTANCING
          vec3 ip = vec3(instanceMatrix[3][0], instanceMatrix[3][1], instanceMatrix[3][2]);
        #else
          vec3 ip = vec3(0.0);
        #endif
        float bend = ${rigid ? 'max(position.y - 1.5, 0.0) * 0.04' : 'position.y * position.y'};
        float wave = sin(uTime * 1.7 + ip.x * 0.35 + ip.z * 0.25) + sin(uTime * 3.1 + ip.x * 0.8) * 0.35;
        transformed.x += wave * bend * uWind * ${strength.toFixed(2)};
        transformed.z += cos(uTime * 1.3 + ip.z * 0.4) * bend * uWind * ${(strength * 0.6).toFixed(2)};`);
  };
  return material;
}

function grassGeometry() {
  const blades = [];
  for (let i = 0; i < 3; i++) {
    const g = new THREE.BufferGeometry();
    const h = 0.45 + i * 0.12; const w = 0.06;
    g.setAttribute('position', new THREE.Float32BufferAttribute([-w, 0, 0, w, 0, 0, -w * 0.6, h * 0.55, 0.02, w * 0.6, h * 0.55, 0.02, 0, h, 0.06], 3));
    g.setAttribute('normal', new THREE.Float32BufferAttribute([0, 0.6, 0.8, 0, 0.6, 0.8, 0, 0.7, 0.7, 0, 0.7, 0.7, 0, 0.9, 0.4], 3));
    g.setAttribute('color', new THREE.Float32BufferAttribute([0.35, 0.45, 0.2, 0.35, 0.45, 0.2, 0.75, 0.85, 0.45, 0.75, 0.85, 0.45, 1, 1, 0.7], 3));
    g.setIndex([0, 1, 2, 1, 3, 2, 2, 3, 4]);
    g.rotateY((i / 3) * Math.PI + i * 0.4);
    g.translate((i - 1) * 0.05, 0, (i % 2) * 0.05);
    blades.push(g);
  }
  return mergeGeometries(blades);
}

function displacedBlob(radius, detail, seed, squash = 1) {
  const g = new THREE.IcosahedronGeometry(radius, detail);
  const n = makeNoise2D(seed);
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const v = new THREE.Vector3().fromBufferAttribute(p, i);
    const k = 1 + n(v.x * 1.7 + seed, v.z * 1.7 + v.y) * 0.55;
    v.multiplyScalar(k); v.y *= squash;
    p.setXYZ(i, v.x, v.y, v.z);
  }
  g.computeVertexNormals();
  return g;
}

function treeParts(kind, seed) {
  const r = rng(seed);
  if (kind === 'pines') {
    const trunk = new THREE.CylinderGeometry(0.12, 0.28, 3, 7); trunk.translate(0, 1.5, 0);
    const cones = [];
    for (let i = 0; i < 4; i++) { const c = new THREE.ConeGeometry(2.2 - i * 0.45, 2.6, 9, 1); c.translate(0, 2.4 + i * 1.35, 0); cones.push(c); }
    return { trunk, foliage: mergeGeometries(cones), foliageColor: '#2c4a2a', trunkColor: '#4a3626' };
  }
  if (kind === 'dead_trees') {
    const parts = [];
    const t = new THREE.CylinderGeometry(0.1, 0.3, 5.5, 6); t.translate(0, 2.75, 0); parts.push(t);
    for (let i = 0; i < 6; i++) {
      const b = new THREE.CylinderGeometry(0.03, 0.09, 1.6 + r() * 1.4, 4);
      b.translate(0, 0.8, 0); b.rotateZ(0.7 + r() * 0.6); b.rotateY(r() * Math.PI * 2); b.translate(0, 2.4 + i * 0.5, 0); parts.push(b);
    }
    return { trunk: mergeGeometries(parts), foliage: null, trunkColor: '#2a2420' };
  }
  if (kind === 'bushes') return { trunk: null, foliage: mergeGeometries([displacedBlob(0.8, 2, seed, 0.8).translate(0, 0.5, 0), displacedBlob(0.6, 2, seed + 3, 0.8).translate(0.6, 0.4, 0.2)]), foliageColor: '#35602a' };
  const trunk = new THREE.CylinderGeometry(0.14, 0.32, 3.2, 8); trunk.translate(0, 1.6, 0);
  const blobs = [];
  for (let i = 0; i < 5; i++) blobs.push(displacedBlob(1.3 + r() * 0.5, 2, seed + i, 0.85).translate((r() - 0.5) * 1.8, 3.6 + r() * 1.4, (r() - 0.5) * 1.8));
  return { trunk, foliage: mergeGeometries(blobs), foliageColor: '#3d6b2a', trunkColor: '#4b3626' };
}

export function buildVegetation(e, ctx) {
  const p = e.props;
  const mult = { low: 0.15, medium: 0.45, high: 1, ultra: 1.6 }[ctx.quality] ?? 1;
  const isGrass = p.kind === 'grass' || p.kind === 'flowers';
  const count = Math.floor(Math.min(p.count || 100, isGrass ? 300_000 : 20_000) * mult);
  const [aw, ad] = p.area || [100, 100];
  const r = rng(p.seed || 1);
  const avoid = p.avoidCenter || 0;
  const group = new THREE.Group();
  group.name = e.name;
  const base = new THREE.Vector3(...e.transform.position);
  const placements = [];
  let tries = 0;
  while (placements.length < count && tries < count * 3) {
    tries++;
    const x = base.x + (r() - 0.5) * aw; const z = base.z + (r() - 0.5) * ad;
    if (avoid && Math.hypot(x - base.x, z - base.z) < avoid) continue;
    if (p.avoidRoad && ctx.isOnRoad?.(x, z)) continue;
    const y = ctx.groundAt(x, z);
    if (y < -0.5 && !isGrass) continue;
    if (ctx.waterLevelAt && y < ctx.waterLevelAt(x, z)) continue;
    placements.push([x, y, z]);
  }
  const dummy = new THREE.Object3D();
  const fill = (mesh, scaleFn, tilt = 0) => {
    placements.forEach(([x, y, z], i) => {
      dummy.position.set(x, y, z);
      dummy.rotation.set((r() - 0.5) * tilt, r() * Math.PI * 2, (r() - 0.5) * tilt);
      const s = scaleFn();
      dummy.scale.set(s, s * (0.85 + r() * 0.3), s);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingSphere();
  };
  const minS = p.minScale ?? 0.8; const maxS = p.maxScale ?? 1.3;
  if (p.kind === 'grass') {
    const mat = windify(new THREE.MeshStandardMaterial({ vertexColors: true, color: p.color || '#5f8a3a', roughness: 0.95, side: THREE.DoubleSide }), 0.6);
    const mesh = new THREE.InstancedMesh(grassGeometry(), mat, placements.length);
    fill(mesh, () => 0.7 + r() * 0.9);
    mesh.receiveShadow = true;
    group.add(mesh);
  } else if (p.kind === 'flowers') {
    const stem = new THREE.CylinderGeometry(0.01, 0.01, 0.35, 3).translate(0, 0.17, 0);
    const head = new THREE.IcosahedronGeometry(0.06, 0).translate(0, 0.37, 0);
    const mat = windify(new THREE.MeshStandardMaterial({ vertexColors: false, roughness: 0.8 }), 0.5);
    const mesh = new THREE.InstancedMesh(mergeGeometries([stem, head]), mat, placements.length);
    fill(mesh, () => 0.8 + r() * 0.6);
    const palette = ['#f472b6', '#facc15', '#f8fafc', '#a78bfa', '#fb923c', '#60a5fa'].map((c) => new THREE.Color(c));
    for (let i = 0; i < placements.length; i++) mesh.setColorAt(i, palette[Math.floor(r() * palette.length)]);
    group.add(mesh);
  } else if (p.kind === 'rocks' || p.kind === 'mushrooms') {
    const geo = p.kind === 'rocks' ? displacedBlob(0.7, 2, p.seed || 3, 0.6) : mergeGeometries([new THREE.CylinderGeometry(0.04, 0.06, 0.25, 6).translate(0, 0.12, 0), new THREE.SphereGeometry(0.16, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2).translate(0, 0.24, 0)]);
    const tex = presetTextures('rock', textureSizeFor(ctx.quality));
    const mat = p.kind === 'rocks' ? new THREE.MeshStandardMaterial({ map: tex.map, normalMap: tex.normalMap, roughnessMap: tex.ormMap, roughness: 1 }) : new THREE.MeshStandardMaterial({ color: '#b91c1c', roughness: 0.6 });
    const mesh = new THREE.InstancedMesh(geo, mat, placements.length);
    fill(mesh, () => (p.kind === 'rocks' ? 0.3 + r() * 2.2 : 0.8 + r()), 0.4);
    mesh.castShadow = ctx.quality !== 'low'; mesh.receiveShadow = true;
    group.add(mesh);
    if (p.kind === 'rocks') ctx.addColliders(placements.map(([x, y, z]) => ({ x, z, r: 0.6, top: y + 0.6 })));
  } else {
    const parts = treeParts(p.kind, p.seed || 5);
    const scales = placements.map(() => minS + r() * (maxS - minS));
    const place = (mesh) => {
      placements.forEach(([x, y, z], i) => {
        dummy.position.set(x, y - 0.1, z);
        dummy.rotation.set((r() - 0.5) * 0.08, r() * Math.PI * 2, (r() - 0.5) * 0.08);
        dummy.scale.setScalar(scales[i]);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      });
      mesh.instanceMatrix.needsUpdate = true;
      mesh.computeBoundingSphere();
      mesh.castShadow = ctx.quality !== 'low';
      mesh.receiveShadow = true;
    };
    if (parts.trunk) {
      const bark = presetTextures('bark', textureSizeFor(ctx.quality));
      const tm = new THREE.InstancedMesh(parts.trunk, windify(new THREE.MeshStandardMaterial({ map: bark.map, normalMap: bark.normalMap, color: parts.trunkColor, roughness: 0.95 }), 1, true), placements.length);
      place(tm); group.add(tm);
    }
    if (parts.foliage) {
      const fm = new THREE.InstancedMesh(parts.foliage, windify(new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.85 }), 1, true), placements.length);
      place(fm);
      const base2 = new THREE.Color(p.color || parts.foliageColor);
      const hsl = {}; base2.getHSL(hsl);
      for (let i = 0; i < placements.length; i++) fm.setColorAt(i, new THREE.Color().setHSL(hsl.h + (r() - 0.5) * 0.05, hsl.s * (0.8 + r() * 0.4), hsl.l * (0.75 + r() * 0.5)));
      group.add(fm);
    }
    ctx.addColliders(placements.map(([x, y, z], i) => ({ x, z, r: 0.35 * scales[i], top: y + 6 })));
  }
  return { object: group };
}

// ───────── Partículas ─────────
export function buildParticles(e) {
  const preset = e.props.preset || 'fire';
  const n = Math.min(e.props.rate || 200, 2000);
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(n * 3); const life = new Float32Array(n); const vel = new Float32Array(n * 3);
  const r = rng(9);
  const spawn = (i) => {
    const spread = preset === 'fireflies' ? 12 : preset === 'dust' ? 6 : 0.4;
    pos[i * 3] = (r() - 0.5) * spread; pos[i * 3 + 1] = preset === 'fireflies' ? r() * 3 : 0; pos[i * 3 + 2] = (r() - 0.5) * spread;
    vel[i * 3] = (r() - 0.5) * 0.4; vel[i * 3 + 1] = preset === 'smoke' ? 0.6 + r() : preset === 'fire' ? 1.2 + r() * 1.5 : preset === 'sparks' ? 2 + r() * 3 : (r() - 0.5) * 0.3; vel[i * 3 + 2] = (r() - 0.5) * 0.4;
    life[i] = r();
  };
  for (let i = 0; i < n; i++) spawn(i);
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const color = new THREE.Color(e.props.color || { fire: '#ff7a1a', smoke: '#555555', sparks: '#ffd166', magic: '#a78bfa', dust: '#c2a878', fireflies: '#d9f99d' }[preset]);
  const mat = new THREE.PointsMaterial({ color, size: preset === 'smoke' ? 0.8 : preset === 'fireflies' ? 0.12 : 0.25, transparent: true, opacity: preset === 'smoke' ? 0.35 : 0.9,
    blending: preset === 'smoke' ? THREE.NormalBlending : THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true });
  const points = new THREE.Points(geo, mat);
  const maxLife = preset === 'smoke' ? 4 : preset === 'fireflies' ? 6 : 1.2;
  return {
    object: points,
    update: (dt) => {
      for (let i = 0; i < n; i++) {
        life[i] += dt / maxLife;
        if (life[i] >= 1) { spawn(i); life[i] = 0; }
        pos[i * 3] += vel[i * 3] * dt; pos[i * 3 + 1] += vel[i * 3 + 1] * dt; pos[i * 3 + 2] += vel[i * 3 + 2] * dt;
        if (preset === 'fireflies') { pos[i * 3] += Math.sin(life[i] * 20 + i) * dt * 0.3; }
      }
      geo.attributes.position.needsUpdate = true;
    },
  };
}

// ───────── Clima: chuva e neve ─────────
export function buildPrecipitation(kind, intensity = 0.6) {
  const n = Math.floor((kind === 'rain' ? 9000 : 5000) * intensity);
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(n * (kind === 'rain' ? 6 : 3));
  const r = rng(77);
  const area = 60;
  const seeds = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) { seeds[i * 3] = (r() - 0.5) * area; seeds[i * 3 + 1] = r() * 40; seeds[i * 3 + 2] = (r() - 0.5) * area; }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const obj = kind === 'rain'
    ? new THREE.LineSegments(geo, new THREE.LineBasicMaterial({ color: 0x9fb7cc, transparent: true, opacity: 0.35, depthWrite: false }))
    : new THREE.Points(geo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.12, transparent: true, opacity: 0.9, depthWrite: false }));
  obj.frustumCulled = false;
  const speed = kind === 'rain' ? 22 : 1.6;
  return {
    object: obj,
    update: (dt, camPos, wind = 0.3) => {
      for (let i = 0; i < n; i++) {
        seeds[i * 3 + 1] -= speed * dt;
        if (kind === 'snow') { seeds[i * 3] += Math.sin(seeds[i * 3 + 1] * 0.5 + i) * dt * 0.5; }
        if (seeds[i * 3 + 1] < 0) seeds[i * 3 + 1] += 40;
        const x = camPos.x + seeds[i * 3] + wind * seeds[i * 3 + 1] * 0.3; const y = camPos.y - 8 + seeds[i * 3 + 1]; const z = camPos.z + seeds[i * 3 + 2];
        if (kind === 'rain') { pos.set([x, y, z, x + wind * 0.15, y + 0.6, z], i * 6); } else { pos.set([x, y, z], i * 3); }
      }
      geo.attributes.position.needsUpdate = true;
    },
  };
}
