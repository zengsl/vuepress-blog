> 记录性能调优内容

## 前置知识

[Linux性能监控资料](/ops/os/linux/sys_performance.html)

[JDK调优监控工具](/back/java/jvm/jdkCommand.html#jdk%E5%86%85%E7%BD%AE%E8%B0%83%E4%BC%98%E5%B7%A5%E5%85%B7)

## 性能问题的理解

性能问题一般会出现在CPU、内存、磁盘IO、网络IO。随着现在硬件技术的提升和成本的降低，现代服务器一般会使用多核CPU，另外在intel超线程技术的加持下CPU的性能已经拥有较好的性能。对于大多数互联网应用来说，CPU一般不是也不应该是系统的瓶颈，系统的大部分时间的状况都是CPU在等I/O (硬盘/内存/网络) 的读/写操作完成。
磁盘IO问题主要体现在数据库。网络IO性能主要体现在Socket网络通信，处理用户、业务请求。所以需要解决IO相关的问题，从而提高CPU利用率，有效的压榨CPU性能。

所以在排查性能瓶颈，找到产生性能问题的那支臭虫的时候，我们需要通过相关的工具查看相关指标从而分析出问题所在。一般都需要多指标综合考虑，因为有些指标是相互影响的，比如：大量请求占用高内存，会导致频繁full gc，从而导致CPU利用率飙升。

[到底什么是高并发](http://www.52im.net/thread-3120-1-1.html)
