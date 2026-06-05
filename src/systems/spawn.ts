import { PROB_CAR, PROB_BICYCLE, PROB_TURBO, PROB_HELMET } from "../config.js";
import { System } from "../core/system.js";
import { World } from "../core/world.js";
import { Car, CAR_NUM_LANES } from "../entities/car.js";
import { Bicycle } from "../entities/bicycle.js";
import { PizzaBox } from "../entities/pizzabox.js";
import { Customer } from "../entities/customer.js";
import { Turbo } from "../entities/turbo.js";
import { Helmet } from "../entities/helmet.js";

export class SpawnSystem implements System {
  update(world: World): void {
    if (Math.random() < PROB_CAR) {
      const cars = world.entities.filter(e => e.type === "car") as Car[];
      const occupied = new Set(cars.filter(c => c.position.y < 120).map(c => c.lane));
      const free = Array.from({ length: CAR_NUM_LANES }, (_, i) => i).filter(l => !occupied.has(l));
      if (free.length > 0) {
        const lane = free[Math.floor(Math.random() * free.length)];
        world.entities.push(new Car(lane));
      }
    }
    if (Math.random() < PROB_BICYCLE) world.entities.push(new Bicycle());
    if (Math.random() < PROB_TURBO && world.turboTimeRemaining <= 0) {
      world.entities.push(new Turbo());
    }
    if (Math.random() < PROB_HELMET) world.entities.push(new Helmet());

    const hasCustomer = world.entities.some(e => e.type === "customer");
    const hasPizzaBox = world.entities.some(e => e.type === "pizzabox");

    if (world.hasPizza && !hasCustomer) {
      world.entities.push(new Customer());
    }

    if (!world.hasPizza && !hasPizzaBox) {
      world.entities.push(new PizzaBox());
    }
  }
}
