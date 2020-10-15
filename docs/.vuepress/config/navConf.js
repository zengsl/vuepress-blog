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
				link: '/back/spring/',
				items: [{
						text: 'IOC原理',
						link: '/back/spring/1.ioc'
					},
					{
						text: 'AOP原理',
						link: '/back/spring/2.aop'
					}
				]
			},

			{
				text: 'Spring Security',
				items: [{
					text: '资源访问权限',
					link: '/back/SpringSecurity/1.资源访问权限'
				}]
			},

			{
				text: 'Struts',
				link: '/back/struts/'
				
			},
	
			{
				text: 'Mybatis',
				link: '/back/mybatis/'
				
			}
			// ,
			// {
			// 	text: 'Mybatis',
			// 	items: [{
			// 		text: '拦截器',
			// 		link: '/back/SpringSecurity/资源访问权限控制'
			// 	}]
			// }

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
				link: '/'
			},
			{
				text: '防重复请求',
				link: '/other/repeatRequest'
			}
		]
	},
	{
		text: 'About',
		link: '/about/aboutMe'
	}
]
