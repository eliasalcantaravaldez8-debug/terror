// Executor do Blender em modo headless (sem interface). Aceita:
//  - BLENDER_PATH: binário do Blender (ex.: /usr/bin/blender) → `blender -b --factory-startup -P script.py -- args.json`
//  - NEXPLAY_BPY_PYTHON: Python com o módulo `bpy` instalado (pip install bpy) → `python script.py args.json`
// Os scripts ficam em server/pipeline/blender/*.py e devolvem um relatório JSON na linha "NEXPLAY_REPORT {...}".
import { spawn, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
let detected;

export function detectBlender() {
  if (detected !== undefined) return detected;
  detected = null;
  const candidates = [];
  if (process.env.BLENDER_PATH) candidates.push({ mode: 'binary', cmd: process.env.BLENDER_PATH });
  if (process.env.NEXPLAY_BPY_PYTHON) candidates.push({ mode: 'bpy', cmd: process.env.NEXPLAY_BPY_PYTHON });
  if (!candidates.length) candidates.push({ mode: 'binary', cmd: 'blender' });
  for (const c of candidates) {
    try {
      const r = c.mode === 'binary'
        ? spawnSync(c.cmd, ['-b', '--factory-startup', '--version'], { encoding: 'utf8', timeout: 60_000 })
        : spawnSync(c.cmd, ['-c', 'import bpy;print("Blender", bpy.app.version_string)'], { encoding: 'utf8', timeout: 120_000 });
      const m = `${r.stdout}${r.stderr}`.match(/Blender (\d+\.\d+(\.\d+)?)/);
      if (r.status === 0 && m) { detected = { ...c, version: m[1] }; break; }
    } catch { /* indisponível */ }
  }
  return detected;
}

/** Executa um script do Blender. Lança erro com a saída se falhar. Retorna o relatório JSON. */
export function runBlender(script, args, { timeoutMs = 10 * 60_000 } = {}) {
  const b = detectBlender();
  if (!b) return Promise.reject(new Error('Blender não está disponível neste servidor.'));
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'nx-blender-'));
  const argsFile = path.join(dir, 'args.json');
  fs.writeFileSync(argsFile, JSON.stringify(args));
  const file = path.join(here, 'blender', script);
  const cmdArgs = b.mode === 'binary' ? ['-b', '--factory-startup', '-noaudio', '-P', file, '--', argsFile] : [file, argsFile];
  return new Promise((resolve, reject) => {
    const p = spawn(b.cmd, cmdArgs, { cwd: dir, env: { ...process.env, PYTHONDONTWRITEBYTECODE: '1' } });
    let out = '';
    const t = setTimeout(() => { p.kill('SIGKILL'); reject(new Error('Blender excedeu o tempo limite.')); }, timeoutMs);
    p.stdout.on('data', (d) => { out += d; if (out.length > 2e6) out = out.slice(-1e6); });
    p.stderr.on('data', (d) => { out += d; if (out.length > 2e6) out = out.slice(-1e6); });
    p.on('close', (code) => {
      clearTimeout(t);
      fs.rmSync(dir, { recursive: true, force: true });
      const line = out.split('\n').reverse().find((l) => l.startsWith('NEXPLAY_REPORT '));
      if (code !== 0 || !line) return reject(new Error(`Blender falhou (código ${code}): ${out.split('\n').filter((l) => /Error|Traceback|error/i.test(l)).slice(-6).join(' | ') || out.slice(-600)}`));
      try { resolve(JSON.parse(line.slice('NEXPLAY_REPORT '.length))); } catch (e) { reject(e); }
    });
  });
}
