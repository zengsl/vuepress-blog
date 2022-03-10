## 核心组件

Front Controller + Page Controller概念来分离流程控制逻辑与具体的Web请求处理逻辑。

`org.springframework.web.servlet.DispatcherServlet`就是Spring MVC框架中的Front Controller，它负责接收处理所有的Web请求，针对具体的处理逻辑委派给下一级控制器去实现。

核心组件：

1. HandlerMapping

专门管理Web请求到具体处理类之间的映射关系,获取对应当前Web请求到具体处理类，即org.springframework.web.servlet.mvc.Controller

2. org.springframework.web.servlet.mvc.Controller

对应DispatcherServlet的次级控制器，它本身实现了对应某个具体Web请求的处理逻辑。处理完请求智慧会返回一个ModelAndView实例，ModelAndView包含如下两部分信息：

- 视图逻辑名称
- 模型数据

3. ViewResolver和View

ModelAndView可以通过返回的逻辑视图名称查找到具体的View实现，然后委派该具体的View实现类来根据模型数据，输出具体的视图内容即可。

![image-20220307103032162](https://gitee.com/zengsl/picBed/raw/master/img/2022/03/20220307103037.png)