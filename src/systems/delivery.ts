import { Customer } from "../entities/customer.js";
import { System } from "../core/system.js";
import { World } from "../core/world.js";

export class DeliverySystem implements System {
  update(world: World): void {
    if (world.hasPizza && world.tipTimer > 0) {
      world.tipTimer--;
    }

    if (world.turboTimeRemaining > 0) {
      world.turboTimeRemaining--;
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
