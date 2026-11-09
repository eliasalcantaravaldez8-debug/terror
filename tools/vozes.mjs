// Gera o ROTEIRO DE DUBLAGEM a partir do código (todas as falas fixas do jogo) e a lista de arquivos
// de voz que já existem em dist/voz/. Uso: `node tools/vozes.mjs` (também roda em `node build.mjs`).
//  - dist/voz/ROTEIRO_DUBLAGEM.md : tabela por personagem (arquivo, fala, tom sugerido, onde aparece)
//  - dist/voz/roteiro.json        : o mesmo em JSON
//  - dist/voz/disponiveis.js      : quais falas já têm áudio (o jogo só toca o que existir)
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'node:fs';
import { lineId, normText, voicable } from '../src/voiceid.mjs';

const SRC = 'src', OUT = 'dist/voz';
// variáveis usadas como quem fala -> personagem
const VARS = { E: 'Ethan', R: null, ryan: 'Ryan', blake: 'Blake Morrison', victor: 'Victor', lucas: 'Lucas', fer: 'Fernando del Costa' };
const unq = (s) => s.slice(1, -1).replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\n/g, ' ');
const STR = String.raw`'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"`;
function tone(t) {
  const s = normText(t);
  if (/[A-ZÁÉÍÓÚÃÕÇ]{4,}/.test(s) && /!/.test(s)) return 'gritando, com raiva';
  if (/!{2,}|\?!|!\?/.test(s)) return 'exaltado / surpreso';
  if (/!/.test(s)) return 'enfático';
  if (/\.\.\./.test(s) && /\?/.test(s)) return 'hesitante, pergunta';
  if (/\.\.\./.test(s)) return 'hesitante / pensativo';
  if (/\?/.test(s)) return 'pergunta';
  return 'neutro';
}
const lines = new Map(); const dyn = [];
const ALIAS = { 'Ryan Cole': 'Ryan' };
const ARRAYS = { SHOP_LINES: 'Atendente de loja (voz genérica)', PED_LINES: 'Pedestre (voz genérica)', POLICE_LINES: 'Policial (voz genérica)', plines: 'Preso (voz genérica)' };
function add(who, text, file, ln, ctx, extra = {}) {
  who = ALIAS[who] || who; if (!who || !voicable(who, text)) return;
  const id = lineId(text);
  if (lines.has(id)) { const e = lines.get(id); if (!e.onde.includes(`${file}:${ln}`)) e.onde.push(`${file}:${ln}`); return; }
  lines.set(id, { id, arquivo: `${id}.ogg`, personagem: who, fala: normText(text), tom: extra.tom || tone(text), contexto: ctx, onde: [`${file}:${ln}`], telefone: ['Número privado', 'Desconhecido'].includes(who) });
}
for (const f of readdirSync(SRC).filter((f) => f.endsWith('.js')).sort()) {
  const code = readFileSync(`${SRC}/${f}`, 'utf8'); const rows = code.split('\n');
  const consts = {}; for (const m of code.matchAll(new RegExp(String.raw`\bconst (\w+) = (${STR})`, 'g'))) consts[m[1]] = unq(m[2]);
  for (const m of code.matchAll(new RegExp(String.raw`\b(\w+) = (${STR}), (\w+) = (${STR});`, 'g'))) { consts[m[1]] = unq(m[2]); consts[m[3]] = unq(m[4]); }
  let title = '';
  rows.forEach((row, i) => {
    const t = row.match(/title: ('(?:\\.|[^'\\])*')/); if (t) title = unq(t[1]);
    // S.say(quem, 'texto'...)
    for (const m of row.matchAll(new RegExp(String.raw`\.say\(\s*([\w.]+|${STR})\s*,\s*(${STR}|\x60[^\x60]*\x60)`, 'g'))) {
      const whoRaw = m[1]; let who = /^['"]/.test(whoRaw) ? unq(whoRaw) : (consts[whoRaw] ?? VARS[whoRaw] ?? whoRaw.replace(/^./, (c) => c.toUpperCase()));
      if (m[2].startsWith('`')) { if (m[2].includes('${')) { dyn.push(`${f}:${i + 1} (${who}) ${m[2].slice(0, 80)}`); continue; } add(who, m[2].slice(1, -1), f, i + 1, title); continue; }
      add(who, unq(m[2]), f, i + 1, title);
    }
    // escolhas com fala do personagem: { text: ..., line: '...' }
    for (const m of row.matchAll(new RegExp(String.raw`\bline: (${STR})`, 'g'))) add(f.includes('ryan') ? 'Ryan' : 'Ethan', unq(m[1]), f, i + 1, title || 'escolha de diálogo');
  });
  // listas de falas genéricas (pedestres, lojistas, policiais, presos)
  for (const m of code.matchAll(new RegExp(String.raw`\b(\w*(?:LINES|lines))\s*=\s*\[((?:\s*(?:${STR})\s*,?)+)\]`, 'g'))) {
    const who = ARRAYS[m[1]]; if (!who) continue; const ln = code.slice(0, m.index).split('\n').length;
    for (const s of m[2].matchAll(new RegExp(STR, 'g'))) add(who, unq(s[0]), f, ln, 'fala aleatória ao conversar');
  }
  // NPCs com falas: { name: '...', ... lines: ['...', ...] } (na mesma linha ou perto)
  for (const m of code.matchAll(new RegExp(String.raw`name: (${STR})[^\n]{0,400}?lines: \[((?:\s*(?:${STR})\s*,?)+)\]`, 'g'))) {
    const who = unq(m[1]); const ln = code.slice(0, m.index).split('\n').length;
    for (const s of m[2].matchAll(new RegExp(STR, 'g'))) add(who, unq(s[0]), f, ln, 'NPC (conversa ao apertar E)');
  }
}
mkdirSync(OUT, { recursive: true });
const have = {}; for (const f of existsSync(OUT) ? readdirSync(OUT) : []) { const m = f.match(/^(f[0-9a-f]{8})\.(ogg|mp3|wav|m4a)$/); if (m) have[m[1]] = m[2]; }
const all = [...lines.values()].sort((a, b) => a.personagem.localeCompare(b.personagem, 'pt') || a.onde[0].localeCompare(b.onde[0]));
writeFileSync(`${OUT}/roteiro.json`, JSON.stringify(all.map((l) => ({ ...l, gravado: !!have[l.id] })), null, 1));
writeFileSync(`${OUT}/disponiveis.js`, `// gerado por tools/vozes.mjs — falas com áudio gravado em dist/voz/\nwindow.VOZ_DISPONIVEL = ${JSON.stringify(have)};\n`);
const byChar = new Map(); for (const l of all) { if (!byChar.has(l.personagem)) byChar.set(l.personagem, []); byChar.get(l.personagem).push(l); }
const esc = (s) => s.replace(/\|/g, '\\|');
let md = `# Roteiro de dublagem — Entre Sombras\n\n`;
md += `Gerado automaticamente a partir do código do jogo (\`node tools/vozes.mjs\` ou \`node build.mjs\`).\n\n`;
md += `**Situação:** ${Object.keys(have).length} de ${all.length} falas têm áudio gravado. Nenhuma voz é sintetizada: fala sem arquivo aparece só com legenda.\n\n`;
md += `## Como entregar os áudios\n\n- Grave cada fala com voz humana real e salve com o **nome de arquivo exato** da tabela, dentro de \`dist/voz/\` (ex.: \`dist/voz/f1a2b3c4.ogg\`).\n- Formatos aceitos: \`.ogg\` (recomendado), \`.mp3\`, \`.wav\` ou \`.m4a\` — mesmo nome, só muda a extensão.\n- Mono, 44,1 ou 48 kHz, sem música de fundo, sem silêncio longo no começo/fim, volume normalizado (≈ -16 LUFS).\n- Depois rode \`node build.mjs\` (ou \`node tools/vozes.mjs\`) para o jogo reconhecer os arquivos.\n- Falas marcadas como **telefone** recebem filtro de ligação automaticamente: grave com voz limpa.\n- O nome do arquivo vem do texto da fala; se o texto mudar no jogo, o nome muda (rode o gerador de novo).\n- Para a boca dos personagens acompanhar o volume do áudio, jogue por um servidor local (\`npx serve dist\` ou \`python -m http.server -d dist\`). Abrindo o \`index.html\` direto (file://) o áudio toca, mas a boca usa um movimento aproximado.\n\n`;
md += `## Resumo por personagem\n\n| Personagem | Falas | Gravadas |\n|---|---|---|\n`;
for (const [c, l] of byChar) md += `| ${esc(c)} | ${l.length} | ${l.filter((x) => have[x.id]).length} |\n`;
for (const [c, l] of byChar) {
  md += `\n## ${c}\n\n| Arquivo | Fala | Tom sugerido | Onde / contexto | Status |\n|---|---|---|---|---|\n`;
  for (const x of l) md += `| \`${x.arquivo}\` | ${esc(x.fala)} | ${x.tom}${x.telefone ? ' (telefone)' : ''} | ${esc(x.contexto || '')} — ${x.onde.join(', ')} | ${have[x.id] ? 'gravado' : '**falta**'} |\n`;
}
if (dyn.length) md += `\n## Falas com texto variável (não dubláveis por arquivo fixo)\n\n${dyn.map((d) => '- ' + d.replace(/\|/g, '\\|')).join('\n')}\n`;
writeFileSync(`${OUT}/ROTEIRO_DUBLAGEM.md`, md);
console.log(`vozes: ${all.length} falas no roteiro, ${Object.keys(have).length} com áudio, ${byChar.size} personagens`);
