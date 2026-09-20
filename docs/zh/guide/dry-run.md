# 演练模式

releaseasy 的生成变更日志、bump、git阶段可能会对当前仓库造成更改。

如果您只是想尝试一下交互性,您可以使用`--dry-run`选项：

```bash
releaseasy --dry-run
```

它不会破坏你当前工作区的任何内容。

## 自动回滚

或者您也可以正常的执行release流程：

```bash
releaseasy
```

等到最后确认推送阶段您按`Ctrl + C`也会自动回到仓库最初状态。
