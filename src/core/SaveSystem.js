/**
 * Checkpoint persistence. Saves are small JSON blobs keyed per slot.
 * Storage is injectable so it can be unit-tested without a browser.
 */
const KEY = 'ironshadow.save.v1';
export const SAVE_VERSION = 1;

export class SaveSystem {
  constructor(storage = globalThis.localStorage) { this.storage = storage; }

  save(data) {
    const payload = { version: SAVE_VERSION, savedAt: Date.now(), ...data };
    try {
      this.storage?.setItem(KEY, JSON.stringify(payload));
      return true;
    } catch {
      return false;
    }
  }

  load() {
    try {
      const raw = this.storage?.getItem(KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (data.version !== SAVE_VERSION || !data.mission || !data.checkpoint) return null;
      return data;
    } catch {
      return null;
    }
  }

  hasSave() { return this.load() !== null; }

  /** Campaign progress (unlocked missions) survives across checkpoints. */
  progress() {
    try { return JSON.parse(this.storage?.getItem(KEY + '.progress')) || { unlocked: ['m01'] }; } catch { return { unlocked: ['m01'] }; }
  }
  unlock(id) {
    const p = this.progress();
    if (!p.unlocked.includes(id)) p.unlocked.push(id);
    try { this.storage?.setItem(KEY + '.progress', JSON.stringify(p)); } catch { /* ignore */ }
    return p;
  }
  clear() { try { this.storage?.removeItem(KEY); } catch { /* ignore */ } }
}
