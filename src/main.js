// ENTRE SOMBRAS — jogo de mundo aberto 3D (Three.js / WebGL).
import * as THREE from 'three';
import { GRADED_TONEMAPPING } from './grade.js';
import { Grass } from './grass.js';
import { Batcher } from './geo.js';
import { CollisionWorld } from './collision.js';
import { City, LAYOUT, N, P, ROAD, HALF, roadC, blockC, BLOCK } from './city.js';
const P_ = P;
import { Zones } from './zones.js';
import { PLACES, BW, bwRoad, bwRoadZ, bwBlock, bwBlockZ, RIVER } from './places.js';
import { Blackwood, BW_LAYOUT } from './blackwood.js';
import { Story } from './story.js';
import { Phone, VIBE } from './phone.js';
import { ETHAN_MISSIONS } from './missions_ethan.js';
import { RYAN_MISSIONS } from './missions_ryan.js';
import { SIDE_MISSIONS } from './missions_side.js';
import { ChaseDriver, RouteDriver } from './drivers.js';
import { Humanoid } from './humanoid.js';
import { sfx } from './audio.js';
import * as SAVE from './save.js';
import { CustomShop } from './custom.js';
import { PerfMeter } from './perf.js';
import { Weapons, WEAPONS, WEAPON_ORDER, weaponIcon } from './weapons.js';
import { Airplane } from './plane.js';
import { UltraPost } from './post.js';
import { itemIcon, handItem } from './products.js';
import { shopKind } from './city.js';
import { Vehicle, CAR_COLORS, updateSirens, MOTO_TYPES, CAR_LIST, CAR_TYPES } from './vehicle.js';
import { Player } from './player.js';
import { ThirdPersonCamera } from './camera.js';
import { NPC } from './npc.js';
import { CHARACTERS, randomPedestrian, shopkeeperLook, policeLook, SHOP_LINES, PED_LINES, POLICE_LINES } from './characters.js';
import { TrafficLights, spawnTraffic } from './traffic.js';
import { Sky, TIMES } from './sky.js';
import { EngineAudio } from './audio.js';
import { rand, pick, setSeed, rr, glowTex, blobTex } from './textures.js';

// ---------------- CONFIGURAÇÕES ----------------
const DEFAULTS = { sensitivity: 1.0, invertY: false, quality: 'media', autoFollow: true, fov: 68, showFps: true, time: 'entardecer', sound: true, adaptive: true, autoDialog: false, freeWeapons: true };
function loadSettings() {
  try { return { ...DEFAULTS, ...JSON.parse(localStorage.getItem('entreSombras.settings') || '{}') }; } catch (e) { return { ...DEFAULTS }; }
}
function saveSettings() { try { localStorage.setItem('entreSombras.settings', JSON.stringify(settings)); } catch (e) { /* ignora */ } }
const settings = loadSettings();
const QUALITY = {
  baixa: { label: 'Baixa', pr: 0.75, aa: false, shadows: false, size: 512, extent: 40, peds: 40, traffic: 11, far: 320, lamps: 0, soft: false, grass: 0, shadowEvery: 1 },
  media: { label: 'Média', pr: 1.0, aa: false, shadows: true, size: 2048, extent: 42, peds: 70, traffic: 18, far: 400, lamps: 4, soft: false, grass: 48, shadowEvery: 2 },
  alta: { label: 'Alta', pr: Math.min(window.devicePixelRatio || 1, 1.5), aa: true, shadows: true, size: 2048, extent: 60, peds: 95, traffic: 24, far: 480, lamps: 8, soft: true, grass: 75, shadowEvery: 1 },
  // ULTRA: placas dedicadas (RX 580, GTX 1060 ou melhor): resolução cheia, sombras 4096 maiores, MSAA 4x + bloom,
  // mais luzes reais, grama densa e distante, mais pessoas e carros, objetos detalhados até mais longe
  ultra: { label: 'Ultra', pr: Math.min(window.devicePixelRatio || 1, 2), aa: false, shadows: true, size: 4096, extent: 75, peds: 115, traffic: 30, far: 650, lamps: 14, soft: true, grass: 115, shadowEvery: 1, ultra: true, lodMul: 1.8 },
};
const Q = QUALITY[settings.quality] || QUALITY.media;
Humanoid.detail = { baixa: 0, media: 1, alta: 2, ultra: 2 }[settings.quality] ?? 1;
const LODM = Q.lodMul || 1; // distâncias de detalhe (maiores no Ultra)

const $ = (id) => document.getElementById(id);
const loadingText = (t) => { const el = $('loading-text'); if (el) el.textContent = t; };

// ---------------- RENDERIZADOR ----------------
const renderer = new THREE.WebGLRenderer({ antialias: Q.aa, powerPreference: 'high-performance' });
renderer.setPixelRatio(Q.pr);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = GRADED_TONEMAPPING; // ACES + correção de cor (grade.js), sem custo extra
renderer.shadowMap.enabled = Q.shadows;
renderer.shadowMap.type = Q.soft ? THREE.PCFSoftShadowMap : THREE.PCFShadowMap;
// identifica a placa de vídeo (mostrado no menu de opções)
let gpuName = '';
try { const gl = renderer.getContext(); const ext = gl.getExtension('WEBGL_debug_renderer_info'); gpuName = ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER); } catch (e) { gpuName = ''; }
let pixelRatio = Q.pr;
$('game').appendChild(renderer.domElement);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(settings.fov, window.innerWidth / window.innerHeight, 0.1, Q.far);
let post = null; try { if (Q.ultra) post = new UltraPost(renderer, scene, camera); } catch (e) { console.warn('Pós-processamento indisponível', e); post = null; }
const renderFrame = () => { if (post) post.render(G.sky ? G.sky.night || 0 : 0); else renderer.render(scene, camera); };
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight); if (post) post.setSize();
});

const G = {}; // estado global do jogo (exposto para testes em window.game)
window.game = G;
G.freeWeapons = settings.freeWeapons;

function build() {
  const t0 = performance.now();
  const world = new CollisionWorld();
  const sky = new Sky(scene, renderer, Q.far); if (post) post.attachSky(sky);
  sky.setShadows(Q.shadows, Q.size, Q.extent);
  const city = new City(scene, world); city.lodMul = LODM;
  city.build();
  const zones = new Zones(scene, world, city);
  zones.build();
  const blackwood = new Blackwood(scene, world, city);
  blackwood.build();
  city.buildTrees();
  // grama 3D (não na qualidade Baixa)
  const grass = Q.grass ? new Grass(scene, city.grassRects, (x, z) => world.groundFn(x, z), { radius: Q.grass, spacing: Q.grass > 60 ? 1.05 : 1.25 }) : null;
  Batcher.recordHard = false; Batcher.hardGrid.clear();
  setSeed(777);
  const cars = []; const drivers = [];
  const makeCar = (type, color) => {
    const c = new Vehicle(type, color ?? pick(CAR_COLORS), world);
    scene.add(c.group); world.dynamic.add(c); cars.push(c); return c;
  };
  const eh = city.ethanHouse;
  // vitrine: Fúria V12, Besouro e Coupé estacionados na rua em frente à casa
  const sz = roadC(3) - 4.75; const showcase = [['furia', 0xd8a010, eh.door[0] + 9, sz], ['besouro', 0x6aa8c8, eh.door[0] - 6, sz], ['coupe', 0xb01818, eh.door[0] - 13, sz], ['moto_esportiva', 0x1a1a1a, eh.door[0] + 15, sz], ['moto_custom', 0x5a1010, eh.door[0] + 17, sz], ['scooter', 0x2a6ab0, eh.door[0] + 19, sz]];
  const cleared = city.parkedCars.filter((pc) => !showcase.some((sc) => Math.hypot(pc.x - sc[2], pc.z - sc[3]) < 7));
  for (const pc of cleared) { const c = makeCar(rand() < 0.14 ? pick(MOTO_TYPES) : pc.type); c.place(pc.x, pc.z, pc.heading); c.parked = true; }
  for (const [type, color, x, z] of showcase) { const c = makeCar(type, color); c.place(x, z, -Math.PI / 2); c.parked = true; c.fuel = 1; }
  const ethanCar = makeCar('sedan', 0x1d3f72);
  ethanCar.place(eh.driveway[0], eh.driveway[1], eh.heading + Math.PI);
  ethanCar.owner = 'Ethan'; ethanCar.fuel = 1;
  const player = new Player(scene, world, CHARACTERS.ethan.look);
  player.place(eh.door[0], eh.door[1] + 3.5, 0);
  drivers.push(...spawnTraffic(Q.traffic, (type) => makeCar(type), player));
  const npcs = [];
  for (const s of city.shopkeepers) npcs.push(new NPC(scene, world, shopkeeperLook(), { name: 'Atendente — ' + s.shop, role: 'shop', lines: [pick(SHOP_LINES), pick(SHOP_LINES)], x: s.x, z: s.z, heading: s.heading }));
  for (const p of city.npcs) if (p.kind === 'police') npcs.push(new NPC(scene, world, policeLook(), { name: 'Policial', role: 'police', lines: POLICE_LINES, x: p.x, z: p.z, behavior: 'patrol' }));
  const loops = city.pedLoops;
  for (let i = 0; i < Q.peds; i++) {
    const loop = loops[Math.floor(rand() * loops.length)];
    npcs.push(new NPC(scene, world, randomPedestrian(), { name: 'Pedestre', role: 'ped', lines: [pick(PED_LINES)], behavior: 'loop', loop }));
  }
  // mar em volta do mapa (vista do avião: Los Valles vira uma ilha)
  { const sea = new THREE.Mesh(new THREE.PlaneGeometry(9000, 9000).rotateX(-Math.PI / 2), new THREE.MeshPhongMaterial({ color: 0x1d4a6a, shininess: 90, specular: 0x557788 }));
    sea.position.set(200, -0.6, 0); sea.receiveShadow = false; sea.matrixAutoUpdate = false; sea.updateMatrix(); scene.add(sea); }
  // avião no pátio do aeroporto
  const plane = new Airplane(world); scene.add(plane.group); plane.place(...zones.spots.planePark); world.dynamic.add(plane);
  // enfermeira na recepção do hospital e policial no balcão da delegacia
  if (city.hospitalNurse) { const [x, z, h] = city.hospitalNurse; npcs.push(new NPC(scene, world, { ...randomPedestrian(), female: true, skirt: null, hairStyle: 'bun', shirt: 0xe8f4f0, pants: 0xe8f4f0, jacket: null, longSleeve: false }, { name: 'Enfermeira', role: 'story-static', lines: ['Bem-vindo ao Hospital Los Valles.', 'Atendimento médico custa R$ 150.'], x, z, heading: h, behavior: 'stand' })); }
  if (city.policeDesk) { const [x, z, h] = city.policeDesk; npcs.push(new NPC(scene, world, policeLook(), { name: 'Policial de plantão', role: 'police', lines: ['Delegacia de Los Valles. Em que posso ajudar?', 'Se for fazer boletim, pegue uma senha.'], x, z, heading: h, behavior: 'stand' })); }
  // penitenciária: presos nas celas (e alguns no pátio) e guardas fazendo ronda
  { const Z = zones.spots; const jump = { shirt: 0xe0701a, pants: 0xe0701a, jacket: null, hat: null, longSleeve: false };
    const guardLook = () => ({ ...policeLook(), shirt: 0x3a4048, pants: 0x2a2e34, hatColor: 0x2a2e34 });
    const plines = ['Ei, você aí! Me tira daqui!', 'Sete anos... e ainda contando.', 'Não olha pra mim.', 'Aqui dentro o tempo não passa.', 'Tem cigarro?', 'Eu sou inocente, juro.'];
    (Z.prisonCells || []).forEach(([x, z, h], i) => { if (i % 3 === 2) return;
      const n = new NPC(scene, world, { ...randomPedestrian(), female: false, skirt: null, ...jump, hairStyle: pick(['short', 'bald']) }, { name: 'Preso', role: 'prisoner', lines: [pick(plines), pick(plines)], x, z, heading: h, behavior: 'stand' });
      npcs.push(n); });
    for (let i = 0; i < 4; i++) { const [px, pz] = Z.prisonGateIn; npcs.push(new NPC(scene, world, { ...randomPedestrian(), female: false, skirt: null, ...jump, hairStyle: 'short' }, { name: 'Preso', role: 'prisoner', lines: [pick(plines)], x: px - 18 - i * 3, z: pz + (i % 2 ? 14 : -14), behavior: 'patrol' })); }
    const gl = ['Circulando.', 'Visita só no domingo.', 'Nada de gracinha aqui dentro.'];
    npcs.push(new NPC(scene, world, guardLook(), { name: 'Guarda', role: 'police', lines: gl, x: Z.prisonCorridor[0] - 3, z: Z.prisonCorridor[1], behavior: 'patrol' }));
    npcs.push(new NPC(scene, world, guardLook(), { name: 'Guarda', role: 'police', lines: gl, x: Z.prisonCorridor[0] + 5, z: Z.prisonCorridor[1], behavior: 'patrol' }));
    npcs.push(new NPC(scene, world, guardLook(), { name: 'Guarda', role: 'police', lines: gl, x: Z.prisonDesk[0], z: Z.prisonDesk[1], heading: Math.PI / 2, behavior: 'stand' }));
    for (const dz of [-16, 16]) npcs.push(new NPC(scene, world, guardLook(), { name: 'Guarda', role: 'police', lines: gl, x: Z.prisonGateIn[0] - 10, z: Z.prisonGateIn[1] + dz, behavior: 'patrol' }));
    const pc = makeCar('police'); pc.place(Z.prisonGarageCar[0], Z.prisonGarageCar[1], Math.PI); pc.parked = true; pc.fuel = 1; }
  // traficantes nos becos (vendedor + vigia) — personagens de ambiente
  for (const a of city.alleys || []) {
    const hood = () => ({ ...randomPedestrian(), female: false, skirt: null, hat: rand() < 0.6 ? 'hood' : 'cap', hatColor: pick([0x141416, 0x2a2a2e, 0x3a1a1a]), shirt: pick([0x1a1a1a, 0x2a2a3a, 0x3a3a3a]), pants: pick([0x1a1a1a, 0x2a3a5a]), jacket: rand() < 0.5 ? 0x111111 : null, hairStyle: 'short', longSleeve: true });
    const d = new NPC(scene, world, hood(), { name: 'Traficante', role: 'dealer', lines: ['Psiu... tá procurando o quê?', 'Aqui é ponto, parceiro. Se não vai comprar, vaza.', 'Tá com cara de polícia, hein.', 'Fala baixo. Tem olho em todo canto.'], x: a.x + 0.6, z: a.z, heading: a.heading + Math.PI, behavior: 'stand' });
    const l = new NPC(scene, world, hood(), { name: 'Vigia', role: 'dealer', lines: ['Circulando, circulando.', 'Não vi nada, não sei de nada.', 'Olha a viatura, hein...'], x: a.mouth[0] - 0.8, z: a.mouth[1], heading: a.heading + Math.PI, behavior: 'stand' });
    d.alley = a; l.alley = a; npcs.push(d, l);
  }
  if (city.bank) { const B = city.bank; const gd = new NPC(scene, world, { ...policeLook(), hat: null, shirt: 0x1a1a1e, pants: 0x1a1a1e, badge: true }, { name: 'Segurança do banco', role: 'guard', lines: ['Bom dia. Fila à esquerda, por favor.'], x: B.guard[0], z: B.guard[1], heading: B.heading, behavior: 'stand', hp: 90 }); gd.gun = true; gd.gunDmg = 6; gd.onlyPlayer = true; npcs.push(gd); city.bank.guardNpc = gd; }
  for (const n of npcs) world.dynamic.add(n);
  const lights = new TrafficLights();
  const cam = new ThirdPersonCamera(camera, world, settings);
  cam.yaw = Math.PI; cam.pitch = 0.22;
  const headlight = new THREE.SpotLight(0xfff2d0, 0, 45, 0.55, 0.5, 1.2);
  scene.add(headlight, headlight.target);
  const lampLights = [];
  for (let i = 0; i < Q.lamps; i++) { const l = new THREE.PointLight(0xffc98a, 0, 26, 2); scene.add(l); lampLights.push(l); }
  const gp = new Float32Array(city.lamps.length * 3); city.lamps.forEach((l, i) => gp.set(l, i * 3));
  const glowGeo = new THREE.BufferGeometry(); glowGeo.setAttribute('position', new THREE.BufferAttribute(gp, 3));
  const glow = new THREE.Points(glowGeo, new THREE.PointsMaterial({ map: glowTex(), size: 3.2, sizeAttenuation: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, color: 0xffd9a0, opacity: 0 }));
  glow.frustumCulled = false; scene.add(glow);
  const blobGeo = new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2);
  const blobs = new THREE.InstancedMesh(blobGeo, new THREE.MeshBasicMaterial({ map: blobTex(), transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -4 }), 900);
  blobs.frustumCulled = false; blobs.renderOrder = 1; scene.add(blobs);
  // Ultra: filtragem anisotrópica máxima (texturas nítidas no chão e nas paredes vistas de lado)
  if (Q.ultra) { const maxA = renderer.capabilities.getMaxAnisotropy(); const seen = new Set(); scene.traverse((o) => { const ms = o.material ? (Array.isArray(o.material) ? o.material : [o.material]) : []; for (const m of ms) for (const k of ['map', 'normalMap', 'emissiveMap']) { const t = m[k]; if (t && !seen.has(t)) { seen.add(t); t.anisotropy = maxA; t.needsUpdate = true; } } }); }
  Object.assign(G, { plane, grass, blackwood, world, sky, city, zones, cars, drivers, player, npcs, lights, cam, ethanCar, headlight, settings, Q, renderer, scene, camera, lampLights, glow, blobs });
  G.aiDrivers = []; G.police = [];
  G.audio = new EngineAudio();
  G.state = SAVE.newState();
  G.story = new Story(G);
  G.phone = new Phone(G);
  G.custom = new CustomShop(G);
  G.perf = new PerfMeter(renderer);
  G.weapons = new Weapons(G);
  const origSetLook = player.setLook.bind(player);
  player.setLook = (l) => { origSetLook(l); G.weapons.attach(); };
  G.buildMs = performance.now() - t0;
  sky.setHour(G.state.hour, true);
  buildMinimap();
}

// ---------------- ENTRADA ----------------
const keys = new Set();
const pressed = new Set();
let locked = false; let started = false; let paused = false;
window.addEventListener('keydown', (e) => {
  if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) { if (e.code === 'Enter' && e.target.id === 'code-in') G.phone.action('code'); return; } // digitando no celular
  if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Tab', 'F3', 'F4'].includes(e.code)) e.preventDefault();
  if (!keys.has(e.code)) pressed.add(e.code);
  keys.add(e.code);
});
window.addEventListener('keyup', (e) => { keys.delete(e.code); if (e.code === 'Tab' && wheel.open && performance.now() - wheel.t0 > 300) closeWheel(true); });
window.addEventListener('blur', () => keys.clear());
document.addEventListener('mousemove', (e) => { if (wheel.open) { wheelMouse(e.movementX || 0, e.movementY || 0); return; } if (locked && !paused && G.cam && !G.switchAnim) G.cam.onMouse(e.movementX || 0, e.movementY || 0); });
document.addEventListener('wheel', (e) => { if (G.cam && started && !paused && !G.phone.open) G.cam.onWheel(e.deltaY); }, { passive: true });
const overlayOpen = () => G.phone.open || G.docOpen || $('dialog-choices').children.length > 0 || $('slots').style.display === 'flex';
document.addEventListener('pointerlockchange', () => {
  locked = document.pointerLockElement === renderer.domElement;
  if (!locked && started && !overlayOpen()) showPause(true);
});
renderer.domElement.addEventListener('click', () => { if (started && !paused && !overlayOpen()) requestLock(); if (G.story) G.story.advance = true; });
let mouseFire = false, mouseAim = false, aimToggle = false;
renderer.domElement.addEventListener('mousedown', (e) => { if (!locked) return; if (wheel.open) { if (e.button === 0) closeWheel(true); else closeWheel(false); return; } if (e.button === 0) mouseFire = true; if (e.button === 2) mouseAim = true; });
window.addEventListener('mouseup', (e) => { if (e.button === 0) mouseFire = false; if (e.button === 2) mouseAim = false; });
renderer.domElement.addEventListener('contextmenu', (e) => e.preventDefault());
function requestLock() { try { const p = renderer.domElement.requestPointerLock(); if (p && p.catch) p.catch(() => {}); } catch (e) { /* ignore */ } }
G.unlockPointer = () => { G._relock = locked; if (locked) document.exitPointerLock?.(); };
G.relockPointer = () => { if (G._relock && started && !paused) requestLock(); };
const down = (...c) => c.some((k) => keys.has(k));
const hit = (...c) => c.some((k) => pressed.has(k));
G.consumeInteract = () => { if (pressed.has('KeyE')) { pressed.delete('KeyE'); return true; } return false; };

// ---------------- UTILITÁRIOS DE JOGO ----------------
G.campaign = () => G.state[G.state.char];
G.toast = (t, sec = 3) => { $('toast').textContent = t; $('toast').style.opacity = 1; toastT = sec; };
let toastT = 0;
const toast = G.toast;
G.sound = (name, dur) => { if (settings.sound && G.audio.ctx) sfx(G.audio.ctx, name, dur); };
let shakeT = 0; G.shake = (s) => { shakeT = s; };
G.flash = () => { const f = $('flash'); f.style.transition = 'none'; f.style.opacity = 0.9; requestAnimationFrame(() => { f.style.transition = 'opacity .6s'; f.style.opacity = 0; }); };
G.setHour = (h) => { G.state.hour = ((h % 24) + 24) % 24; G.sky.setHour(G.state.hour, true); };
G.vibe = (key) => { for (const p of VIBE[key] || []) G.phone.addPost({ ...p }); };
G.addMoney = (v) => { G.campaign().money = Math.max(0, G.campaign().money + v); if (v > 0) G.sound('cash'); };
G.addPhoto = (src, label) => { const C = G.campaign(); C.photos.unshift({ src, label, day: G.state.day }); C.photos = C.photos.slice(0, 8); };
G.ownCar = () => G.ethanCar;
// o carro customizado passa a ser o carro do personagem (salvo no jogo)
G.setOwnCar = (car) => {
  if (G.ethanCar !== car) { G.ethanCar.owner = null; G.ethanCar.parked = true; G.ethanCar = car; }
  car.owner = G.state.char === 'ryan' ? 'Ryan' : 'Ethan'; car.parked = false;
  G.campaign().ownCar = { type: car.type, mods: { ...car.mods }, fuel: car.fuel, health: car.health, pos: [car.x, car.z, car.heading] };
};
G.saveNow = (msg) => { SAVE.writeSlot('auto', snapshot()); if (msg) toast(msg, 1.5); };
G.showDocument = (title, html) => new Promise((res) => {
  $('doc-title').textContent = title; $('doc-body').innerHTML = html; $('doc').style.display = 'flex'; G.docOpen = true; G.unlockPointer();
  const close = () => { $('doc').style.display = 'none'; G.docOpen = false; G._docClose = null; G.relockPointer(); res(); };
  G._docClose = close; $('doc-close').onclick = close;
});
G.takePhoto = () => {
  const c = G.story.capture(camera, 320, 200); G.addPhoto(c.toDataURL('image/jpeg', 0.7), 'Foto'); G.sound('ping'); toast('Foto salva na galeria');
};
G.callCar = () => {
  const car = G.ownCar(); const p = G.player;
  if (G.car === car) return;
  const a = p.heading + Math.PI / 2; car.place(p.x + Math.sin(a) * 4, p.z + Math.cos(a) * 4, p.heading); car.speed = 0;
  toast('Seu carro foi trazido até você');
};

// ---------------- MENUS / UI ----------------
function showPause(v) {
  paused = v; $('pause').style.display = v ? 'flex' : 'none';
  if (v) syncSettingsUI();
}
function syncSettingsUI() {
  $('opt-sens').value = settings.sensitivity; $('opt-sens-v').textContent = settings.sensitivity.toFixed(2);
  $('opt-invert').checked = settings.invertY; $('opt-follow').checked = settings.autoFollow;
  $('opt-fov').value = settings.fov; $('opt-fov-v').textContent = settings.fov;
  $('opt-quality').value = settings.quality; $('opt-fps').checked = settings.showFps;
  $('opt-time').value = G.sky.current || 'dia'; $('opt-sound').checked = settings.sound;
  $('opt-adaptive').checked = settings.adaptive; $('opt-auto').checked = settings.autoDialog; $('opt-guns').checked = settings.freeWeapons; G.freeWeapons = settings.freeWeapons;
  $('gpu-info').textContent = (gpuName ? 'Placa de vídeo: ' + gpuName.replace(/ANGLE \(|\)$/g, '') : '') + ' · resolução ' + Math.round(pixelRatio * 100) + '%';
  $('opt-dist').value = G.cam ? G.cam.footDist : 4.2; $('opt-dist-v').textContent = (G.cam ? G.cam.footDist : 4.2).toFixed(1);
  $('btn-switch').textContent = G.state.char === 'ethan' ? 'JOGAR COMO RYAN' : 'JOGAR COMO ETHAN';
}
function bindUI() {
  $('opt-sens').oninput = (e) => { settings.sensitivity = +e.target.value; $('opt-sens-v').textContent = settings.sensitivity.toFixed(2); saveSettings(); };
  $('opt-invert').onchange = (e) => { settings.invertY = e.target.checked; saveSettings(); };
  $('opt-follow').onchange = (e) => { settings.autoFollow = e.target.checked; saveSettings(); };
  $('opt-fov').oninput = (e) => { settings.fov = +e.target.value; $('opt-fov-v').textContent = settings.fov; G.cam.fovBase = settings.fov; saveSettings(); };
  $('opt-dist').oninput = (e) => { G.cam.footDist = +e.target.value; $('opt-dist-v').textContent = G.cam.footDist.toFixed(1); };
  $('opt-fps').onchange = (e) => { settings.showFps = e.target.checked; G.perf.toggle(settings.showFps); saveSettings(); };
  $('opt-auto').onchange = (e) => { settings.autoDialog = e.target.checked; saveSettings(); };
  $('opt-guns').onchange = (e) => { settings.freeWeapons = e.target.checked; G.freeWeapons = settings.freeWeapons; saveSettings(); };
  $('opt-adaptive').onchange = (e) => { settings.adaptive = e.target.checked; saveSettings(); if (!settings.adaptive) G.setPixelRatio(Q.pr); };
  $('opt-sound').onchange = (e) => { settings.sound = e.target.checked; G.audio.enabled = settings.sound; saveSettings(); };
  $('opt-time').onchange = (e) => { G.setHour({ dia: 12, entardecer: 18.6, noite: 23 }[e.target.value]); };
  $('opt-quality').onchange = (e) => {
    settings.quality = e.target.value; saveSettings();
    $('quality-note').textContent = 'A qualidade será aplicada ao reiniciar. Salvando e recarregando...';
    if (started) { SAVE.writeSlot('auto', snapshot()); setTimeout(() => SAVE.requestLoad('auto'), 600); } else setTimeout(() => location.reload(), 600);
  };
  $('btn-resume').onclick = () => { showPause(false); requestLock(); };
  $('btn-save').onclick = () => openSlots('save');
  $('btn-load2').onclick = () => openSlots('load');
  $('btn-switch').onclick = () => switchCharacter();
  $('slots-close').onclick = () => { $('slots').style.display = 'none'; };
  $('doc-close').onclick = () => G._docClose && G._docClose();
  // tela inicial
  const latest = SAVE.latestSlot();
  $('btn-play').textContent = latest ? 'CONTINUAR' : 'NOVO JOGO — ETHAN';
  $('btn-play').disabled = false;
  $('btn-play').onclick = () => latest ? startFromState(latest.data) : startFromState(SAVE.newState());
  $('btn-new').hidden = !latest; $('btn-new').onclick = () => startFromState(SAVE.newState());
  $('btn-ryan').hidden = !(latest && ryanUnlocked(latest.data)); $('btn-ryan').onclick = () => { const st = latest ? latest.data : SAVE.newState(); st.char = 'ryan'; startFromState(st); };
  $('btn-load').hidden = !latest; $('btn-load').onclick = () => openSlots('load');
}
function openSlots(mode) {
  $('slots').style.display = 'flex'; $('slots-title').textContent = mode === 'save' ? 'SALVAR JOGO' : 'CARREGAR JOGO';
  const keys = mode === 'save' ? ['1', '2', '3', '4', '5'] : SAVE.SLOT_KEYS;
  const names = { auto: 'Automático', missao: 'Última missão' };
  $('slots-list').innerHTML = keys.map((k) => { const d = SAVE.readSlot(k); return `<div class="slot"><span><b>${names[k] || 'Espaço ' + k}</b><br>${SAVE.describe(d)}</span><button data-slot="${k}" ${mode === 'load' && !d ? 'disabled' : ''}>${mode === 'save' ? 'Salvar' : 'Carregar'}</button></div>`; }).join('');
  $('slots-list').querySelectorAll('button').forEach((b) => b.onclick = () => {
    const k = b.dataset.slot;
    if (mode === 'save') { SAVE.writeSlot(k, snapshot()); toast('Jogo salvo no espaço ' + k); openSlots('save'); }
    else if (started) SAVE.requestLoad(k); else { $('slots').style.display = 'none'; startFromState(SAVE.readSlot(k)); }
  });
}
function snapshot() {
  const st = G.state; const C = G.campaign(); const p = G.player;
  C.pos = [p.x, p.z, p.heading]; const oc = G.ethanCar;
  C.car = { fuel: oc.fuel, health: oc.health, pos: [oc.x, oc.z, oc.heading] };
  C.ownCar = { type: oc.type, mods: { ...oc.mods }, fuel: oc.fuel, health: oc.health, pos: [oc.x, oc.z, oc.heading] };
  if (G.mission) { C.mission = G.mission.id; C.stage = G.missionStage || 0; }
  return JSON.parse(JSON.stringify(st));
}
// Ryan Cole só fica disponível depois da primeira missão (Prólogo) da campanha do Ethan
function ryanUnlocked(st = G.state) { return !!st && (st.ethan.done.includes('prologo') || st.char === 'ryan'); }
G.ryanUnlocked = () => ryanUnlocked();
// troca de personagem no meio do jogo (estilo GTA): a câmera sobe ao céu, troca e desce no outro personagem
function switchCharacter() {
  if (!started || G.switchAnim) return;
  if (paused) { showPause(false); requestLock(); }
  if (!ryanUnlocked()) { toast('Ryan Cole é desbloqueado depois da primeira missão (Prólogo)', 3); return; }
  if (G.mission) { toast('Termine ou saia da missão antes de trocar de personagem', 2.5); return; }
  if (G.wanted.stars) { toast('Despiste a polícia antes de trocar de personagem', 2.5); return; }
  if (G.story.cut || G.inputLocked || G.custom.open) return;
  const P = G.player;
  G.switchAnim = { t: 0, phase: 'up', from: camera.position.clone(), x: P.x, y: P.y, z: P.z };
  G.inputLocked = true; G.sound('page'); closeWheel(false);
}
G.switchCharacter = switchCharacter;
function doSwitch() {
  if (G.car) forceExitCar();
  const st = snapshot(); G.state = st; st.char = st.char === 'ethan' ? 'ryan' : 'ethan';
  const C = G.campaign(); if (C.pos) C.pos = [...C.pos];
  applyCampaign(); G.weapons.attach();
  SAVE.writeSlot('auto', snapshot());
  toast(C.char === 'ryan' ? 'Agora você é RYAN COLE' : 'Agora você é ETHAN', 2.5);
}
const ease = (k) => k * k * (3 - 2 * k);
function updateSwitchAnim(dt) {
  const a = G.switchAnim; if (!a) return; a.t += dt; const H = 170, P = G.player;
  if (a.phase === 'up') {
    const k = ease(Math.min(1, a.t / 1.1));
    camera.position.set(a.from.x + (a.x - a.from.x) * k, a.from.y + (a.y + H - a.from.y) * k, a.from.z + (a.z + 0.1 - a.from.z) * k);
    camera.lookAt(a.x, a.y, a.z);
    if (a.t >= 1.1) { doSwitch(); a.phase = 'hold'; a.t = 0; a.x = P.x; a.y = P.y; a.z = P.z; G.flash(); G.cam.initialized = false; }
  } else if (a.phase === 'hold') {
    camera.position.set(a.x + (a.t * 3), a.y + H, a.z + 0.1); camera.lookAt(a.x, a.y, a.z);
    if (a.t > 0.35) { a.phase = 'down'; a.t = 0; }
  } else {
    const k = ease(Math.min(1, a.t / 1.2)); const tx = camera.position.x, ty = camera.position.y, tz = camera.position.z; // posição normal da câmera (já calculada)
    camera.position.set(a.x + (tx - a.x) * k, a.y + H + (ty - a.y - H) * k, a.z + 0.1 + (tz - a.z - 0.1) * k);
    camera.lookAt(P.x, P.y + 1.4 * k, P.z);
    if (a.t >= 1.2) { G.switchAnim = null; G.inputLocked = false; }
  }
}

// ---------------- MENU DE ARMAS (Tab) ----------------
const wheel = { open: false, sel: 0, mx: 0, my: 0, t0: 0, built: false };
function buildWheel() {
  const ring = $('wheel-ring'); ring.innerHTML = '';
  WEAPON_ORDER.forEach((id, i) => {
    const a = -Math.PI / 2 + i * (Math.PI * 2 / WEAPON_ORDER.length);
    const el = document.createElement('div'); el.className = 'wslot'; el.dataset.i = i;
    el.style.left = (50 + Math.cos(a) * 37) + '%'; el.style.top = (50 + Math.sin(a) * 37) + '%';
    el.innerHTML = `<img src="${weaponIcon(id)}" alt=""><b>${i + 1}. ${WEAPONS[id].name}</b><small></small>`;
    el.onclick = () => { wheel.sel = i; closeWheel(true); };
    ring.appendChild(el);
  });
  wheel.built = true;
}
function refreshWheel() {
  const inv = G.weapons.inv;
  $('wheel-ring').querySelectorAll('.wslot').forEach((el, i) => {
    const id = WEAPON_ORDER[i], W = WEAPONS[id], s = inv[id];
    const owned = id === 'mao' || s.owned;
    el.classList.toggle('sel', i === wheel.sel); el.classList.toggle('locked', !owned);
    el.querySelector('small').textContent = id === 'mao' ? 'socos (F)' : owned ? `${s.clip} / ${s.ammo}` : `Ferragens · R$ ${W.price.toLocaleString('pt-BR')}`;
  });
  const id = WEAPON_ORDER[wheel.sel]; const W = WEAPONS[id];
  $('wheel-name').textContent = W.name;
  $('wheel-info').textContent = id === 'mao' ? 'Sem arma' : `${W.auto ? 'Automática' : id === 'escopeta' ? 'Espalha chumbo' : 'Semiautomática'} · dano ${W.dmg * W.pellets} · pente ${W.mag}`;
}
function openWheel() {
  if (!started || paused || G.player.mode !== 'foot' || G.story.cut || G.inputLocked || G.phone.open || G.switchAnim || overlayOpen()) return;
  if (!wheel.built) buildWheel();
  wheel.open = true; wheel.sel = Math.max(0, WEAPON_ORDER.indexOf(G.weapons.current)); wheel.mx = wheel.my = 0; wheel.t0 = performance.now();
  $('wheel').style.display = 'flex'; refreshWheel();
}
function closeWheel(apply) {
  if (!wheel.open) return; wheel.open = false; $('wheel').style.display = 'none';
  if (apply) { const id = WEAPON_ORDER[wheel.sel]; if (id !== G.weapons.current) G.weapons.equip(id); }
  mouseFire = false;
}
function wheelMouse(dx, dy) {
  wheel.mx = Math.max(-140, Math.min(140, wheel.mx + dx)); wheel.my = Math.max(-140, Math.min(140, wheel.my + dy));
  if (Math.hypot(wheel.mx, wheel.my) < 30) return;
  const a = Math.atan2(wheel.my, wheel.mx) + Math.PI / 2; const n = WEAPON_ORDER.length;
  const i = ((Math.round(a / (Math.PI * 2 / n)) % n) + n) % n;
  if (i !== wheel.sel) { wheel.sel = i; refreshWheel(); }
}
G.wheel = wheel; G.openWheel = openWheel; G.closeWheel = closeWheel;

// ---------------- INÍCIO DE CAMPANHA ----------------
function lookFor(C) {
  if (C.char === 'ryan') return CHARACTERS.ryan.look;
  if (C.done.includes('liberdade')) return CHARACTERS.ethan.look;
  return C.done.includes('prologo') ? CHARACTERS.ethanPrison.look : CHARACTERS.ethanYoung.look;
}
function startFromState(st) {
  if (started) return;
  G.state = st; const C = G.campaign();
  started = true; $('title').style.display = 'none'; $('hud').style.display = 'block';
  G.audio.init(); G.audio.enabled = settings.sound;
  requestLock();
  G.sky.setHour(st.hour, true);
  if (st.blackwood) G.zones.unlockBlackwood();
  applyCampaign();
  lastAutosave = performance.now();
  G.perf.toggle(!!settings.showFps);
}
// aplica a campanha ativa (personagem, carro, armas, posição, missão). Usado ao iniciar e na troca de personagem.
function applyCampaign() {
  const C = G.campaign();
  G.player.setLook(lookFor(C));
  G.player.hp = C.hp;
  G.ethanCar.owner = C.char === 'ryan' ? 'Ryan' : 'Ethan';
  if (C.ownCar) {
    const oc = C.ownCar;
    if (oc.type !== G.ethanCar.type) { const old = G.ethanCar; removeCar(old); const nc = new Vehicle(oc.type, oc.mods.color, G.world, oc.mods); scene.add(nc.group); G.world.dynamic.add(nc); G.cars.push(nc); G.ethanCar = nc; }
    else { G.ethanCar.mods = { ...G.ethanCar.mods, ...oc.mods }; G.ethanCar.rebuild(); }
    G.ethanCar.fuel = oc.fuel; G.ethanCar.health = oc.health; if (oc.pos) G.ethanCar.place(...oc.pos);
  } else if (C.car) { G.ethanCar.fuel = C.car.fuel; G.ethanCar.health = C.car.health; if (C.car.pos) G.ethanCar.place(...C.car.pos); }
  G.weapons.attach();
  const H = G.city.ethanHouse;
  if (C.pos) G.player.place(C.pos[0], C.pos[1], C.pos[2]);
  else G.player.place(H.door[0], H.door[1] + 4, 0);
  G.cam.yaw = G.player.heading + Math.PI; G.cam.initialized = false;
  syncWorld();
  if (C.mission) { const m = missions().find((x) => x.id === C.mission); if (m) runMission(m, C.stage || 0, true); }
  else checkAutoMissions();
  if (C.char === 'ryan' && !C.flags.introRyan) { C.flags.introRyan = true; toast('Campanha de Ryan Cole', 3); }
}
// personagens fixos do mundo aberto (fora das missões)
function syncWorld() {
  const C = G.campaign(); const H = G.city.ethanHouse;
  const wantRyan = C.char === 'ethan' && C.done.includes('liberdade') && !C.flags.ryanDesaparecido && !G.mission;
  if (wantRyan && !G.freeRyan) {
    G.freeRyan = new NPC(scene, G.world, CHARACTERS.ryan.look, { name: 'Ryan Cole', role: 'story', lines: ['Quando estiver pronto, a gente continua.', 'Cuidado lá fora, Ethan.'], x: H.door[0] - 1.5, z: H.door[1] + 1.4, heading: 0 });
    G.npcs.push(G.freeRyan); G.world.dynamic.add(G.freeRyan);
  } else if (!wantRyan && G.freeRyan) {
    G.freeRyan.remove(); G.npcs.splice(G.npcs.indexOf(G.freeRyan), 1); G.world.dynamic.delete(G.freeRyan); G.freeRyan = null;
  }
}

// ---------------- MISSÕES ----------------
function missions() { return (G.state.char === 'ryan' ? RYAN_MISSIONS : ETHAN_MISSIONS).concat(SIDE_MISSIONS); }
function missionStatus(m) {
  const C = G.campaign(); const list = missions(); const i = list.indexOf(m);
  if (G.mission === m) return 'active';
  if (m.side) return m.requires(C, G) ? 'available' : 'locked';
  if (C.done.includes(m.id)) return 'done';
  const prevOk = m.after ? C.done.includes(m.after) : i === 0 || C.done.includes(list[i - 1].id);
  if (!prevOk) return 'locked';
  if (m.requires && !m.requires(C)) return 'locked';
  return 'available';
}
G.missionList = () => {
  const out = missions().map((m) => ({ title: (m.side ? '(Secundária) ' : '') + m.title, status: missionStatus(m), hint: m.hint + (m.side ? ' Repetível.' : '') }));
  out.push({ title: 'Próximos capítulos', status: 'locked', hint: 'Aguardando a definição do autor da história.' });
  if (G.state.char === 'ryan' && G.campaign().flags.contrato1 === 'aceito') out.splice(1, 0, { title: 'Contrato aceito', status: 'locked', hint: 'O conteúdo deste contrato ainda não foi definido pelo autor.' });
  return out;
};
function checkAutoMissions() {
  if (G.mission) return;
  for (const m of missions()) if (m.auto && missionStatus(m) === 'available') { runMission(m, 0, false); return; }
}
const startMarkers = [];
function updateStartMarkers() {
  const S = G.story; let i = 0; let promptM = null;
  if (!G.mission) for (const m of missions()) {
    if (m.auto || !m.start || missionStatus(m) !== 'available') continue;
    const [x, z] = m.start(G);
    if (!startMarkers[i]) { const mk = S.makeMarker(); mk.children[0].material = mk.children[0].material.clone(); mk.children[1].material = mk.children[1].material.clone(); scene.add(mk); startMarkers[i] = mk; }
    const mk = startMarkers[i++]; mk.visible = true; mk.side = !!m.side;
    mk.children[0].material.color.setHex(m.side ? 0x3ad87a : 0x3a9aff); mk.children[1].material.color.setHex(m.side ? 0x5af09a : 0xffd25a); mk.position.set(x, G.world.groundFn(x, z), z); mk.rotation.y += 0.02;
    const d = Math.hypot(G.player.x - x, G.player.z - z);
    if (d < (G.player.mode === 'car' ? 5 : 2.6)) promptM = m;
  }
  for (; i < startMarkers.length; i++) startMarkers[i].visible = false;
  return promptM;
}
async function runMission(m, from = 0, resumed = false) {
  const S = G.story; const C = G.campaign();
  G.mission = m; C.mission = m.id; syncWorld();
  showBanner(m.title, m.side ? 'MISSÃO SECUNDÁRIA' : 'MISSÃO', false);
  let i = from;
  while (i < m.stages.length) {
    G.missionStage = i; C.stage = i;
    S.resumed = resumed && i === from; S.retry = false;
    SAVE.writeSlot('missao', snapshot());
    if (S.resumed) { const mark = S.fadeCalls || 0; S.task(async () => { await S.wait(0.35); if (S.fade > 0 && !S.cut && (S.fadeCalls || 0) === mark) await S.fadeIn(0.6); }); }
    try { await m.stages[i].run(S, G); i++; resumed = false; }
    catch (e) {
      if (e.abort) return;
      if (!e.fail) console.error(e);
      await failScreen(e.fail ? e.message : 'Erro na missão: ' + e.message);
      S.cleanup(); G.player.hp = 100; G.campaign().hp = 100; resumed = true; from = i;
      if (m.side) { S.fadeTarget = 0; S.fade = 0; $('fade').style.opacity = 0; C.mission = null; C.stage = 0; G.mission = null; syncWorld(); return; }
      if (G.car) forceExitCar();
    }
  }
  S.cleanup();
  if (m.side) {
    C.mission = null; C.stage = 0; G.mission = null; C.sideDone = C.sideDone || {}; C.sideDone[m.id] = (C.sideDone[m.id] || 0) + 1;
    if (C.flags.moedaInfinita) { G.addMoney(50); setTimeout(() => toast('+R$ 50 (Moeda Infinita)', 2), 1800); }
    showBanner('CONCLUÍDA', m.title, false); syncWorld(); SAVE.writeSlot('auto', snapshot()); return;
  }
  C.done.push(m.id); C.mission = null; C.stage = 0; G.mission = null;
  if (m.reward) G.addMoney(m.reward);
  if (C.flags.moedaInfinita) { G.addMoney(50); setTimeout(() => toast('+R$ 50 (Moeda Infinita)', 2), 1800); }
  if (m.id === 'prologo' && C.char === 'ethan') setTimeout(() => toast('RYAN COLE DESBLOQUEADO — aperte Z para trocar de personagem a qualquer momento', 6), 3500);
  showBanner('MISSÃO CONCLUÍDA', m.title, false);
  syncWorld();
  SAVE.writeSlot('missao', snapshot()); SAVE.writeSlot('auto', snapshot());
  if (m.next) { const nm = missions().find((x) => x.id === m.next); if (nm && missionStatus(nm) === 'available') { runMission(nm, 0, false); return; } }
  checkAutoMissions();
}
async function failScreen(msg) {
  const S = G.story;
  showBanner(msg.includes('—') ? msg.split('—')[0].trim() : 'MISSÃO FRACASSADA', msg.includes('—') ? msg.split('—')[1].trim() : msg, true);
  G.inputLocked = true;
  await new Promise((r) => setTimeout(r, 2600));
  S.fadeTarget = 1; S.fade = 1; $('fade').style.opacity = 1;
  G.inputLocked = false;
  toast('Voltando ao último checkpoint...', 2);
}
let bannerT = 0;
function showBanner(t, s, fail) { const b = $('banner'); b.querySelector('.t').textContent = t; b.querySelector('.s').textContent = s; b.classList.toggle('fail', fail); b.style.opacity = 1; bannerT = 3.2; }

// ---------------- CARRO: ENTRAR / SAIR ----------------
function nearestCar() {
  const p = G.player; let best = null, bd = 3.4;
  for (const c of G.cars) {
    if (c.removed) continue;
    for (const side of [1, -1]) {
      const [dx, dz] = c.doorPos(side);
      const d = Math.hypot(p.x - dx, p.z - dz);
      if (d < bd) { bd = d; best = c; }
    }
  }
  return best;
}
function enterCar(car) {
  if (G.carsLocked) { toast('Agora não dá para pegar um carro'); return; }
  if (car.driver === 'ai' || G.police.some((u) => u.car === car)) { toast('Este carro está ocupado'); return; }
  if (!car.owner && car.parked && G.state[G.state.char] && !G.mission) witnessCrime(0.35, 'roubo');
  enterCarDirect(car);
}
function enterCarDirect(car) {
  const p = G.player;
  p.mode = 'car'; G.car = car; car.driver = 'player'; car.parked = false;
  if (p.model.root.parent) p.model.root.parent.remove(p.model.root);
  car.body.add(p.model.root);
  p.model.root.position.copy(car.seat); p.model.root.rotation.set(0, 0, 0);
  if (!G.jack) doorAnim(car);
  G.cam.setMode('car', car.heading);
  G.story.onEnterCar(car);
}
G.enterCarDirect = enterCarDirect;
function exitCar() {
  const car = G.car;
  if (Math.abs(car.speed) > 4) { toast('Diminua a velocidade para sair'); return; }
  forceExitCar();
}
function forceExitCar() {
  const car = G.car; const p = G.player; if (!car) return;
  let spot = null;
  for (const side of [1, -1]) {
    const [x, z] = car.doorPos(side);
    const r = G.world.resolveCircle(x, z, 0.33, car.y + 0.2, car.y + 1.8, 0.4, null);
    if (!r.hit) { spot = [x, z]; break; }
  }
  if (!spot) spot = car.local(0, car.T.L / 2 + 1.2);
  car.body.remove(p.model.root); scene.add(p.model.root);
  car.driver = null; car.speed *= 0.3; G.car = null; doorAnim(car);
  p.mode = 'foot';
  p.place(spot[0], spot[1], car.heading);
  G.cam.setMode('foot');
  G.story.onExitCar();
}
G.forceExitCar = forceExitCar;

// ---------------- COMBATE ----------------
let punchCd = 0, lastHurt = -99;
function damagePlayer(amount, from = null) {
  if (from) G.lastHitFrom = [from.x, from.z];
  const C = G.campaign(); G.player.hp = Math.max(0, G.player.hp - amount); C.needs.dor = Math.min(100, C.needs.dor + amount * 0.7);
  lastHurt = G.story.t; $('vignette').style.background = 'radial-gradient(ellipse at center, rgba(120,0,0,0) 45%, rgba(140,0,0,0.6) 100%)';
  setTimeout(() => { $('vignette').style.background = ''; }, 250);
  G.sound('punch');
}
G.damagePlayer = damagePlayer;
const tokens = new Set();
function combatCtx() {
  const P = G.player;
  for (const n of tokens) if (!n.alive || n.removed || Math.hypot(n.x - P.x, n.z - P.z) > 3.5) tokens.delete(n);
  return {
    player: P, tokens,
    nearestFoe: (n, r) => {
      let best = null, bd = r;
      if ((P.mode === 'foot' || n.gun) && P.hp > 0) { const d = Math.hypot(P.x - n.x, P.z - n.z); if (d < bd) { bd = d; best = P; } }
      if (n.onlyPlayer) return best;
      for (const a of G.npcs) if (a.team === 'ally' && a.alive && !a.inCar && !a.removed) { const d = Math.hypot(a.x - n.x, a.z - n.z); if (d < bd) { bd = d; best = a; } }
      return best;
    },
    gangTarget: (n) => {
      let best = null, bd = 45;
      if (n.hatesPlayer && P.hp > 0) { const d = Math.hypot(P.x - n.x, P.z - n.z); if (d < bd) { bd = d; best = P; } }
      for (const a of G.npcs) if (a.gang && a.gang !== n.gang && a.alive && !a.removed) { const d = Math.hypot(a.x - n.x, a.z - n.z); if (d < bd) { bd = d; best = a; } }
      return best;
    },
    nearestEnemy: (n, r) => {
      let best = null, bd = r;
      for (const e of G.npcs) if (e.team === 'enemy' && e.alive && !e.removed && (e.behavior === 'hostile')) { const d = Math.hypot(e.x - n.x, e.z - n.z); if (d < bd) { bd = d; best = e; } }
      return best;
    },
    hit: (att, tgt, dmg) => {
      if (tgt === P) { damagePlayer(dmg, att); return; }
      if (tgt.team === 'ally') { tgt.hp = Math.max(30, tgt.hp - dmg * 0.5); return; }
      tgt.hp -= dmg; G.sound('punch');
      if (tgt.hp <= 0) tgt.knockDown(0, punchImpulse(att, tgt));
    },
    teleportFollower: (n) => G.story.teleportFollower(n),
    npcShoot: (n, tgt) => G.weapons.npcShoot(n, tgt),
  };
}
// empurrão do soco: na direção de quem bate para quem apanha
function punchImpulse(a, b, f = 3.2) { const dx = b.x - a.x, dz = b.z - a.z, d = Math.hypot(dx, dz) || 1; return { x: dx / d * f, y: 0.8, z: dz / d * f }; }
function playerPunch() {
  const P = G.player; if (punchCd > 0 || P.mode !== 'foot') return;
  punchCd = 0.45; P.model.punch();
  const fx = Math.sin(P.heading), fz = Math.cos(P.heading);
  let tgt = null, bd = 1.9;
  for (const n of G.npcs) {
    if (!n.alive || n.inCar || n.removed || n.role === 'story' && n.team !== 'enemy') continue;
    const dx = n.x - P.x, dz = n.z - P.z; const d = Math.hypot(dx, dz);
    if (d < bd && (dx * fx + dz * fz) / (d || 1) > 0.3) { bd = d; tgt = n; }
  }
  if (!tgt) return;
  G.sound('punch');
  const tfx = Math.sin(tgt.heading), tfz = Math.cos(tgt.heading);
  const behind = ((P.x - tgt.x) * tfx + (P.z - tgt.z) * tfz) / (bd || 1) < -0.2;
  if (tgt.team === 'enemy') {
    if (tgt.behavior === 'guard' && behind && (!G.story.alert || G.story.alert.value < 75)) { tgt.knockDown(0, punchImpulse(P, tgt, 1.2)); toast('Segurança nocauteado em silêncio', 1.5); return; }
    tgt.hp -= 34; if (tgt.hp <= 0) tgt.knockDown(0, punchImpulse(P, tgt));
    else if (tgt.behavior === 'guard') { G.story.addAlert(30); tgt.investigate = [P.x, P.z]; }
    return;
  }
  if (tgt.gang) { tgt.hp -= 34; if (tgt.hp <= 0) tgt.knockDown(0, punchImpulse(P, tgt)); provokeGang(tgt); return; }
  // civis e policiais
  tgt.hp -= 40;
  if (tgt.hp <= 0) { tgt.prevBehavior = tgt.behavior === 'down' ? 'loop' : tgt.behavior; tgt.knockDown(8, punchImpulse(P, tgt)); }
  witnessCrime(tgt.role === 'police' ? 2 : 1, 'agressão', tgt);
  for (const n of G.npcs) if (n.role === 'ped' && n.alive && Math.hypot(n.x - P.x, n.z - P.z) < 18) { n.behavior = 'panic'; n.panicFrom = [P.x, P.z]; n.panicT = 6; }
}

// ---------------- PROCURADO / POLÍCIA ----------------
const W = { stars: 0, unseen: 0 };
G.wanted = W;
G.crime = (level, kind, victim) => witnessCrime(level, kind, victim);
function witnessCrime(level, kind, victim) {
  if (G.mission) return; // crimes da história não geram procurado
  const P = G.player;
  const witnessed = level >= 2 || G.npcs.some((n) => n !== victim && n.alive && !n.inCar && (n.role === 'ped' || n.role === 'police' || n.role === 'shop') && Math.hypot(n.x - P.x, n.z - P.z) < 28) || G.police.length > 0;
  if (!witnessed) return;
  const before = W.stars;
  W.stars = Math.min(6, W.stars + (level < 1 ? (Math.random() < level ? 1 : 0) : level));
  if (W.stars > before) {
    W.unseen = 0; G.state.maxStars = Math.max(G.state.maxStars, W.stars);
    toast('Procurado: ' + '★'.repeat(W.stars), 2); G.sound('siren', 2);
    if (W.stars >= 2 && !G.state.blackwood) { G.state.blackwood = true; G.zones.unlockBlackwood(); setTimeout(() => toast('BLACKWOOD DESBLOQUEADA — siga a estrada leste depois da Zona Industrial', 5), 2200); SAVE.writeSlot('auto', snapshot()); }
    if (before === 0) G.vibe('procurado');
  }
}
function updatePolice(dt) {
  const P = G.player; const target = () => G.car || P;
  const want = W.stars ? Math.min(6, W.stars + 1) : 0;
  // gera viaturas longe do jogador
  if (G.police.length < want && Math.random() < dt * 0.8) {
    const a = Math.random() * Math.PI * 2; const r = 85;
    let x = P.x + Math.sin(a) * r, z = P.z + Math.cos(a) * r;
    const snap = (v) => roadC(Math.max(0, Math.min(N, Math.round(v / P_ + N / 2))));
    const P_ = 76; x = Math.abs(x) < HALF ? snap(x) + 1.75 : x; 
    const c = new Vehicle('police', 0xffffff, G.world); c.place(x, z, Math.atan2(P.x - x, P.z - z)); c.fuel = 1;
    scene.add(c.group); G.world.dynamic.add(c); G.cars.push(c);
    G.police.push({ car: c, drv: new ChaseDriver(c, target, { speed: 20 + W.stars * 2.5 }), near: 0 });
  }
  let seen = false;
  for (const u of G.police) {
    u.drv.update(dt, { cars: G.cars });
    const d = Math.hypot(u.car.x - P.x, u.car.z - P.z);
    if (d < 90 && W.stars) seen = true;
    // prisão: viatura parada perto do jogador a pé
    if (W.stars && P.mode === 'foot' && d < 7 && Math.abs(u.car.speed) < 2) u.near += dt; else u.near = Math.max(0, u.near - dt);
    if (u.near > 2.5 && W.stars < 3) { busted(); return; }
    // 3 estrelas ou mais: policiais descem armados
    if (W.stars >= 3 && !u.officers && d < 30 && Math.abs(u.car.speed) < 3) {
      u.officers = [];
      for (let k = 0; k < 2; k++) {
        const [ox, oz] = u.car.doorPos(k ? -1 : 1);
        const o = new NPC(scene, G.world, policeLook(), { name: 'Policial', role: 'police', team: 'enemy', behavior: 'hostile', x: ox, z: oz, hp: 70, interactable: false });
        o.team = 'enemy'; o.gun = true; o.gunDmg = 7; o.onlyPlayer = true; o.tag = 'policia';
        G.npcs.push(o); G.world.dynamic.add(o); u.officers.push(o);
      }
    }
  }
  if (W.stars) {
    W.unseen = seen ? 0 : W.unseen + dt;
    if (W.unseen > 10 + W.stars * 4) { W.stars = 0; toast('Você despistou a polícia', 2.5); }
  }
  // remove viaturas sobrando
  if (!W.stars) G.police = G.police.filter((u) => { removeCar(u.car); removeOfficers(u); return false; });
}
function removeOfficers(u) { for (const o of u.officers || []) { o.remove(); const i = G.npcs.indexOf(o); if (i >= 0) G.npcs.splice(i, 1); G.world.dynamic.delete(o); } u.officers = null; }
function removeCar(c) { c.removed = true; scene.remove(c.group); G.world.dynamic.delete(c); const i = G.cars.indexOf(c); if (i >= 0) G.cars.splice(i, 1); }
function busted() {
  if (G.heist) { G.heist = null; G.story.clearObjective(); setTimeout(() => toast('A polícia recuperou o dinheiro do assalto', 3), 1500); }
  W.stars = 0; G.police.forEach((u) => { removeCar(u.car); removeOfficers(u); }); G.police = [];
  const C = G.campaign(); const fine = Math.max(50, Math.round(C.money * 0.1)); G.addMoney(-fine);
  if (G.car) forceExitCar();
  const ps = G.city.policeSpot; G.player.place(ps.x, ps.z + 3, 0);
  showBanner('PRESO', `Multa de R$ ${fine}. Você foi liberado na delegacia.`, true);
}

// ---------------- SOBREVIVÊNCIA, SERVIÇOS ----------------
// cardápios por tipo de loja (preços e efeitos iguais aos do quadro de cardápio dentro da loja)
const IT = {
  sanduiche: { text: 'Sanduíche — R$ 18', price: 18, fome: 40, icon: 'sanduiche', eat: 'lanche' },
  marmita: { text: 'Marmita — R$ 35', price: 35, fome: 70, sede: 15, icon: 'marmita', eat: 'lanche' },
  burger: { text: 'X-Burguer — R$ 18', price: 18, fome: 40, icon: 'burger', eat: 'lanche' },
  prato: { text: 'Prato feito — R$ 35', price: 35, fome: 70, sede: 15, icon: 'prato', eat: 'lanche' },
  pao: { text: 'Pão na chapa — R$ 10', price: 10, fome: 25, icon: 'pao', eat: 'pao' },
  sonho: { text: 'Sonho — R$ 9', price: 9, fome: 20, icon: 'sonho', eat: 'sonho' },
  agua: { text: 'Água — R$ 5', price: 5, sede: 45, icon: 'agua', eat: 'agua' },
  refri: { text: 'Refrigerante — R$ 7', price: 7, sede: 30, fome: 5, icon: 'refri', eat: 'refri' },
  cafe: { text: 'Café — R$ 8', price: 8, sono: 15, sede: 10, icon: 'cafe', eat: 'cafe' },
  cafeleite: { text: 'Café com leite — R$ 8', price: 8, sono: 15, sede: 10, fome: 5, icon: 'cafeleite', eat: 'cafe' },
  remedio: { text: 'Analgésico — R$ 25', price: 25, dor: -40, icon: 'remedio', eat: 'remedio' },
};
const MENUS = {
  mercado: ['sanduiche', 'marmita', 'agua', 'refri', 'cafe'],
  lanche: ['burger', 'prato', 'refri', 'cafe'],
  padaria: ['pao', 'sonho', 'cafeleite', 'agua'],
  cinema: ['refri', 'agua', 'cafe'],
  academia: ['agua', 'cafe'],
  farmacia: ['remedio', 'agua'],
};
function shopMenu(npc) {
  const kind = shopKind(npc.name);
  let items = (MENUS[kind] || []).map((k) => IT[k]);
  if (kind === 'banco') return [{ text: G.weapons.current !== 'mao' ? 'Anunciar o ASSALTO (arma em punho)' : 'Assaltar o banco (precisa estar com uma arma na mão — Tab)', heist: true, price: 0 }];
  if (kind === 'ferragens') {
    const inv = G.weapons.inv;
    for (const id of WEAPON_ORDER.slice(1)) {
      const W2 = WEAPONS[id];
      if (!inv[id].owned) items.push({ text: `${W2.name} — R$ ${W2.price}`, price: W2.price, weapon: id, wicon: id });
      else items.push({ text: `Munição: ${W2.name} (${W2.ammoPack}) — R$ ${W2.ammoPrice}`, price: W2.ammoPrice, ammo: id, icon: 'municao' });
    }
  }
  return items.map((it) => ({ ...it, iconUrl: it.wicon ? weaponIcon(it.wicon) : it.icon ? itemIcon(it.icon) : null }));
}
// oficina: ronco de teste ao escolher um motor
let revT = 0; G.previewEngine = () => { revT = 1.4; };
// turbo: fogo no escapamento ao acelerar forte e estalos ao tirar o pé
const flameTex = (() => { const c = document.createElement('canvas'); c.width = c.height = 64; const g = c.getContext('2d'); const gr = g.createRadialGradient(32, 32, 2, 32, 32, 30);
  gr.addColorStop(0, 'rgba(255,255,230,1)'); gr.addColorStop(0.25, 'rgba(255,200,80,0.95)'); gr.addColorStop(0.6, 'rgba(255,90,20,0.6)'); gr.addColorStop(1, 'rgba(120,20,0,0)'); g.fillStyle = gr; g.fillRect(0, 0, 64, 64); return new THREE.CanvasTexture(c); })();
const flames = []; let lastThrottle = 0; const _fv = new THREE.Vector3();
function turboFx(dt, car, thr) {
  for (const f of flames) if (f.visible) { f.t -= dt; f.material.opacity = Math.max(0, f.t / f.life); f.scale.multiplyScalar(1 + dt * 4); if (f.t <= 0) f.visible = false; }
  if (!car.mods.turbo || !car.exhausts) { lastThrottle = thr; return; }
  const pop = lastThrottle > 0.7 && thr < 0.2 && Math.abs(car.speed) > 12; lastThrottle = thr;
  const burst = pop ? 3 : (thr > 0.75 && Math.abs(car.speed) > 4 && Math.random() < dt * 9) ? 1 : 0;
  for (let n = 0; n < burst; n++) for (const e of car.exhausts) {
    let f = flames.find((x) => !x.visible); if (!f) { if (flames.length > 24) break; f = new THREE.Sprite(new THREE.SpriteMaterial({ map: flameTex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true })); scene.add(f); flames.push(f); }
    _fv.set(e[0], e[1], e[2] - 0.12 - Math.random() * 0.15); car.body.localToWorld(_fv); f.position.copy(_fv);
    f.life = f.t = pop ? 0.16 : 0.09; f.scale.setScalar(pop ? 0.38 : 0.22 + Math.random() * 0.1); f.visible = true; f.material.opacity = 1;
    if (pop && n === 0) G.sound('shot');
  }
}
// porta abre e fecha (entrar/sair)
const doorAnims = new Set();
function doorAnim(car, dur = 0.8) { if (!car.door) return; car.doorT = dur; car.doorDur = dur; doorAnims.add(car); }
function updateDoors(dt) {
  for (const c of doorAnims) { c.doorT -= dt; if (c.doorT <= 0) { c.setDoor(0); doorAnims.delete(c); continue; } c.setDoor(Math.sin(Math.PI * (1 - c.doorT / c.doorDur))); }
}
// ROUBO DE CARRO: vai até a porta, abre, tira o motorista, entra e fecha
function stealCar(car) {
  const P = G.player;
  if (Math.abs(car.speed) > 3.5) { toast('O carro está andando — espere ele parar (num semáforo, por exemplo)', 2.5); return; }
  const di = G.drivers.findIndex((d) => d.car === car); if (di >= 0) G.drivers.splice(di, 1);
  const pd = driverPool.find((d) => d.car === car); if (pd) pd.busy = true;
  car.jacked = true; car.driver = 'jack'; car.speed = 0;
  G.jack = { car, t: 0, phase: 'walk', pool: pd, look: pd ? pd.model.look : randomPedestrian(), x0: P.x, z0: P.z };
  G.inputLocked = true; if (G.weapons.current !== 'mao') G.weapons.equip('mao');
}
function updateJack(dt) {
  const J = G.jack; if (!J) return; const P = G.player, car = J.car; J.t += dt;
  const side = car.T.moto ? 0.55 : 1; const [dx, dz] = car.local(car.T.moto ? car.T.W / 2 + 0.45 : car.T.W / 2 + 0.55, car.T.moto ? 0 : -0.35);
  car.speed = 0;
  if (J.phase === 'walk') {
    const k = Math.min(1, J.t / 0.6); P.x = J.x0 + (dx - J.x0) * k; P.z = J.z0 + (dz - J.z0) * k;
    P.heading = Math.atan2(car.x - P.x, car.z - P.z); P.y = G.world.groundAt(P.x, P.z, 0.3, P.y + 0.3); P.sync();
    P.model.update(dt, { speed: k < 1 ? 3 : 0, grounded: true, mode: 'foot' });
    if (J.t >= 0.6) { J.phase = 'open'; J.t = 0; P.heading = car.heading - Math.PI / 2; P.sync(); }
  } else if (J.phase === 'open') {
    car.setDoor(Math.min(1, J.t / 0.35)); P.model.update(dt, { speed: 0, grounded: true, mode: 'foot' });
    if (J.t >= 0.35) { J.phase = 'pull'; J.t = 0; P.model.punch(); }
  } else if (J.phase === 'pull') {
    P.model.update(dt, { speed: 0, grounded: true, mode: 'foot' });
    if (!J.npc) {
      if (J.pool) { const d = J.pool; if (d.model.root.parent) d.model.root.parent.remove(d.model.root); d.car = null; d.busy = false; car.driverModel = null; }
      const [ox, oz] = car.local(car.T.W / 2 + 1.2, 0.2);
      const n = new NPC(scene, G.world, J.look, { name: 'Motorista', role: 'ped', lines: ['Socorro! Roubaram meu carro!', 'Ladrão!'], x: ox, z: oz, heading: car.heading - Math.PI / 2, behavior: 'stand' });
      G.npcs.push(n); G.world.dynamic.add(n); J.npc = n;
      const [fx, fz] = [Math.sin(car.heading + Math.PI / 2), Math.cos(car.heading + Math.PI / 2)]; // para fora pela porta (+x local)
      n.prevBehavior = 'panic'; n.panicFrom = [P.x, P.z]; n.knockDown(3.5, { x: fx * 3.2, y: 1.2, z: fz * 3.2 }, { x: n.x, y: n.y + 1.2, z: n.z });
      G.sound('punch');
    }
    if (J.t >= 0.6) { J.phase = 'enter'; J.t = 0; enterCarDirect(car); }
  } else if (J.phase === 'enter') {
    if (J.t >= 0.35) { J.phase = 'close'; J.t = 0; }
  } else if (J.phase === 'close') {
    car.setDoor(Math.max(0, 1 - J.t / 0.3));
    if (J.t >= 0.3) { car.setDoor(0); car.jacked = false; G.jack = null; G.inputLocked = false; witnessCrime(1, 'roubo de carro', J.npc); }
  }
}
G.stealCar = stealCar;
G.makeHumanoid = (look) => new Humanoid(look ?? randomPedestrian()); G.randomPedestrian = randomPedestrian; G.CHARACTERS = CHARACTERS;
// ---------------- ASSALTO AO BANCO (atividade livre, não faz parte da história) ----------------
function startHeist(teller) {
  const C = G.campaign(), S = G.story, B = G.city.bank;
  if (G.mission) { toast('Agora não — termine a missão primeiro', 2.5); return; }
  if (G.weapons.current === 'mao') { toast('Você precisa estar com uma arma na mão (Tab abre o menu de armas)', 3); return; }
  if (C.flags.heistDay != null && G.state.day - C.flags.heistDay < 2) { toast('O banco ainda está com a segurança reforçada. Volte daqui a alguns dias.', 3); return; }
  C.flags.heistDay = G.state.day;
  G.heist = { phase: 'vault', prog: 0, cash: 0 };
  G.sound('siren', 4); showBanner('ASSALTO!', 'Vá até o cofre e fique perto dele para abrir', false);
  G.wanted.stars = Math.max(G.wanted.stars, 2); G.crime(1, 'assalto ao banco', teller);
  const P = G.player;
  if (B.guardNpc && B.guardNpc.alive) { B.guardNpc.team = 'enemy'; B.guardNpc.behavior = 'hostile'; B.guardNpc.interactable = false; } // o segurança reage
  for (const n of G.npcs) if (n.alive && !n.inCar && n !== B.guardNpc && Math.hypot(n.x - P.x, n.z - P.z) < 20) {
    if (n.role === 'ped' || n.role === 'shop') { n.behavior = 'stand'; n.pose = 'handsup'; n.talking = false; }
  }
  S.objective('Abra o cofre (fique perto da porta redonda)', B.vault);
}
// traficantes fogem da polícia e de quem aponta arma para eles
let dealerT = 0;
function updateDealers(dt) {
  if ((dealerT -= dt) > 0) return; dealerT = 0.5;
  const P = G.player;
  for (const n of G.npcs) {
    if (n.role !== 'dealer' || !n.alive || n.behavior === 'panic') continue;
    const police = G.police.some((u) => Math.hypot(u.car.x - n.x, u.car.z - n.z) < 40) || G.npcs.some((o) => o.role === 'police' && o.alive && Math.abs(o.x - n.x) < 25 && Math.abs(o.z - n.z) < 25);
    const threat = P.aiming && Math.hypot(P.x - n.x, P.z - n.z) < 14;
    if (police || threat) { n.behavior = 'panic'; n.panicFrom = police ? [n.x - Math.sin(n.heading) * 5, n.z - Math.cos(n.heading) * 5] : [P.x, P.z]; n.panicT = 10; if (threat && Math.random() < 0.5) G.toast('"Sujou! Corre!"', 1.5); }
  }
}
function updateHeist(dt) {
  const H = G.heist; if (!H) return; const S = G.story, P = G.player, B = G.city.bank;
  if (H.phase === 'vault') {
    if (P.mode === 'foot' && Math.hypot(P.x - B.vault[0], P.z - B.vault[1]) < 2.2) {
      H.prog += dt / 12; S.objText = `Abrindo o cofre: ${Math.min(100, Math.round(H.prog * 100))}%`; $('objective').textContent = 'OBJETIVO: ' + S.objText;
      if (Math.random() < dt * 2) G.sound('page');
      if (H.prog >= 1) {
        H.phase = 'escape'; H.cash = 8000 + Math.round(Math.random() * 7000 / 100) * 100;
        G.wanted.stars = Math.max(G.wanted.stars, 4); G.sound('cash'); toast(`Cofre aberto! R$ ${H.cash.toLocaleString('pt-BR')} na mochila`, 3);
        S.objective('Fuja da polícia com o dinheiro (despiste todas as estrelas)', null);
      }
    }
    if (Math.hypot(P.x - B.vault[0], P.z - B.vault[1]) > 70) { G.heist = null; S.clearObjective(); toast('Você abandonou o assalto', 2.5); }
  } else if (H.phase === 'escape' && G.wanted.stars === 0) {
    G.addMoney(H.cash); S.clearObjective(); showBanner('ASSALTO CONCLUÍDO', `Você ficou com R$ ${H.cash.toLocaleString('pt-BR')}`, false);
    G.heist = null; SAVE.writeSlot('auto', snapshot());
  }
}
G.startHeist = startHeist;
// ---------------- EVENTOS ALEATÓRIOS (tiroteio de gangues, perseguição policial, assalto) ----------------
const EV = { t: 70 + Math.random() * 50, active: null };
function provokeGang(n) { for (const m of G.npcs) if (m.gang === n.gang && m.alive) m.hatesPlayer = true; }
G.provokeGang = provokeGang;
function eventSpot(minD = 45, maxD = 120) {
  const P = G.player; const loops = G.city.pedLoops.filter((l) => { const d = Math.hypot(l.cx - P.x, l.cz - P.z); return d > minD && d < maxD && l.cx < 300; });
  if (!loops.length) return null; const l = pick(loops); const side = Math.floor(Math.random() * 4); const h = l.half;
  const pts = [[l.cx, l.cz - h], [l.cx + h, l.cz], [l.cx, l.cz + h], [l.cx - h, l.cz]]; return { p: pts[side], along: side % 2 === 0 ? [1, 0] : [0, 1] };
}
function spawnNpc(look, opts) { const n = new NPC(scene, G.world, look, opts); G.npcs.push(n); G.world.dynamic.add(n); return n; }
function panicAround(x, z, r = 40) { for (const n of G.npcs) if (n.role === 'ped' && n.alive && !n.gang && !n.eventRole && Math.hypot(n.x - x, n.z - z) < r) { n.behavior = 'panic'; n.panicFrom = [x, z]; n.panicT = 10; } }
const EVENTS = {
  gangues() {
    const sp = eventSpot(); if (!sp) return null; const [x, z] = sp.p; const [ax, az] = sp.along;
    const gangs = [{ id: 'vermelhos', shirt: 0x8a1a1a, hat: 0x6a0a0a }, { id: 'azuis', shirt: 0x1a3a8a, hat: 0x0a1a5a }];
    const members = [];
    gangs.forEach((g, gi) => { for (let i = 0; i < 4; i++) {
      const look = { ...randomPedestrian(), female: false, skirt: null, shirt: g.shirt, jacket: Math.random() < 0.5 ? 0x141414 : null, hat: Math.random() < 0.6 ? 'cap' : null, hatColor: g.hat, hairStyle: 'short' };
      const off = (gi ? 9 : -9) + (Math.random() - 0.5) * 4, lat = (i - 1.5) * 1.6;
      const n = spawnNpc(look, { name: gi ? 'Gangue Azul' : 'Gangue Vermelha', role: 'gang', x: x + ax * off - az * lat, z: z + az * off + ax * lat, behavior: 'gang', hp: 70, interactable: false });
      n.gang = g.id; n.gun = i < 2; n.gunDmg = 5; n.damage = 9; n.eventRole = true; members.push(n);
    } });
    panicAround(x, z); toast('Tiroteio entre gangues aqui perto!', 3); G.sound('shot');
    return { name: 'gangues', x, z, t: 0, members, update(dt) {
      this.t += dt; const alive = (id) => members.filter((m) => m.gang === id && m.alive).length;
      const P = G.player; const far = Math.hypot(P.x - x, P.z - z) > 220;
      if (!this.over && (alive('vermelhos') === 0 || alive('azuis') === 0)) { this.over = true; this.t = Math.max(this.t, 0); this.endT = this.t + 20; for (const m of members) if (m.alive) { m.behavior = 'panic'; m.panicFrom = [P.x, P.z]; m.panicT = 15; } }
      if (far || this.t > 150 || (this.over && this.t > this.endT)) { for (const m of members) if (!m.removed && Math.hypot(m.x - P.x, m.z - P.z) > 40) { m.remove(); G.world.dynamic.delete(m); } this.done = members.every((m) => m.removed || Math.hypot(m.x - P.x, m.z - P.z) > 40) || far; if (this.done) G.npcs = G.npcs.filter((m) => !m.removed); }
    } };
  },
  perseguicao() {
    const P = G.player; const sp = eventSpot(70, 160); if (!sp) return null;
    // rota de fuga: caminha pelos cruzamentos da cidade
    let a = Math.round((sp.p[0] - roadC(0)) / P_), b = Math.round((sp.p[1] - roadC(0)) / P_); a = Math.max(0, Math.min(N, a)); b = Math.max(0, Math.min(N, b));
    const route = []; let d = Math.floor(Math.random() * 4);
    for (let i = 0; i < 12; i++) { const D = [[1, 0], [0, 1], [-1, 0], [0, -1]]; let tries = 0; do { d = (d + (Math.random() < 0.5 ? 0 : Math.random() < 0.5 ? 1 : 3)) % 4; tries++; } while ((a + D[d][0] < 0 || a + D[d][0] > N || b + D[d][1] < 0 || b + D[d][1] > N) && tries < 10); a += D[d][0]; b += D[d][1]; route.push([roadC(a), roadC(b)]); }
    const runner = makeCarAt(pick(['coupe', 'sedan', 'hatch', 'luxo']), route[0][0], route[0][1]);
    const rd = new RouteDriver(runner, route.slice(1), { speed: 22, rubber: false }); G.aiDrivers.push(rd);
    const cops = []; for (let i = 0; i < 2; i++) { const c = makeCarAt('police', route[0][0] - 12 - i * 10, route[0][1]); const cd = new ChaseDriver(c, () => runner, { speed: 24 }); G.aiDrivers.push(cd); cops.push({ c, cd }); }
    toast('Perseguição policial passando pela região!', 3); G.sound('siren', 3);
    return { name: 'perseguicao', t: 0, update(dt) {
      this.t += dt; const far = Math.hypot(runner.x - G.player.x, runner.z - G.player.z) > 260;
      if (rd.done || this.t > 75 || far) {
        for (const o of [rd, ...cops.map((k) => k.cd)]) { const i = G.aiDrivers.indexOf(o); if (i >= 0) G.aiDrivers.splice(i, 1); }
        for (const c of [runner, ...cops.map((k) => k.c)]) if (c !== G.car) { c.driver = null; if (Math.hypot(c.x - G.player.x, c.z - G.player.z) > 60) removeCar(c); }
        this.done = true;
      }
    } };
  },
  assalto() {
    const P = G.player; const peds = G.npcs.filter((n) => n.role === 'ped' && n.alive && !n.inCar && !n.eventRole && Math.hypot(n.x - P.x, n.z - P.z) > 25 && Math.hypot(n.x - P.x, n.z - P.z) < 70);
    if (!peds.length) return null; const v = pick(peds);
    const look = { ...randomPedestrian(), female: false, skirt: null, hat: 'hood', hatColor: 0x141416, shirt: 0x1a1a1a, hairStyle: 'short' };
    const m = spawnNpc(look, { name: 'Assaltante', role: 'gang', x: v.x + Math.sin(v.heading) * 1.6, z: v.z + Math.cos(v.heading) * 1.6, behavior: 'mug', hp: 60, interactable: false });
    m.victim = v; m.gang = 'assalto'; m.gun = true; m.gunDmg = 6; m.eventRole = true;
    v.behavior = 'stand'; v.pose = 'handsup'; v.eventRole = true;
    toast('Um pedestre está sendo assaltado — ajude se quiser', 3);
    return { name: 'assalto', t: 0, update(dt) {
      this.t += dt;
      if (!m.alive && !this.rewarded) { this.rewarded = true; v.pose = null; v.behavior = 'stand'; G.addMoney(100); toast('"Obrigado por me ajudar!" — a vítima te deu R$ 100', 3); this.endT = this.t + 8; }
      if (m.alive && this.t > 9 && m.behavior === 'mug') { m.behavior = 'panic'; m.panicFrom = [v.x, v.z]; m.panicT = 20; v.pose = null; v.behavior = 'panic'; v.panicFrom = [m.x, m.z]; v.panicT = 5; }
      if ((this.endT && this.t > this.endT) || this.t > 40) { v.eventRole = false; if (v.loop) v.behavior = 'loop'; if (Math.hypot(m.x - G.player.x, m.z - G.player.z) > 30 || !m.alive) { m.remove(); G.world.dynamic.delete(m); G.npcs = G.npcs.filter((x) => x !== m); } this.done = true; }
    } };
  },
};
// atendentes das lojas de rua: aparecem só quando o jogador está perto (são dezenas de lojas)
let keeperT = 0;
function updateStoreKeepers(dt) {
  if ((keeperT -= dt) > 0) return; keeperT = 1;
  const P = G.player;
  for (const r of G.city.storeRooms) {
    const d = Math.hypot(r.x - P.x, r.z - P.z);
    if (!r.npc && d < 38) {
      const n = new NPC(scene, G.world, shopkeeperLook(), { name: 'Atendente — ' + r.name, role: 'shop', lines: [pick(SHOP_LINES), pick(SHOP_LINES)], x: r.x, z: r.z, y: r.y, heading: r.heading, behavior: 'stand' });
      G.npcs.push(n); G.world.dynamic.add(n); r.npc = n;
    } else if (r.npc && d > 70) { r.npc.remove(); G.world.dynamic.delete(r.npc); G.npcs = G.npcs.filter((x) => x !== r.npc); r.npc = null; }
  }
}
// clientes do shopping: andam em volta do chafariz; só existem com o jogador por perto
const mallPeds = [];
function updateMallShoppers() {
  const c = G.city.mallCenter; if (!c || keeperT !== 1) return; // roda junto com os atendentes (1x por segundo)
  const d = Math.hypot(c[0] - G.player.x, c[1] - G.player.z);
  if (!mallPeds.length && d < 45) {
    for (let i = 0; i < 12; i++) { const n = new NPC(scene, G.world, randomPedestrian(), { name: 'Cliente', role: 'ped', lines: [pick(PED_LINES)], behavior: 'loop', loop: G.city.mallLoops[i % 2] }); G.npcs.push(n); G.world.dynamic.add(n); mallPeds.push(n); }
  } else if (mallPeds.length && d > 85) {
    for (const n of mallPeds) { n.remove(); G.world.dynamic.delete(n); } G.npcs = G.npcs.filter((x) => !mallPeds.includes(x)); mallPeds.length = 0;
  }
}
// VEÍCULOS DE EMERGÊNCIA: viatura, ambulância ou bombeiros passam com sirene de vez em quando
const emergency = []; let emergT = 25 + Math.random() * 30;
function updateEmergency(dt) {
  if (!started) return; const P = G.player;
  for (const e of emergency) {
    const c = e.car; const d = Math.hypot(c.x - P.x, c.z - P.z);
    if (d < 75 && (e.sirenCd -= dt) <= 0) { e.sirenCd = 3.2; G.sound('siren', 2.6); }
    if (e.drv.done || d > 320 || (e.t += dt) > 120) { const i = G.aiDrivers.indexOf(e.drv); if (i >= 0) G.aiDrivers.splice(i, 1); if (c !== G.car && c.driver !== 'player') removeCar(c); e.dead = true; }
  }
  for (let i = emergency.length - 1; i >= 0; i--) if (emergency[i].dead) emergency.splice(i, 1);
  if (G.mission || G.flight || emergency.length >= 2 || (emergT -= dt) > 0) return;
  emergT = 40 + Math.random() * 60;
  // nasce num cruzamento a 120-200 m, passa perto do jogador e segue adiante
  const gi = (v) => Math.max(0, Math.min(N, Math.round((v - roadC(0)) / P_)));
  const pa = gi(P.x), pb = gi(P.z); let a, b, tries = 0;
  do { a = Math.floor(Math.random() * (N + 1)); b = Math.floor(Math.random() * (N + 1)); tries++; } while (tries < 30 && (Math.hypot(roadC(a) - P.x, roadC(b) - P.z) < 120 || Math.hypot(roadC(a) - P.x, roadC(b) - P.z) > 220));
  if (Math.abs(P.x) > 260 || Math.abs(P.z) > 260) return; // fora de Los Valles
  const route = []; let ca = a, cb = b;
  while ((ca !== pa || cb !== pb) && route.length < 14) { if (ca !== pa && (cb === pb || Math.random() < 0.5)) ca += Math.sign(pa - ca); else cb += Math.sign(pb - cb); route.push([roadC(ca), roadC(cb)]); }
  const D = [[1, 0], [-1, 0], [0, 1], [0, -1]]; for (let k = 0; k < 5; k++) { const d = pick(D.filter(([dx, dz]) => ca + dx >= 0 && ca + dx <= N && cb + dz >= 0 && cb + dz <= N)); ca += d[0]; cb += d[1]; route.push([roadC(ca), roadC(cb)]); }
  const type = pick(['police', 'ambulancia', 'bombeiros', 'ambulancia', 'police']);
  const car = makeCarAt(type, roadC(a), roadC(b)); car.emergency = true; car.heading = Math.atan2(route[0][0] - car.x, route[0][1] - car.z); car.syncTransform(0);
  const drv = new RouteDriver(car, route, { speed: type === 'bombeiros' ? 19 : 23, rubber: false }); G.aiDrivers.push(drv);
  emergency.push({ car, drv, t: 0, sirenCd: 0 });
}
G.spawnEmergency = () => { emergT = 0; updateEmergency(0.01); return emergency.map((e) => e.car.type); };
G.emergency = emergency;
function makeCarAt(type, x, z) { const c = new Vehicle(type, pick(CAR_COLORS), G.world); scene.add(c.group); G.world.dynamic.add(c); G.cars.push(c); c.place(x, z, 0); c.fuel = 1; return c; }
function updateEvents(dt) {
  if (!started || G.mission || G.heist || G.flight) return;
  if (EV.active) { EV.active.update(dt); if (EV.active.done) EV.active = null; return; }
  if ((EV.t -= dt) > 0) return;
  EV.t = 110 + Math.random() * 110;
  const kind = pick(['gangues', 'gangues', 'perseguicao', 'assalto']);
  EV.active = EVENTS[kind]() || null;
}
G.startEvent = (k) => { if (EV.active) return EV.active.name; EV.active = EVENTS[k](); return EV.active && EV.active.name; };
G.EV = EV;
// ---------------- AVIÃO: embarque pela escada, voo e pouso ----------------
function planeBoardSpot() {
  const P = G.player, pl = G.plane, Z = G.zones.spots; if (P.mode !== 'foot') return null;
  const parked = Math.hypot(pl.x - Z.planePark[0], pl.z - Z.planePark[1]) < 3 && Math.abs(pl.speed) < 0.5;
  if (parked && Math.hypot(P.x - Z.stairBase[0], P.z - Z.stairBase[1]) < 2.4) return { stairs: true };
  const [dx, dz] = pl.local(pl.dims.R + 1.4, 8);
  if (Math.hypot(P.x - dx, P.z - dz) < 2.6) return { stairs: false, door: [dx, dz] };
  return null;
}
function boardPlane(st) {
  const P = G.player, Z = G.zones.spots;
  if (G.weapons.current !== 'mao') G.weapons.equip('mao');
  G.board = { t: 0, phase: 'walk', st, x0: P.x, z0: P.z, y0: P.y };
  G.inputLocked = true; P.mode = 'board'; // a física de andar fica desligada durante a animação
}
function updateBoarding(dt) {
  const B = G.board; if (!B) return; const P = G.player, Z = G.zones.spots, pl = G.plane; B.t += dt;
  const base = B.st.stairs ? Z.stairBase : B.st.door, top = B.st.stairs ? Z.stairTop : B.st.door;
  const gy = G.world.groundFn(base[0], base[1]); const topY = gy + (B.st.stairs ? Z.stairH : 2.2);
  if (B.phase === 'walk') {
    const k = Math.min(1, B.t / 0.5); P.x = B.x0 + (base[0] - B.x0) * k; P.z = B.z0 + (base[1] - B.z0) * k; P.heading = Math.atan2(top[0] - base[0], (top[1] - base[1]) || -1); P.sync();
    P.model.update(dt, { speed: 1.6, grounded: true, mode: 'foot' });
    if (B.t >= 0.5) { B.phase = 'climb'; B.t = 0; }
  } else if (B.phase === 'climb') { // sobe degrau por degrau
    const D = B.st.stairs ? 1.9 : 0.7; const k = Math.min(1, B.t / D);
    P.x = base[0] + (top[0] - base[0]) * k; P.z = base[1] + (top[1] - base[1]) * k; P.y = gy + (topY - gy) * k; P.sync();
    P.model.update(dt, { speed: 1.4, grounded: true, mode: 'foot' });
    if (B.t >= D) { B.phase = 'enter'; B.t = 0; P.heading = pl.heading - Math.PI / 2; P.sync(); }
  } else if (B.phase === 'enter') { // entra pela porta
    const k = Math.min(1, B.t / 0.5); const [ix, iz] = pl.local(0, 8); P.x = top[0] + (ix - top[0]) * k; P.z = top[1] + (iz - top[1]) * k; P.y = topY; P.sync();
    P.model.update(dt, { speed: 1.4, grounded: true, mode: 'foot' });
    if (B.t >= 0.5) { G.board = null; startFlight(); }
  }
}
function startFlight() {
  const P = G.player; P.mode = 'plane'; P.model.root.visible = false; G.flight = { camT: 0 }; G.inputLocked = false; G.camOverride = true;
  showBanner('AVIÃO', 'W/S motor · A/D virar · Espaço sobe o nariz · Shift desce · E sai (parado no chão)', false);
  toast('Acelere (W) até 150 km/h e puxe o nariz (Espaço) para decolar', 5); G.sound('ping');
}
function endFlight(crash = false) {
  const P = G.player, pl = G.plane; G.flight = null; G.camOverride = false; P.mode = 'foot'; P.model.root.visible = true; camera.fov = settings.fov; camera.far = Q.far; camera.updateProjectionMatrix();
  const [ox, oz] = crash ? [pl.x, pl.z] : pl.local(pl.dims.R + 2, 8); P.place(ox, oz, pl.heading); G.cam.yaw = pl.heading + Math.PI; G.cam.initialized = false;
  G.audio.update(false, 0, 0, 'jet');
}
const _cp = new THREE.Vector3(), _cl = new THREE.Vector3();
function updateFlight(dt) {
  if (!G.flight) return; const pl = G.plane, P = G.player, S = G.story;
  const locked = G.inputLocked || G.phone.open || paused;
  const inp = locked ? { throttle: 0, steer: 0, pitch: 0 } : { throttle: (down('KeyW', 'ArrowUp') ? 1 : 0) - (down('KeyS', 'ArrowDown') ? 1 : 0), steer: (down('KeyA', 'ArrowLeft') ? 1 : 0) - (down('KeyD', 'ArrowRight') ? 1 : 0), pitch: (down('Space') ? 1 : 0) - (down('ShiftLeft', 'ShiftRight') ? 1 : 0) };
  if (G.testPlaneInput) Object.assign(inp, G.testPlaneInput);
  const ev = pl.update(dt, inp);
  P.x = pl.x; P.z = pl.z; P.y = pl.y;
  if (ev === 'land') toast('Pouso! Use S para frear e E para sair quando parar', 3);
  if (pl.atEdge && !G.flight.edgeMsg) { G.flight.edgeMsg = true; toast('Limite do mapa — voltando para a cidade', 2.5); } else if (!pl.atEdge) G.flight.edgeMsg = false;
  if (ev === 'crash') {
    G.flash(); G.sound('crash'); G.shake && G.shake(0.6); pl.group.visible = false;
    endFlight(true); damagePlayer(65); P.startRagdoll({ x: Math.sin(pl.heading) * 6, y: 4, z: Math.cos(pl.heading) * 6 }, null, 3);
    showBanner('O AVIÃO CAIU', 'Um novo avião estará no aeroporto em instantes', true);
    setTimeout(() => { pl.group.visible = true; pl.place(...G.zones.spots.planePark); }, 8000);
    return;
  }
  if (!locked && hit('KeyE') && pl.onGround && pl.speed < 3) { endFlight(false); return; }
  if (!locked && hit('KeyE') && !(pl.onGround && pl.speed < 3)) toast('Pare o avião no chão para sair', 1.5);
  // câmera de perseguição atrás do avião
  const fx = Math.sin(pl.heading), fz = Math.cos(pl.heading);
  _cp.set(pl.x - fx * 32, pl.y + 9 + Math.max(0, -pl.pitch) * 8, pl.z - fz * 32);
  const k = G.flight.camT === 0 ? 1 : Math.min(1, dt * 4); G.flight.camT += dt;
  camera.position.lerp(_cp, k); _cl.set(pl.x + fx * 12, pl.y + 2.5 + Math.sin(pl.pitch) * 10, pl.z + fz * 12); camera.lookAt(_cl);
  if (camera.fov !== settings.fov + 6 || camera.far < 1500) { camera.fov = settings.fov + 6; camera.far = 1800; camera.updateProjectionMatrix(); }
  G.audio.update(true, 10 + pl.throttle * 40, pl.throttle, 'jet');
}
G.boardPlane = boardPlane; G.planeBoardSpot = planeBoardSpot;
// ---------------- CÓDIGOS (app do celular) ----------------
const spawned = [];
G.spawnVehicle = (type) => {
  if (!CAR_TYPES[type]) return;
  const P = G.player; if (G.car) forceExitCar();
  const c = new Vehicle(type, pick(CAR_COLORS), G.world); scene.add(c.group); G.world.dynamic.add(c); G.cars.push(c);
  const fx = Math.sin(P.heading), fz = Math.cos(P.heading); c.place(P.x + fx * 5, P.z + fz * 5, P.heading + Math.PI / 2);
  c.fuel = 1; c.parked = false; c.owner = G.state.char === 'ryan' ? 'Ryan' : 'Ethan';
  spawned.push(c); while (spawned.length > 6) { const o = spawned.shift(); if (o !== G.car) removeCar(o); }
  toast(`${c.T.name} apareceu na sua frente`, 2.5); G.sound('ping');
};
G.cheat = (code) => {
  const k = code.toUpperCase().replace(/[^A-Z0-9]/g, ''); const C = G.campaign();
  if (k === 'TODOSCARROS') return { msg: 'Escolha um carro:', list: CAR_LIST.map((t) => [t, CAR_TYPES[t].name]) };
  if (k === 'TODASMOTOS') return { msg: 'Escolha uma moto:', list: MOTO_TYPES.map((t) => [t, CAR_TYPES[t].name]) };
  if (k === 'SEMFOME') { C.needs.fome = 100; return { msg: 'Fome cheia (continua descendo normalmente).' }; }
  if (k === 'VIDACHEIA') { G.player.hp = 100; C.needs.dor = 0; return { msg: 'Vida cheia.' }; }
  if (k === 'SEMPOLICIA') { G.wanted.stars = 0; return { msg: 'Procurado zerado.' }; }
  if (k === 'MOEDAINFINITA') { G.addMoney(20000); C.flags.moedaInfinita = true; SAVE.writeSlot('auto', snapshot()); return { msg: 'R$ 20.000 adicionados! A partir de agora cada missão concluída dá +R$ 50.' }; }
  return { msg: 'Código inválido.' };
};
// motoristas visíveis no trânsito: bonecos reaproveitados, só nos carros mais próximos da câmera
const driverPool = []; let driverT = 0;
function updateDriverModels(dt) {
  if ((driverT -= dt) <= 0) {
    driverT = 0.3;
    const cx = camera.position.x, cz = camera.position.z; const d2 = (c) => (c.x - cx) ** 2 + (c.z - cz) ** 2;
    const want = G.cars.filter((c) => c.driver === 'ai' && !c.removed && !c.storyKey && !c.T.moto && !c.jacked && d2(c) < 55 * 55).sort((a, b) => d2(a) - d2(b)).slice(0, 10);
    for (const d of driverPool) if (d.car && !d.busy && (!want.includes(d.car) || d.car.driver !== 'ai')) { if (d.model.root.parent) d.model.root.parent.remove(d.model.root); d.car.driverModel = null; d.car = null; }
    for (const c of want) {
      if (c.driverModel) continue;
      const kind = c.T.police ? 'police' : 'civil';
      let d = driverPool.find((x) => !x.car && !x.busy && x.kind === kind);
      if (!d) { if (driverPool.length >= 12) continue; d = { kind, model: new Humanoid(kind === 'police' ? policeLook() : randomPedestrian()), car: null }; driverPool.push(d); }
      c.body.add(d.model.root); d.model.root.position.copy(c.seat); d.model.root.rotation.set(0, 0, 0); d.car = c; c.driverModel = d.model;
      d.model.update(0.5, { mode: 'sit' });
    }
  }
  for (const d of driverPool) if (d.car) { d.model.root.visible = !d.car.lod; if (!d.car.lod) d.model.update(dt, { mode: 'sit', steer: d.car.steer * 1.5 }); }
}
G.driverPool = driverPool;
// comer/beber: o item aparece na mão do personagem por alguns segundos
let eatModel = null;
function eatAnim(kind) {
  const P = G.player; const hand = P.model.bones.handR;
  if (eatModel) hand.remove(eatModel);
  eatModel = handItem(kind); eatModel.position.set(0, -0.09, 0.05); eatModel.rotation.set(Math.PI / 2, 0, 0);
  hand.add(eatModel);
  for (const m of Object.values(G.weapons.models)) m.visible = false;
  P.eatT = kind === 'remedio' ? 1.6 : 3.2;
  G.sound('page');
}
function updateEat(dt) {
  const P = G.player; if (!(P.eatT > 0)) return;
  P.eatT -= dt;
  if (P.eatT <= 0 || P.mode !== 'foot') { P.eatT = 0; if (eatModel && eatModel.parent) eatModel.parent.remove(eatModel); eatModel = null; G.weapons.attach(); }
}
G.eatAnim = eatAnim;
async function interactNPC(npc) {
  const S = G.story; const C = G.campaign();
  const items = npc.role === 'shop' ? shopMenu(npc) : [];
  npc.talking = true;
  if (items.length) {
    const opts = [...items, { text: 'Conversar' }, { text: 'Sair' }];
    G.inputLocked = true;
    const i = await S.choose(opts, npc.name);
    G.inputLocked = false;
    if (i < items.length && items[i].heist) { npc.talking = false; G.inputLocked = false; startHeist(npc); return; }
    if (i < items.length) {
      const it = items[i];
      if (C.money < it.price) toast('Dinheiro insuficiente');
      else {
        G.addMoney(-it.price);
        for (const k of ['fome', 'sede', 'sono']) if (it[k]) C.needs[k] = Math.min(100, C.needs[k] + it[k]);
        if (it.weapon) { const s2 = G.weapons.inv[it.weapon]; s2.owned = true; s2.clip = WEAPONS[it.weapon].mag; s2.ammo += WEAPONS[it.weapon].mag; G.weapons.equip(it.weapon); SAVE.writeSlot('auto', snapshot()); }
        if (it.ammo) G.weapons.inv[it.ammo].ammo += WEAPONS[it.ammo].ammoPack;
        if (it.dor) C.needs.dor = Math.max(0, C.needs.dor + it.dor);
        if (it.eat) eatAnim(it.eat);
        toast('Comprado: ' + it.text.split(' — ')[0]);
      }
    } else if (i === items.length) { G.inputLocked = true; await S.say(npc, npc.nextLine() || '...'); G.inputLocked = false; S.hideDialog(); }
  } else {
    G.inputLocked = true; await S.say(npc, npc.nextLine() || '...'); G.inputLocked = false; S.hideDialog();
  }
  npc.talking = false;
}
async function sleep() {
  const S = G.story; const C = G.campaign();
  G.inputLocked = true; await S.fadeOut(0.8);
  G.setHour(G.state.hour + 8); if (G.state.hour < 8) G.state.day++;
  C.needs.sono = 100; C.needs.fome = Math.max(0, C.needs.fome - 12); C.needs.sede = Math.max(0, C.needs.sede - 18); C.needs.dor = 0; G.player.hp = 100;
  SAVE.writeSlot('auto', snapshot());
  await S.fadeIn(0.8); G.inputLocked = false; toast('Você dormiu 8 horas. Jogo salvo.');
}
async function service(kind) {
  const C = G.campaign();
  if (kind === 'hospital') {
    if (C.money < 150) { toast('Atendimento custa R$ 150'); return; }
    G.addMoney(-150); G.player.hp = 100; C.needs.dor = 0; toast('Você foi atendido no hospital.'); SAVE.writeSlot('auto', snapshot());
  } else if (kind === 'oficina') {
    const car = G.car; if (!car) return; const cost = Math.round((1 - car.health) * 400) + 20;
    if (C.money < cost) { toast('Conserto custa R$ ' + cost); return; }
    G.addMoney(-cost); car.health = 1; toast('Carro consertado (R$ ' + cost + ')'); SAVE.writeSlot('auto', snapshot());
  } else if (kind === 'posto') {
    const car = G.car; if (!car) return; const liters = (1 - car.fuel) * car.tank; const cost = Math.round(liters * 5.89);
    if (liters < 0.5) { toast('O tanque já está cheio'); return; }
    if (C.money < cost) { toast(`Abastecer custa R$ ${cost}`); return; }
    G.addMoney(-cost); car.fuel = 1; toast(`Abastecido: ${liters.toFixed(1)} L (R$ ${cost})`);
  }
}
const warned = {};
function updateNeeds(dt) {
  const C = G.campaign(); const n = C.needs; const gm = dt; // 1 s = 1 minuto do jogo
  n.fome = Math.max(0, n.fome - 0.035 * gm); n.sede = Math.max(0, n.sede - 0.055 * gm); n.sono = Math.max(0, n.sono - 0.026 * gm);
  n.dor = Math.max(0, n.dor - 0.5 * gm);
  const P = G.player;
  const starving = n.fome < 5 || n.sede < 5 || n.sono < 3;
  if (starving) P.hp = Math.max(0, P.hp - 0.25 * dt);
  else if (G.story.t - lastHurt > 6 && P.hp < 100 && n.fome > 25 && n.sede > 25) P.hp = Math.min(100, P.hp + (n.dor > 50 ? 0.2 : 0.6) * dt);
  for (const k of ['fome', 'sede', 'sono']) {
    if (n[k] < 25 && !warned[k]) { warned[k] = true; toast({ fome: 'Ethan está com fome — compre comida numa loja', sede: 'Com sede — compre água numa loja', sono: 'Com sono — durma na casa (porta)' }[k].replace('Ethan', C.char === 'ryan' ? 'Ryan' : 'Ethan'), 4); }
    if (n[k] > 40) warned[k] = false;
  }
  C.hp = P.hp;
}
function renderStats() {
  const C = G.campaign(); const n = C.needs;
  const bar = (label, v, col) => `<div class="stat"><span>${label}</span><i><b style="width:${Math.max(0, Math.min(100, v))}%;background:${col}"></b></i></div>`;
  $('stats').innerHTML = bar('VIDA', G.player.hp, '#d84a4a') + bar('FOME', n.fome, '#d8a04a') + bar('SEDE', n.sede, '#4a9ad8') + bar('SONO', n.sono, '#9a7ad8') + bar('DOR', n.dor, '#e06a8a');
  $('money').textContent = 'R$ ' + C.money.toLocaleString('pt-BR');
  $('stars').textContent = W.stars ? '★'.repeat(W.stars) + '☆'.repeat(6 - W.stars) : '';
  $('stars').classList.toggle('flash', W.stars > 0 && W.unseen > 2);
}

// ---------------- MINIMAPA ----------------
let mmBase; const MM = 900, MMW = 1300; // largura cobre x de -450 até 850
function buildMinimap() {
  mmBase = document.createElement('canvas'); mmBase.width = MMW; mmBase.height = MM;
  const g = mmBase.getContext('2d'); const o = MM / 2;
  g.fillStyle = '#2d4224'; g.fillRect(0, 0, MMW, MM);
  const colors = { res: '#5d7a4a', park: '#3f7a3a', down: '#8a8580', mixed: '#9a9286', shops: '#a8927a', shops2: '#a8927a', police: '#5a6a9a', gas: '#a87a6a', parking: '#6a6a6a', apart: '#8a8070', hospital: '#c8c8c8', mall: '#c9b48c',
    bwres: '#4f6a42', bwshops: '#98806a', square: '#a8a090', cemetery: '#4a5a44', bwpolice: '#5a6a9a', motel: '#8a6a5a', bwmixed: '#8a8278', bwgas: '#7a8a6a', factory: '#6a4a3a', bwforest: '#2f5a2a' };
  g.fillStyle = '#3a3a3c'; g.fillRect(o - HALF, o - HALF, HALF * 2, HALF * 2);
  for (let k = 0; k < N; k++) for (let j = 0; j < N; j++) {
    g.fillStyle = '#b9b3a6'; g.fillRect(o + blockC(j) - BLOCK / 2, o + blockC(k) - BLOCK / 2, BLOCK, BLOCK);
    g.fillStyle = colors[LAYOUT[k][j]] || '#888'; g.fillRect(o + blockC(j) - BLOCK / 2 + 4, o + blockC(k) - BLOCK / 2 + 4, BLOCK - 8, BLOCK - 8);
  }
  // Blackwood
  g.fillStyle = '#3a3a3c'; g.fillRect(o + BW.x - BW.half, o + BW.z - BW.half, BW.half * 2, BW.half * 2);
  for (let k = 0; k < BW.n; k++) for (let j = 0; j < BW.n; j++) {
    g.fillStyle = '#a8a296'; g.fillRect(o + bwBlock(j) - BLOCK / 2, o + bwBlockZ(k) - BLOCK / 2, BLOCK, BLOCK);
    g.fillStyle = colors[BW_LAYOUT[k][j]] || '#888'; g.fillRect(o + bwBlock(j) - BLOCK / 2 + 4, o + bwBlockZ(k) - BLOCK / 2 + 4, BLOCK - 8, BLOCK - 8);
  }
  g.fillStyle = '#2a5a7a'; g.fillRect(o + RIVER.x0, 0, RIVER.x1 - RIVER.x0, MM);
  g.strokeStyle = '#3a3a3c'; g.lineWidth = 8;
  for (const [x0, z0, x1, z1] of [[0, 234, 0, 302], [-234, 76, -306, 76], [234, 0, 484, 0], [330, -75, 330, 75], [300, -20, 410, -20], [300, 22, 410, 22], [-76, -234, -76, -314], [152, -234, 152, -320], [-152, -234, -152, -296]]) { g.beginPath(); g.moveTo(o + x0, o + z0); g.lineTo(o + x1, o + z1); g.stroke(); }
  g.strokeStyle = '#7a6448'; g.lineWidth = 5; g.beginPath(); g.moveTo(o + 16, o + 352); g.lineTo(o + 168, o + 352); g.stroke();
  for (const k of ['favela', 'prison', 'industrial', 'abandoned', 'mansion', 'fernando']) {
    const p = PLACES[k]; g.fillStyle = { favela: '#9a7a5a', prison: '#6a6a6a', industrial: '#7a7a88', abandoned: '#5a5040', mansion: '#c8b88a', fernando: '#6a8a6a' }[k];
    g.fillRect(o + p.x - p.w / 2, o + p.z - p.d / 2, p.w, p.d);
  }
  g.fillStyle = '#4a7a3a'; g.beginPath(); g.arc(o + PLACES.hill.x, o + PLACES.hill.z, PLACES.hill.r * 0.8, 0, 7); g.fill();
  g.strokeStyle = '#b8a040'; g.setLineDash([6, 6]); g.lineWidth = 0.8;
  for (let i = 0; i <= N; i++) {
    g.beginPath(); g.moveTo(o + roadC(i), o - HALF); g.lineTo(o + roadC(i), o + HALF); g.stroke();
    g.beginPath(); g.moveTo(o - HALF, o + roadC(i)); g.lineTo(o + HALF, o + roadC(i)); g.stroke();
  }
  for (let i = 0; i <= BW.n; i++) {
    g.beginPath(); g.moveTo(o + bwRoad(i), o + BW.z - BW.half); g.lineTo(o + bwRoad(i), o + BW.z + BW.half); g.stroke();
    g.beginPath(); g.moveTo(o + BW.x - BW.half, o + bwRoadZ(i)); g.lineTo(o + BW.x + BW.half, o + bwRoadZ(i)); g.stroke();
  }
  g.setLineDash([]); g.fillStyle = '#ffffff'; g.font = 'bold 22px Arial'; g.textAlign = 'center';
  g.fillText('LOS VALLES', o, o - HALF - 12); g.fillText('BLACKWOOD', o + BW.x, o + BW.z - BW.half - 12);
  G.mmOrigin = o;
}
function mapMarks(g, p, zoom, rel = true) {
  const mark = (x, z, col, r) => { g.fillStyle = col; g.beginPath(); g.arc(rel ? x - p.x : x, rel ? z - p.z : z, r / zoom, 0, Math.PI * 2); g.fill(); };
  for (const d of G.drivers) mark(d.car.x, d.car.z, '#d0d0d0', 2);
  for (const u of G.police) mark(u.car.x, u.car.z, Math.floor(G.story.t * 4) % 2 ? '#ff3030' : '#3060ff', 4);
  if (!G.car) mark(G.ethanCar.x, G.ethanCar.z, '#3a8aff', 4);
  for (const mk of startMarkers) if (mk.visible) mark(mk.position.x, mk.position.z, mk.side ? '#3ad87a' : '#3a9aff', 6);
  const obj = G.story.objTarget && G.story.resolve(G.story.objTarget);
  if (obj) mark(obj[0], obj[1], '#ffd23a', 6);
}
// orientação do minimapa: mundo X → direita, Z → baixo; a câmera olha para (-sin yaw, -cos yaw)
function mapRotation() { return G.cam.yaw; }
// a seta é desenhada apontando para cima; gira para a direção real (personagem ou carro) em relação ao mapa
function arrowRotation(h) { return Math.PI - (h - G.cam.yaw); }
function northPos(r) { const y = G.cam.yaw; return [Math.sin(y) * r, -Math.cos(y) * r]; } // norte = -Z
G.mapMath = { mapRotation, arrowRotation, northPos };
function drawMinimap() {
  const c = $('minimap'); const g = c.getContext('2d'); const W2 = c.width, H = c.height;
  const p = G.car || G.player; const o = G.mmOrigin;
  const zoom = G.car ? 0.75 : 1.2;
  g.save(); g.clearRect(0, 0, W2, H);
  g.beginPath(); g.arc(W2 / 2, H / 2, W2 / 2 - 2, 0, Math.PI * 2); g.clip();
  g.fillStyle = '#1a2414'; g.fillRect(0, 0, W2, H);
  g.translate(W2 / 2, H / 2); g.scale(zoom, zoom);
  // gira o mapa para que a direção da câmera fique para cima
  g.rotate(mapRotation());
  g.drawImage(mmBase, -(o + p.x), -(o + p.z));
  mapMarks(g, p, zoom);
  g.restore();
  g.save(); g.translate(W2 / 2, H / 2);
  const h = (G.car ? G.car.heading : G.player.heading);
  g.rotate(arrowRotation(h));
  g.fillStyle = '#ff5a3a'; g.beginPath(); g.moveTo(0, -8); g.lineTo(6, 7); g.lineTo(0, 3); g.lineTo(-6, 7); g.closePath(); g.fill();
  g.restore();
  g.strokeStyle = 'rgba(255,255,255,0.6)'; g.lineWidth = 2; g.beginPath(); g.arc(W2 / 2, H / 2, W2 / 2 - 2, 0, Math.PI * 2); g.stroke();
  g.fillStyle = '#fff'; g.font = 'bold 12px Arial'; g.textAlign = 'center';
  const [nx, ny] = northPos(W2 / 2 - 12);
  g.fillText('N', W2 / 2 + nx, H / 2 + ny + 4);
}
G.drawPhoneMap = (cv) => {
  const g = cv.getContext('2d'); const s = cv.width / MMW; cv.height = Math.round(MM * s); g.save(); g.scale(s, s); g.drawImage(mmBase, 0, 0);
  g.translate(G.mmOrigin, G.mmOrigin); mapMarks(g, { x: 0, z: 0 }, s, false);
  const p = G.car || G.player; const h = G.car ? G.car.heading : G.player.heading;
  g.translate(p.x, p.z); g.rotate(-h + Math.PI); g.fillStyle = '#ff5a3a'; g.beginPath(); g.moveTo(0, -14); g.lineTo(10, 12); g.lineTo(0, 5); g.lineTo(-10, 12); g.closePath(); g.fill(); g.restore();
};

// ---------------- FOTOS DA HISTÓRIA (renderizadas no estúdio) ----------------
function studioShot(looks, w = 420, h = 300) {
  const S0 = PLACES.studio; const temp = looks.map((L, i) => {
    const hm = new Humanoid(L); hm.root.position.set(S0.x - (looks.length - 1) * 0.45 + i * 0.9, S0.y, S0.z); hm.root.rotation.y = (i - (looks.length - 1) / 2) * -0.25;
    hm.update(0.5, { speed: 0, grounded: true, mode: 'foot' }); scene.add(hm.root); return hm;
  });
  const cam = new THREE.PerspectiveCamera(30, w / h, 0.1, 60); cam.position.set(S0.x, S0.y + 1.55, S0.z + 4.6); cam.lookAt(S0.x, S0.y + 1.3, S0.z);
  const hemi = G.sky.hemi, hi = hemi.intensity, hc = hemi.color.getHex(), fogD = scene.fog.density;
  hemi.intensity = 2.6; hemi.color.setHex(0xffffff); scene.fog.density = 0;
  const c = G.story.capture(cam, w, h);
  hemi.intensity = hi; hemi.color.setHex(hc); scene.fog.density = fogD;
  temp.forEach((hm) => scene.remove(hm.root));
  return c;
}
G.storyPhoto = (key) => {
  if (key === 'irmaoPolicial') {
    const ph = studioShot([CHARACTERS.brother.look, policeLook()]);
    const c = document.createElement('canvas'); c.width = 460; c.height = 380; const g = c.getContext('2d');
    g.fillStyle = '#f4f0e6'; g.fillRect(0, 0, 460, 380);
    g.filter = 'sepia(0.35) contrast(1.05)'; g.drawImage(ph, 20, 20); g.filter = 'none';
    g.fillStyle = '#ff8a2a'; g.font = 'bold 22px "Courier New", monospace'; g.textAlign = 'right'; g.fillText('12/08/2027', 424, 306);
    g.fillStyle = '#3a3428'; g.font = 'italic 16px Georgia, serif'; g.textAlign = 'left'; g.fillText('Foto encontrada dentro do livro', 24, 352);
    return c.toDataURL('image/jpeg', 0.85);
  }
  return '';
};
G.storyPhotoTexture = (key) => {
  const ph = studioShot([G.state.char === 'ethan' ? CHARACTERS.ethan.look : CHARACTERS.ethan.look], 300, 220);
  const c = document.createElement('canvas'); c.width = 320; c.height = 240; const g = c.getContext('2d');
  g.fillStyle = '#f0ece2'; g.fillRect(0, 0, 320, 240); g.drawImage(ph, 10, 10);
  g.save(); g.translate(160, 140); g.rotate(-0.18); g.fillStyle = '#d01818'; g.font = 'bold 44px "Comic Sans MS", "Segoe Print", cursive'; g.textAlign = 'center'; g.fillText('CULPADO??', 0, 0); g.restore();
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
};

// ---------------- LAÇO PRINCIPAL ----------------
const clock = new THREE.Clock();
let shadowFrame = 0;
let fpsAcc = 0, fpsN = 0, fpsShown = 0, lastAutosave = performance.now(), hourAcc = 0, pulsoCd = 0, vibeT = 120;
const tmpV = new THREE.Vector3();
function frame() {
  requestAnimationFrame(frame);
  const dt = Math.min(clock.getDelta(), 1 / 20);
  G.perf.tick();
  if (!G.manual) { step(wheel.open ? dt * 0.25 : dt); adaptResolution(dt); }
  // sombras recalculadas em quadros alternados na qualidade Média (o sol quase não se move)
  if (Q.shadows && Q.shadowEvery > 1) { renderer.shadowMap.autoUpdate = false; if (++shadowFrame % Q.shadowEvery === 0) renderer.shadowMap.needsUpdate = true; }
  if (!G.noRender) renderFrame();
  fpsAcc += dt; fpsN++;
  if (fpsAcc > 0.5) { fpsShown = Math.round(fpsN / fpsAcc); fpsAcc = 0; fpsN = 0; }
  pressed.clear();
}
let interiorT = 0, treeT = 0;
function step(dt) {
  const p = G.player; const S = G.story;
  G.lights.update(dt); updateSirens(dt);
  const active = started && !paused;
  const locked2 = G.inputLocked || G.phone.open || G.docOpen;
  // diálogos / escolhas / documentos
  if (active && hit('KeyE', 'Space', 'Enter')) S.advance = true;
  const choosing = $('dialog-choices').children.length > 0;
  for (let i = 1; i <= 9; i++) if (hit('Digit' + i, 'Numpad' + i)) { if (choosing) S.choice = i - 1; else if (wheel.open && i <= WEAPON_ORDER.length) { wheel.sel = i - 1; closeWheel(true); } else if (active && !locked2 && !S.cut && i <= WEAPON_ORDER.length) G.weapons.equip(WEAPON_ORDER[i - 1]); }
  if (hit('Tab')) { if (wheel.open) closeWheel(true); else if (active && !locked2) openWheel(); }
  if (wheel.open && (hit('Escape') || p.mode !== 'foot' || S.cut)) closeWheel(false);
  if (active && !locked2 && hit('KeyZ')) switchCharacter();
  if (active && S.cut && hit('KeyX', 'Backspace') && !choosing) { S.skipCut = true; }
  if (hit('F3')) { G.perf.toggle(); settings.showFps = G.perf.visible; saveSettings(); }
  if (hit('F4')) { if (G.perf.session) { const r = G.perf.stopSession(); toast(`Medição: mín ${r.min.toFixed(0)} · méd ${r.avg.toFixed(0)} · máx ${r.max.toFixed(0)} FPS`, 4); } else { G.perf.startSession(); G.perf.toggle(true); toast('Medição de FPS iniciada (F4 para parar)', 2); } }
  if (active && !locked2 && hit('KeyR')) G.weapons.reload();
  if (active && !locked2 && hit('KeyV')) aimToggle = !aimToggle;
  if (G.docOpen && hit('KeyE', 'Enter', 'Escape')) { G._docClose && G._docClose(); pressed.delete('KeyE'); }
  // relógio do jogo (1 s = 1 min)
  if (active && !S.cut) { G.state.hour += dt / 60; if (G.state.hour >= 24) { G.state.hour -= 24; G.state.day++; } hourAcc += dt; if (hourAcc > 0.5) { hourAcc = 0; G.sky.setHour(G.state.hour); } }
  if (active && !locked2 && hit('KeyN') && !G.mission) { G.setHour(G.state.hour + 3); toast('Horário: ' + String(Math.floor(G.state.hour)).padStart(2, '0') + 'h'); }
  if (active && hit('KeyH')) $('help').style.display = $('help').style.display === 'none' ? 'block' : 'none';
  if (active && hit('KeyT') && !S.cut && !G.inputLocked) { G.phone.toggle(); if (G.phone.open) G.unlockPointer(); else G.relockPointer(); }
  if (active && G.phone.open && hit('Escape')) { G.phone.toggle(false); }
  if (active && !locked2 && hit('KeyC')) p.crouchToggle = !p.crouchToggle;
  if (active && !locked2 && hit('KeyF')) playerPunch();
  punchCd -= dt; pulsoCd -= dt;
  updateEat(dt);
  updateDriverModels(dt); updateDoors(dt); updateJack(dt); updateHeist(dt); updateDealers(dt); updateEvents(dt); updateBoarding(dt); updateFlight(dt); updateEmergency(dt); updateStoreKeepers(dt); updateMallShoppers();
  // interiores das casas: só desenha os que estão perto (o jogador ou a câmera)
  if ((interiorT -= dt) <= 0) { interiorT = 0.25; const cx = G.camera.position.x, cz = G.camera.position.z; for (const it of G.city.interiors) { const dx = it.x - p.x, dz = it.z - p.z, ex = it.x - cx, ez = it.z - cz; it.group.visible = dx * dx + dz * dz < 1600 * LODM * LODM || ex * ex + ez * ez < 900 * LODM * LODM; } }
  if (active && !locked2 && hit('KeyQ') && G.campaign().tools.pulso) {
    if (pulsoCd > 0) toast('Pulso recarregando: ' + Math.ceil(pulsoCd) + 's', 1);
    else { pulsoCd = 16; let n = 0; for (const c of S.cameras) if (Math.hypot(c.x - p.x, c.z - p.z) < 26) { c.disabled = 8; n++; } toast(n ? `Pulso Eletrônico: ${n} câmera(s) desligada(s) por 8s` : 'Nenhuma câmera por perto', 2); G.sound('ping'); }
  }
  // interação
  let prompt = '';
  const startM = started ? updateStartMarkers() : null;
  if (p.mode === 'foot') {
    let npc = null, nd = 2.2;
    for (const n of G.npcs) { if (!n.interactable || !n.alive || n.inCar || n.team === 'enemy') continue; const d = Math.hypot(n.x - p.x, n.z - p.z); if (d < nd) { nd = d; npc = n; } }
    const car = G.carsLocked ? null : nearestCar();
    const H = G.city.ethanHouse; const lm = G.city.landmarks;
    const nearHosp = lm.find((l) => l.kind === 'hospital' && Math.hypot(l.x - p.x, l.z - p.z) < 5);
    const nearDoor = !G.mission && (Math.hypot(H.door[0] - p.x, H.door[1] - p.z) < 1.8 || (H.bed && Math.hypot(H.bed[0] - p.x, H.bed[1] - p.z) < 2.0));
    const free = active && !locked2 && !S.cut;
    if (G.jack) prompt = '';
    else if (G.storyPrompt) prompt = G.storyPrompt;
    else if (startM) { prompt = `[E] Iniciar missão: ${startM.title}`; if (free && G.consumeInteract()) runMission(startM, 0, false); }
    else if (nearDoor) { prompt = '[E] Dormir (8 horas e salvar)'; if (free && G.consumeInteract()) sleep(); }
    else if (nearHosp && !G.mission) { prompt = '[E] Atendimento médico (R$ 150)'; if (free && G.consumeInteract()) service('hospital'); }
    else if (npc && (!car || nd < 1.8) && !G.mission) { prompt = `[E] Falar com ${npc.name}`; if (free && G.consumeInteract()) interactNPC(npc); }
    else if (!G.mission && G.plane && !G.plane.crashed && G.plane.onGround && planeBoardSpot()) { const st = planeBoardSpot(); prompt = st.stairs ? '[E] Subir a escada e embarcar no avião' : '[E] Entrar no avião'; if (free && G.consumeInteract()) boardPlane(st); }
    else if (car) {
      const jackable = car.driver === 'ai' && !car.T.police && !car.storyKey && !G.mission && G.drivers.some((d) => d.car === car);
      const word = car.T.moto ? 'na moto' : 'no carro';
      prompt = jackable ? `[E] Roubar ${car.T.moto ? 'a moto' : 'o carro'}` : car.driver === 'ai' ? 'Ocupado' : `[E] Entrar ${word}${car === G.ethanCar ? ' (seu carro)' : ''}`;
      if (free && G.consumeInteract()) { if (jackable) stealCar(car); else enterCar(car); }
    }
    const input = active && !locked2 ? {
      x: (down('KeyD', 'ArrowRight') ? 1 : 0) - (down('KeyA', 'ArrowLeft') ? 1 : 0),
      z: (down('KeyW', 'ArrowUp') ? 1 : 0) - (down('KeyS', 'ArrowDown') ? 1 : 0),
      run: down('ShiftLeft', 'ShiftRight'), jump: hit('Space') && !S.cut, crouch: p.crouchToggle,
    } : { x: 0, z: 0, run: false, jump: false, crouch: p.crouchToggle };
    if (G.testInput) Object.assign(input, G.testInput);
    if (G.scope) { input.x = 0; input.z = 0; }
    G.weapons.update(dt, active && !locked2 && !S.cut ? { aim: mouseAim || aimToggle || !!G.testAim, fire: mouseFire || !!G.testFire } : { aim: false, fire: false });
    if (p.mode === 'foot') p.update(dt, input, G.cam.yaw);
  }
  if (p.mode === 'car') {
    const car = G.car;
    const lm = G.city.landmarks;
    const nearGas = lm.find((l) => l.kind === 'gas' && Math.hypot(l.x - car.x, l.z - car.z) < 14);
    const nearShop = lm.find((l) => l.kind === 'oficina' && Math.hypot(l.x - car.x, l.z - car.z) < 12);
    prompt = Math.abs(car.speed) > 4 ? '' : '[E] Sair do carro';
    if (Math.abs(car.speed) < 1 && !G.mission && nearGas) prompt += '   [G] Abastecer';
    if (Math.abs(car.speed) < 1 && !G.mission && nearShop) prompt += '   [G] Entrar na Los Valles Custom';
    if (G.custom.open) prompt = '';
    let input = active && !locked2 ? {
      throttle: down('KeyW', 'ArrowUp') ? 1 : 0, brake: down('KeyS', 'ArrowDown') ? 1 : 0,
      steer: (down('KeyA', 'ArrowLeft') ? 1 : 0) - (down('KeyD', 'ArrowRight') ? 1 : 0), handbrake: down('Space') ? 1 : 0,
    } : { throttle: 0, brake: 0, steer: 0, handbrake: S.cut ? 0 : 1 };
    if (G.testCarInput) input = { ...input, ...G.testCarInput };
    if (G.custom.open) input = { throttle: 0, brake: 0, steer: 0, handbrake: 1 };
    if (G.forceCarInput) input = { brake: 0, handbrake: 0, ...G.forceCarInput };
    const sp0 = Math.abs(car.speed);
    car.update(dt, input, G.cars);
    // impacto: dano ao carro, dor e crimes
    if (car.lastHit > 3) {
      car.health = Math.max(0, car.health - car.lastHit * 0.012);
      if (car.lastHit > 8) { const C = G.campaign(); C.needs.dor = Math.min(100, C.needs.dor + car.lastHit * 1.5); p.hp = Math.max(1, p.hp - (car.lastHit - 8) * 1.5); G.shake(0.25); }
      if (sp0 > 6 && G.police.some((u) => Math.hypot(u.car.x - car.x, u.car.z - car.z) < 6)) witnessCrime(1, 'viatura');
    }
    p.x = car.x; p.z = car.z; p.y = car.y;
    p.model.update(dt, car.T.moto ? { mode: 'moto', steer: car.steer * 1.5, lean: car.T.style === 'esportiva' ? 0.55 : car.T.style === 'custom' ? -0.05 : 0.2 } : { mode: 'sit', steer: car.steer * 1.5 });
    const rev = revT > 0 ? Math.sin(Math.min(1, revT) * Math.PI) : 0; revT -= dt;
    G.audio.update(true, rev ? Math.max(Math.abs(car.speed), rev * 22) : car.speed, Math.max(input.throttle, rev), car.soundProfile);
    turboFx(dt, car, input.throttle);
    if (active && !locked2 && !S.cut && G.consumeInteract()) exitCar();
    else if (active && !locked2 && hit('KeyG')) { if (nearGas) service('posto'); else if (nearShop && !G.mission) G.custom.enter(car); }
  } else G.audio.update(false, 0, 0);
  // trânsito, missões e polícia
  // carros que importam para a IA: em movimento, com motorista ou fora da vaga (os estacionados no meio-fio ficam de fora)
  const trafficCars = G.cars.filter((c) => !c.parked || c.awake || c.driver || Math.abs(c.speed) > 0.1);
  const ctx = { lights: G.lights, cars: G.cars, trafficCars, player: p, npcs: G.npcs };
  for (const d of G.drivers) d.update(dt, ctx);
  for (const d of G.aiDrivers) d.update(dt, ctx);
  if (active) updatePolice(dt);
  for (const c of G.cars) if (c.driver === null && c.awake) c.awake = c.updatePassive(dt);
  // NPCs
  const cctx = combatCtx();
  const nearCars = G.cars.filter((c) => Math.abs(c.speed) > 0.5 && Math.abs(c.x - p.x) < 120 && Math.abs(c.z - p.z) < 120);
  for (const n of G.npcs) {
    const d = Math.hypot(n.x - p.x, n.z - p.z);
    const story = n.role === 'story' || n.team !== 'neutral';
    if (!n.inCar) n.model.root.visible = d < 95 || story;
    if (d < 110 || story) {
      n.update(dt, cctx);
      for (const c of nearCars) if (n.reactToCar(c, dt) && c === G.car) { witnessCrime(1, 'atropelamento', n); }
    }
  }
  for (const c of G.cars) {
    const d = Math.abs(c.x - p.x) + Math.abs(c.z - p.z);
    c.group.visible = d < (c.driver ? Q.far * 0.7 : Q.far * 0.42);
    // carros parados usam o modelo simplificado a partir de 18 m; em movimento, a partir de 45 m
    const still = !c.driver && Math.abs(c.speed) < 0.1 && !c.awake && !(c.doorT > 0);
    c.cheap = c.driver === 'ai' && !c.storyKey && !c.sirenL && d > 110 && !G.police.some((u) => u.car === c);
    c.setLOD(c.driver !== 'player' && !c.sirenL && !c.storyKey && !c.jacked && (still ? d > 18 * LODM : d > 45 * LODM));
  }
  // morte
  // atropelado: o jogador vira ragdoll e levanta depois de alguns segundos
  if (started && p.mode === 'foot' && !p.ragdoll && !S.cut) for (const c of G.cars) {
    if (c === G.car || Math.abs(c.speed) < 7 || Math.abs(c.x - p.x) > 6 || Math.abs(c.z - p.z) > 6) continue;
    const r = c.pushCircleOut(p.x, p.z, 0.4, p.y, p.y + 1.7); if (!r) continue;
    const sp = Math.abs(c.speed); damagePlayer(Math.min(60, sp * 1.6), c);
    p.startRagdoll({ x: c.velX * 0.8 + r.nx * 2, y: 2.5 + sp * 0.1, z: c.velZ * 0.8 + r.nz * 2 }, { x: p.x, y: p.y + 0.6, z: p.z }, 2.6); G.sound('crash'); break;
  }
  if (started && p.hp <= 0 && p.mode === 'foot' && !p.ragdoll) { // corpo cai de verdade
    const f = G.lastHitFrom || [p.x - Math.sin(p.heading), p.z - Math.cos(p.heading)]; const dx = p.x - f[0], dz = p.z - f[1], d = Math.hypot(dx, dz) || 1;
    p.startRagdoll({ x: dx / d * 2.4, y: 0.6, z: dz / d * 2.4 }, null, 1.0);
  }
  if (started && p.hp <= 0 && !G.dead) {
    if (G.mission) { if (!S.failChecks) S.fail('Você morreu'); }
    else { G.dead = true; onDeath(); }
  }
  if (started && !paused) { updateNeeds(dt); S.update(dt); }
  G.custom.update(dt);
  // câmera
  if (G.scope) {
    const fwd = tmpV.set(-Math.sin(G.cam.yaw) * Math.cos(G.cam.pitch), -Math.sin(G.cam.pitch), -Math.cos(G.cam.yaw) * Math.cos(G.cam.pitch));
    camera.position.set(p.x, p.y + 1.65, p.z); camera.lookAt(p.x + fwd.x, p.y + 1.65 + fwd.y, p.z + fwd.z);
    if (camera.fov !== G.scope.fov) { camera.fov = G.scope.fov; camera.updateProjectionMatrix(); }
    p.heading = Math.atan2(fwd.x, fwd.z); p.sync();
  } else if (!G.camOverride) {
    if (camera.fov < 20) { camera.fov = settings.fov; camera.updateProjectionMatrix(); }
    if (p.mode === 'car') G.cam.update(dt, tmpV.set(G.car.x, G.car.y + 1.25, G.car.z), G.car);
    else G.cam.update(dt, tmpV.set(p.x, p.y + (p.crouch ? 1.1 : 1.55), p.z), null);
  }
  updateSwitchAnim(dt);
  if (shakeT > 0) { shakeT -= dt; camera.position.x += (Math.random() - 0.5) * shakeT * 0.6; camera.position.y += (Math.random() - 0.5) * shakeT * 0.6; }
  G.sky.follow(p.x, p.z, G.flight ? camera.position.y - 30 : 0); G.sky.tick(dt);
  if ((treeT -= dt) <= 0) { treeT = 0.5; G.city.updateTrees(camera.position.x, camera.position.z); }
  if (G.grass) G.grass.update(dt, camera.position);
  // Blackwood é mais enevoada
  const fogT = p.x > 440 ? Math.min(1, (p.x - 440) / 50) : 0;
  const fogTarget = G.flight ? Math.max(0.22, 1 - G.plane.altitude / 260) : 1 + fogT * 1.6; // voando alto: menos neblina para ver a cidade
  G.sky.fogMul = (G.sky.fogMul || 1) + (fogTarget - (G.sky.fogMul || 1)) * Math.min(1, dt * 2);
  if (G.scene.fog) G.scene.fog.density = G.sky.baseFogD ? G.sky.baseFogD * G.sky.fogMul : G.scene.fog.density;
  updateLighting(dt, p);
  updateBlobs();
  if (G.car && G.sky.night > 0.4) {
    const [fx, fz] = G.car.forward;
    G.headlight.intensity = 60;
    G.headlight.position.set(G.car.x + fx * 2.2, G.car.y + 0.8, G.car.z + fz * 2.2);
    G.headlight.target.position.set(G.car.x + fx * 20, G.car.y - 1.5, G.car.z + fz * 20);
  } else G.headlight.intensity = 0;
  // Blackwood
  if (p.x > 480 && !G.bwMsg) { G.bwMsg = true; showBanner('BLACKWOOD', 'Uma cidade pequena e antiga, do outro lado do rio', false); }
  if (p.x < 440) G.bwMsg = false;
  // salvamento automático a cada 5 minutos
  if (started && !G.mission && !paused && performance.now() - lastAutosave > 5 * 60 * 1000) { lastAutosave = performance.now(); SAVE.writeSlot('auto', snapshot()); toast('Salvamento automático', 1.5); }
  // VIBE: publicações aleatórias de vez em quando
  vibeT -= dt; if (started && vibeT < 0) { vibeT = 150 + Math.random() * 120; const p2 = pick(VIBE.aleatorio); G.phone.addPost({ ...p2, notify: false }); }
  // HUD
  $('prompt').textContent = prompt; $('prompt').style.display = prompt && started && !S.cut ? 'block' : 'none';
  if (G.flight) {
    const pl = G.plane; $('speedo').style.display = 'block'; $('speed').textContent = Math.round(pl.kmh); $('gear').textContent = pl.onGround ? 'SOLO' : 'VOO';
    $('fuel').textContent = `Altitude ${Math.round(pl.altitude)} m · Motor ${Math.round(pl.throttle * 100)}%${!pl.onGround && pl.speed < 34 ? ' · ESTOL! acelere' : ''}`;
  } else if (G.car) {
    $('speedo').style.display = 'block'; $('speed').textContent = Math.round(G.car.kmh); $('gear').textContent = G.car.speed < -0.5 ? 'R' : G.car.speed > 0.5 ? 'D' : 'N';
    $('fuel').textContent = `Combustível ${Math.round(G.car.fuel * 100)}% · Estado ${Math.round(G.car.health * 100)}%${G.car.fuel <= 0 ? ' · SEM COMBUSTÍVEL' : ''}`;
  } else $('speedo').style.display = 'none';
  $('fps').style.display = 'none';
  $('weapon').textContent = started ? G.weapons.hud() : '';
  document.body.classList.toggle('aiming', !!G.cam.aim);
  $('skiphint').style.display = S.cut && !choosing ? 'block' : 'none';
  if (toastT > 0) { toastT -= dt; if (toastT <= 0) $('toast').style.opacity = 0; }
  if (bannerT > 0) { bannerT -= dt; if (bannerT <= 0) $('banner').style.opacity = 0; }
  if (started) { drawMinimap(); renderStats(); }
}
async function onDeath() {
  const S = G.story;
  if (G.heist) { G.heist = null; S.clearObjective(); }
  showBanner('VOCÊ MORREU', 'Voltando ao último salvamento...', true);
  await new Promise((r) => setTimeout(r, 2500));
  const last = SAVE.latestSlot();
  if (last) SAVE.requestLoad(last.key);
  else { const lm = G.city.landmarks.find((l) => l.kind === 'hospital'); G.player.place(lm.x, lm.z, 0); G.player.hp = 100; G.dead = false; S.fadeIn(0.5); }
}

// ---------------- ILUMINAÇÃO NOTURNA E SOMBRAS DE CONTATO ----------------
let lampTimer = 0;
const _m4 = new THREE.Matrix4(), _q = new THREE.Quaternion(), _p3 = new THREE.Vector3(), _s3 = new THREE.Vector3();
function updateLighting(dt, p) {
  const n = G.sky.night;
  G.glow.material.opacity = n > 0.4 ? Math.min(1, n) * 0.9 : 0;
  lampTimer -= dt;
  if (lampTimer <= 0 && G.lampLights.length) {
    lampTimer = 0.35;
    const on = n > 0.4;
    const cx = G.camera.position.x, cz = G.camera.position.z;
    const fx = p.x - cx, fz = p.z - cz, fl = Math.hypot(fx, fz) || 1;
    const scored = [];
    for (const l of G.city.lamps) { const dx = l[0] - p.x, dz = l[2] - p.z; if (Math.abs(dx) > 90 || Math.abs(dz) > 90) continue; const d = Math.hypot(dx, dz); scored.push([d - Math.max(0, (dx * fx + dz * fz) / fl) * 0.4, l]); }
    scored.sort((a, b) => a[0] - b[0]);
    G.lampLights.forEach((L, i) => {
      const l = scored[i] && scored[i][1];
      L.visible = on && !!l;
      if (l) { L.position.set(l[0], l[1] - 0.3, l[2]); L.intensity = 90 * n; }
    });
  }
}
function updateBlobs() {
  const B = G.blobs; let i = 0; const max = B.instanceMatrix.count;
  const put = (x, y, z, sx, sz, rot) => {
    if (i >= max) return;
    _q.setFromAxisAngle(_p3.set(0, 1, 0), rot); _s3.set(sx, 1, sz);
    _m4.compose(_p3.set(x, y + 0.03, z), _q, _s3); B.setMatrixAt(i++, _m4);
  };
  const p = G.player;
  if (p.mode === 'foot') put(p.x, G.world.groundFn(p.x, p.z), p.z, 1.1, 1.1, 0);
  for (const n of G.npcs) if (n.model.root.visible && !n.inCar && Math.abs(n.x - p.x) + Math.abs(n.z - p.z) < 60) put(n.x, n.y, n.z, 1.0, 1.0, 0);
  for (const c of G.cars) if (c.group.visible && Math.abs(c.x - p.x) + Math.abs(c.z - p.z) < 90) put(c.x, c.y, c.z, c.T.W + 0.9, c.T.L + 1.0, c.heading);
  B.count = i; B.instanceMatrix.needsUpdate = true;
}
let adaptAcc = 0, adaptFrames = 0;
function adaptResolution(dt) {
  if (!settings.adaptive || !started || paused) return;
  adaptAcc += dt; adaptFrames++;
  if (adaptAcc < 2) return;
  const fps = adaptFrames / adaptAcc; adaptAcc = 0; adaptFrames = 0;
  let pr = pixelRatio;
  if (fps < 42 && pr > 0.6) pr = Math.max(0.6, pr - 0.1);
  else if (fps > 57 && pr < Q.pr) pr = Math.min(Q.pr, pr + 0.05);
  if (pr !== pixelRatio) G.setPixelRatio(pr);
}

// ---------------- INÍCIO ----------------
loadingText('Gerando Los Valles...');
setTimeout(() => {
  try {
    build(); bindUI();
    $('loading').style.display = 'none';
    G.ready = true;
    frame();
    const pending = SAVE.takePendingLoad();
    if (pending) { const d = SAVE.readSlot(pending); if (d) startFromState(d); }
  } catch (e) {
    console.error(e); loadingText('Erro ao iniciar: ' + e.message);
    G.error = e;
  }
}, 30);
// API para testes automatizados
G.start = (st) => startFromState(st || SAVE.newState());
G.SAVE = SAVE; G.snapshot = snapshot; G.runMission = runMission; G.missions = missions;
G.enterCar = (c) => enterCar(c || G.ethanCar);
G.exitCar = () => exitCar();
G.nearestCar = nearestCar;
G.step = step;
G.punch = playerPunch;
G.setPixelRatio = (pr) => { pixelRatio = pr; renderer.setPixelRatio(pr); renderer.setSize(window.innerWidth, window.innerHeight); if (post) post.setSize(); };
G.sim = (seconds, fps = 60) => { const n = Math.round(seconds * fps); for (let i = 0; i < n; i++) { step(1 / fps); pressed.clear(); } };
G.press = (code) => pressed.add(code);
G.interactNPC = interactNPC;
G.makeTestCar = (type, mods) => { const c = new Vehicle(type, 0x8a1a1a, G.world, mods); scene.add(c.group); G.world.dynamic.add(c); G.cars.push(c); c.fuel = 1; return c; };
G.removeTestCar = (c) => removeCar(c);
G.__unpause = () => { paused = false; };
G.render = () => renderFrame();
