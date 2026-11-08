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
  // perfis de som por motor
  setProfile(p) {
    if (!this.ctx || p === this.profile) return; this.profile = p;
    const P = ENGINE_PROFILES[p] || ENGINE_PROFILES.normal;
    this.o1.type = P.w1; this.o2.type = P.w2; this.P = P;
  }
  update(on, speed, throttle, profile = 'normal') {
    if (!this.ctx) return;
    this.setProfile(profile);
    const P = this.P || ENGINE_PROFILES.normal;
    const t = this.ctx.currentTime;
    const gear = Math.min(P.gears, Math.floor(Math.abs(speed) / P.gearSpan));
    const rpm = 0.25 + ((Math.abs(speed) - gear * P.gearSpan) / P.gearSpan) * 0.6 + throttle * 0.15;
    const f = P.base + rpm * P.range + gear * 6;
    this.o1.frequency.setTargetAtTime(f, t, 0.05);
    this.o2.frequency.setTargetAtTime(f * P.ratio, t, 0.05);
    this.filter.frequency.setTargetAtTime(P.cut + throttle * P.cutT + rpm * 400, t, 0.08);
    this.gain.gain.setTargetAtTime(on && this.enabled ? (0.05 + throttle * 0.05) * P.vol : 0, t, 0.15);
  }
}
const ENGINE_PROFILES = {
  normal: { w1: 'sawtooth', w2: 'square', base: 38, range: 70, ratio: 0.5, gears: 4, gearSpan: 9, cut: 400, cutT: 900, vol: 1 },
  small: { w1: 'sawtooth', w2: 'square', base: 48, range: 85, ratio: 0.5, gears: 4, gearSpan: 8, cut: 500, cutT: 800, vol: 0.85 },
  heavy: { w1: 'sawtooth', w2: 'sawtooth', base: 30, range: 55, ratio: 0.5, gears: 4, gearSpan: 9, cut: 320, cutT: 700, vol: 1.1 },
  boxer: { w1: 'square', w2: 'square', base: 26, range: 45, ratio: 0.75, gears: 3, gearSpan: 9, cut: 280, cutT: 500, vol: 1 },
  v8: { w1: 'sawtooth', w2: 'sawtooth', base: 32, range: 75, ratio: 0.5, gears: 5, gearSpan: 11, cut: 380, cutT: 1100, vol: 1.15 },
  v12: { w1: 'sawtooth', w2: 'triangle', base: 55, range: 140, ratio: 2, gears: 6, gearSpan: 15, cut: 900, cutT: 2200, vol: 1.1 },
};

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
  } else if (name === 'shotgun') {
    const n = noise(0.6); const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 1400; n.connect(f); f.connect(out);
    out.gain.setValueAtTime(0.7, t); out.gain.exponentialRampToValueAtTime(0.001, t + 0.55); n.start(t); n.stop(t + 0.55);
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
