import { HasCollision } from "../components/HasCollision.js";
import { Entity, EntityType } from "../core/entity.js";
import { TAMX } from "../config.js";
import { road } from "../road.js";

export class Helmet implements Entity, HasCollision {
  element: HTMLElement;
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  size: { width: number; height: number };
  hitbox: { width: number; height: number };
  type: EntityType = "helmet";

  constructor() {
    this.element = document.createElement("div");
    this.element.textContent = "⛑️";
    this.element.style.fontSize = "36px";
    this.element.style.lineHeight = "1";
    this.element.style.position = "absolute";
    this.element.style.userSelect = "none";

    const margin = TAMX * 0.1;
    const x = margin + Math.random() * (TAMX * 0.8 - 36);

    this.position = { x, y: -50 };
    this.velocity = { x: 0, y: 1 };
    this.size = { width: 36, height: 36 };
    this.hitbox = { width: 30, height: 30 };

    this.element.style.left = `${this.position.x}px`;
    this.element.style.top = `${this.position.y}px`;

    road.element.appendChild(this.element);
  }
}
