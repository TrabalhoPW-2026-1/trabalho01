import { HasCollision } from "../components/HasCollision.js";
import { Entity, EntityType } from "../core/entity.js";
import { TAMX, TAMY } from "../config.js";
import { road } from "../road.js";

export class Bicycle implements Entity, HasCollision {
  element: HTMLElement;
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  size: { width: number; height: number };
  hitbox: { width: number; height: number };
  type: EntityType = "bicycle";

  constructor() {
    this.element = document.createElement("div");
    this.element.textContent = "🚴";
    this.element.style.fontSize = "38px";
    this.element.style.lineHeight = "1";
    this.element.style.position = "absolute";
    this.element.style.userSelect = "none";

    const fromLeft = Math.random() < 0.5;
    const startX = fromLeft ? -45 : TAMX + 10;
    const startY = Math.random() * (TAMY * 0.4);
    const speed = 2 + Math.random() * 1.5;

    this.position = { x: startX, y: startY };
    this.velocity = { x: fromLeft ? speed : -speed, y: 1 };
    this.size = { width: 38, height: 38 };
    this.hitbox = { width: 32, height: 32 };

    this.element.style.left = `${this.position.x}px`;
    this.element.style.top = `${this.position.y}px`;

    road.element.appendChild(this.element);
  }
}
