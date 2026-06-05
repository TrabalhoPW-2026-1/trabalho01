import { FPS, getCurrentDifficulty, type Difficulty } from "../config.js";
import { World } from "./world.js";
import { Player } from "../entities/player.js";
import { System } from "./system.js";
import { InputSystem } from "../systems/input.js";
import { SpawnSystem } from "../systems/spawn.js";
import { MovementSystem } from "../systems/movement.js";
import { road } from "../road.js";
import { ColisionSystem } from "../systems/colision.js";
import { VisualAttachmentSystem } from "../systems/visualAttachment.js";
import { UISystem } from "../systems/ui.js";
import { InvincibilitySystem } from "../systems/invincibility.js";
import { DeliverySystem } from "../systems/delivery.js";


function getHighScoreKey(difficulty: Difficulty): string {
  return `pizzaHighScore:${difficulty}`;
}

export function getHighScore(difficulty: Difficulty = getCurrentDifficulty()): number {
  return parseInt(localStorage.getItem(getHighScoreKey(difficulty)) ?? "0", 10);
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
    new ColisionSystem(),
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

    const hs = getHighScore();
    document.getElementById("menu-highscore")!.textContent =
      hs > 0 ? `Recorde: ${hs} pts` : "";
    document.getElementById("menu-play")!.textContent = "Continuar";
    document.getElementById("menu")!.style.display = "flex";
    document.getElementById("menu-play")!
      .addEventListener("click", () => this.resume(), { once: true });
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
    const difficulty = getCurrentDifficulty();
    const prev = getHighScore(difficulty);
    const isNew = score > prev;
    if (isNew) localStorage.setItem(getHighScoreKey(difficulty), String(score));

    setTimeout(() => {
      const gameoverEl = document.getElementById("gameover")!;
      const messageEl = document.getElementById("gameover-message")!;
      const scoreEl = document.getElementById("gameover-score")!;
      const restartBtn = document.getElementById("gameover-restart")!;
      const difficultyLabel =
        difficulty === "easy" ? "Fácil" : difficulty === "medium" ? "Médio" : "Difícil";

      messageEl.textContent = isNew ? "🎉 Novo Recorde! 🎉" : "Fim de Jogo";
      scoreEl.innerHTML = `Nível: ${difficultyLabel}<br><br>💰 ${score} pts<br><br>Recorde: ${Math.max(score, prev)} pts`;
      
      gameoverEl.style.display = "flex";

      restartBtn.addEventListener(
        "click",
        () => {
          window.location.reload();
        },
        { once: true }
      );
    }, 300);
  }

  update() {
    for (const system of this.systems) system.update(this.world);
    road.move();
  }
}
