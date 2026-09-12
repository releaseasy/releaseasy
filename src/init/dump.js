import ansis from "ansis";
import { hasScripts, logger } from "../utils/index.js";
import CONSTANTS from "../constants/index.js";
import { resolveCommand } from "package-manager-detector/commands";

export async function dump(context) {
  const { configFile, cliffFile, packageManager, packageJsonPath } = context;

  logger.success(`Created ${ansis.yellow(configFile)}`);
  logger.success(`Created ${ansis.yellow(cliffFile)}`);

  let command;
  if (await hasScripts(packageJsonPath, CONSTANTS.DEFAULT_SCRIPTS)) {
    command = resolveCommand(packageManager.agent, "run", ["release"]);
  } else {
    command = resolveCommand(packageManager.agent, "execute-local", [CONSTANTS.CLI_NAME]);
  }

  logger.log(`
  You're ready to release!
  Run:
    ${ansis.cyan(formatCommand(command))}
  `);
}

function formatCommand(command) {
  return [command.command, ...command.args].join(" ");
}
