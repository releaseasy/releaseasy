import { confirm } from "@inquirer/prompts";
import { cancel } from "../handleError.js";

export async function confirmChangelog(options, context) {
  if (options.git.changelog === false) return;
  const normal = await confirm({
    message: "Changelog generated. Does it look good?",
    default: true,
  });

  if (!normal) cancel();
}
