import { deepFreeze } from "./meta.mjs";

/** maximum amount of levels */
export const MAX_LEVEL = 20;

/** start level */
export const START_LEVEL = 0;

/**
 * maps level to speed-factor (frames per second)
 * @type {Record<number, number>}
 */
export const TURN_DURATIONS_PER_LEVEL = deepFreeze({
  0: 1000,
  1: 950,
  2: 900,
  3: 850,
  4: 800,
  5: 775,
  6: 750,
  7: 700,
  8: 650,
  9: 600,
  10: 550,
  11: 500,
  12: 450,
  13: 400,
  14: 350,
  15: 300,
  16: 250,
  17: 200,
  18: 150,
  19: 100,
  20: 75,
});
