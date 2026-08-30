import { Spinner } from "picospinner";
import { runGitCliff } from "../git-cliff";
import { createSpinner, getStdio, shouldShowSpinner } from "../utils/index.js";
import { interpolate } from "../utils/interpolate.js";

const spinner = createSpinner("Generating changelog, please wait…");

export default async function genChangelog(options, context) {
  const showSpinner = shouldShowSpinner(options);

  if (showSpinner) {
    spinner.start();
  }

  const args = parseArgs(interpolate(options.git.changelog.args, context));

  try {
    await runGitCliff(addVerboseArgs(args, options), {
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

function parseArgs(input) {
  return input.trim().split(/\s+/);
}

function addVerboseArgs(args, options) {
  if (shouldShowSpinner(options)) {
    return args;
  }

  return [...args, `-${"v".repeat(options.verbose)}`];
}
