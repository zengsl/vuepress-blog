---
title: 跨域
# order: 2
tag:
  - study
date: 2025-04-19
---

# :o:跨域


> 学习笔记

## :heavy_check_mark:浏览器同源策略

浏览器同源策略（Same-origin policy）是浏览器提供的一个安全机制，它限制了不同源的文档、脚本、图像等资源被加载、执行等操作。所谓同源，指的是两个URL的协议、域名和端口都相同。

## ❓跨域会收到哪些限制

1. 限制Document访问
2. 限制Cookie访问
3. 限制Ajax获取数据

## :heavy_exclamation_mark:限制Ajax获取数据

跨域限制仅存在于浏览器端，服务端不存在跨域限制。

跨域请求实际上是已经发送给后端，并且后端也进行了响应，但浏览器会对Response进行拦截校验，并对跨域请求返回一个错误。

浏览器对Script、Link、Image等资源加载时的跨域请求限制不严格。


### :one:CORS解决方案

> 自家服务器可使用

#### 请求分类

简单请求：
- 请求方法为：GET、HEAD、POST
- 请求头字段符合 CORS安全规范只要不修改请求头，一般都符合规范
- 请求头Content-Type的值只能是以下三种：
  - text/plain
  - multipart/form-data
  - application/x-www.form-urlencoded

复杂请求：非简单请求都是复杂请求，将自动发送预检请求（preflight request）

<!-- |     简单请求      |     复杂请求      |
| :----------- | :------------- |
|请求方法为：GET、HEAD、POST|      aaaaaaaaa |
|请求头字段符合 CORS安全规范只要不修改请求头，一般都符合规范|           aaaa |
|请求头Content-Type的值只能是以下三种：- text/plain
|- multipart/form-data
|- application/x-www.form-urlencoded|           aaaa | -->

#### :no_entry: 预检请求

1. 发送时机：在实际跨域请求之前发出，由浏览器自动发起的。
2. 主要作用：用于询问服务器是否允许跨域请求，如果允许，浏览器才会发送实际的跨域请求。
3. 基本流程：先发起OPTIONS请求，如果通过预检，继续发起实际的跨域请求。
4. 请求头：一个OPTIONS预检请求，通常会包括如下请求头：
   - Origin：请求的来源，即请求的域名。
   - Access-Control-Request-Method：实际请求的HTTP方法，例如GET、POST等。
   - Access-Control-Request-Headers：实际请求的HTTP头部信息。


Access-Control-Allow-Origin：允许跨域请求的来源，例如`*`表示允许所有来源，也可以指定具体的域名。

Access-Control-Allow-Methods：允许的HTTP方法，例如`GET`、`POST`等。

Access-Control-Allow-Headers：允许的HTTP头部信息，例如`Content-Type`、`Authorization`等。

Access-Control-Max-Age：预检请求的有效期，单位为秒。在有效期内，浏览器不会再次发起预检请求。

Access-Control-Allow-Credentials：是否允许发送Cookie，如果设置为`true`，则允许发送Cookie。

### :two:JSONP解决方案

> 目前很少用，JQuery有封装，axios明确说明不支持（不符合当前时代的产物）

JSONP（JSON with Padding）是一种非官方的跨域解决方案，它利用了`<script>`标签的跨域特性来实现跨域请求。

只能处理GET请求跨域

JSONP的基本流程如下：

1. 客户端定义一个回调函数，用于处理服务器返回的数据。
2. 客户端通过`<script>`标签的`src`属性发送一个带有回调函数名的请求给服务器。
3. 服务器接收到请求后，将数据包装在一个函数调用中，并将结果返回给客户端。例如，如果客户端定义的回调函数名为`callback`，服务器返回的数据为`{ "name": "John", "age": 30 }`，则服务器返回的数据为`callback({ "name": "John", "age": 30 })`。




### :three:配置代理解决方案

#### 自定义代理服务器

[http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware)

#### Nginx解决方案

#### 脚手架解决方案

