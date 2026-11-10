// Acesso ao banco de dados (SQLite nativo do Node 22: node:sqlite).
// Para escalar, a camada de queries é isolada aqui e pode ser trocada por Postgres.
import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { config } from '../config.js';
import { seed } from './seed.js';

const here = path.dirname(fileURLToPath(import.meta.url));

function open() {
  const file = config.dbFile === ':memory:' ? ':memory:' : (config.dbFile || path.join(config.dataDir, 'nexplay.db'));
  const db = new DatabaseSync(file);
  db.exec('PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON; PRAGMA busy_timeout = 5000;');
  db.exec(fs.readFileSync(path.join(here, 'schema.sql'), 'utf8'));
  migrate(db);
  return db;
}

/** Migrações aditivas para bancos criados por versões anteriores. */
function migrate(database) {
  const cols = (t) => database.prepare(`PRAGMA table_info(${t})`).all().map((c) => c.name);
  if (!cols('project_assets').includes('meta')) database.exec(`ALTER TABLE project_assets ADD COLUMN meta TEXT NOT NULL DEFAULT '{}'`);
  // CHECK de kind em project_assets passou a aceitar 'sprite'; tabelas antigas continuam usando 'texture' para sprites.
}

export const db = open();

const cache = new Map();
function stmt(sql) {
  let s = cache.get(sql);
  if (!s) {
    s = db.prepare(sql);
    cache.set(sql, s);
  }
  return s;
}

/** Linha única ou undefined. */
export const one = (sql, ...params) => stmt(sql).get(...params);
/** Todas as linhas. */
export const all = (sql, ...params) => stmt(sql).all(...params);
/** Executa e retorna { changes, lastInsertRowid }. */
export const run = (sql, ...params) => {
  const r = stmt(sql).run(...params);
  return { changes: Number(r.changes), lastInsertRowid: Number(r.lastInsertRowid) };
};

let depth = 0;
/**
 * Transação síncrona (BEGIN IMMEDIATE) — garante atomicidade em saldos e resgates.
 * Suporta aninhamento via SAVEPOINT.
 */
export function tx(fn) {
  if (depth > 0) {
    const sp = `sp_${depth}`;
    db.exec(`SAVEPOINT ${sp}`);
    depth++;
    try {
      const r = fn();
      db.exec(`RELEASE ${sp}`);
      return r;
    } catch (e) {
      db.exec(`ROLLBACK TO ${sp}; RELEASE ${sp}`);
      throw e;
    } finally {
      depth--;
    }
  }
  db.exec('BEGIN IMMEDIATE');
  depth++;
  try {
    const r = fn();
    db.exec('COMMIT');
    return r;
  } catch (e) {
    db.exec('ROLLBACK');
    throw e;
  } finally {
    depth--;
  }
}

export const nowIso = () => new Date().toISOString();

export function getSetting(key, fallback) {
  const row = one('SELECT value FROM settings WHERE key = ?', key);
  return row ? JSON.parse(row.value) : fallback;
}
export function setSetting(key, value) {
  run('INSERT INTO settings(key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value', key, JSON.stringify(value));
}

seed({ one, all, run, tx });
