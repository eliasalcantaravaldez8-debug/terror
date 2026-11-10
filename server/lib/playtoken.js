// Tokens assinados (HMAC) que autorizam o carregamento de um build na origem isolada (sandbox).
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { config } from '../config.js';

const keyFile = path.join(config.dataDir, '.play-secret');
let secret = process.env.PLAY_TOKEN_SECRET;
if (!secret) {
  if (!fs.existsSync(keyFile)) fs.writeFileSync(keyFile, crypto.randomBytes(32).toString('hex'), { mode: 0o600 });
  secret = fs.readFileSync(keyFile, 'utf8').trim();
}

const b64 = (s) => Buffer.from(s).toString('base64url');

export function signPlayToken({ versionId, userId, hours = 6 }) {
  const payload = b64(JSON.stringify({ v: versionId, u: userId ?? 0, e: Date.now() + hours * 3600_000 }));
  const sig = crypto.createHmac('sha256', secret).update(payload).digest('base64url').slice(0, 32);
  return `${payload}.${sig}`;
}

export function verifyPlayToken(token) {
  const [payload, sig] = String(token || '').split('.');
  if (!payload || !sig) return null;
  const expected = crypto.createHmac('sha256', secret).update(payload).digest('base64url').slice(0, 32);
  if (sig.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString());
    if (data.e < Date.now()) return null;
    return { versionId: data.v, userId: data.u };
  } catch {
    return null;
  }
}

/** URL base do sandbox para um jogo. Com SANDBOX_GAME_SUBDOMAINS=1 cada jogo tem seu próprio subdomínio. */
export function sandboxBase(gameId) {
  if (config.singleOrigin) return '';
  if (process.env.SANDBOX_GAME_SUBDOMAINS === '1') {
    const u = new URL(config.sandboxOrigin);
    return `${u.protocol}//g${gameId}.${u.host}`;
  }
  return config.sandboxOrigin;
}
