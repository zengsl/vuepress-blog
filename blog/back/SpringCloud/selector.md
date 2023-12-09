---
order: 4
category:
  - 后端
tag:
  - Spring
  - Spring Cloud
---
# 选择器

BootstrapImportSelector

![BootstrapImportSelector](images/img_19.png)


~~~ java
@Override
public String[] selectImports(AnnotationMetadata annotationMetadata) {
	ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
	// Use names and ensure unique to protect against duplicates
	List<String> names = new ArrayList<>(SpringFactoriesLoader
			.loadFactoryNames(BootstrapConfiguration.class, classLoader));

~~~