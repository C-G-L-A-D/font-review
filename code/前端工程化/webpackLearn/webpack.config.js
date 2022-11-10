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
            {
                // 使用正则匹配处理 .css 文件
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    // webpack 插件
    plugins: [],
    // 模式 production || development
    mode: "development"
}