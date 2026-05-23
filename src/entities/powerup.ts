import { HasCollision } from "../components/HasCollision.js";
import { Entity, EntityType } from "../core/entity.js";
import { space } from "../space.js";

export class PowerUp implements Entity, HasCollision {
    element: HTMLImageElement;
    position: { x: number, y: number };
    size: { width: number, height: number };
    hitbox: { width: number; height: number; };
    velocity: { x: number, y: number };
    type: EntityType;

    constructor(
        x: number,
        y: number,
    ) {
        this.element = document.createElement("img");
        this.element.className = "powerup";
        this.element.src = "assets/png/powerup.png";
        
        this.position = { x, y };
        this.element.style.left = `${this.position.x}px`;
        this.element.style.top = `${this.position.y}px`;
        
        this.size = { width: 40, height: 40 };
        this.element.style.width = `${this.size.width}px`;
        this.element.style.height = `${this.size.height}px`;

        this.hitbox = {
            width: this.size.width,
            height: this.size.height
        };

        this.velocity = { x: 0, y: 1 };
        this.type = 'powerup';

        space.element.appendChild(this.element);
    }
}