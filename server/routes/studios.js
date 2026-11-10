// Estúdios: identidade, integrantes com funções, jogos, posts e estatísticas.
import { Router } from 'express';
import multer from 'multer';
import { one, all, run, tx } from '../db/index.js';
import { HttpError, slugify, rateLimiter } from '../lib/security.js';
import { requireAuth, publicUser } from '../lib/auth.js';
import { parse, z, text, id } from '../lib/validate.js';
import { saveImage } from '../lib/uploads.js';
import { notify } from '../lib/services.js';
import { gameCard, commentsFor, addComment } from './games.js';

const r = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 8 * 1024 * 1024, files: 1 } });
const limiter = rateLimiter({ windowMs: 60_000, max: 20, key: (req) => `st:${req.user?.id}` });
const ROLES = ['owner', 'admin', 'developer', 'artist', 'designer', 'tester'];

function load(slug) {
  const s = one('SELECT * FROM studios WHERE slug=?', slug);
  if (!s) throw new HttpError(404, 'Estúdio não encontrado.');
  return s;
}
const roleOf = (studioId, userId) => one('SELECT role FROM studio_members WHERE studio_id=? AND user_id=?', studioId, userId)?.role;
function requireStudioRole(req, s, roles) {
  if (req.user.role === 'admin') return;
  if (!roles.includes(roleOf(s.id, req.user.id))) throw new HttpError(403, 'Você não tem permissão neste estúdio.');
}
const view = (s) => ({ id: s.id, slug: s.slug, name: s.name, description: s.description, logoUrl: s.logo_url, bannerUrl: s.banner_url, accentColor: s.accent_color, createdAt: s.created_at });

r.get('/', (_req, res) => res.json({ studios: all('SELECT * FROM studios ORDER BY id DESC LIMIT 100').map(view) }));

r.get('/mine', requireAuth, (req, res) => {
  res.json({ studios: all('SELECT s.*, m.role FROM studio_members m JOIN studios s ON s.id=m.studio_id WHERE m.user_id=?', req.user.id).map((s) => ({ ...view(s), myRole: s.role })) });
});

r.post('/', requireAuth, limiter, (req, res) => {
  const b = parse(z.object({ name: text(60).pipe(z.string().min(2)), description: text(2000).default(''), accentColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).default('#8b5cf6') }), req.body);
  if (Number(one('SELECT COUNT(*) AS c FROM studios WHERE owner_id=?', req.user.id).c) >= 5) throw new HttpError(400, 'Limite de 5 estúdios por conta.');
  let slug = slugify(b.name);
  if (one('SELECT 1 FROM studios WHERE slug=?', slug)) throw new HttpError(409, 'Já existe um estúdio com este nome.');
  const sid = tx(() => {
    const s = run('INSERT INTO studios(slug, name, description, accent_color, owner_id) VALUES (?,?,?,?,?)', slug, b.name, b.description, b.accentColor, req.user.id);
    run(`INSERT INTO studio_members(studio_id, user_id, role) VALUES (?,?, 'owner')`, s.lastInsertRowid, req.user.id);
    return s.lastInsertRowid;
  });
  res.status(201).json({ studio: view(one('SELECT * FROM studios WHERE id=?', sid)) });
});

r.get('/:slug', (req, res) => {
  const s = load(req.params.slug);
  const games = all(`SELECT * FROM games WHERE studio_id=? AND status IN ('published','in_development') ORDER BY published_at DESC`, s.id);
  const since = new Date(Date.now() - 30 * 864e5).toISOString();
  res.json({
    studio: view(s),
    myRole: req.user ? roleOf(s.id, req.user.id) || null : null,
    members: all('SELECT m.role, m.joined_at, u.* FROM studio_members m JOIN users u ON u.id=m.user_id WHERE m.studio_id=? ORDER BY m.joined_at', s.id).map((u) => ({ ...publicUser(u), studioRole: u.role })),
    games: games.map(gameCard),
    posts: all('SELECT p.*, u.username, u.display_name FROM studio_posts p JOIN users u ON u.id=p.author_id WHERE p.studio_id=? ORDER BY p.id DESC LIMIT 30', s.id),
    stats: {
      games: games.length,
      players30d: Number(one(`SELECT COUNT(DISTINCT ps.user_id) AS c FROM play_sessions ps JOIN games g ON g.id=ps.game_id WHERE g.studio_id=? AND ps.started_at >= ?`, s.id, since).c),
      reviews: Number(one(`SELECT COUNT(*) AS c FROM reviews r JOIN games g ON g.id=r.game_id WHERE g.studio_id=? AND r.hidden=0`, s.id).c),
      avgRating: one(`SELECT ROUND(AVG(r.rating),1) AS a FROM reviews r JOIN games g ON g.id=r.game_id WHERE g.studio_id=? AND r.hidden=0`, s.id).a,
    },
  });
});

r.patch('/:slug', requireAuth, (req, res) => {
  const s = load(req.params.slug);
  requireStudioRole(req, s, ['owner', 'admin']);
  const b = parse(z.object({ name: text(60).pipe(z.string().min(2)).optional(), description: text(2000).optional(), accentColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional() }), req.body);
  run('UPDATE studios SET name=COALESCE(?,name), description=COALESCE(?,description), accent_color=COALESCE(?,accent_color) WHERE id=?', b.name ?? null, b.description ?? null, b.accentColor ?? null, s.id);
  res.json({ studio: view(one('SELECT * FROM studios WHERE id=?', s.id)) });
});

r.post('/:slug/image', requireAuth, upload.single('file'), (req, res) => {
  const s = load(req.params.slug);
  requireStudioRole(req, s, ['owner', 'admin']);
  if (!req.file) throw new HttpError(400, 'Envie uma imagem.');
  const url = saveImage(req.file.buffer);
  run(`UPDATE studios SET ${req.query.kind === 'banner' ? 'banner_url' : 'logo_url'}=? WHERE id=?`, url, s.id);
  res.json({ url });
});

r.post('/:slug/members', requireAuth, (req, res) => {
  const s = load(req.params.slug);
  requireStudioRole(req, s, ['owner', 'admin']);
  const b = parse(z.object({ username: z.string().max(40), role: z.enum(ROLES.filter((x) => x !== 'owner')) }), req.body);
  const u = one('SELECT * FROM users WHERE username=?', b.username);
  if (!u) throw new HttpError(404, 'Usuário não encontrado.');
  if (u.id === s.owner_id) throw new HttpError(400, 'O dono já faz parte do estúdio.');
  if (Number(one('SELECT COUNT(*) AS c FROM studio_members WHERE studio_id=?', s.id).c) >= 50) throw new HttpError(400, 'Limite de 50 integrantes.');
  run('INSERT INTO studio_members(studio_id, user_id, role) VALUES (?,?,?) ON CONFLICT(studio_id, user_id) DO UPDATE SET role=excluded.role', s.id, u.id, b.role);
  notify(u.id, 'studio', `Você agora faz parte do estúdio ${s.name}`, `Função: ${b.role}`, `/estudios/${s.slug}`);
  res.json({ ok: true });
});

r.delete('/:slug/members/:username', requireAuth, (req, res) => {
  const s = load(req.params.slug);
  const u = one('SELECT * FROM users WHERE username=?', req.params.username);
  if (!u) throw new HttpError(404, 'Usuário não encontrado.');
  if (u.id !== req.user.id) requireStudioRole(req, s, ['owner', 'admin']);
  if (u.id === s.owner_id) throw new HttpError(400, 'O dono não pode ser removido.');
  run('DELETE FROM studio_members WHERE studio_id=? AND user_id=?', s.id, u.id);
  res.json({ ok: true });
});

r.post('/:slug/posts', requireAuth, limiter, (req, res) => {
  const s = load(req.params.slug);
  requireStudioRole(req, s, ROLES);
  const b = parse(z.object({ title: text(120).pipe(z.string().min(2)), body: text(20000).pipe(z.string().min(10)) }), req.body);
  const p = run('INSERT INTO studio_posts(studio_id, author_id, title, body) VALUES (?,?,?,?)', s.id, req.user.id, b.title, b.body);
  res.status(201).json({ id: p.lastInsertRowid });
});

r.get('/posts/:postId/comments', (req, res) => res.json({ comments: commentsFor('studio_post', parse(id, req.params.postId)) }));
r.post('/posts/:postId/comments', requireAuth, limiter, (req, res) => {
  const p = one('SELECT p.*, s.slug FROM studio_posts p JOIN studios s ON s.id=p.studio_id WHERE p.id=?', parse(id, req.params.postId));
  if (!p) throw new HttpError(404, 'Post não encontrado.');
  res.status(201).json({ id: addComment(req, 'studio_post', p.id, p.author_id, `/estudios/${p.slug}`) });
});

export default r;
