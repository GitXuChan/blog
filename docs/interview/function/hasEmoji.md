---
title: 验证emoji表情
---

# <H2Icon /> 验证emoji表情

web开发中我们大部分使用css单位是px，但是在小程序中使用的则是rpx，所以可以使用这个函数在某些场景中转换对应的单位。

### 示例代码

::: tip
npm安装：`/miniprogram_npm/lin-ui/utils/util.js`
<br />
源码安装：`/dist/utils/util.js`
:::

```ts
export const hasEmoji = function (value: string, tips = "") {
  let char = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;
  if (char.test(value)) {
    wx.showToast({
      title: `${tips}不能含有特殊字符`,
      icon: 'none'
    })
    return true
  }
  return false
}
```