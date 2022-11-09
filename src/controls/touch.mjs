import {
  getArrowLeftButton,
  getArrowRightButton,
  getArrowDownButton,
  getClockwiseButton,
  getCounterClockwiseButton,
  getPauseButton,
} from "../utils/html.mjs";
import {} from "../utils/options.mjs";
import { moveLeft, moveRight, moveDown } from "../draw/movement.mjs";
import { rotateClockWise, rotateAntiClockWise } from "../draw/rotation.mjs";
import { pauseGame, unpauseGame, resetGame } from "../game/game.mjs";
import { openPauseDialog } from "../menu/pause.mjs";

/** @typedef {import('../utils/context.mjs').Context} Context */

/**
 * @typedef {Object} TouchBindings
 * @property {() => void} registerTouchBindings
 * @property {() => void} unregisterTouchBindings
 *
 * create object for subscribing and unsubscribing to
 * touch events
 * @param {Context} context
 * @returns {TouchBindings} bindings object
 */
export function touchBindingsFactory(context) {
  const ids = {
    left: null,
    right: null,
    down: null,
    rotateCw: null,
    rotateCcw: null,
  };

  function handleMoveLeftPressed() {
    ids.left = createPressCallback(() => moveLeft(context));
  }

  function handleMoveLeftLifted() {
    destroyPressCallback(ids.left);
  }

  function handleMoveRightPressed() {
    ids.right = createPressCallback(() => moveRight(context));
  }

  function handleMoveRightLifted() {
    destroyPressCallback(ids.right);
  }

  function handleMoveDownPressed() {
    ids.down = createPressCallback(() => moveDown(context));
  }

  function handleMoveDownLifted() {
    destroyPressCallback(ids.down);
  }

  function handleRotateClockwisePressed() {
    ids.rotateCw = createPressCallback(() => rotateClockWise(context));
  }

  function handleRotateClockwiseLifted() {
    destroyPressCallback(ids.rotateCw);
  }

  function handleRotateCounterClockwisePressed() {
    ids.rotateCcw = createPressCallback(() => rotateAntiClockWise(context));
  }

  function handleRotateCounterClockwiseLifted() {
    destroyPressCallback(ids.rotateCcw);
  }

  function handlePause() {
    pauseGame(context);
    openPauseDialog({
      quit: () => {
        unregisterTouchBindings();
        resetGame(context);
      },
      back: () => {
        unpauseGame(context);
      },
    });
  }

  function registerTouchBindings() {
    registerEvent(
      getArrowLeftButton(),
      handleMoveLeftPressed,
      handleMoveLeftLifted
    );
    registerEvent(
      getArrowRightButton(),
      handleMoveRightPressed,
      handleMoveRightLifted
    );
    registerEvent(
      getArrowDownButton(),
      handleMoveDownPressed,
      handleMoveDownLifted
    );
    registerEvent(
      getClockwiseButton(),
      handleRotateClockwisePressed,
      handleRotateClockwiseLifted
    );
    registerEvent(
      getCounterClockwiseButton(),
      handleRotateCounterClockwisePressed,
      handleRotateCounterClockwiseLifted
    );
    getPauseButton().addEventListener("click", handlePause);
  }

  function unregisterTouchBindings() {
    destroyPressCallbacks();

    unregisterEvent(
      getArrowLeftButton(),
      handleMoveLeftPressed,
      handleMoveLeftLifted
    );
    unregisterEvent(
      getArrowRightButton(),
      handleMoveRightPressed,
      handleMoveRightLifted
    );
    unregisterEvent(
      getArrowDownButton(),
      handleMoveDownPressed,
      handleMoveDownLifted
    );
    unregisterEvent(
      getClockwiseButton(),
      handleRotateClockwisePressed,
      handleRotateClockwiseLifted
    );
    unregisterEvent(
      getCounterClockwiseButton(),
      handleRotateCounterClockwisePressed,
      handleRotateCounterClockwiseLifted
    );
    getPauseButton().removeEventListener("click", handlePause);
  }

  function destroyPressCallbacks() {
    Object.values(ids).forEach((id) => {
      if (!id) {
        return;
      }

      destroyPressCallback(id);
    });
  }

  return {
    registerTouchBindings,
    unregisterTouchBindings,
  };
}

function createPressCallback(cb) {
  return setInterval(cb, 100);
}

function destroyPressCallback(id) {
  return clearInterval(id);
}

/**
 * block context menu on touch / mouse event
 *
 * @param {(event: MouseEvent|TouchEvent) => void} event
 * @returns {void}
 */
function blockContextMenu(event) {
  event.preventDefault();
}

/**
 * sets up mouse & touch event for movement buttons
 *
 * @param {HTMLElement} element
 * @param {(event: MouseEvent|TouchEvent) => void} activateCb
 * @param {(event: MouseEvent|TouchEvent) => void} deactivateCb
 * @returns {void}
 */
function registerEvent(element, activateCb, deactivateCb) {
  element.addEventListener("mousedown", activateCb);
  element.addEventListener("touchstart", activateCb);
  element.addEventListener("mouseup", deactivateCb);
  element.addEventListener("touchend", deactivateCb);
  element.addEventListener("contextmenu", blockContextMenu);
}

/**
 * removes mouse & touch event for movement buttons
 *
 * @param {HTMLElement} element
 * @param {(event: MouseEvent|TouchEvent) => void} activateCb
 * @param {(event: MouseEvent|TouchEvent) => void} deactivateCb
 * @returns {void}
 */
function unregisterEvent(element, activateCb, deactivateCb) {
  element.removeEventListener("mousedown", activateCb);
  element.removeEventListener("touchstart", activateCb);
  element.removeEventListener("mouseup", deactivateCb);
  element.removeEventListener("touchend", deactivateCb);
  element.removeEventListener("contextmenu", blockContextMenu);
}
