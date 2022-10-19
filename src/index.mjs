import { buildInitialContext } from "./utils/context.mjs";
import { debug, createDebuggableContext } from "./utils/log.mjs";
import { getShape } from "./draw/shapes.mjs";
import { draw } from "./draw/utils.mjs";
import { spawn, getSpawnShapeData } from "./draw/spawn.mjs";
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

  const { id, rotation } = getSpawnShapeData();
  const shape = getShape(id, rotation);
  const { x, y } = spawn({
    id,
    x: 3,
    y: 0,
    rotation: shape.rotation,
  });
  draw({ x, y, shape, context: initialContext });

  initialContext.current = {
    x,
    y,
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
