---
title: 并发
date: 2020-09-10
---

## 介绍

记录java并发编程学习过程中的相关知识点

进程：操作系统中分配资源的最小单位，不同进程的运行是独立的、资源是不共享的。

线程：属于进程，是操作系统能够进行任务调度和执行的基本单位的最小单位。拥有所在进程的资源。


## 锁的概念梳理

共享锁


无锁


自旋锁、适应性自旋锁


锁粗化、锁消除

# AQS

头节点为什么要设置为一个空节点

waitStatus


## 指针小结

取消操作大致如下:

1. 将thread清除

2. 寻找前面非取消的节点，作为前驱节点

3. 将前节点的next指针指向当前节点的next节点（next指针切换）


获取锁：

1. 




释放锁：




## 参考

《Java并发编程艺术》

[从ReentrantLock的实现看AQS的原理及应用](https://tech.meituan.com/2019/12/05/aqs-theory-and-apply.html)

[不可不说的Java“锁”事](https://tech.meituan.com/2018/11/15/java-lock.html)


[深入分析Synchronized原理(阿里面试题)](https://www.cnblogs.com/aspirant/p/11470858.html)