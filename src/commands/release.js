import { resolveConfig } from "../config/index.js";

export function registerReleaseCommand(cli) {
  cli
    .command("[run]", "Start release process")
    .alias("run")
    .option("-d, --dry-run", "Simulate release without applying changes.")
    .option("-c, --config <path>", "Path to the config file")
    .option("-v, --verbose", "Increases the logging verbosity", {
      type: [],
    })
    .action(async (_, options) => {
      const { release } = await import("../release.js");

      const config = await resolveConfig({
        configFile: options.config,
        overrides: normalizeCliOptions(options),
      });

      await release(config);
    });
}

function normalizeCliOptions(options) {
  return {
    dryRun: Boolean(options.dryRun),
    verbose: Array.isArray(options.verbose) ? options.verbose.length : 0,
  };
}
