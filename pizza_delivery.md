# Pizza Delivery — Game Design

Entregador de pizza numa cidade. Pega pedidos e entrega no menor tempo possível. Quanto mais rápido, mais gorjeta.

---

## Conceito

Jogo de corrida/entrega top-down ou side-scrolling. O jogador controla um entregador de moto. Pedidos aparecem no mapa. Objetivo: pegar a pizza na pizzaria e entregar no endereço antes do tempo acabar.

**Loop central:** pega pedido → pega pizza → entrega → recebe gorjeta → próximo pedido.

---

## Entidades

| Entidade | Descrição |
| -------- | --------- |
| Entregador | Jogador na moto, controlado pelo teclado |
| Pizzaria | Ponto fixo ou aleatório, onde pega a pizza |
| Cliente | Ponto de entrega com timer visível |
| Pizza | Item carregado pelo entregador |
| Carro/Pedestre | Obstáculo que causa acidente |
| Semáforo | Obstáculo temporizado (opcional) |
| PowerUp | Turbo, mapa, proteção |

---

## Componentes

* Posição
* Colisão física (hitbox)
* Movimento (velocidade, direção)
* Timer (tempo restante de entrega)
* Inventário (está carregando pizza ou não)
* Pontuação (gorjeta acumulada)

---

## Sistemas

* **Sistema de controle** — WASD/setas movem a moto
* **Sistema de movimento** — aplica velocidade, fricção leve
* **Sistema de colisão** — bate em carro → perde pizza/vida
* **Sistema de pedidos** — gera novos clientes periodicamente
* **Sistema de entrega** — detecta colisão com cliente enquanto carrega pizza
* **Sistema de timer** — gorjeta diminui com o tempo; zero = entrega sem gorjeta
* **Sistema de spawn** — carros e pedestres em rotas previsíveis ou aleatórias
* **Sistema de UI** — HUD com gorjeta atual, timer, pizza no inventário

---

## Pontuação

* Entrega rápida → gorjeta máxima (ex: 100 pts)
* Cada segundo extra → -5 pts de gorjeta (mínimo 10 pts)
* Acidente → perde pizza, volta pra pizzaria, timer reseta
* High score salvo em localStorage

---

## Progressão / Dificuldade

| Fase | Mudança |
| ---- | ------- |
| 1 | 1 pedido por vez, poucos carros |
| 2 | 2 pedidos simultâneos, trânsito médio |
| 3+ | Timer mais curto, mais obstáculos, semáforos |

---

## Visual

* Top-down (visão de cima) — mais fácil de fazer, sem perspectiva
* Cidade simples: grade de ruas, prédios como blocos coloridos
* Sprites: entregador, moto, caixinha de pizza, emoji de cliente

---

## Tecnologia

* Mesma stack do projeto atual: TypeScript + HTML Canvas ou DOM
* ECS igual ao jogo espacial: entidades, componentes, sistemas
* localStorage para high score e talvez nível desbloqueado

---

## Diferencial

O timer de gorjeta cria tensão constante sem game over imediato. Bater em carro não mata — só atrasa. O jogador sempre pode tentar recuperar. Isso torna o jogo mais casual e rejogável.
