# 介绍

## 架构


MySQL服务器逻辑架构图

![架构](https://gitee.com/zengsl/picBed/raw/master/img/20210219135529.png)

最上层的服务并不是MySQL所独有的，大多数基于网络的客户端/服务器的工具或者服务都有类似的架构。比如连接处理、授权认证、安全等等。

第二层架构是MySQL比较有意思的部分。大多数MySQL的核心服务功能都在这一层，包括查询解析、分析、优化、缓存以及所有的内置函数（例如，日期、时间、数学和加密函数），所有跨存储引擎的功能都在这一层实现：存储过程、触发器、视图等。

第三层包含了存储引擎。存储引擎负责MySQL中数据的存储和提取。和GNU/Linux下的各种文件系统一样，每个存储引擎都有它的优势和劣势。服务器通过API与存储引擎进行通信。这些接口屏蔽了不同存储引擎之间的差异，使得这些差异对上层的查询过程透明。存储引擎API包含几十个底层函数，用于执行诸如“开始一个事务”或者“根据主键提取一行记录”等操作。但存储引擎不会去解析SQL注1，不同存储引擎之间也不会相互通信，而只是简单地响应上层服务器的请求。


注1：InnoDB是一个例外，它会解析外键定义，因为MySQL服务器本身没有实现该功能。

注2：MySQL5.5或者更新的版本提供了一个API，支持线程池（Thread-Pooling）插件，可以使用池中



### 隔离级别 

![隔离级别](https://gitee.com/zengsl/picBed/raw/master/img/20210219144106.png)

### 事务日志

事务日志可以帮助提高事务的效率。使用事务日志，存储引擎在修改表的数据时只需要修改其内存拷贝，再把该修改行为记录到持久在硬盘上的事务日志中，而不用每次都将修改的数据本身持久到磁盘。事务日志采用的是追加的方式，因此写日志的操作是磁盘上一小块区域内的顺序I/O，而不像随机I/O需要在磁盘的多个地方移动磁头，所以采用事务日志的方式相对来说要快得多。事务日志持久以后，内存中被修改的数据在后台可以慢慢地刷回到磁盘。目前大多数存储引擎都是这样实现的，我们通常称之为预写式日志（Write-Ahead Logging），修改数据需要**写两次磁盘**。

如果数据的修改已经记录到事务日志并持久化，但数据本身还没有写回磁盘，此时系统崩溃，存储引擎在重启时能够自动恢复这部分修改的数据。具体的恢复方式则视存储引擎而定。

### MySQL事务

MySQL提供了两种事务型的存储引擎：InnoDB和NDB Cluster。另外还有一些第三方存储引擎也支持事务，比较知名的包括XtraDB和PBXT。后面将详细讨论它们各自的一些特点。

MySQL默认开启AUTOCOMMIT，可以通过执行`show variables like 'AUTOCOMMIT';`查看，可以通过`SET AUTOCOMMIT = 0`进行关闭

当自动提交被关闭之后，需要执行rollback或者commit之后才认为事务结束。一些DDL命令执行时会自动执行事务提交操作（具体需要看对应当文档）

可以通过`SETTRANSACTION ISOLATIONLEVEL`设置隔离级别

MySQL服务层不管理事务，事务是由下层当存储引擎实现的。所以在同一个事务中使用多种存储引擎是不可靠的。

#### 隐式和显式锁定

InnoDB使用的是两阶段锁定协议。在事务执行的过程中，随时都可以执行锁定，锁只有在执行COMMIT或者ROLLBACK的时候才会释放，并且所有的锁是在同一时刻被释放。锁定都是隐式锁定，InnoDB会根据隔离级别在需要的时候自动加锁。

InnoDB也支持显示锁定，这些语句不属于SQL规范：

- SELECT ... LOCK IN SHARE MODE

- SELECT ... FOR UPDATE

MySQL也支持 LOCK TABLES 和 UNLOCK TABLES 语句，这是在服务器层实现的，和存储引擎无关。


### 多版本并发控制

MySQL大多数事务型存储引擎实现的都不是简单的行级锁。基于提升并发性能的考虑，他们一般都同时实现了多版本并发控制(MVCC)。不仅是MySQL，包括Oracle、PostgreSQL等其他数据库也都实现了MVCC，但各自但实现机制不同，因为MVCC没有一个同一的实现标准。

### MySQL存储引擎

MySQL将每一个数据保存为数据目录下的一个子目录。创建表时，会在数据库子目录下创建一个和表同名的.frm文件保存表的定义。不同存储引擎保存数据和索引的方式是不同的，但表但定义则是在MySQL服务层同一处理的。

查看sys_user 表的定义信息 `show TABLE status like 'sys_user'` 

MySQL 5.0之后的版本，可以查询INFORMATION_SCHEMA中对应的表。 



推荐阅读官方手册中“InnoDB事务模型和锁”


## 基准测试

### 测试工具

集成测试工具

- ab

- http_load

- JMeter

单组件式测试工具

- mysqlslap

- MySQL Benchmark Suite(sql-bench)

- Super Smack

- Database Test Suite

- Percona's TPCC-MySQL Tool

- sysbench

内置函数  BENCHMARK()

## 服务器性能剖析

### 剖析工具

mk-quer-digets、pt-quer-digets、New Relic

### 剖析单条查询

主要有三种方法：SHOW STATUS、SHOW PROFILE、检查慢查询日志的条目


### 其他方式

1. 使用USER_STATISTICS表

Percona Server和MariaDB都引入了一些额外的对象级别使用统计的`INFORMATION_SCHEMA`表，这些最初是由Google开发的。这些表对于查找服务器各部分的实际使用情况非常有帮助。在一个大型企业中，DBA负责管理数据库，但其对开发缺少话语权，那么通过这些表就可以对数据库活动进行测量和审计，并且强制执行使用策略。对于像共享主机环境这样的多租户环境也同样有用。另外，在查找性能问题时，这些表也可以帮助找出数据库中什么地方花费了最多的时间，或者什么表或索引使用得最频繁，抑或最不频繁。下面就是这些表：

SHOW TABLES FROM INFORMATION_SCHEMA LIKE '%_STATISTICS'; 

2. 使用strace

strace可以用来跟踪系统调用的情况

