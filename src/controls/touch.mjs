import {
  getArrowLeftButton,
  getArrowRightButton,
  getArrowDownButton,
  getClockwiseButton,
  getCounterClockwiseButton,
  getPauseButton,
} from "../utils/html.mjs";
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
  function handleMoveLeft() {
    moveLeft(context);
  }

  function handleMoveRight() {
    moveRight(context);
  }

  function handleMoveDown() {
    moveDown(context);
  }

  function handleRotateClockwise() {
    rotateClockWise(context);
  }

  function handleRotateCounterClockwise() {
    rotateAntiClockWise(context);
  }

  function handlePause() {
    pauseGame(context);
  }

  function registerTouchBindings() {
    getArrowLeftButton().addEventListener("click", handleMoveLeft);
    getArrowRightButton().addEventListener("click", handleMoveRight);
    getArrowDownButton().addEventListener("click", handleMoveDown);
    getClockwiseButton().addEventListener("click", handleRotateClockwise);
    getCounterClockwiseButton().addEventListener(
      "click",
      handleRotateCounterClockwise
    );
    getPauseButton().addEventListener("click", handlePause);
  }

  function unregisterTouchBindings() {
    getArrowLeftButton().removeEventListener("click", handleMoveLeft);
    getArrowRightButton().removeEventListener("click", handleMoveRight);
    getArrowDownButton().removeEventListener("click", handleMoveDown);
    getClockwiseButton().removeEventListener("click", handleRotateClockwise);
    getCounterClockwiseButton().addEventListener(
      "click",
      handleRotateCounterClockwise
    );
    getPauseButton().removeEventListener("click", handlePause);
  }

  return {
    registerTouchBindings,
    unregisterTouchBindings,
  };
}
