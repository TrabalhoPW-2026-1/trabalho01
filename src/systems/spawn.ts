import { PROB_OBSTACLE, PROB_COIN, PROB_POWERUP } from "../config.js";
import { System } from "../core/system.js";
import { World } from "../core/world.js";
import { Obstacle } from "../entities/obstacle.js";
import { Coin } from "../entities/coin.js";
import { PowerUp } from "../entities/powerup.js";

export class SpawnSystem implements System {

    update(world: World): void {
        if (Math.random() < PROB_OBSTACLE) world.entities.push(new Obstacle());
        if (Math.random() < PROB_COIN) this.spawnCoins(world);
        if (Math.random() < PROB_POWERUP) this.spawnPowerUp(world);
    }

    private spawnCoins(world: World): void {
        const numCoins = Math.floor(Math.random() * 3) + 2; // Spawn 2 to 4 coins
        const x = Math.random() * (document.documentElement.clientWidth - 30); // Random x position, accounting for coin width
        const coinHeight = 30;
        const spacing = 20;
        
        let y = -coinHeight; // Start above the screen
        for (let i = 0; i < numCoins; i++) {
            world.entities.push(new Coin(x, y));
            console.log(`Spawned coin at (${x}, ${y})`);
            y -= (coinHeight + spacing);
        }
    }

    private spawnPowerUp(world: World): void {
        // Só spawna caso o player não esteja com o powerup ativo
        if (!world.powerupActivate) {
            const x = Math.random() * (document.documentElement.clientWidth - 40);
            const powerupHeight = 40;
            
            let y = -powerupHeight;
            world.entities.push(new PowerUp(x, y));
        }
    }
}