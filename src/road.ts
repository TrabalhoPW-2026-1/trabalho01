import { ROAD_SPEED, TAMX, TAMY } from "./config.js";

class Road {
  element: HTMLElement;
  private offsetY = 0;

  constructor() {
    this.element = document.getElementById("road")!;
    this.element.style.width = `${TAMX}px`;
    this.element.style.height = `${TAMY}px`;
    this.element.style.backgroundPosition = `calc(25% - 4px) 0px, calc(50% - 4px) 0px, calc(75% - 4px) 0px, 0px 0px`;
  }

  move() {
    this.offsetY = (this.offsetY + ROAD_SPEED) % 140;
    this.element.style.backgroundPosition =
      `calc(25% - 4px) ${this.offsetY}px, calc(50% - 4px) ${this.offsetY}px, calc(75% - 4px) ${this.offsetY}px, 0px 0px`;
  }
}

export const road = new Road();
