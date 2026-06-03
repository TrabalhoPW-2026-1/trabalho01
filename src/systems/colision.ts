import { Entity } from "../core/entity.js";
import { System } from "../core/system.js";
import { World } from "../core/world.js";
import { HasCollision } from "../components/HasCollision.js";
import { Player } from "../entities/player.js";

export class ColisionSystem implements System {

    update(world: World): void {
        const collisionEntities: (Entity & HasCollision)[] = world.entities.filter(entity => "hitbox" in entity) as (Entity & HasCollision)[];
        const player = collisionEntities.find(entity => entity instanceof Player);
        if (!player) return;

        for (const otherEntity of collisionEntities) {
            if (player === otherEntity) continue;
            if (player.type === otherEntity.type) continue;
            if (!("element" in otherEntity)) continue;

            const isColliding = this.checkCollision(player, otherEntity);
            if (isColliding) {
                this.checkInteractions(player, otherEntity, world);
            }
        }
    }

    private checkCollision(a: Entity & HasCollision, b: Entity & HasCollision): boolean {
        return (
            a.position.x < b.position.x + b.hitbox.width &&
            a.position.x + a.hitbox.width > b.position.x &&
            a.position.y < b.position.y + b.hitbox.height &&
            a.position.y + a.hitbox.height > b.position.y
        );
    }

    private handleObstacleHit(player: Player, entity: Entity, world: World): void {
        if (player.activateInvincibility) return;

        if (world.shields > 0) {
            world.shields--;
        } else {
            world.lives -= 1;
            player.setInvencibility();
        }

        world.destroyEntity(entity);
        if (world.lives <= 0) world.gameOver();
    }

    private checkInteractions(player: Player, entity: Entity, world: World): void {
        switch (entity.type) {
            case "obstacle":
            case "ufo":
                this.handleObstacleHit(player, entity, world);
                break;
            case "coin":
                world.score += 1;
                world.destroyEntity(entity);
                break;
            case "powerup":
                world.shields = Math.min(world.shields + 1, 3);
                world.destroyEntity(entity);
                break;
            case "lifeup":
                world.lives += 1;
                world.destroyEntity(entity);
                break;
            default:
                console.log(`Strange interaction ocurring between player and ${entity.type}`);
                break;
        }
    }
}
