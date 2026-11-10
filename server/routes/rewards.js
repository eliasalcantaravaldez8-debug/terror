// NEXPLAY REWARDS: saldo, desafios, loja, histórico e conversão em créditos.
import { Router } from 'express';
import { one, all, run, tx } from '../db/index.js';
import { HttpError, rateLimiter } from '../lib/security.js';
import { requireAuth } from '../lib/auth.js';
import { parse, z, id } from '../lib/validate.js';
import { activePlanCode, audit } from '../lib/services.js';
import { ncBalance, creditBalance, listChallenges, claimChallenge, conversionTiers, redeem, redemptionRisk, spendNC } from '../lib/rewards.js';
import { getSetting } from '../db/index.js';

const r = Router();
const limiter = rateLimiter({ windowMs: 60_000, max: 20, key: (req) => `rw:${req.user?.id}` });

r.get('/', requireAuth, (req, res) => {
  const tiers = conversionTiers();
  const risk = redemptionRisk(req.user, tiers[0]?.credit_cents || 0);
  res.json({
    nc: ncBalance(req.user.id),
    creditCents: creditBalance(req.user.id),
    challenges: listChallenges(req.user.id),
    tiers,
    rules: getSetting('rewards', {}),
    redemptionBlockers: risk.hard,
  });
});

r.post('/challenges/:id/claim', requireAuth, limiter, (req, res) => {
  res.json(claimChallenge(req.user.id, parse(id, req.params.id)));
});

r.get('/history', requireAuth, (req, res) => {
  res.json({
    nc: all('SELECT id, amount, reason, ref_type, ref_id, created_at FROM nc_ledger WHERE user_id=? ORDER BY id DESC LIMIT 200', req.user.id),
    credits: all('SELECT id, amount_cents, reason, ref_type, ref_id, created_at FROM credit_ledger WHERE user_id=? ORDER BY id DESC LIMIT 200', req.user.id),
    redemptions: all('SELECT id, tier_nc, credit_cents, status, created_at FROM nc_redemptions WHERE user_id=? ORDER BY id DESC LIMIT 50', req.user.id),
  });
});

r.post('/redeem', requireAuth, limiter, (req, res) => {
  const { tierNc } = parse(z.object({ tierNc: z.number().int().positive() }), req.body);
  res.json(redeem(req, tierNc));
});

// ───────── Loja de recompensas ─────────
r.get('/store', (req, res) => {
  const owned = req.user ? new Set(all('SELECT item_id FROM user_items WHERE user_id=?', req.user.id).map((x) => x.item_id)) : new Set();
  res.json({ items: all('SELECT * FROM store_items WHERE active=1 ORDER BY kind, price_nc').map((i) => ({
    id: i.id, code: i.code, kind: i.kind, name: i.name, description: i.description, priceNc: i.price_nc,
    data: JSON.parse(i.data), requiredPlan: i.required_plan, stock: i.stock, owned: owned.has(i.id),
  })) });
});

r.post('/store/:id/buy', requireAuth, limiter, (req, res) => {
  const item = one('SELECT * FROM store_items WHERE id=? AND active=1', parse(id, req.params.id));
  if (!item) throw new HttpError(404, 'Item não encontrado.');
  if (item.required_plan) {
    const plan = activePlanCode(req.user.id);
    const ok = item.required_plan === 'pro' ? ['pro', 'deluxe'].includes(plan) : plan === 'deluxe';
    if (!ok) throw new HttpError(402, `Item exclusivo para assinantes ${item.required_plan.toUpperCase()}.`, 'plan_required');
  }
  tx(() => {
    if (one('SELECT 1 FROM user_items WHERE user_id=? AND item_id=?', req.user.id, item.id)) throw new HttpError(409, 'Você já possui este item.');
    if (item.stock !== null) {
      if (item.stock <= 0) throw new HttpError(410, 'Item esgotado.');
      run('UPDATE store_items SET stock = stock - 1 WHERE id=?', item.id);
    }
    if (item.price_nc > 0) spendNC(req.user.id, item.price_nc, 'store_purchase', { refType: 'store_item', refId: item.id, idempotencyKey: `store:${item.id}:${req.user.id}` });
    run('INSERT INTO user_items(user_id, item_id) VALUES (?,?)', req.user.id, item.id);
  });
  audit(req, 'rewards.store_purchase', 'store_item', item.id, { price: item.price_nc });
  res.json({ ok: true, nc: ncBalance(req.user.id) });
});

r.get('/inventory', requireAuth, (req, res) => {
  res.json({ items: all(`SELECT i.*, ui.acquired_at FROM user_items ui JOIN store_items i ON i.id=ui.item_id WHERE ui.user_id=? ORDER BY ui.acquired_at DESC`, req.user.id)
    .map((i) => ({ id: i.id, code: i.code, kind: i.kind, name: i.name, data: JSON.parse(i.data), acquiredAt: i.acquired_at })) });
});

export default r;
