# 变更日志

生成变更日志是 releaseasy 的核心功能。底层由[git-cliff](https://github.com/orhun/git-cliff)进行驱动。git-cliff 是一个高度灵活、可自定义的变更日志生成工具，这也是 `releaseasy` 选择它作为变更日志引擎的重要原因。

## 启用变更日志生成

releaseasy 已内置 git-cliff，可通过配置文件中的 `git.changelog` 进行配置。

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

## 变更日志模板

git-cliff 内置了多种流行的变更日志格式，你可以在 [git-cliff 模板示例文档](https://git-cliff.org/docs/templating/examples) 中预览不同模板的生成效果，选择合适的模板后，将其配置到 `cliff.toml` 中即可。如果内置模板无法满足需求，还可以参考 [git-cliff 模板文档](https://git-cliff.org/docs/category/templating)，自定义自己喜欢的生成效果。

> [!TIP]
> 关于 `cliff.toml` 的创建与配置，请参阅 [git-cliff 配置文件](./config-file#config-git-cliff)。
