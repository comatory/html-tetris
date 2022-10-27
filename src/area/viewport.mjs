import { ROWS } from "../utils/meta.mjs";
import { debug } from "../utils/log.mjs";

/**
 * looks at size of the parent element of the
 * play area and sets up cell sizes proportionately
 * @returns {void}
 */
export function setupAreaSize() {
  const center = document.getElementById("center");
  const { height } = center.getBoundingClientRect();
  const cellHeight = height / ROWS;

  document.documentElement.style.setProperty("--size", `${cellHeight}px`);

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
