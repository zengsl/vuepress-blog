module.exports = {
	'/back/java/concurrency/': [{
		title: 'Java并发',
		collapsable: false,
		children: [{
				title: '介绍',
				path: '/back/java/concurrency/'
			},
			{
				title: '线程池',
				path: 'thread-pool'
			},
			{
				title: '基础',
				path: '1.java多线程-基础'
			},
			{
				title: 'JUC',
				path: '2.Java多线程-JUC'
			}
		]
	}],
	'/back/java/jvm/': [{
		title: 'JVM',
		collapsable: false,
		children: [{
				title: '介绍',
				path: '/back/java/jvm/'
			},
			{
				title: '编译JDK',
				path: '1.buildJdk'
			}
		]
	}],
	'/back/struts/': [{
		title: 'Struts',
		collapsable: false,
		sidebarDepth: 2,
		children: [{
				title: '介绍',
				path: '/back/struts/'
			},
			{
				title: '拦截器',
				path: 'interceptor'
			},
			{
				title: '常见问题',
				path: 'issues'
			}
		]
	}],
	'/back/spring/': [{
		title: 'Spring',
		collapsable: false,
		sidebarDepth: 2,
		children: [{
				title: '概述',
				path: '/back/spring/'
			},
			{
				title: '初始化',
				path: 'init'
			},
			{
				title: 'Ioc',
				path: '1.ioc'
			},
			{
				title: 'Aop',
				path: '2.aop'
			}
		]
	}],
	'/back/SpringSecurity/': [{
		title: 'SpringSecurity',
		collapsable: false,
		sidebarDepth: 2,
		children: [{
				title: '介绍',
				path: '/back/SpringSecurity/'
			},
			{
				title: '资源访问权限',
				path: '1.资源访问权限'
			},
			{
				title: '文档',
				path: 'document/security-servlet'
			},
			{
				title: 'OAuth 2.0',
				path: 'oauth2'
			}

		]
	}],
	
	'/back/SpringCloud/': [{
		title: 'SpringCloud',
		collapsable: false,
		sidebarDepth: 2,
		children: [{
				title: '介绍',
				path: '/back/SpringCloud/'
			},
			{
				title: '启动过程',
				path: 'run'
			},
			{
				title: 'Gateway',
				path: 'gateway'
			},
			{
				title: 'Security',
				path: 'security'
			},
			{
				title: 'egrantM',
				path: 'egrant/'
			}
		]
	}],
	'/back/job/quartz/': [{
		title: 'Quartz',
		collapsable: false,
		sidebarDepth: 2,
		children: [{
				title: '介绍',
				path: '/back/job/quartz/'
			}
		]
	}],
	'/back/mybatis/': [{
		title: 'Mybatis',
		collapsable: false,
		children: [{
				title: '介绍',
				path: '/back/mybatis/'
			},
			{
				title: 'Mybatis-Plus',
				path: 'mybatis-plus'
			},
			{
				title: '其他',
				path: 'other'
			}

		]
	}],
	'/back/distributed/': [{
		title: '分布式',
		collapsable: false,
		sidebarDepth: 2,
		children: [{
				title: '介绍',
				path: '/back/distributed/'
			},
			{
				title: '分布式事务',
				path: 'distributedTransaction'
			},
			{
				title: '分布式锁',
				path: 'distributedLocks'
			}

		]
	}],
	'/ops/os/linux/': [{
		title: 'Linux',
		collapsable: false,
		children: [{
				title: '介绍',
				path: '/ops/os/linux/'
			},
			{
				title: '安装配置',
				path: '1.installAndSetting_vm'
			},
			{
				title: '常用命令',
				path: '2.command'
			},
			{
				title: 'shell脚本',
				path: '3.shell'
			}
		]
	}],
	'/ops/os/mac/': [{
		title: 'Mac OS',
		collapsable: false,
		children: [{
				title: '介绍',
				path: '/ops/os/mac/'
			},
			{
				title: '安装',
				path: '1.install'
			},
			{
				title: '配置',
				path: '2.settings'
			},
			{
				title: '软件推荐',
				path: '3.software'
			},
			{
				title: '快捷键',
				path: '4.keys'
			},
			{
				title: '使用技巧',
				path: '5.skill'
			}
		]
	}],
	'/ops/server/nginx/': [{
		title: 'Nginx',
		collapsable: false,
		children: [{
				title: '前言',
				path: '/ops/server/nginx/'
			},
			{
				title: '安装配置',
				path: '1.nginx(windows)'
			}
		]
	}],
	'/ops/server/apache/': [{
		title: 'Apache',
		collapsable: false,
		children: [{
				title: '前言',
				path: '/ops/server/apache/'
			},
			{
				title: '安装配置',
				path: '1.install and setting'
			}
		]
	}],
	'/ops/server/tomcat/': [{
		title: 'Tomcat',
		collapsable: false,
		children: [{
				title: '介绍',
				path: '/ops/server/tomcat/'
			},
			{
				title: '常见问题',
				path: 'problems'
			}
		]
	}],
	'/tools/git/': [{
		title: 'Git',
		collapsable: false,
		children: [{
				title: '介绍',
				path: '/tools/git/'
			},
			{
				title: '安装配置',
				path: '1.installAndSetting'
			},
			{
				title: '部署',
				path: '2.deploy'
			},
			{
				title: '常用命令',
				path: '3.command'
			}
		]
	}],
	'/tools/sonar/': [{
		title: 'Sonar',
		collapsable: false,
		children: [{
				title: '介绍',
				path: '/tools/sonar/'
			},
			{
				title: '安装配置',
				path: '1.install and setting'
			}
		]
	}],
	'/tools/grab/': [{
		title: '抓包工具',
		collapsable: false,
		children: [{
				title: '介绍',
				path: '/tools/grab/'
			},
			{
				title: 'Fiddler',
				path: 'fiddler/use.md'
			},
			{
				title: 'Wireshark',
				path: 'wireshark/use.md'
			}
		]
	}],
	'/db/redis/': [{
		title: 'Redis',
		collapsable: false,
		children: [{
				title: '介绍',
				path: '/db/redis/'
			},
			{
				title: '安装配置',
				path: '1.install and setting'
			},
			{
				title: '常用命令',
				path: '2.command'
			}
		]
	}],
	'/db/oracle/': [{
		title: 'Oracle',
		collapsable: false,
		children: [{
				title: '介绍',
				path: '/db/oracle/'
			},
			{
				title: '常用命令',
				path: '1.command'
			}
		]
	}],
	'/db/mysql/': [{
		title: 'MySql',
		collapsable: false,
		children: [{
				title: '介绍',
				path: '/db/mysql/'
			},
			{
				title: '安装配置',
				path: '1.install and setting'
			}
		]
	}],
	'/other/debugger/': [{
		title: '调试技巧',
		collapsable: false,
		children: [{
				title: '介绍',
				path: '/other/debugger/'
			},
			{
				title: '后端调试',
				path: 'back_debug'
			},
			{
				title: '前端调试',
				path: 'front_debug'
			},
			{
				title: '接口调试',
				path: 'interface_debug'
			}
		]
	}],
	'/front/js/': [{
		title: 'JavaScript',
		collapsable: false,
		children: [{
				title: '介绍',
				path: '/front/js/'
			},
			{
				title: '基本概念',
				path: '1.base'
			},
			{
				title: '对象',
				path: '2.object'
			},
			{
				title: '原型',
				path: '3.propotype'
			},
			{
				title: '闭包',
				path: '4.closure'
			},
			{
				title: 'Screenshots',
				path: 'Screenshots'
			}
		]
	}]

}
