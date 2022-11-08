import { isAudioOff } from "../utils/options.mjs";

export const selectSound = createSound("/assets/sound/select.wav");

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
