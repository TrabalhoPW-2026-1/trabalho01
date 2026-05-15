import { World } from "./world.js";

/**
 * Assinatura geral para sistemas
 */
export interface System {
	update(world: World): void
}