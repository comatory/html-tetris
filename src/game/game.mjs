import { TURN_DURATION_IN_MS } from "../utils/meta.mjs";
import { draw } from "../draw/utils.mjs";
import { check } from "../draw/collision.mjs";

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
      const nextY = context.current.y + 1;

      if (
        !check({
          value: context.current.shape.value,
          x: context.current.x,
          y: nextY,
        })
      ) {
        // TODO also add code for checking against heap
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
