import { createConsola } from "consola";
import { createDefu } from "defu";

import { x } from "tinyexec";
import { NAME } from "../constants.js";

export const logger = createConsola({
  defaults: {
    tag: NAME,
  },
});

export const defu = createDefu((obj, key, value) => {
  if (Array.isArray(obj[key]) && Array.isArray(value)) {
    obj[key] = value; // 直接覆盖
    return true;
  }
});
