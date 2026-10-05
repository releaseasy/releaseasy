# distTags

Specify the `dist-tag` values that can be used when publishing to npm.

- **Type:** `string[]`
- **Default:** `["latest", "next"]`

```js
export default {
  distTags: ["latest", "next"],
};
```

## Example

Add the `beta` tag:

```js
export default {
  distTags: ["latest", "next", "beta"],
};
```

You can then choose from the following when publishing:

```text
latest
next
beta
```

You can also keep only the tags you need:

```js
export default {
  distTags: ["latest"],
};
```
