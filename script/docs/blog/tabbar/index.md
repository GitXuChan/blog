# 小程序自定义TabBar

### 1：配置信息
• 在 app.json 中的 tabBar 项指定 custom 字段，同时其余 tabBar 相关配置也补充完整。
• 所有 tab 页的 json 里需声明 usingComponents 项，也可以在 app.json 全局开启。
```js
{
  "tabBar": {
    "custom": true,
    "color": "#000000",
    "selectedColor": "#000000",
    "backgroundColor": "#000000",
    "list": [{
      "pagePath": "page/component/index",
      "text": "组件"
    }, {
      "pagePath": "page/API/index",
      "text": "接口"
    }]
  },
  "usingComponents": {}
}
```
### 2：添加文件在根目录新增组件文件
```
custom-tab-bar/index.js
custom-tab-bar/index.json
custom-tab-bar/index.wxml
custom-tab-bar/index.wxss
```

### 3：index.wxml内容如下：
```js
<cover-view class="tab-bar" id="tab">
  <cover-view class="tab-bar-border"></cover-view>
  <cover-view wx:for="{{list}}" wx:key="index" class="tab-bar-item" data-path="{{item.pagePath}}" data-index="{{index}}" bindtap="switchTab">
    <cover-image class="icon" src="{{selected == index ? item.selectedIconPath : item.iconPath}}"></cover-image>
    <cover-view class="txt" style="color: {{selected == index ? selectedColor : color}}">{{item.text}}</cover-view>
  </cover-view>
</cover-view>
```

### 4：index.js内容如下：
```js
const App = getApp();
Component({
  data: {
    selected: 0,
    color: "#999",
    selectedColor: "#000",
    list: [
      {
        "pagePath": "/pages/giftCard/giftCard",
        "text": "礼品卡",
        "iconPath": '../imgs/tab2.png',
        "selectedIconPath": '../imgs/se_tab2.png',
        "type": "0"
      },
      {
        "pagePath": "/pages/index/index",
        "text": "产品",
        "iconPath": '../imgs/tab1.png',
        "selectedIconPath": '../imgs/se_tab1.png',
        "type": "2",
      },
      {
        "pagePath": "/pages/cart/cart",
        "text": "购物车",
        "iconPath": '../imgs/tab4.png',
        "selectedIconPath": '../imgs/se_tab4.png',
        "type": "1"
      },
      {
        "pagePath": "/pages/myOrder/myOrder",
        "text": "我的订单",
        "iconPath": '../imgs/tab3.png',
        "selectedIconPath": '../imgs/se_tab3.png',
        "type": "0"
      }],
  },
  attached() {
  
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({ url });
      this.setData({
        selected: data.index
      })
    }
  }
})
```

### 5：index.wxss内容如下：
```js
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 48px;
  background: white;
  display: flex;
  padding-bottom: env(safe-area-inset-bottom);
}
.tab-bar-border {
  background-color: rgba(0, 0, 0, 0.33);
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 1px;
  transform: scaleY(0.5);
}
.tab-bar-item {
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.icon {
  width: 27px;
  height: 27px;
}
.txt {
  font-size: 10px;
}
```

### 6：如果你需要自定义的TabBar是多少个那么你的app.json中就需要配置几个相同的TabBar如下：

### 7：这样配置后，你真正的TabBar页面就可以直接自己使用这个自定义的TabBar文件了，不需要你去写任何引用的标签
注意：每个在每一个tab页面的onshow方法里写上如下代码：
- 1：这个是为了防止跳转页面后选中的效果丢失；
- 2：selected是写选中第几个按钮的索引。
```js
if (typeof that.getTabBar === 'function' && that.getTabBar()) {
        that.getTabBar().setData({
          selected: 0
        })
      }
```

好处：
- 1：自定义样式，可实现授权，条件判断跳转拦截；
- 2：可使用原生TabBar跳转方式跳转wx.switchTab；
- 3：UI页面默认跟原生样式一模一样；
- 4：可实现不同会员自定义显示不同按钮；
- 5：可以在非TabBar页面进入这个自定义TabBar。

等等优点，欢迎大家尝试使用，提出更多建议。
具体参考腾讯文档：https://developers.weixin.qq.com/miniprogram/dev/extended/weui/tabbar.html