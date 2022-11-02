/**
 * set up listeners on menu item form, the form serves as a selection
 * mechanism where click or enter key can trigger callback with
 * integer value specifying selected menu item
 *
 * @param {HTMLFormElement} form - form in the dialog
 * @param {NodeList} menuItems - specific inputs / menu items
 * @param {(value: number) => void} submitFn - callback
 * @returns {() => void} unregister callback
 */
function formBindingsFactory(form, menuItems, submitFn) {
  /**
   * handle keyboard navigatoin
   */
  function handleKeyBindings(event) {
    if (event.keyCode !== 13) {
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
 * @returns {() => void} unregister callback
 */
function keyBindingsFactory(form, menuItems) {
  /**
   * allow the user to select menu item with mouse
   * but only trigger submission when the mouse is used as
   * click is also triggered by moving arrow keys
   */
  function handleMouseBindings(event) {
    if (event.detail === 0) {
      return;
    }

    form.requestSubmit();
  }

  /** remove all listeners */
  function removeListeners() {
    menuItems.forEach((item) => {
      item.removeEventListener("click", handleMouseBindings);
    });
  }

  menuItems.forEach((item) => {
    item.addEventListener("click", handleMouseBindings);
  });

  return removeListeners;
}

/**
 * @typedef {Object} DialogBindingsFactoryOptions
 * @property {HTMLDialogElement} dialog
 * @property {(value: number) => void} submitFn - callback function which receives integer specifying menu option
 *
 * @typedef {Object} DialogBindingsFactoryCallbacks
 * @property {() => void} registerDialogCallbacks - sets up listeners on dialog
 * @property {() => void} unregisterDialogCallbacks - removes listeners on dialog
 *
 * sets up events for given dialog
 * @param {DialogBindingsFactoryOptions} options
 * @returns {DialogBindingsFactoryCallbacks} - register/unregister callbacks
 */
export function dialogBindingsFactory({ dialog, submitFn }) {
  const form = dialog.querySelector("form");
  const menuItems = dialog.querySelectorAll('input[type="radio"]');

  if (!form || !menuItems) {
    throw new Error("Unable to find [form] or [input] elements for dialog");
  }

  let formBindings;
  let keyBindings;

  /**
   * set up all types of listeners on dialog
   */
  function registerDialogCallbacks() {
    formBindings = formBindingsFactory(form, menuItems, submitFn);
    keyBindings = keyBindingsFactory(form, menuItems);

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
  }

  return {
    registerDialogCallbacks,
    unregisterDialogCallbacks,
  };
}
