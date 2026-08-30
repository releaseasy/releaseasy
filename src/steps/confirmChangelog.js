import { confirm } from "@inquirer/prompts";
import { cancel } from "../handleError.js";

export default async function confirmChangelog(options, context) {
  const normal = await confirm({
    message: "Changelog generated. Does it look good?",
    default: true,
  });

  if (!normal) cancel();
}
