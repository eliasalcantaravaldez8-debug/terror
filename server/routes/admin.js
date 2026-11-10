// Painel administrativo. TODA rota aqui exige papel verificado no servidor (requireRole).
// Moderadores: moderação e denúncias. Administradores: tudo, incluindo planos, NC e configurações.
import { Router } from 'express';
import { one, all, run, tx, getSetting, setSetting } from '../db/index.js';
import { HttpError, slugify } from '../lib/security.js';
import { requireRole, publicUser } from '../lib/auth.js';
import { parse, z, text, id } from '../lib/validate.js';
import { audit, notify, activePlanCode, logActivity } from '../lib/services.js';
import { grantNC, ncBalance, creditBalance, reviewRedemption, unlockAchievement } from '../lib/rewards.js';
import { gameCard } from './games.js';
import { FREE_AI_DAILY } from '../db/seed.js';

const r = Router();
const staff = requireRole('admin', 'moderator');
const admin = requireRole('admin');
r.use(staff);

r.get('/overview', (_req, res) => {
  const c = (sql, ...p) => Number(one(sql, ...p).c);
  const dayAgo = new Date(Date.now() - 864e5).toISOString();
  res.json({
    users: c('SELECT COUNT(*) AS c FROM users'), newUsers24h: c('SELECT COUNT(*) AS c FROM users WHERE created_at >= ?', dayAgo),
    activeUsers24h: c('SELECT COUNT(*) AS c FROM users WHERE last_seen_at >= ?', dayAgo),
    games: c(`SELECT COUNT(*) AS c FROM games WHERE status='published'`), pendingGames: c(`SELECT COUNT(*) AS c FROM games WHERE status='pending_review'`),
    pendingVersions: c(`SELECT COUNT(*) AS c FROM game_versions v JOIN games g ON g.id=v.game_id WHERE v.review_status='pending' AND g.status IN ('published','in_development') AND v.scan_status<>'failed'`),
    openReports: c(`SELECT COUNT(*) AS c FROM reports WHERE status='open'`), heldRedemptions: c(`SELECT COUNT(*) AS c FROM nc_redemptions WHERE status='held'`),
    subscriptions: all(`SELECT plan_code, COUNT(*) AS n FROM subscriptions WHERE status='active' GROUP BY plan_code`),
    aiCommands24h: c('SELECT COUNT(*) AS c FROM ai_usage WHERE created_at >= ?', dayAgo),
  });
});

// ───────── Usuários ─────────
r.get('/users', (req, res) => {
  const q = String(req.query.q || '').slice(0, 60);
  const rows = q ? all('SELECT * FROM users WHERE username LIKE ? OR email LIKE ? OR display_name LIKE ? ORDER BY id DESC LIMIT 100', `%${q}%`, `%${q}%`, `%${q}%`)
    : all('SELECT * FROM users ORDER BY id DESC LIMIT 100');
  res.json({ users: rows.map((u) => ({ ...publicUser(u), role: u.role, email: u.email, status: u.status, emailVerified: !!u.email_verified, plan: activePlanCode(u.id), nc: ncBalance(u.id), creditCents: creditBalance(u.id), signupIp: u.signup_ip, lastSeenAt: u.last_seen_at })) });
});

r.patch('/users/:id', (req, res) => {
  const u = one('SELECT * FROM users WHERE id=?', parse(id, req.params.id));
  if (!u) throw new HttpError(404, 'Usuário não encontrado.');
  const b = parse(z.object({ status: z.enum(['active', 'suspended', 'banned']).optional(), role: z.enum(['user', 'moderator', 'admin']).optional(), emailVerified: z.boolean().optional(), reason: text(500).default('') }), req.body);
  if (b.role && req.user.role !== 'admin') throw new HttpError(403, 'Apenas administradores alteram papéis.');
  if (u.id === req.user.id && (b.role || b.status)) throw new HttpError(400, 'Você não pode alterar seu próprio papel/status.');
  if (u.role === 'admin' && req.user.role !== 'admin') throw new HttpError(403, 'Moderadores não podem alterar administradores.');
  tx(() => {
    if (b.status) { run('UPDATE users SET status=? WHERE id=?', b.status, u.id); if (b.status !== 'active') run('DELETE FROM sessions WHERE user_id=?', u.id); }
    if (b.role) run('UPDATE users SET role=? WHERE id=?', b.role, u.id);
    if (b.emailVerified !== undefined) run('UPDATE users SET email_verified=? WHERE id=?', b.emailVerified ? 1 : 0, u.id);
  });
  audit(req, 'admin.user_update', 'user', u.id, b);
  res.json({ ok: true });
});

// ───────── Moderação de jogos ─────────
r.get('/moderation/games', (_req, res) => {
  const pendingGames = all(`SELECT * FROM games WHERE status='pending_review' ORDER BY updated_at`);
  const pendingVersions = all(`SELECT v.*, g.title, g.slug, g.status AS game_status FROM game_versions v JOIN games g ON g.id=v.game_id
    WHERE v.review_status='pending' AND v.scan_status <> 'failed' ORDER BY v.id`);
  res.json({
    games: pendingGames.map((g) => ({ ...gameCard(g), description: g.description, rightsConfirmed: !!g.rights_confirmed,
      versions: all('SELECT id, version, build_kind, scan_status, scan_report, review_status, size_bytes, file_count, created_at FROM game_versions WHERE game_id=? ORDER BY id DESC', g.id).map((v) => ({ ...v, scan_report: JSON.parse(v.scan_report) })) })),
    versions: pendingVersions.map((v) => ({ id: v.id, gameId: v.game_id, title: v.title, slug: v.slug, gameStatus: v.game_status, version: v.version, buildKind: v.build_kind, scanStatus: v.scan_status, scanReport: JSON.parse(v.scan_report), changelog: v.changelog, sizeBytes: v.size_bytes, createdAt: v.created_at })),
  });
});

r.post('/moderation/games/:id', (req, res) => {
  const g = one('SELECT * FROM games WHERE id=?', parse(id, req.params.id));
  if (!g) throw new HttpError(404, 'Jogo não encontrado.');
  const b = parse(z.object({ decision: z.enum(['approve', 'reject', 'remove', 'restore']), notes: text(2000).default(''), versionId: id.optional() }), req.body);
  const now = new Date().toISOString();
  tx(() => {
    if (b.decision === 'approve') {
      if (g.status !== 'pending_review') throw new HttpError(400, 'Jogo não está aguardando revisão.');
      const showcase = ['announced', 'in_development', 'beta'].includes(g.release_stage);
      const v = b.versionId ? one('SELECT * FROM game_versions WHERE id=? AND game_id=?', b.versionId, g.id)
        : one(`SELECT * FROM game_versions WHERE game_id=? AND scan_status <> 'failed' ORDER BY id DESC LIMIT 1`, g.id);
      if (!v && !showcase) throw new HttpError(400, 'Nenhum build válido para aprovar.');
      if (v) run(`UPDATE game_versions SET review_status='approved' WHERE id=?`, v.id);
      run(`UPDATE games SET status=?, current_version_id=?, published_at=COALESCE(published_at, ?), moderation_notes=?, updated_at=? WHERE id=?`,
        showcase ? 'in_development' : 'published', v?.id ?? null, now, b.notes || null, now, g.id);
      notify(g.creator_id, 'moderation', `"${g.title}" foi aprovado!`, showcase ? 'Já aparece em LANÇAMENTOS.' : 'Seu jogo está publicado no catálogo.', `/jogo/${g.slug}`);
      if (!showcase) { unlockAchievement(g.creator_id, 'creator_debut'); logActivity(g.creator_id, 'published', g.id); }
    } else if (b.decision === 'reject') {
      if (!b.notes) throw new HttpError(400, 'Explique o motivo da recusa.');
      run(`UPDATE games SET status='rejected', moderation_notes=?, updated_at=? WHERE id=?`, b.notes, now, g.id);
      notify(g.creator_id, 'moderation', `"${g.title}" precisa de ajustes`, b.notes, `/criador/jogos/${g.id}`);
    } else if (b.decision === 'remove') {
      run(`UPDATE games SET status='removed', moderation_notes=?, updated_at=? WHERE id=?`, b.notes || 'Removido pela moderação.', now, g.id);
      run('UPDATE picks SET active=0 WHERE game_id=?', g.id);
      notify(g.creator_id, 'moderation', `"${g.title}" foi removido`, b.notes, `/criador/jogos/${g.id}`);
    } else if (b.decision === 'restore') {
      run(`UPDATE games SET status=?, updated_at=? WHERE id=?`, g.current_version_id ? 'published' : 'draft', now, g.id);
    }
  });
  audit(req, `moderation.game_${b.decision}`, 'game', g.id, { notes: b.notes, versionId: b.versionId });
  res.json({ ok: true });
});

r.post('/moderation/versions/:id', (req, res) => {
  const v = one('SELECT v.*, g.title, g.slug, g.creator_id, g.status AS game_status FROM game_versions v JOIN games g ON g.id=v.game_id WHERE v.id=?', parse(id, req.params.id));
  if (!v) throw new HttpError(404, 'Versão não encontrada.');
  const b = parse(z.object({ decision: z.enum(['approve', 'reject']), notes: text(2000).default('') }), req.body);
  tx(() => {
    run('UPDATE game_versions SET review_status=? WHERE id=?', b.decision === 'approve' ? 'approved' : 'rejected', v.id);
    if (b.decision === 'approve' && ['published', 'in_development'].includes(v.game_status)) {
      run('UPDATE games SET current_version_id=?, updated_at=? WHERE id=?', v.id, new Date().toISOString(), v.game_id);
      for (const f of all('SELECT user_id FROM game_follows WHERE game_id=?', v.game_id)) notify(f.user_id, 'game_update', `${v.title} atualizado para ${v.version}`, v.changelog.slice(0, 140), `/jogo/${v.slug}`);
    }
  });
  notify(v.creator_id, 'moderation', `Versão ${v.version} de "${v.title}" ${b.decision === 'approve' ? 'aprovada' : 'recusada'}`, b.notes, `/criador/jogos/${v.game_id}`);
  audit(req, `moderation.version_${b.decision}`, 'game_version', v.id, { notes: b.notes });
  res.json({ ok: true });
});

// ───────── Comentários, avaliações, sugestões ─────────
r.get('/moderation/content', (_req, res) => {
  res.json({
    comments: all('SELECT c.*, u.username FROM comments c JOIN users u ON u.id=c.user_id ORDER BY c.id DESC LIMIT 100'),
    reviews: all('SELECT r.*, u.username, g.title FROM reviews r JOIN users u ON u.id=r.user_id JOIN games g ON g.id=r.game_id ORDER BY r.id DESC LIMIT 100'),
  });
});

r.post('/moderation/:type/:id/hide', (req, res) => {
  const table = { comment: 'comments', review: 'reviews', suggestion: 'suggestions' }[req.params.type];
  if (!table) throw new HttpError(400, 'Tipo inválido.');
  const { hidden } = parse(z.object({ hidden: z.boolean().default(true) }), req.body);
  if (!run(`UPDATE ${table} SET hidden=? WHERE id=?`, hidden ? 1 : 0, parse(id, req.params.id)).changes) throw new HttpError(404, 'Conteúdo não encontrado.');
  audit(req, `moderation.${req.params.type}_${hidden ? 'hide' : 'unhide'}`, req.params.type, req.params.id);
  res.json({ ok: true });
});

// ───────── Denúncias ─────────
r.get('/reports', (req, res) => {
  const status = ['open', 'resolved', 'dismissed'].includes(req.query.status) ? req.query.status : 'open';
  res.json({ reports: all(`SELECT r.*, u.username AS reporter FROM reports r JOIN users u ON u.id=r.reporter_id WHERE r.status=? ORDER BY r.id DESC LIMIT 200`, status).map((rep) => {
    let preview = null;
    if (rep.target_type === 'comment') preview = one('SELECT body FROM comments WHERE id=?', rep.target_id)?.body;
    if (rep.target_type === 'review') preview = one('SELECT body FROM reviews WHERE id=?', rep.target_id)?.body;
    if (rep.target_type === 'message') preview = one('SELECT body FROM messages WHERE id=?', rep.target_id)?.body;
    if (rep.target_type === 'game') preview = one('SELECT title FROM games WHERE id=?', rep.target_id)?.title;
    if (rep.target_type === 'user') preview = one('SELECT username FROM users WHERE id=?', rep.target_id)?.username;
    if (rep.target_type === 'studio') preview = one('SELECT name FROM studios WHERE id=?', rep.target_id)?.name;
    return { ...rep, preview };
  }) });
});

r.post('/reports/:id', (req, res) => {
  const rep = one('SELECT * FROM reports WHERE id=?', parse(id, req.params.id));
  if (!rep) throw new HttpError(404, 'Denúncia não encontrada.');
  const b = parse(z.object({ status: z.enum(['resolved', 'dismissed']), resolution: text(1000).default('') }), req.body);
  run('UPDATE reports SET status=?, resolution=?, resolved_by=? WHERE id=?', b.status, b.resolution, req.user.id, rep.id);
  notify(rep.reporter_id, 'report', 'Sua denúncia foi analisada', b.status === 'resolved' ? 'Medidas foram tomadas. Obrigado!' : 'Não encontramos violação das regras.', null);
  audit(req, `reports.${b.status}`, 'report', rep.id, b);
  res.json({ ok: true });
});

// ───────── CURADORIA (NEXPLAY PICKS) — somente admin ─────────
r.get('/curation', admin, (_req, res) => {
  res.json({
    picks: all('SELECT p.*, g.title, g.slug FROM picks p JOIN games g ON g.id=p.game_id ORDER BY p.active DESC, p.kind, p.position, p.id DESC'),
    collections: all('SELECT * FROM collections ORDER BY id DESC').map((c) => ({ ...c, items: all('SELECT ci.*, g.title, g.slug FROM collection_items ci JOIN games g ON g.id=ci.game_id WHERE ci.collection_id=? ORDER BY ci.position', c.id) })),
    eligible: all(`SELECT id, title, slug, status FROM games WHERE status IN ('published','in_development') ORDER BY title`),
  });
});

const pickSchema = z.object({
  gameId: id, kind: z.enum(['featured', 'nexplay_choice', 'game_of_day', 'weekly']),
  headline: text(120).default(''), recommendation: text(3000).default(''),
  startsOn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable().optional(), endsOn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable().optional(),
  position: z.number().int().min(0).max(1000).default(0),
});

r.post('/curation/picks', admin, (req, res) => {
  const b = parse(pickSchema, req.body);
  const g = one(`SELECT * FROM games WHERE id=? AND status IN ('published','in_development')`, b.gameId);
  if (!g) throw new HttpError(400, 'Escolha um jogo publicado ou em LANÇAMENTOS.');
  let { startsOn, endsOn } = b;
  if (b.kind === 'game_of_day') { startsOn = startsOn || new Date().toISOString().slice(0, 10); endsOn = startsOn; }
  if (b.kind === 'weekly' && !endsOn) {
    startsOn = startsOn || new Date().toISOString().slice(0, 10);
    endsOn = new Date(Date.parse(startsOn) + 6 * 864e5).toISOString().slice(0, 10);
  }
  if (b.kind === 'game_of_day') run(`UPDATE picks SET active=0 WHERE kind='game_of_day' AND starts_on=?`, startsOn);
  const p = run('INSERT INTO picks(game_id, kind, headline, recommendation, starts_on, ends_on, position, created_by) VALUES (?,?,?,?,?,?,?,?)', g.id, b.kind, b.headline, b.recommendation, startsOn ?? null, endsOn ?? null, b.position, req.user.id);
  const label = { featured: 'Destaque', nexplay_choice: 'Escolha da NEXPLAY', game_of_day: 'Jogo do Dia', weekly: 'Destaques da Semana' }[b.kind];
  notify(g.creator_id, 'pick', `"${g.title}" foi selecionado: ${label}!`, 'A curadoria da NEXPLAY escolheu seu jogo. Nenhum pagamento é necessário.', `/jogo/${g.slug}`);
  audit(req, 'curation.pick_add', 'pick', p.lastInsertRowid, b);
  res.status(201).json({ id: p.lastInsertRowid });
});

r.patch('/curation/picks/:id', admin, (req, res) => {
  const b = parse(pickSchema.partial().extend({ active: z.boolean().optional() }), req.body);
  const pid = parse(id, req.params.id);
  run(`UPDATE picks SET headline=COALESCE(?,headline), recommendation=COALESCE(?,recommendation), starts_on=COALESCE(?,starts_on), ends_on=COALESCE(?,ends_on), position=COALESCE(?,position), active=COALESCE(?,active) WHERE id=?`,
    b.headline ?? null, b.recommendation ?? null, b.startsOn ?? null, b.endsOn ?? null, b.position ?? null, b.active === undefined ? null : b.active ? 1 : 0, pid);
  audit(req, 'curation.pick_update', 'pick', pid, b);
  res.json({ ok: true });
});

r.delete('/curation/picks/:id', admin, (req, res) => {
  const pid = parse(id, req.params.id);
  run('DELETE FROM picks WHERE id=?', pid);
  audit(req, 'curation.pick_remove', 'pick', pid);
  res.json({ ok: true });
});

r.post('/curation/collections', admin, (req, res) => {
  const b = parse(z.object({ title: text(100).pipe(z.string().min(2)), description: text(2000).default('') }), req.body);
  let slug = slugify(b.title);
  if (one('SELECT 1 FROM collections WHERE slug=?', slug)) slug = `${slug}-${Date.now().toString(36)}`;
  const c = run('INSERT INTO collections(slug, title, description, created_by) VALUES (?,?,?,?)', slug, b.title, b.description, req.user.id);
  audit(req, 'curation.collection_add', 'collection', c.lastInsertRowid, b);
  res.status(201).json({ id: c.lastInsertRowid });
});

r.patch('/curation/collections/:id', admin, (req, res) => {
  const b = parse(z.object({ title: text(100).optional(), description: text(2000).optional(), active: z.boolean().optional(),
    items: z.array(z.object({ gameId: id, note: text(300).default('') })).max(100).optional() }), req.body);
  const cid = parse(id, req.params.id);
  tx(() => {
    run('UPDATE collections SET title=COALESCE(?,title), description=COALESCE(?,description), active=COALESCE(?,active) WHERE id=?', b.title ?? null, b.description ?? null, b.active === undefined ? null : b.active ? 1 : 0, cid);
    if (b.items) {
      run('DELETE FROM collection_items WHERE collection_id=?', cid);
      b.items.forEach((it, i) => {
        if (!one(`SELECT 1 FROM games WHERE id=? AND status IN ('published','in_development')`, it.gameId)) throw new HttpError(400, `Jogo ${it.gameId} não está publicado.`);
        run('INSERT INTO collection_items(collection_id, game_id, note, position) VALUES (?,?,?,?)', cid, it.gameId, it.note, i);
      });
    }
  });
  audit(req, 'curation.collection_update', 'collection', cid, { ...b, items: b.items?.length });
  res.json({ ok: true });
});

r.delete('/curation/collections/:id', admin, (req, res) => {
  const cid = parse(id, req.params.id);
  run('DELETE FROM collections WHERE id=?', cid);
  audit(req, 'curation.collection_remove', 'collection', cid);
  res.json({ ok: true });
});

// ───────── Eventos, Awards, Festival, Votações ─────────
const eventSchema = z.object({
  kind: z.enum(['event', 'game_jam', 'competition', 'challenge', 'festival', 'awards']), title: text(120).pipe(z.string().min(3)),
  description: text(20000).default(''), theme: text(120).nullable().optional(),
  startsAt: z.string().datetime({ offset: true }), endsAt: z.string().datetime({ offset: true }), votingEndsAt: z.string().datetime({ offset: true }).nullable().optional(),
  ncParticipation: z.number().int().min(0).max(1000).default(0), status: z.enum(['draft', 'scheduled', 'canceled', 'finished']).default('scheduled'),
});

r.get('/events', admin, (_req, res) => res.json({ events: all('SELECT * FROM events ORDER BY id DESC') }));

r.post('/events', admin, (req, res) => {
  const b = parse(eventSchema, req.body);
  if (b.endsAt <= b.startsAt) throw new HttpError(400, 'O fim precisa ser depois do início.');
  let slug = slugify(b.title);
  if (one('SELECT 1 FROM events WHERE slug=?', slug)) slug = `${slug}-${Date.now().toString(36)}`;
  const e = run('INSERT INTO events(slug, kind, title, description, theme, starts_at, ends_at, voting_ends_at, nc_participation, status, created_by) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
    slug, b.kind, b.title, b.description, b.theme ?? null, new Date(b.startsAt).toISOString(), new Date(b.endsAt).toISOString(), b.votingEndsAt ? new Date(b.votingEndsAt).toISOString() : null, b.ncParticipation, b.status, req.user.id);
  if (b.kind === 'awards') {
    for (const [code, name, type] of [['best_game', 'Melhor Jogo', 'game'], ['best_multiplayer', 'Melhor Multiplayer', 'game'], ['best_creator', 'Melhor Criador', 'user'], ['best_indie', 'Melhor Jogo Independente', 'game']]) {
      run('INSERT INTO award_categories(event_id, code, name, nominee_type) VALUES (?,?,?,?)', e.lastInsertRowid, code, name, type);
    }
  }
  audit(req, 'events.create', 'event', e.lastInsertRowid, { kind: b.kind, title: b.title });
  res.status(201).json({ id: e.lastInsertRowid, slug });
});

r.patch('/events/:id', admin, (req, res) => {
  const eid = parse(id, req.params.id);
  const b = parse(eventSchema.partial(), req.body);
  const cols = { title: 'title', description: 'description', theme: 'theme', ncParticipation: 'nc_participation', status: 'status' };
  for (const [k, col] of Object.entries(cols)) if (b[k] !== undefined) run(`UPDATE events SET ${col}=? WHERE id=?`, b[k], eid);
  for (const [k, col] of [['startsAt', 'starts_at'], ['endsAt', 'ends_at'], ['votingEndsAt', 'voting_ends_at']]) if (b[k] !== undefined) run(`UPDATE events SET ${col}=? WHERE id=?`, b[k] ? new Date(b[k]).toISOString() : null, eid);
  audit(req, 'events.update', 'event', eid, b);
  res.json({ ok: true });
});

r.post('/events/:id/categories', admin, (req, res) => {
  const eid = parse(id, req.params.id);
  const b = parse(z.object({ code: z.string().regex(/^[a-z0-9_]{2,40}$/), name: text(80), nomineeType: z.enum(['game', 'user', 'studio']) }), req.body);
  run('INSERT INTO award_categories(event_id, code, name, nominee_type) VALUES (?,?,?,?)', eid, b.code, b.name, b.nomineeType);
  audit(req, 'awards.category_add', 'event', eid, b);
  res.status(201).json({ ok: true });
});

r.post('/awards/categories/:id/nominees', admin, (req, res) => {
  const c = one('SELECT * FROM award_categories WHERE id=?', parse(id, req.params.id));
  if (!c) throw new HttpError(404, 'Categoria não encontrada.');
  const { nomineeId } = parse(z.object({ nomineeId: id }), req.body);
  const table = { game: `games WHERE id=? AND status='published'`, user: `users WHERE id=? AND status='active'`, studio: 'studios WHERE id=?' }[c.nominee_type];
  if (!one(`SELECT 1 FROM ${table}`, nomineeId)) throw new HttpError(400, 'Indicado inválido.');
  run('INSERT OR IGNORE INTO award_nominees(category_id, nominee_id) VALUES (?,?)', c.id, nomineeId);
  audit(req, 'awards.nominee_add', 'award_category', c.id, { nomineeId });
  res.status(201).json({ ok: true });
});

r.delete('/awards/nominees/:id', admin, (req, res) => {
  run('DELETE FROM award_nominees WHERE id=?', parse(id, req.params.id));
  audit(req, 'awards.nominee_remove', 'award_nominee', req.params.id);
  res.json({ ok: true });
});

/** Define vencedor (normalmente o mais votado, mas o júri pode decidir) e concede medalha. */
r.post('/awards/categories/:id/winner', admin, (req, res) => {
  const c = one('SELECT c.*, e.title AS event_title FROM award_categories c JOIN events e ON e.id=c.event_id WHERE c.id=?', parse(id, req.params.id));
  if (!c) throw new HttpError(404, 'Categoria não encontrada.');
  const { nomineeId } = parse(z.object({ nomineeId: id }), req.body);
  const n = one('SELECT * FROM award_nominees WHERE id=? AND category_id=?', nomineeId, c.id);
  if (!n) throw new HttpError(404, 'Indicado não encontrado.');
  run('UPDATE award_categories SET winner_id=? WHERE id=?', n.nominee_id, c.id);
  const winnerUser = c.nominee_type === 'user' ? n.nominee_id : c.nominee_type === 'game' ? one('SELECT creator_id FROM games WHERE id=?', n.nominee_id)?.creator_id : one('SELECT owner_id FROM studios WHERE id=?', n.nominee_id)?.owner_id;
  if (winnerUser) {
    run('INSERT INTO medals(user_id, code, name, reason) VALUES (?,?,?,?)', winnerUser, `award_${c.code}`, `NEXPLAY AWARDS — ${c.name}`, c.event_title);
    notify(winnerUser, 'award', `Você venceu: ${c.name}!`, c.event_title, '/eventos');
  }
  audit(req, 'awards.winner', 'award_category', c.id, { nomineeId });
  res.json({ ok: true });
});

r.post('/events/:id/entries/:entryId/rank', admin, (req, res) => {
  const { rank } = parse(z.object({ rank: z.number().int().min(1).max(1000).nullable() }), req.body);
  run('UPDATE event_entries SET rank=? WHERE id=? AND event_id=?', rank, parse(id, req.params.entryId), parse(id, req.params.id));
  audit(req, 'events.rank', 'event_entry', req.params.entryId, { rank });
  res.json({ ok: true });
});

r.post('/polls', admin, (req, res) => {
  const b = parse(z.object({ question: text(200).pipe(z.string().min(5)), options: z.array(text(100).pipe(z.string().min(1))).min(2).max(8), closesAt: z.string().datetime({ offset: true }).nullable().optional() }), req.body);
  const p = run('INSERT INTO polls(question, options, created_by, closes_at) VALUES (?,?,?,?)', b.question, JSON.stringify(b.options), req.user.id, b.closesAt ? new Date(b.closesAt).toISOString() : null);
  audit(req, 'community.poll_create', 'poll', p.lastInsertRowid, b);
  res.status(201).json({ id: p.lastInsertRowid });
});

r.patch('/suggestions/:id', (req, res) => {
  const { status } = parse(z.object({ status: z.enum(['open', 'planned', 'done', 'declined']) }), req.body);
  run('UPDATE suggestions SET status=? WHERE id=?', status, parse(id, req.params.id));
  audit(req, 'community.suggestion_status', 'suggestion', req.params.id, { status });
  res.json({ ok: true });
});

// ───────── REWARDS — somente admin ─────────
r.post('/rewards/grant', admin, (req, res) => {
  const b = parse(z.object({ userId: id, amount: z.number().int().min(1).max(100000), reason: text(300).pipe(z.string().min(3, 'Informe o motivo.')), kind: z.enum(['admin_grant', 'competition', 'event', 'community_goal']).default('admin_grant') }), req.body);
  const u = one('SELECT * FROM users WHERE id=?', b.userId);
  if (!u) throw new HttpError(404, 'Usuário não encontrado.');
  // Concessões administrativas ignoram o teto semanal, mas ficam auditadas e marcam o resgate para revisão.
  const kind = b.kind === 'admin_grant' ? 'admin_grant' : b.kind;
  const credited = kind === 'admin_grant' ? grantNC(u.id, b.amount, 'admin_grant', { createdBy: req.user.id, refType: 'note', refId: b.reason })
    : run(`INSERT INTO nc_ledger(user_id, amount, reason, ref_type, ref_id, created_by) VALUES (?,?,?,?,?,?)`, u.id, b.amount, kind, 'note', b.reason, req.user.id) && b.amount;
  notify(u.id, 'rewards', `Você recebeu ${credited} NC`, b.reason, '/rewards');
  audit(req, 'rewards.grant', 'user', u.id, b);
  res.json({ credited, balance: ncBalance(u.id) });
});

r.get('/rewards', admin, (_req, res) => {
  res.json({
    items: all('SELECT * FROM store_items ORDER BY kind, price_nc').map((i) => ({ ...i, data: JSON.parse(i.data) })),
    challenges: all('SELECT * FROM challenges ORDER BY id'),
    redemptions: all(`SELECT r.*, u.username, u.signup_ip FROM nc_redemptions r JOIN users u ON u.id=r.user_id ORDER BY (r.status='held') DESC, r.id DESC LIMIT 200`).map((x) => ({ ...x, risk_flags: JSON.parse(x.risk_flags) })),
    rules: getSetting('rewards', {}),
    tiers: getSetting('conversion_tiers', []),
    totals: one(`SELECT COALESCE(SUM(CASE WHEN amount>0 THEN amount END),0) AS issued, COALESCE(-SUM(CASE WHEN amount<0 THEN amount END),0) AS spent FROM nc_ledger`),
  });
});

r.post('/rewards/redemptions/:id', admin, (req, res) => {
  const { approve } = parse(z.object({ approve: z.boolean() }), req.body);
  reviewRedemption(req, parse(id, req.params.id), approve);
  res.json({ ok: true });
});

const itemSchema = z.object({
  code: z.string().regex(/^[a-z0-9_]{2,50}$/), kind: z.enum(['frame', 'avatar', 'theme', 'effect', 'badge', 'exclusive']), name: text(80), description: text(300).default(''),
  priceNc: z.number().int().min(0).max(1000000), data: z.record(z.string(), z.any()).default({}), requiredPlan: z.enum(['pro', 'deluxe']).nullable().default(null),
  stock: z.number().int().min(0).nullable().default(null), active: z.boolean().default(true),
});
r.post('/rewards/items', admin, (req, res) => {
  const b = parse(itemSchema, req.body);
  run('INSERT INTO store_items(code, kind, name, description, price_nc, data, required_plan, stock, active) VALUES (?,?,?,?,?,?,?,?,?)', b.code, b.kind, b.name, b.description, b.priceNc, JSON.stringify(b.data), b.requiredPlan, b.stock, b.active ? 1 : 0);
  audit(req, 'rewards.item_create', 'store_item', b.code, b);
  res.status(201).json({ ok: true });
});
r.patch('/rewards/items/:id', admin, (req, res) => {
  const b = parse(itemSchema.partial(), req.body);
  const iid = parse(id, req.params.id);
  run(`UPDATE store_items SET name=COALESCE(?,name), description=COALESCE(?,description), price_nc=COALESCE(?,price_nc), active=COALESCE(?,active), stock=CASE WHEN ? THEN ? ELSE stock END, required_plan=CASE WHEN ? THEN ? ELSE required_plan END WHERE id=?`,
    b.name ?? null, b.description ?? null, b.priceNc ?? null, b.active === undefined ? null : b.active ? 1 : 0, b.stock !== undefined ? 1 : 0, b.stock ?? null, b.requiredPlan !== undefined ? 1 : 0, b.requiredPlan ?? null, iid);
  audit(req, 'rewards.item_update', 'store_item', iid, b);
  res.json({ ok: true });
});

const challengeSchema = z.object({
  code: z.string().regex(/^[a-z0-9_]{2,50}$/), title: text(100), description: text(500), period: z.enum(['weekly', 'event', 'community', 'once']),
  metric: z.enum(['play_minutes', 'distinct_games', 'reviews_written', 'comments_written', 'event_participation', 'achievements_unlocked']),
  target: z.number().int().min(1).max(100000), ncReward: z.number().int().min(0).max(5000), eventId: id.nullable().optional(),
  startsAt: z.string().datetime({ offset: true }).nullable().optional(), endsAt: z.string().datetime({ offset: true }).nullable().optional(), active: z.boolean().default(true),
});
r.post('/rewards/challenges', admin, (req, res) => {
  const b = parse(challengeSchema, req.body);
  run('INSERT INTO challenges(code, title, description, period, metric, target, nc_reward, event_id, starts_at, ends_at, active) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
    b.code, b.title, b.description, b.period, b.metric, b.target, b.ncReward, b.eventId ?? null, b.startsAt ? new Date(b.startsAt).toISOString() : null, b.endsAt ? new Date(b.endsAt).toISOString() : null, b.active ? 1 : 0);
  audit(req, 'rewards.challenge_create', 'challenge', b.code, b);
  res.status(201).json({ ok: true });
});
r.patch('/rewards/challenges/:id', admin, (req, res) => {
  const b = parse(challengeSchema.partial(), req.body);
  const cid = parse(id, req.params.id);
  run('UPDATE challenges SET title=COALESCE(?,title), description=COALESCE(?,description), target=COALESCE(?,target), nc_reward=COALESCE(?,nc_reward), active=COALESCE(?,active) WHERE id=?',
    b.title ?? null, b.description ?? null, b.target ?? null, b.ncReward ?? null, b.active === undefined ? null : b.active ? 1 : 0, cid);
  audit(req, 'rewards.challenge_update', 'challenge', cid, b);
  res.json({ ok: true });
});

// ───────── PLANOS e concessões de PRO/DELUXE — somente admin ─────────
r.post('/grants', admin, (req, res) => {
  const b = parse(z.object({ userId: id, plan: z.enum(['pro', 'deluxe']), period: z.enum(['7', '30', '90', 'permanent']), note: text(300).default('') }), req.body);
  const u = one('SELECT * FROM users WHERE id=?', b.userId);
  if (!u) throw new HttpError(404, 'Usuário não encontrado.');
  const ends = b.period === 'permanent' ? null : new Date(Date.now() + Number(b.period) * 864e5).toISOString();
  const s = run(`INSERT INTO subscriptions(user_id, plan_code, source, status, ends_at, granted_by, note) VALUES (?,?,?,?,?,?,?)`, u.id, b.plan, 'admin_grant', 'active', ends, req.user.id, b.note);
  notify(u.id, 'plan', `Você recebeu ${b.plan.toUpperCase()} ${b.period === 'permanent' ? 'permanente' : `por ${b.period} dias`}!`, b.note, '/planos');
  audit(req, 'plans.grant', 'subscription', s.lastInsertRowid, b);
  res.status(201).json({ id: s.lastInsertRowid, endsAt: ends });
});

r.post('/grants/:id/renew', admin, (req, res) => {
  const s = one(`SELECT * FROM subscriptions WHERE id=? AND source='admin_grant'`, parse(id, req.params.id));
  if (!s) throw new HttpError(404, 'Concessão não encontrada.');
  const { period } = parse(z.object({ period: z.enum(['7', '30', '90', 'permanent']) }), req.body);
  const base = s.status === 'active' && s.ends_at && s.ends_at > new Date().toISOString() ? Date.parse(s.ends_at) : Date.now();
  const ends = period === 'permanent' ? null : new Date(base + Number(period) * 864e5).toISOString();
  run(`UPDATE subscriptions SET status='active', ends_at=? WHERE id=?`, ends, s.id);
  audit(req, 'plans.renew', 'subscription', s.id, { period, ends });
  res.json({ ok: true, endsAt: ends });
});

r.post('/grants/:id/revoke', admin, (req, res) => {
  const s = one('SELECT * FROM subscriptions WHERE id=?', parse(id, req.params.id));
  if (!s) throw new HttpError(404, 'Assinatura não encontrada.');
  if (s.source !== 'admin_grant') throw new HttpError(400, 'Assinaturas pagas são canceladas no provedor de pagamento.');
  const { note } = parse(z.object({ note: text(300).default('') }), req.body);
  run(`UPDATE subscriptions SET status='revoked', ends_at=?, note=? WHERE id=?`, new Date().toISOString(), note || s.note, s.id);
  notify(s.user_id, 'plan', `Seu benefício ${s.plan_code.toUpperCase()} foi encerrado`, note, '/planos');
  audit(req, 'plans.revoke', 'subscription', s.id, { note });
  res.json({ ok: true });
});

r.get('/grants', admin, (req, res) => {
  res.json({ grants: all(`SELECT s.*, u.username, g.username AS granted_by_username FROM subscriptions s JOIN users u ON u.id=s.user_id LEFT JOIN users g ON g.id=s.granted_by
    ORDER BY s.id DESC LIMIT 300`) });
});

r.get('/plans', admin, (_req, res) => res.json({ plans: all('SELECT * FROM plans ORDER BY price_cents').map((p) => ({ ...p, features: JSON.parse(p.features) })) }));

r.patch('/plans/:code', admin, (req, res) => {
  const code = z.enum(['free', 'pro', 'deluxe']).parse(req.params.code);
  const b = parse(z.object({
    name: text(30).optional(), priceCents: z.number().int().min(0).optional(), aiDailyCommands: z.number().int().min(1).max(100000).optional(),
    aiPerMinute: z.number().int().min(1).max(120).optional(), storageMb: z.number().int().min(50).optional(), versionHistory: z.number().int().min(1).max(5000).optional(),
    maxProjects: z.number().int().min(1).optional(), maxPublishedGames: z.number().int().min(1).optional(), features: z.array(z.string().max(40)).max(60).optional(),
  }), req.body);
  if (code === 'pro' && b.aiDailyCommands !== undefined) throw new HttpError(400, 'O limite de IA do PRO é sempre 4× o do FREE. Altere o FREE.');
  if (code === 'deluxe' && b.aiDailyCommands !== undefined) throw new HttpError(400, 'O DELUXE não tem limite de comandos (apenas proteção por minuto).');
  tx(() => {
    run(`UPDATE plans SET name=COALESCE(?,name), price_cents=COALESCE(?,price_cents), ai_per_minute=COALESCE(?,ai_per_minute), storage_mb=COALESCE(?,storage_mb),
      version_history=COALESCE(?,version_history), max_projects=COALESCE(?,max_projects), max_published_games=COALESCE(?,max_published_games), features=COALESCE(?,features) WHERE code=?`,
    b.name ?? null, b.priceCents ?? null, b.aiPerMinute ?? null, b.storageMb ?? null, b.versionHistory ?? null, b.maxProjects ?? null, b.maxPublishedGames ?? null, b.features ? JSON.stringify(b.features) : null, code);
    if (code === 'free' && b.aiDailyCommands !== undefined) {
      run('UPDATE plans SET ai_daily_commands=? WHERE code=?', b.aiDailyCommands, 'free');
      run('UPDATE plans SET ai_daily_commands=? WHERE code=?', b.aiDailyCommands * 4, 'pro'); // regra: PRO = 4× FREE
    }
  });
  audit(req, 'plans.update', 'plan', code, b);
  res.json({ ok: true });
});

// ───────── Configurações e auditoria ─────────
r.get('/settings', admin, (_req, res) => res.json({ platformFeeBps: getSetting('platform_fee_bps', 0), rewards: getSetting('rewards', {}), tiers: getSetting('conversion_tiers', []), freeAiDefault: FREE_AI_DAILY }));
r.patch('/settings', admin, (req, res) => {
  const b = parse(z.object({
    platformFeeBps: z.number().int().min(0).max(5000).optional(),
    rewards: z.object({ weekly_earn_cap_nc: z.number().int().min(0), redemption_min_account_days: z.number().int().min(0), redemption_cooldown_days: z.number().int().min(0),
      redemption_monthly_cap_cents: z.number().int().min(0), require_verified_email: z.boolean(), min_play_minutes_for_redemption: z.number().int().min(0) }).partial().optional(),
  }), req.body);
  if (b.platformFeeBps !== undefined) setSetting('platform_fee_bps', b.platformFeeBps);
  if (b.rewards) setSetting('rewards', { ...getSetting('rewards', {}), ...b.rewards });
  audit(req, 'settings.update', 'settings', null, b);
  res.json({ ok: true });
});

r.get('/audit', admin, (req, res) => {
  const action = req.query.action ? `${String(req.query.action).slice(0, 40)}%` : '%';
  res.json({ entries: all('SELECT a.*, u.username FROM audit_log a LEFT JOIN users u ON u.id=a.actor_id WHERE a.action LIKE ? ORDER BY a.id DESC LIMIT 300', action) });
});

export default r;
