import {
  dropSound,
  movementSound,
  placementSound,
  rotateSound,
  scoredSound,
  selectSound,
} from "./sounds.mjs";

/**
 * loads sound assets
 * @returns {Promise<void>} - finished signal
 */
export async function loadSounds() {
  return await Promise.all([
    preloadSound(selectSound),
    preloadSound(dropSound),
    preloadSound(movementSound),
    preloadSound(rotateSound),
    preloadSound(placementSound),
    preloadSound(scoredSound),
  ]);
}

function preloadSound(audio) {
  return new Promise((resolve) => {
    audio.addEventListener("canplaythrough", resolve);
  });
}
