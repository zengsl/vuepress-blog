---
category: 
  - 后端
  
tag:
 - BPM
 - 流程引擎
date: 2021-08-22
---
# JBPM4

> 工作内容记录

[[toc]]
## 数据库相关

JBPM4框架提供了默认的数据表

下面列举一些：

~~~ sql
-- 所有的表都是jbpm4_*开头

jbpm4_deployment -- 流程定义表
jbpm4_deployprop -- 流程定义属性表
JBPM4_PROPERTY -- 
jbpm4_lob -- 存储表
JBPM4_JOB -- 定时表
JBPM4_SWIMLANE -- 泳道表
JBPM4_PARTICIPATION -- 参与者表

jbpm4_execution -- 流程实例表
jbpm4_task -- 任务表
jbpm4_variable

jbpm4_hist_task -- 流程任务实例历史表
jbpm4_hist_procinst -- 流程实例历史表
jbpm4_hist_actinst -- 流程活动(节点)实例表
JBPM4_HIST_VAR -- 流程变量（上下文）历史表
JBPM4_HIST_DETAIL  流程历史详细表
~~~

`jbpm4_deployment`和`jbpm4_deployprop`之间的关系

jbpm4_deployment.DBID_关联jbpm4_deployprop.DEPLOYMENT_可以查询到当前流程定义相关到属性，其中KEY_表示属性的key，STRINGVAL_表示属性的值

jbpm4_lob.DEPLOYMENT_关联jbpm4_deployment.DBID_，通过BLOB_VALUE可以查看当前流程定义文件的内容。


## 流程修改问题

记录两个生产上遇到的问题

- 流程图调整

在原流程的基础上将A->B->C 改为 A->B->D->C

由于还存在未走完的老流程，当前状态可能在A或者B（为C已走完的不管）。这些流程当从B往下执行的时候会出现错误

通过 获取流程id

针对有问题的数据，修改jbpm4_execution中的PROCDEFID_字段为正确流程定义中对应的值。

~~~ sql
select t.*,t.rowid from jbpm4_execution t where t.id_ = 'contract.4746';
select t.*,t.rowid from jbpm4_hist_procinst t where t.id_  = 'contract.4746';
select t.*,t.rowid from jbpm4_variable t where t.execution_ = '15002862';
select t.*,t.rowid from jbpm4_task t where t.execution_id_  = 'contract.4746';
select t.*,t.rowid from jbpm4_hist_task t where t.execution_  = 'contract.4746';
select t.*,t.rowid from jbpm4_hist_actinst t where t.execution_  = 'contract.4746';

select t.*,t.rowid from jbpm4_deployment t where t.dbid_  = '15480001';
select t.*,t.rowid from jbpm4_lob t where t.deployment_ = '15480001';
select t.*,t.rowid from jbpm4_deployprop t where t.objname_ = 'contract' and t.key_ ='pdid' and t.stringval_ = 'contract-59' ;
~~~

## 流程定义不一致

流程定义不一致导致报错

科技报告流程在开发和测试环境中均正常，在生产的时候前面某个节点审核报错。由于是后面接手的项目，不清楚前面团队是否在发布版本时出现了问题。

查看当前使用流程是否不是最新流程，将当前的流程定义修改为正确的即可。

查看有问题数据所对应的jbpm4_lob.BLOB_VALUE，发现与开发、测试环境中可以执行的流程数据所对应的流程定义内容是不同的，将此内容更新即可。





## Activiti切换线上流程

根据key_查询获取流程定义ID_：select t.*,t.rowid from act_re_procdef t where t.key_ = 'prp_jsht';

select t.*,t.rowid from act_re_procdef t where t.key_ = 'prp_jsht';

UPDATE act_ru_execution SET PROC_DEF_ID_ = 'prp_jsht:45:1625927' WHERE PROC_DEF_ID_ = 'prp_jsht:32:1539326' AND PROC_INST_ID_ =1623666;
UPDATE act_ru_task SET PROC_DEF_ID_ = 'prp_jsht:45:1625927' WHERE PROC_DEF_ID_ = 'prp_jsht:32:1539326' AND PROC_INST_ID_ =1623666;

> 可用一两条数据尝试一下，如果没有问题就批量修复