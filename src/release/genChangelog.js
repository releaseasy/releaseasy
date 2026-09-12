import { Spinner } from "picospinner";
import { runGitCliff } from "../utils/index.js";
import {
  createSpinner,
  getStdio,
  shouldShowSpinner,
  isVerbose,
  interpolate,
  parseArgsStringToArgv,
} from "../utils/index.js";
import { x } from "tinyexec";
const spinner = createSpinner("Generating changelog, please wait…");

export async function genChangelog(options, context) {
  if (options.git.changelog === false) return;

  const showSpinner = shouldShowSpinner(options);

  if (showSpinner) {
    spinner.start();
  }

  const args = buildGitCliffArgs(options, context);

  try {
    await runGitCliff(args, {
      nodeOptions: {
        stdio: getStdio(options),
      },
    });

    // 执行变更日志格式化
    await formatChangelog(options, context);

    if (showSpinner) {
      spinner.succeed("Changelog generated");
    }
  } catch (error) {
    if (showSpinner) {
      spinner.fail("Failed to generate changelog");
    }
    throw error;
  }
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

  console.log([...args, ...getVerboseArgs(options)]);

  return [...args, ...getVerboseArgs(options)];
}

function getVerboseArgs(options) {
  if (!isVerbose(options)) {
    return [];
  }

  return [`-${"v".repeat(options.verbose)}`];
}
