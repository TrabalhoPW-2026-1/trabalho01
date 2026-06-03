import { TAMX, TAMY } from "../config.js";
import { Player } from "../entities/player.js";
import { System } from "../core/system.js";
import { World } from "../core/world.js";

export class MovementSystem implements System {
    update(world: World) {
        for (const entity of world.entities) {
            if (!("position" in entity) || !("velocity" in entity)) continue;

            entity.position.x += entity.velocity.x;
            entity.position.y += entity.velocity.y;

            if (entity instanceof Player) {
                // Wraparound horizontal
                if (entity.position.x + entity.size.width < 0) {
                    entity.position.x = TAMX;
                } else if (entity.position.x > TAMX) {
                    entity.position.x = -entity.size.width;
                }
                // Clamp vertical
                entity.position.y = Math.max(0, Math.min(TAMY - entity.size.height, entity.position.y));
            }

            if ("element" in entity) {
                entity.element.style.left = `${entity.position.x}px`;
                entity.element.style.top  = `${entity.position.y}px`;
            }
        }

        world.entities = world.entities.filter((entity) => {
            if (!("position" in entity)) return true;
            if (entity.type === 'player') return true;

            const offBottom = entity.position.y > TAMY;
            const offLeft   = entity.position.x + ("size" in entity ? entity.size.width : 0) < -100;
            const offRight  = entity.position.x > TAMX + 100;

            const shouldRemove = offBottom || offLeft || offRight;
            if (shouldRemove && "element" in entity) {
                entity.element.remove();
            }

            return !shouldRemove;
        });
    }
}
