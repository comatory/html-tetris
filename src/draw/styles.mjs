import {
  I_ID,
  J_ID,
  L_ID,
  O_ID,
  S_ID,
  T_ID,
  Z_ID,
  ROTATION,
} from "./shapes.mjs";
import { deepFreeze } from "../utils/meta.mjs";

const CLASSNAME_MAP = deepFreeze({
  [I_ID]: {
    [ROTATION.A]: "i",
    [ROTATION.B]: "i-vertical",
    [ROTATION.C]: "i",
    [ROTATION.D]: "i-vertical",
  },
  [J_ID]: "j",
  [L_ID]: "l",
  [O_ID]: "o",
  [S_ID]: "s",
  [T_ID]: "t",
  [Z_ID]: "z",
});

export function getSpriteClassName(shapeId, rotation) {
  const item = CLASSNAME_MAP[shapeId];

  if (typeof item === "object") {
    return item[rotation];
  }

  return item;
}
