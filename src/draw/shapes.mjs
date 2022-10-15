import { draw } from "./utils.mjs";

const SQUARE_SHAPE = {
  w: 2,
  h: 2,
};

export function square({ x, y, context }) {
  draw({ x, y, shape: SQUARE_SHAPE, context });
}
