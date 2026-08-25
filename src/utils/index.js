import { createConsola } from "consola";
import { createDefu } from "defu";
import { x } from "tinyexec";
import CONSTANTS from "../constants/index.js";

export const logger = createConsola({
  defaults: {
    tag: CONSTANTS.CLI_NAME,
  },
});

export const defu = createDefu((obj, key, value) => {
  if (Array.isArray(obj[key]) && Array.isArray(value)) {
    obj[key] = value; // 直接覆盖
    return true;
  }
});
