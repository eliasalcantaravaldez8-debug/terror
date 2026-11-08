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
  clear() { try { this.storage?.removeItem(KEY); } catch { /* ignore */ } }
}
