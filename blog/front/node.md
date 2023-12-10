---
sidebar: auto
category:
  - 前端
tag:
  - Node
---
# Node相关内容

[[toc]]

## 安装

[下载地址](https://nodejs.org/en/download/)

[文档](https://www.runoob.com/nodejs/nodejs-install-setup.html)

## 模块

CommonJs

## 包管理(npm)

NPM是node中自带的包管理工具

~~~ shell
# 基础命令
npm -v

npm versions

npm search 包名

# 查看配置
npm config get xxx

# 修改配置
npm config set xxx  value

# 初始化
npm init

# 安装包
npm install/i 包名 

# 移除包
npm remove/r 包名移除

# 安装包并添加到依赖中(在package.json中会存放依赖)

npm intall 包名 --save

# 下载当前项目所依赖到包
npm install

# 全局安装(一般都是安装一些工具，不是项目里面的依赖)
npm install/i -g 包名
~~~

### 配置源

配置[阿里镜像](https://npm.taobao.org)

全局配置

`npm config set registry https://registry.npm.taobao.org` 

临时配置

`npm --registry https://registry.npm.taobao.org install xxx`

### 安装CNPM

`npm install -g cnpm --registry=https://registry.npm.taobao.org`


### 包查找规则

当使用模块名来引入模块时，首先会到当前目录下到node_modules中寻找是否含有该模块，如果有则直接使用。否则不断向上一层目录重复此逻辑，直至找到磁盘到根目录。

### NPX

npx是执行Node软件包的工具，它从 npm5.2版本开始，就与npm捆绑在一起。

npx的作用（默认）：

1. 默认情况下，首先检查路径中是否存在要执行的包（即在项目中）；

2. 如果存在，它将执行；

3. 若不存在，意味着尚未安装该软件包，npx将安装其最新版本，然后执行它；

执行但是不安装：`npx some-package --no-install`

只有当使用npm**全局**安装包，才可以直接通过包名来执行。否则需要在package.json中配置执行脚本命令，然后执行node run xxx。如下：
`node run my-package`

~~~ js{5}
{
  "name":"XXX",
  "version": "1.0.0",
  "scripts": {
    "my-package":"xxx/my-package"
  }
}
~~~


使用NPX则可以直接执行！
