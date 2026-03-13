import {navbar} from "vuepress-theme-hope";

export const zhNavbar = navbar([
    "/",
    {
        text: '前端',
        prefix: "/front/",
        icon: "fa-brands fa-html5",
        children: [
            {
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
                text: 'Ts',
                link: 'ts/',
                icon: "skill-icons typescript",

            },
            {
                text: 'React',
                link: 'react',
                icon: "fa-brands fa-react",

            },
            {
                text: 'Vue',
                link: 'vue/',
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
                        link: 'spring-security/'
                    },
                    {
                        text: 'Spring Boot',
                        link: 'spring-boot/'
                    },
                    {
                        text: 'Spring Cloud',
                        link: 'spring-cloud/'
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
                        link: 'distributed/'
                    },
                    {
                        text: '消息中间件',
                        link: 'message-queue/'

                    },
                    {
                        text: '工作流',
                        link: 'workflow/'
                    }
                    ,
                    {
                        text: '一些数字',
                        link: 'java-number'
                    },
                    {
                        text: 'C语言',
                        link: 'c'
                    }

                ]

            }

        ]
    },
    {
        text: '数据库',
        icon: 'fa-solid fa-database',
        children: [
            {
                text: 'MySql',
                link: '/db/mysql/'
            },
            {
                text: 'Redis',
                link: '/db/redis/'
            }
        ]
    },
    {
        text: '网络',
        icon: 'fa-solid fa-globe',
        prefix: '/network/',
        children: [
            {
                text: '协议',
                link: 'protocol/'
            },
            {
                text: '抓包',
                link: 'grab/'
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
                }, {
                    text: 'Sonar',
                    link: '/ops/sonar/'
                }, {
                    text: 'Jenkins',
                    link: '/ops/jenkins/'
                }
            ]
        }

        ]
    },
    {
        text: '工具',
        icon: 'fa-solid fa-toolbox',
        children: [{
            text: 'Typora',
            link: '/tools/typora/install_setting'
        }, {
            text: 'Git',
            link: '/tools/git/'
        }, {
            text: 'B站字幕',
            link: '/tools/b-srt.html'
        }]
    },
    {
        text: '其他',
        icon: 'fa-solid fa-box',
        children: [
            {
                text: '算法',
                link: '/other/algorithm/'

            },
            {
                text: '性能调优',
                link: '/other/optimize/'
            },
            {
                text: '调试技巧',
                link: '/other/debugger/'
            },
            {
                text: '防重复请求',
                link: '/other/repeat_request'
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
                text: 'RegExp',
                link: '/other/reg_exp'
            }, {
                text: 'VuePress',
                link: '/other/blog/'
            }, {
                text: 'Intellij Plugin',
                link: '/other/intellij/'
            }
        ]
    }, {
        text: '收藏',
        icon: 'fa-solid fa-star',
        link: '/collect/network'
    },
    {
        text: 'Toolbox',
        link: 'https://toolbox.zengsl.me'
    },

]);
