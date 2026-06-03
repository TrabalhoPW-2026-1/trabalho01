import { Entity } from "../core/entity.js";
import { System } from "../core/system.js";
import { World } from "../core/world.js";
import { HasCollision } from "../components/HasCollision.js";
import { Player } from "../entities/player.js";
import { Customer } from "../entities/customer.js";
import { MAX_TIP_TIMER } from "../config.js";

export class CollisionSystem implements System {
  update(world: World): void {
    const collidables = world.entities.filter(
      e => "hitbox" in e
    ) as (Entity & HasCollision)[];

    const player = collidables.find(e => e instanceof Player) as Player | undefined;
    if (!player) return;

    for (const other of collidables) {
      if (other === player) continue;

      switch (other.type) {
        case "car":
        case "bicycle":
          if (this.overlaps(player, other)) {
            world.destroyEntity(other);
            world.gameOver();
            return;
          }
          break;

        case "pizzabox":
          if (!world.hasPizza && this.overlaps(player, other)) {
            world.hasPizza = true;
            world.tipTimer = MAX_TIP_TIMER;
            world.destroyEntity(other);
          }
          break;

        case "customer":
          if (world.hasPizza && !player.switching) {
            this.checkDelivery(player, other as Customer, world);
          }
          break;

        case "turbo":
          if (this.overlaps(player, other)) {
            world.turboTimeRemaining = 300;
            world.destroyEntity(other);
          }
          break;
      }
    }
  }

  private overlaps(a: Entity & HasCollision, b: Entity & HasCollision): boolean {
    return (
      a.position.x < b.position.x + b.hitbox.width &&
      a.position.x + a.hitbox.width > b.position.x &&
      a.position.y < b.position.y + b.hitbox.height &&
      a.position.y + a.hitbox.height > b.position.y
    );
  }

  private checkDelivery(player: Player, customer: Customer, world: World): void {
    const laneMatch =
      (customer.side === "left" && player.lane === 0) ||
      (customer.side === "right" && player.lane === 2);
    if (!laneMatch) return;

    const playerBottom = player.position.y + player.hitbox.height;
    const playerTop = player.position.y;
    const customerTop = customer.position.y;
    const customerBottom = customer.position.y + customer.hitbox.height;
    if (playerBottom < customerTop || playerTop > customerBottom) return;

    const tip = Math.max(10, Math.floor((world.tipTimer / MAX_TIP_TIMER) * 100));
    world.score += tip;
    world.hasPizza = false;
    world.tipTimer = 0;
    world.destroyEntity(customer);
  }
}
