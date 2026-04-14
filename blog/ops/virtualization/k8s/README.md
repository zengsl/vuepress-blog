---
date: 2021-08-25
title: K8S
---
# Kubernetes

## 核心概念

- 启用Linux Namespace配置;
- 设置指定的Cgroup参数;
- 切换进程的根目录rootfs;

Layer的实现：UnionFS联合挂载。通过`docker info`可以查看使用的UnionFS实现。

容器可分为两部分看待：

- 一组联合挂在在`/var/lib/docker/aufs/mnt`上的rootfs，这一部分称为***容器镜像*，是容器的静态视图；
- 一组由`Namespace + Ggroups`构成的隔离环境，这一部分称为**容器运行时**，是容器的动态视图。


## 参考
- 《深入剖析Kubernetes》
- 资料来源于[k8s教程由浅入深-尚硅谷](https://www.bilibili.com/video/BV1GT4y1A756?p=19)
- [k8s学习文档](https://gitee.com/moxi159753/LearningNotes/tree/master/K8S/6_Kubernetes%E9%9B%86%E7%BE%A4%E7%AE%A1%E7%90%86%E5%B7%A5%E5%85%B7kubectl)
- [英文文档](https://kubernetes.io/docs/home/) [中文文档](https://kubernetes.io/zh/docs/home/) 
- 照着文档一步步来，访问不了的源就换为国内的。


