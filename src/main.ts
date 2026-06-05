import { Game, getHighScore } from "./core/game.js";
import { setDifficulty, type Difficulty } from "./config.js";

function showMenu(): void {
  const menu = document.getElementById("menu")!;
  const highScoreEl = document.getElementById("menu-highscore")!;
  const playBtn = document.getElementById("menu-play")!;
  const difficultyInputs = Array.from(
    document.querySelectorAll<HTMLInputElement>('input[name="difficulty"]')
  );

  const getSelectedDifficulty = (): Difficulty => {
    const selected = difficultyInputs.find(input => input.checked)?.value ?? "easy";
    return selected as Difficulty;
  };

  const refreshHighScoreLabel = (): void => {
    const hs = getHighScore(getSelectedDifficulty());
    highScoreEl.textContent = hs > 0 ? `Recorde: ${hs} pts` : "";
  };

  setDifficulty(getSelectedDifficulty());
  refreshHighScoreLabel();

  for (const input of difficultyInputs) {
    input.addEventListener("change", () => {
      setDifficulty(getSelectedDifficulty());
      refreshHighScoreLabel();
    });
  }

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
