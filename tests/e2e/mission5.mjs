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
const PORT = 4191;
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

  console.log('Booting (mission 5)…');
  await page.goto(`http://localhost:${PORT}/?test=1&quality=${quality}`);
  await page.waitForFunction(() => window.__IRON?.game?.state === 'menu' || window.__IRON?.error, null, { timeout: 180000 });
  const adv = (s) => G((s) => window.__IRON.game.advance(s), s);
  await G(() => { const g = window.__IRON.game; g.saves.unlock('m05'); g.startMission('m05'); });
  check(await G(() => window.__IRON.game.mission.id === 'm05' && window.__IRON.game.pipeline.timeOfDay === 'night'), 'mission 5 starts at night');
  check(await G(() => window.__IRON.game.weapons.current.def.id === 'mk9' && window.__IRON.game.weapons.slots[1].def.id === 'p11s'), 'silent loadout: MK-9 + P-11S');
  await adv(3);
  // move toward a goal, shooting hostiles that see us (alarm) or are close
  const advanceTo = async (gx, gz, until, maxT = 240, stay = false) => {
    for (let t = 0; t < maxT; t += 0.5) {
      const r = await G(([gx, gz, stay]) => {
        const g = window.__IRON.game, p = g.player, M = g.mission;
        p.health = Math.max(p.health, 55);
        const eye = p.getEye();
        const alarm = M.stealth?.alarm;
        let target = null, best = 1e9;
        for (const a of g.actors) {
          if (a.team !== 'enemy' || !a.alive || !a.model.root.visible) continue;
          const d = eye.distanceTo(a.hitSpheres[1].c);
          if (!alarm && d > 14) continue;
          if (alarm && !a.brain?.active) continue;
          if (d < best && g.world.lineOfSight(eye, a.hitSpheres[1].c, (b) => b.tag !== 'bounds')) { best = d; target = a; }
        }
        if (target) {
          g.input.simulateKey('KeyW', false); g.input.simulateMouseButton(2, true); g.advance(0.2);
          for (let k = 0; k < 3; k++) {
            const a = target.hitSpheres[0].c;
            p.yaw = Math.atan2(-(a.x - eye.x), -(a.z - eye.z)) - p.recoil.yaw; p.pitch = Math.atan2(a.y - eye.y, Math.hypot(a.x - eye.x, a.z - eye.z)) - p.recoil.pitch;
            g.input.simulateMouseButton(0, true); g.advance(0.14); g.input.simulateMouseButton(0, false); g.advance(0.08);
          }
          g.input.simulateMouseButton(2, false);
        } else if (!stay || Math.hypot(p.pos.x - gx, p.pos.z - gz) > 2) {
          const path = g.nav.findPath(p.pos.x, p.pos.z, gx, gz);
          const wp = path && path.length ? path[0] : { x: gx, z: gz };
          p.yaw = Math.atan2(-(wp.x - p.pos.x), -(wp.z - p.pos.z)); p.pitch = 0;
          g.input.simulateKey('KeyW', true); g.advance(0.5);
        } else { g.input.simulateKey('KeyW', false); g.advance(0.5); }
        if (g.weapons.current.reserve < 60) g.weapons.refillAmmo();
        return { stage: M.stage, near: Math.hypot(p.pos.x - gx, p.pos.z - gz), alarm: !!alarm };
      }, [gx, gz, stay]);
      if (until ? r.stage === until : r.near < 1.2) { await G(() => window.__IRON.game.input.simulateKey('KeyW', false)); return { ok: true, t, alarm: r.alarm }; }
    }
    await G(() => window.__IRON.game.input.simulateKey('KeyW', false));
    return { ok: false, t: maxT };
  };
  const pressE = (yaw, pitch = 0) => G(([yaw, pitch]) => { const g = window.__IRON.game, p = g.player; if (yaw !== null) p.yaw = yaw; p.pitch = pitch; g.advance(0.2); g.input.simulateKey('KeyE', true); g.advance(0.1); g.input.simulateKey('KeyE', false); g.advance(0.2); }, [yaw, pitch]);
  let r = await advanceTo(-648, 1792.2, null, 60);
  await pressE(0, -0.2);
  check(await G(() => window.__IRON.game.mission.stage === 'grateOpen'), 'drainage grate forced open');
  r = await advanceTo(-648, 1780, 'gardens', 60);
  check(r.ok, 'inside the gardens');
  await sleep(150); await snap('m5-gardens');
  r = await advanceTo(-523.6, 1702, null, 300);
  check(r.ok, `reached the security hut (alarm: ${r.alarm})`);
  await pressE(-Math.PI / 2 + Math.PI, 0);
  check(await G(() => window.__IRON.game.mission.stage === 'toRecord'), 'guest list downloaded');
  r = await advanceTo(-600, 1662.8, null, 300);
  await pressE(0, 0);
  check(await G(() => window.__IRON.game.mission.stage === 'recording'), 'laser microphone recording');
  r = await advanceTo(-600, 1663, 'escape', 300, true);
  check(r.ok, 'recording finished, escape started');
  r = await advanceTo(-648, 1797, 'ending', 300);
  check(r.ok, 'reached Falcon 2-1 outside the south wall');
  for (let i = 0; i < 40 && !(await G(() => window.__IRON.game.state === 'complete')); i++) await adv(2);
  await sleep(400);
  check(await G(() => window.__IRON.game.state === 'complete'), 'mission 5 completes');
  console.log('\nErrors:', errors.length ? '\n' + errors.join('\n') : 'none');
  await browser.close();
  cleanup();
  process.exit(errors.length ? 1 : 0);
})().catch((e) => { console.error(e); cleanup(); process.exit(1); });
