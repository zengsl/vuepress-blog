---
date: 2022-01-14
tag:
  - 搜索引擎
  - Solr
---
## 安装


> 不同版本的solr有差别，本次操作版本：Solr-6.4.1  [历史版本下载](http://archive.apache.org/dist/lucene/solr/)

windows平台下载solr-6.4.1.zip  ，linux、mac下载solr-6.4.1.tgz  

解压之后，solr-6.4.1内包含以下内容:

```
.
├── CHANGES.txt
├── LICENSE.txt
├── LUCENE_CHANGES.txt
├── NOTICE.txt
├── README.md
├── bin
├── contrib
├── dist
├── docs
├── example
├── licenses
└── server
```

bin目录中包含solr启动的二进制脚本

```shell
# 进入bin目录

# 后台启动solr 控制台localhost:8983/solr/index.html
./solr start -p 8983 

# 前台启动solr
./solr start -p 8983 -f

# 停止solr服务
./solr stop -p 8983

# 查看solr服务状态
./solr status
```



## 快速开始

### 创建core

通过example创建core

```shell
./solr create -c jcg -d basic_configs
```

### 配置schema

配置managed-schema

```xml
<!--添加-->
<field name="cat" type="text_general" indexed="true" stored="true"/>
 
<field name="name" type="text_general" indexed="true" stored="true"/>
 
<field name="price" type="tdouble" indexed="true" stored="true"/>
 
<field name="inStock" type="boolean" indexed="true" stored="true"/>
 
<field name="author" type="text_general" indexed="true" stored="true"/>
```

### 导入数据

导入example中的文档，创建索引

```shell
./post -c jcg /Users/zengsl/iriswork/tools/solr/solr-6.4.1/example/exampledocs/books.csv
```



## 配置

> 以下操作使用内置的jetty运行solr的方式

### 创建core

创建一个名为sysLog的核心

```shell
./solr create -c sys_log -d basic_configs
```

### 配置schema

修改`核心/conf/managed-schema`文件，该文件创建核心时会自动生成`uniqueKey`的内容按需调整。

```xml
 		<field name="LOG_CODE" type="long" indexed="true" stored="true" required="true" multiValued="false" />

    <field name="PSN_CODE" type="long" indexed="false" stored="false"/>
    <field name="PSN_NAME" type="string" indexed="false" stored="false"/>
    <field name="LOG_TYPE" type="string" indexed="true" stored="false" docValues="false" />
    <field name="KEY_CODE" type="string" indexed="false" stored="false"/>
    
    <field name="CREATE_DATE" type="tdate" indexed="true" stored="false" docValues="false" />

    <field name="LOG_ACTION" type="string" indexed="true" stored="false" docValues="false" />
    <field name="LOG_DETAIL" type="text_general" indexed="true" stored="false" docValues="false" />
    <field name="CLIENT_IP" type="string" indexed="true" stored="false" docValues="false" />
    <field name="SERVER_IP" type="string" indexed="true" stored="false" docValues="false" />
    <field name="EXCEPTION" type="text_general" indexed="true" stored="false" docValues="false" />

    <uniqueKey>LOG_CODE</uniqueKey>

```

### 配置数据导入

[solr6.6在线文档](https://solr.apache.org/guide/6_6/uploading-structured-data-store-data-with-the-data-import-handler.html#uploading-structured-data-store-data-with-the-data-import-handler)

- 修改配置`核心/conf/solrconfig.xml`，新增以下内容：

```shell
<!-- 配置 dataimport 的 requestHandler -->
<requestHandler name="/dataimport" class="org.apache.solr.handler.dataimport.DataImportHandler">
    <lst name="defaults">
      <str name="config">data-config.xml</str>
    </lst>
</requestHandler>
```

- conf下创建data-config.xml	

```xml
<dataConfig>
    <dataSource type="JdbcDataSource" driver="oracle.jdbc.driver.OracleDriver" url="jdbc:oracle:thin:@192.168.15.185:1521:ora12c" user="ynkjt_dev" password="ynkjt_dev"/>    
    <document>
        <entity name="sysLog" query="select t.*,psn.ZH_NAME as PSN_NAME from sys_log t left join person psn on t.PSN_CODE = psn.PSN_CODE" deltaQuery="select id from sys_log t where to_char(t.create_date,'yyyy-mm-dd hh24:mi:ss') > '${dataimporter.last_index_time}'"
        deltaImportQuery="select t.*,psn.ZH_NAME as PSN_NAME from sys_log t left join person psn on t.PSN_CODE = psn.PSN_CODE where t.id = '${dataimporter.delta.ID}' " 
        transformer="ClobTransformer"
        >
            <field column="LOG_CODE" name="LOG_CODE" />
            <field column="PSN_CODE" name="PSN_CODE" />
            <field column="PSN_NAME" name="PSN_NAME" />
            <field column="LOG_TYPE" name="LOG_TYPE" />
            <field column="KEY_CODE" name="KEY_CODE" />
            <field column="CREATE_DATE" name="CREATE_DATE" />
            <field column="LOG_ACTION" name="LOG_ACTION" />
            <field column="LOG_DETAIL" name="LOG_DETAIL" clob="true"/>
            <field column="CLIENT_IP" name="CLIENT_IP" />
            <field column="SERVER_IP" name="SERVER_IP" />
            <field column="EXCEPTION" name="EXCEPTION" clob="true"/>
        </entity>
    </document>
</dataConfig>
```

- 配置jar包

复制solr-6.4.1/dist目录下`solr-dataimporthandler-6.4.1`、`solr-dataimporthandler-extras-6.4.1.jar`、`ojdbc6.jar`放到solr-6.4.1/server/solr-webapp/webapp/WEB-INF/lib中



**清除文档**

在管理控制台中选择对应core下的document，选择xml类型执行以下内容：

```xml
<delete><query>*:*</query></delete><commit/> 
```



### 配置数据定时导入

可以用Windows计划任务或者Linux的Cron来定期访问增量导入的链接来完成定时增量导入的功能。这里我们使用与solr更加契合的方案：solr自身提供的定时任务组件`apache-solr-dataimportscheduler.jar`

- 将jar放入应用(Tomcat、Jetty)的`WEB-INF/lib`中
- 在web.xml中配置`<listener-class>org.apache.solr.handler.dataimport.scheduler.ApplicationListener</listener-class>`
- 在SOLR_HOME\solr目录下面新建一个目录conf（注意不是SOLR_HOME\solr\sysLog核心下面的conf），创建dataimport.properties文件

```properties
#  是否同步
#  1 - active; anything else - inactive
syncEnabled=1
#同步core
#  which cores to schedule
#  in a multi-core environment you can decide which cores you want syncronized
#  单core的话，可留空或者注释
syncCores=sysLog
#solr服务器ip
server=localhost
#solr服务器端口
port=8983
#solr服务应用上下文
webapp=solr
#请求参数（一般情况下，默认为下面即可）
params=/dataimport?command=delta-import&clean=false&commit=true
#  schedule interval
#  number of minutes between two runs
#  [defaults to 30 if empty]
# 更新间隔时间（1分钟），如果为空，默认为20分钟
interval=1
# 重做索引的时间间隔，单位分钟，默认7200，即1天;
# 为空,为0,或者注释掉:表示永不重做索引
reBuildIndexInterval=0
# 重做索引的参数
reBuildIndexParams=/dataimport?command=full-import&clean=true&commit=true
# 重做索引时间间隔的计时开始时间，第一次真正执行的时间=reBuildIndexBeginTime+reBuildIndexInterval*60*1000；
# 两种格式：2012-04-11 03:10:00 或者 03:10:00，后一种会自动补全日期部分为服务启动时的日期
reBuildIndexBeginTime=03:10:00
```



## 控制台

### 查询

- 查询条件

```xml
LOG_ACTION:登录* and PSN_NAME:韩红 AND CREATE_DATE:[2019-02-14T00:00:00Z TO *] 
```

范围查询：

CREATE_DATE:[2019-02-14T00:00:00Z TO *] 

- 过滤条件

过滤条件不会影响排序，且不是必填

```shell
CREATE_DATE:[2019-02-14T19:41:51Z TO *]
```

- 排序条件

```
CREATE_DATE asc,LOG_TYPE desc
```



## 问题

### 时区问题

https://www.cnblogs.com/shoufeng/p/10618571.html

https://www.jianshu.com/p/8f65ffbd5c74

## 参考文档

https://solr.apache.org/guide/6_6/

https://www.w3cschool.cn/solr_doc

https://blog.csdn.net/jiangchao858/article/details/52518190

https://www.cnblogs.com/cblogs/p/solr-tutorial.html

https://www.cnblogs.com/hd3013779515/p/6883603.html