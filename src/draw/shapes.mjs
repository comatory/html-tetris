import { deepFreeze } from "../utils/meta.mjs";

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
const I_A = deepFreeze([[1], [1], [1], [1]]);
/** @type {Shape} */
const I_B = deepFreeze([[1, 1, 1, 1]]);
/** @type {Shape} */
const I_C = I_A;
/** @type {Shape} */
const I_D = I_B;
/** @type {ShapeMap} */
const I_MAP = deepFreeze({
  [ROTATION.A]: {
    id: I_ID,
    value: I_A,
    rotation: ROTATION.A,
  },
  [ROTATION.B]: {
    id: I_ID,
    value: I_B,
    rotation: ROTATION.B,
  },
  [ROTATION.C]: {
    id: I_ID,
    value: I_C,
    rotation: ROTATION.C,
  },
  [ROTATION.D]: {
    id: I_ID,
    value: I_D,
    rotation: ROTATION.D,
  },
});

/** @type {Shape} */
const J_A = deepFreeze([
  [1, 1],
  [0, 1],
  [0, 1],
]);
/** @type {Shape} */
const J_B = deepFreeze([
  [1, 1, 1],
  [1, 0, 0],
]);
/** @type {Shape} */
const J_C = deepFreeze([
  [1, 0],
  [1, 0],
  [1, 1],
]);
/** @type {Shape} */
const J_D = deepFreeze([
  [0, 0, 1],
  [1, 1, 1],
]);
/** @type {ShapeMap} */
const J_MAP = deepFreeze({
  [ROTATION.A]: {
    id: J_ID,
    value: J_A,
    rotation: ROTATION.A,
  },
  [ROTATION.B]: {
    id: J_ID,
    value: J_B,
    rotation: ROTATION.B,
  },
  [ROTATION.C]: {
    id: J_ID,
    value: J_C,
    rotation: ROTATION.C,
  },
  [ROTATION.D]: {
    id: J_ID,
    value: J_D,
    rotation: ROTATION.D,
  },
});

/** @type {Shape} */
const L_A = deepFreeze([
  [0, 1],
  [0, 1],
  [1, 1],
]);
/** @type {Shape} */
const L_B = deepFreeze([
  [1, 1, 1],
  [0, 0, 1],
]);
/** @type {Shape} */
const L_C = deepFreeze([
  [1, 1],
  [1, 0],
  [1, 0],
]);
/** @type {Shape} */
const L_D = deepFreeze([
  [1, 0, 0],
  [1, 1, 1],
]);
/** @type {ShapeMap} */
const L_MAP = deepFreeze({
  [ROTATION.A]: {
    id: L_ID,
    value: L_A,
    rotation: ROTATION.A,
  },
  [ROTATION.B]: {
    id: L_ID,
    value: L_B,
    rotation: ROTATION.B,
  },
  [ROTATION.C]: {
    id: L_ID,
    value: L_C,
    rotation: ROTATION.C,
  },
  [ROTATION.D]: {
    id: L_ID,
    value: L_D,
    rotation: ROTATION.D,
  },
});

/** @type {Shape} */
const O_A = deepFreeze([
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
const O_MAP = deepFreeze({
  [ROTATION.A]: {
    id: O_ID,
    value: O_A,
    rotation: ROTATION.A,
  },
  [ROTATION.B]: {
    id: O_ID,
    value: O_B,
    rotation: ROTATION.B,
  },
  [ROTATION.C]: {
    id: O_ID,
    value: O_C,
    rotation: ROTATION.C,
  },
  [ROTATION.D]: {
    id: O_ID,
    value: O_D,
    rotation: ROTATION.D,
  },
});

/** @type {Shape} */
const S_A = deepFreeze([
  [0, 1],
  [1, 1],
  [1, 0],
]);
/** @type {Shape} */
const S_B = deepFreeze([
  [1, 1, 0],
  [0, 1, 1],
]);
/** @type {Shape} */
const S_C = S_A;
/** @type {Shape} */
const S_D = S_B;
/** @type {ShapeMap} */
const S_MAP = deepFreeze({
  [ROTATION.A]: {
    id: S_ID,
    value: S_A,
    rotation: ROTATION.A,
  },
  [ROTATION.B]: {
    id: S_ID,
    value: S_B,
    rotation: ROTATION.B,
  },
  [ROTATION.C]: {
    id: S_ID,
    value: S_C,
    rotation: ROTATION.C,
  },
  [ROTATION.D]: {
    id: S_ID,
    value: S_D,
    rotation: ROTATION.D,
  },
});

/** @type {Shape} */
const T_A = deepFreeze([
  [0, 1],
  [1, 1],
  [0, 1],
]);
/** @type {Shape} */
const T_B = deepFreeze([
  [1, 1, 1],
  [0, 1, 0],
]);
/** @type {Shape} */
const T_C = deepFreeze([
  [1, 0],
  [1, 1],
  [1, 0],
]);
/** @type {Shape} */
const T_D = deepFreeze([
  [0, 1, 0],
  [1, 1, 1],
]);
/** @type {ShapeMap} */
const T_MAP = deepFreeze({
  [ROTATION.A]: {
    id: T_ID,
    value: T_A,
    rotation: ROTATION.A,
  },
  [ROTATION.B]: {
    id: T_ID,
    value: T_B,
    rotation: ROTATION.B,
  },
  [ROTATION.C]: {
    id: T_ID,
    value: T_C,
    rotation: ROTATION.C,
  },
  [ROTATION.D]: {
    id: T_ID,
    value: T_D,
    rotation: ROTATION.D,
  },
});

/** @type {Shape} */
const Z_A = deepFreeze([
  [1, 0],
  [1, 1],
  [0, 1],
]);
/** @type {Shape} */
const Z_B = deepFreeze([
  [0, 1, 1],
  [1, 1, 0],
]);
/** @type {Shape} */
const Z_C = Z_A;
/** @type {Shape} */
const Z_D = Z_B;
/** @type {ShapeMap} */
const Z_MAP = deepFreeze({
  [ROTATION.A]: {
    id: Z_ID,
    value: Z_A,
    rotation: ROTATION.A,
  },
  [ROTATION.B]: {
    id: Z_ID,
    value: Z_B,
    rotation: ROTATION.B,
  },
  [ROTATION.C]: {
    id: Z_ID,
    value: Z_C,
    rotation: ROTATION.C,
  },
  [ROTATION.D]: {
    id: Z_ID,
    value: Z_D,
    rotation: ROTATION.D,
  },
});

/** @type {ShapesMap} */
const SHAPES = deepFreeze({
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
