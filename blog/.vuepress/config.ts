import {defineUserConfig} from "vuepress";
import theme from "./theme.js";
import {registerComponentsPlugin} from "@vuepress/plugin-register-components";
import {searchProPlugin} from "vuepress-plugin-search-pro";
import {getDirname, path} from 'vuepress/utils'

const __dirname = getDirname(import.meta.url);

// @ts-ignore
export default defineUserConfig({
    // 与pwa插件配合
    shouldPrefetch: false,
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
    plugins: [
        registerComponentsPlugin({
            componentsDir: path.resolve(__dirname, '../../components'),
        }),
    ],
    alias: {
        "@theme-hope/modules/blog/components/BlogHero": path.resolve(
            __dirname,
            "./components/BlogHero.vue",
        ),
    },
});
