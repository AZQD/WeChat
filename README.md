# WeChat

### 微信小程序

Q：getUserInfo可以返回微信号吗？

A：没有任何渠道可以获取到用户的微信号
可以通过 openid 来做微信用户标识

---

Q：是不是没有退出小程序的函数？

A：没有。

---

Q：小程序如何读取用户的微信运动数据？

A：目前没有这个接口。

---

Q：小程序通过button获取用户信息，提示：errMsg: "getUserInfo:fail 系统错误，错误码：-12001,invalid scope"？

A：需要确认一下当前开发中是否在小程序后台添加了开发者权限。

---

Q：小程序通过button获取电话，提示：errMsg: "getPhoneNumber:fail Error: 该 appid 没有权限"？

A：目前该接口针对非个人开发者，且完成了认证的小程序开放。

---

### 1.小程序placeholder文字颜色:

方法1：
```
<input type="text" placeholder="请输入内容" placeholder-style="color:#ccc;"></input>
```

方法2：
```
.placeholderStyle{
  color: #ccc;
}
<input type="text" placeholder="请输入内容" placeholder-class="placeholderStyle"></input>
```

---

### 2.小程序placeholder光标颜色：

```
caret-color: #bfc;
```

### 3.小程序 button/navigator 等点击后阴影效果：

```
    1.去掉默认阴影效果：
        <button hover-class="none">btn</button>

    2.修改阴影效果：
        WXML: <button hover-class="newClass">btn</button>
        WXSS: .newClass { color: red; background-color: pink; }
```

### 4.微信小程序图片设置圆角会先闪一下才变成圆角:
```
尝试加一下这个试试，transform变形
当我们通过某些行为触发页面进行大面积绘制的时候，浏览器由于没有事先准备，应付渲染够呛，于是掉帧，于是卡顿。而will-change则是真正的行为触发之前告诉浏览器：“我待会儿就要变形了”。于是乎，浏览器把GPU给拉上了，从容应对即将到来的变形。
image{
will-change: transform
}
```

### 5.微信小程序button设置了open-type="share"的按钮如何禁止向上冒泡:
```
    定义一个空的事件 catchtap="share"
    <button open-type="share" catchtap="share">
    
    share:function(){
        console.log('禁止冒泡')
    },
```

### 6.flex多行多列均分:
```
    display: flex;
    flex-flow: wrap;
```

### 7.微信小程序中的空格和换行操作:
```
    方式1：
    空格 ：\t
    换行 ：\n 
    注意：必须在text标签中添加！
    
    方式2：
    <text space="nbsp">测      试：</text>
```

### 8.小程序滚动到顶部:

```js
    wx.pageScrollTo({
      scrollTop: 0
    });
```

### 9.报错提示：TypeError: Cannot read property ‘mark’ of undefined:

```
    原因：使用ES7异步网络请求方法：async init(){ const res=await request({}};
    解决方案：详情-—>本地设置,将增强编译勾选上即可。
```

### 10.隐藏返回首页按钮功能；

```js
    wx.hideHomeButton({
      complete: (res) => {
        console.log('隐藏返回首页按钮', res);
      }
    });
```

### 11.小程序loading时禁掉其他操作；

```js
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
```

### 12.小程序输入框键盘弹起时，是否自动上推页面：

```
    重要属性：adjust-position
    参考：http://www.xmdeal.com/mobanjiaocheng/246.html
```

### 13.小程序开发调试时，遇到wxss里面定义的尺寸(如：width、height)和模拟器不一样；

```
    开发调试时，如果遇到上述情况，看一下模拟器选择的机型是不是：iPhone6/7/8 375*667；
```

### 14.小程序下拉刷新总结；

```
    待总结
```

### 15.获取DOM节点位置信息，如果返回rect为null，需要添加`.in(this)`；

```js
    wx.createSelectorQuery().in(this).select('.commentIptWrap')
    .boundingClientRect((rect) => {
      console.log('rect：', rect);
    })
    .exec();
```

### 16.picker组件样式调整：

```
    使用view包裹picker，可设置picker宽度撑满view: flex-grow: 1;
```


### 17.小程序登录、用户信息相关接口调整说明：

```
    官方文档：https://developers.weixin.qq.com/community/develop/doc/000cacfa20ce88df04cb468bc52801
    社区提问：https://developers.weixin.qq.com/community/develop/doc/000aa606800b48d2510c58aca55400
```


### 18.小程序打开超链接：

```
	域名必须是我们自己维护的域名才可以。也就是说，比如要打开的h5超链接地址是：https://51imu.com/abc.html，那么在51imu.com服务器根目录添加微信提供的配置文件 Wi44Z0yVMR.txt 后，才可以在小程序打开https://51imu.com/abc.html

	如果要打开的h5超链接是https://jinshuju.net/***.html，必须在jinshuju.net根目录添加微信提供的配置文件 Wi44Z0yVMR.txt ，才可以。而jinshuju.net服务器不是我们维护的，所以不能在它根目录添加。

	所以，目前第三方超链接是在小程序里面打不开的。
```


### 19.小程序订阅消息总结：

```
	1.前端获取订阅状态：
	...js
	wx.getSetting({
		  withSubscriptions: true,
		  success (res) {
			console.log(res.subscriptionsSetting)
			// res.subscriptionsSetting = {
			//   mainSwitch: true, // 订阅消息总开关
			//   itemSettings: {   // 每一项开关
				   // 普通一次性订阅消息，值包括'accept'、'reject'、'ban'、'filter'
			//     zun-LzcQyW-edafCVvzPkK4de2Rllr1fFpw2A_x0oXE: 'reject',
			//   }
			// }
		  }
		})
	...

	2.订阅状态说明：
	2.1.mainSwitch：订阅消息总开关：true;false，表示是否开启；
	2.2.itemSettings：订阅结果。
	因为我们的通知模板类型是“一次性订阅”，因此如果不点击“总是保持以上选择，不再询问”，不会返回itemSettings；
	一次性订阅消息的话肯定只能订阅一次发送一次，长期的目前只有特定行业支持。
	（“长期性订阅”只有政企等公共服务行业才可以开通，因此不用考虑）

	itemSettings对应模板id值包括'accept'、'reject'、'ban'、'filter'。
	'accept'表示用户同意订阅该条id对应的模板消息，'reject'表示用户拒绝订阅该条id对应的模板消息，'ban'表示已被后台封禁，'filter'表示该模板因为模板标题同名被后台过滤。

	3.产品设计思路：
	初始化页面：
	3.1.mainSwitch：false:引导用户打开通知设置总开关；confirm(取消，确认)+截图引导；
	3.2.mainSwitch：true:
		3.2.1.没有itemSettings：则为不可关闭弹窗+截图引导，文案：请打开通知设置，订阅活动通知，如避免频繁打扰，可选择“总是保持以上选择，不再询问”；
		3.2.2.有itemSettings，且对应模板id值为accept，则为长期允许订阅，每次都能收到通知，无需处理；
		3.2.3.有itemSettings，且对应模板id值为reject，则为长期拒绝订阅，每次都不能收到通知，在页面加常驻按钮，用户可进入设置页面手动开启；
		3.2.4.有itemSettings，且对应模板id值为ban或filter，表为特殊场景，不做处理；

	4.前后端协作：
	4.1.前端从多维度引导用户订阅通知；
	4.2.后端负责按照指定时间发送通知；

	5.其他说明：
	用户选择订阅结果后（不管是允许，还是拒绝），删掉小程序，重新搜索进入小程序，选择结果会保留；
```



微信小程序：



商业能力 /交易组件 /基础交易工具（原标准版交易组件）及开放接口 /接入指引：
https://developers.weixin.qq.com/miniprogram/dev/platform-capabilities/business-capabilities/ministore/minishopopencomponent/guideline.html


企业&个体工商户 - 开店指引：https://developers.weixin.qq.com/community/business/doc/00042e93c00b00754bcaec2575600d


小程序开发服务商入驻微信服务平台指引攻略：
https://developers.weixin.qq.com/community/develop/doc/000e8cb217c0e0ce143bde14056402
