``` shell
# Internet的延时和路由
traceroute [hostname]
```



## 应用层

## 传输层

## 网络层-数据平面



## 网络层-控制平面

### 路由选择算法

- 链路状态 link state

​	Dijkstra算法

- 距离矢量 distance vector

​	DV算法

### 互联网常见网关协议

> 协议是算法的应用

- RIP：基于距离矢量算法
- OSPF：基于链路状态算法

### 层次路由

平面路由在规模巨大的网络中，路由信息的存储、传输和计算代价巨大，DV和LS都有各自的缺陷。同时管理也比较困难。

层次路由将互联网分成一个个AS（路由区域），AS内部可以采用RIP、OSPF、IGRP等协议。AS与AS之间的路由协议使用BGP
