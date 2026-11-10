# NEXPLAY

Plataforma de jogos, comunidade gamer e criação de jogos com IA.

- **NEXPLAY Arcade**: só jogos criados e publicados pela comunidade no Studio (nada pré-instalado), com abas Jogos do mês, Jogos da semana, Em alta, Novidades e Pesquisa calculadas com sessões de jogo reais.
- **Jogar**: catálogo com filtros (dispositivo, gênero, preço, modo), páginas de jogo com mídia, avaliações, comentários, versões e devlogs. Os jogos rodam no navegador, em uma **origem isolada** (sandbox), sem acesso à conta do jogador.
- **Publicar**: no NEXPLAY STUDIO, o botão **Publicar jogo** salva, testa o jogo automaticamente no motor isolado e, se passar, publica no Arcade (atualizar e retirar também pelo Studio). Builds HTML5/WebGL (.zip) enviados continuam passando por **verificação automática** e **moderação humana**.
- **Comunidade**: perfis personalizáveis, amigos, seguidores, mensagens privadas (com privacidade, bloqueio e denúncia), feed, rankings, votações, sugestões, eventos, Game Jams, competições, **NEXPLAY FESTIVAL** e **NEXPLAY AWARDS**.
- **MULTIPLAYER**: aba que mostra apenas jogos com multiplayer declarado; salas públicas, privadas com código, convites e relay em tempo real pelo **NEXPLAY SDK**.
- **LANÇAMENTOS**: projetos em desenvolvimento, previsões, devlogs, acesso antecipado e beta (aberto ou fechado).
- **NEXPLAY PICKS** + central de **CURADORIA**: Escolha da NEXPLAY, Jogo do Dia, Destaques da Semana e coleções.
- **NEXPLAY REWARDS**: NEX COINS (NC) com livro-razão, desafios medidos pelo servidor, loja de personalização, conversão em créditos internos (3.000 NC = R$ 3 · 5.000 NC = R$ 5 · 20.000 NC = R$ 10) com antifraude.
- **Planos FREE, PRO (4× a IA do FREE) e DELUXE (IA sem limite de comandos + AUTOPILOT + DELUXE LAB)**.
- **NEXPLAY STUDIO**: editor 2D/3D (modo fácil visual e modo avançado com código), motor 3D próprio sobre three.js com materiais PBR, céu físico, ciclo dia/noite, chuva/neve/raios, neblina, água, vegetação instanciada com vento, personagens humanoides animados, física, IA de NPCs, missões, diálogos, HUD e menus.
- **NEXPLAY AI**: sete especialidades (Programadora, 3D, Texturas, Animação, Gameplay, Diretora de Arte, Testadora) que **editam o projeto diretamente** por ferramentas, e o **AUTOPILOT** (planejamento → aprovação → etapas → testes → correção → histórico).
- **NEXPLAY FORGE**: linha de produção de assets que coordena Tripo AI, Meshy AI, Blender (headless), voxel compatível com MagicaVoxel, pixel art e Krita — inspeção, reparo, escala, aprimoramento, rigging e animações automáticas, LODs, colisão, integração no projeto e teste no motor do jogo, sempre no estilo visual definido para o projeto. Ver [docs/FORGE.md](docs/FORGE.md).
- **NEXPLAY CLOUD**: projetos na nuvem, histórico de versões, restauração, backup/importação e colaboradores.
- **Administração**: painel protegido no servidor com moderação, denúncias, usuários, curadoria, eventos/awards, rewards, concessão de PRO/DELUXE (7, 30, 90 dias ou permanente), planos, configurações e auditoria.

## Executar

Requisitos: **Node.js 22.13+** (usa o SQLite nativo `node:sqlite`).

```bash
npm install
cp .env.example .env        # opcional: configure IA, e-mail e pagamentos
npm run dev                 # API :3000 · sandbox de jogos :3001 · app :5173
```

Abra http://localhost:5173, crie uma conta e promova-a a administradora:

```bash
npm run seed:admin -- seu_usuario
```

Produção:

```bash
npm run build && npm start  # app + API em :3000, sandbox em :3001
```

Veja [docs/DEPLOY.md](docs/DEPLOY.md) para domínios, TLS, proxy e serviços externos.

### Testar rapidamente em uma única porta

```bash
npm run build
SINGLE_ORIGIN=1 NODE_ENV=production npm start   # tudo em http://localhost:3000
```

No modo `SINGLE_ORIGIN=1` os jogos são servidos pelo mesmo endereço, mas rodam em iframe de origem opaca (sem acesso à conta). Para o Blender na FORGE, defina também `NEXPLAY_BPY_PYTHON` (Python com `pip install bpy`) ou `BLENDER_PATH`.

## Testes

```bash
npm test
# com Blender real (opcional): FORGE_TEST_BPY=/caminho/para/python-com-bpy npm test
```

Testes de integração da API (banco em memória, IA simulada apenas nos testes): autenticação, CSRF, permissões administrativas, regra PRO = 4× FREE, publicação com verificação e sandbox com token, bloqueio de builds maliciosos (executáveis, mineradores, zip-slip), filtro do MULTIPLAYER, REWARDS (antifraude, loja, conversão, compra com créditos), concessão/revogação de planos, mensagens com amizade/bloqueio, modelos do Studio, NEXPLAY CLOUD (versões, conflito, restauração, colaboradores, backup), comandos de IA e cotas, publicação a partir do Studio e curadoria. `tests/arcade.test.js`: Arcade vazio, modelos nunca publicados, publicação com teste obrigatório, atualização, retirada, rankings com jogadores reais e moderação quando a publicação automática está desligada.

## Documentação

- [docs/STATUS.md](docs/STATUS.md) — o que está implementado, o que depende de configuração externa e o que falta.
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — arquitetura, segurança e modelo de dados.
- [docs/FORGE.md](docs/FORGE.md) — linha de produção de assets 2D/3D (ferramentas, estilos, licenças).
- [docs/STUDIO.md](docs/STUDIO.md) — formato de projeto, API de scripts e NEXPLAY AI.
- [docs/SDK.md](docs/SDK.md) — NEXPLAY SDK para jogos HTML5 (multiplayer, conquistas).
- [docs/DEPLOY.md](docs/DEPLOY.md) — publicação em produção.
