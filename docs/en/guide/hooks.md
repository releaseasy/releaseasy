# Hooks

The purpose of hooks is to execute some shell scripts at specific stages.

> [!TIP]
> Click here to view the currently supported list of [lifecycle hooks](/reference/option-hooks#life-cycle).

## Formatting after changelog generation

Since the formatting tools used in each project may be different, such as:

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
    "after:bump": "prettier --write package.json", // [!code ++]
  },// [!code ++]
};

```

## Reusing context

If you do not want to write the changelog path in two places, you can reuse it directly in the following way:

```js{5}
/** @type { import('releaseasy').UserConfig } */
export default {
  ...
  hooks: {
    "after:changelog": "prettier --write ${changelog.output}",
  },
};

```
