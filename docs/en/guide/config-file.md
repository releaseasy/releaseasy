# Configuration File

The configuration file allows you to define and customize release settings in a centralized and reusable way.

## Configuration File

By default, releaseasy looks for a configuration file in the current working directory. It supports the following filenames:

- releaseasy.config.js
- releaseasy.config.mjs
- releaseasy.config.cjs
- releaseasy.config.json
- releaseasy.config.ts (requires [additional configuration](#typescript-config-file))
- releaseasy.config.mts (requires [additional configuration](#typescript-config-file))
- releaseasy.config.cts (requires [additional configuration](#typescript-config-file))

In addition, you can also define the configuration directly in the `releaseasy` field of the package.json file.

> [!NOTE]
> The `.mjs` extension causes the file to use the [ES Module (ESM)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) format. By default, Node parses `.js` files as [CommonJS (CJS)](https://nodejs.org/api/modules.html), but if you set `"type": "module"` in package.json, you can also use `releaseasy.config.js`.

## Writing a Configuration File

The following is a simple example of a `releaseasy` configuration file:

```js
/** @type { import('releaseasy').UserConfig } */
export default {
  increments: ["patch", "minor", "major"],
  distTags: ["latest", "next"],
};
```

> [!TIP]
> For more available configuration options, please refer to [Configuration Options](/reference/config).

## Specifying a Custom Configuration File

If your configuration file is located elsewhere or has a different name, you can use the `--config` (or `-c`) option to specify its path:

```bash
releaseasy --config ./path/to/config
```

## TypeScript Config File{#typescript-config-file}

Deno and Bun natively support TypeScript configuration files. For Node.js, you must install jiti 2.2.0 or a later version as an optional development dependency in your project (releaseasy will not automatically install this dependency):

::: code-group

```sh [npm]
npm install --save-dev jiti
```

```sh [yarn]
yarn add --dev jiti
```

```sh [pnpm]
pnpm add --save-dev jiti
```

```sh [bun]
bun add --dev jiti
```

:::

Then your configuration file can use the `.ts`, `.mts`, or `.cts` extension.

> [!TIP]
> It is recommended to use the [setup wizard](./getting-started#setup-wizard), which will automatically help you install the required jiti dependency.
