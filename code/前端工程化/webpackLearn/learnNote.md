# 1. 安装项目依赖进行管理
## 1.1 创建项目模块相关描述文件
​	新建或初始化 `package.json` 文件，配置项目相关信息和记录项目依赖及其版本

``` 
npm init -y // 创建 package.json 文件
```



## 1.2 下载 webpack 运行相关依赖
`webpack` 在项目生产模式下并不需要，所以可以使用 ``-D`` 参数指定安装开发环境的依赖。
`webpack-cli` 可以帮助我们在命令行中输入相关命令运行 `webpack` 。

```
npm i webpack webpack-cli -D
```



## 1.3 运行 webpack 打包文件
为了不被全局 `webpack` 影响当前项目可以使用 `npx` 来指定运行当前项目的依赖。

```
// npx webpack <入口文件路径> <打包模式 development||production>
npx webpack ./src/main.js --mode=production
```



# 2. webpack 基本配置

1.  在项目根目录下创建 `webpack` 的配置文件 `webpack.config.js` ；
2. 创建一个用于记录 `webpack` 配置信息的对象，并使用CommonJs模块化将其暴露出去(Node环境支持CommonJs模块化)；
3. 在配置对象中设置对应的配置选项：

```javascript
module.exports = {
    // 打包入口文件
    entry: "",
    // 输出配置
    output: {},
    // 配置lodaer(加载器)
    module: {
        // 配置规则
        rules: []
    },
    // webpack 插件
    plugins: [],
    // 模式 production || development
    mode: ""
}
```

4. 使用 `webpack` 配置文件之后，可以直接运行 `npx webpack` 命令