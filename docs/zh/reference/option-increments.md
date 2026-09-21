# increments

指定发布时允许选择的版本递增类型。

- **类型：** `string[]`
- **默认值：** `["patch", "minor", "major"]`

```js
export default {
  increments: ["patch", "minor", "major"],
};
```

## 支持的值

| 值           | 说明                       |
| ------------ | -------------------------- |
| `major`      | 主版本递增                 |
| `premajor`   | 预主版本递增               |
| `minor`      | 次版本递增                 |
| `preminor`   | 预次版本递增               |
| `patch`      | 修订版本递增               |
| `prepatch`   | 预修订版本递增             |
| `prerelease` | 递增预发布版本             |
| `release`    | 从预发布版本恢复为正式版本 |

## 示例

只允许发布补丁版本：

```js
export default {
  increments: ["patch"],
};
```

允许发布补丁和次版本：

```js
export default {
  increments: ["patch", "minor"],
};
```

也可以指定完整的版本递增选项：

```js
export default {
  increments: [
    "major",
    "premajor",
    "minor",
    "preminor",
    "patch",
    "prepatch",
    "prerelease",
    "release",
  ],
};
```

`increments` 的顺序会影响发布时版本类型的显示顺序。
