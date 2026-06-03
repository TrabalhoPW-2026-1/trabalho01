import { HasCollision } from "../components/HasCollision.js";
import { TAMX } from "../config.js";
import { Entity, EntityType } from "../core/entity.js";
import { space } from "../space.js";

export class UFO implements Entity, HasCollision {
    element: HTMLImageElement;
    position: { x: number, y: number };
    size: { width: number, height: number };
    hitbox: { width: number; height: number; };
    velocity: { x: number, y: number };
    type: EntityType;

    constructor() {
        this.element = document.createElement("img");
        this.element.className = "ufo";
        this.element.src = "assets/png/enemyUFO.png";

        // Entra da esquerda ou direita aleatoriamente
        const fromLeft = Math.random() < 0.5;
        this.size = { width: 60, height: 40 };
        const startX = fromLeft ? -this.size.width : TAMX;
        const speed = 1.5 + Math.random() * 1.5;

        this.position = { x: startX, y: -this.size.height };
        this.element.style.left = `${this.position.x}px`;
        this.element.style.top = `${this.position.y}px`;
        this.element.style.width = `${this.size.width}px`;
        this.element.style.height = `${this.size.height}px`;

        this.hitbox = { width: this.size.width, height: this.size.height };
        this.velocity = { x: fromLeft ? speed : -speed, y: 1 };
        this.type = 'ufo';

        space.element.appendChild(this.element);
    }
}
