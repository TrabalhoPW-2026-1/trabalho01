import { HasCollision } from "../components/HasCollision.js";
import { Entity, EntityType } from "../core/entity.js";
import { TAMX, REST_PNG_PATH, ROAD_SPEED } from "../config.js";
import { road } from "../road.js";

export class Helmet implements Entity, HasCollision {
  element: HTMLImageElement;
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  size: { width: number; height: number };
  hitbox: { width: number; height: number };
  type: EntityType = "helmet";

  constructor() {
    this.element = document.createElement("img");
    this.element.src = `${REST_PNG_PATH}/helmetPowerUp.png`;
    this.element.style.position = "absolute";
    this.element.draggable = false;

    const margin = TAMX * 0.1;
    const x = margin + Math.random() * (TAMX * 0.8 - 40);

    this.position = { x, y: -50 };
    this.velocity = { x: 0, y: ROAD_SPEED };
    this.size = { width: 40, height: 40 };
    this.hitbox = { width: 32, height: 32 };

    this.element.style.width = `${this.size.width}px`;
    this.element.style.height = `${this.size.height}px`;
    this.element.style.left = `${this.position.x}px`;
    this.element.style.top = `${this.position.y}px`;

    road.element.appendChild(this.element);
  }
}
