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
