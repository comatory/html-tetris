/**
 * get root HTML element of playing area
 * @returns {HTMLElement|null} optional element
 */
export function getRoot() {
  return document.getElementById("root") ?? null;
}

/**
 * get wall elements
 * @returns {NodeList} elemens
 */
export function getWalls() {
  return document.querySelectorAll("#left-wall, #right-wall");
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
 * get CSS variable
 * @param {string} property
 * @returns {string} value
 */
export function getVariable(property) {
  return getComputedStyle(document.documentElement).getPropertyValue(property);
}

/**
 * set CSS variable
 * @param {string} property
 * @param {string|number} value
 * @returns {string} value
 */
export function setVariable(property, value) {
  document.documentElement.style.setProperty(property, value);
  return getVariable(property);
}

/**
 * updates score box
 * @param {number} value
 */
export function updateScore(value) {
  const scoreInputs = document.querySelectorAll("[data-id='score']");

  scoreInputs.forEach((score) => {
    score.value = value;
  });
}

/**
 * updates lines box
 * @param {number} value
 */
export function updateLines(value) {
  const linesInputs = document.querySelectorAll("[data-id='lines']");

  linesInputs.forEach((lines) => {
    lines.value = value;
  });
}

/**
 * get touch arrow left button
 * @returns {HTMLElement} element
 */
export function getArrowLeftButton() {
  return document.getElementById("arrow-left");
}

/**
 * get touch arrow right button
 * @returns {HTMLElement} element
 */
export function getArrowRightButton() {
  return document.getElementById("arrow-right");
}

/**
 * get touch arrow down button
 * @returns {HTMLElement} element
 */
export function getArrowDownButton() {
  return document.getElementById("arrow-down");
}

/**
 * get touch rotate counter-clockwise button
 * @returns {HTMLElement} element
 */
export function getCounterClockwiseButton() {
  return document.getElementById("rotate-ccw");
}

/**
 * get touch rotate clockwise button
 * @returns {HTMLElement} element
 */
export function getClockwiseButton() {
  return document.getElementById("rotate-cw");
}

/**
 * get touch pause button
 * @returns {HTMLElement} element
 */
export function getPauseButton() {
  return document.getElementById("pause");
}
