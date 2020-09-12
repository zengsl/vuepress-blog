const sidebarConf = require('./config/sidebarConf.js');
const navConf = require('./config/navConf.js');

module.exports = {
	title: '泥瓦匠', // 设置网站标题
	description : '泥瓦匠',
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
