// Jogos publicados DENTRO do link sem servidor: arquivos em nexplay-games/, listados em nexplay-games/manifest.json.
let bundledPromise = null;
export function bundledGames() {
  if (!bundledPromise) {
    bundledPromise = fetch('nexplay-games/manifest.json', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : { games: [] })).then((m) => (Array.isArray(m.games) ? m.games : [])).catch(() => []);
  }
  return bundledPromise;
}
