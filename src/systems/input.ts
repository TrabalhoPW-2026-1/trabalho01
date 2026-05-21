import { Player } from "../entities/player.js";
import { System } from "../core/system.js";
import { World } from "../core/world.js";

export class InputSystem implements System {

  update(world: World): void {
    const ship = world.entities.find(
      entity => entity instanceof Player
    ) as Player | undefined;

    if (!ship) return;

    ship.velocity.x = 0;
	const [left, right] = [world.keyboard["ArrowLeft"], world.keyboard["ArrowRight"]];
	if ((left && right) || (!left && !right)) {
		ship.setDirection(1);
		ship.velocity.x = 0;
	}
	ship.velocity.x = left ? -3 : right ? 3 : 0;
	ship.setDirection(left ? 0 :  2);
  }
}