# 小程序（五）用户登录架构设计

## 1. 前言
在小程序生态的中从来没有强制开发者一定要使用某种登录方式，一般产品可以采用手机号验证码登录方式、邮箱或其他第三方方式、微信官方提供的openId和UnionId。就微信自带的生态而言，官方提供了两种API：
OpenId 是一个用户对于一个小程序中的身份证。

UnionId 是一个用户对于同一主体下 微信小程序／公众号／APP 的标识，开发者可以通过UnionId实现多个小程序、公众号下的用户数据互通。

同一个用户的这两个 ID 对于同一个小程序来说是固定的，具有不可变性。只要产品在微信公众平台下注册并绑定，在小程序登录时调用 wx.login 获取到的 code 直接换到 unionId，wx.getUserInfo 不需要依赖 wx.login 就能调用得到数据。
微信官方规范开发者应在不骚扰用户的情况下合理请求 unionid，而仅在必要时才向用户弹窗申请使用用户昵称头像，从而衍生出「静默登录」和「用户登录」两种方式。
## 2. 静默登录
小程序可以通过微信官方提供的登录能力方便地获取微信提供的用户身份标识，快速建立小程序内的用户体系。通常产品会在小程序启动时把 wx.login 和 wx.getUserInfo 联合调用，其中 wx.login 用于 拿 code 交换后端 JWT，用wx.getUserInfo 获取用户其他的基本信息（性别、城市等等）。
着重在 wx.login 获取到 code 放在 header 里找后端交换 token，开发者后端通过接口去微信后端换取到 openid 和 sessionKey（现在会将 unionid 也一并返回）后，把登录态返回给前端，就已经完成登录行为了。其中 wx.login 行为是静默，不必授权的。而 wx.getUserInfo 用于获取用户的手机号注册会员，或者展示头像昵称，判断性别、城市。
### 2.1 静默登录流程时序
官方提供 wx.login 的实践一般为以下三步：

小程序端调用 wx.login() 获取 临时登录凭证code ，并回传到服务端。

服务器端调用 auth.code2Session 接口，换取 用户唯一标识 OpenID 和 会话密钥 session_key。

开发者服务器可以根据用户标识来生成自定义登录态，用于后续业务逻辑中识别用户身份和登录态。
```js
// 先使用 wx.login 换code,再用code换取后端token,和数据库内用户的其他信息
async login() {
    try {
    // 获取临时登录凭证code
    let wxLogin = await wxp.login()
    // 将code发送给服务端
    let result = await commonApi.login({
      code: wxLogin.code
    }).catch(err=>{

    })
    if(!result) return
    wx.hideLoading()
    // 保存登录信息，如 jwtString
    wx.setStorageSync('token', result.data.jwtString)
    return result.data
  } catch (error) {
    throw error;
  }
}
```
在token放在header请求里带给后端，在微信小程序生态下不会担心被抓包的。
### 2.2 开发者后台校验与解密开放数据
静默登录成功后，微信服务器端会下发一个session_key给服务端，为了确保开放接口返回用户数据的安全性，微信会对明文数据进行签名。开发者可以根据业务需要对数据包进行签名校验，确保数据的完整性。图片
小程序通过调用接口（如 wx.getUserInfo）获取数据时，如果用户已经授权，接口会同时返回以下几个字段；如用户未授权，会先弹出用户弹窗，用户点击同意授权，接口会同时返回以下几个字段。相反如果用户拒绝授权，将调用失败。

属性	类型	说明
userInfo	UserInfo	用户信息对象，不包含 openid 等敏感信息
rawData	string	不包括敏感信息的原始数据字符串，用于计算签名
signature	string	包括敏感数据在内的完整用户信息的加密数据
encryptedData	string	包括敏感数据在内的完整用户信息的加密数据
iv	string	加密算法的初始向量
cloudID	string	敏感数据对应的云 ID，开通云开发的小程序才会返回，可通过云调用直接获取开放数据
开发者将 signature、rawData 发送到开发者服务器进行校验。服务器利用用户对应的 session_key 使用相同的算法计算出签名 signature2 ，比对 signature 与 signature2 即可校验数据的完整性。开发者服务器告诉前端开发者数据可信，即可安全使用用户信息数据。

如果开发者想要获取敏感数据（如 openid,unionID），则将encryptedData和iv发送到开发者服务器，由服务器使用session_key（对称解密密钥）进行对称解密，获取敏感数据进行存储并返回给前端开发者。

注意：因为需要用户主动触发才能发起获取手机号接口，tap类点击事件触发，所以该功能不由 API 来调用(即上述提到的wx.getUserInfo是无法获取手机号的)，需用 button 组件的点击来触发。获得 encryptedData 和 iv，同样发送给开发者服务器，由服务器使用session_key（对称解密密钥）进行对称解密，获得对应的手机号。

微信API调整
2021 年 4 月 13 日后发布新版本的小程序，无法通过wx.getUserInfo接口获取用户个人信息（头像、昵称、性别与地区），将直接获取匿名数据。getUserInfo接口获取加密后的openID与unionID数据的能力不做调整。新增getUserProfile接口（基础库 2.10.4 版本开始支持），可获取用户头像、昵称、性别及地区信息，开发者每次通过该接口获取用户个人信息均需用户确认。

即开发者通过组件调用wx.getUserInfo将不再弹出弹窗，直接返回匿名的用户个人信息。如果要获取用户头像、昵称、性别及地区信息，需要改造成wx.getUserProfile接口。

针对一些老用户在停留在低版本基础库，在实际生产中需要判断一下，兼容操作。

// 通过定义一个全局变量 检查当前用户使用的版本是否支持wx.getUserProfile,再去调整不同的授权按钮
```js
canIUseProfile: wx.canIUse('getUserProfile')

<button wx:if="{{canIUseProfile}}" bindtap="getUserInfo">获取用户头像</button>
<button wx:else open-type="getUserInfo" bindgetuserinfo="getUserInfo">获取用户头像</button>
```
### 2.3 session_key 的有效期
在实际生产中国如果遇到因为 session_key 不正确而校验签名失败或解密失败，关注下面几个与 session_key 有关的注意事项。
wx.login 调用时，用户的 session_key 可能会被更新而致使旧 session_key 失效（刷新机制存在最短周期，如果同一个用户短时间内多次调用 wx.login，并非每次调用都导致 session_key 刷新）。开发者应该在明确需要重新登录时才调用 wx.login，及时通过 auth.code2Session 接口更新服务器存储的 session_key。

微信不会把 session_key 的有效期告知开发者。我们会根据用户使用小程序的行为对 session_key 进行续期。用户越频繁使用小程序，session_key 有效期越长。

开发者在 session_key 失效时，可以通过重新执行登录流程获取有效的 session_key。使用接口wx.checkSession可以校验 session_key 是否有效，从而避免小程序反复执行登录流程。

当开发者在实现自定义登录态时，可以考虑以 session_key 有效期作为自身登录态有效期，也可以实现自定义的时效性策略。

实际生产中，当执行登录返回 session_key 失效时，一般可以将当前的请求存下来，重新刷新获取 session_key 并刷新当前token，走一遍登录后继续执行刚刚的HTTP请求队列。示例代码如下：
```js
/** 刷新Token, 默认只刷新一次 */
function refreshToken(params: AxiosRequestConfig) {
  return promisify(wx.login)()
    .then((res: WechatMiniprogram.LoginSuccessCallbackResult) => promisify(wx.request)({
      url: config.loginUrl + res.code
    }))
    .then((res: any) => {
      wx.setStorageSync('token', res.data.jwtString)
      return refreshRequest(params)
    }, (err: any) => {
      return Promise.reject(err)
    })
}

/** 重新发起请求 */
function refreshRequest(config: AxiosRequestConfig) {
  return promisify(wx.request)({
    url: config.url,
    header: Object.assign({}, config.headers, {
      'Authorization': wx.getStorageSync('token')
    }),
    data: config.data,
    method: config.method,
    timeout: config.timeout
  }).then((res: any) => {
    const response: AxiosResponse = {
      data: res.data,
      status: res.statusCode,
      statusText: res.errMsg,
      headers: res.header,
      config: config,
      cookies: res.cookies
    }
    return response
  }, (err: any) => {
    return Promise.reject(err)
  })
}
```
## 3.「登录」架构
「登录」方案架构如上图所示，将所有登录相关功能抽象到 「service 层」（本项目将其命名为session），供 「业务层」 调用。图片
### 3.1 libs - 提供登录相关的类方法供「业务层」调用
封装session类，提供类方法供「业务层」调用。主要有以下几种方法：
方法名	功能	使用场景
silentLogin	发起静默登录	-
login	登录，silentLogin 方法的一层封装	用于小程序启动时发起静默登录
refreshLogin	刷新登录态，silentLogin 方法的一层封装	用于登录态过期时发起静默登录
ensureSessionKey	验证 sessionKey 是否过期，过期则刷新登录态	绑定微信授权手机号时验证是否过期，过期则得重新弹窗授权
装饰器：
fuse-line：熔断机制，如果短时间内多次调用，则停止响应一段时间，类似于 TCP 慢启动。用于解决refreshLogin、login等方法的并发处理问题。

single-queue：单队列模式，同一时间，只允许一个正在过程中的网络请求。请求被锁定之后，同样的请求都会被推入队列，等待进行中的请求返回后，消费同一个结果。用于解决refreshLogin、login等方法的并发处理问题。

## 4. 静默登录的调用时机
### 4.1 小程序启动时调用
由于大部分页面场景都需要依赖登录态，在小程序启动的时候（比如 app.onLaunch()）调用静默登录是最常见的手段。定义一个全局的登录方法 init()，首先调用 wx.checkSession 判断 session_key 是否过期，未过期无需进行其它操作；过期了则需求走后面的静默登录流程。
```js
public async init(): Promise<void> {
    // 调用wx.checkSession判断session_key是否过期
    const hasSession = await checkSession();

    // 本地已有可用登录态且session_key未过期，resolve。
    if (this.getAuthToken() && hasSession) return Promise.resolve();

    // 否则，发起静默登录
    await this.silentLogin();
}
```
但是由于原生的小程序启动流程中， App，Page，Component 的生命周期钩子函数，都不支持异步阻塞。所以很有可能出现小程序页面加载完成后，静默登录过程还没有执行完毕的情况，这会导致后续一些依赖登录态的操作（比如请求发起）出错。
简单来说，page里面的onLoad可能跑的比app.js里面的 onLaunch 要快，用户执行登录流程还没结束呢，page里面的其他方法和API就已经在路上了，不可避免的会发生一堆401的报错。这个时候其实在app.js里面顶一个当前登录态的 标志就可以了，当这个标志非 null 时，表示登录态有效，在page里面的onLoad里面执行 await app.init() 后面紧跟其他业务逻辑。这样可以最简单快捷的避免上述的401问题。
```js
// app.js 里面顶一个登录态的标识 initPromise
init() {
  if (this.globalData.initPromise === null) {
    this.globalData.initPromise =
      this.wxp.login()
        .then((res: WechatMiniprogram.LoginSuccessCallbackResult) => api.common.login({
          code: res.code
        }))
        .then((res: Model.IResponse<Api.Common.Login.IResponse>) => {
          const { data } = res
          wx.setStorageSync('token', data.jwtString)
          this.mutationUserInfo(data.customerBasicInfo)
        })
        .catch(() => {
          this.globalData.initPromise = null
        })
  }
  return this.globalData.initPromise
},
// 页面里面的onload
async onLoad(options) {
  await app.init()
  await this.locateBuyNow(app.globalData.buyNowPromotion.coupons)
  // to do 
} 
```
### 4.2 接口请求发起时调用
如果你的产品足够复杂，不仅仅2种登录态，那么你最好封装好每个登录态，在API请求那里做拦截器，在请求发起时进行拦截，校验登录态，并刷新登录。刷新登录代码如下所示：
```js
public async refreshLogin(): Promise<void> {
  try {
    // 清除 Session
    this.clearSession();
    // 发起静默登录
    await this.silentLogin();
  } catch (error) {
    throw error;
  }
}
```
整个流程如下：

拦截 wx.request：

判断是否需要鉴权：请求发起时，拦截请求，判断请求是否需要添加auth-token，如若不需要，直接发起请求。如若需要，执行第二步。

判断是否需要发起静默登录：判断 storage 中是否存在auth-token，如若不存在，发起「刷新登录」。

请求头部添加auth-token：添加auth-token，发起请求。

与服务端通信：发起请求，服务端处理请求返回结果。

拦截 response: 解析状态码

状态码为AUTH_FAIL：服务端返回code为“鉴权失败”，触发这种情景的原因有两个，一是接口需要鉴权，但是发起请求时未携带auth-token，二是auth-token过期。这时将上一次请求携带的auth-token与本地存储的auth-token比较，如果不一致，表示登录态已经刷新过了，那么就直接重新发起请求。如果一致，发起刷新登录，拿到新的auth-token后重新发起请求，这个动作对用户来说是无感知的。

状态码为USER_WX_SESSIONKEY_EXPIRE：服务器返回code为“用户登录态过期”，这是针对用户授权手机号登录失败定制的状态码，如果登录态已过期，表示存储在服务端的session_key也是过期的，那么点击授权手机号获取的加密数据发送到服务端进行对称解密，由于session_key失效，无法解密出真正的手机号。因此需要重新发起静默登录，等待用户重新点击授权按钮获取新的加密数据，然后发起新的解密请求

状态码为其它：比如Success或者其他业务请求错误的情况，不进行拦截，返回 response 让业务代码解析。

### 4.3 wx.checkSession的不完全可靠
在上述的流程种，既然服务端会返回auth-token过期的状态码，为啥不在请求发送前进行拦截，使用wx.checkSession 接口校验登录态是否过期？
这是因为，在 session_key 已过期的情况下，wx.checkSession 有一定的几率返回true。即增加wx.checkSession 步骤并不能百分百保证登录态不会过期，后续仍然需要对不同的状态码进行处理。社区也有相关的反馈未得到解决。所以结论是：wx.checkSession可靠性是不达 100% 的。
基于以上结论，在开发过程种需要对 session_key 的过期做一些容错处理，发起需要使用 session_key 的请求前，做一次 wx.checkSession 操作，如果失败了刷新登录态。后端使用session_key解密开放数据失败之后，返回特定错误码（如：USER_WX_SESSIONKEY_EXPIRE），前端刷新登录态。
```js
const common: Api.method.common = {
 async checkSession() {
    return new Promise((resole) => {
      wx.checkSession({
        success() {
           resole()
        },
        fail: ()=> {
            this.login().then(res=>{
              resole()
            })
        }
      })
    })
  },
  async login() {
    wx.showLoading({
      title:'加载中'
    })
    let wxLogin = await wxp.login()
    let result = await commonApi.login({
      code: wxLogin.code
    }).catch(err=>{
    })
    if(!result) return
    wx.hideLoading()
    wx.setStorageSync('token', result.data.jwtString)
    return result.data
  },
}
```
### 4.4 并发处理
我们知道，当启动小程序时，各种监控、埋点数据上报都需要获取用户的个人信息，这些信息都得「静默登录」后才能获取，因此会同时发起多个login请求。另一种情况下，假设一个新用户进入一个业务复杂的页面，同时发起五个不同的业务请求，恰巧这五个请求都需要鉴权，那么五个请求都会被拦截并发起refreshLogin请求。显然，这样的并发是不合理的。基于这种场景，在业界有腾讯大佬给出一下如下方案：
单队列模式

请求锁：同一时间，只允许一个正在过程中的网络请求。

等待队列：请求被锁定之后，同样的请求都会被推入队列，等待进行中的请求返回后，消费同一个结果。

图片

如上图所示，首先refreshLogin请求入队，队列中只有一个请求，发送该请求，同时保险丝计入次数 1，服务端返回请求结果，消费结果。接着又发起一个refreshLogin请求，队列中只有一个请求，发送该请求，同时保险丝计入次数 2。然后又连续发起三个请求，由于上一个请求还没有执行完成，将这三个请求入队，等待上一个请求结果返回，队列中的四个请求消费同一个结果。由于触发自动冷却阈值，保险丝重置。
以上两种方案通过装饰器模式引入，代码如下所示，refreshLogin函数其实是slientLogin函数的一层封装，用于接口发起时调用。而前面提到的login函数也是slientLogin函数的一层封装，用户小程序启动时调用。
```js
@singleQueue({ name: 'refreshLogin' })
@fuseLine({ name: 'refreshLogin' })
public async refreshLogin(): Promise<void> {
  try {
    // 清除 Session
    this.clearSession();
    await this.silentLogin();
  } catch (error) {
    throw error;
  }
}
```
到此，很多读者可能对熔断机制还不甚理解，熔断的目的是为一个函数提供保险丝保障，短时间内多次调用，会熔断一段时间，这段时间内拒绝所有请求。如果在自动冷却阈值内，没有请求通过，则重置保险丝。代码如下所示：
```js
export default function fuseLine({
  // 一次熔断前重试次数
  tryTimes = 3,

  // 重试间隔，单位 ms
  restoreTime = 5000,

  // 自动冷却阈值，单位 ms
  coolDownThreshold = 1000,

  // 名称
  name = 'unnamed',
}: {
  tryTimes?: number;
  restoreTime?: number;
  name?: string;
  coolDownThreshold?: number;
} = {}) {
  // 请求锁
  let fuseLocked = false;

  // 当前重试次数
  let fuseTryTimes = tryTimes;

  // 自动冷却
  let coolDownTimer;

  // 重置保险丝
  const reset = () => {
    fuseLocked = false;
    fuseTryTimes = tryTimes;
    logger.info(`${name}-保险丝重置`);
  };

  const request = async () => {
    if (fuseLocked) throw new Error(`${name}-保险丝已熔断，请稍后重试`);

    // 已达最大重试次数
    if (fuseTryTimes <= 0) {
      fuseLocked = true;

      // 重置保险丝
      setTimeout(() => reset(), restoreTime);

      throw new Error(`${name}-保险丝熔断!!`);
    }

    // 自动冷却系统
    if (coolDownTimer) clearTimeout(coolDownTimer);
    coolDownTimer = setTimeout(() => reset(), coolDownThreshold);

    // 允许当前请求通过保险丝，记录 +1
    fuseTryTimes = fuseTryTimes - 1;
    logger.info(`${name}-通过保险丝(${tryTimes - fuseTryTimes}/${tryTimes})`);
    return Promise.resolve();
  };

  return function(
    _target: Record<string, any>,
    _propertyName: string,
    descriptor: TypedPropertyDescriptor<(...args: any[]) => any>,
  ) {
    const method = descriptor.value;
    descriptor.value = async function(...args: any[]) {
      await request();
      if (method) return method.apply(this, args);
    };
  };
}
```
除了以上 自研http请求队列+锁机制，还可以使用多线程的方式避免请求竞争。一般来说，业务埋点的请求都是非必需实时的，这些请求在优先级上远低于登录、授权、获取用户等等API，在优先级和实时性上面都不高，可以考虑新开一个 Worker ，非竞争性地去执行。以下是我更倾向的设计
```js
import config from '../config/index'
import axios, { AxiosResponse, AxiosRequestConfig } from '../plugins/wx-axios/index'
import { promisify } from '../plugins/wx-promise/index';
import { WxError } from '../utils/wxError'

// 创建axios实例
const instance = axios.create({
  baseURL: config.basePathUrl,
  timeout: 60000
})

// axios实例添加request阻流器
instance.interceptors.request.use((config) => {
  if (wx.getStorageSync('token')) {
    config.headers.Authorization = wx.getStorageSync('token')
  }
  return config
})

// axios实例添加response阻流器
instance.interceptors.response.use((res) => {
  return res
}, (err: Model.IResponse<Model.IError>) => {
  wx.hideLoading()
  if (!config.errCodeList.includes(err.data.code)) {
    // 异常Log
    WxError.getInstance().send({
      errorData: JSON.stringify(err),
      type: 'apiError'
    })
  }
  // token失效
  if (err.status === 400 && err.data.code === '401') {
    return refreshToken(err.config)
  }
  // 网络异常
  if (err.status === -1) {
    if (isTokenApi(err.config)) {
      return refreshToken(err.config)
    } else {
      return refreshRequest(err.config)
    }
  }
  // 服务器异常
  if (err.status >= 500 && err.status < 600) {
    wx.showToast({
      icon: 'none',
      title: "系统繁忙,请稍后再试",
      duration: 5000
    })
  }
  // 服务器自定义报错
  if (err.status >= 400 && err.status < 500) {
    if (config.errCodeList.includes(err.data.code)) {
      return Promise.resolve(err)
    }
    wx.showModal({
      content: err.data.message
    })
  }

  return Promise.reject(err)
})

/** 刷新Token, 默认只刷新一次 */
function refreshToken(params: AxiosRequestConfig) {
  return promisify(wx.login)()
    .then((res: WechatMiniprogram.LoginSuccessCallbackResult) => promisify(wx.request)({
      url: config.loginUrl + res.code
    }))
    .then((res: any) => {
      wx.setStorageSync('token', res.data.jwtString)
      if (!isTokenApi(params)) {
        return refreshRequest(params)
      } else {
        const response: AxiosResponse = {
          data: res.data,
          status: res.statusCode,
          statusText: res.errMsg,
          headers: res.header,
          config: config,
          cookies: res.cookies
        }
        return response
      }
    }, (err: any) => {
      wx.showModal({
        title: "网络异常",
        content: err.errMsg
      })
      return Promise.reject(err)
    })
}

/** 重新发起请求 */
function refreshRequest(config: AxiosRequestConfig) {
  return promisify(wx.request)({
    url: config.url,
    header: Object.assign({}, config.headers, {
      'Authorization': wx.getStorageSync('token')
    }),
    data: config.data,
    method: config.method,
    timeout: 60000
  }).then((res: any) => {
    const response: AxiosResponse = {
      data: res.data,
      status: res.statusCode,
      statusText: res.errMsg,
      headers: res.header,
      config: config,
      cookies: res.cookies
    }
    return response
  }, (err: any) => {
    wx.showModal({
      title: "网络异常",
      content: err.errMsg
    })
    return Promise.reject(err)
  })
}

/** 判断是否是请求token接口 */
function isTokenApi(request: AxiosRequestConfig) {
  return request.url!.indexOf(config.loginUrl) !== -1
}


export default instance 
```
## 5. 用户登录流程
小程序「静默登录」是通过调用 wx.login 获取到 code  并通过接口去微信后端换取到 openid 和 sessionKey（现在会将 unionid 也一并返回）后，然后把自定义登录态 3rd_session(本业务命名为auth-token) 返回给前端，就已经完成登录行为了。
然而，对于复杂的电商跨端应用，比如pc、h5、小程序，不同渠道注册的uid是不同的，用户登录后难以对各个渠道的交易、促销、收藏等数据进行整合。因此，要实现跨端的用户体系数据互通，就需要提供一个唯一的用户标识——手机号。即「游客态」转变成「会员态」的过程。
当新用户第一次进入小程序时，便会触发「静默登录」，这个过程对用户是无感知的。但此时开发者服务端已经为该用户定义了uid，并下发auth-token给小程序端，对于一些需要鉴权的请求，服务端可以根据请求携带的auth-token精确识别是哪个用户发起的行为。然而，类似加购、下单、领券等用户行为，涉及到跨端数据的整合，在执行用户操作之前，会判断用户是否登录，如若用户未登录，则跳转登录页面。图片
比如在「个人中心」页面点击「我的订单」，由于此时用户未登录，跳转到登录页面，可以选择以下两种登录方式：选择 「微信授权登录」，弹出授权手机号信息弹窗，点击「允许」，此时用户登录成功；选择 「手机快捷登录」，输入手机号，使用 「验证码」 或者 「密码」 进行登录，登录成功跳转回到「个人中心」页面。
上述步骤已经完成了「用户登录」，用户可以正常的执行加购、领券、下单等操作。为了提升用户体验，需要对 「会员信息」 进行维护 ，比如昵称、头像、性别、生日等信息，最简单的方法是 获取「微信授权用户信息」。
### 5.1.1 用户身份定义
综上所示，用户登录的阶段可以分为以下三步：图片
```js
// 用户登录的阶段
export enum AuthStepType {
  // 阶段一：游客态：静默登录成功，未绑定手机号，无用户信息
  ONE = 1,
  // 阶段二：会员态：用户登录成功，已绑定手机号，无用户信息
  TWO = 2,
  // 阶段三：会员信息态：用户登录成功，已绑定手机号，有用户信息
  THREE = 3,
}
```
那么如何判断用户此时处于哪个步骤，基于「静默登录」的启发，原本「静默登录」成功开发者后端会将自定义登录态 auth-token 返回给前端，此处请求可以携带返回「用户信息」，同auth-token一起命名为session存储在本地storage。当「用户登录」或者「更新用户信息」时，会同步更新storage中key为session的数据，从而通过这些用户数据判断当前用户处于哪一个登录阶段。
### 5.1.2 用户登录触发场景
前面提到过，「用户登录」的 目的是为了整合各个渠道的交易、促销、收藏等数据，针对电商小程序，目前总结的需要用户登录的场景如下所示：
即当用户登录小程序时，可以正常浏览浏览商品，只有触发某些特定行为，比如领券、加购、收藏、下单等，才会判断用户是否处于登录状态，如未登录，跳转登录页面。
如下所示，封装 mustAuth 方法进行拦截，未登录则跳转登录页面：
```js
export default class Session {
  ...
  public mustAuth({
    mustAuthStep = AuthStepType.TWO, // 传人参数，需要授权的LEVEL
  } = {}): Promise<void> {
    // 当前阶段处于会员态（2）或者会员信息态（3），执行resolve操作
    if (this.getCurrentAuthStep() >= mustAuthStep) return Promise.resolve();
    // 当前阶段处于游客态（1），跳转登录页
    Navigator.gotoPage('/login/home');
    // 执行reject操作
    return Promise.reject();
  }
}
```
上述代码是跳转页面拦截，对于弹窗而言，需要把弹窗注入 base-page ( 每个页面都需要引入的通用组件，封装每个页面都需要使用的通用方法，比如错误处理等 ) 中，通过 id 查找到弹窗组件，并进行调用。
```js
export default class Session {
  ...
   public mustAuth({
    mustAuthStep = AuthStepType.TWO, // 需要授权的LEVEL
    popupCompName = 'auth-flow-popup',
  } = {}): Promise<void> {
    // 当前阶段处于会员态（2）或者会员信息态（3），执行resolve操作
    if (this.getCurrentAuthStep() >= mustAuthStep) return Promise.resolve();
    // 获取弹窗组件
    const pages = getCurrentPages();
    const curPage = pages[pages.length - 1];
    const context = curPage.$$basePage || curPage;
    const popupComp = context.selectComponent(`#${popupCompName}`);
    // 容错处理
    if (!popupComp) {
      return Promise.reject(
        new Error(
          "当前页面未找到 #auth-popup 组件，请参考 'doc/登录组件的使用方式.md'",
        ),
      );
    }
    // 调用弹窗组件方法
    popupComp.setMustAuthStep(mustAuthStep);
    popupComp.nextStep();
    // 等待授权成功回调
    return this.waitAuth();
  }
}
```
各个业务使用时可以通过 session.mustAuth().then(() => {…}) 进行调用，为了提高使用体验，也可以使用装饰器 @mustAuth() 来修饰各个业务需求 类的方法，装饰器源码如下：
```js
/**
 * 登录检查装饰器，使用该装饰器的方法，会先执行授权检查，如果未授权，将跳转登录页面
 */
export default function mustAuth(option = {}) {
  return function(
    _target: Record<string, any>,
    _propertyName: string,
    descriptor: TypedPropertyDescriptor<(...args: any[]) => any>,
  ) {
    const method = descriptor.value;
    descriptor.value = function(...args: any[]) {
      if (!session) return;
      // 登录拦截
      return session.mustAuth(option).then(() => {
        if (method) return method.apply(this, args);
      });
    };
  };
}
```
## 6. 授权组件的封装
2021 年 4 月 13 日之前，使用 wx.getUserInfo 弹出授权弹窗时，如果用户点击允许授权，那么会记录用户的行为，下次再点击时，不会弹窗而是直接将授权结果返回。4 月 13 日之后，使用 wx.getUserProfile，开发者每次通过该接口获取用户个人信息均需用户确认，因此需要妥善保管用户授权的头像昵称，避免重复弹窗，防止被封。
```js
// index.wxml
 <button class="reset-button" open-type="getPhoneNumber" bindgetphonenumber="getPhoneNumber" hover-class="none" disabled="{{disabled}}"><slot></slot></button>

// index.ts
export default class PhoneContainer extends BaseComponent {
  getPhoneNumber(
    e: WechatMiniprogram.Event<WechatMiniprogram.GetPhoneNumberCallbackResult>,
  ) {
    this.triggerEvent('getphonenumber', { ...e.detail,  authType: AuthType.PHONE,});
  }
}
```
在「微信授权登录」过程中，小程序拿到加密的 encryptedData 和 iv 数据，将其和携带的 auth-token 一起发送给开发者服务器，服务端通过auth-token鉴权识别这个用户，并使用静默登录成功获取的 session_key（对称解密密钥）对 encryptedData 和 iv 数据进行对称解密，获取该用户的手机号，将手机号与 uid 绑定，此时用户成功注册会员，并将会员信息返回给小程序端。
小程序端更新本地 storage 存储的 session 数据，此时 busiIdentity 的值已经从 VISIT 更新为 MEMBER，用户身份转变为会员态，登录成功。在「授权用户信息」的过程中，小程序调用 wx.getUserProfile 方法拿到用户数据，并将这些数据与携带的 auth-token 一起发送给开发者服务器，服务端通过auth-token鉴权识别这个用户，更新该用户的信息并将新的会员数据返回给小程序端。小程序端更新本地 storage 存储的 session 数据，此时用户昵称和头像均已更新，用户身份转变为会员信息态，授权成功。
在这个流程种记得对用户的微信头像做转存。这是因为用户在微信端修改微信头像后，之前「授权用户信息」获取的微信头像链接就会失效，因此开发者应该在自己获取用户信息后，将头像保存下来，避免微信头像 URL 失效后的异常情况。
## 7. 总结
在思考和编辑本文时，突然发现一位腾讯大哥（蔡小真 https://juejin.cn/user/3016715636839998 ）的做法和思路跟我一模一样 （我这边也是原生小程序 + TS），两者在公司小程序产品代码设计上几乎一致 （虽然他贴的代码不多），只在习惯和代码风格有些许差异，在本文中，我更多的想传递出不同维度的产品可以考虑怎么的设计，并不是说一定要跟大厂一模一样。结合自己的后端同学，一起打磨一套最适合自己团队当前产品的架构方案。