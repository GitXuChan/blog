---
title: 摄像头
---

# <H2Icon /> 判断浏览器是否支持摄像头

调起客户端小程序订阅消息界面，返回用户订阅消息的操作结果。当用户勾选了订阅面板中的“总是保持以上选择，不再询问”时，模板消息会被添加到用户的小程序设置页，通过 wx.getSetting 接口可获取用户对相关模板消息的订阅状态。

### 示例代码

::: tip
微信官方 API：wx.requestSubscribeMessage
<br />
API 文档地址：<a src="https://developers.weixin.qq.com/miniprogram/dev/api/open-api/subscribe-message/wx.requestSubscribeMessage.html">https://developers.weixin.qq.com/miniprogram/dev/api/open-api/subscribe-message/wx.requestSubscribeMessage.html</a>
:::

```ts
export default {
  // 判断有无摄像头
    videoCheck:()=>{
      var deviceList = [];
      navigator.mediaDevices
        .enumerateDevices()
        .then(devices => {
          devices.forEach(device => {
            deviceList.push(device.kind);
          });
          if (deviceList.indexOf("videoinput") == "-1") {
            console.info("没有摄像头");
            return false;
          } else {
            console.info("有摄像头");
          }
        })
        .catch(function(err) {
          alert(err.name + ": " + err.message);
        });
    },
}
```
