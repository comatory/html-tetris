import { ANIMATION_DURATION_IN_MS } from "../utils/meta.mjs";
import { draw, redrawGrid, drawNextShapePreview } from "../draw/utils.mjs";
import { check, willHitThreshold } from "../draw/collision.mjs";
import { spawn } from "../draw/spawn.mjs";
import {
  rebuildHeap,
  rebuildHeapWithRemovedRows,
  getRowIndicesToRemove,
} from "../draw/heap.mjs";
import { debug } from "../utils/log.mjs";
import {
  GAME_STATE_PAUSED,
  GAME_STATE_RUNNING,
  GAME_STATE_INITIAL,
  setGameStatePaused,
  setGameStateRunning,
  setGameStateReset,
} from "../utils/context.mjs";
import { playRemoveAnimation } from "../draw/styles.mjs";
import { getScore } from "../utils/score.mjs";
import {
  updateScore,
  updateLines,
  updateLevel,
  getPreviewWindow,
} from "../utils/html.mjs";
import {
  TURN_DURATIONS_PER_LEVEL,
  MAX_LEVEL,
  getLevel,
} from "../utils/level.mjs";
import { keyBindingsFactory } from "../controls/keyboard.mjs";
import { touchBindingsFactory } from "../controls/touch.mjs";
import { prepare } from "./prepare.mjs";
import { openMainDialog } from "../menu/main.mjs";

/** @typedef {import('../draw/shapes.mjs').ShapeID} ShapeID */
/** @typedef {import('../utils/context.mjs').Context} Context } */

/**
 * initiates game
 * @param {Context} context
 * @param {() => ShapeID} randomizer - randomizer function
 */
export function startGame(context, randomizer) {
  debug("START GAME INITIATED");
  context.state = GAME_STATE_RUNNING;

  debug("REGISTER KEY BINDINGS");
  const { registerKeyBindings } = keyBindingsFactory(context);
  registerKeyBindings();

  debug("REGISTER TOUCH BINDINGS");
  const { registerTouchBindings } = touchBindingsFactory(context);
  registerTouchBindings();

  let step = null;

  drawNextShapePreview(context.nextShape.shape, getPreviewWindow());

  async function loop(time) {
    if (context.state === GAME_STATE_PAUSED) {
      return window.requestAnimationFrame(loop);
    }

    if (context.state === GAME_STATE_INITIAL) {
      return;
    }

    if (!step) {
      step = time;
    }

    const elapsed = time - step;
    const duration = TURN_DURATIONS_PER_LEVEL[context.level];

    if (elapsed > duration) {
      debug("TURN");
      const nextY = context.current.y + 1;

      if (
        !check({
          value: context.current.shape.value,
          x: context.current.x,
          y: nextY,
          heap: context.heap,
        })
      ) {
        debug("COLLISION DETECTED");
        const currentShape = context.current.shape;
        const currentX = context.current.x;
        const currentY = context.current.y;
        const { grid } = context;

        const nextHeap = rebuildHeap({
          heap: context.heap,
          shape: currentShape,
          x: currentX,
          y: currentY,
        });
        context.heap = nextHeap;

        const rowIndicesToRemove = getRowIndicesToRemove(nextHeap);

        if (rowIndicesToRemove.length > 0) {
          debug("CLEARED ROW");
          await playRemoveAnimation(rowIndicesToRemove, nextHeap, grid);
          const clearedHeap = rebuildHeapWithRemovedRows(
            nextHeap,
            rowIndicesToRemove
          );
          context.heap = clearedHeap;
          const nextScore = getScore(rowIndicesToRemove.length, context.level);
          context.score += nextScore;
          context.lines += rowIndicesToRemove.length;
          updateScore(context.score);
          updateLines(context.lines);
          const previousLevel = context.level;
          context.level = getLevel(context.lines);

          if (previousLevel !== context.level && context.level > MAX_LEVEL) {
            pauseGame(context);
            debug("GAME WON");
            return;
          }

          if (previousLevel !== context.level) {
            updateLevel(context.level);
          }

          redrawGrid(clearedHeap, context);
        }

        const spawnDescriptor = context.nextShape;

        if (
          willHitThreshold({
            value: spawnDescriptor.shape.value,
            x: spawnDescriptor.x,
            y: currentY,
          })
        ) {
          pauseGame(context);
          debug("GAME LOST");
          return;
        }

        context.current.x = spawnDescriptor.x;
        context.current.y = spawnDescriptor.y;
        context.current.shape = spawnDescriptor.shape;
        context.nextShape = spawn({ randomizerFn: randomizer });

        drawNextShapePreview(context.nextShape.shape, getPreviewWindow());

        draw({
          x: context.current.x,
          y: context.current.y,
          shape: context.current.shape,
          context,
        });

        redrawGrid(context.heap, context);

        step =
          time - duration + rowIndicesToRemove.length > 0
            ? ANIMATION_DURATION_IN_MS
            : 0;

        window.requestAnimationFrame(loop);
        return;
      }

      draw({
        x: context.current.x,
        y: nextY,
        shape: context.current.shape,
        context,
      });

      context.current.y = nextY;
      step = time;
    }

    window.requestAnimationFrame(loop);
  }

  window.requestAnimationFrame(loop);
}

/**
 * pauses main game loop
 * @param {Context} context
 */
export function pauseGame(context) {
  debug("GAME PAUSED");
  setGameStatePaused(context);
}

/**
 * un-pauses main game loop
 * @param {Context} context
 */
export function unpauseGame(context) {
  debug("GAME UNPAUSED");
  setGameStateRunning(context);
}

/**
 * resets/stops the game
 * @param {Context} context
 */
export function resetGame(context) {
  debug("GAME RESET");
  setGameStateReset(context);

  const { initialContext, randomizer } = prepare(context.grid);
  context = null;
  redrawGrid(initialContext.heap, initialContext);

  openMainDialog({
    start: () => startGame(initialContext, randomizer),
  });
}
