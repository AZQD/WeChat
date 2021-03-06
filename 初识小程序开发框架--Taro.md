## 初识小程序开发框架--Taro（泰罗）


# 简介

[凹凸实验室](https://aotu.io/about/)：京东用户体验中心的前端部门

Taro 是由京东 - 凹凸实验室打造的一套**遵循 React 语法规范的多端统一开发框架**。

现如今市面上端的形态多种多样，H5、App (React Native)、微信小程序等各种端大行其道，当业务需要在多端实现的情况下，针对不同的端去编写多套代码的成本显然非常高，这时候**只编写一套代码就能够适配到多端**的能力就显得极为需要。

**使用 Taro，我们可以只书写一套代码，通过 Taro 的编译工具，将源代码分别编译出可以在不同端（微信小程序、H5、App、快应用等）运行的代码。同时 Taro 还提供了语法检测和自动补全等功能，有效地提升了开发体验和开发效率。**


# 安装
安装 Taro 开发工具 @tarojs/cli

使用 npm 或者 yarn 全局安装，或者直接使用npx

		$ npm install -g @tarojs/cli

 		$ yarn global add @tarojs/cli
 		
#使用
使用命令创建模板项目

		$ taro init myApp	
		
		
# 预览
微信小程序编译预览模式

			# npm script
			$ npm run dev:weapp
			# 仅限全局安装
			$ taro build --type weapp --watch
			# npx 用户也可以使用
			$ npx taro build --type weapp --watch
			
			
H5 编译预览模式
			
			# npm script
			$ npm run dev:h5
			# 仅限全局安装
			$ taro build --type h5 --watch
			# npx 用户也可以使用
			$ npx taro build --type h5 --watch
			
# 项目说明

### 目录结构

			├── dist                   编译结果目录
			├── config                 配置目录
			|   ├── dev.js             开发时配置
			|   ├── index.js           默认配置
			|   └── prod.js            打包时配置
			├── src                    源码目录
			|   ├── pages              页面文件目录
			|   |   ├── index          index 页面目录
			|   |   |   ├── index.js   index 页面逻辑
			|   |   |   └── index.css  index 页面样式
			|   ├── app.css            项目总通用样式
			|   └── app.js             项目入口文件
			└── package.json

### 入口文件
入口文件默认是 src 目录下的 app.js

入口文件也是 React 风格的写法，首先需要引用依赖 @tarojs/taro，这是 Taro 方案的基础框架，在这里我们继承了 Component 组件基类。

通常入口文件会包含一个 config 配置项，这里的配置主要参考微信小程序的全局配置而来，在编译成小程序时，这一部分配置将会被抽离成 app.json，而编译成其他端，亦会有其他作用。

而且由于入口文件继承自 Component 组件基类，它同样拥有组件生命周期，但因为入口文件的特殊性，他的生命周期并不完整，如下
			

![](https://i.imgur.com/WlvIIBx.png)


入口文件需要包含一个 render 方法，一般返回程序的第一个页面，但值得注意的是不要在入口文件中的 render 方法里写逻辑及引用其他页面、组件，因为编译时 render 方法的内容会被直接替换掉，你的逻辑代码不会起作用。

### 页面

Taro 项目的页面一般都放在 src 中的 pages 目录下，如果页面包含 js 以及 css，建议页面以文件夹的形式进行组织，例如 index 页面包含 index.js 和 index.scss，则在 pages 目录下新建 index 目录。

Taro 的页面同样是继承自 Component 组件基类，每一个页面都拥有自己配置 config，这个配置参考自微信小程序的页面配置，在编译成小程序时，将会生成跟页面 JS 文件同名的 json 配置文件；在编译成 H5 时，config 配置中 navigationBarTitleText 将会被用来设置当前页面的标题。


页面 JS 要求必须有一个 render 函数，函数返回 JSX 代码。由于页面 JS 也继承自 Component 组件基类，所以页面同样拥有生命周期，页面的生命周期方法如下：

![](https://i.imgur.com/cvAfoBo.png)

微信小程序中 onLoad 通常带有一个参数 options，在 Taro 中你可以在所有生命周期和普通事件方法中通过 **this.$router.params** 访问到，在其他端也适用

在小程序中，页面还有在一些专属的方法成员，如下

![](https://i.imgur.com/iXTMnpY.png)

以上成员方法在 Taro 的页面中同样可以使用，书写同名方法即可，不过需要注意的，目前暂时只有微信小程序端支持这些方法，编译到 H5 端后这些方法均会失效。

### 组件
Taro 支持组件化开发，组件代码可以放在任意位置，不过建议放在 src 下的 components 目录中。一个组件通常包含组件 JS 文件以及组件样式文件，组织方式与页面类似。


Taro 的组件同样是继承自 Component 组件基类，与页面类似，组件也必须包含一个 render 函数，返回 JSX 代码。

与页面相比，组件没有自己的 config，同时组件的生命相比页面来说多了一个 componentWillReceiveProps ，表示当父组件（或页面）发生更新时将带动子组件进行更新时调用的方法。	


# 一次编写，多端运行
既然是一个多端解决方案，Taro 最重要的能力是写一套代码输出多端皆可运行的代码。目前 Taro 已经支持一套代码同时生成 H5 和微信小程序，App（React Native）端也即将支持，同时诸如快应用等端也即将得到支持。


# 编译流程
![](https://i.imgur.com/yKoXhlB.png)

# 支持情况

![支持情况](https://i.imgur.com/ex4t9qR.png)

个人理解：

1.新的团队和开发框架，支持以小程序为主，H5,RN有待完善。

2.后续更新值得期待。

# Taro UI
[Taro UI 发布](https://mp.weixin.qq.com/s/b7Wzyc91kdaGemS9OGmPSA)

Taro UI 是一款由凹凸实验室打造、基于 Taro 编写的多端 UI 组件库。除了高颜值，Taro UI 最大的亮点就是支持多端运行。Taro UI 借助 Taro 支持多端运行的特点，只需解决不同平台 CSS 的表现差异问题，就可以在微信小程序/ H5 / ReactNative 等多端适配运行。

### 安装 

		$ cd myApp
		$ npm install taro-ui
		
### 使用
在代码中 import 需要的组件并按照文档说明使用

		import { AtButton } from 'taro-ui'

# 注意点
1.import引入

import { AtGrid } from 'taro-ui'

要开启ES6 转 ES5，否则报错；

2.按需引入
import { View, Text , Image} from '@tarojs/components'

3.环境判断

const ENV = Taro.getEnv()


4.this指向：

在 Taro 的页面和组件类中，this 指向的是 Taro 页面或组件的实例

（参考demo中的console）

5.网络请求

发起网络请求，支持 Promise 化使用。

目前在所有端中，微信小程序所提供的端能力 API 最为丰富，所以 Taro 在设计之初端能力的 API 便是采用微信小程序标准，在其他端各自对应实现，同时又对微信小程序的 API 进行了一些优化处理，例如异步的 API 支持 Promise 化，利用队列解决了 wx.request 的请求个数限制问题等等。

			Taro.request({
		      url: 'https://txapp.58.com/m/home/index',
		      data: {
		        localId: '1101095',
		      },
		      header: {
		        'content-type': 'application/json'
		      }
		    }).then(res => console.log(res.data))

# 项目实例

1.Demo

2.Taro-ui

3.京东购物

![项目实例](https://i.imgur.com/szr5q2d.png)

# 带来的思考

不变的是变化

持续学习
	

# 参考文献：

[https://taro.aotu.io/](https://taro.aotu.io/)

[https://github.com/NervJS/taro](https://github.com/NervJS/taro)

[https://guide.aotu.io/](https://guide.aotu.io/ "前端代码规范")

[https://taro-ui.aotu.io/](https://taro-ui.aotu.io/)

	
	