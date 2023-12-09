# Fiddler

## 基本用法

### bpu

请求前断点（before response)

使用方法：

命令行输入`bpu 你要拦截的请求地址`
 
命令行输入`bpu`可以取消断点

以一个文件上传的请求为例：

请求地址：xxxx//file/ajax-fileupload

1. 设置断点

命令行输入`bpu xxxx//file/ajax-fileupload`回车

![bpu断点](images/img.png)

2. 触发请求

3. 观察断点

![断点请求](images/img_1.png)

请求进入断点之后左侧的请求拦中，在请求的前方会有红色标记

点击请求，右侧会显示该请求的相关信息，可以查看inspectors功能栏的下方的相关功能页签。

inspectors->WebForms中可以查看到请求参数

inspectors->Headers中可以查看到请求头信息

可以根据需要对信息进行修改

![请求参数](images/img_2.png)

下方有两个按钮：

`Break on Response` 表示在请求响应时进入断点

`Break to Completion` 表示让请求结束，响应时不进入断点