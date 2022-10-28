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
import { deepFreeze, ANIMATION_DURATION_IN_MS } from "../utils/meta.mjs";
import { createCellElementId, getCellsByIds } from "../utils/html.mjs";

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

/**
 * plays animation before removing rows
 * @param {Array<string> rowIndices - rows to remove
 * @param {Heap} heap
 * @param {HTMLElement} grid
 * @returns {void}
 */
export function playRemoveAnimation(rowIndices, heap, grid) {
  const ids = collectRowIds(rowIndices, heap);
  const cells = getCellsByIds(ids, grid);

  return new Promise((resolve) => {
    for (const cell of cells) {
      cell.classList.add("removing");
    }
    setTimeout(() => {
      for (const cell of cells) {
        cell.classList.remove("removing");
      }
      resolve();
    }, ANIMATION_DURATION_IN_MS);
  });
}

function collectRowIds(rowIndices, heap) {
  return rowIndices.map((index) => {
    return heap[index].map((_, columnIndex) =>
      createCellElementId(columnIndex, index)
    );
  });
}
