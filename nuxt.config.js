const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
    /*
     ** Headers of the page
     */
    head: {
        title: 'H计划',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Nuxt.js project' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    /*
     ** Global CSS
     */
    css: ['~assets/css/main.css',
        '~node_modules/iview/dist/styles/iview.css',
        '~assets/css/quill.bubble.css',
        '~assets/css/quill.core.css',
        '~assets/css/quill.snow.css',
    ],
    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#3B8070' },
    /*
     ** Build configuration
     */
    plugins: [
        { src: '~plugins/iview.js', ssr: true },
        { src: '~plugins/nuxt-quill-plugin.js', ssr: false }
    ],
    router: {
        mode: 'hash'
    },
    build: {
        /*
         ** Run ESLINT on save
         */
        // extend(config, ctx) {
        //     if (ctx.isClient) {
        //         config.module.rules.push({
        //             enforce: 'pre',
        //             test: /\.(js|vue)$/,
        //             loader: 'eslint-loader',
        //             exclude: /(node_modules)/
        //         })
        //     }
        // },
        // vendor: ['axios'],
        plugins: [
            new ExtractTextPlugin({
                filename: 'styles.css'
            })
        ]
    },
}