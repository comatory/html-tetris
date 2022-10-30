import { buildInitialContext } from "./utils/context.mjs";
import { debug, createDebuggableContext } from "./utils/log.mjs";
import { spawn } from "./draw/spawn.mjs";
import { keyBindingsFactory } from "./controls/keyboard.mjs";
import { startGame } from "./game/game.mjs";
import { setupAreaSize, windowResizeEventFactory } from "./area/viewport.mjs";
import { buildArea } from "./area/area.mjs";
import { ANIMATION_DURATION_IN_MS, ROWS, COLUMNS } from "./utils/meta.mjs";
import { getRootStyle } from "./utils/html.mjs";

/** setup variables */
function setupGlobals() {
  const rootStyle = getRootStyle();
  rootStyle.setProperty(
    "--remove-animation-duration",
    `${ANIMATION_DURATION_IN_MS}ms`
  );
  rootStyle.setProperty("--rows", ROWS);
  rootStyle.setProperty("--columns", COLUMNS);

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

  debug("BUILD AREA");
  const grid = buildArea(ROWS, COLUMNS);

  debug("BUILD CONTEXT");
  const initialContext = buildInitialContext(grid);
  createDebuggableContext(initialContext);

  debug("REGISTER KEY BINDINGS");
  const { registerKeyBindings } = keyBindingsFactory(initialContext);
  registerKeyBindings();

  const { x, y, shape } = spawn({
    x: 3,
    y: 0,
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
