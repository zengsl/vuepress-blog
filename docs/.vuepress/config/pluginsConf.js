const moment = require('moment');

module.exports = [
	['@vuepress/medium-zoom', {
		selector: 'img',
		// medium-zoom options here
		// See: https://github.com/francoischalifour/medium-zoom#options
		options: {
			margin: 16
		}
	}],
	['@vuepress/last-updated', {
		transformer: (timestamp, lang) => {
			moment.locale("zh_cn")
			return moment(timestamp).format("LLLL")
		}
	}],
	['@vuepress/back-to-top'],
	['@vuepress/active-header-links', {
		sidebarLinkSelector: '.sidebar-link',
		headerAnchorSelector: '.header-anchor'
	}]
	,
	['@vuepress/pwa', {
		serviceWorker: true,
		updatePopup: {
			message: "内容有更新",
			buttonText: "刷新"
		}
	}]
]
