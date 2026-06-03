import { HasCollision } from "../components/HasCollision.js";
import { HasInvincibility } from "../components/HasInvincibility.js";
import { VisualAttachment, HasVisualAttachments } from "../components/HasVisualAttachments.js";
import { INVINCIBILITY_TIME, TAMX, TAMY } from "../config.js";
import { Entity, EntityType } from "../core/entity.js";
import { road } from "../road.js";

export class Player implements Entity, HasCollision, HasVisualAttachments, HasInvincibility {
  element: HTMLImageElement;

  position = { x: TAMX / 2 - 30, y: TAMY - 130 };
  velocity = { x: 0, y: 0 };
  size = { width: 60, height: 90 };
  hitbox = { width: 48, height: 72 };
  type: EntityType = "player";

  activateInvincibility = false;
  invincibilityTimeRemaining = INVINCIBILITY_TIME;
  visualAttachments: VisualAttachment[] = [];

  constructor() {
    this.element = document.createElement("img");
    this.element.id = "moto";
    this.element.src = "assets/svg/moto.svg";
    this.element.style.width = `${this.size.width}px`;
    this.element.style.height = `${this.size.height}px`;
    this.element.style.position = "absolute";
    this.element.draggable = false;

    this.syncElement();
    road.element.appendChild(this.element);

    const pizzaEl = document.createElement("img");
    pizzaEl.src = "assets/svg/pizza.svg";
    pizzaEl.style.position = "absolute";
    pizzaEl.style.width = "28px";
    pizzaEl.style.height = "28px";
    pizzaEl.style.display = "none";
    pizzaEl.style.pointerEvents = "none";
    road.element.appendChild(pizzaEl);

    this.visualAttachments.push({
      id: "pizza",
      element: pizzaEl,
      offset: { x: 40, y: -10 },
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
