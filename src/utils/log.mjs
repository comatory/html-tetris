import { isDevelopment } from "./browser.mjs";
import { COLUMNS, ROWS } from "./meta.mjs";
import { isCellEnabled } from "./shapes.mjs";

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
    switch (event.keyCode) {
      // dot
      case 190:
        debug(JSON.stringify(ref));
        break;
      // comma
      case 188: {
        const { heap } = ref;

        console.log(
          [
            "%c".padEnd(6),
            Array(COLUMNS)
              .fill(true)
              .map((_, i) => `${i}`.padEnd(2)),
          ].join(" "),
          "background-color: gray; color: white; font-weight: 600"
        );
        heap.forEach((row, i) => {
          const values = [
            `${ROWS - 1 - i}`.padEnd(2),
            ...row.map((value) => (isCellEnabled(value) ? 1 : 0)),
          ].join(" %c ");
          const colors = row.map((value) =>
            isCellEnabled(value)
              ? "background-color: green"
              : "background-color: red"
          );
          console.log(
            ` %c${values}\n`,
            "background-color: gray; color: white; font-weight: 600",
            ...colors
          );
        });
        break;
      }
      default:
        break;
    }
  });
}
