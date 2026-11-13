/**
 * Dialogue & subtitles. Lines are data-driven; voice playback uses the browser's
 * speech synthesis as a PROVISIONAL stand-in for recorded voice acting.
 *
 * Voice and subtitle stay in sync: each line is spoken on its own (any previous
 * utterance is cancelled, nothing piles up in the browser's speech queue) and the
 * subtitle stays on screen until that utterance has finished.
 */
/**
 * Character voices. With neural ("Natural"/"Online"/Google) voices the pitch is left
 * almost untouched — pitch-shifting is what makes synthetic speech sound robotic.
 * gender picks a matching voice; slot spreads characters over the available voices.
 */
const VOICES = {
  KANE: { gender: 'm', slot: 0, pitch: 0.92, rate: 1.0 },
  RUIZ: { gender: 'f', slot: 0, pitch: 1.0, rate: 1.06 },
  BRIGGS: { gender: 'm', slot: 1, pitch: 1.04, rate: 1.1 },
  OKAFOR: { gender: 'm', slot: 2, pitch: 0.95, rate: 0.98 },
  'FALCON 2-1': { gender: 'm', slot: 1, pitch: 1.0, rate: 1.12 },
  'BASTIÃO': { gender: 'm', slot: 2, pitch: 0.96, rate: 1.02 },
  'VOZ DESCONHECIDA': { gender: 'm', slot: 3, pitch: 0.85, rate: 0.92 },
  SERRAT: { gender: 'm', slot: 3, pitch: 0.85, rate: 0.92 },
  MERCER: { gender: 'm', slot: 0, pitch: 0.95, rate: 1.0 },
};
const FEMALE = /francisca|thalita|maria|luciana|leila|manuela|yara|giovanna|brenda|elza|let[ií]cia|fernanda|vit[oó]ria|raquel|camila|joana|in[eê]s|helia|female|feminin|mulher|raquel/i;
const MALE = /ant[oó]nio|daniel|donato|f[aá]bio|humberto|j[uú]lio|nicolau|val[eé]rio|duarte|cristiano|felipe|ricardo|male|masculin/i;
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
        const all = speechSynthesis.getVoices().filter((v) => /^pt/i.test(v.lang));
        // rank: neural/online voices sound close to a real person; then Google; then pt-BR
        const score = (v) => (/natural|neural|online/i.test(v.name) ? 20 : 0) + (/google/i.test(v.name) ? 8 : 0) + (/pt[-_]BR/i.test(v.lang) ? 5 : 0) + (v.localService ? 0 : 2);
        all.sort((a, b) => score(b) - score(a));
        this.voiceList = all;
        this.voicesBy = {
          m: all.filter((v) => MALE.test(v.name) && !FEMALE.test(v.name)),
          f: all.filter((v) => FEMALE.test(v.name)),
        };
        this.neural = all.some((v) => /natural|neural|online/i.test(v.name));
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
      const v = VOICES[speaker] || { gender: 'm', slot: 0, pitch: 1, rate: 1 };
      const pool = (this.voicesBy?.[v.gender]?.length ? this.voicesBy[v.gender] : this.voiceList) || [];
      const voice = pool.length ? pool[v.slot % pool.length] : null;
      const natural = voice && /natural|neural|online|google/i.test(voice.name);
      // natural voices keep their own pitch; small character tweaks only on basic voices
      u.pitch = natural ? 1 + (v.pitch - 1) * 0.4 : v.pitch;
      u.rate = v.rate;
      u.volume = volume * this.game.settings.get('masterVolume');
      if (voice) u.voice = voice;
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
