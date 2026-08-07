<div align="center">

<img src="./logo.png" width="120" alt="releaseasy">

# releaseasy

[![Buy me a coffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-048754?logo=buymeacoffee)](https://www.lujiahao.com/sponsor)
[![npm version](https://img.shields.io/npm/v/releaseasy)](https://www.npmjs.com/package/releaseasy)
[![codecov](https://codecov.io/gh/ajiho/releaseasy/graph/badge.svg?token=G2P1AI238H)](https://codecov.io/gh/ajiho/releaseasy)
[![Test](https://img.shields.io/github/actions/workflow/status/ajiho/releaseasy/test.yml?label=Test&logo=github&style=flat-square&branch=main)](https://github.com/ajiho/releaseasy/actions/workflows/test.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/ajiho/releaseasy/blob/main/LICENSE)

Release made easy

</div>

## 特性

- 非常轻量(本地仅执行 tag 与 push，CI负责后续发布流水线)
- 交互式 CLI UI
- 语义化版本（SemVer）管理（patch / minor / major / custom）
- 确保在指定发布分支上执行发布
- 确保 Git 工作目录干净
- 集成灵活强大的 [git-cliff](https://github.com/orhun/git-cliff) 生成变更日志
- 灵活的生命周期钩子系统
- 自动更新 package.json 和 lock(如果存在) 文件版本
- 自动执行 Git 操作（add / commit / tag / push）
- 支持灵活配置 npm [dist-tags](https://docs.npmjs.com/cli/dist-tag)
- 防止预发布版本误发布到 npm `latest`
- 发布失败自动回滚到初始状态
