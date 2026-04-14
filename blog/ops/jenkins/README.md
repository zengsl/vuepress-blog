---
category:
  - Devops
  - jenkins
tag:
  - jenkins
  - plugin
description: Jenkins Wechat/Wecoom Plugin  - Jenkins微信/企业微信通知插件，支持pipeline管道
head:
   - - meta
     - name: keywords
       content: Jenkins,微信,企业微信,插件,Wechat,WeCom,通知,wechat,wecom,plugin,notification
date: 2025-02-25
---

# Jenkins

> 官方文档感觉有点杂乱

:star: 自己封装的插件，解决在管道中发版本时无法发送预构建消息以及携带更多信息：[https://github.com/zengsl/jenkins-plugin-qy-wechat-notification-plus](https://github.com/zengsl/jenkins-plugin-qy-wechat-notification-plus)

## 插件开发

 [https://github.com/jenkinsci/archetypes#usage](https://github.com/jenkinsci/archetypes#usage)

### 依赖

[https://github.com/jenkinsci/plugin-pom#usage](https://github.com/jenkinsci/plugin-pom#usage)

[https://github.com/jenkinsci/bom#usage](https://github.com/jenkinsci/bom#usage)

### 创建项目

Maven 骨架创建项目结构

```shell title="Maven 骨架"
mvn archetype:generate -B -DarchetypeGroupId=io.jenkins.archetypes -DarchetypeArtifactId=empty-plugin -DhostOnJenkinsGitHub=true -DarchetypeVersion=1.20 -DartifactId=somefeature
```

### 创建pipeline插件

[https://www.jenkins.io/doc/developer/tutorial/create/](https://www.jenkins.io/doc/developer/tutorial/create/)


### 参考资料

[https://github.com/jenkinsci/workflow-step-api-plugin/blob/master/README.md](https://github.com/jenkinsci/workflow-step-api-plugin/blob/master/README.md)

[https://www.jenkins.io/doc/developer/plugin-development/usage-in-plugins/](https://www.jenkins.io/doc/developer/plugin-development/usage-in-plugins/)