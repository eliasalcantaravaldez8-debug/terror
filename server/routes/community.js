// Comunidade: feed público, rankings, votações, sugestões, eventos, Game Jams, competições,
// NEXPLAY AWARDS e NEXPLAY FESTIVAL. Também NEXPLAY PICKS (leitura pública).
import { Router } from 'express';
import { one, all, run, tx } from '../db/index.js';
import { HttpError, rateLimiter } from '../lib/security.js';
import { requireAuth, publicUser } from '../lib/auth.js';
import { parse, z, text, id } from '../lib/validate.js';
import { logActivity, notify } from '../lib/services.js';
import { grantNC, unlockAchievement } from '../lib/rewards.js';
import { gameCard, commentsFor, addComment } from './games.js';
import { activityFor } from './users.js';

const r = Router();
const writeLimiter = rateLimiter({ windowMs: 60_000, max: 20, key: (req) => `cm:${req.user?.id}` });

// ───────── Feed e rankings ─────────
r.get('/feed', (_req, res) => {
  const ids = all(`SELECT id FROM users WHERE privacy_activity='public' AND status='active' ORDER BY last_seen_at DESC LIMIT 500`).map((x) => x.id);
  res.json({ activity: activityFor(ids, 60) });
});

r.get('/rankings', (_req, res) => {
  const since = new Date(Date.now() - 30 * 864e5).toISOString();
  res.json({
    topRated: all(`SELECT g.*, AVG(r.rating) AS avg, COUNT(r.id) AS n FROM games g JOIN reviews r ON r.game_id=g.id AND r.hidden=0
      WHERE g.status='published' GROUP BY g.id HAVING n >= 3 ORDER BY avg DESC, n DESC LIMIT 20`).map(gameCard),
    mostPlayed: all(`SELECT g.*, COUNT(DISTINCT ps.user_id) AS players FROM games g JOIN play_sessions ps ON ps.game_id=g.id
      WHERE g.status='published' AND ps.started_at >= ? GROUP BY g.id ORDER BY players DESC LIMIT 20`, since).map((g) => ({ ...gameCard(g), players: g.players })),
    topPlayers: all(`SELECT u.*, SUM(ps.active_seconds) AS secs FROM users u JOIN play_sessions ps ON ps.user_id=u.id
      WHERE ps.started_at >= ? AND u.privacy_profile='public' GROUP BY u.id ORDER BY secs DESC LIMIT 20`, since).map((u) => ({ ...publicUser(u), hours: Math.round(Number(u.secs) / 360) / 10 })),
    topCreators: all(`SELECT u.*, COUNT(DISTINCT ps.user_id) AS players FROM users u JOIN games g ON g.creator_id=u.id AND g.status='published'
      JOIN play_sessions ps ON ps.game_id=g.id WHERE ps.started_at >= ? GROUP BY u.id ORDER BY players DESC LIMIT 20`, since).map((u) => ({ ...publicUser(u), players: u.players })),
    achievementHunters: all(`SELECT u.*, COUNT(*) AS n FROM users u JOIN user_achievements ua ON ua.user_id=u.id WHERE u.privacy_profile='public'
      GROUP BY u.id ORDER BY n DESC LIMIT 20`).map((u) => ({ ...publicUser(u), achievements: u.n })),
  });
});

// ───────── Votações ─────────
function pollView(p, userId) {
  const options = JSON.parse(p.options);
  const counts = options.map((_, i) => Number(one('SELECT COUNT(*) AS c FROM poll_votes WHERE poll_id=? AND option_index=?', p.id, i).c));
  const mine = userId ? one('SELECT option_index FROM poll_votes WHERE poll_id=? AND user_id=?', p.id, userId) : null;
  return { id: p.id, question: p.question, options, counts, total: counts.reduce((a, b) => a + b, 0), myVote: mine?.option_index ?? null, closesAt: p.closes_at, open: !p.closes_at || p.closes_at > new Date().toISOString() };
}
r.get('/polls', (req, res) => res.json({ polls: all('SELECT * FROM polls ORDER BY id DESC LIMIT 20').map((p) => pollView(p, req.user?.id)) }));
r.post('/polls/:id/vote', requireAuth, writeLimiter, (req, res) => {
  const p = one('SELECT * FROM polls WHERE id=?', parse(id, req.params.id));
  if (!p) throw new HttpError(404, 'Votação não encontrada.');
  if (p.closes_at && p.closes_at <= new Date().toISOString()) throw new HttpError(400, 'Votação encerrada.');
  const { option } = parse(z.object({ option: z.number().int().min(0) }), req.body);
  if (option >= JSON.parse(p.options).length) throw new HttpError(400, 'Opção inválida.');
  run('INSERT INTO poll_votes(poll_id, user_id, option_index) VALUES (?,?,?) ON CONFLICT(poll_id, user_id) DO UPDATE SET option_index=excluded.option_index', p.id, req.user.id, option);
  res.json({ poll: pollView(p, req.user.id) });
});

// ───────── Sugestões de jogos / da comunidade ─────────
r.get('/suggestions', (req, res) => {
  res.json({ suggestions: all(`SELECT s.*, u.username, u.display_name, (SELECT COUNT(*) FROM suggestion_votes v WHERE v.suggestion_id=s.id) AS votes
    FROM suggestions s JOIN users u ON u.id=s.user_id WHERE s.hidden=0 ORDER BY votes DESC, s.id DESC LIMIT 100`).map((s) => ({
    id: s.id, title: s.title, body: s.body, status: s.status, votes: Number(s.votes), createdAt: s.created_at,
    user: { username: s.username, displayName: s.display_name },
    voted: req.user ? !!one('SELECT 1 FROM suggestion_votes WHERE suggestion_id=? AND user_id=?', s.id, req.user.id) : false,
  })) });
});
r.post('/suggestions', requireAuth, writeLimiter, (req, res) => {
  const b = parse(z.object({ title: text(120).pipe(z.string().min(5)), body: text(3000).pipe(z.string().min(20, 'Descreva melhor a sugestão (mín. 20 caracteres).')) }), req.body);
  const s = run('INSERT INTO suggestions(user_id, title, body) VALUES (?,?,?)', req.user.id, b.title, b.body);
  res.status(201).json({ id: s.lastInsertRowid });
});
r.post('/suggestions/:id/vote', requireAuth, (req, res) => {
  const sid = parse(id, req.params.id);
  if (!one('SELECT 1 FROM suggestions WHERE id=? AND hidden=0', sid)) throw new HttpError(404, 'Sugestão não encontrada.');
  if (!run('INSERT OR IGNORE INTO suggestion_votes(suggestion_id, user_id) VALUES (?,?)', sid, req.user.id).changes) run('DELETE FROM suggestion_votes WHERE suggestion_id=? AND user_id=?', sid, req.user.id);
  res.json({ ok: true });
});
r.get('/suggestions/:id/comments', (req, res) => res.json({ comments: commentsFor('suggestion', parse(id, req.params.id)) }));
r.post('/suggestions/:id/comments', requireAuth, writeLimiter, (req, res) => {
  const s = one('SELECT * FROM suggestions WHERE id=? AND hidden=0', parse(id, req.params.id));
  if (!s) throw new HttpError(404, 'Sugestão não encontrada.');
  res.status(201).json({ id: addComment(req, 'suggestion', s.id, s.user_id, '/comunidade') });
});

// ───────── Eventos, Game Jams, competições, festival, awards ─────────
function eventStatus(e) {
  if (['draft', 'canceled', 'finished'].includes(e.status)) return e.status;
  const now = new Date().toISOString();
  if (now < e.starts_at) return 'scheduled';
  if (now < e.ends_at) return 'active';
  if (e.voting_ends_at && now < e.voting_ends_at) return 'voting';
  return 'finished';
}

function eventView(e, userId) {
  return {
    id: e.id, slug: e.slug, kind: e.kind, title: e.title, description: e.description, theme: e.theme, bannerUrl: e.banner_url,
    startsAt: e.starts_at, endsAt: e.ends_at, votingEndsAt: e.voting_ends_at, ncParticipation: e.nc_participation, status: eventStatus(e),
    participants: Number(one('SELECT COUNT(*) AS c FROM event_participants WHERE event_id=?', e.id).c),
    entries: Number(one('SELECT COUNT(*) AS c FROM event_entries WHERE event_id=?', e.id).c),
    joined: userId ? !!one('SELECT 1 FROM event_participants WHERE event_id=? AND user_id=?', e.id, userId) : false,
  };
}

r.get('/events', (req, res) => {
  const kind = req.query.kind ? String(req.query.kind) : null;
  const rows = kind ? all(`SELECT * FROM events WHERE status <> 'draft' AND kind=? ORDER BY starts_at DESC LIMIT 50`, kind)
    : all(`SELECT * FROM events WHERE status <> 'draft' ORDER BY starts_at DESC LIMIT 50`);
  res.json({ events: rows.map((e) => eventView(e, req.user?.id)) });
});

r.get('/events/:slug', (req, res) => {
  const e = one(`SELECT * FROM events WHERE slug=? AND status <> 'draft'`, req.params.slug);
  if (!e) throw new HttpError(404, 'Evento não encontrado.');
  const entries = all(`SELECT ee.*, g.* , ee.id AS entry_id, (SELECT COUNT(*) FROM event_votes v WHERE v.entry_id=ee.id) AS votes
    FROM event_entries ee JOIN games g ON g.id=ee.game_id WHERE ee.event_id=? ORDER BY ee.rank IS NULL, ee.rank, votes DESC`, e.id);
  const status = eventStatus(e);
  const showVotes = status === 'finished' || status === 'voting';
  const myVote = req.user ? one('SELECT entry_id FROM event_votes WHERE event_id=? AND user_id=?', e.id, req.user.id) : null;
  const categories = all('SELECT * FROM award_categories WHERE event_id=? ORDER BY id', e.id).map((c) => {
    const nominees = all('SELECT * FROM award_nominees WHERE category_id=?', c.id).map((n) => {
      const subject = c.nominee_type === 'game' ? gameCard(one('SELECT * FROM games WHERE id=?', n.nominee_id))
        : c.nominee_type === 'user' ? publicUser(one('SELECT * FROM users WHERE id=?', n.nominee_id))
          : one('SELECT id, slug, name, logo_url FROM studios WHERE id=?', n.nominee_id);
      return { id: n.id, subject, votes: status === 'finished' ? Number(one('SELECT COUNT(*) AS c FROM award_votes WHERE nominee_id=?', n.id).c) : undefined };
    });
    const mine = req.user ? one('SELECT nominee_id FROM award_votes WHERE category_id=? AND user_id=?', c.id, req.user.id) : null;
    return { id: c.id, code: c.code, name: c.name, nomineeType: c.nominee_type, winnerId: c.winner_id, nominees, myVote: mine?.nominee_id ?? null };
  });
  res.json({
    event: eventView(e, req.user?.id),
    entries: entries.map((x) => ({ entryId: x.entry_id, rank: x.rank, votes: showVotes ? Number(x.votes) : undefined, game: gameCard(x) })),
    myVote: myVote?.entry_id ?? null,
    categories,
    comments: commentsFor('event', e.id),
  });
});

r.post('/events/:slug/join', requireAuth, (req, res) => {
  const e = one(`SELECT * FROM events WHERE slug=? AND status <> 'draft'`, req.params.slug);
  if (!e) throw new HttpError(404, 'Evento não encontrado.');
  if (!['scheduled', 'active'].includes(eventStatus(e))) throw new HttpError(400, 'Inscrições encerradas.');
  if (run('INSERT OR IGNORE INTO event_participants(event_id, user_id) VALUES (?,?)', e.id, req.user.id).changes) {
    logActivity(req.user.id, 'joined_event', null, { event: e.title, slug: e.slug });
  }
  res.json({ joined: true });
});

r.post('/events/:slug/entries', requireAuth, writeLimiter, (req, res) => {
  const e = one(`SELECT * FROM events WHERE slug=?`, req.params.slug);
  if (!e || !['game_jam', 'competition', 'festival'].includes(e.kind)) throw new HttpError(404, 'Evento não aceita inscrições de jogos.');
  if (eventStatus(e) !== 'active') throw new HttpError(400, 'O período de envio não está aberto.');
  const { gameId } = parse(z.object({ gameId: id }), req.body);
  const g = one(`SELECT * FROM games WHERE id=? AND status IN ('published','in_development')`, gameId);
  if (!g) throw new HttpError(400, 'Envie um jogo já aprovado pela moderação.');
  const member = g.studio_id && one(`SELECT 1 FROM studio_members WHERE studio_id=? AND user_id=? AND role IN ('owner','admin','developer')`, g.studio_id, req.user.id);
  if (g.creator_id !== req.user.id && !member) throw new HttpError(403, 'Você só pode inscrever jogos seus ou do seu estúdio.');
  tx(() => {
    run('INSERT INTO event_entries(event_id, game_id, submitted_by) VALUES (?,?,?)', e.id, g.id, req.user.id);
    run('INSERT OR IGNORE INTO event_participants(event_id, user_id) VALUES (?,?)', e.id, req.user.id);
  });
  if (e.kind === 'game_jam') unlockAchievement(req.user.id, 'jam_finisher');
  logActivity(req.user.id, 'event_entry', g.id, { event: e.title, slug: e.slug });
  res.status(201).json({ ok: true });
});

/** Votação popular (competições, jams, festival). Um voto por pessoa; sem votar no próprio jogo. */
r.post('/events/:slug/vote', requireAuth, writeLimiter, (req, res) => {
  const e = one('SELECT * FROM events WHERE slug=?', req.params.slug);
  if (!e) throw new HttpError(404, 'Evento não encontrado.');
  const st = eventStatus(e);
  if (!(st === 'voting' || (st === 'active' && e.kind === 'festival'))) throw new HttpError(400, 'A votação não está aberta.');
  const ageDays = (Date.now() - Date.parse(req.user.created_at)) / 864e5;
  if (ageDays < 3 || !req.user.email_verified) throw new HttpError(403, 'Para votar, sua conta precisa ter e-mail confirmado e pelo menos 3 dias.');
  const { entryId } = parse(z.object({ entryId: id }), req.body);
  const entry = one('SELECT ee.*, g.creator_id FROM event_entries ee JOIN games g ON g.id=ee.game_id WHERE ee.id=? AND ee.event_id=?', entryId, e.id);
  if (!entry) throw new HttpError(404, 'Inscrição não encontrada.');
  if (entry.creator_id === req.user.id) throw new HttpError(400, 'Você não pode votar no seu próprio jogo.');
  run('INSERT INTO event_votes(event_id, entry_id, user_id) VALUES (?,?,?) ON CONFLICT(event_id, user_id) DO UPDATE SET entry_id=excluded.entry_id', e.id, entry.id, req.user.id);
  res.json({ ok: true });
});

r.post('/awards/:categoryId/vote', requireAuth, writeLimiter, (req, res) => {
  const c = one('SELECT c.*, e.* , c.id AS cid FROM award_categories c JOIN events e ON e.id=c.event_id WHERE c.id=?', parse(id, req.params.categoryId));
  if (!c) throw new HttpError(404, 'Categoria não encontrada.');
  if (!['active', 'voting'].includes(eventStatus(c))) throw new HttpError(400, 'A votação do NEXPLAY AWARDS não está aberta.');
  if (!req.user.email_verified) throw new HttpError(403, 'Confirme seu e-mail para votar.');
  const { nomineeId } = parse(z.object({ nomineeId: id }), req.body);
  const n = one('SELECT * FROM award_nominees WHERE id=? AND category_id=?', nomineeId, c.cid);
  if (!n) throw new HttpError(404, 'Indicado não encontrado.');
  run('INSERT INTO award_votes(category_id, nominee_id, user_id) VALUES (?,?,?) ON CONFLICT(category_id, user_id) DO UPDATE SET nominee_id=excluded.nominee_id', c.cid, n.id, req.user.id);
  res.json({ ok: true });
});

r.post('/events/:slug/comments', requireAuth, writeLimiter, (req, res) => {
  const e = one(`SELECT * FROM events WHERE slug=? AND status <> 'draft'`, req.params.slug);
  if (!e) throw new HttpError(404, 'Evento não encontrado.');
  res.status(201).json({ id: addComment(req, 'event', e.id, null, `/eventos/${e.slug}`) });
});

/** Recompensa de participação: paga 1x por evento finalizado, a quem enviou jogo ou votou (participação real). */
r.post('/events/:slug/claim', requireAuth, (req, res) => {
  const e = one('SELECT * FROM events WHERE slug=?', req.params.slug);
  if (!e || eventStatus(e) !== 'finished' || !e.nc_participation) throw new HttpError(400, 'Nenhuma recompensa disponível.');
  const participated = one('SELECT 1 FROM event_entries WHERE event_id=? AND submitted_by=?', e.id, req.user.id)
    || one('SELECT 1 FROM event_votes WHERE event_id=? AND user_id=?', e.id, req.user.id)
    || one('SELECT 1 FROM award_votes v JOIN award_categories c ON c.id=v.category_id WHERE c.event_id=? AND v.user_id=?', e.id, req.user.id);
  if (!participated) throw new HttpError(403, 'A recompensa exige participação: enviar um jogo ou votar.');
  const credited = grantNC(req.user.id, e.nc_participation, 'event', { refType: 'event', refId: e.id, idempotencyKey: `event:${e.id}:${req.user.id}` });
  if (!credited) throw new HttpError(409, 'Recompensa já resgatada ou teto semanal atingido.');
  notify(req.user.id, 'rewards', `+${credited} NC`, `Participação em ${e.title}`, '/rewards');
  res.json({ credited });
});

// ───────── NEXPLAY PICKS (público) ─────────
r.get('/picks', (_req, res) => {
  const today = new Date().toISOString().slice(0, 10);
  const picks = all(`SELECT p.id AS pick_id, p.kind, p.headline, p.recommendation, p.starts_on, p.ends_on, g.* FROM picks p JOIN games g ON g.id=p.game_id
    WHERE p.active=1 AND g.status IN ('published','in_development') AND (p.starts_on IS NULL OR p.starts_on <= ?) AND (p.ends_on IS NULL OR p.ends_on >= ?)
    ORDER BY p.position, p.id DESC`, today, today);
  const collections = all('SELECT * FROM collections WHERE active=1 ORDER BY id DESC').map((c) => ({
    id: c.id, slug: c.slug, title: c.title, description: c.description,
    games: all(`SELECT g.*, ci.note FROM collection_items ci JOIN games g ON g.id=ci.game_id WHERE ci.collection_id=? AND g.status IN ('published','in_development') ORDER BY ci.position`, c.id)
      .map((g) => ({ ...gameCard(g), note: g.note })),
  })).filter((c) => c.games.length);
  const by = (k) => picks.filter((p) => p.kind === k).map((p) => ({ ...gameCard(p), pickId: p.pick_id, headline: p.headline, recommendation: p.recommendation }));
  res.json({ gameOfDay: by('game_of_day')[0] || null, weekly: by('weekly'), nexplayChoice: by('nexplay_choice'), featured: by('featured'), collections });
});

export default r;
