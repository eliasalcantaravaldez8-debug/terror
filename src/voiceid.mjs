// Identificador estável de cada fala dublada: hash do texto (o mesmo no jogo e no gerador do roteiro).
// O arquivo de áudio fica em dist/voz/<id>.ogg (ou .mp3/.wav/.m4a). Se o texto da fala mudar, o id muda.
export function normText(t) { return String(t).replace(/\s+/g, ' ').trim(); }
export function lineId(text) {
  let h = 0x811c9dc5; const s = normText(text);
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
  return 'f' + h.toString(16).padStart(8, '0');
}
// falas que não são vozes (mensagens do sistema / celular tocando) e falas sem conteúdo
export const NOT_VOICED = new Set(['Celular', 'Sistema', 'Rádio']);
export const voicable = (name, text) => !NOT_VOICED.has(name) && /[a-zA-ZÀ-ú]/.test(text) && !/^\(.*\)$/.test(normText(text));
// quem fala pelo telefone (recebe filtro de ligação)
export const PHONE_VOICES = new Set(['Número privado', 'Desconhecido']);
