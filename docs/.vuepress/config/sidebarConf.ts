export default {
	'/back/java/concurrency/': [{
		text: 'Java并发',
		collapsable: false,
		children: [{
			text: '介绍',
			link: '/back/java/concurrency/'
		},
			{
				text: '线程池',
				link: 'thread-pool'
			},
			{
				text: '基础',
				link: '1.java多线程-基础'
			},
			{
				text: 'JUC',
				link: '2.Java多线程-JUC'
			}
		]
	}],
	'/back/java/jvm/': [{
		text: 'JVM',
		collapsable: false,
		children: [{
			text: '介绍',
			link: '/back/java/jvm/'
		},
			{
				text: 'JDK工具',
				link: 'jdkCommand'
			},
			{
				text: '编译JDK',
				link: '1.buildJdk'
			}
		]
	}],
	'/back/struts/': [{
		text: 'Struts',
		collapsable: false,
		sidebarDepth: 2,
		children: [{
			text: '介绍',
			link: '/back/struts/'
		},
			{
				text: '拦截器',
				link: 'interceptor'
			},
			{
				text: '常见问题',
				link: 'issues'
			},
			{
				text: '文件上传失败分析',
				link: 'fileuploadFail'
			}
		]
	}],
	'/back/spring/': [{
		text: 'Spring',
		collapsable: false,
		sidebarDepth: 2,
		children: [{
			text: '概述',
			link: '/back/spring/'
		},
			{
				text: '初始化',
				link: 'init'
			},
			{
				text: 'Ioc',
				link: '1.ioc'
			},
			{
				text: 'Aop',
				link: '2.aop'
			},
			{
				text: 'Spring MVC',
				link: 'springmvc'
			}
		]
	}],
	'/back/SpringSecurity/': [{
		text: 'SpringSecurity',
		collapsable: false,
		sidebarDepth: 2,
		children: [{
			text: '介绍',
			link: '/back/SpringSecurity/'
		},
			{
				text: '资源访问权限',
				link: '1.资源访问权限'
			},
			{
				text: '匿名权限',
				link: '2.匿名权限'
			},
			{
				text: '文档',
				link: 'document/security-servlet'
			},
			{
				text: 'OAuth 2.0',
				link: 'oauth2'
			}

		]
	}],

	'/back/SpringCloud/': [{
		text: 'SpringCloud',
		collapsable: false,
		sidebarDepth: 2,
		children: [{
			text: '介绍',
			link: '/back/SpringCloud/'
		},
			{
				text: '启动过程',
				link: 'run'
			},
			{
				text: 'Gateway',
				link: 'gateway'
			},
			{
				text: 'Security',
				link: 'security'
			},
			{
				text: 'egrantM',
				link: 'egrant/'
			}
		]
	}],
	'/back/job/quartz/': [{
		text: 'Quartz',
		collapsable: false,
		sidebarDepth: 2,
		children: [{
			text: '介绍',
			link: '/back/job/quartz/'
		}
		]
	}],
	'/back/mybatis/': [{
		text: 'Mybatis',
		collapsable: false,
		children: [{
			text: '介绍',
			link: '/back/mybatis/'
		},
			{
				text: 'Mybatis-Plus',
				link: 'mybatis-plus'
			},			{
				text: 'Mapper自动刷新',
				link: 'Mapper自动刷新'
			},
			{
				text: '其他',
				link: 'other'
			}

		]
	}],
	'/back/distributed/': [{
		text: '分布式',
		collapsable: false,
		sidebarDepth: 2,
		children: [{
			text: '介绍',
			link: '/back/distributed/'
		},
			{
				text: '分布式事务',
				link: 'distributedTransaction'
			},
			{
				text: '分布式锁',
				link: 'distributedLocks'
			},
			{
				text: 'Zookeeper',
				link: 'Zookeeper'
			}

		]
	}],
	'/ops/os/linux/': [{
		text: 'Linux',
		collapsable: false,
		children: [{
			text: '介绍',
			link: '/ops/os/linux/'
		},
			{
				text: '安装配置',
				link: '1.installAndSetting_vm'
			},
			{
				text: '常用命令',
				link: '2.command'
			},
			{
				text: '系统性能',
				link: 'sys_performance'
			},
			{
				text: 'shell脚本',
				link: '3.shell'
			},
			{
				text: '磁盘扩容',
				link: 'fileExtend'
			}
		]
	}],
	'/ops/os/mac/': [{
		text: 'Mac OS',
		collapsable: false,
		children: [{
			text: '介绍',
			link: '/ops/os/mac/'
		},
			{
				text: '安装',
				link: '1.install'
			},
			{
				text: '配置',
				link: '2.settings'
			},
			{
				text: '软件推荐',
				link: '3.software'
			},
			{
				text: '快捷键',
				link: '4.keys'
			},
			{
				text: '使用技巧',
				link: '5.skill'
			}
		]
	}],
	'/ops/server/nginx/': [{
		text: 'Nginx',
		collapsable: false,
		children: [{
			text: '前言',
			link: '/ops/server/nginx/'
		},
			{
				text: '安装配置',
				link: '1.nginx(windows)'
			},
			{
				text:'OpenResty',
				link:'openresty'
			}
		]
	}],
	'/ops/server/apache/': [{
		text: 'Apache',
		collapsable: false,
		children: [{
			text: '前言',
			link: '/ops/server/apache/'
		},
			{
				text: '安装配置',
				link: '1.install and setting'
			}
		]
	}],
	'/ops/server/tomcat/': [{
		text: 'Tomcat',
		collapsable: false,
		children: [{
			text: '介绍',
			link: '/ops/server/tomcat/'
		},{
			text: '源码编译与启动',
			link: 'tomcatSource'
		},{
			text: '日志',
			link: 'tomcatLogging'
		},
			{
				text: '常见问题',
				link: 'problems'
			}
		]
	}],
	'/tools/git/': [{
		text: 'Git',
		collapsable: false,
		children: [{
			text: '介绍',
			link: '/tools/git/'
		},
			{
				text: '安装配置',
				link: '1.installAndSetting'
			},
			{
				text: '部署',
				link: '2.deploy'
			},
			{
				text: '常用命令',
				link: '3.command'
			}
		]
	}],
	'/tools/sonar/': [{
		text: 'Sonar',
		collapsable: false,
		children: [{
			text: '介绍',
			link: '/tools/sonar/'
		},
			{
				text: '安装配置',
				link: '1.install and setting'
			}
		]
	}],
	'/tools/grab/': [{
		text: '抓包工具',
		collapsable: false,
		children: [{
			text: '介绍',
			link: '/tools/grab/'
		},
			{
				text: 'Fiddler',
				link: 'fiddler/use.md'
			},
			{
				text: 'Wireshark',
				link: 'wireshark/use.md'
			}
		]
	}],
	'/db/redis/': [{
		text: 'Redis',
		collapsable: false,
		sidebarDepth: 2,
		children: [{
			text: '介绍',
			link: '/db/redis/'
		},
			{
				text: '安装配置',
				link: '1.install and setting'
			},
			{
				text: '常用命令',
				link: '2.command'
			}
		]
	}],
	'/db/oracle/': [{
		text: 'Oracle',
		collapsable: false,
		children: [{
			text: '介绍',
			link: '/db/oracle/'
		},
			{
				text: '常用命令',
				link: '1.command'
			}
		]
	}],
	'/db/mysql/': [{
		text: 'MySql',
		collapsable: false,
		children: [{
			text: '介绍',
			link: '/db/mysql/'
		},
			{
				text: '安装配置',
				link: '1.install and setting'
			}
		]
	}],
	'/other/debugger/': [{
		text: '调试技巧',
		collapsable: false,
		children: [{
			text: '介绍',
			link: '/other/debugger/'
		},
			{
				text: '后端调试',
				link: 'back_debug'
			},
			{
				text: '前端调试',
				link: 'front_debug'
			},
			{
				text: '接口调试',
				link: 'interface_debug'
			}
		]
	}],
	'/other/performanceOptimize/': [{
		text: '性能调优',
		collapsable: false,
		children: [{
			text: '概述',
			link: '/other/performanceOptimize/'
		},
			{
				text: '一个生产上的故事',
				link: 'performance_optimize'
			}
		]
	}],
	'/other/pdf/': [{
		text: 'PDF',
		collapsable: false,
		children: [{
			text: '介绍',
			link: '/other/pdf/'
		},
			{
				text: 'PDF内容显示异常',
				link: 'pdfContentError'
			},
			{
				text: 'PDF下载报错(字体)',
				link: 'pdfFontError'
			}
		]
	}],

	'/front/js/': [{
		text: 'JavaScript',
		collapsable: false,
		children: [{
			text: '介绍',
			link: '/front/js/'
		},
			{
				text: '基本概念',
				link: '1.base'
			},
			{
				text: '对象',
				link: '2.object'
			},
			{
				text: '原型',
				link: '3.propotype'
			},
			{
				text: '闭包',
				link: '4.closure'
			},
			{
				text: 'Screenshots',
				link: 'Screenshots'
			},
			{
				text: '模块化',
				link: 'module'
			}
		]
	}],
	'/virtualization/k8s/': [{
		text: 'Kubernetes',
		collapsable: true,
		sidebarDepth: 2,
		children: [{
			text: '介绍',
			link: '/virtualization/k8s/'
		},
			{
				text: '安装',
				link: 'install'
			},
			{
				text: 'kubernetes集群命令工具kubectl',
				link: 'kubectl'
			},
			{
				text: 'Kubernetes集群YAML文件详解',
				link: 'yaml'
			},
			{
				text: 'Kubernetes核心技术Pod',
				link: 'pod'
			}
		]
	}]

}