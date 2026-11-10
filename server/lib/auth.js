import { one, run } from '../db/index.js';
import { config } from '../config.js';
import { randomToken, sha256, HttpError } from './security.js';

export const SESSION_COOKIE = 'nx_session';

export function createSession(res, userId, req) {
  const token = randomToken(32);
  const expires = new Date(Date.now() + config.sessionDays * 864e5);
  run('INSERT INTO sessions(id, user_id, expires_at, ip, user_agent) VALUES (?,?,?,?,?)',
    sha256(token), userId, expires.toISOString(), req.ip, String(req.get('user-agent') || '').slice(0, 300));
  res.cookie(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: config.isProd,
    sameSite: 'lax',
    expires,
    path: '/',
  });
}

export function destroySession(req, res) {
  const token = req.cookies?.[SESSION_COOKIE];
  if (token) run('DELETE FROM sessions WHERE id = ?', sha256(token));
  res.clearCookie(SESSION_COOKIE, { path: '/' });
}

/** Carrega o usuário da sessão (se houver) em req.user. */
export function loadUser(req, _res, next) {
  const token = req.cookies?.[SESSION_COOKIE];
  req.user = null;
  if (token) {
    const row = one(`SELECT u.* FROM sessions s JOIN users u ON u.id = s.user_id
                     WHERE s.id = ? AND s.expires_at > ?`, sha256(token), new Date().toISOString());
    if (row && row.status === 'active') {
      req.user = row;
      // Atualiza "visto por último" no máximo a cada 5 minutos.
      if (!row.last_seen_at || Date.now() - Date.parse(row.last_seen_at) > 300_000) {
        run('UPDATE users SET last_seen_at = ? WHERE id = ?', new Date().toISOString(), row.id);
      }
    }
  }
  next();
}

export function requireAuth(req, _res, next) {
  if (!req.user) return next(new HttpError(401, 'Faça login para continuar.', 'auth_required'));
  next();
}

/** Verificação de papel SEMPRE no servidor. A interface apenas reflete isso. */
export const requireRole = (...roles) => (req, _res, next) => {
  if (!req.user) return next(new HttpError(401, 'Faça login para continuar.', 'auth_required'));
  if (!roles.includes(req.user.role)) return next(new HttpError(403, 'Acesso negado.', 'forbidden'));
  next();
};

/**
 * Proteção CSRF: requisições que alteram estado precisam do cabeçalho X-NX-Client
 * (navegadores não o enviam em formulários cross-site) e, quando há Origin, ele deve ser o do app.
 */
export function csrfGuard(req, _res, next) {
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return next();
  if (req.path.startsWith('/api/payments/webhook')) return next();
  if (req.get('x-nx-client') !== '1') return next(new HttpError(403, 'Requisição bloqueada (CSRF).', 'csrf'));
  const origin = req.get('origin');
  if (origin && config.isProd && origin !== config.appOrigin) {
    return next(new HttpError(403, 'Origem não permitida.', 'bad_origin'));
  }
  next();
}

/** Representação pública de um usuário (nunca expõe e-mail, hash, IP). */
export function publicUser(u, extra = {}) {
  if (!u) return null;
  return {
    id: u.id,
    username: u.username,
    displayName: u.display_name,
    avatarUrl: u.avatar_url,
    bannerUrl: u.banner_url,
    bio: u.bio,
    role: u.role === 'user' ? undefined : u.role,
    equipped: {
      frame: u.equipped_frame, theme: u.equipped_theme, effect: u.equipped_effect, badge: u.equipped_badge,
    },
    createdAt: u.created_at,
    ...extra,
  };
}
