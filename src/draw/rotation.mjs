import { draw } from "./utils.mjs";
import { deepFreeze } from "../utils/meta.mjs";
import { check } from "./collision.mjs";
import {
  getNextRotation,
  getShape,
  ROTATION,
  I_ID,
  J_ID,
  Z_ID,
  S_ID,
  L_ID,
  O_ID,
  T_ID,
  getPreviousRotation,
} from "./shapes.mjs";

/** @typedef {import('./shapes.mjs').Rotation} Rotation */
/** @typedef {import('./shapes.mjs').ShapeID} ShapeID */
/** @typedef {import('../utils/context.mjs').Context} Context */

/**
 * coordinates adjustment after applying rotation
 * first element is for x, second for y
 * @typedef {Array<number>} CoordinateAdjustment
 */

/**
 * direction enum
 * @typedef {('CW'|'ACW')} Direction
 */

/**
 * coordinate adjustment mapping for each rotation
 * @typedef {Record<Direcion, Record<keyof typeof Rotation, CoordinateAdjustment>>} RotationCoordinateAdjustment
 */

/**
 * rotation coordinate adjustment mapping to shape ID
 * @typedef {Record<ShapeID, RotationCoordinateAdjustment>} RotationCoordinateAdjustmentMap
 */

/** @type {Direction} */
const DIRECTION_CW = "CW";
/** @type {Direction} */
const DIRECTION_ACW = "ACW";

/** @type {RotationCoordinateAdjustment} */
const I_COORDINATE_ADJUSTMENT = deepFreeze({
  [DIRECTION_CW]: {
    [ROTATION.A]: [-1, 1],
    [ROTATION.B]: [2, -1],
    [ROTATION.C]: [-2, 2],
    [ROTATION.D]: [1, -2],
  },
  [DIRECTION_ACW]: {
    [ROTATION.A]: [-2, 1],
    [ROTATION.B]: [2, -2],
    [ROTATION.C]: [-1, 2],
    [ROTATION.D]: [1, -1],
  },
});
/** @type {RotationCoordinateAdjustment} */
const J_COORDINATE_ADJUSTMENT = deepFreeze({
  [DIRECTION_CW]: {
    [ROTATION.A]: [0, 0],
    [ROTATION.B]: [1, 0],
    [ROTATION.C]: [-1, 1],
    [ROTATION.D]: [0, -1],
  },
  [DIRECTION_ACW]: {
    [ROTATION.A]: [-1, 0],
    [ROTATION.B]: [1, -1],
    [ROTATION.C]: [0, 1],
    [ROTATION.D]: [0, 0],
  },
});
/** @type {RotationCoordinateAdjustment} */
const L_COORDINATE_ADJUSTMENT = J_COORDINATE_ADJUSTMENT;
/** @type {RotationCoordinateAdjustment} */
const O_COORDINATE_ADJUSTMENT = deepFreeze({
  [DIRECTION_CW]: {
    [ROTATION.A]: [0, 0],
    [ROTATION.B]: [0, 0],
    [ROTATION.C]: [0, 0],
    [ROTATION.D]: [0, 0],
  },
  [DIRECTION_ACW]: {
    [ROTATION.A]: [0, 0],
    [ROTATION.B]: [0, 0],
    [ROTATION.C]: [0, 0],
    [ROTATION.D]: [0, 0],
  },
});
/** @type {RotationCoordinateAdjustment} */
const Z_COORDINATE_ADJUSTMENT = deepFreeze({
  [DIRECTION_CW]: {
    [ROTATION.A]: [0, 0],
    [ROTATION.B]: [1, 0],
    [ROTATION.C]: [-1, 1],
    [ROTATION.D]: [0, -1],
  },
  [DIRECTION_ACW]: {
    [ROTATION.A]: [-1, 0],
    [ROTATION.B]: [1, -1],
    [ROTATION.C]: [0, 1],
    [ROTATION.D]: [0, 0],
  },
});
/** @type {RotationCoordinateAdjustment} */
const S_COORDINATE_ADJUSTMENT = Z_COORDINATE_ADJUSTMENT;
/** @type {RotationCoordinateAdjustment} */
const T_COORDINATE_ADJUSTMENT = Z_COORDINATE_ADJUSTMENT;

/** @type {RotationCoordinateAdjustmentMap} */
const ROTATION_COORDINATE_ADJUSTMENT = deepFreeze({
  [I_ID]: I_COORDINATE_ADJUSTMENT,
  [J_ID]: J_COORDINATE_ADJUSTMENT,
  [L_ID]: L_COORDINATE_ADJUSTMENT,
  [O_ID]: O_COORDINATE_ADJUSTMENT,
  [S_ID]: S_COORDINATE_ADJUSTMENT,
  [T_ID]: T_COORDINATE_ADJUSTMENT,
  [Z_ID]: Z_COORDINATE_ADJUSTMENT,
});

/**
 * rotate tetromino
 * @param {Context} context
 * @param {Rotation} nextRotation
 * @param {Direction} direction
 * @returns {void}
 */
function rotate(context, nextRotation, direction) {
  const { current, heap } = context;

  if (!current) {
    return;
  }

  const { x, y, shape } = current;
  const { id } = shape;

  const adjustment =
    ROTATION_COORDINATE_ADJUSTMENT[id][direction][nextRotation];

  const nextX = x + adjustment[0];
  const nextY = y + adjustment[1];
  const nextShape = getShape(id, nextRotation);

  if (!check({ value: nextShape.value, x: nextX, y: nextY, heap })) {
    return;
  }

  draw({
    x: nextX,
    y: nextY,
    shape: nextShape,
    context,
  });

  context.current.x = nextX;
  context.current.y = nextY;
  context.current.shape = nextShape;
}

/**
 * rotate tetromino clockwise
 * @param {Context} context
 */
export function rotateClockWise(context) {
  const { current } = context;

  if (!current) {
    return;
  }

  const { shape } = current;
  const { rotation } = shape;

  const nextRotation = getNextRotation(rotation);

  return rotate(context, nextRotation, DIRECTION_CW);
}

/**
 * rotate tetromino clockwise
 * @param {Context} context
 */
export function rotateAntiClockWise(context) {
  const { current } = context;

  if (!current) {
    return;
  }

  const { shape } = current;
  const { rotation } = shape;

  const nextRotation = getPreviousRotation(rotation);
  return rotate(context, nextRotation, DIRECTION_ACW);
}
