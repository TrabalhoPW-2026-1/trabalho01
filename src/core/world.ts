import { Entity } from "./entity.js";
import { HasVisualAttachments } from "../components/HasVisualAttachments.js";

export class World {
  entities: Entity[] = [];
  score: number = 0;
  hasPizza: boolean = false;
  tipTimer: number = 0;
  turboTimeRemaining: number = 0;
  keyboard: { [key: string]: boolean } = {};
  onGameOver: () => void = () => {};

  gameOver(): void {
    this.onGameOver();
  }

  destroyEntity(entity: Entity): void {
    entity.element.remove();
    if ("visualAttachments" in entity) {
      for (const a of (entity as HasVisualAttachments).visualAttachments) {
        a.element.remove();
      }
    }
    if ("alertElement" in entity) {
      ((entity as unknown) as { alertElement: HTMLElement }).alertElement.remove();
    }
    this.entities = this.entities.filter(e => e !== entity);
  }
}
