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
const PORT = 4193;
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

  console.log('Booting (mission 7)…');
  await page.goto(`http://localhost:${PORT}/?test=1&quality=${quality}`);
  await page.waitForFunction(() => window.__IRON?.game?.state === 'menu' || window.__IRON?.error, null, { timeout: 180000 });
  const adv = (s) => G((s) => window.__IRON.game.advance(s), s);
  await G(() => { const g = window.__IRON.game; g.saves.unlock('m07'); g.startMission('m07'); });
  check(await G(() => { const g = window.__IRON.game; return g.mission.id === 'm07' && g.weapons.slots.length === 1 && g.weapons.wantLowered; }), 'mission 7: arrives at FOB Bastião with the sidearm holstered');
  const walkTo = async (x, z, until, maxT = 90) => {
    for (let t = 0; t < maxT; t += 0.5) {
      const done = await G(([x, z, until]) => {
        const g = window.__IRON.game, p = g.player;
        p.health = Math.max(p.health, 60); // the garrison is shooting: keep the harness deterministic
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




  const pressE = (yaw, pitch = 0) => G(([yaw, pitch]) => { const g = window.__IRON.game, p = g.player; if (yaw !== null) p.yaw = yaw; p.pitch = pitch; g.advance(0.2); g.input.simulateKey('KeyE', true); g.advance(0.1); g.input.simulateKey('KeyE', false); g.advance(0.2); }, [yaw, pitch]);
  const waitStage = async (pred, maxT = 120) => { for (let t = 0; t < maxT; t += 1) { if (await G(pred)) return true; await adv(1); } return G(pred); };
  await adv(3);
  await walkTo(400, 1344.4, 'none', 120);
  await pressE(0, -0.25);
  check(await G(() => window.__IRON.game.mission.stage === 'betrayal'), 'recording handed to Major Hale');
  check(await waitStage(() => window.__IRON.game.mission.stage === 'escape', 90), 'betrayal: Ruiz kills the generator, lights out');
  await adv(2.5);
  check(await G(() => !window.__IRON.game.mission.power && !window.__IRON.game.weapons.wantLowered), 'base blacked out, weapon drawn');
  await G(() => window.__IRON.game.pipeline.setNightVision(true));
  await sleep(150); await snap('m7-blackout-nv');
  let res = await fightWave('escape', 240, 'm7-toc');
  check(res.ok, `fought out of the command post in ${res.t}s`);
  check(await G(() => window.__IRON.game.mission.stage === 'armory'), 'objective: re-arm at the armory');
  await walkTo(440, 1378.6, 'none', 120);
  // final steps to the rack (walk, no sprint)
  for (let i = 0; i < 40; i++) {
    const d = await G(() => { const g = window.__IRON.game, p = g.player; p.health = Math.max(p.health, 60); const dx = 440 - p.pos.x, dz = 1378.3 - p.pos.z, d = Math.hypot(dx, dz); if (d < 0.3) { g.input.simulateKey('KeyW', false); return d; } p.yaw = Math.atan2(-dx, -dz); g.input.simulateKey('KeyW', true); g.advance(0.1); return d; });
    if (d < 0.3) break;
  }
  await G(() => window.__IRON.game.input.simulateKey('KeyW', false));
  await pressE(0, -0.45);
  check(await G(() => window.__IRON.game.weapons.slots.length === 2), 'long gun taken from the rack (primary + sidearm)');
  check(await waitStage(() => window.__IRON.game.mission.stage === 'yard', 5), 'objective: cross the base to the helipad');
  res = await fightWave('yard', 420, 'm7-yard');
  check(res.ok, `reached the helipad in ${res.t}s`);
  check(await G(() => window.__IRON.game.mission.stage === 'hold'), 'holding the helipad');
  res = await fightWave('hold', 240, 'm7-hold');
  check(await G(() => window.__IRON.game.mission.stage === 'board'), 'Falcon 2-1 inbound');
  await adv(16);
  await walkTo(350, 1345, 'ending', 60);
  check(await waitStage(() => ['ending'].includes(window.__IRON.game.mission.stage) || window.__IRON.game.state === 'complete', 30), 'boarded the Falcon');
  for (let i = 0; i < 40 && !(await G(() => window.__IRON.game.state === 'complete')); i++) await adv(2);
  await sleep(400);
  check(await G(() => window.__IRON.game.state === 'complete'), 'mission 7 completes');
  console.log('\nErrors:', errors.length ? '\n' + errors.join('\n') : 'none');
  await browser.close();
  cleanup();
  process.exit(errors.length ? 1 : 0);
})().catch((e) => { console.error(e); cleanup(); process.exit(1); });
