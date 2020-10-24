# 介绍

配置文件

~~~ xml
<sec:http access-decision-manager-ref="accessDecisionManager" auto-config="true" entry-point-ref="authenticationEntryPoint">
		<sec:logout />
		<sec:anonymous granted-authority="A_ANONYMOUS" />
		<sec:custom-filter ref="authenticationFilter" before="FORM_LOGIN_FILTER"/>
		<sec:custom-filter ref="filterSecurityInterceptor" before="FILTER_SECURITY_INTERCEPTOR"/>
		<sec:custom-filter ref="switchRoleProcessingFilter" before="SWITCH_USER_FILTER"/>
		<sec:form-login login-processing-url="/j_spring_security_login"/>	
</sec:http>
~~~


## 过滤器初始化

Security的过滤器是在项目启动时进行BeanDefinition加载的过程中，由`HttpSecurityBeanDefinitionParser`的parse方法完成。

createFilterChain方法会获取三种过滤器，然后根据OrderComparator进行排序

~~~ java
public BeanDefinition parse(Element element, ParserContext pc) {
	CompositeComponentDefinition compositeDef =
		new CompositeComponentDefinition(element.getTagName(), pc.extractSource(element));
	pc.pushContainingComponent(compositeDef);

	registerFilterChainProxyIfNecessary(pc, pc.extractSource(element));

	// Obtain the filter chains and add the new chain to it
	BeanDefinition listFactoryBean = pc.getRegistry().getBeanDefinition(BeanIds.FILTER_CHAINS);
	List<BeanReference> filterChains = (List<BeanReference>)
			listFactoryBean.getPropertyValues().getPropertyValue("sourceList").getValue();
	// 初始化过滤器
	filterChains.add(createFilterChain(element, pc));

	pc.popAndRegisterContainingComponent();
	return null;
}


private BeanReference createFilterChain(Element element, ParserContext pc) {
	
	省略

	List<OrderDecorator> unorderedFilterChain = new ArrayList<OrderDecorator>();

	unorderedFilterChain.addAll(httpBldr.getFilters());
	unorderedFilterChain.addAll(authBldr.getFilters());
	unorderedFilterChain.addAll(buildCustomFilterList(element, pc));

	Collections.sort(unorderedFilterChain, new OrderComparator());
	checkFilterChainOrder(unorderedFilterChain, pc, pc.extractSource(element));

	// The list of filter beans
	List<BeanMetadataElement> filterChain = new ManagedList<BeanMetadataElement>();

	for (OrderDecorator od : unorderedFilterChain) {
		filterChain.add(od.bean);
	}

	return createSecurityFilterChainBean(element, pc, filterChain);
}



~~~