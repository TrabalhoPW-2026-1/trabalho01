import { TAMX, TAMY } from "./config.js";

// Lane dividers sit at 36.67% and 63.33% of road width
// (shoulder 10% + lane 26.67% each side)
const DIV1 = "36.67%";
const DIV2 = "63.33%";

class Road {
  element: HTMLElement;
  private offsetY = 0;

  constructor() {
    this.element = document.getElementById("road")!;
    this.element.style.width = `${TAMX}px`;
    this.element.style.height = `${TAMY}px`;
    this.element.style.backgroundPosition =
      `calc(${DIV1} - 2px) 0px, calc(${DIV2} - 2px) 0px, 0 0`;
  }

  move() {
    this.offsetY = (this.offsetY + 2) % 100;
    this.element.style.backgroundPosition =
      `calc(${DIV1} - 2px) ${this.offsetY}px, calc(${DIV2} - 2px) ${this.offsetY}px, 0 0`;
  }
}

export const road = new Road();
