import { buildHeap } from "../draw/heap.mjs";
import { START_LEVEL } from "./level.mjs";

/**
 * @typedef {import('../draw/shapes.mjs').ShapeDescriptor} ShapeDescriptor
 * @typedef {import('../draw/heap.mjs').Heap} Heap
 */

export const GAME_STATE_RUNNING = "RUNNING";
export const GAME_STATE_PAUSED = "PAUSED";
export const GAME_STATE_INITIAL = "INITIAL";

/**
 * @typedef {(GAME_STATE_RUNNING|GAME_STATE_PAUSED)} GameState */

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
 * @property {ShapeDescriptor} nextShape
 * @property {GameState} state;
 * @property {number} level;
 * @property {number} score
 * @property {number} lines;
 */

/**
 * create context when game starts
 * @param {HTMLElement} grid
 * @returns {Context} game context
 */
export function buildInitialContext(grid) {
  const heap = buildHeap();

  return {
    grid,
    current: null,
    heap,
    state: GAME_STATE_INITIAL,
    level: START_LEVEL,
    score: 0,
    lines: 0,
  };
}

/**
 * set game to be running
 * @param {Context} context
 * @returns {void}
 */
export function setGameStateRunning(context) {
  context.state = GAME_STATE_RUNNING;
}

/**
 * set game to be paused
 * @param {Context} context
 * @returns {void}
 */
export function setGameStatePaused(context) {
  context.state = GAME_STATE_PAUSED;
}

/**
 * set game to initial state
 * @param {Context} context
 * @returns {void}
 */
export function setGameStateReset(context) {
  context.state = GAME_STATE_INITIAL;
}
