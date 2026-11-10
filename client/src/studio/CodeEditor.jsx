// Modo avançado: scripts do projeto (API do runtime) e edição direta do documento JSON.
import { useState } from 'react';

const TEMPLATE = `// Script NEXPLAY — retorna os ganchos do ciclo de vida.
// Documentação da API: docs/STUDIO.md (api.player, api.entity, api.ui, api.missions…)
let tempo = 0;

return {
  start() {
    api.ui.toast('Boa sorte!');
  },
  update(dt) {
    tempo += dt;
    if (api.input.pressed('KeyH')) api.ui.toast('Tempo de jogo: ' + Math.floor(tempo) + 's');
  },
  onEvent(nome, dados) {
    if (nome === 'pickup') api.score.add(5);
  },
};
`;

export default function CodeEditor({ doc, apply, validation }) {
  const names = Object.keys(doc.scripts);
  const [sel, setSel] = useState(names[0] || null);
  const [draft, setDraft] = useState(sel ? doc.scripts[sel].source : '');
  const [json, setJson] = useState(null);
  const [err, setErr] = useState(null);
  const open = (n) => { setSel(n); setDraft(doc.scripts[n]?.source || ''); setJson(null); };
  const keyTab = (e) => {
    if (e.key !== 'Tab') return;
    e.preventDefault();
    const t = e.target; const s = t.selectionStart;
    const v = `${t.value.slice(0, s)}  ${t.value.slice(t.selectionEnd)}`;
    setDraft(v); requestAnimationFrame(() => { t.selectionStart = t.selectionEnd = s + 2; });
  };
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', height: '100%', background: '#05040c' }}>
      <div className="studio-panel" style={{ borderRight: '1px solid var(--line)' }}>
        <div className="small muted">Scripts</div>
        {names.map((n) => <div key={n} className={`tree-item ${sel === n && !json ? 'sel' : ''}`} onClick={() => open(n)}>{n}</div>)}
        <button className="btn sm" style={{ marginTop: 8 }} onClick={() => { const n = prompt('Nome do script (ex.: placar.js)'); if (!n) return; apply([{ op: 'write_script', name: n, source: TEMPLATE }]); setSel(n); setDraft(TEMPLATE); setJson(null); }}>+ Novo script</button>
        <div className="small muted" style={{ marginTop: 16 }}>Projeto</div>
        <div className={`tree-item ${json !== null ? 'sel' : ''}`} onClick={() => setJson(JSON.stringify(doc, null, 2))}>projeto.json</div>
      </div>
      <div className="stack" style={{ padding: 10, gap: 8, minWidth: 0 }}>
        {json !== null ? (
          <>
            <textarea className="code" style={{ flex: 1 }} spellCheck={false} value={json} onChange={(e) => setJson(e.target.value)} />
            {err && <div className="error-box small">{err}</div>}
            <div className="row"><button className="btn primary sm" onClick={() => { try { const d = JSON.parse(json); apply([], () => d); setErr(null); } catch (x) { setErr(`JSON inválido: ${x.message}`); } }}>Aplicar documento</button><span className="tiny muted">Edição direta do formato nexplay-project v1. Alterações inválidas aparecem na validação.</span></div>
          </>
        ) : sel ? (
          <>
            <div className="row between"><b>{sel}</b>
              <div className="row">
                <select className="input" style={{ width: 'auto', padding: 6 }} value={doc.scripts[sel]?.attachedTo || ''} onChange={(e) => apply([{ op: 'write_script', name: sel, source: draft, attachedTo: e.target.value || null }])}><option value="">Script global</option>{doc.entities.map((e) => <option key={e.id} value={e.id}>Ligado a: {e.name}</option>)}</select>
                <button className="btn sm danger" onClick={() => { apply([{ op: 'delete_script', name: sel }]); setSel(null); }}>Excluir</button>
              </div>
            </div>
            <textarea className="code" style={{ flex: 1 }} spellCheck={false} value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={keyTab} />
            <div className="row"><button className="btn primary sm" onClick={() => apply([{ op: 'write_script', name: sel, source: draft }])}>Salvar script</button><span className="tiny muted">A sintaxe é verificada pelo servidor ao salvar; erros de execução aparecem no console da pré-visualização.</span></div>
          </>
        ) : <p className="muted">Crie um script para programar mecânicas no modo avançado.</p>}
        {validation?.errors?.filter((e) => /script|sintaxe/i.test(e)).map((e) => <div key={e} className="error-box small">{e}</div>)}
      </div>
    </div>
  );
}
