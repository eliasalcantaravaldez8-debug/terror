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
