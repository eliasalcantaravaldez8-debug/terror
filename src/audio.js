// Som do motor sintetizado (Web Audio) — sem arquivos de áudio externos.
export class EngineAudio {
  constructor() { this.ctx = null; this.enabled = true; }
  init() {
    if (this.ctx) return;
    try {
      const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
      this.ctx = new AC();
      this.gain = this.ctx.createGain(); this.gain.gain.value = 0;
      this.filter = this.ctx.createBiquadFilter(); this.filter.type = 'lowpass'; this.filter.frequency.value = 600;
      this.o1 = this.ctx.createOscillator(); this.o1.type = 'sawtooth';
      this.o2 = this.ctx.createOscillator(); this.o2.type = 'square';
      const g2 = this.ctx.createGain(); g2.gain.value = 0.35;
      this.o1.connect(this.filter); this.o2.connect(g2); g2.connect(this.filter);
      this.filter.connect(this.gain); this.gain.connect(this.ctx.destination);
      this.o1.start(); this.o2.start();
    } catch (e) { this.ctx = null; }
  }
  update(on, speed, throttle) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const gear = Math.min(4, Math.floor(Math.abs(speed) / 9));
    const rpm = 0.25 + ((Math.abs(speed) - gear * 9) / 9) * 0.6 + throttle * 0.15;
    const f = 38 + rpm * 70 + gear * 6;
    this.o1.frequency.setTargetAtTime(f, t, 0.05);
    this.o2.frequency.setTargetAtTime(f * 0.5, t, 0.05);
    this.filter.frequency.setTargetAtTime(400 + throttle * 900 + rpm * 400, t, 0.08);
    this.gain.gain.setTargetAtTime(on && this.enabled ? 0.05 + throttle * 0.05 : 0, t, 0.15);
  }
}

// efeitos sonoros simples sintetizados (sem arquivos)
export function sfx(ctx, name, dur = 1) {
  if (!ctx) return;
  const t = ctx.currentTime; const out = ctx.createGain(); out.connect(ctx.destination);
  const noise = (len) => { const b = ctx.createBuffer(1, ctx.sampleRate * len, ctx.sampleRate); const d = b.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1; const s = ctx.createBufferSource(); s.buffer = b; return s; };
  const osc = (type, f) => { const o = ctx.createOscillator(); o.type = type; o.frequency.value = f; return o; };
  if (name === 'siren') {
    const o = osc('sine', 700); o.connect(out); out.gain.value = 0.05;
    for (let i = 0; i < dur * 2; i++) { o.frequency.setValueAtTime(650, t + i * 0.5); o.frequency.linearRampToValueAtTime(950, t + i * 0.5 + 0.25); o.frequency.linearRampToValueAtTime(650, t + i * 0.5 + 0.5); }
    out.gain.setValueAtTime(0.05, t + dur - 0.3); out.gain.linearRampToValueAtTime(0, t + dur);
    o.start(t); o.stop(t + dur);
  } else if (name === 'crash' || name === 'shot' || name === 'punch') {
    const n = noise(name === 'crash' ? 1.2 : 0.4); const f = ctx.createBiquadFilter(); f.type = 'lowpass';
    f.frequency.value = name === 'shot' ? 3000 : name === 'punch' ? 500 : 900; n.connect(f); f.connect(out);
    const len = name === 'crash' ? 1.1 : name === 'shot' ? 0.35 : 0.12;
    out.gain.setValueAtTime(name === 'punch' ? 0.25 : 0.5, t); out.gain.exponentialRampToValueAtTime(0.001, t + len);
    n.start(t); n.stop(t + len);
  } else if (name === 'screech') {
    const o = osc('sawtooth', 1200); const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 2200; o.connect(f); f.connect(out);
    out.gain.setValueAtTime(0.04, t); out.gain.linearRampToValueAtTime(0, t + 0.9); o.frequency.linearRampToValueAtTime(900, t + 0.9); o.start(t); o.stop(t + 0.9);
  } else if (name === 'ring') {
    const o = osc('sine', 880); const o2 = osc('sine', 1100); o.connect(out); o2.connect(out);
    for (let i = 0; i < 3; i++) { out.gain.setValueAtTime(0.06, t + i * 0.9); out.gain.setValueAtTime(0, t + i * 0.9 + 0.45); }
    o.start(t); o2.start(t); o.stop(t + 2.7); o2.stop(t + 2.7);
  } else if (name === 'ping' || name === 'page' || name === 'cash') {
    const o = osc('sine', name === 'cash' ? 1500 : name === 'ping' ? 1320 : 400); o.connect(out);
    out.gain.setValueAtTime(0.06, t); out.gain.exponentialRampToValueAtTime(0.001, t + 0.35); o.start(t); o.stop(t + 0.35);
  }
}
