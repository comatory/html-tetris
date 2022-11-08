import { dialogBindingsFactory } from "./controls.mjs";
import {
  getTouchControlValue,
  getNextTouchControlValue,
  setTouchControls,
  TOUCH_CONTROL_ON,
  TOUCH_CONTROL_OFF,
  TOUCH_CONTROL_AUTO,
  getAudioValue,
  getNextAudioValue,
  setAudioControls,
  AUDIO_ON,
  AUDIO_OFF,
} from "../utils/options.mjs";
import { setupTouchControls } from "../controls/setup.mjs";
import { setupAreaSize } from "../area/viewport.mjs";
import { playSelectSound } from "../sound/sounds.mjs";

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
 * audio settings
 *
 * @returns {HTMLLabelElement}
 */
function getAudioLabel() {
  return document.querySelector('label[for="options-audio"]');
}

/**
 * get label for touch control option
 *
 * @param {TouchControl} id
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
 * get label for audio option
 *
 * @param {AudioControl} id
 * @returns {string}
 */
function getAudioLabelText(id) {
  switch (id) {
    case AUDIO_ON:
      return "Audio On";
    case AUDIO_OFF:
    default:
      return "Audio off";
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
  const audioOption = getAudioValue();

  getTouchControlsLabel().innerText = getTouchControlLabelText(touchOption);
  getAudioLabel().innerText = getAudioLabelText(audioOption);

  function onSubmit(value) {
    switch (value) {
      case 1: {
        const nextTouchValue = getNextTouchControlValue(getTouchControlValue());
        getTouchControlsLabel().innerText =
          getTouchControlLabelText(nextTouchValue);
        setTouchControls(nextTouchValue);
        setupTouchControls();
        setupAreaSize();
        break;
      }
      case 2: {
        const nextAudioValue = getNextAudioValue(getAudioValue());
        getAudioLabel().innerText = getAudioLabelText(nextAudioValue);
        setAudioControls(nextAudioValue);
        break;
      }
      case 3:
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
    soundFn: playSelectSound,
  });

  dialog.showModal();
  registerDialogCallbacks();
}
