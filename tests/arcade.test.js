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
  return { get: (u) => req('GET', u), post: (u, b) => req('POST', u, b ?? {}), req, cookie: () => cookie };
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

test('"Criar jogo" sempre cria um projeto novo, independente e em branco', async () => {
  const dev = await newUser('novo');
  const a = await dev.post('/api/projects', { name: 'Meu Terror', dimension: '3d', genre: 'terror' });
  assert.equal(a.status, 201, JSON.stringify(a.data));
  assert.equal(a.data.project.template, 'vazio'); assert.equal(a.data.project.genre, 'terror'); assert.equal(a.data.project.blank, true);
  const docA = (await dev.get(`/api/projects/${a.data.project.id}`)).data.doc;
  assert.equal(docA.meta.genre, 'terror'); assert.equal(docA.meta.name, 'Meu Terror');
  assert.deepEqual([...new Set(docA.entities.map((e) => e.type))].sort(), ['character', 'light', 'terrain']);
  assert.equal(docA.missions.length, 0);
  // Um segundo projeto é outro registro, com outro id e documento próprio
  const b = await dev.post('/api/projects', { name: 'Plataforma Nova', dimension: '2d', genre: 'plataforma' });
  assert.notEqual(b.data.project.id, a.data.project.id);
  const docB = (await dev.get(`/api/projects/${b.data.project.id}`)).data.doc;
  assert.equal(docB.meta.dimension, '2d'); assert.equal(docB.missions.length, 0);
  const tiles = docB.entities.find((e) => e.type === 'tilemap').props.rows.join('');
  assert.ok(!/[2345]/.test(tiles), 'mapa 2D em branco não tem plataformas, moedas, espinhos ou bandeira');
  // Editar um não altera o outro
  const ed = await dev.req('PUT', `/api/projects/${a.data.project.id}`, { doc: { ...docA, meta: { ...docA.meta, description: 'editado' } }, baseRevision: 1, source: 'manual' });
  assert.equal(ed.status, 200, JSON.stringify(ed.data));
  assert.equal((await dev.get(`/api/projects/${b.data.project.id}`)).data.doc.meta.description, '');
  // Modelo com conteúdo só quando pedido
  const t = await dev.post('/api/projects', { name: 'Com modelo', dimension: '3d', genre: 'terror', template: 'terror' });
  assert.ok((await dev.get(`/api/projects/${t.data.project.id}`)).data.doc.missions.length > 0);
  // Renomear e excluir
  assert.equal((await dev.req('PATCH', `/api/projects/${b.data.project.id}`, { name: 'Plataforma 2', genre: 'casual' })).data.project.genre, 'casual');
  assert.equal((await dev.req('DELETE', `/api/projects/${t.data.project.id}`)).status, 200);
  const list = (await dev.get('/api/projects')).data.projects.map((p) => p.id);
  assert.ok(list.includes(a.data.project.id) && list.includes(b.data.project.id) && !list.includes(t.data.project.id));
  assert.equal((await dev.get(`/api/projects/${t.data.project.id}`)).status, 404);
  // Nenhum projeto vira jogo no Arcade sozinho
  assert.equal(Number(one('SELECT COUNT(*) AS c FROM games WHERE studio_project_id IN (?,?)', a.data.project.id, b.data.project.id).c), 0);
});

test('"Enviar jogo pronto": validação, detecção da ferramenta, análise e o mesmo Arcade', async () => {
  const AdmZip = (await import('adm-zip')).default;
  const dev = await newUser('envio'); const admin = await newUser('adm');
  run(`UPDATE users SET role='admin' WHERE id=?`, admin.user.id);
  const upload = async (gid, name, buf, version) => {
    const fd = new FormData(); fd.append('file', new Blob([buf]), name); fd.append('version', version);
    const res = await fetch(`${base}/api/games/${gid}/versions`, { method: 'POST', headers: { 'X-NX-Client': '1', Cookie: dev.cookie() }, body: fd });
    return { status: res.status, data: await res.json() };
  };
  const g = (await dev.post('/api/games', { sourceEngine: 'godot', title: 'Cavernas', genre: 'aventura', ageRating: 'L', platforms: 'pc', controls: 'Setas', description: 'Um jogo de aventura feito no Godot e exportado para a Web, com cavernas e tesouros.', rightsConfirmed: true, releaseStage: 'released', betaMode: 'none' })).data.game;
  assert.equal(g.sourceEngine, 'godot');
  // Executável é recusado
  assert.equal((await upload(g.id, 'jogo.exe', Buffer.from('MZ'), '0.1')).data.error.code, 'native_build');
  // Godot exportado com threads → aviso de incompatibilidade
  const zg = new AdmZip(); zg.addFile('index.html', Buffer.from('<script>const GODOT_THREADS_ENABLED = true;</script>')); zg.addFile('game.pck', Buffer.from('x')); zg.addFile('game.wasm', Buffer.from('x'));
  const rg = await upload(g.id, 'godot.zip', zg.toBuffer(), '0.2');
  assert.equal(rg.status, 201, JSON.stringify(rg.data)); assert.equal(rg.data.scan.engine, 'godot');
  assert.ok(rg.data.scan.compatibility.some((n) => n.level === 'error'));
  // Um único .html vira build com index.html
  const rh = await upload(g.id, 'jogo.html', Buffer.from('<!doctype html><canvas></canvas><script>console.log("ok")</script>'), '1.0.0');
  assert.equal(rh.status, 201, JSON.stringify(rh.data)); assert.equal(rh.data.scan.status, 'passed');
  // Unity detectado
  const g2 = (await dev.post('/api/games', { title: 'Corrida U', genre: 'corrida', ageRating: 'L', platforms: 'both', description: 'Corrida feita na Unity exportada em WebGL, com três pistas e modo contra o relógio.', rightsConfirmed: true })).data.game;
  const zu = new AdmZip(); zu.addFile('index.html', Buffer.from('<canvas id="unity-canvas"></canvas>')); zu.addFile('Build/Corrida.loader.js', Buffer.from('//')); zu.addFile('Build/Corrida.wasm.br', Buffer.from('x'));
  assert.equal((await upload(g2.id, 'unity.zip', zu.toBuffer(), '1.0')).data.scan.engine, 'unity');
  // Envio para análise exige capa; depois de aprovado aparece no Arcade junto com jogos do Studio
  assert.equal((await dev.post(`/api/games/${g.id}/submit`)).status, 400);
  const fd = new FormData(); fd.append('file', new Blob([Buffer.from(PNG.split(',')[1], 'base64')]), 'c.png');
  await fetch(`${base}/api/games/${g.id}/cover`, { method: 'POST', headers: { 'X-NX-Client': '1', Cookie: dev.cookie() }, body: fd });
  assert.equal((await dev.post(`/api/games/${g.id}/submit`)).data.status, 'pending_review');
  assert.ok(!(await client().get('/api/games/arcade?tab=search&q=Cavernas')).data.games.length, 'não aparece antes da análise');
  assert.equal((await admin.post(`/api/admin/moderation/games/${g.id}`, { decision: 'approve' })).status, 200);
  const found = (await client().get('/api/games/arcade?tab=search&q=Cavernas')).data.games[0];
  assert.equal(found.buildKind, 'html5'); assert.equal(found.sourceEngine, 'godot'); assert.equal(found.creator.username, dev.user.username);
  const kinds = new Set((await client().get('/api/games/arcade')).data.games.map((x) => x.buildKind));
  assert.ok(kinds.has('studio') && kinds.has('html5'), 'Studio e envios prontos no mesmo Arcade');
  // Jogo enviado roda na origem isolada, nunca no site principal
  const play = await (await newUser('jog')).post(`/api/games/${g.slug}/play`);
  assert.match(play.data.url, /^http:\/\/sandbox\.test\/p\//);
});
