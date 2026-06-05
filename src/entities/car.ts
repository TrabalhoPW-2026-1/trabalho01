import { HasCollision } from "../components/HasCollision.js";
import { Entity, EntityType } from "../core/entity.js";
import { TAMX } from "../config.js";
import { road } from "../road.js";

const CAR_SVGS = ["car-red", "car-blue", "car-yellow", "car-white"];

export const CAR_NUM_LANES = 4;

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
    const svg = CAR_SVGS[Math.floor(Math.random() * CAR_SVGS.length)];

    this.element = document.createElement("img");
    this.element.src = `assets/svg/${svg}.svg`;
    this.element.style.position = "absolute";
    this.element.draggable = false;

    const margin = TAMX * 0.1;
    const usable = TAMX * 0.8 - 54;
    const x = margin + (lane / (CAR_NUM_LANES - 1)) * usable;
    const speed = 1.5 + Math.random() * 2;

    this.position = { x, y: -80 };
    this.velocity = { x: 0, y: speed };
    this.size = { width: 54, height: 76 };
    this.hitbox = { width: 42, height: 62 };

    this.element.style.width = `${this.size.width}px`;
    this.element.style.height = `${this.size.height}px`;
    this.element.style.left = `${this.position.x}px`;
    this.element.style.top = `${this.position.y}px`;

    road.element.appendChild(this.element);
  }
}
