---
sidebar: auto
title: Kafka
category:
  - 后端
tag:
  - MQ
  - Kafka
---

## 集群搭建

- 准备工作

```shell
- 准备zookeeper环境(3.5.7)

- 下载Kafka安装包:https://archive.apache.org/dist/kafka/2.1.0/kafka_2.12-2.1.0.tgz

- 下载kafka-manager：
		https://github.com/yahoo/CMAK/archive/refs/tags/2.0.0.2.zip （要自己编译）
    这里有好心人编译好的版本：https://blog.wolfogre.com/posts/kafka-manager-download/
		https://github.com/wolfogre/kafka-manager-docker/releases/download/2.0.0.2/kafka-manager-2.0.0.2.zip（第三方编译好的版本）

- 上传到集群中
```

- 开始搭建kafka

```shell
tar -zxvf /opt/software/kafka_2.12-2.1.0.tgz -C /usr/local
mv kafka_2.12-2.1.0 kafka_2.12

# 修改配置文件
vim /usr/local/kafka_2.12/config/server.properties

修改broker.id ，每台服务器不能相同

## 添加
port=9092
host.name = xxx
dvertised.host.name=xxx

## 修改
num.partitions=5
log.dirs=/usr/local/kafka_2.12/kafka-logs
zookeeper.connect=k8s-master01:2181,k8s-node01:2181,k8s-node02:2181


# 创建文件目录
mkdir /usr/local/kafka_2.12/kafka-logs

# 启动
/usr/local/kafka_2.12/bin/kafka-server-start.sh /usr/local/kafka_2.12/config/server.properties &
```

- 搭建kafka-manager

```shell
# 解压
unzip kafka-manager-2.0.0.2.zip -d /usr/local/

# 修改配置文件 
vim /usr/local/kafka-manager-2.0.0.2/conf/application.conf
## 修改内容
kafka-manager.zkhosts="k8s-master01:2181,k8s-node01:2181,k8s-node02:2181"

# 启动服务
/usr/local/kafka-manager-2.0.0.2/bin/kafka-manager &

# 浏览器访问控制台
http://192.168.143.129:9000/
```

- kafka-manager添加集群

```sh
# 创建一个名为my-cluster的集群
```

- 集群验证

```shell
#通过管控添加一个名为"test"的topic，2个分区，一个副本。

# 启动消费者
/usr/local/kafka_2.12/bin/kafka-console-consumer.sh --bootstrap-server k8s-master01:9092 --topic test

# 启动生产者
/usr/local/kafka_2.12/bin/kafka-console-producer.sh --broker-list k8s-master01:9092 --topic test
```



## 重要参数

```shell
acks：有三个取值1、0、-1或all

1.A:说一下acks的3个取值代表什么含义，分别适用于什么场景？
2.A:acks=-1 or acks=all是不是一定就能保障消息的可靠性呢？
Q:min.insync.replicas=2
```





## 重点

page cache 页缓存 

顺序磁盘写入

零拷贝（mmap、sendfile）
