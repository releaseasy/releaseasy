# Dry Run Mode

releaseasy's changelog generation, bump, and git stages may make changes to the current repository.

If you just want to try out the interactivity, you can use the `--dry-run` option:

```bash
releaseasy --dry-run
```

It will not destroy anything in your current workspace.

## Automatic Rollback

Alternatively, you can also run the release process normally:

```bash
releaseasy
```

When you reach the final confirmation push stage and press `Ctrl + C`, it will also automatically return to the repository's initial state.
