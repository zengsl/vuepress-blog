import {navbar} from "vuepress-theme-hope";

export const zhNavbar = navbar([
    "/",
    {
        text: '前端',
        prefix: "/front/",
        icon: "pen-to-square",
        children: [{
            text: 'Html',
            link: 'html'
        },
            {
                text: 'Js',
                link: 'js/'
            },
            {
                text: 'React',
                link: 'react'
            },
            {
                text: 'Vue',
                link: 'vue'
            },
            {
                text: 'Node',
                link: 'node'
            }
        ]
    },
    {
        text: '后端',
        prefix: '/back/',
        children: [{
            text: 'Java',
            prefix: 'java',
            children: [{
                text: 'Java并发',
                link: 'concurrency/'
            },
                {
                    text: 'JVM',
                    link: 'jvm/'
                },
                {
                    text: '源码',
                    link: 'source/'
                }
            ]
        },
            {
                text: 'Spring生态',
                children: [{
                    text: 'Spring',
                    link: 'spring/'
                },
                    {
                        text: 'Spring Security',
                        link: 'SpringSecurity/'
                    },
                    {
                        text: 'Spring Cloud',
                        link: 'SpringCloud/'
                    }
                ]
            },
            {
                text: '其他',
                children: [{
                    text: 'Quartz',
                    link: 'job/quartz/'
                }, {
                    text: 'Struts',
                    link: 'struts/'

                },


                    {
                        text: 'Mybatis',
                        link: 'mybatis/'

                    },
                    {
                        text: '分布式',
                        link: 'distributed'
                    }, {
                        text: '消息中间间',
                        link: 'message-queue'

                    }, {
                        text: '工作流',
                        link: 'workflow'
                    }
                    ,
                    {
                        text: '算法',
                        link: 'algorithm'

                    },

                    {
                        text: 'Dubbo',
                        link: 'Dubbo'

                    },
                    {
                        text: 'Netty',
                        link: 'Netty'
                    }

                ]

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
            },
            {
                text: 'Pg',
                link: '/db/postgresql/'
            }
        ]
    },
    {
        text: '网络',
        children: [{
            text: 'TCP/IP',
            link: '/network/tcpip/'
        }, {
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
        }, {
            text: '其他',
            children: [{
                text: 'Docker',
                link: '/ops/virtualization/docker/'
            },
                {
                    text: 'K8S',
                    link: '/ops/virtualization/k8s/'
                }
            ]
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
            text: 'Sonar',
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
            }, {
                text: 'Intellij plugin',
                link: '/other/intellij/'
            }
        ]
    },{
        text: '收藏',
        link: '#'
    },
    {
        text: '关于',
        link: '/about/aboutMe'
    },

]);
