import { PROB_CAR, PROB_BICYCLE, PROB_TURBO, LANE_COUNT } from "../config.js";
import { System } from "../core/system.js";
import { World } from "../core/world.js";
import { Car } from "../entities/car.js";
import { Bicycle } from "../entities/bicycle.js";
import { PizzaBox } from "../entities/pizzabox.js";
import { Customer } from "../entities/customer.js";
import { Turbo } from "../entities/turbo.js";

function randomLane(): number {
  return Math.floor(Math.random() * LANE_COUNT);
}

export class SpawnSystem implements System {
  update(world: World): void {
    if (Math.random() < PROB_CAR) world.entities.push(new Car(randomLane()));
    if (Math.random() < PROB_BICYCLE) world.entities.push(new Bicycle(randomLane()));
    if (Math.random() < PROB_TURBO && world.turboTimeRemaining <= 0) {
      world.entities.push(new Turbo(randomLane()));
    }

    const hasCustomer = world.entities.some(e => e.type === "customer");
    if (!hasCustomer && !world.hasPizza) {
      const side = Math.random() < 0.5 ? "left" : "right";
      world.entities.push(new Customer(side as "left" | "right"));
    }

    const hasPizzaBox = world.entities.some(e => e.type === "pizzabox");
    const currentHasCustomer = world.entities.some(e => e.type === "customer");
    if (!hasPizzaBox && !world.hasPizza && currentHasCustomer) {
      world.entities.push(new PizzaBox(randomLane()));
    }
  }
}
