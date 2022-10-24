import { COLUMNS, ROWS } from "../utils/meta.mjs";
import { getPositioning } from "../draw/collision.mjs";

/** @typedef {import('./shapes.mjs').Shape} Shape */

/**
 * heap represents pieces that have already
 * fallen to bottom of the play area or onto
 * other pieces
 * heap initial positions starts from top left
 * of the area and is initialized with zeroed values
 * @typedef {Array<Array<number>>} Heap
 */

/**
 * build initial heap
 * @param {Heap | undefined} previous - existing heap
 * @returns {Heap} new heap
 */
export function buildHeap() {
  return Array(ROWS)
    .fill([])
    .map(() => Array(COLUMNS).fill(0));
}

/**
 * @typedef {Object} RebuildHeapOptions
 * @property {Heap} heap
 * @property {Shape} shape
 * @property {x} number
 * @property {y} number
 *
 * rebuild heap based on fallen shape
 * @param {RebuildHeapOptions} options
 * @returns {Heap} new heap
 */
export function rebuildHeap({ heap, shape, x, y }) {
  const positioning = getPositioning({ x, y, value: shape.value });
  const updatedHeap = [];

  // TODO swap row w/ column
  let shapeColumnIndex = 0;
  for (let columnIndex = 0; columnIndex < heap.length; columnIndex++) {
    updatedHeap[columnIndex] = [];
    const matchesColumn =
      columnIndex >= positioning.top && columnIndex <= positioning.bottom;
    let shapeRowIndex = 0;
    for (let rowIndex = 0; rowIndex < heap[columnIndex].length; rowIndex++) {
      const matchesRow =
        rowIndex >= positioning.left && rowIndex <= positioning.right;
      if (matchesColumn && matchesRow) {
        updatedHeap[columnIndex][rowIndex] =
          shape.value[shapeRowIndex][shapeColumnIndex];
        shapeRowIndex++;
      } else {
        updatedHeap[columnIndex][rowIndex] = heap[columnIndex][rowIndex];
      }
    }

    shapeColumnIndex = matchesColumn ? shapeColumnIndex + 1 : 0;
  }

  return updatedHeap;
}

/**
 * returns y indices to be removed from the heap
 * @param {Heap} heap
 * @returns {Array<number>} array of indices
 */
export function getRowIndicesToRemove(heap) {
  return heap.reduce((indices, row, index) => {
    if (shouldClearLine(row)) {
      return [...indices, index];
    }
    return indices;
  }, []);
}

/**
 * specify whether to clear line from heap or not
 * @param {Array<number>} row
 * @returns {boolean} true for clear
 */
function shouldClearLine(row) {
  return !row.some((value) => value === 0);
}