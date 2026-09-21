# hooks

`hooks` 用于在 releaseasy 发布流程的指定生命周期执行自定义命令。

- **类型：** `Record<string, string | string[]>`

```js
export default {
  hooks: {
    "before:init": "npm run test",
    "after:changelog": "npm run format",
  },
};
```

## 生命周期{#life-cycle}

目前支持以下生命周期：

| Hook               | 执行时机            |
| ------------------ | ------------------- |
| `before:init`      | 发布流程开始之前    |
| `before:changelog` | 生成 Changelog 之前 |
| `after:changelog`  | 生成 Changelog 之后 |
| `before:bump`      | 更新版本号之前      |
| `after:bump`       | 更新版本号之后      |
| `after:release`    | 发布流程开始之后    |

## 单个命令

Hook 可以直接指定一个命令：

```js
export default {
  hooks: {
    "before:init": "npm run test",
  },
};
```

## 多个命令

也可以指定一个命令数组：

```js
export default {
  hooks: {
    "before:init": ["npm run lint", "npm run test"],
  },
};
```

命令会按照配置中的顺序依次执行。

例如：

```js
export default {
  hooks: {
    "before:init": ["npm run lint", "npm run test"],
    "after:changelog": "prettier --write CHANGELOG.md",
    "after:bump": "oxfmt package.json",
    "after:release": "echo Successfully released ${name} v${version} with tag ${tagName}.",
  },
};
```

> [!TIP]
> Hook 命令由当前 shell 环境执行，因此可以使用项目中已有的脚本和命令。
