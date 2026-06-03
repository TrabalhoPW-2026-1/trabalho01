import { HasCollision } from "../components/HasCollision.js";
import { Entity, EntityType } from "../core/entity.js";
import { CUSTOMER_WAIT_TIME, TAMX, TAMY } from "../config.js";
import { road } from "../road.js";

export class Customer implements Entity, HasCollision {
  element: HTMLElement;
  position: { x: number; y: number };
  velocity: { x: number; y: number } = { x: 0, y: 0 };
  size: { width: number; height: number };
  hitbox: { width: number; height: number };
  type: EntityType = "customer";

  waitTimer: number = CUSTOMER_WAIT_TIME;

  private timerBar: HTMLElement;

  constructor() {
    const margin = TAMX * 0.12;
    const x = margin + Math.random() * (TAMX * 0.76 - 50);

    this.element = document.createElement("div");
    this.element.style.position = "absolute";
    this.element.style.display = "flex";
    this.element.style.flexDirection = "column";
    this.element.style.alignItems = "center";
    this.element.style.gap = "3px";
    this.element.style.userSelect = "none";

    const emoji = document.createElement("div");
    emoji.textContent = "🧍";
    emoji.style.fontSize = "40px";
    emoji.style.lineHeight = "1";

    const barBg = document.createElement("div");
    barBg.style.width = "42px";
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
    this.element.appendChild(emoji);
    this.element.appendChild(barBg);

    this.position = { x, y: TAMY - 110 };
    this.size = { width: 50, height: 56 };
    this.hitbox = { width: 42, height: 50 };

    this.element.style.left = `${this.position.x}px`;
    this.element.style.top = `${this.position.y}px`;

    road.element.appendChild(this.element);
  }

  updateTimerBar(): void {
    const pct = this.waitTimer / CUSTOMER_WAIT_TIME;
    this.timerBar.style.width = `${pct * 100}%`;
    if (pct > 0.5) {
      this.timerBar.style.background = "#00cc44";
    } else if (pct > 0.25) {
      this.timerBar.style.background = "#ffcc00";
    } else {
      this.timerBar.style.background = "#ff3333";
    }
  }
}
