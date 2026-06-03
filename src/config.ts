export const FPS = 100;
export const TAMX = Math.min(document.documentElement.clientWidth, 800);
export const TAMY = document.documentElement.clientHeight;

export const LANE_COUNT = 3;
export const SHOULDER_FRAC = 0.1;
export const LANE_SWITCH_FRAMES = 12;
export const ALERT_FRAMES = 50;

export const PROB_CAR = 0.008;
export const PROB_BICYCLE = 0.003;
export const PROB_TURBO = 0.0005;

export const MAX_TIP_TIMER = 600;
export const CUSTOMER_WAIT_TIME = 900;

/** Pixel X center of a lane (0, 1, or 2). */
export function laneX(lane: number): number {
  const shoulder = TAMX * SHOULDER_FRAC;
  const laneWidth = (TAMX * (1 - 2 * SHOULDER_FRAC)) / LANE_COUNT;
  return shoulder + laneWidth * (lane + 0.5);
}
