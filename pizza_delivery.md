# Pizza Delivery — Game Design

Entregador de moto numa rua que rola pra baixo. Pega pizzas e entrega pra clientes antes do timer zerar.

---

## Conceito

Vertical scroller igual ao space shooter. Rua desce (igual fundo espacial). Moto fica na base, move esquerda/direita. Itens caem de cima — pizza pra pegar, carros pra desviar.

**Loop central:** pizza cai → pega colisão → entrega no cliente no fundo → gorjeta → próximo pedido.

---

## Mapeamento com o Space Shooter

| Space Shooter | Pizza Delivery |
| ------------- | -------------- |
| Fundo espacial rolando | Asfalto/rua rolando |
| Nave | Moto (entregador) |
| Asteroide / obstáculo | Carro / pedestre caindo |
| UFO (comportamento errático) | Bicicleta / patinete |
| Moeda coletável | Caixa de pizza caindo |
| PowerUp (shield) | Turbo (boost de velocidade) |
| LifeUp | Capacete (vida extra) |
| Colisão com obstáculo → perde vida | Acidente → perde pizza + invencibilidade |
| HUD: vidas, moedas, shields | HUD: vidas, gorjeta atual, pizza no inv, timer |

---

## Entidades

| Entidade | Tipo | Comportamento |
| -------- | ---- | ------------- |
| Moto | Player | Move left/right, wraparound horizontal |
| Carro | Obstacle | Cai de cima, velocidade variável |
| Bicicleta | UFO-like | Zigue-zague horizontal enquanto desce |
| Pizza | Coin-like | Cai de cima, jogador coleta por colisão |
| Cliente | Fixo no bottom | Aparece no fundo, aguarda entrega |
| Turbo | PowerUp-like | Cai de cima, aumenta velocidade temporariamente |
| Capacete | LifeUp-like | Cai de cima, +1 vida |

---

## Componentes

Mesmos do space shooter:

* Posição / Velocidade
* Colisão (hitbox)
* Invencibilidade (após acidente)
* Inventário (booleano: carregando pizza?)
* Timer de entrega (gorjeta diminui por tick)
* VisualAttachments (pizza visível na moto quando carregando)

---

## Sistemas

| Sistema | Igual ao SS? | Mudança |
| ------- | ------------ | ------- |
| MovementSystem | ✅ igual | Nenhuma |
| InputSystem | ✅ igual | Nenhuma |
| SpawnSystem | ✅ estrutura igual | Spawna carros, bicicletas, pizzas, clientes |
| CollisionSystem | ⚠️ modificado | Novo caso: pizza coletada / entrega ao cliente |
| InvincibilitySystem | ✅ igual | Nenhuma |
| VisualAttachmentSystem | ✅ igual | Nenhuma |
| UISystem / HUD | ⚠️ modificado | Timer de gorjeta, inventário |
| DeliverySystem | 🆕 novo | Detecta colisão moto+cliente quando carregando pizza, calcula gorjeta |

---

## Fluxo de Entrega

1. Pizza cai do topo (como moeda)
2. Moto coleta (colisão) → `inventario = true`, VisualAttachment aparece
3. Cliente spawna no fundo (posição Y fixa perto do bottom)
4. Timer de gorjeta começa a cair por tick
5. Moto colide com cliente enquanto `inventario = true` → entrega, gorjeta somada
6. `inventario = false`, cliente desaparece, nova pizza pode spawnar

---

## Pontuação

* Entrega dentro do timer → gorjeta máxima (100 pts)
* Cada tick extra → -5 pts (mínimo 10 pts)
* Acidente (carro/bicicleta) → perde pizza se estiver carregando, invencibilidade
* High score em localStorage

---

## Progressão / Dificuldade

| Fase | Mudança |
| ---- | ------- |
| 1 | 1 cliente por vez, poucos carros |
| 2 | 2 clientes simultâneos, velocidade dos carros sobe |
| 3+ | Timer mais curto, bicicletas, carros em fila |

---

## Visual

* Fundo: asfalto/rua com faixas brancas rolando (igual às estrelas)
* Sprites: moto (3 direções: esq/centro/dir igual à nave), carro, pizza box, cliente emoji
* Rua tem bordas (calçada) mas moto faz wraparound igual à nave

---

## Tecnologia

* TypeScript + HTML DOM — igual ao space shooter
* ECS idêntico: mesmo `Entity`, `Component`, `System`, `World`
* `space.ts` vira `road.ts` (fundo rolando)
* Reusar: `MovementSystem`, `InputSystem`, `InvincibilitySystem`, `VisualAttachmentSystem`
* Modificar: `CollisionSystem`, `SpawnSystem`, `HUD`
* Criar: `DeliverySystem`, entidades novas

---

## Diferencial

Mesmo loop do space shooter mas com tensão de entrega. Coletar pizza sem desviar de carro = risco calculado. Entregar rápido = recompensa. Bater não mata, só atrasa — casual e rejogável.
