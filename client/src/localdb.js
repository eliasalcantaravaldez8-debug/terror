// Banco local do aparelho (IndexedDB) usado pela versão sem servidor da NEXPLAY.
// Projetos, versões e conversas da IA; jogos prontos enviados (metadados em "games", arquivos em "gamefiles").
// Se o navegador bloquear o IndexedDB, os dados ficam só na memória desta aba.
let memory = null;
const dbp = new Promise((resolve) => {
  try {
    const req = indexedDB.open('nexplay-local', 2);
    req.onupgradeneeded = (ev) => {
      const db = req.result;
      if (ev.oldVersion < 1) {
        db.createObjectStore('projects', { keyPath: 'id', autoIncrement: true });
        db.createObjectStore('versions', { keyPath: 'id', autoIncrement: true }).createIndex('projectId', 'projectId');
        db.createObjectStore('convos', { keyPath: 'id', autoIncrement: true }).createIndex('projectId', 'projectId');
      }
      if (ev.oldVersion < 2) {
        db.createObjectStore('games', { keyPath: 'id', autoIncrement: true });
        db.createObjectStore('gamefiles', { keyPath: 'id' });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => resolve(null);
    req.onblocked = () => resolve(null);
  } catch { resolve(null); }
}).then((db) => { if (!db) memory = { projects: new Map(), versions: new Map(), convos: new Map(), games: new Map(), gamefiles: new Map(), seq: 1 }; return db; });

export const storageMode = () => dbp.then((db) => (db ? 'device' : 'memory'));

async function tx(name, mode, fn) {
  const db = await dbp;
  return new Promise((resolve, reject) => {
    const t = db.transaction(name, mode);
    const s = t.objectStore(name);
    let out;
    Promise.resolve(fn(s)).then((v) => { out = v; }, reject);
    t.oncomplete = () => resolve(out);
    t.onerror = () => reject(t.error);
    t.onabort = () => reject(t.error || new Error('Falha ao salvar no aparelho (espaço cheio?).'));
  });
}
const wrap = (r) => new Promise((resolve, reject) => { r.onsuccess = () => resolve(r.result); r.onerror = () => reject(r.error); });
const ready = () => dbp;

export const localStore = {
  async all(name) { await ready(); if (memory) return [...memory[name].values()]; return tx(name, 'readonly', (s) => wrap(s.getAll())); },
  async get(name, id) { await ready(); if (memory) return memory[name].get(id); return tx(name, 'readonly', (s) => wrap(s.get(id))); },
  async put(name, row) {
    await ready();
    if (memory) { if (row.id == null) row.id = memory.seq++; memory[name].set(row.id, structuredClone(row)); return row.id; }
    return tx(name, 'readwrite', (s) => wrap(s.put(row)));
  },
  async del(name, id) { await ready(); if (memory) { memory[name].delete(id); return; } return tx(name, 'readwrite', (s) => wrap(s.delete(id))); },
  async byProject(name, projectId) {
    await ready();
    if (memory) return [...memory[name].values()].filter((r) => r.projectId === projectId);
    return tx(name, 'readonly', (s) => wrap(s.index('projectId').getAll(projectId)));
  },
};
