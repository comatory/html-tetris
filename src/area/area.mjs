import {
  getRoot,
  getCellTemplate,
  getWalls,
  getVariable,
} from "../utils/html.mjs";
import { ROW_THRESHOLD } from "../utils/meta.mjs";
import { isDevelopment, isProduction } from "../utils/browser.mjs";

/**
 * builds playing area
 *
 * @param {number} rows
 * @param {number} columns
 * @returns {HTMLElement}
 */
export function buildArea(rows, columns) {
  const grid = buildGrid(rows, columns);

  buildWalls(grid);

  return grid;
}

/**
 * build grid element
 *
 * @param {number} rows
 * @param {number} columns
 * @returns {HTMLElement}
 */
function buildGrid(rows, columns) {
  const root = getRoot();

  if (!root) {
    throw new Error("Root element not found.");
  }

  for (let ri = 0; ri < rows; ri++) {
    for (let ci = 0; ci < columns; ci++) {
      buildCell(`c${ci}-${ri}`, root, ri);
    }
  }

  return root;
}

/**
 * @param {string} id
 * @param {HTMLElement} parent
 * @param {number} index
 * @returns {HTMLElement}
 */
function buildCell(id, parent, index) {
  const template = getCellTemplate();

  if (!template) {
    throw new Error("Template element not found.");
  }

  const cell = template.content.cloneNode(true).querySelector(".cell");
  cell.setAttribute("id", id);

  if (isDevelopment() && index === ROW_THRESHOLD) {
    cell.style.borderTop = "2px solid darkgray";
  }

  if (isProduction() && index < ROW_THRESHOLD) {
    cell.style.display = "none";
  }

  parent.appendChild(cell);

  return cell;
}

/**
 * builds walls around area
 * @param {HTMLElement} grid
 * @returns {HTMLElement}
 */
function buildWalls(grid) {
  const [leftWall, rightWall] = getWalls();

  if (!leftWall || !rightWall) {
    throw new Error("Wall element not found.");
  }

  const height = grid.getBoundingClientRect().height;
  const size = getVariable("--size");
  const wallSpriteHeight = Number.parseFloat(size) * 0.75;
  const count = Math.ceil(height / wallSpriteHeight);

  const div = document.createElement("div");
  div.classList.add("wall");

  Array(count)
    .fill(true)
    .forEach(() => {
      leftWall.appendChild(div.cloneNode());
      rightWall.appendChild(div.cloneNode());
    });
}
