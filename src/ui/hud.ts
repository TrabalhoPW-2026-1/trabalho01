import { MAX_TIP_TIMER, REST_PNG_PATH } from "../config.js";

class HUD {
  root: HTMLDivElement;
  scoreEl: HTMLDivElement;
  livesEl: HTMLDivElement;
  tipTimerEl: HTMLDivElement;
  turboEl: HTMLDivElement;
  helmetEl: HTMLDivElement;

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

    this.helmetEl = document.createElement("div");
    this.helmetEl.classList.add("helmet-indicator");
    const helmetImg = document.createElement("img");
    helmetImg.src = `${REST_PNG_PATH}/helmetPowerUp.png`;
    helmetImg.alt = "helmet";
    helmetImg.style.width = "20px";
    helmetImg.style.height = "20px";
    this.helmetEl.appendChild(helmetImg);
    const helmetText = document.createElement("span");
    helmetText.textContent = "Capacete na cabeça!";
    helmetText.style.marginLeft = "6px"
    this.helmetEl.appendChild(helmetText);

    this.helmetEl.style.display = "none";

    this.scoreEl = document.createElement("div");
    this.scoreEl.classList.add("score-container");

    this.root.appendChild(this.livesEl);
    this.root.appendChild(this.tipTimerEl);
    this.root.appendChild(this.turboEl);
    this.root.appendChild(this.helmetEl);
    this.root.appendChild(this.scoreEl);

    document.getElementById("road")!.appendChild(this.root);
  }

  setScore(score: number) {
    this.scoreEl.innerHTML = "";
    this.scoreEl.appendChild(this.createIcon(`${REST_PNG_PATH}/moneyBag.png`, "dinheiro"));
    const text = document.createElement("span");
    text.textContent = ` ${score} pts`;
    this.scoreEl.appendChild(text);
  }

  setLives(lives: number) {
    this.livesEl.innerHTML = "";
    for (let i = 0; i < lives; i++) {
      const img = this.createIcon(`${REST_PNG_PATH}/heart.png`, "vida");
      img.style.width = "22px";
      img.style.height = "22px";
      this.livesEl.appendChild(img);
    }
  }

  private createIcon(src: string, alt: string): HTMLImageElement {
    const img = document.createElement("img");
    img.src = src;
    img.alt = alt;
    img.style.display = "inline-block";
    img.style.verticalAlign = "middle";
    img.style.width = "20px";
    img.style.height = "20px";
    img.style.marginRight = "6px";
    return img;
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
      <span>Gorjeta: ${tip} pts</span>
      <div class="tip-bar-bg">
        <div class="tip-bar" style="width:${pct * 100}%; background:${color}"></div>
      </div>
    `;
  }

  setTurbo(active: boolean) {
    this.turboEl.style.display = active ? "block" : "none";
  }

  setHelmet(active: boolean) {
    this.helmetEl.style.display = active ? "block" : "none";
  }
}

export const hud = new HUD();
