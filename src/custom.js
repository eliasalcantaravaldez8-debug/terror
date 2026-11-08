// LOS VALLES CUSTOM — oficina de customização com pré-visualização do carro.
import { CAR_TYPES, WHEELS } from './vehicle.js';

const CSS = `
body.incustom #hud{display:none!important}
#custom{position:fixed;inset:0;display:none;z-index:28;pointer-events:none;font-family:'Segoe UI',Arial,sans-serif;color:#eee}
#custom .side{position:absolute;top:0;right:0;bottom:0;width:min(400px,94vw);background:linear-gradient(90deg,rgba(10,10,14,.55),rgba(10,10,14,.94) 18%);padding:22px 22px 18px 44px;display:flex;flex-direction:column;gap:12px;pointer-events:auto;overflow:hidden}
#custom h2{margin:0;font-weight:300;letter-spacing:.22em;font-size:20px;color:#ff7a2a}
#custom .car{font-size:13px;opacity:.85}
#custom .money{font-size:18px;color:#8fd88f;font-variant-numeric:tabular-nums}
#custom .tabs{display:flex;flex-wrap:wrap;gap:6px}
#custom .tab{background:#1c1d24;border:1px solid #333;color:#ddd;padding:6px 10px;font-size:12px;letter-spacing:.06em;cursor:pointer;border-radius:4px;min-width:0}
#custom .tab.on{background:#ff7a2a;color:#111;border-color:#ff7a2a}
#custom .list{flex:1;overflow-y:auto;display:flex;flex-direction:column;gap:6px;padding-right:4px}
#custom .opt{display:flex;justify-content:space-between;align-items:center;gap:8px;background:#16171d;border:1px solid #2a2b33;padding:9px 11px;border-radius:6px;cursor:pointer;font-size:13.5px;text-align:left;color:#eee;min-width:0;letter-spacing:0}
#custom .opt:hover{border-color:#ff7a2a}
#custom .opt.sel{border-color:#ff7a2a;background:#2a1a10}
#custom .opt.own{opacity:.6}
#custom .opt small{color:#bbb;font-size:12px;white-space:nowrap}
#custom .sw{display:grid;grid-template-columns:repeat(6,1fr);gap:8px}
#custom .sw button{aspect-ratio:1;border-radius:6px;border:2px solid #222;cursor:pointer;padding:0;min-width:0}
#custom .sw button.sel{border-color:#fff}
#custom .stats{display:grid;grid-template-columns:90px 1fr;gap:5px 10px;font-size:11.5px;align-items:center}
#custom .bar{height:6px;background:#2a2a30;border-radius:3px;overflow:hidden;position:relative}
#custom .bar b{position:absolute;inset:0 auto 0 0;background:#9a9aa8}
#custom .bar i{position:absolute;inset:0 auto 0 0;background:#ff7a2a;opacity:.85}
#custom .foot{display:flex;flex-direction:column;gap:8px;border-top:1px solid #2a2a30;padding-top:10px}
#custom .total{display:flex;justify-content:space-between;font-size:15px}
#custom .row{display:flex;gap:8px}
#custom .row button{flex:1;font-size:13px;padding:10px 8px;min-width:0;letter-spacing:.08em}
#custom .buy{background:#ff7a2a;color:#111;border-color:#ff7a2a}
#custom .hint{position:absolute;left:24px;bottom:22px;font-size:12px;opacity:.7;pointer-events:none}
#custom .msg{font-size:12.5px;color:#ffb07a;min-height:16px}
`;
const PAINTS = [0xd8d8d8, 0xf4f4f4, 0x1a1a1a, 0x3f4a52, 0x8e1b1b, 0xd01818, 0xe86a10, 0xd8a010, 0xe8d020, 0x2e7a3a, 0x7ac83a, 0x1d3f72, 0x3a7ad8, 0x40c8e8, 0x5a1f7d, 0xd040a0];
const PRICE = { paint: 300, wheel: 450, spoiler: 450, skirts: 350, tint: [0, 150, 250], neon: 400, xenon: 200, engine: [0, 900, 1800, 3000], brakes: [0, 500, 900, 1500], susp: [0, 400, 800, 1300], turbo: 2500 };
const NEONS = [[null, 'Sem neon'], [0x2a7aff, 'Azul'], [0xff2a9a, 'Rosa'], [0x2aff7a, 'Verde'], [0xff8a1a, 'Laranja'], [0xb02aff, 'Roxo']];
const hex = (c) => '#' + c.toString(16).padStart(6, '0');

export class CustomShop {
  constructor(G) {
    this.G = G; this.open = false; this.tab = 'pintura';
    const st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
    this.el = document.createElement('div'); this.el.id = 'custom'; document.body.appendChild(this.el);
    this.el.addEventListener('click', (e) => { const b = e.target.closest('[data-a]'); if (b) this.act(b.dataset.a, b.dataset.v); });
    this.angle = 0.6; this.dragging = false;
    window.addEventListener('mousedown', (e) => { if (this.open && !e.target.closest('#custom .side')) { this.dragging = true; this.lastX = e.clientX; } });
    window.addEventListener('mouseup', () => { this.dragging = false; });
    window.addEventListener('mousemove', (e) => { if (this.dragging) { this.angle -= (e.clientX - this.lastX) * 0.01; this.lastX = e.clientX; } });
  }
  // abre com o carro em que o jogador está
  enter(car) {
    const G = this.G; this.car = car; this.open = true;
    this.orig = JSON.parse(JSON.stringify(car.mods)); this.origHealth = car.health; this.repair = false; this.msg = '';
    const bay = G.city.customBay; car.place(bay.x, bay.z, Math.PI / 2); car.speed = 0; car.lat = 0;
    G.camOverride = true; G.inputLocked = true; G.unlockPointer && G.unlockPointer();
    this.el.style.display = 'block'; document.body.classList.add('incustom'); this.render();
  }
  exit(bought) {
    const G = this.G; const car = this.car;
    if (!bought) { car.mods = this.orig; car.rebuild(); }
    const bay = G.city.customBay; car.place(bay.outX, bay.outZ, Math.PI / 2);
    this.open = false; this.el.style.display = 'none'; document.body.classList.remove('incustom'); G.camOverride = false; G.inputLocked = false;
    G.cam.yaw = car.heading + Math.PI; G.cam.initialized = false; G.relockPointer && G.relockPointer();
  }
  update(dt) {
    if (!this.open) return;
    if (!this.dragging) this.angle += dt * 0.25;
    const c = this.car, cam = this.G.camera; const r = 7.2;
    cam.position.set(c.x + Math.sin(this.angle) * r, c.y + 2.1, c.z + Math.cos(this.angle) * r);
    cam.lookAt(c.x - 1.4 * Math.cos(this.angle), c.y + 0.7, c.z + 1.4 * Math.sin(this.angle));
  }
  cart() {
    const m = this.car.mods, o = this.orig; const items = [];
    if (m.color !== o.color) items.push(['Pintura', PRICE.paint]);
    if (m.wheel !== o.wheel) items.push(['Rodas', PRICE.wheel]);
    if (m.spoiler && !o.spoiler) items.push(['Aerofólio', PRICE.spoiler]);
    if (m.skirts && !o.skirts) items.push(['Saias laterais', PRICE.skirts]);
    if (m.tint !== o.tint) items.push(['Película', PRICE.tint[m.tint]]);
    if (m.neon !== o.neon && m.neon != null) items.push(['Neon', PRICE.neon]);
    if (m.xenon && !o.xenon) items.push(['Faróis xenon', PRICE.xenon]);
    for (const k of ['engine', 'brakes', 'susp']) for (let l = o[k] + 1; l <= m[k]; l++) items.push([{ engine: 'Motor', brakes: 'Freios', susp: 'Suspensão' }[k] + ' nível ' + l, PRICE[k][l]]);
    if (m.turbo && !o.turbo) items.push(['Turbo', PRICE.turbo]);
    if (this.repair) items.push(['Reparo', this.repairCost()]);
    return items;
  }
  repairCost() { return Math.round((1 - this.origHealth) * 500) + 30; }
  act(a, v) {
    const car = this.car, m = car.mods; this.msg = '';
    const set = (k, val) => { m[k] = val; car.rebuild(); };
    if (a === 'tab') this.tab = v;
    else if (a === 'paint') set('color', +v);
    else if (a === 'wheel') set('wheel', v);
    else if (a === 'toggle') set(v, !m[v]);
    else if (a === 'tint') set('tint', +v);
    else if (a === 'neon') set('neon', v === 'null' ? null : +v);
    else if (a === 'level') { const [k, l] = v.split(':'); if (+l < this.orig[k]) this.msg = 'Você já tem um nível maior instalado.'; else { m[k] = +l; if (k === 'susp') car.rebuild(); } }
    else if (a === 'repair') { this.repair = !this.repair; car.health = this.repair ? 1 : this.origHealth; }
    else if (a === 'cancel') return this.exit(false);
    else if (a === 'buy') return this.buy();
    this.render();
  }
  buy() {
    const G = this.G; const C = G.campaign(); const total = this.cart().reduce((a, i) => a + i[1], 0);
    if (total > C.money) { this.msg = `Dinheiro insuficiente: faltam R$ ${(total - C.money).toLocaleString('pt-BR')}`; this.render(); return; }
    G.addMoney(-total);
    G.setOwnCar(this.car); G.saveNow && G.saveNow('Customização salva');
    G.toast(total ? `Modificações aplicadas (R$ ${total.toLocaleString('pt-BR')}) — salvas neste carro` : 'Nenhuma mudança', 3);
    this.exit(true);
  }
  render() {
    const car = this.car, m = car.mods, T = car.T, C = this.G.campaign();
    const items = this.cart(); const total = items.reduce((a, i) => a + i[1], 0);
    const s = car.stats, base = { maxSpeed: T.maxSpeed, accel: T.accel, brake: T.brake, grip: T.grip };
    const bar = (label, v, b, max) => `<span>${label}</span><div class="bar"><i style="width:${Math.min(100, v / max * 100)}%"></i><b style="width:${Math.min(100, b / max * 100)}%"></b></div>`;
    const opt = (a, v, label, price, sel, owned) => `<button class="opt${sel ? ' sel' : ''}${owned ? ' own' : ''}" data-a="${a}" data-v="${v}"><span>${label}</span><small>${owned ? 'instalado' : price ? 'R$ ' + price.toLocaleString('pt-BR') : ''}</small></button>`;
    let list = '';
    switch (this.tab) {
      case 'pintura': list = `<div class="sw">${PAINTS.map((c) => `<button aria-label="Cor ${hex(c)}" class="${m.color === c ? 'sel' : ''}" style="background:${hex(c)}" data-a="paint" data-v="${c}"></button>`).join('')}</div><div class="car">Pintura completa: R$ ${PRICE.paint}</div>`; break;
      case 'rodas': list = Object.entries(WHEELS).map(([k, w]) => opt('wheel', k, w.name, PRICE.wheel, m.wheel === k, this.orig.wheel === k)).join(''); break;
      case 'visual':
        list = opt('toggle', 'spoiler', 'Aerofólio' + (m.spoiler ? ' ✓' : ''), PRICE.spoiler, m.spoiler, this.orig.spoiler)
          + opt('toggle', 'skirts', 'Saias laterais' + (m.skirts ? ' ✓' : ''), PRICE.skirts, m.skirts, this.orig.skirts)
          + opt('toggle', 'xenon', 'Faróis xenon' + (m.xenon ? ' ✓' : ''), PRICE.xenon, m.xenon, this.orig.xenon)
          + [0, 1, 2].map((t) => opt('tint', t, ['Vidros sem película', 'Película média', 'Película escura'][t], PRICE.tint[t], m.tint === t, this.orig.tint === t)).join('')
          + NEONS.map(([c, n]) => opt('neon', String(c), 'Neon: ' + n, c == null ? 0 : PRICE.neon, m.neon === c, this.orig.neon === c)).join('');
        break;
      case 'desempenho':
        for (const [k, n] of [['engine', 'Motor'], ['brakes', 'Freios'], ['susp', 'Suspensão']]) for (let l = 0; l <= 3; l++) list += opt('level', k + ':' + l, `${n} — ${l === 0 ? 'original' : 'nível ' + l}`, PRICE[k][l], m[k] === l, l <= this.orig[k] && l === this.orig[k]);
        list += opt('toggle', 'turbo', 'Turbo' + (m.turbo ? ' ✓' : ''), PRICE.turbo, m.turbo, this.orig.turbo);
        break;
      case 'reparo': list = this.origHealth >= 0.999 ? '<div class="car">O carro está em perfeito estado.</div>' : opt('repair', '1', `Reparar carroceria e motor (estado ${Math.round(this.origHealth * 100)}%)`, this.repairCost(), this.repair, false); break;
    }
    const tabs = [['pintura', 'Pintura'], ['rodas', 'Rodas'], ['visual', 'Visual'], ['desempenho', 'Desempenho'], ['reparo', 'Reparo']];
    this.el.innerHTML = `<div class="side">
      <h2>LOS VALLES CUSTOM</h2>
      <div class="car">${T.name}${car.owner ? ' · seu carro' : ''}</div>
      <div class="money">R$ ${C.money.toLocaleString('pt-BR')}</div>
      <div class="tabs">${tabs.map(([k, n]) => `<button class="tab${this.tab === k ? ' on' : ''}" data-a="tab" data-v="${k}">${n}</button>`).join('')}</div>
      <div class="list">${list}</div>
      <div class="stats">${bar('Velocidade', s.maxSpeed, base.maxSpeed, 100)}${bar('Aceleração', s.accel, base.accel, 20)}${bar('Frenagem', s.brake, base.brake, 26)}${bar('Aderência', s.grip, base.grip, 15)}</div>
      <div class="foot"><div class="msg">${this.msg}</div>
        <div class="total"><span>${items.length ? items.map((i) => i[0]).join(', ') : 'Nenhuma alteração'}</span></div>
        <div class="total"><span>Total</span><b>R$ ${total.toLocaleString('pt-BR')}</b></div>
        <div class="row"><button data-a="cancel">CANCELAR</button><button class="buy" data-a="buy">COMPRAR</button></div></div>
    </div><div class="hint">Arraste com o mouse para girar o carro · As mudanças aparecem na hora</div>`;
  }
}
export { CAR_TYPES };
