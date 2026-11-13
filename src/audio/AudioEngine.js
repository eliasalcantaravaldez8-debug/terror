/**
 * Procedural audio engine (Web Audio API). Every sound is synthesized at runtime
 * as a PROVISIONAL asset: the public API (playShot, playExplosion, helicopter loop...)
 * is what gameplay uses, so recorded samples can replace the synth later.
 */
export class AudioEngine {
  constructor(settings) {
    this.settings = settings;
    this.ctx = null;
    this.enabled = false;
    this.listener = { x: 0, y: 0, z: 0 };
    this._distantTimer = 3;
    this.battleIntensity = 0;
  }

  init() {
    if (this.ctx) { if (this.ctx.state === 'suspended') this.ctx.resume(); return; }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    const ctx = new AC();
    this.ctx = ctx;
    this.enabled = true;
    this.master = ctx.createGain();
    this.master.gain.value = this.settings.get('masterVolume');
    this.muffleFilter = ctx.createBiquadFilter();
    this.muffleFilter.type = 'lowpass';
    this.muffleFilter.frequency.value = 20000;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -14; comp.knee.value = 12; comp.ratio.value = 4; comp.attack.value = 0.003; comp.release.value = 0.25;
    this.master.connect(this.muffleFilter).connect(comp).connect(ctx.destination);

    this.sfx = ctx.createGain(); this.sfx.connect(this.master);
    this.amb = ctx.createGain(); this.amb.gain.value = 0.9; this.amb.connect(this.master);
    this.music = ctx.createGain(); this.music.gain.value = this.settings.get('musicVolume') * 0.5; this.music.connect(this.master);
    this.ui = ctx.createGain(); this.ui.connect(ctx.destination);

    this.noise = this._makeNoise(2.5);
    this.reverb = ctx.createConvolver();
    this.reverb.buffer = this._makeImpulse(2.2, 2.6);
    this.reverbSend = ctx.createGain(); this.reverbSend.gain.value = 0.55;
    this.reverbSend.connect(this.reverb).connect(this.sfx);

    this.settings.onChange((k, v) => {
      if (k === 'masterVolume') this.master.gain.value = v;
      if (k === 'musicVolume') this.music.gain.value = v * 0.5;
    });
    this._startAmbience();
    this._startMusic();
  }

  get now() { return this.ctx ? this.ctx.currentTime : 0; }

  _makeNoise(seconds) {
    const ctx = this.ctx;
    const buf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * seconds), ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    return buf;
  }
  _makeImpulse(seconds, decay) {
    const ctx = this.ctx;
    const len = Math.floor(ctx.sampleRate * seconds);
    const buf = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const d = buf.getChannelData(c);
      for (let i = 0; i < len; i++) {
        const t = i / len;
        // early reflections (building facades) + diffuse tail
        let v = (Math.random() * 2 - 1) * Math.pow(1 - t, decay);
        if (i % Math.floor(ctx.sampleRate * (0.031 + c * 0.007)) < 30 && t < 0.25) v += (Math.random() - 0.5) * 1.2 * (1 - t * 4);
        d[i] = v * 0.6;
      }
    }
    return buf;
  }

  setListener(pos, forward, up = { x: 0, y: 1, z: 0 }) {
    if (!this.ctx) return;
    this.listener = pos;
    const L = this.ctx.listener;
    const t = this.now;
    if (L.positionX) {
      L.positionX.setTargetAtTime(pos.x, t, 0.02); L.positionY.setTargetAtTime(pos.y, t, 0.02); L.positionZ.setTargetAtTime(pos.z, t, 0.02);
      L.forwardX.setTargetAtTime(forward.x, t, 0.02); L.forwardY.setTargetAtTime(forward.y, t, 0.02); L.forwardZ.setTargetAtTime(forward.z, t, 0.02);
      L.upX.value = up.x; L.upY.value = up.y; L.upZ.value = up.z;
    } else {
      L.setPosition(pos.x, pos.y, pos.z);
      L.setOrientation(forward.x, forward.y, forward.z, up.x, up.y, up.z);
    }
  }

  _panner(pos, ref = 4, rolloff = 1) {
    const p = this.ctx.createPanner();
    p.panningModel = 'equalpower';
    p.distanceModel = 'inverse';
    p.refDistance = ref;
    p.rolloffFactor = rolloff;
    p.maxDistance = 2000;
    if (p.positionX) { p.positionX.value = pos.x; p.positionY.value = pos.y; p.positionZ.value = pos.z; }
    else p.setPosition(pos.x, pos.y, pos.z);
    return p;
  }

  _dist(pos) {
    const l = this.listener;
    return Math.hypot(pos.x - l.x, pos.y - l.y, pos.z - l.z);
  }

  /** Noise burst helper: returns the final gain node (already started). */
  _burst(dest, { t = this.now, dur = 0.2, type = 'bandpass', freq = 1000, q = 1, gain = 1, attack = 0.001, freqEnd = null, rate = 1 }) {
    const ctx = this.ctx;
    const src = ctx.createBufferSource();
    src.buffer = this.noise;
    src.playbackRate.value = rate;
    const f = ctx.createBiquadFilter();
    f.type = type; f.frequency.setValueAtTime(freq, t); f.Q.value = q;
    if (freqEnd) f.frequency.exponentialRampToValueAtTime(Math.max(20, freqEnd), t + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(f).connect(g).connect(dest);
    src.start(t, Math.random() * 1.5);
    src.stop(t + dur + 0.05);
    return g;
  }
  _tone(dest, { t = this.now, dur = 0.2, type = 'sine', freq = 100, freqEnd = null, gain = 1, attack = 0.002 }) {
    const ctx = this.ctx;
    const o = ctx.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    if (freqEnd) o.frequency.exponentialRampToValueAtTime(Math.max(1, freqEnd), t + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(dest);
    o.start(t); o.stop(t + dur + 0.05);
    return g;
  }

  // ------------------------------------------------------------ weapons
  /** kind: rifle | pistol | sniper | mg | enemyRifle */
  playShot(pos, kind = 'rifle', isPlayer = false) {
    if (!this.ctx) return;
    const d = isPlayer ? 0 : this._dist(pos);
    const t = this.now + (isPlayer ? 0 : Math.min(0.5, d / 343));
    let dest;
    if (isPlayer) { dest = this.ctx.createGain(); dest.gain.value = 0.9; dest.connect(this.sfx); }
    else {
      const p = this._panner(pos, 6, 0.9);
      const lp = this.ctx.createBiquadFilter(); lp.type = 'lowpass';
      lp.frequency.value = Math.max(700, 16000 - d * 120);
      lp.connect(p).connect(this.sfx);
      dest = lp;
    }
    const send = this.ctx.createGain();
    send.gain.value = isPlayer ? 0.35 : 0.6;
    send.connect(this.reverbSend);
    const big = kind === 'sniper' ? 1.6 : kind === 'pistol' ? 0.7 : kind === 'mg' ? 1.1 : 1;
    const v = (0.8 + Math.random() * 0.2) * big;
    if (d < 90) this._burst(dest, { t, dur: 0.06, type: 'highpass', freq: 2400, gain: 0.9 * v, rate: 1 + Math.random() * 0.2 });
    this._burst(dest, { t, dur: 0.22 * big, type: 'bandpass', freq: kind === 'pistol' ? 900 : 520, q: 0.8, gain: 1.3 * v, freqEnd: 160 });
    this._tone(dest, { t, dur: 0.16 * big, freq: 140 * (kind === 'pistol' ? 1.4 : 1), freqEnd: 40, gain: 1.0 * v });
    this._burst(send, { t, dur: 0.3, type: 'bandpass', freq: 700, q: 0.6, gain: 0.9 * v });
    if (isPlayer) this._tone(dest, { t: t + 0.01, dur: 0.03, type: 'square', freq: 2200 + Math.random() * 300, gain: 0.04 });
    if (kind === 'sniper' && !isPlayer) this._burst(send, { t: t + 0.05, dur: 1.4, type: 'lowpass', freq: 900, gain: 0.6, freqEnd: 120 });
  }

  playDryFire() {
    if (!this.ctx) return;
    this._tone(this.sfx, { dur: 0.03, type: 'square', freq: 1800, gain: 0.08 });
    this._burst(this.sfx, { dur: 0.04, type: 'highpass', freq: 3000, gain: 0.15 });
  }

  /** Reload foley. stage: magOut | magIn | bolt | draw | pistolSlide */
  playFoley(stage) {
    if (!this.ctx) return;
    const t = this.now;
    switch (stage) {
      case 'magOut':
        this._burst(this.sfx, { t, dur: 0.06, type: 'bandpass', freq: 2500, q: 4, gain: 0.35 });
        this._tone(this.sfx, { t: t + 0.02, dur: 0.05, type: 'triangle', freq: 900, freqEnd: 600, gain: 0.12 });
        break;
      case 'magIn':
        this._burst(this.sfx, { t, dur: 0.05, type: 'bandpass', freq: 1800, q: 3, gain: 0.45 });
        this._burst(this.sfx, { t: t + 0.06, dur: 0.04, type: 'bandpass', freq: 3200, q: 5, gain: 0.5 });
        break;
      case 'bolt':
        this._burst(this.sfx, { t, dur: 0.05, type: 'bandpass', freq: 2200, q: 3, gain: 0.5 });
        this._burst(this.sfx, { t: t + 0.12, dur: 0.06, type: 'bandpass', freq: 2800, q: 4, gain: 0.6 });
        this._tone(this.sfx, { t: t + 0.12, dur: 0.04, type: 'square', freq: 1300, gain: 0.05 });
        break;
      case 'draw':
        this._burst(this.sfx, { t, dur: 0.18, type: 'bandpass', freq: 1200, q: 1.5, gain: 0.18, freqEnd: 2500 });
        break;
      case 'pin':
        this._tone(this.sfx, { t, dur: 0.08, type: 'triangle', freq: 3400, freqEnd: 2900, gain: 0.12 });
        this._burst(this.sfx, { t: t + 0.25, dur: 0.12, type: 'bandpass', freq: 900, gain: 0.2 });
        break;
      case 'ammo':
        for (let i = 0; i < 4; i++) this._burst(this.sfx, { t: t + i * 0.09, dur: 0.05, type: 'bandpass', freq: 2000 + i * 300, q: 3, gain: 0.3 });
        break;
    }
  }

  playImpact(pos, surface = 'concrete') {
    if (!this.ctx) return;
    const d = this._dist(pos);
    if (d > 60) return;
    const p = this._panner(pos, 2, 1.3);
    p.connect(this.sfx);
    const t = this.now;
    if (surface === 'metal') {
      this._tone(p, { t, dur: 0.12, type: 'triangle', freq: 2400 + Math.random() * 1500, freqEnd: 1500, gain: 0.25 });
      this._burst(p, { t, dur: 0.05, type: 'highpass', freq: 3500, gain: 0.4 });
    } else if (surface === 'flesh') {
      this._burst(p, { t, dur: 0.07, type: 'lowpass', freq: 600, gain: 0.7 });
    } else {
      this._burst(p, { t, dur: 0.08, type: 'bandpass', freq: 1400 + Math.random() * 800, q: 1.2, gain: 0.5 });
      this._burst(p, { t: t + 0.02, dur: 0.25, type: 'highpass', freq: 4000, gain: 0.08 });
    }
  }

  playWhiz(pos) {
    if (!this.ctx) return;
    const p = this._panner(pos, 1.5, 1.5);
    p.connect(this.sfx);
    const t = this.now;
    this._burst(p, { t, dur: 0.14, type: 'bandpass', freq: 3800, q: 6, gain: 0.5, attack: 0.02, freqEnd: 1600 });
    this._tone(p, { t, dur: 0.05, type: 'sawtooth', freq: 5000, freqEnd: 2500, gain: 0.05 });
  }

  playExplosion(pos, scale = 1) {
    if (!this.ctx) return;
    const d = this._dist(pos);
    const t = this.now + Math.min(0.6, d / 343);
    const p = this._panner(pos, 15, 0.7);
    p.connect(this.sfx);
    const send = this.ctx.createGain(); send.gain.value = 1.2; send.connect(this.reverbSend);
    this._burst(p, { t, dur: 2.2 * scale, type: 'lowpass', freq: 2500, freqEnd: 90, gain: 2.0 * scale, attack: 0.005 });
    this._tone(p, { t, dur: 1.4, freq: 70, freqEnd: 22, gain: 2.0 * scale });
    this._burst(send, { t, dur: 2.5, type: 'lowpass', freq: 1200, freqEnd: 100, gain: 1.4 });
    for (let i = 0; i < 12; i++) this._burst(p, { t: t + 0.4 + Math.random() * 1.6, dur: 0.05, type: 'bandpass', freq: 1500 + Math.random() * 2500, q: 2, gain: 0.15 });
  }

  playFootstep(surface = 'concrete', intensity = 1, wet = true) {
    if (!this.ctx) return;
    const t = this.now;
    const g = 0.12 * intensity;
    this._burst(this.sfx, { t, dur: 0.07, type: 'bandpass', freq: surface === 'metal' ? 900 : 380 + Math.random() * 120, q: 1.2, gain: g * 1.5 });
    this._burst(this.sfx, { t: t + 0.015, dur: 0.05, type: 'highpass', freq: 2500, gain: g * 0.5 });
    if (wet) this._burst(this.sfx, { t: t + 0.02, dur: 0.09, type: 'highpass', freq: 5000, gain: g * 0.6 });
    if (surface === 'metal') this._tone(this.sfx, { t, dur: 0.08, type: 'triangle', freq: 210 + Math.random() * 40, gain: g * 0.6 });
  }

  playCasing(pos) {
    if (!this.ctx || this._dist(pos) > 8) return;
    const t = this.now;
    this._tone(this.sfx, { t, dur: 0.06, type: 'sine', freq: 4200 + Math.random() * 1500, gain: 0.025 });
    this._tone(this.sfx, { t: t + 0.07, dur: 0.04, type: 'sine', freq: 3800 + Math.random() * 1500, gain: 0.015 });
  }

  playHitmarker(kill = false) {
    if (!this.ctx) return;
    const t = this.now;
    this._tone(this.ui, { t, dur: 0.05, type: 'square', freq: kill ? 1500 : 2200, gain: 0.05 });
    if (kill) this._tone(this.ui, { t: t + 0.06, dur: 0.08, type: 'square', freq: 1100, gain: 0.04 });
  }

  playHurt() {
    if (!this.ctx) return;
    const t = this.now;
    this._burst(this.sfx, { t, dur: 0.18, type: 'lowpass', freq: 400, gain: 0.9 });
    this._tone(this.sfx, { t, dur: 0.12, freq: 90, freqEnd: 50, gain: 0.6 });
  }

  playGrenadeBounce(pos) {
    if (!this.ctx) return;
    const p = this._panner(pos, 3, 1.2); p.connect(this.sfx);
    this._tone(p, { dur: 0.06, type: 'triangle', freq: 1400 + Math.random() * 400, gain: 0.2 });
  }

  /** Heartbeat for low health. */
  playHeartbeat(strength = 1) {
    if (!this.ctx) return;
    const t = this.now;
    this._tone(this.sfx, { t, dur: 0.12, freq: 60, freqEnd: 40, gain: 0.5 * strength });
    this._tone(this.sfx, { t: t + 0.22, dur: 0.12, freq: 55, freqEnd: 38, gain: 0.35 * strength });
  }

  // ------------------------------------------------------------ radio & ui
  radioSquelch(start = true) {
    if (!this.ctx) return;
    const t = this.now;
    if (start) this._tone(this.sfx, { t, dur: 0.07, type: 'square', freq: 1450, gain: 0.04 });
    this._burst(this.sfx, { t: t + (start ? 0.05 : 0), dur: 0.16, type: 'bandpass', freq: 2500, q: 0.8, gain: 0.12 });
    if (!start) this._tone(this.sfx, { t: t + 0.12, dur: 0.05, type: 'square', freq: 1100, gain: 0.035 });
  }

  /** Low static bed while a radio line plays. */
  radioStatic(duration) {
    if (!this.ctx) return;
    this._burst(this.sfx, { dur: duration, type: 'bandpass', freq: 3000, q: 0.5, gain: 0.025, attack: 0.05 });
  }

  uiClick() {
    if (!this.ctx) return;
    this._tone(this.ui, { dur: 0.04, type: 'triangle', freq: 1200, gain: 0.05 });
  }

  /** Temporary deafness: lowpass master + ringing (used for the sniper shot / explosions). */
  concussion(duration = 2.5, strength = 1) {
    if (!this.ctx) return;
    const t = this.now;
    const f = this.muffleFilter.frequency;
    f.cancelScheduledValues(t);
    f.setValueAtTime(f.value, t);
    f.exponentialRampToValueAtTime(380 + (1 - strength) * 1500, t + 0.05);
    f.exponentialRampToValueAtTime(20000, t + duration);
    this._tone(this.ctx.destination, { t, dur: duration, freq: 3800 + Math.random() * 400, gain: 0.04 * strength, attack: 0.05 });
  }

  // ------------------------------------------------------------ loops
  _loopNoise(dest, { type = 'bandpass', freq = 500, q = 0.7, gain = 0.1 }) {
    const ctx = this.ctx;
    const src = ctx.createBufferSource();
    src.buffer = this.noise; src.loop = true;
    const f = ctx.createBiquadFilter(); f.type = type; f.frequency.value = freq; f.Q.value = q;
    const g = ctx.createGain(); g.gain.value = gain;
    src.connect(f).connect(g).connect(dest);
    src.start(0, Math.random() * 2);
    return { src, f, g };
  }

  _startAmbience() {
    this.wind = this._loopNoise(this.amb, { type: 'bandpass', freq: 380, q: 0.6, gain: 0.07 });
    const lfo = this.ctx.createOscillator(); lfo.frequency.value = 0.07;
    const lg = this.ctx.createGain(); lg.gain.value = 180;
    lfo.connect(lg).connect(this.wind.f.frequency); lfo.start();
    this.rain = this._loopNoise(this.amb, { type: 'highpass', freq: 1800, q: 0.3, gain: 0.045 });
    this.ambGain = this.amb.gain;
  }

  setAmbience({ wind = 0.07, rain = 0.045 } = {}) {
    if (!this.ctx) return;
    const t = this.now;
    this.wind.g.gain.setTargetAtTime(wind, t, 0.5);
    this.rain.g.gain.setTargetAtTime(rain, t, 0.5);
  }

  /** Distant battle: random far gunfire & explosions to sell a city at war. */
  updateDistantBattle(dt) {
    if (!this.ctx) return;
    this._distantTimer -= dt;
    if (this._distantTimer > 0) return;
    this._distantTimer = 0.6 + Math.random() * (5 - this.battleIntensity * 3.5);
    const a = Math.random() * Math.PI * 2, d = 250 + Math.random() * 500;
    const pos = { x: this.listener.x + Math.cos(a) * d, y: 10, z: this.listener.z + Math.sin(a) * d };
    if (Math.random() < 0.12) { this.playFarExplosion(pos); return; }
    const n = 2 + Math.floor(Math.random() * 7);
    const p = this._panner(pos, 50, 1); p.connect(this.amb);
    const t = this.now;
    for (let i = 0; i < n; i++) {
      const tt = t + i * (0.08 + Math.random() * 0.1);
      this._burst(p, { t: tt, dur: 0.35, type: 'lowpass', freq: 700, gain: 0.9 });
      this._tone(p, { t: tt, dur: 0.2, freq: 90, freqEnd: 40, gain: 0.4 });
    }
  }
  playFarExplosion(pos) {
    const p = this._panner(pos, 60, 1); p.connect(this.amb);
    this._burst(p, { dur: 3, type: 'lowpass', freq: 500, freqEnd: 60, gain: 2.2, attack: 0.02 });
    this._tone(p, { dur: 1.8, freq: 45, freqEnd: 20, gain: 1.4 });
  }

  /**
   * Helicopter loop with rotor "whop", turbine whine and air rush.
   * Returns a controller to drive position, rpm, cabin filtering and volume.
   */
  createHelicopter() {
    if (!this.ctx) return null;
    const ctx = this.ctx;
    const out = ctx.createGain(); out.gain.value = 0;
    const cabin = ctx.createBiquadFilter(); cabin.type = 'lowpass'; cabin.frequency.value = 18000;
    const panner = this._panner({ x: 0, y: 0, z: 0 }, 18, 0.8);
    const direct = ctx.createGain(); direct.gain.value = 1;
    const spatial = ctx.createGain(); spatial.gain.value = 0;
    out.connect(cabin);
    cabin.connect(direct).connect(this.sfx);
    cabin.connect(spatial).connect(panner).connect(this.sfx);

    // rotor blades: low noise amplitude-modulated at blade-pass frequency
    const rotor = this._loopNoise(out, { type: 'lowpass', freq: 260, q: 1.2, gain: 0.0 });
    const rotorBase = ctx.createConstantSource ? ctx.createConstantSource() : null;
    const lfo = ctx.createOscillator(); lfo.type = 'sawtooth'; lfo.frequency.value = 17;
    const shaper = ctx.createWaveShaper();
    const curve = new Float32Array(256);
    for (let i = 0; i < 256; i++) { const x = i / 255; curve[i] = Math.pow(x, 5) * 2.2; }
    shaper.curve = curve;
    const depth = ctx.createGain(); depth.gain.value = 1.4;
    lfo.connect(shaper).connect(depth).connect(rotor.g.gain);
    lfo.start();
    if (rotorBase) { rotorBase.offset.value = 0.08; rotorBase.connect(rotor.g.gain); rotorBase.start(); }
    // slap (higher band, same modulation)
    const slap = this._loopNoise(out, { type: 'bandpass', freq: 900, q: 1.5, gain: 0 });
    const d2 = ctx.createGain(); d2.gain.value = 0.25;
    shaper.connect(d2).connect(slap.g.gain);
    // turbine
    const tg = ctx.createGain(); tg.gain.value = 0.012; tg.connect(out);
    const t1 = ctx.createOscillator(); t1.type = 'sine'; t1.frequency.value = 1180; t1.connect(tg); t1.start();
    const t2 = ctx.createOscillator(); t2.type = 'triangle'; t2.frequency.value = 2365; const t2g = ctx.createGain(); t2g.gain.value = 0.5; t2.connect(t2g).connect(tg); t2.start();
    const air = this._loopNoise(out, { type: 'bandpass', freq: 1300, q: 0.4, gain: 0.05 });
    const rumble = this._loopNoise(out, { type: 'lowpass', freq: 90, q: 0.8, gain: 0.35 });

    const self = this;
    return {
      setRPM(r) { // 0..1
        const t = self.now;
        lfo.frequency.setTargetAtTime(4 + 13 * r, t, 0.3);
        t1.frequency.setTargetAtTime(500 + 680 * r, t, 0.4);
        t2.frequency.setTargetAtTime(1000 + 1365 * r, t, 0.4);
        tg.gain.setTargetAtTime(0.004 + 0.012 * r, t, 0.3);
      },
      setVolume(v, time = 0.3) { out.gain.setTargetAtTime(v, self.now, time); },
      setInside(inside) {
        const t = self.now;
        cabin.frequency.setTargetAtTime(inside ? 2200 : 18000, t, 0.4);
        direct.gain.setTargetAtTime(inside ? 1 : 0, t, 0.4);
        spatial.gain.setTargetAtTime(inside ? 0 : 1.6, t, 0.4);
        rumble.g.gain.setTargetAtTime(inside ? 0.45 : 0.12, t, 0.4);
        air.g.gain.setTargetAtTime(inside ? 0.09 : 0.04, t, 0.4);
      },
      setPosition(p) {
        if (panner.positionX) { panner.positionX.value = p.x; panner.positionY.value = p.y; panner.positionZ.value = p.z; }
        else panner.setPosition(p.x, p.y, p.z);
      },
      stop() { out.gain.setTargetAtTime(0, self.now, 0.5); },
    };
  }

  // ------------------------------------------------------------ music (adaptive drone)
  _startMusic() {
    const ctx = this.ctx;
    const out = ctx.createGain(); out.gain.value = 0; out.connect(this.music);
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 600; lp.Q.value = 0.5;
    lp.connect(out);
    const notes = [55, 82.4, 110, 130.8];
    this.musicOscs = notes.map((f, i) => {
      const o = ctx.createOscillator(); o.type = 'sawtooth'; o.frequency.value = f; o.detune.value = (i - 1.5) * 7;
      const g = ctx.createGain(); g.gain.value = 0.05;
      o.connect(g).connect(lp); o.start();
      return o;
    });
    const pulse = ctx.createOscillator(); pulse.frequency.value = 0.5;
    const pg = ctx.createGain(); pg.gain.value = 0;
    pulse.connect(pg).connect(out.gain);
    pulse.start();
    this.musicOut = out; this.musicLP = lp; this.musicPulse = pg;
  }

  setMusicIntensity(i) {
    if (!this.ctx) return;
    const t = this.now;
    this.musicOut.gain.setTargetAtTime(0.25 * i, t, 1.5);
    this.musicLP.frequency.setTargetAtTime(300 + i * 1200, t, 2);
    this.musicPulse.gain.setTargetAtTime(0.06 * i, t, 2);
  }

  /** Cinematic stinger (low brass hit + boom). */
  stinger() {
    if (!this.ctx) return;
    const t = this.now;
    for (const f of [55, 65.4, 82.4, 110]) this._tone(this.music, { t, dur: 2.5, type: 'sawtooth', freq: f, gain: 0.08, attack: 0.03 });
    this._tone(this.music, { t, dur: 1.8, freq: 45, freqEnd: 30, gain: 0.6 });
    this._burst(this.music, { t, dur: 1.2, type: 'lowpass', freq: 300, gain: 0.5 });
  }
}
