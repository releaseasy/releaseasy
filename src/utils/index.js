import { createConsola } from "consola";
import { createDefu } from "defu";
import CONSTANTS from "../constants/index.js";
import ansis from "ansis";

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

export async function withTimer(fn) {
  const start = performance.now();
  const result = await fn();
  const cost = formatDuration(performance.now() - start);
  logger.log(ansis.green(`🎉 Released successfully! (in ${cost})`));
  return result;
}

function formatDuration(ms) {
  if (ms < 1000) return `${ms.toFixed(0)}ms`;

  const s = ms / 1000;
  if (s < 60) return `${s.toFixed(2)}s`;

  const m = Math.floor(s / 60);
  const rest = (s % 60).toFixed(1);
  return `${m}m ${rest}s`;
}
