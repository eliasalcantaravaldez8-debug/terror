// Editor de pixel art com quadros de animação. Gera a especificação usada pela NEXPLAY FORGE.
import { useEffect, useRef, useState } from 'react';

const DEFAULT_PALETTE = ['#000000', '#ffffff', '#1e1b4b', '#7c3aed', '#a78bfa', '#06b6d4', '#22d3ee', '#22c55e', '#15803d', '#facc15', '#f97316', '#ef4444', '#7f1d1d', '#a16207', '#e0ac69', '#64748b'];
const KEYS = 'abcdefghijklmnop';

export default function PixelEditor({ onSubmit, busy }) {
  const [size, setSize] = useState(16);
  const [palette, setPalette] = useState(DEFAULT_PALETTE);
  const [color, setColor] = useState(3);
  const [frames, setFrames] = useState(() => [blank(16)]);
  const [cur, setCur] = useState(0);
  const [fps, setFps] = useState(6);
  const [name, setName] = useState('Herói');
  const [role, setRole] = useState('player');
  const canvas = useRef(null);
  const preview = useRef(null);
  const drawing = useRef(null);

  useEffect(() => { setFrames([blank(size)]); setCur(0); }, [size]);
  useEffect(() => {
    const c = canvas.current; const g = c.getContext('2d'); const px = c.width / size;
    g.clearRect(0, 0, c.width, c.height);
    for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
      const v = frames[cur][y][x];
      g.fillStyle = v < 0 ? ((x + y) % 2 ? '#1a1630' : '#221d3d') : palette[v];
      g.fillRect(x * px, y * px, px, px);
    }
  }, [frames, cur, palette, size]);
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      const c = preview.current; if (!c) return;
      const g = c.getContext('2d'); const f = frames[i % frames.length]; const px = c.width / size;
      g.clearRect(0, 0, c.width, c.height);
      for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) if (f[y][x] >= 0) { g.fillStyle = palette[f[y][x]]; g.fillRect(x * px, y * px, px, px); }
      i++;
    }, 1000 / fps);
    return () => clearInterval(t);
  }, [frames, palette, fps, size]);

  const paint = (ev) => {
    const r = canvas.current.getBoundingClientRect();
    const x = Math.floor(((ev.clientX - r.left) / r.width) * size); const y = Math.floor(((ev.clientY - r.top) / r.height) * size);
    if (x < 0 || y < 0 || x >= size || y >= size) return;
    const v = drawing.current === 'erase' ? -1 : color;
    if (frames[cur][y][x] === v) return;
    setFrames((fs) => fs.map((f, i) => (i !== cur ? f : f.map((row, yy) => (yy !== y ? row : row.map((c2, xx) => (xx === x ? v : c2)))))));
  };

  const spec = () => ({
    width: size, height: size,
    palette: Object.fromEntries(palette.map((c, i) => [KEYS[i], c])),
    frames: frames.map((f) => ({ rows: f.map((row) => row.map((v) => (v < 0 ? '.' : KEYS[v])).join('')) })),
    animations: frames.length >= 4 ? { idle: [0], walk: frames.map((_, i) => i).slice(1), jump: [frames.length - 1] } : { idle: frames.map((_, i) => i) },
    fps,
  });

  return (
    <div className="stack" style={{ gap: 8 }}>
      <div className="row"><input className="input" style={{ flex: 1, padding: 6 }} value={name} onChange={(e) => setName(e.target.value)} />
        <select className="input" style={{ width: 'auto', padding: 6 }} value={size} onChange={(e) => setSize(Number(e.target.value))}>{[8, 16, 24, 32].map((s) => <option key={s} value={s}>{s}×{s}</option>)}</select></div>
      <canvas ref={canvas} width={256} height={256} style={{ width: '100%', imageRendering: 'pixelated', borderRadius: 8, border: '1px solid var(--line)', touchAction: 'none', cursor: 'crosshair' }}
        onContextMenu={(e) => e.preventDefault()}
        onPointerDown={(e) => { drawing.current = e.button === 2 ? 'erase' : 'paint'; paint(e); }} onPointerMove={(e) => drawing.current && paint(e)}
        onPointerUp={() => { drawing.current = null; }} onPointerLeave={() => { drawing.current = null; }} />
      <div className="row" style={{ gap: 3 }}>{palette.map((c, i) => (
        <label key={i} title="Clique para usar; duplo clique para trocar a cor" style={{ width: 22, height: 22, borderRadius: 5, background: c, cursor: 'pointer', outline: color === i ? '2px solid var(--cyan)' : '1px solid var(--line)' }} onClick={() => setColor(i)}>
          <input type="color" value={c} style={{ opacity: 0, width: 0, height: 0 }} onChange={(e) => setPalette((p) => p.map((x, j) => (j === i ? e.target.value : x)))} onClick={(e) => e.detail < 2 && e.preventDefault()} />
        </label>
      ))}</div>
      <div className="row" style={{ gap: 4 }}>
        {frames.map((_, i) => <button key={i} className={`btn sm ${i === cur ? 'primary' : ''}`} onClick={() => setCur(i)}>{i + 1}</button>)}
        <button className="btn sm" onClick={() => { setFrames((f) => [...f, f[cur].map((r) => [...r])]); setCur(frames.length); }} title="Duplicar quadro">+</button>
        {frames.length > 1 && <button className="btn sm ghost" onClick={() => { setFrames((f) => f.filter((_, i) => i !== cur)); setCur(0); }}>✕</button>}
        <canvas ref={preview} width={48} height={48} style={{ marginLeft: 'auto', imageRendering: 'pixelated', border: '1px solid var(--line)', borderRadius: 6 }} title="Prévia da animação" />
      </div>
      <div className="row"><span className="tiny muted">FPS</span><input type="range" min={2} max={16} value={fps} onChange={(e) => setFps(Number(e.target.value))} />
        <select className="input" style={{ width: 'auto', padding: 6 }} value={role} onChange={(e) => setRole(e.target.value)}><option value="player">Jogador</option><option value="enemy">Inimigo</option><option value="decoration">Decoração</option><option value="item">Item</option></select></div>
      <p className="tiny muted">Com 4+ quadros: 1 = parado, 2…n = andando, último = pulo. Botão direito apaga.</p>
      <button className="btn primary sm" disabled={busy} onClick={() => onSubmit({ name, spec: spec(), role })}>Produzir sprite na FORGE</button>
    </div>
  );
}

function blank(n) { return Array.from({ length: n }, () => Array(n).fill(-1)); }
