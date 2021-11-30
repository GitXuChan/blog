---
title: 图片是否加载完成
---

# <H2Icon /> 图片是否加载完成

web开发中我们大部分使用css单位是px，但是在小程序中使用的则是rpx，所以可以使用这个函数在某些场景中转换对应的单位。

### 示例代码

::: tip
npm安装：`/miniprogram_npm/lin-ui/utils/util.js`
<br />
源码安装：`/dist/utils/util.js`
:::

```ts
export default {
    // 图片加载
    imgLoad:(src)=>{
      let bgImg = new Image();
      bgImg.src = src; // 获取背景图片的url
      bgImg.onerror = () => {
        console.log("img onerror");
      };
      bgImg.onload = () => {
        console.log("加载完成");
        return false
      };
    }
}
```

```js
import imgLoad from '../util/imgLoad'

imgLoad.imgLoad('这里写图片的地址');
```