// NEXPLAY Arcade: catálogo começa vazio, modelos do Studio nunca aparecem, publicação direta pelo Studio
// com teste de execução obrigatório, atualização, retirada e rankings com dados reais.
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import http from 'node:http';
import crypto from 'node:crypto';

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'nexplay-arcade-'));
Object.assign(process.env, { NODE_ENV: 'test', DB_FILE: ':memory:', DATA_DIR: tmp, NEXPLAY_AI_PROVIDER: 'mock', APP_ORIGIN: 'http://app.test', SANDBOX_ORIGIN: 'http://sandbox.test' });
const { createApp } = await import('../server/index.js');
const { run, one, setSetting } = await import('../server/db/index.js');
const { GENRE_TEMPLATES } = await import('../shared/project.js');

let base; let server;
before(async () => { server = http.createServer(createApp()); await new Promise((r) => server.listen(0, r)); base = `http://127.0.0.1:${server.address().port}`; });
after(() => { server.close(); fs.rmSync(tmp, { recursive: true, force: true }); });

function client() {
  let cookie = '';
  const req = async (method, url, body) => {
    const headers = { 'X-NX-Client': '1' };
    if (cookie) headers.Cookie = cookie;
    if (body !== undefined) headers['Content-Type'] = 'application/json';
    const res = await fetch(base + url, { method, headers, body: body !== undefined ? JSON.stringify(body) : undefined });
    const set = res.headers.get('set-cookie'); if (set) cookie = set.split(';')[0];
    const t = await res.text(); let data; try { data = JSON.parse(t); } catch { data = t; }
    return { status: res.status, data };
  };
  return { get: (u) => req('GET', u), post: (u, b) => req('POST', u, b ?? {}) };
}
let n = 0;
async function newUser(p = 'u') { const c = client(); n++; const r = await c.post('/api/auth/register', { username: `${p}${n}`, email: `${p}${n}@t.dev`, password: 'senhaForte123', acceptTerms: true }); assert.equal(r.status, 201); c.user = r.data.user; return c; }

const PNG = `data:image/png;base64,${Buffer.from('89504e470d0a1a0a0000000d49484452000000010000000108060000001f15c4890000000d49444154789c6360000002000154a24f5d0000000049454e44ae426082', 'hex').toString('base64')}`;
const OK_TEST = { ok: true, frames: 240, fps: 60, errors: [], durationMs: 4000, dimension: '3d' };
const form = (projectId, extra = {}) => ({
  projectId, title: 'Floresta Sombria', shortDescription: 'Sobreviva à noite.', description: 'Um jogo de terror feito no NEXPLAY Studio, com floresta, chuva e uma cabana.',
  genre: 'terror', tags: ['noite'], platforms: 'both', modes: ['solo'], maxPlayers: 1, controls: 'WASD e Espaço', version: '1.0.0',
  rightsConfirmed: true, coverDataUrl: PNG, testReport: OK_TEST, ...extra,
});

test('Arcade começa vazio e os modelos do Studio nunca aparecem como jogos', async () => {
  const anon = client();
  for (const tab of ['month', 'week', 'trending', 'new', 'search']) {
    const r = await anon.get(`/api/games/arcade?tab=${tab}`);
    assert.equal(r.status, 200);
    assert.equal(r.data.totalPublished, 0);
    assert.deepEqual(r.data.games, []);
  }
  // Criar projetos a partir de todos os modelos não publica nada.
  const dev = await newUser('dev');
  for (const t of GENRE_TEMPLATES.slice(0, 4)) assert.equal((await dev.post('/api/projects', { name: t, dimension: '3d', template: t })).status, 201);
  assert.equal((await anon.get('/api/games/arcade')).data.totalPublished, 0);
  assert.equal(Number(one('SELECT COUNT(*) AS c FROM games').c), 0);
});

test('publicar pelo Studio exige teste aprovado, entra no Arcade, atualiza e pode ser retirado', async () => {
  const dev = await newUser('criador'); const other = await newUser('outro'); const anon = client();
  const p = (await dev.post('/api/projects', { name: 'Floresta', dimension: '3d', template: 'terror' })).data.project;

  // Teste reprovado → recusado
  const bad = await dev.post('/api/games/publish-studio', form(p.id, { testReport: { ok: false, frames: 3, errors: ['TypeError: x is undefined'] } }));
  assert.equal(bad.status, 422); assert.equal(bad.data.error.code, 'runtime_test_failed');
  // Sem confirmação de direitos → recusado
  assert.equal((await dev.post('/api/games/publish-studio', form(p.id, { rightsConfirmed: false }))).status, 400);
  // Jogo pago sem pagamentos configurados → recusado
  assert.equal((await dev.post('/api/games/publish-studio', form(p.id, { priceCents: 500 }))).data.error.code, 'payments_not_configured');
  // Outra pessoa não pode publicar o projeto
  assert.equal((await other.post('/api/games/publish-studio', form(p.id))).status, 403);

  const pub = await dev.post('/api/games/publish-studio', form(p.id));
  assert.equal(pub.status, 201, JSON.stringify(pub.data));
  assert.equal(pub.data.status, 'published');
  const g = pub.data.game;

  const arc = await anon.get('/api/games/arcade');
  assert.equal(arc.data.totalPublished, 1);
  assert.equal(arc.data.games[0].id, g.id);
  assert.equal(arc.data.games[0].creator.username, dev.user.username);

  // Página do jogo com dados do criador; qualquer usuário consegue abrir e jogar
  const page = await anon.get(`/api/games/${g.slug}`);
  assert.equal(page.data.creatorInfo.username, dev.user.username);
  assert.equal(page.data.creatorInfo.gamesPublished, 1);
  const play = await other.post(`/api/games/${g.slug}/play`);
  assert.equal(play.status, 200, JSON.stringify(play.data)); assert.equal(play.data.buildKind, 'studio');

  // Pesquisa
  assert.equal((await anon.get('/api/games/arcade?tab=search&q=Floresta')).data.games.length, 1);
  assert.equal((await anon.get('/api/games/arcade?tab=search&q=futebol')).data.games.length, 0);
  assert.equal((await anon.get('/api/games/arcade?tab=search&dimension=2d')).data.games.length, 0);
  assert.equal((await anon.get('/api/games/arcade?tab=search&dimension=3d')).data.games.length, 1);

  // Atualização: mesma versão é recusada, nova versão vira a atual
  assert.equal((await dev.post('/api/games/publish-studio', form(p.id))).status, 409);
  const upd = await dev.post('/api/games/publish-studio', form(p.id, { version: '1.0.1', changelog: 'Mais neblina.', title: 'Floresta Sombria DX', coverDataUrl: undefined }));
  assert.equal(upd.status, 200, JSON.stringify(upd.data));
  const page2 = await anon.get(`/api/games/${g.slug}`);
  assert.equal(page2.data.game.title, 'Floresta Sombria DX');
  assert.equal(page2.data.versions[0].version, '1.0.1');
  assert.equal(page2.data.game.currentVersionId, upd.data.versionId);
  const bp = await dev.get(`/api/games/by-project/${p.id}`);
  assert.equal(bp.data.game.id, g.id); assert.equal(bp.data.game.currentVersion, '1.0.1');

  // Retirar do Arcade
  assert.equal((await other.post(`/api/games/${g.id}/unpublish`)).status, 403);
  assert.equal((await dev.post(`/api/games/${g.id}/unpublish`)).status, 200);
  assert.equal((await anon.get('/api/games/arcade')).data.totalPublished, 0);
  assert.equal((await anon.get(`/api/games/${g.slug}`)).status, 404);
  // Dados preservados e volta a publicar
  assert.equal(Number(one('SELECT COUNT(*) AS c FROM game_versions WHERE game_id=?', g.id).c), 2);
  assert.equal((await dev.post(`/api/games/${g.id}/republish`)).status, 200);
  assert.equal((await anon.get('/api/games/arcade')).data.totalPublished, 1);
});

test('rankings do mês, da semana e em alta usam só jogadores reais (sem o criador)', async () => {
  const dev = await newUser('rk');
  const mk = async (title) => {
    const p = (await dev.post('/api/projects', { name: title, dimension: '2d', template: 'plataforma' })).data.project;
    const r = await dev.post('/api/games/publish-studio', form(p.id, { title, testReport: { ...OK_TEST, dimension: '2d' } }));
    assert.equal(r.status, 201, JSON.stringify(r.data)); return r.data.game;
  };
  const a = await mk('Alpha Pulo'); const b = await mk('Beta Pulo');
  const anon = client();
  // Sem jogadores: rankings vazios (jogos aparecem só em Novidades)
  assert.equal((await anon.get('/api/games/arcade?tab=week')).data.games.length, 0);
  assert.ok((await anon.get('/api/games/arcade?tab=new')).data.games.length >= 2);
  const players = [await newUser('jog'), await newUser('jog'), await newUser('jog')];
  const sess = (uid, gid, daysAgo, secs = 120) => run('INSERT INTO play_sessions(id,user_id,game_id,started_at,active_seconds) VALUES (?,?,?,?,?)', crypto.randomUUID(), uid, gid, new Date(Date.now() - daysAgo * 864e5).toISOString(), secs);
  for (const p of players) sess(p.user.id, b.id, 1);
  sess(players[0].user.id, a.id, 0.5);
  for (let i = 0; i < 20; i++) sess(dev.user.id, a.id, 0.1); // criador jogando o próprio jogo não conta
  sess(players[1].user.id, a.id, 0.2, 0); // sessão sem tempo ativo não conta
  const week = (await anon.get('/api/games/arcade?tab=week')).data.games;
  assert.deepEqual(week.map((g) => g.id), [b.id, a.id]);
  const trending = (await anon.get('/api/games/arcade?tab=trending')).data.games;
  assert.equal(trending[0].id, b.id);
  const month = (await anon.get('/api/games/arcade?tab=month')).data.games;
  assert.equal(month.length, 2);
  // Sessões antigas saem da semana mas contam no mês
  const c = await mk('Gama Pulo');
  sess(players[2].user.id, c.id, 20);
  assert.ok(!(await anon.get('/api/games/arcade?tab=week')).data.games.some((g) => g.id === c.id));
  assert.ok((await anon.get('/api/games/arcade?tab=month')).data.games.some((g) => g.id === c.id));
});

test('com publicação automática desligada, o jogo do Studio vai para a moderação', async () => {
  setSetting('publishing', { auto_publish_studio: false, require_runtime_test: true });
  const dev = await newUser('mod');
  const p = (await dev.post('/api/projects', { name: 'Fila', dimension: '3d', template: 'aventura' })).data.project;
  const r = await dev.post('/api/games/publish-studio', form(p.id, { title: 'Na Fila' }));
  assert.equal(r.status, 201, JSON.stringify(r.data));
  assert.equal(r.data.status, 'pending_review');
  assert.ok(!(await client().get('/api/games/arcade?tab=search&q=Na%20Fila')).data.games.length);
  setSetting('publishing', { auto_publish_studio: true, require_runtime_test: true });
});
