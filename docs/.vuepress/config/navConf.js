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
				text: 'Spring',
				items: [{
						text: 'Spring',
						link: '/back/spring/'
					},
					{
						text: 'Spring Security',
						link: '/back/SpringSecurity/'
					}
				]
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
					items: [{
							text: '分布式锁',
							link: '/back/distributed/'
						},
						{
							text: '分布式事务',
							link: '/back/distributed/'
						}
					]
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
		}]
	},
	{
		text: '运维',

		items: [{
				text: '操作系统',
				items: [{
					text: 'Linux',
					link: '/ops/os/linux/',

				},{
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
				link: '/'
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
			}
		]
	},
	{
		text: 'About',
		link: '/about/aboutMe'
	}
]
