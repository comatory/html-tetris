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

/** row count of grid area @type {number} */
export const ROWS = 20;
/** column count of grid area @type {number} */
export const COLUMNS = 10;
