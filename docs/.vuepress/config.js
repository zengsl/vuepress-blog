const sidebarConf = require('./config/sidebarConf.js');
const navConf = require('./config/navConf.js');

module.exports = {
	title: 'Import', // 设置网站标题
	description : 'Import',
	head: [
	    ['link', { rel: 'icon', href: '/favicon.ico' }]
	  ],
	themeConfig: {
		logo: '/img/hero.png',
		// sidebar: 'auto',
		sidebar: sidebarConf,
		nav: navConf
	}
}
