import { dialogBindingsFactory } from "./controls.mjs";
import { getScores } from "../utils/score.mjs";

/** @typedef {import('../utils/score.mjs').ScoreEntry} ScoreEntry */

/**
 * get high scores dialog element
 * @returns {HTMLDialogElement}
 */
function getScoresDialog() {
  return document.getElementById("scores-menu");
}

/**
 * get table body for inserting scores
 *
 * @returns {HTMLTableElement} element
 */
function getScoresTableBody() {
  return document.querySelector("#scores-table tbody");
}

function getScoresTableTitle() {
  return document.getElementById("scores-menu-title");
}

/**
 * create row for displaying place and score
 *
 * @param {ScoreEntry} score
 * @param {number} [achievedScore]
 *
 * @returns {HTMLTableRowElement} element
 */
function createScoresRow(score, achievedScore) {
  const row = document.createElement("tr");
  const placeCell = document.createElement("td");
  const scoreCell = document.createElement("td");
  placeCell.innerText = `${score.place}.`;
  scoreCell.innerText = `\t${score.value}`;

  if (Number.isFinite(achievedScore) && score.value === achievedScore) {
    placeCell.classList.add("blink");
    scoreCell.classList.add("blink");
  }

  row.append(placeCell, scoreCell);

  return row;
}

/**
 * @typedef {Object} OpenScoresDialogOptions
 * @property {() => void} back - close pause dialog and return to previous location
 * @property {number} [achievedScore] - optionally higlight achieved score if applicable
 * @property {string} [title] - optional dialog title
 *
 * opens high scores dialog
 * @param {OpenScoresDialogOptions} options
 * @returns {void}
 */
export function openScoresDialog({ back, achievedScore, title }) {
  const dialog = getScoresDialog();

  const scores = getScores();
  const table = getScoresTableBody();
  table.innerHTML = "";

  scores.forEach((score) => {
    table.appendChild(createScoresRow(score, achievedScore));
  });

  getScoresTableTitle().innerText = title ?? "";

  function onSubmit(value) {
    switch (value) {
      case 1:
        dialog.close();
        back();
        break;
      default:
        break;
    }
  }

  const { registerDialogCallbacks } = dialogBindingsFactory({
    dialog,
    submitFn: onSubmit,
  });

  dialog.showModal();
  registerDialogCallbacks();
}
