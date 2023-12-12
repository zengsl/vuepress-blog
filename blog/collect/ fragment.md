---
title: 碎片
star: true
sticky: 2
order: 2
icon: 'fa-solid fa-cookie-bite'
tag:
  - 收集
date: 2023-12-11
---
# 碎片


## 比对框架

- [Google diff-match-patch](https://github.com/google/diff-match-patch.git)


## 代码保护

### TrueLicense

- [TrueLicense手册](https://truelicense.namespace.global/)

- [TrueLicense GitHub](https://github.com/christian-schlichtherle/truelicense)

- [<HopeIcon icon="fa-brands fa-bilibili" /> SpringBoot整合TrueLicense生成和验证License证书（一）](https://www.bilibili.com/video/BV1VZ4y1y7V9/?share_source=copy_web&vd_source=c71c79a0e59361cee136f3f1c1b16180) 

通过TrueLicense实现Java工程的License机制——由授权方生成license文件，使用方通过license文件使用项目。可以实现使用时长约束、使用机器数量约束、使用IP约束、使用机器序列号约束等。

大致流程：

1. 生成密钥对
2. 授权者保留私钥，通过私钥对设置限制信息的license文件进行签名
3. 使用者使用公钥验证license文件，客户端对license文件中存储的限制信息进行校验、处理。

### 代码混淆

::: info
配置复杂，容易出错，近期（2023-08）有更新
:::

[proguard-maven-plugin插件](https://github.com/wvengen/proguard-maven-plugin.git)

[ProGuard](https://www.guardsquare.com/proguard)

ProGuard是一个Java字节码压缩和代码混淆工具，可以对Java应用程序进行预处理，以减小应用程序的大小并提高性能。ProGuard-Maven-Plugin是一个用于将ProGuard集成到Maven构建过程中的插件。

通过混淆类名、属性、方法来提供对代码的保护，混淆之后的内容经过反编译之后不具有可读性。



### 代码加密:star:

::: info
配置简单，但很久没有更新。
:::

[classfinal-maven-plugin插件](https://gitee.com/roseboy/classfinal)
 
ClassFinal是一款java class文件安全加密工具，支持直接加密jar包或war包，无需修改任何项目代码，兼容spring-framework；可避免源码泄漏或字节码被反编译。

- 无需修改原项目代码，只要把编译好的jar/war包用本工具加密即可。
- 运行加密项目时，无需求修改tomcat，spring等源代码。
- 支持普通jar包、springboot jar包以及普通java web项目编译的war包。
- 支持spring framework、swagger等需要在启动过程中扫描注解或生成字节码的框架。
- 支持maven插件，添加插件后在打包过程中自动加密。
- 支持加密WEB-INF/lib或BOOT-INF/lib下的依赖jar包。
- 支持绑定机器，项目加密后只能在特定机器运行。
- 支持加密springboot的配置文件。


参考文章：

- [SpringBoot项目Jar包加密,防止反编译](https://juejin.cn/post/7291846601651273769)