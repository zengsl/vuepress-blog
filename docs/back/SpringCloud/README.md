# 介绍

SpringCloud的学习笔记

2020-10-22

## 版本选择

Spring Boot 

[github](https://github.com/spring-projects/spring-boot)

[官网](https://spring.io/projects/spring-boot)

Boot官方推荐使用2.X以上的版本


Spring Cloud

[github](https://github.com/spring-projects/spring-cloud)

[官网](https://spring.io/projects/spring-cloud)

查找Spring Boot和Spring Cloud的版本依赖关系

- 从cloud的官网上查询

![版本依赖信息](https://gitee.com/zengsl/picBed/raw/master/img/20201022153413.png)

- 更详细的查看方法

通过[查看信息地址](https://start.spring.io/actuator/info)获取json，将json格式化之后可以看到`spring-cloud`的版本信息，如下图：

![cloud版本](https://gitee.com/zengsl/picBed/raw/master/img/20201022153413.png)

~~~ json
 "spring-cloud": {
      "Finchley.M2": "Spring Boot >=2.0.0.M3 and <2.0.0.M5",
      "Finchley.M3": "Spring Boot >=2.0.0.M5 and <=2.0.0.M5",
      "Finchley.M4": "Spring Boot >=2.0.0.M6 and <=2.0.0.M6",
      "Finchley.M5": "Spring Boot >=2.0.0.M7 and <=2.0.0.M7",
      "Finchley.M6": "Spring Boot >=2.0.0.RC1 and <=2.0.0.RC1",
      "Finchley.M7": "Spring Boot >=2.0.0.RC2 and <=2.0.0.RC2",
      "Finchley.M9": "Spring Boot >=2.0.0.RELEASE and <=2.0.0.RELEASE",
      "Finchley.RC1": "Spring Boot >=2.0.1.RELEASE and <2.0.2.RELEASE",
      "Finchley.RC2": "Spring Boot >=2.0.2.RELEASE and <2.0.3.RELEASE",
      "Finchley.SR4": "Spring Boot >=2.0.3.RELEASE and <2.0.999.BUILD-SNAPSHOT",
      "Finchley.BUILD-SNAPSHOT": "Spring Boot >=2.0.999.BUILD-SNAPSHOT and <2.1.0.M3",
      "Greenwich.M1": "Spring Boot >=2.1.0.M3 and <2.1.0.RELEASE",
      "Greenwich.SR6": "Spring Boot >=2.1.0.RELEASE and <2.1.18.BUILD-SNAPSHOT",
      "Greenwich.BUILD-SNAPSHOT": "Spring Boot >=2.1.18.BUILD-SNAPSHOT and <2.2.0.M4",
      "Hoxton.SR8": "Spring Boot >=2.2.0.M4 and <2.3.5.BUILD-SNAPSHOT",
      "Hoxton.BUILD-SNAPSHOT": "Spring Boot >=2.3.5.BUILD-SNAPSHOT and <2.4.0.M1",
      "2020.0.0-M3": "Spring Boot >=2.4.0.M1 and <=2.4.0.M1",
      "2020.0.0-M4": "Spring Boot >=2.4.0.M2 and <=2.4.0-M3",
      "2020.0.0-SNAPSHOT": "Spring Boot >=2.4.0-M4"
    }
~~~

- 更加精确的方法

查看对应cloud版本文档，看官方推荐

![入口](https://gitee.com/zengsl/picBed/raw/master/img/20201022154927.png)

![boot版本](https://gitee.com/zengsl/picBed/raw/master/img/20201022155053.png)



## 学习文档

### Spring Cloud 

[Hoxton.SR8版本官方资料](https://docs.spring.io/spring-cloud/docs/Hoxton.SR8/reference/html/)

[国人翻译中文文档](https://www.bookstack.cn/read/spring-cloud-docs/docs-index.md)


### Spring Boot

[官方资料](https://docs.spring.io/spring-boot/docs/current/reference/html/)

