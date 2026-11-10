// MULTIPLAYER: salas públicas/privadas, códigos, convites e relay em tempo real (WebSocket).
// A plataforma fornece a infraestrutura; o jogo precisa implementar a lógica via NEXPLAY SDK.
import { Router } from 'express';
import { WebSocketServer } from 'ws';
import { one, all, run } from '../db/index.js';
import { HttpError, randomCode, randomToken, rateLimiter, sha256 } from '../lib/security.js';
import { requireAuth, publicUser, SESSION_COOKIE } from '../lib/auth.js';
import { parse, z, id } from '../lib/validate.js';
import { areFriends, notify } from '../lib/services.js';
import { gameCard } from './games.js';

const r = Router();
const limiter = rateLimiter({ windowMs: 60_000, max: 30, key: (req) => `mp:${req.user?.id}` });
const live = new Map(); // roomId → Map(userId → ws)

function loadMpGame(gid) {
  const g = one(`SELECT * FROM games WHERE id=? AND status IN ('published','in_development')`, gid);
  if (!g) throw new HttpError(404, 'Jogo não encontrado.');
  const modes = JSON.parse(g.modes);
  return { g, modes };
}

const roomView = (room) => ({
  id: room.id, gameId: room.game_id, visibility: room.visibility, mode: room.mode, code: undefined, maxPlayers: room.max_players, status: room.status,
  players: live.get(room.id)?.size || 0, host: publicUser(one('SELECT * FROM users WHERE id=?', room.host_id)), createdAt: room.created_at,
});

r.get('/games', (_req, res) => {
  res.json({ games: all(`SELECT * FROM games WHERE status='published' AND max_players > 1 AND EXISTS (SELECT 1 FROM json_each(modes) WHERE value IN ('public_mp','private_rooms','coop','competitive','local')) ORDER BY published_at DESC LIMIT 60`)
    .map((g) => ({ ...gameCard(g), openRooms: Number(one(`SELECT COUNT(*) AS c FROM rooms WHERE game_id=? AND visibility='public' AND status='open'`, g.id).c) })) });
});

r.get('/games/:id/rooms', (req, res) => {
  const { g } = loadMpGame(parse(id, req.params.id));
  const rooms = all(`SELECT * FROM rooms WHERE game_id=? AND visibility='public' AND status='open' ORDER BY created_at DESC LIMIT 50`, g.id);
  res.json({ rooms: rooms.map(roomView).filter((x) => x.players > 0 && x.players < x.maxPlayers) });
});

r.post('/games/:id/rooms', requireAuth, limiter, (req, res) => {
  const { g, modes } = loadMpGame(parse(id, req.params.id));
  const b = parse(z.object({ visibility: z.enum(['public', 'private']), mode: z.enum(['public_mp', 'private_rooms', 'coop', 'competitive']).default('public_mp'), maxPlayers: z.number().int().min(2).optional() }), req.body);
  if (b.visibility === 'public' && !modes.includes('public_mp') && !modes.includes('coop') && !modes.includes('competitive')) throw new HttpError(400, 'Este jogo não declara multiplayer público.');
  if (b.visibility === 'private' && !modes.includes('private_rooms')) throw new HttpError(400, 'Este jogo não declara salas privadas.');
  if (!modes.includes(b.mode) && !(b.mode === 'private_rooms' && b.visibility === 'private')) throw new HttpError(400, 'Modo não suportado por este jogo.');
  const max = Math.min(b.maxPlayers || g.max_players, g.max_players);
  const roomId = randomToken(9).replace(/[^a-zA-Z0-9]/g, 'x');
  const code = b.visibility === 'private' ? randomCode(6) : null;
  run('UPDATE rooms SET status=\'closed\' WHERE host_id=? AND status=\'open\' AND game_id=?', req.user.id, g.id);
  run('INSERT INTO rooms(id, game_id, host_id, visibility, mode, code, max_players) VALUES (?,?,?,?,?,?,?)', roomId, g.id, req.user.id, b.visibility, b.mode, code, max);
  res.status(201).json({ room: { ...roomView(one('SELECT * FROM rooms WHERE id=?', roomId)), code } });
});

r.post('/games/:id/quickmatch', requireAuth, limiter, (req, res) => {
  const { g, modes } = loadMpGame(parse(id, req.params.id));
  if (!modes.includes('public_mp')) throw new HttpError(400, 'Este jogo não tem partidas públicas.');
  const open = all(`SELECT * FROM rooms WHERE game_id=? AND visibility='public' AND status='open' ORDER BY created_at`, g.id)
    .find((room) => { const n = live.get(room.id)?.size || 0; return n > 0 && n < room.max_players; });
  if (open) return res.json({ room: roomView(open) });
  const roomId = randomToken(9).replace(/[^a-zA-Z0-9]/g, 'x');
  run('INSERT INTO rooms(id, game_id, host_id, visibility, mode, max_players) VALUES (?,?,?,?,?,?)', roomId, g.id, req.user.id, 'public', 'public_mp', g.max_players);
  res.json({ room: roomView(one('SELECT * FROM rooms WHERE id=?', roomId)), created: true });
});

r.post('/rooms/join', requireAuth, limiter, (req, res) => {
  const { code } = parse(z.object({ code: z.string().trim().toUpperCase().regex(/^[A-Z0-9]{6}$/, 'Código inválido.') }), req.body);
  const room = one(`SELECT * FROM rooms WHERE code=? AND status <> 'closed'`, code);
  if (!room) throw new HttpError(404, 'Sala não encontrada ou encerrada.');
  const g = one('SELECT slug FROM games WHERE id=?', room.game_id);
  res.json({ room: roomView(room), gameSlug: g.slug });
});

r.post('/rooms/:roomId/invite', requireAuth, limiter, (req, res) => {
  const room = one(`SELECT * FROM rooms WHERE id=? AND status <> 'closed'`, String(req.params.roomId));
  if (!room) throw new HttpError(404, 'Sala não encontrada.');
  if (!live.get(room.id)?.has(req.user.id) && room.host_id !== req.user.id) throw new HttpError(403, 'Você não está nesta sala.');
  const { username } = parse(z.object({ username: z.string().max(40) }), req.body);
  const friend = one('SELECT * FROM users WHERE username=?', username);
  if (!friend || !areFriends(req.user.id, friend.id)) throw new HttpError(403, 'Só é possível convidar amigos.');
  run('INSERT OR IGNORE INTO room_invites(room_id, user_id, invited_by) VALUES (?,?,?)', room.id, friend.id, req.user.id);
  const g = one('SELECT slug, title FROM games WHERE id=?', room.game_id);
  notify(friend.id, 'invite', `${req.user.display_name} convidou você para jogar ${g.title}`, room.code ? `Código da sala: ${room.code}` : '', `/jogo/${g.slug}/jogar?sala=${room.id}`);
  res.json({ ok: true });
});

// ───────── Relay WebSocket ─────────
function parseCookies(header = '') {
  return Object.fromEntries(header.split(';').map((p) => p.trim().split('=')).filter((p) => p.length === 2).map(([k, v]) => [k, decodeURIComponent(v)]));
}

function broadcast(roomId, msg, exceptUserId) {
  const peers = live.get(roomId);
  if (!peers) return;
  const data = JSON.stringify(msg);
  for (const [uid, ws] of peers) if (uid !== exceptUserId && ws.readyState === 1) ws.send(data);
}

function peersOf(roomId) {
  const peers = live.get(roomId);
  if (!peers) return [];
  return [...peers.keys()].map((uid) => {
    const u = one('SELECT id, username, display_name, avatar_url FROM users WHERE id=?', uid);
    return { id: u.id, username: u.username, displayName: u.display_name, avatarUrl: u.avatar_url };
  });
}

export function attachMultiplayer(server) {
  const wss = new WebSocketServer({ noServer: true, maxPayload: 16 * 1024 });
  server.on('upgrade', (req, socket, head) => {
    const url = new URL(req.url, 'http://x');
    if (url.pathname !== '/ws/rooms') return socket.destroy();
    const token = parseCookies(req.headers.cookie)[SESSION_COOKIE];
    const session = token && one(`SELECT u.* FROM sessions s JOIN users u ON u.id=s.user_id WHERE s.id=? AND s.expires_at > ? AND u.status='active'`, sha256(token), new Date().toISOString());
    const roomId = url.searchParams.get('room');
    const room = roomId && one(`SELECT * FROM rooms WHERE id=? AND status <> 'closed'`, roomId);
    if (!session || !room) { socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n'); return socket.destroy(); }
    if (room.visibility === 'private' && room.host_id !== session.id) {
      const allowed = one('SELECT 1 FROM room_invites WHERE room_id=? AND user_id=?', room.id, session.id) || url.searchParams.get('code') === room.code;
      if (!allowed) { socket.write('HTTP/1.1 403 Forbidden\r\n\r\n'); return socket.destroy(); }
    }
    wss.handleUpgrade(req, socket, head, (ws) => onConnection(ws, session, room));
  });
  return wss;
}

function onConnection(ws, user, room) {
  let peers = live.get(room.id);
  if (!peers) { peers = new Map(); live.set(room.id, peers); }
  if (peers.size >= room.max_players && !peers.has(user.id)) {
    ws.send(JSON.stringify({ t: 'error', message: 'Sala cheia.' }));
    return ws.close(4001, 'full');
  }
  peers.get(user.id)?.close(4002, 'replaced');
  peers.set(user.id, ws);
  const hostOf = () => (peers.has(room.host_id) ? room.host_id : [...peers.keys()][0]);
  ws.send(JSON.stringify({ t: 'welcome', you: user.id, room: { id: room.id, maxPlayers: room.max_players, mode: room.mode, code: room.host_id === user.id ? room.code : undefined }, host: hostOf(), peers: peersOf(room.id) }));
  broadcast(room.id, { t: 'peer_joined', peer: { id: user.id, username: user.username, displayName: user.display_name }, host: hostOf() }, user.id);
  let budget = 60;
  const refill = setInterval(() => { budget = 60; }, 1000);
  ws.on('message', (raw) => {
    if (--budget < 0) return; // descarta excesso (proteção contra flood)
    let msg;
    try { msg = JSON.parse(raw.toString()); } catch { return; }
    if (msg.t === 'state' || msg.t === 'event') {
      const out = { t: msg.t, from: user.id, name: typeof msg.name === 'string' ? msg.name.slice(0, 40) : undefined, data: msg.data };
      if (msg.to && peers.has(Number(msg.to))) peers.get(Number(msg.to)).send(JSON.stringify(out));
      else broadcast(room.id, out, user.id);
    } else if (msg.t === 'start' && user.id === hostOf()) {
      run(`UPDATE rooms SET status='in_game' WHERE id=?`, room.id);
      broadcast(room.id, { t: 'start', from: user.id });
    } else if (msg.t === 'ping') ws.send(JSON.stringify({ t: 'pong', at: Date.now() }));
  });
  ws.on('close', () => {
    clearInterval(refill);
    if (peers.get(user.id) === ws) peers.delete(user.id);
    if (!peers.size) {
      live.delete(room.id);
      run(`UPDATE rooms SET status='closed' WHERE id=?`, room.id);
    } else broadcast(room.id, { t: 'peer_left', peer: user.id, host: hostOf() });
  });
}

export default r;
