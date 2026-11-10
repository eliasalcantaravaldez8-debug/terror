// Painéis do editor: paleta de criação, hierarquia, inspetor, ambiente, missões/diálogos e assets.
import { useState } from 'react';
import { Icon } from '../components/icons.jsx';
import { api } from '../api.js';
import { useToast } from '../components/ui.jsx';
import { ANIMATION_CLIPS, NPC_BEHAVIORS, MATERIAL_PRESETS, CONTROLLERS, newId } from '../../../shared/project.js';

// ───────── Paleta (modo fácil: criação visual sem código) ─────────
export const PALETTE = [
  ['Cenário', [
    ['Árvores', 'vegetation', { kind: 'trees', count: 300, area: [120, 120], seed: 3, avoidCenter: 8 }],
    ['Pinheiros', 'vegetation', { kind: 'pines', count: 300, area: [120, 120], seed: 4 }],
    ['Grama', 'vegetation', { kind: 'grass', count: 40000, area: [80, 80], seed: 5 }],
    ['Flores', 'vegetation', { kind: 'flowers', count: 2000, area: [60, 60], seed: 6 }],
    ['Arbustos', 'vegetation', { kind: 'bushes', count: 120, area: [80, 80], seed: 7 }],
    ['Pedras', 'vegetation', { kind: 'rocks', count: 80, area: [80, 80], seed: 8 }],
    ['Água', 'water', { size: [60, 60], color: '#1e5f74' }],
    ['Cabana', 'structure', { kind: 'cabin', style: 'cozy', width: 6, depth: 5 }],
    ['Casa', 'structure', { kind: 'house', floors: 1, color: '#e5e7eb' }],
    ['Torre', 'structure', { kind: 'tower' }],
    ['Ruínas', 'structure', { kind: 'ruins', size: 12 }],
    ['Muro', 'structure', { kind: 'wall', length: 10 }],
    ['Cerca', 'structure', { kind: 'fence', length: 10 }],
    ['Ponte', 'structure', { kind: 'bridge', length: 20 }],
    ['Estrada', 'structure', { kind: 'road', shape: 'straight', length: 120, width: 10 }],
    ['Estádio', 'structure', { kind: 'stadium', length: 105, width: 68, tiers: 2, crowd: true, crowdDensity: 0.8, roof: true, floodlights: 4 }],
    ['Gol', 'structure', { kind: 'goal', width: 7.32, height: 2.44 }],
    ['Arquibancada', 'structure', { kind: 'grandstand', length: 40, crowd: true }],
    ['Fogueira', 'structure', { kind: 'campfire' }],
    ['Barraca', 'structure', { kind: 'tent', color: '#b45309' }],
    ['Poste de luz', 'structure', { kind: 'lamp_post' }],
    ['Banco', 'structure', { kind: 'bench' }],
    ['Caixa', 'structure', { kind: 'crate' }],
    ['Barril', 'structure', { kind: 'barrel' }],
  ]],
  ['Personagens', [
    ['Personagem', 'character', { height: 1.8, shirtColor: '#7c3aed', pantsColor: '#1f2937', skinColor: '#c58c62', hair: 'short' }],
    ['NPC passeando', 'npc', { height: 1.75, shirtColor: '#0e7490', pantsColor: '#334155' }, { ai: { behavior: 'wander', speed: 1.3, radius: 10 } }],
    ['NPC patrulha', 'npc', { height: 1.85, shirtColor: '#7f1d1d', pantsColor: '#1c1917' }, { ai: { behavior: 'patrol', speed: 2.4, radius: 8, detectRadius: 15, attackDamage: 10 }, health: { max: 60 } }],
    ['Inimigo perseguidor', 'npc', { height: 2.1, build: 'thin', skinColor: '#1a1a1a', shirtColor: '#050505', pantsColor: '#050505', eyesGlow: '#ff2020' }, { ai: { behavior: 'chase_player', speed: 2.8, detectRadius: 20, attackDamage: 20 } }],
    ['NPC com diálogo', 'npc', { height: 1.7, shirtColor: '#be185d', pantsColor: '#334155', hair: 'long' }, { ai: { behavior: 'idle' } }],
    ['Jogador de futebol', 'npc', { height: 1.8, shirtColor: '#06b6d4', pantsColor: '#0f172a' }, { ai: { behavior: 'soccer_player', team: 1, role: 'midfielder', speed: 6 } }],
  ]],
  ['Objetos', [
    ['Cubo', 'primitive', { shape: 'box', size: [1, 1, 1], preset: 'concrete' }, { physics: { body: 'static' } }],
    ['Esfera', 'primitive', { shape: 'sphere', size: [1, 1, 1], preset: 'metal' }],
    ['Cilindro', 'primitive', { shape: 'cylinder', size: [1, 2, 1], preset: 'wood' }, { physics: { body: 'static' } }],
    ['Plataforma', 'primitive', { shape: 'box', size: [6, 0.5, 6], preset: 'stone' }, { physics: { body: 'static' } }],
    ['Coletável', 'pickup', { item: 'coin', value: 1, glow: '#facc15' }],
    ['Área de gatilho', 'trigger', { size: [3, 3, 3], event: 'area' }],
    ['Carro', 'vehicle', { kind: 'sports_car', color: '#7c3aed' }],
    ['Bola', 'ball', { radius: 0.11 }, { physics: { body: 'dynamic', mass: 0.43, restitution: 0.6 } }],
    ['Luz pontual', 'light', { kind: 'point', color: '#ffd27a', intensity: 15, distance: 20 }],
    ['Holofote', 'light', { kind: 'spot', color: '#ffffff', intensity: 40, distance: 40, angle: 30, castShadow: true }],
    ['Fogo', 'particles', { preset: 'fire', rate: 200 }],
    ['Fumaça', 'particles', { preset: 'smoke', rate: 120 }],
    ['Vaga-lumes', 'particles', { preset: 'fireflies', rate: 150 }],
  ]],
];

export function Palette({ onAdd, dimension }) {
  if (dimension === '2d') return <p className="small muted">No 2D, use as ferramentas do mapa acima do viewport para pintar blocos, moedas, perigos e a bandeira de chegada.</p>;
  return (
    <div className="stack" style={{ gap: 8 }}>
      {PALETTE.map(([cat, items]) => (
        <details key={cat} open={cat === 'Cenário'}>
          <summary className="small" style={{ cursor: 'pointer', fontWeight: 700, padding: '6px 0' }}>{cat}</summary>
          <div className="palette-grid">{items.map(([label, type, props, components]) => <button key={label} onClick={() => onAdd(type, label, props, components)}>{label}</button>)}</div>
        </details>
      ))}
    </div>
  );
}

const TYPE_ICON = { terrain: 'layers', water: 'globe', vegetation: 'sparkles', structure: 'building', character: 'users', npc: 'users', primitive: 'cube', light: 'bolt', pickup: 'star', trigger: 'flag', vehicle: 'rocket', ball: 'globe', particles: 'flame', model: 'cube', sprite: 'gamepad', tilemap: 'layers' };

export function Hierarchy({ doc, selectedId, onSelect, onDelete, onDuplicate, onFocus }) {
  const [q, setQ] = useState('');
  const list = doc.entities.filter((e) => !q || e.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="stack" style={{ gap: 4 }}>
      <input className="input" style={{ padding: '6px 8px', fontSize: 13 }} placeholder="Filtrar…" value={q} onChange={(e) => setQ(e.target.value)} />
      {list.map((e) => (
        <div key={e.id} className={`tree-item ${selectedId === e.id ? 'sel' : ''}`} onClick={() => onSelect(e.id)} onDoubleClick={() => onFocus(e.id)}>
          <Icon name={TYPE_ICON[e.type] || 'cube'} size={14} />
          <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.name}</span>
          {doc.player.entityId === e.id && <span className="pill cyan" style={{ fontSize: 9, padding: '0 5px' }}>jogador</span>}
          {selectedId === e.id && <><button className="btn sm ghost" style={{ padding: 2 }} title="Duplicar" onClick={(ev) => { ev.stopPropagation(); onDuplicate(e.id); }}><Icon name="plus" size={12} /></button><button className="btn sm ghost" style={{ padding: 2 }} title="Excluir" onClick={(ev) => { ev.stopPropagation(); onDelete(e.id); }}><Icon name="trash" size={12} /></button></>}
        </div>
      ))}
    </div>
  );
}

function Num({ value, onChange, step = 0.1 }) {
  return <input className="input" type="number" step={step} value={Number.isFinite(value) ? value : 0} onChange={(e) => onChange(Number(e.target.value))} />;
}
function Vec({ value, onChange, step }) {
  return <div className="vec3">{[0, 1, 2].map((i) => <Num key={i} step={step} value={value[i]} onChange={(n) => { const v = [...value]; v[i] = n; onChange(v); }} />)}</div>;
}
function Row({ label, children }) { return <div className="prop-row"><span className="muted">{label}</span>{children}</div>; }

/** Inspetor: edita a entidade selecionada gerando operações update_entity. */
export function Inspector({ doc, entity: e, update, setPlayer, scripts }) {
  if (!e) return <p className="small muted">Selecione um objeto na cena ou na hierarquia. Dica: arraste com o gizmo para mover; use G/R/S para alternar mover, girar e escalar.</p>;
  const p = e.props || {};
  const c = e.components || {};
  const set = (patch) => update(e.id, patch);
  const prop = (k) => (v) => set({ props: { [k]: v } });
  const color = (k, label) => <Row key={k} label={label}><input type="color" value={p[k] || '#ffffff'} onChange={(ev) => prop(k)(ev.target.value)} /></Row>;
  const number = (k, label, step = 1) => <Row key={k} label={label}><Num step={step} value={p[k]} onChange={prop(k)} /></Row>;
  return (
    <div className="stack" style={{ gap: 6 }}>
      <Row label="Nome"><input className="input" value={e.name} onChange={(ev) => set({ name: ev.target.value })} /></Row>
      <Row label="Tipo"><span className="pill">{e.type}{p.kind ? ` · ${p.kind}` : ''}{p.shape ? ` · ${p.shape}` : ''}</span></Row>
      {e.type !== 'vegetation' && <>
        <Row label="Posição"><Vec value={e.transform.position} onChange={(v) => set({ transform: { position: v } })} /></Row>
        <Row label="Rotação °"><Vec step={5} value={e.transform.rotation} onChange={(v) => set({ transform: { rotation: v } })} /></Row>
        <Row label="Escala"><Vec value={e.transform.scale} onChange={(v) => set({ transform: { scale: v } })} /></Row>
      </>}
      <Row label="Visível"><input type="checkbox" checked={e.visible !== false} onChange={(ev) => set({ visible: ev.target.checked })} /></Row>
      {['character', 'npc', 'vehicle', 'sprite'].includes(e.type) && <Row label="Jogador"><button className="btn sm" onClick={() => setPlayer({ entityId: e.id })}>{doc.player.entityId === e.id ? 'É o jogador ✓' : 'Definir como jogador'}</button></Row>}
      {['character', 'npc'].includes(e.type) && <>
        {number('height', 'Altura (m)', 0.05)}
        <Row label="Biotipo"><select className="input" value={p.build || 'athletic'} onChange={(ev) => prop('build')(ev.target.value)}><option value="athletic">Atlético</option><option value="thin">Magro</option><option value="heavy">Robusto</option></select></Row>
        <Row label="Cabelo"><select className="input" value={p.hair || 'short'} onChange={(ev) => prop('hair')(ev.target.value)}><option value="short">Curto</option><option value="long">Longo</option><option value="mohawk">Moicano</option><option value="bald">Careca</option></select></Row>
        {color('skinColor', 'Pele')}{color('shirtColor', 'Camisa')}{color('pantsColor', 'Calça')}{color('hairColor', 'Cor do cabelo')}
        <Row label="Animação"><select className="input" value={c.animation?.clip || 'idle'} onChange={(ev) => set({ components: { animation: { clip: ev.target.value, loop: true, speed: 1 } } })}>{ANIMATION_CLIPS.map((a) => <option key={a}>{a}</option>)}</select></Row>
      </>}
      {e.type === 'npc' && <>
        <Row label="Comportamento"><select className="input" value={c.ai?.behavior || 'idle'} onChange={(ev) => set({ components: { ai: { behavior: ev.target.value } } })}>{NPC_BEHAVIORS.map((b) => <option key={b}>{b}</option>)}</select></Row>
        <Row label="Velocidade"><Num value={c.ai?.speed ?? 2} onChange={(v) => set({ components: { ai: { speed: v } } })} /></Row>
        <Row label="Raio detecção"><Num value={c.ai?.detectRadius ?? 15} onChange={(v) => set({ components: { ai: { detectRadius: v } } })} /></Row>
        <Row label="Dano"><Num value={c.ai?.attackDamage ?? 10} onChange={(v) => set({ components: { ai: { attackDamage: v } } })} /></Row>
        <Row label="Diálogo"><select className="input" value={c.ai?.dialogueId || ''} onChange={(ev) => set({ components: { ai: { dialogueId: ev.target.value || null } } })}><option value="">Nenhum</option>{doc.dialogues.map((d) => <option key={d.id} value={d.id}>{d.speaker} ({d.id})</option>)}</select></Row>
      </>}
      {e.type === 'primitive' && <>
        <Row label="Tamanho"><Vec value={p.size || [1, 1, 1]} onChange={prop('size')} /></Row>
        <Row label="Material"><select className="input" value={p.material ? `m:${p.material}` : p.preset || 'custom'} onChange={(ev) => (ev.target.value.startsWith('m:') ? set({ props: { material: ev.target.value.slice(2) } }) : set({ props: { preset: ev.target.value, material: null } }))}>
          {Object.keys(doc.materials).map((m) => <option key={m} value={`m:${m}`}>Material do projeto: {m}</option>)}{MATERIAL_PRESETS.map((m) => <option key={m} value={m}>{m}</option>)}</select></Row>
        {color('color', 'Cor')}
        <Row label="Física"><select className="input" value={c.physics?.body || 'none'} onChange={(ev) => set({ components: { physics: { body: ev.target.value } } })}><option value="none">Sem colisão</option><option value="static">Sólido (estático)</option></select></Row>
      </>}
      {e.type === 'vegetation' && <>{number('count', 'Quantidade', 10)}<Row label="Área"><Vec value={[...(p.area || [100, 100]), 0]} onChange={(v) => prop('area')([v[0], v[1]])} /></Row>{number('seed', 'Semente')}{number('avoidCenter', 'Raio livre')}{color('color', 'Cor')}</>}
      {e.type === 'terrain' && <>{number('size', 'Tamanho')}{number('heightScale', 'Relevo', 0.5)}{number('seed', 'Semente')}{number('flattenCenter', 'Área plana')}</>}
      {e.type === 'water' && <>{color('color', 'Cor')}{number('waveScale', 'Ondas', 0.1)}</>}
      {e.type === 'light' && <>{color('color', 'Cor')}{number('intensity', 'Intensidade', 1)}{number('distance', 'Alcance')}<Row label="Sombra"><input type="checkbox" checked={!!p.castShadow} onChange={(ev) => prop('castShadow')(ev.target.checked)} /></Row></>}
      {e.type === 'pickup' && <><Row label="Item"><input className="input" value={p.item || ''} onChange={(ev) => prop('item')(ev.target.value)} /></Row>{number('value', 'Valor')}{color('glow', 'Brilho')}</>}
      {e.type === 'trigger' && <><Row label="Evento"><input className="input" value={p.event || ''} onChange={(ev) => prop('event')(ev.target.value)} /></Row><Row label="Tamanho"><Vec value={p.size || [2, 2, 2]} onChange={prop('size')} /></Row></>}
      {e.type === 'structure' && <>
        {p.color !== undefined && color('color', 'Cor')}
        {p.kind === 'stadium' && <>{number('tiers', 'Anéis')}{number('crowdDensity', 'Torcida (0–1)', 0.05)}{color('homeColor', 'Time da casa')}{color('awayColor', 'Visitante')}<Row label="Cobertura"><input type="checkbox" checked={p.roof !== false} onChange={(ev) => prop('roof')(ev.target.checked)} /></Row></>}
        {p.kind === 'cabin' && <Row label="Estilo"><select className="input" value={p.style || 'cozy'} onChange={(ev) => prop('style')(ev.target.value)}><option value="cozy">Aconchegante</option><option value="abandoned">Abandonada</option></select></Row>}
        {p.length !== undefined && number('length', 'Comprimento')}
      </>}
      {e.type === 'vehicle' && <>{color('color', 'Pintura')}{color('accent', 'Detalhes')}</>}
      {e.type === 'particles' && <><Row label="Efeito"><select className="input" value={p.preset} onChange={(ev) => prop('preset')(ev.target.value)}>{['fire', 'smoke', 'sparks', 'magic', 'dust', 'fireflies'].map((x) => <option key={x}>{x}</option>)}</select></Row>{number('rate', 'Partículas', 10)}</>}
      {scripts.length > 0 && <Row label="Script"><select className="input" value={c.script || ''} onChange={(ev) => set({ components: { script: ev.target.value || null } })}><option value="">Nenhum</option>{scripts.map((s) => <option key={s}>{s}</option>)}</select></Row>}
      <details><summary className="small muted" style={{ cursor: 'pointer' }}>Propriedades avançadas (JSON)</summary><JsonProps e={e} set={set} /></details>
    </div>
  );
}

function JsonProps({ e, set }) {
  const [text, setText] = useState(JSON.stringify({ props: e.props, components: e.components }, null, 2));
  const [err, setErr] = useState(null);
  return <div className="stack" style={{ gap: 6 }}><textarea className="code" style={{ minHeight: 180 }} value={text} onChange={(ev) => setText(ev.target.value)} />{err && <div className="error-box small">{err}</div>}<button className="btn sm" onClick={() => { try { const v = JSON.parse(text); set({ props: v.props, components: v.components }); setErr(null); } catch (x) { setErr(x.message); } }}>Aplicar</button></div>;
}

export function EnvironmentPanel({ doc, setSettings, setPlayer }) {
  const env = doc.settings.environment; const r = doc.settings.rendering;
  const E = (patch) => setSettings({ environment: patch });
  return (
    <div className="stack" style={{ gap: 6 }}>
      <Row label="Qualidade"><select className="input" value={r.quality} onChange={(ev) => setSettings({ rendering: { quality: ev.target.value } })}><option value="low">Baixa (celulares)</option><option value="medium">Média</option><option value="high">Alta</option><option value="ultra">Ultra (PCs fortes)</option></select></Row>
      {doc.meta.dimension === '3d' && <>
        <Row label="Hora do dia"><input type="range" min={0} max={24} step={0.25} value={env.timeOfDay} onChange={(ev) => E({ timeOfDay: Number(ev.target.value) })} /></Row>
        <Row label="Ciclo dia/noite"><input type="checkbox" checked={env.dayNightCycle.enabled} onChange={(ev) => E({ dayNightCycle: { enabled: ev.target.checked } })} /></Row>
        <Row label="Chuva"><input type="checkbox" checked={env.weather.rain.enabled} onChange={(ev) => E({ weather: { rain: { enabled: ev.target.checked } } })} /></Row>
        <Row label="Neve"><input type="checkbox" checked={env.weather.snow?.enabled} onChange={(ev) => E({ weather: { snow: { enabled: ev.target.checked, intensity: 0.5 } } })} /></Row>
        <Row label="Raios"><input type="checkbox" checked={!!env.weather.lightning} onChange={(ev) => E({ weather: { lightning: ev.target.checked } })} /></Row>
        <Row label="Vento"><input type="range" min={0} max={2} step={0.05} value={env.weather.wind} onChange={(ev) => E({ weather: { wind: Number(ev.target.value) } })} /></Row>
        <Row label="Neblina"><input type="checkbox" checked={env.fog.enabled} onChange={(ev) => E({ fog: { enabled: ev.target.checked } })} /></Row>
        <Row label="Densidade"><input type="range" min={0} max={0.06} step={0.0005} value={env.fog.density} onChange={(ev) => E({ fog: { density: Number(ev.target.value) } })} /></Row>
        <Row label="Cor neblina"><input type="color" value={env.fog.color} onChange={(ev) => E({ fog: { color: ev.target.value } })} /></Row>
        <Row label="Exposição"><input type="range" min={0.2} max={2} step={0.05} value={env.exposure} onChange={(ev) => E({ exposure: Number(ev.target.value) })} /></Row>
        <Row label="Sombras"><input type="checkbox" checked={r.shadows.enabled} onChange={(ev) => setSettings({ rendering: { shadows: { enabled: ev.target.checked } } })} /></Row>
        <Row label="Bloom"><input type="checkbox" checked={r.bloom.enabled} onChange={(ev) => setSettings({ rendering: { bloom: { enabled: ev.target.checked } } })} /></Row>
        <Row label="Oclusão (AO)"><input type="checkbox" checked={!!r.ssao?.enabled} onChange={(ev) => setSettings({ rendering: { ssao: { enabled: ev.target.checked } } })} /></Row>
      </>}
      <h4 style={{ margin: '10px 0 4px' }}>Jogador</h4>
      <Row label="Controle"><select className="input" value={doc.player.controller} onChange={(ev) => setPlayer({ controller: ev.target.value })}>{CONTROLLERS.map((x) => <option key={x}>{x}</option>)}</select></Row>
      <Row label="Velocidade"><Num value={doc.player.speed} onChange={(v) => setPlayer({ speed: v })} /></Row>
      <Row label="Pulo"><Num value={doc.player.jumpForce} onChange={(v) => setPlayer({ jumpForce: v })} /></Row>
      <Row label="Vida"><Num step={1} value={doc.player.health} onChange={(v) => setPlayer({ health: v })} /></Row>
    </div>
  );
}

export function MissionsPanel({ doc, apply }) {
  const [sel, setSel] = useState(null);
  const m = doc.missions.find((x) => x.id === sel);
  const save = (mission) => apply([{ op: 'upsert_mission', mission }]);
  return (
    <div className="stack" style={{ gap: 6 }}>
      <div className="row">{doc.missions.map((x) => <button key={x.id} className={`btn sm ${sel === x.id ? 'primary' : ''}`} onClick={() => setSel(x.id)}>{x.title}</button>)}
        <button className="btn sm" onClick={() => { const id = newId('m'); save({ id, title: 'Nova missão', description: '', objectives: [{ id: newId('o'), type: 'reach', target: 'area', count: 1, description: 'Chegue ao local' }], reward: { score: 100 }, next: null }); setSel(id); }}>+ Missão</button></div>
      {m && (
        <div className="stack" style={{ gap: 6 }}>
          <Row label="Título"><input className="input" value={m.title} onChange={(e) => save({ ...m, title: e.target.value })} /></Row>
          <Row label="Descrição"><input className="input" value={m.description} onChange={(e) => save({ ...m, description: e.target.value })} /></Row>
          {m.objectives.map((o, i) => (
            <div key={o.id} className="card" style={{ padding: 8 }}>
              <Row label="Tipo"><select className="input" value={o.type} onChange={(e) => { const objectives = [...m.objectives]; objectives[i] = { ...o, type: e.target.value }; save({ ...m, objectives }); }}>{['reach', 'collect', 'talk', 'defeat', 'survive', 'score', 'interact', 'custom'].map((t) => <option key={t}>{t}</option>)}</select></Row>
              <Row label="Alvo"><input className="input" value={o.target} title="item do pickup, evento do trigger, id do diálogo ou 'npc'" onChange={(e) => { const objectives = [...m.objectives]; objectives[i] = { ...o, target: e.target.value }; save({ ...m, objectives }); }} /></Row>
              <Row label="Quantidade"><Num step={1} value={o.count} onChange={(v) => { const objectives = [...m.objectives]; objectives[i] = { ...o, count: v }; save({ ...m, objectives }); }} /></Row>
              <Row label="Texto"><input className="input" value={o.description} onChange={(e) => { const objectives = [...m.objectives]; objectives[i] = { ...o, description: e.target.value }; save({ ...m, objectives }); }} /></Row>
            </div>
          ))}
          <div className="row"><button className="btn sm" onClick={() => save({ ...m, objectives: [...m.objectives, { id: newId('o'), type: 'collect', target: 'coin', count: 5, description: 'Moedas' }] })}>+ Objetivo</button>
            <select className="input" style={{ width: 'auto' }} value={m.next || ''} onChange={(e) => save({ ...m, next: e.target.value || null })}><option value="">Sem próxima missão</option>{doc.missions.filter((x) => x.id !== m.id).map((x) => <option key={x.id} value={x.id}>{x.title}</option>)}</select>
            <button className="btn sm danger" onClick={() => { apply([{ op: 'remove_mission', id: m.id }]); setSel(null); }}>Excluir</button></div>
        </div>
      )}
      <DialoguesEditor doc={doc} apply={apply} />
    </div>
  );
}

function DialoguesEditor({ doc, apply }) {
  const [sel, setSel] = useState(null);
  const d = doc.dialogues.find((x) => x.id === sel);
  const save = (dialogue) => apply([{ op: 'upsert_dialogue', dialogue }]);
  return (
    <div className="stack" style={{ gap: 6 }}>
      <h4 style={{ margin: '10px 0 0' }}>Diálogos</h4>
      <div className="row">{doc.dialogues.map((x) => <button key={x.id} className={`btn sm ${sel === x.id ? 'primary' : ''}`} onClick={() => setSel(x.id)}>{x.speaker}</button>)}
        <button className="btn sm" onClick={() => { const id = newId('d'); save({ id, speaker: 'Personagem', lines: [{ id: 'l1', text: 'Olá, viajante!', choices: [{ text: 'Olá!', next: null }] }] }); setSel(id); }}>+ Diálogo</button></div>
      {d && (
        <div className="stack" style={{ gap: 6 }}>
          <Row label="Quem fala"><input className="input" value={d.speaker} onChange={(e) => save({ ...d, speaker: e.target.value })} /></Row>
          {d.lines.map((l, i) => (
            <div key={l.id} className="card" style={{ padding: 8 }}>
              <textarea className="input" style={{ minHeight: 50 }} value={l.text} onChange={(e) => { const lines = [...d.lines]; lines[i] = { ...l, text: e.target.value }; save({ ...d, lines }); }} />
              {(l.choices || []).map((c, j) => (
                <div key={j} className="row" style={{ marginTop: 4 }}>
                  <input className="input" style={{ flex: 1 }} value={c.text} onChange={(e) => { const lines = [...d.lines]; const choices = [...l.choices]; choices[j] = { ...c, text: e.target.value }; lines[i] = { ...l, choices }; save({ ...d, lines }); }} />
                  <select className="input" style={{ width: 'auto' }} value={c.next || ''} onChange={(e) => { const lines = [...d.lines]; const choices = [...l.choices]; choices[j] = { ...c, next: e.target.value || null }; lines[i] = { ...l, choices }; save({ ...d, lines }); }}><option value="">fim</option>{d.lines.map((x) => <option key={x.id} value={x.id}>{x.id}</option>)}</select>
                  <select className="input" style={{ width: 'auto' }} value={c.startMission || ''} onChange={(e) => { const lines = [...d.lines]; const choices = [...l.choices]; choices[j] = { ...c, startMission: e.target.value || undefined }; lines[i] = { ...l, choices }; save({ ...d, lines }); }}><option value="">sem missão</option>{doc.missions.map((x) => <option key={x.id} value={x.id}>{x.title}</option>)}</select>
                </div>
              ))}
              <button className="btn sm ghost" onClick={() => { const lines = [...d.lines]; lines[i] = { ...l, choices: [...(l.choices || []), { text: 'Nova escolha', next: null }] }; save({ ...d, lines }); }}>+ escolha</button>
            </div>
          ))}
          <div className="row"><button className="btn sm" onClick={() => save({ ...d, lines: [...d.lines, { id: `l${d.lines.length + 1}`, text: '...', choices: [] }] })}>+ Fala</button><button className="btn sm danger" onClick={() => { apply([{ op: 'remove_dialogue', id: d.id }]); setSel(null); }}>Excluir</button></div>
        </div>
      )}
    </div>
  );
}

export function AssetsPanel({ projectId, doc, assets, apply, onUploaded }) {
  const toast = useToast();
  return (
    <div className="stack" style={{ gap: 6 }}>
      <label className="btn sm"><Icon name="upload" /> Enviar asset (.glb, textura, áudio)<input hidden type="file" accept=".glb,.png,.jpg,.jpeg,.webp,.mp3,.ogg,.wav" onChange={async (e) => {
        const file = e.target.files[0]; if (!file) return;
        try {
          const f = new FormData(); f.append('file', file);
          const { asset } = await api.upload(`/projects/${projectId}/assets`, f);
          apply([{ op: 'set_meta', patch: {} }], (d) => { d.assets = [...(d.assets || []), { id: `a${asset.id}`, assetId: asset.id, name: asset.name, kind: asset.kind, storageKey: asset.storage_key }]; return d; });
          onUploaded();
        } catch (x) { toast(x.message, 'error'); }
      }} /></label>
      {(doc.assets || []).map((a) => (
        <div key={a.id} className="row between small"><span>{a.kind === 'model' ? '🧊' : a.kind === 'audio' ? '🔊' : '🖼️'} {a.name}</span>
          {a.kind === 'model' && <button className="btn sm" onClick={() => apply([{ op: 'add_entity', entity: { type: 'model', name: a.name.replace(/\.glb$/i, ''), props: { asset: a.id }, components: { animation: { clip: '' } } } }])}>Colocar na cena</button>}
          {a.kind === 'texture' && <button className="btn sm" onClick={() => apply([{ op: 'set_material', id: a.name.replace(/\W+/g, '_').slice(0, 30), material: { preset: 'custom', map: a.id } }])}>Criar material</button>}
        </div>
      ))}
      {!doc.assets?.length && <p className="tiny muted">Importe personagens e cenários .glb (ex.: exportados do Blender) para qualidade profissional. {assets.length} arquivo(s) na nuvem.</p>}
    </div>
  );
}
