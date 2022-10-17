import { buildInitialContext } from "./utils/context.mjs";
import { debug, createDebuggableContext } from "./utils/log.mjs";
import { z, ROTATION } from "./draw/shapes.mjs";
import { draw } from "./draw/utils.mjs";
import { keyBindingsFactory } from "./controls/keyboard.mjs";

/** starts the game */
function start() {
  debug("START");

  debug("BUILD CONTEXT");
  const initialContext = buildInitialContext();
  createDebuggableContext(initialContext);

  debug("REGISTER KEY BINDINGS");
  const { registerKeyBindings } = keyBindingsFactory(initialContext);
  registerKeyBindings();

  const shape = z(ROTATION.D);
  draw({ x: 2, y: 3, shape, context: initialContext });

  initialContext.current = {
    x: 2,
    y: 3,
    shape,
  };
}

document.addEventListener("DOMContentLoaded", start);
