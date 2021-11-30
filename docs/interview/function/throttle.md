---
title: 节流
---

# <H2Icon /> throttle 节流函数

调起客户端小程序订阅消息界面，返回用户订阅消息的操作结果。当用户勾选了订阅面板中的“总是保持以上选择，不再询问”时，模板消息会被添加到用户的小程序设置页，通过 wx.getSetting 接口可获取用户对相关模板消息的订阅状态。

### 示例代码

::: tip
微信官方 API：wx.requestSubscribeMessage
<br />
API 文档地址：<a src="https://developers.weixin.qq.com/miniprogram/dev/api/open-api/subscribe-message/wx.requestSubscribeMessage.html">https://developers.weixin.qq.com/miniprogram/dev/api/open-api/subscribe-message/wx.requestSubscribeMessage.html</a>
:::

```ts
export const throttle = function (fn: Function, rateTime: number) {
  let timer: any = null
  return function (this: any, ...args: any[]) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args)
        timer = null;
      }, rateTime)
    }
  }
}
```
