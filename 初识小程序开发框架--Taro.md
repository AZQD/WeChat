##初识小程序开发框架--Taro


#简介
[凹凸实验室](https://aotu.io/about/)：京东用户体验中心的前端部门

Taro 是一套遵循 React 语法规范的 多端开发 解决方案。现如今市面上端的形态多种多样，Web、React-Native、微信小程序等各种端大行其道，当业务要求同时在不同的端都要求有所表现的时候，针对不同的端去编写多套代码的成本显然非常高，这时候只编写一套代码就能够适配到多端的能力就显得极为需要。

使用 Taro，我们可以只书写一套代码，再通过 Taro 的编译工具，将源代码分别编译出可以在不同端（微信小程序、H5、RN 等）运行的代码。

#安装
安装 Taro 开发工具 @tarojs/cli

使用 npm 或者 yarn 全局安装，或者直接使用npx

		$ npm install -g @tarojs/cli

 		$ yarn global add @tarojs/cli
 		
#使用
使用命令创建模板项目

		$ taro init myApp	
		
		
#预览
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
			
#项目说明

###目录结构

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

###入口文件
入口文件默认是 src 目录下的 app.js

入口文件也是 React 风格的写法，首先需要引用依赖 @tarojs/taro，这是 Taro 方案的基础框架，在这里我们继承了 Component 组件基类。

通常入口文件会包含一个 config 配置项，这里的配置主要参考微信小程序的全局配置而来，在编译成小程序时，这一部分配置将会被抽离成 app.json，而编译成其他端，亦会有其他作用。

而且由于入口文件继承自 Component 组件基类，它同样拥有组件生命周期，但因为入口文件的特殊性，他的生命周期并不完整，如下
			

![](https://i.imgur.com/WlvIIBx.png)


微信小程序中 onLaunch 通常带有一个参数 options，在 Taro 中你可以在所有生命周期和普通事件方法中通过 this.$router.params 访问到，在其他端也适用

入口文件需要包含一个 render 方法，一般返回程序的第一个页面，但值得注意的是不要在入口文件中的 render 方法里写逻辑及引用其他页面、组件，因为编译时 render 方法的内容会被直接替换掉，你的逻辑代码不会起作用。






















#开发框架技术选型

#踩过的坑

#和react的异同

#带来的思考
不变的是变化

#参考文献：
[https://taro.aotu.io/](https://taro.aotu.io/)

[https://github.com/NervJS/taro](https://github.com/NervJS/taro)

	