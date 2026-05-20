import { PROB_OBSTACLE, TAMX } from "../config.js";
import { Entity } from "../core/entity.js";
import { space } from "../space.js";

export class Obstacle implements Entity {

    element: HTMLImageElement;
    position: { x: number, y: number };
    velocity: { x: number, y: number };

    constructor() {
        this.element = document.createElement("img");
        this.element.className = "obstacle";
        this.element.src = "assets/png/meteorSmall.png";
        this.position = { x: Math.floor(Math.random() * TAMX), y: -20 };
        this.velocity = { x: 0, y: 1 };

        this.element.style.left = `${this.position.x}px`;
        this.element.style.top = `${this.position.y}px`;

        space.element.appendChild(this.element);
    }
}