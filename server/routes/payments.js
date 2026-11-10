// Planos, assinaturas, compras de jogos, doações e créditos NEXPLAY.
// Pagamentos com dinheiro real só funcionam com um provedor configurado (Stripe).
// Sem credenciais, as rotas respondem 503 — NUNCA simulam uma compra.
import { Router } from 'express';
import crypto from 'node:crypto';
import { one, all, run, tx, getSetting } from '../db/index.js';
import { config } from '../config.js';
import { HttpError, rateLimiter } from '../lib/security.js';
import { requireAuth } from '../lib/auth.js';
import { parse, z, id } from '../lib/validate.js';
import { activePlanCode, getPlan, notify, audit, logActivity } from '../lib/services.js';
import { creditBalance } from '../lib/rewards.js';

const r = Router();
const limiter = rateLimiter({ windowMs: 60_000, max: 15, key: (req) => `pay:${req.user?.id || req.ip}` });

const paymentsReady = () => config.payments.provider === 'stripe';
function requirePayments() {
  if (!paymentsReady()) throw new HttpError(503, 'Pagamentos ainda não estão habilitados nesta instalação da NEXPLAY (provedor não configurado).', 'payments_not_configured');
}

async function stripe(pathname, params) {
  const body = new URLSearchParams();
  const flat = (obj, prefix = '') => {
    for (const [k, v] of Object.entries(obj)) {
      const key = prefix ? `${prefix}[${k}]` : k;
      if (v && typeof v === 'object') flat(v, key); else if (v !== undefined && v !== null) body.append(key, String(v));
    }
  };
  flat(params);
  const resp = await fetch(`https://api.stripe.com/v1/${pathname}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${config.payments.stripeSecret}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  const json = await resp.json();
  if (!resp.ok) throw new HttpError(502, `Provedor de pagamento recusou a operação: ${json.error?.message || resp.status}`, 'payment_provider_error');
  return json;
}

export function platformFee(grossCents) {
  const bps = getSetting('platform_fee_bps', 0);
  return Math.round((grossCents * bps) / 10000);
}

// ───────── Planos ─────────
r.get('/plans', (req, res) => {
  const plans = all('SELECT * FROM plans ORDER BY price_cents').map((p) => ({ ...p, features: JSON.parse(p.features) }));
  let current = null;
  if (req.user) {
    current = {
      plan: activePlanCode(req.user.id),
      subscriptions: all(`SELECT plan_code, source, status, starts_at, ends_at FROM subscriptions WHERE user_id=? ORDER BY id DESC LIMIT 10`, req.user.id),
    };
  }
  res.json({ plans, current, paymentsEnabled: paymentsReady() });
});

r.post('/checkout/subscription', requireAuth, limiter, async (req, res) => {
  requirePayments();
  const { plan } = parse(z.object({ plan: z.enum(['pro', 'deluxe']) }), req.body);
  const price = plan === 'pro' ? config.payments.stripePricePro : config.payments.stripePriceDeluxe;
  if (!price) throw new HttpError(503, `Preço do plano ${plan.toUpperCase()} não configurado no provedor.`, 'payments_not_configured');
  const p = getPlan(plan);
  const order = run(`INSERT INTO orders(user_id, kind, plan_code, amount_cents, provider, status) VALUES (?,?,?,?,?,?)`, req.user.id, 'subscription', plan, p.price_cents, 'stripe', 'pending').lastInsertRowid;
  const session = await stripe('checkout/sessions', {
    mode: 'subscription',
    line_items: { 0: { price, quantity: 1 } },
    success_url: `${config.appOrigin}/planos?status=sucesso`,
    cancel_url: `${config.appOrigin}/planos?status=cancelado`,
    client_reference_id: String(req.user.id),
    metadata: { order_id: order, user_id: req.user.id, plan },
    subscription_data: { metadata: { user_id: req.user.id, plan } },
  });
  run('UPDATE orders SET provider_ref=? WHERE id=?', session.id, order);
  res.json({ url: session.url });
});

// ───────── Compra de jogos ─────────
r.post('/games/:id/buy', requireAuth, limiter, async (req, res) => {
  const g = one(`SELECT * FROM games WHERE id=? AND status='published'`, parse(id, req.params.id));
  if (!g) throw new HttpError(404, 'Jogo não encontrado.');
  if (g.price_cents === 0) throw new HttpError(400, 'Este jogo é gratuito.');
  if (g.creator_id === req.user.id) throw new HttpError(400, 'Você é o criador deste jogo.');
  if (one('SELECT 1 FROM library WHERE user_id=? AND game_id=?', req.user.id, g.id)) throw new HttpError(409, 'Você já possui este jogo.');
  const { method } = parse(z.object({ method: z.enum(['credits', 'card']) }), req.body);

  if (method === 'credits') {
    if (!g.accepts_credits) throw new HttpError(400, 'Este jogo não participa de compras com créditos NEXPLAY.');
    const result = tx(() => {
      if (one('SELECT 1 FROM library WHERE user_id=? AND game_id=?', req.user.id, g.id)) throw new HttpError(409, 'Você já possui este jogo.');
      if (creditBalance(req.user.id) < g.price_cents) throw new HttpError(400, 'Créditos NEXPLAY insuficientes.', 'insufficient_credits');
      const now = new Date().toISOString();
      const order = run(`INSERT INTO orders(user_id, kind, game_id, amount_cents, credits_used_cents, provider, status, paid_at) VALUES (?,?,?,?,?,?,?,?)`,
        req.user.id, 'game', g.id, g.price_cents, g.price_cents, 'credits', 'paid', now).lastInsertRowid;
      run(`INSERT INTO credit_ledger(user_id, amount_cents, reason, ref_type, ref_id, idempotency_key) VALUES (?,?,?,?,?,?)`,
        req.user.id, -g.price_cents, 'game_purchase', 'order', String(order), `order:${order}`);
      run(`INSERT INTO library(user_id, game_id, source, order_id) VALUES (?,?,?,?)`, req.user.id, g.id, 'credits', order);
      const fee = platformFee(g.price_cents);
      run(`INSERT INTO creator_earnings(creator_id, order_id, gross_cents, platform_fee_cents, net_cents, funding) VALUES (?,?,?,?,?,?)`,
        g.creator_id, order, g.price_cents, fee, g.price_cents - fee, 'platform_credits');
      return order;
    });
    notify(g.creator_id, 'sale', `Nova venda: ${g.title}`, 'Pago com créditos NEXPLAY.', `/criador`);
    logActivity(req.user.id, 'purchased', g.id);
    audit(req, 'payments.game_credits', 'order', result, { game: g.id, cents: g.price_cents });
    return res.json({ ok: true, orderId: result });
  }

  requirePayments();
  const order = run(`INSERT INTO orders(user_id, kind, game_id, amount_cents, provider, status) VALUES (?,?,?,?,?,?)`, req.user.id, 'game', g.id, g.price_cents, 'stripe', 'pending').lastInsertRowid;
  const session = await stripe('checkout/sessions', {
    mode: 'payment',
    line_items: { 0: { quantity: 1, price_data: { currency: config.payments.currency, unit_amount: g.price_cents, product_data: { name: g.title } } } },
    success_url: `${config.appOrigin}/jogo/${g.slug}?compra=sucesso`,
    cancel_url: `${config.appOrigin}/jogo/${g.slug}?compra=cancelada`,
    client_reference_id: String(req.user.id),
    metadata: { order_id: order, user_id: req.user.id, game_id: g.id, kind: 'game' },
  });
  run('UPDATE orders SET provider_ref=? WHERE id=?', session.id, order);
  res.json({ url: session.url });
});

r.post('/games/:id/donate', requireAuth, limiter, async (req, res) => {
  const g = one(`SELECT * FROM games WHERE id=? AND status IN ('published','in_development')`, parse(id, req.params.id));
  if (!g || !g.accepts_donations) throw new HttpError(400, 'Este jogo não aceita doações.');
  const { amountCents } = parse(z.object({ amountCents: z.number().int().min(200).max(100000) }), req.body);
  requirePayments();
  const order = run(`INSERT INTO orders(user_id, kind, game_id, amount_cents, provider, status) VALUES (?,?,?,?,?,?)`, req.user.id, 'donation', g.id, amountCents, 'stripe', 'pending').lastInsertRowid;
  const session = await stripe('checkout/sessions', {
    mode: 'payment',
    line_items: { 0: { quantity: 1, price_data: { currency: config.payments.currency, unit_amount: amountCents, product_data: { name: `Doação para ${g.title}` } } } },
    success_url: `${config.appOrigin}/jogo/${g.slug}?doacao=sucesso`,
    cancel_url: `${config.appOrigin}/jogo/${g.slug}`,
    metadata: { order_id: order, user_id: req.user.id, game_id: g.id, kind: 'donation' },
  });
  run('UPDATE orders SET provider_ref=? WHERE id=?', session.id, order);
  res.json({ url: session.url });
});

r.get('/orders', requireAuth, (req, res) => {
  res.json({ orders: all(`SELECT o.*, g.title AS game_title FROM orders o LEFT JOIN games g ON g.id=o.game_id WHERE o.user_id=? ORDER BY o.id DESC LIMIT 100`, req.user.id) });
});

r.get('/earnings', requireAuth, (req, res) => {
  res.json({
    feeBps: getSetting('platform_fee_bps', 0),
    totals: one(`SELECT COALESCE(SUM(gross_cents),0) AS gross, COALESCE(SUM(net_cents),0) AS net, COALESCE(SUM(platform_fee_cents),0) AS fees FROM creator_earnings WHERE creator_id=? AND status <> 'reversed'`, req.user.id),
    byFunding: all(`SELECT funding, COALESCE(SUM(net_cents),0) AS net FROM creator_earnings WHERE creator_id=? AND status <> 'reversed' GROUP BY funding`, req.user.id),
    recent: all(`SELECT e.*, o.kind, g.title FROM creator_earnings e JOIN orders o ON o.id=e.order_id LEFT JOIN games g ON g.id=o.game_id WHERE e.creator_id=? ORDER BY e.id DESC LIMIT 50`, req.user.id),
  });
});

// ───────── Webhook do Stripe ─────────
export function verifyStripeSignature(raw, header, secret) {
  const parts = Object.fromEntries(String(header || '').split(',').map((p) => p.split('=')));
  if (!parts.t || !parts.v1) return false;
  if (Math.abs(Date.now() / 1000 - Number(parts.t)) > 300) return false;
  const expected = crypto.createHmac('sha256', secret).update(`${parts.t}.${raw}`).digest('hex');
  return expected.length === parts.v1.length && crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(parts.v1));
}

export function webhookHandler(req, res) {
  if (!paymentsReady() || !config.payments.stripeWebhookSecret) return res.status(503).json({ error: 'not_configured' });
  const raw = req.body.toString('utf8');
  if (!verifyStripeSignature(raw, req.get('stripe-signature'), config.payments.stripeWebhookSecret)) return res.status(400).json({ error: 'bad_signature' });
  const event = JSON.parse(raw);
  const fresh = run('INSERT OR IGNORE INTO payment_events(id, provider, type, payload) VALUES (?,?,?,?)', event.id, 'stripe', event.type, raw).changes;
  if (!fresh) return res.json({ received: true, duplicate: true });
  const obj = event.data?.object || {};
  tx(() => {
    if (event.type === 'checkout.session.completed' && obj.payment_status !== 'unpaid') {
      const order = one('SELECT * FROM orders WHERE id=? AND provider_ref=?', Number(obj.metadata?.order_id), obj.id);
      if (!order || order.status === 'paid') return;
      run(`UPDATE orders SET status='paid', paid_at=? WHERE id=?`, new Date().toISOString(), order.id);
      if (order.kind === 'subscription') {
        const ends = new Date(Date.now() + 32 * 864e5).toISOString(); // renovado a cada invoice.paid
        run(`INSERT INTO subscriptions(user_id, plan_code, source, status, ends_at, external_id) VALUES (?,?,?,?,?,?)`, order.user_id, order.plan_code, 'stripe', 'active', ends, obj.subscription || null);
        notify(order.user_id, 'plan', `Bem-vindo ao ${order.plan_code.toUpperCase()}!`, 'Sua assinatura está ativa.', '/planos');
      } else if (order.kind === 'game') {
        run(`INSERT OR IGNORE INTO library(user_id, game_id, source, order_id) VALUES (?,?,?,?)`, order.user_id, order.game_id, 'purchase', order.id);
        const g = one('SELECT creator_id, title FROM games WHERE id=?', order.game_id);
        const fee = platformFee(order.amount_cents);
        run(`INSERT INTO creator_earnings(creator_id, order_id, gross_cents, platform_fee_cents, net_cents, funding) VALUES (?,?,?,?,?,?)`, g.creator_id, order.id, order.amount_cents, fee, order.amount_cents - fee, 'money');
        notify(g.creator_id, 'sale', `Nova venda: ${g.title}`, '', '/criador');
      } else if (order.kind === 'donation') {
        const g = one('SELECT creator_id, title FROM games WHERE id=?', order.game_id);
        const fee = platformFee(order.amount_cents);
        run(`INSERT INTO creator_earnings(creator_id, order_id, gross_cents, platform_fee_cents, net_cents, funding) VALUES (?,?,?,?,?,?)`, g.creator_id, order.id, order.amount_cents, fee, order.amount_cents - fee, 'money');
        notify(g.creator_id, 'donation', `Você recebeu uma doação em ${g.title}!`, '', '/criador');
      }
    } else if (event.type === 'invoice.paid' && obj.subscription) {
      run(`UPDATE subscriptions SET ends_at=?, status='active' WHERE external_id=? AND source='stripe'`, new Date(Date.now() + 32 * 864e5).toISOString(), obj.subscription);
    } else if (event.type === 'customer.subscription.deleted') {
      run(`UPDATE subscriptions SET status='canceled', ends_at=? WHERE external_id=? AND source='stripe'`, new Date().toISOString(), obj.id);
    } else if (event.type === 'charge.refunded') {
      const order = one(`SELECT * FROM orders WHERE provider_ref IN (SELECT provider_ref FROM orders) AND id=?`, Number(obj.metadata?.order_id || 0));
      if (order) {
        run(`UPDATE orders SET status='refunded' WHERE id=?`, order.id);
        run(`UPDATE creator_earnings SET status='reversed' WHERE order_id=?`, order.id);
        if (order.kind === 'game') run('DELETE FROM library WHERE user_id=? AND game_id=? AND order_id=?', order.user_id, order.game_id, order.id);
      }
    }
  });
  res.json({ received: true });
}

export default r;
