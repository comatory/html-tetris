/**
 * defines whether this is production build
 * @type {boolean}
 */
export const isProduction = Boolean(window.__ENV === "production");

/**
 * defines whether this is development build
 * @type {boolean}
 */
export const isDevelopment = !isProduction;
