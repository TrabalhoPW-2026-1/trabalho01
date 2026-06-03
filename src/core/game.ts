import { FPS } from "../config.js";
import { World } from "./world.js";
import { Player } from "../entities/player.js";
import { System } from "./system.js";
import { InputSystem } from "../systems/input.js";
import { SpawnSystem } from "../systems/spawn.js";
import { MovementSystem } from "../systems/movement.js";
import { CollisionSystem } from "../systems/collision.js";
import { VisualAttachmentSystem } from "../systems/visualAttachment.js";
import { InvincibilitySystem } from "../systems/invincibility.js";
import { DeliverySystem } from "../systems/delivery.js";
import { UISystem } from "../systems/ui.js";
import { road } from "../road.js";

const HIGH_SCORE_KEY = "pizzaHighScore";

export function getHighScore(): number {
  return parseInt(localStorage.getItem(HIGH_SCORE_KEY) ?? "0", 10);
}

export class Game {
  private world: World = new World();
  private interval: number | undefined;
  private paused = false;

  private systems: System[] = [
    new InputSystem(),
    new SpawnSystem(),
    new MovementSystem(),
    new VisualAttachmentSystem(),
    new CollisionSystem(),
    new DeliverySystem(),
    new UISystem(),
    new InvincibilitySystem(),
  ];

  constructor() {
    this.world.entities.push(new Player());
    this.world.onGameOver = () => this.stop();
  }

  start() {
    this.interval = setInterval(() => this.update(), 1000 / FPS);

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
    if (!this.interval) return;
    clearInterval(this.interval);
    this.interval = undefined;
    this.paused = true;

    const menu = document.getElementById("menu")!;
    const playBtn = document.getElementById("menu-play")!;
    const hs = getHighScore();
    document.getElementById("menu-highscore")!.textContent =
      hs > 0 ? `Recorde: ${hs} pts` : "";
    playBtn.textContent = "Continuar";
    menu.style.display = "flex";
    playBtn.addEventListener("click", () => this.resume(), { once: true });
  }

  resume(): void {
    if (!this.paused) return;
    document.getElementById("menu")!.style.display = "none";
    document.getElementById("menu-play")!.textContent = "Jogar";
    this.paused = false;
    this.interval = setInterval(() => this.update(), 1000 / FPS);
  }

  stop(): void {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = undefined;
    }

    const score = this.world.score;
    const prev = getHighScore();
    const isNew = score > prev;
    if (isNew) localStorage.setItem(HIGH_SCORE_KEY, String(score));

    setTimeout(() => {
      const msg = isNew
        ? `Game Over! Novo recorde: ${score} pts!`
        : `Game Over! Gorjetas: ${score} pts. Recorde: ${Math.max(score, prev)} pts.`;
      alert(msg);
      window.location.reload();
    }, 300);
  }

  update() {
    for (const system of this.systems) system.update(this.world);
    road.move();
  }
}
