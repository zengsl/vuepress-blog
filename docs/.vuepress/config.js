const sidebarConf = require('./config/sidebarConf.js');
const navConf = require('./config/navConf.js');
const pluginsConf = require('./config/pluginsConf.js');
const headConf = require('./config/headConf.js');

module.exports = {
	title: 'coder Z', // 设置网站标题
	description: '泥瓦匠',
	head: headConf,
	smoothScroll: true,
	markdown: {
	    lineNumbers: true,
		extendMarkdown: md => {
		      md.set({html: true})
		      md.use(require("markdown-it-katex"))
		    }
	  },
	themeConfig: {
		logo: '/img/hero.png',
		sidebar: sidebarConf,
		nav: navConf,
		repo: 'zengsl/vuepress-blog',
	},
	plugins: pluginsConf
	,
	configureWebpack: {
		resolve: {
			alias: {
				'@docs-res': '/docs'
			}
		}
	}
}
