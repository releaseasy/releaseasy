#!/usr/bin/env node

import { cac } from "cac";
import lt from "semver/functions/lt.js";
import pkg from "../package.json" with { type: "json" };
import { NAME } from "./constants.js";
import { CancelledError, ExitSignal } from "./errors.js";
import { logger } from "./utils/index.js";
import { registerReleaseCommand } from "./commands/release.js";
import { registerChangelogCommand } from "./commands/changelog.js";

if (lt(process.version, "22.18.0")) {
  logger.warn(
    `[${NAME}] Node.js ${process.version} is deprecated. Support will be removed in the next minor release. Please upgrade to Node.js 22.18.0 or later.`,
  );
}

const cli = cac(NAME);
cli.help().version(pkg.version, "-V, --version");

// 注册命令
registerReleaseCommand(cli);
registerChangelogCommand(cli);

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
