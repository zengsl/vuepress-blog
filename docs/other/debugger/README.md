# 介绍


## toString的影响

在toString中如果调用了初始化或者正常流程中会调用的代码，那么在调试的时候可能断点无法进入该代码

可以修改IDEA中修改java的debugger的配置

![Idea调试java预览设置](https://gitee.com/zengsl/picBed/raw/master/img/20201024153048.png)

详情可参考[getHandlerMappings](/back/spring/init.html#注意)

