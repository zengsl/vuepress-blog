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

可使用
~~~xml
<!--mybatis 批处理session, executorType设置为BATCH 设置为SIMPLE则关闭了批量的特性-->
<bean id="batchSqlSession" class="org.mybatis.spring.SqlSessionTemplate">
	<constructor-arg name="sqlSessionFactory" ref="sqlSessionFactory"/>
	<constructor-arg name="executorType" value="BATCH"/>
</bean>
~~~

