import { Command } from "commander";

import pkg from "../package.json" with { type: "json" };
import { type InlineConfig, type ResolvedOptions } from "./config/types.ts";
import CONSTANTS from "./constants/index.ts";
import { handleError } from "./handleError.ts";

type VerbosityOptions = Pick<ResolvedOptions, "verbose">;
type Verbose = ResolvedOptions["verbose"];

export const program = new Command();

let currentCommand: Command;

program.hook("preAction", (_, actionCommand) => {
  currentCommand = actionCommand;
});

program
  .name(CONSTANTS.CLI_NAME)
  .version(pkg.version, "-V, --version")
  .helpOption("-h, --help")
  .helpCommand(false);

/**
 * release
 *
 * releaseasy [release]
 */
program
  .command("release", { isDefault: true })
  .description("Release Package")
  .option("-C, --cwd <path>", "Run the release process in the specified directory")
  .option("-d, --dry-run", "Simulate release without applying changes.", false)
  .option("-c, --config <path>", "Path to the config file")
  .option<Verbose>(
    "-v, --verbose",
    "Increases the logging verbosity",
    (_, previous) => {
      return previous + 1;
    },
    CONSTANTS.VERBOSITY.NORMAL,
  )
  .action(async (options: InlineConfig) => {
    const { release } = await import("./release.ts");

    await release(options);
  });

/**
 * init
 *
 * releaseasy init
 */
program
  .command("init")
  .description("Initialize releaseasy configuration")
  .option("-C, --cwd <path>", "Initialize configuration in the specified directory")
  .option("-f, --force", "Overwrite existing configuration", false)
  .action(async (options) => {
    const { init } = await import("./init.ts");

    await init(options);
  });

/**
 * changelog
 *
 * releaseasy changelog [git-cliff args...]
 */
program
  .command("changelog")
  .description("Run git-cliff")
  .helpOption(false)
  .allowUnknownOption(true)
  .allowExcessArguments(true)
  .action(async (_, command) => {
    const { runGitCliff } = await import("./utils/index.ts");

    const result = await runGitCliff(command.args, {
      throwOnError: false,
    });

    process.exit(result.exitCode ?? 0);
  });

export async function runCLI() {
  try {
    await program.parseAsync(process.argv);
  } catch (err) {
    const verbose =
      currentCommand?.opts<VerbosityOptions>().verbose ??
      program.opts<VerbosityOptions>().verbose ??
      CONSTANTS.VERBOSITY.NORMAL;

    handleError(err, verbose);
  }
}
