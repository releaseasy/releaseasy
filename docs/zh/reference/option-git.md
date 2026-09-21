# git

`git` 用于配置 releaseasy 在发布过程中执行 Git 操作以及生成 Changelog 的行为。

```js
export default {
  git: {
    requireBranch: "main",
    commitMessage: "release: v${version}",
    addArgs: ["."],
    commitArgs: ["--no-verify", "-s"],
    tagName: "v${version}",

    changelog: {
      output: "CHANGELOG.md",
      configFile: "cliff.toml",
      args: "--tag ${version}",
    },
  },
};
```

## `requireBranch`

- **类型：** `false | string | string[] | RegExp`
- **默认值：** `"main"`

指定允许执行发布操作的 Git 分支。

### 单个分支

```js
git: {
  requireBranch: "main",
}
```

只允许在 `main` 分支发布。

### 多个分支

```js
git: {
  requireBranch: ["main", "develop"],
}
```

允许在 `main` 和 `develop` 分支发布。

### 正则表达式

```js
git: {
  requireBranch: /^(main|develop)$/,
}
```

### 禁用检查

```js
git: {
  requireBranch: false,
}
```

不限制当前 Git 分支。

## `commitMessage`

- **类型：** `string`
- **默认值：** `"release: v${version}"`

指定 releaseasy 创建 Git commit 时使用的提交信息。

```js
git: {
  commitMessage: "release: v${version}",
}
```

支持 `${version}` 占位符。

例如版本为 `1.2.0` 时：

```text
release: v1.2.0
```

也可以使用自定义格式：

```js
git: {
  commitMessage: "chore(release): ${version}",
}
```

## `addArgs`

- **类型：** `string[]`
- **默认值：** `["."]`

指定传递给 `git add` 的参数。

默认配置：

```js
git: {
  addArgs: ["."],
}
```

等价于：

```bash
git add .
```

例如：

```js
git: {
  addArgs: ["package.json", "CHANGELOG.md"],
}
```

等价于：

```bash
git add package.json CHANGELOG.md
```

## `commitArgs`

- **类型：** `string[]`
- **默认值：** `["--no-verify", "-s"]`

指定传递给 `git commit` 的参数。

```js
git: {
  commitArgs: ["--no-verify", "-s"],
}
```

releaseasy 会将这些参数直接传递给 `git commit`。

## `tagName`

- **类型：** `string`
- **默认值：** `"v${version}"`

指定创建 Git tag 时使用的名称。

```js
git: {
  tagName: "v${version}",
}
```

当版本为 `1.2.0` 时，生成：

```text
v1.2.0
```

也可以自定义格式：

```js
git: {
  tagName: "release-${version}",
}
```

生成：

```text
release-1.2.0
```

## `changelog`

配置 Changelog 的生成方式。

- **类型：** `false | object`

### 禁用 Changelog

```js
git: {
  changelog: false,
}
```

### 配置 Changelog

```js
git: {
  changelog: {
    output: "CHANGELOG.md",
    configFile: "cliff.toml",
    args: "--tag ${version}",
  },
}
```

### `changelog.output`

- **类型：** `string`
- **默认值：** `"CHANGELOG.md"`

指定 Changelog 的输出文件。

```js
changelog: {
  output: "CHANGELOG.md",
}
```

也可以指定其他路径：

```js
changelog: {
  output: "docs/changelog.md",
}
```

### `changelog.configFile`

- **类型：** `string`
- **默认值：** `"cliff.toml"`

指定 git-cliff 使用的配置文件。

```js
changelog: {
  configFile: "cliff.toml",
}
```

### `changelog.args`

- **类型：** `string`
- **默认值：** `"--tag ${version}"`

指定传递给 git-cliff 的命令行参数。

```js
changelog: {
  args: "--tag ${version}",
}
```

参数会直接传递给 git-cliff，不会被 releaseasy 重新解析或限制。

> [!NOTE]
> 更多参数请参考 git-cliff 的 [CLI 文档](https://git-cliff.org/docs/usage/args/)。
