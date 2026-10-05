# 配置文件

配置文件允许您以集中且可复用的方式定义和自定义发行设置。

建议使用[安装向导](./getting-started#setup-wizard)它会自动帮助您生成 releaseasy 所需的配置文件。

## git-cliff 配置文件{#config-git-cliff}

如果你需要生成变更日志的功能(默认是启用的)，那么releaseasy要求git-cliff的配置文件是一定要显示存在的，所以您必须提前生成 git-cliff 的配置文件。您可以使用以下任意方式来帮您快速生成git-cliff的配置文件:

- [安装向导](./getting-started#setup-wizard)
- [releaseasy changelog 命令](../reference/cli#releaseasy-changelog)

比如您使用 releaseasy changelog 命令 来帮您生成：

```bash
# 创建 cliff.toml
releaseasy changelog --init

# 使用自定义名称创建配置文件
releaseasy changelog --init --config custom.toml

# 创建采用 Keep a Changelog 格式的 cliff.toml
releaseasy changelog --init keepachangelog
```

有关配置文件初始化的更多用法和选项，请参阅 [git-cliff 官方文档：Initializing](https://git-cliff.org/docs/usage/initializing)。

> [!WARNING]
> 如果你使用自定义名称创建配置文件,那么您需要创建 releaseasy 的[配置文件](#config-file)，并在`git.changelog.configFile`配置指定该自定义名称。

## 配置文件{#config-file}

默认情况下，releaseasy 会在当前工作目录中查找配置文件。它支持以下文件名：

- releaseasy.config.js
- releaseasy.config.mjs
- releaseasy.config.cjs
- releaseasy.config.json
- releaseasy.config.ts
- releaseasy.config.mts
- releaseasy.config.cts

此外，您还可以直接在 package.json 文件的 releaseasy 字段中定义配置。

> [!NOTE]
> `.mjs` 扩展名会使文件采用 [ES 模块（ESM）](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)格式。默认情况下，Node 会将 `.js` 文件按 [CommonJS（CJS）](https://nodejs.org/api/modules.html)格式解析，但如果你在 package.json 中设置了 `"type": "module"`，那么也可以使用 `releaseasy.config.js`。

## 编写配置文件

以下是一个简单的 `releaseasy` 配置文件示例：

```js
/** @type { import('releaseasy').UserConfig } */
export default {
  increments: ["patch", "minor", "major"],
  distTags: ["latest", "next"],
};
```

> [!TIP]
> 更多可用配置项请参考[配置选项](/reference/config)。

## 指定自定义配置文件

如果您的配置文件位于其他位置或具有不同的名称，可以使用 `--config`（或 `-c`）选项指定其路径：

```bash
releaseasy --config ./path/to/config
```
