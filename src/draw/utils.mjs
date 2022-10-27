import { getCellsByIds, getGridCells } from "../utils/html.mjs";
import { isCellEnabled, isShapeCellEnabled } from "../utils/shapes.mjs";
import { getSpriteClassName } from "./styles.mjs";

/** @typedef {import('./heap.mjs').Heap} Heap */
/** @typedef {import('./shapes.mjs').Shape} Shape */
/** @typedef {import('./shapes.mjs').ShapeID} ShapeID */
/** @typedef {import('./shapes.mjs').Rotation} Rotation */
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
 * lights up the cell
 * @param {HTMLElement} cell
 * @param {ShapeID} id
 * @param {Rotation} rotation
 * @returns {void}
 */
function enableCell(cell, id, rotation) {
  const className = getSpriteClassName(id, rotation);
  cell.classList.add("sprite");
  cell.classList.add("o");

  if (!className) {
    throw new Error("Unable to specify sprite class name.");
  }

  cell.classList.add(className);
}

/**
 * turns off the cell
 * @param {HTMLElement} cell
 * @returns {void}
 */
function disableCell(cell) {
  cell.className = "cell";
}

/**
 * draws shapes onto grid/area
 *
 * @param {DrawOptions} options
 * @returns {void}
 */
export function draw({ x, y, shape, context }) {
  const { grid, current } = context;
  const { value, id, rotation } = shape;

  if (current) {
    clear(current, grid);
  }

  const ids = getShapeIds(x, y, value);
  const cells = getCellsByIds(ids, grid);

  for (const cell of cells) {
    enableCell(cell, id, rotation);
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
    disableCell(cell);
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
    if (ids.includes(`#${cell.id}`)) {
      continue;
    } else {
      disableCell(cell);
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
      if (isShapeCellEnabled(shape[rowIndex][columnIndex])) {
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
        ids.push(`#c${valueIndex}-${rowIndex}`);
      }
    }
  }

  return ids;
}
