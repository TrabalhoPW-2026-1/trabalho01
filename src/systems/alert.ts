import { System } from "../core/system.js";
import { World } from "../core/world.js";

export class AlertSystem implements System {
  update(world: World): void {
    for (const entity of world.entities) {
      if (!("alertTimer" in entity) || !("alertElement" in entity)) continue;
      const e = entity as unknown as {
        alertTimer: number;
        alertElement: HTMLElement;
        position: { x: number; y: number };
        size: { width: number; height: number };
      };

      if (e.alertTimer > 0) {
        e.alertTimer--;
        e.alertElement.style.display = "block";
        e.alertElement.style.left = `${e.position.x + e.size.width / 2 - 11}px`;
        e.alertElement.style.top = `${e.position.y - 28}px`;
        e.alertElement.style.opacity = Math.floor(e.alertTimer / 5) % 2 === 0 ? "1" : "0.2";
      } else {
        e.alertElement.style.display = "none";
      }
    }
  }
}
