---
category: 
  - 后端
tag:
  - 定时任务
  - Quartz
---
# Quartz


## 核心概念

1. Job

2. JobDetail

3. Trigger

4. Scheduler


## JobStore

### RAMJobStore

### JDBC JobStore

创建表后，在配置和启动JDBCJobStore之前，您还有一个重要的决定。您需要确定应用程序需要哪种类型的事务。如果您不需要将调度命令（例如添加和删除triggers）绑定到其他事务，那么可以通过使用`JobStoreTX`作为JobStore 来管理事务（这是最常见的选择）。

如果您需要Quartz与其他事务（即J2EE应用程序服务器）一起工作，那么您应该使用`JobStoreCMT` - 在这种情况下，Quartz将让应用程序服务器容器管理事务。