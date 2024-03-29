# 计算机体系中一些数字

地址、指针的大小和操作系统位数有关：32位操作系统指针大小为32个bit，也就是4个字节。64位操作系统为8个字节。

## JVM

### 压缩指针

对于32位机器，进程能使用的最大内存是4G。如果进程需要使用更多的内存，需要使用64位机器。

对于Java进程，在oop只有32位时，只能引用4G内存。因此，如果需要使用更大的堆内存，需要部署64位JVM。这样，oop为64位，可引用的堆内存就更大了。

在堆中，32位的对象引用占4个字节，而64位的对象引用占8个字节。也就是说，64位的对象引用大小是32位的2倍。

由于HotSpot虚拟机的自动内存管理系统要求对象起始地址必须是8字节的整数倍，换句话说就是任何对象的大小都必须是8字节的整数倍。

![image-20220107165913747](https://gitee.com/zengsl/picBed/raw/master/img/2022/01/20220107165919.png)

### JMM

#### 虚拟机栈

包括变量表、操作数栈、方法出口、动态链接。

变量表：基本数据类型和引用类型变量等在变量表中以变量槽(slot)的方式存储，其中64位的long和double会使用两个slot进行存储，而其他变量只使用一个slot存储。

## MySQL

**页**，是InnoDB中数据管理的最小单位。当我们查询数据时，其是以页为单位，将磁盘中的数据加载到缓冲池中的。同理，更新数据也是以页为单位，将我们对数据的修改刷回磁盘。

Page是Innodb存储的最基本结构，也是Innodb磁盘管理的最小单位，与数据库相关的所有内容都存储在Page结构里。Page分为几种类型：

> 1. `数据页（B-Tree Node）`，
> 2. `Undo页（Undo Log Page）`，
> 3. `系统页（System Page）`，
> 4. `事务数据页（Transaction System Page）`
>
> 每个数据页的大小为`16kb`，每个Page使用一个32位（一位表示的就是0或1）的int值来表示，正好对应Innodb最大64TB的存储容量(16kb * 2^32=64tib)

mysql中的具体数据是存储在行中的，而行是存储在页中的，每页的默认大小为16k（大小可以通过配置文件修改），页的结构如下图所示

http://metronic.net.cn/metronic/show-46454.html

## Kafka