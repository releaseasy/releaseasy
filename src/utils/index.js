import { Spinner } from "picospinner";
import { createDefu } from "defu";
import path from "node:path";
import { createRequire } from "node:module";
import CONSTANTS from "../constants/index.js";
import ansis from "ansis";
import { readPackageJSON } from "./pkg.js";
export { consola as logger } from "consola";
export * from "./fs.js";
export * from "./pkg.js";
export * from "./git.js";
export * from "./interpolate.js";
export * from "./string-argv.js";
export * from "./git-cliff.js";

export async function hasScripts(packageJsonPath, additions) {
  const packageJson = await readPackageJSON(packageJsonPath);
  const scripts = packageJson.scripts ?? {};

  return Object.entries(additions).every(
    ([name, expectedValue]) => scripts[name] === expectedValue,
  );
}

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

export function isVerbose(options) {
  return options.verbose > CONSTANTS.LOG_LEVEL.NORMAL;
}

export function shouldShowSpinner(options) {
  return !isVerbose(options);
}

export function getStdio(options) {
  return isVerbose(options) ? "inherit" : "pipe";
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

export function isPackageInstalled(cwd, packageName) {
  try {
    const require = createRequire(path.join(cwd, "__releaseasy_resolver__.js"));

    require.resolve(packageName);

    return true;
  } catch {
    return false;
  }
}
