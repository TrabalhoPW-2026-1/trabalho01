import { LANE_SWITCH_FRAMES, TAMY } from "../config.js";
import { Bicycle } from "../entities/bicycle.js";
import { Player } from "../entities/player.js";
import { System } from "../core/system.js";
import { World } from "../core/world.js";

function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

export class MovementSystem implements System {
  update(world: World): void {
    for (const entity of world.entities) {
      if (!("position" in entity) || !("velocity" in entity)) continue;

      if (entity instanceof Player) {
        this.updatePlayer(entity);
        continue;
      }

      if (entity instanceof Bicycle) {
        this.updateBicycle(entity);
        entity.position.y += entity.velocity.y;
      } else {
        entity.position.x += entity.velocity.x;
        entity.position.y += entity.velocity.y;
      }

      if ("element" in entity) {
        entity.element.style.left = `${entity.position.x}px`;
        entity.element.style.top = `${entity.position.y}px`;
      }
    }

    world.entities = world.entities.filter(entity => {
      if (entity.type === "player" || entity.type === "customer") return true;

      const offBottom = entity.position.y > TAMY + 60;
      if (offBottom) {
        entity.element.remove();
        if ("alertElement" in entity) {
          ((entity as unknown) as { alertElement: HTMLElement }).alertElement.remove();
        }
        return false;
      }
      return true;
    });
  }

  private updatePlayer(player: Player): void {
    if (player.switching) {
      player.driftProgress = Math.min(1, player.driftProgress + 1 / LANE_SWITCH_FRAMES);
      const eased = easeInOut(player.driftProgress);
      const toX = player.getLaneX(player.targetLane);
      player.position.x = player.fromX + (toX - player.fromX) * eased;

      const dir = player.targetLane - player.fromLane;
      const tilt = dir * 25 * Math.sin(player.driftProgress * Math.PI);
      player.element.style.transform = `rotate(${tilt}deg)`;

      if (player.driftProgress >= 1) {
        player.lane = player.targetLane;
        player.switching = false;
        player.position.x = player.getLaneX(player.lane);
        player.element.style.transform = "";
      }
    } else {
      player.position.x = player.getLaneX(player.lane);
    }

    player.element.style.left = `${player.position.x}px`;
    player.element.style.top = `${player.position.y}px`;
  }

  private updateBicycle(bicycle: Bicycle): void {
    bicycle.element.style.left = `${bicycle.position.x}px`;
    bicycle.element.style.top = `${bicycle.position.y}px`;
  }
}
