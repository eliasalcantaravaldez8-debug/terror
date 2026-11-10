// Testes da NEXPLAY FORGE (linha de produção de assets).
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import http from 'node:http';

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'nexplay-forge-'));
Object.assign(process.env, { NODE_ENV: 'test', DB_FILE: ':memory:', DATA_DIR: tmp, NEXPLAY_AI_PROVIDER: 'mock', APP_ORIGIN: 'http://app.test', SANDBOX_ORIGIN: 'http://sandbox.test' });
delete process.env.TRIPO_API_KEY; delete process.env.MESHY_API_KEY;
const bpy = process.env.FORGE_TEST_BPY; // opcional: caminho de um Python com bpy para testar o Blender
if (bpy) process.env.NEXPLAY_BPY_PYTHON = bpy; else process.env.BLENDER_PATH = '/nonexistent/blender';

const { createApp } = await import('../server/index.js');
const { writeVox, gridFromSpec, gridToGlb, parseVox } = await import('../server/pipeline/voxel.js');
const { readGlb, inspect } = await import('../server/pipeline/gltf.js');

let base; let server;
before(async () => { server = http.createServer(createApp()); await new Promise((r) => server.listen(0, r)); base = `http://127.0.0.1:${server.address().port}`; });
after(() => { server.close(); fs.rmSync(tmp, { recursive: true, force: true }); });

let n = 0;
async function user() {
  let cookie = '';
  const req = async (method, url, body, form) => {
    const headers = { 'X-NX-Client': '1', Cookie: cookie };
    if (body !== undefined && !form) headers['Content-Type'] = 'application/json';
    const res = await fetch(base + url, { method, headers, body: form || (body !== undefined ? JSON.stringify(body) : undefined) });
    const sc = res.headers.get('set-cookie'); if (sc) cookie = sc.split(';')[0];
    const t = await res.text(); let data; try { data = JSON.parse(t); } catch { data = t; }
    return { status: res.status, data, raw: t };
  };
  n++;
  await req('POST', '/api/auth/register', { username: `forge${n}`, email: `forge${n}@t.dev`, password: 'senhaForte123', acceptTerms: true });
  return { get: (u) => req('GET', u), post: (u, b, f) => req('POST', u, b ?? {}, f), req };
}
async function waitJob(u, id) {
  for (let i = 0; i < 300; i++) {
    const { data } = await u.get(`/api/pipeline/jobs/${id}`);
    if (['done', 'failed', 'canceled'].includes(data.job.status)) return data.job;
    await new Promise((r) => setTimeout(r, 200));
  }
  throw new Error('job não terminou');
}
const SPEC = { size: [10, 10, 10], palette: { w: '#c8a165', r: '#aa3333', g: '#2f7d32' }, shapes: [
  { type: 'box', from: [1, 0, 1], to: [8, 5, 8], color: 'w', hollow: true }, { type: 'pyramid', center: [4.5, 6, 4.5], radius: 5, height: 4, color: 'r' }] };

test('ferramentas: relatório honesto do que está disponível', async () => {
  const u = await user();
  const { data } = await u.get('/api/pipeline/tools');
  const byId = Object.fromEntries(data.tools.map((t) => [t.id, t]));
  assert.equal(byId.tripo.available, false);
  assert.equal(byId.meshy.available, false);
  assert.equal(byId.voxel.available, true);
  assert.equal(byId.gltf.available, true);
  assert.equal(byId.blender.available, Boolean(bpy));
  assert.ok(data.styles.some((s) => s.id === 'voxel') && data.styles.some((s) => s.id === 'pixel'));
  const cls = await u.post('/api/pipeline/classify', { text: 'Quero um jogo de sobrevivência estilo Minecraft com blocos' });
  assert.equal(cls.data.style, 'voxel');
  assert.equal((await u.post('/api/pipeline/classify', { text: 'jogo de corrida realista', dimension: '3d' })).data.style, 'realistic');
});

test('geração 3D sem Tripo/Meshy é recusada com explicação (nada é simulado)', async () => {
  const u = await user();
  const p = (await u.post('/api/projects', { name: 'P', dimension: '3d', template: 'vazio' })).data.project;
  const r = await u.post(`/api/pipeline/projects/${p.id}/jobs`, { kind: 'model3d', prompt: 'a red sports car', category: 'vehicle' });
  assert.equal(r.status, 503);
  assert.match(r.data.error.message, /Tripo|Meshy/);
});

test('voxel: especificação → malha → LOD/colisão → integração no projeto → .vox para o MagicaVoxel', async () => {
  const u = await user();
  const p = (await u.post('/api/projects', { name: 'Voxel', dimension: '3d', template: 'vazio' })).data.project;
  const r = await u.post(`/api/pipeline/projects/${p.id}/jobs`, { kind: 'voxel', name: 'Casa', voxelSpec: SPEC, place: { position: [3, 0, 3] } });
  assert.equal(r.status, 202, r.raw);
  const job = await waitJob(u, r.data.job.id);
  assert.equal(job.status, 'done', JSON.stringify(job));
  assert.ok(job.steps.some((s) => s.name === 'Voxel' && s.status === 'done'));
  assert.ok(job.result.entityId);
  const { data } = await u.get(`/api/projects/${p.id}`);
  const e = data.doc.entities.find((x) => x.id === job.result.entityId);
  assert.equal(e.type, 'model');
  assert.equal(e.props.style, 'voxel');
  assert.ok(data.doc.assets.some((a) => a.id === e.props.asset));
  assert.deepEqual(e.props.collision.type, 'box');
  const valid = (await u.post(`/api/projects/${p.id}/validate`)).data;
  assert.deepEqual(valid.errors, []);
  const vox = await u.req('GET', `/api/pipeline/projects/${p.id}/assets/${job.result.assetId}/vox`);
  assert.equal(vox.status, 200);
  assert.ok(vox.raw.startsWith('VOX '));
  // Teste no jogo com correção automática de altura.
  const t = await u.post(`/api/pipeline/jobs/${job.id}/test`, { loaded: true, triangles: 300, drawCalls: 20, fps: 60, groundOffset: 0.4 });
  assert.equal(t.data.passed, true);
  assert.equal(t.data.fixes.length, 1);
  const after = (await u.get(`/api/projects/${p.id}`)).data.doc.entities.find((x) => x.id === job.result.entityId);
  assert.equal(after.transform.position[1], -0.4);
});

test('importação: .vox do MagicaVoxel e .glb passam pelo aprimoramento', async () => {
  const u = await user();
  const p = (await u.post('/api/projects', { name: 'Imp', dimension: '3d', template: 'vazio' })).data.project;
  const vox = writeVox(gridFromSpec(SPEC));
  const f1 = new FormData(); f1.append('file', new Blob([vox]), 'casa.vox');
  const j1 = await waitJob(u, (await u.post(`/api/pipeline/projects/${p.id}/import`, undefined, f1)).data.job.id);
  assert.equal(j1.status, 'done', JSON.stringify(j1));
  assert.equal(j1.style, 'voxel');
  const glb = (await gridToGlb(parseVox(vox))).buffer;
  const f2 = new FormData(); f2.append('file', new Blob([glb]), 'objeto.glb'); f2.append('category', 'furniture'); f2.append('style', 'lowpoly');
  const j2 = await waitJob(u, (await u.post(`/api/pipeline/projects/${p.id}/import`, undefined, f2)).data.job.id);
  assert.equal(j2.status, 'done', JSON.stringify(j2));
  assert.ok(j2.steps.some((s) => s.name === 'Reparo e escala' && /altura 1 m/.test(s.detail)));
  const assets = (await u.get(`/api/projects/${p.id}`)).data.assets;
  const main = assets.find((a) => a.id === j2.result.assetId);
  const rep = await inspect(await readGlb(fs.readFileSync(path.join(tmp, 'assets', main.storage_key))));
  assert.ok(Math.abs(rep.bounds.size[1] - 1) < 0.01, `altura ${rep.bounds.size[1]}`);
  assert.ok(Math.abs(rep.bounds.min[1]) < 0.001, 'base apoiada em y=0');
  const bad = new FormData(); bad.append('file', new Blob([Buffer.from('nope')]), 'x.glb');
  assert.equal((await u.post(`/api/pipeline/projects/${p.id}/import`, undefined, bad)).status, 400);
});

test('sprite: pixel art por especificação vira folha de sprites integrada ao projeto 2D', async () => {
  const u = await user();
  const p = (await u.post('/api/projects', { name: 'Pixel', dimension: '2d', template: 'plataforma' })).data.project;
  const spec = { width: 8, height: 8, palette: { k: '#111111', c: '#22d3ee' }, frames: [
    { rows: ['..kkkk..', '.kcccck.', 'kcckkcck', 'kcccccck', 'kcccccck', 'kcckkcck', '.kcccck.', '..kkkk..'] },
    { rows: ['........', '..kkkk..', '.kcccck.', 'kcckkcck', 'kcccccck', 'kcckkcck', '.kcccck.', '..kkkk..'] }], animations: { idle: [0, 1] }, fps: 6 };
  const r = await u.post(`/api/pipeline/projects/${p.id}/jobs`, { kind: 'sprite', name: 'Slime', spriteSpec: spec, place: { position: [200, 400, 0] } });
  const job = await waitJob(u, r.data.job.id);
  assert.equal(job.status, 'done', JSON.stringify(job));
  assert.equal(job.result.sprite.frames, 2);
  const doc = (await u.get(`/api/projects/${p.id}`)).data.doc;
  const e = doc.entities.find((x) => x.id === job.result.entityId);
  assert.equal(e.type, 'sprite');
  assert.equal(e.props.frames.frameWidth, 8);
  const badSpec = { ...spec, frames: [{ rows: ['xx'] }] };
  const bad = await waitJob(u, (await u.post(`/api/pipeline/projects/${p.id}/jobs`, { kind: 'sprite', spriteSpec: badSpec })).data.job.id);
  assert.equal(bad.status, 'failed');
});

test('IA (mock): a especialidade 3D cria modelo voxel pela FORGE e o marcador é substituído', async () => {
  const u = await user();
  const p = (await u.post('/api/projects', { name: 'IA', dimension: '3d', template: 'vazio' })).data.project;
  const res = await u.req('POST', `/api/ai/projects/${p.id}/command`, { prompt: 'Crie uma casa voxel', specialist: 'artist3d' });
  const result = res.raw.trim().split('\n').map((l) => JSON.parse(l)).find((l) => l.type === 'result');
  assert.ok(result, res.raw);
  let doc;
  for (let i = 0; i < 100; i++) {
    doc = (await u.get(`/api/projects/${p.id}`)).data.doc;
    const e = doc.entities.find((x) => x.name === 'Casa voxel');
    if (e && e.props.asset) break;
    await new Promise((r) => setTimeout(r, 200));
  }
  const e = doc.entities.find((x) => x.name === 'Casa voxel');
  assert.ok(e?.props.asset, JSON.stringify(e));
  assert.equal(e.props.pendingJob, null);
});

test('Blender (opcional): aprimoramento e rigging automático reais', { skip: !bpy && 'defina FORGE_TEST_BPY com um Python que tenha bpy' }, async () => {
  const u = await user();
  const p = (await u.post('/api/projects', { name: 'B', dimension: '3d', template: 'vazio' })).data.project;
  const glb = (await gridToGlb(gridFromSpec({ size: [12, 36, 6], palette: { s: '#c58c62', b: '#334155' }, shapes: [
    { type: 'box', from: [4, 0, 2], to: [5, 15, 3], color: 'b' }, { type: 'box', from: [6, 0, 2], to: [7, 15, 3], color: 'b' },
    { type: 'box', from: [3, 16, 1], to: [8, 28, 4], color: 's' }, { type: 'box', from: [0, 25, 2], to: [11, 27, 3], color: 's' }, { type: 'sphere', center: [5.5, 31, 2.5], radius: 3, color: 's' }] }))).buffer;
  const f = new FormData(); f.append('file', new Blob([glb]), 'heroi.glb'); f.append('category', 'character'); f.append('style', 'stylized');
  const job = await waitJob(u, (await u.post(`/api/pipeline/projects/${p.id}/import`, undefined, f)).data.job.id);
  assert.equal(job.status, 'done', JSON.stringify(job.steps));
  assert.ok(job.steps.some((s) => s.name === 'Blender: aprimoramento' && s.status === 'done'));
  assert.ok(job.result.skinned);
  assert.ok(['idle', 'walk', 'run'].every((a) => job.result.animations.includes(a)));
  const e = (await u.get(`/api/projects/${p.id}`)).data.doc.entities.find((x) => x.id === job.result.entityId);
  assert.equal(e.type, 'character');
  assert.ok(e.props.model);
});
