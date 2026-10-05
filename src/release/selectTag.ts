import { select } from "@inquirer/prompts";
import { prerelease } from "semver";

import type { DistTag, ReleaseContext, ResolvedOptions } from "../config/types.ts";

export async function selectTag(options: ResolvedOptions, context: ReleaseContext): Promise<void> {
  const isPrerelease = Boolean(prerelease(context.version));

  const choices = options.distTags
    .map((tag) => ({
      name: tag,
      value: tag,
      disabled: isPrerelease && tag === "latest",
    }))
    .toSorted((a, b) => Number(a.disabled) - Number(b.disabled));

  const distTag = await select<DistTag>({
    message: "Select npm dist-tag",
    choices,
    loop: false,
  });

  context.distTag = distTag;
}
