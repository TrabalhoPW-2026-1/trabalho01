export const FPS = 100;
export const TAMX = Math.min(document.documentElement.clientWidth, 800);
export const TAMY = document.documentElement.clientHeight;
export const PLAYER_PNG_PATH = "assets/png/Motorcyle_and_Visual_Attachments"
export const OBSTACLES_PNG_PATH = "assets/png/Obstacles"
export const REST_PNG_PATH = "assets/png/PoweUps_and_HUD"

export type Difficulty = "easy" | "medium" | "hard";

type DifficultySettings = {
	roadSpeed: number;
	probCar: number;
	probBicycle: number;
	probTurbo: number;
	probHelmet: number;
	maxTipTimer: number;
	customerWaitTime: number;
	invincibilityTime: number;
};

const DIFFICULTY_SETTINGS: Record<Difficulty, DifficultySettings> = {
	easy: {
		roadSpeed: 2,
		probCar: 0.006,
		probBicycle: 0.002,
		probTurbo: 0.00045,
		probHelmet: 0.00045,
		maxTipTimer: 650,
		customerWaitTime: 1000,
		invincibilityTime: 340,
	},
	medium: {
		roadSpeed: 2.5,
		probCar: 0.008,
		probBicycle: 0.003,
		probTurbo: 0.0005,
		probHelmet: 0.0005,
		maxTipTimer: 600,
		customerWaitTime: 900,
		invincibilityTime: 300,
	},
	hard: {
		roadSpeed: 3,
		probCar: 0.011,
		probBicycle: 0.0045,
		probTurbo: 0.0007,
		probHelmet: 0.0007,
		maxTipTimer: 540,
		customerWaitTime: 780,
		invincibilityTime: 260,
	},
};

export let PROB_CAR = DIFFICULTY_SETTINGS.easy.probCar;
export let PROB_BICYCLE = DIFFICULTY_SETTINGS.easy.probBicycle;
export let PROB_TURBO = DIFFICULTY_SETTINGS.easy.probTurbo;
export let PROB_HELMET = DIFFICULTY_SETTINGS.easy.probHelmet;
export let ROAD_SPEED = DIFFICULTY_SETTINGS.easy.roadSpeed;

export let MAX_TIP_TIMER = DIFFICULTY_SETTINGS.easy.maxTipTimer;
export let CUSTOMER_WAIT_TIME = DIFFICULTY_SETTINGS.easy.customerWaitTime;
export let INVINCIBILITY_TIME = DIFFICULTY_SETTINGS.easy.invincibilityTime;
let CURRENT_DIFFICULTY: Difficulty = "easy";

export function getCurrentDifficulty(): Difficulty {
	return CURRENT_DIFFICULTY;
}

export function setDifficulty(difficulty: Difficulty): DifficultySettings {
	const settings = DIFFICULTY_SETTINGS[difficulty];
	CURRENT_DIFFICULTY = difficulty;

	PROB_CAR = settings.probCar;
	PROB_BICYCLE = settings.probBicycle;
	PROB_TURBO = settings.probTurbo;
	PROB_HELMET = settings.probHelmet;
	ROAD_SPEED = settings.roadSpeed;
	MAX_TIP_TIMER = settings.maxTipTimer;
	CUSTOMER_WAIT_TIME = settings.customerWaitTime;
	INVINCIBILITY_TIME = settings.invincibilityTime;
    

	return settings;
}
