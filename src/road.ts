import { TAMX, TAMY } from "./config.js";

class Road {
  element: HTMLElement;
  private offsetY = 0;

  constructor() {
    this.element = document.getElementById("road")!;
    this.element.style.width = `${TAMX}px`;
    this.element.style.height = `${TAMY}px`;
    this.element.style.backgroundPosition = `calc(50% - 4px) 0px, 0px 0px`;
  }

  move() {
    this.offsetY = (this.offsetY + 2) % 140;
    this.element.style.backgroundPosition =
      `calc(50% - 4px) ${this.offsetY}px, 0px 0px`;
  }
}

export const road = new Road();
