---
title: HyperLogLog
# order: 2
tag:
  - study
date: 2025-04-21
---
# HyperLogLog

HyperLogLog 是一种用于统计基数（cardinality）的算法，它使用一个固定大小的数组来表示一个集合，并使用一个哈希函数来确定元素的位置。HyperLogLog 的核心思想是通过估计数组中 0 的数量来估计集合的大小。

HyperLogLog 的优点是它使用固定大小的数组，因此它的空间复杂度是 O(log n)，其中 n 是集合的大小。这使得 HyperLogLog 非常适合处理大规模数据集。

[Redis实现 HyperLogLog](https://redis.io/docs/latest/develop/data-types/probabilistic/hyperloglogs/#:~:text=HyperLogLog%20is%20a%20probabilistic%20data%20structure%20that%20estimates,KB%20and%20provides%20a%20standard%20error%20of%200.81%25.)