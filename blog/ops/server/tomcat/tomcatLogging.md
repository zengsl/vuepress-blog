---
date: 2021-12-05

---

## 简介

Tomcat使用jul记录日志，在jul的上层进行了扩展以下主要内容：

- `.handlers`定义根处理器
- 处理器名可以添加前缀，可以实例化单个类的多个处理器。前缀为`数字`开头并且`.`结尾
- 类加载器都实现了 `org.apache.juli.WebappProperties`，可以执行 `${classloader.webappName}`, `${classloader.hostName}` 和 `${classloader.serviceName}` ， 这些属性分别被 web 应用程序名称、主机名称和服务名称替换。
- logger默认不会传递给父级处理，可以通过设置`loggerName.useParentHandlers`属性来设置（布尔值）

Tomcat最重要的是日志管理器`LogManager`的实现`ClassLoaderLogManager`



## 配置

### 日志分类

**Tomcat 有五类日志：** catalina、localhost、manager、admin、host-manager

- **catalina.out**

​		catalina.out即标准输出和标准出错，所有输出到这两个位置的都会进入catalina.out，这里包含tomcat运行自己输出的日志以及应用里向console输出的日志。默认这个日志文件是不会进行自动切割的，我们需要借助其他工具进行切割（注意：catalina.out文件如果过大会影响）

- **catalina.YYYY-MM-DD.log**

​		网上常见的说法：主要是tomcat自己运行的一些日志，**这些日志还会输出到catalina.out**，但是应用向console输出的日志不会输出到catalina.{yyyy-MM-dd}.log,它是tomcat的启动和暂停时的运行日志，**注意，它和catalina.out是里面的内容是不一样的。**
::: tip
​		我认为这个说法只是针对默认未修改的配置文件，同时没有配置专门的logger而使用RootLogger。其实就是RootLogger默认配置了往catalina.xxx.log和console输出日志，而console输出的日志自然会到catalina.out中。


:::

- **localhost.YYYY-MM-DD.log**

  主要是应用初始化(listener, filter, servlet)未处理的异常最后被tomcat捕获而输出的日志,它也是包含tomcat的启动和暂停时的运行日志,但它没有catalina.2018-09-19.log 日志全。它只是记录了部分日志。

- **localhost_access_log**.**YYYY-MM-DD.txt**

  这个是访问tomcat的日志，请求时间和资源，状态码都有记录。

- **host-manager.YYYY-MM-DD.log**

  这个估计是放tomcat的自带的manager项目的日志信息的，未看到有什么重要的日志信息。

- **manager.YYYY-MM-DD.log**

	这个是tomcat manager项目专有的日志文件.

### 日志级别

处理程序的日志级别阈值默认为 INFO，可以使用 SEVERE、 WARNING、 INFO、 CONFIG、 FINE、 FINER、 FINEST 或 ALL 来设置（日志级别从大到小）。还可以针对特定的包来收集日志记录并指定级别。

### 日志位置

全局日志配置文件位置`"$CATALINA_BASE"/conf/logging.properties`，启动脚本设置通过设置系统变量`java.util.logging.config.file`来指定位置。如果它不可读或者没有配置，默认是使用 JRE 中的` ${java.home}/lib/logging.properties` 文件。

在 web 应用程序中，该文件将是 WEB-INF/classes/logging.properties

```shell
# 日志处理器 注册所有可用的handlers，下面logger中配置的handlers会从这里获取
handlers = 1catalina.org.apache.juli.FileHandler, 2localhost.org.apache.juli.FileHandler, 3manager.org.apache.juli.FileHandler, 4host-manager.org.apache.juli.FileHandler, java.util.logging.ConsoleHandler

# 根日志处理器  
# 针对这种 .xxxx的配置，我们可以这样理解：因为.handlers前面没有指明具体内容(xxxx.handlers、xxxx.level)，所以代码里面判断为root，这和下面的配置方式其实是一致的org.apache.catalina.core.ContainerBase.[Catalina].[localhost].handlers。
.handlers = 1catalina.org.apache.juli.FileHandler, java.util.logging.ConsoleHandler
#.level 配置根日志处理器的级别

############################################################
# Handler specific properties.
# Describes specific configuration info for Handlers.
############################################################

# 针对日志处理器hanlder进行配置（logger和handler都可以单独设置日志级别，这点和jul一致），初始化上面的日志处理器时会根据这里的配置对handler进行配置。
1catalina.org.apache.juli.FileHandler.level = FINE
1catalina.org.apache.juli.FileHandler.directory = ${catalina.base}/logs
1catalina.org.apache.juli.FileHandler.prefix = catalina.

2localhost.org.apache.juli.FileHandler.level = FINE
2localhost.org.apache.juli.FileHandler.directory = ${catalina.base}/logs
2localhost.org.apache.juli.FileHandler.prefix = localhost.

3manager.org.apache.juli.FileHandler.level = FINE
3manager.org.apache.juli.FileHandler.directory = ${catalina.base}/logs
3manager.org.apache.juli.FileHandler.prefix = manager.

4host-manager.org.apache.juli.FileHandler.level = FINE
4host-manager.org.apache.juli.FileHandler.directory = ${catalina.base}/logs
4host-manager.org.apache.juli.FileHandler.prefix = host-manager.

java.util.logging.ConsoleHandler.level = FINE
java.util.logging.ConsoleHandler.formatter = java.util.logging.SimpleFormatter


############################################################
# Facility specific properties.
# Provides extra control for each logger.
############################################################

# 单独配置每一个logger
org.apache.catalina.core.ContainerBase.[Catalina].[localhost].level = INFO
org.apache.catalina.core.ContainerBase.[Catalina].[localhost].handlers = 2localhost.org.apache.juli.FileHandler

org.apache.catalina.core.ContainerBase.[Catalina].[localhost].[/manager].level = INFO
org.apache.catalina.core.ContainerBase.[Catalina].[localhost].[/manager].handlers = 3manager.org.apache.juli.FileHandler

org.apache.catalina.core.ContainerBase.[Catalina].[localhost].[/host-manager].level = INFO
org.apache.catalina.core.ContainerBase.[Catalina].[localhost].[/host-manager].handlers = 4host-manager.org.apache.juli.FileHandler

# For example, to log debug messages in ContextConfig and HostConfig
# classes and to log only warnings and errors in other
# org.apache.catalina.** classes, uncomment these lines:
#org.apache.catalina.startup.ContextConfig.level = FINE
#org.apache.catalina.startup.HostConfig.level = FINE
#org.apache.catalina.level = WARNING
```

## 初始化过程

`LogManger`中静态代码块中进行初始化

```java
static {
        defaultLevel = Level.INFO;
        AccessController.doPrivileged(new PrivilegedAction<Object>() {
            public Object run() {
                String var1 = null;

                try {
                    var1 = System.getProperty("java.util.logging.manager");
                    if (var1 != null) {
                        try {
                            Class var2 = ClassLoader.getSystemClassLoader().loadClass(var1);
                            LogManager.manager = (LogManager)var2.newInstance();
                        } catch (ClassNotFoundException var4) {
                            Class var3 = Thread.currentThread().getContextClassLoader().loadClass(var1);
                            LogManager.manager = (LogManager)var3.newInstance();
                        }
                    }
                } catch (Exception var5) {
                    System.err.println("Could not load Logmanager \"" + var1 + "\"");
                    var5.printStackTrace();
                }

                if (LogManager.manager == null) {
                    LogManager.manager = new LogManager();
                }
								
             		// 1. 配置和初始化handlers 全部会维护在ClassLoaderLogInfo#handlers下面addLogger给logger设置handlers时会从这个集合中获取
              	// 调用addLogger注册Root Logger
                // addLogger方法会对当前logger的父级和子级做处理。
                LogManager.manager.rootLogger = LogManager.manager.new RootLogger();
               // 2. 注册Root Logger 因为上一步已经注册过了，所以这里其实没有做什么事情，会很快跳出方法。 
                LogManager.manager.addLogger(LogManager.manager.rootLogger);
              	// 3. 将Root Logger放入上下文中
                LogManager.manager.systemContext.addLocalLogger(LogManager.manager.rootLogger);
              	// 4.设置global的log manager
                Logger.global.setLogManager(LogManager.manager);
              	// 5. 注册global的logger
                LogManager.manager.addLogger(Logger.global);
                return null;
            }
        });
        loggingMXBean = null;
    }
```


 **参考资料：**

[1]. [Apache Tomcat 8 (8.5.73) - Logging in Tomcat](https://tomcat.apache.org/tomcat-8.5-doc/logging.html)

[2].[Java TM Logging Overview (oracle.com)](https://docs.oracle.com/javase/7/docs/technotes/guides/logging/overview.html)

[3].[tomcat 日志详解 - 自由早晚乱余生 - 博客园 (cnblogs.com)](https://www.cnblogs.com/operationhome/p/9680040.html)

