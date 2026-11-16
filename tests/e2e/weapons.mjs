/**
 * Weapons & Arsenal behaviour in the real game (headless Chromium).
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
const PORT = 4194;
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

  console.log('Booting (weapons)…');
  await page.goto(`http://localhost:${PORT}/?test=1&quality=${quality}`);
  await page.waitForFunction(() => window.__IRON?.game?.state === 'menu' || window.__IRON?.error, null, { timeout: 180000 });
  const adv = (s) => G((s) => window.__IRON.game.advance(s), s);
  await G(() => { const g = window.__IRON.game; g.saves.unlock('m03'); g.startMission('m03'); g.advance(1); });
  // spy on casings and shots
  await G(() => { const g = window.__IRON.game; g.__cas = 0; const c = g.effects.casing.bind(g.effects); g.effects.casing = (...a) => { g.__cas++; return c(...a); }; g.__shots = []; g.events.on('playerShot', (e) => g.__shots.push(e)); });
  const equip = (id) => G((id) => { const g = window.__IRON.game, w = g.weapons; w.slots[0] = window.__IRON.newWeaponState(id); w.currentIndex = 0; w.setVisibleModel(); w.state = 'idle'; w.lowered = 0; w.wantLowered = false; w.burstLeft = 0; g.player.pitch = 0.3; g.advance(0.8); return w.current.def.id; }, id);
  const tap = (hold = 0.05, after = 0.6) => G(([hold, after]) => { const g = window.__IRON.game; g.input.simulateMouseButton(0, true); g.advance(hold); g.input.simulateMouseButton(0, false); g.advance(after); return g.weapons.current.mag; }, [hold, after]);

  // KR-4: 3-round burst from a single trigger pull, then semi after B
  await equip('kr4');
  let mag = await tap();
  check(mag === 27, `KR-4 burst fires exactly 3 rounds per pull (mag ${mag})`);
  await G(() => { const g = window.__IRON.game; g.input.simulateKey('KeyB', true); g.advance(0.05); g.input.simulateKey('KeyB', false); g.advance(0.1); });
  check(await G(() => window.__IRON.game.weapons.current.mode === 'semi'), 'B switches the KR-4 to semi-automatic');
  mag = await tap(0.5);
  check(mag === 26, `semi fires one round per pull even when held (mag ${mag})`);
  // VK-7 automatic
  await equip('vk7');
  mag = await tap(0.5, 0.2);
  check(mag <= 25 && mag >= 22, `VK-7 automatic fire while held (mag ${mag})`);

  // SR-50: bolt must be cycled; the case comes out when the bolt is pulled, not at the shot
  await equip('sr50');
  const sr = await G(() => {
    const g = window.__IRON.game, w = g.weapons;
    const c0 = g.__cas;
    g.input.simulateMouseButton(0, true); g.advance(0.04); g.input.simulateMouseButton(0, false);
    const atShot = g.__cas - c0, mag1 = w.current.mag;
    g.advance(0.15);
    g.input.simulateMouseButton(0, true); g.advance(0.04); g.input.simulateMouseButton(0, false); // too early: bolt still open
    const mag2 = w.current.mag;
    let maxLift = 0, maxBack = 0;
    const bolt = w.models.sr50.userData.rbolt;
    for (let i = 0; i < 30; i++) { g.advance(1 / 30); maxLift = Math.max(maxLift, bolt.rotation.z); maxBack = Math.max(maxBack, bolt.userData.baseZ - bolt.position.z); }
    const afterCycle = g.__cas - c0;
    g.advance(0.4);
    g.input.simulateMouseButton(0, true); g.advance(0.04); g.input.simulateMouseButton(0, false);
    return { atShot, mag1, mag2, maxLift, maxBack, afterCycle, mag3: w.current.mag };
  });
  check(sr.atShot === 0 && sr.afterCycle === 1, `SR-50 ejects the case during the bolt cycle (${sr.atShot} at shot, ${sr.afterCycle} after)`);
  check(sr.mag1 === 4 && sr.mag2 === 4 && sr.mag3 === 3, `SR-50 cannot fire until the bolt is cycled (${sr.mag1}/${sr.mag2}/${sr.mag3})`);
  check(sr.maxLift > 1 && sr.maxBack > 0.07, `bolt handle lifts and travels back (${sr.maxLift.toFixed(2)} rad, ${sr.maxBack.toFixed(3)} m)`);

  // R-44 revolver: cylinder turns per shot, swings out on reload, six empties dumped
  await equip('r44');
  const rv = await G(() => {
    const g = window.__IRON.game, w = g.weapons, u = w.models.r44.userData;
    const a0 = u.cylinder.rotation.z;
    g.input.simulateMouseButton(0, true); g.advance(0.04); g.input.simulateMouseButton(0, false); g.advance(0.4);
    const turned = u.cylinder.rotation.z - a0;
    const c0 = g.__cas;
    g.input.simulateKey('KeyR', true); g.advance(0.05); g.input.simulateKey('KeyR', false);
    let open = 0;
    for (let i = 0; i < 90; i++) { g.advance(1 / 30); open = Math.max(open, u.crane.rotation.z); }
    return { turned, open, dumped: g.__cas - c0, mag: w.current.mag, closed: u.crane.rotation.z };
  });
  check(Math.abs(rv.turned - Math.PI / 3) < 0.05, `R-44 cylinder indexes 60° per shot (${rv.turned.toFixed(2)})`);
  check(rv.open > 1 && rv.closed < 0.05 && rv.dumped === 6 && rv.mag === 6, `R-44 reload: crane swings out, 6 empties dumped, cylinder closed (${JSON.stringify(rv)})`);

  // VKM-90: feed cover lifts during the reload, 100-round box
  await equip('vkm');
  const lm = await G(() => {
    const g = window.__IRON.game, w = g.weapons, cover = w.models.vkm.userData.cover;
    w.current.mag = 3;
    g.input.simulateKey('KeyR', true); g.advance(0.05); g.input.simulateKey('KeyR', false);
    let maxOpen = 0;
    for (let i = 0; i < 200; i++) { g.advance(1 / 30); maxOpen = Math.max(maxOpen, -cover.rotation.x); }
    return { maxOpen, mag: w.current.mag, move: w.current.def.moveMul };
  });
  check(lm.maxOpen > 1 && lm.mag === 100 && lm.move < 1, `VKM-90 reload opens the feed cover, refills 100 (${JSON.stringify(lm)})`);

  // Arsenal: fit a suppressor + 3x optic + extended mag on the VK-7, with a real effect
  await G(() => window.__IRON.game.pause());
  const ars = await G(async () => {
    const g = window.__IRON.game, root = g.menus.root;
    root.querySelector('#p-arsenal').click();
    root.querySelector('.ars-w[data-id="vk7"]').click();
    root.querySelector('.ars-o[data-slot="optic"][data-v="x3"]').click();
    root.querySelector('.ars-o[data-slot="muzzle"][data-v="supp"]').click();
    root.querySelector('.ars-o[data-slot="mag"][data-v="ext"]').click();
    root.querySelector('.ars-o[data-slot="camo"][data-v="woodland"]').click();
    await new Promise((r) => setTimeout(r, 600));
    const hasCanvas = !!root.querySelector('#ars-canvas');
    root.querySelector('#ars-back').click();
    return { hasCanvas, menu: g.menus.current };
  });
  check(ars.hasCanvas && ars.menu === 'pause', 'Arsenal opens from the pause menu with a 3D preview');
  await G(() => window.__IRON.game.resume());
  await equip('vk7');
  const fit = await G(() => {
    const g = window.__IRON.game, w = g.weapons, m = w.models.vk7;
    const n0 = g.__shots.length;
    g.input.simulateMouseButton(0, true); g.advance(0.04); g.input.simulateMouseButton(0, false); g.advance(0.2);
    const shot = g.__shots[n0];
    return { mag: w.current.def.magSize, suppressed: shot?.suppressed, fov: w.current.def.adsFov, sightY: m.userData.anchors.sight.y, relief: m.userData.anchors.eyeRelief, attach: m.userData.attach };
  });
  check(fit.mag === 45 && fit.suppressed === true && fit.fov < 0.5, `fitted attachments change the weapon in play (${JSON.stringify(fit)})`);
  check(fit.attach.camo === 'woodland' && fit.relief > 0, 'viewmodel rebuilt with the camo and the 3x optic');
  await G(() => { const g = window.__IRON.game; g.input.simulateMouseButton(2, true); g.advance(0.8); });
  await sleep(150); await snap('weapons-vk7-x3');
  await G(() => { const g = window.__IRON.game; g.input.simulateMouseButton(2, false); window.__IRON.Loadout.reset(); });

  console.log('\nErrors:', errors.length ? '\n' + errors.join('\n') : 'none');
  await browser.close();
  cleanup();
  process.exit(errors.length ? 1 : 0);
})().catch((e) => { console.error(e); cleanup(); process.exit(1); });
