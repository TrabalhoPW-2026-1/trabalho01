import { HasCollision } from "../components/HasCollision.js";
import { Entity, EntityType } from "../core/entity.js";
import { CUSTOMER_WAIT_TIME, ROAD_SPEED, TAMX, TAMY } from "../config.js";
import { road } from "../road.js";

export class Customer implements Entity, HasCollision {
  element: HTMLElement;
  position: { x: number; y: number };
  velocity: { x: number; y: number } = { x: 0, y: ROAD_SPEED };
  size: { width: number; height: number };
  hitbox: { width: number; height: number };
  type: EntityType = "customer";

  waitTimer: number = CUSTOMER_WAIT_TIME;
  private timerBar: HTMLElement;

  constructor() {
    const customerWidth = 40;
    const customerHeight = 60;
    const sidewalkWidth = TAMX * 0.08;
    const leftX = Math.random() * Math.max(sidewalkWidth - customerWidth, 0);
    const rightX = TAMX - sidewalkWidth + Math.random() * Math.max(sidewalkWidth - customerWidth, 0);
    const x = Math.random() < 0.5 ? leftX : rightX;

    this.element = document.createElement("div");
    this.element.style.position = "absolute";
    this.element.style.display = "flex";
    this.element.style.flexDirection = "column";
    this.element.style.alignItems = "center";
    this.element.style.gap = "3px";

    const img = document.createElement("img");
    img.src = "assets/svg/customer.svg";
    img.style.width = "36px";
    img.style.height = "48px";
    img.draggable = false;

    const barBg = document.createElement("div");
    barBg.style.width = "44px";
    barBg.style.height = "6px";
    barBg.style.background = "#222";
    barBg.style.borderRadius = "3px";
    barBg.style.overflow = "hidden";

    this.timerBar = document.createElement("div");
    this.timerBar.style.width = "100%";
    this.timerBar.style.height = "100%";
    this.timerBar.style.background = "#00cc44";
    this.timerBar.style.borderRadius = "3px";

    barBg.appendChild(this.timerBar);
    this.element.appendChild(img);
    this.element.appendChild(barBg);

    this.position = { x, y: -80 };
    this.size = { width: customerWidth, height: customerHeight };
    this.hitbox = { width: 32, height: 52 };

    this.element.style.left = `${this.position.x}px`;
    this.element.style.top = `${this.position.y}px`;

    road.element.appendChild(this.element);
  }

  updateTimerBar(): void {
    const pct = this.waitTimer / CUSTOMER_WAIT_TIME;
    this.timerBar.style.width = `${pct * 100}%`;
    this.timerBar.style.background =
      pct > 0.5 ? "#00cc44" : pct > 0.25 ? "#ffcc00" : "#ff3333";
  }
}
