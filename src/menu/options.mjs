import { dialogBindingsFactory } from "./controls.mjs";

/**
 * get main dialog element
 * @returns {HTMLDialogElement}
 */
function getOptionsDialog() {
  return document.getElementById("options-menu");
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
  });

  dialog.showModal();
  registerDialogCallbacks();
}
