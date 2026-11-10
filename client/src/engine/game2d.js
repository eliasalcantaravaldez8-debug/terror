// Runtime 2D (Canvas): plataforma e visão de cima, tilemap, sprites, inimigos, moedas, perigos,
// objetivo, paralaxe, partículas e câmera suave. Também usado pelo editor 2D (modo "edit").
import { Hud } from './hud.js';
import { Input } from './gameplay.js';
import { AudioSystem } from './audio.js';

export class Game2D {
  constructor(container, doc, { mode = 'play', onEvent, onLog, assetUrl, onRestart } = {}) {
    this.container = container; this.doc = doc; this.mode = mode; this.onRestart = onRestart;
    this.onEvent = onEvent || (() => {}); this.onLog = onLog || (() => {}); this.assetUrl = assetUrl;
    this.canvas = document.createElement('canvas');
    this.canvas.style.cssText = 'display:block;width:100%;height:100%;image-rendering:auto';
    container.style.position = 'relative';
    container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.cam = { x: 0, y: 0, zoom: 1 };
    this.particles = [];
    this.score = 0;
    this.images = new Map();
  }

  /** Zoom de jogo: em telas altas (celular em pé) a fase preenche a altura disponível. */
  zoom() {
    if (this.mode !== 'play') return 1;
    const H = this.canvas.height / devicePixelRatio;
    const levelH = (this.rows?.length || 22) * this.tile + 40;
    return Math.min(3, Math.max(1, H / levelH));
  }

  get map() { return this.doc.entities.find((e) => e.type === 'tilemap'); }
  get tile() { return this.map?.props.tileSize || 32; }

  /** Carrega as folhas de sprites (assets do projeto) usadas pelas entidades. */
  loadImages() {
    for (const e of this.doc.entities) {
      if (e.type !== 'sprite' || !e.props?.asset || this.images.has(e.props.asset)) continue;
      const a = (this.doc.assets || []).find((x) => x.id === e.props.asset);
      const url = a && this.assetUrl?.(a);
      if (!url) continue;
      const img = new Image();
      const entry = { img, ok: false, error: null };
      img.onload = () => { entry.ok = true; };
      img.onerror = () => { entry.error = 'Imagem não carregou.'; };
      img.src = url;
      this.images.set(e.props.asset, entry);
    }
  }

  /** Desenha um quadro da folha de sprites; retorna false se a imagem não estiver pronta. */
  drawSprite(ctx, e, x, y, w, h, anim, face = 1, t = performance.now() / 1000) {
    const entry = e.props?.asset && this.images.get(e.props.asset);
    if (!entry?.ok) return false;
    const f = e.props.frames || { frameWidth: entry.img.width, frameHeight: entry.img.height, frames: 1, animations: { idle: [0] }, fps: 8 };
    const list = f.animations?.[anim] || f.animations?.idle || [0];
    const frame = list[Math.floor(t * (f.fps || 8)) % list.length] || 0;
    const cols = f.columns || f.frames || 1;
    const sx = (frame % cols) * f.frameWidth; const sy = Math.floor(frame / cols) * f.frameHeight;
    ctx.save();
    ctx.imageSmoothingEnabled = !(f.pixelArt || this.doc.artStyle === 'pixel');
    if (face < 0) { ctx.translate(x + w, y); ctx.scale(-1, 1); ctx.drawImage(entry.img, sx, sy, f.frameWidth, f.frameHeight, 0, 0, w, h); }
    else ctx.drawImage(entry.img, sx, sy, f.frameWidth, f.frameHeight, x, y, w, h);
    ctx.restore();
    return true;
  }

  /** Captura do jogo em execução (usada como sugestão de capa ao publicar). */
  captureFrame(width = 960) {
    try {
      const src = this.canvas;
      if (!src.width || !src.height) return null;
      const c = document.createElement('canvas');
      c.width = Math.min(width, src.width); c.height = Math.round((src.height / src.width) * c.width);
      c.getContext('2d').drawImage(src, 0, 0, c.width, c.height);
      return c.toDataURL('image/jpeg', 0.82);
    } catch { return null; }
  }

  /** Teste de execução do jogo inteiro (exigido antes de publicar no Arcade). */
  async runGameTest(seconds = 3) {
    const errors = [];
    const origLog = this.onLog;
    this.onLog = (kind, msg) => { if (kind === 'error') errors.push(String(msg).slice(0, 300)); origLog?.(kind, msg); };
    const onErr = (ev) => errors.push(String(ev.message || ev.reason?.message || ev.reason || 'Erro').slice(0, 300));
    window.addEventListener('error', onErr); window.addEventListener('unhandledrejection', onErr);
    const t0 = performance.now(); let frames = 0;
    try {
      if (this.mode !== 'play') errors.push('O jogo não abriu em modo de jogo.');
      this.hud?.menu({}); this.paused = false;
      const t = this.input?.touch;
      await new Promise((resolve) => {
        const tick = () => {
          frames++;
          const el = performance.now() - t0;
          if (t) { t.active = true; t.x = 1; t.y = 0; t.jump = frames % 50 === 0; }
          // Roda pelo menos `seconds` e até 60 quadros (aparelhos lentos), com limite de 15 s.
          if ((el < seconds * 1000 || frames < 60) && el < 15000) requestAnimationFrame(tick); else resolve();
        };
        requestAnimationFrame(tick);
      });
      if (t) { t.active = false; t.x = t.y = 0; t.jump = false; }
      if (this.doc.player.entityId && !this.player) errors.push('Personagem do jogador não foi criado.');
      if (this.player && ![this.player.x, this.player.y].every(Number.isFinite)) errors.push('Posição do jogador ficou inválida (NaN).');
    } catch (e) { errors.push(e.message); }
    finally { window.removeEventListener('error', onErr); window.removeEventListener('unhandledrejection', onErr); this.onLog = origLog; }
    const durationMs = Math.round(performance.now() - t0);
    const screenshot = this.captureFrame();
    return { ok: errors.length === 0 && frames >= 10, frames, fps: Math.round(((frames * 1000) / durationMs) * 10) / 10, errors: [...new Set(errors)].slice(0, 20), durationMs, screenshot, dimension: '2d' };
  }

  async runTest(entityId) {
    this.hud?.menu({});
    const e = this.doc.entities.find((x) => x.id === entityId);
    if (!e) return { loaded: false, error: 'Entidade não encontrada no projeto.' };
    const entry = e.props?.asset && this.images.get(e.props.asset);
    for (let i = 0; i < 50 && entry && !entry.ok && !entry.error; i++) await new Promise((r) => setTimeout(r, 100));
    if (!entry?.ok) return { loaded: false, error: entry?.error || 'Sprite sem imagem.' };
    const t0 = performance.now(); let frames = 0;
    await new Promise((resolve) => { const tick = () => { frames++; if (performance.now() - t0 < 1500) requestAnimationFrame(tick); else resolve(); }; requestAnimationFrame(tick); });
    return { loaded: true, fps: Math.round((frames * 1000) / (performance.now() - t0)), size: [e.props.width || 0, e.props.height || 0, 0] };
  }

  init() {
    this.loadImages();
    this.resize = () => { const r = this.container.getBoundingClientRect(); this.canvas.width = r.width * devicePixelRatio; this.canvas.height = r.height * devicePixelRatio; };
    this.resize(); window.addEventListener('resize', this.resize);
    this.reset();
    if (this.mode === 'play') {
      this.input = new Input(this.canvas);
      this.hud = new Hud(this.container, { ...this.doc.ui, hud: { ...this.doc.ui.hud, showMinimap: false } }, this.input);
      this.audio = new AudioSystem();
      this.paused = true;
      this.hud.menu({ title: this.doc.ui.title || this.doc.meta.name, text: 'Setas/WASD para mover · Espaço para pular', items: [{ label: 'Jogar', onClick: () => { this.hud.menu({}); this.paused = false; this.audio.unlock(); if (this.player) this.player.inv = Math.max(this.player.inv || 0, 2.5); } }] });
      this.missionDone = false;
    }
    this.running = true;
    let last = performance.now();
    const loop = (t) => { if (!this.running) return; this.raf = requestAnimationFrame(loop); const dt = Math.min((t - last) / 1000, 1 / 20); last = t; if (this.mode === 'play' && !this.paused) this.update(dt); this.draw(); this.input?.endFrame(); };
    this.raf = requestAnimationFrame(loop);
  }

  restart() { if (this.onRestart) this.onRestart(); else location.reload(); }

  reset() {
    const p = this.doc.entities.find((e) => e.id === this.doc.player.entityId);
    this.player = p ? { e: p, x: p.transform.position[0], y: p.transform.position[1], vx: 0, vy: 0, w: p.props.width || 32, h: p.props.height || 48, onGround: false, hp: p.components?.health?.max || 3, inv: 0, face: 1 } : null;
    this.enemies = this.doc.entities.filter((e) => e.type === 'sprite' && e.props.shape === 'enemy').map((e) => ({ e, x: e.transform.position[0], y: e.transform.position[1], vx: (e.components?.ai?.speed || 80), w: e.props.width || 32, h: e.props.height || 32, alive: true }));
    this.collected = new Set();
    this.rows = (this.map?.props.rows || []).map((r) => r.split(''));
  }

  tileAt(px, py) {
    const t = this.tile; const r = Math.floor(py / t); const c = Math.floor(px / t);
    const ch = this.rows[r]?.[c];
    if (!ch || ch === '0') return null;
    return { ...(this.map.props.palette?.[ch] || { solid: true, color: '#888' }), r, c, ch };
  }

  solidAt(px, py) { const t = this.tileAt(px, py); return t && t.solid; }

  update(dt) {
    const p = this.player; if (!p) return;
    const cfg = this.doc.player; const g = this.doc.settings.world2d?.gravity ?? 1800;
    const ax = this.input.axis(); const topdown = cfg.controller === 'topdown2d';
    const speed = cfg.speed || 260;
    p.vx = ax.x * speed * (this.input.isDown('ShiftLeft') ? 1.4 : 1);
    if (ax.x) p.face = Math.sign(ax.x);
    if (topdown) p.vy = -ax.y * speed;
    else {
      p.vy += g * dt;
      if ((this.input.pressed('Space') || this.input.pressed('ArrowUp') || this.input.pressed('KeyW') || this.input.touch.jump) && p.onGround) { p.vy = -(cfg.jumpForce || 640); p.onGround = false; this.audio.play('jump'); }
      if (!this.input.isDown('Space') && !this.input.isDown('ArrowUp') && !this.input.isDown('KeyW') && p.vy < -200) p.vy += g * dt * 1.2; // pulo variável
    }
    this.move(p, p.vx * dt, 0); p.onGround = false; this.move(p, 0, p.vy * dt);
    p.inv = Math.max(0, p.inv - dt);
    // Tiles especiais sob o jogador
    for (const [dx, dy] of [[0, 0], [p.w - 1, 0], [0, p.h - 1], [p.w - 1, p.h - 1], [p.w / 2, p.h / 2]]) {
      const t = this.tileAt(p.x + dx, p.y + dy); if (!t) continue;
      const key = `${t.r},${t.c}`;
      if (t.kind === 'coin' && !this.collected.has(key)) { this.collected.add(key); this.rows[t.r][t.c] = '0'; this.score += 10; this.audio.play('pickup'); this.burst(t.c * this.tile + 16, t.r * this.tile + 16, '#facc15'); this.onEvent('pickup', { item: 'coin' }); }
      if (t.kind === 'hazard') this.hurt();
      if (t.kind === 'goal' && !this.missionDone) { this.missionDone = true; this.audio.play('goal'); this.hud.toast('Fase concluída!', 4000); this.onEvent('victory', { score: this.score }); setTimeout(() => { this.paused = true; this.hud.menu({ title: 'Vitória!', text: `Pontuação: ${this.score}`, items: [{ label: 'Jogar novamente', onClick: () => this.restart() }] }); }, 1200); }
    }
    for (const en of this.enemies) {
      if (!en.alive) continue;
      en.y += 0; const nx = en.x + en.vx * dt;
      const ahead = en.vx > 0 ? nx + en.w : nx;
      if (this.solidAt(ahead, en.y + en.h / 2) || !this.solidAt(ahead, en.y + en.h + 2)) en.vx *= -1; else en.x = nx;
      if (rectHit(p, en)) {
        if (p.vy > 0 && p.y + p.h - en.y < 18) { en.alive = false; p.vy = -420; this.score += 25; this.audio.play('hit'); this.burst(en.x + 16, en.y + 16, '#ef4444'); this.onEvent('npc_defeated', {}); }
        else this.hurt();
      }
    }
    if (p.y > this.rows.length * this.tile + 200) { this.hurt(true); }
    this.hud.setHud({ score: this.score, health: (p.hp / (p.e.components?.health?.max || 3)) * 100 });
    // Câmera
    const z = this.zoom();
    const W = this.canvas.width / devicePixelRatio / z; const H = this.canvas.height / devicePixelRatio / z;
    this.cam.x += (p.x - W / 2 - this.cam.x) * Math.min(1, dt * 6);
    this.cam.y += (p.y - H * 0.55 - this.cam.y) * Math.min(1, dt * 6);
    this.cam.x = Math.max(0, Math.min(this.cam.x, (this.rows[0]?.length || 0) * this.tile - W));
    // Em telas de toque, reserva espaço embaixo para o joystick e os botões não cobrirem o chão.
    const touchPad = matchMedia('(pointer: coarse)').matches ? 170 / z : 0;
    this.cam.y = Math.max(-200 - touchPad, Math.min(this.cam.y, this.rows.length * this.tile - H + touchPad));
    for (const pt of this.particles) { pt.x += pt.vx * dt; pt.y += pt.vy * dt; pt.vy += 900 * dt; pt.life -= dt; }
    this.particles = this.particles.filter((pt) => pt.life > 0);
  }

  hurt(fell = false) {
    const p = this.player; if (p.inv > 0 && !fell) return;
    p.hp -= 1; p.inv = 1.2; this.audio.play('hit'); this.hud.flash('#ef4444');
    if (fell || p.hp <= 0) {
      if (p.hp <= 0) { this.paused = true; this.hud.menu({ title: 'Fim de jogo', text: `Pontuação: ${this.score}`, items: [{ label: 'Tentar novamente', onClick: () => this.restart() }] }); this.onEvent('game_over', { score: this.score }); return; }
      p.x = p.e.transform.position[0]; p.y = p.e.transform.position[1]; p.vx = p.vy = 0;
    } else p.vy = -300;
  }

  move(b, dx, dy) {
    b.x += dx; b.y += dy;
    const t = this.tile;
    const x0 = Math.floor(b.x / t); const x1 = Math.floor((b.x + b.w - 1) / t);
    const y0 = Math.floor(b.y / t); const y1 = Math.floor((b.y + b.h - 1) / t);
    for (let r = y0; r <= y1; r++) for (let c = x0; c <= x1; c++) {
      const tl = this.tileAt(c * t + 1, r * t + 1); if (!tl?.solid) continue;
      if (dx > 0) b.x = c * t - b.w; else if (dx < 0) b.x = (c + 1) * t;
      if (dy > 0) { b.y = r * t - b.h; b.vy = 0; b.onGround = true; } else if (dy < 0) { b.y = (r + 1) * t; b.vy = 0; }
    }
  }

  burst(x, y, color) { for (let i = 0; i < 14; i++) this.particles.push({ x, y, vx: (Math.random() - 0.5) * 300, vy: -Math.random() * 400, life: 0.6, color }); }

  draw() {
    const ctx = this.ctx; const z = this.zoom(); const dpr = devicePixelRatio * z;
    const W = this.canvas.width / dpr; const H = this.canvas.height / dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const bg = this.doc.settings.world2d?.background || ['#1e1b4b', '#0e7490'];
    const grad = ctx.createLinearGradient(0, 0, 0, H); grad.addColorStop(0, bg[0]); grad.addColorStop(1, bg[1]); ctx.fillStyle = grad; ctx.fillRect(0, 0, W, H);
    // Paralaxe: montanhas e estrelas
    if (this.doc.settings.world2d?.parallax !== false) {
      for (const [k, color, amp, base] of [[0.2, 'rgba(76,29,149,.55)', 60, 0.62], [0.45, 'rgba(14,116,144,.5)', 40, 0.75]]) {
        ctx.fillStyle = color; ctx.beginPath(); ctx.moveTo(0, H);
        for (let x = 0; x <= W; x += 16) { const wx = x + this.cam.x * k; ctx.lineTo(x, H * base - Math.sin(wx * 0.006) * amp - Math.sin(wx * 0.017) * amp * 0.4); }
        ctx.lineTo(W, H); ctx.fill();
      }
    }
    ctx.save(); ctx.translate(-Math.round(this.cam.x), -Math.round(this.cam.y));
    const t = this.tile; const time = performance.now() / 1000;
    const c0 = Math.max(0, Math.floor(this.cam.x / t)); const c1 = Math.ceil((this.cam.x + W) / t);
    const r0 = Math.max(0, Math.floor(this.cam.y / t)); const r1 = Math.ceil((this.cam.y + H) / t);
    for (let r = r0; r <= r1; r++) for (let c = c0; c <= c1; c++) {
      const ch = this.rows[r]?.[c]; if (!ch || ch === '0') continue;
      const pal = this.map.props.palette?.[ch] || { color: '#888' };
      const x = c * t; const y = r * t;
      if (pal.kind === 'coin') { const s = Math.abs(Math.sin(time * 3 + c)) * 0.6 + 0.4; ctx.fillStyle = pal.color; ctx.beginPath(); ctx.ellipse(x + t / 2, y + t / 2, (t / 3) * s, t / 3, 0, 0, Math.PI * 2); ctx.fill(); continue; }
      if (pal.kind === 'goal') { ctx.fillStyle = '#e5e7eb'; ctx.fillRect(x + t / 2 - 2, y - t * 2, 4, t * 3); ctx.fillStyle = pal.color; ctx.beginPath(); ctx.moveTo(x + t / 2 + 2, y - t * 2); ctx.lineTo(x + t * 1.6, y - t * 1.6 + Math.sin(time * 4) * 3); ctx.lineTo(x + t / 2 + 2, y - t * 1.2); ctx.fill(); continue; }
      if (pal.kind === 'hazard') { ctx.fillStyle = pal.color; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(x + i * t / 4, y + t); ctx.lineTo(x + i * t / 4 + t / 8, y + t * 0.35); ctx.lineTo(x + (i + 1) * t / 4, y + t); ctx.fill(); } continue; }
      const g2 = ctx.createLinearGradient(0, y, 0, y + t); g2.addColorStop(0, shade(pal.color, 30)); g2.addColorStop(1, shade(pal.color, -25));
      ctx.fillStyle = g2; ctx.fillRect(x, y, t, t);
      if (!this.rows[r - 1]?.[c] || this.rows[r - 1][c] === '0') { ctx.fillStyle = 'rgba(167,243,208,.75)'; ctx.fillRect(x, y, t, 4); }
      ctx.strokeStyle = 'rgba(0,0,0,.18)'; ctx.strokeRect(x + 0.5, y + 0.5, t - 1, t - 1);
    }
    for (const en of this.enemies || []) if (en.alive && !this.drawSprite(ctx, en.e, en.x, en.y, en.w, en.h, 'walk', en.vx > 0 ? 1 : -1, time)) drawCreature(ctx, en.x, en.y, en.w, en.h, en.e.props.color || '#ef4444', en.vx > 0 ? 1 : -1, time, true);
    for (const e of this.doc.entities) {
      if (e.type !== 'sprite' || e.id === this.player?.e.id || e.props.shape === 'enemy') continue;
      const [x, y] = e.transform.position;
      if (e.props.shape === 'coin') { ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.arc(x, y, 10, 0, Math.PI * 2); ctx.fill(); continue; }
      if (!this.drawSprite(ctx, e, x, y, e.props.width || 32, e.props.height || 32, 'idle', 1, time) && e.props.pendingJob) { ctx.strokeStyle = '#a78bfa'; ctx.setLineDash([4, 4]); ctx.strokeRect(x, y, e.props.width || 32, e.props.height || 32); ctx.setLineDash([]); }
    }
    const p = this.player;
    if (p && (!(p.inv > 0) || Math.floor(time * 12) % 2 === 0)) {
      const anim = !p.onGround ? 'jump' : Math.abs(p.vx) > 10 ? 'walk' : 'idle';
      if (!this.drawSprite(ctx, p.e, p.x, p.y, p.w, p.h, anim, p.face, time)) drawCreature(ctx, p.x, p.y, p.w, p.h, p.e.props.color || '#22d3ee', p.face, time, false, Math.abs(p.vx) > 10 && p.onGround);
    }
    for (const pt of this.particles) { ctx.globalAlpha = Math.max(0, pt.life / 0.6); ctx.fillStyle = pt.color; ctx.fillRect(pt.x, pt.y, 4, 4); }
    ctx.globalAlpha = 1;
    if (this.mode === 'edit') {
      ctx.strokeStyle = 'rgba(255,255,255,.06)';
      for (let c = c0; c <= c1; c++) { ctx.beginPath(); ctx.moveTo(c * t, r0 * t); ctx.lineTo(c * t, r1 * t); ctx.stroke(); }
      for (let r = r0; r <= r1; r++) { ctx.beginPath(); ctx.moveTo(c0 * t, r * t); ctx.lineTo(c1 * t, r * t); ctx.stroke(); }
    }
    ctx.restore();
  }

  /** Editor: converte coordenada da tela em célula do tilemap. */
  cellAt(clientX, clientY) {
    const r = this.canvas.getBoundingClientRect();
    const x = clientX - r.left + this.cam.x; const y = clientY - r.top + this.cam.y;
    return { c: Math.floor(x / this.tile), r: Math.floor(y / this.tile), x, y };
  }

  setDoc(doc) { this.doc = doc; this.reset(); this.loadImages(); }

  dispose() { this.running = false; cancelAnimationFrame(this.raf); window.removeEventListener('resize', this.resize); this.input?.dispose(); this.hud?.dispose(); this.audio?.dispose(); this.canvas.remove(); }
}

const rectHit = (a, b) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
function shade(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, Math.min(255, (n >> 16) + amt)); const g = Math.max(0, Math.min(255, ((n >> 8) & 255) + amt)); const b = Math.max(0, Math.min(255, (n & 255) + amt));
  return `rgb(${r},${g},${b})`;
}
function drawCreature(ctx, x, y, w, h, color, face, t, enemy, walking) {
  const bob = walking ? Math.abs(Math.sin(t * 14)) * 3 : Math.sin(t * 3) * 1;
  ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.beginPath(); ctx.ellipse(x + w / 2, y + h, w / 2, 4, 0, 0, Math.PI * 2); ctx.fill();
  const g = ctx.createLinearGradient(x, y, x, y + h); g.addColorStop(0, shade(color, 40)); g.addColorStop(1, shade(color, -40));
  ctx.fillStyle = g;
  roundRect(ctx, x + 2, y + (enemy ? 4 : 0) - bob, w - 4, h - (enemy ? 4 : 6), enemy ? 10 : 8); ctx.fill();
  ctx.fillStyle = '#fff'; const ex = x + w / 2 + face * w * 0.15;
  ctx.beginPath(); ctx.arc(ex - 5, y + h * 0.3 - bob, 4, 0, Math.PI * 2); ctx.arc(ex + 5, y + h * 0.3 - bob, 4, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(ex - 5 + face * 1.5, y + h * 0.3 - bob, 2, 0, Math.PI * 2); ctx.arc(ex + 5 + face * 1.5, y + h * 0.3 - bob, 2, 0, Math.PI * 2); ctx.fill();
  if (!enemy) { ctx.fillStyle = shade(color, -60); const step = walking ? Math.sin(t * 14) * 4 : 0; ctx.fillRect(x + 6 + step, y + h - 8, 8, 8); ctx.fillRect(x + w - 14 - step, y + h - 8, 8, 8); }
}
function roundRect(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
