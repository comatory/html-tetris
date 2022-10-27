import { COLUMNS, ROWS } from "../utils/meta.mjs";
import { getPositioning } from "../draw/collision.mjs";
import { getSpriteClassName } from "./styles.mjs";
import { isCellDisabled } from "../utils/shapes.mjs";

/** @typedef {import('./shapes.mjs').ShapeDescriptor} ShapeDescriptor */

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
    .map(() => buildColumn());
}

/**
 * build empty column
 * @returns {Array<number>}
 */
function buildColumn() {
  return Array(COLUMNS).fill(0);
}

/**
 * @typedef {Object} RebuildHeapOptions
 * @property {Heap} heap
 * @property {ShapeDescriptor} shape
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
        // only add "filled" cells to heap, otherwise fall back to whatever is
        // there
        const isEmpty = isCellDisabled(
          shape.value[shapeRowIndex][shapeColumnIndex]
        );

        updatedHeap[columnIndex][rowIndex] = isEmpty
          ? heap[columnIndex][rowIndex]
          : getSpriteClassName(shape.id, shape.rotation);
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
 * when rows are supposed to be removed, produce
 * new heap
 * @param {Heap} heap
 * @param {Array<number>} indices
 * @returns {Heap} new heap
 */
export function rebuildHeapWithRemovedRows(heap, indices) {
  const amount = indices.length;
  const clearedHeap = heap.reduce((updatedHeap, row, index) => {
    if (indices.includes(index)) {
      return updatedHeap;
    }

    return [...updatedHeap, Array.from(row)];
  }, []);
  const pad = Array(amount)
    .fill([])
    .map(() => buildColumn());

  const paddedHeap = [...pad, ...clearedHeap];

  return paddedHeap;
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
  return !row.some((value) => isCellDisabled(value));
}
