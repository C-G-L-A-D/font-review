# 1. 安装项目依赖进行管理

## 1.1 创建项目模块相关描述文件

新建或初始化 `package.json` 文件，配置项目相关信息和记录项目依赖及其版本

```bash
npm init -y // 创建 package.json 文件
```

## 1.2 下载 webpack 运行相关依赖

`webpack` 在项目生产模式下并不需要，所以可以使用 `-D` 参数指定安装开发环境的依赖。 `webpack-cli` 可以帮助我们在命令行中输入相关命令运行 `webpack` 。

```bash
npm i webpack webpack-cli -D
# 或
yarn add webpack webpack-cli -D
```

## 1.3 运行 webpack 打包文件

为了不被全局 `webpack` 影响当前项目可以使用 `npx` 来指定运行当前项目的依赖。

```shell
#  npx webpack <入口文件路径> <打包模式 development||production>
npx webpack ./src/main.js --mode=production
```

# 2. webpack 基本常见配置

webpack 其实是一个平台，在这个平台中我们可以安装/融入/配置各种打包规则，对项目进行一些打包自定义设置。

1.  在项目根目录下创建 `webpack` 的配置文件 `webpack.config.js` ；
2.  创建一个用于记录 `webpack` 配置信息的对象，并使用 CommonJs 模块化将其暴露出去(Node 环境支持 CommonJs 模块化)；
3.  在配置对象中设置对应的配置选项：

```javascript
module.exports = {
  entry: '', // 打包入口文件，可根据模块化规范，分析出模块之间的依赖，从而安装相关的依赖规则进行打包

  output: {}, // 输出配置

  module: {
    // 配置lodaer(加载器)
    rules: [] // 配置规则
  },

  plugins: [], // webpack 插件
  mode: ''
}
```

4. 使用 `webpack` 配置文件之后，可以直接运行 `npx webpack` 命令

## 2.1 mode

**mode** ：可以指定项目的打包模式，其值可选：

- production：生产环境（默认），代码会压缩，NODE_EVN="production"
- development：开发环境，代码不会压缩，NODE_EVN="development"
- none

## 2.2 entry

**entry** ：可指定打包的入口文件。该项可根据模块化规范，分析出模块之间的依赖，从而安装相关的依赖规则进行打包

- 当入口文件只有一个时：

```javascript
// 简写语法
module.exports = {
  entry: './src/file.js'
}

// 以上简写语法等同于

module.exports = {
  entry: {
    main: './src/file.js'
  }
}
```

- 当需要扩展配置多个入口文件时：

```javascript
module.exports = {
  entry: {
    index: './src/index.js',
    
  }
}
```

## 2.3 output

**output** ：可配置项目打包出口。

```js
const path = require('path')
module.exports = {
  output: {
    // 指定打包后文件的名字,[hash]可为打包后的文件设置哈希值，从而有助于强缓存设置。
    filename: 'main.[hash].js',
    // 指定打包输出路径，可通过node的内置模块path获取项目「绝对路径」
    path: path.resovle(__dirname, './dist'),
    // 在生成文件之前清空 output 目录
    clean: true
  }
}
```

>  如果有多个打包入口，则出口文件的名称不能相同，因此可以通过 `[name]` 来代替打包输出文件名称，该输出文件的名称与入口文件名称一致。`[name]` 只在多入口配置时才能生效

## 2.4 loader

**loader** ：[加载器](https://www.webpackjs.com/loaders/)，「一般用于实现代码编译，但是想要编译什么类型的代码就需要安装对应的加载器，并完成相关的配置需求」

## 2.5 plugin

**plugin** ：[插件](https://www.webpackjs.com/concepts/plugins/),「例如：压缩、编译 HTML、清空打包等」

### a. HtmlWebpackPlugin 插件

 用于打包编译 HTML 的：

- 可以将打包后的 JS/CSS 自动导入页面中；
- 并且能够对 HTML 进行压缩处理。

 使用方法：

 首先需要安装 HtmlWebpackPlugin 插件

```bash
npm install --save-dev html-webpack-plugin
# 或
yarn add html-webpack-plugin -D
```

```js
// 引入该插件
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  plugins: [new HtmlWebpackPlugin({
    // 设置html的模板文件
    // 自动设置打包生成的js资源
    template: path.resolve(__dirname, 'public/index.html'),
    // 打包后文件的名字
    filename: 'index.html',
    // 是否压缩
    minify: true,
    // 多入口文件配置不同 HtmlWebpackPlugin 时，可使用 chunks 指定使用该 HtmlWebpackPlugin 配置的入口文件
    chunks: ['index']
  })]
}
```

## 2.6 resolve

**resolve**：解析器

## 2.7 optimization

**optimization**：优化项

## 2.8 devServer

**devServer**：配合 webpack-dev-server，启动 web 服务，实现项目预览以及跨域处理

# 3. webpack 零配置打包
