---
title: MySQL相关知识点
# order: 2
tag:
  - study
date: 2025-04-23
---
# 相关知识点


## Buffer_Pool

https://dev.mysql.com/doc/refman/8.0/en/innodb-buffer-pool.html

缓冲池是主内存中的一个区域， InnoDB 在访问表和索引数据时将其缓存起来。缓冲池允许从内存直接访问常用数据，从而加快处理速度。在专用服务器上，通常会将多达 80% 的物理内存分配给缓冲池。

页作为最小读取单位，默认16kb。

InnoDB存储引擎通过维护Buffer_Pool来缓存数据，从而提高读取效率。Buffer_Pool中缓存的数据页类型包括数据页、索引页等，其通过**改造版LRU**进行淘汰策略。

Buffer_Pool被分为Old、New两个部分，默认比例是5:3，New部分通过FIFO进行淘汰，Old部分通过LRU进行淘汰。当数据页被访问时，会将其放入New部分，并在一定时间后（默认1s）将其移动到Old部分。当需要淘汰数据页时，会先从Old部分进行淘汰，如果Old部分已满，则从New部分进行淘汰。