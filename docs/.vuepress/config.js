const sidebarConf = require('./config/sidebarConf.js');
const navConf = require('./config/navConf.js');
const pluginsConf = require('./config/pluginsConf.js');
const headConf = require('./config/headConf.js');

module.exports = {
	title: '泥瓦匠', // 设置网站标题
	description : '泥瓦匠',
	head: headConf,
	themeConfig: {
		logo: '/img/hero.png',
		// sidebar: 'auto',
		sidebar: sidebarConf,
		nav: navConf
	},
	plugins: pluginsConf
}
