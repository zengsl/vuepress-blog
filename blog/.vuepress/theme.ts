import {hopeTheme} from "vuepress-theme-hope";
import {enNavbar, zhNavbar} from "./navbar/index.js";
import {enSidebar, zhSidebar} from "./sidebar/index.js";

const MR_HOPE_AVATAR =
    '<svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient gradientTransform="matrix(.2478 .78133 -2.54797 .63622 910.35 281.58)" gradientUnits="userSpaceOnUse" id="a" x1="37.827" x2="159.988" y1="272.916" y2="274.63"><stop offset=".75" stop-color="#e33939"/><stop offset=".998" stop-color="#fff"/></linearGradient><linearGradient gradientTransform="matrix(.13814 .80797 2.55599 -.6032 34.087 494.369)" gradientUnits="userSpaceOnUse" id="b" x1="37.827" x2="159.988" y1="272.916" y2="274.63"><stop offset=".815" stop-color="#e33939"/><stop offset="1" stop-color="#fff"/></linearGradient></defs><path d="M135.637 588.067c-48.891-201.334 74.605-404.162 275.837-453.028 201.233-48.866 403.998 74.734 452.889 276.068 48.892 201.335-74.606 404.162-275.838 453.029-201.233 48.866-403.997-74.734-452.888-276.069Z" fill="#fde68a" fill-rule="evenodd" stroke="#d08819" stroke-linecap="round" stroke-linejoin="round" stroke-width="10"/><path d="M596.076 197.044c-3.342-56.09 56.897-77.831 89.017-51.361m-410.65 128.819c-22.753-51.377-86.256-43.07-102.659-4.816" fill="none" stroke="#6d5e56" stroke-linecap="round" stroke-linejoin="round" stroke-width="11"/><path d="M833.568 288.02c.05 18.046-12.584 30.699-21.346 32.211-8.762 1.512-17.031-1.099-18.584-1.341 0 0-61.363-6.103-105.627 6.921-44.265 13.026-87.04 47.387-94.637 51.892-6.627 3.928-29.112 7.697-44.462-12.938-15.351-20.636.024-41.526.024-41.526s12.685-18.279 40.771-35.123c28.088-16.844 24.624-13.226 52.326-25.696 15.247-6.865 43.319-14.186 67.429-17.069 25.193-3.011 46.348-1.384 57.673.769 22.165 4.212 28.632 5.93 39.169 9.229 12.451 3.898 27.214 14.516 27.264 32.671Z" fill="#fff" fill-rule="evenodd" stroke="#d08819" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/><path d="M558.351 345.632c-3.458-14.237 5.214-28.566 19.367-32.003 14.154-3.437 28.43 5.32 31.887 19.557 3.458 14.238-5.212 28.567-19.367 32.004-14.152 3.437-28.43-5.319-31.887-19.558Z" fill="#6d5e56" fill-rule="evenodd" stroke="#6d5e56" stroke-linecap="round" stroke-linejoin="round" stroke-width="6.268"/><path d="M220.249 483.416c46.81-11.689 91.323-.467 99.42 25.064 8.098 25.532-23.286 55.706-70.097 67.393-46.811 11.689-91.323.467-99.42-25.064-8.097-25.532 23.286-55.706 70.097-67.393Z" fill="url(#a)" fill-rule="evenodd" opacity=".261"/><path d="M739.9 357.226c-46.959 11.082-81.367 41.469-76.853 67.871 4.514 26.402 46.241 38.821 93.198 27.738 46.958-11.081 81.366-41.467 76.853-67.869-4.514-26.403-46.241-38.821-93.198-27.74Z" fill="url(#b)" fill-rule="evenodd" opacity=".261"/><path d="M400.934 398.917c-.599 18.034-13.681 30.218-22.494 31.409-8.812 1.192-16.982-1.716-18.526-2.014 0 0-61.109-8.334-105.819 3.07-44.709 11.404-88.696 44.181-96.452 48.406-6.763 3.683-29.372 6.632-43.972-14.546-14.6-21.18 1.519-41.494 1.519-41.494s13.335-17.803 42.013-33.612c28.677-15.809 25.085-12.319 53.222-23.772 15.484-6.304 43.803-12.598 68.005-14.6 25.288-2.093 46.373.305 57.616 2.867 22 5.016 28.401 6.968 38.813 10.649 12.304 4.348 26.677 15.496 26.075 33.637Z" fill="#fff" fill-rule="evenodd" stroke="#d08819" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/><path d="M129.05 445.546c-3.458-14.239 5.213-28.566 19.367-32.003 14.153-3.437 28.429 5.318 31.887 19.557 3.458 14.238-5.213 28.566-19.367 32.003-14.153 3.437-28.43-5.318-31.887-19.557Z" fill="#6d5e56" fill-rule="evenodd" stroke="#6d5e56" stroke-linecap="round" stroke-linejoin="round" stroke-width="6.268"/><path d="M424.381 696.386s64.427 13.646 101.996 5.757C640.653 678.146 690.8 521.894 690.8 521.894" fill="none" stroke="#d08819" stroke-linecap="round" stroke-linejoin="round" stroke-width="11"/><path d="M796.04 666.774s-10.734-44.165-41.405-11.348c-9.681 10.359-10.438 40.604-28.217 81.89-15.942 37.02-39.564 60.728-42.938 76.063-3.374 15.335.451 35.992 26.352 41.537 25.902 5.545 41.967-23.381 41.967-23.381l44.241-164.761Z" fill="#fde68a" fill-rule="evenodd" stroke="#d08819" stroke-linecap="round" stroke-linejoin="round" stroke-width="10"/><path d="M793.337 664.734c-37.075 160.045-51.73 163.145-40.343 184.845 11.387 21.701 51.417 33.716 71.876-7.313 6.734-13.505-1.31-43.317-1.511-78.077-.307-53.06 16.865-86.111 10.403-98.1-15.332-28.452-39.377-5.875-40.425-1.355Z" fill="#fde68a" fill-rule="evenodd" stroke="#d08819" stroke-linecap="round" stroke-linejoin="round" stroke-width="10"/></svg>';

export default hopeTheme({
    hostname: "https://zengsl.vercel.app",
    fullscreen: true,
    themeColor: true,
    author: {
        name: "leo z",
        url: "https://github.com/zengsl",
    },

    iconAssets: ["fontawesome-with-brands" ,"iconify"],

    logo: "https://theme-hope-assets.vuejs.press/logo.svg",

    repo: "https://github.com/zengsl/vuepress-blog",

    docsDir: "src",

    blog: {
        /* avatar:"/assets/images/child.jpg",*/
        description: "CV工程师",
        intro: "/about/intro.html",
        medias: {
            V2EX: ["https://www.v2ex.com/?r=zzzlll0", "<svg viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
            "   <circle cx=\"512\" cy=\"512\" r=\"512\" style=\"fill:#222223\"/>\n" +
            "   <path d=\"M333.9 435.8h49.6l-2 5.1c-1.1 2.8-13.9 37.7-28.7 77.4L326 590.5l-26.4.2-26.5.3-29-76.7c-15.9-42.2-29.1-77.2-29.3-77.6-.2-.5 11.2-.9 25.2-.9h25.5l3.4 11c2 6.1 9.6 30.7 17.1 54.7 7.6 24 13.8 43.2 14.1 42.7.3-.5 7.9-25 17.1-54.7l16.7-53.7zm86.5-1.5c-18.2 2.9-31.5 12.6-37.6 27.1-3.1 7.6-6 20-4.8 21.2.8.8 42.1 4.2 43.2 3.5.4-.2.7-1.5.7-2.7 0-3.7 3.7-12.7 6.2-15 3-2.9 8.8-5.1 13.2-5.1 7.1.1 14.6 5 16.9 11.1 4.1 10.7-2.9 20.8-27.7 39.8-27.3 20.8-41 34.9-48.1 49.7-3.8 7.8-7.2 18-7.8 23.2l-.3 3.4h129.6l.3-17.5.2-17.4h-33.6l-33.7-.1 5.4-4.8c2.9-2.7 8.9-7.4 13.3-10.5 21.8-15.4 32.5-24.8 38.5-34.1 9.2-14 11-32.2 4.3-46.2-5.8-12.3-15.9-20.1-31.2-24.1-10.4-2.8-34.5-3.6-47-1.5zm362.5 115.6c-13.9-21.2-25.3-38.8-25.3-39.1 0-.4 10.6-17.2 23.6-37.3 13-20.2 23.6-37 23.6-37.3 0-.3-11.9-.5-26.3-.5h-26.3l-12.7 22.6c-6.9 12.5-12.9 22.8-13.3 23.1-.3.2-6.6-10-13.8-22.6l-13.2-23.1h-26.7c-14.7 0-26.8.2-26.8.4s10.7 16.7 23.8 36.6c13.1 19.8 23.7 36.6 23.7 37.3 0 .7-10.8 17.4-24 37.2l-24 36-.3-13.8-.3-13.9-40.9-.2-40.9-.3v-29.5l37.1-.3 37-.2-.2-16-.3-15.9-37-.3-37.1-.2V469h80.5v-33.4H514.1v155.1l90.5-.2 90.5-.3 14.5-23.6c8.1-13 14.8-23.7 15.3-23.8.4-.2 7.3 10.5 15.4 23.8l14.6 24h27.4c21.6 0 27.2-.3 26.6-1.3-.3-.3-12-18.2-26-39.4z\" style=\"fill:#fff\"/>\n" +
            "</svg>"],
            Email: "mailto:zengsl0212@hotmail.com",
            Gitee: "https://gitee.com/zengsl",
            GitHub: "https://github.com/zengsl",
            Gmail: "mailto:leo.oooolll@gmail.com",
            Reddit: "https://www.reddit.com/user/zenglll",
            Twitter: "https://twitter.com/zzzZeng3",
            BiliBili: "https://space.bilibili.com/437799265?spm_id_from=333.1007.0.0",
        },
    },
// navbar
    navbar: zhNavbar,

    // sidebar
    sidebar: zhSidebar,

    footer: "Never say die",

    displayFooter: true,

    encrypt: {
        config: {
            "/demo/encrypt.html": ["1234"],
            "/zh/demo/encrypt.html": ["1234"],
        },
    },

    plugins: {
        blog: true,
        // install @waline/client before enabling it
        // WARNING: This is a test server for demo only.
        // You should create and use your own comment service in production.
        // comment: {
        //   provider: "Waline",
        //   serverURL: "https://waline-comment.vuejs.press",
        // },
        comment: {
            provider: "Giscus",
            repo: "zengsl/vuepress-blog-giscus",
            repoId: "R_kgDOK4QM7w",
            category: "Announcements",
            categoryId: "DIC_kwDOK4QM784Cbpkx",
            mapping: "pathname",
            lazyLoading: true,
            strict: true,
            reactionsEnabled: true,
            inputPosition: "bottom",
            lightTheme: "light",
            darkTheme: "dark",
        },
        /*
        https://giscus.app/zh-CN
        <script src="https://giscus.app/client.js"
        data-repo="zengsl/vuepress-blog-giscus"
        data-repo-id="R_kgDOK4QM7w"
        data-category="Announcements"
        data-category-id="DIC_kwDOK4QM784Cbpkx"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="bottom"
        data-theme="preferred_color_scheme"
        data-lang="zh-CN"
        crossorigin="anonymous"
        async>
</script>*/

        // all features are enabled for demo, only preserve features you need here
        mdEnhance: {
            // 启用 kotlin 交互演示
            kotlinPlayground: true,
            align: true,
            attrs: true,
            // 启用 GFM 警告
            alert: true,
            // install chart.js before enabling it
            // chart: true,

            codetabs: true,

            // insert component easily
            // component: true,

            demo: true,

            // install echarts before enabling it
            // echarts: true,

            figure: true,

            // install flowchart.ts before enabling it
            // flowchart: true,

            // gfm requires mathjax-full to provide tex support
            // gfm: true,

            imgLazyload: true,
            imgSize: true,
            include: true,

            // install katex before enabling it
            // katex: true,

            // install mathjax-full before enabling it
            // mathjax: true,

            mark: true,

            // install mermaid before enabling it
            // mermaid: true,

            playground: {
                presets: ["ts", "vue"],
            },

            // install reveal.js before enabling it
            // revealJs: {
            //   plugins: ["highlight", "math", "search", "notes", "zoom"],
            // },

            stylize: [
                {
                    matcher: "Recommended",
                    replacer: ({tag}) => {
                        if (tag === "em")
                            return {
                                tag: "Badge",
                                attrs: {type: "tip"},
                                content: "Recommended",
                            };
                    },
                },
            ],
            sub: true,
            sup: true,
            tabs: true,
            vPre: true,

            // install @vue/repl before enabling it
            // vuePlayground: true,
        },
        photoSwipe: true,
        // uncomment these if you want a PWA
        pwa: true,
        // pwa: {
        //   favicon: "/favicon.ico",
        //   cacheHTML: true,
        //   cachePic: true,
        //   appendBase: true,
        //   apple: {
        //     icon: "/assets/icon/apple-icon-152.png",
        //     statusBarColor: "black",
        //   },
        //   msTile: {
        //     image: "/assets/icon/ms-icon-144.png",
        //     color: "#ffffff",
        //   },
        //   manifest: {
        //     icons: [
        //       {
        //         src: "/assets/icon/chrome-mask-512.png",
        //         sizes: "512x512",
        //         purpose: "maskable",
        //         type: "image/png",
        //       },
        //       {
        //         src: "/assets/icon/chrome-mask-192.png",
        //         sizes: "192x192",
        //         purpose: "maskable",
        //         type: "image/png",
        //       },
        //       {
        //         src: "/assets/icon/chrome-512.png",
        //         sizes: "512x512",
        //         type: "image/png",
        //       },
        //       {
        //         src: "/assets/icon/chrome-192.png",
        //         sizes: "192x192",
        //         type: "image/png",
        //       },
        //     ],
        //     shortcuts: [
        //       {
        //         name: "Demo",
        //         short_name: "Demo",
        //         url: "/demo/",
        //         icons: [
        //           {
        //             src: "/assets/icon/guide-maskable.png",
        //             sizes: "192x192",
        //             purpose: "maskable",
        //             type: "image/png",
        //           },
        //         ],
        //       },
        //     ],
        //   },
        // },
    },
});
