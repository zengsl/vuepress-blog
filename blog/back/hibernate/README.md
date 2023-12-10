---
date: 2022-01-14
---
# Hibernate知识点

## 结果转换器(Map)

使用hibernate时通过设置ResultTransformer为`Transformers.ALIAS_TO_ENTITY_MAP`将查询出来的行记录转换为HashMap存储

```java
String selectAddressSql = "select t.area_no as code  ,t.name ,t.parent_no as parent_code ,t.type as levels from const_area t order by t.seq_no";
            list = session.createSQLQuery(selectAddressSql).setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP).list();
```

先看下`Transformers.ALIAS_TO_ENTITY_MAP`实现的核心代码

``` java
// AliasToEntityMapResultTransformer中转换的核心代码
@Override
	public Object transformTuple(Object[] tuple, String[] aliases) {
		Map result = new HashMap(tuple.length);
		for ( int i=0; i<tuple.length; i++ ) {
			String alias = aliases[i];
			if ( alias!=null ) {
				result.put( alias, tuple[i] );
			}
		}
		return result;
	}
```

其实就是按照传入的参数aliases（别名）将结果数据依次放入`HashMap`中，aliases中存放的值就作为key。

从这里引发出两个问题：

1. 什么时候调用`AliasToEntityMapResultTransformer.transformTuple`方法
2. aliases数组从何获取？

### 何时调用transformTuple方法？

直接上代码！

![image-20211231140614598](https://gitee.com/zengsl/picBed/raw/master/img/2021/12/20211231140614.png)

`HolderInstantiator`的instantiate方法完成了转换工作，`HolderInstantiator`中保存了我们**自定义**的`ResultTransformer`和别名数组，别名数组存放在queryReturnAliases中。

从下面的代码可以发现别名是从内部方法getReturnAliasesForTransformer中通过返回当前类`CustomLoader`的成员变量transformerAliases保存的。

```java
HolderInstantiator holderInstantiator = HolderInstantiator.getHolderInstantiator((ResultTransformer)null, resultTransformer, this.getReturnAliasesForTransformer());

```





### 从何获取aliases数组？

先做一个猜想，应该是具体数据库驱动中控制。

- 执行查询的过程获取ResultSet中会调用JDBC进行数据库查询，其中statement中包含了数据的元信息。

![image-20211231141637667](https://gitee.com/zengsl/picBed/raw/master/img/2021/12/20211231141637.png)

![image-20211231142330389](https://gitee.com/zengsl/picBed/raw/master/img/2021/12/20211231142330.png)

- 获取ResultSet之后会对结果集进行进一步的处理

![image-20211231142515904](https://gitee.com/zengsl/picBed/raw/master/img/2021/12/20211231142516.png)

![image-20211231142730860](https://gitee.com/zengsl/picBed/raw/master/img/2021/12/20211231142730.png)

这里就是`CustomLoader`的成员变量transformerAliases的初始化时机的位置，**其实就是从JDBC获取ResultSet时创建的元数据中存放的statement中的accessors中对应的COLUMN_NAME**

上述的`resultProcessor.performDiscovery(metadata, types, aliases)`

```java
public void performDiscovery(JdbcResultMetadata metadata, List<Type> types, List<String> aliases) throws SQLException {
        if (this.alias == null) {
            // 从元数据中获取到别名，这里的元数据也就是之前提到的JDBC驱动中获取ResultSet时创建的
          	// 这行代码最终就是从statement中获取到accessors中对应的COLUMN_NAME
            this.alias = metadata.getColumnName(this.position);
        } else if (this.position < 0) {
            this.position = metadata.resolveColumnPosition(this.alias);
        }

        if (this.type == null) {
            this.type = metadata.getHibernateType(this.position);
        }

        types.add(this.type);
        aliases.add(this.alias);
    }
```

