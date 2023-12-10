---
order: 2
category:
  - 后端
tag:
  - Struts
  - FAQ
  - Action
date: 2020-09-24
---
# 常见问题

## 请求不进Action

出现这种情况之后，先排除web.xml中配置的过滤器拦截，确认请求已经到了Struts之后，那么有可能是与拦截器有关。

::: warning
需具备拦截器知识
:::

### 样例

前端通过ajax请求Action，其中有一个参数叫做psnCode用于存放加密过后的人员主键，该请求发出之后不会进入对应Action中的断点，查看response发现返回了默认地址。

如果这个参数不加密则可以进入断点。

通过分析应该是与这个参数有关系

### 过程分析

通过调试`ParametersInterceptor`发现是有错误信息的，虽然是有异常但是不会暴露出来，更不会中断请求，而是在`workflow`拦截器中有处理。

![ParametersInterceptor](images/img.png)

`workflow`的struts默认实现是`com.opensymphony.xwork2.interceptor.DefaultWorkflowInterceptor`

观察下面的代码可以发现当存在错误则会则会返回一个result给上层代码，这里返回当是`input`，而请求的当前Action请求并没有`result`是`input`，struts找不到result自然就跳转默认地址了。

![DefaultWorkflowInterceptor](images/img_1.png)

### 结论

通过观察当前请求的Action和参数发现，Action中有一个Long类型的psnCode属性。

`ParametersInterceptor`在做属性映射的时候，将一个加密之后的数值赋值给Long类型的变量就产生错误了。

**此问题是参数与Action的属性类型不一致导致的。**

### 解决方法

1. 修改Action的对应psnCode属性的类型

2. 修改前端传递的参数，可以加一个后缀`Encrypt`或者`_encrypt`用来区分。



## 文件上传失败

解决测试环境无法上传文件的问题，主要由金蝶服务器和struts2升级至2.5导致

### 问题描述

Action中无法获取到文件等其他参数



### 问题分析

request对象未被Struts2包装成`MultiPartRequestWrapper`



包装的过程是在struts准备过滤器完成`StrutsPrepareFilter`

![image-20210429100735993](images/img_2.png)

从上述入口进入找到以下代码

~~~ java
//Dispatcher
public HttpServletRequest wrapRequest(HttpServletRequest request) throws IOException {
  // don't wrap more than once
  if (request instanceof StrutsRequestWrapper) {
    return request;
  }
	// 是否进行包装的判断条件判断
  // 是否开启Multipart，默认是开启的。如果没有在struts.xml通过常量struts.multipart.enabled进行关闭的话
  // 判断当前请求是否是一个Multipart请求，主要判断当前请求是否是POST请求，是否满足正则的规则
  if (isMultipartSupportEnabled(request) && isMultipartRequest(request)) {
    MultiPartRequest multiPartRequest = getMultiPartRequest();
    LocaleProviderFactory localeProviderFactory = getContainer().getInstance(LocaleProviderFactory.class);
		// 完成包装
    request = new MultiPartRequestWrapper(
      multiPartRequest,
      request,
      getSaveDir(),
      localeProviderFactory.createLocaleProvider(),
      disableRequestAttributeValueStackLookup
    );
  } else {
    request = new StrutsRequestWrapper(request, disableRequestAttributeValueStackLookup);
  }

  return request;
}

public static final String MULTIPART_FORM_DATA_REGEX = "^，主要由multipart/form-data(?:\\s*;\\s*boundary=[0-9a-zA-Z'()+_,\\-./:=?]{1,70})?(?:\\s*;\\s*charset=[a-zA-Z\\-0-9]{3,14})?";

protected boolean isMultipartRequest(HttpServletRequest request) {
  String httpMethod = request.getMethod();
  String contentType = request.getContentType();
	// 主要判断当前请求是否是POST请求，是否满足正则的规则
  // 正则的默认值是常量MULTIPART_FORM_DATA_REGEX，主要由multipart/form-data 、 分隔符boundary、字符集设置，三部分组成，顺序不能错
  return REQUEST_POST_METHOD.equalsIgnoreCase(httpMethod) &&
    contentType != null &&
    multipartValidationPattern.matcher(contentType.toLowerCase(Locale.ENGLISH)).matches();
}

~~~



通过远程调试发现测试环境中content Type为`multipart/form-data;charset=UTF-8; boundary=----WebKitFormBoundaryeDGdJAybHiBkHqXA`

字符集顺序不满足要求！

通过远程调试发现请求经过第一个过滤器（org.springframework.web.filter.CharacterEncodingFilter）设置UTF-8编码之后，contentType中的内容会被修改（开发环境在tomcat8.5中是不会被修改）如：`multipart/form-data;boundary=----WebKitFormBoundaryeDGdJAybHiBkHqXA`变为`multipart/form-data;charset=UTF-8; boundary=----WebKitFormBoundaryeDGdJAybHiBkHqXA` 由于测试机使用的是金蝶服务器，request对象是由金蝶实现的，无法往下进行看了。



### 问题解决

修改正则表达式的匹配规则，做一下兼容即可

修改struts.xml，增加常量配置

~~~ xml
<constant name= "struts.multipart.validationRegex" value="^multipart/form-data(?:\s*;\s*charset=[a-zA-Z\-0-9]{3,14})?(?:\s*;\s*boundary=[0-9a-zA-Z'()+_,\-./:=?]{1,70})?(?:\s*;\s*charset=[a-zA-Z\-0-9]{3,14})?"/>
~~~



使用2.3版本的系统不会有问题，因为其判断逻辑比较简单。

![image-20210429102452592](images/img_3.png)


> 很多框架在升级之后，一些约束规则都会变得更加严格。