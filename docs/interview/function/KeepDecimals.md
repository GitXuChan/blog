---
title: 保留小数
---

# <H2Icon /> Keep Decimals 保留小数

调起客户端小程序订阅消息界面，返回用户订阅消息的操作结果。当用户勾选了订阅面板中的“总是保持以上选择，不再询问”时，模板消息会被添加到用户的小程序设置页，通过 wx.getSetting 接口可获取用户对相关模板消息的订阅状态。

### 示例代码

::: tip
微信官方 API：wx.requestSubscribeMessage
<br />
API 文档地址：<a src="https://developers.weixin.qq.com/miniprogram/dev/api/open-api/subscribe-message/wx.requestSubscribeMessage.html">https://developers.weixin.qq.com/miniprogram/dev/api/open-api/subscribe-message/wx.requestSubscribeMessage.html</a>
:::

```ts
export const getFloat = function (number: any, n: any) {
  n = n ? parseInt(n) : 0;
  if (n <= 0) {
    return Math.round(number);
  }
  number = Math.round(number * Math.pow(10, n)) / Math.pow(10, n);  // 四舍五入
  number = Number(number).toFixed(n);  // 补足位数
  return number;
}
```
