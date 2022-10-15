import { getCellsByIds } from "../utils/html.mjs";

export function draw({
  x,
  y,
  shape,
  context,
}) {
  const { grid } = context;
  const ids = getShapeIds(x, y, shape)
  const cells = getCellsByIds(ids, grid);

  for (const cell of cells) {
    cell.style.background = 'red';
  }
}

function getShapeIds(x, y, shape) {
  const ids = [];

  for (let hi = 0; hi < shape.w; hi++) {
    for (let vi = 0; vi < shape.h; vi++) {
      ids.push(`#c${x + hi}-${y + vi}`);
    }
  }

  return ids;
}
