import {
  isTouchControlsOn,
  isTouchControlsOff,
  isTouchControlsAuto,
} from "../utils/options.mjs";

const TOUCH_ALWAYS_CLASSNAME = "touch-always";
const TOUCH_NEVER_CLASSNAME = "touch-never";

const TOUCH_CLASSNAMES = [TOUCH_ALWAYS_CLASSNAME, TOUCH_NEVER_CLASSNAME];

/**
 * use provided options to force on screen
 * touch controls or not
 *
 * @returns {void}
 */
export function setupTouchControls() {
  TOUCH_CLASSNAMES.forEach((className) => {
    document.body.classList.remove(className);
  });

  if (isTouchControlsAuto()) {
    return;
  } else if (isTouchControlsOn()) {
    document.body.classList.add(TOUCH_ALWAYS_CLASSNAME);
  } else if (isTouchControlsOff()) {
    document.body.classList.add(TOUCH_NEVER_CLASSNAME);
  }
}
