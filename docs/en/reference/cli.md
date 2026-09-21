---
outline: 2
---

# Command Line Interface

You can use `--help` to view all runnable commands:

```bash
releaseasy --help
```

## `releaseasy release`

Run the release process.

### Usage

```sh
# release is the default command and can be omitted
releaseasy
```

### Options {#options}

| Option                | Description                                           |
| --------------------- | ----------------------------------------------------- |
| `-C, --cwd <path>`    | Specify the working directory for the release process |
| `-d, --dry-run`       | Simulate the run without executing actual changes     |
| `-c, --config <path>` | Specify the configuration file                        |
| `-v, --verbose`       | Show detailed logs                                    |

## `releaseasy changelog`

Generate or update the Changelog using `git-cliff`.

`releaseasy changelog` does not perform additional processing on the arguments; all arguments are passed through to `git-cliff` as-is.

### Usage

```bash
releaseasy changelog [git-cliff arguments...]
```

For complete argument descriptions, please refer to the [git-cliff official documentation](https://git-cliff.org/docs/usage/args).

## `releaseasy init`

Start the [setup wizard](../guide/getting-started#setup-wizard) in the current directory.

### Usage

```sh
releaseasy init
```
