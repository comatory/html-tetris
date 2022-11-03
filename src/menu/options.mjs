import { dialogBindingsFactory } from "./controls.mjs";
import {
  getTouchControlValue,
  getNextTouchControlValue,
  setTouchControls,
  TOUCH_CONTROL_ON,
  TOUCH_CONTROL_OFF,
  TOUCH_CONTROL_AUTO,
} from "../utils/options.mjs";

/**
 * get main dialog element
 * @returns {HTMLDialogElement}
 */
function getOptionsDialog() {
  return document.getElementById("options-menu");
}

/**
 * touch control settings
 *
 * @returns {HTMLLabelElement}
 */
function getTouchControlsLabel() {
  return document.querySelector('label[for="options-touch-controls"]');
}

/**
 * get label for touch control option
 *
 * @returns {string}
 */
function getTouchControlLabelText(id) {
  switch (id) {
    case TOUCH_CONTROL_ON:
      return "Touch always";
    case TOUCH_CONTROL_OFF:
      return "Touch disabled";
    case TOUCH_CONTROL_AUTO:
    default:
      return "Touch auto";
  }
}

/**
 * @typedef {Object} OpenOptionsDialogOptions
 * @property {() => void} back - close option dialog and return to previous location
 *
 * opens game options dialog
 * @param {OpenOptionsDialogOptions} options
 * @returns {void}
 */
export function openOptionsDialog({ back }) {
  const dialog = getOptionsDialog();
  const touchOption = getTouchControlValue();

  getTouchControlsLabel().innerText = getTouchControlLabelText(touchOption);

  function onSubmit(value) {
    switch (value) {
      case 1: {
        const nextTouchValue = getNextTouchControlValue(getTouchControlValue());
        getTouchControlsLabel().innerText =
          getTouchControlLabelText(nextTouchValue);
        setTouchControls(nextTouchValue);
        break;
      }
      case 2:
        dialog.close();
        back();
        break;
      default:
        break;
    }
  }

  const { registerDialogCallbacks } = dialogBindingsFactory({
    dialog,
    submitFn: onSubmit,
  });

  dialog.showModal();
  registerDialogCallbacks();
}
