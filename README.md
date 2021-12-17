# vuepress-blog

基于vuepress搭建的个人博客，用于维护相关笔记

可以参考[飞跃高山与大洋的鱼的视频教程](https://www.bilibili.com/video/av43316513)

## 博客配置

配置文件路径：.vuepress/config.js

将不同内容的配置拆分到了config文件夹中的子文件：

- navConf.js 导航栏

- sidebarConf.js 侧边拦 手动维护侧边栏需在此文件中进行配置。若无特殊需求，可以考虑使用插件[vuepress-plugin-auto-sidebar](https://github.com/shanyuhai123/vuepress-plugin-auto-sidebar.git)

- pluginsConf.js 安装插件

- headConf.js 可以配置favicon等

## 博客部署

推荐使用[Vercel](https://vercel.com/)来部署

Vercel可以与github直接关联，当你推送内容至GitHub之后，Vercel将会自动将博客重新编译和发布。

整个配置过程比较简单，有两点需要注意：

- 配置构建信息

![config](https://gitee.com/zengsl/picBed/raw/master/img/2021/12/20211217104043.png)

``` shell
yarn docs:build
docs/.vuepress/dist
```

- 配置域名

以`.vercel.app`结尾，否则可能需要配置DNS等内容，比较麻烦。