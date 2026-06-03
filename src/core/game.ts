import { FPS } from "../config.js"
import { World } from "./world.js"
import { Player } from "../entities/player.js"
import { System } from "./system.js"
import { InputSystem } from "../systems/input.js"
import { SpawnSystem } from "../systems/spawn.js"
import { MovementSystem } from "../systems/movement.js"
import { space } from "../space.js"
import { ColisionSystem } from "../systems/colision.js"
import { VisualAttachmentSystem } from "../systems/visualAttachment.js"
import { UISystem } from "../systems/ui.js";
import { InvincibilitySystem } from "../systems/invincibility.js"

const HIGH_SCORE_KEY = 'highScore';

export function getHighScore(): number {
    return parseInt(localStorage.getItem(HIGH_SCORE_KEY) ?? '0', 10);
}

export class Game {
  private world: World = new World();
  private intervalo: number | undefined;
  private paused = false;

  private systems: System[] = [
    new InputSystem(),
    new SpawnSystem(),
    new MovementSystem(),
    new VisualAttachmentSystem(),
    new ColisionSystem(),
    new UISystem(),
    new InvincibilitySystem()
  ];

  constructor() {
    const player = new Player();
    this.world.entities.push(player);

    this.world.onGameOver = () => this.stop();
  }

  start() {
    this.intervalo = setInterval(() => { this.update(); }, 500 / FPS);

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.paused ? this.resume() : this.pause();
        return;
      }
      this.world.keyboard[e.key] = true;
    });

    window.addEventListener("keyup", (e) => {
      this.world.keyboard[e.key] = false;
    });
  }

  pause(): void {
    if (!this.intervalo) return;
    clearInterval(this.intervalo);
    this.intervalo = undefined;
    this.paused = true;

    const menu = document.getElementById("menu")!;
    const playBtn = document.getElementById("menu-play")!;
    const highScoreEl = document.getElementById("menu-highscore")!;

    const hs = getHighScore();
    highScoreEl.textContent = hs > 0 ? `Recorde: ${hs} moedas` : '';
    playBtn.textContent = "Continuar";
    menu.style.display = "flex";

    playBtn.addEventListener("click", () => this.resume(), { once: true });
  }

  resume(): void {
    if (!this.paused) return;
    const menu = document.getElementById("menu")!;
    const playBtn = document.getElementById("menu-play")!;

    menu.style.display = "none";
    playBtn.textContent = "Jogar";
    this.paused = false;
    this.intervalo = setInterval(() => { this.update(); }, 500 / FPS);
  }

  stop(): void {
    if (this.intervalo) {
      clearInterval(this.intervalo);
      this.intervalo = undefined;
    }
    this.paused = false;

    const score = this.world.score;
    const prev = getHighScore();
    const isNewRecord = score > prev;

    if (isNewRecord) {
      localStorage.setItem(HIGH_SCORE_KEY, String(score));
    }

    setTimeout(() => {
      const msg = isNewRecord
        ? `Game Over! Novo recorde: ${score} moedas!`
        : `Game Over! Pontuação: ${score} moedas. Recorde: ${Math.max(score, prev)}.`;
      alert(msg);
      window.location.reload();
    }, 300);
  }

  update() {
    for (const system of this.systems) {
      system.update(this.world);
    }
    space.move();
  }
}
