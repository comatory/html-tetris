/**
 * defines whether this is production build
 * @type {boolean}
 */
export const isProduction = Boolean(window.__ENV === "production");

/**
 * defines whether this is development build
 * @type {boolean}
 */
export const isDevelopment = !isProduction;

/** row count of grid area @type {number} */
export const ROWS = 20;
/** column count of grid area @type {number} */
export const COLUMNS = 10;

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
