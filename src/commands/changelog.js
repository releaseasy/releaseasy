export function registerChangelogCommand(cli) {
  cli
    .command("changelog [RANGE]", "Options to pass to git-cliff", {
      allowUnknownOptions: true,
    })
    .option("-c, --config <path>", "Path to the config file")
    .action(async (range, options) => {
      const { changelog } = await import("../changelog.js");

      const args = cli.rawArgs.slice(3);

      await changelog(
        {
          range,
          config: options.config,
        },
        args,
      );
    });
}
