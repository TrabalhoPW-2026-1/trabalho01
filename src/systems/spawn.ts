import { PROB_OBSTACLE } from "../config.js";
import { System } from "../core/system.js";
import { World } from "../core/world.js";
import { Obstacle } from "../entities/obstacle.js";

export class SpawnSystem implements System {

    update(world: World): void {
        if (Math.random() < PROB_OBSTACLE) world.entities.push(new Obstacle());
    }
}