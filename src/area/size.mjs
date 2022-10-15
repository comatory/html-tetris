import { getRoot, getCellTemplate } from '../utils/html.mjs';

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
    throw new Error('Root element not found.');
  }

  for (let ri = 0; ri < rows; ri++) {
    for (let ci = 0; ci < columns; ci++) {
      buildCell(`c${ci}-${ri}`, root);
    }
  }

  return root;
}

/**
 * @param {string} id
 * @param {HTMLElement} parent
 * @returns {HTMLElement}
 */
function buildCell(id, parent) {
  const template = getCellTemplate();

  if (!template) {
    throw new Error('Template element not found.');
  }

  const cell = template.content.cloneNode(true).querySelector('.cell');
  cell.setAttribute('id', id);
  parent.appendChild(cell);

  return cell;
}
