import { deepFreeze } from "../utils/meta.mjs";
import {
  ROTATION,
  ROTATION_ORDER,
  SHAPES,
  I_ID,
  J_ID,
  L_ID,
  O_ID,
  S_ID,
  T_ID,
  Z_ID,
  getShape,
} from "./shapes.mjs";

/** @typedef {import('./shapes.mjs').ShapeID} ShapeID */
/** @typedef {import('./shapes.mjs').Shapes} Shapes */
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
 * @property {number} x - initial x coord
 * @property {number} y - initial y coord
 * @property {() => ShapeID} randomizerFn - randomizer function that fetches shape ID
 *
 * @typedef {Object} SpawnDescriptor
 * @property {number | undefined} x - adjusted x coord of spawn
 * @property {number | undefined} y - adjusted y coord of spawn
 * @property {ShapeDescriptor} shape - spawned shape
 *
 * spawn initial location
 * @param {SpawnOptions} options
 * @returns {SpawnDescriptor} adjusted coordinates
 */
export function spawn({ x, y, randomizerFn }) {
  const { id, rotation } = getSpawnShapeData(randomizerFn);
  const shape = getShape(id, rotation);

  const adjustments = SPAWN_COORDINATE_ADJUSTMENT_MAP[id][rotation];
  const adjustedX = x ?? 3 + adjustments[0];
  const adjustedY = y ?? 0 + adjustments[1];

  return {
    x: adjustedX,
    y: adjustedY,
    shape,
  };
}

/**
 * @typedef {Object} SpawnShapeData
 * @property {ShapeID} id
 * @property {Rotation} rotation
 *
 * get random shape ID and rotation for each spawn
 * @param {() => ShapeID} randomizerFn - randomizer function that fetches shape ID
 * @returns {SpawnShapeData} shape ID and rotation
 */
function getSpawnShapeData(randomizerFn) {
  const id = randomizerFn();
  return {
    id,
    rotation:
      ROTATION_ORDER[Math.round(Math.random() * (ROTATION_ORDER.length - 1))],
  };
}

/**
 * creates randomization function aligned with 7-bag algorhitm
 *
 * @returns {() => ShapeID} function that returns randomized shape ID
 */
export function createRandomizer() {
  let bag = getBag();

  /**
   * @returns {() => ShapeID}
   */
  return function get() {
    if (bag.length === 0) {
      bag = getBag();
    }

    return bag.pop();
  };
}

/**
 * gets shuffled bag of shape IDs
 *
 * @returns {Shapes} array of shape IDs
 */
function getBag() {
  const bag = [...SHAPES];
  return shuffle(bag);
}

/**
 * shuffle array
 * @param {Shapes} array
 * @returns {Shapes} shuffled array
 */
function shuffle(array) {
  let currentIndex = array.length;

  while (currentIndex !== 0) {
    const index = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[index]] = [array[index], array[currentIndex]];
  }

  return array;
}
