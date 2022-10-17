import { buildGrid } from "../area/size.mjs";
import { ROWS, COLUMNS } from "./meta.mjs";

/**
 * describes current state of game
 * @typedef {Object} Context
 * @property {HTMLElement} grid
 */

/**
 * create context when game starts
 * @returns {Context} game context
 */
export function buildInitialContext() {
  const grid = buildGrid({
    rows: ROWS,
    columns: COLUMNS,
  });

  return {
    grid,
  };
}
