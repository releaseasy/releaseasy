# distTags

指定发布到 npm 时可使用的 `dist-tag`。

- **类型：** `string[]`
- **默认值：** `["latest", "next"]`

```js
export default {
  distTags: ["latest", "next"],
};
```

## 示例

增加 `beta` 标签：

```js
export default {
  distTags: ["latest", "next", "beta"],
};
```

发布时即可选择：

```text
latest
next
beta
```

也可以只保留需要的标签：

```js
export default {
  distTags: ["latest"],
};
```
