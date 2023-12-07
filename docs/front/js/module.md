
# JS 模块化
<script setup>

</script>

[//]: # (<XmindViewer url="./JS模块化.xmind"/>)


## 理解

### 模块化是什么？
		
含义：讲一个复杂的程序依据一定的规则（规范）封装成几个块（文件），并进行组合在一起的内部数据/实现是私有的，只是向外暴露一些接口（方法）与外部的模块通信
	
### 进化史
		
简单封装：Namespace模式

匿名函数：IIFEE模式（立即执行函数）

模块模式：引入依赖  现代模块化实现的基石
	
### 为什么要模块化？
		
- web的发展飞速，不仅仅局限于静态页面，而向着应用发展，功能越来越丰富
		
- 代码复杂度越来越高
		
- 对代码进行解藕的需要
		
- 减少文件大小，节约Http请求时间
	
### 模块化的好处
		
- 避免命名冲突（减少命名空间污染）
		
- 更好的分离，按需加载
		
- 更高复用性
		
- 高可复用性
	
### 实现方式
		
- 页面引入加载script
			
- 引发的问题
				
- 请求过多
				
- 依赖模糊
				
- 难以维护


## 模块化的几种方式

- Common JS

- AMD->require.js

- CMD -》seaJs

- ES6



### CommonJS

#### 规范
			
- 说明
				
每一个文件都可以当作一个模块
				
在服务器：模块的加载是运行时同步加载的
				
在浏览器：模块需要提前进行编译打包处理
				
http://javascript.ruanyifeng.com/nodejs/module.html
			
- 基本语法
				
暴露模块
					
~~~ js
module.exports = value
exports.xxx = value
~~~
				
引入模块

~~~ js
require(xxx)
//第三方模块：xxx为模块名
//自定义模块：xxx为模块文件路径
~~~
	

#### 实现

服务器端实现：[Node.js](http://nodejs.cn)

浏览器端实现：[Browserify](https://browserify.org)，称为CommonJs的浏览器端端打包工具
				
### AMD
		
#### 规范
			
- 说明

[Asynchronous Module Definition](https://github.com/amdjs)，即异步模块加载机制。专门用于浏览器端，模块的加载是异步的
			
- 基本语法
				
定义暴露模块
					
~~~ js
// 定义没有依赖的模块				
define(function(){return 模块})
					
// 定义有依赖的模块					
define(['module1','module2'],function(m1,m2){
	return 模块
})
~~~
				
引入暴露模块
					
~~~ js
require(['module1','module2'],function(m1,m2){使用m1/m2模块})
~~~
		
#### 实现（浏览器）
			
[Require.js](https://www.requirejs-cn.cn)

### CMD
		
#### 规范
			
- 说明
				
Common Module Definition（通用模块定义）,专门用于浏览器端，模块的加载是异步的,模块使用时才会加载执行
			
- 基本语法
				
定义暴露模块

~~~ js
//定义没有依赖的模块
define(function(require,exports.module){exports.xxx=value或者module.exports=value})
//定义有依赖的模块
define(function(require,exports.module){//引入依赖块(同步语法) var module2=require('./module2') //引入依赖模块 (异步) require.async('./module3',function(){}) // 暴露模块exports.xxx=value })
~~~
					
引入暴露模块

~~~ js
define(function(require){ var m1 = require('./module1')  var m4 = require('./module4') m1.show() m4.show()})
~~~
		
#### 实现（浏览器）

[Sea.js](https://seajs.github.io/seajs/docs/)
			
### ES2015
		
#### 规范

- 说明

[教程](https://es6.ruanyifeng.com)，依赖模块需要编译打包处理

- 语法
~~~ js
//导出模块：
export
//导入模块：
import
~~~

#### 实现（浏览器）
			
1. 使用Babel将ES6转为ES5代码
			
2. 使用Browserify编译打包js

### UMD
		
#### 规范

- 说明

[Universal Module Definition](https://github.com/umdjs),兼容多个运行环境的统一模块化规范

- 实现

使用Babel打包
