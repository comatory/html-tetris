/** @typedef {import('../sound/sounds.mjs').PlayFn} PlayFn */

/**
 * @typedef {Object} FormBindingsFactoryOptions
 * @property {HTMLFormElement} form - form in the dialog
 * @property {NodeList} menuItems - specific inputs / menu items
 * @property {(value: number) => void} submitFn - callback
 * @property {PlayFn} selectSoundFn - selected item audio callback
 * @property {PlayFn} confirmSoundFn - confirmed item audio callback
 *
 * set up listeners on menu item form, the form serves as a selection
 * mechanism where click or enter key can trigger callback with
 * integer value specifying selected menu item
 *
 * @param {FormBindingsFactoryOptions} options
 * @returns {() => void} unregister callback
 */
function formBindingsFactory({
  form,
  menuItems,
  submitFn,
  selectSoundFn,
  confirmSoundFn,
}) {
  /**
   * handle keyboard navigatoin
   */
  function handleKeyBindings(event) {
    if (event.keyCode !== 13) {
      selectSoundFn();
      return;
    }

    form.requestSubmit();
  }

  /**
   * calls submission callback with selected item integer ID
   */
  function handleFormSubmit(event) {
    event.preventDefault();
    const checked = Array.from(menuItems).find((item) => item.checked);
    confirmSoundFn();
    submitFn(Number.parseInt(checked.value));
  }

  /**
   * removes all listeners on form
   */
  function removeListeners() {
    form.removeEventListener("submit", handleFormSubmit);
    form.removeEventListener("keydown", handleKeyBindings);
  }

  form.addEventListener("submit", handleFormSubmit);
  form.addEventListener("keydown", handleKeyBindings);

  return removeListeners;
}

/**
 * sets up listeners when interacting with specific menu items/inputs
 *
 * @param {HTMLFormElement} form
 * @param {NodeList} menuItems - HTML inputs
 * @param {PlayFn} soundFn - audio function
 * @returns {() => void} unregister callback
 */
function keyBindingsFactory(form, menuItems, soundFn) {
  /**
   * allow the user to select menu item with mouse
   * but only trigger submission when the mouse is used as
   * click is also triggered by moving arrow keys
   */
  let usingKeyboard = false;

  function handleKeyBindings() {
    usingKeyboard = true;
  }

  function handleMouseBindings() {
    if (usingKeyboard) {
      soundFn();
      return;
    }

    form.requestSubmit();
  }

  /** remove all listeners */
  function removeListeners() {
    form.addEventListener("keydown", handleKeyBindings);

    menuItems.forEach((item) => {
      item.removeEventListener("click", handleMouseBindings);
    });
  }

  form.addEventListener("keydown", handleKeyBindings);
  menuItems.forEach((item) => {
    item.addEventListener("click", handleMouseBindings);
  });

  return removeListeners;
}

/**
 * @typedef {Object} DialogBindingsFactoryOptions
 * @property {HTMLDialogElement} dialog
 * @property {(value: number) => void} submitFn - callback function which receives integer specifying menu option
 * @property {() => void | undefined} backFn - callback function when dialog is closed
 * @property {PlayFn} selectSoundFn - callback function to play select sound
 * @property {PlayFn} confirmSoundFn - callback function to play confirm sound
 *
 * @typedef {Object} DialogBindingsFactoryCallbacks
 * @property {() => void} registerDialogCallbacks - sets up listeners on dialog
 * @property {() => void} unregisterDialogCallbacks - removes listeners on dialog
 *
 * sets up events for given dialog
 * @param {DialogBindingsFactoryOptions} options
 * @returns {DialogBindingsFactoryCallbacks} - register/unregister callbacks
 */
export function dialogBindingsFactory({
  dialog,
  submitFn,
  backFn,
  selectSoundFn,
  confirmSoundFn,
}) {
  const form = dialog.querySelector("form");
  const menuItems = dialog.querySelectorAll('input[type="radio"]');

  if (!form || !menuItems) {
    throw new Error("Unable to find [form] or [input] elements for dialog");
  }

  let formBindings;
  let keyBindings;

  function blockEscKey(event) {
    if (event.keyCode === 27) {
      event.preventDefault();
    }
  }
  /**
   * set up all types of listeners on dialog
   */
  function registerDialogCallbacks() {
    formBindings = formBindingsFactory({
      form,
      menuItems,
      submitFn,
      selectSoundFn,
      confirmSoundFn,
    });
    keyBindings = keyBindingsFactory(form, menuItems, selectSoundFn);

    dialog.addEventListener("keydown", blockEscKey);
    dialog.addEventListener("close", unregisterDialogCallbacks);

    menuItems[0].checked = true;
    menuItems[0].focus();
  }

  /**
   * remove all types of listeners on dialog
   */
  function unregisterDialogCallbacks() {
    if (!formBindings || !keyBindings) {
      throw new Error("You forgot to call `registerDialogCallbacks` first.");
    }

    formBindings();
    keyBindings();
    dialog.removeEventListener("keydown", blockEscKey);

    if (backFn) {
      backFn();
    }
  }

  return {
    registerDialogCallbacks,
    unregisterDialogCallbacks,
  };
}
