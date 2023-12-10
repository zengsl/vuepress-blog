import {navbar} from "vuepress-theme-hope";

export const zhNavbar = navbar([
    "/",
    {
        text: '前端',
        prefix: "/front/",
        icon: "fa-brands fa-html5",
        children: [{
            text: 'Html',
            link: 'html',
            icon: "fa-brands fa-html5",
        },
            {
                text: 'Js',
                link: 'js/',
                icon: "fa-brands fa-js",

            },
            {
                text: 'React',
                link: 'react',
                icon: "fa-brands fa-react",

            },
            {
                text: 'Vue',
                link: 'vue',
                icon: "fa-brands fa-vuejs",

            },
            {
                text: 'Node',
                link: 'node',
                icon: "fa-brands fa-node",

            }
        ]
    },
    {
        text: '后端',
        prefix: '/back/',
        icon: 'fa-brands fa-space-awesome',
        children: [
            {
                text: 'Java',
                link: 'java',

            },
            {
                text: 'Spring生态',
                children: [
                    {
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
                children: [
                    {
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
                    },
                    {
                        text: '消息中间间',
                        link: 'message-queue'

                    },
                    {
                        text: '工作流',
                        link: 'workflow'
                    }
                    ,
                    {
                        text: 'Dubbo',
                        link: 'Dubbo'
                    },
                    {
                        text: 'Netty',
                        link: 'Netty'
                    },
                    {
                        text: '一些数字',
                        link: 'Java体系中一些数字'
                    },
                    {
                        text: 'C语言',
                        link: 'C语言'
                    }

                ]

            }

        ]
    },
    {
        text: '数据库',
        icon: 'database',
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
        icon: 'globe',
        prefix: '/network/',
        children:[
            {
                text: '协议',
                link: 'protocol'
            },
            {
                text: '抓包',
                link: 'grab'
            }
        ]

    },
    {
        text: '运维',
        icon: 'fa-brands fa-dev',
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
        icon: 'toolbox',
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
        icon: 'box',
        children: [
            {
                text: '算法',
                link: '/other/algorithm'

            },
            {
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
    }, {
        text: '收藏',
        icon: 'star',
        link: '/star'
    },

]);
