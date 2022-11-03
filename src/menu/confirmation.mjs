import { dialogBindingsFactory } from "./controls.mjs";

/**
 * get confirmation dialog element
 * @returns {HTMLDialogElement}
 */
function getConfirmationDialog() {
  return document.getElementById("confirmation-menu");
}

/**
 * @typedef {Object} OpenConfirmationDialogOptions
 * @property {(value: boolean) => void} back - close confirmation dialog with argument for true = yes, false = no
 *
 * opens game options dialog
 * @param {OpenConfirmationDialogOptions} options
 * @returns {boolean} true to quit, false to close dialog
 */
export function openConfirmationDialog({ back }) {
  const dialog = getConfirmationDialog();

  function onSubmit(value) {
    switch (value) {
      case 1:
        dialog.close();
        back(false);
        break;
      case 2:
        dialog.close();
        back(true);
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
