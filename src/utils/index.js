import { Spinner } from "picospinner";
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

export function formatDuration(ms) {
  if (ms < 1000) return `${ms.toFixed(0)}ms`;

  const s = ms / 1000;
  if (s < 60) return `${s.toFixed(2)}s`;

  const m = Math.floor(s / 60);
  const rest = (s % 60).toFixed(1);
  return `${m}m ${rest}s`;
}

export function blank(lines = 1) {
  process.stdout.write("\n".repeat(lines));
}

export function getStdio(options) {
  return options.verbose >= CONSTANTS.LOG_LEVEL.DEBUG ? "inherit" : "pipe";
}

export function shouldShowSpinner(options) {
  return getStdio(options) === "pipe";
}

export function createSpinner(text) {
  return new Spinner(text, {
    stream: process.stderr,
    colors: {
      spinner: "green",
      text: "gray",
    },
  });
}
