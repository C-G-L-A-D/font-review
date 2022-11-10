const path = require('path')

module.exports = {
    // 打包入口文件
    entry: "./src/main.js",
    // 输出配置
    output: {
        // 指定输出文件所在目录
        path: path.resolve(__dirname, "dist"),
        // 指定输出文件的文件名
        filename: "main.js"
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
                type: "asset"
            }
        ]
    },
    // webpack 插件
    plugins: [],
    // 模式 production || development
    mode: "development"
}