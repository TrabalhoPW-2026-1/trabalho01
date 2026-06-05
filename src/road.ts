  import { ROAD_SPEED, TAMX, TAMY } from "./config.js";

  class Road {
    element: HTMLElement;
    private offsetY = 0;

    constructor() {
      this.element = document.getElementById("road")!;
      this.element.style.width = `${TAMX}px`;
      this.element.style.height = `${TAMY}px`;
      this.element.style.backgroundPosition = "0px 0px";
    }

    move() {
      this.offsetY = (this.offsetY + ROAD_SPEED) % 132;
      this.element.style.backgroundPosition = `0px ${this.offsetY}px`;
    }
  }

  export const road = new Road();
