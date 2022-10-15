import { debug } from "./utils/log.mjs";
import { rows, columns } from "./utils/meta.mjs";
import { buildGrid } from "./area/size.mjs";
import { square } from "./draw/shapes.mjs";

/** starts the game */
function start() {
  debug("START");

  debug("BUILD GRID");
  const grid = buildGrid({
    rows,
    columns,
  });
  square({ x: 1, y: 2, context: { grid } });
}

document.addEventListener("DOMContentLoaded", start);
