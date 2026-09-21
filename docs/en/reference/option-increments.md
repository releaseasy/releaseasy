# increments

Specify the version increment types that can be selected when releasing.

- **Type:** `string[]`
- **Default:** `["patch", "minor", "major"]`

```js
export default {
  increments: ["patch", "minor", "major"],
};
```

## Supported Values

| Value        | Description                                         |
| ------------ | --------------------------------------------------- |
| `major`      | Major version increment                             |
| `minor`      | Minor version increment                             |
| `patch`      | Patch version increment                             |
| `premajor`   | Premajor version increment                          |
| `preminor`   | Preminor version increment                          |
| `prepatch`   | Prepatch version increment                          |
| `prerelease` | Increment prerelease version                        |
| `release`    | Restore from prerelease version to official version |

## Example

Only allow patch releases:

```js
export default {
  increments: ["patch"],
};
```

Allow patch and minor releases:

```js
export default {
  increments: ["patch", "minor"],
};
```

You can also specify the complete set of version increment options:

```js
export default {
  increments: [
    "major",
    "minor",
    "patch",
    "premajor",
    "preminor",
    "prepatch",
    "prerelease",
    "release",
  ],
};
```

The order of `increments` affects the display order of version types during release.
