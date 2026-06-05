import { System } from "../core/system.js";
import { World } from "../core/world.js";
import { audio } from "../audio.js";

const CAR_WARN_X = 70;
const CAR_WARN_Y = 200;
const BIKE_WARN_X = 200;
const BIKE_WARN_Y = 70;

export class AudioSystem implements System {
  private warned = new Set<object>();

  update(world: World): void {
    const player = world.entities.find(e => e.type === "player");
    if (!player) return;

    const px = player.position.x + player.size.width / 2;
    const py = player.position.y + player.size.height / 2;

    for (const e of world.entities) {
      if (e.type !== "car" && e.type !== "bicycle") continue;

      const ex = e.position.x + e.size.width / 2;
      const ey = e.position.y + e.size.height / 2;
      const dx = Math.abs(ex - px);
      const dy = py - ey;

      let inDanger = false;
      if (e.type === "car") {
        inDanger = dx < CAR_WARN_X && dy > 0 && dy < CAR_WARN_Y;
      } else {
        const movingToward = (e.velocity.x > 0 && ex < px) || (e.velocity.x < 0 && ex > px);
        inDanger = dx < BIKE_WARN_X && Math.abs(dy) < BIKE_WARN_Y && movingToward;
      }

      if (inDanger && !this.warned.has(e)) {
        this.warned.add(e);
        e.type === "car" ? audio.playCarWarning() : audio.playBikeWarning();
      } else if (!inDanger) {
        this.warned.delete(e);
      }


    }

    // Remove stale warned entries
    for (const e of this.warned) {
      if (!world.entities.includes(e as any)) this.warned.delete(e);
    }
  }
}
