import { HasCollision } from "../components/HasCollision.js";
import { TAMX } from "../config.js";
import { Entity, EntityType } from "../core/entity.js";
import { space } from "../space.js";

export class Obstacle 
    implements Entity, HasCollision {

    private static readonly recentPositions: number[] = [];

    element: HTMLImageElement;
    position: { x: number, y: number };
    velocity: { x: number, y: number };
    size: { width: number; height: number; };   
    hitbox: { width: number; height: number; };
    type: EntityType = 'obstacle';

    constructor() {
        this.element = document.createElement("img");
        this.element.className = "obstacle";
        this.element.src = "assets/png/meteorSmall.png";
        this.position = { x: this.getRandomPosition(), y: -20 };
        this.size = { width: 50, height: 50 };
        this.velocity = { x: 0, y: 1 };
        
        this.hitbox = {
            width: this.size.width,
            height: this.size.height
        };

        this.element.style.left = `${this.position.x}px`;
        this.element.style.top = `${this.position.y}px`;

        space.element.appendChild(this.element);
    }

    private getRandomPosition(): number {

        let candidate = 0;
        do {
            candidate = Math.floor(Math.random() * TAMX);
        } while (this.isCloseToRecentPositions(candidate));

        Obstacle.recentPositions.push(candidate);
        if (Obstacle.recentPositions.length > 5) {
            Obstacle.recentPositions.shift();
        }

        return candidate;
    }

    private isCloseToRecentPositions(candidate: number): boolean {
        return Obstacle.recentPositions.some(pos => Math.abs(pos - candidate) < 60);
    }
}