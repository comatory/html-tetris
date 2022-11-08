import { openOptionsDialog } from "./options.mjs";
import { openScoresDialog } from "./scores.mjs";
import { dialogBindingsFactory } from "./controls.mjs";
import { playConfirmSound, playSelectSound } from "../sound/sounds.mjs";

/**
 * get main dialog element
 * @returns {HTMLDialogElement}
 */
function getMainDialog() {
  return document.getElementById("main-menu");
}

/**
 * @typedef {Object} OpenMainDialogOptions
 * @property {() => void} start - function that launches game loop
 *
 * opens main game dialog
 * @param {OpenMainDialogOptions} options
 * @returns {void}
 */
export function openMainDialog({ start }) {
  const dialog = getMainDialog();

  function onSubmit(value) {
    switch (Number.parseInt(value)) {
      case 1:
        dialog.close();
        start();
        break;
      case 2:
        dialog.close();
        openOptionsDialog({
          back: () =>
            openMainDialog({
              start,
            }),
        });
        break;
      case 3:
        dialog.close();
        openScoresDialog({
          back: () =>
            openMainDialog({
              start,
            }),
        });
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
