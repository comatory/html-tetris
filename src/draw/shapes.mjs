/**
 * 2d array describing shapes:
 * I, J, L, O, S, T, Z
 * @typedef {Array<Array<number>>} Shape
 *
 */
/**
 * shape ID
 * @typedef {("I"|"J"|"L"|"O"|"S"|"T"|"Z")} ShapeID
 */
/**
 * maps shape ShapeID to RotationMap
 * @typedef {Record<ShapeID, ShapeMap>} ShapesMap
 */
/**
 * @typedef {Object} Rotation
 * @property {0} A - 0 degrees
 * @property {90} B - 90 degrees
 * @property {180} C - 180 degrees
 * @property {270} D - 270 degrees
 */
/**
 * maps Rotation to Shape
 * @typedef {Record<keyof typeof Rotation, Shape>} ShapeMap
 */

/** @type {ShapeID} */
export const I_ID = "I";
/** @type {ShapeID} */
export const J_ID = "J";
/** @type {ShapeID} */
export const L_ID = "L";
/** @type {ShapeID} */
export const O_ID = "O";
/** @type {ShapeID} */
export const S_ID = "S";
/** @type {ShapeID} */
export const T_ID = "T";
/** @type {ShapeID} */
export const Z_ID = "Z";

/** @type {Rotation} */
export const ROTATION = {
  A: 0,
  B: 90,
  C: 180,
  D: 270,
};

/** @type {Shape} */
const I_A = Object.freeze([[1, 1, 1, 1]]);
/** @type {Shape} */
const I_B = Object.freeze([[1], [1], [1], [1]]);
/** @type {Shape} */
const I_C = I_A;
/** @type {Shape} */
const I_D = I_B;
/** @type {ShapeMap} */
const I_MAP = Object.freeze({
  [ROTATION.A]: I_A,
  [ROTATION.B]: I_B,
  [ROTATION.C]: I_C,
  [ROTATION.D]: I_D,
});

/** @type {Shape} */
const J_A = Object.freeze([
  [1, 0, 0],
  [1, 1, 1],
]);
/** @type {Shape} */
const J_B = Object.freeze([
  [1, 1],
  [1, 0],
  [1, 0],
]);
/** @type {Shape} */
const J_C = Object.freeze([
  [0, 0, 1],
  [1, 1, 1],
]);
/** @type {Shape} */
const J_D = Object.freeze([
  [1, 0],
  [1, 0],
  [1, 1],
]);
/** @type {ShapeMap} */
const J_MAP = Object.freeze({
  [ROTATION.A]: J_A,
  [ROTATION.B]: J_B,
  [ROTATION.C]: J_C,
  [ROTATION.D]: J_D,
});

/** @type {Shape} */
const L_A = Object.freeze([
  [0, 0, 1],
  [1, 1, 1],
]);
/** @type {Shape} */
const L_B = Object.freeze([
  [1, 0],
  [1, 0],
  [1, 1],
]);
/** @type {Shape} */
const L_C = Object.freeze([
  [1, 1, 1],
  [1, 0, 0],
]);
/** @type {Shape} */
const L_D = Object.freeze([
  [1, 1],
  [0, 1],
  [0, 1],
]);
/** @type {ShapeMap} */
const L_MAP = Object.freeze({
  [ROTATION.A]: L_A,
  [ROTATION.B]: L_B,
  [ROTATION.C]: L_C,
  [ROTATION.D]: L_D,
});

/** @type {Shape} */
const O_A = Object.freeze([
  [1, 1],
  [1, 1],
]);
/** @type {Shape} */
const O_B = O_A;
/** @type {Shape} */
const O_C = O_A;
/** @type {Shape} */
const O_D = O_A;
/** @type {ShapeMap} */
const O_MAP = Object.freeze({
  [ROTATION.A]: O_A,
  [ROTATION.B]: O_B,
  [ROTATION.C]: O_C,
  [ROTATION.D]: O_D,
});

/** @type {Shape} */
const S_A = Object.freeze([
  [0, 1, 1],
  [1, 1, 0],
]);
/** @type {Shape} */
const S_B = Object.freeze([
  [1, 0],
  [1, 1],
  [0, 1],
]);
/** @type {Shape} */
const S_C = S_A;
/** @type {Shape} */
const S_D = S_A;
/** @type {ShapeMap} */
const S_MAP = Object.freeze({
  [ROTATION.A]: S_A,
  [ROTATION.B]: S_B,
  [ROTATION.C]: S_C,
  [ROTATION.D]: S_D,
});

/** @type {Shape} */
const T_A = Object.freeze([
  [0, 1, 0],
  [1, 1, 1],
]);
/** @type {Shape} */
const T_B = Object.freeze([
  [1, 0],
  [1, 1],
  [1, 0],
]);
/** @type {Shape} */
const T_C = Object.freeze([
  [1, 1, 1],
  [0, 1, 0],
]);
/** @type {Shape} */
const T_D = Object.freeze([
  [0, 1],
  [1, 1],
  [0, 1],
]);
/** @type {ShapeMap} */
const T_MAP = Object.freeze({
  [ROTATION.A]: T_A,
  [ROTATION.B]: T_B,
  [ROTATION.C]: T_C,
  [ROTATION.D]: T_D,
});

/** @type {Shape} */
const Z_A = Object.freeze([
  [1, 1, 0],
  [0, 1, 1],
]);
/** @type {Shape} */
const Z_B = Object.freeze([
  [0, 1],
  [1, 1],
  [1, 0],
]);
/** @type {Shape} */
const Z_C = Z_A;
/** @type {Shape} */
const Z_D = Z_B;
/** @type {ShapeMap} */
const Z_MAP = Object.freeze({
  [ROTATION.A]: Z_A,
  [ROTATION.B]: Z_B,
  [ROTATION.C]: Z_C,
  [ROTATION.D]: Z_D,
});

/** @type {ShapesMap} */
const SHAPES = Object.freeze({
  [I_ID]: I_MAP,
  [J_ID]: J_MAP,
  [L_ID]: L_MAP,
  [O_ID]: O_MAP,
  [S_ID]: S_MAP,
  [T_ID]: T_MAP,
  [Z_ID]: Z_MAP,
});

const ROTATION_ORDER = [ROTATION.a, ROTATION.b, ROTATION.c, ROTATION.d];

/** j tetromino
 * @param {Rotation} rotation
 * @returns {Shape} shape
 */
export function j(rotation) {
  return SHAPES[J_ID][rotation];
}

/** i tetromino
 * @param {Rotation} rotation
 * @returns {Shape} shape
 */
export function i(rotation) {
  return SHAPES[I_ID][rotation];
}

/** l tetromino
 * @param {Rotation} rotation
 * @returns {Shape} shape
 */
export function l(rotation) {
  return SHAPES[L_ID][rotation];
}

/** o tetromino
 * @param {Rotation} rotation
 * @returns {Shape} shape
 */
export function o(rotation) {
  return SHAPES[O_ID][rotation];
}

/** s tetromino
 * @param {Rotation} rotation
 * @returns {Shape} shape
 */
export function s(rotation) {
  return SHAPES[S_ID][rotation];
}

/** t tetromino
 * @param {Rotation} rotation
 * @returns {Shape} shape
 */
export function t(rotation) {
  return SHAPES[T_ID][rotation];
}

/** z tetromino
 * @param {Rotation} rotation
 * @returns {Shape} shape
 */
export function z(rotation) {
  return SHAPES[Z_ID][rotation];
}

/** get shape by id
 * @param {ShapeID} id - shape ID
 * @param {Rotation} rotation - rotation ID
 * @returns {Shape} shape
 */
export function getShape(id, rotation) {
  switch (id) {
    case I_D:
      return i(rotation);
    case J_ID:
      return j(rotation);
    case L_ID:
      return l(rotation);
    case O_ID:
      return o(rotation);
    case S_ID:
      return s(rotation);
    case T_ID:
      return t(rotation);
    case Z_ID:
      return z(rotation);
    default:
      throw new Error(`Shape with ${id} is not registered.`);
  }
}

/**
 * get next rotation from the ordered rotation list
 * @param {Rotation} rotation
 * @returns {Rotation} next rotation
 */
export function getNextRotation(rotation) {
  const i = ROTATION_ORDER.findIndex((r) => r === rotation);

  if (i + 1 > ROTATION_ORDER.length) {
    return ROTATION_ORDER.a;
  }

  return ROTATION_ORDER[Math.max(i + 1, ROTATION_ORDER.length)];
}

/**
 * define clockwise or anticlockwise
 * @param {Rotation} rotation
 * @param {Rotation} nextRotation
 * @returns {boolean} true = clockwise; false=anti-clockwise
 */
export function getDirection(rotation, nextRotation) {
  const i1 = ROTATION_ORDER.findIndex((r) => r === rotation);
  const i2 = ROTATION_ORDER.findIndex((r) => r === nextRotation);

  return i2 > i1;
}
