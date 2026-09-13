import { select } from "@inquirer/prompts";
import { prerelease } from "semver";

export async function selectTag(options, context) {
  const isPrerelease = Boolean(prerelease(context.version));

  const enabled = [];
  const disabled = [];

  for (const tag of options.distTags) {
    const item = {
      name: tag,
      value: tag,
      disabled: isPrerelease && tag === "latest",
    };
    (item.disabled ? disabled : enabled).push(item);
  }

  const choices = [...enabled, ...disabled];

  const distTag = await select({
    message: "Select npm dist-tag",
    choices: choices,
  });

  Object.assign(context, {
    distTag,
  });
}
