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