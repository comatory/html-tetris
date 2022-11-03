import { debug, createDebuggableContext } from "../utils/log.mjs";
import { createRandomizer } from "../draw/spawn.mjs";
import { spawn } from "../draw/spawn.mjs";
import { buildInitialContext } from "../utils/context.mjs";
import { updateLevel, updateLines, updateScore } from "../utils/html.mjs";

/**
 * @typedef {import('../utils/context.mjs').Context} Context
 * @typedef {import('../draw/shapes.mjs').ShapeID} ShapeID
 */

/**
 * @typedef {Object} PreparedGameData
 * @property {Context} initialContext - initial context to start the game with
 * @property {() => ShapeID} randomizer - randomizer function
 * prepares game data
 *
 * @param {HTMLElement} grid - play area element
 * @returns {PreparedGameData} - intial context and randomizer function
 */
export function prepare(grid) {
  debug("BUILD CONTEXT");
  const initialContext = buildInitialContext(grid);
  createDebuggableContext(initialContext);

  const randomizer = createRandomizer();
  const { x, y, shape } = spawn({ randomizerFn: randomizer });

  initialContext.current = {
    x,
    y,
    shape,
  };

  initialContext.nextShape = spawn({ randomizerFn: randomizer });

  if (Number.isFinite(window.__DEBUG_LEVEL)) {
    initialContext.level = window.__DEBUG_LEVEL;
  }

  updateLevel(initialContext.level);
  updateLines(initialContext.lines);
  updateScore(initialContext.score);

  return { initialContext, randomizer };
}
