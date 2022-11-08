import { isAudioOff } from "../utils/options.mjs";

export const selectSound = createSound("/assets/sound/select.wav");
export const confirmSound = createSound("/assets/sound/confirm.wav");
export const dropSound = createSound("/assets/sound/drop.wav");
export const movementSound = createSound("/assets/sound/movement.wav");
export const rotateSound = createSound("/assets/sound/rotate.wav");
export const placementSound = createSound("/assets/sound/place.wav");
export const scoredSound = createSound("/assets/sound/score.wav");
export const levelUpSound = createSound("/assets/sound/levelup.wav");
export const lostGameSound = createSound("/assets/sound/lost.wav");

/**
 * @typedef {() => Promise<void>} PlayFn
 */

/**
 * plays select sound
 *
 * @type {PlayFn}
 */
export function playSelectSound() {
  return playSound(selectSound);
}

/**
 * plays confirmation sound
 *
 * @type {PlayFn}
 */
export function playConfirmSound() {
  return playSound(confirmSound);
}

/**
 * plays drop sound
 *
 * @type {PlayFn}
 */
export function playDropSound() {
  return playSound(dropSound);
}

/**
 * plays movement sound
 *
 * @type {PlayFn}
 */
export function playMovementSound() {
  return playSound(movementSound);
}

/**
 * plays rotate sound
 *
 * @type {PlayFn}
 */
export function playRotateSound() {
  return playSound(rotateSound);
}

/**
 * plays placement sound
 *
 * @type {PlayFn}
 */
export function playPlacementSound() {
  return playSound(placementSound);
}

/**
 * plays scored sound
 *
 * @type {PlayFn}
 */
export function playScoreSound() {
  return playSound(scoredSound);
}

/**
 * plays level up sound
 *
 * @type {PlayFn}
 */
export function playLevelUpSound() {
  return playSound(levelUpSound);
}

/**
 * plays lost game sound
 *
 * @type {PlayFn}
 */
export function playLostGameSound() {
  return playSound(lostGameSound);
}

/**
 * creates sound object
 *
 * @param {string} url - path to audio file
 * @returns {HTMLAudioElement}
 */
function createSound(url) {
  const sound = new Audio(url);
  sound.setAttribute("autoplay", true);
  sound.setAttribute("muted", true);
  return sound;
}

/**
 * plays sound but resets it first if it's already
 * playing
 *
 * @param {HTMLAudioElement} audio - sound
 * @returns {Promise<void>}
 */
function playSound(audio) {
  if (isAudioOff()) {
    return Promise.resolve();
  }

  try {
    if (!audio.ended) {
      audio.currentTime = 0;
    }

    return audio.play();
  } catch (err) {
    console.error("Unable to use audio.", err);
    return Promise.resolve();
  }
}
