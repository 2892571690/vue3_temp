'use strict'
const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const CompressionPlugin = require('compression-webpack-plugin')

// 匹配此 {RegExp} 的资源
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i

const name = process.env.VUE_APP_TITLE || '' // 网页标题

module.exports = {
    // 部署生产环境和开发环境下的URL
    publicPath: process.env.BASE_URL,
    // 在npm run build 或 yarn build 时 ，生成文件的目录名称（要和baseUrl的生产环境路径一致）（默认dist）
    outputDir: 'dist',
    // 用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
    assetsDir: 'static',
    // 是否开启eslint保存检测，有效值：ture | false | 'error'
    lintOnSave: process.env.NODE_ENV === 'development',
    // 如果你不需要生产环境的 source wzMap，可以将其设置为 false 以加速生产环境构建。
    // 既可以减少包大小，也可以加密源码。
    productionSourceMap: false,
    // 打包文件是否使用hash
    filenameHashing: true,
    // webpack-dev-server 相关配置
    devServer: {
        https: false, // 是否使用https协议
        port: '8080',
        open: true, // 是否自动弹出浏览器页面
        overlay: { // 让浏览器 overlay 同时显示警告和错误
            warnings: false,
            errors: true
        },
        proxy: {
            [process.env.VUE_APP_BASE_API]: {
                target: 'https://mock.mengxuegu.com/mock',
                // 开启代理，在本地创建一个虚拟服务端
                changeOrigin: true,
                // ws: false, // 是否启用websockets
                pathRewrite: {
                    ['^' + process.env.VUE_APP_BASE_API]: ''
                }
            }
        }
    },
    configureWebpack: {
        // 在网页包的名称字段中提供应用程序的标题，以便
        // 它可以在索引中访问。html来插入正确的标题。
        name: name,
        resolve: {
            alias: {
                '@': resolve('src')
            }
        },
        plugins: [
            // 配置webpack 压缩
            new CompressionPlugin({
                filename: '[path][base].gz', // 目标资源名称
                algorithm: 'gzip',
                test: productionGzipExtensions, // 匹配文件名
                threshold: 10240, // 对超过10kb的数据进行压缩
                minRatio: 0.8, // 只有压缩率比这个值小的资源才会被处理
                deleteOriginalAssets: false // 是否删除原文件
            })
        ]
    },
    /*
    * 用chainWebpack做高级配置
    * Vue CLI 内部的 webpack 配置是通过 webpack-chain 维护的。
    * 这个库提供了一个 webpack 原始配置的上层抽象，使其可以定义具名的 loader 规则和具名插件，并有机会在后期进入这些规则并对它们的选项进行修改。
    * 它允许我们更细粒度的控制其内部配置。接下来有一些常见的在 vue.config.js 中的 chainWebpack 修改的例子。
    * */
    chainWebpack: config => {
        config.plugins.delete('preload') // TODO: need test
        config.plugins.delete('prefetch') // TODO: need test

        config.resolve.symlinks(true) // 修复热更新失效

        // svg rule loader
        config.module
            .rule('svg')
            .exclude.add(resolve('src/assets/icons'))
            .end()

        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/assets/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
        // .end()

        config
            .when(process.env.NODE_ENV !== 'development',
                config => {
                    config.plugin('ScriptExtHtmlWebpackPlugin')
                        .after('html')
                        .use('script-ext-html-webpack-plugin', [{
                            // `runtime` must same as runtimeChunk name. default is `runtime`
                            inline: /runtime\..*\.js$/
                        }])
                        .end()
                    config.optimization.splitChunks({
                        chunks: 'all',
                        cacheGroups: {
                            libs: {
                                name: 'chunk-libs',
                                test: /[\\/]node_modules[\\/]/,
                                priority: 10,
                                chunks: 'initial' // only package third parties that are initially dependent
                            },
                            elementPlus: {
                                name: 'chunk-elementPlus', // split elementUI into a single package
                                priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                                test: /[\\/]node_modules[\\/]_?element-plus(.*)/ // in order to adapt to cnpm
                            },
                            commons: {
                                name: 'chunk-commons',
                                test: resolve('src/components'), // can customize your rules
                                minChunks: 3, //  minimum common number
                                priority: 5,
                                reuseExistingChunk: true
                            }
                        }
                    })
                    // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
                    config.optimization.runtimeChunk('single')
                }
            )
    },
    css: {
        loaderOptions: {
            sass: {
                data: `@import "@/styles/variables.scss";`
            }
        }
    },
}
