# Hooks

The purpose of hooks is to execute shell scripts at specific stages.

> [!TIP]
> Click here to view the currently supported list of [lifecycle hooks](../reference/option-hooks#life-cycle).

## Formatting After Changelog Generation

Since the formatting tool used in each project may be different, for example:

- prettier
- Biome
- Oxfmt
- dprint

Hooks can perfectly solve this problem, keeping the generated changelog consistent with the overall style of the project or sorting the fields in the package.json file:

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
    "after:bump": "oxfmt package.json", // [!code ++]
  },// [!code ++]
};

```

## Reusing Context

If you don't want to write the changelog path twice, you can reuse it as follows:

```js{10}
/** @type { import('releaseasy').UserConfig } */
export default {
  ...
  git: {
    changelog: {
      output: "CHANGELOG.md",
    },
  },
  hooks: {
    "after:changelog": "prettier --write ${changelog.output}",
  },
};
```
