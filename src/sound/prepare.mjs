import { selectSound } from "./sounds.mjs";

/**
 * loads sound assets
 * @returns {Promise<void>} - finished signal
 */
export async function loadSounds() {
  return await Promise.all([preloadSound(selectSound)]);
}

function preloadSound(audio) {
  return new Promise((resolve) => {
    audio.addEventListener("canplaythrough", resolve);
  });
}
