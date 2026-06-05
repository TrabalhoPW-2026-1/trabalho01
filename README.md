# Pizza delivery

## Membros

- André Okimoto
- Eduardo Cordeiro
- Nicolas Mady
- Samuel Davi

## Descrição

Este é um jogo *endless runner like* (ou corrida infinita), baseado no código inicial do Prof. Davi Fernandes. O jogo é uma corrida de entrega de pizza com vista de cima, onde você controla um entregador de moto. O objetivo é alcançar a maior quantidade de pontos possíveis até o a quantidade de vidas acabar.

O objetivo é:
- Pegar uma caixa de pizza
- Evitar carros (e possíveis aparições extraterrestres...) na estrada
- Entregar para um cliente antes que ele perca a paciência

Os clientes só aparecem enquanto você carrega a pizza. Se o cliente esperar demais, ele some e você perde a entrega. Há também itens especiais como turbo (movimentação mais rápida) e capacete (escudo para proteção do player) para ajudar.

Mecânicas principais
- Movimento do jogador na pista (4 setas)
- Obstáculos que aparecem dinamicamente
- Powerups (turbo e capacete)
- Temporizador de gorjeta / espera do cliente
- Três níveis de dificuldade (fácil, médio, difícil)

## Instruções para execução

**Passo 1 — instalar dependências**

No terminal, dentro da pasta do projeto:

```bash
npm install
```

**Passo 2 — compilar o jogo**


```bash
npm run build
```

**Passo 3 — abrir o jogo**

O package.json tem um script de servidor:

```bash
npm run start
```

**Alternativa para desenvolvimento**

Se alguém quiser rodar e ver mudanças em tempo real:

```bash
npm run dev
```

## Divisão de responsabilidades dos membros

A divisão em equipe não foi muito clara (como por exemplo um desenvolvedor de frontend, backend, tester, etc...), e foi mais baseado em pegar tasks existentes ao longo do projeto para implementação. A medida que íamos discutindo as possíveis tarefas a serem feitas, colocávamos num docs e deixávamos cada um livres para pegar uma task e executá-la. Ficamos atentos a quantidade de *features* que cada um pegou para manter o equilíbrio de trabalho entre os 4 membros.

---

## Checklist de Requisitos técnicos obrigatórios

[X] Utilizar apenas HTML, CSS e JavaScript com manipulação do DOM.
- Utilizamos TypeScript no lugar de JavaScript, como permitido pelo professor.

[X] Possuir diferentes estados (ex: início, jogando, pausa, fim de jogo).

[X] Permitir interação do usuário (ex: teclado ou mouse).

[X] Implementar movimentação de elementos na tela.

[X] Possuir detecção de colisões ou interações entre elementos.

[X] Implementar sistema de vidas e pontuação.

[X] Criar e remover elementos dinamicamente da árvore DOM.

[X] Apresentar aumento de dificuldade ao longo do tempo ou por fases.

[X] Ser organizado em múltiplos arquivos JS (modularização).
- Baseamos nosso projeto no estilo arquitetural ECS (Entidade, Componentes, Sistemas).
- Entidades: representam os elementos concretos do jogo.
- Componentes: definem quais dados ou capacidades uma entidade possui.
- Sistemas: responsáveis pela lógica do jogo.

## Requisitos opcionais (no mínimo 4)

[X] Diferentes tipos de inimigos ou obstáculos com comportamentos distintos.

[X] Power-ups (capacete e turbo).

[X] Efeitos sonoros.

[X] Uso de localStorage para armazenar dados do jogo, com a pontuação.

[X] Menu inicial e seleção de dificuldade.
