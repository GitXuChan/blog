---
title: 正则表达式
---

# <H2Icon /> 正则表达式

调起客户端小程序订阅消息界面，返回用户订阅消息的操作结果。当用户勾选了订阅面板中的“总是保持以上选择，不再询问”时，模板消息会被添加到用户的小程序设置页，通过 wx.getSetting 接口可获取用户对相关模板消息的订阅状态。

### 示例代码

::: tip
微信官方 API：wx.requestSubscribeMessage
<br />
API 文档地址：<a src="https://developers.weixin.qq.com/miniprogram/dev/api/open-api/subscribe-message/wx.requestSubscribeMessage.html">https://developers.weixin.qq.com/miniprogram/dev/api/open-api/subscribe-message/wx.requestSubscribeMessage.html</a>
:::

## 过滤Emoji表情
```ts
/** 过滤Emoji表情 */
export const filterEmoji = (name) => {
  const str = name.replace(/[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig, "");
  return str;
}
```

## 过滤税号
```ts
/** 过滤税号 */
export const isNumber = (num: string) => /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/.test(num)
```

## 验证手机号
```ts
/** 验证手机号 */
export const isPhone = (phone: any) => /^[1][0-9]{10}$/.test(phone)
```

## 验证邮箱
```ts
/** 验证手机号 */
export const isEmail = (email: string) => /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(email)
```

## 时间格式化-带时区
```ts
/** 时间格式化（UTC格式）-带时区 */
export const formatDateTime = (date: string, num: number = 3, interval: string = '-') => {
  const arr = date.split("T");
  const d = arr[0];
  const darr = d.split('-');
  const t = arr[1];
  const tarr = t.split('+');
  const marr = tarr[0].split(':');
  const tzone = Number(tarr[1].substr(0, 2))
  const dd = parseInt(darr[0]) + "/" + parseInt(darr[1]) + "/" + parseInt(darr[2]) + " " + parseInt(marr[0]) + ":" + parseInt(marr[1]) + ":" + parseInt(marr[2]);
  let time = new Date(Date.parse(dd));
  time.setTime(time.setHours(time.getHours() + (8 - tzone)));
  let Y = time.getFullYear() + interval;
  const addZero = (num: number) => num < 10 ? '0' + num : num;
  let M = addZero(time.getMonth() + 1) + interval;
  let D = addZero(time.getDate());
  let h = ' ' + addZero(time.getHours());
  let m = ':' + addZero(time.getMinutes());
  let s = ':' + addZero(time.getSeconds());
  let result = Y + M + D
  switch (num) {
    case 2:
      result = h + m
      break
    case 3:
      result = Y + M + D
      break;
    case 4:
      result = Y + M + D + h
      break;
    case 5:
      result = Y + M + D + h + m
      break;
    case 6:
      result = Y + M + D + h + m + s
      break;
  }
  return result;
}
```
