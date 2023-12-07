export default [{
	text: 'Home',
	link: '/'
},
	{
		text: '前端',
		children: [{
			text: 'Html',
			link: '/front/html'
		},
			{
				text: 'Js',
				link: '/front/js/'
			},
			{
				text: 'react',
				link: '/front/react'
			},
			{
				text: 'vue',
				link: '/front/vue'
			},
			{
				text: 'node',
				link: '/front/node'
			}
		]
	},

	{
		text: '后端',
		children: [{
			text: 'Java',
			children: [{
				text: 'Java并发',
				link: '/back/java/concurrency/'
			},
				{
					text: 'JVM',
					link: '/back/java/jvm/'
				}
			]
		},
			{
				text: 'Spring生态',
				children: [{
					text: 'Spring',
					link: '/back/spring/'
				},
					{
						text: 'Spring Security',
						link: '/back/SpringSecurity/'
					},
					{
						text: 'Spring Cloud',
						link: '/back/SpringCloud/'
					}
				]
			}, {
				text: '任务调度',
				children: [{
					text: 'Quartz',
					link: '/back/job/quartz/'
				}]
			},
			{
				text: 'Struts',
				link: '/back/struts/'

			},
			{
				text: 'Mybatis',
				link: '/back/mybatis/'

			},
			{
				text: '分布式',
				children: [{
					text: '基本介绍',
					link: '/back/distributed/'
				},
					{
						text: 'Zookeeper',
						link: '/back/distributed/Zookeeper'
					}
				]
			}, {
				text: '消息中间间',

				children: [{
					text: 'Kafka',
					link: '/back/message-queue/kafka/'
				}]
			}, {
				text: '工作流',
				children: [{
					text: 'JBPM4',
					link: '/back/workflow/'
				}]
			}
			,
			{
				text: '算法',
				link: '/back/algorithm/'

			},

			{
				text: 'Dubbo',
				link: '/back/Dubbo/'

			},

			{
				text: 'Netty',
				link: '/back/Netty/'

			}

		]
	},
	{
		text: '数据库',
		children: [
			{
				text: 'MySql',
				link: '/db/mysql/'
			},
			{
				text: 'Redis',
				link: '/db/redis/'
			},
			{
				text: 'Oracle',
				link: '/db/oracle/'
			}
		]
	},
	{
		text: '网络',
		children: [{
			text: 'TCP/IP',
			link: '/network/tcpip/'
		},{
			text: 'HTTPS',
			link: '/network/https'
		}]
	},
	{
		text: '运维',

		children: [{
			text: '操作系统',
			children: [{
				text: 'Linux',
				link: '/ops/os/linux/',

			}, {
				text: 'Mac OS',
				link: '/ops/os/mac/',

			}]
		}, {
			text: '服务器',
			children: [{
				text: 'Apache',
				link: '/ops/server/apache/'
			},
				{
					text: 'Nginx',
					link: '/ops/server/nginx/'
				},
				{
					text: 'Tomcat',
					link: '/ops/server/tomcat/'
				},
				{
					text: 'Weblogic',
					link: '/ops/server/weblogic/'
				}
			]
		}

		]
	},
	{
		text: '虚拟化',

		children: [{
			text: 'Docker',
			link: '/virtualization/docker/'
		}, {
			text: 'k8s',
			link: '/virtualization/k8s/'
		}
		]
	},
	{
		text: '工具',
		children: [{
			text: 'Typora',
			link: '/tools/typora/1.installAndSetting'
		}, {
			text: 'Git',
			link: '/tools/git/'
		}, {
			text: 'sonar',
			link: '/tools/sonar/'
		}, {
			text: '抓包',
			link: '/tools/grab/'
		}]
	},
	{
		text: '其他',
		children: [{
			text: '性能调优',
			link: '/other/performanceOptimize/'
		},
			{
				text: '调试技巧',
				link: '/other/debugger/'
			},
			{
				text: '防重复请求',
				link: '/other/repeatRequest'
			},
			{
				text: '批量插入',
				link: '/other/batch'
			},
			{
				text: 'UReport2',
				link: '/other/ureport'
			},
			{
				text: 'PDF',
				link: '/other/pdf/'
			}, {
				text: 'Python',
				link: '/python/'
			}, {
				text: 'Groovy',
				link: '/groovy/'
			}, {
				text: 'RegExp',
				link: '/other/regExp'
			}, {
				text: 'VuePress',
				link: '/other/blog/'
			}
		]
	},
	{
		text: 'About',
		link: '/about/aboutMe'
	}
]
