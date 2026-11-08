// Medidor de desempenho REAL: usa o intervalo medido entre quadros (performance.now), sem números fixos.
const CSS = `
#perf{position:fixed;top:150px;right:12px;z-index:26;background:rgba(8,9,12,.82);border:1px solid #2a2b33;border-radius:6px;padding:8px 11px;font:12px/1.5 Consolas,'Courier New',monospace;color:#d8d8d8;display:none;min-width:190px;pointer-events:none;font-variant-numeric:tabular-nums}
#perf b{color:#fff;font-size:20px}
#perf .g{color:#7ad87a}#perf .y{color:#e8c84a}#perf .r{color:#e85a4a}
#perf canvas{display:block;margin-top:4px;width:180px;height:36px}
#perf .t{color:#ff9a4a}
`;
export class PerfMeter {
  constructor(renderer) {
    this.renderer = renderer; this.visible = false;
    const st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
    this.el = document.createElement('div'); this.el.id = 'perf'; document.body.appendChild(this.el);
    this.last = performance.now(); this.frames = []; this.acc = 0; this.n = 0; this.fps = 0; this.ms = 0;
    this.hist = new Float32Array(90); this.hi = 0;
    this.session = null; // { start, samples: [] }
    this.cv = document.createElement('canvas'); this.cv.width = 180; this.cv.height = 36;
  }
  // chamar uma vez por quadro (no requestAnimationFrame)
  tick() {
    const now = performance.now(); const dt = now - this.last; this.last = now;
    if (dt <= 0 || dt > 2000) return; // aba em segundo plano: ignora
    this.acc += dt; this.n++;
    if (this.session) this.session.samples.push(dt);
    if (this.acc >= 500) { // atualiza 2x por segundo
      this.ms = this.acc / this.n; this.fps = 1000 / this.ms;
      this.hist[this.hi++ % this.hist.length] = this.fps;
      if (this.session) this.session.windows.push(this.fps);
      this.acc = 0; this.n = 0;
      if (this.visible) this.render();
    }
  }
  toggle(v = !this.visible) { this.visible = v; this.el.style.display = v ? 'block' : 'none'; if (v) this.render(); }
  startSession() { this.session = { start: performance.now(), samples: [], windows: [] }; }
  stopSession() { const s = this.session; this.session = null; this.result = s ? summarize(s.samples, (performance.now() - s.start) / 1000, s.windows) : null; return this.result; }
  render() {
    const cls = this.fps >= 50 ? 'g' : this.fps >= 30 ? 'y' : 'r';
    const mem = performance.memory ? `${(performance.memory.usedJSHeapSize / 1048576).toFixed(0)} / ${(performance.memory.jsHeapSizeLimit / 1048576).toFixed(0)} MB (memória JS)` : 'memória: indisponível neste navegador';
    const info = this.renderer.info;
    let sess = '';
    if (this.session) { const r = summarize(this.session.samples, (performance.now() - this.session.start) / 1000, this.session.windows); sess = `<div class="t">MEDINDO ${r.dur.toFixed(0)}s — mín ${r.min.toFixed(0)} · méd ${r.avg.toFixed(0)} · máx ${r.max.toFixed(0)} · 1% ${r.low1.toFixed(0)}</div>`; }
    else if (this.result) { const r = this.result; sess = `<div class="t">Última medição (${r.dur.toFixed(0)}s, ${r.frames} quadros): mín ${r.min.toFixed(0)} · méd ${r.avg.toFixed(0)} · máx ${r.max.toFixed(0)} · 1% baixo ${r.low1.toFixed(0)} FPS</div>`; }
    this.el.innerHTML = `<b class="${cls}">${this.fps.toFixed(0)}</b> FPS · ${this.ms.toFixed(1)} ms/quadro<br>${mem}<br>GPU: ${info.memory.geometries} geometrias · ${info.memory.textures} texturas<br>${info.render.calls} chamadas · ${(info.render.triangles / 1000).toFixed(0)}k triângulos<br>Resolução: ${Math.round(this.renderer.getPixelRatio() * 100)}%${sess}`;
    const g = this.cv.getContext('2d'); g.clearRect(0, 0, 180, 36); g.fillStyle = 'rgba(255,255,255,.08)'; g.fillRect(0, 0, 180, 36);
    g.strokeStyle = '#7ad87a'; g.beginPath();
    for (let i = 0; i < this.hist.length; i++) { const v = this.hist[(this.hi + i) % this.hist.length]; const y = 36 - Math.min(36, v / 120 * 36); i ? g.lineTo(i * 2, y) : g.moveTo(0, y); }
    g.stroke(); g.fillStyle = 'rgba(255,255,255,.3)'; g.fillRect(0, 36 - 60 / 120 * 36, 180, 1);
    this.el.appendChild(this.cv);
  }
}
// estatísticas de uma sessão a partir dos tempos de quadro reais (ms)
// estatísticas de uma sessão: média = quadros / tempo real; mín/máx = janelas de 0,5 s; 1% baixo = pior 1% dos quadros
export function summarize(samples, dur, windows = []) {
  if (!samples.length) return { min: 0, avg: 0, max: 0, low1: 0, dur, frames: 0 };
  const total = samples.reduce((a, b) => a + b, 0);
  const avg = samples.length / (total / 1000);
  const worst = [...samples].sort((a, b) => b - a).slice(0, Math.max(1, Math.floor(samples.length * 0.01)));
  const low1 = 1000 / (worst.reduce((a, b) => a + b, 0) / worst.length);
  const w = windows.length ? windows : [avg];
  return { min: Math.min(...w), max: Math.max(...w), avg, low1, dur, frames: samples.length };
}
