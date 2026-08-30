import { Spinner } from "picospinner";
import { runGitCliff } from "../git-cliff";
import { interpolate } from "../utils/interpolate.js";
const spinner = new Spinner("Generating changelog, please wait…", {
  stream: process.stderr,
  colors: {
    spinner: "green",
    text: "gray",
  },
});

export default async function genChangelog(options, context) {
  spinner.start();

  const args = parseArgs(interpolate(options.git.changelog.args, context));

  try {
    await runGitCliff(args, {
      nodeOptions: {
        stdio: "pipe",
      },
    });
    // await new Promise((resolve) => {
    //   setTimeout(resolve, 3000);
    // });
    spinner.succeed("Changelog generated");
  } catch (error) {
    spinner.fail("Failed to generate changelog");
    throw error;
  }
}

function parseArgs(input) {
  return input.trim().split(/\s+/);
}
