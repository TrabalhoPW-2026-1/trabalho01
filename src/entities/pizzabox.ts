import { HasCollision } from "../components/HasCollision.js";
import { Entity, EntityType } from "../core/entity.js";
import { TAMX } from "../config.js";
import { road } from "../road.js";

export class PizzaBox implements Entity, HasCollision {
  element: HTMLImageElement;
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  size: { width: number; height: number };
  hitbox: { width: number; height: number };
  type: EntityType = "pizzabox";

  constructor() {
    this.element = document.createElement("img");
    this.element.src = "assets/svg/pizza.svg";
    this.element.style.position = "absolute";
    this.element.draggable = false;

    const margin = TAMX * 0.15;
    const x = margin + Math.random() * (TAMX * 0.7 - 44);

    this.position = { x, y: -50 };
    this.velocity = { x: 0, y: 1.2 };
    this.size = { width: 44, height: 44 };
    this.hitbox = { width: 36, height: 36 };

    this.element.style.width = `${this.size.width}px`;
    this.element.style.height = `${this.size.height}px`;
    this.element.style.left = `${this.position.x}px`;
    this.element.style.top = `${this.position.y}px`;

    road.element.appendChild(this.element);
  }
}
