import {navbar} from "vuepress-theme-hope";

export const zhNavbar = navbar([
    "/",
    "/demo/",
    {
        text: "博文",
        icon: "pen-to-square",
        prefix: "/posts/",
        children: [
            {
                text: "苹果",
                icon: "pen-to-square",
                prefix: "apple/",
                children: [
                    {text: "苹果1", icon: "pen-to-square", link: "1"},
                    {text: "苹果2", icon: "pen-to-square", link: "2"},
                    "3",
                    "4",
                ],
            },
            {
                text: "香蕉",
                icon: "pen-to-square",
                prefix: "banana/",
                children: [
                    {
                        text: "香蕉 1",
                        icon: "pen-to-square",
                        link: "1",
                    },
                    {
                        text: "香蕉 2",
                        icon: "pen-to-square",
                        link: "2",
                    },
                    "3",
                    "4",
                ],
            },
            {text: "樱桃", icon: "pen-to-square", link: "cherry"},
            {text: "火龙果", icon: "pen-to-square", link: "dragonfruit"},
            "tomato",
            "strawberry",
        ],
    },
    {
        text: "V2 文档",
        icon: "book",
        link: "https://theme-hope.vuejs.press/zh/",
    },
    {
        text: '前端',
        prefix: "/front/",
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
            children: [{
                text: 'Java并发',
                link: 'java/concurrency/'
            },
                {
                    text: 'JVM',
                    link: 'java/jvm/'
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
            }, {
                text: '任务调度',
                children: [{
                    text: 'Quartz',
                    link: 'job/quartz/'
                }]
            },
            {
                text: 'Struts',
                link: 'struts/'

            },
            {
                text: 'Mybatis',
                link: 'mybatis/'

            },
            {
                text: '分布式',
                children: [{
                    text: '基本介绍',
                    link: 'distributed/'
                },
                    {
                        text: 'Zookeeper',
                        link: 'distributed/Zookeeper'
                    }
                ]
            }, {
                text: '消息中间间',

                children: [{
                    text: 'Kafka',
                    link: 'message-queue/kafka/'
                }]
            }, {
                text: '工作流',
                children: [{
                    text: 'JBPM4',
                    link: 'workflow/'
                }]
            }
            ,
            {
                text: '算法',
                link: 'algorithm/'

            },

            {
                text: 'Dubbo',
                link: 'Dubbo/'

            },

            {
                text: 'Netty',
                link: 'Netty/'

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
        }

        ]
    },
    {
        text: '虚拟化',

        children: [{
            text: 'Docker',
            link: '/virtualization/docker/'
        }, {
            text: 'K8S',
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
    },
    {
        text: 'About',
        link: '/about/aboutMe'
    },
    {
        text: '收藏',
        link: '#'
    },
]);
