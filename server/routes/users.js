// Perfis, amizades, seguidores, bloqueios, listas pessoais, conquistas e estatísticas.
import { Router } from 'express';
import multer from 'multer';
import { one, all, run, tx } from '../db/index.js';
import { HttpError, rateLimiter } from '../lib/security.js';
import { requireAuth, publicUser } from '../lib/auth.js';
import { parse, z, text, id } from '../lib/validate.js';
import { saveImage } from '../lib/uploads.js';
import { notify, logActivity, areFriends, isBlockedEitherWay, friendIds, activePlanCode } from '../lib/services.js';
import { checkPlatformAchievements } from '../lib/rewards.js';
import { gameCard } from './games.js';
import { mePayload } from './auth.js';

const r = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 8 * 1024 * 1024, files: 1 } });
const socialLimiter = rateLimiter({ windowMs: 60_000, max: 60, key: (req) => `soc:${req.user?.id || req.ip}` });

const byUsername = (name) => {
  const u = one('SELECT * FROM users WHERE username = ?', name);
  if (!u || u.status === 'banned') throw new HttpError(404, 'Usuário não encontrado.');
  return u;
};

function canSee(viewer, owner, level) {
  if (viewer && (viewer.id === owner.id || viewer.role === 'admin' || viewer.role === 'moderator')) return true;
  if (level === 'public') return true;
  if (level === 'friends') return !!viewer && areFriends(viewer.id, owner.id);
  return false;
}

function userStats(userId) {
  const play = Number(one('SELECT COALESCE(SUM(active_seconds),0) AS s FROM play_sessions WHERE user_id=?', userId).s);
  return {
    playHours: Math.round((play / 3600) * 10) / 10,
    gamesPlayed: Number(one('SELECT COUNT(DISTINCT game_id) AS c FROM play_sessions WHERE user_id=?', userId).c),
    reviews: Number(one('SELECT COUNT(*) AS c FROM reviews WHERE user_id=? AND hidden=0', userId).c),
    achievements: Number(one('SELECT COUNT(*) AS c FROM user_achievements WHERE user_id=?', userId).c),
    friends: friendIds(userId).length,
    followers: Number(one('SELECT COUNT(*) AS c FROM follows WHERE followed_id=?', userId).c),
    following: Number(one('SELECT COUNT(*) AS c FROM follows WHERE follower_id=?', userId).c),
    gamesPublished: Number(one(`SELECT COUNT(*) AS c FROM games WHERE creator_id=? AND status='published'`, userId).c),
  };
}

r.get('/search', (req, res) => {
  const q = String(req.query.q || '').trim().slice(0, 40);
  if (q.length < 2) return res.json({ users: [] });
  const rows = all(`SELECT * FROM users WHERE status='active' AND (username LIKE ? OR display_name LIKE ?) LIMIT 20`, `%${q}%`, `%${q}%`);
  res.json({ users: rows.map((u) => publicUser(u, { plan: activePlanCode(u.id) })) });
});

r.get('/:username', (req, res) => {
  const u = byUsername(req.params.username);
  const viewer = req.user;
  const visible = canSee(viewer, u, u.privacy_profile);
  const blocked = viewer ? isBlockedEitherWay(viewer.id, u.id) : false;
  let relation = null;
  if (viewer && viewer.id !== u.id) {
    const f = one(`SELECT * FROM friendships WHERE (requester_id=? AND addressee_id=?) OR (requester_id=? AND addressee_id=?)`, viewer.id, u.id, u.id, viewer.id);
    relation = {
      friend: f?.status === 'accepted',
      pendingOutgoing: f?.status === 'pending' && f.requester_id === viewer.id,
      pendingIncoming: f?.status === 'pending' && f.addressee_id === viewer.id,
      following: !!one('SELECT 1 FROM follows WHERE follower_id=? AND followed_id=?', viewer.id, u.id),
      blockedByMe: !!one('SELECT 1 FROM blocks WHERE blocker_id=? AND blocked_id=?', viewer.id, u.id),
    };
  }
  const base = publicUser(u, { plan: activePlanCode(u.id) });
  if (!visible || blocked) return res.json({ user: { ...base, bio: '' }, restricted: true, relation });
  const equippedItems = all(`SELECT code, kind, name, data FROM store_items WHERE code IN (?,?,?,?)`,
    u.equipped_frame || '', u.equipped_theme || '', u.equipped_effect || '', u.equipped_badge || '')
    .map((i) => ({ ...i, data: JSON.parse(i.data) }));
  res.json({
    user: base,
    relation,
    equippedItems,
    stats: userStats(u.id),
    achievements: all(`SELECT a.code, a.name, a.description, a.icon, a.rarity, ua.unlocked_at FROM user_achievements ua
      JOIN achievements a ON a.id = ua.achievement_id WHERE ua.user_id=? ORDER BY ua.unlocked_at DESC`, u.id),
    medals: all('SELECT code, name, reason, awarded_at FROM medals WHERE user_id=? ORDER BY awarded_at DESC', u.id),
    games: all(`SELECT * FROM games WHERE creator_id=? AND status='published' ORDER BY published_at DESC`, u.id).map(gameCard),
    favorites: all(`SELECT g.* FROM favorites f JOIN games g ON g.id=f.game_id WHERE f.user_id=? AND g.status='published' ORDER BY f.created_at DESC LIMIT 12`, u.id).map(gameCard),
    activity: canSee(viewer, u, u.privacy_activity) ? activityFor([u.id], 20) : [],
  });
});

export function activityFor(userIds, limit = 50) {
  if (!userIds.length) return [];
  const ph = userIds.map(() => '?').join(',');
  return all(`SELECT a.*, u.username, u.display_name, u.avatar_url, g.title AS game_title, g.slug AS game_slug
    FROM activities a JOIN users u ON u.id = a.user_id LEFT JOIN games g ON g.id = a.game_id
    WHERE a.user_id IN (${ph}) AND (a.game_id IS NULL OR g.status IN ('published','in_development'))
    ORDER BY a.created_at DESC LIMIT ?`, ...userIds, limit)
    .map((a) => ({ id: a.id, type: a.type, data: JSON.parse(a.data), createdAt: a.created_at,
      user: { username: a.username, displayName: a.display_name, avatarUrl: a.avatar_url },
      game: a.game_slug ? { slug: a.game_slug, title: a.game_title } : null }));
}

// ───────── Conta do próprio usuário ─────────
r.patch('/me/profile', requireAuth, (req, res) => {
  const b = parse(z.object({
    displayName: text(40).pipe(z.string().min(1)).optional(),
    bio: text(500).optional(),
    privacy: z.object({
      profile: z.enum(['public', 'friends', 'private']).optional(),
      messages: z.enum(['friends', 'nobody']).optional(),
      activity: z.enum(['public', 'friends', 'private']).optional(),
    }).optional(),
  }), req.body);
  const u = req.user;
  run(`UPDATE users SET display_name=?, bio=?, privacy_profile=?, privacy_messages=?, privacy_activity=? WHERE id=?`,
    b.displayName ?? u.display_name, b.bio ?? u.bio,
    b.privacy?.profile ?? u.privacy_profile, b.privacy?.messages ?? u.privacy_messages, b.privacy?.activity ?? u.privacy_activity, u.id);
  res.json({ user: mePayload(one('SELECT * FROM users WHERE id=?', u.id)) });
});

r.post('/me/avatar', requireAuth, upload.single('file'), (req, res) => {
  if (!req.file) throw new HttpError(400, 'Envie uma imagem.');
  const url = saveImage(req.file.buffer);
  const field = req.query.kind === 'banner' ? 'banner_url' : 'avatar_url';
  run(`UPDATE users SET ${field} = ? WHERE id = ?`, url, req.user.id);
  res.json({ url });
});

r.post('/me/equip', requireAuth, (req, res) => {
  const b = parse(z.object({ kind: z.enum(['frame', 'theme', 'effect', 'badge', 'avatar', 'exclusive']), code: z.string().max(60).nullable() }), req.body);
  const column = { frame: 'equipped_frame', theme: 'equipped_theme', effect: 'equipped_effect', badge: 'equipped_badge', exclusive: 'equipped_effect' }[b.kind];
  if (b.code) {
    const owned = one(`SELECT i.* FROM user_items ui JOIN store_items i ON i.id = ui.item_id WHERE ui.user_id=? AND i.code=?`, req.user.id, b.code);
    if (!owned || owned.kind !== b.kind) throw new HttpError(403, 'Você não possui este item.');
    if (b.kind === 'avatar') {
      run('UPDATE users SET avatar_url = ? WHERE id = ?', `item:${b.code}`, req.user.id);
      return res.json({ ok: true });
    }
  }
  if (!column) throw new HttpError(400, 'Tipo inválido.');
  run(`UPDATE users SET ${column} = ? WHERE id = ?`, b.code, req.user.id);
  res.json({ ok: true });
});

// ───────── Amizades ─────────
r.get('/me/friends', requireAuth, (req, res) => {
  const ids = friendIds(req.user.id);
  const friends = ids.length ? all(`SELECT * FROM users WHERE id IN (${ids.map(() => '?').join(',')})`, ...ids) : [];
  const incoming = all(`SELECT u.*, f.id AS fid FROM friendships f JOIN users u ON u.id=f.requester_id WHERE f.addressee_id=? AND f.status='pending'`, req.user.id);
  const outgoing = all(`SELECT u.*, f.id AS fid FROM friendships f JOIN users u ON u.id=f.addressee_id WHERE f.requester_id=? AND f.status='pending'`, req.user.id);
  const online = (u) => !!u.last_seen_at && Date.now() - Date.parse(u.last_seen_at) < 10 * 60_000;
  res.json({
    friends: friends.map((u) => publicUser(u, { online: online(u) })),
    incoming: incoming.map((u) => publicUser(u)),
    outgoing: outgoing.map((u) => publicUser(u)),
  });
});

r.post('/:username/friend', requireAuth, socialLimiter, (req, res) => {
  const target = byUsername(req.params.username);
  const me = req.user;
  if (target.id === me.id) throw new HttpError(400, 'Você não pode adicionar a si mesmo.');
  if (isBlockedEitherWay(me.id, target.id)) throw new HttpError(403, 'Não é possível interagir com este usuário.');
  const result = tx(() => {
    const reverse = one(`SELECT * FROM friendships WHERE requester_id=? AND addressee_id=?`, target.id, me.id);
    if (reverse) {
      if (reverse.status === 'pending') {
        run(`UPDATE friendships SET status='accepted' WHERE id=?`, reverse.id);
        notify(target.id, 'friend', `${me.display_name} aceitou seu pedido de amizade`, '', `/u/${me.username}`);
        logActivity(me.id, 'friend', null, { with: target.username });
        return 'accepted';
      }
      return 'already';
    }
    const existing = one(`SELECT * FROM friendships WHERE requester_id=? AND addressee_id=?`, me.id, target.id);
    if (existing) return existing.status === 'accepted' ? 'already' : 'pending';
    run(`INSERT INTO friendships(requester_id, addressee_id) VALUES (?,?)`, me.id, target.id);
    notify(target.id, 'friend_request', `${me.display_name} quer ser seu amigo`, '', '/amigos');
    return 'pending';
  });
  checkPlatformAchievements(me.id);
  checkPlatformAchievements(target.id);
  res.json({ status: result });
});

r.delete('/:username/friend', requireAuth, (req, res) => {
  const target = byUsername(req.params.username);
  run(`DELETE FROM friendships WHERE (requester_id=? AND addressee_id=?) OR (requester_id=? AND addressee_id=?)`, req.user.id, target.id, target.id, req.user.id);
  res.json({ ok: true });
});

r.post('/:username/follow', requireAuth, socialLimiter, (req, res) => {
  const target = byUsername(req.params.username);
  if (target.id === req.user.id) throw new HttpError(400, 'Você não pode seguir a si mesmo.');
  if (isBlockedEitherWay(req.user.id, target.id)) throw new HttpError(403, 'Não é possível interagir com este usuário.');
  if (run('INSERT OR IGNORE INTO follows(follower_id, followed_id) VALUES (?,?)', req.user.id, target.id).changes) {
    notify(target.id, 'follow', `${req.user.display_name} começou a seguir você`, '', `/u/${req.user.username}`);
  }
  res.json({ following: true });
});

r.delete('/:username/follow', requireAuth, (req, res) => {
  const target = byUsername(req.params.username);
  run('DELETE FROM follows WHERE follower_id=? AND followed_id=?', req.user.id, target.id);
  res.json({ following: false });
});

r.post('/:username/block', requireAuth, (req, res) => {
  const target = byUsername(req.params.username);
  if (target.id === req.user.id) throw new HttpError(400, 'Operação inválida.');
  tx(() => {
    run('INSERT OR IGNORE INTO blocks(blocker_id, blocked_id) VALUES (?,?)', req.user.id, target.id);
    run(`DELETE FROM friendships WHERE (requester_id=? AND addressee_id=?) OR (requester_id=? AND addressee_id=?)`, req.user.id, target.id, target.id, req.user.id);
    run('DELETE FROM follows WHERE (follower_id=? AND followed_id=?) OR (follower_id=? AND followed_id=?)', req.user.id, target.id, target.id, req.user.id);
  });
  res.json({ blocked: true });
});

r.delete('/:username/block', requireAuth, (req, res) => {
  const target = byUsername(req.params.username);
  run('DELETE FROM blocks WHERE blocker_id=? AND blocked_id=?', req.user.id, target.id);
  res.json({ blocked: false });
});

r.get('/me/blocks', requireAuth, (req, res) => {
  res.json({ users: all('SELECT u.* FROM blocks b JOIN users u ON u.id=b.blocked_id WHERE b.blocker_id=?', req.user.id).map((u) => publicUser(u)) });
});

// ───────── Listas pessoais ─────────
for (const [path, table] of [['wishlist', 'wishlist'], ['favorites', 'favorites']]) {
  r.get(`/me/${path}`, requireAuth, (req, res) => {
    res.json({ games: all(`SELECT g.* FROM ${table} t JOIN games g ON g.id=t.game_id WHERE t.user_id=? AND g.status IN ('published','in_development') ORDER BY t.created_at DESC`, req.user.id).map(gameCard) });
  });
  r.post(`/me/${path}/:gameId`, requireAuth, (req, res) => {
    const gid = parse(id, req.params.gameId);
    if (!one(`SELECT 1 FROM games WHERE id=? AND status IN ('published','in_development')`, gid)) throw new HttpError(404, 'Jogo não encontrado.');
    run(`INSERT OR IGNORE INTO ${table}(user_id, game_id) VALUES (?,?)`, req.user.id, gid);
    res.json({ ok: true });
  });
  r.delete(`/me/${path}/:gameId`, requireAuth, (req, res) => {
    run(`DELETE FROM ${table} WHERE user_id=? AND game_id=?`, req.user.id, parse(id, req.params.gameId));
    res.json({ ok: true });
  });
}

r.get('/me/history', requireAuth, (req, res) => {
  res.json({ history: all(`SELECT g.*, SUM(ps.active_seconds) AS secs, MAX(ps.last_heartbeat_at) AS last_played
    FROM play_sessions ps JOIN games g ON g.id = ps.game_id WHERE ps.user_id=? GROUP BY g.id ORDER BY last_played DESC LIMIT 100`, req.user.id)
    .map((g) => ({ ...gameCard(g), playMinutes: Math.round(Number(g.secs) / 60), lastPlayed: g.last_played })) });
});

r.get('/me/library', requireAuth, (req, res) => {
  res.json({ games: all(`SELECT g.*, l.source, l.acquired_at FROM library l JOIN games g ON g.id=l.game_id WHERE l.user_id=? ORDER BY l.acquired_at DESC`, req.user.id)
    .map((g) => ({ ...gameCard(g), source: g.source, acquiredAt: g.acquired_at })) });
});

r.get('/me/stats', requireAuth, (req, res) => {
  const days = all(`SELECT substr(started_at,1,10) AS day, SUM(active_seconds) AS secs FROM play_sessions
    WHERE user_id=? AND started_at >= ? GROUP BY day ORDER BY day`, req.user.id, new Date(Date.now() - 30 * 864e5).toISOString());
  res.json({ stats: userStats(req.user.id), last30Days: days.map((d) => ({ day: d.day, minutes: Math.round(Number(d.secs) / 60) })) });
});

r.get('/me/feed', requireAuth, (req, res) => {
  const ids = friendIds(req.user.id);
  const followed = all('SELECT followed_id AS id FROM follows WHERE follower_id=?', req.user.id).map((x) => x.id);
  const visible = [...new Set([...ids, ...followed])].filter((uid) => {
    const u = one('SELECT privacy_activity FROM users WHERE id=?', uid);
    return u && (u.privacy_activity === 'public' || (u.privacy_activity === 'friends' && ids.includes(uid)));
  });
  res.json({ activity: activityFor(visible, 60) });
});

export default r;
