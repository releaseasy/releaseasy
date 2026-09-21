# Subsequent CI/CD Integration

`releaseasy` is responsible for the local release process, including version number updates, changelog generation, Git commit, tag creation, and tag pushing; remote publishing operations such as npm and GitHub Release are handled by CI/CD.

After `releaseasy` pushes a new Git tag, the CI/CD platform can listen for the tag push event and execute the subsequent build and release process.

## How It Works

The entire release process can be summarized as:

```text
releaseasy
    │
    ├─ Update version number
    ├─ Generate changelog
    ├─ Git commit
    ├─ Create Git tag
    └─ Push Git tag
            │
            ▼
      GitHub Actions
            │
            ├─ Install dependencies
            ├─ Build project
            ├─ Publish to npm
            └─ Create GitHub Release
```

In other words, `releaseasy` is only responsible for bringing the project to a definite Git state, while the actual remote publishing is automatically completed by CI/CD based on the Git tag.

## Publishing to npm

### Create a GitHub Actions workflow

Here, GitHub Actions is used as an example. Create `release.yml` in the project's `.github/workflows` directory:

```yaml [.github/workflows/release.yml]
name: release

on:
  push:
    tags:
      - "v*"

permissions:
  contents: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v6
        with:
          fetch-depth: 0

      - name: Set up pnpm
        uses: pnpm/action-setup@v5

      - name: Set up Node
        uses: actions/setup-node@v4
        with:
          node-version: 24
          registry-url: "https://registry.npmjs.org"
          cache: "pnpm"

      - name: Install dependencies
        run: pnpm install

      - name: Build
        run: pnpm build

      - name: Publish to npm
        run: pnpm publish --no-git-checks
```

This workflow will automatically run when a Git tag in the `v*` format is pushed. For example:

```bash
git push origin v1.8.1
```

After GitHub Actions detects the `v1.8.1` tag, it will run the build and publish the current version to npm.

### Configure npm Trusted Publishing

To avoid storing an npm Access Token in GitHub Actions, you can use npm Trusted Publishing to grant GitHub Actions publish permissions via OIDC.

Go to the package settings page on npmjs.com and find the **Trusted Publisher** section. Under **Select your publisher**, select **GitHub Actions**, then configure the corresponding GitHub repository and workflow.

![publisher-config](/publisher-config.png)

Where:

- **Repository owner**: The user or organization that owns the GitHub repository
- **Repository**: The GitHub repository name
- **Workflow filename**: The GitHub Actions workflow filename
- **Environment**: If the workflow uses a GitHub Environment, fill in the corresponding Environment

For example, this article uses:

```text
.github/workflows/release.yml
```

Therefore, **Workflow filename** should be filled in as:

```text
release.yml
```

> [!WARNING]
> **Allow npm publish** must be checked, otherwise the `npm publish` command will fail.

Since Trusted Publishing uses OIDC, the GitHub Actions workflow needs to include:

```yaml
permissions:
  id-token: write
```

If the workflow also needs to create a GitHub Release, it also needs:

```yaml
permissions:
  contents: write
```

> [!TIP]
> For more information about [trusted publishing](https://docs.npmjs.com/trusted-publishers#configuring-trusted-publishing), please refer to the official documentation.

## Creating a GitHub Release

If you want to create a GitHub Release at the same time as publishing to npm, you only need to add two more steps to the above workflow.

First, use `releaseasy changelog` to generate the changelog for the current version, then use the GitHub Release Action to create the Release:

```yaml
- name: Generate changelog for the latest release
  run: pnpm releaseasy changelog --config cliff.toml -o CHANGELOG-LATEST.md -vv --latest --strip header

- name: GitHub Release
  uses: softprops/action-gh-release@v2
  with:
    body_path: CHANGELOG-LATEST.md
    prerelease: ${{ contains(github.ref_name, '-') }}
```

The complete release process then becomes:

```text
releaseasy
    │
    └─ push v1.8.1
          │
          ▼
    GitHub Actions
          │
          ├─ install
          ├─ build
          │
          ├─ npm publish
          │
          ├─ releaseasy changelog
          │
          └─ GitHub Release
```

Here, `releaseasy changelog` is responsible for generating the Release content, and `softprops/action-gh-release` is responsible for creating the GitHub Release.

> [!NOTE]
> For detailed usage of the `releaseasy changelog` command, please refer to [CLI command: changelog].

## FAQ

### `npm publish` reports a `repository.url` error

After enabling npm Trusted Publishing, npm verifies whether the repository information in the published package matches the repository currently running in GitHub Actions.

If `repository.url` is not correctly configured in `package.json`, an error similar to the following may occur:

```text
Error verifying sigstore provenance bundle:

Failed to validate repository information:

package.json: "repository.url" is "",

expected to match "https://github.com/owner/repository"
from provenance
```

Please configure the correct repository URL in `package.json`:

```json{5-7}
{
  "name": "you-awesome-project",
  "version": "1.8.1",
  "repository": {// [!code ++]
    "type": "git", // [!code ++]
    "url": "https://github.com/owner/repository.git" // [!code ++]
  } // [!code ++]
}
```

Here, `repository.url` should be consistent with the actual GitHub repository.

After configuration is complete, simply run the release process again.
