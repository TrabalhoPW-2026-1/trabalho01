import { Entity } from "../core/entity.js";
import { System } from "../core/system.js";
import { World } from "../core/world.js";
import { HasCollision } from "../components/HasCollision.js";
import { Player } from "../entities/player.js";

export class ColisionSystem implements System {
    private readonly collisionPadding = 2;

    update(world: World): void {
        // Recupera a entidade player
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

    private checkInteractions(player: Player, entity: Entity, world: World): void {
        switch (entity.type){
            case "obstacle":
                if (player.activateInvincibility) 
                    break;

                // Escudo
                if (world.powerupActivate) {
                    world.powerupActivate = false;
                }
                // Sem escudo
                else {
                    world.lives -= 1;

                    // Ativa invencibilidade
                    player.setInvencibility();
                }

                world.destroyEntity(entity);
                if (world.lives <= 0) world.gameOver();
                
                break;
            case "coin":
                world.score += 1;
                world.destroyEntity(entity);
                break;
            case "powerup":
                world.powerupActivate = true;
                world.destroyEntity(entity);
                break;
            default:
                console.log(`Strange interaction ocurring between player and ${entity.type}`)
                break;
        }

    }
}