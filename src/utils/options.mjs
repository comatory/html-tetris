export const TOUCH_CONTROL_OFF = 0;
export const TOUCH_CONTROL_ON = 1;
export const TOUCH_CONTROL_AUTO = 2;

const TOUCH_CONTROLS = [
  TOUCH_CONTROL_AUTO,
  TOUCH_CONTROL_OFF,
  TOUCH_CONTROL_ON,
];

/**
 * @typedef {(TOUCH_CONTROL_ON|TOUCH_CONTROL_OFF|TOUCH_CONTROL_AUTO)} TouchControl
 */

/**
 * force touch controls to be always on
 */
function enableTouchControls() {
  window.localStorage.setItem("touch", TOUCH_CONTROL_ON);
}

/**
 * force touch controls to be always off
 */
function disableTouchControls() {
  window.localStorage.setItem("touch", TOUCH_CONTROL_OFF);
}

/**
 * force touch controls to be auto
 */
function setAutoTouchControls() {
  window.localStorage.setItem("touch", TOUCH_CONTROL_AUTO);
}

/**
 * sets touch control to storage
 *
 * @param {TouchControl} value
 * @returns {void}
 */
export function setTouchControls(value) {
  switch (value) {
    case TOUCH_CONTROL_ON:
      enableTouchControls();
      break;
    case TOUCH_CONTROL_OFF:
      disableTouchControls();
      break;
    case TOUCH_CONTROL_AUTO:
    default:
      setAutoTouchControls();
      break;
  }
}

export function isTouchControlsEnabled() {
  const value = Number.parseInt(window.localStorage.getItem("touch"));
  return value === TOUCH_CONTROL_ON || value === TOUCH_CONTROL_AUTO;
}

/**
 * get state of touch control
 *
 * @returns {TouchControl} - id
 */
export function getTouchControlValue() {
  return Number.parseInt(window.localStorage.getItem("touch"));
}

/**
 * get next touch option when cycling through them
 *
 * @param {TouchControl} currentValue - current value used
 * @returns {TouchControl} - next value
 */
export function getNextTouchControlValue(currentValue) {
  const index = TOUCH_CONTROLS.indexOf(currentValue);

  if (index + 1 > TOUCH_CONTROLS.length - 1) {
    return TOUCH_CONTROLS[0];
  }

  return TOUCH_CONTROLS[Math.min(index + 1, TOUCH_CONTROLS.length - 1)];
}
