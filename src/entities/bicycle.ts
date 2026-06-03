import { HasCollision } from "../components/HasCollision.js";
import { Entity, EntityType } from "../core/entity.js";
import { ALERT_FRAMES, LANE_SWITCH_FRAMES, laneX } from "../config.js";
import { road } from "../road.js";

export class Bicycle implements Entity, HasCollision {
  element: HTMLElement;
  alertElement: HTMLElement;
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  size: { width: number; height: number };
  hitbox: { width: number; height: number };
  type: EntityType = "bicycle";

  lane: number;
  fromLane: number;
  targetBicycleLane: number;
  fromX: number;
  laneProgress: number = 1;
  laneChanging: boolean = false;
  laneChangeTimer: number;
  alertTimer: number = ALERT_FRAMES;

  constructor(lane: number) {
    this.lane = lane;
    this.fromLane = lane;
    this.targetBicycleLane = lane;
    this.laneChangeTimer = 60 + Math.floor(Math.random() * LANE_SWITCH_FRAMES * 5);

    const speed = 1.2 + Math.random() * 1.2;
    const x = laneX(lane) - 19;
    this.fromX = x;

    this.size = { width: 38, height: 38 };
    this.hitbox = { width: 32, height: 32 };
    this.position = { x, y: -50 };
    this.velocity = { x: 0, y: speed };

    this.element = document.createElement("div");
    this.element.textContent = "🚴";
    this.element.style.fontSize = "38px";
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
