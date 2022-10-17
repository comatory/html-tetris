import { buildInitialContext } from "./utils/context.mjs";
import { debug } from "./utils/log.mjs";
import { z, ROTATION } from "./draw/shapes.mjs";
import { draw } from "./draw/utils.mjs";

/** starts the game */
function start() {
  debug("START");

  debug("BUILD CONTEXT");
  const initialContext = buildInitialContext();

  const shape = z(ROTATION.D);
  draw({ x: 2, y: 3, shape, context: initialContext });
}

document.addEventListener("DOMContentLoaded", start);
