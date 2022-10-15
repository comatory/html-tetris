import { isDevelopment } from "./meta.mjs";

const DEBUG_STYLING = `
  background-color: hotpink;
  color: #fff;
  padding: 3px 6px;
  border-radius: 3px;
  font-family: monospace;
  font-weight: 600;
  font-size: 0.92rem;
`;

/** debug logging */
export function debug(...parts) {
  if (!isDevelopment) {
    return;
  }

  console.debug(`%c${parts.join(' ')}`, DEBUG_STYLING)
}
