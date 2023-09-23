
import { pwaPlugin } from '@vuepress/plugin-pwa'
import { shikiPlugin } from '@vuepress/plugin-shiki'
import {pwaPopupPlugin} from "@vuepress/plugin-pwa-popup";
import { tocPlugin } from '@vuepress/plugin-toc'

export default [
	pwaPlugin(),
	pwaPopupPlugin({
		// 配置项
	}),
	tocPlugin({
		// 配置项
	}),
	/*shikiPlugin({
		// 配置项
	}),*/
]