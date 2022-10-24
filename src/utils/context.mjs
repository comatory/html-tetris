import { buildGrid } from "../area/size.mjs";
import { buildHeap } from "../draw/heap.mjs";
import { ROWS, COLUMNS } from "./meta.mjs";
import { getRootStyle } from "./html.mjs";

/**
 * @typedef {import('../draw/shapes.mjs').ShapeDescriptor} ShapeDescriptor
 * @typedef {import('../draw/heap.mjs').Heap} Heap
 */

/**
 * describes positioning and shape of current block
 * @typedef {Object} CurrentDescriptor
 * @property {ShapeDescriptor} shape
 * @property {number} x
 * @property {number} y
 */

/**
 * describes current state of game
 * @typedef {Object} Context
 * @property {HTMLElement} grid
 * @property {Heap} heap
 * @property {(CurrentDescriptor|null)} current
 */

/**
 * create context when game starts
 * @returns {Context} game context
 */
export function buildInitialContext() {
  const style = getRootStyle();
  style.setProperty("--rows", ROWS);
  style.setProperty("--columns", COLUMNS);

  const grid = buildGrid({
    rows: ROWS,
    columns: COLUMNS,
  });

  const heap = buildHeap();

  return {
    grid,
    current: null,
    heap,
  };
}
