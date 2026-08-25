#!/usr/bin/env node

import { cac } from "cac";
import lt from "semver/functions/lt.js";
import pkg from "../package.json" with { type: "json" };
import { CancelledError, ExitSignal } from "./errors.js";
import { logger } from "./utils/index.js";
import { resolveConfig } from "./config/index.js";

const cli = cac("releaseasy");
cli.help().version(pkg.version, "-V, --version");

cli
  .command("[run]", "Start release process")
  .alias("run")
  .option("-d, --dry-run", "Simulate release without applying changes.", { default: false })
  .option("-c, --config <path>", "Path to the config file")
  .option("-v, --verbose", "Increases the logging verbosity", {
    type: [],
  })
  .action(async (_, options) => {
    const { release } = await import("./release.js");

    const config = await resolveConfig(options.config, normalizeCliOptions(options));

    console.log(config);
  });

cli
  .command("changelog [RANGE]", "Options to pass to git-cliff", {
    allowUnknownOptions: true,
  })
  .option("-c, --config <path>", "Path to the config file")
  .action(async (range, options) => {
    const { changelog } = await import("./changelog.js");

    console.log(changelog);
  });

function normalizeCliOptions(options) {
  return {
    dryRun: Boolean(options.dryRun),
    verbose: Array.isArray(options.verbose) ? options.verbose.length : 0,
  };
}

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
    logger.error(err.message);
  } else {
    logger.error(`Unknown error`, err);
  }
  process.exit(1);
}
