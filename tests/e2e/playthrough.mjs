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
const PORT = 4179;
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
  page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message + '\n' + e.stack));
  const snap = async (name) => { if (shots) await page.screenshot({ path: `${OUT}/${String(++step).padStart(2, '0')}-${name}.png` }); };
  const G = (fn, arg) => page.evaluate(fn, arg);

  console.log('Booting…');
  await page.goto(`http://localhost:${PORT}/?test=1&quality=${quality}`);
  await page.waitForFunction(() => window.__IRON?.game?.state === 'menu' || window.__IRON?.error, null, { timeout: 180000 });
  const bootErr = await G(() => window.__IRON.error && String(window.__IRON.error.stack));
  check(!bootErr, 'game boots without error ' + (bootErr || ''));
  await sleep(1500);
  await snap('main-menu');

  // Start new campaign
  await page.click('#m-new');
  await sleep(300);
  check(await G(() => window.__IRON.game.state === 'playing'), 'state is playing after New Campaign');
  check(await G(() => !!window.__IRON.game.player.mount), 'player is seated in the helicopter');
  await snap('intro-black');

  // fast-forward the flight while sampling
  const adv = (s) => G((s) => window.__IRON.game.advance(s), s);
  await adv(9); await sleep(200); await snap('flight-fadein');
  // look around in the cabin (synthetic mouse)
  await G(() => { const g = window.__IRON.game; g.input.simulateMouseMove(-500, 40); g.advance(0.2); });
  await sleep(200); await snap('flight-look-squad');
  await G(() => { const g = window.__IRON.game; g.input.simulateMouseMove(900, 0); g.advance(0.2); });
  await adv(14); await sleep(200); await snap('flight-door-view');
  await G(() => { const g = window.__IRON.game; g.input.simulateMouseMove(-400, 0); g.advance(0.2); });
  await adv(20); await sleep(200); await snap('flight-approach');
  await adv(16); await sleep(200); await snap('landing');
  check(await G(() => window.__IRON.game.mission.stage === 'intro' || window.__IRON.game.mission.stage === 'disembark'), 'still in intro / landing');
  await adv(6.5);
  const st = await G(() => ({ stage: window.__IRON.game.mission.stage, mounted: !!window.__IRON.game.player.mount }));
  check(st.stage === 'disembark', 'helicopter landed -> disembark stage (got ' + st.stage + ')');
  check(!st.mounted, 'player can move after landing');
  await sleep(200); await snap('disembark-cabin');

  // walk out of the helicopter: face east (local -x of the heli = world +x) and walk
  await G(() => {
    const g = window.__IRON.game; const p = g.player;
    p.yaw = -Math.PI / 2; p.pitch = 0; // face +X
    g.input.simulateKey('KeyW', true);
  });
  let ambush = false;
  for (let i = 0; i < 40 && !ambush; i++) {
    await adv(0.25);
    ambush = await G(() => ['ambush', 'wave1'].includes(window.__IRON.game.mission.stage));
  }
  await G(() => window.__IRON.game.input.simulateKey('KeyW', false));
  check(ambush, 'ambush triggered when the player stepped out');
  const briggs = await G(() => { const b = window.__IRON.game.mission.squadById.briggs; const p = window.__IRON.game.player; return { alive: b.alive, dist: b.pos.distanceTo(p.pos) }; });
  check(!briggs.alive, 'Briggs was shot by the sniper');
  check(briggs.dist < 4.5, `Briggs was next to the player (dist ${briggs.dist.toFixed(2)} m)`);
  // turn toward Briggs for the screenshot
  await G(() => { const g = window.__IRON.game; const b = g.mission.squadById.briggs; const p = g.player; p.yaw = Math.atan2(-(b.pos.x - p.pos.x), -(b.pos.z - p.pos.z)); p.pitch = -0.35; g.advance(0.3); });
  await sleep(200); await snap('briggs-down');
  await adv(3);
  const w1 = await G(() => ({ stage: window.__IRON.game.mission.stage, enemies: window.__IRON.game.actors.filter((a) => a.team === 'enemy' && a.alive && a.brain?.active).length }));
  check(w1.stage === 'wave1', 'combat wave 1 started (stage ' + w1.stage + ')');
  check(w1.enemies >= 5, 'hostiles active in wave 1: ' + w1.enemies);
  await G(() => { const p = window.__IRON.game.player; p.yaw = 0; p.pitch = 0.08; window.__IRON.game.advance(0.1); });
  await sleep(200); await snap('firefight-street');
  await adv(4);
  check(await G(() => window.__IRON.game.saves.load()?.checkpoint === 'cp_lz'), 'checkpoint cp_lz saved');

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
          // elevated shooters can't be seen from directly below: back off into the street
          if (target && target.e.pos.y > 2) goal = { x: target.e.pos.x * -0.4, z: target.e.pos.z + 14 };
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

  let res = await fightWave('wave1', 150, 'wave1');
  await G(() => { const g = window.__IRON.game; g.input.simulateKey('KeyW', false); g.input.simulateMouseButton(2, false); });
  check(res.ok, `wave 1 cleared in ${res.t}s`);
  await adv(3);
  check(await G(() => window.__IRON.game.saves.load()?.checkpoint === 'cp_street'), 'checkpoint cp_street saved');

  // Advance to the crossroads to trigger wave 2
  const walkTo = async (z, maxT = 60) => {
    for (let t = 0; t < maxT; t += 0.5) {
      const done = await G((z) => {
        const g = window.__IRON.game, p = g.player;
        const path = g.nav.findPath(p.pos.x, p.pos.z, 0, z);
        const wp = path && path.length ? path[0] : { x: 0, z };
        p.yaw = Math.atan2(-(wp.x - p.pos.x), -(wp.z - p.pos.z)); p.pitch = 0;
        g.input.simulateKey('KeyW', true); g.input.simulateKey('ShiftLeft', true);
        g.advance(0.5);
        return p.pos.z < z + 1 || g.mission.stage.startsWith('wave');
      }, z);
      if (done) break;
    }
    await G(() => { const g = window.__IRON.game; g.input.simulateKey('KeyW', false); g.input.simulateKey('ShiftLeft', false); });
  };
  await walkTo(-40);
  await adv(4.5);
  check(await G(() => window.__IRON.game.mission.stage === 'wave2'), 'wave 2 started at the crossroads');
  check(await G(() => window.__IRON.game.city.namedProps.rpgTarget.wreck.visible), 'RPG destroyed the car (scripted explosion)');
  await G(() => { const p = window.__IRON.game.player; p.yaw = 0.35; p.pitch = -0.05; window.__IRON.game.advance(0.1); });
  await sleep(200); await snap('rpg-explosion');
  res = await fightWave('wave2', 200, 'wave2');
  await G(() => { const g = window.__IRON.game; g.input.simulateKey('KeyW', false); g.input.simulateMouseButton(2, false); });
  check(res.ok, `wave 2 cleared in ${res.t}s`);
  await adv(3);
  check(await G(() => window.__IRON.game.saves.load()?.checkpoint === 'cp_crossroads'), 'checkpoint cp_crossroads saved');

  await walkTo(-102);
  await adv(1);
  check(await G(() => window.__IRON.game.mission.stage === 'wave3'), 'wave 3 started');
  res = await fightWave('wave3', 220, 'wave3');
  await G(() => { const g = window.__IRON.game; g.input.simulateKey('KeyW', false); g.input.simulateMouseButton(2, false); });
  check(res.ok, `wave 3 cleared in ${res.t}s`);
  await adv(3);
  check(await G(() => window.__IRON.game.mission.stage === 'door'), 'objective: enter the Halden building');

  // Walk to the door and interact
  await walkTo(-165, 40);
  await G(() => { const g = window.__IRON.game, p = g.player; p.yaw = 0; p.pitch = 0.05; g.advance(0.3); });
  await sleep(200); await snap('halden-door');
  await G(() => { const g = window.__IRON.game; g.input.simulateKey('KeyE', true); g.advance(0.1); g.input.simulateKey('KeyE', false); g.advance(3); });
  await sleep(400);
  check(await G(() => window.__IRON.game.state === 'complete'), 'mission slice completes');
  await snap('mission-complete');

  // Checkpoint reload test
  await G(() => window.__IRON.game.continueCampaign());
  await sleep(300);
  check(await G(() => window.__IRON.game.state === 'playing' && window.__IRON.game.mission.checkpoint === 'cp_halden'), 'continue loads saved checkpoint');
  await G(() => { const g = window.__IRON.game; g.saves.save({ mission: 'm01', checkpoint: 'cp_lz', weapons: g.weapons.serialize() }); g.restartFromCheckpoint(); g.advance(1); });
  check(await G(() => window.__IRON.game.mission.stage === 'wave1'), 'restart from cp_lz puts the player in the ambush');
  // death -> retry
  await G(() => { const g = window.__IRON.game; g.player.takeDamage(500, g.player.pos.clone().add({ x: 0, y: 0, z: -5 })); g.advance(0.5); });
  await sleep(300);
  check(await G(() => window.__IRON.game.state === 'dead'), 'player death handled');
  await snap('death');

  const perf = await G(() => { const g = window.__IRON.game; const i = g.pipeline.renderer.info; return { calls: i.render.calls, tris: i.render.triangles, geoms: i.memory.geometries, tex: i.memory.textures }; });
  console.log('Renderer info:', perf);

  console.log('\nErrors:', errors.length ? '\n' + errors.join('\n') : 'none');
  await browser.close();
  cleanup();
  process.exit(errors.length ? 1 : 0);
})().catch((e) => { console.error(e); cleanup(); process.exit(1); });
