import { Player } from "../entities/player.js";
import { System } from "../core/system.js";
import { World } from "../core/world.js";

export class InputSystem implements System {
  private prevLeft = false;
  private prevRight = false;

  update(world: World): void {
    const moto = world.entities.find(e => e instanceof Player) as Player | undefined;
    if (!moto) return;

    const left = !!world.keyboard["ArrowLeft"];
    const right = !!world.keyboard["ArrowRight"];

    if (left && !this.prevLeft && !moto.switching) {
      moto.startSwitch(-1);
    }
    if (right && !this.prevRight && !moto.switching) {
      moto.startSwitch(1);
    }

    this.prevLeft = left;
    this.prevRight = right;
  }
}
