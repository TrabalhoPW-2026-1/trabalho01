import { System } from "../core/system.js";
import { World } from "../core/world.js";
import { hud } from "../ui/hud.js";

export class UISystem implements System {
  update(world: World): void {
    hud.setScore(world.score);
    hud.setLives(world.lives);
    hud.setTipTimer(world.tipTimer, world.hasPizza);
    hud.setTurbo(world.turboTimeRemaining > 0);
  }
}
