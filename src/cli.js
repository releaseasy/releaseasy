#!/usr/bin/env node

import { Command } from "commander";
import pkg from "../package.json" with { type: "json" };
import { handleError } from "./handleError.js";
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
  .option(
    "-v, --verbose",
    "Increases the logging verbosity",
    (_, previous) => {
      return previous + 1;
    },
    CONSTANTS.LOG_LEVEL.NORMAL,
  );

releaseCommand.action(async (options) => {
  const { release } = await import("./release.js");

  const resolvedOptions = await resolveConfig(options);

  await release(resolvedOptions);
});

program.addCommand(releaseCommand, {
  isDefault: true,
});

/**
 * init
 *
 * releaseasy init
 */
const initCommand = new Command("init")
  .description("Initialize releaseasy configuration")
  .option("-C, --cwd <path>", "Initialize configuration in the specified directory")
  .option("-f, --force", "Overwrite existing configuration", false);

initCommand.action(async (options) => {
  const { init } = await import("./init.js");

  await init(options);
});

program.addCommand(initCommand);

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

async function runCLI() {
  try {
    await program.parseAsync(process.argv);
  } catch (err) {
    const { verbose } = releaseCommand.opts();

    handleError(err, {
      verbose,
    });
  }
}

await runCLI();
