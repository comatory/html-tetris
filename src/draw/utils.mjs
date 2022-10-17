import { getCellsByIds } from "../utils/html.mjs";

/** @typedef {import('./utils.mjs').Shape} Shape */

/**
 * @typedef {Object} DrawOptions
 * @property {number} x - horizontal coordinate from top left
 * @property {number} y - vertical coordinate from top left
 * @property {Shape} shape - tetromino shape
 */

/**
 * draws shapes onto grid/area
 *
 * @param {DrawOptions} options
 * @returns {void}
 */
export function draw({ x, y, shape, context }) {
  const { grid } = context;
  const ids = getShapeIds(x, y, shape);
  const cells = getCellsByIds(ids, grid);

  for (const cell of cells) {
    cell.style.background = "red";
  }
}

function getShapeIds(x, y, shape) {
  const ids = [];

  for (let rowIndex = 0; rowIndex < shape.length; rowIndex++) {
    for (
      let columnIndex = 0;
      columnIndex < shape[rowIndex].length;
      columnIndex++
    ) {
      if (isCellEnabled(shape[rowIndex][columnIndex])) {
        ids.push(`#c${x + rowIndex}-${y + columnIndex}`);
      }
    }
  }

  return ids;
}

function isCellEnabled(value) {
  return value === 1;
}
