import { HasCollision } from "../components/HasCollision.js";
import { Entity, EntityType } from "../core/entity.js";
import { ALERT_FRAMES, laneX } from "../config.js";
import { road } from "../road.js";

const CAR_EMOJIS = ["🚗", "🚕", "🚙", "🚐", "🚓"];

export class Car implements Entity, HasCollision {
  element: HTMLElement;
  alertElement: HTMLElement;
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  size: { width: number; height: number };
  hitbox: { width: number; height: number };
  type: EntityType = "car";
  lane: number;
  alertTimer: number = ALERT_FRAMES;

  constructor(lane: number) {
    this.lane = lane;
    const emoji = CAR_EMOJIS[Math.floor(Math.random() * CAR_EMOJIS.length)];
    const speed = 1.5 + Math.random() * 2;
    const x = laneX(lane) - 22;

    this.size = { width: 45, height: 42 };
    this.hitbox = { width: 38, height: 36 };
    this.position = { x, y: -50 };
    this.velocity = { x: 0, y: speed };

    this.element = document.createElement("div");
    this.element.textContent = emoji;
    this.element.style.fontSize = "42px";
    this.element.style.lineHeight = "1";
    this.element.style.position = "absolute";
    this.element.style.userSelect = "none";
    this.element.style.left = `${this.position.x}px`;
    this.element.style.top = `${this.position.y}px`;

    this.alertElement = this.createAlertElement();

    road.element.appendChild(this.element);
    road.element.appendChild(this.alertElement);
  }

  private createAlertElement(): HTMLElement {
    const el = document.createElement("div");
    el.textContent = "❗";
    el.style.position = "absolute";
    el.style.fontSize = "22px";
    el.style.lineHeight = "1";
    el.style.zIndex = "100";
    el.style.pointerEvents = "none";
    el.style.display = "none";
    return el;
  }
}
