import stringArgv from "string-argv";

import type { ReleaseContext } from "../config/types.ts";
import type { ChangelogEnabledOptions } from "../release.ts";
import {
  hasVerbosity,
  interpolate,
  withSpinner,
  logCommand,
  runGitCliff,
  runHook,
} from "../utils/index.ts";

export async function genChangelog(options: ChangelogEnabledOptions, context: ReleaseContext) {
  // 前置钩子
  await runHook(options, "before:changelog", context);

  const args = await buildGitCliffArgs(options, context);

  await withSpinner(options, "Generating changelog, please wait…", async () => {
    try {
      logCommand(options, "git-cliff", args);
      await runGitCliff(args, {
        nodeOptions: {
          cwd: options.cwd,
          stdio: hasVerbosity(options.verbose) ? "inherit" : "pipe",
        },
      });
    } catch (error) {
      throw new Error("Failed to generate changelog", {
        cause: error,
      });
    }
  });

  await runHook(options, "after:changelog", context);
}

async function buildGitCliffArgs(options: ChangelogEnabledOptions, context: ReleaseContext) {
  const { verbose } = options;
  const { args, output } = options.git.changelog;

  const gitCliffArgs = stringArgv(interpolate(args, context));

  gitCliffArgs.push("--config", context.resolvedCliffFile as string);
  gitCliffArgs.push("--output", output);
  gitCliffArgs.push(...getVerboseArgs(verbose));

  // 把ouput直接给到上下文方便复用
  context.changelog = {
    output,
  };

  return gitCliffArgs;
}

function getVerboseArgs(verbose: number) {
  if (!hasVerbosity(verbose)) {
    return [];
  }

  return [`-${"v".repeat(verbose)}`];
}
