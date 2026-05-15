import { Entity } from "./entity.js";

/**
 * Estado global do jogo
 */
export default class World {
	entities: Entity[] = [];
	score: number = 0;
	lives: number = 3;
	// A cada loop deve ser resetado
	keyboard: { [key: string]: boolean } = {};
}