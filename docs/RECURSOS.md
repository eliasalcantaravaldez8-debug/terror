# Recursos externos necessários (arte, animação, áudio)

Tudo abaixo existe hoje como **recurso provisório gerado por código**. A tabela
mostra o que deve substituí-lo para qualidade comercial. Nenhum recurso de
outros jogos foi usado; armas, emblemas e veículos são fictícios.

| Categoria | Provisório atual | Substituto definitivo recomendado | Onde trocar |
|---|---|---|---|
| Soldados (aliados, Vértice, pilotos) | Primitivas + IK procedural | Modelos glTF riggeados (≈30–60k tris), LODs, uniformes/equipamentos PBR | `characters/SoldierModel.js` |
| Animações | Procedurais (passo, agachar, mira, queda) | Mocap: locomoção 8 direções, cobertura, recarga, mortes, sentado, desembarque | `characters/SoldierModel.js` |
| Braços + armas em 1ª pessoa | Primitivas | Braços e armas fictícias modelados (≈20k tris), animações de tiro/recarga | `player/WeaponController.js`, `weapons/WeaponModels.js` |
| Helicóptero | Primitivas | Modelo de helicóptero de transporte original, interior detalhado | `world/Helicopter.js` |
| Prédios | Caixas + texturas procedurais + peitoris/varandas | Kit modular (fachadas, janelas com profundidade, interiores visíveis) | `world/CityBuilder.js` |
| Veículos / props | Extrusões procedurais | Carros, barreiras, entulho escaneados ou modelados | `world/PropModels.js` |
| Texturas | Canvas procedural (albedo/normal/rugosidade) | PBR 2K–4K (asfalto molhado, concreto, tijolo, tecido) | `render/TextureFactory.js` |
| Sons de armas, explosões, helicóptero | Síntese Web Audio | Gravações profissionais com camadas (perto/longe/cauda) | `audio/AudioEngine.js` |
| Vozes | Síntese de voz do navegador | Dublagem profissional PT-BR (e EN) | `ui/Dialogue.js` |
| Música | Drone adaptativo sintetizado | Trilha orquestral/eletrônica adaptativa | `audio/AudioEngine.js` |
