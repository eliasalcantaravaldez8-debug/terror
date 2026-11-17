# Entre Sombras — Beta 0.1 (texto pronto para a página do jogo)

## Arquivo para enviar
- **`EntreSombras-Beta-0.1-web.zip`**: versão para jogar no navegador (itch.io, Game Jolt, Newgrounds etc.). O `index.html` está na raiz do ZIP, como esses sites exigem.
- `EntreSombras.zip`: pacote completo (jogo + código-fonte), para quem quiser baixar.

## Como publicar no itch.io (gratuito)
1. Entre em itch.io → **Upload new project**.
2. **Kind of project**: `HTML`.
3. Envie `EntreSombras-Beta-0.1-web.zip` e marque **"This file will be played in the browser"**.
4. **Viewport**: 1280 × 720, marque **"Fullscreen button"** e **"Click to launch in fullscreen"** (recomendado).
5. Em **Release status**, escolha **In development**. Em **Pricing**, escolha grátis ou "pague quanto quiser".
6. Cole a descrição abaixo, adicione capturas de tela e salve como **Public**, ou como **Draft** se quiser testar primeiro.

---

## Descrição (copiar e colar)

**ENTRE SOMBRAS — Beta 0.1**

Depois de sete anos preso, Ethan Cross sai da penitenciária de Los Valles com uma única pergunta: quem traiu o grupo? Ao lado de Ryan, ele segue os nomes de um livro e descobre que o passado está mais perto do que imaginava.

Jogo de mundo aberto em terceira pessoa que roda **direto no navegador**, sem instalar nada.

**O que já tem nesta beta**
- Campanha de Ethan com 10 missões de história e o início da campanha de Ryan, além de missões secundárias
- Três cidades: Los Valles, Blackwood e Westhaven, com uma ponte gigante entre elas
- Carros e motos dirigíveis, roubo de carros, oficina de customização e polícia com estrelas de procurado
- Lojas, comida, roupas, barbearia, banco que dá para assaltar e casas e prédios com interior
- Estádio com partidas de futebol simuladas, praça com basquete jogável, aeroporto com avião pilotável e prisão
- Ciclo de dia e noite, chuva, cachorros e gatos, eventos aleatórios e corridas de rua

**Controles**
- `W A S D` mover · `Shift` correr · `Espaço` pular / freio de mão
- `Mouse` câmera · `Roda` distância da câmera · `E` interagir / entrar no carro
- `F` golpear · `C` agachar · `T` celular (mapa, códigos) · `N` avançar o horário
- `Esc` opções, salvar e carregar · `H` ajuda

**Requisitos**
- Chrome, Edge ou Firefox atualizados, num computador com teclado e mouse (não funciona em celular)
- Pensado para PCs fracos. Em **Esc → Qualidade gráfica** dá para escolher entre baixa e Ultra.
- O progresso fica salvo no navegador. Limpar os dados do site apaga o save.

**Esta é uma versão de teste**
Pode ter bugs. Conta o que você encontrou nos comentários: em qual missão foi, o que estava fazendo e, se possível, uma captura de tela.

**Problemas conhecidos**
- Os personagens ainda não têm vozes: os diálogos são só legendas por enquanto.
- O primeiro carregamento gera as cidades e pode levar alguns segundos.
- Em PCs mais fracos, a chuva pode deixar o jogo mais lento. Use o código `SOL` no celular para o tempo abrir.

---

## O que foi verificado antes desta beta (e o que não foi)
- O ZIP web foi aberto **por um servidor web**, como num site de jogos. O jogo carregou, o "Novo jogo" funcionou, o prólogo avançou com teclado e mouse e não apareceu nenhum erro no navegador.
- Os testes automáticos de missões, lojas, veículos, banco, prisão, avião, estádio, praça, salvar e carregar passaram.
- **Ainda não foi testado num PC de verdade com placa de vídeo.** Os testes rodaram num navegador sem tela que desenha por software, então o FPS medido lá (cerca de 3) não vale para um PC normal. Antes de divulgar, jogue um pouco no seu computador.
- **Não foi testado em celular** (o jogo precisa de teclado e mouse).
