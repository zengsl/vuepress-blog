// const sidebarConf = require('./config/sidebarConf.js');
import sidebarConf from './config/sidebarConf.js'
import navConf from './config/navConf.js'
import pluginsConf from'./config/pluginsConf.js'
import headConf from './config/headConf.js'
import {defaultTheme} from "vuepress";
export default {
	title: 'coder Z', // 设置网站标题
	description: '泥瓦匠',
	head: headConf,
	smoothScroll: true,
	theme: defaultTheme({
		logo: '/img/hero.png',
		repo: 'zengsl/vuepress-blog',
		navbar: navConf,
		// 侧边栏数组
		// 所有页面会使用相同的侧边栏
		sidebar: sidebarConf,
		docsRepo: 'https://github.com/zengsl/vuepress-blog',
		docsBranch: 'master',
		docsDir: 'docs',
		editLinkPattern: ':repo/tree/:branch/:path',
	}),
	plugins: pluginsConf
// 增加markdown配置

}