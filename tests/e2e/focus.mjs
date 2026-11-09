import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
import { spawn } from 'node:child_process';
import { setTimeout as sleep } from 'node:timers/promises';
const PORT = 4181;
const server = spawn('npx', ['vite', '--port', String(PORT), '--strictPort'], { stdio: 'ignore' });
for (let i = 0; i < 60; i++) { try { if ((await fetch(`http://localhost:${PORT}/`)).ok) break; } catch {} await sleep(500); }
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
page.setDefaultTimeout(300000);
page.on('pageerror', (e) => console.log('pageerror', e.message));
await page.goto(`http://localhost:${PORT}/?test=1&quality=${process.env.QUALITY || "low"}`);
await page.waitForFunction(() => window.__IRON?.game?.state === 'menu', null, { timeout: 180000 });
const script = process.argv[2];
const out = await page.evaluate(script);
console.log(JSON.stringify(out, null, 1));
if (process.argv[3]) await page.screenshot({ path: process.argv[3] });
await browser.close(); server.kill();
