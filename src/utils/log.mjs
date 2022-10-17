import { isDevelopment } from "./meta.mjs";

/** @typedef {import('./context.mjs').Context} Context */

const DEBUG_STYLING = `
  background-color: hotpink;
  color: #fff;
  padding: 3px 6px;
  border-radius: 3px;
  font-family: monospace;
  font-weight: 600;
  font-size: 0.92rem;
`;

/** debug logging */
export function debug(...parts) {
  if (!isDevelopment) {
    return;
  }

  console.debug(`%c${parts.join(" ")}`, DEBUG_STYLING);
}

/**
 * create inspectable context
 * @param {Context} ref - reference to context
 */
export function createDebuggableContext(ref) {
  if (!isDevelopment) {
    return;
  }

  debug("REGISTERED CONTEXT DEBUGGING");

  document.addEventListener("keydown", (event) => {
    // dot
    if (event.keyCode !== 190) {
      return;
    }

    debug(JSON.stringify(ref));
  });
}
