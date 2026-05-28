import { HasVisualAttachments } from "../components/HasVisualAttachments.js";
import { Entity } from "../core/entity.js";
import { Player } from "../entities/player.js";
import { System } from "../core/system.js";
import { World } from "../core/world.js";

export class VisualAttachmentSystem implements System {

    update(world: World): void {
		for (const entity of world.entities) {
			if (
				!("position" in entity) ||
				!("visualAttachments" in entity)
			) continue;

			if (entity instanceof Player) {

				const shield = entity.visualAttachments.find(
					attachment => attachment.id === "shield"
				);

				if (shield) {
					shield.isVisible = world.powerupActivate;
				}
			}

			const visualEntity =
				entity as Entity & HasVisualAttachments;

			for (const attachment of visualEntity.visualAttachments) {
				attachment.element.style.left =
					`${entity.position.x + attachment.offset.x}px`;
				attachment.element.style.top =
					`${entity.position.y + attachment.offset.y}px`;

				attachment.element.style.display =
					attachment.isVisible
						? "block"
						: "none";
			}
		}
	}
}