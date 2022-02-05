---
sidebarDepth: 2
---
> 记录Java虚拟机相关知识



## 类加载器

`ClassLoader`和`Class.forName`的区别

`ClassLoader`默认不会初始化类，只是加载到内存中

`Class.forName`默认会初始化类，可以通过参数设置

`Class.forName`使用的是**调用类的加载器**，通过`ClassLoader.getClassLoader(Reflection.getCallerClass())`来获取

