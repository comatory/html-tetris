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
import { pauseGame } from "../game/game.mjs";

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
  }

  function registerTouchBindings() {
    getArrowLeftButton().addEventListener("mousedown", handleMoveLeftPressed);
    getArrowLeftButton().addEventListener("mouseup", handleMoveLeftLifted);
    getArrowRightButton().addEventListener("mousedown", handleMoveRightPressed);
    getArrowRightButton().addEventListener("mouseup", handleMoveRightLifted);
    getArrowDownButton().addEventListener("mousedown", handleMoveDownPressed);
    getArrowDownButton().addEventListener("mouseup", handleMoveDownLifted);
    getClockwiseButton().addEventListener(
      "mousedown",
      handleRotateClockwisePressed
    );
    getClockwiseButton().addEventListener(
      "mouseup",
      handleRotateClockwiseLifted
    );
    getCounterClockwiseButton().addEventListener(
      "mousedown",
      handleRotateCounterClockwisePressed
    );
    getCounterClockwiseButton().addEventListener(
      "mouseup",
      handleRotateCounterClockwiseLifted
    );
    getPauseButton().addEventListener("click", handlePause);
  }

  function unregisterTouchBindings() {
    getArrowLeftButton().removeEventListener(
      "mousedown",
      handleMoveLeftPressed
    );
    getArrowLeftButton().removeEventListener("mouseup", handleMoveLeftLifted);
    getArrowRightButton().removeEventListener(
      "mousedown",
      handleMoveRightPressed
    );
    getArrowRightButton().removeEventListener("mouseup", handleMoveRightLifted);
    getArrowDownButton().removeEventListener(
      "mousedown",
      handleMoveDownPressed
    );
    getArrowDownButton().removeEventListener("mouseup", handleMoveDownLifted);
    getClockwiseButton().removeEventListener(
      "mousedown",
      handleRotateClockwisePressed
    );
    getClockwiseButton().removeEventListener(
      "mouseup",
      handleRotateClockwiseLifted
    );
    getCounterClockwiseButton().removeEventListener(
      "mousedown",
      handleRotateCounterClockwisePressed
    );
    getCounterClockwiseButton().removeEventListener(
      "mouseup",
      handleRotateCounterClockwiseLifted
    );
    getPauseButton().removeEventListener("click", handlePause);

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
