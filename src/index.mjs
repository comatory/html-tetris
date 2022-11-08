import { debug } from "./utils/log.mjs";
import { startGame } from "./game/game.mjs";
import { setupAreaSize, windowResizeEventFactory } from "./area/viewport.mjs";
import { buildArea } from "./area/area.mjs";
import { ANIMATION_DURATION_IN_MS, ROWS, COLUMNS } from "./utils/meta.mjs";
import { setVariable } from "./utils/html.mjs";
import { openMainDialog } from "./menu/main.mjs";
import { prepare } from "./game/prepare.mjs";
import { setupTouchControls } from "./controls/setup.mjs";
import { loadSounds } from "./sound/prepare.mjs";
import { isAudioUnset, setAudioControls, AUDIO_ON } from "./utils/options.mjs";

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

async function boot() {
  debug("BOOT");

  debug("LOAD SOUNDS");
  await loadSounds();

  if (isAudioUnset()) {
    setAudioControls(AUDIO_ON);
  }

  start();
}

/** starts the game */
function start() {
  setupGlobals();

  debug("START");

  debug("SETUP VIEWPORT");
  setupTouchControls();
  setupAreaSize();
  const { registerResizeListener } = windowResizeEventFactory();
  registerResizeListener();

  debug("BUILD AREA");
  const grid = buildArea(ROWS, COLUMNS);

  const { initialContext, randomizer } = prepare(grid);

  openMainDialog({
    start: () => startGame(initialContext, randomizer),
  });
}

document.addEventListener("DOMContentLoaded", boot);
