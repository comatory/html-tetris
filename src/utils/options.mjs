export const TOUCH_CONTROL_OFF = 0;
export const TOUCH_CONTROL_ON = 1;
export const TOUCH_CONTROL_AUTO = 2;

const TOUCH_CONTROLS = [
  TOUCH_CONTROL_AUTO,
  TOUCH_CONTROL_OFF,
  TOUCH_CONTROL_ON,
];

export const AUDIO_ON = 1;
export const AUDIO_OFF = 0;

const AUDIO_CONTROLS = [AUDIO_ON, AUDIO_OFF];

/**
 * @typedef {(TOUCH_CONTROL_ON|TOUCH_CONTROL_OFF|TOUCH_CONTROL_AUTO)} TouchControl
 * @typedef {(AUDIO_ON|AUDIO_OFF)} AudioControl
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

/**
 * is touch controls always enabled?
 *
 * @returns {boolean} true if yes
 */
export function isTouchControlsOn() {
  return (
    Number.parseInt(window.localStorage.getItem("touch")) === TOUCH_CONTROL_ON
  );
}

/**
 * is touch controls always disabled?
 *
 * @returns {boolean} true if yes
 */
export function isTouchControlsOff() {
  return (
    Number.parseInt(window.localStorage.getItem("touch")) === TOUCH_CONTROL_OFF
  );
}

/**
 * is touch controls automatic?
 *
 * @returns {boolean} true if yes
 */
export function isTouchControlsAuto() {
  const value = Number.parseInt(window.localStorage.getItem("touch"));
  return Number.isNaN(value) || value === TOUCH_CONTROL_AUTO;
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

/**
 * manually enable audio
 */
function enableAudio() {
  window.localStorage.setItem("audio", AUDIO_ON);
}

/**
 * manually disable audio
 */
function disableAudio() {
  window.localStorage.setItem("audio", AUDIO_OFF);
}

/**
 * is audio always disabled?
 *
 * @returns {boolean} true if yes
 */
export function isAudioOff() {
  const value = Number.parseInt(window.localStorage.getItem("audio"));
  return Number.isNaN(value) || value === AUDIO_OFF;
}

/**
 * get state of audio
 *
 * @returns {AudioControl} - id
 */
export function getAudioValue() {
  return Number.parseInt(window.localStorage.getItem("audio"));
}

/**
 * get next audio option when cycling through them
 *
 * @param {AudioControl} currentValue - current value used
 * @returns {AudioControl} - next value
 */
export function getNextAudioValue(currentValue) {
  const index = AUDIO_CONTROLS.indexOf(currentValue);

  if (index + 1 > AUDIO_CONTROLS.length - 1) {
    return AUDIO_CONTROLS[0];
  }

  return AUDIO_CONTROLS[Math.min(index + 1, AUDIO_CONTROLS.length - 1)];
}

/**
 * sets audio control to storage
 *
 * @param {AudioControl} value
 * @returns {void}
 */
export function setAudioControls(value) {
  switch (value) {
    case AUDIO_ON:
      enableAudio();
      break;
    case AUDIO_OFF:
    default:
      disableAudio();
      break;
  }
}
