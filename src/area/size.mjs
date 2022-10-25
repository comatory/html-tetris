import { getRoot, getCellTemplate } from "../utils/html.mjs";
import { ROW_THRESHOLD } from "../utils/meta.mjs";
import { isDevelopment } from "../utils/browser.mjs";

/**
 * builds playing area
 * @typedef {Object} BuildGridParams
 * @property {number} rows
 * @property {number} columns
 *
 * @param {BuildGridParams} options
 * @returns {HTMLElement}
 */
export function buildGrid({ rows, columns }) {
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

  if (isDevelopment && index === ROW_THRESHOLD) {
    cell.style.borderTop = "2px solid darkgray";
  }

  parent.appendChild(cell);

  return cell;
}
