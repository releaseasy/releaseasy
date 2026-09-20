# 后续 CI/CD 集成

`releaseasy` 仅负责本地版本发布和 Git 推送，**远程发布则交由 CI/CD 完成**。

发布时会创建并推送 Git tag，你可以在 GitHub Actions 工作流中监听 tag 推送事件，并执行后续的发布操作。

## 发布到 npm

### 创建 GitHub Actions 工作流

这里以GitHub Actions 工作流为例，在项目的 `.github/workflows` 目录中创建一个名为 `release.yml` 的文件，其中包含这样的内容：

```yaml [.github/workflows/release.yml]
name: release

on:
  push:
    tags:
      - "v*"

permissions:
  contents: write # 使能够发布GitHub版本
  id-token: write # OIDC 发布所必须的

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

### 配置 npm Trusted Publishing（OIDC）

进入 npmjs.com 上的软件包设置页面，找到“Trusted Publisher（可信发布者）”部分。在“Select your publisher（选择发布者）”下方，点击 GitHub Actions、GitLab CI/CD 或 CircleCI 按钮，选择你所使用的 CI/CD 提供商:

![publisher-config](/publisher-config.png)

> [!WARNING]
> 其中的 **Workflow filename** 就是创建 GitHub Actions 工作流的名称。 Allow npm publish 复选框必须勾选,否则`npm publish`命令会失败。

### `npm publish` 报 repository.url 错误

在发布过程中，`npm publish`命令可能会报以下错误：

```
Error verifying sigstore provenance bundle:
Failed to validate repository information:
package.json: "repository.url" is "",
expected to match "https://github.com/xxx/xxxx" from provenance
```

因为可信发布会检测您是否正确配置了仓库,所以您需要在您的`package.json`添加以下配置：

```json{5-8}
{
  "name": "you-awesome-project",
  "version": "1.8.1",
  //...
  "repository": { // [!code ++]
    "type": "git", // [!code ++]
    "url": "https://github.com/owner/repository.git" // [!code ++]
  } // [!code ++]
}
```

## 创建 github 的 Release

如果你想继续创建github 的 release，只需要在上面的工作流文件末尾追加以下内容：

```yaml
- name: Generate changelog for the latest release
  run: pnpm releaseasy changelog --config cliff.toml -o CHANGELOG-LATEST.md -vv --latest --strip header

- name: Github Release
  uses: softprops/action-gh-release@v2
  with:
    body_path: CHANGELOG-LATEST.md
    prerelease: ${{ contains(github.ref_name, '-') }}
```

> [!NOTE]
> 其中用到了`releaseasy changelog`命令,更多详情请参考CLI命令changelog。
