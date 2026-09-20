# 变更日志

生成变更日志是 releaseasy 的核心功能。底层由灵活且可定制的 Git 变更日志生成工具[git-cliff](https://github.com/orhun/git-cliff)进行驱动。

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

::: tip
如果您想关闭变更日志生成功能可以把`changelog`设置为`false`
:::

## 变更日志模板

git-cliff内置了许多非常流行的变更日志格式(规范)的模板,可以在 git-cliff 文档中查看不同模板生成效果[示例](https://git-cliff.org/docs/templating/examples),你也可以直接在git-cliff的仓库中找到[模板文件](https://github.com/orhun/git-cliff/tree/main/examples)。接着选择你喜欢的格式复制到`cliff.toml`配置文件中运行`pnpm releaseasy`进行变更日志生成后，预览生成的变更日志效果。

> [!TIP]
> 建议可以通过 releaseasy init 命令进行生成。
