---
order: 15

---
# 仪器设备架构

## 启动

- EgrantApplication通过SpringApplicationBuilder实现定制SpringApplication
	
- 通过`StartUpParamServiceImpl`来实现，一些默认的启动参数设置
	
默认加载：egrant.yml和egrant-{profile}.yml，以及初始化nacos


## 网关

GateWay->WebFlux : HandlerFunction

https://cloud.tencent.com/developer/article/1488120