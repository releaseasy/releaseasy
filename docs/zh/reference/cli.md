---
outline: 2
---

# 命令行接口

你可以使用 `--help` 来查看所有的可运行命令:

```bash
releaseasy --help
```

## `releaseasy release`

运行发布的流程。

### 用法

```sh
# release是默认命令，可以省略
releaseasy
```

### 选项 {#options}

| 选项                  | 说明                     |
| --------------------- | ------------------------ |
| `-C, --cwd <路径>`    | 指定发布流程的工作目录   |
| `-d, --dry-run`       | 模拟运行，不执行实际更改 |
| `-c, --config <路径>` | 指定配置文件             |
| `-v, --verbose`       | 显示详细日志             |

## `releaseasy changelog`

使用 `git-cliff` 生成或更新 Changelog。

`releaseasy changelog` 不对参数进行额外处理，所有参数都会原样传递给 `git-cliff`。

### 用法

```bash
releaseasy changelog [git-cliff 参数...]
```

完整参数说明请参考 [git-cliff 官方文档](https://git-cliff.org/docs/usage/args)。

## `releaseasy init`

在当前目录中启动[安装向导](../guide/getting-started#setup-wizard)。

### 用法

```sh
releaseasy init
```
