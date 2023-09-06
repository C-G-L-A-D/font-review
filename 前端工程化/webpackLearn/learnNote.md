# 1. 安装项目依赖进行管理

## 1.1 创建项目模块相关描述文件

​ 新建或初始化 `package.json` 文件，配置项目相关信息和记录项目依赖及其版本

```
npm init -y // 创建 package.json 文件
```

## 1.2 下载 webpack 运行相关依赖

`webpack` 在项目生产模式下并不需要，所以可以使用 `-D` 参数指定安装开发环境的依赖。 `webpack-cli` 可以帮助我们在命令行中输入相关命令运行 `webpack` 。

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

​ webpack 其实是一个平台，在这个平台中我们可以安装/融入/配置各种打包规则，对项目进行一些打包自定义设置。

1.  在项目根目录下创建 `webpack` 的配置文件 `webpack.config.js` ；
2.  创建一个用于记录 `webpack` 配置信息的对象，并使用 CommonJs 模块化将其暴露出去(Node 环境支持 CommonJs 模块化)；
3.  在配置对象中设置对应的配置选项：

```javascript
module.exports = {
  entry: '', // 打包入口文件，可根据模块化规范，分析出模块之间的依赖，从而安装相关的依赖规则进行打包

  output: {}, // 输出配置

  loader: {}, // 加载器「一般用于实现代码编译，但是想要编译什么类型的代码就需要安装对应的加载器，并完成相关的配置需求」https://www.webpackjs.com/loaders/

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

​ **mode** 项可以指定项目的打包模式，其值可选：

- production：生产环境（默认）
- development：开发环境
- none

## 2.2 entry

​ **entry** 项可指定打包的入口文件。该项可根据模块化规范，分析出模块之间的依赖，从而安装相关的依赖规则进行打包

- 当入口文件只有一个时：

```javascript
// 简写语法
module.exports = {
  entry: '../../src/file.js'
}

// 以上简写语法等同于

module.exports = {
  entry: {
    main: '../../src/file.js'
  }
}
```

- 当需要扩展配置多个入口文件时：

```javascript

```
