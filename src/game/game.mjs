import { TURN_DURATION_IN_MS } from "../utils/meta.mjs";
import { draw, redrawGrid } from "../draw/utils.mjs";
import { check } from "../draw/collision.mjs";
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

/** @typedef {import('../utils/context.mjs').Context} Context } */

/**
 * initiates game
 * @param {Context} context
 */
export function startGame(context) {
  let step = null;

  /* DEBUG
  draw({
    x: context.current.x,
    y: context.current.y,
    shape: context.current.shape,
    context,
  });
  */

  function loop(time) {
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
          const clearedHeap = rebuildHeapWithRemovedRows(
            nextHeap,
            rowIndicesToRemove
          );
          context.heap = clearedHeap;
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

        step = time;

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
