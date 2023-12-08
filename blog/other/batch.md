---
sidebar: auto
sidebarDepth: 2
---

# 批量插入

## 语法

MySql中可使用

~~~ sql
insert into [tableName] (...) values (...),(...),(...)
~~~

~~~ xml
# MySql中运用
<select id="saveItems" parameterType="java.util.List">
	begin
	<foreach collection="list" item="formMetaItem" index="index" >
		insert into Form_Meta_item(form_code, name, xpath, type)
		values (#{formMetaItem.formCode}, #{formMetaItem.name,jdbcType=VARCHAR}, #{formMetaItem.xpath},
		#{formMetaItem.type,jdbcType=VARCHAR});
	</foreach>
	end;
</select>
~~~

Oracle中可使用

~~~ sql
begin
insert into [tableName] (...) values (...);
insert into [tableName] (...) values (...);
insert into [tableName] (...) values (...);
end;
~~~

~~~ xml
# MySql中运用
<select id="saveItems" parameterType="java.util.List">
insert into Form_Meta_item(form_code, name, xpath, type)
	values
	<foreach collection="list" item="formMetaItem" index="index" separator=",">
		(#{formMetaItem.formCode}, #{formMetaItem.name,jdbcType=VARCHAR}, #{formMetaItem.xpath},
		#{formMetaItem.type,jdbcType=VARCHAR})
	</foreach>
</select>
~~~


## 框架

### Mybatis

可配置一个批处理session

``` xml {4}
<!--mybatis 批处理session, executorType设置为BATCH 设置为SIMPLE则关闭了批量的特性-->
<bean id="batchSqlSession" class="org.mybatis.spring.SqlSessionTemplate">
	<constructor-arg name="sqlSessionFactory" ref="sqlSessionFactory"/>
	<constructor-arg name="executorType" value="BATCH"/>
</bean>

<!--需要注意的是如果不想影响系统中原本的mybatis查询，新增一个batchSqlSession用于批量查询。为了不影响原本系统查询，需要显示的定义一个sqlSessionTemplate，因为SqlSessionDaoSupport会用sqlSessionTemplate覆盖原SqlSessionFactory的配置结果,详情请阅读源码-->

<!--mybatis session 为了防止batchSqlSession覆盖sqlSessionFactory中的session配置，原默认的session配置修改为批量，显示定义sqlSessionTemplate-->
<bean id="sqlSessionTemplate" class="org.mybatis.spring.SqlSessionTemplate">
	<constructor-arg name="sqlSessionFactory" ref="sqlSessionFactory"/>
</bean>
```

使用

``` java {8}
public class UserService {
  private final SqlSession sqlSession;
  public UserService(SqlSession sqlSession) {
    this.sqlSession = sqlSession;
  }
  public void insertUsers(List<User> users) {
    for (User user : users) {
      sqlSession.insert("org.mybatis.spring.sample.mapper.UserMapper.insertUser", user);
    }
  }
}
```

[mybatis-spring文档](https://mybatis.org/spring/zh/sqlsession.html)