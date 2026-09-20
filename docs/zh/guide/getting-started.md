# 快速开始

## 安装

::: code-group

```sh [npm]
npm add -D releaseasy
```

```sh [pnpm]
pnpm add -D releaseasy
```

```sh [yarn]
yarn add -D releaseasy
```

```sh [bun]
bun add -D releaseasy
```

:::

## 安装向导{#setup-wizard}

releaseasy 附带一个命令行设置向导，可以帮助你快速生成基本的配置文件。安装后，通过运行以下命令启动向导：

::: code-group

```sh [npm]
npx releaseasy init
```

```sh [pnpm]
pnpm releaseasy init
```

```sh [yarn]
yarn releaseasy init
```

```sh [bun]
bun releaseasy init
```

:::

将需要回答几个简单的问题：

<<< @/snippets/init.ansi

### 配置文件

当你运行完毕安装向导后会生成两个配置文件:

- releaseasy.config.mjs
- cliff.toml

一个是 releaseasy 所需的配置文件一个是[git-cliff](https://git-cliff.org/docs/usage/initializing)的配置文件。

> [!TIP]
> releaseasy 有关所有配置选项的完整详细信息，请参见[配置](/reference/config)参考。

## 启动并运行 {#up-and-running}

该工具还应该将以下 npm 脚本注入到 `package.json` 中：

```json [package.json]
{
  ...
  "scripts": {
    "release": "releaseasy"
  },
  ...
}
```

当你的项目准备好发布时，使用以下命令运行它：

::: code-group

```sh [npm]
$ npm run release
```

```sh [pnpm]
$ pnpm run release
```

```sh [yarn]
$ yarn release
```

```sh [bun]
$ bun run release
```

:::

除了 npm 脚本，还可以直接调用 releaseasy：

::: code-group

```sh [npm]
$ npx releaseasy
```

```sh [pnpm]
$ pnpm releaseasy
```

```sh [yarn]
$ yarn releaseasy
```

```sh [bun]
$ bun releaseasy
```

:::

更多的命令行用法请参见 [CLI 参考](../reference/cli)。

## 下一步 {#what-s-next}

- 想要进一步了解 推送到远程仓库后的持续集成，请继续阅读[后续CI/CD 集成](./cicd)。

- 要了解变更日志生成后想格式化处理，请继续阅读 [Hooks](./hooks)。
