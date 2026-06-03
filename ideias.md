# Ideias

* entregador de pizza na rua que ganha pontos entregando pizzas → [pizza_delivery.md](pizza_delivery.md)
* pinguim na pororoca

## Organização

## Entidades

implementa as interfaces de componentes e guardam seu estado atual

* ✅ Obstáculo (meteoro)
* ✅ Obstáculo 2 (UFO diagonal)
* ✅ Player
* ✅ PowerUp (escudo)
* ✅ LifeUp (vida extra)
* ✅ Moedinha

## Componentes

sao intefaces com métodos que as entidades implementam

* ✅ Movimento
* ✅ Colisão de Interação
* ✅ Colisão Física -> hitbox
* ✅ Posição
* ✅ Health (world.lives)
* ✅ PowerUps (world.shields, acumula até 3)
* ✅ Pontuação (world.score)
* ✅ Invencibilidade

## Sistemas

sistemas controlam entidades que possum um certo conjunto de componentes

* ✅ Sistema de controle do player (←→↑↓, wraparound horizontal, clamp vertical)
* ✅ Sistema de mover os obstaculos
* ✅ Sistema de colisao
* ✅ Sistema de criacao dos obstaculos
* ✅ Sistema de power up (escudo acumulável, vida extra)
* ✅ Sistema de invencibilidade (pisca, timer)
* ✅ Sistema de UI (HUD: vidas, escudos, pontuação)

## Sistema Geral

* ✅ ele chama os sistemas dado certos eventos (loop 100 FPS)
* ✅ ter a funcao de loop (run)
* ✅ tem o menu, configura botoes de pausa e continuar (Esc = pause/resume)
* ✅ salva no local storage a pontuação (high score)
* ✅ estados do jogo: moedas coletadas, vidas, escudos

## Sistema de Spawn

* ✅ Spawn de Fileira de Moedas (2–4 por evento, x aleatório)
* ✅ Spawn de obstáculos (meteoro com anti-cluster)
* ✅ Spawn de UFO (entra diagonal da esquerda ou direita)
* ✅ Spawn de PowerUp (escudo, só spawna se shields < 3)
* ✅ Spawn de LifeUp (coração, baixa probabilidade)

## Requisitos Adicionais

* Além dos requisitos acima, o jogo deve implementar pelo menos 4 funcionalidades adicionais:
* ✅ Diferentes tipos de inimigos ou obstáculos com comportamentos distintos.
  * meteoro (cai reto)
  * UFO (entra diagonal, velocidade aleatória)
* ✅ Power-ups (vida extra, habilidades, etc.).
  * escudo acumulável (máx 3)
  * vida extra (coração)
* Efeitos sonoros. (imagino que não dê)
* ✅ Uso de localStorage para armazenar dados do jogo, com a pontuação.
* ✅ Menu inicial + pausa (Esc).
