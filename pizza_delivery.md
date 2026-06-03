# Pizza Delivery — Game Design

Entregador de moto numa rua que rola pra baixo. Pega pizzas e entrega pra clientes antes do timer zerar.

---

## Conceito

Vertical scroller igual ao space shooter. Rua desce (igual fundo espacial). Moto fica na base, move entre **3 faixas fixas**. Obstáculos caem de cima com aviso de alerta — jogador precisa trocar de faixa a tempo.

**Loop central:** pizza cai → pega colisão → entrega no acostamento → gorjeta → próximo pedido.

---

## Sistema de Faixas

* Rua tem **3 faixas** (esquerda, centro, direita)
* Player alterna faixas com **seta ← →** — sem movimento livre
* Ao trocar: animação de **drift lateral** (interpolação rápida, ~150ms, leve inclinação da moto)
* Player **não pode trocar faixa** enquanto a animação anterior não terminou

---

## Obstáculos e Quick Time Event

* Obstáculos surgem fora da tela no topo e descem na faixa deles
* Ao entrar na tela: **ícone `!`** aparece acima do obstáculo por ~0.5s (alerta de faixa)
* Janela de reação: jogador troca de faixa antes da colisão
* **Colisão = game over** (sem vidas extras, sem invencibilidade)

---

## Entregas nos Acostamentos

* Clientes aparecem nos **acostamentos** (bordas laterais da tela, fora das 3 faixas)
* Para entregar: chegar na faixa **mais próxima do acostamento** (faixa esquerda ou direita) com pizza no inventário
* Colisão com cliente no acostamento enquanto `inventario = true` → entrega realizada

---

## Timer e Progressão

* **Timer de entrega** começa em valor máximo ao coletar pizza
* Timer diminui **linearmente** a cada tick
* Taxa de decrescimento aumenta conforme **progressão logarítmica da pontuação**:
  * `taxa = base_rate * (1 + log(pontuacao + 1) * fator)`
  * Início: fácil (timer cai devagar); pontuação alta: timer cai bem mais rápido
* Timer chega a zero → entrega falha, pizza sumida, próxima pizza spawna

---

## Mapeamento com o Space Shooter

| Space Shooter | Pizza Delivery |
| ------------- | -------------- |
| Fundo espacial rolando | Asfalto/rua com 3 faixas rolando |
| Nave | Moto (entregador) — 3 posições fixas |
| Asteroide / obstáculo | Carro — cai em faixa específica, com ! de alerta |
| UFO (comportamento errático) | Bicicleta — troca de faixa enquanto desce |
| Moeda coletável | Caixa de pizza caindo |
| PowerUp (shield) | Turbo (congela timer temporariamente) |
| LifeUp | Removido — colisão é fatal |
| Colisão → perde vida | Colisão → game over |
| HUD: vidas, moedas, shields | HUD: pontuação, timer de gorjeta, inventário |

---

## Entidades

| Entidade | Tipo | Comportamento |
| -------- | ---- | ------------- |
| Moto | Player | Alterna entre 3 faixas, drift na troca |
| Carro | Obstacle | Cai numa faixa, exibe ! de alerta, colisão = game over |
| Bicicleta | UFO-like | Desce trocando de faixa, ! em cada faixa que ocupa |
| Pizza | Coin-like | Cai numa faixa, jogador coleta por colisão |
| Cliente | Fixo no acostamento | Aparece na borda esq ou dir, aguarda entrega |
| Turbo | PowerUp-like | Cai numa faixa, congela timer de entrega temporariamente |

---

## Componentes

* Posição de faixa (`lane: 0 | 1 | 2`)
* Velocidade de drift (animação de troca)
* Estado da troca (`switching: boolean`, bloqueia input durante drift)
* Inventário (`carregando: boolean`)
* Timer de entrega (valor atual + taxa calculada por log da pontuação)
* VisualAttachments (pizza visível na moto quando carregando)
* AlertTimer (! acima do obstáculo antes de entrar na faixa)

---

## Sistemas

| Sistema | Igual ao SS? | Mudança |
| ------- | ------------ | ------- |
| MovementSystem | ⚠️ modificado | Snap para faixa, drift animation |
| InputSystem | ⚠️ modificado | Só ← →, bloqueado durante switch |
| SpawnSystem | ✅ estrutura igual | Spawna em faixas aleatórias; clientes nos acostamentos |
| AlertSystem | 🆕 novo | Exibe ! acima do obstáculo por ~0.5s ao entrar na tela |
| CollisionSystem | ⚠️ modificado | Colisão fatal; entrega no acostamento |
| DeliverySystem | 🆕 novo | Detecta moto+cliente (acostamento), calcula gorjeta, reseta inventário |
| TimerSystem | 🆕 novo | Decrementa timer com taxa logarítmica da pontuação |
| UISystem / HUD | ⚠️ modificado | Timer de gorjeta, inventário, pontuação |

---

## Fluxo de Entrega

1. Pizza cai numa faixa (como moeda)
2. Moto coleta (colisão de faixa) → `inventario = true`, VisualAttachment aparece
3. Cliente spawna num acostamento (esq ou dir)
4. Timer começa a cair com taxa = `base * (1 + log(score+1) * fator)`
5. Moto vai pra faixa da borda do acostamento do cliente
6. Colisão com cliente enquanto `inventario = true` → entrega, gorjeta somada
7. `inventario = false`, cliente desaparece, nova pizza spawna

---

## Pontuação

* Entrega com timer alto → gorjeta máxima (100 pts)
* Cada tick de timer perdido → -5 pts (mínimo 10 pts)
* Timer zerado → entrega falha, 0 pts, pizza sumida
* Colisão com obstáculo → game over
* High score em localStorage

---

## Progressão / Dificuldade

| Fase | Mudança |
| ---- | ------- |
| 1 | 1 cliente por vez, carros lentos, taxa do timer baixa |
| 2 | 2 clientes simultâneos, carros mais rápidos, taxa sobe |
| 3+ | Bicicletas (trocam de faixa), taxa do timer bem mais alta |

Taxa do timer: `taxa = 0.5 * (1 + log(pontuacao + 1) * 0.1)` — dobra por volta de ~22.000 pts.

---

## Visual

* Fundo: asfalto com 3 faixas delimitadas e acostamentos nas bordas
* Faixas brancas tracejadas rolando (igual às estrelas)
* Moto: 3 sprites (esq/centro/dir) + frame inclinado durante drift
* Obstáculos: carro, bicicleta
* ! de alerta: ícone vermelho piscante acima do obstáculo (~0.5s)
* Cliente: emoji/sprite no acostamento

---

## Tecnologia

* TypeScript + HTML DOM — igual ao space shooter
* ECS idêntico: mesmo `Entity`, `Component`, `System`, `World`
* `space.ts` vira `road.ts` (fundo rolando com faixas)
* Reusar: `InvincibilitySystem` removido; `VisualAttachmentSystem` igual
* Modificar: `CollisionSystem`, `SpawnSystem`, `MovementSystem`, `InputSystem`, `HUD`
* Criar: `AlertSystem`, `DeliverySystem`, `TimerSystem`

---

## Diferencial

Sem movimento livre — só 3 faixas. Tensão vem do QTE: ver o ! e trocar de faixa rápido. Timer que acelera com o score força decisões risco/recompensa (pegar pizza agora ou desviar do carro?). Game over em colisão torna cada manobra séria.
