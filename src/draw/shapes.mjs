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
 * shape descriptor
 * @typedef {Object} ShapeDescriptor
 * @property {ShapeID} id - ID of shape
 * @property {Shape} value - actual shape
 * @property {Rotation} rotation - rotation of the shape
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
 * @typedef {Record<keyof typeof Rotation, ShapeDescriptor>} ShapeMap
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
const I_A = Object.freeze([[1], [1], [1], [1]]);
/** @type {Shape} */
const I_B = Object.freeze([[1, 1, 1, 1]]);
/** @type {Shape} */
const I_C = I_A;
/** @type {Shape} */
const I_D = I_B;
/** @type {ShapeMap} */
const I_MAP = Object.freeze({
  [ROTATION.A]: Object.freeze({
    id: I_ID,
    value: I_A,
    rotation: ROTATION.A,
  }),
  [ROTATION.B]: Object.freeze({
    id: I_ID,
    value: I_B,
    rotation: ROTATION.B,
  }),
  [ROTATION.C]: Object.freeze({
    id: I_ID,
    value: I_C,
    rotation: ROTATION.C,
  }),
  [ROTATION.D]: Object.freeze({
    id: I_ID,
    value: I_D,
    rotation: ROTATION.D,
  }),
});

/** @type {Shape} */
const J_A = Object.freeze([
  [1, 1],
  [0, 1],
  [0, 1],
]);
/** @type {Shape} */
const J_B = Object.freeze([
  [1, 1, 1],
  [1, 0, 0],
]);
/** @type {Shape} */
const J_C = Object.freeze([
  [1, 0],
  [1, 0],
  [1, 1],
]);
/** @type {Shape} */
const J_D = Object.freeze([
  [0, 0, 1],
  [1, 1, 1],
]);
/** @type {ShapeMap} */
const J_MAP = Object.freeze({
  [ROTATION.A]: Object.freeze({
    id: J_ID,
    value: J_A,
    rotation: ROTATION.A,
  }),
  [ROTATION.B]: Object.freeze({
    id: J_ID,
    value: J_B,
    rotation: ROTATION.B,
  }),
  [ROTATION.C]: Object.freeze({
    id: J_ID,
    value: J_C,
    rotation: ROTATION.C,
  }),
  [ROTATION.D]: Object.freeze({
    id: J_ID,
    value: J_D,
    rotation: ROTATION.D,
  }),
});

/** @type {Shape} */
const L_A = Object.freeze([
  [0, 1],
  [0, 1],
  [1, 1],
]);
/** @type {Shape} */
const L_B = Object.freeze([
  [1, 1, 1],
  [0, 0, 1],
]);
/** @type {Shape} */
const L_C = Object.freeze([
  [1, 1],
  [1, 0],
  [1, 0],
]);
/** @type {Shape} */
const L_D = Object.freeze([
  [1, 0, 0],
  [1, 1, 1],
]);
/** @type {ShapeMap} */
const L_MAP = Object.freeze({
  [ROTATION.A]: Object.freeze({
    id: L_ID,
    value: L_A,
    rotation: ROTATION.A,
  }),
  [ROTATION.B]: Object.freeze({
    id: L_ID,
    value: L_B,
    rotation: ROTATION.B,
  }),
  [ROTATION.C]: Object.freeze({
    id: L_ID,
    value: L_C,
    rotation: ROTATION.C,
  }),
  [ROTATION.D]: Object.freeze({
    id: L_ID,
    value: L_D,
    rotation: ROTATION.D,
  }),
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
  [ROTATION.A]: Object.freeze({
    id: O_ID,
    value: O_A,
    rotation: ROTATION.A,
  }),
  [ROTATION.B]: Object.freeze({
    id: O_ID,
    value: O_B,
    rotation: ROTATION.B,
  }),
  [ROTATION.C]: Object.freeze({
    id: O_ID,
    value: O_C,
    rotation: ROTATION.C,
  }),
  [ROTATION.D]: Object.freeze({
    id: O_ID,
    value: O_D,
    rotation: ROTATION.D,
  }),
});

/** @type {Shape} */
const S_A = Object.freeze([
  [0, 1],
  [1, 1],
  [1, 0],
]);
/** @type {Shape} */
const S_B = Object.freeze([
  [1, 1, 0],
  [0, 1, 1],
]);
/** @type {Shape} */
const S_C = S_A;
/** @type {Shape} */
const S_D = S_B;
/** @type {ShapeMap} */
const S_MAP = Object.freeze({
  [ROTATION.A]: Object.freeze({
    id: S_ID,
    value: S_A,
    rotation: ROTATION.A,
  }),
  [ROTATION.B]: Object.freeze({
    id: S_ID,
    value: S_B,
    rotation: ROTATION.B,
  }),
  [ROTATION.C]: Object.freeze({
    id: S_ID,
    value: S_C,
    rotation: ROTATION.C,
  }),
  [ROTATION.D]: Object.freeze({
    id: S_ID,
    value: S_D,
    rotation: ROTATION.D,
  }),
});

/** @type {Shape} */
const T_A = Object.freeze([
  [0, 1],
  [1, 1],
  [0, 1],
]);
/** @type {Shape} */
const T_B = Object.freeze([
  [1, 1, 1],
  [0, 1, 0],
]);
/** @type {Shape} */
const T_C = Object.freeze([
  [1, 0],
  [1, 1],
  [1, 0],
]);
/** @type {Shape} */
const T_D = Object.freeze([
  [0, 1, 0],
  [1, 1, 1],
]);
/** @type {ShapeMap} */
const T_MAP = Object.freeze({
  [ROTATION.A]: Object.freeze({
    id: T_ID,
    value: T_A,
    rotation: ROTATION.A,
  }),
  [ROTATION.B]: Object.freeze({
    id: T_ID,
    value: T_B,
    rotation: ROTATION.B,
  }),
  [ROTATION.C]: Object.freeze({
    id: T_ID,
    value: T_C,
    rotation: ROTATION.C,
  }),
  [ROTATION.D]: Object.freeze({
    id: T_ID,
    value: T_D,
    rotation: ROTATION.D,
  }),
});

/** @type {Shape} */
const Z_A = Object.freeze([
  [1, 0],
  [1, 1],
  [0, 1],
]);
/** @type {Shape} */
const Z_B = Object.freeze([
  [0, 1, 1],
  [1, 1, 0],
]);
/** @type {Shape} */
const Z_C = Z_A;
/** @type {Shape} */
const Z_D = Z_B;
/** @type {ShapeMap} */
const Z_MAP = Object.freeze({
  [ROTATION.A]: Object.freeze({
    id: Z_ID,
    value: Z_A,
    rotation: ROTATION.A,
  }),
  [ROTATION.B]: Object.freeze({
    id: Z_ID,
    value: Z_B,
    rotation: ROTATION.B,
  }),
  [ROTATION.C]: Object.freeze({
    id: Z_ID,
    value: Z_C,
    rotation: ROTATION.C,
  }),
  [ROTATION.D]: Object.freeze({
    id: Z_ID,
    value: Z_D,
    rotation: ROTATION.D,
  }),
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

const ROTATION_ORDER = [ROTATION.A, ROTATION.B, ROTATION.C, ROTATION.D];

/** j tetromino
 * @param {Rotation} rotation
 * @returns {ShapeDescriptor} shape descriptor
 */
function j(rotation) {
  return SHAPES[J_ID][rotation];
}

/** i tetromino
 * @param {Rotation} rotation
 * @returns {ShapeDescriptor} shape descriptor
 */
function i(rotation) {
  return SHAPES[I_ID][rotation];
}

/** l tetromino
 * @param {Rotation} rotation
 * @returns {ShapeDescriptor} shape descriptor
 */
function l(rotation) {
  return SHAPES[L_ID][rotation];
}

/** o tetromino
 * @param {Rotation} rotation
 * @returns {ShapeDescriptor} shape descriptor
 */
function o(rotation) {
  return SHAPES[O_ID][rotation];
}

/** s tetromino
 * @param {Rotation} rotation
 * @returns {ShapeDescriptor} shape descriptor
 */
function s(rotation) {
  return SHAPES[S_ID][rotation];
}

/** t tetromino
 * @param {Rotation} rotation
 * @returns {ShapeDescriptor} shape descriptor
 */
function t(rotation) {
  return SHAPES[T_ID][rotation];
}

/** z tetromino
 * @param {Rotation} rotation
 * @returns {ShapeDescriptor} shape descriptor
 */
function z(rotation) {
  return SHAPES[Z_ID][rotation];
}

/** get shape by id
 * @param {ShapeID} id - shape ID
 * @param {Rotation} rotation - rotation ID
 * @returns {ShapeDescriptor} shape descriptor
 */
export function getShape(id, rotation) {
  switch (id) {
    case I_ID:
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
 * get index of current rotation from ordered list
 * @param {Rotation} rotation
 * @returns {number} index
 */
function getRotationIndex(rotation) {
  return ROTATION_ORDER.findIndex((r) => r === rotation);
}

/**
 * get next rotation from the ordered rotation list
 * @param {Rotation} rotation
 * @returns {Rotation} next rotation
 */
export function getNextRotation(rotation) {
  const i = getRotationIndex(rotation);

  if (i + 1 >= ROTATION_ORDER.length) {
    return ROTATION.A;
  }

  return ROTATION_ORDER[Math.min(i + 1, ROTATION_ORDER.length)];
}

/**
 * get previous rotation from the ordered rotation list
 * @param {Rotation} rotation
 * @returns {Rotation} next rotation
 */
export function getPreviousRotation(rotation) {
  const i = getRotationIndex(rotation);

  if (i - 1 < 0) {
    return ROTATION.D;
  }

  return ROTATION_ORDER[Math.min(i - 1, ROTATION_ORDER.length - 1)];
}

/**
 * define clockwise or anticlockwise
 * @param {Rotation} rotation
 * @param {Rotation} nextRotation
 * @returns {boolean} true = clockwise; false=anti-clockwise
 */
export function getDirection(rotation, nextRotation) {
  if (rotation === ROTATION.A && nextRotation === ROTATION.D) {
    return false;
  }

  if (rotation === ROTATION.D && nextRotation === ROTATION.A) {
    return true;
  }

  const i1 = ROTATION_ORDER.findIndex((r) => r === rotation);
  const i2 = ROTATION_ORDER.findIndex((r) => r === nextRotation);

  return i2 > i1;
}
