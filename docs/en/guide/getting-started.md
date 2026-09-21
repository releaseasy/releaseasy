# Quick Start

## Installation

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

## Setup Wizard{#setup-wizard}

releaseasy comes with a command-line setup wizard that helps you quickly generate a basic configuration file. After installation, start the wizard by running the following command:

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

You will need to answer a few simple questions:

<<< @/snippets/init.ansi

### Configuration File

After you finish running the setup wizard, two configuration files will be generated:

- releaseasy.config.mjs
- cliff.toml

One is the configuration file required by releaseasy, and the other is the configuration file for [git-cliff](https://git-cliff.org/docs/usage/initializing).

> [!TIP]
> For complete details on all configuration options for releaseasy, please refer to the [Configuration](/reference/config) reference.

## Up and Running {#up-and-running}

The tool should also inject the following npm script into `package.json`:

```json [package.json]
{
  ...
  "scripts": {
    "release": "releaseasy"
  },
  ...
}
```

When your project is ready to release, run it with the following command:

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

In addition to the npm script, you can also call releaseasy directly:

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

For more command-line usage, please refer to the [CLI Reference](../reference/cli).

## What's Next {#what-s-next}

- To learn more about continuous integration after pushing to a remote repository, continue reading [Subsequent CI/CD Integration](./cicd).

- To learn about formatting after changelog generation, continue reading [Hooks](./hooks).
