// 生产模式环境配置

const os = require("os")
const path = require('path');
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")

const threads = os.cpus().length

// 封装样式需要的loader
const getStyleLoaders = (preProcessor) => {
    return [
        MiniCssExtractPlugin.loader,
        "css-loader",
        {
            // 解决大多数css兼容性问题
            loader: "postcss-loader",
            options: {
                postcssOptions: {
                    plugins: [
                        "postcss-preset-env"
                    ]
                }
            }
        },
        preProcessor
    ].filter(Boolean)
}

module.exports = {
    // 打包入口文件
    entry: "./src/main.js",
    // 输出配置
    output: {
        // 指定输出文件所在目录
        path: path.resolve(__dirname, "../dist"),
        // 指定输出文件的文件名
        filename: "static/js/main.js",
        clean: true
    },
    // 配置lodaer(加载器)
    module: {
        // 配置规则
        rules: [
            {
                // webpack匹配文件处理，会默认把所有规则都进行对照，比较慢没必要
                oneOf: [
                    // 处理样式资源
                    {
                        // 使用正则匹配处理 .css 文件
                        test: /\.css$/i,
                        use: getStyleLoaders()
                    },
                    {
                        test: /\.less$/i,
                        use: getStyleLoaders("less-loader")
                    },
                    {
                        test: /\.s[ac]ss$/i,
                        use: getStyleLoaders("sass-loader")
                    },
                    // 处理图片资源
                    {
                        test: /\.(png|jpe?g|gif|webp)$/i,
                        // 将文件转换成 webpack 能识别的资源，同时可以根据大小处理资源形式
                        type: "asset",
                        // 解析器
                        parser: {
                            // 小于 10kb 的图片会被转换为base64
                            dataUrlCondition: {
                                maxSize: 10 * 1024
                            }
                        },
                        // 生成器
                        generator: {
                            // 设置图片输出目录和命名方式
                            // [ext]: 使用之前的文件扩展名
                            // [query]: 添加之前的 query 参数
                            filename: "static/imgs/[hash:8][ext][query]"
                        }
                    },
                    // 处理字体图标、音视频资源
                    {
                        test: /\.(ttf|woff2?|map4|map3|avi)$/i,
                        // 将资源转换城webpack能识别的资源
                        type: "asset/resource",
                        generator: {
                            filename: "static/media/[hash:8][ext][query]"
                        }
                    },
                    // 使用 babel 兼容 es6 语法
                    {
                        test: /\.js$/,
                        // 设置不处理安装的插件和依赖，因为已经经过处理了
                        exclude: /node_modules/,
                        use: [
                            {
                                loader: "babel-loader",
                                options: {
                                    // 缓存之前的babel编译结果，第二次打包时没有修改的文件就不用再经过babel转换
                                    cacheDirectory: true, // 开启babel编译缓存
                                    cacheCompression: false // 不压缩缓存文件
                                }
                            },
                            {
                                // 设置babel线程
                                loader: "thread-loader",
                                options: {
                                    worker: threads // 线程数量
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    },
    // webpack 插件
    plugins: [
        // 配置 eslint 插件
        new ESLintWebpackPlugin({
            // 指定检查文件的根目录
            context: path.resolve(__dirname, "../src"),
            // 设置不检查安装的插件和依赖
            exclude: "node_modules", // 默认值
            cache: true, // 开启缓存，缓存之前检查语法的编译文件
            // 设置缓存目录
            cacheLocation: path.resolve(__dirname, "../node_modules/.cache/.eslintcache"),
            threads
        }),
        // 配置 html 插件
        new HtmlWebpackPlugin({
            // 设置html的模板文件
            // 自动设置打包生成的js资源
            template: path.resolve(__dirname, "../public/index.html")
        }),
        // 配置css样式兼容性插件
        new MiniCssExtractPlugin({
            filename: "static/css/main.css"
        }),
        
    ],
    // 压缩插件配置
    optimization: {
        minimize: true,
        minimizer: [
            // 配置css样式压缩插件
            new CssMinimizerWebpackPlugin(),
            // 配置多线程插件
            new TerserPlugin({
                parallel: threads // 开启多线程
            })
        ]
    },
    /* 生产模式不需要开启服务器
    // 配置开发服务器
    devServer: {
        host: "localhost",
        port: "3001",
        open: true // 自动打开浏览器
    },
    */
    // 模式 production || development
    mode: "production",
    // 配置sourceMao，映射报错位置
    devtool: "source-map"
};