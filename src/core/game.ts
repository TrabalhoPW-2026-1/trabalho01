import { FPS } from "../config.js"
import { World } from "./world.js"
import { Player } from "../entities/player.js"
import { System } from "./system.js"
import { InputSystem } from "../systems/input.js"
import { SpawnSystem } from "../systems/spawn.js"
import { MovementSystem } from "../systems/movement.js"


export class Game {
  private world: World = new World();

  private systems: System[] = [
    new InputSystem(),
    new SpawnSystem(),
    new MovementSystem()
  ];

  constructor() {
    // Inicializa o estado do jogo, criando o jogador e adicionando à lista de entidades
    const player = new Player();
    this.world.entities.push(player);
  }

  /**
   * Inicia o ciclo de vida do jogo
   */
  start() {
    setInterval(() => { this.update(); }, 1000 / FPS);

    window.addEventListener("keydown", (e) => {
      this.world.keyboard[e.key] = true;
    });

    window.addEventListener("keyup", (e) => {
      this.world.keyboard[e.key] = false;
    });
  }

  /**
   * Executa um ciclo de atualização do jogo, chamando o método update de cada sistema
   */
  update() {
    for (const system of this.systems) {
      system.update(this.world);
    }
  }
}