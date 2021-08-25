---
sidebar: auto
---
# Docker

## 安装

### Mac安装

**使用Homebrew**

~~~ shell
brew install --cask --appdir=/Applications docker
~~~

**手动安装**

[Install Docker Desktop on Mac](https://docs.docker.com/desktop/mac/install/)


### 镜像加速

打开docker的设置，修改Docker Engine中registry-mirrors地址

~~~ json {4,5,6}
{
  "experimental": false,
  "registry-mirrors": [
    "阿里镜像",
    "https://hub-mirror.c.163.com/",
    "https://docker.mirrors.ustc.edu.cn/"
  ],
  "features": {
    "buildkit": true
  }
}
~~~

**国内的加速服务：**

- 网易 [https://hub-mirror.c.163.com/](https://hub-mirror.c.163.com/)

- 阿里云 https://<你的ID>.mirror.aliyuncs.com

如果想要使用阿里的镜像加速服务，那么可以通过[阿里云](https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors)进行获取。

步骤：登录阿里云->进入控制台->从“产品与服务列表”中找到“容器镜像服务”->镜像工具->镜像加速器

- 科大镜像 [https://docker.mirrors.ustc.edu.cn/](https://docker.mirrors.ustc.edu.cn/)



