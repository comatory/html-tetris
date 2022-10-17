import { draw } from "./utils.mjs";

/** @typedef {import('../utils/context.mjs').Context} Context */

/**
 * move tetromino to the left
 * @param {Context} context
 */
export function moveLeft(context) {
  const { current } = context;

  if (!current) {
    return;
  }

  const x = current.x - 1;
  draw({
    x,
    y: current.y,
    shape: current.shape,
    context,
  });

  context.current.x = x;
}

/**
 * move tetromino to the right
 * @param {Context} context
 */
export function moveRight(context) {
  const { current } = context;

  if (!current) {
    return;
  }

  const x = current.x + 1;
  draw({
    x,
    y: current.y,
    shape: current.shape,
    context,
  });

  context.current.x = x;
}
