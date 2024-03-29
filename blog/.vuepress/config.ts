import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import {registerComponentsPlugin} from "@vuepress/plugin-register-components";
import {  path } from '@vuepress/utils'
import {searchProPlugin} from "vuepress-plugin-search-pro";
// @ts-ignore
export default defineUserConfig({
  base: "/",
  locales: {
    "/": {
      lang: "zh-CN",
      title: "zzz's Blog",
      description: "zzz 的博客",
    },
  },

  theme,
  // Enable it with pwa
  // shouldPrefetch: false,
  plugins:[registerComponentsPlugin({
    componentsDir: path.resolve(__dirname, '../../components'),
  }),
    searchProPlugin({
      // 索引全部内容
      indexContent: true,
      // 为分类和标签添加索引
      customFields: [
        {
          getter: (page) => page.frontmatter.category,
          formatter: "分类：$content",
        },
        {
          getter: (page) => page.frontmatter.tag,
          formatter: "标签：$content",
        },
      ],
    }),
  ]
});
