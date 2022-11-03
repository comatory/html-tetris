import { deepFreeze } from "./meta.mjs";

/**
 * @typedef {Record<string, string>} ClearedRowAmountId
 *
 * @typedef {Object} ScoreEntry
 * @property {number} place
 * @property {number} value
 *
 * @typedef {Array<ScoreEntry>} ScoreEntries
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

/**
 * retrieve scores
 *
 * @returns {ScoreEntries} - sorted score entry objects
 */
export function getScores() {
  const entries = getStorageEntry();
  return sortScoresByPlace(entries);
}

/**
 * updates score
 *
 * @param {number} score - achieved score
 * @returns {ScoreEntries} - updated score
 */
export function addScore(score) {
  const scores = getStorageEntry();

  if (scores.length === 0) {
    window.localStorage.setItem(
      "scores",
      JSON.stringify([{ place: 1, value: score }])
    );
    return getStorageEntry();
  }

  const unsortedScoreEntries = [...scores, { place: 0, value: score }];
  const sortedScoreEntriesByScore = unsortedScoreEntries
    .sort((a, b) => {
      return b.value - a.value;
    })
    .map((entry, index) => ({ ...entry, place: index + 1 }))
    .slice(0, 5);

  window.localStorage.setItem(
    "scores",
    JSON.stringify(sortedScoreEntriesByScore)
  );
  return getStorageEntry();
}

/**
 * retrieves stored scores
 * @returns {ScoreEntries} stored entries
 */
function getStorageEntry() {
  const stored = window.localStorage.getItem("scores") ?? createStorageEntry();

  return JSON.parse(stored);
}

/**
 * creates empty local storage entry
 *
 * @returns {string} empty value
 */
function createStorageEntry() {
  const empty = JSON.stringify([]);
  window.localStorage.setItem("scores", empty);

  return empty;
}

/**
 * sort scores
 *
 * @param {ScoreEntries} entries
 * @returns {ScoreEntries} - sorted entries
 */
function sortScoresByPlace(entries) {
  return [...entries].sort((a, b) => {
    return a.place - b.place;
  });
}
