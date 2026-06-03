import { Entity } from "./entity.js";
import { HasVisualAttachments } from "../components/HasVisualAttachments.js";

/**
 * Estado global do jogo
 */
export class World {
	entities: Entity[] = [];
	score: number = 0;
	lives: number = 3;
	shields: number = 0;
	onGameOver: () => void = () => {};
	// A cada loop deve ser resetado
	keyboard: { [key: string]: boolean } = {};

	gameOver(): void {
		this.onGameOver?.();
	}

	destroyEntity(entity: Entity): void {
        // Remove do DOM se houver elemento HTML
        if ("element" in entity && entity.element) {
            entity.element.remove();
        }
        if ("visualAttachments" in entity) {
            const visualAttachments = (entity as HasVisualAttachments).visualAttachments;
            for (const attachment of visualAttachments) {
                attachment.element.remove();
            }
        }
        
        // Remove da lista de entidades
        this.entities = this.entities.filter(e => e !== entity);
    }
}