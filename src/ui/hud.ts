class HUD {

    root: HTMLDivElement;

    scoreElement: HTMLDivElement;
    livesElement: HTMLDivElement;

    constructor() {
        this.root = document.createElement("div");

        this.root.id = "hud";

        this.scoreElement = document.createElement("div");
        this.livesElement = document.createElement("div");

        this.livesElement.classList.add("lives-container");

        this.root.appendChild(this.livesElement);
        this.root.appendChild(this.scoreElement);

        const space = document.getElementById("space")!;
        space.appendChild(this.root);
    }

    setScore(score: number) {
        this.scoreElement.innerHTML =
            `<img src="assets/png/coin.png"> ${score}`;
    }

    setLives(lives: number) {
        this.livesElement.innerHTML = "";

        for (let i = 0; i < lives; i++) {

            const heart = document.createElement("img");

            heart.src = "assets/png/heart.png";
            heart.classList.add("heart");

            this.livesElement.appendChild(heart);
        }
    }
}

export const hud = new HUD();