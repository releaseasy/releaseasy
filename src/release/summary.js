import ansis from "ansis";
import { logger, blank } from "../utils/index.js";
import { getWorkingTreeChanges } from "../utils/git.js";
import { confirm } from "@inquirer/prompts";
import { cancel } from "../handleError.js";

export default async function summary(options, context) {
  const data = {
    Version: context.version,
    "Npm Dist Tag": context.tag,
    Branch: context.branchName,
    "Git Tag": context.git.tagName,
  };

  await renderSection("Summary:", () => {
    renderKeyValue(data);
  });

  await renderSection("Changeset:", async () => {
    await getWorkingTreeChanges(options);
  });

  blank();

  const ok = await confirm({
    message: `Releasing v${context.version} on ${context.tag}. Confirm?`,
    default: false,
  });

  if (!ok) cancel();
}

function renderSection(title, fn) {
  blank();
  logger.log(ansis.cyan(title));
  return fn();
}

function renderKeyValue(data) {
  const maxKeyLength = Math.max(...Object.keys(data).map((k) => k.length));

  for (const [key, val] of Object.entries(data)) {
    logger.log(ansis.green(key.padEnd(maxKeyLength + 2)), ansis.yellow(val));
  }
}
