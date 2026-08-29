#!/usr/bin/env node

import { Command } from "commander";
import pkg from "../package.json" with { type: "json" };
import { CancelledError, ExitSignal } from "./errors.js";
import { logger } from "./utils/index.js";
import { resolveConfig } from "./config/index.js";
import CONSTANTS from "./constants/index.js";

const program = new Command();

program
  .name(CONSTANTS.CLI_NAME)
  .version(pkg.version, "-V, --version")
  .helpOption("-h, --help")
  .helpCommand(false);

/**
 * release
 *
 * releaseasy
 * releaseasy release
 */
const releaseCommand = new Command("release")
  .description("Release Package")
  .option("-C, --cwd <path>", "Run the release process in the specified directory")
  .option("-d, --dry-run", "Simulate release without applying changes.", false)
  .option("-c, --config <path>", "Path to the config file")
  .option("-v, --verbose", "Increases the logging verbosity");

releaseCommand.action(async (options) => {
  const { release } = await import("./release.js");

  const resolvedOptions = await resolveConfig(options);

  await release(resolvedOptions);
});

program.addCommand(releaseCommand, {
  isDefault: true,
});

/**
 * changelog
 *
 * releaseasy changelog [git-cliff args...]
 */
const changelogCommand = new Command("changelog")
  .description("Run git-cliff")
  .helpOption(false)
  .allowUnknownOption(true)
  .allowExcessArguments(true);

changelogCommand.action(async (_, command) => {
  const { runGitCliff } = await import("./git-cliff.js");

  const result = await runGitCliff(command.args, {
    throwOnError: false,
  });

  process.exit(result.exitCode ?? 0);
});

program.addCommand(changelogCommand);

try {
  await program.parseAsync(process.argv);
} catch (err) {
  if (!err) {
    process.exit(0);
  }

  if (err instanceof CancelledError) {
    logger.warn(err.message);
  } else if (err instanceof ExitSignal) {
    process.exit(err.code);
  } else if (err instanceof Error) {
    logger.error(err);
  } else {
    logger.error("Unknown error", err);
  }

  process.exit(1);
}
