import {
  getCellsByIds,
  getCellById,
  getGridCells,
  createCellElementId,
  createPreviewCellElementId,
} from "../utils/html.mjs";
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
 * @typedef {Object} CellShapeIndices
 * @property {number} columnIndex
 * @property {number} rowIndex
 *
 * lights up the cell
 * @param {HTMLElement} cell
 * @param {ShapeID} id
 * @param {Rotation} rotation
 * @param {CellShapeIndices} indices
 * @returns {void}
 */
function enableCell(cell, id, rotation, { columnIndex, rowIndex }) {
  const className = getSpriteClassName(id, rotation, {
    columnIndex,
    rowIndex,
  });

  if (!className) {
    throw new Error("Unable to specify sprite class name.");
  }

  cell.classList.add("sprite");
  const classList = Array.from(cell.classList);
  cell.className = `${classList.join(" ")} ${className}`;
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

  const cellShapeIds = getCellShapeIds({
    x,
    y,
    shape: value,
    callback: createCellElementId,
  });

  for (const cellShapeId of cellShapeIds) {
    const cell = getCellById(cellShapeId.id, grid);
    enableCell(cell, id, rotation, {
      rowIndex: cellShapeId.rowIndex,
      columnIndex: cellShapeId.columnIndex,
    });
  }
}

/**
 * draw preview of next shape into preview window
 * @param {ShapeDescriptor} shape
 * @param {HTMLElement} preview node
 * @returns {void}
 */
export function drawNextShapePreview(shape, node) {
  const cellShapeIds = getCellShapeIds({
    x: 0,
    y: 0,
    shape: shape.value,
    callback: createPreviewCellElementId,
  });
  const { id, rotation } = shape;

  const cells = getGridCells(node);

  for (const cell of cells) {
    disableCell(cell);
  }

  for (const cellShapeId of cellShapeIds) {
    const cell = getCellById(cellShapeId.id, node);
    enableCell(cell, id, rotation, {
      rowIndex: cellShapeId.rowIndex,
      columnIndex: cellShapeId.columnIndex,
    });
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
  const cellIds = getCellShapeIds({
    x,
    y,
    shape: value,
    callback: createCellElementId,
  }).map(({ id }) => id);
  const cells = getCellsByIds(cellIds, grid);

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
 * @typedef {Object} CellShapeId
 * @property {string} id
 * @property {number} rowIndex
 * @property {number} columnIndex
 *
 * @typedef {Object} GetCellShapeIdOptions
 * @property {number} x
 * @property {number} y
 * @property {Shape} shape
 * @property {(x: number, y: number) => string} callback - function for generating element IDs
 *
 * extract HTML IDs from given shape
 * @param {GetCellShapeIdOptions} options
 * @returns {Array<CellShapeId>} ids
 */
function getCellShapeIds({ x, y, shape, callback }) {
  const ids = [];

  for (let rowIndex = 0; rowIndex < shape.length; rowIndex++) {
    for (
      let columnIndex = 0;
      columnIndex < shape[rowIndex].length;
      columnIndex++
    ) {
      if (isShapeCellEnabled(shape[rowIndex][columnIndex])) {
        ids.push({
          id: callback(x + rowIndex, y + columnIndex),
          columnIndex,
          rowIndex,
        });
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
        ids.push(createCellElementId(valueIndex, rowIndex));
      }
    }
  }

  return ids;
}
