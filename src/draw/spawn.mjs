import { deepFreeze } from "../utils/meta.mjs";
import {
  ROTATION,
  SHAPES,
  I_ID,
  J_ID,
  L_ID,
  O_ID,
  S_ID,
  T_ID,
  Z_ID,
} from "./shapes.mjs";

/** @typedef {import('./shapes.mjs').ShapeID} ShapeID */
/** @typedef {import('./shapes.mjs').Rotation} Rotation */
/** @typedef {import('./shapes.mjs').ShapeDescriptor} ShapeDescriptor */

/**
 * initial coordinate spawn adjustment based
 * on shape and initial rotation
 * @typedef {Record<typeof Rotation, Array<number, number>>} SpawnCoordinateAdjustment
 */

/**
 * initial coordinate spawn adjustment map
 * @typedef {Record<ShapeID, SpawnCoordinateAdjustment>} SpawnCoordinateAdjustmentMap
 */

/** @type {SpawnCoordinateAdjustment} */
const I_SPAWN_COORDINATE_ADJUSTMENT = deepFreeze({
  [ROTATION.A]: [0, 1],
  [ROTATION.B]: [0, 0],
  [ROTATION.C]: [0, 0],
  [ROTATION.D]: [0, 0],
});
const J_SPAWN_COORDINATE_ADJUSTMENT = deepFreeze({
  [ROTATION.A]: [0, 0],
  [ROTATION.B]: [0, 0],
  [ROTATION.C]: [0, 0],
  [ROTATION.D]: [0, 0],
});

/** @type {SpawnCoordinateAdjustmentMap} */
const SPAWN_COORDINATE_ADJUSTMENT_MAP = deepFreeze({
  [I_ID]: I_SPAWN_COORDINATE_ADJUSTMENT,
  [J_ID]: J_SPAWN_COORDINATE_ADJUSTMENT,
  [L_ID]: J_SPAWN_COORDINATE_ADJUSTMENT,
  [O_ID]: J_SPAWN_COORDINATE_ADJUSTMENT,
  [S_ID]: J_SPAWN_COORDINATE_ADJUSTMENT,
  [T_ID]: J_SPAWN_COORDINATE_ADJUSTMENT,
  [Z_ID]: J_SPAWN_COORDINATE_ADJUSTMENT,
});

/**
 * @typedef {Object} SpawnOptions
 * @property {ShapeID} id - ID of the shape
 * @property {number} x - initial x coord
 * @property {number} y - initial y coord
 * @property {Rotation} rotation - initial rotation
 *
 * @typedef {Object} SpawnAdjustedCoordinates
 * @property {number} x - adjusted x coord
 * @property {number} y - adjusted y coord
 *
 * spawn initial location
 * @param {SpawnOptions} options
 * @returns {SpawnAdjustedCoordinates} adjusted coordinates
 */
export function spawn({ id, x, y, rotation }) {
  const adjustments = SPAWN_COORDINATE_ADJUSTMENT_MAP[id][rotation];
  const adjustedX = x + adjustments[0];
  const adjustedY = y + adjustments[1];

  return { x: adjustedX, y: adjustedY };
}

/**
 * @typedef {Object} SpawnShapeData
 * @property {ShapeID} id
 * @property {Rotation} rotation
 *
 * get random shape ID and rotation for each spawn
 * @returns {SpawnShapeData} shape ID and rotation
 */
export function getSpawnShapeData() {
  const id = SHAPES[Math.round(Math.random() * (SHAPES.length - 1))];
  return {
    id,
    rotation: ROTATION.A,
  };
}