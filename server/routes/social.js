// Mensagens privadas, notificações e denúncias.
import { Router } from 'express';
import { one, all, run } from '../db/index.js';
import { HttpError, rateLimiter } from '../lib/security.js';
import { requireAuth, publicUser } from '../lib/auth.js';
import { parse, z, text, id } from '../lib/validate.js';
import { areFriends, isBlockedEitherWay, notify } from '../lib/services.js';

const r = Router();
const msgLimiter = rateLimiter({ windowMs: 60_000, max: 30, key: (req) => `msg:${req.user?.id}`, message: 'Você está enviando mensagens rápido demais.' });

// ───────── Mensagens ─────────
r.get('/messages', requireAuth, (req, res) => {
  const me = req.user.id;
  const rows = all(`SELECT m.*, CASE WHEN m.sender_id = ? THEN m.recipient_id ELSE m.sender_id END AS other_id
    FROM messages m WHERE m.id IN (
      SELECT MAX(id) FROM messages WHERE sender_id = ? OR recipient_id = ?
      GROUP BY CASE WHEN sender_id = ? THEN recipient_id ELSE sender_id END
    ) ORDER BY m.id DESC`, me, me, me, me);
  res.json({
    conversations: rows.map((m) => {
      const other = one('SELECT * FROM users WHERE id=?', m.other_id);
      return {
        user: publicUser(other),
        lastMessage: { body: m.body, fromMe: m.sender_id === me, createdAt: m.created_at },
        unread: Number(one('SELECT COUNT(*) AS c FROM messages WHERE sender_id=? AND recipient_id=? AND read_at IS NULL', m.other_id, me).c),
      };
    }),
  });
});

r.get('/messages/:username', requireAuth, (req, res) => {
  const other = one('SELECT * FROM users WHERE username = ?', req.params.username);
  if (!other) throw new HttpError(404, 'Usuário não encontrado.');
  const me = req.user.id;
  const before = req.query.before ? Number(req.query.before) : Number.MAX_SAFE_INTEGER;
  const msgs = all(`SELECT * FROM messages WHERE ((sender_id=? AND recipient_id=?) OR (sender_id=? AND recipient_id=?)) AND id < ?
    ORDER BY id DESC LIMIT 50`, me, other.id, other.id, me, before).reverse();
  run('UPDATE messages SET read_at=? WHERE sender_id=? AND recipient_id=? AND read_at IS NULL', new Date().toISOString(), other.id, me);
  res.json({
    user: publicUser(other),
    canMessage: canMessage(req.user, other).ok,
    messages: msgs.map((m) => ({ id: m.id, body: m.body, fromMe: m.sender_id === me, createdAt: m.created_at, readAt: m.read_at })),
  });
});

function canMessage(sender, recipient) {
  if (sender.id === recipient.id) return { ok: false, reason: 'Operação inválida.' };
  if (isBlockedEitherWay(sender.id, recipient.id)) return { ok: false, reason: 'Não é possível enviar mensagens para este usuário.' };
  if (recipient.privacy_messages === 'nobody') return { ok: false, reason: 'Este usuário não aceita mensagens.' };
  if (!areFriends(sender.id, recipient.id)) return { ok: false, reason: 'Mensagens privadas são permitidas apenas entre amigos.' };
  return { ok: true };
}

r.post('/messages/:username', requireAuth, msgLimiter, (req, res) => {
  const other = one('SELECT * FROM users WHERE username = ?', req.params.username);
  if (!other) throw new HttpError(404, 'Usuário não encontrado.');
  const { body } = parse(z.object({ body: text(2000).pipe(z.string().min(1, 'Mensagem vazia.')) }), req.body);
  const check = canMessage(req.user, other);
  if (!check.ok) throw new HttpError(403, check.reason);
  const m = run('INSERT INTO messages(sender_id, recipient_id, body) VALUES (?,?,?)', req.user.id, other.id, body);
  res.status(201).json({ message: { id: m.lastInsertRowid, body, fromMe: true, createdAt: new Date().toISOString() } });
});

// ───────── Notificações ─────────
r.get('/notifications', requireAuth, (req, res) => {
  res.json({ notifications: all('SELECT * FROM notifications WHERE user_id=? ORDER BY id DESC LIMIT 100', req.user.id) });
});
r.post('/notifications/read', requireAuth, (req, res) => {
  const b = parse(z.object({ ids: z.array(id).max(200).optional() }), req.body);
  const now = new Date().toISOString();
  if (b.ids?.length) {
    for (const nid of b.ids) run('UPDATE notifications SET read_at=? WHERE id=? AND user_id=?', now, nid, req.user.id);
  } else {
    run('UPDATE notifications SET read_at=? WHERE user_id=? AND read_at IS NULL', now, req.user.id);
  }
  res.json({ ok: true });
});

// ───────── Denúncias ─────────
const reportLimiter = rateLimiter({ windowMs: 3600_000, max: 20, key: (req) => `rep:${req.user?.id}` });
r.post('/reports', requireAuth, reportLimiter, (req, res) => {
  const b = parse(z.object({
    targetType: z.enum(['user', 'game', 'comment', 'review', 'message', 'studio']),
    targetId: id,
    reason: z.enum(['spam', 'harassment', 'hate', 'sexual', 'violence', 'malware', 'copyright', 'cheating', 'fraud', 'other']),
    details: text(2000).optional(),
  }), req.body);
  const table = { user: 'users', game: 'games', comment: 'comments', review: 'reviews', message: 'messages', studio: 'studios' }[b.targetType];
  const target = one(`SELECT * FROM ${table} WHERE id = ?`, b.targetId);
  if (!target) throw new HttpError(404, 'Conteúdo não encontrado.');
  if (b.targetType === 'message' && target.recipient_id !== req.user.id && target.sender_id !== req.user.id) throw new HttpError(403, 'Acesso negado.');
  run('INSERT INTO reports(reporter_id, target_type, target_id, reason, details) VALUES (?,?,?,?,?)',
    req.user.id, b.targetType, b.targetId, b.reason, b.details || '');
  for (const mod of all(`SELECT id FROM users WHERE role IN ('admin','moderator')`)) {
    notify(mod.id, 'report', 'Nova denúncia recebida', `${b.targetType} #${b.targetId}: ${b.reason}`, '/admin/denuncias');
  }
  res.status(201).json({ ok: true });
});

export default r;
