import { Entity } from "../core/entity";
import { System } from "../core/system";
import { World } from "../core/world";
import { HasCollision } from "../components/HasCollision.js";
import { HasVisualAttachments } from "../components/HasVisualAttachments.js";

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

    private checkCollision(a: Entity & HasCollision, b: Entity & HasCollision): boolean {
        return (
            a.position.x < b.position.x + b.hitbox.width &&
            a.position.x + a.hitbox.width > b.position.x &&

            a.position.y < b.position.y + b.hitbox.height &&
            a.position.y + a.hitbox.height > b.position.y
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
        if ("visualAttachments" in entity) {
            const visualAttachments = (entity as HasVisualAttachments).visualAttachments;
            for (const attachment of visualAttachments) {
                attachment.element.remove();
            }
        }
        
        // Remove da lista de entidades
        world.entities = world.entities.filter(e => e !== entity);
    }
}