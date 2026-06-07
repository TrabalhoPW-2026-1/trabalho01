import { TAMX, TAMY } from "../config.js";
import { Player } from "../entities/player.js";
import { System } from "../core/system.js";
import { World } from "../core/world.js";

export class MovementSystem implements System {
  update(world: World): void {
    for (const entity of world.entities) {
      if (!("position" in entity) || !("velocity" in entity)) continue;

      entity.position.x += entity.velocity.x;
      entity.position.y += entity.velocity.y;

      if (entity instanceof Player) {
        if (entity.position.x + entity.size.width < 0) {
          entity.position.x = TAMX;
        } else if (entity.position.x > TAMX) {
          entity.position.x = -entity.size.width;
        }
        entity.position.y = Math.max(
          0,
          Math.min(TAMY - entity.size.height, entity.position.y)
        );
      }

      if ("element" in entity) {
        entity.element.style.left = `${entity.position.x}px`;
        entity.element.style.top = `${entity.position.y}px`;

      }
    }

    world.entities = world.entities.filter(entity => {
      if (entity.type === "player" || entity.type === "customer") return true;

      const w = entity.size?.width ?? 0;
      const offBottom = entity.position.y > TAMY + 80;
      const offLeft = entity.position.x + w < -130;
      const offRight = entity.position.x > TAMX + 130;

      if (offBottom || offLeft || offRight) {
        entity.element.remove();
        return false;
      }
      return true;
    });
  }
}
