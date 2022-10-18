import { ROWS, COLUMNS } from "../utils/meta.mjs";

/** @typedef {import('./shapes.mjs').Shape} Shape */

/**
 * absolute positioning of shape
 * @typedef {Object} Positioning
 * @property {number} top
 * @property {number} bottom
 * @property {number} left
 * @property {number} right
 */

/**
 * detects whether area walls will be hit
 * @param {Positioning} positioning
 * @returns {boolean}
 */
function willHitWalls(positioning) {
  return (
    positioning.bottom > ROWS ||
    positioning.left < 0 ||
    positioning.right > COLUMNS
  );
}

/**
 * @typedef {Object} PositioningOptions
 * @property {Shape} value
 * @property {number} x
 * @property {number} y
 *
 * get absolute positioning of a shape
 * @param {PositioningOptions} options
 * @returns {Positioning} positioning object
 */
function getPositioning({ x, y, value }) {
  return {
    left: x,
    right: x + value.length,
    top: y,
    bottom: y + value[0].length,
  };
}

/**
 * @typedef {Object} CheckOptions
 * @property {Shape} value
 * @property {number} x
 * @property {number} y
 *
 * check whether the position will collide
 * with area walls or heap
 * @param {CheckOptions} options
 * @returns {boolean} true if it will hit, false if not
 */
export function check({ value, x, y }) {
  const positioning = getPositioning({ x, y, value });
  return !willHitWalls(positioning);
}
