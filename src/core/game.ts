import { FPS } from "../config.js"
import { World } from "./world.js"
import { Player } from "../entities/player.js"
import { System } from "./system.js"
import { InputSystem } from "../systems/input.js"
import { SpawnSystem } from "../systems/spawn.js"
import { MovementSystem } from "../systems/movement.js"
import { space } from "../space.js"
import { ColisionSystem } from "../systems/colision.js"
import { VisualAttachmentSystem } from "../systems/visualAttachment.js"
import { UISystem } from "../systems/ui.js";
import { InvincibilitySystem } from "../systems/invincibility.js"


export class Game {
  private world: World = new World();
  private intervalo: number | undefined;

  private systems: System[] = [
    new InputSystem(),
    new SpawnSystem(),
    new MovementSystem(),
    new VisualAttachmentSystem(),
    new ColisionSystem(),
    new UISystem(),
    new InvincibilitySystem()
  ];

  constructor() {
    // Inicializa o estado do jogo, criando o jogador e adicionando à lista de entidades
    const player = new Player();
    this.world.entities.push(player);

    this.world.onGameOver = () => this.stop();
  }

  /**
   * Inicia o ciclo de vida do jogo
   */
  start() {
    this.intervalo = setInterval(() => { this.update(); }, 500 / FPS);

    window.addEventListener("keydown", (e) => {
      this.world.keyboard[e.key] = true;
    });

    window.addEventListener("keyup", (e) => {
      this.world.keyboard[e.key] = false;
    });
  }

  stop(): void {
    if (this.intervalo) {
      clearInterval(this.intervalo);
      this.intervalo = undefined;
      setTimeout(() => {
        alert("Game Over! Sua pontuação final foi: " + this.world.score);
        window.location.reload();
      }, 300)
    }
  }

  /**
   * Executa um ciclo de atualização do jogo, chamando o método update de cada sistema
   */
  update() {
    for (const system of this.systems) {
      system.update(this.world);
    }
    space.move();
  }
}