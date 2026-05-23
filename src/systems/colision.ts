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
                this.checkInteractions(otherEntity, world);
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

    private checkInteractions(entity: Entity, world: World): void {
        switch (entity.type){
            case "obstacle":
                //escudo
                if (world.powerupActivate) {
                    world.powerupActivate = false;
                }
                else {
                    world.lives -= 1;
                }

                this.destroyEntity(entity, world);
                if (world.lives <= 0) world.gameOver();
                
                break;
            case "coin":
                world.score += 1;
                this.destroyEntity(entity, world);
                break;
            case "powerup":
                world.powerupActivate = true;
                this.destroyEntity(entity, world);
                break;
            default:
                console.log(`Strange interaction ocurring between player and ${entity.type}`)
                break;
        }

    }

    private destroyEntity(entity: Entity, world: World): void {
        // Remove do DOM se houver elemento HTML
        if ("element" in entity && entity.element) {
            entity.element.remove();
        }
        
        // Remove da lista de entidades
        world.entities = world.entities.filter(e => e !== entity);
    }
}