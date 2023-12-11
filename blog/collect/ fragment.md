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

[proguard-maven-plugin插件](https://github.com/wvengen/proguard-maven-plugin.git)

### 代码加密:star:

[classfinal-maven-plugin插件](https://gitee.com/roseboy/classfinal)

参考文章：

- [SpringBoot项目Jar包加密,防止反编译](https://juejin.cn/post/7291846601651273769)