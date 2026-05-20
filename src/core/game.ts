import { FPS } from "../config.js"
import { space } from "../space.js"
import { ship } from "../ship.js"
import { createRandomEnemyShip, moveEnemyShips } from "../enemyShip.js"

import { World } from "./world.js"
import { System } from "./system.js"
import { SpawnSystem } from "../systems/spawn.js"
import { MovementSystem } from "../systems/movement.js"

let ecsGame: Game

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") ship.changeDirection(-1)
  if (e.key === "ArrowRight") ship.changeDirection(+1)
})

function run() {
  space.move()
  ship.move()
  // createRandomEnemyShip()
  // moveEnemyShips()
  ecsGame.update()
}

export function init() {
  ecsGame = new Game()
  setInterval(run, 1000 / FPS)
}

export class Game {
  private world: World = new World();

  private systems: System[] = [
    new SpawnSystem(),
    new MovementSystem()
  ];

  /**
   * Inicia o ciclo de vida do jogo
   */
  start() {
    setInterval(() => { this.update(); }, 1000 / FPS);
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