// Constrói e mantém a cena 3D a partir do documento do projeto: ambiente (céu físico, sol,
// ciclo dia/noite, neblina, clima), entidades, colisores e consulta de altura do chão.
import * as THREE from 'three';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { buildTerrain, buildWater, buildVegetation, buildParticles, buildPrecipitation, shared } from './nature.js';
import { buildCharacter, MixerAnimator } from './character.js';
import { buildStadium, buildGoal, buildCabin, buildHouse, buildRoad, buildMisc, buildVehicle, buildBall, buildPrimitive } from './structures.js';
import { buildMaterial } from './textures.js';

const DEG = Math.PI / 180;

export class World {
  constructor(renderer, doc, { assetUrl, stream = false, streamCenter = null } = {}) {
    this.stream = stream;
    this.streamCenter = streamCenter;
    this.streamDistance = doc.settings?.rendering?.streamDistance || 220;
    this.renderer = renderer;
    this.doc = doc;
    this.assetUrl = assetUrl || (() => null);
    this.scene = new THREE.Scene();
    this.entities = new Map(); // id → { e, object, animator?, update?, ... }
    this.colliders = []; // { min: Vector3, max: Vector3, entityId }
    this.circleColliders = []; // { x, z, r, top }
    this.updaters = [];
    this.terrain = null;
    this.waterLevels = [];
    this.roads = [];
    this.nightLights = [];
    this.time = 0;
    this.quality = doc.settings?.rendering?.quality || 'high';
    this.sunDir = new THREE.Vector3(0.4, 1, 0.3).normalize();
    this.pmrem = new THREE.PMREMGenerator(renderer);
  }

  groundAt(x, z, fromY = Infinity) {
    let h = this.terrain ? this.terrain.heightAt(x - this.terrain.offset.x, z - this.terrain.offset.z) + this.terrain.offset.y : 0;
    for (const c of this.colliders) {
      if (x >= c.min.x && x <= c.max.x && z >= c.min.z && z <= c.max.z && c.max.y <= fromY + 0.45 && c.max.y > h && c.walkable) h = c.max.y;
    }
    return h;
  }

  async build() {
    const doc = this.doc;
    // Materiais com textura importada (asset do projeto): carrega antes de construir a cena.
    this.materials = { ...doc.materials };
    await Promise.all(Object.entries(doc.materials || {}).filter(([, m]) => m.map).map(async ([id, m]) => {
      const asset = (doc.assets || []).find((a) => a.id === m.map);
      const url = asset && this.assetUrl(asset);
      if (!url) return;
      try {
        const tex = await new THREE.TextureLoader().loadAsync(url);
        tex.colorSpace = THREE.SRGBColorSpace; tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.anisotropy = 8;
        tex.repeat.set(m.textureScale || 1, m.textureScale || 1);
        this.materials[id] = { ...m, __texture: tex };
      } catch (err) { console.warn('Textura não carregada', err); }
    }));
    this.buildEnvironment();
    // Terreno primeiro (os demais objetos se apoiam nele).
    for (const e of doc.entities.filter((x) => x.type === 'terrain')) this.addEntity(e);
    for (const e of doc.entities.filter((x) => x.type === 'water')) this.waterLevels.push(e.transform.position[1]);
    for (const e of doc.entities.filter((x) => x.type === 'structure' && x.props?.kind === 'road')) this.addEntity(e);
    const rest = doc.entities.filter((x) => x.type !== 'terrain' && !(x.type === 'structure' && x.props?.kind === 'road'));
    const models = [];
    for (const e of rest) {
      if (e.type === 'model' || ((e.type === 'character' || e.type === 'npc') && e.props?.model)) models.push(e); else this.addEntity(e);
    }
    await Promise.all(models.map((e) => this.addModel(e)));
    // Hierarquia (parent)
    for (const { e, object } of this.entities.values()) {
      if (e.parent && this.entities.has(e.parent)) this.entities.get(e.parent).object.add(object);
    }
    for (const rec of this.entities.values()) if (rec.e.type !== 'model') this.applyStyleTo(rec.object);
    this.applyEnvironment(true);
  }

  // ───────── Ambiente ─────────
  buildEnvironment() {
    const env = this.doc.settings.environment;
    const r = this.doc.settings.rendering;
    this.sky = new Sky();
    this.sky.scale.setScalar(10000);
    this.scene.add(this.sky);
    this.sun = new THREE.DirectionalLight('#fff4e0', 2.2);
    this.sun.castShadow = r.shadows?.enabled !== false && this.quality !== 'low';
    const ms = Math.min(r.shadows?.mapSize || 2048, this.quality === 'ultra' ? 4096 : this.quality === 'high' ? 2048 : 1024);
    this.sun.shadow.mapSize.set(ms, ms);
    this.sun.shadow.bias = -0.0004;
    this.sun.shadow.normalBias = 0.03;
    this.sun.shadow.radius = r.shadows?.softness ?? 2;
    const sc = this.sun.shadow.camera;
    sc.left = sc.bottom = -70; sc.right = sc.top = 70; sc.near = 1; sc.far = 400;
    this.scene.add(this.sun, this.sun.target);
    this.hemi = new THREE.HemisphereLight('#bcd7ff', '#3b2f22', 0.5);
    this.scene.add(this.hemi);
    this.moon = new THREE.DirectionalLight('#8fa8ff', 0);
    this.scene.add(this.moon);
    this.scene.fog = env.fog?.enabled ? new THREE.FogExp2(env.fog.color, env.fog.density) : null;
    // Estrelas
    const starGeo = new THREE.BufferGeometry();
    const pts = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000; i++) { const v = new THREE.Vector3().randomDirection(); if (v.y < 0) v.y *= -1; v.multiplyScalar(4000); pts.set([v.x, v.y, v.z], i * 3); }
    starGeo.setAttribute('position', new THREE.BufferAttribute(pts, 3));
    this.stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: '#ffffff', size: 2, sizeAttenuation: false, transparent: true, opacity: 0, fog: false }));
    this.scene.add(this.stars);
    if (env.weather?.rain?.enabled) { this.rain = buildPrecipitation('rain', env.weather.rain.intensity); this.scene.add(this.rain.object); }
    if (env.weather?.snow?.enabled) { this.snow = buildPrecipitation('snow', env.weather.snow.intensity); this.scene.add(this.snow.object); }
    this.timeOfDay = env.timeOfDay ?? 14;
    this.lightning = 0;
  }

  applyEnvironment(rebuildEnvMap = false) {
    const env = this.doc.settings.environment;
    const t = this.timeOfDay;
    // Sol: nasce às 6h, pôr do sol às 18h.
    const dayAngle = ((t - 6) / 12) * Math.PI;
    const elevation = Math.sin(dayAngle) * 75 * DEG;
    const azimuth = (180 + ((t - 12) / 12) * 120) * DEG;
    this.sunDir.setFromSphericalCoords(1, Math.PI / 2 - elevation, azimuth);
    const u = this.sky.material.uniforms;
    const storm = env.weather?.rain?.enabled ? env.weather.rain.intensity : 0;
    u.turbidity.value = (env.sky?.turbidity ?? 6) + storm * 10;
    u.rayleigh.value = (env.sky?.rayleigh ?? 1.6) * (1 - storm * 0.6);
    u.mieCoefficient.value = env.sky?.mieCoefficient ?? 0.005;
    u.mieDirectionalG.value = env.sky?.mieDirectionalG ?? 0.8;
    u.sunPosition.value.copy(this.sunDir).multiplyScalar(1000);
    const day = THREE.MathUtils.clamp(this.sunDir.y * 4 + 0.15, 0, 1);
    const golden = THREE.MathUtils.clamp(1 - Math.abs(this.sunDir.y) * 5, 0, 1);
    this.sun.position.copy(this.sunDir).multiplyScalar(150);
    this.sun.intensity = day * 4.2 * (1 - storm * 0.35);
    this.sun.color.setHSL(0.1 - golden * 0.05, 0.6 + golden * 0.3, 0.9 - golden * 0.25);
    this.dayFactor = day;
    // Visibilidade mínima à noite (jogabilidade): luar e ambiente nunca caem a ponto de não se ver nada.
    const bright = this.brightness || 1;
    this.moon.intensity = (1 - day) * 0.6 * bright;
    this.moon.position.set(-this.sunDir.x * 100, Math.abs(this.sunDir.y) * 100 + 30, -this.sunDir.z * 100);
    const amb = env.ambientIntensity ?? 0.35;
    // Piso de luz ambiente (dia e noite): mesmo que o projeto peça pouca luz, o chão e o caminho continuam visíveis.
    // Sol baixo (manhã/fim de tarde) ilumina pouco o chão: o céu compensa.
    const lowSun = 1 + (1 - THREE.MathUtils.clamp(this.sunDir.y, 0, 1)) * 1.1;
    this.hemi.intensity = (Math.max(amb * (0.4 + day * 2.4), 0.6 * (1 - day) + 1.2 * day * lowSun) + this.lightning * 3) * bright;
    this.hemi.color.setHSL(0.6, 0.5, 0.45 + day * 0.35);
    this.stars.material.opacity = (1 - day) * (1 - storm);
    const artificial = this.nightLights.some((l) => l.isDirectionalLight) && day < 0.6;
    // O céu físico é muito luminoso: a exposição base é reduzida e o sol/ambiente compensam.
    this.renderer.toneMappingExposure = Math.max(env.exposure ?? 0.9, 0.8) * (artificial ? 1.05 : 0.88 + day * 0.07) * bright;
    if (this.scene.fog) {
      const base = new THREE.Color(env.fog.color);
      const night = new THREE.Color('#0d1220');
      this.scene.fog.color.copy(night).lerp(base, Math.max(day, 0.08));
      // Neblina limitada para o jogador sempre enxergar o caminho próximo.
      this.scene.fog.density = Math.min((env.fog.density ?? 0.003) * (1 + storm * 1.5), 0.012);
    }
    for (const l of this.nightLights) l.visible = day < 0.6;
    if (rebuildEnvMap) {
      // Mapa de ambiente a partir do céu para reflexos PBR coerentes com a hora do dia.
      const envScene = new THREE.Scene();
      const skyClone = new Sky(); skyClone.scale.setScalar(1000);
      Object.entries(u).forEach(([k, v]) => { skyClone.material.uniforms[k].value = v.value?.clone ? v.value.clone() : v.value; });
      envScene.add(skyClone);
      this.envRT?.dispose();
      this.envRT = this.pmrem.fromScene(envScene, 0.04);
      this.scene.environment = this.envRT.texture;
      this.scene.environmentIntensity = 0.25 + day * 0.75;
      this.lastEnvTime = t;
    }
  }

  // ───────── Entidades ─────────
  place(object, e) {
    const [x, y, z] = e.transform.position;
    const [rx, ry, rz] = e.transform.rotation;
    object.position.set(x, y, z);
    object.rotation.set(rx * DEG, ry * DEG, rz * DEG);
    object.scale.set(...e.transform.scale);
    object.visible = e.visible !== false;
  }

  registerColliders(e, list, object) {
    if (!list?.length) return;
    object.updateMatrixWorld(true);
    for (const c of list) {
      const b = new THREE.Box3(new THREE.Vector3(...c.min), new THREE.Vector3(...c.max)).applyMatrix4(object.matrixWorld);
      this.colliders.push({ min: b.min, max: b.max, entityId: e.id, walkable: b.max.y - b.min.y < 1.3 || c.walkable });
    }
  }

  addEntity(e) {
    const q = this.quality;
    const ctx = {
      quality: q,
      groundAt: (x, z) => this.groundAt(x, z),
      isOnRoad: (x, z) => this.roads.some((rd) => rd.isOnRoad(x, z)),
      waterLevelAt: () => (this.waterLevels.length ? Math.max(...this.waterLevels) : -Infinity),
      addColliders: (list) => this.circleColliders.push(...list),
    };
    let built;
    try {
      switch (e.type) {
        case 'terrain': built = buildTerrain(e, this.materials, q); break;
        case 'water': built = buildWater(e, q, this.sunDir); break;
        case 'vegetation': built = buildVegetation(e, ctx); break;
        case 'particles': built = buildParticles(e); break;
        case 'character': case 'npc': built = buildCharacter(e, q); break;
        case 'vehicle': built = buildVehicle(e, q); break;
        case 'ball': built = buildBall(e, q); break;
        case 'primitive': built = buildPrimitive(e, this.materials, q); break;
        case 'light': built = this.buildLight(e); break;
        case 'structure': {
          const k = e.props?.kind;
          built = k === 'stadium' ? buildStadium(e, q) : k === 'goal' ? buildGoal(e, q) : k === 'cabin' ? buildCabin(e, q)
            : k === 'house' ? buildHouse(e, q) : k === 'road' ? buildRoad(e, q) : buildMisc(e, q);
          break;
        }
        case 'pickup': built = this.buildPickup(e); break;
        case 'trigger': case 'spawn': case 'audio_source': built = { object: this.helper(e) }; break;
        default: built = { object: new THREE.Group() };
      }
    } catch (err) {
      console.error('Falha ao construir', e.name, err);
      built = { object: new THREE.Group(), error: String(err.message) };
    }
    const object = built.object;
    object.name = e.name;
    object.userData.entityId = e.id;
    object.traverse((o) => { o.userData.entityId = e.id; });
    if (e.type === 'vegetation') object.position.set(0, 0, 0); // vegetação já usa coordenadas de mundo
    else this.place(object, e);
    if (e.type === 'terrain') { this.terrain = { ...built, offset: object.position.clone() }; }
    if (built.road) this.roads.push({ isOnRoad: (x, z) => built.isOnRoad(x - object.position.x, z - object.position.z), curve: built.curve, object });
    // Objetos "apoiados": personagens/pickups/estruturas sobre o terreno quando y == 0
    if (['character', 'npc', 'structure', 'pickup', 'vehicle', 'trigger', 'spawn'].includes(e.type) && this.terrain && e.transform.position[1] <= 0.6 && e.props?.kind !== 'road') {
      object.position.y = this.groundAt(object.position.x, object.position.z) + (e.type === 'pickup' ? e.transform.position[1] : e.transform.position[1]);
    }
    this.scene.add(object);
    this.registerColliders(e, built.colliders, object);
    if (built.lights) for (const l of built.lights) if (built.nightLights || e.props?.kind === 'lamp_post') this.nightLights.push(l);
    const rec = { e, object, ...built };
    this.entities.set(e.id, rec);
    if (built.update) { const fn = (dt) => built.update(dt, this.time, this.sunDir); fn.__id = e.id; this.updaters.push(fn); }
    return rec;
  }

  /**
   * Modelos GLB (importados ou produzidos pela NEXPLAY FORGE): LODs, colisão, animações e marcador provisório.
   * Também atende personagens/NPCs com props.model (animações idle/walk/run do arquivo via MixerAnimator).
   */
  async addModel(e) {
    const isChar = e.type === 'character' || e.type === 'npc';
    const ref = isChar ? e.props?.model : e.props?.asset;
    const urlOf = (id) => { const a = (this.doc.assets || []).find((x) => x.id === id); return a && this.assetUrl(a); };
    const url = ref && urlOf(ref);
    const group = new THREE.Group();
    const rec = { e, object: group, height: e.props?.height || 1.8 };
    this.place(group, e);
    group.userData.entityId = e.id;
    this.scene.add(group);
    this.entities.set(e.id, rec);
    if (!url) {
      if (e.props?.pendingJob || ref) group.add(this.placeholder(e));
      return rec;
    }
    if (this.stream && !isChar && this.streamCenter && group.position.distanceTo(this.streamCenter) > this.streamDistance) {
      rec.deferred = { load: () => this.loadModelInto(rec, url, e, urlOf, isChar) };
      group.add(this.placeholder(e, true));
      return rec;
    }
    await this.loadModelInto(rec, url, e, urlOf, isChar);
    return rec;
  }

  async loadModelInto(rec, url, e, urlOf, isChar) {
    const group = rec.object;
    try {
      const loader = new GLTFLoader();
      const gltf = await loader.loadAsync(url);
      const prep = (root) => root.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; if (o.material?.vertexColors === false && o.geometry.attributes.color) o.material.vertexColors = true; } o.userData.entityId = e.id; });
      prep(gltf.scene);
      group.clear();
      const lodIds = (!isChar && e.props?.lods) || [];
      if (lodIds.length) {
        const lod = new THREE.LOD();
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const size = box.getSize(new THREE.Vector3()).length() || 1;
        const base = Math.max(15, size * 8) * (1 - (e.props.lodBias || 0));
        lod.addLevel(gltf.scene, 0);
        const levels = await Promise.all(lodIds.map((id) => urlOf(id)).filter(Boolean).map((u) => loader.loadAsync(u).catch(() => null)));
        levels.forEach((lv, i) => { if (lv) { prep(lv.scene); lod.addLevel(lv.scene, base * (i === 0 ? 1 : 2.5 * i)); } });
        group.add(lod);
        rec.lod = lod;
      } else group.add(gltf.scene);
      if (gltf.animations.length) {
        rec.mixer = new THREE.AnimationMixer(gltf.scene);
        rec.clips = gltf.animations;
        if (isChar) rec.animator = new MixerAnimator(rec.mixer, gltf.animations, e.components?.animation?.clip || 'idle');
        else {
          const name = e.components?.animation?.clip;
          const clip = gltf.animations.find((a) => a.name === name) || gltf.animations[0];
          rec.action = rec.mixer.clipAction(clip).play();
          const fn = (dt) => rec.mixer.update(dt); fn.__id = e.id; this.updaters.push(fn);
        }
      }
      const c = e.props?.collision;
      if (!isChar && c?.type === 'box' && e.components?.physics?.body === 'static') this.registerColliders(e, [{ min: c.min, max: c.max }], group);
      if (this.terrain && e.transform.position[1] <= 0.6) group.position.y = this.groundAt(group.position.x, group.position.z) + e.transform.position[1];
      this.applyStyleTo(group);
    } catch (err) {
      console.error('Falha ao carregar modelo', err);
      rec.loadError = String(err.message || err);
      group.add(this.placeholder(e));
    }
  }

  /** Marcador provisório (asset em produção na FORGE ou não carregado). */
  placeholder(e, streaming = false) {
    const sizes = { character: [0.6, 1.8, 0.4], creature: [0.8, 1.6, 0.8], vehicle: [2, 1.4, 4.4], building: [8, 8, 8], house: [7, 6, 7], tree: [3, 7, 3], item: [0.4, 0.4, 0.4] };
    const [w, h, d] = sizes[e.props?.category] || (e.type === 'character' || e.type === 'npc' ? sizes.character : [1, 1, 1]);
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), new THREE.MeshBasicMaterial({ color: streaming ? '#334155' : '#a78bfa', wireframe: !streaming, transparent: true, opacity: streaming ? 0.15 : 0.6 }));
    m.position.y = h / 2;
    m.userData.entityId = e.id;
    m.userData.placeholder = true;
    return m;
  }

  /** Aplica o estilo visual do projeto (identidade consistente). */
  applyStyleTo(root) {
    const style = this.doc.artStyle;
    if (style !== 'lowpoly' && style !== 'voxel') return;
    root.traverse((o) => {
      if (!o.isMesh || o.userData.placeholder) return;
      for (const m of Array.isArray(o.material) ? o.material : [o.material]) {
        if (!m || !('flatShading' in m)) continue;
        m.flatShading = true;
        if (style === 'lowpoly') m.normalMap = null;
        m.needsUpdate = true;
      }
    });
  }

  /** Carregamento inteligente: modelos distantes só carregam quando o jogador se aproxima. */
  updateStreaming(center) {
    if (!this.stream) return;
    for (const rec of this.entities.values()) {
      if (!rec.deferred || rec.loading) continue;
      if (rec.object.position.distanceTo(center) < this.streamDistance) {
        rec.loading = true;
        const d = rec.deferred; rec.deferred = null;
        d.load().finally(() => { rec.loading = false; });
      }
    }
  }

  buildLight(e) {
    const p = e.props;
    let l;
    if (p.kind === 'directional') {
      // A luz direcional principal é o sol do ambiente; esta entidade ajusta cor/intensidade base.
      this.sun.color.set(p.color || '#fff4e0');
      return { object: new THREE.Group() };
    }
    if (p.kind === 'hemisphere') { this.hemi.color.set(p.color || '#bcd7ff'); this.hemi.groundColor.set(p.groundColor || '#3b2f22'); return { object: new THREE.Group() }; }
    if (p.kind === 'spot') {
      l = new THREE.SpotLight(p.color || '#fff', p.intensity ?? 20, p.distance ?? 30, (p.angle ?? 30) * DEG, 0.5, 1.5);
      l.castShadow = !!p.castShadow && this.quality !== 'low';
      l.shadow.mapSize.set(1024, 1024);
      const g = new THREE.Group(); g.add(l, l.target); l.target.position.set(0, 0, 10);
      return { object: g, attachToCamera: p.attachToCamera, light: l };
    }
    l = new THREE.PointLight(p.color || '#fff', p.intensity ?? 10, p.distance ?? 20, 2);
    l.castShadow = !!p.castShadow && this.quality !== 'low';
    return { object: l, light: l };
  }

  buildPickup(e) {
    const glow = e.props.glow || '#facc15';
    const g = new THREE.Group();
    const item = e.props.item;
    const mesh = item === 'page'
      ? new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.4), new THREE.MeshStandardMaterial({ color: '#f5f5f4', emissive: glow, emissiveIntensity: 0.3, side: THREE.DoubleSide }))
      : item === 'wood' ? new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.7, 8), buildMaterial({ preset: 'bark' }, { quality: this.quality }))
        : new THREE.Mesh(new THREE.OctahedronGeometry(0.25, 0), new THREE.MeshStandardMaterial({ color: glow, emissive: glow, emissiveIntensity: 1.5, metalness: 0.6, roughness: 0.2 }));
    if (item === 'wood') mesh.rotation.z = Math.PI / 2;
    mesh.castShadow = true;
    g.add(mesh);
    const light = new THREE.PointLight(glow, 1.5, 4, 2); light.position.y = 0.3; g.add(light);
    return { object: g, update: (dt, t) => { mesh.rotation.y += dt * 1.5; mesh.position.y = Math.sin(t * 2 + e.transform.position[0]) * 0.08; } };
  }

  helper(e) {
    const s = e.props?.size || [1, 1, 1];
    const m = new THREE.Mesh(new THREE.BoxGeometry(...s), new THREE.MeshBasicMaterial({ color: e.type === 'trigger' ? '#22d3ee' : '#a78bfa', wireframe: true, transparent: true, opacity: 0.5 }));
    m.userData.editorOnly = true;
    return m;
  }

  removeEntity(id) {
    const rec = this.entities.get(id);
    if (!rec) return;
    rec.object.parent?.remove(rec.object);
    rec.object.traverse((o) => { o.geometry?.dispose?.(); });
    this.entities.delete(id);
    this.colliders = this.colliders.filter((c) => c.entityId !== id);
    if (rec.update) this.updaters = this.updaters.filter((u) => u.__id !== id);
  }

  update(dt, camera) {
    this.time += dt;
    shared.time.value = this.time;
    const env = this.doc.settings.environment;
    shared.wind.value = (env.weather?.wind ?? 0.3) + (env.weather?.rain?.enabled ? 0.4 : 0);
    if (env.dayNightCycle?.enabled) {
      this.timeOfDay = (this.timeOfDay + (dt / ((env.dayNightCycle.minutesPerDay || 20) * 60)) * 24) % 24;
    }
    if (env.weather?.lightning) {
      this.lightning = Math.max(0, this.lightning - dt * 4);
      if (Math.random() < dt * 0.06) { this.lightning = 1; this.onThunder?.(); }
    }
    this.applyEnvironment(env.dayNightCycle?.enabled && Math.abs(this.timeOfDay - (this.lastEnvTime ?? 0)) > 0.5);
    // Sombra do sol acompanha a câmera (cascata única ajustada).
    if (camera) {
      const target = camera.position.clone();
      this.sun.target.position.copy(target);
      this.sun.position.copy(target).addScaledVector(this.sunDir, 150);
      this.rain?.update(dt, camera.position, shared.wind.value);
      this.snow?.update(dt, camera.position, shared.wind.value);
    }
    for (const u of this.updaters) u(dt);
    this.streamTimer = (this.streamTimer || 0) + dt;
    if (this.stream && camera && this.streamTimer > 0.5) { this.streamTimer = 0; this.updateStreaming(camera.position); }
  }

  dispose() {
    this.scene.traverse((o) => {
      o.geometry?.dispose?.();
      const mats = Array.isArray(o.material) ? o.material : o.material ? [o.material] : [];
      for (const m of mats) m.dispose?.();
    });
    this.envRT?.dispose();
    this.pmrem.dispose();
  }
}
