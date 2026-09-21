# Hooks

该钩子的作用是在特定的阶段执行一些 shell 脚本。

> [!TIP]
> 点此查看目前支持的[生命周期钩子](/reference/option-hooks#life-cycle)列表。

## 变更日志生成后格式化

由于每个项目中使用的格式化工具可能都不一样，比如：

- prettier
- Biome
- Oxfmt
- dprint

而钩子则可以完美的解决这个问题,让生成的变更日志和项目整体的风格保持一致或者对package.json文件的字段进行排序:

```js{12-15}
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
   hooks: { // [!code ++]
    "after:changelog": "prettier --write CHANGELOG.md", // [!code ++]
    "after:bump": "prettier --write package.json", // [!code ++]
  },// [!code ++]
};

```

## 复用上下文

变更日志路径如果你不想写两边，你可以直接使用下面的方式进行复用：

```js{5}
/** @type { import('releaseasy').UserConfig } */
export default {
  ...
  hooks: {
    "after:changelog": "prettier --write ${changelog.output}",
  },
};

```
