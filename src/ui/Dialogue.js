/**
 * Dialogue & subtitles. Lines are data-driven; voice playback uses the browser's
 * speech synthesis as a PROVISIONAL stand-in for recorded voice acting.
 *
 * Voice and subtitle stay in sync: each line is spoken on its own (any previous
 * utterance is cancelled, nothing piles up in the browser's speech queue) and the
 * subtitle stays on screen until that utterance has finished.
 */
const VOICES = {
  KANE: { pitch: 0.7, rate: 1.0, slot: 0 },
  RUIZ: { pitch: 1.25, rate: 1.08, slot: 1 },
  BRIGGS: { pitch: 1.1, rate: 1.12, slot: 2 },
  OKAFOR: { pitch: 0.85, rate: 0.98, slot: 3 },
  'FALCON 2-1': { pitch: 0.95, rate: 1.1, slot: 2 },
  'BASTIÃO': { pitch: 0.8, rate: 1.0, slot: 3 },
  'VOZ DESCONHECIDA': { pitch: 0.55, rate: 0.9, slot: 0 },
  MERCER: { pitch: 0.8, rate: 1.0, slot: 0 },
};
const CHARS_PER_SECOND = 13; // typical pt-BR synthesized speech
const MAX_WAIT_FOR_VOICE = 6; // never hold a line forever if the voice engine stalls

export class Dialogue {
  constructor(game) {
    this.game = game;
    this.current = null;
    this.queue = [];
    this.timer = 0;
    this.barkTimer = 0;
    this.voiceList = [];
    this.speakerActors = {};
    this.utterance = null; // the one utterance currently owned by the dialogue system
    if (typeof speechSynthesis !== 'undefined') {
      const load = () => {
        const all = speechSynthesis.getVoices();
        // prefer Brazilian voices, then any Portuguese
        this.voiceList = [...all.filter((v) => /pt[-_]BR/i.test(v.lang)), ...all.filter((v) => /^pt/i.test(v.lang) && !/pt[-_]BR/i.test(v.lang))];
      };
      load();
      speechSynthesis.onvoiceschanged = load;
    }
  }

  get voiceOn() {
    return this.game.settings.get('voices') && typeof speechSynthesis !== 'undefined' && !this.game.testMode;
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
    this._stopVoice();
    this.game.events.emit('subtitle', null);
  }

  get busy() { return !!this.current || this.queue.length > 0; }

  pause() { try { if (this.voiceOn) speechSynthesis.pause(); } catch { /* */ } }
  resume() { try { if (this.voiceOn) speechSynthesis.resume(); } catch { /* */ } }

  /** Short combat callout: only when no scripted line or other voice is playing. */
  bark(speaker, text, actor) {
    if (this.current || this.barkTimer > 0) return;
    if (this.voiceOn && (speechSynthesis.speaking || speechSynthesis.pending)) return;
    this.barkTimer = 2.4;
    this.game.events.emit('subtitle', { speaker, text, radio: false, bark: true });
    this._speak(speaker, text, 0.8, null);
    if (actor) { actor.talk = 1; setTimeout(() => (actor.talk = 0), 1500); }
    this._barkClear = Math.max(2.0, text.length / CHARS_PER_SECOND + 0.4);
  }

  _stopVoice() {
    this.utterance = null;
    try { if (typeof speechSynthesis !== 'undefined') speechSynthesis.cancel(); } catch { /* ignore */ }
  }

  _next() {
    const line = this.queue.shift();
    if (!line) { this.current = null; this.game.events.emit('subtitle', null); return; }
    this.current = line;
    const textTime = line.text.length / CHARS_PER_SECOND;
    const dur = line.duration ?? Math.max(2.0, line.text.length * 0.062, this.voiceOn ? textTime : 0);
    line._dur = dur;
    line._elapsed = 0;
    line._voiceDone = !this.voiceOn;
    this.timer = dur + (line.gap ?? 0.35);
    this._barkClear = 0;
    this.game.events.emit('subtitle', { speaker: line.speaker, text: line.text, radio: !!line.radio });
    if (line.radio) { this.game.audio.radioSquelch(true); this.game.audio.radioStatic(dur); }
    this._speak(line.speaker, line.text, 1, line);
    const actor = this.speakerActors[line.speaker];
    if (actor) actor.talk = 1;
    line.onStart?.();
  }

  _speak(speaker, text, volume, line) {
    if (!this.voiceOn) return;
    try {
      this._stopVoice(); // never let utterances queue up behind each other
      const u = new SpeechSynthesisUtterance(text.replace(/[—–]/g, ', ').replace(/\.\.\./g, '…'));
      u.lang = 'pt-BR';
      const v = VOICES[speaker] || { pitch: 1, rate: 1, slot: 0 };
      u.pitch = v.pitch; u.rate = v.rate * 1.05;
      u.volume = volume * this.game.settings.get('masterVolume');
      if (this.voiceList.length) u.voice = this.voiceList[v.slot % this.voiceList.length];
      if (line) {
        const done = () => { if (this.utterance === u) line._voiceDone = true; };
        u.onend = done; u.onerror = done;
      }
      this.utterance = u;
      speechSynthesis.speak(u);
    } catch { if (line) line._voiceDone = true; }
  }

  update(dt) {
    this.barkTimer -= dt;
    if (this._barkClear > 0) {
      this._barkClear -= dt;
      if (this._barkClear <= 0 && !this.current) this.game.events.emit('subtitle', null);
    }
    if (!this.current) return;
    const line = this.current;
    line._elapsed += dt;
    // hold the line while its voice is still speaking (with a safety limit)
    const waitingVoice = !line._voiceDone && line._elapsed < line._dur + MAX_WAIT_FOR_VOICE;
    if (this.timer > (line.gap ?? 0.35) || !waitingVoice) this.timer -= dt;
    if (!line._ended && this.timer <= (line.gap ?? 0.35) && !waitingVoice) {
      line._ended = true;
      if (line.radio) this.game.audio.radioSquelch(false);
      const actor = this.speakerActors[line.speaker];
      if (actor) actor.talk = 0;
      this.game.events.emit('subtitle', null);
    }
    if (this.timer <= 0 && line._ended) {
      line.onDone?.();
      this._next();
    }
  }
}
