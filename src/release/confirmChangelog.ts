import { confirm } from "@inquirer/prompts";

import { cancel } from "../handleError.ts";

export async function confirmChangelog() {
  const normal = await confirm({
    message: "Changelog generated. Does it look good?",
    default: true,
  });

  if (!normal) cancel();
}
