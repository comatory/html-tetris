import { dialogBindingsFactory } from "./controls.mjs";
import { openConfirmationDialog } from "./confirmation.mjs";
import { playSelectSound } from "../sound/sounds.mjs";

/**
 * get pause dialog element
 * @returns {HTMLDialogElement}
 */
function getPauseDialog() {
  return document.getElementById("pause-menu");
}

/**
 * @typedef {Object} OpenPauseDialogOptions
 * @property {() => void} back - close pause dialog and return to previous location
 * @property {() => void} quit - quit current game
 *
 * opens game options dialog
 * @param {OpenPauseDialogOptions} options
 * @returns {void}
 */
export function openPauseDialog({ back, quit }) {
  const dialog = getPauseDialog();

  function onSubmit(value) {
    switch (value) {
      case 1:
        dialog.close();
        back();
        break;
      case 2: {
        openConfirmationDialog({
          back: (yes) => {
            if (yes) {
              dialog.close();
              quit();
            } else {
              dialog.close();
              back();
            }
          },
        });

        break;
      }
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
