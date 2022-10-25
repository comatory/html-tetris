/** row count of grid area @type {number} */
export const ROWS = 24;
/** column count of grid area @type {number} */
export const COLUMNS = 10;
/** top threshold row @type {number} */
export const ROW_THRESHOLD = 3;

/** define speed, it's a multiplier for game loop */
const SPEED = 5;

/** define duration of each turn in milliseconds */
export const TURN_DURATION_IN_MS = SPEED * 200;

/** deep-freeze of objects, use only for
 * statically created objects
 * @param {Record<unknown, unknown>} obj
 * @returns {Record<unknown, unknown} frozen obj
 */
export function deepFreeze(obj) {
  Object.keys(obj).forEach((property) => {
    if (typeof obj[property] === "object" && !Object.isFrozen(obj[property]))
      deepFreeze(obj[property]);
  });
  return Object.freeze(obj);
}
