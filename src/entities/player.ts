import { HasCollision } from "../components/HasCollision.js";
import { HasInvincibility } from "../components/HasInvincibility.js";
import { VisualAttachment, HasVisualAttachments } from "../components/HasVisualAttachments.js";
import { INVINCIBILITY_TIME, TAMX, TAMY } from "../config.js";
import { Entity, EntityType } from "../core/entity.js";
import { road } from "../road.js";
import { PLAYER_PNG_PATH } from "../config.js"

export class Player implements Entity, HasCollision, HasVisualAttachments, HasInvincibility {
  element: HTMLImageElement;
  direction: 0 | 1 | 2 = 1; // esquerda, centro, direita

  position = { x: TAMX / 2 - 30, y: TAMY - 130 };
  velocity = { x: 0, y: 0 };
  size = { width: 32, height: 74 };
  hitbox = { width: 32, height: 74 };
  type: EntityType = "player";

  activateInvincibility = false;
  invincibilityTimeRemaining = INVINCIBILITY_TIME;
  visualAttachments: VisualAttachment[] = [];

  constructor() {
    this.element = document.createElement("img");
    this.element.id = "moto";
    this.element.src = this.getPlayerImageSrc();
    this.element.style.width = `${this.size.width}px`;
    this.element.style.height = `${this.size.height}px`;
    this.element.style.position = "absolute";
    this.element.draggable = false;

    this.syncElement();
    road.element.appendChild(this.element);

    const pizzaEl = document.createElement("img");
    pizzaEl.src = this.getPizzaImageSrc();
    pizzaEl.style.position = "absolute";
    pizzaEl.style.width = "36px";
    pizzaEl.style.height = "78px";
    pizzaEl.style.display = "none";
    pizzaEl.style.pointerEvents = "none";
    road.element.appendChild(pizzaEl);

    const helmetEl = document.createElement("img");
    helmetEl.src = this.getHelmetImageSrc();
    helmetEl.style.position = "absolute";
    helmetEl.style.width = `${this.size.width}px`;;
    helmetEl.style.height = `${this.size.height}px`;
    helmetEl.style.display = "none";
    helmetEl.style.pointerEvents = "none";
    road.element.appendChild(helmetEl);

    this.visualAttachments.push({
      id: "pizza",
      element: pizzaEl,
      offset: { x: -4, y: -4 },
      isVisible: false,
      mirrorOnLeft: true,
    });

    this.visualAttachments.push({
      id: "helmet",
      element: helmetEl,
      offset: { x: 0, y: 0 },
      isVisible: false,
      mirrorOnLeft: true,
    });
  }

  syncElement() {
    this.element.style.left = `${this.position.x}px`;
    this.element.style.top = `${this.position.y}px`;
  }

  setDirection(dir: 0 | 1 | 2) {
    this.direction = dir;
    this.element.src = this.getPlayerImageSrc();
    this.updateAttachmentImages();
  }

  private getPlayerImageSrc(): string {
    if (this.direction === 0) return `${PLAYER_PNG_PATH}/playerLeft.png`;
    if (this.direction === 2) return `${PLAYER_PNG_PATH}/playerRight.png`;
    return `${PLAYER_PNG_PATH}/player.png`;
  }

  private getPizzaImageSrc(): string {
    if (this.direction === 0) return `${PLAYER_PNG_PATH}/pizzaBoxLeft.png`;
    if (this.direction === 2) return `${PLAYER_PNG_PATH}/pizzaBoxRight.png`;
    return `${PLAYER_PNG_PATH}/pizzaBox.png`;
  }

  private getHelmetImageSrc(): string {
    if (this.direction === 0) return `${PLAYER_PNG_PATH}/helmetLeft.png`;
    if (this.direction === 2) return `${PLAYER_PNG_PATH}/helmetRight.png`;
    return `${PLAYER_PNG_PATH}/helmet.png`;
  }

  private updateAttachmentImages(): void {
    for (const attachment of this.visualAttachments) {
      if (attachment.id === "pizza") {
        attachment.element.src = this.getPizzaImageSrc();
      }
      if (attachment.id === "helmet") {
        attachment.element.src = this.getHelmetImageSrc();
      }
    }
  }

  setInvencibility() {
    this.activateInvincibility = true;
    this.invincibilityTimeRemaining = INVINCIBILITY_TIME;
  }
}
