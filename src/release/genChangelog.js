import { Spinner } from "picospinner";
import { logger, runGitCliff } from "../utils/index.js";
import {
  getStdio,
  isVerbose,
  interpolate,
  parseArgsStringToArgv,
  withSpinner,
} from "../utils/index.js";
import { x } from "tinyexec";

export async function genChangelog(options, context) {
  if (options.git.changelog === false) return;

  const args = buildGitCliffArgs(options, context);

  await withSpinner(options, "Generating changelog, please wait…", async () => {
    try {
      await runGitCliff(args, {
        nodeOptions: {
          stdio: getStdio(options),
        },
      });
    } catch (error) {
      throw new Error("Failed to generate changelog", {
        cause: error,
      });
    }
  });
}

async function formatChangelog(options, context) {
  if (!options.git.changelog.format) return;

  const cmd = interpolate(options.git.changelog.format, context);

  await x(cmd, undefined, {
    nodeOptions: {
      shell: true,
      stdio: "pipe",
    },
  });
}

function buildGitCliffArgs(options, context) {
  const { args: argTemplate, configFile, output } = options.git.changelog;

  const args = parseArgsStringToArgv(interpolate(argTemplate, context));

  args.push("--config", configFile);
  args.push("--output", output);

  // 把变更日志输出选项的value也放进到上下文中
  context.changelog = output;

  return [...args, ...getVerboseArgs(options)];
}

function getVerboseArgs(options) {
  if (!isVerbose(options)) {
    return [];
  }

  return [`-${"v".repeat(options.verbose)}`];
}
