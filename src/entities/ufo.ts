import { HasCollision } from "../components/HasCollision.js";
import { Entity, EntityType } from "../core/entity.js";
import { TAMX, TAMY, OBSTACLES_PNG_PATH } from "../config.js";
import { road } from "../road.js";

export class Ufo implements Entity, HasCollision {
  element: HTMLImageElement;
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  size: { width: number; height: number };
  hitbox: { width: number; height: number };
  type: EntityType = "ufo";

  constructor() {
    this.element = document.createElement("img");
    this.element.src = `${OBSTACLES_PNG_PATH}/ufo.png`;
    this.element.style.position = "absolute";
    this.element.draggable = false;

    const fromLeft = Math.random() < 0.5;
    const startX = fromLeft ? -50 : TAMX + 10;
    const startY = Math.random() * (TAMY * 0.5);
    const xSpeed = 2 + Math.random() * 1.5;
    const ySpeed = 2 + Math.random() * 1.5;

    this.position = { x: startX, y: startY };
    this.velocity = { x: fromLeft ? xSpeed : -xSpeed, y: ySpeed };
    this.size = { width: 80, height: 50 };
    this.hitbox = { width: 80, height: 50 };

    this.element.style.width = `${this.size.width}px`;
    this.element.style.height = `${this.size.height}px`;
    this.element.style.left = `${this.position.x}px`;
    this.element.style.top = `${this.position.y}px`;

    road.element.appendChild(this.element);
  }
}
