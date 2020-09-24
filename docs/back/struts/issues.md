# 常见问题

## 请求不进Actoin

出现这种情况之后，先排除web.xml中配置的过滤器拦截，确认请求已经到了Struts之后，那么有可能是与拦截器有关。

::: warning
不了解拦截器的同学请去补补课，嘻嘻
:::

### 样例

前端通过ajax请求Action，其中有一个参数叫做psnCode用于存放加密过后的人员主键，该请求发出之后不会进入对应Action中的断点，查看response发现返回了默认地址。

如果这个参数不加密则可以进入断点。

通过分析应该是与这个参数有关系

### 过程分析

通过调试`ParametersInterceptor`发现是有错误信息的，虽然是有异常但是不会暴露出来，更不会中断请求，而是在`workflow`拦截器中有处理。

![ParametersInterceptor](https://gitee.com/zengsl/picBed/raw/master/img/20200924164848.png)

`workflow`的struts默认实现是`com.opensymphony.xwork2.interceptor.DefaultWorkflowInterceptor`

观察下面的代码可以发现当存在错误则会则会返回一个result给上层代码，这里返回当是`input`，而请求的当前Action请求并没有`result`是`input`，struts找不到result自然就跳转默认地址了。

![DefaultWorkflowInterceptor](https://gitee.com/zengsl/picBed/raw/master/img/20200924165432.png)

### 结论

通过观察当前请求的Action和参数发现，Action中有一个Long类型的psnCode属性。

`ParametersInterceptor`在做属性映射的时候，将一个加密之后的数值赋值给Long类型的变量就产生错误了。

**此问题是参数与Action的属性类型不一致导致的。**

### 解决方法

1. 修改Action的对应psnCode属性的类型

2. 修改前端传递的参数，可以加一个后缀`Encrypt`或者`_encrypt`用来区分。