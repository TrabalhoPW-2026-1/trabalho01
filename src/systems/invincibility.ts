import { Entity } from "../core/entity.js";
import { System } from "../core/system.js";
import { World } from "../core/world.js";
import { Player } from "../entities/player.js";

export class InvincibilitySystem implements System {

    update(world: World): void {

        for (const entity of world.entities) {
            // Ignora entidades que não possuem invencibilidade
            if (
				!("activateInvincibility" in entity) ||
				!("invincibilityTimeRemaining" in entity)
			) continue;

            if (entity instanceof Player && entity.activateInvincibility) {
                // Diminui o tempo de invencibilidade
                entity.invincibilityTimeRemaining -= 1;
                
                // Termina a invencibilidade quando o tempo acaba
                if (entity.invincibilityTimeRemaining <= 0) 
                    entity.activateInvincibility = false;
            }
        }


    }
}