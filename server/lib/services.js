// Serviços de domínio compartilhados: auditoria, notificações, atividades, planos, armazenamento.
import { one, all, run } from '../db/index.js';
import { HttpError } from './security.js';

export function audit(req, action, targetType, targetId, details = {}) {
  run('INSERT INTO audit_log(actor_id, action, target_type, target_id, details, ip) VALUES (?,?,?,?,?,?)',
    req?.user?.id ?? null, action, targetType ?? null, targetId == null ? null : String(targetId),
    JSON.stringify(details), req?.ip ?? null);
}

export function notify(userId, type, title, body = '', link = null) {
  run('INSERT INTO notifications(user_id, type, title, body, link) VALUES (?,?,?,?,?)', userId, type, title, body, link);
}

export function logActivity(userId, type, gameId = null, data = {}) {
  run('INSERT INTO activities(user_id, type, game_id, data) VALUES (?,?,?,?)', userId, type, gameId, JSON.stringify(data));
}

// ───────── Relações sociais ─────────
export function areFriends(a, b) {
  return !!one(`SELECT 1 FROM friendships WHERE status='accepted' AND
    ((requester_id=? AND addressee_id=?) OR (requester_id=? AND addressee_id=?))`, a, b, b, a);
}
export function isBlockedEitherWay(a, b) {
  return !!one('SELECT 1 FROM blocks WHERE (blocker_id=? AND blocked_id=?) OR (blocker_id=? AND blocked_id=?)', a, b, b, a);
}
export function friendIds(userId) {
  return all(`SELECT CASE WHEN requester_id = ? THEN addressee_id ELSE requester_id END AS id
              FROM friendships WHERE status='accepted' AND (requester_id = ? OR addressee_id = ?)`, userId, userId, userId)
    .map((r) => r.id);
}

// ───────── Planos e direitos ─────────
export function getPlan(code) {
  const p = one('SELECT * FROM plans WHERE code = ?', code);
  return p && { ...p, features: JSON.parse(p.features) };
}

/** Plano efetivo do usuário: a maior assinatura ativa e não expirada. */
export function activePlanCode(userId) {
  const now = new Date().toISOString();
  // Expira assinaturas vencidas de forma preguiçosa.
  run(`UPDATE subscriptions SET status='expired' WHERE user_id=? AND status='active' AND ends_at IS NOT NULL AND ends_at <= ?`, userId, now);
  const rows = all(`SELECT plan_code FROM subscriptions WHERE user_id=? AND status='active'`, userId);
  if (rows.some((r) => r.plan_code === 'deluxe')) return 'deluxe';
  if (rows.some((r) => r.plan_code === 'pro')) return 'pro';
  return 'free';
}

export function entitlements(userId) {
  const plan = getPlan(activePlanCode(userId));
  return plan;
}

export function hasFeature(userId, feature) {
  return entitlements(userId).features.includes(feature);
}

export function requireFeature(feature, message) {
  return (req, _res, next) => {
    if (!req.user) return next(new HttpError(401, 'Faça login para continuar.', 'auth_required'));
    if (!hasFeature(req.user.id, feature)) {
      return next(new HttpError(402, message || 'Recurso disponível em um plano superior.', 'plan_required'));
    }
    next();
  };
}

// ───────── Armazenamento (NEXPLAY CLOUD) ─────────
export function storageUsedBytes(userId) {
  const p = one('SELECT COALESCE(SUM(size_bytes),0) AS s FROM projects WHERE owner_id = ?', userId).s;
  const v = one(`SELECT COALESCE(SUM(pv.size_bytes),0) AS s FROM project_versions pv
                 JOIN projects p ON p.id = pv.project_id WHERE p.owner_id = ?`, userId).s;
  const a = one('SELECT COALESCE(SUM(size_bytes),0) AS s FROM project_assets WHERE owner_id = ?', userId).s;
  return Number(p) + Number(v) + Number(a);
}

export function assertStorage(userId, extraBytes) {
  const plan = entitlements(userId);
  const used = storageUsedBytes(userId);
  const limit = plan.storage_mb * 1024 * 1024;
  if (used + extraBytes > limit) {
    throw new HttpError(413, `Limite de armazenamento do plano ${plan.name} atingido (${plan.storage_mb} MB).`, 'storage_limit');
  }
}

export function weekKey(date = new Date()) {
  // Semana ISO-8601 (segunda a domingo).
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((d - yearStart) / 864e5 + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(week).padStart(2, '0')}`;
}

export function weekStart(date = new Date()) {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() - (day - 1));
  return d;
}
