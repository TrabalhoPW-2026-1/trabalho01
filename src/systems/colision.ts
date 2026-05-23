import { Entity } from "../core/entity";
import { System } from "../core/system";
import { World } from "../core/world";
import { HasCollision } from "../components/HasCollision.js";

export class ColisionSystem implements System {
    private readonly collisionPadding = 2;

    update(world: World): void {
        const collisionEntities: (Entity & HasCollision)[] = world.entities.filter(entity => "hitbox" in entity) as (Entity & HasCollision)[];
        const player = collisionEntities.find(entity => entity.type === 'player');
        if (!player) return;

        for (const otherEntity of collisionEntities) {
            if (player === otherEntity) continue;
            if (player.type === otherEntity.type) continue;

            if (!("element" in otherEntity)) continue;

            const isColliding = this.checkCollision(player, otherEntity);
            if (isColliding) {
                world.gameOver();
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