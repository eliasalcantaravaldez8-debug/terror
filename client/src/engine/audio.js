// Áudio procedural (WebAudio): efeitos sintetizados, ambiente de chuva/vento/torcida e motor.
// Assets de áudio do projeto (mp3/ogg/wav) também podem ser tocados por id.
export class AudioSystem {
  constructor(resolveAsset) {
    this.resolveAsset = resolveAsset || (() => null);
    this.ctx = null;
    this.buffers = new Map();
    this.unlock = () => {
      if (this.ctx) return;
      try {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.master = this.ctx.createGain(); this.master.gain.value = 0.7; this.master.connect(this.ctx.destination);
        this.startAmbient();
      } catch { this.ctx = null; }
    };
    window.addEventListener('pointerdown', this.unlock, { once: true });
    window.addEventListener('keydown', this.unlock, { once: true });
  }

  noiseBuffer(seconds = 2) {
    const b = this.ctx.createBuffer(1, this.ctx.sampleRate * seconds, this.ctx.sampleRate);
    const d = b.getChannelData(0); let last = 0;
    for (let i = 0; i < d.length; i++) { const w = Math.random() * 2 - 1; last = (last + 0.02 * w) / 1.02; d[i] = last * 3.5; }
    return b;
  }

  setAmbient(kind) { this.ambientKind = kind; if (this.ctx) this.startAmbient(); }

  startAmbient() {
    if (!this.ctx || !this.ambientKind || this.ambientNode) return;
    const src = this.ctx.createBufferSource(); src.buffer = this.noiseBuffer(4); src.loop = true;
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();
    if (/rain|storm/.test(this.ambientKind)) { filter.type = 'highpass'; filter.frequency.value = 900; gain.gain.value = 0.35; }
    else if (/crowd|stadium/.test(this.ambientKind)) { filter.type = 'bandpass'; filter.frequency.value = 700; filter.Q.value = 0.6; gain.gain.value = 0.25; }
    else { filter.type = 'lowpass'; filter.frequency.value = 400; gain.gain.value = 0.15; }
    src.connect(filter).connect(gain).connect(this.master); src.start();
    this.ambientNode = { src, gain };
  }

  tone({ freq = 440, to, dur = 0.15, type = 'sine', vol = 0.3, noise = false, filter }) {
    const c = this.ctx; const t = c.currentTime;
    const g = c.createGain(); g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    let src;
    if (noise) { src = c.createBufferSource(); src.buffer = this.noise || (this.noise = this.noiseBuffer(1)); }
    else { src = c.createOscillator(); src.type = type; src.frequency.setValueAtTime(freq, t); if (to) src.frequency.exponentialRampToValueAtTime(to, t + dur); }
    if (filter) { const f = c.createBiquadFilter(); f.type = filter.type; f.frequency.value = filter.freq; src.connect(f).connect(g); } else src.connect(g);
    g.connect(this.master); src.start(t); src.stop(t + dur + 0.05);
  }

  async play(name, { volume = 1 } = {}) {
    if (!this.ctx) return;
    const v = volume;
    switch (name) {
      case 'jump': return this.tone({ freq: 220, to: 520, dur: 0.18, type: 'triangle', vol: 0.2 * v });
      case 'step': return this.tone({ noise: true, dur: 0.06, vol: 0.12 * v, filter: { type: 'lowpass', freq: 600 } });
      case 'hit': return this.tone({ noise: true, dur: 0.14, vol: 0.35 * v, filter: { type: 'lowpass', freq: 1200 } });
      case 'kick': this.tone({ freq: 140, to: 60, dur: 0.12, type: 'sine', vol: 0.5 * v }); return this.tone({ noise: true, dur: 0.05, vol: 0.2 * v, filter: { type: 'highpass', freq: 2000 } });
      case 'pickup': this.tone({ freq: 660, dur: 0.1, type: 'square', vol: 0.12 * v }); return setTimeout(() => this.tone({ freq: 990, dur: 0.16, type: 'square', vol: 0.12 * v }), 90);
      case 'goal': [523, 659, 784, 1046].forEach((f, i) => setTimeout(() => this.tone({ freq: f, dur: 0.25, type: 'triangle', vol: 0.22 * v }), i * 110)); return;
      case 'thunder': return this.tone({ noise: true, dur: 2.5, vol: 0.6 * v, filter: { type: 'lowpass', freq: 180 } });
      default: {
        const url = this.resolveAsset(name);
        if (!url) return;
        let buf = this.buffers.get(url);
        if (!buf) { const res = await fetch(url); buf = await this.ctx.decodeAudioData(await res.arrayBuffer()); this.buffers.set(url, buf); }
        const s = this.ctx.createBufferSource(); s.buffer = buf; const g = this.ctx.createGain(); g.gain.value = v; s.connect(g).connect(this.master); s.start();
      }
    }
  }

  engine(level) {
    if (!this.ctx) return;
    if (!this.engineOsc) {
      this.engineOsc = this.ctx.createOscillator(); this.engineOsc.type = 'sawtooth';
      this.engineGain = this.ctx.createGain(); this.engineGain.gain.value = 0.04;
      const f = this.ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 900;
      this.engineOsc.connect(f).connect(this.engineGain).connect(this.master); this.engineOsc.start();
    }
    this.engineOsc.frequency.setTargetAtTime(55 + level * 180, this.ctx.currentTime, 0.05);
  }

  dispose() { try { this.ctx?.close(); } catch { /* ignore */ } }
}
