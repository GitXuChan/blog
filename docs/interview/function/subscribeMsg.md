---
title: 订阅消息
---

# <H2Icon /> wx.requestSubscribeMessage 订阅消息

调起客户端小程序订阅消息界面，返回用户订阅消息的操作结果。当用户勾选了订阅面板中的“总是保持以上选择，不再询问”时，模板消息会被添加到用户的小程序设置页，通过 wx.getSetting 接口可获取用户对相关模板消息的订阅状态。

### 示例代码

::: tip
微信官方 API：wx.requestSubscribeMessage
<br />
API 文档地址：<a src="https://developers.weixin.qq.com/miniprogram/dev/api/open-api/subscribe-message/wx.requestSubscribeMessage.html">https://developers.weixin.qq.com/miniprogram/dev/api/open-api/subscribe-message/wx.requestSubscribeMessage.html</a>
:::

```ts
// 注意定义一个全局变量subscribePromise，防止重复触发订阅
subscribeMsg(tmpIds: AnyArray) {
const that = this
if (that.data.subscribePromise === null) {
    that.data.subscribePromise = new Promise((resolve) => {
        wx.requestSubscribeMessage({tmplIds: tmpIds, 
            success(res) {
                if (res[Object.keys(res)[0]] == 'accept') {
                    resolve(true)
                } else {
                    resolve(false)
                }
                that.data.subscribePromise = null
            },
            fail(err: any) {
                console.log(err)
                resolve(true)
                that.data.subscribePromise = null
            }
        })
    })}
    return that.data.subscribePromise
},
```
