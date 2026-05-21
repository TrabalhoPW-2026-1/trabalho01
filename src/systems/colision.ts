import { Entity } from "../core/entity";
import { System } from "../core/system";
import { World } from "../core/world";

export class ColisionSystem implements System {
    private readonly collisionPadding = 2;

    update(world: World): void {
        for (const entity of world.entities) {
            if (!("element" in entity)) continue;

            for (const otherEntity of world.entities) {
                if (entity === otherEntity) continue;

                if (entity.type === otherEntity.type) continue;
                if (!("element" in otherEntity)) continue;

                const isColliding = this.checkCollision(entity, otherEntity);
                if (isColliding) {
                    world.gameOver();
                }
            }
        }
    }

    private checkCollision(player: Entity, obstacle: Entity): boolean {
        const playerRect = player.element.getBoundingClientRect();
        const obstacleRect = obstacle.element.getBoundingClientRect();

        return (
            playerRect.left + this.collisionPadding < obstacleRect.right - this.collisionPadding &&
            playerRect.right - this.collisionPadding > obstacleRect.left + this.collisionPadding &&
            playerRect.top + this.collisionPadding < obstacleRect.bottom - this.collisionPadding &&
            playerRect.bottom - this.collisionPadding > obstacleRect.top + this.collisionPadding
        );
    }
}