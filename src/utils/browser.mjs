/**
 * defines whether this is production build
 * @type {boolean}
 */
export function isProduction() {
  return window.__ENV === "production";
}

/**
 * defines whether this is development build
 * @type {boolean}
 */
export function isDevelopment() {
  return !isProduction();
}
