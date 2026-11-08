// ENTRE SOMBRAS — jogo de mundo aberto 3D (Three.js / WebGL).
import * as THREE from 'three';
import { CollisionWorld } from './collision.js';
import { City, LAYOUT, N, P, ROAD, HALF, roadC, blockC, BLOCK } from './city.js';
import { Vehicle, CAR_COLORS, updateSirens } from './vehicle.js';
import { Player } from './player.js';
import { ThirdPersonCamera } from './camera.js';
import { NPC } from './npc.js';
import { CHARACTERS, randomPedestrian, shopkeeperLook, policeLook, SHOP_LINES, PED_LINES, POLICE_LINES } from './characters.js';
import { TrafficLights, spawnTraffic } from './traffic.js';
import { Sky, TIMES } from './sky.js';
import { EngineAudio } from './audio.js';
import { rand, pick, setSeed, rr } from './textures.js';

// ---------------- CONFIGURAÇÕES ----------------
const DEFAULTS = { sensitivity: 1.0, invertY: false, quality: 'media', autoFollow: true, fov: 68, showFps: true, time: 'entardecer', sound: true };
function loadSettings() {
  try { return { ...DEFAULTS, ...JSON.parse(localStorage.getItem('entreSombras.settings') || '{}') }; } catch (e) { return { ...DEFAULTS }; }
}
function saveSettings() { try { localStorage.setItem('entreSombras.settings', JSON.stringify(settings)); } catch (e) { /* ignora */ } }
const settings = loadSettings();
const QUALITY = {
  baixa: { label: 'Baixa', pr: 0.75, aa: false, shadows: false, size: 512, extent: 40, peds: 28, traffic: 8, far: 260 },
  media: { label: 'Média', pr: 1.0, aa: false, shadows: true, size: 1024, extent: 45, peds: 45, traffic: 12, far: 340 },
  alta: { label: 'Alta', pr: Math.min(window.devicePixelRatio || 1, 1.5), aa: true, shadows: true, size: 2048, extent: 60, peds: 60, traffic: 16, far: 420 },
};
const Q = QUALITY[settings.quality] || QUALITY.media;

const $ = (id) => document.getElementById(id);
const loadingText = (t) => { const el = $('loading-text'); if (el) el.textContent = t; };

// ---------------- RENDERIZADOR ----------------
const renderer = new THREE.WebGLRenderer({ antialias: Q.aa, powerPreference: 'high-performance' });
renderer.setPixelRatio(Q.pr);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.shadowMap.enabled = Q.shadows;
renderer.shadowMap.type = THREE.PCFShadowMap;
$('game').appendChild(renderer.domElement);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(settings.fov, window.innerWidth / window.innerHeight, 0.1, Q.far);
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const G = {}; // estado global do jogo (exposto para testes em window.game)
window.game = G;

function build() {
  const t0 = performance.now();
  const world = new CollisionWorld();
  const sky = new Sky(scene, renderer, Q.far);
  sky.setShadows(Q.shadows, Q.size, Q.extent);
  const city = new City(scene, world);
  city.build();
  setSeed(777);
  const cars = []; const drivers = [];
  const makeCar = (type, color) => {
    const c = new Vehicle(type, color ?? pick(CAR_COLORS), world);
    scene.add(c.group); world.dynamic.add(c); cars.push(c); return c;
  };
  for (const pc of city.parkedCars) { const c = makeCar(pc.type); c.place(pc.x, pc.z, pc.heading); c.parked = true; }
  const eh = city.ethanHouse;
  const ethanCar = makeCar('sedan', 0x1d3f72);
  ethanCar.place(eh.driveway[0], eh.driveway[1], eh.heading + Math.PI);
  ethanCar.owner = 'Ethan';
  // Jogador
  const player = new Player(scene, world, CHARACTERS.ethan.look);
  player.place(eh.door[0], eh.door[1] + 3.5, 0);
  drivers.push(...spawnTraffic(Q.traffic, (type) => makeCar(type), player));
  // NPCs
  const npcs = [];
  const ryan = new NPC(scene, world, CHARACTERS.ryan.look, { name: 'Ryan Cole', role: 'story', lines: CHARACTERS.ryan.dialogue, x: eh.door[0] - 1.5, z: eh.door[1] + 8.5, heading: Math.PI });
  ryan.story = 'ryan'; npcs.push(ryan);
  for (const s of city.shopkeepers) npcs.push(new NPC(scene, world, shopkeeperLook(), { name: 'Atendente — ' + s.shop, role: 'shop', lines: [pick(SHOP_LINES), pick(SHOP_LINES)], x: s.x, z: s.z, heading: s.heading }));
  for (const p of city.npcs) if (p.kind === 'police') npcs.push(new NPC(scene, world, policeLook(), { name: 'Policial', role: 'police', lines: POLICE_LINES, x: p.x, z: p.z, behavior: 'patrol' }));
  const delegado = new NPC(scene, world, CHARACTERS.delegado.look, { name: CHARACTERS.delegado.name, role: 'story', lines: CHARACTERS.delegado.dialogue, x: city.policeSpot.x, z: city.policeSpot.z, heading: 0 });
  delegado.story = 'delegado'; npcs.push(delegado);
  const loops = city.pedLoops;
  for (let i = 0; i < Q.peds; i++) {
    const loop = loops[i % loops.length === 0 ? Math.floor(rand() * loops.length) : Math.floor(rand() * loops.length)];
    npcs.push(new NPC(scene, world, randomPedestrian(), { name: 'Pedestre', role: 'ped', lines: [pick(PED_LINES)], behavior: 'loop', loop }));
  }
  for (const n of npcs) world.dynamic.add(n);
  const lights = new TrafficLights();
  const cam = new ThirdPersonCamera(camera, world, settings);
  cam.yaw = Math.PI; cam.pitch = 0.22;
  // farol do carro do jogador (uma única luz, sempre existente para não recompilar shaders)
  const headlight = new THREE.SpotLight(0xfff2d0, 0, 45, 0.55, 0.5, 1.2);
  scene.add(headlight, headlight.target);
  Object.assign(G, { world, sky, city, cars, drivers, player, npcs, ryan, delegado, lights, cam, ethanCar, headlight, settings, Q, renderer, scene, camera });
  G.audio = new EngineAudio();
  G.objective = 0;
  G.buildMs = performance.now() - t0;
  sky.apply(settings.time);
  buildMinimap();
}

// ---------------- ENTRADA ----------------
const keys = new Set();
const pressed = new Set();
let locked = false; let started = false; let paused = false;
window.addEventListener('keydown', (e) => {
  if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.code)) e.preventDefault();
  if (!keys.has(e.code)) pressed.add(e.code);
  keys.add(e.code);
});
window.addEventListener('keyup', (e) => keys.delete(e.code));
window.addEventListener('blur', () => keys.clear());
document.addEventListener('mousemove', (e) => { if (locked && !paused && G.cam) G.cam.onMouse(e.movementX || 0, e.movementY || 0); });
document.addEventListener('wheel', (e) => { if (G.cam && started && !paused) G.cam.onWheel(e.deltaY); }, { passive: true });
document.addEventListener('pointerlockchange', () => {
  locked = document.pointerLockElement === renderer.domElement;
  if (!locked && started && !G.dialog) showPause(true);
});
renderer.domElement.addEventListener('click', () => { if (started && !paused) requestLock(); if (G.dialog) advanceDialog(); });
function requestLock() { try { const p = renderer.domElement.requestPointerLock(); if (p && p.catch) p.catch(() => {}); } catch (e) { /* ignore */ } }
const down = (...c) => c.some((k) => keys.has(k));
const hit = (...c) => c.some((k) => pressed.has(k));

// ---------------- UI ----------------
function showPause(v) {
  paused = v; $('pause').style.display = v ? 'flex' : 'none';
  if (v) syncSettingsUI();
}
function syncSettingsUI() {
  $('opt-sens').value = settings.sensitivity; $('opt-sens-v').textContent = settings.sensitivity.toFixed(2);
  $('opt-invert').checked = settings.invertY; $('opt-follow').checked = settings.autoFollow;
  $('opt-fov').value = settings.fov; $('opt-fov-v').textContent = settings.fov;
  $('opt-quality').value = settings.quality; $('opt-fps').checked = settings.showFps;
  $('opt-time').value = settings.time; $('opt-sound').checked = settings.sound;
  $('opt-dist').value = G.cam ? G.cam.footDist : 4.2; $('opt-dist-v').textContent = (G.cam ? G.cam.footDist : 4.2).toFixed(1);
}
function bindUI() {
  $('opt-sens').oninput = (e) => { settings.sensitivity = +e.target.value; $('opt-sens-v').textContent = settings.sensitivity.toFixed(2); saveSettings(); };
  $('opt-invert').onchange = (e) => { settings.invertY = e.target.checked; saveSettings(); };
  $('opt-follow').onchange = (e) => { settings.autoFollow = e.target.checked; saveSettings(); };
  $('opt-fov').oninput = (e) => { settings.fov = +e.target.value; $('opt-fov-v').textContent = settings.fov; G.cam.fovBase = settings.fov; saveSettings(); };
  $('opt-dist').oninput = (e) => { G.cam.footDist = +e.target.value; $('opt-dist-v').textContent = G.cam.footDist.toFixed(1); };
  $('opt-fps').onchange = (e) => { settings.showFps = e.target.checked; saveSettings(); };
  $('opt-sound').onchange = (e) => { settings.sound = e.target.checked; G.audio.enabled = settings.sound; saveSettings(); };
  $('opt-time').onchange = (e) => { settings.time = e.target.value; G.sky.apply(settings.time); saveSettings(); };
  $('opt-quality').onchange = (e) => {
    settings.quality = e.target.value; saveSettings();
    $('quality-note').textContent = 'A qualidade será aplicada ao reiniciar. Recarregando...';
    setTimeout(() => location.reload(), 600);
  };
  $('btn-resume').onclick = () => { showPause(false); requestLock(); };
  $('btn-play').onclick = startGame;
}
function startGame() {
  if (started) return;
  started = true; $('title').style.display = 'none'; $('hud').style.display = 'block';
  G.audio.init(); G.audio.enabled = settings.sound;
  requestLock();
  setObjective(0);
}
const OBJECTIVES = [
  'Fale com Ryan Cole na frente da sua casa',
  'Vá até a Delegacia de Los Valles (use seu carro azul na garagem)',
  'Fale com o Delegado Morales na entrada da delegacia',
  'Explore Los Valles livremente',
];
function setObjective(i) {
  G.objective = i; $('objective').textContent = 'OBJETIVO: ' + OBJECTIVES[i];
  toast(i === 0 ? 'Bem-vindo a Los Valles' : 'Novo objetivo');
}
let toastT = 0;
function toast(t) { $('toast').textContent = t; $('toast').style.opacity = 1; toastT = 3; }

// diálogos
function openDialog(npc) {
  const line = npc.story ? npc.lines[0] : npc.nextLine();
  G.dialog = { npc, idx: 0, story: !!npc.story, lines: npc.story ? npc.lines : [line] };
  npc.talking = true;
  $('dialog').style.display = 'block'; $('dialog-name').textContent = npc.name; $('dialog-text').textContent = G.dialog.lines[0];
}
function advanceDialog() {
  const d = G.dialog; if (!d) return;
  d.idx++;
  if (d.idx >= d.lines.length) {
    d.npc.talking = false; G.dialog = null; $('dialog').style.display = 'none';
    if (d.npc.story === 'ryan' && G.objective === 0) setObjective(1);
    if (d.npc.story === 'delegado' && G.objective <= 2 && G.objective >= 1) setObjective(3);
    return;
  }
  $('dialog-text').textContent = d.lines[d.idx];
}

// ---------------- CARRO: ENTRAR / SAIR ----------------
function nearestCar() {
  const p = G.player; let best = null, bd = 3.4;
  for (const c of G.cars) {
    for (const side of [1, -1]) {
      const [dx, dz] = c.doorPos(side);
      const d = Math.hypot(p.x - dx, p.z - dz);
      if (d < bd) { bd = d; best = c; }
    }
  }
  return best;
}
function enterCar(car) {
  if (car.driver === 'ai') { toast('Este carro está ocupado'); return; }
  const p = G.player;
  p.mode = 'car'; G.car = car; car.driver = 'player'; car.parked = false;
  scene.remove(p.model.root);
  car.body.add(p.model.root);
  p.model.root.position.copy(car.seat); p.model.root.rotation.set(0, 0, 0);
  G.cam.setMode('car', car.heading);
  toast(car.owner === 'Ethan' ? 'Seu carro' : CAR_TYPES_LABEL(car));
}
const CAR_TYPES_LABEL = (car) => car.T.name;
function exitCar() {
  const car = G.car; const p = G.player;
  if (Math.abs(car.speed) > 4) { toast('Diminua a velocidade para sair'); return; }
  let spot = null;
  for (const side of [1, -1]) {
    const [x, z] = car.doorPos(side);
    const r = G.world.resolveCircle(x, z, 0.33, car.y + 0.2, car.y + 1.8, 0.4, null);
    if (!r.hit) { spot = [x, z]; break; }
  }
  if (!spot) { const [x, z] = car.local(0, car.T.L / 2 + 1.2); spot = [x, z]; }
  car.body.remove(p.model.root); scene.add(p.model.root);
  car.driver = null; car.speed *= 0.3; G.car = null;
  p.mode = 'foot';
  p.place(spot[0], spot[1], car.heading);
  p.model.cur && Object.values(p.model.cur).forEach((v) => v.multiplyScalar(0.5));
  G.cam.setMode('foot');
}

// ---------------- MINIMAPA ----------------
const MM_SCALE = 1; let mmBase;
function buildMinimap() {
  const S = Math.ceil(HALF * 2 + 120);
  mmBase = document.createElement('canvas'); mmBase.width = S; mmBase.height = S;
  const g = mmBase.getContext('2d');
  g.fillStyle = '#2d4224'; g.fillRect(0, 0, S, S);
  const o = S / 2;
  const colors = { res: '#5d7a4a', park: '#3f7a3a', down: '#8a8580', mixed: '#9a9286', shops: '#a8927a', shops2: '#a8927a', police: '#5a6a9a', gas: '#a87a6a', parking: '#6a6a6a', apart: '#8a8070' };
  g.fillStyle = '#3a3a3c'; g.fillRect(o - HALF, o - HALF, HALF * 2, HALF * 2);
  for (let k = 0; k < N; k++) for (let j = 0; j < N; j++) {
    g.fillStyle = '#b9b3a6'; g.fillRect(o + blockC(j) - BLOCK / 2, o + blockC(k) - BLOCK / 2, BLOCK, BLOCK);
    g.fillStyle = colors[LAYOUT[k][j]]; g.fillRect(o + blockC(j) - BLOCK / 2 + 4, o + blockC(k) - BLOCK / 2 + 4, BLOCK - 8, BLOCK - 8);
  }
  g.strokeStyle = '#b8a040'; g.setLineDash([6, 6]); g.lineWidth = 0.8;
  for (let i = 0; i <= N; i++) {
    g.beginPath(); g.moveTo(o + roadC(i), o - HALF); g.lineTo(o + roadC(i), o + HALF); g.stroke();
    g.beginPath(); g.moveTo(o - HALF, o + roadC(i)); g.lineTo(o + HALF, o + roadC(i)); g.stroke();
  }
  G.mmOrigin = o;
}
function drawMinimap() {
  const c = $('minimap'); const g = c.getContext('2d'); const W = c.width, H = c.height;
  const p = G.car || G.player; const o = G.mmOrigin;
  const zoom = G.car ? 0.75 : 1.2;
  g.save(); g.clearRect(0, 0, W, H);
  g.beginPath(); g.arc(W / 2, H / 2, W / 2 - 2, 0, Math.PI * 2); g.clip();
  g.fillStyle = '#1a2414'; g.fillRect(0, 0, W, H);
  g.translate(W / 2, H / 2); g.scale(zoom, zoom);
  // mapa gira com a câmera (para cima = direção da câmera)
  g.rotate(Math.PI + G.cam.yaw);
  g.drawImage(mmBase, -(o + p.x), -(o + p.z));
  const mark = (x, z, col, r) => { g.fillStyle = col; g.beginPath(); g.arc(x - p.x, z - p.z, r / zoom, 0, Math.PI * 2); g.fill(); };
  for (const d of G.drivers) mark(d.car.x, d.car.z, '#d0d0d0', 2);
  if (!G.car) mark(G.ethanCar.x, G.ethanCar.z, '#3a8aff', 4);
  const obj = objectiveTarget();
  if (obj) { mark(obj[0], obj[1], '#ffd23a', 6); }
  g.restore();
  // seta do jogador
  g.save(); g.translate(W / 2, H / 2);
  const h = (G.car ? G.car.heading : G.player.heading);
  g.rotate(-(h - G.cam.yaw) + Math.PI);
  g.fillStyle = '#ff5a3a'; g.beginPath(); g.moveTo(0, -8); g.lineTo(6, 7); g.lineTo(0, 3); g.lineTo(-6, 7); g.closePath(); g.fill();
  g.restore();
  g.strokeStyle = 'rgba(255,255,255,0.6)'; g.lineWidth = 2; g.beginPath(); g.arc(W / 2, H / 2, W / 2 - 2, 0, Math.PI * 2); g.stroke();
  g.fillStyle = '#fff'; g.font = 'bold 12px Arial'; g.textAlign = 'center';
  const ny = -Math.cos(Math.PI + G.cam.yaw) * (W / 2 - 12), nx = Math.sin(Math.PI + G.cam.yaw) * (W / 2 - 12);
  g.fillText('N', W / 2 - nx, H / 2 + ny + 4);
}
function objectiveTarget() {
  if (G.objective === 0) return [G.ryan.x, G.ryan.z];
  if (G.objective === 1 || G.objective === 2) return [G.delegado.x, G.delegado.z];
  return null;
}

// ---------------- LAÇO PRINCIPAL ----------------
const clock = new THREE.Clock();
let fpsAcc = 0, fpsN = 0, fpsShown = 0;
const tmpV = new THREE.Vector3();
function frame() {
  requestAnimationFrame(frame);
  const dt = Math.min(clock.getDelta(), 1 / 20);
  if (!G.manual) step(dt);
  renderer.render(scene, camera);
  fpsAcc += dt; fpsN++;
  if (fpsAcc > 0.5) { fpsShown = Math.round(fpsN / fpsAcc); fpsAcc = 0; fpsN = 0; }
  pressed.clear();
}
function step(dt) {
  const p = G.player;
  G.lights.update(dt); updateSirens(dt);
  const active = started && !paused;
  const inDialog = !!G.dialog;
  if (active && hit('KeyN')) {
    const order = ['entardecer', 'noite', 'dia']; settings.time = order[(order.indexOf(settings.time) + 1) % 3];
    G.sky.apply(settings.time); saveSettings(); toast(TIMES[settings.time].label);
  }
  if (active && hit('KeyH')) $('help').style.display = $('help').style.display === 'none' ? 'block' : 'none';
  if (active && hit('KeyP')) { document.exitPointerLock?.(); showPause(true); }
  // interação
  let prompt = '';
  if (p.mode === 'foot') {
    let npc = null, nd = 2.4;
    for (const n of G.npcs) { const d = Math.hypot(n.x - p.x, n.z - p.z); if (d < nd) { nd = d; npc = n; } }
    const car = nearestCar();
    if (inDialog) prompt = '[E] Continuar';
    else if (npc && (!car || nd < 1.8)) { prompt = `[E] Falar com ${npc.name}`; if (active && hit('KeyE', 'KeyF')) openDialog(npc); }
    else if (car) { prompt = car.driver === 'ai' ? 'Carro ocupado' : `[E] Entrar no carro${car.owner ? ' (seu carro)' : ''}`; if (active && hit('KeyE', 'KeyF')) enterCar(car); }
    if (inDialog && active && hit('KeyE', 'Space', 'Enter', 'KeyF')) advanceDialog();
    const input = active && !inDialog ? {
      x: (down('KeyD', 'ArrowRight') ? 1 : 0) - (down('KeyA', 'ArrowLeft') ? 1 : 0),
      z: (down('KeyW', 'ArrowUp') ? 1 : 0) - (down('KeyS', 'ArrowDown') ? 1 : 0),
      run: down('ShiftLeft', 'ShiftRight'), jump: hit('Space'),
    } : { x: 0, z: 0, run: false, jump: false };
    if (G.testInput) Object.assign(input, G.testInput);
    if (p.mode === 'foot') p.update(dt, input, G.cam.yaw);
  }
  if (p.mode === 'car') {
    const car = G.car;
    prompt = Math.abs(car.speed) > 4 ? '' : '[E] Sair do carro';
    let input = active ? {
      throttle: down('KeyW', 'ArrowUp') ? 1 : 0, brake: down('KeyS', 'ArrowDown') ? 1 : 0,
      steer: (down('KeyA', 'ArrowLeft') ? 1 : 0) - (down('KeyD', 'ArrowRight') ? 1 : 0), handbrake: down('Space') ? 1 : 0,
    } : { throttle: 0, brake: 0, steer: 0, handbrake: 1 };
    if (G.testCarInput) input = { ...input, ...G.testCarInput };
    car.update(dt, input, G.cars);
    p.x = car.x; p.z = car.z; p.y = car.y;
    p.model.update(dt, { mode: 'sit', steer: car.steer * 1.5 });
    G.audio.update(true, car.speed, input.throttle);
    if (active && hit('KeyE', 'KeyF')) exitCar();
  } else G.audio.update(false, 0, 0);
  // trânsito
  const ctx = { lights: G.lights, cars: G.cars, player: p, npcs: G.npcs };
  for (const d of G.drivers) d.update(dt, ctx);
  for (const c of G.cars) if (c.driver === null && c.awake) c.awake = c.updatePassive(dt);
  // NPCs (só os próximos são atualizados)
  const nearCars = G.cars.filter((c) => Math.abs(c.speed) > 0.5 && Math.abs(c.x - p.x) < 120 && Math.abs(c.z - p.z) < 120);
  for (const n of G.npcs) {
    const d = Math.hypot(n.x - p.x, n.z - p.z);
    n.model.root.visible = d < 95;
    if (d < 110) {
      n.update(dt, { player: p });
      for (const c of nearCars) n.reactToCar(c, dt);
    }
  }
  for (const c of G.cars) {
    const d = Math.abs(c.x - p.x) + Math.abs(c.z - p.z);
    c.group.visible = d < (c.driver ? Q.far * 0.7 : Q.far * 0.42);
    c.setLOD(d > 45 && c.driver !== 'player' && !c.sirenL);
  }
  // objetivo: chegar na delegacia
  if (G.objective === 1 && Math.hypot(p.x - G.delegado.x, p.z - G.delegado.z) < 14) setObjective(2);
  // câmera
  if (p.mode === 'car') G.cam.update(dt, tmpV.set(G.car.x, G.car.y + 1.25, G.car.z), G.car);
  else G.cam.update(dt, tmpV.set(p.x, p.y + 1.55, p.z), null);
  G.sky.follow(p.x, p.z);
  // farol à noite
  if (G.car && G.sky.night > 0.4) {
    const [fx, fz] = G.car.forward;
    G.headlight.intensity = 60;
    G.headlight.position.set(G.car.x + fx * 2.2, G.car.y + 0.8, G.car.z + fz * 2.2);
    G.headlight.target.position.set(G.car.x + fx * 20, G.car.y - 1.5, G.car.z + fz * 20);
  } else G.headlight.intensity = 0;
  // HUD
  $('prompt').textContent = prompt; $('prompt').style.display = prompt && started ? 'block' : 'none';
  if (G.car) { $('speedo').style.display = 'block'; $('speed').textContent = Math.round(G.car.kmh); $('gear').textContent = G.car.speed < -0.5 ? 'R' : G.car.speed > 0.5 ? 'D' : 'N'; }
  else $('speedo').style.display = 'none';
  $('fps').style.display = settings.showFps && started ? 'block' : 'none';
  $('fps').textContent = fpsShown + ' FPS';
  if (toastT > 0) { toastT -= dt; if (toastT <= 0) $('toast').style.opacity = 0; }
  if (started) drawMinimap();
}

// ---------------- INÍCIO ----------------
loadingText('Gerando Los Valles...');
setTimeout(() => {
  try {
    build(); bindUI();
    $('loading').style.display = 'none'; $('btn-play').disabled = false; $('btn-play').textContent = 'JOGAR';
    G.ready = true;
    frame();
  } catch (e) {
    console.error(e); loadingText('Erro ao iniciar: ' + e.message);
    G.error = e;
  }
}, 30);
// API para testes automatizados
G.start = startGame;
G.enterCar = (c) => enterCar(c || G.ethanCar);
G.exitCar = () => exitCar();
G.nearestCar = nearestCar;
G.step = step;
G.sim = (seconds, fps = 60) => { const n = Math.round(seconds * fps); for (let i = 0; i < n; i++) { step(1 / fps); pressed.clear(); } };
G.openDialog = openDialog; G.advanceDialog = advanceDialog;
G.render = () => renderer.render(scene, camera);
