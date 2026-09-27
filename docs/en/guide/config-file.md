# Configuration File

Configuration files allow you to define and customize release settings in a centralized and reusable way.

> [!TIP]
> It is recommended to use the [setup wizard](./getting-started#setup-wizard), which will automatically help you generate the configuration file required by releaseasy.

## Configuration File

By default, releaseasy looks for a configuration file in the current working directory. It supports the following file names:

- releaseasy.config.js
- releaseasy.config.mjs
- releaseasy.config.cjs
- releaseasy.config.json
- releaseasy.config.ts
- releaseasy.config.mts
- releaseasy.config.cts

In addition, you can also define the configuration directly in the releaseasy field of the package.json file.

> [!NOTE]
> The `.mjs` extension causes the file to use the [ES module (ESM)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) format. By default, Node parses `.js` files as [CommonJS (CJS)](https://nodejs.org/api/modules.html), but if you set `"type": "module"` in package.json, you can also use `releaseasy.config.js`.

## Writing a Configuration File

The following is a simple `releaseasy` configuration file example:

```js
/** @type { import('releaseasy').UserConfig } */
export default {
  increments: ["patch", "minor", "major"],
  distTags: ["latest", "next"],
};
```

> [!TIP]
> For more available configuration options, see [Configuration Options](/reference/config).

## Specifying a Custom Configuration File

If your configuration file is located elsewhere or has a different name, you can use the `--config` (or `-c`) option to specify its path:

```bash
releaseasy --config ./path/to/config
```
