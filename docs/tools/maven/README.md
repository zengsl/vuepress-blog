# maven install 报错

通过maven install -X 进入调试模式，查看详细信息


~~~ java
[ERROR] 
[ERROR] For more information about the errors and possible solutions, please read the following articles:
[ERROR] [Help 1] http://cwiki.apache.org/confluence/display/MAVEN/PluginResolutionException
 ✘ zengsl@localhost  ~/iriswork/egrant-ahkjt-demo/modules/parent   /iriswork/tools/maven/apache-maven-3.2.5/bin/mvn install -X
Apache Maven 3.2.5 (12a6b3acb947671f09b81f49094c53f426d8cea1; 2014-12-15T01:29:23+08:00)
Maven home: /iriswork/tools/maven/apache-maven-3.2.5
Java version: 1.6.0_65, vendor: Apple Inc.
Java home: /Library/Java/JavaVirtualMachines/1.6.0.jdk/Contents/Home
Default locale: zh_CN, platform encoding: EUC_CN
OS name: "mac os x", version: "10.15.6", arch: "x86_64", family: "mac"
[INFO] Error stacktraces are turned on.
[DEBUG] Reading global settings from /iriswork/tools/maven/apache-maven-3.2.5/conf/settings.xml
[DEBUG] Reading user settings from /Users/zengsl/.m2/settings.xml
[DEBUG] Using local repository at /Users/zengsl/iriswork/egrant-ahkjt-demo/modules/parent/$/Users/zengsl/.m2/repositoryDemo
[DEBUG] Using manager EnhancedLocalRepositoryManager with priority 10.0 for /Users/zengsl/iriswork/egrant-ahkjt-demo/modules/parent/$/Users/zengsl/.m2/repositoryDemo
[INFO] Scanning for projects...
[DEBUG] Using mirror alimaven (https://maven.aliyun.com/repository/public/) for central (https://repo.maven.apache.org/maven2).
[DEBUG] Extension realms for project com.iris:egrant-parent:pom:1.0.0: (none)
[DEBUG] Looking up lifecyle mappings for packaging pom from ClassRealm[plexus.core, parent: null]
[WARNING] 
[WARNING] Some problems were encountered while building the effective model for com.iris:egrant-parent:pom:1.0.0
[WARNING] 'dependencyManagement.dependencies.dependency.(groupId:artifactId:type:classifier)' must be unique: org.apache.commons:commons-lang3:jar -> duplicate declaration of version 3.1 @ line 811, column 16
[WARNING] 'dependencyManagement.dependencies.dependency.(groupId:artifactId:type:classifier)' must be unique: commons-collections:commons-collections:jar -> duplicate declaration of version 3.2.1 @ line 816, column 16
[WARNING] 'dependencyManagement.dependencies.dependency.(groupId:artifactId:type:classifier)' must be unique: commons-codec:commons-codec:jar -> duplicate declaration of version 1.6 @ line 827, column 16
[WARNING] 'dependencyManagement.dependencies.dependency.(groupId:artifactId:type:classifier)' must be unique: commons-io:commons-io:jar -> duplicate declaration of version 2.0.1 @ line 832, column 16
[WARNING] 'dependencyManagement.dependencies.dependency.(groupId:artifactId:type:classifier)' must be unique: commons-validator:commons-validator:jar -> duplicate declaration of version 1.4.0 @ line 837, column 16
[WARNING] 'dependencyManagement.dependencies.dependency.(groupId:artifactId:type:classifier)' must be unique: net.sf.barcode4j:barcode4j-light:jar -> duplicate declaration of version 2.0 @ line 1144, column 16
[WARNING] 'dependencyManagement.dependencies.dependency.(groupId:artifactId:type:classifier)' must be unique: avalon-framework:avalon-framework-impl:jar -> duplicate declaration of version 4.2.0 @ line 1149, column 16
[WARNING] 
[WARNING] It is highly recommended to fix these problems because they threaten the stability of your build.
[WARNING] 
[WARNING] For this reason, future Maven versions might no longer support building such malformed projects.
[WARNING] 
[DEBUG] === REACTOR BUILD PLAN ================================================
[DEBUG] Project: com.iris:egrant-parent:pom:1.0.0
[DEBUG] Tasks:   [install]
[DEBUG] Style:   Regular
[DEBUG] =======================================================================
[INFO]                                                                         
[INFO] ------------------------------------------------------------------------
[INFO] Building Egrant's Parent pom.xml 1.0.0
[INFO] ------------------------------------------------------------------------
[DEBUG] Lifecycle default -> [validate, initialize, generate-sources, process-sources, generate-resources, process-resources, compile, process-classes, generate-test-sources, process-test-sources, generate-test-resources, process-test-resources, test-compile, process-test-classes, test, prepare-package, package, pre-integration-test, integration-test, post-integration-test, verify, install, deploy]
[DEBUG] Lifecycle clean -> [pre-clean, clean, post-clean]
[DEBUG] Lifecycle site -> [pre-site, site, post-site, site-deploy]
[DEBUG] Using transporter WagonTransporter with priority -1.0 for https://maven.aliyun.com/repository/public/
[DEBUG] Using connector BasicRepositoryConnector with priority 0.0 for https://maven.aliyun.com/repository/public/
Downloading: https://maven.aliyun.com/repository/public/org/apache/maven/plugins/maven-install-plugin/2.3.1/maven-install-plugin-2.3.1.pom
[DEBUG] Writing tracking file /Users/zengsl/iriswork/egrant-ahkjt-demo/modules/parent/$/Users/zengsl/.m2/repositoryDemo/org/apache/maven/plugins/maven-install-plugin/2.3.1/maven-install-plugin-2.3.1.pom.lastUpdated
[INFO] ------------------------------------------------------------------------
[INFO] BUILD FAILURE
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 0.471 s
[INFO] Finished at: 2020-12-01T11:53:10+08:00
[INFO] Final Memory: 3M/81M
[INFO] ------------------------------------------------------------------------
[ERROR] Plugin org.apache.maven.plugins:maven-install-plugin:2.3.1 or one of its dependencies could not be resolved: Failed to read artifact descriptor for org.apache.maven.plugins:maven-install-plugin:jar:2.3.1: Could not transfer artifact org.apache.maven.plugins:maven-install-plugin:pom:2.3.1 from/to alimaven (https://maven.aliyun.com/repository/public/): java.lang.RuntimeException: Unexpected error: java.security.InvalidAlgorithmParameterException: the trustAnchors parameter must be non-empty -> [Help 1]
org.apache.maven.plugin.PluginResolutionException: Plugin org.apache.maven.plugins:maven-install-plugin:2.3.1 or one of its dependencies could not be resolved: Failed to read artifact descriptor for org.apache.maven.plugins:maven-install-plugin:jar:2.3.1
        at org.apache.maven.plugin.internal.DefaultPluginDependenciesResolver.resolve(DefaultPluginDependenciesResolver.java:122)
        at org.apache.maven.plugin.internal.DefaultMavenPluginManager.getPluginDescriptor(DefaultMavenPluginManager.java:150)
        at org.apache.maven.plugin.internal.DefaultMavenPluginManager.getMojoDescriptor(DefaultMavenPluginManager.java:269)
        at org.apache.maven.plugin.DefaultBuildPluginManager.getMojoDescriptor(DefaultBuildPluginManager.java:239)
        at org.apache.maven.lifecycle.internal.DefaultLifecycleExecutionPlanCalculator.setupMojoExecution(DefaultLifecycleExecutionPlanCalculator.java:158)
        at org.apache.maven.lifecycle.internal.DefaultLifecycleExecutionPlanCalculator.setupMojoExecutions(DefaultLifecycleExecutionPlanCalculator.java:145)
        at org.apache.maven.lifecycle.internal.DefaultLifecycleExecutionPlanCalculator.calculateExecutionPlan(DefaultLifecycleExecutionPlanCalculator.java:122)
        at org.apache.maven.lifecycle.internal.DefaultLifecycleExecutionPlanCalculator.calculateExecutionPlan(DefaultLifecycleExecutionPlanCalculator.java:135)
        at org.apache.maven.lifecycle.internal.builder.BuilderCommon.resolveBuildPlan(BuilderCommon.java:97)
        at org.apache.maven.lifecycle.internal.LifecycleModuleBuilder.buildProject(LifecycleModuleBuilder.java:109)
        at org.apache.maven.lifecycle.internal.LifecycleModuleBuilder.buildProject(LifecycleModuleBuilder.java:80)
        at org.apache.maven.lifecycle.internal.builder.singlethreaded.SingleThreadedBuilder.build(SingleThreadedBuilder.java:51)
        at org.apache.maven.lifecycle.internal.LifecycleStarter.execute(LifecycleStarter.java:120)
        at org.apache.maven.DefaultMaven.doExecute(DefaultMaven.java:355)
        at org.apache.maven.DefaultMaven.execute(DefaultMaven.java:155)
        at org.apache.maven.cli.MavenCli.execute(MavenCli.java:584)
        at org.apache.maven.cli.MavenCli.doMain(MavenCli.java:216)
        at org.apache.maven.cli.MavenCli.main(MavenCli.java:160)
        at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
        at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:39)
        at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:25)
        at java.lang.reflect.Method.invoke(Method.java:597)
        at org.codehaus.plexus.classworlds.launcher.Launcher.launchEnhanced(Launcher.java:289)
        at org.codehaus.plexus.classworlds.launcher.Launcher.launch(Launcher.java:229)
        at org.codehaus.plexus.classworlds.launcher.Launcher.mainWithExitCode(Launcher.java:415)
        at org.codehaus.plexus.classworlds.launcher.Launcher.main(Launcher.java:356)
Caused by: org.eclipse.aether.resolution.ArtifactDescriptorException: Failed to read artifact descriptor for org.apache.maven.plugins:maven-install-plugin:jar:2.3.1
        at org.apache.maven.repository.internal.DefaultArtifactDescriptorReader.loadPom(DefaultArtifactDescriptorReader.java:302)
        at org.apache.maven.repository.internal.DefaultArtifactDescriptorReader.readArtifactDescriptor(DefaultArtifactDescriptorReader.java:217)
        at org.eclipse.aether.internal.impl.DefaultRepositorySystem.readArtifactDescriptor(DefaultRepositorySystem.java:287)
        at org.apache.maven.plugin.internal.DefaultPluginDependenciesResolver.resolve(DefaultPluginDependenciesResolver.java:108)
        ... 25 more
Caused by: org.eclipse.aether.resolution.ArtifactResolutionException: Could not transfer artifact org.apache.maven.plugins:maven-install-plugin:pom:2.3.1 from/to alimaven (https://maven.aliyun.com/repository/public/): java.lang.RuntimeException: Unexpected error: java.security.InvalidAlgorithmParameterException: the trustAnchors parameter must be non-empty
        at org.eclipse.aether.internal.impl.DefaultArtifactResolver.resolve(DefaultArtifactResolver.java:444)
        at org.eclipse.aether.internal.impl.DefaultArtifactResolver.resolveArtifacts(DefaultArtifactResolver.java:246)
        at org.eclipse.aether.internal.impl.DefaultArtifactResolver.resolveArtifact(DefaultArtifactResolver.java:223)
        at org.apache.maven.repository.internal.DefaultArtifactDescriptorReader.loadPom(DefaultArtifactDescriptorReader.java:287)
        ... 28 more
Caused by: org.eclipse.aether.transfer.ArtifactTransferException: Could not transfer artifact org.apache.maven.plugins:maven-install-plugin:pom:2.3.1 from/to alimaven (https://maven.aliyun.com/repository/public/): java.lang.RuntimeException: Unexpected error: java.security.InvalidAlgorithmParameterException: the trustAnchors parameter must be non-empty
        at org.eclipse.aether.connector.basic.ArtifactTransportListener.transferFailed(ArtifactTransportListener.java:43)
        at org.eclipse.aether.connector.basic.BasicRepositoryConnector$TaskRunner.run(BasicRepositoryConnector.java:355)
        at org.eclipse.aether.util.concurrency.RunnableErrorForwarder$1.run(RunnableErrorForwarder.java:67)
        at org.eclipse.aether.connector.basic.BasicRepositoryConnector$DirectExecutor.execute(BasicRepositoryConnector.java:581)
        at org.eclipse.aether.connector.basic.BasicRepositoryConnector.get(BasicRepositoryConnector.java:249)
        at org.eclipse.aether.internal.impl.DefaultArtifactResolver.performDownloads(DefaultArtifactResolver.java:520)
        at org.eclipse.aether.internal.impl.DefaultArtifactResolver.resolve(DefaultArtifactResolver.java:421)
        ... 31 more
Caused by: org.apache.maven.wagon.TransferFailedException: java.lang.RuntimeException: Unexpected error: java.security.InvalidAlgorithmParameterException: the trustAnchors parameter must be non-empty
        at org.apache.maven.wagon.providers.http.AbstractHttpClientWagon.fillInputData(AbstractHttpClientWagon.java:1085)
        at org.apache.maven.wagon.providers.http.AbstractHttpClientWagon.fillInputData(AbstractHttpClientWagon.java:977)
        at org.apache.maven.wagon.StreamWagon.getInputStream(StreamWagon.java:116)
        at org.apache.maven.wagon.StreamWagon.getIfNewer(StreamWagon.java:88)
        at org.apache.maven.wagon.StreamWagon.get(StreamWagon.java:61)
        at org.eclipse.aether.transport.wagon.WagonTransporter$GetTaskRunner.run(WagonTransporter.java:560)
        at org.eclipse.aether.transport.wagon.WagonTransporter.execute(WagonTransporter.java:427)
        at org.eclipse.aether.transport.wagon.WagonTransporter.get(WagonTransporter.java:404)
        at org.eclipse.aether.connector.basic.BasicRepositoryConnector$GetTaskRunner.runTask(BasicRepositoryConnector.java:447)
        at org.eclipse.aether.connector.basic.BasicRepositoryConnector$TaskRunner.run(BasicRepositoryConnector.java:350)
        ... 36 more
Caused by: javax.net.ssl.SSLException: java.lang.RuntimeException: Unexpected error: java.security.InvalidAlgorithmParameterException: the trustAnchors parameter must be non-empty
        at com.sun.net.ssl.internal.ssl.Alerts.getSSLException(Alerts.java:190)
        at com.sun.net.ssl.internal.ssl.SSLSocketImpl.fatal(SSLSocketImpl.java:1747)
        at com.sun.net.ssl.internal.ssl.SSLSocketImpl.fatal(SSLSocketImpl.java:1708)
        at com.sun.net.ssl.internal.ssl.SSLSocketImpl.handleException(SSLSocketImpl.java:1691)
        at com.sun.net.ssl.internal.ssl.SSLSocketImpl.startHandshake(SSLSocketImpl.java:1222)
        at com.sun.net.ssl.internal.ssl.SSLSocketImpl.startHandshake(SSLSocketImpl.java:1199)
        at org.apache.maven.wagon.providers.http.httpclient.conn.ssl.SSLConnectionSocketFactory.createLayeredSocket(SSLConnectionSocketFactory.java:275)
        at org.apache.maven.wagon.providers.http.httpclient.conn.ssl.SSLConnectionSocketFactory.connectSocket(SSLConnectionSocketFactory.java:254)
        at org.apache.maven.wagon.providers.http.httpclient.impl.conn.HttpClientConnectionOperator.connect(HttpClientConnectionOperator.java:123)
        at org.apache.maven.wagon.providers.http.httpclient.impl.conn.PoolingHttpClientConnectionManager.connect(PoolingHttpClientConnectionManager.java:318)
        at org.apache.maven.wagon.providers.http.httpclient.impl.execchain.MainClientExec.establishRoute(MainClientExec.java:363)
        at org.apache.maven.wagon.providers.http.httpclient.impl.execchain.MainClientExec.execute(MainClientExec.java:219)
        at org.apache.maven.wagon.providers.http.httpclient.impl.execchain.ProtocolExec.execute(ProtocolExec.java:195)
        at org.apache.maven.wagon.providers.http.httpclient.impl.execchain.RetryExec.execute(RetryExec.java:86)
        at org.apache.maven.wagon.providers.http.httpclient.impl.execchain.RedirectExec.execute(RedirectExec.java:108)
        at org.apache.maven.wagon.providers.http.httpclient.impl.client.InternalHttpClient.doExecute(InternalHttpClient.java:184)
        at org.apache.maven.wagon.providers.http.httpclient.impl.client.CloseableHttpClient.execute(CloseableHttpClient.java:82)
        at org.apache.maven.wagon.providers.http.AbstractHttpClientWagon.execute(AbstractHttpClientWagon.java:848)
        at org.apache.maven.wagon.providers.http.AbstractHttpClientWagon.fillInputData(AbstractHttpClientWagon.java:1000)
        ... 45 more
Caused by: java.lang.RuntimeException: Unexpected error: java.security.InvalidAlgorithmParameterException: the trustAnchors parameter must be non-empty
        at sun.security.validator.PKIXValidator.<init>(PKIXValidator.java:57)
        at sun.security.validator.Validator.getInstance(Validator.java:161)
        at com.sun.net.ssl.internal.ssl.X509TrustManagerImpl.getValidator(X509TrustManagerImpl.java:108)
        at com.sun.net.ssl.internal.ssl.X509TrustManagerImpl.checkServerTrusted(X509TrustManagerImpl.java:204)
        at com.sun.net.ssl.internal.ssl.X509TrustManagerImpl.checkServerTrusted(X509TrustManagerImpl.java:249)
        at com.sun.net.ssl.internal.ssl.ClientHandshaker.serverCertificate(ClientHandshaker.java:1188)
        at com.sun.net.ssl.internal.ssl.ClientHandshaker.processMessage(ClientHandshaker.java:135)
        at com.sun.net.ssl.internal.ssl.Handshaker.processLoop(Handshaker.java:593)
        at com.sun.net.ssl.internal.ssl.Handshaker.process_record(Handshaker.java:529)
        at com.sun.net.ssl.internal.ssl.SSLSocketImpl.readRecord(SSLSocketImpl.java:943)
        at com.sun.net.ssl.internal.ssl.SSLSocketImpl.performInitialHandshake(SSLSocketImpl.java:1188)
        at com.sun.net.ssl.internal.ssl.SSLSocketImpl.startHandshake(SSLSocketImpl.java:1215)
        ... 59 more
Caused by: java.security.InvalidAlgorithmParameterException: the trustAnchors parameter must be non-empty
        at java.security.cert.PKIXParameters.setTrustAnchors(PKIXParameters.java:183)
        at java.security.cert.PKIXParameters.<init>(PKIXParameters.java:103)
        at java.security.cert.PKIXBuilderParameters.<init>(PKIXBuilderParameters.java:87)
        at sun.security.validator.PKIXValidator.<init>(PKIXValidator.java:55)
        ... 70 more
[ERROR] 
[ERROR] 
[ERROR] For more information about the errors and possible solutions, please read the following articles:
[ERROR] [Help 1] http://cwiki.apache.org/confluence/display/MAVEN/PluginResolutionException

~~~

看上去好像是jdk与ssl之间的问题