// NEXPLAY REWARDS — Nex Coins (NC) e créditos internos.
// Princípios: livro-razão imutável, transações atômicas, chaves de idempotência,
// métricas calculadas no servidor (o cliente nunca informa progresso), tetos e antifraude.
import { one, all, run, tx, getSetting } from '../db/index.js';
import { HttpError } from './security.js';
import { notify, weekKey, weekStart, audit } from './services.js';

const AUTO_SOURCES = ['challenge', 'achievement', 'event', 'competition', 'community_goal'];

export const ncBalance = (userId) => Number(one('SELECT COALESCE(SUM(amount),0) AS b FROM nc_ledger WHERE user_id = ?', userId).b);
export const creditBalance = (userId) => Number(one('SELECT COALESCE(SUM(amount_cents),0) AS b FROM credit_ledger WHERE user_id = ?', userId).b);

function weeklyAutoEarned(userId) {
  const start = weekStart().toISOString();
  const placeholders = AUTO_SOURCES.map(() => '?').join(',');
  return Number(one(`SELECT COALESCE(SUM(amount),0) AS s FROM nc_ledger
    WHERE user_id = ? AND amount > 0 AND created_at >= ? AND reason IN (${placeholders})`, userId, start, ...AUTO_SOURCES).s);
}

/**
 * Credita NC. Fontes automáticas respeitam o teto semanal; concessões administrativas não.
 * Retorna a quantia efetivamente creditada (pode ser menor que a pedida por causa do teto).
 */
export function grantNC(userId, amount, reason, { refType, refId, idempotencyKey, createdBy } = {}) {
  if (!Number.isInteger(amount) || amount <= 0) throw new HttpError(400, 'Quantia inválida.');
  return tx(() => {
    if (idempotencyKey && one('SELECT 1 FROM nc_ledger WHERE idempotency_key = ?', idempotencyKey)) return 0;
    let credited = amount;
    if (AUTO_SOURCES.includes(reason)) {
      const cap = getSetting('rewards', {}).weekly_earn_cap_nc ?? 1000;
      credited = Math.max(0, Math.min(amount, cap - weeklyAutoEarned(userId)));
      if (credited === 0) return 0;
    }
    run(`INSERT INTO nc_ledger(user_id, amount, reason, ref_type, ref_id, idempotency_key, created_by) VALUES (?,?,?,?,?,?,?)`,
      userId, credited, reason, refType ?? null, refId == null ? null : String(refId), idempotencyKey ?? null, createdBy ?? null);
    return credited;
  });
}

export function spendNC(userId, amount, reason, { refType, refId, idempotencyKey } = {}) {
  return tx(() => {
    if (ncBalance(userId) < amount) throw new HttpError(400, 'Saldo de NC insuficiente.', 'insufficient_nc');
    run(`INSERT INTO nc_ledger(user_id, amount, reason, ref_type, ref_id, idempotency_key) VALUES (?,?,?,?,?,?)`,
      userId, -amount, reason, refType ?? null, refId == null ? null : String(refId), idempotencyKey ?? null);
  });
}

// ───────── Métricas de desafios (calculadas no servidor) ─────────
export function challengeMetric(userId, metric, since) {
  switch (metric) {
    case 'play_minutes':
      return Math.floor(Number(one(`SELECT COALESCE(SUM(ps.active_seconds),0) AS s FROM play_sessions ps
        JOIN games g ON g.id = ps.game_id WHERE ps.user_id = ? AND ps.started_at >= ? AND g.creator_id <> ?`, userId, since, userId).s) / 60);
    case 'distinct_games':
      return all(`SELECT ps.game_id FROM play_sessions ps JOIN games g ON g.id = ps.game_id
        WHERE ps.user_id = ? AND ps.started_at >= ? AND g.creator_id <> ?
        GROUP BY ps.game_id HAVING SUM(ps.active_seconds) >= 600`, userId, since, userId).length;
    case 'reviews_written':
      return Number(one(`SELECT COUNT(*) AS c FROM reviews r JOIN games g ON g.id = r.game_id
        WHERE r.user_id = ? AND r.created_at >= ? AND r.hidden = 0 AND length(r.body) >= 80 AND g.creator_id <> ?`, userId, since, userId).c);
    case 'comments_written':
      return Number(one(`SELECT COUNT(*) AS c FROM comments WHERE user_id = ? AND created_at >= ? AND hidden = 0 AND length(body) >= 15`, userId, since).c);
    case 'achievements_unlocked':
      return Number(one('SELECT COUNT(*) AS c FROM user_achievements WHERE user_id = ? AND unlocked_at >= ?', userId, since).c);
    case 'event_participation':
      return Number(one('SELECT COUNT(*) AS c FROM event_participants WHERE user_id = ? AND joined_at >= ?', userId, since).c);
    default:
      return 0;
  }
}

function challengeWindow(ch) {
  if (ch.period === 'weekly') return { since: weekStart().toISOString(), periodKey: weekKey() };
  return { since: ch.starts_at || '1970-01-01', periodKey: ch.period === 'once' ? 'once' : `c${ch.id}` };
}

export function listChallenges(userId) {
  const now = new Date().toISOString();
  const rows = all(`SELECT * FROM challenges WHERE active = 1
    AND (starts_at IS NULL OR starts_at <= ?) AND (ends_at IS NULL OR ends_at > ?) ORDER BY period, id`, now, now);
  return rows.map((ch) => {
    const { since, periodKey } = challengeWindow(ch);
    const progress = userId ? Math.min(ch.target, challengeMetric(userId, ch.metric, since)) : 0;
    const claimed = userId ? !!one('SELECT 1 FROM challenge_claims WHERE challenge_id=? AND user_id=? AND period_key=?', ch.id, userId, periodKey) : false;
    return { id: ch.id, code: ch.code, title: ch.title, description: ch.description, period: ch.period,
      metric: ch.metric, target: ch.target, reward: ch.nc_reward, progress, claimed, endsAt: ch.ends_at };
  });
}

export function claimChallenge(userId, challengeId) {
  const ch = one('SELECT * FROM challenges WHERE id = ? AND active = 1', challengeId);
  if (!ch) throw new HttpError(404, 'Desafio não encontrado.');
  const { since, periodKey } = challengeWindow(ch);
  return tx(() => {
    if (one('SELECT 1 FROM challenge_claims WHERE challenge_id=? AND user_id=? AND period_key=?', ch.id, userId, periodKey)) {
      throw new HttpError(409, 'Recompensa já resgatada neste período.');
    }
    const progress = challengeMetric(userId, ch.metric, since);
    if (progress < ch.target) throw new HttpError(400, `Desafio incompleto (${progress}/${ch.target}).`);
    run('INSERT INTO challenge_claims(challenge_id, user_id, period_key) VALUES (?,?,?)', ch.id, userId, periodKey);
    const credited = grantNC(userId, ch.nc_reward, 'challenge', {
      refType: 'challenge', refId: ch.id, idempotencyKey: `challenge:${ch.id}:${userId}:${periodKey}`,
    });
    if (credited === 0) throw new HttpError(429, 'Teto semanal de NC atingido. Resgate este desafio na próxima semana, se ainda estiver ativo.', 'weekly_cap');
    return { credited, capped: credited < ch.nc_reward };
  });
}

// ───────── Conquistas ─────────
export function unlockAchievement(userId, code) {
  const a = one('SELECT * FROM achievements WHERE code = ?', code);
  if (!a) return false;
  const inserted = run('INSERT OR IGNORE INTO user_achievements(user_id, achievement_id) VALUES (?,?)', userId, a.id).changes;
  if (!inserted) return false;
  if (a.nc_reward > 0) grantNC(userId, a.nc_reward, 'achievement', { refType: 'achievement', refId: a.id, idempotencyKey: `ach:${a.id}:${userId}` });
  notify(userId, 'achievement', `Conquista desbloqueada: ${a.name}`, a.description, '/perfil');
  return true;
}

/** Verifica conquistas da plataforma que dependem de contagens. */
export function checkPlatformAchievements(userId) {
  const playSec = Number(one('SELECT COALESCE(SUM(active_seconds),0) AS s FROM play_sessions WHERE user_id=?', userId).s);
  if (playSec > 0) unlockAchievement(userId, 'first_steps');
  if (playSec >= 100 * 3600) unlockAchievement(userId, 'veteran_100h');
  const reviews = Number(one('SELECT COUNT(*) AS c FROM reviews WHERE user_id=? AND hidden=0', userId).c);
  if (reviews >= 1) unlockAchievement(userId, 'first_review');
  const detailed = Number(one('SELECT COUNT(*) AS c FROM reviews WHERE user_id=? AND hidden=0 AND length(body)>=80', userId).c);
  if (detailed >= 50) unlockAchievement(userId, 'critic_50');
  const friends = Number(one(`SELECT COUNT(*) AS c FROM friendships WHERE status='accepted' AND (requester_id=? OR addressee_id=?)`, userId, userId).c);
  if (friends >= 10) unlockAchievement(userId, 'social_butterfly');
}

// ───────── Conversão NC → crédito NEXPLAY ─────────
export function conversionTiers() {
  return getSetting('conversion_tiers', []);
}

/** Avalia riscos de um resgate. "hard" bloqueia; "soft" retém para revisão manual. */
export function redemptionRisk(user, creditCents) {
  const rules = getSetting('rewards', {});
  const hard = [];
  const soft = [];
  const ageDays = (Date.now() - Date.parse(user.created_at)) / 864e5;
  if (ageDays < rules.redemption_min_account_days) hard.push(`Conta precisa ter pelo menos ${rules.redemption_min_account_days} dias.`);
  if (rules.require_verified_email && !user.email_verified) hard.push('Confirme seu e-mail antes de resgatar.');
  const playMin = Number(one('SELECT COALESCE(SUM(active_seconds),0) AS s FROM play_sessions WHERE user_id=?', user.id).s) / 60;
  if (playMin < rules.min_play_minutes_for_redemption) hard.push(`São necessários ${rules.min_play_minutes_for_redemption} minutos de jogo ativo na conta.`);
  const since = new Date(Date.now() - rules.redemption_cooldown_days * 864e5).toISOString();
  if (one(`SELECT 1 FROM nc_redemptions WHERE user_id=? AND created_at >= ? AND status IN ('completed','held')`, user.id, since)) {
    hard.push(`Só é permitido um resgate a cada ${rules.redemption_cooldown_days} dias.`);
  }
  const monthStart = new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), 1)).toISOString();
  const monthSum = Number(one(`SELECT COALESCE(SUM(credit_cents),0) AS s FROM nc_redemptions WHERE user_id=? AND created_at >= ? AND status IN ('completed','held')`, user.id, monthStart).s);
  if (monthSum + creditCents > rules.redemption_monthly_cap_cents) hard.push('Limite mensal de resgates atingido.');
  if (user.signup_ip) {
    const siblings = Number(one(`SELECT COUNT(DISTINCT r.user_id) AS c FROM nc_redemptions r JOIN users u ON u.id = r.user_id
      WHERE u.signup_ip = ? AND u.id <> ? AND r.status IN ('completed','held')`, user.signup_ip, user.id).c);
    if (siblings > 0) soft.push('shared_signup_ip');
  }
  // Ganho muito concentrado: maior parte do saldo vindo de uma única concessão recente fora de desafios.
  const recentAdmin = Number(one(`SELECT COALESCE(SUM(amount),0) AS s FROM nc_ledger WHERE user_id=? AND reason='admin_grant' AND created_at >= ?`,
    user.id, new Date(Date.now() - 2 * 864e5).toISOString()).s);
  if (recentAdmin > 0) soft.push('recent_admin_grant');
  return { hard, soft };
}

export function redeem(req, tierNc) {
  const user = req.user;
  const tier = conversionTiers().find((t) => t.nc === tierNc);
  if (!tier) throw new HttpError(400, 'Faixa de conversão inválida.');
  const { hard, soft } = redemptionRisk(user, tier.credit_cents);
  if (hard.length) throw new HttpError(400, hard.join(' '), 'redemption_blocked');
  return tx(() => {
    if (ncBalance(user.id) < tier.nc) throw new HttpError(400, 'Saldo de NC insuficiente.', 'insufficient_nc');
    const status = soft.length ? 'held' : 'completed';
    const r = run(`INSERT INTO nc_redemptions(user_id, tier_nc, credit_cents, status, risk_flags, ip) VALUES (?,?,?,?,?,?)`,
      user.id, tier.nc, tier.credit_cents, status, JSON.stringify(soft), req.ip);
    run(`INSERT INTO nc_ledger(user_id, amount, reason, ref_type, ref_id) VALUES (?,?,?,?,?)`,
      user.id, -tier.nc, 'conversion', 'redemption', String(r.lastInsertRowid));
    if (status === 'completed') {
      run(`INSERT INTO credit_ledger(user_id, amount_cents, reason, ref_type, ref_id, idempotency_key) VALUES (?,?,?,?,?,?)`,
        user.id, tier.credit_cents, 'nc_conversion', 'redemption', String(r.lastInsertRowid), `redemption:${r.lastInsertRowid}`);
    }
    audit(req, 'rewards.redeem', 'redemption', r.lastInsertRowid, { tier, status, soft });
    return { id: r.lastInsertRowid, status, creditCents: tier.credit_cents };
  });
}

/** Revisão administrativa de um resgate retido. */
export function reviewRedemption(req, id, approve) {
  return tx(() => {
    const r = one(`SELECT * FROM nc_redemptions WHERE id = ? AND status = 'held'`, id);
    if (!r) throw new HttpError(404, 'Resgate retido não encontrado.');
    if (approve) {
      run(`UPDATE nc_redemptions SET status='completed', reviewed_by=? WHERE id=?`, req.user.id, id);
      run(`INSERT INTO credit_ledger(user_id, amount_cents, reason, ref_type, ref_id, idempotency_key) VALUES (?,?,?,?,?,?)`,
        r.user_id, r.credit_cents, 'nc_conversion', 'redemption', String(id), `redemption:${id}`);
      notify(r.user_id, 'rewards', 'Resgate aprovado', `R$ ${(r.credit_cents / 100).toFixed(2)} em crédito NEXPLAY adicionados.`, '/rewards');
    } else {
      run(`UPDATE nc_redemptions SET status='rejected', reviewed_by=? WHERE id=?`, req.user.id, id);
      run(`INSERT INTO nc_ledger(user_id, amount, reason, ref_type, ref_id, created_by) VALUES (?,?,?,?,?,?)`,
        r.user_id, r.tier_nc, 'reversal', 'redemption', String(id), req.user.id);
      notify(r.user_id, 'rewards', 'Resgate recusado', 'Seus NC foram devolvidos. Fale com o suporte se tiver dúvidas.', '/rewards');
    }
    audit(req, approve ? 'rewards.redemption_approve' : 'rewards.redemption_reject', 'redemption', id);
  });
}
