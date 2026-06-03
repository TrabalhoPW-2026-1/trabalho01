import { HasCollision } from "../components/HasCollision.js";
import { Entity, EntityType } from "../core/entity.js";
import { TAMX } from "../config.js";
import { road } from "../road.js";

const CAR_EMOJIS = ["🚗", "🚕", "🚙", "🚐", "🚓"];

export class Car implements Entity, HasCollision {
  element: HTMLElement;
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  size: { width: number; height: number };
  hitbox: { width: number; height: number };
  type: EntityType = "car";

  constructor() {
    const emoji = CAR_EMOJIS[Math.floor(Math.random() * CAR_EMOJIS.length)];

    this.element = document.createElement("div");
    this.element.textContent = emoji;
    this.element.style.fontSize = "42px";
    this.element.style.lineHeight = "1";
    this.element.style.position = "absolute";
    this.element.style.userSelect = "none";

    const margin = TAMX * 0.1;
    const x = margin + Math.random() * (TAMX * 0.8 - 45);
    const speed = 1.5 + Math.random() * 2;

    this.position = { x, y: -50 };
    this.velocity = { x: 0, y: speed };
    this.size = { width: 45, height: 42 };
    this.hitbox = { width: 38, height: 36 };

    this.element.style.left = `${this.position.x}px`;
    this.element.style.top = `${this.position.y}px`;

    road.element.appendChild(this.element);
  }
}
