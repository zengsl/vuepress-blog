---
date: 2021-01-05
---
# HashMap阅读

> 阅读JDK8

HashMap的数据结构：

JDK7：数组+链表

JDK8：数组+链表+红黑树

几个重要的参数：

负载因子(loadFactor)：默认值为0.75

容量（CAPACITY）：初始化容量DEFAULT_INITIAL_CAPACITY为16

TREEIFY_THRESHOLD 8

MIN_TREEIFY_CAPACITY 64

threshold 数组扩容的阈值  CAPACITY * loadFactor


数组初始化是在put方法中调用resize()完成的，resize()同时完成初始化和扩容的两项操作

计算key的hash值：

通过key值进行hash运算（扰动函数），key的hashcode通过，移位和高低位运算来计算

计算数组下标：


数组扩容：

两倍扩容，桶上的链表需要通过尾插法进行拆链

1.7使用的是头插法



初始化容量为什么要设置为16？  为了计算下标和数据迁移



红黑树