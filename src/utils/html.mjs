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
