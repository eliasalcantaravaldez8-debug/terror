// Estado do jogo e salvamento (localStorage). Dinheiro e progresso de Ethan e Ryan são separados.
export const SLOT_KEYS = ['auto', 'missao', '1', '2', '3', '4', '5'];
const PREFIX = 'entreSombras.save.';

export function newCampaign(char) {
  return {
    char, done: [], flags: {}, money: char === 'ethan' ? 250 : 4800, hp: 100,
    needs: { fome: 85, sede: 85, sono: 80, dor: 0 },
    traits: { inteligencia: 0, frieza: 0, carisma: 0, manipulacao: 0, impulsividade: 0 },
    pos: null, mission: null, stage: 0, messages: [], calls: [], photos: [], notes: [], tools: {}, contracts: [],
    car: { fuel: 1, health: 1 },
  };
}
export function newState() {
  return { ver: 1, char: 'ethan', hour: 21.5, day: 1, blackwood: false, maxStars: 0, feed: [], news: [], ethan: newCampaign('ethan'), ryan: newCampaign('ryan') };
}
export function writeSlot(slot, state) {
  try {
    const data = { ...state, ts: Date.now(), slot };
    localStorage.setItem(PREFIX + slot, JSON.stringify(data));
    return true;
  } catch (e) {
    // sem espaço: tenta sem as fotos
    try { const lite = JSON.parse(JSON.stringify(state)); for (const c of ['ethan', 'ryan']) lite[c].photos = []; localStorage.setItem(PREFIX + slot, JSON.stringify({ ...lite, ts: Date.now(), slot })); return true; } catch (e2) { return false; }
  }
}
export function readSlot(slot) {
  try { const s = localStorage.getItem(PREFIX + slot); return s ? JSON.parse(s) : null; } catch (e) { return null; }
}
export function listSlots() { return SLOT_KEYS.map((k) => ({ key: k, data: readSlot(k) })); }
export function latestSlot() {
  let best = null;
  for (const { key, data } of listSlots()) if (data && (!best || data.ts > best.data.ts)) best = { key, data };
  return best;
}
export function requestLoad(slot) { try { sessionStorage.setItem('entreSombras.load', slot); } catch (e) { /* */ } location.reload(); }
export function takePendingLoad() { try { const s = sessionStorage.getItem('entreSombras.load'); sessionStorage.removeItem('entreSombras.load'); return s; } catch (e) { return null; } }
export function describe(data) {
  if (!data) return 'Vazio';
  const c = data[data.char] || {}; const d = new Date(data.ts);
  const who = data.char === 'ryan' ? 'Ryan' : 'Ethan';
  const m = c.mission ? ' · em missão' : '';
  return `${who} · Dia ${data.day} ${String(Math.floor(data.hour)).padStart(2, '0')}h · ${c.done ? c.done.length : 0} missões${m} · ${d.toLocaleDateString()} ${d.toLocaleTimeString().slice(0, 5)}`;
}
