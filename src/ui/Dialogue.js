/**
 * Dialogue & subtitles. Lines are data-driven; voice playback currently uses the
 * browser's speech synthesis as a PROVISIONAL stand-in for recorded voice acting.
 */
const VOICES = {
  KANE: { pitch: 0.7, rate: 1.0 },
  RUIZ: { pitch: 1.25, rate: 1.08 },
  BRIGGS: { pitch: 1.1, rate: 1.12 },
  OKAFOR: { pitch: 0.85, rate: 0.98 },
  'FALCON 2-1': { pitch: 0.95, rate: 1.1 },
  'BASTIÃO': { pitch: 0.8, rate: 1.0 },
  MERCER: { pitch: 0.8, rate: 1.0 },
};

export class Dialogue {
  constructor(game) {
    this.game = game;
    this.current = null;
    this.queue = [];
    this.timer = 0;
    this.barkTimer = 0;
    this.voiceList = [];
    this.speakerActors = {};
    if (typeof speechSynthesis !== 'undefined') {
      const load = () => { this.voiceList = speechSynthesis.getVoices().filter((v) => /^pt/i.test(v.lang)); };
      load();
      speechSynthesis.onvoiceschanged = load;
    }
  }

  registerActor(speaker, actor) { this.speakerActors[speaker] = actor; }

  /** Queue a single line {speaker, text, radio, duration, gap, onStart, onDone}. */
  say(line) {
    this.queue.push(line);
    if (!this.current) this._next();
  }

  sequence(lines) { for (const l of lines) this.say(l); }

  clear() {
    this.queue.length = 0;
    this.current = null;
    try { if (typeof speechSynthesis !== 'undefined') speechSynthesis.cancel(); } catch { /* ignore */ }
    this.game.events.emit('subtitle', null);
  }

  get busy() { return !!this.current || this.queue.length > 0; }

  bark(speaker, text, actor) {
    if (this.current || this.barkTimer > 0) return;
    this.barkTimer = 2.4;
    this.game.events.emit('subtitle', { speaker, text, radio: false, bark: true });
    this._speak(speaker, text, 0.8);
    if (actor) { actor.talk = 1; setTimeout(() => (actor.talk = 0), 1500); }
    this._barkClear = 2.2;
  }

  _next() {
    const line = this.queue.shift();
    if (!line) { this.current = null; this.game.events.emit('subtitle', null); return; }
    this.current = line;
    const dur = line.duration ?? Math.max(2.0, line.text.length * 0.062);
    this.timer = dur + (line.gap ?? 0.35);
    line._dur = dur;
    this.game.events.emit('subtitle', { speaker: line.speaker, text: line.text, radio: !!line.radio });
    if (line.radio) { this.game.audio.radioSquelch(true); this.game.audio.radioStatic(dur); }
    this._speak(line.speaker, line.text, 1);
    const actor = this.speakerActors[line.speaker];
    if (actor) actor.talk = 1;
    line.onStart?.();
  }

  _speak(speaker, text, volume) {
    if (!this.game.settings.get('voices') || typeof speechSynthesis === 'undefined' || this.game.testMode) return;
    try {
      const u = new SpeechSynthesisUtterance(text.replace(/[—–]/g, ','));
      u.lang = 'pt-BR';
      const v = VOICES[speaker] || { pitch: 1, rate: 1 };
      u.pitch = v.pitch; u.rate = v.rate * 1.05;
      u.volume = volume * this.game.settings.get('masterVolume');
      if (this.voiceList.length) u.voice = this.voiceList[0];
      speechSynthesis.speak(u);
    } catch { /* speech unavailable */ }
  }

  update(dt) {
    this.barkTimer -= dt;
    if (this._barkClear > 0) {
      this._barkClear -= dt;
      if (this._barkClear <= 0 && !this.current) this.game.events.emit('subtitle', null);
    }
    if (!this.current) return;
    this.timer -= dt;
    const line = this.current;
    if (!line._ended && this.timer <= (line.gap ?? 0.35)) {
      line._ended = true;
      if (line.radio) this.game.audio.radioSquelch(false);
      const actor = this.speakerActors[line.speaker];
      if (actor) actor.talk = 0;
      this.game.events.emit('subtitle', null);
    }
    if (this.timer <= 0) {
      line.onDone?.();
      this._next();
    }
  }
}
