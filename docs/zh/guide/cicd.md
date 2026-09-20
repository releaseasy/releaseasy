# 后续 CI/CD 集成

`releaseasy` 负责本地 Release 流程，包括版本号更新、changelog 生成、Git commit、tag 创建以及 tag 推送；npm、GitHub Release 等远程发布操作则交由 CI/CD 完成。

当 `releaseasy` 推送新的 Git tag 后，CI/CD 平台即可监听 tag 推送事件，并执行后续的构建和发布流程。

## 工作原理

整个发布流程可以概括为：

```text
releaseasy
    │
    ├─ 更新版本号
    ├─ 生成 changelog
    ├─ Git commit
    ├─ 创建 Git tag
    └─ 推送 Git tag
            │
            ▼
      GitHub Actions
            │
            ├─ 安装依赖
            ├─ 构建项目
            ├─ 发布到 npm
            └─ 创建 GitHub Release
```

也就是说，`releaseasy` 只负责将项目发布到一个明确的 Git 状态，而具体的远程发布由 CI/CD 根据 Git tag 自动完成。

## 发布到 npm

### 创建 GitHub Actions 工作流

这里以 GitHub Actions 为例，在项目的 `.github/workflows` 目录中创建 `release.yml`：

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

该工作流会在推送 `v*` 格式的 Git tag 时自动执行。例如：

```bash
git push origin v1.8.1
```

GitHub Actions 检测到 `v1.8.1` tag 后，就会执行构建并将当前版本发布到 npm。

### 配置 npm Trusted Publishing

为了避免在 GitHub Actions 中保存 npm Access Token，可以使用 npm Trusted Publishing，通过 OIDC 让 GitHub Actions 获得发布权限。

进入 npmjs.com 上的软件包设置页面，找到 **Trusted Publisher** 部分。在 **Select your publisher** 下选择 **GitHub Actions**，然后配置对应的 GitHub 仓库和工作流。

![publisher-config](/publisher-config.png)

其中：

- **Repository owner**：GitHub 仓库所属的用户或组织
- **Repository**：GitHub 仓库名称
- **Workflow filename**：GitHub Actions 工作流文件名
- **Environment**：如果工作流使用了 GitHub Environment，则填写对应的 Environment

例如本文使用：

```text
.github/workflows/release.yml
```

因此 **Workflow filename** 应填写：

```text
release.yml
```

> [!WARNING]
> **Allow npm publish** 必须勾选，否则 `npm publish` 命令会失败。

由于 Trusted Publishing 使用 OIDC，因此 GitHub Actions 工作流需要包含：

```yaml
permissions:
  id-token: write
```

如果工作流还需要创建 GitHub Release，则同时需要：

```yaml
permissions:
  contents: write
```

> [!TIP]
> 有关[可信发布](https://docs.npmjs.com/trusted-publishers#configuring-trusted-publishing)的更多信息请参阅官方文档。

## 创建 GitHub Release

如果希望在发布 npm 的同时创建 GitHub Release，只需要在上述工作流中继续添加两个步骤。

首先使用 `releaseasy changelog` 生成当前版本的 changelog，然后使用 GitHub Release Action 创建 Release：

```yaml
- name: Generate changelog for the latest release
  run: pnpm releaseasy changelog --config cliff.toml -o CHANGELOG-LATEST.md -vv --latest --strip header

- name: GitHub Release
  uses: softprops/action-gh-release@v2
  with:
    body_path: CHANGELOG-LATEST.md
    prerelease: ${{ contains(github.ref_name, '-') }}
```

完整的发布流程就变成：

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

其中 `releaseasy changelog` 负责生成 Release 内容，`softprops/action-gh-release` 负责创建 GitHub Release。

> [!NOTE]
> `releaseasy changelog` 命令的详细用法请参考 [CLI 命令：changelog]。

## 常见问题

### `npm publish` 报 `repository.url` 错误

启用 npm Trusted Publishing 后，npm 会验证发布包中的仓库信息是否与 GitHub Actions 当前运行的仓库匹配。

如果 `package.json` 没有正确配置 `repository.url`，可能会出现类似错误：

```text
Error verifying sigstore provenance bundle:

Failed to validate repository information:

package.json: "repository.url" is "",

expected to match "https://github.com/owner/repository"
from provenance
```

请在 `package.json` 中配置正确的仓库地址：

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

其中 `repository.url` 应与实际 GitHub 仓库保持一致。

配置完成后重新执行发布流程即可。
