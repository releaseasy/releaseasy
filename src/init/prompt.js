import { select, confirm } from "@inquirer/prompts";

export async function promptInit(environment) {
  const configFormat = await select({
    message: "Which config format would you like?",
    default: environment.hasTsConfig ? "typescript" : "javascript",

    choices: [
      {
        name: "JavaScript",
        value: "javascript",
      },
      {
        name: "TypeScript",
        value: "typescript",
      },
      {
        name: "JSON",
        value: "json",
      },
    ],
  });

  const changelogFormat = await select({
    message: "Which changelog format?",
    choices: [
      {
        name: "Keep a Changelog",
        value: "keepachangelog",
      },
      {
        name: "GitHub",
        value: "github",
      },
      {
        name: "GitHub Keep a Changelog",
        value: "github-keepachangelog",
      },
      {
        name: "GitLab",
        value: "gitlab",
      },
      {
        name: "GitLab Keep a Changelog",
        value: "gitlab-keepachangelog",
      },
      {
        name: "detailed",
        value: "detailed",
      },
      {
        name: "minimal",
        value: "minimal",
      },
      {
        name: "scoped",
        value: "scoped",
      },
      {
        name: "scopesorted",
        value: "scopesorted",
      },
      {
        name: "cocogitto",
        value: "cocogitto",
      },
      {
        name: "unconventional",
        value: "unconventional",
      },
    ],
  });

  const addScripts = await confirm({
    message: "Add releaseasy npm scripts to package.json?",
    default: true,
  });

  return {
    configFormat,
    moduleFormat: environment.moduleFormat,
    changelogFormat,
    addScripts,
  };
}
