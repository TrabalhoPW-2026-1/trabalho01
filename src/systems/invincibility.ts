import { Entity } from "../core/entity";
import { System } from "../core/system";
import { World } from "../core/world";
import { Player } from "../entities/player";

export class InvincibilitySystem implements System {

    update(world: World): void {

        for (const entity of world.entities) {
            // Ignora entidades que não possuem invencibilidade
            if (
				!("activateInvincibility" in entity) ||
				!("invincibilitytimeRemaining" in entity)
			) continue;

            if (entity instanceof Player && entity.activateInvincibility) {
                // Diminui o tempo de invencibilidade
                entity.invincibilitytimeRemaining -= 1;
                
                // Termina a invencibilidade quando o tempo acaba
                if (entity.invincibilitytimeRemaining <= 0) 
                    entity.activateInvincibility = false;
            }
        }


    }
}