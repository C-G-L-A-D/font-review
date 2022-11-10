const path = require('path')

module.exports = {
    // 打包入口文件
    entry: "./src/main.js",
    // 输出配置
    output: {
        // 指定输出文件所在目录
        path: path.resolve(__dirname, "dist"),
        // 指定输出文件的文件名
        filename: "static/js/main.js"
    },
    // 配置lodaer(加载器)
    module: {
        // 配置规则
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
            }
        ]
    },
    // webpack 插件
    plugins: [],
    // 模式 production || development
    mode: "development"
}