# hooks

`hooks` is used to execute custom commands at specified lifecycles of the releaseasy release process.

- **Type:** `Record<string, string | string[]>`

```js
export default {
  hooks: {
    "before:init": "npm run test",
    "after:changelog": "npm run format",
  },
};
```

## Lifecycle{#life-cycle}

The following lifecycles are currently supported:

| Hook               | Execution Timing                   |
| ------------------ | ---------------------------------- |
| `before:init`      | Before the release process starts  |
| `before:changelog` | Before generating the Changelog    |
| `after:changelog`  | After generating the Changelog     |
| `before:bump`      | Before updating the version number |
| `after:bump`       | After updating the version number  |
| `after:release`    | After the release process starts   |

## Single Command

A hook can directly specify a command:

```js
export default {
  hooks: {
    "before:init": "npm run test",
  },
};
```

## Multiple Commands

You can also specify an array of commands:

```js
export default {
  hooks: {
    "before:init": ["npm run lint", "npm run test"],
  },
};
```

The commands are executed in the order they are configured.

For example:

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
> Hook commands are executed by the current shell environment, so you can use scripts and commands already available in the project.
