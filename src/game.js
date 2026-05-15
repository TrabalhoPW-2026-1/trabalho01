import { FPS } from "./config.js"
import { space } from "./space.js"
import { ship } from "./ship.js"
import { createRandomEnemyShip, moveEnemyShips } from "./enemyShip.js"

function init() {
  setInterval(run, 1000 / FPS)
}

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") ship.changeDirection(-1)
  if (e.key === "ArrowRight") ship.changeDirection(+1)
})

function run() {
  space.move()
  ship.move()
  createRandomEnemyShip()
  moveEnemyShips()
}

init()