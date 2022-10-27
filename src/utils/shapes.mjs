/**
 * is the cell on?
 * @param {number|string} value
 * @returns {boolean} true if yes, false if no
 */
export function isCellEnabled(value) {
  return typeof value === "string" && value.length > 0;
}

/**
 * is the cell off?
 * @param {number|string} value
 * @returns {boolean} true if yes, false if no
 */
export function isCellDisabled(value) {
  return value === 0;
}

/**
 * is the shape cell on?
 * @param {number} value
 * @returns {boolean} true if yes, false if no
 */
export function isShapeCellEnabled(value) {
  return value === 1;
}

/**
 * is the shape cell off?
 * @param {number} value
 * @returns {boolean} true if yes, false if no
 */
export function isShapeCellDisabled(value) {
  return value === 0;
}
