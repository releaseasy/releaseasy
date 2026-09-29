import { select, confirm } from "@inquirer/prompts";

import type { InitContext } from "../config/types.ts";
import CONSTANTS from "../constants/index.ts";

export async function promptInit(context: InitContext) {
  context.configFormat = await select({
    message: "Which config format would you like?",
    default: context.isTypeScriptProject ? "typescript" : "javascript",
    choices: CONSTANTS.CONFIG_FORMAT_CHOICES,
    loop: false,
  });

  context.changelogFormat = await select({
    message: "Which changelog format?",
    default: "default",
    choices: CONSTANTS.CHANGELOG_FORMAT_CHOICES,
    loop: false,
  });

  context.shouldAddScripts = await confirm({
    message: "Add releaseasy npm scripts to package.json?",
    default: true,
  });
}
