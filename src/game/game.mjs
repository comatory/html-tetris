import { TURN_DURATION_IN_MS } from "../utils/meta.mjs";
import { draw } from "../draw/utils.mjs";
import { check } from "../draw/collision.mjs";
import { getSpawnShapeData, spawn } from "../draw/spawn.mjs";
import { getShape } from "../draw/shapes.mjs";
import { debug } from "../utils/log.mjs";

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
        })
      ) {
        debug("HIT BOTTOM OF AREA");
        // TODO also add code for checking against heap
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
