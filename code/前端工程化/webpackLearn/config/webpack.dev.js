// 开发环境配置

const path = require('path');
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin =require("html-webpack-plugin");


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
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },
    plugin: [
        // 配置 eslint 插件
        new ESLintWebpackPlugin({
            // 指定检查文件的根目录
            context: path.resolve(__dirname, "../src")
        }),
        // 配置 html 插件
        new HtmlWebpackPlugin({
            // 设置html的模板文件
            // 自动设置打包生成的js资源
            template: path.resolve(__dirname, "../public/index.html")
        })
    ],
    // 配置开发服务器
    devServer: {
        host: "localhost",
        port: "3001",
        open: true // 自动打开浏览器
    },
    // 模式 production || development
    mode: "development"
};