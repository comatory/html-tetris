import { buildInitialContext } from "./utils/context.mjs";
import { debug, createDebuggableContext } from "./utils/log.mjs";
import { getShape } from "./draw/shapes.mjs";
import { spawn, getSpawnShapeData } from "./draw/spawn.mjs";
import { keyBindingsFactory } from "./controls/keyboard.mjs";
import { startGame } from "./game/game.mjs";
import { setupAreaSize, windowResizeEventFactory } from "./area/viewport.mjs";
import { ANIMATION_DURATION_IN_MS } from "./utils/meta.mjs";

/** setup variables */
function setupGlobals() {
  document.documentElement.style.setProperty(
    "--remove-animation-duration",
    `${ANIMATION_DURATION_IN_MS}ms`
  );
  const debugValue = new URLSearchParams(window.location.search).get("debug");
  const isDevelopment = debugValue === "1";
  window.__ENV = isDevelopment ? "development" : "production";
}

/** starts the game */
function start() {
  debug("START");

  debug("SETUP GLOBALS");
  setupGlobals();

  debug("SETUP VIEWPORT");
  setupAreaSize();
  const { registerResizeListener } = windowResizeEventFactory();
  registerResizeListener();

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

  initialContext.current = {
    x,
    y,
    shape,
  };

  debug("START GAME INITIATED");
  startGame(initialContext);
}

document.addEventListener("DOMContentLoaded", start);
