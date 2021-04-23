# 介绍

记录Redis的相关知识

[在线教程](https://try.redis.io/)

[官网](https://redis.io/)



## 类型

### String

- 字符串

- 数值

- bitmap 

setbit 长度一位 

使用场景：统计用户登录天数、计算活跃用户数量、12306订票

### list

双向链表，key拥有链表的头尾指针，放入有序

同向操作：栈

异向操作：队列

下标操作：数组

使用场景：

充当以上数据结构、分页、微信抢红包等


### hash

使用场景：

商品详情页、聚合场景


### set

特点： 去重，无序

使用场景：

随机事件和抽奖等 

推荐系统，共同好友，推荐好友 

### zset

使用场景：

排行榜

有序事件

评论+分页（动态）


type 【key】查看类型 

object encoding 【key】 查看底层数据结构



底层结构：

压缩表、跳跃表（skiplist）


主缓存

二级缓存

# Redis实战

## 数据安全和性能保障

### 持久化选项

#### RDB

1. 开发环境尽量贴近生产环境，有助于判断快照生成的是否过于频繁或过于稀少（过于频繁会浪费资源，而过于稀少则带有丢失大量数据的隐患）

2. 对日志进行聚合计算

~~~ python
# 日志处理函数接受的其中一个参数为回调函数，
# 这个回调函数接受一个Redis连接和一个日志行作为参数，
# 并通过调用流水线对象的方法来执行Redis命令。
def process_logs(conn, path, callback):
    # 获取文件当前的处理进度。
    current_file, offset = conn.mget( 
        'progress:file', 'progress:position') 
    pipe = conn.pipeline()

    # 通过使用闭包（closure）来减少重复代码
    def update_progress():    
        # 更新正在处理的日志文件的名字和偏移量。
        pipe.mset({
            'progress:file': fname,
            'progress:position': offset 
        })
        # 这个语句负责执行实际的日志更新操作，
        # 并将日志文件的名字和目前的处理进度记录到Redis里面。
        pipe.execute()

    # 有序地遍历各个日志文件。
    for fname in sorted(os.listdir(path)): 
        # 略过所有已处理的日志文件。
        if fname < current_file:
            continue
        inp = open(os.path.join(path, fname), 'rb')
        # 在接着处理一个因为系统崩溃而未能完成处理的日志文件时，略过已处理的内容。
        if fname == current_file:
            inp.seek(int(offset, 10)) 
        else:
            offset = 0
        current_file = None
        # 枚举函数遍历一个由文件行组成的序列，
        # 并返回任意多个二元组，
        # 每个二元组包含了行号lno和行数据line，
        # 其中行号从0开始。
        for lno, line in enumerate(inp):
            # 处理日志行。
            callback(pipe, line)
            # 更新已处理内容的偏移量。
            offset += int(offset) + len(line) 
            # 每当处理完1000个日志行或者处理完整个日志文件的时候，
            # 都更新一次文件的处理进度。
            if not (lno+1) % 1000: 
                update_progress()
        update_progress()
        inp.close()

~~~


3. 大数据

随着数据量增加BGSAVE在创建子进程所耗费的时间会越来越多。如果数量达到数十个GB，并且所剩余的空闲内存不多，或者redis运行在虚拟机上，那么执行BGSAVE可能造成长时间的停顿，也可能引发系统大量使用虚拟内存，从而导致redis的性能降低至无法使用。
停顿时长与redis所在系统硬件有关。可以考虑关闭自动保存，转为手动触发BGSAVE或者SAVE命令。手动触发BGSAVE一样可能会导致停顿，不同的是我们可以控制停顿出现的时间。
另一方面虽然SAVE会导致Redis阻塞直到快照生成完成，但是因为不需要创建子进程，所以不会像BGSAVE那样因为创建子进程而导致redis阻塞。光是创建子进程就有可能花费很长的时间

#### AOF

#### 重写/压缩AOF

### 复制

`SLAVEOF`


### 处理系统故障

#### 验证快照和AOF

redis-check-aof

redis-check-dump


#### 更换故障服务器

当主从服务器中的主服务器A宕机之后：

方案一：

1. 对从服务器B进行SAVE备份

2. 将服务器C设置为新的主服务器，并备份文件传输给服务器C

3. 通过SAVEOF命令对服务器B进行修改，将其指向新的主服务器C

方案二：

原从服务器B升级为主服务器，并为其创建从服务器C（哨兵模式sentinel）

无论任何一种方案，都需要对客户端做相应的调整。如果要重启redis的话，那么可能还需要对服务器的持久化配置进行更新

### Redis事务

Redis事务与传统的关系型数据库的事务是不同的。

相关命令：MULTI、EXEC、WATCH、UNWATCH、DISCARD

关键字：流水线pipelining

我们可以将一些列要执行的命令放在MULTI、EXEC，会批量一起发送给服务器，在调用EXEC之前不会执行任何实际的操作，MULTI用来开启一个新的事务,之后的命令都会加入到队列中，当调用EXEC之后会一并发送给服务器

WATCH可以监视一个或者多个键

UNWATCH可以在执行WATCH之后和执行MULTI之前对连接进行重置

DISCARD可以在执行MULTI之后和执行EXEC之前对连接进行重置



### 非事务型流水线

MULTI和EXEC对要执行对命令进行包裹，一次性传输给服务器虽然可以减少与服务器之间对通信次数，但是本身也是有开销的。如果这些命令本身是不需要事务的，那么可以使用非事务型流水线

针对与Python，获取pipeline时传入Flase，且不需要使用MULTI和EXEC对所需执行命令进行包裹。相较于


### 性能

可以Redis附带的`redis-benchmark`程序对相关命令做性能测试

redis-benchmark -c 1 -q -a iris@2003 

mac i9 32G 测试结果还没有书中的例子性能高？

这个测试结果和实际的有一定差距，因为redis-benchmark不会处理执行命令所获得的命令回复，所以节约了大量对于命令回复所进行的语法分析的时间

![redis-benchmark](https://gitee.com/zengsl/picBed/raw/master/img/20210128155345.png)

## 使用Redis来记录日志

> Linux和UNix中常见的两种记录日志的方式：文件追加、syslog服务。将syslog服务替换为syslog-ng，syslog-ng配置语言更加简单。

传统的方式记录日志都是记录在各自服务器中，而使用redis来记录日志可以做集中式的管理



## 构建程序应用组件

### 分布式锁

`WATCH`是乐观锁，只会在数据被其他客户端修改了之后对执行了这个命令的用户进行通知，而不会阻止其他客户端对数据对修改

Redis提供的`setnx`拥有基本的加锁功能

为锁设置超时时间，避免程序加锁之后出现崩溃，导致其他客户端无法获取锁的问题


### 计数信号量

计数信号量是一种锁，它可以让用户限制一项资源最多能够同时被多少个进程访问

技术信号量和其他锁的区别：当客户端获取锁失败时，客户端会选择等待；而获取信号量失败时，通常直接退出，并向用户提示“资源繁忙”，由用户决定下一步如何处理。

相关概念：系统时间、是否公平、锁

公平计数信号量+锁的实现是最正确的一种方式

### 任务队列



### 文件分发



## 降低内存占用

### 短结构

#### 压缩列表表示

在列表、散列和有序集合的长度较短或者体积较小的时候，Redis可以选择使用一种名为**压缩列表**（ziplist）的紧凑存储方式来存储这些结构。

**压缩列表**是列表、散列和有序集合这3种不同类型的对象的一种**非结构化**（unstructured）表示：

与Redis在通常情况下使用双链表表示列表、使用散列表表示散列、使用散列表加上跳跃表（skiplist）表示有序集合的做法不同，
压缩列表会以序列化的方式存储数据，这些序列化数据每次被读取的时候都要进行解码，每次被写人的时候也要进行局部的重新编码，并且可能需要对内存里面的数据进行移动。

Redis配置：

~~~ conf
hash-max-ziplist-entries 512

hash-max-ziplist-value 64

zset-max-ziplist-entries 128

zset-max-ziplist-value 64

# Redis 6.0.9 只有list-max-ziplist-size -2
list-max-ziplist-entries 512

list-max-ziplist-value 64

~~~

列表、散列和有序集合的基本配置选项都很相似，它们都由-max-ziplist-entries选项和-max-ziplist-value选项组成，并且这3组选项的语义也基本相同：

entries选项说明列表、散列和有序集合在被编码为压缩列表的情况下，允许包含的最大元素数量；而value选项则说明了压缩列表每个节点的最大体积是多少个字节。

当这些选项设置的限制条件中的任意一个被突破的时候，Redis就会将相应的列表、散列或是有序集合从压缩列表编码转换为其他结构，而内存占用也会因此而增加。

命令：

`DEBUG OBJECT`可以查看对象对结构，观察 encoding 中表示的压缩方式。serializedlength信息表示占用来多少字节的内存

::: tip

serializedlength信息表示占用来多少字节的内存，但是对于压缩列表编码及集合的特殊编码之外的其他编码来说，这个数值并不代表结构的实际内存占用量。

quicklist是Redis 3.2版本以后针对链表和压缩列表进行改造的一种数据结构，是 zipList 和 linkedList 的混合体，相对于链表它压缩了内存。进一步的提高了效率。

:::

**当压缩列表被转化为普通的结构之后，即使结构将来重新满足配置选项设置的限制条件，结构也不会重新转换回压缩列表**

跟列表、散列和有序集合不同，集合并没有使用压缩列表表示，而是使用了另外一种具有不同语义和限制的紧凑表示



#### 集合的整数集合编码

**整数集合（intset）**

跟列表、散列和有序集合一样，体积较小的集合也有自己的紧凑表示，同时满足以下三点：

1. 整数包含的所有成员都可以被解释为十进制整数，

2. 这些整数又处于平台的有符号整数范围之内，

3. 集合成员的数量又足够少（跟下方配置有关）

那么Redis就会以有序整数数组的方式存储集合，这种存储方式又被称为整数集合（intset）

~~~ conf

set-max-intset-entries 512

~~~


#### 长压缩列表和大整数集合带来的性能问题

对一个压缩列表表示的对象的其中一部分进行读取或者更新，，可能会需要对整个压缩列表进行解码，甚至还需要对内存里面的数据进行移动，因此读写一个长度较大的压缩列表可能会给性能带来负面的影响。

使用整数集合编码的集合结构也有类似的问题，不过整数集合的问题并非来源于编码和解码数据，而在于它在执行插人操作或者删除操作时需要对数据进行移动。


### 分片结构

不通过lua脚本来实现分片
	
### 打包存储二进制位和字节	

利用高效打包和更新字符串的4个命令：`GETRANGE` 、`SETRANGE` 、`GETBIT` 、`SETBIT`



## 扩展Redis

### 扩展读性能

![提升效率方法](https://gitee.com/zengsl/picBed/raw/master/img/20210201093201.png)

- 使用从服务器树，减轻顶级主服务器的压力

- 压缩网络连接，从而减少需要传送的数据量

如使用带压缩的SSH隧道，同时记得配置SSH连接在断线之后自动进行重连

加密和压缩的开销与加密算法的选择与压缩级别的选择有关

- 使用Redis Sentinel配合Redis复制功能，对下线的主服务器进行故障转移



----

ziplist

quicklist


zset 当所有分值都相同都时候，会按照成员名字来进行排序。如果分值都为0都话，会按照字符串都二进制顺序进行排序 ？？？

[排序](https://redis.io/commands/zadd#elements-with-the-same-score)


zremrangeByScore -inf +inf


全局命令

`SORT`

`INFO`





Redis经验分享和相关文章

http://mng.bz/2ivv一-这篇文章介绍了如何在多个数据中心之间进行带压缩功能的Redis 复制。

http://mng.bz/LCgm 使用Redis实现实时更新。
http://mng.bz/UgAD
使用Redis字符串存储实时数据。

http://mng.bz/1OJ7--Instagram分享了他们在Redis里面存储大量键值对的经验。

http://mng.bz/X564简单地总结了一些适合使用Redis来解决的问题，其中一部分问题在本书已经提到过了。

http://mng.bz/oClc一一讲述了Craigslist是如何对Redis进行数据分片的。

htp://mng.bz/07kX-讲述了一个在手机和电脑之间同步照片的应用是怎样在系统的各个方面使用Redis的。

http://mng.bz/4dgD
介绍了Disqus是怎样在生产环境中使用Redis的。

ttp://mng.bz/21iE-
使用Redis存储RSS feed信息。

http://mng.bz/L254
个早期的例子，介绍了如何使用Redis的列表来存储过滤后的
Twitter消息。