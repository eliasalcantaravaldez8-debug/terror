// Testes de integração da API NEXPLAY (node:test). Banco em memória, IA em modo "mock".
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import http from 'node:http';

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'nexplay-test-'));
Object.assign(process.env, { NODE_ENV: 'test', DB_FILE: ':memory:', DATA_DIR: tmp, NEXPLAY_AI_PROVIDER: 'mock', APP_ORIGIN: 'http://app.test', SANDBOX_ORIGIN: 'http://sandbox.test' });

const { createApp } = await import('../server/index.js');
const { createSandboxApp } = await import('../server/sandbox/server.js');
const { run, one } = await import('../server/db/index.js');
const { createProject, validateProject, GENRE_TEMPLATES, applyOps } = await import('../shared/project.js');
const AdmZip = (await import('adm-zip')).default;

let base; let sandboxBase; let server; let sandbox;
before(async () => {
  server = http.createServer(createApp());
  sandbox = http.createServer(createSandboxApp());
  await new Promise((r) => server.listen(0, r));
  await new Promise((r) => sandbox.listen(0, r));
  base = `http://127.0.0.1:${server.address().port}`;
  sandboxBase = `http://127.0.0.1:${sandbox.address().port}`;
});
after(() => { server.close(); sandbox.close(); fs.rmSync(tmp, { recursive: true, force: true }); });

function client() {
  let cookie = '';
  const req = async (method, url, body, { form, raw, noCsrf } = {}) => {
    const headers = noCsrf ? {} : { 'X-NX-Client': '1' };
    if (cookie) headers.Cookie = cookie;
    let payload;
    if (form) payload = form; else if (body !== undefined) { headers['Content-Type'] = 'application/json'; payload = JSON.stringify(body); }
    const res = await fetch(base + url, { method, headers, body: payload, redirect: 'manual' });
    const set = res.headers.get('set-cookie');
    if (set) cookie = set.split(';')[0];
    if (raw) return res;
    const text = await res.text();
    let data; try { data = JSON.parse(text); } catch { data = text; }
    return { status: res.status, data };
  };
  return { get: (u) => req('GET', u), post: (u, b, o) => req('POST', u, b ?? {}, o), put: (u, b) => req('PUT', u, b), patch: (u, b) => req('PATCH', u, b), del: (u) => req('DELETE', u), req };
}

let n = 0;
async function newUser(prefix = 'user') {
  const c = client();
  n++;
  const r = await c.post('/api/auth/register', { username: `${prefix}${n}`, email: `${prefix}${n}@test.dev`, password: 'senhaForte123', acceptTerms: true });
  assert.equal(r.status, 201, JSON.stringify(r.data));
  c.user = r.data.user;
  return c;
}
async function newAdmin() {
  const c = await newUser('admin');
  run(`UPDATE users SET role='admin' WHERE id=?`, c.user.id);
  return c;
}

function zipOf(files) {
  const z = new AdmZip();
  for (const [name, content] of Object.entries(files)) z.addFile(name, Buffer.from(content));
  return z.toBuffer();
}
function zipForm(buf, fields = {}) {
  const f = new FormData();
  f.append('file', new Blob([buf]), 'build.zip');
  for (const [k, v] of Object.entries(fields)) f.append(k, String(v));
  return f;
}
const PNG = Buffer.from('89504e470d0a1a0a0000000d49484452000000010000000108060000001f15c4890000000d49444154789c6360000002000154a24f5d0000000049454e44ae426082', 'hex');

async function publishedGame(owner, adminC, overrides = {}) {
  const g = await owner.post('/api/games', { title: `Jogo ${Math.random().toString(36).slice(2, 7)}`, genre: 'acao', ageRating: '12', platforms: 'both', description: 'Um jogo de teste com descrição longa o bastante para publicar.', rightsConfirmed: true, ...overrides });
  assert.equal(g.status, 201, JSON.stringify(g.data));
  const cover = new FormData(); cover.append('file', new Blob([PNG]), 'c.png');
  assert.equal((await owner.post(`/api/games/${g.data.game.id}/cover`, undefined, { form: cover })).status, 200);
  const up = await owner.post(`/api/games/${g.data.game.id}/versions`, undefined, { form: zipForm(zipOf({ 'index.html': '<h1>ok</h1>', 'game.js': 'console.log(1)' }), { version: '1.0.0' }) });
  assert.equal(up.status, 201, JSON.stringify(up.data));
  assert.equal((await owner.post(`/api/games/${g.data.game.id}/submit`)).status, 200);
  const ap = await adminC.post(`/api/admin/moderation/games/${g.data.game.id}`, { decision: 'approve' });
  assert.equal(ap.status, 200, JSON.stringify(ap.data));
  return g.data.game;
}

test('saúde e catálogo inicial vazio', async () => {
  const c = client();
  const h = await c.get('/api/health');
  assert.equal(h.data.ok, true);
  const home = await c.get('/api/games/home');
  assert.equal(home.data.totalPublished, 0);
  assert.equal((await c.get('/api/games')).data.total, 0);
});

test('cadastro, login, sessão e proteção CSRF', async () => {
  const c = await newUser();
  assert.equal((await c.get('/api/auth/me')).data.user.username, c.user.username);
  const csrf = await c.req('POST', '/api/auth/logout', {}, { noCsrf: true });
  assert.equal(csrf.status, 403);
  const dup = await client().post('/api/auth/register', { username: c.user.username, email: 'x@y.dev', password: 'senhaForte123', acceptTerms: true });
  assert.equal(dup.status, 409);
  const weak = await client().post('/api/auth/register', { username: 'fraco', email: 'f@y.dev', password: '123', acceptTerms: true });
  assert.equal(weak.status, 400);
  const out = client();
  assert.equal((await out.post('/api/auth/login', { login: c.user.username, password: 'errada000000' })).status, 401);
  assert.equal((await out.post('/api/auth/login', { login: c.user.username, password: 'senhaForte123' })).status, 200);
});

test('rotas administrativas exigem papel verificado no servidor', async () => {
  const c = await newUser();
  assert.equal((await c.get('/api/admin/overview')).status, 403);
  assert.equal((await client().get('/api/admin/overview')).status, 401);
  const a = await newAdmin();
  assert.equal((await a.get('/api/admin/overview')).status, 200);
});

test('PRO tem exatamente 4× o limite de IA do FREE e a regra se mantém', async () => {
  const plans = (await client().get('/api/payments/plans')).data.plans;
  const free = plans.find((p) => p.code === 'free'); const pro = plans.find((p) => p.code === 'pro'); const deluxe = plans.find((p) => p.code === 'deluxe');
  assert.equal(pro.ai_daily_commands, free.ai_daily_commands * 4);
  assert.equal(deluxe.ai_daily_commands, null);
  const a = await newAdmin();
  assert.equal((await a.patch('/api/admin/plans/free', { aiDailyCommands: 30 })).status, 200);
  const after = (await client().get('/api/payments/plans')).data.plans;
  assert.equal(after.find((p) => p.code === 'pro').ai_daily_commands, 120);
  assert.equal((await a.patch('/api/admin/plans/pro', { aiDailyCommands: 999 })).status, 400);
  await a.patch('/api/admin/plans/free', { aiDailyCommands: 25 });
});

test('publicação: verificação de build, moderação, catálogo e sandbox com token', async () => {
  const dev = await newUser('dev'); const admin = await newAdmin();
  const game = await publishedGame(dev, admin);
  const list = await client().get('/api/games');
  assert.ok(list.data.games.some((g) => g.id === game.id));
  const player = await newUser();
  const play = await player.post(`/api/games/${game.slug}/play`);
  assert.equal(play.status, 200, JSON.stringify(play.data));
  const pathPart = new URL(play.data.url).pathname;
  const ok = await fetch(sandboxBase + pathPart);
  assert.equal(ok.status, 200);
  assert.match(ok.headers.get('content-security-policy'), /sandbox/);
  assert.equal(ok.headers.get('set-cookie'), null);
  const bad = await fetch(`${sandboxBase}/p/token-invalido/index.html`);
  assert.equal(bad.status, 403);
  const trav = await fetch(sandboxBase + pathPart.replace('index.html', '..%2F..%2F..%2Fnexplay.db'));
  assert.notEqual(trav.status, 200);
});

test('builds maliciosos ou inválidos são bloqueados', async () => {
  const dev = await newUser('dev');
  const g = (await dev.post('/api/games', { title: 'Malicioso', genre: 'acao', ageRating: 'L', platforms: 'pc' })).data.game;
  const exe = await dev.post(`/api/games/${g.id}/versions`, undefined, { form: zipForm(zipOf({ 'index.html': 'x', 'virus.exe': 'MZ' }), { version: '1.0.0' }) });
  assert.equal(exe.status, 400);
  const noIndex = await dev.post(`/api/games/${g.id}/versions`, undefined, { form: zipForm(zipOf({ 'main.js': 'x' }), { version: '1.0.1' }) });
  assert.equal(noIndex.status, 400);
  const miner = await dev.post(`/api/games/${g.id}/versions`, undefined, { form: zipForm(zipOf({ 'index.html': '<script src="coinhive.min.js"></script>', 'a.js': 'new CoinHive.Anonymous("x")' }), { version: '1.0.2' }) });
  assert.equal(miner.status, 422);
  const slip = new AdmZip(); slip.addFile('index.html', Buffer.from('ok')); slip.getEntries()[0].entryName = '../../evil.html';
  const slipRes = await dev.post(`/api/games/${g.id}/versions`, undefined, { form: zipForm(slip.toBuffer(), { version: '1.0.3' }) });
  assert.equal(slipRes.status, 400);
  const other = await newUser();
  assert.equal((await other.patch(`/api/games/${g.id}`, { title: 'hack' })).status, 403);
});

test('aba MULTIPLAYER mostra apenas jogos com multiplayer declarado', async () => {
  const dev = await newUser('dev'); const admin = await newAdmin();
  const solo = await publishedGame(dev, admin, { modes: ['solo'], maxPlayers: 1 });
  const mp = await publishedGame(dev, admin, { modes: ['solo', 'public_mp', 'private_rooms'], maxPlayers: 8 });
  const r = await client().get('/api/games?multiplayer=1');
  assert.ok(r.data.games.some((g) => g.id === mp.id));
  assert.ok(!r.data.games.some((g) => g.id === solo.id));
  const bad = await dev.post('/api/games', { title: 'Inválido', genre: 'acao', ageRating: 'L', platforms: 'pc', modes: ['public_mp'], maxPlayers: 1 });
  assert.equal(bad.status, 400);
  const p = await newUser();
  const room = await p.post(`/api/multiplayer/games/${mp.id}/rooms`, { visibility: 'private', mode: 'private_rooms' });
  assert.equal(room.status, 201);
  assert.match(room.data.room.code, /^[A-Z0-9]{6}$/);
  assert.equal((await p.post(`/api/multiplayer/games/${solo.id}/rooms`, { visibility: 'private', mode: 'private_rooms' })).status, 400);
  const mobile = await client().get('/api/games?device=mobile');
  assert.ok(mobile.data.games.every((g) => g.platforms !== 'pc'));
});

test('REWARDS: antifraude, desafios, loja e conversão', async () => {
  const u = await newUser();
  const admin = await newAdmin();
  const rw = await u.get('/api/rewards');
  assert.equal(rw.data.nc, 0);
  assert.ok(rw.data.redemptionBlockers.length > 0);
  const ch = rw.data.challenges[0];
  assert.equal((await u.post(`/api/rewards/challenges/${ch.id}/claim`)).status, 400);
  const item = (await u.get('/api/rewards/store')).data.items.find((i) => !i.requiredPlan);
  assert.equal((await u.post(`/api/rewards/store/${item.id}/buy`)).status, 400);
  assert.equal((await u.post('/api/rewards/redeem', { tierNc: 3000 })).status, 400);
  assert.equal((await u.post('/api/admin/rewards/grant', { userId: u.user.id, amount: 5000, reason: 'teste' })).status, 403);
  assert.equal((await admin.post('/api/admin/rewards/grant', { userId: u.user.id, amount: 5000, reason: 'prêmio de teste' })).status, 200);
  assert.equal((await u.post(`/api/rewards/store/${item.id}/buy`)).status, 200);
  assert.equal((await u.post(`/api/rewards/store/${item.id}/buy`)).status, 409);
  const bal = (await u.get('/api/rewards')).data.nc;
  assert.equal(bal, 5000 - item.priceNc);
  // Conta nova, e-mail não confirmado e sem tempo de jogo: resgate bloqueado.
  const red = await u.post('/api/rewards/redeem', { tierNc: 3000 });
  assert.equal(red.status, 400);
  // Simula conta elegível: antiga, e-mail confirmado e tempo de jogo real registrado.
  run(`UPDATE users SET created_at=?, email_verified=1 WHERE id=?`, new Date(Date.now() - 30 * 864e5).toISOString(), u.user.id);
  const dev = await newUser('dev');
  const g = await publishedGame(dev, admin);
  run('INSERT INTO play_sessions(id, user_id, game_id, active_seconds) VALUES (?,?,?,?)', `s${Date.now()}`, u.user.id, g.id, 3 * 3600);
  const ok = await u.post('/api/rewards/redeem', { tierNc: 3000 });
  assert.equal(ok.status, 200, JSON.stringify(ok.data));
  assert.equal(ok.data.status, 'held'); // concessão administrativa recente → revisão manual
  assert.equal((await admin.post(`/api/admin/rewards/redemptions/${ok.data.id}`, { approve: true })).status, 200);
  const after = (await u.get('/api/rewards')).data;
  assert.equal(after.creditCents, 300);
  assert.equal((await u.post('/api/rewards/redeem', { tierNc: 3000 })).status, 400); // cooldown
  // Créditos compram jogo pago participante
  const paid = await publishedGame(dev, admin, { priceCents: 200 });
  const buy = await u.post(`/api/payments/games/${paid.id}/buy`, { method: 'credits' });
  assert.equal(buy.status, 200, JSON.stringify(buy.data));
  assert.equal((await u.get('/api/rewards')).data.creditCents, 100);
  const card = await u.post(`/api/payments/games/${g.id}/buy`, { method: 'card' });
  assert.equal(card.status, 400); // jogo grátis
  const paid2 = await publishedGame(dev, admin, { priceCents: 1000 });
  assert.equal((await u.post(`/api/payments/games/${paid2.id}/buy`, { method: 'card' })).status, 503); // sem provedor: nunca simula
});

test('concessão de PRO por período, renovação e revogação', async () => {
  const u = await newUser(); const a = await newAdmin();
  const g = await a.post('/api/admin/grants', { userId: u.user.id, plan: 'pro', period: '7', note: 'teste' });
  assert.equal(g.status, 201);
  assert.equal((await u.get('/api/auth/me')).data.user.plan.code, 'pro');
  assert.equal((await a.post(`/api/admin/grants/${g.data.id}/renew`, { period: '30' })).status, 200);
  assert.equal((await a.post(`/api/admin/grants/${g.data.id}/revoke`, { note: 'fim' })).status, 200);
  assert.equal((await u.get('/api/auth/me')).data.user.plan.code, 'free');
  const audit = (await a.get('/api/admin/audit?action=plans.')).data.entries;
  assert.ok(audit.some((e) => e.action === 'plans.grant') && audit.some((e) => e.action === 'plans.revoke'));
});

test('mensagens privadas exigem amizade e respeitam bloqueio', async () => {
  const a = await newUser(); const b = await newUser();
  assert.equal((await a.post(`/api/messages/${b.user.username}`, { body: 'oi' })).status, 403);
  await a.post(`/api/users/${b.user.username}/friend`);
  await b.post(`/api/users/${a.user.username}/friend`);
  assert.equal((await a.post(`/api/messages/${b.user.username}`, { body: 'oi' })).status, 201);
  await b.post(`/api/users/${a.user.username}/block`);
  assert.equal((await a.post(`/api/messages/${b.user.username}`, { body: 'oi de novo' })).status, 403);
});

test('modelos de projeto do Studio são válidos', () => {
  for (const t of GENRE_TEMPLATES) {
    for (const dim of ['3d', '2d']) {
      const doc = createProject({ name: t, dimension: dim, template: t });
      const r = validateProject(doc);
      assert.deepEqual(r.errors, [], `${t}/${dim}: ${r.errors.join('; ')}`);
    }
  }
  const doc = createProject({ name: 'x', template: 'vazio' });
  assert.throws(() => applyOps(doc, [{ op: 'remove_entity', id: 'nao-existe' }]));
  const { doc: d2, changes } = applyOps(doc, [{ op: 'add_entity', entity: { type: 'primitive', name: 'Cubo', props: { shape: 'box' } } }]);
  assert.equal(d2.entities.length, doc.entities.length + 1);
  assert.equal(changes.length, 1);
});

test('NEXPLAY CLOUD: projetos, versões, conflito, restauração e colaboradores', async () => {
  const u = await newUser();
  const p = (await u.post('/api/projects', { name: 'Futebol', dimension: '3d', template: 'futebol' })).data.project;
  const full = await u.get(`/api/projects/${p.id}`);
  const doc = full.data.doc;
  doc.meta.description = 'alterado';
  const s1 = await u.put(`/api/projects/${p.id}`, { doc, baseRevision: full.data.project.revision, source: 'manual', label: 'v2' });
  assert.equal(s1.status, 200);
  const conflict = await u.put(`/api/projects/${p.id}`, { doc, baseRevision: full.data.project.revision });
  assert.equal(conflict.status, 409);
  const versions = (await u.get(`/api/projects/${p.id}/versions`)).data.versions;
  assert.ok(versions.length >= 2);
  const first = versions[versions.length - 1];
  assert.equal((await u.post(`/api/projects/${p.id}/versions/${first.id}/restore`)).status, 200);
  assert.equal((await u.get(`/api/projects/${p.id}`)).data.doc.meta.description, '');
  const other = await newUser();
  assert.equal((await other.get(`/api/projects/${p.id}`)).status, 403);
  assert.equal((await u.post(`/api/projects/${p.id}/members`, { username: other.user.username, role: 'viewer' })).status, 200);
  assert.equal((await other.get(`/api/projects/${p.id}`)).status, 200);
  assert.equal((await other.put(`/api/projects/${p.id}`, { doc, baseRevision: 99 })).status, 403);
  const exp = await u.get(`/api/projects/${p.id}/export`);
  const imp = await u.post('/api/projects/import', exp.data);
  assert.equal(imp.status, 201);
});

test('NEXPLAY AI (mock): comando altera o projeto, cria versão e respeita a cota', async () => {
  const u = await newUser();
  const p = (await u.post('/api/projects', { name: 'IA', dimension: '3d', template: 'vazio' })).data.project;
  const res = await u.req('POST', `/api/ai/projects/${p.id}/command`, { prompt: 'Adicione um bloco', specialist: 'artist3d' }, { raw: true });
  const lines = (await res.text()).trim().split('\n').map((l) => JSON.parse(l));
  const result = lines.find((l) => l.type === 'result');
  assert.ok(result, JSON.stringify(lines));
  assert.ok(result.changes.some((c) => /Bloco IA/.test(c.label)));
  assert.ok(result.versionId);
  const doc = (await u.get(`/api/projects/${p.id}`)).data.doc;
  assert.ok(doc.entities.some((e) => e.name === 'Bloco IA'));
  // Esgota a cota diária FREE e verifica o bloqueio.
  const st = (await u.get('/api/ai/status')).data;
  for (let i = 0; i < st.quota.remaining; i++) run(`INSERT INTO ai_usage(user_id, specialist, created_at) VALUES (?, 'x', ?)`, u.user.id, new Date(Date.now() - 120_000).toISOString());
  const blocked = await u.req('POST', `/api/ai/projects/${p.id}/command`, { prompt: 'Mais um', specialist: 'artist3d' }, { raw: true });
  const ev = JSON.parse((await blocked.text()).trim().split('\n').pop());
  assert.equal(ev.type, 'error');
  assert.equal(ev.code, 'ai_daily_limit');
  // AUTOPILOT é exclusivo do DELUXE
  assert.equal((await u.post(`/api/ai/projects/${p.id}/autopilot`, { request: 'Crie um jogo completo de futebol' })).status, 402);
});

test('publicar build a partir de projeto do Studio', async () => {
  const dev = await newUser('dev'); const admin = await newAdmin();
  const p = (await dev.post('/api/projects', { name: 'Terror', dimension: '3d', template: 'terror' })).data.project;
  const g = (await dev.post('/api/games', { title: 'Noite', genre: 'terror', ageRating: '14', platforms: 'pc', description: 'Jogo de terror criado no NEXPLAY STUDIO com floresta, chuva e cabana.', rightsConfirmed: true })).data.game;
  const v = await dev.post(`/api/games/${g.id}/versions/from-project`, { projectId: p.id, version: '0.1.0' });
  assert.equal(v.status, 201, JSON.stringify(v.data));
  const cover = new FormData(); cover.append('file', new Blob([PNG]), 'c.png');
  await dev.post(`/api/games/${g.id}/cover`, undefined, { form: cover });
  assert.equal((await dev.post(`/api/games/${g.id}/submit`)).status, 200);
  assert.equal((await admin.post(`/api/admin/moderation/games/${g.id}`, { decision: 'approve' })).status, 200);
  const play = await (await newUser()).post(`/api/games/${g.slug}/play`);
  assert.equal(play.data.buildKind, 'studio');
  const token = new URL(play.data.url).hash.slice(1);
  const pj = await fetch(`${sandboxBase}/p/${token}/project.json`);
  assert.equal(pj.status, 200);
  assert.equal((await pj.json()).format, 'nexplay-project');
});

test('curadoria: somente admin escolhe jogos e o criador é notificado', async () => {
  const dev = await newUser('dev'); const admin = await newAdmin();
  const g = await publishedGame(dev, admin);
  assert.equal((await dev.post('/api/admin/curation/picks', { gameId: g.id, kind: 'game_of_day' })).status, 403);
  assert.equal((await admin.post('/api/admin/curation/picks', { gameId: g.id, kind: 'game_of_day', headline: 'Imperdível' })).status, 201);
  const picks = (await client().get('/api/community/picks')).data;
  assert.equal(picks.gameOfDay.id, g.id);
  const notes = (await dev.get('/api/notifications')).data.notifications;
  assert.ok(notes.some((x) => x.type === 'pick'));
});
