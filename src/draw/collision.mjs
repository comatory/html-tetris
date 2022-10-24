import { ROWS, COLUMNS } from "../utils/meta.mjs";

/** @typedef {import('./heap.mjs').Heap} Heap */
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
    positioning.bottom > ROWS - 1 ||
    positioning.left < 0 ||
    positioning.right > COLUMNS - 1 ||
    positioning.top < 0
  );
}

/**
 * @typedef {Object} WillHitHeapOptions
 * @property {number} x
 * @property {number} y
 * @property {Shape} shape
 * @property {Heap} heap
 *
 * detects whether heap will be hit
 * @param {WillHitHeapOptions} options
 * @returns {boolean}
 */
function willHitHeap({ x, y, shape, heap }) {
  const shapeCoordinates = shape
    .map((column, columnIndex) => {
      return column.map((value, rowIndex) => {
        if (value === 0) {
          return null;
        }

        return [columnIndex + x, rowIndex + y];
      });
    })
    .flat()
    .filter((value) => value !== null);

  return shapeCoordinates.some(([x, y]) => heap[y][x] === 1);
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
export function getPositioning({ x, y, value }) {
  return {
    left: x,
    right: x + value.length - 1,
    top: y,
    bottom: y + value[0].length - 1,
  };
}

/**
 * @typedef {Object} CheckOptions
 * @property {Shape} value
 * @property {number} x
 * @property {number} y
 * @property {Heap} heap
 *
 * check whether the position will collide
 * with area walls or heap
 * @param {CheckOptions} options
 * @returns {boolean} true if it will pass, false if not
 */
export function check({ value, x, y, heap }) {
  const positioning = getPositioning({ x, y, value });
  return (
    !willHitWalls(positioning) && !willHitHeap({ x, y, shape: value, heap })
  );
}
