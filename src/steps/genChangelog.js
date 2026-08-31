import { Spinner } from "picospinner";
import { runGitCliff } from "../git-cliff";
import { createSpinner, getStdio, shouldShowSpinner, isVerbose } from "../utils/index.js";
import { interpolate } from "../utils/interpolate.js";

const spinner = createSpinner("Generating changelog, please wait…");

export default async function genChangelog(options, context) {
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
    await new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });
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

function buildGitCliffArgs(options, context) {
  const args = parseArgs(interpolate(options.git.changelog.args, context));

  args.push("--config", options.git.changelog.configFile);

  return [...args, ...getVerboseArgs(options)];
}
function parseArgs(input) {
  return input.trim().split(/\s+/);
}

function getVerboseArgs(options) {
  if (!isVerbose(options)) {
    return [];
  }

  return [`-${"v".repeat(options.verbose)}`];
}
