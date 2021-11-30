---
title: 判断当前日期
---

# <H2Icon /> 判断当前日期

调起客户端小程序订阅消息界面，返回用户订阅消息的操作结果。当用户勾选了订阅面板中的“总是保持以上选择，不再询问”时，模板消息会被添加到用户的小程序设置页，通过 wx.getSetting 接口可获取用户对相关模板消息的订阅状态。

### 示例代码

::: tip
微信官方 API：wx.requestSubscribeMessage
<br />
API 文档地址：<a src="https://developers.weixin.qq.com/miniprogram/dev/api/open-api/subscribe-message/wx.requestSubscribeMessage.html">https://developers.weixin.qq.com/miniprogram/dev/api/open-api/subscribe-message/wx.requestSubscribeMessage.html</a>
:::

```ts
export const formatTime = ({
  date,
  onlyYear = false,
  space = '-',
  monthDay = false,
}: {
  date: Date
  onlyYear?: boolean
  monthDay?: boolean
  space?: string
}) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  if (monthDay) {
    return `${month}月${day}日`
  }
  return [year, month, day].map(formatNumber).join(space) + (onlyYear ? '' : ' ' + [hour, minute, second].map(formatNumber).join(':'))
}
```
