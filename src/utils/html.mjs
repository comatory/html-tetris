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

export function getCellByCoordinates(x, y, grid) {
  const id = `#c${x}-${y}`;

  return grid.querySelector(id) ?? null;
}

export function getCellsByIds(ids, grid) {
  return grid.querySelectorAll(ids.join(", "));
}
