module.exports = [{
		text: 'Home',
		link: '/'
	},
	{
		text: '前端',
		items: [{
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
		items: [{
				text: 'Java',
				items: [{
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
				items: [{
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
				items: [{
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
				link: '/back/distributed/'
			}, {
				text: '消息中间间',
				items: [{
					text: 'Kafka',
					link: '/back/message-queue/kafka/'
				}]
			}, {
				text: '工作流',
				items: [{
					text: 'JBPM4',
					link: '/back/workflow/'
				}]
			}


		]
	},
	{
		text: '数据库',
		items: [{
				text: 'Redis',
				link: '/db/redis/'
			},
			{
				text: 'Oracle',
				link: '/db/oracle/'
			},
			{
				text: 'MySql',
				link: '/db/mysql/'
			}
		]
	},
	{
		text: '网络',
		items: [{
			text: 'TCP/IP',
			link: '/tools/protocol/'
		},{
			text: 'HTTPS',
			link: '/network/https'
		}]
	},
	{
		text: '运维',

		items: [{
				text: '操作系统',
				items: [{
					text: 'Linux',
					link: '/ops/os/linux/',

				}, {
					text: 'Mac OS',
					link: '/ops/os/mac/',

				}]
			}, {
				text: '服务器',
				items: [{
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

		items: [{
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
		items: [{
			text: 'Typora',
			link: '/tools/typora/1.install and setting'
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
		items: [{
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
