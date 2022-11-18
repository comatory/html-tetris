import { dialogBindingsFactory } from "./controls.mjs";
import { playConfirmSound, playSelectSound } from "../sound/sounds.mjs";

/**
 * get high scores dialog element
 * @returns {HTMLDialogElement}
 */
function getHelpDialog() {
  return document.getElementById("help-menu");
}

/**
 * @typedef {Object} OpenHelpDialogOptions
 * @property {() => void} back - close help dialog and return to previous location
 *
 * opens help dialog
 *
 * @param {OpenHelpDialogOptions} options
 * @returns {void}
 */
export function openHelpDialog({ back }) {
  const dialog = getHelpDialog();

  function onSubmit(value) {
    switch (value) {
      case 1:
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
    selectSoundFn: playSelectSound,
    confirmSoundFn: playConfirmSound,
  });

  dialog.showModal();
  registerDialogCallbacks();
}
