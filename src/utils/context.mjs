import { buildGrid } from "../area/size.mjs";
import { ROWS, COLUMNS } from "./meta.mjs";
import { getRootStyle } from "./html.mjs";

/**
 * @typedef {import('../draw/shapes.mjs').Shape} Shape
 */

/**
 * describes positioning and shape of current block
 * @typedef {Object} CurrentDescriptor
 * @property {Shape} shape
 * @property {number} x
 * @property {number} y
 */

/**
 * describes current state of game
 * @typedef {Object} Context
 * @property {HTMLElement} grid
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

  return {
    grid,
    current: null,
  };
}
