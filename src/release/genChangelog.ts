import stringArgv from "string-argv";

import type { ReleaseContext, ResolvedOptions } from "../config/types.ts";
import type { ChangelogEnabledOptions } from "../release.ts";
import {
  isVerbose,
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
          stdio: isVerbose(options) ? "inherit" : "pipe",
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
  const { args: argTemplate, output } = options.git.changelog;

  const args = stringArgv(interpolate(argTemplate, context));

  args.push("--config", context.resolvedCliffFile as string);
  args.push("--output", output);
  args.push(...getVerboseArgs(options));

  // 把ouput直接给到上下文方便复用
  context.changelog = {
    output,
  };

  return args;
}

function getVerboseArgs(options: ResolvedOptions) {
  if (!isVerbose(options)) {
    return [];
  }

  return [`-${"v".repeat(options.verbose)}`];
}
