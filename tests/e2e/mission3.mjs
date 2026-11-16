/**
 * Automated playthrough of the vertical slice in headless Chromium.
 * - boots the game, checks for console errors
 * - plays the helicopter intro, landing, disembark, ambush
 * - clears the three combat waves using the real weapon system (aim-bot test driver)
 * - checks checkpoints are saved and the mission completes
 * Screenshots are written to test-output/.
 */
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
import { spawn } from 'node:child_process';
import { setTimeout as sleep } from 'node:timers/promises';
import fs from 'node:fs';

const OUT = 'test-output';
fs.mkdirSync(OUT, { recursive: true });
const PORT = 4187;
const quality = process.env.QUALITY || 'low';
const shots = process.env.SHOTS !== '0';

const server = spawn('npx', ['vite', '--port', String(PORT), '--strictPort'], { stdio: 'pipe' });
let serverLog = '';
server.stdout.on('data', (d) => (serverLog += d));
server.stderr.on('data', (d) => (serverLog += d));
const cleanup = () => { try { server.kill('SIGTERM'); } catch { /* */ } };
process.on('exit', cleanup);

async function waitServer() {
  for (let i = 0; i < 60; i++) {
    try { const r = await fetch(`http://localhost:${PORT}/`); if (r.ok) return; } catch { /* */ }
    await sleep(500);
  }
  throw new Error('dev server did not start\n' + serverLog);
}

const errors = [];
let step = 0;
function check(cond, msg) {
  if (!cond) { errors.push('ASSERT: ' + msg); console.log('  ✗', msg); } else console.log('  ✓', msg);
}

(async () => {
  await waitServer();
  const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--autoplay-policy=no-user-gesture-required'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  page.setDefaultTimeout(240000);
  page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message + '\n' + e.stack));
  const snap = async (name) => { if (shots) await page.screenshot({ path: `${OUT}/${String(++step).padStart(2, '0')}-${name}.png` }); };
  const G = (fn, arg) => page.evaluate(fn, arg);

  console.log('Booting (mission 3)…');
  await page.goto(`http://localhost:${PORT}/?test=1&quality=${quality}`);
  await page.waitForFunction(() => window.__IRON?.game?.state === 'menu' || window.__IRON?.error, null, { timeout: 180000 });
  const adv = (s) => G((s) => window.__IRON.game.advance(s), s);
  await G(() => { const g = window.__IRON.game; g.saves.unlock('m03'); g.startMission('m03'); });
  check(await G(() => window.__IRON.game.mission.id === 'm03' && window.__IRON.game.region === 'port' && window.__IRON.game.pipeline.timeOfDay === 'dawn'), 'mission 3 starts at dawn in the port region');
  await adv(32);
  check(await G(() => window.__IRON.game.mission.stage === 'toGate'), 'briefing done, objective: gate');
  const walkTo = async (x, z, until, maxT = 90) => {
    for (let t = 0; t < maxT; t += 0.5) {
      const done = await G(([x, z, until]) => {
        const g = window.__IRON.game, p = g.player;
        const path = g.nav.findPath(p.pos.x, p.pos.z, x, z);
        const wp = path && path.length ? path[0] : { x, z };
        p.yaw = Math.atan2(-(wp.x - p.pos.x), -(wp.z - p.pos.z)); p.pitch = 0;
        g.input.simulateKey('KeyW', true); g.input.simulateKey('ShiftLeft', true);
        g.advance(0.5);
        return Math.hypot(p.pos.x - x, p.pos.z - z) < 1.5 || g.mission.stage === until;
      }, [x, z, until]);
      if (done) break;
    }
    await G(() => { const g = window.__IRON.game; g.input.simulateKey('KeyW', false); g.input.simulateKey('ShiftLeft', false); });
  };
  // Test driver: aim at enemies and fire with the real weapon system until a wave is cleared.
  const fightWave = async (stageName, maxSeconds, label) => {
    let t = 0, photo = false;
    while (t < maxSeconds) {
      const r = await G(() => {
        const g = window.__IRON.game, p = g.player;
        p.health = Math.max(p.health, 60); // keep test deterministic
        const eye = p.getEye();
        const enemies = g.actors.filter((a) => a.team === 'enemy' && a.alive && a.brain?.active && a.model.root.visible);
        let target = null, best = 1e9;
        for (const e of enemies) {
          const aim = e.hitSpheres[1].c;
          const vis = g.world.lineOfSight(eye, aim, (b) => b.tag !== 'bounds');
          const d = eye.distanceTo(aim) + (vis ? 0 : 1000);
          if (d < best) { best = d; target = { e, vis }; }
        }
        if (target && target.vis) {
          const a = target.e.hitSpheres[1].c;
          const dx = a.x - eye.x, dy = a.y - eye.y, dz = a.z - eye.z;
          p.yaw = Math.atan2(-dx, -dz); p.pitch = Math.atan2(dy, Math.hypot(dx, dz)) - p.recoil.pitch;
          g.input.simulateMouseButton(2, true);
          g.input.simulateKey('KeyW', false);
          g.input.simulateKey('KeyC', false);
          g.advance(0.25); // settle ADS
          // short controlled bursts, re-aiming between them (as a player would)
          for (let k = 0; k < 3; k++) {
            const a2 = target.e.hitSpheres[1].c;
            const ex = a2.x - eye.x, ey = a2.y - eye.y, ez = a2.z - eye.z;
            p.yaw = Math.atan2(-ex, -ez) - p.recoil.yaw; p.pitch = Math.atan2(ey, Math.hypot(ex, ez)) - p.recoil.pitch;
            g.input.simulateMouseButton(0, true); g.advance(0.2);
            g.input.simulateMouseButton(0, false); g.advance(0.12);
          }
        } else {
          g.input.simulateMouseButton(0, false);
          g.input.simulateMouseButton(2, false);
          // move toward the squad anchor / nearest enemy
          let goal = target ? target.e.pos : g.hud.objective?.target;
          // look for a vantage point with line of sight to any active hostile (like a player flanking)
          if (target) {
            if (!g.__vantage || g.__vantageT-- <= 0 || Math.hypot(p.pos.x - g.__vantage.x, p.pos.z - g.__vantage.z) < 0.8) {
              g.__vantageT = 16;
              let bestV = null, bestD = 1e9;
              for (let k = 0; k < 220; k++) {
                const a = Math.random() * Math.PI * 2, r = 3 + Math.random() * 30;
                const x = p.pos.x + Math.cos(a) * r, z = p.pos.z + Math.sin(a) * r;
                if (!g.nav.isWalkable(x, z)) continue;
                const e2 = { x, y: 1.66 + g.world.groundHeight(x, z, 0.3, 1), z };
                if (!enemies.some((e) => g.world.lineOfSight(e2, e.hitSpheres[1].c, (b) => b.tag !== 'bounds'))) continue;
                if (r < bestD) { bestD = r; bestV = { x, z }; }
              }
              g.__vantage = bestV;
            }
            if (g.__vantage) goal = g.__vantage;
          }
          if (goal) {
            const path = g.nav.findPath(p.pos.x, p.pos.z, goal.x, goal.z);
            const wp = path && path.length ? path[0] : goal;
            p.yaw = Math.atan2(-(wp.x - p.pos.x), -(wp.z - p.pos.z)); p.pitch = 0;
            g.input.simulateKey('KeyW', true);
          }
        }
        g.advance(0.25);
        g.input.simulateMouseButton(0, false);
        if (g.weapons.current.reserve < 60) g.weapons.refillAmmo(); // test harness resupply
        const all = g.actors.filter((a) => a.team === 'enemy' && a.alive && a.waveIndex === ({ wave1: 0, wave2: 1, wave3: 2 })[g.mission.stage]);
        return { stage: g.mission.stage, left: enemies.length, vis: !!(target && target.vis), hp: p.health,
          diag: all.map((a) => `${a.id||'e'}@${a.pos.x.toFixed(1)},${a.pos.y.toFixed(1)},${a.pos.z.toFixed(1)} act=${a.brain.active} vis=${a.model.root.visible} ph=${a.brain.phase}`).join(' | '),
          me: `${p.pos.x.toFixed(1)},${p.pos.z.toFixed(1)} ammo=${g.weapons.current.mag}/${g.weapons.current.reserve}` };
      });
      t += 0.5;
      if (process.env.DIAG && t % 10 === 0) console.log('    [diag]', t, r.me, '::', r.diag);
      if (!photo && r.vis && t > 2) { photo = true; await sleep(150); await snap(label + '-combat'); }
      if (r.stage !== stageName) return { ok: true, t, r };
    }
    return { ok: false, t };
  };



  // deck driver: no navigation on the ship, move straight and shoot what is visible
  const fightDeck = async (maxSeconds) => {
    for (let t = 0; t < maxSeconds; t += 0.6) {
      const r = await G(() => {
        const g = window.__IRON.game, p = g.player;
        p.health = Math.max(p.health, 60);
        const eye = p.getEye();
        const enemies = g.actors.filter((a) => a.team === 'enemy' && a.alive && a.brain?.active && a.model.root.visible);
        let target = null, best = 1e9;
        for (const e of enemies) {
          const vis = g.world.lineOfSight(eye, e.hitSpheres[1].c, (b) => b.tag !== 'bounds');
          const d = eye.distanceTo(e.hitSpheres[1].c) + (vis ? 0 : 1000);
          if (d < best) { best = d; target = { e, vis }; }
        }
        if (target && target.vis) {
          g.input.simulateKey('KeyW', false); g.input.simulateMouseButton(2, true); g.advance(0.2);
          for (let k = 0; k < 3; k++) {
            const a = target.e.hitSpheres[1].c;
            p.yaw = Math.atan2(-(a.x - eye.x), -(a.z - eye.z)) - p.recoil.yaw; p.pitch = Math.atan2(a.y - eye.y, Math.hypot(a.x - eye.x, a.z - eye.z)) - p.recoil.pitch;
            g.input.simulateMouseButton(0, true); g.advance(0.15); g.input.simulateMouseButton(0, false); g.advance(0.1);
          }
        } else if (target) {
          g.input.simulateMouseButton(2, false);
          // deck navigation grid (floor at y=7) + vantage search, as a player would flank
          const deckNav = g.__deckNav || (g.__deckNav = new g.nav.constructor(g.world, { minX: 954, minZ: -114, maxX: 1092, maxZ: -92, cell: 0.5, agentRadius: 0.4, baseY: 7 }));
          if (!g.__dv || g.__dvT-- <= 0 || Math.hypot(p.pos.x - g.__dv.x, p.pos.z - g.__dv.z) < 0.6) {
            g.__dvT = 12; g.__dv = null; let bestD = 1e9;
            for (let k = 0; k < 400; k++) {
              const x = 956 + Math.random() * 134, z = -113 + Math.random() * 20;
              if (!deckNav.isWalkable(x, z)) continue;
              if (!enemies.some((e) => g.world.lineOfSight({ x, y: 8.66, z }, e.hitSpheres[1].c, (b) => b.tag !== 'bounds'))) continue;
              const d = Math.hypot(x - p.pos.x, z - p.pos.z);
              if (d < bestD) { bestD = d; g.__dv = { x, z }; }
            }
          }
          const goal = g.__dv || target.e.pos;
          const path = deckNav.findPath(p.pos.x, p.pos.z, goal.x, goal.z);
          const wp = path && path.length ? path[0] : goal;
          p.yaw = Math.atan2(-(wp.x - p.pos.x), -(wp.z - p.pos.z)); p.pitch = 0;
          g.input.simulateKey('KeyW', true); g.advance(0.5);
        }
        if (g.weapons.current.reserve < 60) g.weapons.refillAmmo();
        return { stage: g.mission.stage, left: enemies.length, me: `${p.pos.x.toFixed(1)},${p.pos.y.toFixed(1)},${p.pos.z.toFixed(1)}`, tgt: target ? `${target.e.pos.x.toFixed(1)},${target.e.pos.z.toFixed(1)} vis=${target.vis}` : 'none', all: g.actors.filter((a) => a.waveIndex === 3 && a.alive).map((a) => `${a.pos.x.toFixed(0)},${a.pos.z.toFixed(0)}${a.hiddenUntilActive ? 'H' : ''}${a.brain.active ? '' : 'I'}`).join(' ') };
      });
      if (process.env.DIAG && Math.round(t / 0.6) % 15 === 0) console.log('    [deck]', t.toFixed(1), r.me, r.tgt, '::', r.all);
      if (r.stage !== 'deck') return { ok: true, t };
    }
    return { ok: false, t: maxSeconds };
  };
  const deckOnly = !!process.env.M3_DECK;
  if (deckOnly) await G(() => { const g = window.__IRON.game; g.saves.save({ mission: 'm03', checkpoint: 'm3_deck', weapons: g.weapons.serialize() }); g.restartFromCheckpoint(); g.advance(1); });
  let res;
  if (!deckOnly) {
  await walkTo(1000, 92, 'gate');
  await adv(1);
  check(await G(() => window.__IRON.game.mission.stage === 'gate'), 'gate fight started');
  res = await fightWave('gate', 220, 'm3-gate');
  check(res.ok, `gate cleared in ${res.t}s`);
  await adv(3);
  check(await G(() => window.__IRON.game.saves.load()?.checkpoint === 'm3_yard'), 'checkpoint m3_yard saved');
  await walkTo(1000, 36, 'yard');
  await adv(1);
  check(await G(() => window.__IRON.game.mission.stage === 'yard'), 'container yard fight started');
  res = await fightWave('yard', 400, 'm3-yard');
  check(res.ok, `yard cleared in ${res.t}s`);
  await adv(3);
  check(await G(() => window.__IRON.game.saves.load()?.checkpoint === 'm3_quay'), 'checkpoint m3_quay saved');
  await walkTo(1000, -50, 'quay');
  await adv(1);
  check(await G(() => window.__IRON.game.mission.stage === 'quay'), 'quay fight started');
  res = await fightWave('quay', 260, 'm3-quay');
  check(res.ok, `quay cleared in ${res.t}s`);
  await adv(3);
  check(await G(() => window.__IRON.game.mission.stage === 'board'), 'objective: board the ship');
  }
  await walkTo(1040, -76.5, 'none', 60);
  // climb the gangway
  for (let i = 0; i < 40; i++) {
    const y = await G(() => { const g = window.__IRON.game, p = g.player; p.yaw = Math.atan2(-(1040 - p.pos.x), 1); p.pitch = 0; g.input.simulateKey('KeyW', true); g.advance(0.25); return p.pos.y; });
    if (y > 6.5) break;
  }
  await G(() => window.__IRON.game.input.simulateKey('KeyW', false));
  check(await G(() => window.__IRON.game.player.pos.y > 6.5), 'player climbed the gangway onto the deck');
  await adv(0.5);
  check(await G(() => window.__IRON.game.mission.stage === 'deck'), 'deck fight started');
  await sleep(200); await snap('m3-deck');
  res = await fightDeck(260);
  await G(() => { const g = window.__IRON.game; g.input.simulateKey('KeyW', false); g.input.simulateMouseButton(2, false); });
  check(res.ok, `deck cleared in ${res.t}s`);
  // reach the command booth
  for (let i = 0; i < 80; i++) {
    const near = await G(() => {
      const g = window.__IRON.game, p = g.player;
      const path = g.__deckNav.findPath(p.pos.x, p.pos.z, 976.2, -103);
      const goal = path && path.length ? path[0] : { x: 976.2, z: -103 };
      p.yaw = Math.atan2(-(goal.x - p.pos.x), -(goal.z - p.pos.z)); p.pitch = 0;
      g.input.simulateKey('KeyW', true); g.advance(0.25);
      return Math.hypot(p.pos.x - 976.2, p.pos.z + 103) < 0.8;
    });
    if (near) break;
  }
  await G(() => { const g = window.__IRON.game, p = g.player; g.input.simulateKey('KeyW', false); p.yaw = Math.PI / 2; p.pitch = -0.2; g.advance(0.2); g.input.simulateKey('KeyE', true); g.advance(0.1); g.input.simulateKey('KeyE', false); });
  check(await G(() => window.__IRON.game.mission.stage === 'reveal'), 'ship terminal opened: Serrat reveal');
  for (let i = 0; i < 40 && (await G(() => window.__IRON.game.mission.stage)) !== 'escape'; i++) await adv(2);
  check(await G(() => window.__IRON.game.mission.stage === 'escape'), 'escape countdown started');
  // run back to the gangway and down
  for (let i = 0; i < 120; i++) {
    const st = await G(() => {
      const g = window.__IRON.game, p = g.player;
      let goal;
      if (p.pos.y > 6.5 && p.pos.z < -93.6) { const path = g.__deckNav.findPath(p.pos.x, p.pos.z, 1040, -93.6); goal = path && path.length ? path[0] : { x: 1040, z: -93.6 }; }
      else goal = { x: 1040, z: -70 };
      p.yaw = Math.atan2(-(goal.x - p.pos.x), -(goal.z - p.pos.z)); p.pitch = 0;
      g.input.simulateKey('KeyW', true); g.input.simulateKey('ShiftLeft', true); g.advance(0.25);
      return g.mission.stage;
    });
    if (st !== 'escape') break;
  }
  await G(() => { const g = window.__IRON.game; g.input.simulateKey('KeyW', false); g.input.simulateKey('ShiftLeft', false); });
  check(await G(() => window.__IRON.game.mission.stage === 'ending'), 'player escaped before the ship exploded');
  await adv(3);
  await sleep(200); await snap('m3-explosion');
  for (let i = 0; i < 40 && !(await G(() => window.__IRON.game.state === 'complete')); i++) await adv(2);
  await sleep(400);
  check(await G(() => window.__IRON.game.state === 'complete'), 'mission 3 completes');
  console.log('\nErrors:', errors.length ? '\n' + errors.join('\n') : 'none');
  await browser.close();
  cleanup();
  process.exit(errors.length ? 1 : 0);
})().catch((e) => { console.error(e); cleanup(); process.exit(1); });
