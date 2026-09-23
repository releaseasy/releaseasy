import { logCommand, runGitCliff, runHook } from "../utils/index.js";
import { isVerbose, interpolate, parseArgsStringToArgv, withSpinner } from "../utils/index.js";

export async function genChangelog(options, context) {
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

async function buildGitCliffArgs(options, context) {
  const { args: argTemplate, output } = options.git.changelog;

  const args = parseArgsStringToArgv(interpolate(argTemplate, context));

  args.push("--config", context.resolvedCliffFile);
  args.push("--output", output);
  args.push(...getVerboseArgs(options));

  // 把ouput直接给到上下文方便复用
  Object.assign(context, {
    changelog: {
      output,
    },
  });

  return args;
}

function getVerboseArgs(options) {
  if (!isVerbose(options)) {
    return [];
  }

  return [`-${"v".repeat(options.verbose)}`];
}
