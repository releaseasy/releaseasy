# git

`git` is used to configure releaseasy's behavior when executing Git operations and generating the Changelog during the release process.

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

- **Type:** `false | string | string[] | RegExp`
- **Default:** `"main"`

Specify the Git branches allowed to perform the release operation.

### Single branch

```js
git: {
  requireBranch: "main",
}
```

Only allow releases on the `main` branch.

### Multiple branches

```js
git: {
  requireBranch: ["main", "develop"],
}
```

Allow releases on the `main` and `develop` branches.

### Regular expression

```js
git: {
  requireBranch: /^(main|develop)$/,
}
```

### Disable check

```js
git: {
  requireBranch: false,
}
```

Do not restrict the current Git branch.

## `commitMessage`

- **Type:** `string`
- **Default:** `"release: v${version}"`

Specify the commit message used when releaseasy creates a Git commit.

```js
git: {
  commitMessage: "release: v${version}",
}
```

Supports the `${version}` placeholder.

For example, when the version is `1.2.0`:

```text
release: v1.2.0
```

You can also use a custom format:

```js
git: {
  commitMessage: "chore(release): ${version}",
}
```

## `addArgs`

- **Type:** `string[]`
- **Default:** `["."]`

Specify the arguments passed to `git add`.

Default configuration:

```js
git: {
  addArgs: ["."],
}
```

Equivalent to:

```bash
git add .
```

For example:

```js
git: {
  addArgs: ["package.json", "CHANGELOG.md"],
}
```

Equivalent to:

```bash
git add package.json CHANGELOG.md
```

## `commitArgs`

- **Type:** `string[]`
- **Default:** `["--no-verify", "-s"]`

Specify the arguments passed to `git commit`.

```js
git: {
  commitArgs: ["--no-verify", "-s"],
}
```

releaseasy will pass these arguments directly to `git commit`.

## `tagName`

- **Type:** `string`
- **Default:** `"v${version}"`

Specify the name used when creating a Git tag.

```js
git: {
  tagName: "v${version}",
}
```

When the version is `1.2.0`, it generates:

```text
v1.2.0
```

You can also customize the format:

```js
git: {
  tagName: "release-${version}",
}
```

Generates:

```text
release-1.2.0
```

## `changelog`

Configure how the Changelog is generated.

- **Type:** `false | object`

### Disable Changelog

```js
git: {
  changelog: false,
}
```

### Configure Changelog

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

- **Type:** `string`
- **Default:** `"CHANGELOG.md"`

Specify the output file for the Changelog.

```js
changelog: {
  output: "CHANGELOG.md",
}
```

You can also specify another path:

```js
changelog: {
  output: "docs/changelog.md",
}
```

### `changelog.configFile`

- **Type:** `string`
- **Default:** `"cliff.toml"`

Specify the configuration file used by git-cliff.

```js
changelog: {
  configFile: "cliff.toml",
}
```

### `changelog.args`

- **Type:** `string`
- **Default:** `"--tag ${version}"`

Specify the command-line arguments passed to git-cliff.

```js
changelog: {
  args: "--tag ${version}",
}
```

The arguments are passed directly to git-cliff and will not be re-parsed or restricted by releaseasy.

> [!NOTE]
> For more arguments, please refer to git-cliff's [CLI documentation](https://git-cliff.org/docs/usage/args/).
