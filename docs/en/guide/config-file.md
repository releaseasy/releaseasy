# Configuration File

The configuration file allows you to define and customize release settings in a centralized and reusable way.

It is recommended to use the [setup wizard](./getting-started#setup-wizard), which will automatically help you generate the configuration file required by releaseasy.

> [!WARNING]
> If you enable the changelog generation feature, releaseasy requires that git-cliff's configuration file must explicitly exist, so you must generate git-cliff's configuration file in advance.

## git-cliff configuration file{#config-git-cliff}

You can use any of the following methods to quickly generate git-cliff's configuration file:

- [Setup wizard](./getting-started#setup-wizard)
- [releaseasy changelog command](../reference/cli#releaseasy-changelog)

For example, you can use the releaseasy changelog command to generate it for you:

```bash
# Create cliff.toml
releaseasy changelog --init

# Create a configuration file with a custom name
releaseasy changelog --init --config custom.toml

# Create a cliff.toml using the Keep a Changelog format
releaseasy changelog --init keepachangelog
```

For more usage and options for configuration file initialization, please refer to the [git-cliff official documentation: Initializing](https://git-cliff.org/docs/usage/initializing).

> [!IMPORTANT]
> If you create a configuration file with a custom name, then you need to create releaseasy's configuration file and specify that custom name in `git.changelog.configFile`.

## Configuration File

By default, releaseasy looks for the configuration file in the current working directory. It supports the following file names:

- releaseasy.config.js
- releaseasy.config.mjs
- releaseasy.config.cjs
- releaseasy.config.json
- releaseasy.config.ts
- releaseasy.config.mts
- releaseasy.config.cts

In addition, you can also define the configuration directly in the releaseasy field of the package.json file.

> [!NOTE]
> The `.mjs` extension causes the file to use the [ES Module (ESM)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) format. By default, Node will parse `.js` files as [CommonJS (CJS)](https://nodejs.org/api/modules.html), but if you set `"type": "module"` in package.json, you can also use `releaseasy.config.js`.

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
> For more available configuration items, please refer to [Configuration Options](/reference/config).

## Specifying a Custom Configuration File

If your configuration file is located elsewhere or has a different name, you can use the `--config` (or `-c`) option to specify its path:

```bash
releaseasy --config ./path/to/config
```
