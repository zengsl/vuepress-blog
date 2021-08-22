# Mapper自动刷新

## 实现

- 将`RefreshMapperCache`放置egrant-core模块下的com.iris.egrant.mybatis包中
- 在项目中的applicationContext-appDatabase.xml中增加以下配置

~~~ xml
<bean id="refreshMapperCache" class="com.iris.egrant.mybatis.RefreshMapperCache" >
  <!-- 扫描的映射mapper.xml的文件路径 这个地方要注意mapper的文件，多数据源情况下，只能扫描自己数据源下的mapper,否则会报异常-->
  <property name="mapperLocations">
    <array>
      <value>classpath:/mapper/*Mapper.xml</value>
    </array>
  </property>
  <property name="sqlSessionFactory" ref="sqlSessionFactory"/>
  <!--默认关闭，开发需要开启时改为true-->
  <property name="enable" value="true"/>
</bean>
~~~



## 逻辑描述

- 自动刷新功能默认是关闭的，可以在需要经常调试sql的时候修改xml配置中enable属性开启此功能。系统也可以默认成一直开启，这会损耗一些性能。
- `RefreshMapperCache`会在项目启动的时候创建一个定时任务，定时去刷新mapper，并且此任务只有在开发环境中才会被创建。



## 系统原刷新逻辑

对系统比较了解到同学应该知道，原来系统中是已经实现刷新mapper功能的，具体配置如下：

~~~ xml
		<!-- MyBatis配置 开发环境 -->
<!-- 		<bean id="sqlSessionFactory" class="com.iris.egrant.mybatis.IrisSqlSessionFactoryBean"> -->
		<bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
			<property name="dataSource" ref="dataSource" />
			<property name="configLocation" value="classpath:/mapper/Configuration.xml" />
			<property name="mapperLocations" value="classpath:/mapper/*Mapper.xml" />
		</bean>
~~~

不推荐使用的原因：

- `IrisSqlSessionFactoryBean`是重写了mybatis自带的`SqlSessionFactoryBean`,大体思路就是每次查sql的时候都去加载和解析mapper，性能比较差。当我们在调整查询功能性能的时候，无法准确判断sql性能。如果开发把`IrisSqlSessionFactoryBean`配置打开并且提交到生产环境之后，则会导致内存溢出引发的系统宕机，后果很严重。

- 之前的系统使用mybatis-spring:1.0.0时，无法使用mybatis的sql片段功能，故将其升级至mybatis-spring:1.0.2。升级之后会导致IrisSqlSessionFactoryBean执行报错

