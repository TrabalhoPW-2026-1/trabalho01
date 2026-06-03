import { MAX_TIP_TIMER } from "../config.js";

class HUD {
  root: HTMLDivElement;
  scoreEl: HTMLDivElement;
  livesEl: HTMLDivElement;
  tipTimerEl: HTMLDivElement;
  turboEl: HTMLDivElement;

  constructor() {
    this.root = document.createElement("div");
    this.root.id = "hud";

    this.livesEl = document.createElement("div");
    this.livesEl.classList.add("lives-container");

    this.tipTimerEl = document.createElement("div");
    this.tipTimerEl.classList.add("tip-timer");
    this.tipTimerEl.style.display = "none";

    this.turboEl = document.createElement("div");
    this.turboEl.classList.add("turbo-indicator");
    this.turboEl.textContent = "⚡ TURBO";
    this.turboEl.style.display = "none";

    this.scoreEl = document.createElement("div");

    this.root.appendChild(this.livesEl);
    this.root.appendChild(this.tipTimerEl);
    this.root.appendChild(this.turboEl);
    this.root.appendChild(this.scoreEl);

    document.getElementById("road")!.appendChild(this.root);
  }

  setScore(score: number) {
    this.scoreEl.innerHTML = `💰 ${score} pts`;
  }

  setLives(lives: number) {
    this.livesEl.innerHTML = "";
    for (let i = 0; i < lives; i++) {
      const h = document.createElement("span");
      h.textContent = "❤️";
      h.style.fontSize = "22px";
      this.livesEl.appendChild(h);
    }
  }

  setTipTimer(timer: number, hasPizza: boolean) {
    if (!hasPizza) {
      this.tipTimerEl.style.display = "none";
      return;
    }

    this.tipTimerEl.style.display = "flex";
    const pct = timer / MAX_TIP_TIMER;
    const tip = Math.max(10, Math.round(pct * 100));
    const color = pct > 0.5 ? "#00cc44" : pct > 0.25 ? "#ffcc00" : "#ff3333";

    this.tipTimerEl.innerHTML = `
      <span>🍕 gorjeta: ${tip} pts</span>
      <div class="tip-bar-bg">
        <div class="tip-bar" style="width:${pct * 100}%; background:${color}"></div>
      </div>
    `;
  }

  setTurbo(active: boolean) {
    this.turboEl.style.display = active ? "block" : "none";
  }
}

export const hud = new HUD();
