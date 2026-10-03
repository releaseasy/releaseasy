import { createRequire } from "node:module";
import path from "node:path";

import ansis from "ansis";
import { createConsola } from "consola";
import { createDefu } from "defu";
import { type ResolvedCommand, type Agent, type Command, detect } from "package-manager-detector";
import { resolveCommand } from "package-manager-detector/commands";
import { x, type Options } from "tinyexec";

import type { ResolvedOptions, ReleaseContext, HookEvent } from "../config/types.ts";
import CONSTANTS, { type Verbosity } from "../constants/index.ts";
import type { ChangelogEnabledOptions } from "../release.ts";
import { interpolate } from "./interpolate.ts";
import { readPackageJSON } from "./pkg.ts";
import { createSpinner } from "./spinner.ts";
import type { Awaitable } from "./types.ts";

export const logger = createConsola();

export const loggerWithTag = logger.withDefaults({
  tag: CONSTANTS.CLI_NAME,
});

export async function runSideEffect<T>(
  options: ResolvedOptions,
  description: string,
  action: () => Awaitable<T>,
): Promise<T | undefined> {
  if (options.dryRun) {
    loggerWithTag.info(ansis.yellow(`[dry-run] would ${description}`));
    return;
  }

  return await action();
}

export async function detectPackageManager(cwd: string) {
  const packageManager = await detect({ cwd });

  if (!packageManager) {
    throw new Error("Could not detect the package manager used by this project.");
  }

  return packageManager;
}

export function resolveCommandOrThrow(agent: Agent, command: Command, args: string[]) {
  const result = resolveCommand(agent, command, args);

  if (!result) {
    throw new Error(`Unable to resolve the package manager command for "${agent}".`);
  }

  return result;
}

export function formatCommand(command: ResolvedCommand) {
  return [command.command, ...command.args].join(" ");
}

export async function hasScripts(packageJsonPath: string, additions: Record<string, string>) {
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

export function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms.toFixed(0)}ms`;

  const s = ms / 1000;
  if (s < 60) return `${s.toFixed(2)}s`;

  const m = Math.floor(s / 60);
  const rest = (s % 60).toFixed(1);
  return `${m}m ${rest}s`;
}

export function blank(lines: number = 1) {
  process.stdout.write("\n".repeat(lines));
}

export function hasVerbosity(verbose: number, threshold: Verbosity = CONSTANTS.VERBOSITY.VERBOSE) {
  return verbose >= threshold;
}

export function isChangelogEnabled(options: ResolvedOptions): options is ChangelogEnabledOptions {
  return options.git.changelog !== false;
}

export async function runHook(
  options: ResolvedOptions,
  hookName: HookEvent,
  context: ReleaseContext,
): Promise<void> {
  if (!context) return;

  const { hooks } = options;
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

export async function execCommand(
  command: string,
  args: string[],
  options: ResolvedOptions,
  execOptions = {},
) {
  logCommand(options, command, args);

  return await x(
    command,
    args,
    defu(execOptions, {
      throwOnError: true,
      nodeOptions: {
        cwd: options.cwd,
        stdio: options.verbose > CONSTANTS.VERBOSITY.VERBOSE ? "inherit" : "pipe",
      },
    } satisfies Partial<Options>),
  );
}

export function logCommand(options: ResolvedOptions, displayCommand: string, args: string[]) {
  if (hasVerbosity(options.verbose)) {
    loggerWithTag.log(ansis.yellow(`$ ${displayCommand} ${formatArgs(args)}`));
  }
}

function formatArgs(args: string[] = []) {
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

const cache = new Map<string, boolean>();
export function isPackageInstalled(pkgName: string, fromDir: string = process.cwd()): boolean {
  const resolvedFromDir = path.resolve(fromDir);
  const cacheKey = `${resolvedFromDir}::${pkgName}`;

  const cached = cache.get(cacheKey);
  if (cached !== undefined) {
    return cached;
  }

  const require = createRequire(path.join(resolvedFromDir, "noop.js"));

  let result = false;

  try {
    require.resolve(pkgName);
    result = true;
  } catch {
    result = false;
  }

  cache.set(cacheKey, result);
  return result;
}
