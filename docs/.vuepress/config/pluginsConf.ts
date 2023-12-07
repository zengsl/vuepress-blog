
import { pwaPlugin } from '@vuepress/plugin-pwa'
import {pwaPopupPlugin} from "@vuepress/plugin-pwa-popup";
import { tocPlugin } from '@vuepress/plugin-toc'
import {registerComponentsPlugin} from "@vuepress/plugin-register-components";
import {path} from "@vuepress/utils";

export default [
	pwaPlugin(),
	pwaPopupPlugin({
		// 配置项
	}),
	tocPlugin({
		// 配置项
	}),
	registerComponentsPlugin({
		componentsDir: path.resolve(__dirname, '../../../components'),
	}),
]