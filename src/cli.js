#!/usr/bin/env node

import { cac } from "cac";
import lt from "semver/functions/lt.js";
import pkg from "../package.json" with { type: "json" };
import { NAME } from "./constants.js";
import { CancelledError, ExitSignal } from "./errors.js";
import { logger } from "./utils/index.js";

if (lt(process.version, "22.18.0")) {
  logger.warn(
    `[${NAME}] Node.js ${process.version} is deprecated. Support will be removed in the next minor release. Please upgrade to Node.js 22.18.0 or later.`,
  );
}

const cli = cac(NAME);
cli.help().version(pkg.version, "-V, --version");

cli
  .command("[run]", "Start release process")
  .alias("run")
  .option("-d, --dry-run", "Simulate release without applying changes.")
  .option("-c, --config <path>", "Path to the config file")
  .option("-v, --verbose", "Increases the logging verbosity", {
    type: [],
  })
  .action(async (_, options) => {
    const { release } = await import("./release.js");

    console.log(release);

    // const config = await resolveConfig({
    //   configFile: options.config,
    //   overrides: normalizeCliOptions(options),
    // });

    // await release(config);
  });

cli
  .command("changelog [RANGE]", "Options to pass to git-cliff", {
    allowUnknownOptions: true,
  })
  .option("-c, --config <path>", "Path to the config file")
  .action(async (range, options) => {
    const { changelog } = await import("./changelog.js");

    console.log(changelog);

    // const args = cli.rawArgs.slice(3);

    // await changelog(
    //   {
    //     range,
    //     config: options.config,
    //   },
    //   args,
    // );
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
    logger.error(err.message);
  } else {
    logger.error(`Unknown error`, err);
  }
  process.exit(1);
}
