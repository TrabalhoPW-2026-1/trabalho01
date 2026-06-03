import { Game, getHighScore } from "./core/game.js";

function showMenu(): void {
  const menu = document.getElementById("menu")!;
  const highScoreEl = document.getElementById("menu-highscore")!;
  const playBtn = document.getElementById("menu-play")!;

  const hs = getHighScore();
  highScoreEl.textContent = hs > 0 ? `Recorde: ${hs} pts` : "";
  menu.style.display = "flex";

  playBtn.addEventListener(
    "click",
    () => {
      menu.style.display = "none";
      const game = new Game();
      game.start();
    },
    { once: true }
  );
}

showMenu();
