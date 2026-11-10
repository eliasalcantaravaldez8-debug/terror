// Catálogo, publicação, builds, mídia, avaliações, comentários, devlogs, beta e sessões de jogo.
import { Router } from 'express';
import multer from 'multer';
import fs from 'node:fs';
import path from 'node:path';
import { one, all, run, tx } from '../db/index.js';
import { config } from '../config.js';
import { HttpError, rateLimiter, slugify, randomToken } from '../lib/security.js';
import { requireAuth, publicUser } from '../lib/auth.js';
import { parse, z, text, id, httpUrl } from '../lib/validate.js';
import { saveImage, extractGameZip } from '../lib/uploads.js';
import { notify, logActivity, audit, entitlements, activePlanCode } from '../lib/services.js';
import { checkPlatformAchievements, unlockAchievement } from '../lib/rewards.js';
import { signPlayToken, sandboxBase } from '../lib/playtoken.js';
import { validateProject } from '../ai/project.js';

const r = Router();

export const GENRES = ['acao', 'aventura', 'terror', 'sobrevivencia', 'corrida', 'plataforma', 'mundo_aberto', 'futebol',
  'esportes', 'rpg', 'estrategia', 'puzzle', 'simulacao', 'tiro', 'luta', 'casual', 'musical', 'educativo', 'outro'];
export const MODES = ['solo', 'public_mp', 'private_rooms', 'coop', 'competitive', 'local'];
export const ONLINE_MODES = ['public_mp', 'private_rooms', 'coop', 'competitive'];

const zipUpload = multer({ dest: path.join(config.dataDir, 'tmp'), limits: { fileSize: config.limits.gameUploadMB * 1024 * 1024, files: 1 } });
const imgUpload = multer({ storage: multer.memoryStorage(), limits: { fileSize: config.limits.imageUploadMB * 1024 * 1024, files: 10 } });
const writeLimiter = rateLimiter({ windowMs: 60_000, max: 30, key: (req) => `gw:${req.user?.id || req.ip}` });

export function ratingOf(gameId) {
  const r2 = one('SELECT AVG(rating) AS a, COUNT(*) AS c FROM reviews WHERE game_id=? AND hidden=0', gameId);
  return { avg: r2.a ? Math.round(r2.a * 10) / 10 : null, count: Number(r2.c) };
}

/** Representação compacta de jogo para cards. */
export function gameCard(g) {
  const creator = one('SELECT id, username, display_name, avatar_url FROM users WHERE id=?', g.creator_id);
  const studio = g.studio_id ? one('SELECT slug, name, logo_url FROM studios WHERE id=?', g.studio_id) : null;
  return {
    id: g.id, slug: g.slug, title: g.title, shortDescription: g.short_description, coverUrl: g.cover_url,
    genre: g.genre, tags: JSON.parse(g.tags), ageRating: g.age_rating, platforms: g.platforms,
    modes: JSON.parse(g.modes), maxPlayers: g.max_players, priceCents: g.price_cents,
    status: g.status, releaseStage: g.release_stage, expectedRelease: g.expected_release,
    rating: ratingOf(g.id), views: g.views, publishedAt: g.published_at,
    creator: creator && { username: creator.username, displayName: creator.display_name, avatarUrl: creator.avatar_url },
    studio: studio && { slug: studio.slug, name: studio.name, logoUrl: studio.logo_url },
  };
}

function canManage(user, game) {
  if (!user) return false;
  if (user.role === 'admin') return true;
  if (game.creator_id === user.id) return true;
  if (game.studio_id) {
    const m = one('SELECT role FROM studio_members WHERE studio_id=? AND user_id=?', game.studio_id, user.id);
    return !!m && ['owner', 'admin', 'developer'].includes(m.role);
  }
  return false;
}

function loadGame(slugOrId) {
  const g = /^\d+$/.test(String(slugOrId))
    ? one('SELECT * FROM games WHERE id=?', Number(slugOrId))
    : one('SELECT * FROM games WHERE slug=?', slugOrId);
  if (!g) throw new HttpError(404, 'Jogo não encontrado.');
  return g;
}

function loadManaged(req) {
  const g = loadGame(req.params.id);
  if (!canManage(req.user, g)) throw new HttpError(403, 'Você não tem permissão para gerenciar este jogo.');
  return g;
}

const isPublic = (g) => g.status === 'published' || g.status === 'in_development';

// ───────── Catálogo ─────────
const listQuery = z.object({
  q: z.string().max(80).optional(),
  genre: z.enum(GENRES).optional(),
  device: z.enum(['pc', 'mobile']).optional(),
  price: z.enum(['free', 'paid']).optional(),
  mode: z.enum(MODES).optional(),
  multiplayer: z.enum(['1']).optional(),
  stage: z.enum(['released', 'early_access', 'beta', 'in_development', 'announced', 'upcoming']).optional(),
  sort: z.enum(['recent', 'popular', 'rating', 'title']).default('recent'),
  limit: z.coerce.number().int().min(1).max(60).default(24),
  offset: z.coerce.number().int().min(0).default(0),
});

r.get('/', (req, res) => {
  const q = parse(listQuery, req.query);
  const where = [];
  const params = [];
  if (q.stage === 'upcoming' || q.stage === 'in_development' || q.stage === 'announced') {
    where.push(`g.status = 'in_development'`);
    if (q.stage !== 'upcoming') { where.push('g.release_stage = ?'); params.push(q.stage); }
  } else {
    where.push(`g.status = 'published'`);
    if (q.stage) { where.push('g.release_stage = ?'); params.push(q.stage); }
  }
  if (q.q) { where.push('(g.title LIKE ? OR g.short_description LIKE ? OR g.tags LIKE ?)'); params.push(`%${q.q}%`, `%${q.q}%`, `%${q.q}%`); }
  if (q.genre) { where.push('g.genre = ?'); params.push(q.genre); }
  if (q.device) { where.push(`(g.platforms = ? OR g.platforms = 'both')`); params.push(q.device); }
  if (q.price === 'free') where.push('g.price_cents = 0');
  if (q.price === 'paid') where.push('g.price_cents > 0');
  if (q.mode) { where.push(`EXISTS (SELECT 1 FROM json_each(g.modes) WHERE value = ?)`); params.push(q.mode); }
  if (q.multiplayer) {
    // Somente jogos com suporte multiplayer declarado E capacidade > 1 jogador.
    where.push(`g.max_players > 1 AND EXISTS (SELECT 1 FROM json_each(g.modes) WHERE value IN ('public_mp','private_rooms','coop','competitive','local'))`);
  }
  const order = {
    recent: 'COALESCE(g.published_at, g.created_at) DESC',
    popular: '(SELECT COUNT(DISTINCT user_id) FROM play_sessions ps WHERE ps.game_id = g.id AND ps.started_at >= date(\'now\',\'-30 day\')) DESC, g.views DESC',
    rating: '(SELECT AVG(rating) FROM reviews rv WHERE rv.game_id=g.id AND rv.hidden=0) DESC NULLS LAST',
    title: 'g.title COLLATE NOCASE ASC',
  }[q.sort];
  const sqlWhere = where.join(' AND ');
  const total = Number(one(`SELECT COUNT(*) AS c FROM games g WHERE ${sqlWhere}`, ...params).c);
  const rows = all(`SELECT g.* FROM games g WHERE ${sqlWhere} ORDER BY ${order} LIMIT ? OFFSET ?`, ...params, q.limit, q.offset);
  res.json({ total, games: rows.map(gameCard) });
});

r.get('/meta', (_req, res) => res.json({ genres: GENRES, modes: MODES }));

/** Seções da página inicial (todas derivadas de dados reais; vazias se não houver jogos). */
r.get('/home', (req, res) => {
  const pub = `status = 'published'`;
  const popular = all(`SELECT g.* FROM games g WHERE ${pub} ORDER BY
    (SELECT COUNT(DISTINCT user_id) FROM play_sessions ps WHERE ps.game_id=g.id AND ps.started_at >= date('now','-14 day')) DESC, views DESC LIMIT 12`);
  const recent = all(`SELECT * FROM games WHERE ${pub} ORDER BY published_at DESC LIMIT 12`);
  const upcoming = all(`SELECT * FROM games WHERE status='in_development' ORDER BY COALESCE(expected_release,'9999') ASC LIMIT 12`);
  let recommended = [];
  if (req.user) {
    // Recomendação simples por gêneros jogados/favoritados, excluindo já jogados.
    const genres = all(`SELECT g.genre, COUNT(*) AS c FROM play_sessions ps JOIN games g ON g.id=ps.game_id WHERE ps.user_id=? GROUP BY g.genre
      UNION ALL SELECT g.genre, 3 FROM favorites f JOIN games g ON g.id=f.game_id WHERE f.user_id=?`, req.user.id, req.user.id).map((x) => x.genre);
    if (genres.length) {
      const uniq = [...new Set(genres)].slice(0, 5);
      recommended = all(`SELECT * FROM games WHERE ${pub} AND genre IN (${uniq.map(() => '?').join(',')})
        AND id NOT IN (SELECT game_id FROM play_sessions WHERE user_id=?) ORDER BY views DESC LIMIT 12`, ...uniq, req.user.id);
    }
  }
  if (!recommended.length) recommended = all(`SELECT g.* FROM games g WHERE ${pub} ORDER BY
    (SELECT AVG(rating) FROM reviews rv WHERE rv.game_id=g.id AND rv.hidden=0) DESC NULLS LAST LIMIT 12`);
  const today = new Date().toISOString().slice(0, 10);
  const pickRows = all(`SELECT p.*, g.* , p.id AS pick_id FROM picks p JOIN games g ON g.id=p.game_id
    WHERE p.active=1 AND g.status IN ('published','in_development') AND (p.starts_on IS NULL OR p.starts_on <= ?) AND (p.ends_on IS NULL OR p.ends_on >= ?)
    ORDER BY p.position, p.id DESC`, today, today);
  const pick = (kind) => pickRows.filter((p) => p.kind === kind).map((p) => ({ ...gameCard(p), headline: p.headline, recommendation: p.recommendation }));
  res.json({
    totalPublished: Number(one(`SELECT COUNT(*) AS c FROM games WHERE ${pub}`).c),
    featured: pick('featured'),
    gameOfDay: pick('game_of_day')[0] || null,
    weekly: pick('weekly'),
    nexplayChoice: pick('nexplay_choice'),
    recommended: recommended.map(gameCard),
    popular: popular.map(gameCard),
    recent: recent.map(gameCard),
    upcoming: upcoming.map(gameCard),
  });
});

r.get('/mine', requireAuth, (req, res) => {
  const rows = all(`SELECT * FROM games WHERE creator_id=? OR studio_id IN (SELECT studio_id FROM studio_members WHERE user_id=? AND role IN ('owner','admin','developer'))
    ORDER BY updated_at DESC`, req.user.id, req.user.id);
  res.json({ games: rows.map((g) => ({ ...gameCard(g), moderationNotes: g.moderation_notes })) });
});

function accessFor(user, g) {
  const owner = canManage(user, g) || user?.role === 'moderator';
  const owned = user ? !!one('SELECT 1 FROM library WHERE user_id=? AND game_id=?', user.id, g.id) : false;
  const beta = user ? one('SELECT status FROM beta_access WHERE game_id=? AND user_id=?', g.id, user.id) : null;
  let canPlay = false;
  let reason = null;
  const hasBuild = !!g.current_version_id;
  if (owner) canPlay = !!one('SELECT 1 FROM game_versions WHERE game_id=?', g.id);
  else if (!hasBuild) reason = 'no_build';
  else if (g.status === 'published') {
    canPlay = g.price_cents === 0 || owned;
    if (!canPlay) reason = 'purchase_required';
  } else if (g.status === 'in_development') {
    if (g.beta_mode === 'open') canPlay = !!user;
    else if (g.beta_mode === 'closed') canPlay = beta?.status === 'granted';
    if (!canPlay) reason = user ? 'beta_required' : 'login_required';
  }
  return { canPlay, reason, owned, isManager: canManage(user, g), betaStatus: beta?.status || null };
}

r.get('/:id', (req, res) => {
  const g = loadGame(req.params.id);
  const manager = canManage(req.user, g) || ['admin', 'moderator'].includes(req.user?.role);
  if (!isPublic(g) && !manager) throw new HttpError(404, 'Jogo não encontrado.');
  run('UPDATE games SET views = views + 1 WHERE id=?', g.id);
  const versions = all(`SELECT id, version, changelog, build_kind, size_bytes, scan_status, review_status, created_at, download_file IS NOT NULL AS has_download
    FROM game_versions WHERE game_id=? ${manager ? '' : `AND review_status='approved'`} ORDER BY id DESC`, g.id);
  res.json({
    game: {
      ...gameCard(g),
      description: g.description, controls: g.controls, acceptsCredits: !!g.accepts_credits, acceptsDonations: !!g.accepts_donations,
      betaMode: g.beta_mode, buildKind: g.build_kind, downloadEnabled: !!g.download_enabled,
      moderationNotes: manager ? g.moderation_notes : undefined, rightsConfirmed: manager ? !!g.rights_confirmed : undefined,
      studioProjectId: manager ? g.studio_project_id : undefined,
      currentVersionId: g.current_version_id,
    },
    media: all('SELECT id, kind, url FROM game_media WHERE game_id=? ORDER BY position, id', g.id),
    versions: versions.map((v) => ({ ...v, has_download: !!v.has_download, scan_report: undefined })),
    updates: all(`SELECT u.*, us.username, us.display_name FROM game_updates u JOIN users us ON us.id=u.author_id WHERE game_id=? ORDER BY u.id DESC LIMIT 30`, g.id),
    achievements: all('SELECT code, name, description, icon, rarity FROM achievements WHERE game_id=?', g.id),
    access: accessFor(req.user, g),
    viewer: req.user ? {
      wishlisted: !!one('SELECT 1 FROM wishlist WHERE user_id=? AND game_id=?', req.user.id, g.id),
      favorited: !!one('SELECT 1 FROM favorites WHERE user_id=? AND game_id=?', req.user.id, g.id),
      following: !!one('SELECT 1 FROM game_follows WHERE user_id=? AND game_id=?', req.user.id, g.id),
      review: one('SELECT rating, body FROM reviews WHERE user_id=? AND game_id=?', req.user.id, g.id) || null,
    } : null,
    followers: Number(one('SELECT COUNT(*) AS c FROM game_follows WHERE game_id=?', g.id).c),
  });
});

// ───────── Criação e edição ─────────
const gameFields = z.object({
  title: text(80).pipe(z.string().min(2, 'Título muito curto.')),
  shortDescription: text(200).default(''),
  description: text(20000).default(''),
  genre: z.enum(GENRES),
  tags: z.array(text(24)).max(10).default([]),
  ageRating: z.enum(['L', '10', '12', '14', '16', '18']),
  platforms: z.enum(['pc', 'mobile', 'both']),
  controls: text(2000).default(''),
  modes: z.array(z.enum(MODES)).min(1).max(6).default(['solo']),
  maxPlayers: z.coerce.number().int().min(1).max(256).default(1),
  priceCents: z.coerce.number().int().min(0).max(100000).default(0),
  acceptsCredits: z.boolean().default(true),
  acceptsDonations: z.boolean().default(false),
  releaseStage: z.enum(['announced', 'in_development', 'early_access', 'beta', 'released']).default('released'),
  expectedRelease: z.string().regex(/^\d{4}-\d{2}(-\d{2})?$/).nullable().optional(),
  betaMode: z.enum(['none', 'open', 'closed']).default('closed'),
  studioId: id.nullable().optional(),
  rightsConfirmed: z.boolean().default(false),
});

function checkModes(b) {
  const online = b.modes.some((m) => ONLINE_MODES.includes(m) || m === 'local');
  if (online && b.maxPlayers < 2) throw new HttpError(400, 'Jogos multiplayer precisam permitir pelo menos 2 jogadores.');
  if (!online && b.maxPlayers > 1) throw new HttpError(400, 'Defina um modo multiplayer para permitir mais de 1 jogador.');
}

function checkStudio(user, studioId) {
  if (!studioId) return null;
  const m = one('SELECT role FROM studio_members WHERE studio_id=? AND user_id=?', studioId, user.id);
  if (!m || !['owner', 'admin', 'developer'].includes(m.role)) throw new HttpError(403, 'Você não pode publicar por este estúdio.');
  return studioId;
}

r.post('/', requireAuth, writeLimiter, (req, res) => {
  const b = parse(gameFields, req.body);
  checkModes(b);
  const studioId = checkStudio(req.user, b.studioId);
  let slug = slugify(b.title);
  if (one('SELECT 1 FROM games WHERE slug=?', slug)) slug = `${slug}-${randomToken(3).toLowerCase().replace(/[^a-z0-9]/g, 'x')}`;
  const g = run(`INSERT INTO games(slug,title,short_description,description,creator_id,studio_id,genre,tags,age_rating,platforms,controls,modes,max_players,
    price_cents,accepts_credits,accepts_donations,release_stage,expected_release,beta_mode,rights_confirmed)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
  slug, b.title, b.shortDescription, b.description, req.user.id, studioId, b.genre, JSON.stringify(b.tags), b.ageRating, b.platforms,
  b.controls, JSON.stringify(b.modes), b.maxPlayers, b.priceCents, b.acceptsCredits ? 1 : 0, b.acceptsDonations ? 1 : 0,
  b.releaseStage, b.expectedRelease ?? null, b.betaMode, b.rightsConfirmed ? 1 : 0);
  res.status(201).json({ game: gameCard(one('SELECT * FROM games WHERE id=?', g.lastInsertRowid)) });
});

r.patch('/:id', requireAuth, writeLimiter, (req, res) => {
  const g = loadManaged(req);
  const b = parse(gameFields.partial(), req.body);
  const merged = { modes: JSON.parse(g.modes), maxPlayers: g.max_players, ...b };
  checkModes(merged);
  if (b.studioId !== undefined) checkStudio(req.user, b.studioId);
  const map = {
    title: 'title', shortDescription: 'short_description', description: 'description', genre: 'genre', ageRating: 'age_rating',
    platforms: 'platforms', controls: 'controls', maxPlayers: 'max_players', priceCents: 'price_cents', releaseStage: 'release_stage',
    expectedRelease: 'expected_release', betaMode: 'beta_mode', studioId: 'studio_id',
  };
  const sets = [];
  const vals = [];
  for (const [k, col] of Object.entries(map)) if (b[k] !== undefined) { sets.push(`${col}=?`); vals.push(b[k]); }
  for (const [k, col] of [['tags', 'tags'], ['modes', 'modes']]) if (b[k]) { sets.push(`${col}=?`); vals.push(JSON.stringify(b[k])); }
  for (const [k, col] of [['acceptsCredits', 'accepts_credits'], ['acceptsDonations', 'accepts_donations'], ['rightsConfirmed', 'rights_confirmed']]) {
    if (b[k] !== undefined) { sets.push(`${col}=?`); vals.push(b[k] ? 1 : 0); }
  }
  // Mudanças significativas em jogo publicado (preço/classificação) são registradas.
  if (g.status === 'published' && (b.ageRating || b.priceCents !== undefined)) audit(req, 'game.sensitive_edit', 'game', g.id, b);
  if (sets.length) run(`UPDATE games SET ${sets.join(', ')}, updated_at=? WHERE id=?`, ...vals, new Date().toISOString(), g.id);
  res.json({ game: gameCard(one('SELECT * FROM games WHERE id=?', g.id)) });
});

r.delete('/:id', requireAuth, (req, res) => {
  const g = loadManaged(req);
  if (g.status === 'published' && one('SELECT 1 FROM library WHERE game_id=? AND source IN (\'purchase\',\'credits\')', g.id)) {
    // Jogos vendidos não são apagados: são retirados da loja, mantendo acesso a quem comprou.
    run(`UPDATE games SET status='removed', updated_at=? WHERE id=?`, new Date().toISOString(), g.id);
  } else {
    run('DELETE FROM games WHERE id=?', g.id);
    fs.rmSync(path.join(config.dataDir, 'games', String(g.id)), { recursive: true, force: true });
  }
  audit(req, 'game.delete', 'game', g.id);
  res.json({ ok: true });
});

// ───────── Mídia ─────────
r.post('/:id/cover', requireAuth, imgUpload.single('file'), (req, res) => {
  const g = loadManaged(req);
  if (!req.file) throw new HttpError(400, 'Envie uma imagem.');
  const url = saveImage(req.file.buffer);
  run('UPDATE games SET cover_url=?, updated_at=? WHERE id=?', url, new Date().toISOString(), g.id);
  res.json({ url });
});

r.post('/:id/media', requireAuth, imgUpload.array('files', 10), (req, res) => {
  const g = loadManaged(req);
  const count = Number(one('SELECT COUNT(*) AS c FROM game_media WHERE game_id=?', g.id).c);
  if (count + (req.files?.length || 0) > 20) throw new HttpError(400, 'Máximo de 20 mídias por jogo.');
  const added = [];
  for (const f of req.files || []) {
    const url = saveImage(f.buffer);
    added.push({ id: run(`INSERT INTO game_media(game_id, kind, url, position) VALUES (?,?,?,?)`, g.id, 'image', url, count + added.length).lastInsertRowid, kind: 'image', url });
  }
  if (req.body?.videoUrl) {
    const url = parse(httpUrl, req.body.videoUrl);
    const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/);
    const vimeo = url.match(/vimeo\.com\/(\d+)/);
    if (!yt && !vimeo) throw new HttpError(400, 'Vídeos: use links do YouTube ou Vimeo.');
    const embed = yt ? `https://www.youtube-nocookie.com/embed/${yt[1]}` : `https://player.vimeo.com/video/${vimeo[1]}`;
    added.push({ id: run(`INSERT INTO game_media(game_id, kind, url, position) VALUES (?,?,?,?)`, g.id, 'video_embed', embed, count + added.length).lastInsertRowid, kind: 'video_embed', url: embed });
  }
  res.status(201).json({ media: added });
});

r.delete('/:id/media/:mediaId', requireAuth, (req, res) => {
  const g = loadManaged(req);
  run('DELETE FROM game_media WHERE id=? AND game_id=?', parse(id, req.params.mediaId), g.id);
  res.json({ ok: true });
});

// ───────── Builds / versões ─────────
const versionFields = z.object({
  version: z.string().trim().regex(/^[0-9A-Za-z.\-+]{1,20}$/, 'Versão inválida (ex.: 1.0.0).'),
  changelog: text(5000).default(''),
  downloadable: z.union([z.boolean(), z.enum(['true', 'false'])]).transform((v) => v === true || v === 'true').default(false),
});

function nextVersionDir(gameId) {
  const key = `${gameId}/${Date.now()}-${randomToken(4).replace(/[^a-zA-Z0-9]/g, '')}`;
  return key;
}

r.post('/:id/versions', requireAuth, zipUpload.single('file'), (req, res) => {
  const g = loadManaged(req);
  const cleanup = () => req.file && fs.rmSync(req.file.path, { force: true });
  try {
    const b = parse(versionFields, req.body);
    if (!req.file) throw new HttpError(400, 'Envie o build do jogo em .zip.');
    if (!/\.zip$/i.test(req.file.originalname)) throw new HttpError(400, 'O build precisa ser um arquivo .zip.');
    if (one('SELECT 1 FROM game_versions WHERE game_id=? AND version=?', g.id, b.version)) throw new HttpError(409, 'Esta versão já existe.');
    const key = nextVersionDir(g.id);
    const result = extractGameZip(req.file.path, key);
    let downloadFile = null;
    if (b.downloadable) {
      downloadFile = `${key}.zip`;
      fs.copyFileSync(req.file.path, path.join(config.dataDir, 'games', downloadFile));
    }
    if (result.scanStatus === 'failed') {
      fs.rmSync(path.join(config.dataDir, 'games', key), { recursive: true, force: true });
      if (downloadFile) fs.rmSync(path.join(config.dataDir, 'games', downloadFile), { force: true });
      run(`INSERT INTO game_versions(game_id, version, changelog, build_kind, size_bytes, file_count, scan_status, scan_report, review_status)
        VALUES (?,?,?,?,?,?,?,?,?)`, g.id, b.version, b.changelog, 'html5', result.sizeBytes, result.fileCount, 'failed', JSON.stringify(result.report), 'rejected');
      throw new HttpError(422, 'O build foi bloqueado pela verificação automática de segurança.', 'scan_failed');
    }
    const v = run(`INSERT INTO game_versions(game_id, version, changelog, build_kind, storage_key, entry_file, download_file, size_bytes, file_count, scan_status, scan_report)
      VALUES (?,?,?,?,?,?,?,?,?,?,?)`, g.id, b.version, b.changelog, 'html5', key, result.entry, downloadFile, result.sizeBytes, result.fileCount,
    result.scanStatus, JSON.stringify(result.report));
    run(`UPDATE games SET build_kind='html5', download_enabled=?, updated_at=? WHERE id=?`, b.downloadable ? 1 : g.download_enabled, new Date().toISOString(), g.id);
    queueReviewIfLive(g, v.lastInsertRowid);
    res.status(201).json({ versionId: v.lastInsertRowid, scan: { status: result.scanStatus, findings: result.report.findings }, fileCount: result.fileCount });
  } finally {
    cleanup();
  }
});

/** Publica um projeto do NEXPLAY STUDIO como build do jogo. */
r.post('/:id/versions/from-project', requireAuth, (req, res) => {
  const g = loadManaged(req);
  const b = parse(versionFields.extend({ projectId: id }), req.body);
  const p = one('SELECT * FROM projects WHERE id=?', b.projectId);
  if (!p || (p.owner_id !== req.user.id && req.user.role !== 'admin')) throw new HttpError(403, 'Projeto não encontrado ou sem permissão.');
  if (one('SELECT 1 FROM game_versions WHERE game_id=? AND version=?', g.id, b.version)) throw new HttpError(409, 'Esta versão já existe.');
  const doc = JSON.parse(p.data);
  const report = validateProject(doc);
  if (report.errors.length) throw new HttpError(422, `O projeto tem erros que impedem a publicação: ${report.errors.slice(0, 3).join('; ')}`, 'project_invalid');
  const key = nextVersionDir(g.id);
  const dir = path.join(config.dataDir, 'games', key);
  fs.mkdirSync(dir, { recursive: true });
  // Copia os assets referenciados pelo projeto para dentro do build (o build é imutável).
  const assets = all('SELECT * FROM project_assets WHERE project_id=?', p.id);
  fs.mkdirSync(path.join(dir, 'assets'), { recursive: true });
  for (const a of assets) fs.copyFileSync(path.join(config.dataDir, 'assets', a.storage_key), path.join(dir, 'assets', a.storage_key));
  fs.writeFileSync(path.join(dir, 'project.json'), JSON.stringify(doc));
  const size = Buffer.byteLength(p.data) + assets.reduce((s, a) => s + a.size_bytes, 0);
  const v = run(`INSERT INTO game_versions(game_id, version, changelog, build_kind, storage_key, entry_file, size_bytes, file_count, scan_status, scan_report)
    VALUES (?,?,?,?,?,?,?,?,?,?)`, g.id, b.version, b.changelog, 'studio', key, 'project.json', size, assets.length + 1,
  report.warnings.length ? 'flagged' : 'passed', JSON.stringify({ findings: report.warnings.map((w) => ({ rule: 'project_warning', severity: 'low', file: w })) }));
  run(`UPDATE games SET build_kind='studio', studio_project_id=?, updated_at=? WHERE id=?`, p.id, new Date().toISOString(), g.id);
  queueReviewIfLive(g, v.lastInsertRowid);
  res.status(201).json({ versionId: v.lastInsertRowid, validation: report });
});

function queueReviewIfLive(g, versionId) {
  if (g.status === 'published' || g.status === 'in_development') {
    for (const mod of all(`SELECT id FROM users WHERE role IN ('admin','moderator')`)) {
      notify(mod.id, 'moderation', `Nova versão para revisão: ${g.title}`, `Versão #${versionId}`, '/admin/moderacao');
    }
  }
}

r.post('/:id/submit', requireAuth, (req, res) => {
  const g = loadManaged(req);
  if (!['draft', 'rejected'].includes(g.status)) throw new HttpError(400, 'Este jogo já foi enviado ou publicado.');
  const problems = [];
  if (!g.rights_confirmed) problems.push('Confirme que você criou o jogo ou tem autorização para distribuí-lo.');
  if (!g.cover_url) problems.push('Envie uma capa.');
  if (g.description.length < 50) problems.push('Escreva uma descrição com pelo menos 50 caracteres.');
  const showcase = ['announced', 'in_development'].includes(g.release_stage);
  const hasVersion = !!one(`SELECT 1 FROM game_versions WHERE game_id=? AND scan_status <> 'failed'`, g.id);
  if (!showcase && !hasVersion) problems.push('Envie pelo menos um build jogável.');
  const plan = entitlements(g.creator_id);
  const published = Number(one(`SELECT COUNT(*) AS c FROM games WHERE creator_id=? AND status IN ('published','pending_review','in_development')`, g.creator_id).c);
  if (published >= plan.max_published_games) problems.push(`Limite de ${plan.max_published_games} jogos publicados no plano ${plan.name}.`);
  if (problems.length) throw new HttpError(400, problems.join(' '), 'submit_incomplete');
  run(`UPDATE games SET status='pending_review', moderation_notes=NULL, updated_at=? WHERE id=?`, new Date().toISOString(), g.id);
  for (const mod of all(`SELECT id FROM users WHERE role IN ('admin','moderator')`)) {
    notify(mod.id, 'moderation', `Jogo aguardando revisão: ${g.title}`, '', '/admin/moderacao');
  }
  res.json({ ok: true, status: 'pending_review' });
});

// ───────── Jogar ─────────
r.post('/:id/play', requireAuth, (req, res) => {
  const g = loadGame(req.params.id);
  const access = accessFor(req.user, g);
  if (!access.canPlay) throw new HttpError(403, {
    purchase_required: 'Adquira o jogo para jogar.', beta_required: 'Este jogo está em teste fechado. Solicite acesso ao beta.',
    no_build: 'Este jogo ainda não tem build disponível.', login_required: 'Faça login para jogar.',
  }[access.reason] || 'Acesso negado.', access.reason);
  // Gerentes podem testar a versão mais recente; jogadores recebem a versão aprovada.
  const v = access.isManager && req.body?.versionId
    ? one('SELECT * FROM game_versions WHERE id=? AND game_id=?', Number(req.body.versionId), g.id)
    : access.isManager && !g.current_version_id
      ? one(`SELECT * FROM game_versions WHERE game_id=? AND scan_status <> 'failed' ORDER BY id DESC LIMIT 1`, g.id)
      : one('SELECT * FROM game_versions WHERE id=?', g.current_version_id);
  if (!v || v.scan_status === 'failed') throw new HttpError(404, 'Build indisponível.');
  const token = signPlayToken({ versionId: v.id, userId: req.user.id });
  const base = sandboxBase(g.id);
  const url = v.build_kind === 'studio'
    ? `${base}/runtime/player.html#${token}`
    : `${base}/p/${token}/${v.entry_file.split('/').map(encodeURIComponent).join('/')}`;
  const sessionId = randomToken(16);
  tx(() => {
    run('INSERT INTO play_sessions(id, user_id, game_id) VALUES (?,?,?)', sessionId, req.user.id, g.id);
    if (g.price_cents === 0 && g.status === 'published') run(`INSERT OR IGNORE INTO library(user_id, game_id, source) VALUES (?,?, 'free')`, req.user.id, g.id);
  });
  const recent = one(`SELECT 1 FROM activities WHERE user_id=? AND game_id=? AND type='played' AND created_at >= ?`, req.user.id, g.id, new Date(Date.now() - 6 * 3600_000).toISOString());
  if (!recent) logActivity(req.user.id, 'played', g.id);
  res.json({ url, sandboxOrigin: new URL(base).origin, sessionId, versionId: v.id, buildKind: v.build_kind });
});

/**
 * Heartbeat de sessão de jogo. Conta tempo ATIVO apenas se a aba estiver visível,
 * com intervalo mínimo e máximo entre batimentos, e teto diário — base dos desafios de NC.
 */
const hbLimiter = rateLimiter({ windowMs: 60_000, max: 10, key: (req) => `hb:${req.user?.id}` });
r.post('/sessions/:sessionId/heartbeat', requireAuth, hbLimiter, (req, res) => {
  const s = one('SELECT * FROM play_sessions WHERE id=? AND user_id=?', String(req.params.sessionId), req.user.id);
  if (!s) throw new HttpError(404, 'Sessão não encontrada.');
  const visible = req.body?.visible === true;
  const now = Date.now();
  const elapsed = (now - Date.parse(s.last_heartbeat_at)) / 1000;
  let add = 0;
  // Só a sessão mais recente do usuário conta (impede várias abas somando tempo).
  const latest = one('SELECT id FROM play_sessions WHERE user_id=? ORDER BY started_at DESC LIMIT 1', req.user.id);
  const dayStart = new Date().toISOString().slice(0, 10);
  const today = Number(one('SELECT COALESCE(SUM(active_seconds),0) AS s FROM play_sessions WHERE user_id=? AND started_at >= ?', req.user.id, dayStart).s);
  if (visible && latest?.id === s.id && elapsed >= 20 && today < 8 * 3600) add = Math.min(Math.floor(elapsed), 45);
  run('UPDATE play_sessions SET last_heartbeat_at=?, active_seconds=active_seconds+? WHERE id=?', new Date(now).toISOString(), add, s.id);
  if (add) checkPlatformAchievements(req.user.id);
  res.json({ counted: add });
});

r.get('/:id/download/:versionId', requireAuth, (req, res) => {
  const g = loadGame(req.params.id);
  const access = accessFor(req.user, g);
  if (!access.canPlay) throw new HttpError(403, 'Acesso negado.');
  const v = one(`SELECT * FROM game_versions WHERE id=? AND game_id=? AND download_file IS NOT NULL`, parse(id, req.params.versionId), g.id);
  if (!v || (!access.isManager && v.review_status !== 'approved')) throw new HttpError(404, 'Download indisponível.');
  res.download(path.join(config.dataDir, 'games', v.download_file), `${g.slug}-${v.version}.zip`);
});

// ───────── Avaliações ─────────
r.get('/:id/reviews', (req, res) => {
  const g = loadGame(req.params.id);
  const rows = all(`SELECT r.*, u.username, u.display_name, u.avatar_url FROM reviews r JOIN users u ON u.id=r.user_id
    WHERE r.game_id=? AND r.hidden=0 ORDER BY r.created_at DESC LIMIT 100`, g.id);
  res.json({ rating: ratingOf(g.id), reviews: rows.map((x) => ({ id: x.id, rating: x.rating, body: x.body, createdAt: x.created_at,
    user: { username: x.username, displayName: x.display_name, avatarUrl: x.avatar_url } })) });
});

r.post('/:id/reviews', requireAuth, writeLimiter, (req, res) => {
  const g = loadGame(req.params.id);
  if (g.status !== 'published') throw new HttpError(400, 'Só é possível avaliar jogos publicados.');
  if (g.creator_id === req.user.id) throw new HttpError(400, 'Você não pode avaliar seu próprio jogo.');
  const played = Number(one('SELECT COALESCE(SUM(active_seconds),0) AS s FROM play_sessions WHERE user_id=? AND game_id=?', req.user.id, g.id).s);
  if (played < 300) throw new HttpError(400, 'Jogue pelo menos 5 minutos antes de avaliar.', 'play_required');
  const b = parse(z.object({ rating: z.coerce.number().int().min(1).max(5), body: text(4000).default('') }), req.body);
  const existing = one('SELECT id FROM reviews WHERE game_id=? AND user_id=?', g.id, req.user.id);
  if (existing) run('UPDATE reviews SET rating=?, body=? WHERE id=?', b.rating, b.body, existing.id);
  else {
    run('INSERT INTO reviews(game_id, user_id, rating, body) VALUES (?,?,?,?)', g.id, req.user.id, b.rating, b.body);
    logActivity(req.user.id, 'reviewed', g.id, { rating: b.rating });
    notify(g.creator_id, 'review', `Nova avaliação em ${g.title}`, `${req.user.display_name}: ${'★'.repeat(b.rating)}`, `/jogo/${g.slug}`);
  }
  checkPlatformAchievements(req.user.id);
  res.json({ ok: true, rating: ratingOf(g.id) });
});

// ───────── Comentários (jogos e devlogs) ─────────
export function commentsFor(type, targetId) {
  return all(`SELECT c.*, u.username, u.display_name, u.avatar_url FROM comments c JOIN users u ON u.id=c.user_id
    WHERE c.target_type=? AND c.target_id=? AND c.hidden=0 ORDER BY c.id ASC LIMIT 300`, type, targetId)
    .map((c) => ({ id: c.id, parentId: c.parent_id, body: c.body, createdAt: c.created_at,
      user: { username: c.username, displayName: c.display_name, avatarUrl: c.avatar_url } }));
}

export function addComment(req, type, targetId, ownerId, link) {
  const b = parse(z.object({ body: text(2000).pipe(z.string().min(1, 'Comentário vazio.')), parentId: id.nullable().optional() }), req.body);
  if (b.parentId && !one('SELECT 1 FROM comments WHERE id=? AND target_type=? AND target_id=?', b.parentId, type, targetId)) {
    throw new HttpError(400, 'Comentário pai inválido.');
  }
  const c = run('INSERT INTO comments(target_type, target_id, user_id, parent_id, body) VALUES (?,?,?,?,?)', type, targetId, req.user.id, b.parentId ?? null, b.body);
  if (ownerId && ownerId !== req.user.id) notify(ownerId, 'comment', `${req.user.display_name} comentou`, b.body.slice(0, 120), link);
  return c.lastInsertRowid;
}

r.get('/:id/comments', (req, res) => {
  const g = loadGame(req.params.id);
  res.json({ comments: commentsFor('game', g.id) });
});
r.post('/:id/comments', requireAuth, writeLimiter, (req, res) => {
  const g = loadGame(req.params.id);
  if (!isPublic(g)) throw new HttpError(404, 'Jogo não encontrado.');
  res.status(201).json({ id: addComment(req, 'game', g.id, g.creator_id, `/jogo/${g.slug}`) });
});

// ───────── Devlogs / novidades (LANÇAMENTOS) ─────────
r.post('/:id/updates', requireAuth, imgUpload.single('image'), (req, res) => {
  const g = loadManaged(req);
  const b = parse(z.object({ kind: z.enum(['devlog', 'news', 'patch']).default('devlog'), title: text(120).pipe(z.string().min(2)), body: text(20000).pipe(z.string().min(10)) }), req.body);
  const media = req.file ? saveImage(req.file.buffer) : null;
  const u = run('INSERT INTO game_updates(game_id, author_id, kind, title, body, media_url) VALUES (?,?,?,?,?,?)', g.id, req.user.id, b.kind, b.title, b.body, media);
  if (isPublic(g)) {
    for (const f of all('SELECT user_id FROM game_follows WHERE game_id=? UNION SELECT user_id FROM wishlist WHERE game_id=?', g.id, g.id)) {
      notify(f.user_id, 'game_update', `${g.title}: ${b.title}`, '', `/jogo/${g.slug}`);
    }
    logActivity(req.user.id, 'devlog', g.id, { title: b.title });
  }
  res.status(201).json({ id: u.lastInsertRowid });
});

r.get('/updates/:updateId/comments', (req, res) => res.json({ comments: commentsFor('update', parse(id, req.params.updateId)) }));
r.post('/updates/:updateId/comments', requireAuth, writeLimiter, (req, res) => {
  const u = one('SELECT u.*, g.slug, g.status FROM game_updates u JOIN games g ON g.id=u.game_id WHERE u.id=?', parse(id, req.params.updateId));
  if (!u || !isPublic(u)) throw new HttpError(404, 'Atualização não encontrada.');
  res.status(201).json({ id: addComment(req, 'update', u.id, u.author_id, `/jogo/${u.slug}`) });
});

r.post('/:id/follow', requireAuth, (req, res) => {
  const g = loadGame(req.params.id);
  if (!isPublic(g)) throw new HttpError(404, 'Jogo não encontrado.');
  const on = req.body?.follow !== false;
  if (on) run('INSERT OR IGNORE INTO game_follows(user_id, game_id) VALUES (?,?)', req.user.id, g.id);
  else run('DELETE FROM game_follows WHERE user_id=? AND game_id=?', req.user.id, g.id);
  res.json({ following: on });
});

// ───────── Beta / acesso antecipado ─────────
r.post('/:id/beta/request', requireAuth, (req, res) => {
  const g = loadGame(req.params.id);
  if (g.status !== 'in_development' || g.beta_mode !== 'closed') throw new HttpError(400, 'Este jogo não tem beta fechado.');
  run(`INSERT OR IGNORE INTO beta_access(game_id, user_id) VALUES (?,?)`, g.id, req.user.id);
  notify(g.creator_id, 'beta', `${req.user.display_name} pediu acesso ao beta de ${g.title}`, '', `/criador/jogos/${g.id}`);
  res.json({ status: 'requested' });
});

r.get('/:id/beta', requireAuth, (req, res) => {
  const g = loadManaged(req);
  res.json({ testers: all(`SELECT b.status, b.created_at, u.* FROM beta_access b JOIN users u ON u.id=b.user_id WHERE b.game_id=? ORDER BY b.created_at DESC`, g.id)
    .map((x) => ({ ...publicUser(x), status: x.status, requestedAt: x.created_at })) });
});

r.post('/:id/beta/:username', requireAuth, (req, res) => {
  const g = loadManaged(req);
  const u = one('SELECT * FROM users WHERE username=?', req.params.username);
  if (!u) throw new HttpError(404, 'Usuário não encontrado.');
  const { status } = parse(z.object({ status: z.enum(['granted', 'denied']) }), req.body);
  run(`INSERT INTO beta_access(game_id, user_id, status) VALUES (?,?,?) ON CONFLICT(game_id, user_id) DO UPDATE SET status=excluded.status`, g.id, u.id, status);
  if (status === 'granted') notify(u.id, 'beta', `Você recebeu acesso ao beta de ${g.title}!`, '', `/jogo/${g.slug}`);
  res.json({ ok: true });
});

// ───────── Conquistas próprias do jogo (definidas pelo criador, sem NC) ─────────
r.post('/:id/achievements', requireAuth, (req, res) => {
  const g = loadManaged(req);
  const b = parse(z.object({ code: z.string().regex(/^[a-z0-9_]{2,40}$/), name: text(60).pipe(z.string().min(2)), description: text(200), rarity: z.enum(['common', 'rare', 'epic', 'legendary']).default('common') }), req.body);
  if (Number(one('SELECT COUNT(*) AS c FROM achievements WHERE game_id=?', g.id).c) >= 100) throw new HttpError(400, 'Limite de 100 conquistas por jogo.');
  // NC nunca vem de conquistas definidas por criadores (evita fraude no REWARDS).
  run('INSERT INTO achievements(code, game_id, name, description, rarity, nc_reward) VALUES (?,?,?,?,?,0)', `g${g.id}_${b.code}`, g.id, b.name, b.description, b.rarity);
  res.status(201).json({ ok: true });
});

/** Chamado pela página de jogo quando o SDK do jogo informa uma conquista. */
r.post('/:id/achievements/:code/unlock', requireAuth, rateLimiter({ windowMs: 60_000, max: 20, key: (req) => `ach:${req.user?.id}` }), (req, res) => {
  const g = loadGame(req.params.id);
  const session = one('SELECT 1 FROM play_sessions WHERE user_id=? AND game_id=? AND last_heartbeat_at >= ?', req.user.id, g.id, new Date(Date.now() - 10 * 60_000).toISOString());
  if (!session) throw new HttpError(400, 'Nenhuma sessão de jogo ativa.');
  const ok = unlockAchievement(req.user.id, `g${g.id}_${String(req.params.code).slice(0, 40)}`);
  res.json({ unlocked: ok });
});

// ───────── Painel do criador ─────────
r.get('/:id/analytics', requireAuth, (req, res) => {
  const g = loadManaged(req);
  const since = new Date(Date.now() - 30 * 864e5).toISOString();
  const advanced = entitlements(req.user.id).features.includes('advanced_stats');
  const daily = all(`SELECT substr(started_at,1,10) AS day, COUNT(DISTINCT user_id) AS players, SUM(active_seconds) AS secs
    FROM play_sessions WHERE game_id=? AND started_at >= ? GROUP BY day ORDER BY day`, g.id, since);
  const revenue = one(`SELECT COALESCE(SUM(e.gross_cents),0) AS gross, COALESCE(SUM(e.net_cents),0) AS net, COUNT(*) AS sales FROM creator_earnings e
    JOIN orders o ON o.id=e.order_id WHERE o.game_id=? AND o.kind='game' AND e.status <> 'reversed'`, g.id);
  const donations = one(`SELECT COALESCE(SUM(e.net_cents),0) AS net, COUNT(*) AS c FROM creator_earnings e JOIN orders o ON o.id=e.order_id WHERE o.game_id=? AND o.kind='donation'`, g.id);
  res.json({
    views: g.views,
    totalPlayers: Number(one('SELECT COUNT(DISTINCT user_id) AS c FROM play_sessions WHERE game_id=?', g.id).c),
    totalPlayMinutes: Math.round(Number(one('SELECT COALESCE(SUM(active_seconds),0) AS s FROM play_sessions WHERE game_id=?', g.id).s) / 60),
    rating: ratingOf(g.id),
    wishlists: Number(one('SELECT COUNT(*) AS c FROM wishlist WHERE game_id=?', g.id).c),
    followers: Number(one('SELECT COUNT(*) AS c FROM game_follows WHERE game_id=?', g.id).c),
    revenue: { grossCents: Number(revenue.gross), netCents: Number(revenue.net), sales: Number(revenue.sales), donationsNetCents: Number(donations.net), donations: Number(donations.c) },
    daily: daily.map((d) => ({ day: d.day, players: Number(d.players), minutes: Math.round(Number(d.secs) / 60) })),
    advanced: advanced ? {
      avgSessionMinutes: Math.round(Number(one('SELECT COALESCE(AVG(active_seconds),0) AS a FROM play_sessions WHERE game_id=? AND active_seconds > 0', g.id).a) / 6) / 10,
      returningPlayers: all('SELECT user_id FROM play_sessions WHERE game_id=? GROUP BY user_id HAVING COUNT(DISTINCT substr(started_at,1,10)) > 1', g.id).length,
      ratingDistribution: all('SELECT rating, COUNT(*) AS c FROM reviews WHERE game_id=? AND hidden=0 GROUP BY rating', g.id),
    } : null,
    plan: activePlanCode(req.user.id),
  });
});

export default r;
