import path from "node:path";
import { createDefu } from "defu";
import { createRequire } from "node:module";
import CONSTANTS from "../constants/index.js";
import ansis from "ansis";
import { readPackageJSON } from "./pkg.js";
import { interpolate } from "./interpolate.js";
import { createSpinner } from "./spinner.js";
import { x } from "tinyexec";

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

export function isPackageInstalled(cwd, packageName) {
  try {
    const require = createRequire(path.join(cwd, `__${CONSTANTS.CLI_NAME}_resolver__.js`));

    require.resolve(packageName);

    return true;
  } catch {
    return false;
  }
}

export async function runHook(options, hookName, context) {
  if (!context) return;

  const { cwd, verbose, hooks } = options;
  const hook = hooks?.[hookName];

  if (!hook) return;

  const hooksList = Array.isArray(hook) ? hook : [hook];

  for (const hookItem of hooksList) {
    const cmd = interpolate(hookItem, context);

    const spinner = createSpinner(cmd, options);

    spinner.start();

    try {
      await x(cmd, [], {
        throwOnError: true,
        nodeOptions: {
          cwd,
          shell: true,
          stdio: verbose > CONSTANTS.LOG_LEVEL.VERBOSE ? "inherit" : "pipe",
        },
      });

      spinner.succeed(cmd);
    } catch (error) {
      spinner.fail(cmd);
      throw error;
    }
  }
}
