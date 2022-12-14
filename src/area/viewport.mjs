import { ROWS, ROW_THRESHOLD } from "../utils/meta.mjs";
import { debug } from "../utils/log.mjs";
import { getVariable, setVariable } from "../utils/html.mjs";
import { isDevelopment } from "../utils/browser.mjs";

/**
 * looks at size of the parent element of the
 * play area and sets up cell sizes proportionately
 * @returns {void}
 */
export function setupAreaSize() {
  const infoSm = document.getElementById("info-sm");
  const infoSmIsVisible = getComputedStyle(infoSm).display !== "none";
  const touchControls = document.getElementById("touch-controls");
  const touchControlsIsVisible =
    getComputedStyle(touchControls).display !== "none";
  const infoSmHeight = infoSmIsVisible
    ? Number.parseFloat(getVariable("--info-sm-panel-height"))
    : 0;
  const touchControlsHeight = touchControlsIsVisible
    ? Number.parseFloat(getVariable("--touch-controls-panel-height"))
    : 0;

  const height = window.innerHeight;
  const visibleRowCount = isDevelopment() ? ROWS : ROWS - ROW_THRESHOLD;
  const cellHeight =
    (height - infoSmHeight - touchControlsHeight) / visibleRowCount;

  setVariable("--size", `${cellHeight}px`);

  debug(`CELL SIZE SET TO ${cellHeight}PX`);
}

/**
 * @typedef {Object} WindowResizeEvents
 * @property {() => void} registerResizeListener
 * @property {() => void} unregisterResizeListener
 *
 * creates functions that will set up listener
 * on window to re-adjust cell sizes based
 * on current viewport
 * @returns {WindowResizeEvents} register and unregister fns object
 */
export function windowResizeEventFactory() {
  return {
    registerResizeListener: () =>
      window.addEventListener("resize", setupAreaSize),
    unregisterResizeListener: () =>
      window.removeEventListener("resize", setupAreaSize),
  };
}
