import { HasCollision } from "../components/HasCollision.js";
import { HasInvincibility } from "../components/HasInvincibility.js";
import { HasVisualAttachments, VisualAttachment } from "../components/HasVisualAttachments.js";
import { INVINCIBILITY_TIME, TAMX, TAMY } from "../config.js";
import { Entity, EntityType } from "../core/entity.js";
import { road } from "../road.js";

export class Player implements Entity, HasCollision, HasInvincibility, HasVisualAttachments {
  element: HTMLElement;

  position = { x: TAMX / 2 - 30, y: TAMY - 130 };
  velocity = { x: 0, y: 0 };
  size = { width: 60, height: 50 };
  hitbox = { width: 50, height: 40 };
  type: EntityType = "player";

  activateInvincibility = false;
  invincibilityTimeRemaining = INVINCIBILITY_TIME;

  visualAttachments: VisualAttachment[] = [];

  constructor() {
    this.element = document.createElement("div");
    this.element.id = "moto";
    this.element.textContent = "🏍️";
    this.element.style.fontSize = "50px";
    this.element.style.lineHeight = "1";
    this.element.style.position = "absolute";
    this.element.style.userSelect = "none";
    this.element.style.cursor = "default";

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

  setDirection(dir: number) {
    this.element.style.transform = dir === 0 ? "scaleX(-1)" : "scaleX(1)";
  }

  setInvencibility() {
    this.activateInvincibility = true;
    this.invincibilityTimeRemaining = INVINCIBILITY_TIME;
  }
}
