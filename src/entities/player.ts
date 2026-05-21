import { TAMX } from "../config.js";
import { Entity, EntityType } from "../core/entity.js";
import { space } from "../space.js";

const directions = [
  "assets/png/playerLeft.png",
  "assets/png/player.png",
  "assets/png/playerRight.png",
];

export class Player implements Entity {

  element: HTMLImageElement;

  position = {
    x: TAMX / 2 - 50,
    y: 700
  };

  velocity = {
    x: 0,
    y: 0
  };

  size = {
    width: 100,
    height: 80
  }

  type: EntityType = 'player';

  direction = 1;

  constructor() {
    this.element = document.createElement("img");

    this.element.id = "ship";
    this.element.src = directions[this.direction];
    this.element.style.width = `${this.size.width}px`;
    this.element.style.height = `${this.size.height}px`;

    this.syncElement();

    space.element.appendChild(this.element);
  }

  syncElement() {
    this.element.style.left = `${this.position.x}px`;
    this.element.style.top = `${this.position.y}px`;
  }

  setDirection(direction: number) {
    this.direction = direction;
    this.element.src = directions[this.direction];
  }
}