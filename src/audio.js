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
  moto: { w1: 'square', w2: 'sawtooth', base: 60, range: 160, ratio: 1.5, gears: 6, gearSpan: 13, cut: 1100, cutT: 2600, vol: 0.9 },
  jet: { w1: 'sawtooth', w2: 'triangle', base: 70, range: 260, ratio: 3, gears: 1, gearSpan: 100, cut: 2400, cutT: 5200, vol: 0.9 },
  turbo: { w1: 'sawtooth', w2: 'sawtooth', base: 40, range: 95, ratio: 0.5, gears: 5, gearSpan: 12, cut: 600, cutT: 1500, vol: 1.15 },
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
  } else if (name === 'rifle' || name === 'smg') { // AK-47 (grave e seco) / metralhadora (curto e agudo)
    const n = noise(0.3); const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = name === 'rifle' ? 2000 : 4200; n.connect(f); f.connect(out);
    const len = name === 'rifle' ? 0.28 : 0.13;
    out.gain.setValueAtTime(name === 'rifle' ? 0.6 : 0.38, t); out.gain.exponentialRampToValueAtTime(0.001, t + len); n.start(t); n.stop(t + len);
  } else if (name === 'crash' || name === 'shot' || name === 'punch') {
    const n = noise(name === 'crash' ? 1.2 : 0.4); const f = ctx.createBiquadFilter(); f.type = 'lowpass';
    f.frequency.value = name === 'shot' ? 3000 : name === 'punch' ? 500 : 900; n.connect(f); f.connect(out);
    const len = name === 'crash' ? 1.1 : name === 'shot' ? 0.35 : 0.12;
    out.gain.setValueAtTime(name === 'punch' ? 0.25 : 0.5, t); out.gain.exponentialRampToValueAtTime(0.001, t + len);
    n.start(t); n.stop(t + len);
  } else if (name === 'impact') { // bala acertando o corpo: baque abafado
    const n = noise(0.15); const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 420; n.connect(f); f.connect(out);
    out.gain.setValueAtTime(0.45, t); out.gain.exponentialRampToValueAtTime(0.001, t + 0.12); n.start(t); n.stop(t + 0.15);
  } else if (name === 'ricochet') { // ricochete: zunido metálico que cai
    const o = osc('sine', 2600 + Math.random() * 1200); o.connect(out); o.frequency.exponentialRampToValueAtTime(900, t + 0.35);
    out.gain.setValueAtTime(0.05, t); out.gain.exponentialRampToValueAtTime(0.001, t + 0.38); o.start(t); o.stop(t + 0.4);
  } else if (name === 'whiz') { // bala passando perto da cabeça
    const n = noise(0.25); const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.Q.value = 3; f.frequency.setValueAtTime(5200, t); f.frequency.exponentialRampToValueAtTime(1500, t + 0.2); n.connect(f); f.connect(out);
    out.gain.setValueAtTime(0.0001, t); out.gain.exponentialRampToValueAtTime(0.25, t + 0.06); out.gain.exponentialRampToValueAtTime(0.001, t + 0.22); n.start(t); n.stop(t + 0.25);
  } else if (name === 'click') { // gatilho sem munição
    const o = osc('square', 1800); o.connect(out); out.gain.setValueAtTime(0.06, t); out.gain.exponentialRampToValueAtTime(0.001, t + 0.03); o.start(t); o.stop(t + 0.04);
  } else if (name === 'reload') { // pente saindo e entrando
    for (const [dt2, fq] of [[0, 900], [0.45, 1300], [0.55, 700]]) { const n = noise(0.06); const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = fq; f.Q.value = 4; const gg = ctx.createGain(); n.connect(f); f.connect(gg); gg.connect(out);
      gg.gain.setValueAtTime(0.5, t + dt2); gg.gain.exponentialRampToValueAtTime(0.001, t + dt2 + 0.05); n.start(t + dt2); n.stop(t + dt2 + 0.06); }
  } else if (name === 'whistle' || name === 'whistle3') { // apito do árbitro (com trinado)
    const n2 = name === 'whistle3' ? 3 : 1;
    for (let i = 0; i < n2; i++) { const t0 = t + i * 0.45; const o = osc('sine', 3100); const lfo = osc('square', 28); const lg = ctx.createGain(); lg.gain.value = 120; lfo.connect(lg); lg.connect(o.frequency); const gg = ctx.createGain(); o.connect(gg); gg.connect(out);
      const len = i === n2 - 1 && n2 > 1 ? 0.8 : 0.32; gg.gain.setValueAtTime(0.0001, t0); gg.gain.exponentialRampToValueAtTime(0.09, t0 + 0.02); gg.gain.setValueAtTime(0.09, t0 + len - 0.05); gg.gain.exponentialRampToValueAtTime(0.0001, t0 + len); o.start(t0); lfo.start(t0); o.stop(t0 + len); lfo.stop(t0 + len); }
  } else if (name === 'kick') { // chute na bola
    const o = osc('sine', 160); o.frequency.exponentialRampToValueAtTime(60, t + 0.08); o.connect(out); out.gain.setValueAtTime(0.35, t); out.gain.exponentialRampToValueAtTime(0.001, t + 0.1); o.start(t); o.stop(t + 0.11);
  } else if (name === 'goalHome' || name === 'goalAway') { // explosão da torcida num gol
    const len = name === 'goalHome' ? 5.5 : 3; const n = noise(len); const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 900; f.Q.value = 0.5; n.connect(f); f.connect(out);
    const peak = name === 'goalHome' ? 0.55 : 0.3; out.gain.setValueAtTime(0.02, t); out.gain.linearRampToValueAtTime(peak, t + 0.35); out.gain.linearRampToValueAtTime(peak * 0.6, t + len * 0.6); out.gain.linearRampToValueAtTime(0.0001, t + len); n.start(t); n.stop(t + len);
  } else if (name === 'buzzer') { // campainha da cela
    const o = osc('square', 110); const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 900; o.connect(f); f.connect(out);
    out.gain.setValueAtTime(0.12, t); out.gain.setValueAtTime(0.12, t + dur - 0.05); out.gain.linearRampToValueAtTime(0, t + dur); o.start(t); o.stop(t + dur);
  } else if (name === 'gate') { // grade de ferro correndo no trilho + batida no fim
    const n = noise(dur + 0.3); const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 650; f.Q.value = 1.5; n.connect(f); f.connect(out);
    out.gain.setValueAtTime(0.0, t); out.gain.linearRampToValueAtTime(0.22, t + 0.15); for (let i = 0; i < dur * 8; i++) out.gain.setValueAtTime(0.14 + Math.random() * 0.1, t + 0.15 + i / 8);
    out.gain.setValueAtTime(0.55, t + dur); out.gain.exponentialRampToValueAtTime(0.001, t + dur + 0.3); n.start(t); n.stop(t + dur + 0.3);
  } else if (name === 'bark' || name === 'yelp') { // latido: 2 "au" (ruído filtrado + tom que cai); ganido: agudo e curto
    const n2 = name === 'yelp' ? 1 : 2;
    for (let i = 0; i < n2; i++) {
      const t0 = t + i * 0.28; const o = osc('sawtooth', name === 'yelp' ? 900 : 420); const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = name === 'yelp' ? 1400 : 700; f.Q.value = 1.2;
      const gg = ctx.createGain(); o.connect(f); f.connect(gg); gg.connect(out);
      o.frequency.setValueAtTime(name === 'yelp' ? 1100 : 480, t0); o.frequency.exponentialRampToValueAtTime(name === 'yelp' ? 700 : 260, t0 + 0.14);
      gg.gain.setValueAtTime(0.0001, t0); gg.gain.exponentialRampToValueAtTime(name === 'yelp' ? 0.12 : 0.22, t0 + 0.015); gg.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.16);
      o.start(t0); o.stop(t0 + 0.18);
    }
    out.gain.value = 0.9;
  } else if (name === 'meow') { // miado: vogal "mi-au" com vibrato
    const o = osc('triangle', 520); const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 1100; f.Q.value = 2; o.connect(f); f.connect(out);
    o.frequency.setValueAtTime(520, t); o.frequency.linearRampToValueAtTime(820, t + 0.18); o.frequency.linearRampToValueAtTime(560, t + 0.55);
    const lfo = osc('sine', 7); const lg = ctx.createGain(); lg.gain.value = 18; lfo.connect(lg); lg.connect(o.frequency);
    out.gain.setValueAtTime(0.0001, t); out.gain.linearRampToValueAtTime(0.16, t + 0.06); out.gain.linearRampToValueAtTime(0.0001, t + 0.6);
    o.start(t); lfo.start(t); o.stop(t + 0.62); lfo.stop(t + 0.62);
  } else if (name === 'hiss') {
    const n = noise(0.5); const f = ctx.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = 3000; n.connect(f); f.connect(out);
    out.gain.setValueAtTime(0.12, t); out.gain.linearRampToValueAtTime(0, t + 0.45); n.start(t); n.stop(t + 0.5);
  } else if (name === 'purr') { // ronronar: ruído grave pulsando ~25 Hz
    const n = noise(dur); const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 180; n.connect(f); const am = ctx.createGain(); f.connect(am); am.connect(out);
    const lfo = osc('sine', 24); const lg = ctx.createGain(); lg.gain.value = 0.5; am.gain.value = 0.5; lfo.connect(lg); lg.connect(am.gain);
    out.gain.setValueAtTime(0.0001, t); out.gain.linearRampToValueAtTime(0.35, t + 0.3); out.gain.linearRampToValueAtTime(0.0001, t + dur);
    n.start(t); lfo.start(t); n.stop(t + dur); lfo.stop(t + dur);
  } else if (name === 'explosion') { // estrondo grave + chiado longo
    const n = noise(2.4); const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.setValueAtTime(2200, t); f.frequency.exponentialRampToValueAtTime(180, t + 2.2); n.connect(f); f.connect(out);
    const o = osc('sine', 70); const og = ctx.createGain(); o.connect(og); og.connect(ctx.destination); o.frequency.exponentialRampToValueAtTime(28, t + 1.2);
    og.gain.setValueAtTime(0.9, t); og.gain.exponentialRampToValueAtTime(0.001, t + 1.3);
    out.gain.setValueAtTime(0.95, t); out.gain.exponentialRampToValueAtTime(0.001, t + 2.3); n.start(t); n.stop(t + 2.3); o.start(t); o.stop(t + 1.3);
  } else if (name === 'fire') { // estalos de fogo
    const n = noise(dur); const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 900; f.Q.value = 0.6; n.connect(f); f.connect(out);
    out.gain.setValueAtTime(0.0, t); for (let i = 0; i < dur * 12; i++) out.gain.setValueAtTime(0.03 + Math.random() * 0.12, t + i / 12);
    out.gain.linearRampToValueAtTime(0, t + dur); n.start(t); n.stop(t + dur);
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

// barulho constante da torcida (murmúrio que cresce com a empolgação) + palmas ritmadas quando está animada
export function crowdAmbience(ctx) {
  const len = 4, b = ctx.createBuffer(1, ctx.sampleRate * len, ctx.sampleRate), d = b.getChannelData(0);
  let last = 0; for (let i = 0; i < d.length; i++) { const w = Math.random() * 2 - 1; last = (last + 0.02 * w) / 1.02; d[i] = last * 3.5 + w * 0.15; }
  const src = ctx.createBufferSource(); src.buffer = b; src.loop = true;
  const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 650; f.Q.value = 0.6;
  const g = ctx.createGain(); g.gain.value = 0; src.connect(f); f.connect(g); g.connect(ctx.destination); src.start();
  let clapT = 0;
  return {
    set(level, excite, dt) {
      const t = ctx.currentTime; g.gain.setTargetAtTime(level * (0.05 + excite * 0.16), t, 0.25); f.frequency.setTargetAtTime(500 + excite * 600, t, 0.4);
      // palmas ritmadas (cantoria) quando empolgada
      if (level > 0.15 && excite > 0.5 && (clapT -= dt) <= 0) { clapT = 0.55; const n = ctx.createBufferSource(); const nb = ctx.createBuffer(1, ctx.sampleRate * 0.08, ctx.sampleRate); const nd = nb.getChannelData(0); for (let i = 0; i < nd.length; i++) nd[i] = (Math.random() * 2 - 1) * (1 - i / nd.length);
        n.buffer = nb; const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 1200; const cg = ctx.createGain(); cg.gain.value = level * 0.12 * excite; n.connect(hp); hp.connect(cg); cg.connect(ctx.destination); n.start(); }
    },
  };
}
