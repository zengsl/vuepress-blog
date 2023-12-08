import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import {registerComponentsPlugin} from "@vuepress/plugin-register-components";
import {  path } from '@vuepress/utils'
export default defineUserConfig({
  base: "/",
  locales: {
    "/": {
      lang: "zh-CN",
      title: "zzz",
      description: "zzz 的博客",
    },
  },

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
  plugins:[registerComponentsPlugin({
    componentsDir: path.resolve(__dirname, '../../components'),
  }),]
});
