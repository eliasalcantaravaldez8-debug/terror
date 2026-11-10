import { Router } from 'express';
import { one, run, tx } from '../db/index.js';
import { config } from '../config.js';
import { hashPassword, verifyPassword, randomToken, sha256, HttpError, rateLimiter } from '../lib/security.js';
import { createSession, destroySession, requireAuth, publicUser } from '../lib/auth.js';
import { parse, z, username, password, email, text } from '../lib/validate.js';
import { sendMail, mailConfigured } from '../lib/mailer.js';
import { entitlements } from '../lib/services.js';
import { ncBalance, creditBalance } from '../lib/rewards.js';

const r = Router();
const authLimiter = rateLimiter({ windowMs: 15 * 60_000, max: config.isTest ? 1000 : 20 });
const RESERVED = new Set(['admin', 'nexplay', 'suporte', 'support', 'moderador', 'root', 'system', 'curadoria', 'me', 'search']);

function issueToken(userId, kind, hours) {
  const token = randomToken(32);
  run('INSERT INTO auth_tokens(id, user_id, kind, expires_at) VALUES (?,?,?,?)',
    sha256(token), userId, kind, new Date(Date.now() + hours * 3600_000).toISOString());
  return token;
}

function consumeToken(token, kind) {
  return tx(() => {
    const row = one('SELECT * FROM auth_tokens WHERE id = ? AND kind = ?', sha256(String(token)), kind);
    if (!row || row.used_at || row.expires_at < new Date().toISOString()) {
      throw new HttpError(400, 'Link inválido ou expirado.', 'bad_token');
    }
    run('UPDATE auth_tokens SET used_at = ? WHERE id = ?', new Date().toISOString(), row.id);
    return row;
  });
}

function sendVerification(user) {
  const token = issueToken(user.id, 'verify_email', 48);
  return sendMail(user.email, 'Confirme seu e-mail na NEXPLAY',
    `Olá, ${user.display_name}!\n\nConfirme seu e-mail: ${config.appOrigin}/verificar-email?token=${token}\n\nO link expira em 48 horas.`);
}

/** Dados da conta do próprio usuário (inclui e-mail e saldos — nunca exposto a terceiros). */
export function mePayload(user) {
  const plan = entitlements(user.id);
  return {
    ...publicUser(user),
    role: user.role,
    email: user.email,
    emailVerified: !!user.email_verified,
    privacy: { profile: user.privacy_profile, messages: user.privacy_messages, activity: user.privacy_activity },
    plan: { code: plan.code, name: plan.name, features: plan.features },
    nc: ncBalance(user.id),
    creditCents: creditBalance(user.id),
    unreadNotifications: Number(one('SELECT COUNT(*) AS c FROM notifications WHERE user_id=? AND read_at IS NULL', user.id).c),
    unreadMessages: Number(one('SELECT COUNT(*) AS c FROM messages WHERE recipient_id=? AND read_at IS NULL', user.id).c),
  };
}

r.post('/register', authLimiter, async (req, res) => {
  const body = parse(z.object({
    username, email, password,
    displayName: text(40).optional(),
    acceptTerms: z.literal(true, { message: 'Você precisa aceitar os termos de uso.' }),
    website: z.string().max(0).optional(), // honeypot anti-bot: deve ficar vazio
  }), req.body);
  if (RESERVED.has(body.username.toLowerCase())) throw new HttpError(400, 'Este nome de usuário é reservado.');
  const dayAgo = new Date(Date.now() - 864e5).toISOString();
  const fromIp = Number(one('SELECT COUNT(*) AS c FROM users WHERE signup_ip = ? AND created_at >= ?', req.ip, dayAgo).c);
  if (!config.isTest && fromIp >= config.limits.maxSignupsPerIpPerDay) {
    throw new HttpError(429, 'Muitas contas criadas a partir desta rede hoje. Tente novamente amanhã.', 'signup_limit');
  }
  if (one('SELECT 1 FROM users WHERE username = ?', body.username)) throw new HttpError(409, 'Nome de usuário já está em uso.');
  if (one('SELECT 1 FROM users WHERE email = ?', body.email)) throw new HttpError(409, 'Já existe uma conta com este e-mail.');
  const hash = await hashPassword(body.password);
  const id = run(`INSERT INTO users(username, display_name, email, password_hash, signup_ip) VALUES (?,?,?,?,?)`,
    body.username, body.displayName || body.username, body.email, hash, req.ip).lastInsertRowid;
  const user = one('SELECT * FROM users WHERE id = ?', id);
  const mail = await sendVerification(user);
  createSession(res, id, req);
  res.status(201).json({ user: mePayload(user), emailSent: mail.delivered });
});

r.post('/login', authLimiter, async (req, res) => {
  const body = parse(z.object({ login: z.string().trim().min(1).max(200), password: z.string().min(1).max(200) }), req.body);
  const user = one('SELECT * FROM users WHERE username = ? OR email = ?', body.login, body.login);
  const generic = new HttpError(401, 'Usuário ou senha incorretos.', 'bad_credentials');
  if (!user) {
    await hashPassword(body.password); // tempo constante aproximado (evita enumeração de contas)
    throw generic;
  }
  if (user.locked_until && user.locked_until > new Date().toISOString()) {
    throw new HttpError(429, 'Conta temporariamente bloqueada por várias tentativas. Tente em 15 minutos ou recupere a senha.', 'locked');
  }
  if (!(await verifyPassword(body.password, user.password_hash))) {
    const fails = user.failed_logins + 1;
    run('UPDATE users SET failed_logins = ?, locked_until = ? WHERE id = ?', fails >= 8 ? 0 : fails,
      fails >= 8 ? new Date(Date.now() + 15 * 60_000).toISOString() : null, user.id);
    throw generic;
  }
  if (user.status !== 'active') throw new HttpError(403, user.status === 'banned' ? 'Esta conta foi banida.' : 'Esta conta está suspensa.', 'account_disabled');
  run('UPDATE users SET failed_logins = 0, locked_until = NULL WHERE id = ?', user.id);
  createSession(res, user.id, req);
  res.json({ user: mePayload(user) });
});

r.post('/logout', (req, res) => {
  destroySession(req, res);
  res.json({ ok: true });
});

r.get('/me', (req, res) => {
  res.json({ user: req.user ? mePayload(req.user) : null });
});

r.post('/verify-email', authLimiter, (req, res) => {
  const { token } = parse(z.object({ token: z.string().min(10).max(200) }), req.body);
  const row = consumeToken(token, 'verify_email');
  run('UPDATE users SET email_verified = 1 WHERE id = ?', row.user_id);
  res.json({ ok: true });
});

r.post('/resend-verification', requireAuth, authLimiter, async (req, res) => {
  if (req.user.email_verified) return res.json({ ok: true, alreadyVerified: true });
  const mail = await sendVerification(req.user);
  res.json({ ok: true, emailSent: mail.delivered });
});

r.post('/forgot-password', authLimiter, async (req, res) => {
  const { email: addr } = parse(z.object({ email }), req.body);
  const user = one('SELECT * FROM users WHERE email = ?', addr);
  let delivered = false;
  if (user) {
    const token = issueToken(user.id, 'reset_password', 1);
    delivered = (await sendMail(user.email, 'Recuperação de conta NEXPLAY',
      `Para redefinir sua senha, acesse: ${config.appOrigin}/redefinir-senha?token=${token}\n\nO link expira em 1 hora. Se não foi você, ignore este e-mail.`)).delivered;
  }
  // Resposta idêntica exista ou não a conta (evita enumeração).
  res.json({ ok: true, mailConfigured: mailConfigured(), delivered: user ? delivered : mailConfigured() });
});

r.post('/reset-password', authLimiter, async (req, res) => {
  const body = parse(z.object({ token: z.string().min(10).max(200), password }), req.body);
  const row = consumeToken(body.token, 'reset_password');
  const hash = await hashPassword(body.password);
  tx(() => {
    run('UPDATE users SET password_hash = ?, failed_logins = 0, locked_until = NULL WHERE id = ?', hash, row.user_id);
    run('DELETE FROM sessions WHERE user_id = ?', row.user_id); // encerra todas as sessões
  });
  res.json({ ok: true });
});

r.post('/change-password', requireAuth, authLimiter, async (req, res) => {
  const body = parse(z.object({ current: z.string().min(1).max(200), password }), req.body);
  if (!(await verifyPassword(body.current, req.user.password_hash))) throw new HttpError(400, 'Senha atual incorreta.');
  run('UPDATE users SET password_hash = ? WHERE id = ?', await hashPassword(body.password), req.user.id);
  run('DELETE FROM sessions WHERE user_id = ? AND id <> ?', req.user.id, sha256(req.cookies.nx_session));
  res.json({ ok: true });
});

export default r;
