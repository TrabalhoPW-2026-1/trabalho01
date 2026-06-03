import { HasCollision } from "../components/HasCollision.js";
import { Entity, EntityType } from "../core/entity.js";
import { TAMX } from "../config.js";
import { road } from "../road.js";

export class PizzaBox implements Entity, HasCollision {
  element: HTMLElement;
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  size: { width: number; height: number };
  hitbox: { width: number; height: number };
  type: EntityType = "pizzabox";

  constructor() {
    this.element = document.createElement("div");
    this.element.textContent = "🍕";
    this.element.style.fontSize = "42px";
    this.element.style.lineHeight = "1";
    this.element.style.position = "absolute";
    this.element.style.userSelect = "none";

    const margin = TAMX * 0.15;
    const x = margin + Math.random() * (TAMX * 0.7 - 42);

    this.position = { x, y: -50 };
    this.velocity = { x: 0, y: 1.2 };
    this.size = { width: 42, height: 42 };
    this.hitbox = { width: 36, height: 36 };

    this.element.style.left = `${this.position.x}px`;
    this.element.style.top = `${this.position.y}px`;

    road.element.appendChild(this.element);
  }
}
