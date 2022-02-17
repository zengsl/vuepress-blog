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



## 底层数据结构

> 主要针对2.9版本进行描述

SDS、linkedlist、dictionary、ziplist、inset、skiplist

###  基础数据类型的底层实现

总览：

| 类型   | Redis 2.9               | 新版本 |
| ------ | ----------------------- | ------ |
| string | int、SDS（embstr、raw） |        |
| list   | ziplist、linkedlist     |        |
| hash   | ziplist、dictionary     |        |
| set    | intset、dictionary      |        |
| zset   | ziplist、skiplist       |        |



Redis数据库中的key、value键值对分别对应两个`redisObject`的结构体对象，key固定都是string类型的，而value对应类型跟创建命令有关，对应5中基本数据类型。

``` c
typedef struct redisObject {

    // 类型
    unsigned type:4;

    // 编码
    unsigned encoding:4;

    // 对象最后一次被访问的时间
    unsigned lru:REDIS_LRU_BITS; /* lru time (relative to server.lruclock) */

    // 引用计数
    int refcount;

    // 指向实际值的指针
    void *ptr;

} robj;
```



`type`命令可以查看值对象对应的数据类型，对应5中基本数据类型string、hash、list、set、zset

`object encoding`命令可以查看值对象对应的具体编码，根据编码可以确定对应的底层数据结构，也就是redis对象中encoding的值。

![Redis 2.9](https://gitee.com/zengsl/picBed/raw/master/img/2022/02/20220215142908.png)

![image-20220215143813120](https://gitee.com/zengsl/picBed/raw/master/img/2022/02/20220215143813.png)

不同类型的底层转换规则：

**string类型**

主要有三种编码：int、embstr、raw

- 如果存放整数值，并且整数值可以用long来保存的话，那么encoding会设置为int，void*会转换为long
- 如果存放字符串，且字符串长度大于32字节，那么会使用SDS来保存内容，encoding会设置为raw
- 如果存放字符串，且字符串长度小于等于32字节，encoding会设置为embstr。embstr编码是专门为存放短字符串的一种优化编码方式，这种编码方式和raw是一致的，只不过raw编码方式会调用两次内存分配函数来创建redisObject和sdshdr（SDS的数据结构），而embstr编码通过调用一次内存分配函数来分配一段连续的内存空间存放redisObject和sdshdr

> 32这个值之后被改为了39，最新版本具体的数值按当前情况为准。

![image-20220215145658009](https://gitee.com/zengsl/picBed/raw/master/img/2022/02/20220215145658.png)

embstr编码字符串没有对应的redis函数，所以是只读的。所以在对embstr类型数据进行操作的时候会先转换为raw编码，然后再进行修改操作。所以embstr编码字符串修改之后总会变成一个raw编码的字符串对象。

int编码字符串修改之后是否会改变存储类型需要看具体的操作，比如调用incrby可能就不会，调用incrbyfloat就会变味embstr编码，调用append会变为raw编码，等。

**字符串类型对象是这五种类型中唯一一个会被其他四种类型对象嵌套的对象。**



**list类型**

主要有两种编码：ziplist、linkedlist

当列表对象同时满足以下两种条件时，列表对象使用ziplist编码：

- 列表对象所保存的所有字符串元素的长度都小于64字节；
- 列表对象保存的元素数量小于512个；

通过修改list-max-ziplist-value选项和list-max-ziplist-entries选项进行调整。



**hash类型**

主要有两种编码：ziplist、hashtable

当哈希对象同时满足以下两种条件时，列表对象使用ziplist编码：

- 哈希对象所保存的所有键值对的键和值的字符串长度都小于64字节；
- 哈希对象保存的键值对数量小于512个；

通过修改set-max-intset-entries选项进行调整。



**set对象**

集合对象的编码可以是inset和hashtable

当集合对象同时满足以下两种条件时，集合对象使用inset编码：

- 集合对象保存的所有元素都是整数值
- 集合对象保存的元素数量不超过512个。

通过修改zset-max-ziplist-value选项和zset-max-ziplist-entries选项进行调整。



**zset对象**

有序集合对象的编码可以是ziplist和skiplist

当有序集合对象同时满足以下两种条件时，有序集合对象使用ziplist编码：

- 有序集合对象保存的元素数量小于128个。
- 有序集合对象保存的所有元素大小都小于64字节。

当使用skiplist编码时，底层使用`zset`结构进行存储，zset包含跳跃表和字典表，字典表中是以元素的成员为key，分值为value进行存储。虽然zset结构同时使用字典和跳跃表来保存元素，但是这两种数据结构都会通过指针来共享相同元素的成员和分值，并不会造成内存的浪费。

```c
/*
 * 有序集合
 */
typedef struct zset {

    // 字典，键为成员，值为分值
    // 用于支持 O(1) 复杂度的按成员取分值操作
    dict *dict;

    // 跳跃表，按分值排序成员
    // 用于支持平均复杂度为 O(log N) 的按分值定位成员操作
    // 以及范围操作
    zskiplist *zsl;

} zset;


/*
 * 跳跃表
 */
typedef struct zskiplist {

    // 表头节点和表尾节点
    struct zskiplistNode *header, *tail;

    // 表中节点的数量
    unsigned long length;

    // 表中层数最大的节点的层数
    int level;

} zskiplist;

/* ZSETs use a specialized version of Skiplists */
/*
 * 跳跃表节点
 */
typedef struct zskiplistNode {

    // 成员对象
    robj *obj;

    // 分值
    double score;

    // 后退指针
    struct zskiplistNode *backward;

    // 层
    struct zskiplistLevel {

        // 前进指针
        struct zskiplistNode *forward;

        // 跨度
        unsigned int span;

    } level[];

} zskiplistNode;
```



### 高版本Redis的调整

quicklist



### 对象

- 对象的回收

Redis通过实现引用计数的方式来实现垃圾回收，通过redisObject#refcount来保存对象引用。有三个API可以进行操作`incrRefCount`、`decrRefCount`、`restRefCount（重置引用计数，但是不释放对象）`

```c
typedef struct redisObject {

    // 类型
    unsigned type:4;

    // 编码
    unsigned encoding:4;

    // 对象最后一次被访问的时间
    unsigned lru:REDIS_LRU_BITS; /* lru time (relative to server.lruclock) */

    // 引用计数
    int refcount;

    // 指向实际值的指针
    void *ptr;

} robj;
```

`OBJECT REFCOUNT`命令可以查看对象的引用数量

- 对象的共享

仍是通过对象的引用计数来实现，Redis发现如果存在相同的对象就直接将指针指向现有对象，并且引用计数加一。

**目前来说，Redis会在初始化服务器时，创建一万个字符串对象，这些对象包含0～9999的所有整数值。当要用到0～9999这些字符串对象时，服务器就会使用这些共享对象，而不是创建新对象。**这些共享对象也可以被其他嵌套使用了字符串类型的数据类型所使用。

创建共享字符串的数量可以通过修改redis.h/REDIS_SHARED_INTEGERS常量来调整。

- 对象空转时间

redisObject#lru存放了最后一次访问对象的时间

`OBJECT IDLETIME`可以查看空转时长，其通过当前时间减去lru记录的时间计算得出。执行此命令是不会修改对象lru时间。

如果服务器打开了maxmemory选项，并且服务器用于回收内存算法为volatile-lru或者allkeys-lrun，那么当服务器占用内存超过maxmemory限制之后就会释放空转时间较长的键值，从而回收内存。

配置文件中可以调整maxmemory选项和maxmemory-policy选项。



## 事件



### 事件分类

Redis服务器是一个事件驱动程序，服务器需要处理以下两类事件：

- 文件事件

 服务器与客户端通过套接字进行连接，而文件事件就是服务器对套接字的抽象。文件事件就是用来处理服务器与客户端之间的网络请求操作。

Redis基于**Reactor模型**开发了网络事件处理器，这个事件处理器被称为文件事件处理器（file event handle），基于IO多路复用程序来同时监听多个套接字，并根据套接字目前执行的任务来指定不同的事件处理器。

文件事件处理器由以下部分组成：套接字、I/O多路复用程序、文件事件分派器（file event dispatcher）、事件处理器。

- 时间事件

服务器中一些操作（比如serverCron函数）需要在给定时间执行，而时间事件就是对这类操作的抽象。

时间事件有id、when、timeProc（时间事件处理器）三个属性，有两种类型：

1. 周期性事件
2. 定时事件

目前Redis版本（2.9）没有使用定时事件。

一个时间事件具体是周期性的还是定时是根据时间事件处理函数的返回值来确定的：如果返回`ae.h/AE_NOMORE`，那么就是定时执行，执行完之后就会删除。如果不是`ae.h/AE_NOMORE`，就是周期性事件，会根据返回值更新when的属性。

服务器将所有时间事件都存放在一个无序链表中，每当事件执行器运行时就会遍历整个链表找到时间到达的时间事件，并调用对应的处理函数。

`serverCron`就是一个周期性事件，其主要职责如下：

![image-20220216172320250](https://gitee.com/zengsl/picBed/raw/master/img/2022/02/20220216172320.png)

### 事件调度与执行

事件的调用与执行由`ae.c/aeProcessEvent`函数来控制，用于协调这两种事件的执行时间以及何时执行。







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

**Redis服务器启动之后会有一个周期性操作函数serverCron默认每隔100毫秒执行一次。该函数其中一项工作就是执行BGSAVE命令，执行逻辑大致如下：根据配置的save选项的条件和redisServer的dirty计数器，只要有一个选项满足条件即执行BGSAVE命令。执行完成之后dirty计数器会被重置，lastsave属性会记录改次执行成功的时间，保存格式为二进制。服务器启动时只要检测到RDB文件就会载入，因为AOF执行效率更高，所以如果开启了AOF功能则不然。服务器在载入RDB文件时会进行阻塞，直到载入完成之后**



分析RDB文件：

```shell
# od命令 
# /usr/local/var/db/redis/dump.rdb
# -c 使用ASCII编码格式打印
# -cx 使用ASCII编码格式和十六进制格式打印，这样可以更加方便看清楚checksum校验和的内容（校验和采用小端表示）
od -c dump.rdb
```

Redis自带的redis-check-dump可以检查RDB文件



#### AOF

与RDB记录数据库中的键值对不同，AOF持久化记录的是服务端的写操作命令，以Redis命令的请求协议格式保存。

Redis进程就是一个事件循环，这个事件循环中的文件事件负责接收客户端的命令请求，以及向客户端发送命令回复，而时间事件负责执行像`serverCron`函数这样需要定时执行的函数。因为服务器在处理文本事件时可能会执行写命令，将写命令请求追加到aof缓冲区中，所以在服务器每次结束一个事件循环之后会调用`flushAppendOnlyFile`函数，考虑是否需要将aof_buf缓冲区中的内容写入和保存至aof文件中（与appendfsync选项有关）。

![image-20220217093702543](https://gitee.com/zengsl/picBed/raw/master/img/2022/02/20220217093708.png)

**重写AOF：**

Redis 可以在 AOF 文件体积变得过大时，自动地在后台对 AOF 进行重写。

重写命令`BGREWRITE`，Redis使用新AOF文件替换旧AOF文件的过程实际上是不会读取老的AOF文件，而是根据当前服务器的状况去生成。

原理：首先从数据库中读取键现在的值，然后用一条命令去记录键值对，代替之前记录这个键值对的多条命令。实际上因为list、set、zset、hash中可能包含多个元素键值，所以服务器会判断元素数量是否大于常量值`redis.h/REDIS_AOF_REWRITE_ITEMS_PER_CMD`（当前为64）

过程：主进程会fork一个子进程来执行重写操作，当fork子进程之后**AOF重写缓冲区**开始工作，主进程正常响应客户端的请求，会将写命令追加至**AOF缓冲区**和**AOF重写缓冲区**。当子进程执行完重写操作生成新的AOF文件之后会发送一个信号通知主进程，主进程接到信号之后会调用信号处理函数开始将**AOF重写缓冲区**写入至新的AOF文件中，然后对新AOF文件进行改名，原子的覆盖老的AOF文件完成新老文件的替换。这个信号处理函数执行完成之后，主进程就可以正常的处理命令请求了。**整个AOF重写过程，只有信号处理函数执行过程会阻塞父进程（服务器进程）。**

> 使用子进程而不是线程执行重写操作，因为子进程持有主进程的数据副本，可以在不使用锁的情况下保障数据安全性。
>
> 如果你不小心执行了 FLUSHALL 命令， 但只要 AOF 文件未被重写， 那么只要停止服务器， 移除 AOF 文件末尾的 FLUSHALL 命令， 并重启 Redis ， 就可以将数据集恢复到 FLUSHALL 执行之前的状态。



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

《Redis设计与实现》