---
title: 数组对象去重
---

# <H2Icon /> 对象数组根据对象某一个属性去重

web开发中我们大部分使用css单位是px，但是在小程序中使用的则是rpx，所以可以使用这个函数在某些场景中转换对应的单位。

### 示例代码

::: tip
npm安装：`/miniprogram_npm/lin-ui/utils/util.js`
<br />
源码安装：`/dist/utils/util.js`
:::

```ts
export const unique = (arr: AnyArray, key: string, hash: any = {}) => arr.reduce(function (item, next) {
  hash[next[key]] ? '' : hash[next[key]] = true && item.push(next);
  return item
}, [])
```