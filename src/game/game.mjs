import {
  TURN_DURATION_IN_MS,
  ANIMATION_DURATION_IN_MS,
} from "../utils/meta.mjs";
import { draw, redrawGrid } from "../draw/utils.mjs";
import { check, willHitThreshold } from "../draw/collision.mjs";
import { getSpawnShapeData, spawn } from "../draw/spawn.mjs";
import {
  rebuildHeap,
  rebuildHeapWithRemovedRows,
  getRowIndicesToRemove,
} from "../draw/heap.mjs";
import { getShape } from "../draw/shapes.mjs";
import { debug } from "../utils/log.mjs";
import {
  GAME_STATE_PAUSED,
  setGameStatePaused,
  setGameStateRunning,
} from "../utils/context.mjs";
import { playRemoveAnimation } from "../draw/styles.mjs";
import { getScore } from "../utils/score.mjs";
import { updateScore } from "../utils/html.mjs";

/** @typedef {import('../utils/context.mjs').Context} Context } */

/**
 * initiates game
 * @param {Context} context
 */
export function startGame(context) {
  let step = null;

  async function loop(time) {
    if (context.state === GAME_STATE_PAUSED) {
      return window.requestAnimationFrame(loop);
    }

    if (!step) {
      step = time;
    }

    const elapsed = time - step;

    if (elapsed > TURN_DURATION_IN_MS) {
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
          updateScore(context.score);
          redrawGrid(clearedHeap, context);
        }

        const spawnData = getSpawnShapeData();
        const spawnShape = getShape(spawnData.id, spawnData.rotation);
        const spawnCoordinates = spawn({
          id: spawnShape.id,
          x: 3,
          y: 0,
          rotation: spawnShape.rotation,
        });

        if (
          willHitThreshold({
            value: spawnShape.value,
            x: spawnCoordinates.x,
            y: currentY,
          })
        ) {
          pauseGame(context);
          debug("GAME LOST");
          return;
        }

        context.current.x = spawnCoordinates.x;
        context.current.y = spawnCoordinates.y;
        context.current.shape = spawnShape;

        draw({
          x: context.current.x,
          y: context.current.y,
          shape: context.current.shape,
          context,
        });

        redrawGrid(context.heap, context);

        step =
          time - TURN_DURATION_IN_MS + rowIndicesToRemove.length > 0
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

export function pauseGame(context) {
  debug("GAME PAUSED");
  setGameStatePaused(context);
}

export function unpauseGame(context) {
  debug("GAME UNPAUSED");
  setGameStateRunning(context);
}
