// Celular dos personagens (mesmo modelo, apps diferentes), rede social VIBE, notícias, mensagens e ligações.
const CSS = `
#phone{position:fixed;right:24px;bottom:24px;width:300px;height:560px;max-height:calc(100vh - 48px);background:#0d0e12;border:3px solid #2a2c33;border-radius:28px;box-shadow:0 20px 60px rgba(0,0,0,.6);display:none;flex-direction:column;overflow:hidden;z-index:30;color:#eee;font-family:'Segoe UI',Arial,sans-serif}
#phone .bar{display:flex;justify-content:space-between;padding:10px 18px 6px;font-size:12px;opacity:.8}
#phone .scr{flex:1;overflow-y:auto;padding:8px 14px 14px}
#phone .grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px 8px;padding-top:10px}
#phone .app{display:flex;flex-direction:column;align-items:center;gap:5px;font-size:10.5px;cursor:pointer;background:none;border:0;color:#ddd;padding:0}
#phone .ic{width:48px;height:48px;border-radius:13px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:18px;color:#fff}
#phone h4{margin:6px 0 10px;font-size:16px;letter-spacing:.04em}
#phone .back{background:none;border:0;color:#e0a050;cursor:pointer;font-size:13px;padding:0;margin-bottom:6px}
#phone .item{background:#181a20;border-radius:10px;padding:9px 10px;margin-bottom:8px;font-size:12.5px;line-height:1.4}
#phone .item small{opacity:.6;display:block;margin-top:3px}
#phone .tag{display:inline-block;font-size:9.5px;padding:1px 5px;border-radius:4px;background:#5a2a2a;margin-left:6px;vertical-align:middle}
#phone .tag.n{background:#2a4a6a}
#phone img{width:100%;border-radius:8px;margin-top:6px;display:block}
#phone .btn{background:#e0a050;color:#111;border:0;border-radius:8px;padding:7px 10px;font-weight:700;cursor:pointer;margin:4px 4px 0 0;font-size:12px}
#phone .home{height:5px;width:110px;background:#555;border-radius:3px;margin:8px auto}
#phone-notif{position:fixed;right:24px;top:70px;background:rgba(15,16,20,.92);border-left:3px solid #e0a050;padding:9px 13px;font-size:13px;max-width:300px;opacity:0;transition:opacity .4s;z-index:25;pointer-events:none}
`;
const APPS_BASE = [
  ['mapa', 'Mapa', '#3a8a5a', 'M'], ['mensagens', 'Mensagens', '#3a7ad0', '✉'], ['ligacoes', 'Ligações', '#2aa060', '☎'], ['banco', 'Banco', '#c8962a', '$'],
  ['camera', 'Câmera', '#555', '◉'], ['garagem', 'Garagem', '#6a5aa8', 'G'], ['missoes', 'Missões', '#a83a3a', '!'], ['noticias', 'Notícias', '#2a5a8a', 'N'],
  ['vibe', 'VIBE', '#d0306a', 'V'], ['status', 'Status', '#4a6a7a', '♥'], ['codigos', 'Códigos', '#222', '#'],
];
const APPS_RYAN = [['arquivos', 'Arquivos', '#5a5a3a', 'A'], ['casos', 'Casos', '#7a3a2a', 'C'], ['contratos', 'Contratos', '#2a2a2a', '✦'], ['ferramentas', 'Ferramentas', '#2a6a6a', 'F'], ['anotacoes', 'Anotações', '#8a7a3a', '✎']];

export class Phone {
  constructor(G) {
    this.G = G; this.open = false; this.app = null;
    const st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
    this.el = document.createElement('div'); this.el.id = 'phone'; document.body.appendChild(this.el);
    this.notifEl = document.createElement('div'); this.notifEl.id = 'phone-notif'; document.body.appendChild(this.notifEl);
    this.el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-app]'); if (b) { this.show(b.dataset.app); return; }
      const a = e.target.closest('[data-act]'); if (a) this.action(a.dataset.act, a.dataset.arg);
    });
  }
  get C() { return this.G.state[this.G.state.char]; }
  toggle(v = !this.open) {
    this.open = v; this.el.style.display = v ? 'flex' : 'none';
    if (v) { this.app = null; this.render(); }
  }
  notify(text) {
    this.notifEl.textContent = text; this.notifEl.style.opacity = 1;
    clearTimeout(this._nt); this._nt = setTimeout(() => { this.notifEl.style.opacity = 0; }, 4200);
  }
  clock() { const h = this.G.state.hour; return String(Math.floor(h)).padStart(2, '0') + ':' + String(Math.floor((h % 1) * 60)).padStart(2, '0'); }
  // ---- dados ----
  addMessage(from, text, photo = null, char = this.G.state.char) {
    const c = this.G.state[char]; c.messages.unshift({ from, text, photo, day: this.G.state.day, time: this.clock() });
    if (char === this.G.state.char) this.notify('Nova mensagem de ' + from);
  }
  addCall(from, note, char = this.G.state.char) { this.G.state[char].calls.unshift({ from, note, day: this.G.state.day, time: this.clock() }); }
  addPost(p) {
    const st = this.G.state; st.feed.unshift({ ...p, day: st.day, time: this.clock(), likes: p.likes ?? Math.floor(20 + Math.random() * 900) });
    st.feed = st.feed.slice(0, 60); if (p.notify !== false) this.notify('VIBE: @' + p.user + ' publicou');
  }
  addNews(title, body = '') { const st = this.G.state; st.news.unshift({ title, body, day: st.day, time: this.clock() }); st.news = st.news.slice(0, 40); }
  // ---- interface ----
  show(app) { this.app = app; this.render(); }
  action(act, arg) {
    const G = this.G;
    if (act === 'back') { this.app = null; this.render(); }
    if (act === 'photo') { G.takePhoto && G.takePhoto(); this.render(); }
    if (act === 'callcar') { G.callCar && G.callCar(); this.toggle(false); }
    if (act === 'contract') { G.onContract && G.onContract(arg); this.render(); }
    if (act === 'code') { const inp = document.getElementById('code-in'); this.codeResult = G.cheat ? G.cheat((inp && inp.value) || '') : null; this.render(); }
    if (act === 'spawn') { G.spawnVehicle && G.spawnVehicle(arg); this.codeResult = null; this.toggle(false); G.relockPointer && G.relockPointer(); }
  }
  render() {
    const G = this.G, st = G.state, C = this.C, ryan = st.char === 'ryan';
    const head = `<div class="bar"><span>${this.clock()}</span><span>${ryan ? 'Ryan' : 'Ethan'} · 4G ▮▮▮</span></div>`;
    const esc = (s) => String(s).replace(/[&<>]/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[m]));
    let body = '';
    const back = '<button class="back" data-act="back">‹ Voltar</button>';
    const list = (arr, fn, empty) => arr.length ? arr.map(fn).join('') : `<div class="item">${empty}</div>`;
    switch (this.app) {
      case null: {
        const apps = ryan ? APPS_BASE.concat(APPS_RYAN) : APPS_BASE;
        body = `<div class="grid">${apps.map(([id, n, c, i]) => `<button class="app" data-app="${id}"><span class="ic" style="background:${c}">${i}</span>${n}</button>`).join('')}</div>`;
        break;
      }
      case 'mapa': body = back + '<h4>Mapa</h4><canvas id="phone-map" width="260" height="260" style="width:100%;border-radius:10px;background:#1a2414"></canvas><div class="item">Amarelo: objetivo · Azul: seu carro · Vermelho: você</div>'; break;
      case 'mensagens': body = back + '<h4>Mensagens</h4>' + list(C.messages, (m) => `<div class="item"><b>${esc(m.from)}</b><br>${esc(m.text)}${m.photo ? `<img src="${m.photo}" alt="foto">` : ''}<small>Dia ${m.day} · ${m.time}</small></div>`, 'Nenhuma mensagem.'); break;
      case 'ligacoes': body = back + '<h4>Ligações</h4>' + list(C.calls, (m) => `<div class="item"><b>${esc(m.from)}</b><br>${esc(m.note || '')}<small>Dia ${m.day} · ${m.time}</small></div>`, 'Nenhuma ligação.'); break;
      case 'banco': body = back + `<h4>Banco</h4><div class="item" style="font-size:22px">R$ ${C.money.toLocaleString('pt-BR')}</div><div class="item">Conta de ${ryan ? 'Ryan Cole' : 'Ethan Cross'}. O dinheiro de Ethan e de Ryan é separado.</div>`; break;
      case 'camera': body = back + '<h4>Câmera</h4><button class="btn" data-act="photo">Tirar foto</button>' + list(C.photos, (p) => `<div class="item"><img src="${p.src}" alt="foto"><small>${esc(p.label || '')} · Dia ${p.day}</small></div>`, 'Nenhuma foto ainda.'); break;
      case 'garagem': body = back + `<h4>Garagem</h4><div class="item"><b>${ryan ? 'SUV preta' : 'Sedan azul'}</b><br>Combustível: ${Math.round((G.ownCar() ? G.ownCar().fuel : 1) * 100)}% · Estado: ${Math.round((G.ownCar() ? G.ownCar().health : 1) * 100)}%</div><button class="btn" data-act="callcar">Chamar meu carro</button>`; break;
      case 'missoes': body = back + '<h4>Missões</h4>' + (G.missionList ? G.missionList().map((m) => `<div class="item"><b>${esc(m.title)}</b> ${m.status === 'done' ? '<span class="tag n">CONCLUÍDA</span>' : m.status === 'active' ? '<span class="tag">EM ANDAMENTO</span>' : m.status === 'available' ? '<span class="tag n">DISPONÍVEL</span>' : '<span class="tag">BLOQUEADA</span>'}<small>${esc(m.hint || '')}</small></div>`).join('') : ''); break;
      case 'noticias': body = back + '<h4>Notícias de Los Valles</h4>' + list(st.news, (n) => `<div class="item"><b>${esc(n.title)}</b><br>${esc(n.body)}<small>Dia ${n.day} · ${n.time}</small></div>`, 'Sem notícias.'); break;
      case 'vibe': body = back + '<h4 style="color:#ff5a9a">VIBE</h4>' + list(st.feed, (p) => `<div class="item"><b>@${esc(p.user)}</b>${p.tag ? `<span class="tag ${p.tag === 'NOTÍCIA' ? 'n' : ''}">${p.tag}</span>` : ''}<br>${esc(p.text)}${p.photo ? `<img src="${p.photo}" alt="">` : ''}<small>♥ ${p.likes} · ${(p.comments || []).length} comentários · Dia ${p.day} ${p.time}</small>${(p.comments || []).map((c) => `<div style="margin-top:4px;opacity:.8">↳ <b>@${esc(c[0])}</b> ${esc(c[1])}</div>`).join('')}</div>`, 'Nada no feed.'); break;
      case 'status': {
        const n = C.needs, t = C.traits;
        body = back + `<h4>Status</h4><div class="item">Vida ${Math.round(C.hp)} · Fome ${Math.round(n.fome)} · Sede ${Math.round(n.sede)} · Sono ${Math.round(n.sono)} · Dor ${Math.round(n.dor)}</div><div class="item"><b>Personalidade</b><br>Inteligência ${t.inteligencia} · Frieza ${t.frieza} · Carisma ${t.carisma} · Manipulação ${t.manipulacao} · Impulsividade ${t.impulsividade}</div><div class="item">Procurado (máximo já alcançado): ${'★'.repeat(st.maxStars)}${'☆'.repeat(6 - st.maxStars)}<br>Blackwood: ${st.blackwood ? 'desbloqueada' : 'bloqueada (precisa de 2 estrelas)'}</div>`;
        break;
      }
      case 'arquivos': body = back + '<h4>Arquivos</h4>' + list(C.notes.filter((n) => n.type === 'arquivo'), (n) => `<div class="item"><b>${esc(n.title)}</b><br>${esc(n.text)}</div>`, 'Nenhum arquivo.'); break;
      case 'casos': body = back + '<h4>Casos</h4>' + list(C.notes.filter((n) => n.type === 'caso'), (n) => `<div class="item"><b>${esc(n.title)}</b><br>${esc(n.text)}</div>`, 'Nenhum caso aberto.'); break;
      case 'contratos': body = back + '<h4>Contratos</h4>' + list(C.contracts, (k) => `<div class="item"><b>${esc(k.title)}</b> <span class="tag">${esc(k.status)}</span><br>${esc(k.text)}${k.status === 'oferta' ? `<br><button class="btn" data-act="contract" data-arg="${k.id}:aceitar">Aceitar</button><button class="btn" data-act="contract" data-arg="${k.id}:recusar">Recusar</button>` : ''}</div>`, 'Nenhum contrato.'); break;
      case 'ferramentas': body = back + '<h4>Ferramentas</h4>' + (C.tools.pulso ? '<div class="item"><b>Pulso Eletrônico</b><br>Desativa câmeras próximas por alguns segundos. Tecla <b>Q</b>.</div>' : '<div class="item">Nenhuma ferramenta desbloqueada.</div>'); break;
      case 'codigos': {
        const r = this.codeResult;
        body = back + '<h4>Códigos</h4><div class="item">Digite um código e toque em Ativar.</div>'
          + '<input id="code-in" type="text" autocomplete="off" spellcheck="false" placeholder="ex.: TODOSCARROS" style="width:100%;box-sizing:border-box;padding:8px;font-size:15px;text-transform:uppercase;border-radius:8px;border:1px solid #555;background:#111;color:#fff">'
          + '<button class="btn" data-act="code">Ativar</button>'
          + (r ? (r.msg ? `<div class="item"><b>${esc(r.msg)}</b></div>` : '') + (r.list ? r.list.map(([id, name]) => `<button class="btn" style="display:block;width:100%;margin:4px 0;text-align:left" data-act="spawn" data-arg="${id}">${esc(name)}</button>`).join('') : '') : '')
          + '<div class="item"><small>Códigos: TODOSCARROS · TODASMOTOS · SEMFOME · VIDACHEIA · SEMPOLICIA</small></div>';
        break;
      }
      case 'anotacoes': body = back + '<h4>Anotações</h4>' + list(C.notes.filter((n) => n.type === 'nota'), (n) => `<div class="item">${esc(n.text)}</div>`, 'Sem anotações.'); break;
    }
    this.el.innerHTML = head + `<div class="scr">${body}</div><div class="home"></div>`;
    if (this.app === 'mapa' && G.drawPhoneMap) G.drawPhoneMap(document.getElementById('phone-map'));
  }
}

// Publicações da VIBE por acontecimento (sem revelar mistérios)
export const VIBE = {
  prologo: [
    { user: 'lv_noticias', tag: 'NOTÍCIA', text: 'Grande operação policial na favela esta noite. Um homem foi preso após batida de carro durante a fuga.', comments: [['joana.r', 'ouvi as sirenes daqui de casa'], ['m4rcos', 'diz que um deles fugiu a pé...']] },
    { user: 'boca_da_vila', tag: 'RUMOR', text: 'Alguém entregou o esquema. Ninguém sabe quem.', comments: [['anon_88', 'sempre tem um traidor']] },
  ],
  liberdade: [
    { user: 'valles_24h', tag: 'RUMOR', text: 'Viram um carro blindado preto parado na frente da Penitenciária hoje cedo. Quem será que saiu?', comments: [['lu.santos', 'carro de rico ou de bandido'], ['deivid', 'kkkk os dois']] },
  ],
  victor: [
    { user: 'lv_noticias', tag: 'NOTÍCIA', text: 'Confronto entre grupos rivais na Zona Industrial. Polícia chegou depois que todos haviam deixado o local.', comments: [['zona_leste', 'de novo isso?']] },
    { user: 'motorista_lv', tag: 'RUMOR', text: 'Um carro passou voando pela Av. Los Valles sendo perseguido por outro. Parecia filme.', comments: [['bia.k', 'eu vi! quase bateu no ônibus']] },
  ],
  ligacao: [{ user: 'anon_lv', tag: 'RUMOR', text: 'Tem gente fotografando pessoas na rua sem elas saberem. Cuidado, Los Valles.', notify: false }],
  mansao: [{ user: 'condominio_norte', tag: 'RUMOR', text: 'Barulho estranho vindo daquela mansão enorme lá do norte. Seguranças correndo pra todo lado.', comments: [['vizinho_x', 'aquilo ali nunca foi normal']] }],
  galpao: [
    { user: 'lv_noticias', tag: 'NOTÍCIA', text: 'Policial é encontrado morto em galpão abandonado na Zona Industrial. A polícia não divulgou suspeitos.', comments: [['rafa_m', 'mais um...'], ['anon_77', 'policial em galpão abandonado? estranho']] },
    { user: 'olho_vivo', tag: 'RUMOR', text: 'Gente falando que viram alguém de capuz correndo pela Zona Industrial naquela noite. Não confirmado.', comments: [['k4mila', 'fonte?']] },
  ],
  investigacao: [{ user: 'lv_noticias', tag: 'NOTÍCIA', text: 'Investigação sobre a morte do policial segue em sigilo.' }],
  fernando: [{ user: 'bairro_oeste', tag: 'RUMOR', text: 'Alguém ouviu gritos de socorro numa casa perto da saída oeste de madrugada.', comments: [['vigia_noturno', 'as câmeras de lá apagaram do nada']] }],
  procurado: [
    { user: 'valles_24h', tag: 'RUMOR', text: 'Perseguição policial agora no centro! Fiquem longe das avenidas.' },
    { user: 'lv_transito', tag: 'NOTÍCIA', text: 'Viaturas bloqueiam ruas após confusão. Trânsito lento na região.' },
  ],
  acidente: [{ user: 'lv_transito', tag: 'NOTÍCIA', text: 'Acidente entre veículos deixa trânsito lento. Sem feridos graves.' }],
  aleatorio: [
    { user: 'cafe_noir', text: 'Café novo no cardápio hoje. Passa aqui! ☕' },
    { user: 'joana.r', text: 'Los Valles à noite tem outra cara.' },
    { user: 'pizzaria_napoli', text: 'Promoção de terça: pizza grande pela metade do preço.' },
    { user: 'm4rcos', text: 'Alguém mais acha que essa cidade esconde coisa demais?' },
    { user: 'lv_clima', tag: 'NOTÍCIA', text: 'Previsão: noite com nuvens e possibilidade de chuva.' },
  ],
};
