const isDev = process.env.NODE_ENV !== "production"

export default {
    // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
    ssr: false,

    // Target (https://go.nuxtjs.dev/config-target)
    target: "static",

    ...(!isDev && {
        modern: "client",
    }),

    env: {
        VUE_APP_API_URL: process.env.VUE_APP_API_URL,
        VUE_APP_FILES_URL: process.env.VUE_APP_FILES_URL,
        VUE_APP_TITLE: process.env.VUE_APP_TITLE,
        VUE_APP_TITLE_FULL: process.env.VUE_APP_TITLE_FULL,
    },

    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        title: process.env.VUE_APP_TITLE_FULL,
        titleTemplate: "%s | " + process.env.VUE_APP_TITLE,
        meta: [
            { charset: "utf-8" },
            { name: "viewport", content: "width=device-width, initial-scale=1" },
            // eslint-disable-next-line max-len
            {
                name: "description",
                content:
                    "Web application for searching and filtering music releases. Musigger provides flexible release filtering engine that sorts by genres, types, labels, votes and even artists.",
            },
            // eslint-disable-next-line max-len
            {
                property: "og:description",
                content:
                    "Web application for searching and filtering music releases. Musigger provides flexible release filtering engine that sorts by genres, types, labels, votes and even artists.",
            },
            { property: "og:title", content: process.env.VUE_APP_TITLE_FULL },
        ],
        link: [{ rel: "icon", type: "image/x-icon", href: "/img/icons/favicon.ico" }],
    },

    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: [{ src: "~assets/styles.scss", lang: "scss" }],

    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: ["@/plugins/vue-disqus", "@/plugins/vue-lazyload", "@/plugins/vue-notification"],

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [
        // https://go.nuxtjs.dev/eslint
        "@nuxtjs/eslint-module",
        "@nuxtjs/proxy",
    ],

    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: [
        // https://go.nuxtjs.dev/axios
        "@nuxtjs/axios",
        // https://go.nuxtjs.dev/pwa
        "@nuxtjs/pwa",
    ],

    router: {
        prefetchLinks: false,
    },

    proxy: {
        "/api": {
            target: "https://api.musigger.com/",
            changeOrigin: true,
        },
    },

    // Axios module configuration (https://go.nuxtjs.dev/config-axios)
    axios: {
        baseURL: process.env.VUE_APP_API_URL,
    },

    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {
        transpile: [/^vue-awesome/],
        extractCSS: true,
        terser: {
            extractComments: false,
        },
        optimization: {
            minimize: !isDev,
            usedExports: true,
            splitChunks: {
                minSize: 100000,
                maxSize: 250000,
                cacheGroups: {
                    styles: {
                        name: "styles",
                        test: /\.(css|vue)$/,
                        chunks: "all",
                        enforce: true,
                    },
                },
            },
        },
        ...(!isDev && {
            html: {
                minify: {
                    collapseBooleanAttributes: true,
                    decodeEntities: true,
                    minifyCSS: true,
                    minifyJS: true,
                    processConditionalComments: true,
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true,
                    trimCustomFragments: true,
                    useShortDoctype: true,
                },
            },
        }),
    },
}
