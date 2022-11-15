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

  function handleMoveLeftClicked() {
    moveLeft(context);
  }

  function handleMoveLeftPressed() {
    ids.left = createPressCallback(() => moveLeft(context));
  }

  function handleMoveLeftLifted() {
    destroyPressCallback(ids.left);
  }

  function handleMoveRightClicked() {
    moveRight(context);
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

  function handleMoveDownClicked() {
    moveDown(context);
  }

  function handleRotateClockwisePressed() {
    ids.rotateCw = createPressCallback(() => rotateClockWise(context));
  }

  function handleRotateClockwiseLifted() {
    destroyPressCallback(ids.rotateCw);
  }

  function handleRotateClockwiseClicked() {
    rotateClockWise(context);
  }

  function handleRotateCounterClockwisePressed() {
    ids.rotateCcw = createPressCallback(() => rotateAntiClockWise(context));
  }

  function handleRotateCounterClockwiseLifted() {
    destroyPressCallback(ids.rotateCcw);
  }

  function handleRotateCounterClockwiseClicked() {
    rotateAntiClockWise(context);
  }

  function handleDocumentVisibilityChange() {
    if (document.visibilityState === "hidden") {
      destroyPressCallbacks();
    }
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
    registerEvent({
      element: getArrowLeftButton(),
      onKeydown: handleMoveLeftPressed,
      onKeyup: handleMoveLeftLifted,
      onClick: handleMoveLeftClicked,
    });
    registerEvent({
      element: getArrowRightButton(),
      onKeydown: handleMoveRightPressed,
      onKeyup: handleMoveRightLifted,
      onClick: handleMoveRightClicked,
    });
    registerEvent({
      element: getArrowDownButton(),
      onKeydown: handleMoveDownPressed,
      onKeyup: handleMoveDownLifted,
      onClick: handleMoveDownClicked,
    });
    registerEvent({
      element: getClockwiseButton(),
      onKeydown: handleRotateClockwisePressed,
      onKeyup: handleRotateClockwiseLifted,
      onClick: handleRotateClockwiseClicked,
    });
    registerEvent({
      element: getCounterClockwiseButton(),
      onKeydown: handleRotateCounterClockwisePressed,
      onKeyup: handleRotateCounterClockwiseLifted,
      onClick: handleRotateCounterClockwiseClicked,
    });
    getPauseButton().addEventListener("click", handlePause);
    document.addEventListener(
      "visibilitychange",
      handleDocumentVisibilityChange
    );
  }

  function unregisterTouchBindings() {
    destroyPressCallbacks();

    unregisterEvent({
      element: getArrowLeftButton(),
      onKeydown: handleMoveLeftPressed,
      onKeyup: handleMoveLeftLifted,
      onClick: handleMoveLeftClicked,
    });
    unregisterEvent({
      element: getArrowRightButton(),
      onKeydown: handleMoveRightPressed,
      onKeyup: handleMoveRightLifted,
      onClick: handleMoveRightClicked,
    });
    unregisterEvent({
      element: getArrowDownButton(),
      onKeydown: handleMoveDownPressed,
      onKeyup: handleMoveDownLifted,
      onClick: handleMoveDownClicked,
    });
    unregisterEvent({
      element: getClockwiseButton(),
      onKeydown: handleRotateClockwisePressed,
      onKeyup: handleRotateClockwiseLifted,
      onClick: handleRotateClockwiseClicked,
    });
    unregisterEvent({
      element: getCounterClockwiseButton(),
      onKeydown: handleRotateCounterClockwisePressed,
      onKeyup: handleRotateCounterClockwiseLifted,
      onClick: handleRotateCounterClockwiseClicked,
    });
    getPauseButton().removeEventListener("click", handlePause);
    document.removeEventListener(
      "visibilitychange",
      handleDocumentVisibilityChange
    );
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

/**
 * creates interval that will repeat callback
 *
 * @param {() => void} cb
 * @returns {number} - id
 */
function createPressCallback(cb) {
  return setInterval(cb, 200);
}

/**
 * cancels interval
 * @param {number} id
 */
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
 * @typedef {Object} RegisteredEventOptions
 * @property {HTMLElement} element
 * @property {(event: MouseEvent|TouchEvent) => void} onKeydown
 * @property {(event: MouseEvent|TouchEvent) => void} onKeyup
 * @property {(event: MouseEvent|TouchEvent) => void} onClick
 */

/**
 * sets up mouse & touch event for movement buttons
 *
 * @param {RegisteredEventOptions} options
 * @returns {void}
 */
function registerEvent({ element, onKeydown, onKeyup, onClick }) {
  element.addEventListener("click", onClick);
  element.addEventListener("mousedown", onKeydown);
  element.addEventListener("touchstart", onKeydown);
  element.addEventListener("mouseup", onKeyup);
  element.addEventListener("touchend", onKeyup);
  element.addEventListener("contextmenu", blockContextMenu);
}

/**
 * removes mouse & touch event for movement buttons
 *
 * @param {RegisteredEventOptions} options
 * @returns {void}
 */
function unregisterEvent({ element, onKeydown, onKeyup, onClick }) {
  element.removeEventListener("click", onClick);
  element.removeEventListener("mousedown", onKeydown);
  element.removeEventListener("touchstart", onKeydown);
  element.removeEventListener("mouseup", onKeyup);
  element.removeEventListener("touchend", onKeyup);
  element.removeEventListener("contextmenu", blockContextMenu);
}
