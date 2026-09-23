import { confirm } from "@inquirer/prompts";
import ansis from "ansis";

import { cancel } from "../handleError.js";
import { logger, blank, getWorkingTreeChanges } from "../utils/index.js";

export async function summary(options, context) {
  const { version, distTag, branchName, tagName } = context;
  const data = {
    Version: version,
    "Npm Dist Tag": distTag,
    Branch: branchName,
    "Git Tag": tagName,
  };

  await renderSection("Summary:", () => {
    renderKeyValue(data);
  });

  await renderSection("Changeset:", async () => {
    await getWorkingTreeChanges(options);
  });

  blank();

  const ok = await confirm({
    message: `Releasing ${ansis.yellow(`v${version}`)} on ${ansis.yellow(distTag)}. Confirm?`,
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
