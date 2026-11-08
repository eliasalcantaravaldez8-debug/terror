/** Persistent user settings (graphics, audio, controls, accessibility). */
const KEY = 'ironshadow.settings.v1';

export const DEFAULT_SETTINGS = {
  quality: 'medium', // low | medium | high
  sensitivity: 1.0,
  fov: 75,
  invertY: false,
  masterVolume: 0.8,
  musicVolume: 0.6,
  subtitles: true,
  voices: true, // provisional synthesized voices (Web Speech API)
  showFps: false,
};

export class Settings {
  constructor(storage = globalThis.localStorage) {
    this.storage = storage;
    this.values = { ...DEFAULT_SETTINGS };
    this.listeners = new Set();
    try {
      const raw = storage?.getItem(KEY);
      if (raw) Object.assign(this.values, JSON.parse(raw));
    } catch { /* storage unavailable or corrupted: keep defaults */ }
  }
  get(k) { return this.values[k]; }
  set(k, v) {
    this.values[k] = v;
    try { this.storage?.setItem(KEY, JSON.stringify(this.values)); } catch { /* ignore */ }
    for (const fn of this.listeners) fn(k, v);
  }
  onChange(fn) { this.listeners.add(fn); return () => this.listeners.delete(fn); }
}
