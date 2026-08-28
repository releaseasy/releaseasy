#!/usr/bin/env node

import { cac } from "cac";
import lt from "semver/functions/lt.js";
import pkg from "../package.json" with { type: "json" };
import { CancelledError, ExitSignal } from "./errors.js";
import { logger } from "./utils/index.js";
import { resolveConfig } from "./config/index.js";
import { resolve } from "node:path";
import CONSTANTS from "./constants/index.js";

const cli = cac(CONSTANTS.CLI_NAME);
cli.help().version(pkg.version, "-V, --version");

cli
  .command("[release]", "Release Package")
  .alias("release")
  .option("-C, --cwd <path>", "Run the release process in the specified directory")
  .option("-d, --dry-run", "Simulate release without applying changes.", { default: false })
  .option("-c, --config <path>", "Path to the config file")
  .option("-v, --verbose", "Increases the logging verbosity", {
    type: [],
  })
  .action(async (_, inlineOptions) => {
    const { release } = await import("./release.js");

    const options = await resolveConfig(inlineOptions);

    await release(options);
  });

cli
  .command("changelog [...args]", "Run git-cliff")
  .allowUnknownOptions()
  .option("--git-cliff-help", "Show git-cliff help")
  .action(async (_, options) => {
    const { runGitCliff } = await import("./git-cliff.js");

    if (options.gitCliffHelp) {
      const result = await runGitCliff(["--help"], {
        throwOnError: false,
      });

      process.exit(result.exitCode ?? 0);
    }
    const args = cli.rawArgs.slice(3);

    const result = await runGitCliff(args, {
      throwOnError: false,
    });
    process.exit(result.exitCode ?? 0);
  });

try {
  cli.parse(process.argv, { run: false });
  await cli.runMatchedCommand();
} catch (err) {
  if (!err) process.exit(0);

  if (err instanceof CancelledError) {
    logger.warn(err.message);
  } else if (err instanceof ExitSignal) {
    process.exit(err.code);
  } else if (err instanceof Error) {
    console.log("-------------------");
    logger.error(err);
  } else {
    logger.error(`Unknown error`, err);
  }
  process.exit(1);
}
