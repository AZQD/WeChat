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
			
#开发框架技术选型

#踩过的坑

#和react的异同

#带来的思考

#参考文献：
[https://taro.aotu.io/](https://taro.aotu.io/)

[https://github.com/NervJS/taro](https://github.com/NervJS/taro)

	