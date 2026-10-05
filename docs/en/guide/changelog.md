# Changelog

Generating changelogs is a core feature of releaseasy. It is powered by [git-cliff](https://github.com/orhun/git-cliff) under the hood. git-cliff is a highly flexible and customizable changelog generation tool, which is also an important reason why `releaseasy` chose it as its changelog engine.

## Enabling Changelog Generation

releaseasy has git-cliff built in, and it can be configured via `git.changelog` in the configuration file.

```js{6-10}
/** @type { import('releaseasy').UserConfig } */
export default {
  increments: ["patch", "minor", "major"],
  distTags: ["latest", "next"],
  git: {
    changelog: {
      output: "CHANGELOG.md",
      configFile: "cliff.toml",
      args: "--tag ${version}",
    },
  },
};

```

## Changelog Templates

git-cliff includes multiple popular changelog formats. You can preview the generation results of different templates in the [git-cliff template examples documentation](https://git-cliff.org/docs/templating/examples). After choosing a suitable template, configure it in `cliff.toml`. If the built-in templates do not meet your needs, you can also refer to the [git-cliff templating documentation](https://git-cliff.org/docs/category/templating) to customize the generation result you like.

> [!TIP]
> For the creation and configuration of `cliff.toml`, please refer to the [git-cliff configuration file](./config-file#config-git-cliff).
