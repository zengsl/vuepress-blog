---
order: 4
category:
  - 后端
tag:
  - 分布式
  - Zookeeper
---
# Zookeeper

> 版本 3.5.7

基于观察者模式设计的分布式服务管理框架，它负责存储和管理大家都关心的数据，然后接受观察者的注册，一旦这些数据的状态发生变化，Zookeeper就会将负责通知已经在Zookeeper上注册的那些观察者作出相应的反应。

Zookeeper = 文件系统 + 通知机制

**一个典型的分布式数据一致性的解决方案，分布式应用程序可以基于它实现诸如数据发布/订阅、负载均衡、命名服务、分布式协调/通知、集群管理、Master 选举、分布式锁和分布式队列等功能。**

Zookeeper保证的是CAP理论中的**CP**

1. **Zookeeper**不能保证每次服务请求的可用性。（注：在极端环境下，ZooKeeper可能会丢弃一些请求，消费者程序需要

重新请求才能获得结果）。所以说，Zookeeper不能保证服务可用性。 

2. 进行**Leader**选举时集群都是不可用。

## 基本安装

### 准备

1. [下载](https://zookeeper.apache.org/releases.html)安装包，如apache-zookeeper-3.5.7-bin.tar.gz

>  集群配置文件使用xync分发https://www.bilibili.com/video/BV1Qp4y1n7EN?p=28

2. 解压安装包

```shell
 # 解压
 tar -zxvf apache-zookeeper-3.5.7-bin.tar.gz -C /opt/
 
 # 修改名称
 mv /opt/apache-zookeeper-3.5.7-bin /opt/zookeeper-3.5.7
```

### 配置修改

1. 进入/opt/zookeeper-3.5.7/conf目录,执行` mv zoo_sample.cfg zoo.cfg`
2. 修改配置文件` vim zoo.cfg`配置dataDir内容为`dataDir=/opt/zookeeper-3.5.7/zkData`

3. 创建zkData文件夹

### 操作

- 启动` bin/zkServer.sh start`
- 查看状态` bin/zkServer.sh status`
- 启动客户端` bin/zkServer.sh stop`



在/etc/profile中增加zk的环境变量

```shell
export ZK_HOME=/opt/zookeeper-3.5.7

export PATH=${PATH}:${ZK_HOME}/bin
```



### 服务脚本

可设置zookeeper开机启动

``` shell
cd /etc/rc.d/init.d

touch zookeeper

chmod 777 zookeeper

vim zookeeper

# 设置开机启动
chkconfig zookeeper on

# 添加和验证
chkconfig --add zookeeper
chkconfig --list zookeeper
```
脚本内容如下：

``` shell
#!/bin/bash

#chkconfig:2345 20 90
#description:zookeeper
#processname:zookeeper
export JAVA_HOME=/opt/jdk/jdk1.8.0_321
export JRE_HOME=${JAVA_HOME}/jre
export CLASSPATH=.:${JAVA_HOME}/lib:${JRE_HOME}/lib
export PATH=${PATH}:${JAVA_HOME}/bin:${JRE_HOME}/bin

case $1 in
	"start") /opt/zookeeper-3.5.7/bin/zkServer.sh start;;
	"stop") /opt/zookeeper-3.5.7/bin/zkServer.sh stop;;
	"status") /opt/zookeeper-3.5.7/bin/zkServer.sh status;;
	"restart") /opt/zookeeper-3.5.7/bin/zkServer.sh restart;;
	*) echo "require start|stop|status|restart"
esac

```



## 集群安装

准备三台机器，这里使用之前配置k8s使用的三台虚拟机。

| 机器名       | IP              |
| ------------ | --------------- |
| k8s-master01 | 192.168.143.129 |
| k8s-node01   | 192.168.143.130 |
| K8s-node02   | 192.168.143.131 |

::: tip

在准备好机器之后，先修改各自的hostname并修改所有机器的/etc/hosts文件

:::

### 安装

安装过程与基本安装一致，按照相同的步骤在三台机器上重复执行即可。



### 集群配置

#### 配置服务器编号

在zkData文件夹下创建一个**myid**文文件，分别修改内容为0、1、2

![image-20220205155033332](https://gitee.com/zengsl/picBed/raw/master/img/2022/02/20220205155038.png)

#### 配置zoo.cfg文件

增加集群配置

```
server.0=k8s-master01:2888:3888
server.1=k8s-node01:2888:3888
server.2=k8s-node02:2888:3888
```

配置解释

```shell
server.A=B:C:D
```

A是一个数字，表示这个是第几号服务器，对应myid文件中的内容。

B是服务器地址

C是这个服务器 Follower 与集群中的 Leader 服务器交换信息的端口；

D 是万一集群中的 Leader 服务器挂了，需要一个端口来重新进行选举，选出一个新的

Leader，而这个端口就是用来执行选举时服务器相互通信的端口。



### 集群操作

- 分别启动 Zookeeper

``` shell
bin/zkServer.sh start
```

- 查看状态

```shell
 bin/zkServer.sh status
```



### 集群操作脚本

1. 在/home/用户名/bin目录下面创建脚本

![image-20220205155954878](https://gitee.com/zengsl/picBed/raw/master/img/2022/02/20220205155955.png)

脚本内容如下：

``` shell
#!/bin/bash
case $1 in
"start"){
for i in k8s-master01 k8s-node01 k8s-node02
do
echo ---------- zookeeper $i 启动 ------------
ssh $i "/opt/zookeeper-3.5.7/bin/zkServer.sh
start"
done
};;
"stop"){
for i in k8s-master01 k8s-node01 k8s-node02
do
echo ---------- zookeeper $i 停止 ------------
ssh $i "/opt/zookeeper-3.5.7/bin/zkServer.sh
stop"
done
};;
"status"){
for i in k8s-master01 k8s-node01 k8s-node02
do
echo ---------- zookeeper $i 状态 ------------
ssh $i "/opt/zookeeper-3.5.7/bin/zkServer.sh
status"
done
};;
esac
```

2. 赋权

``` shell
 chmod u+x zk.sh
```

3. Zookeeper集群启动脚本

``` shell
zk.sh start
```

4. Zookeeper集群停止脚本

```shell
zk.sh stop
```



## 客户端命令行操作

### 基本操作

| 命令      | 功能描述                                                     |
| --------- | ------------------------------------------------------------ |
| help      | 显示所有操作命令                                             |
| ls path   | 使用 ls 命令来查看当前 znode 的子节点 [可监听] -w 监听子节点变化 -s 附加次级信息 |
| create    | 创建节点 -s 有序列 -e 临时（重启或者超时消失）               |
| get path  | 获得节点的值 -w 监听节点内容变化 -s 附加次级信息             |
| set       | 设置节点的具体值                                             |
| stat      | 查看节点状态                                                 |
| delete    | 删除节点                                                     |
| deleteall | 递归删除节点                                                 |

启动客户端

``` shell
bin/zkCli.sh -server k8s-master01:2181
```

显示所有操作命令

```shell
help
```



## 源码阅读

Paxos算法

ZAB协议

### 服务端启动

代码入口可以从zkServer.sh脚本中发现是`QuorumPeerMain`类的main方法。

