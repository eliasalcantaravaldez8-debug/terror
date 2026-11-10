// NEXPLAY — servidor principal (API + app) e servidor da origem isolada de jogos.
import express from 'express';
import cookieParser from 'cookie-parser';
import http from 'node:http';
import path from 'node:path';
import fs from 'node:fs';
import { config, ROOT } from './config.js';
import { loadUser, csrfGuard } from './lib/auth.js';
import { HttpError } from './lib/security.js';
import { mailConfigured } from './lib/mailer.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import socialRoutes from './routes/social.js';
import gameRoutes from './routes/games.js';
import projectRoutes from './routes/projects.js';
import aiRoutes from './routes/ai.js';
import rewardRoutes from './routes/rewards.js';
import paymentRoutes, { webhookHandler } from './routes/payments.js';
import communityRoutes from './routes/community.js';
import studioRoutes from './routes/studios.js';
import multiplayerRoutes, { attachMultiplayer } from './routes/multiplayer.js';
import adminRoutes from './routes/admin.js';
import { createSandboxApp, mountRuntime } from './sandbox/server.js';
import { recoverAutopilotRuns } from './ai/autopilot.js';

export function createApp() {
  const app = express();
  app.disable('x-powered-by');
  app.set('trust proxy', config.trustProxy);

  const sandbox = config.sandboxOrigin;
  const wildcard = process.env.SANDBOX_GAME_SUBDOMAINS === '1' ? ` ${new URL(sandbox).protocol}//*.${new URL(sandbox).host}` : '';
  app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', [
      "default-src 'self'",
      "script-src 'self'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob:",
      "media-src 'self' blob:",
      `connect-src 'self' ${config.isProd ? '' : 'ws: '}wss: ${sandbox}`,
      `frame-src ${sandbox}${wildcard} https://www.youtube-nocookie.com https://player.vimeo.com`,
      "worker-src 'self' blob:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self' https://checkout.stripe.com",
      "frame-ancestors 'none'",
    ].join('; '));
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    if (config.isProd) res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    next();
  });

  // Webhook de pagamento precisa do corpo bruto para verificar a assinatura.
  app.post('/api/payments/webhook', express.raw({ type: 'application/json', limit: '1mb' }), webhookHandler);

  app.use(express.json({ limit: '12mb' }));
  app.use(cookieParser());
  app.use(loadUser);
  app.use(csrfGuard);

  app.get('/api/health', (_req, res) => res.json({
    ok: true,
    services: {
      database: 'ok',
      email: mailConfigured() ? 'configured' : 'not_configured',
      ai: config.ai.enabled ? (config.ai.provider === 'mock' ? 'mock' : 'configured') : 'not_configured',
      payments: config.payments.provider === 'stripe' ? 'configured' : 'not_configured',
    },
    sandboxOrigin: config.sandboxOrigin,
  }));
  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api', socialRoutes);
  app.use('/api/games', gameRoutes);
  app.use('/api/projects', projectRoutes);
  app.use('/api/ai', aiRoutes);
  app.use('/api/rewards', rewardRoutes);
  app.use('/api/payments', paymentRoutes);
  app.use('/api/community', communityRoutes);
  app.use('/api/studios', studioRoutes);
  app.use('/api/multiplayer', multiplayerRoutes);
  app.use('/api/admin', adminRoutes);
  app.use('/api', (_req, _res, next) => next(new HttpError(404, 'Rota não encontrada.')));

  // Imagens enviadas (validadas por assinatura de arquivo; nunca HTML/SVG).
  app.use('/media', express.static(path.join(config.dataDir, 'uploads'), {
    fallthrough: false, index: false, dotfiles: 'deny',
    setHeaders: (res) => { res.setHeader('X-Content-Type-Options', 'nosniff'); res.setHeader('Cache-Control', 'public, max-age=604800, immutable'); },
  }));

  const dist = path.join(ROOT, 'dist', 'app');
  if (fs.existsSync(dist)) {
    app.use(express.static(dist, { index: false }));
    app.get('/*splat', (_req, res) => res.sendFile(path.join(dist, 'index.html')));
  }

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, _next) => {
    if (err?.type === 'entity.too.large') err = new HttpError(413, 'Requisição grande demais.');
    if (err?.code === 'LIMIT_FILE_SIZE') err = new HttpError(413, 'Arquivo grande demais.');
    if (err?.name === 'MulterError') err = new HttpError(400, `Upload inválido: ${err.message}`);
    if (err instanceof SyntaxError && err.status === 400) err = new HttpError(400, 'JSON inválido.');
    const status = err.status && Number.isInteger(err.status) ? err.status : 500;
    if (status >= 500 && !(err instanceof HttpError)) console.error(err);
    res.status(status).json({ error: { message: status >= 500 && !(err instanceof HttpError) ? 'Erro interno do servidor.' : err.message, code: err.code } });
  });
  return app;
}

export async function start() {
  recoverAutopilotRuns();
  const app = createApp();
  const server = http.createServer(app);
  attachMultiplayer(server);
  await new Promise((resolve) => server.listen(config.port, resolve));

  const sandboxApp = createSandboxApp();
  await mountRuntime(sandboxApp);
  const sandboxServer = http.createServer(sandboxApp);
  await new Promise((resolve) => sandboxServer.listen(config.sandboxPort, resolve));

  console.log(`NEXPLAY API:      http://localhost:${config.port}`);
  console.log(`NEXPLAY Sandbox:  ${config.sandboxOrigin} (porta ${config.sandboxPort})`);
  if (!config.ai.enabled) console.log('Aviso: NEXPLAY AI desativada (defina ANTHROPIC_API_KEY).');
  if (!mailConfigured()) console.log('Aviso: SMTP não configurado — e-mails serão exibidos neste console.');
  if (config.payments.provider !== 'stripe') console.log('Aviso: pagamentos desativados (defina STRIPE_SECRET_KEY).');
  return { server, sandboxServer };
}

if (import.meta.url === `file://${process.argv[1]}`) start();
