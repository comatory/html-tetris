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
 * get absolute positioning of a shape
 * @param {number} x
 * @param {number} y
 * @param {Shape} shape
 * @returns {Positioning} positioning object
 */
function getPositioning({ x, y, shape }) {
  return {
    left: x,
    right: x + shape.length,
    top: y,
    bottom: y + shape[0].length,
  };
}

/**
 * check whether the position will collide
 * with area walls or heap
 * @returns {boolean} true if it will hit, false if not
 */
export function check({ shape, x, y }) {
  const positioning = getPositioning({ x, y, shape });
  return !willHitWalls(positioning);
}
