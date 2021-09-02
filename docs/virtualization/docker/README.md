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



## 命令


### docker ps

[docker ps](https://docs.docker.com/engine/reference/commandline/ps/)

过滤镜像

docker ps --filter ancestor=hello-world -a


### docker container

[docker container](https://docs.docker.com/engine/reference/commandline/container/)

`docker container rm`

批量删除容器

docker container rm $(docker ps --filter ancestor=hello-world -qa)


### docker exec

[docker exec](https://docs.docker.com/engine/reference/commandline/exec/)

以交互方式进入容器

docker exec -it containerId command 

command与镜像构建有关，可以查看镜像的构建描述。比如[redis:alpine3.14](https://hub.docker.com/layers/redis/library/redis/alpine3.14/images/sha256-6edcbc387edd866a080491c015c029b458f49678152dfe364ad50383620c3215?context=explore)这个镜像就是基于`/bin/sh`，那么就不能像进入[ubuntu](https://hub.docker.com/layers/ubuntu/library/ubuntu/latest/images/sha256-0f745a413c7886d6dc4f1e6a1d45a5cf5a9a85f72e6243b307e17d67e2e1fe10?context=explore)容器那样使用`/bin/bash`

### 日志

docker logs -f --tail 100 66c017d8fc53

### 修改容器配置

- 将容器提交为新镜像

![commit](https://gitee.com/zengsl/picBed/raw/master/img/20210901182722.png)

docker commit some-rabbit some-rabbit_new