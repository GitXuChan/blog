---
title: fetch
---

# <H2Icon /> 装 fetch 函数，用 Promise 做回调

调起客户端小程序订阅消息界面，返回用户订阅消息的操作结果。当用户勾选了订阅面板中的“总是保持以上选择，不再询问”时，模板消息会被添加到用户的小程序设置页，通过 wx.getSetting 接口可获取用户对相关模板消息的订阅状态。

### 示例代码

::: tip
微信官方 API：wx.requestSubscribeMessage
<br />
API 文档地址：<a src="https://developers.weixin.qq.com/miniprogram/dev/api/open-api/subscribe-message/wx.requestSubscribeMessage.html">https://developers.weixin.qq.com/miniprogram/dev/api/open-api/subscribe-message/wx.requestSubscribeMessage.html</a>
:::

```js
const fetchUtil = {
  get: (url) => {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
        .then((response) => response.json())
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(new Error(err));
        });
    });
  },
  post: (url, params) => {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
      })
        .then((response) => response.json())
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(new Error(err));
        });
    });
  },
};
```

```js
import Fetch from "../util/FetchUtil.js";
    // post请求
    post(){
      let params = "";
      params += "phone=" + "xxxxxx" + "&password="+"123456";
      Fetch.post("https://carvedu.com/api/user/sms", this.params)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
    // get请求
    get() {
      Fetch.get("https://carvedu.com/api/courses")
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
```
