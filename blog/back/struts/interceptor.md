---
order: 1
category: 
  - 后端
tag:
 - Struts
 - 拦截器
date: 2020-09-23
---
# 拦截器

::: tip
本文针对Struts2拦截器进行描述，内置拦截器定义在struts-default.xml中。
:::

## 介绍

拦截器在概念上与servlet过滤器或JDK代理类相同。拦截器允许横切功能，把action以及框架分开实现。你可以使用拦截器实现以下操作：

在调用action之前提供预处理逻辑。

在调用action后提供后处理逻辑。

捕获异常，以便可以执行备用处理。

Struts2框架中提供的许多功能都是使用拦截器实现的，包括异常处理，文件上传，生命周期回调和验证等。事实上，由于Struts2将其大部分功能基于拦截器，因此不太可能为每个action分配7个或8个拦截器。

下面是几个常用的拦截器配置标签


`<interceptors>` 可配置需要使用的拦截器

`<interceptor>` 定义拦截器

`<interceptor-stack>` 设置拦截器栈，也可以当作拦截器进行引用

`<interceptor-ref>` 引用拦截器

`<default-interceptor-ref>` 设置默认的拦截器引用

## 使用

在struts.xml定义的pacakage中设置`<interceptors>`，里面可以包含所需要的`<interceptor>`拦截器，` <interceptor-ref>`拦截器引用以及 `<interceptor-stack>`拦截器栈


~~~ xml
// struts.xml
<package name="crud-default" extends="convention-default">
<interceptors>

	<!-- 自定义拦截 -->
	<interceptor name="iris-i18n" class="xxxx"/>
	
	<interceptor-stack name="iris-paramsPrepareParamsStack">
		<interceptor-ref name="exception"/>
		<interceptor-ref name="alias"/>
	   .
	   .
	   .
	</interceptor-stack>
	
	<interceptor-stack name="iris-defaultStack">
		<interceptor-ref name="exception"/>
		<interceptor-ref name="alias"/>
		.
		.
		.
	</interceptor-stack>
	
	<!--
		基于paramsPrepareParamsStack, 增加store
		interceptor保证actionMessage在redirect后不会丢失
	-->
	<interceptor-stack name="crudStack">

		<interceptor-ref name="store">
			<param name="operationMode">AUTOMATIC</param>
		</interceptor-ref>
		<interceptor-ref name="iris-paramsPrepareParamsStack" />
		
		<interceptor-ref name="iris-defaultStack" />
		<!-- 截取异常日志信息方便跟踪 -->
		<interceptor-ref name="exceptionLog" />


	</interceptor-stack>


	<interceptor-stack name="tokenCrudStack">
		<interceptor-ref name="crudStack"/>
		<interceptor-ref name="token"/>
	</interceptor-stack>
</interceptors>

<default-interceptor-ref name="crudStack" />
.
.
.

</package>

<!-- 加载子文件 -->
<include file="struts-*.xml"></include>
~~~

配置package中可以通过extends来集成

我们一般会将不同的功能模块拆分为不同的struts-xxxx.xml子文件

在子文件中配置的package可以通过extends来继承struts.xml中定义的全局package，这样当前包就继承来全局package里面的所有配置，当然也包含了所定义和引用的拦截器。

package下的action自然也会被这些拦截器进行拦截，当然action中也可以直接通过`<interceptor-ref>`来引用拦截器。

Struts在处理请求的时候会根据从`PackageConfig`中获取到`ActionConfig`，然后从后者中获取到interceptors的内容，最后进行拦截操作。

针对拦截器而言，既然package中能够继承或者配置拦截器同时action又可以自行引用，那么他们的优先级是什么呢？问题的关键在于理解`ActionConfig`是如何来进行[初始化](#初始化)的。

## 初始化


`StrutsListener`是struts2的初始化入口，核心代码如下：

~~~ java
 public void contextInitialized(ServletContextEvent sce) {
        InitOperations init = new InitOperations();
        Dispatcher dispatcher = null;
        try {
            ListenerHostConfig config = new ListenerHostConfig(sce.getServletContext());
            // 初始化内置日志记录
			init.initLogging(config);
			// 初始化分发器
            dispatcher = init.initDispatcher(config);
			// 初始化静态内容加载器
            init.initStaticContentLoader(config, dispatcher);

            prepare = new PrepareOperations(dispatcher);
            sce.getServletContext().setAttribute(StrutsStatics.SERVLET_DISPATCHER, dispatcher);
        } finally {
            if (dispatcher != null) {
                dispatcher.cleanUpAfterInit();
            }
            init.cleanup();
        }
    }
~~~

我们所关心的拦截器加载过程就在初始化分发器`init.initDispatcher(config)`的过程中，下面针对拦截器的初始化跟踪下源码观察分发器初始化过程。

~~~ java
// InitOperations
/**
 * Creates and initializes the dispatcher
 */
public Dispatcher initDispatcher( HostConfig filterConfig ) {
	Dispatcher dispatcher = createDispatcher(filterConfig);
	// 初始化拦截器关键代码，调用Dispatcher的init方法
	dispatcher.init();
	return dispatcher;
}
~~~

`Dispatcher`中的`init()`方法中调用了私有方法`init_PreloadConfiguration()`，该私有方法中调用了获取容器方法`getContainer()`

在`getContainer()`中使用`ConfigurationManager`通过`getConfiguration()`的获取了配置信息`Configuration`的实例config，这里获取的配置信息就包含了包相关的信息

~~~ java
// Dispatcher
/**
 * Load configurations, including both XML and zero-configuration strategies,
 * and update optional settings, including whether to reload configurations and resource files.
 */
public void init() {

	if (configurationManager == null) {
		configurationManager = createConfigurationManager(DefaultBeanSelectionProvider.DEFAULT_BEAN_NAME);
	}

	try {
		init_FileManager();
		init_DefaultProperties(); // [1]
		init_TraditionalXmlConfigurations(); // [2]
		init_LegacyStrutsProperties(); // [3]
		init_CustomConfigurationProviders(); // [5]
		init_FilterInitParameters() ; // [6]
		init_AliasStandardObjects() ; // [7]
		
		// 初始化拦截器关键代码，调用Dispatcher的init方法
		Container container = init_PreloadConfiguration();
		container.inject(this);
		init_CheckWebLogicWorkaround(container);

		if (!dispatcherListeners.isEmpty()) {
			for (DispatcherListener l : dispatcherListeners) {
				l.dispatcherInitialized(this);
			}
		}
		errorHandler.init(servletContext);

	} catch (Exception ex) {
		if (LOG.isErrorEnabled())
			LOG.error("Dispatcher initialization failed", ex);
		throw new StrutsException(ex);
	}
}


private Container init_PreloadConfiguration() {
	// 初始化拦截器关键代码，调用Dispatcher的init方法
	Container container = getContainer();

	boolean reloadi18n = Boolean.valueOf(container.getInstance(String.class, StrutsConstants.STRUTS_I18N_RELOAD));
	LocalizedTextUtil.setReloadBundles(reloadi18n);

	boolean devMode = Boolean.valueOf(container.getInstance(String.class, StrutsConstants.STRUTS_DEVMODE));
	LocalizedTextUtil.setDevMode(devMode);

	return container;
}

public Container getContainer() {
	if (ContainerHolder.get() != null) {
		return ContainerHolder.get();
	}
	ConfigurationManager mgr = getConfigurationManager();
	if (mgr == null) {
		throw new IllegalStateException("The configuration manager shouldn't be null");
	} else {
		// 初始化拦截器关键代码，调用Dispatcher的init方法
		Configuration config = mgr.getConfiguration();
		if (config == null) {
			throw new IllegalStateException("Unable to load configuration");
		} else {
			Container container = config.getContainer();
			ContainerHolder.store(container);
			return container;
		}
	}
}
~~~

`getConfiguration()`中调用`Configuration`对象（DefaultConfiguration）的`reloadContainer`方法来进行容器加载包含了`Package`的初始化工作。

~~~ java
public synchronized Configuration getConfiguration() {
	if (configuration == null) {
		setConfiguration(createConfiguration(defaultFrameworkBeanName));
		try {
			configuration.reloadContainer(getContainerProviders());
		} catch (ConfigurationException e) {
			setConfiguration(null);
			throw new ConfigurationException("Unable to load configuration.", e);
		}
	} else {
		conditionalReload();
	}

	return configuration;
}
~~~

### 重载容器

`DefaultConfiguration`中`reloadContainer`中较为关键的代码是`((PackageProvider)containerProvider).loadPackages()`和`rebuildRuntimeConfiguration()`，完成了“包加载”和“重新构建运行时配置”。

~~~ java
public synchronized List<PackageProvider> reloadContainer(List<ContainerProvider> providers) throws ConfigurationException {
        //... 代码省略

        ActionContext oldContext = ActionContext.getContext();
        try {
            // Set the bootstrap container for the purposes of factory creation

            setContext(bootstrap);
            container = builder.create(false);
            setContext(container);
            objectFactory = container.getInstance(ObjectFactory.class);

            // Process the configuration providers first
            for (final ContainerProvider containerProvider : providers)
            {
                if (containerProvider instanceof PackageProvider) {
                    container.inject(containerProvider);
					// 加载包信息
                    ((PackageProvider)containerProvider).loadPackages();
                    packageProviders.add((PackageProvider)containerProvider);
                }
            }

            // Then process any package providers from the plugins
            Set<String> packageProviderNames = container.getInstanceNames(PackageProvider.class);
            for (String name : packageProviderNames) {
                PackageProvider provider = container.getInstance(PackageProvider.class, name);
                provider.init(this);
                provider.loadPackages();
                packageProviders.add(provider);
            }
			// 重新构建运行配置
            rebuildRuntimeConfiguration();
        } finally {
            if (oldContext == null) {
                ActionContext.setContext(null);
            }
        }
        return packageProviders;
    }
~~~

### 包加载

`((PackageProvider)containerProvider).loadPackages()`这里的containerProvider是`StrutsXmlConfigurationProvider`，内部又调用了`XmlConfigurationProvider`的`loadPackages()`方法完成包加载工作。

`loadPackages()`中调用的`addPackage`方法，其中包含了拦截器、Result和action等加载逻辑。

包信息加载完成之后，这时已经生成了`PackageConfig`信息集合，`PackageConfig`中包含了拦截器和`ActionConfig`，同时`ActionConfig`也是包含拦截器。

上文中有提到Struts2在分发请求的时获取拦截器是根据`ActionConfig`中的拦截器来执行拦截操作的，那么那些没有单独配置interceptor的action是怎么从package中获取拦截器信息并且加入到`ActionConfig`中的呢？一切的答案都在[rebuildRuntimeConfiguration()](#重新构建运行时配置)

~~~ java
// StrutsXmlConfigurationProvider
@Override
public void loadPackages() {
	ActionContext ctx = ActionContext.getContext();
	ctx.put(reloadKey, Boolean.TRUE);
	super.loadPackages();
}


// XmlConfigurationProvider
public void loadPackages() throws ConfigurationException {
	List<Element> reloads = new ArrayList<Element>();
	verifyPackageStructure();

	for (Document doc : documents) {
		Element rootElement = doc.getDocumentElement();
		NodeList children = rootElement.getChildNodes();
		int childSize = children.getLength();

		for (int i = 0; i < childSize; i++) {
			Node childNode = children.item(i);

			if (childNode instanceof Element) {
				Element child = (Element) childNode;

				final String nodeName = child.getNodeName();

				if ("package".equals(nodeName)) {
					// 增加包信息，重点！
					PackageConfig cfg = addPackage(child);
					if (cfg.isNeedsRefresh()) {
						reloads.add(child);
					}
				}
			}
		}
		loadExtraConfiguration(doc);
	}

	if (reloads.size() > 0) {
		reloadRequiredPackages(reloads);
	}

	for (Document doc : documents) {
		loadExtraConfiguration(doc);
	}

	documents.clear();
	declaredPackages.clear();
	configuration = null;
}


/**
 * Create a PackageConfig from an XML element representing it.
 */
protected PackageConfig addPackage(Element packageElement) throws ConfigurationException {
	String packageName = packageElement.getAttribute("name");
	PackageConfig packageConfig = configuration.getPackageConfig(packageName);
	if (packageConfig != null) {
		if (LOG.isDebugEnabled()) {
			LOG.debug("Package [#0] already loaded, skipping re-loading it and using existing PackageConfig [#1]", packageName, packageConfig);
		}
		return packageConfig;
	}

	PackageConfig.Builder newPackage = buildPackageContext(packageElement);

	if (newPackage.isNeedsRefresh()) {
		return newPackage.build();
	}

	if (LOG.isDebugEnabled()) {
		LOG.debug("Loaded " + newPackage);
	}

	// add result types (and default result) to this package
	addResultTypes(newPackage, packageElement);

	// 加载当前包的拦截器和拦截器栈 load the interceptors and interceptor stacks for this package
	loadInterceptors(newPackage, packageElement);

	// load the default interceptor reference for this package
	loadDefaultInterceptorRef(newPackage, packageElement);

	// load the default class ref for this package
	loadDefaultClassRef(newPackage, packageElement);

	// load the global result list for this package
	loadGlobalResults(newPackage, packageElement);

	// load the global exception handler list for this package
	loadGobalExceptionMappings(newPackage, packageElement);

	// get actions
	NodeList actionList = packageElement.getElementsByTagName("action");

	for (int i = 0; i < actionList.getLength(); i++) {
		Element actionElement = (Element) actionList.item(i);
		// 构建ActionConfig，包含加载action拦截器的内容
		addAction(actionElement, newPackage);
	}

	// load the default action reference for this package
	loadDefaultActionRef(newPackage, packageElement);

	PackageConfig cfg = newPackage.build();
	configuration.addPackageConfig(cfg.getName(), cfg);
	return cfg;
}
~~~


### 重新构建运行时配置

`DefaultConfiguration`中的`rebuildRuntimeConfiguration`，此方法最终会调用到`buildFullActionConfig`

通过代码可知当action没有配置拦截器则使用package中配置的拦截器进行初始化

~~~ java
private ActionConfig buildFullActionConfig(PackageConfig packageContext, ActionConfig baseConfig) throws ConfigurationException {
	Map<String, String> params = new TreeMap<String, String>(baseConfig.getParams());
	Map<String, ResultConfig> results = new TreeMap<String, ResultConfig>();

	if (!baseConfig.getPackageName().equals(packageContext.getName()) && packageContexts.containsKey(baseConfig.getPackageName())) {
		results.putAll(packageContexts.get(baseConfig.getPackageName()).getAllGlobalResults());
	} else {
		results.putAll(packageContext.getAllGlobalResults());
	}

	results.putAll(baseConfig.getResults());

	setDefaultResults(results, packageContext);

	List<InterceptorMapping> interceptors = new ArrayList<InterceptorMapping>(baseConfig.getInterceptors());
	// 当action没有配置拦截器则使用package中配置的拦截器进行初始化
	if (interceptors.size() <= 0) {
		String defaultInterceptorRefName = packageContext.getFullDefaultInterceptorRef();

		if (defaultInterceptorRefName != null) {
			interceptors.addAll(InterceptorBuilder.constructInterceptorReference(new PackageConfig.Builder(packageContext), defaultInterceptorRefName,
					new LinkedHashMap<String, String>(), packageContext.getLocation(), objectFactory));
		}
	}

	return new ActionConfig.Builder(baseConfig)
		.addParams(params)
		.addResultConfigs(results)
		.defaultClassName(packageContext.getDefaultClassRef())  // fill in default if non class has been provided
		.interceptors(interceptors)
		.addExceptionMappings(packageContext.getAllExceptionMappingConfigs())
		.build();
}

~~~

### 结论

当action中没有配置拦截器会将package中的拦截器初始化进去，如果配置了则不会。

所以当我们想要给某些特定的action增加拦截器而又不影响其他的action，同时又不丢失调原有的拦截器配置。那么可以在`<interceptors>`中新建一个拦截器栈`<interceptor-stack>`，让新建的拦截器栈去引用原本设置的拦截器栈或者拦截器，然后增加需要增加的拦截器，最后在指定的action中引用新的拦截器栈。

时序图：待补充

## 属性驱动

属性驱动是使用struts提供的拦截器`params`实现的

`<interceptor name="params" class="com.opensymphony.xwork2.interceptor.ParametersInterceptor"/>`


## 自定义拦截器



参考：

[w3c拦截器](https://www.w3cschool.cn/struts_2/struts_interceptors.html)