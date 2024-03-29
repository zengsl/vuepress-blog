---
sidebarDepth: 2
---
> 记录Java虚拟机相关知识

## 类加载器

`ClassLoader`和`Class.forName`的区别

`ClassLoader`默认不会初始化类，只是加载到内存中

`Class.forName`默认会初始化类，可以通过参数设置

`Class.forName`使用的是**调用类的加载器**，通过`ClassLoader.getClassLoader(Reflection.getCallerClass())`来获取

## 多线程

[jls-17.7](https://docs.oracle.com/javase/specs/jls/se8/html/jls-17.html#jls-17.7)

[synchronized的JVM底层实现](https://blog.csdn.net/niuwei22007/article/details/51433669)

[synchronized](https://www.cnblogs.com/aspirant/p/11470858.html)

### Synchronized关键字

- 字节码层面包括：

同步块`monitorenter`和`monitorexit`两个指令，同步方法有`ACC_SYNCHRONIZED`修饰

monitorenter, monitorexit的指令解析是通过 InterpreterRuntime.cpp中的两个方法实现。monitor锁本质又是依赖于底层的操作系统的Mutex Lock（互斥锁）来实现的

- 源码层面有以下几个概念：

`ObjectMonitor`

Contention List：所有请求锁的线程将被首先放置到该竞争队列

Entry List：Contention List中那些有资格成为候选人的线程被移到Entry List

Wait Set：那些调用wait方法被阻塞的线程被放置到Wait Set

OnDeck：任何时刻最多只能有一个线程正在竞争锁，该线程称为OnDeck

Owner：获得锁的线程称为Owner

!Owner：释放锁的线程

#### 锁粗化

扩大锁范围，将多个连续的加锁、解锁操作连接在一起，扩展成一个范围更大的锁

#### 锁消除

这个跟后端编译优化中的逃逸分析有关系。

#### 锁膨胀

何为对象头？


- 无锁

- 偏向锁

偏向锁在JDK1.6之后是默认启用的，但是在应用启动几秒钟之后才激活，可以用参数进行设置，也可以关闭偏向锁。

当一个对象已经计算过一致性哈希码（未重写hashCode方法，指Obejct::hashCode）之后，它就再也无法进入偏向锁状态了；而当一个对象当前正处于偏向锁状态，又收到需要计算其一致性哈希码的请求时，它的偏向状态会被立即撤销，并且锁会膨胀为重量级锁。


- 轻量级锁

Lock Record：displace hdr、owner

- 重量级锁



#### volatile和synchronized的区别

截止JDK8, Java里只有`volatile`变量是能实现禁止指令重排的。

`volatile`能保证可见性、有序性

`synchronized`能保证可见性、有序性、原子性

关于有序性，两者针对的角度不同，`synchronized`是指的块与块之间看起来是原子操作，块与块之间有序可见。volatile 是在底层通过内存屏障防止指令重排的，变量前后之间的指令与指令之间有序可见

### volatile关键字

[深度解析volatile—底层实现](https://www.jianshu.com/p/2643c9ea1b82)

**保证了内存可见性和禁止指令重排序**

MESI：CPU缓存一致性协议

X86架构（TSO平台）下只存在StoreLoad问题，通过lock指令来解决（之所以没用mfence，是因为性能更好）。为什么只有StoreLoad的问题？因为intel采用了Store Buffer，它是一个CPU内部缓冲区，MESI无法保证CPU的内部缓冲区的可见性。用lock指令会强制Store Buffer写回缓存。

编码层面：volatile

字节码层面：ACC_VOLATILE

JVM层面：StoreStore，StoreLoad，LoadStore，LoadLoad

StoreLoad的实现用到了lock指令（intel）

CPU层面：sfence、lfence、mfence

long和double的非原子性协定


