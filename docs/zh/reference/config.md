# 配置概览

releaseasy的配置组成非常简单，只需要在配置文件中导出一个配置对象,对象由下面的属性组成：

- `increments` - 一个数组,包含版本递增类型
- `distTags` - 一个数组,表示npm dist-tag
- `git` - 一个对象,git相关的配置
- `hooks` - 一个对象，配置钩子生命周期
