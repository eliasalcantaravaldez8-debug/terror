// Editor de mapas 2D: pintura de blocos no tilemap, posição inicial do jogador e inimigos.
import { useEffect, useRef, useState } from 'react';
import { Game2D } from '../engine/game2d.js';

const TOOLS = [['1', 'Chão'], ['2', 'Tijolo'], ['3', 'Moeda'], ['4', 'Perigo'], ['5', 'Chegada'], ['0', 'Borracha'], ['player', 'Início do jogador'], ['enemy', 'Inimigo']];

export default function Editor2D({ doc, apply, assetUrl }) {
  const box = useRef(null);
  const game = useRef(null);
  const [tool, setTool] = useState('1');
  const painting = useRef(false);
  const docRef = useRef(doc);
  docRef.current = doc;

  useEffect(() => {
    const g = new Game2D(box.current, doc, { mode: 'edit', assetUrl });
    g.init();
    game.current = g;
    const keys = (e) => { const d = { ArrowLeft: -64, ArrowRight: 64 }[e.code]; if (d) g.cam.x = Math.max(0, g.cam.x + d); const v = { ArrowUp: -64, ArrowDown: 64 }[e.code]; if (v) g.cam.y += v; };
    window.addEventListener('keydown', keys);
    return () => { window.removeEventListener('keydown', keys); g.dispose(); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { game.current?.setDoc(doc); }, [doc]);

  const paint = (ev, erase = false) => {
    const g = game.current; const d = docRef.current;
    const { c, r, x, y } = g.cellAt(ev.clientX, ev.clientY);
    const map = d.entities.find((e) => e.type === 'tilemap');
    if (!map || r < 0 || c < 0) return;
    if (tool === 'player' && !erase) { if (d.player.entityId) apply([{ op: 'update_entity', id: d.player.entityId, patch: { transform: { position: [Math.round(x), Math.round(y) - 40, 0] } } }]); return; }
    if (tool === 'enemy' && !erase) { apply([{ op: 'add_entity', entity: { type: 'sprite', name: 'Inimigo', props: { shape: 'enemy', color: '#ef4444', width: 32, height: 32 }, transform: { position: [c * g.tile, r * g.tile, 0] }, components: { ai: { speed: 80 } } } }]); return; }
    const ch = erase ? '0' : tool;
    const rows = map.props.rows.map((row) => row.split(''));
    while (rows.length <= r) rows.push('0'.repeat(rows[0]?.length || 100).split(''));
    for (const row of rows) while (row.length <= c) row.push('0');
    if (rows[r][c] === ch) return;
    rows[r][c] = ch;
    apply([{ op: 'update_entity', id: map.id, patch: { props: { rows: rows.map((row) => row.join('')) } } }], null, { coalesce: 'paint' });
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div className="row" style={{ position: 'absolute', zIndex: 2, top: 8, left: 8, gap: 4 }}>
        {TOOLS.map(([k, l]) => <button key={k} className={`btn sm ${tool === k ? 'primary' : ''}`} onClick={() => setTool(k)}>{l}</button>)}
        <span className="tiny muted" style={{ alignSelf: 'center' }}>Setas movem a câmera · botão direito apaga</span>
      </div>
      <div ref={box} style={{ width: '100%', height: '100%' }}
        onContextMenu={(e) => e.preventDefault()}
        onPointerDown={(e) => { painting.current = e.button === 2 ? 'erase' : 'paint'; paint(e, e.button === 2); }}
        onPointerMove={(e) => { if (painting.current && !['player', 'enemy'].includes(tool)) paint(e, painting.current === 'erase'); }}
        onPointerUp={() => { painting.current = false; }} onPointerLeave={() => { painting.current = false; }} />
    </div>
  );
}
