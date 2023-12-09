---
category: 
  - 数据库
tag:
  - DB
---
# 概要

默认用户postgres


支持数据类型比较丰富


[](https://www.runoob.com/postgresql/postgresql-with.html)

WITH RECURSIVE t(n) AS (
   VALUES (0)
   UNION ALL
   SELECT SALARY FROM COMPANY WHERE SALARY < 20000
)
SELECT sum(n) FROM t;

