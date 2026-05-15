import { TAMX, PROB_ENEMY_SHIP } from "./config.js"
import { space } from "./space.js"

class EnemyShip {
  constructor() {
    this.element = document.createElement("img")
    this.element.className = "enemy-ship"
    this.element.src = "assets/png/enemyShip.png"
    this.element.style.top = "-20px"
    this.element.style.left = `${parseInt(Math.random() * TAMX)}px`
    space.element.appendChild(this.element)
  }
  move() {
    this.element.style.top = `${parseInt(this.element.style.top) + 1}px`

  }
}

const enemyShips = []

export const createRandomEnemyShip = () => {
  if (Math.random() < PROB_ENEMY_SHIP) enemyShips.push(new EnemyShip())
}

export const moveEnemyShips = () => {
  enemyShips.forEach(e => e.move())
}