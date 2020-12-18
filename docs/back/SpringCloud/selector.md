# 选择器

BootstrapImportSelector

![BootstrapImportSelector](https://gitee.com/zengsl/picBed/raw/master/img/20201217164314.png)


~~~ java
@Override
public String[] selectImports(AnnotationMetadata annotationMetadata) {
	ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
	// Use names and ensure unique to protect against duplicates
	List<String> names = new ArrayList<>(SpringFactoriesLoader
			.loadFactoryNames(BootstrapConfiguration.class, classLoader));

~~~