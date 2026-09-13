import { Spinner } from "picospinner";
import { logger, runGitCliff } from "../utils/index.js";
import { isVerbose, interpolate, parseArgsStringToArgv, withSpinner } from "../utils/index.js";

export async function genChangelog(options, context) {
  if (options.git.changelog === false) return;

  const args = await buildGitCliffArgs(options, context);

  await withSpinner(options, "Generating changelog, please wait…", async () => {
    try {
      await runGitCliff(args, {
        nodeOptions: {
          stdio: isVerbose(options) ? "inherit" : "pipe",
        },
      });
    } catch (error) {
      throw new Error("Failed to generate changelog", {
        cause: error,
      });
    }
  });
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
