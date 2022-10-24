import { getCellsByIds, getGridCells } from "../utils/html.mjs";

/** @typedef {import('./heap.mjs').Heap} Heap */
/** @typedef {import('./shapes.mjs').Shape} Shape */
/** @typedef {import('./shapes.mjs').ShapeDescriptor} ShapeDescriptor */
/** @typedef {import('../utils/context.mjs').Context} Context */
/** @typedef {import('../utils/context.mjs').CurrentDescriptor} CurrentDescriptor */

/**
 * @typedef {Object} DrawOptions
 * @property {number} x - horizontal coordinate from top left
 * @property {number} y - vertical coordinate from top left
 * @property {ShapeDescriptor} shape - tetromino shape descriptor
 * @property {Context} context - current game state
 */

/**
 * draws shapes onto grid/area
 *
 * @param {DrawOptions} options
 * @returns {void}
 */
export function draw({ x, y, shape, context }) {
  const { grid, current } = context;
  const { value } = shape;

  if (current) {
    clear(current, grid);
  }

  const ids = getShapeIds(x, y, value);
  const cells = getCellsByIds(ids, grid);

  for (const cell of cells) {
    cell.style.background = "red";
    cell.classList.add("shape");
  }
}

/**
 * clears currently displayed tetromino
 * @param {CurrentDescriptor} current
 * @param {HTMLElement} grid
 * @returns {void}
 */
function clear({ x, y, shape }, grid) {
  const { value } = shape;
  const ids = getShapeIds(x, y, value);
  const cells = getCellsByIds(ids, grid);

  for (const cell of cells) {
    cell.style.background = "transparent";
    cell.classList.remove("shape");
  }
}

/**
 * redraws the grid excluding the shape
 * @param {Heap} heap
 * @param {Context} context
 * @returns {void}
 */
export function redrawGrid(heap, context) {
  const { grid } = context;

  const ids = getHeapIds(heap);
  const cells = getGridCells(grid);

  for (const cell of cells) {
    if (ids.includes(cell.id)) {
      cell.style.background = "red";
    } else {
      cell.style.background = "transparent";
    }
  }
}

/**
 * extract HTML IDs from given shape
 * @param {number} x
 * @param {number} y
 * @param {Shape} shape
 * @returns {Array<string>} ids
 */
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

/**
 * get ids of heap for enabled cells
 * @param {Heap} heap
 * @param {Shape} shape
 * @returns {Array<string>} ids
 */
function getHeapIds(heap) {
  const ids = [];
  for (let rowIndex = 0; rowIndex < heap.length; rowIndex++) {
    for (let valueIndex = 0; valueIndex < heap[rowIndex].length; valueIndex++) {
      if (isCellEnabled(heap[rowIndex][valueIndex])) {
        ids.push(`#c${rowIndex}-${valueIndex}`);
      }
    }
  }

  return ids;
}

/**
 * is the cell on?
 * @param {number} value
 * @returns {boolean} true if yes, false if no
 */
function isCellEnabled(value) {
  return value === 1;
}
