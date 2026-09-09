import { select, confirm } from "@inquirer/prompts";
import CONSTANTS from "../constants/index.js";

export async function promptInit(context) {
  const configFormat = await select({
    message: "Which config format would you like?",
    default: context.hasTsConfig ? "typescript" : "javascript",
    choices: CONSTANTS.CONFIG_FORMAT_CHOICES,
  });

  const changelogFormat = await select({
    message: "Which changelog format?",
    choices: CONSTANTS.CHANGELOG_FORMAT_CHOICES,
  });

  const addScripts = await confirm({
    message: "Add releaseasy npm scripts to package.json?",
    default: true,
  });

  return {
    configFormat,
    changelogFormat,
    addScripts,
  };
}
