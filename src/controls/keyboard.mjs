import { debug } from "../utils/log.mjs";
import { moveLeft, moveRight, moveDown } from "../draw/movement.mjs";
import { rotateClockWise } from "../draw/rotation.mjs";

/** @typedef {import('../utils/context.mjs').Context} Context */

const ARROW_DOWN_KEY = 40;
const ARROW_UP_KEY = 38;
const ARROW_LEFT_KEY = 37;
const ARROW_RIGHT_KEY = 39;
const Z_KEY = 90;
const X_KEY = 88;

/**
 * create object for subscribing and unsubscribing
 * to keyboard events
 * @param {Context} context
 */
export function keyBindingsFactory(context) {
  function handleKey(event) {
    switch (event.keyCode) {
      case ARROW_DOWN_KEY:
        debug("down key pressed");
        moveDown(context);
        break;
      case ARROW_UP_KEY:
        debug("up key pressed");
        break;
      case ARROW_LEFT_KEY:
        debug("left key pressed");
        moveLeft(context);
        break;
      case ARROW_RIGHT_KEY:
        debug("right key pressed");
        moveRight(context);
        break;
      case Z_KEY:
        debug("z key pressed");
        break;
      case X_KEY:
        debug("x key pressed");
        rotateClockWise(context);
        break;
    }
  }

  function registerKeyBindings() {
    document.addEventListener("keydown", handleKey);
  }

  function unregisterKeyBindings() {
    document.removeEventListener("keydown", handleKey);
  }

  return {
    registerKeyBindings,
    unregisterKeyBindings,
  };
}
