import { draw } from "./utils.mjs";
import { check } from "./collision.mjs";
import { playDropSound, playMovementSound } from "../sound/sounds.mjs";

/** @typedef {import('../utils/context.mjs').Context} Context */

/**
 * move tetromino to the left
 * @param {Context} context
 */
export function moveLeft(context) {
  const { current, heap } = context;

  if (!current) {
    return;
  }

  const x = current.x - 1;
  const { y, shape } = current;
  const { value } = shape;

  if (!check({ value, x, y, heap })) {
    return;
  }

  draw({
    x,
    y,
    shape,
    context,
  });

  playMovementSound();
  context.current.x = x;
}

/**
 * move tetromino to the right
 * @param {Context} context
 */
export function moveRight(context) {
  const { current, heap } = context;

  if (!current) {
    return;
  }

  const x = current.x + 1;
  const { y, shape } = current;
  const { value } = shape;

  if (!check({ value, x, y, heap })) {
    return;
  }

  draw({
    x,
    y,
    shape,
    context,
  });

  playMovementSound();
  context.current.x = x;
}

/**
 * move tetromino down
 * @param {Context} context
 */
export function moveDown(context) {
  const { current, heap } = context;

  if (!current) {
    return;
  }

  const { x, shape } = current;
  const { value } = shape;
  const y = current.y + 1;

  if (!check({ value, x, y, heap })) {
    return;
  }

  draw({
    x: current.x,
    y,
    shape: current.shape,
    context,
  });

  playDropSound();
  context.current.y = y;
}
