import { TAMY } from "../config.js";
import { System } from "../core/system.js";
import { World } from "../core/world.js";

export class MovementSystem implements System {
    update(world: World) {
        for (const entity of world.entities) {
            if (!("position" in entity ) || !("velocity" in entity )) continue

            entity.position.x += entity.velocity.x;
            entity.position.y += entity.velocity.y;

            if ("element" in entity) {
                entity.element.style.left = `${entity.position.x}px`;
                entity.element.style.top = `${entity.position.y}px`;
            }
        }

        world.entities = world.entities.filter((entity) => {
            if (!("position" in entity)) return true;

            const shouldKeep = entity.position.y <= TAMY;
            if (!shouldKeep && "element" in entity) {
                entity.element.remove();
            }

            return shouldKeep;
        });
    }
}