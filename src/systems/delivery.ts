import { Customer } from "../entities/customer.js";
import { System } from "../core/system.js";
import { World } from "../core/world.js";

const BASE_RATE = 0.5;
const LOG_FACTOR = 0.1;

export class DeliverySystem implements System {
  update(world: World): void {
    if (world.turboTimeRemaining > 0) {
      world.turboTimeRemaining--;
    } else if (world.hasPizza && world.tipTimer > 0) {
      const rate = BASE_RATE * (1 + Math.log(world.score + 1) * LOG_FACTOR);
      world.tipTimer = Math.max(0, world.tipTimer - rate);
    }

    for (const entity of [...world.entities]) {
      if (!(entity instanceof Customer)) continue;

      entity.waitTimer--;
      entity.updateTimerBar();

      if (entity.waitTimer <= 0) {
        if (world.hasPizza) {
          world.hasPizza = false;
          world.tipTimer = 0;
        }
        world.destroyEntity(entity);
      }
    }
  }
}
