import { HasCollision } from "../components/HasCollision.js";
import { HasVisualAttachments, VisualAttachment } from "../components/HasVisualAttachments.js";
import { laneX, TAMY } from "../config.js";
import { Entity, EntityType } from "../core/entity.js";
import { road } from "../road.js";

export class Player implements Entity, HasCollision, HasVisualAttachments {
  element: HTMLElement;

  position = { x: 0, y: TAMY - 130 };
  velocity = { x: 0, y: 0 };
  size = { width: 60, height: 50 };
  hitbox = { width: 50, height: 40 };
  type: EntityType = "player";

  visualAttachments: VisualAttachment[] = [];

  lane = 1;
  fromLane = 1;
  targetLane = 1;
  fromX = 0;
  driftProgress = 1;
  switching = false;

  constructor() {
    this.position.x = laneX(1) - this.size.width / 2;
    this.fromX = this.position.x;

    this.element = document.createElement("div");
    this.element.id = "moto";
    this.element.textContent = "🏍️";
    this.element.style.fontSize = "50px";
    this.element.style.lineHeight = "1";
    this.element.style.position = "absolute";
    this.element.style.userSelect = "none";
    this.element.style.cursor = "default";
    this.element.style.transformOrigin = "center bottom";

    this.syncElement();
    road.element.appendChild(this.element);

    const pizzaEl = document.createElement("div");
    pizzaEl.textContent = "📦";
    pizzaEl.style.position = "absolute";
    pizzaEl.style.fontSize = "22px";
    pizzaEl.style.display = "none";
    pizzaEl.style.pointerEvents = "none";
    road.element.appendChild(pizzaEl);

    this.visualAttachments.push({
      id: "pizza",
      element: pizzaEl,
      offset: { x: 36, y: -16 },
      isVisible: false,
    });
  }

  syncElement() {
    this.element.style.left = `${this.position.x}px`;
    this.element.style.top = `${this.position.y}px`;
  }

  startSwitch(dir: -1 | 1): void {
    const newLane = this.lane + dir;
    if (newLane < 0 || newLane > 2) return;
    this.fromLane = this.lane;
    this.fromX = this.position.x;
    this.targetLane = newLane;
    this.driftProgress = 0;
    this.switching = true;
  }

  getLaneX(lane: number): number {
    return laneX(lane) - this.size.width / 2;
  }
}
