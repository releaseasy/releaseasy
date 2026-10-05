import ansis from "ansis";
import type { ResolvedCommand } from "package-manager-detector";

import type { InitContext } from "../config/types.ts";
import CONSTANTS from "../constants/index.ts";
import { hasScripts, logger, formatCommand, resolveCommandOrThrow } from "../utils/index.ts";

export async function dump(context: InitContext) {
  const { configFile, cliffFile, packageManager, packageJsonPath, changelogFormat, configAction } =
    context;

  logger.success(`${configAction} ${ansis.yellow(configFile)}`);
  logger.success(`Created ${ansis.yellow(cliffFile)} ${ansis.gray(`(${changelogFormat})`)}`);

  let command: ResolvedCommand;
  if (await hasScripts(packageJsonPath, CONSTANTS.PKG_SCRIPTS)) {
    command = resolveCommandOrThrow(packageManager.agent, "run", ["release"]);
  } else {
    command = resolveCommandOrThrow(packageManager.agent, "execute-local", [CONSTANTS.CLI_NAME]);
  }

  logger.log(`
  You're ready to release!
  Run:
    ${ansis.cyan(formatCommand(command))}
  `);
}
