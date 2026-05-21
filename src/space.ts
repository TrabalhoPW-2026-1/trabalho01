import { TAMX, TAMY } from "./config.js"

class Space {
  element: HTMLElement 

  constructor() {
    this.element = document.getElementById("space")!
    this.element.style.width = `100%`
    this.element.style.height = `100%`
    this.element.style.backgroundPositionY = "0px"
  }
  move() {
    this.element.style.backgroundPositionY = `${parseInt(this.element.style.backgroundPositionY) + 1}px`
  }
}

export const space = new Space()