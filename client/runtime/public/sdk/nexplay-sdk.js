/*
 * NEXPLAY SDK (jogos HTML5). Inclua no seu jogo:
 *   <script src="https://<origem-sandbox>/runtime/sdk/nexplay-sdk.js"></script>
 * O jogo roda isolado; o SDK conversa com a página da NEXPLAY via postMessage.
 *
 *   NEXPLAY.ready()                               // avisa que o jogo carregou
 *   NEXPLAY.unlockAchievement('codigo')           // conquista criada no painel do criador (sem NC)
 *   NEXPLAY.getPlayer().then(p => ...)            // { username, displayName } — dados públicos apenas
 *   NEXPLAY.multiplayer.on('welcome'|'peer_joined'|'peer_left'|'state'|'event'|'start'|'error', fn)
 *   NEXPLAY.multiplayer.send('state', dados)      // estado contínuo (posição etc.)
 *   NEXPLAY.multiplayer.send('event', dados, 'nome')
 *   NEXPLAY.multiplayer.start()                   // somente o anfitrião
 * A sala (pública, privada com código ou convite) é escolhida pelo jogador na página da NEXPLAY.
 */
(function () {
  if (window.NEXPLAY) return;
  var handlers = {};
  var pending = {};
  var seq = 0;
  function post(msg) { window.parent.postMessage(msg, '*'); }
  window.addEventListener('message', function (ev) {
    if (ev.source !== window.parent) return;
    var m = ev.data || {};
    if (m.type === 'nexplay:reply' && pending[m.id]) { pending[m.id](m.data); delete pending[m.id]; }
    if (m.type === 'nexplay:mp') (handlers[m.event] || []).forEach(function (fn) { try { fn(m.data); } catch (e) { console.error(e); } });
  });
  function request(kind, data) {
    return new Promise(function (resolve) { var id = ++seq; pending[id] = resolve; post({ type: 'nexplay:request', id: id, kind: kind, data: data }); });
  }
  window.NEXPLAY = {
    version: '1.0',
    ready: function () { post({ type: 'nexplay:ready' }); },
    unlockAchievement: function (code) { post({ type: 'nexplay:achievement', code: String(code).slice(0, 40) }); },
    getPlayer: function () { return request('player'); },
    event: function (name, data) { post({ type: 'nexplay:event', name: String(name).slice(0, 40), data: data }); },
    multiplayer: {
      on: function (event, fn) { (handlers[event] = handlers[event] || []).push(fn); },
      send: function (t, data, name) { post({ type: 'nexplay:mp:send', t: t === 'event' ? 'event' : 'state', name: name, data: data }); },
      start: function () { post({ type: 'nexplay:mp:send', t: 'start' }); },
    },
  };
})();
