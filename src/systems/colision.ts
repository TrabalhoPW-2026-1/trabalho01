import { Entity } from "../core/entity.js";
import { System } from "../core/system.js";
import { World } from "../core/world.js";
import { HasCollision } from "../components/HasCollision.js";
import { Player } from "../entities/player.js";
import { Customer } from "../entities/customer.js";
import { MAX_TIP_TIMER } from "../config.js";

export class ColisionSystem implements System {
  update(world: World): void {
    const collidables = world.entities.filter(
      e => "hitbox" in e
    ) as (Entity & HasCollision)[];

    const player = collidables.find(e => e instanceof Player) as Player | undefined;
    if (!player) return;

    for (const other of collidables) {
      if (other === player) continue;
      if (!this.overlaps(player, other)) continue;

      switch (other.type) {
        case "car":
        case "bicycle":
          this.handleObstacleHit(player, other, world);
          break;
        case "pizzabox":
          if (!world.hasPizza) {
            world.hasPizza = true;
            world.tipTimer = MAX_TIP_TIMER;
            world.destroyEntity(other);
          }
          break;
        case "customer":
          if (world.hasPizza) {
            this.handleDelivery(other as Customer, world);
          }
          break;
        case "turbo":
          world.turboTimeRemaining = 300;
          world.destroyEntity(other);
          break;
        case "helmet":
          world.lives += 1;
          world.destroyEntity(other);
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

  private handleObstacleHit(player: Player, entity: Entity, world: World): void {
    if (player.activateInvincibility) return;

    if (world.hasPizza) {
      world.hasPizza = false;
      world.tipTimer = 0;
    }

    world.lives -= 1;
    player.setInvencibility();
    world.destroyEntity(entity);

    if (world.lives <= 0) world.gameOver();
  }

  private handleDelivery(customer: Customer, world: World): void {
    const tip = Math.max(10, Math.round((world.tipTimer / MAX_TIP_TIMER) * 100));
    world.score += tip;
    world.hasPizza = false;
    world.tipTimer = 0;
    world.destroyEntity(customer);
  }
}
