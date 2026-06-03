import { HasVisualAttachments } from "../components/HasVisualAttachments.js";
import { Entity } from "../core/entity.js";
import { Player } from "../entities/player.js";
import { System } from "../core/system.js";
import { World } from "../core/world.js";

export class VisualAttachmentSystem implements System {
  update(world: World): void {
    for (const entity of world.entities) {
      if (!("position" in entity) || !("visualAttachments" in entity)) continue;

      if (entity instanceof Player) {
        const pizza = entity.visualAttachments.find(a => a.id === "pizza");
        if (pizza) pizza.isVisible = world.hasPizza;
      }

      const ve = entity as Entity & HasVisualAttachments;
      for (const att of ve.visualAttachments) {
        att.element.style.left = `${entity.position.x + att.offset.x}px`;
        att.element.style.top = `${entity.position.y + att.offset.y}px`;
        att.element.style.display = att.isVisible ? "block" : "none";
      }
    }
  }
}
