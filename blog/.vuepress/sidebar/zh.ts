import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/": [
    "",
   /* {
      text: "如何使用",
      icon: "laptop-code",
      prefix: "demo/",
      link: "demo/",
      children: "structure",
    },
    {
      text: "文章",
      icon: "book",
      prefix: "posts/",
      children: "structure",
    },*/
    "/about/intro",
/*
    "slides",
*/
  ],
  '/back/java/': "structure",
  '/back/struts/': "structure",
  '/back/spring/': "structure",
  '/back/SpringSecurity/':"structure",
  '/back/SpringCloud/':"structure",
  '/back/job/quartz/': "structure",
  '/back/mybatis/': "structure",
  '/back/distributed/': "structure",
  '/back/message-queue/': "structure",
  '/ops/os/linux/': [{
    text: 'Linux',

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
    children: [{
      text: '前言',
      link: '/ops/server/apache/'
    },
      {
        text: '安装配置',
        link: '1.installAndSetting'
      }
    ]
  }],
  '/ops/server/tomcat/': [{
    text: 'Tomcat',
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
    children: [{
      text: '介绍',
      link: '/tools/sonar/'
    },
      {
        text: '安装配置',
        link: '1.installAndSetting'
      }
    ]
  }],
  '/db/redis/': "structure",
  '/db/oracle/': "structure",
  '/db/mysql/': "structure",
  '/other/debugger/': [{
    text: '调试技巧',
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
    children: [{
      text: '概述',
      link: '/other/performanceOptimize/'
    },
      {
        text: '生产问题',
        link: 'performance_optimize'
      }
    ]
  }],
  '/other/pdf/': [{
    text: 'PDF',
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
  '/network/protocol/': "structure",
  '/network/grab/': "structure",
  '/virtualization/k8s/': [{
    text: 'Kubernetes',
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
});
