import { HasCollision } from "../components/HasCollision.js";
import { Entity, EntityType } from "../core/entity.js";
import { TAMX, OBSTACLES_PNG_PATH, ROAD_SPEED } from "../config.js";
import { road } from "../road.js";

const CAR_PNGS = ["car1", "car2", "car3", "car4"];

export const CAR_NUM_LANES = 6;

export class Car implements Entity, HasCollision {
  element: HTMLImageElement;
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  size: { width: number; height: number };
  hitbox: { width: number; height: number };
  type: EntityType = "car";
  lane: number;

  constructor(lane: number) {
    this.lane = lane;
    const png = CAR_PNGS[Math.floor(Math.random() * CAR_PNGS.length)];

    this.element = document.createElement("img");
    this.element.src = `${OBSTACLES_PNG_PATH}/${png}.png`;
    this.element.style.position = "absolute";
    this.element.draggable = false;

    const margin = TAMX * 0.1;
    const usable = TAMX * 0.8 - 48;
    const x = margin + (lane / (CAR_NUM_LANES - 1)) * usable;
    const speed = ROAD_SPEED + 1;

    this.position = { x, y: -80 };
    this.velocity = { x: 0, y: speed };
    this.size = { width: 48, height: 86 };
    this.hitbox = { width: 48, height: 86 };

    this.element.style.width = `${this.size.width}px`;
    this.element.style.height = `${this.size.height}px`;
    this.element.style.left = `${this.position.x}px`;
    this.element.style.top = `${this.position.y}px`;

    road.element.appendChild(this.element);
  }
}
