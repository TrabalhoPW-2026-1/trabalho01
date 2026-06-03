import { PROB_OBSTACLE, PROB_UFO, PROB_COIN, PROB_POWERUP, PROB_LIFEUP } from "../config.js";
import { System } from "../core/system.js";
import { World } from "../core/world.js";
import { Obstacle } from "../entities/obstacle.js";
import { UFO } from "../entities/ufo.js";
import { Coin } from "../entities/coin.js";
import { PowerUp } from "../entities/powerup.js";
import { LifeUp } from "../entities/lifeup.js";

export class SpawnSystem implements System {

    update(world: World): void {
        if (Math.random() < PROB_OBSTACLE) world.entities.push(new Obstacle());
        if (Math.random() < PROB_UFO) world.entities.push(new UFO());
        if (Math.random() < PROB_COIN) this.spawnCoins(world);
        if (Math.random() < PROB_POWERUP) this.spawnPowerUp(world);
        if (Math.random() < PROB_LIFEUP) this.spawnLifeUp(world);
    }

    private spawnCoins(world: World): void {
        const numCoins = Math.floor(Math.random() * 3) + 2;
        const x = Math.random() * (document.documentElement.clientWidth - 30);
        const coinHeight = 30;
        const spacing = 20;

        let y = -coinHeight;
        for (let i = 0; i < numCoins; i++) {
            world.entities.push(new Coin(x, y));
            y -= (coinHeight + spacing);
        }
    }

    private spawnPowerUp(world: World): void {
        if (world.shields < 3) {
            const x = Math.random() * (document.documentElement.clientWidth - 40);
            world.entities.push(new PowerUp(x, -40));
        }
    }

    private spawnLifeUp(world: World): void {
        const x = Math.random() * (document.documentElement.clientWidth - 40);
        world.entities.push(new LifeUp(x, -40));
    }
}
