/** @type {HTMLInputElement} */
const score = document.getElementById("score");

/**
 * get root HTML element of playing area
 * @returns {HTMLElement|null} optional element
 */
export function getRoot() {
  return document.getElementById("root") ?? null;
}

/**
 * get cell template HTML element of playing area
 * @returns {HTMLElement|null} optional element
 */
export function getCellTemplate() {
  return document.getElementById("empty-cell") ?? null;
}

/**
 * constructs HTML element ID based in play area
 * @param {number} rowIndex - index of the row
 * @param {number} columnIndex - index of the column
 * @returns {string} element ID
 */
export function createCellElementId(rowIndex, columnIndex) {
  return `#c${rowIndex}-${columnIndex}`;
}

/**
 * get array of HTML elements from the grid by
 * their given IDs
 *
 * @param {Array<string>} ids - list of # ids
 * @param {HTMLElement} grid - area HTML element
 * @returns {NodeList} list of HTML elements
 */
export function getCellsByIds(ids, grid) {
  return grid.querySelectorAll(ids.join(", "));
}

/**
 * get HTML element from the grid by given ID
 *
 * @param string id - list of # ids
 * @param {HTMLElement} grid - area HTML element
 * @returns {HTMLElement} element
 */
export function getCellById(id, grid) {
  return grid.querySelector(id);
}

/**
 * get all cells in the grid
 * @param {HTMLElement} grid - area HTML element
 * @returns {NodeList} list of HTML elements
 */
export function getGridCells(grid) {
  return grid.querySelectorAll(".cell");
}

/**
 * get root style with CSS variables
 * @returns {CSS2Properties}
 */
export function getRootStyle() {
  return document.querySelector(":root").style;
}

/**
 * updates score box
 * @param {number} value
 */
export function updateScore(value) {
  score.value = value;
}
