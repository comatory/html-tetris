import {
  I_ID,
  J_ID,
  L_ID,
  O_ID,
  S_ID,
  T_ID,
  Z_ID,
  ROTATION,
} from "./shapes.mjs";
import { deepFreeze } from "../utils/meta.mjs";

/** @typedef {import("./shapes.mjs").ShapeID} ShapeID */
/** @typedef {import("./shapes.mjs").Rotation} Rotation */

const CLASSNAME_MAP = deepFreeze({
  [I_ID]: {
    [ROTATION.A]: [
      [["i", "i-head"]],
      [["i", "i-middle"]],
      [["i", "i-middle"]],
      [["i", "i-tail"]],
    ],
    [ROTATION.B]: [
      [
        ["i", "i-head-vertical"],
        ["i", "i-middle-vertical"],
        ["i", "i-middle-vertical"],
        ["i", "i-tail-vertical"],
      ],
    ],
    [ROTATION.C]: [
      [["i", "i-head"]],
      [["i", "i-middle"]],
      [["i", "i-middle"]],
      [["i", "i-tail"]],
    ],
    [ROTATION.D]: [
      [
        ["i", "i-head-vertical"],
        ["i", "i-middle-vertical"],
        ["i", "i-middle-vertical"],
        ["i", "i-tail-vertical"],
      ],
    ],
  },
  [J_ID]: "j",
  [L_ID]: "l",
  [O_ID]: "o",
  [S_ID]: "s",
  [T_ID]: "t",
  [Z_ID]: "z",
});

/**
 * @typedef {Object} GetSpriteClassNameOptions
 * @property {number} columnIndex - y coordinate of shape
 * @property {number} rowIndex - x coordinate of shape
 *
 * produce class name for given sprite
 * @param {ShapeID} shapeId
 * @param {Rotation} rotation
 * @param {GetSpriteClassNameOptions} options
 * @returns {string} class name
 */
export function getSpriteClassName(
  shapeId,
  rotation,
  { columnIndex, rowIndex }
) {
  const item = CLASSNAME_MAP[shapeId];

  if (typeof item === "object") {
    return item[rotation][rowIndex][columnIndex].join(" ");
  }

  return item;
}
