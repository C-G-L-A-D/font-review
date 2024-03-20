// 开发环境配置

const os = require("os")
const path = require('path');
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")

const threads = os.cpus().length

module.exports = {
    entry: "./src/main.js",
    output: {
        // 开发模式没有输出
        path: undefined,
        filename: "static/js/main.js"
        // clean: true // 不需要输出，所以不用清空
    },
    module: {
        rules: [
            {
                // webpack匹配文件处理，会默认把所有规则都进行对照，比较慢没必要
                oneOf: [
                    // 处理样式资源
                    {
                        // 使用正则匹配处理 .css 文件
                        test: /\.css$/i,
                        use: ["style-loader", "css-loader"]
                    },
                    {
                        test: /\.less$/i,
                        use: [
                            "style-loader",
                            "css-loader",
                            "less-loader"
                        ]
                    },
                    {
                        test: /\.s[ac]ss$/i,
                        use: [
                            "style-loader",
                            "css-loader",
                            "sass-loader"
                        ]
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
                                    cacheCompression: false, // 不压缩缓存文件
                                    // 引入插件，使打包babel文件时只引用一个辅助函数
                                    plugins: ["@babel/plugin-transform-runtime"]
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
            // 设置eslint线程
            threads
        }),
        // 配置 html 插件
        new HtmlWebpackPlugin({
            // 设置html的模板文件
            // 自动设置打包生成的js资源
            template: path.resolve(__dirname, "../public/index.html")
        })
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
    // 配置开发服务器
    devServer: {
        host: "localhost",
        port: "3001",
        open: true, // 自动打开浏览器
        // 设置热模块替换HotModuleReplacement，修改代码后，只更新修改的模块，提升打包编译速度
        hot: true // 默认开启，但是只有样式直接支持，js代码需要在进行处理
    },
    // 模式 production || development
    mode: "development",
    // 配置sourceMap，映射报错位置
    devtool: "cheap-module-source-map"
};