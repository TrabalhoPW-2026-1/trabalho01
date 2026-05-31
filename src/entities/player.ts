import { HasCollision } from "../components/HasCollision.js";
import { HasInvincibility } from "../components/HasInvincibility.js";
import { VisualAttachment, HasVisualAttachments } from "../components/HasVisualAttachments.js";
import { INVINCIBILITY_TIME, TAMX } from "../config.js";
import { Entity, EntityType } from "../core/entity.js";
import { space } from "../space.js";

const directions = [
  "assets/png/playerLeft.png",
  "assets/png/player.png",
  "assets/png/playerRight.png",
];

export class Player implements Entity, HasCollision, HasVisualAttachments, HasInvincibility {

  element: HTMLImageElement;

  position = {
    x: TAMX / 2 - 50,
    y: 700
  };

  velocity = {
    x: 0,
    y: 0
  };

  size = {
    width: 100,
    height: 80
  }

  hitbox: { width: number, height: number } = {
    width: this.size.width,
    height: this.size.height
  };

  type: EntityType = 'player';

  direction = 1;

  visualAttachments: VisualAttachment[] = [];

  activateInvincibility = true;

  invincibilityTimeRemaining = INVINCIBILITY_TIME; 

  constructor() {
    this.element = document.createElement("img");

    this.element.id = "ship";
    this.element.src = directions[this.direction];
    this.element.style.width = `${this.size.width}px`;
    this.element.style.height = `${this.size.height}px`;

    this.syncElement();

    space.element.appendChild(this.element);

    const shield = document.createElement("img");

    shield.src = "assets/png/shield.png";

    shield.style.position = "absolute";

    shield.style.width = "120px";
    shield.style.height = "120px";

    shield.style.pointerEvents = "none";
    shield.style.display = "none";

    space.element.appendChild(shield);
    this.visualAttachments.push({
        id: "shield",
        element: shield,
        offset: {
            x: -10,
            y: -20
        },
        isVisible: false
    });
  }

  syncElement() {
    this.element.style.left = `${this.position.x}px`;
    this.element.style.top = `${this.position.y}px`;
  }

  setDirection(direction: number) {
    this.direction = direction;
    this.element.src = directions[this.direction];
  }

  setInvencibility() {
    this.activateInvincibility = true;
    this.invincibilityTimeRemaining = INVINCIBILITY_TIME;
  }
}