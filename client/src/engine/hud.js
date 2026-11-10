// HUD do runtime (DOM sobreposto ao canvas): vida, placar, cronômetro, objetivo, minimapa,
// avisos, caixa de diálogo com escolhas, menus e controles de toque para celular.
const css = `
.nx-hud{position:absolute;inset:0;pointer-events:none;font-family:Inter,system-ui,sans-serif;color:#f8fafc;user-select:none}
.nx-top{position:absolute;top:14px;left:50%;transform:translateX(-50%);display:flex;gap:10px}
.nx-chip{background:rgba(10,8,25,.62);backdrop-filter:blur(8px);border:1px solid rgba(139,92,246,.45);border-radius:12px;padding:8px 14px;font-weight:700;font-size:15px;letter-spacing:.02em}
.nx-health{position:absolute;left:16px;bottom:18px;width:220px}
.nx-bar{height:10px;border-radius:6px;background:rgba(255,255,255,.12);overflow:hidden;margin-top:6px}
.nx-bar>i{display:block;height:100%;background:linear-gradient(90deg,#ef4444,#f59e0b,#22c55e);transition:width .2s}
.nx-obj{position:absolute;right:16px;top:16px;max-width:300px;text-align:right}
.nx-obj small{display:block;font-size:11px;color:#22d3ee;text-transform:uppercase;letter-spacing:.12em}
.nx-toast{position:absolute;top:22%;left:50%;transform:translateX(-50%);font-size:28px;font-weight:800;text-shadow:0 4px 24px rgba(139,92,246,.8);opacity:0;transition:opacity .35s;text-align:center}
.nx-flash{position:absolute;inset:0;opacity:0;transition:opacity .4s}
.nx-dialog{position:absolute;left:50%;bottom:28px;transform:translateX(-50%);width:min(680px,92vw);pointer-events:auto;display:none}
.nx-dialog .box{background:rgba(10,8,25,.88);border:1px solid rgba(34,211,238,.5);border-radius:14px;padding:16px 18px}
.nx-dialog b{color:#a78bfa}
.nx-dialog button,.nx-menu button{display:block;width:100%;margin-top:8px;text-align:left;background:rgba(139,92,246,.18);border:1px solid rgba(139,92,246,.5);color:#fff;border-radius:10px;padding:9px 12px;font:inherit;cursor:pointer}
.nx-dialog button:hover,.nx-menu button:hover{background:rgba(34,211,238,.25)}
.nx-menu{position:absolute;inset:0;display:none;align-items:center;justify-content:center;background:rgba(5,3,15,.72);pointer-events:auto}
.nx-menu .box{width:min(380px,90vw);background:#120d2b;border:1px solid rgba(139,92,246,.6);border-radius:18px;padding:24px;text-align:center}
.nx-menu h2{margin:0 0 10px;font-size:26px;background:linear-gradient(90deg,#a78bfa,#22d3ee);-webkit-background-clip:text;color:transparent}
.nx-mini{position:absolute;right:16px;bottom:16px;border-radius:50%;border:2px solid rgba(34,211,238,.6);background:rgba(10,8,25,.6)}
.nx-prompt{position:absolute;left:50%;bottom:120px;transform:translateX(-50%);display:none}
.nx-touch{position:absolute;inset:auto 0 0 0;height:45%;pointer-events:auto;display:none}
.nx-stick{position:absolute;left:24px;bottom:24px;width:130px;height:130px;border-radius:50%;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.2)}
.nx-stick i{position:absolute;left:40px;top:40px;width:50px;height:50px;border-radius:50%;background:rgba(139,92,246,.7)}
.nx-btns{position:absolute;right:24px;bottom:30px;display:flex;gap:14px}
.nx-btns button{width:68px;height:68px;border-radius:50%;border:1px solid rgba(34,211,238,.6);background:rgba(10,8,25,.6);color:#fff;font-weight:800}
@media (pointer:coarse){.nx-touch{display:block}}
`;

export class Hud {
  constructor(container, ui = {}, input) {
    if (!document.getElementById('nx-hud-css')) { const s = document.createElement('style'); s.id = 'nx-hud-css'; s.textContent = css; document.head.appendChild(s); }
    this.ui = ui; this.input = input;
    const el = document.createElement('div'); el.className = 'nx-hud';
    el.innerHTML = `<div class="nx-top"><div class="nx-chip" data-k="score" hidden></div><div class="nx-chip" data-k="timer" hidden></div></div>
      <div class="nx-health" hidden><div class="nx-chip">Vida<div class="nx-bar"><i></i></div></div></div>
      <div class="nx-obj nx-chip" hidden><small>Objetivo</small><span></span></div>
      <div class="nx-toast"></div><div class="nx-flash"></div>
      <div class="nx-prompt nx-chip"></div>
      <div class="nx-dialog"><div class="box"><b></b><p></p><div class="choices"></div></div></div>
      <div class="nx-menu"><div class="box"><h2></h2><p></p><div class="items"></div></div></div>
      <canvas class="nx-mini" width="150" height="150" hidden></canvas>
      <div class="nx-touch"><div class="nx-stick"><i></i></div><div class="nx-btns"><button data-b="action">AÇÃO</button><button data-b="jump">PULO</button></div></div>`;
    container.appendChild(el);
    this.el = el;
    this.q = (s) => el.querySelector(s);
    const h = ui.hud || {};
    this.q('[data-k=score]').hidden = !h.showScore;
    this.q('[data-k=timer]').hidden = !h.showTimer;
    this.q('.nx-health').hidden = !h.showHealth;
    this.q('.nx-mini').hidden = !h.showMinimap;
    this.showObjective = h.showObjective !== false;
    this.setupTouch();
  }
  setupTouch() {
    const stick = this.q('.nx-stick'); const knob = stick.querySelector('i');
    let id = null; let cx = 0; let cy = 0;
    stick.addEventListener('touchstart', (e) => { const t = e.changedTouches[0]; id = t.identifier; const r = stick.getBoundingClientRect(); cx = r.left + r.width / 2; cy = r.top + r.height / 2; this.input.touch.active = true; e.preventDefault(); }, { passive: false });
    window.addEventListener('touchmove', (e) => { for (const t of e.changedTouches) if (t.identifier === id) { const dx = Math.max(-1, Math.min(1, (t.clientX - cx) / 50)); const dy = Math.max(-1, Math.min(1, (t.clientY - cy) / 50)); this.input.touch.x = dx; this.input.touch.y = -dy; knob.style.transform = `translate(${dx * 40}px,${dy * 40}px)`; } }, { passive: true });
    window.addEventListener('touchend', (e) => { for (const t of e.changedTouches) if (t.identifier === id) { id = null; this.input.touch.active = false; this.input.touch.x = this.input.touch.y = 0; knob.style.transform = ''; } });
    for (const b of this.el.querySelectorAll('.nx-btns button')) b.addEventListener('touchstart', (e) => { this.input.touch[b.dataset.b] = true; e.preventDefault(); }, { passive: false });
  }
  setHud({ score, timer, health, objective } = {}) {
    if (score !== undefined) { const s = this.q('[data-k=score]'); s.textContent = typeof score === 'number' ? `${score} pts` : score; }
    if (timer !== undefined) this.q('[data-k=timer]').textContent = `${Math.floor(timer / 60)}:${String(Math.floor(timer % 60)).padStart(2, '0')}`;
    if (health !== undefined) this.q('.nx-bar>i').style.width = `${Math.max(0, Math.min(100, health))}%`;
    if (objective !== undefined) this.setObjective(objective);
  }
  setObjective(text) {
    const o = this.q('.nx-obj');
    o.hidden = !this.showObjective || !text;
    o.querySelector('span').textContent = text || '';
  }
  toast(text, ms = 2500) {
    const t = this.q('.nx-toast'); t.textContent = text; t.style.opacity = 1;
    clearTimeout(this.toastT); this.toastT = setTimeout(() => { t.style.opacity = 0; }, ms);
  }
  flash(color) { const f = this.q('.nx-flash'); f.style.background = color; f.style.opacity = 0.35; setTimeout(() => { f.style.opacity = 0; }, 120); }
  prompt(text) { const p = this.q('.nx-prompt'); p.style.display = text ? 'block' : 'none'; p.textContent = text || ''; }
  dialog(d, lineId, onChoice) {
    const box = this.q('.nx-dialog');
    if (!d) { box.style.display = 'none'; return; }
    const line = (d.lines || []).find((l) => l.id === lineId) || d.lines?.[0];
    if (!line) { box.style.display = 'none'; return; }
    box.style.display = 'block';
    box.querySelector('b').textContent = d.speaker || '';
    box.querySelector('p').textContent = line.text;
    const ch = box.querySelector('.choices'); ch.innerHTML = '';
    const choices = line.choices?.length ? line.choices : [{ text: 'Continuar', next: null }];
    for (const c of choices) {
      const b = document.createElement('button'); b.textContent = c.text;
      b.onclick = () => onChoice(c);
      ch.appendChild(b);
    }
    document.exitPointerLock?.();
  }
  menu({ title, text, items }) {
    const m = this.q('.nx-menu');
    if (!title) { m.style.display = 'none'; return; }
    m.style.display = 'flex'; m.querySelector('h2').textContent = title; m.querySelector('p').textContent = text || '';
    const box = m.querySelector('.items'); box.innerHTML = '';
    for (const it of items || []) { const b = document.createElement('button'); b.textContent = it.label; b.onclick = it.onClick; box.appendChild(b); }
    document.exitPointerLock?.();
  }
  minimap(world, player, extra = []) {
    const c = this.q('.nx-mini'); if (c.hidden || !player) return;
    const g = c.getContext('2d'); g.clearRect(0, 0, 150, 150);
    const scale = 1.2; const px = player.position.x; const pz = player.position.z;
    g.save(); g.beginPath(); g.arc(75, 75, 74, 0, Math.PI * 2); g.clip();
    g.fillStyle = 'rgba(15,23,42,.6)'; g.fillRect(0, 0, 150, 150);
    for (const r of world.roads) { g.strokeStyle = 'rgba(148,163,184,.8)'; g.lineWidth = 4; g.beginPath(); for (let i = 0; i <= 80; i++) { const q = r.curve.getPointAt((i / 80) % 1); const x = 75 + (q.x + r.object.position.x - px) / scale; const y = 75 + (q.z + r.object.position.z - pz) / scale; i ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke(); }
    for (const m of extra) { g.fillStyle = m.color; g.beginPath(); g.arc(75 + (m.x - px) / scale, 75 + (m.z - pz) / scale, m.r || 3, 0, Math.PI * 2); g.fill(); }
    g.fillStyle = '#22d3ee'; g.beginPath(); g.arc(75, 75, 5, 0, Math.PI * 2); g.fill();
    g.restore();
  }
  dispose() { this.el.remove(); }
}
