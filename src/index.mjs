import { buildInitialContext } from "./utils/context.mjs";
import { debug, createDebuggableContext } from "./utils/log.mjs";
import { spawn, createRandomizer } from "./draw/spawn.mjs";
import { keyBindingsFactory } from "./controls/keyboard.mjs";
import { touchBindingsFactory } from "./controls/touch.mjs";
import { startGame } from "./game/game.mjs";
import { setupAreaSize, windowResizeEventFactory } from "./area/viewport.mjs";
import { buildArea } from "./area/area.mjs";
import { ANIMATION_DURATION_IN_MS, ROWS, COLUMNS } from "./utils/meta.mjs";
import { setVariable, updateLevel } from "./utils/html.mjs";

/** setup variables */
function setupGlobals() {
  setVariable("--remove-animation-duration", `${ANIMATION_DURATION_IN_MS}ms`);
  setVariable("--rows", ROWS);
  setVariable("--columns", COLUMNS);

  const params = new URLSearchParams(window.location.search);
  const debugValue = params.get("debug");
  const isDevelopment = debugValue === "1";
  window.__ENV = isDevelopment ? "development" : "production";

  const levelValue = Number.parseInt(params.get("level"));
  window.__DEBUG_LEVEL = Number.isNaN(levelValue) ? undefined : levelValue;

  if (isDevelopment) {
    document.body.classList.add("development");
  }
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

  debug("REGISTER TOUCH BINDINGS");
  const { registerTouchBindings } = touchBindingsFactory(initialContext);
  registerTouchBindings();

  const randomizer = createRandomizer();
  const { x, y, shape } = spawn({ randomizerFn: randomizer });

  initialContext.current = {
    x,
    y,
    shape,
  };

  initialContext.nextShape = spawn({ randomizerFn: randomizer });

  if (Number.isFinite(window.__DEBUG_LEVEL)) {
    initialContext.level = window.__DEBUG_LEVEL;
  }

  updateLevel(initialContext.level);

  debug("START GAME INITIATED");
  startGame(initialContext, randomizer);
}

document.addEventListener("DOMContentLoaded", start);
