import { deepFreeze } from "./meta.mjs";

/**
 * @typedef {Record<string, string>} ClearedRowAmountId
 */

/**
 * how many lines were cleared during the turn
 * @type {ClearedRowAmountId}
 */
const CLEARED_ROW_AMOUNT_IDS = deepFreeze({
  ONE: "1",
  TWO: "2",
  THREE: "3",
  FOUR: "4",
});

/** @type {Array<ClearedRowAmountId>} */
const ROW_AMOUNT_IDS = deepFreeze([
  CLEARED_ROW_AMOUNT_IDS.ONE,
  CLEARED_ROW_AMOUNT_IDS.TWO,
  CLEARED_ROW_AMOUNT_IDS.THREE,
  CLEARED_ROW_AMOUNT_IDS.FOUR,
]);

/**
 * calculates new score based on level and cleared rows
 * @param {number} numberOfRows - number of removed rows
 * @param {number} level - current level
 * @returns {number} score
 */
export function getScore(numberOfRows, level) {
  const rowId = ROW_AMOUNT_IDS[numberOfRows - 1];

  if (!rowId) {
    throw new Error("Missing row id.");
  }

  switch (rowId) {
    case CLEARED_ROW_AMOUNT_IDS.FOUR:
      return 1200 * (level + 1);
    case CLEARED_ROW_AMOUNT_IDS.THREE:
      return 300 * (level + 1);
    case CLEARED_ROW_AMOUNT_IDS.TWO:
      return 100 * (level + 1);
    case CLEARED_ROW_AMOUNT_IDS.ONE:
    default:
      return 40 * (level + 1);
  }
}
