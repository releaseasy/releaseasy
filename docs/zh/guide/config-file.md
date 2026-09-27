# 配置文件

配置文件允许您以集中且可复用的方式定义和自定义发行设置。

> [!TIP]
> 建议使用[安装向导](./getting-started#setup-wizard)它会自动帮助您生成 releaseasy 所需的配置文件。

## 配置文件

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
