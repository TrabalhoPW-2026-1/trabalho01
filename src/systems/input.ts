import { Player } from "../entities/player.js";
import { System } from "../core/system.js";
import { World } from "../core/world.js";

export class InputSystem implements System {

  update(world: World): void {
    const ship = world.entities.find(
      entity => entity instanceof Player
    ) as Player | undefined;

    if (!ship) return;

    const left  = world.keyboard["ArrowLeft"];
    const right = world.keyboard["ArrowRight"];
    const up    = world.keyboard["ArrowUp"];
    const down  = world.keyboard["ArrowDown"];

    if ((left && right) || (!left && !right)) {
      ship.velocity.x = 0;
      ship.setDirection(1);
    } else {
      ship.velocity.x = left ? -3 : 3;
      ship.setDirection(left ? 0 : 2);
    }

    ship.velocity.y = up ? -3 : down ? 3 : 0;
  }
}
