// Cliente da API. O cabeçalho X-NX-Client é exigido pelo servidor (proteção CSRF).
export class ApiError extends Error {
  constructor(status, message, code) { super(message); this.status = status; this.code = code; }
}

async function request(method, url, body, { form } = {}) {
  const opts = { method, credentials: 'same-origin', headers: { 'X-NX-Client': '1' } };
  if (form) opts.body = form;
  else if (body !== undefined) { opts.headers['Content-Type'] = 'application/json'; opts.body = JSON.stringify(body); }
  const res = await fetch(`/api${url}`, opts);
  const isJson = (res.headers.get('content-type') || '').includes('application/json');
  const data = isJson ? await res.json() : null;
  if (!res.ok) throw new ApiError(res.status, data?.error?.message || `Erro ${res.status}`, data?.error?.code);
  return data;
}

export const api = {
  get: (u) => request('GET', u),
  post: (u, b) => request('POST', u, b ?? {}),
  put: (u, b) => request('PUT', u, b),
  patch: (u, b) => request('PATCH', u, b),
  del: (u) => request('DELETE', u),
  upload: (u, form) => request('POST', u, undefined, { form }),
  /** Requisição com resposta NDJSON em streaming (comandos de IA). */
  async stream(url, body, onEvent) {
    const res = await fetch(`/api${url}`, { method: 'POST', credentials: 'same-origin', headers: { 'X-NX-Client': '1', 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (!res.ok && !res.body) throw new ApiError(res.status, `Erro ${res.status}`);
    if (!res.ok) { const d = await res.json().catch(() => null); throw new ApiError(res.status, d?.error?.message || `Erro ${res.status}`, d?.error?.code); }
    const reader = res.body.getReader();
    const dec = new TextDecoder();
    let buf = '';
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      buf += dec.decode(value, { stream: true });
      let i;
      while ((i = buf.indexOf('\n')) >= 0) { const line = buf.slice(0, i).trim(); buf = buf.slice(i + 1); if (line) onEvent(JSON.parse(line)); }
    }
  },
};

export const brl = (cents) => (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
export const nc = (n) => `${Number(n).toLocaleString('pt-BR')} NC`;
export const ago = (iso) => {
  if (!iso) return '';
  const s = (Date.now() - Date.parse(iso)) / 1000;
  if (s < 60) return 'agora';
  if (s < 3600) return `${Math.floor(s / 60)} min`;
  if (s < 86400) return `${Math.floor(s / 3600)} h`;
  if (s < 2592000) return `${Math.floor(s / 86400)} d`;
  return new Date(iso).toLocaleDateString('pt-BR');
};
export const GENRE_LABEL = { acao: 'Ação', aventura: 'Aventura', terror: 'Terror', sobrevivencia: 'Sobrevivência', corrida: 'Corrida', plataforma: 'Plataforma', mundo_aberto: 'Mundo aberto', futebol: 'Futebol', esportes: 'Esportes', rpg: 'RPG', estrategia: 'Estratégia', puzzle: 'Puzzle', simulacao: 'Simulação', tiro: 'Tiro', luta: 'Luta', casual: 'Casual', musical: 'Musical', educativo: 'Educativo', outro: 'Outro', vazio: 'Projeto vazio' };
export const MODE_LABEL = { solo: 'Solo', public_mp: 'Multiplayer público', private_rooms: 'Salas privadas', coop: 'Cooperativo', competitive: 'Competitivo', local: 'Local (mesmo dispositivo)' };
export const PLATFORM_LABEL = { pc: 'PC', mobile: 'Celular', both: 'PC e celular' };
export const STAGE_LABEL = { announced: 'Anunciado', in_development: 'Em desenvolvimento', early_access: 'Acesso antecipado', beta: 'Beta', released: 'Lançado' };
export const isMobileDevice = () => /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) || (navigator.maxTouchPoints > 1 && window.innerWidth < 1024);
