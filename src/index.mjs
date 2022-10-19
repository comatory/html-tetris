import { buildInitialContext } from "./utils/context.mjs";
import { debug, createDebuggableContext } from "./utils/log.mjs";
import { getShape, ROTATION, I_ID } from "./draw/shapes.mjs";
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

  const shape = getShape(I_ID, ROTATION.A);
  draw({ x: 0, y: 0, shape, context: initialContext });

  initialContext.current = {
    x: 0,
    y: 0,
    shape,
  };

  /*
  let step = null;

  function testLoop(time) {
    if (!step) {
      step = time;
    }

    const elapsed = time - step;

    if (elapsed > 1000) {
      const nextY = initialContext.current.y + 1;
      draw({
        x: initialContext.current.x,
        y: nextY,
        shape,
        context: initialContext,
      });

      initialContext.current.y = nextY;
      step = time;
    }

    window.requestAnimationFrame(testLoop);
  }

  window.requestAnimationFrame(testLoop);
  */
}

document.addEventListener("DOMContentLoaded", start);
