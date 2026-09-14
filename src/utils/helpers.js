import { createConsola } from "consola";
import path from "node:path";
import { createDefu } from "defu";
import { createRequire } from "node:module";
import CONSTANTS from "../constants/index.js";
import ansis from "ansis";
import { readPackageJSON } from "./pkg.js";
import { interpolate } from "./interpolate.js";
import { createSpinner } from "./spinner.js";
import { x } from "tinyexec";

export const logger = createConsola();

export const loggerWithTag = logger.withDefaults({
  tag: CONSTANTS.CLI_NAME,
});

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
      await execCommand(cmd, [], options, { nodeOptions: { shell: true } });
      spinner.succeed(cmd);
    } catch (error) {
      spinner.fail(cmd);
      throw error;
    }
  }
}

export async function execCommand(command, args, options, execOptions = {}) {
  const { cwd, verbose } = options;
  if (verbose >= CONSTANTS.LOG_LEVEL.VERBOSE) {
    printCommand(command, args);
  }
  return await x(
    command,
    args,
    defu(execOptions, {
      throwOnError: true,
      nodeOptions: {
        cwd: cwd,
        stdio: verbose > CONSTANTS.LOG_LEVEL.VERBOSE ? "inherit" : "pipe",
      },
    }),
  );
}

function printCommand(command, args) {
  loggerWithTag.log(`${ansis.dim("$")} ${ansis.cyan(command)} ${ansis.yellow(formatArgs(args))}`);
}

function formatArgs(args = []) {
  return args
    .map((arg) => {
      const value = String(arg);

      if (/^[\w./:@%+=,-]+$/.test(value)) {
        return value;
      }

      return JSON.stringify(value);
    })
    .join(" ");
}
