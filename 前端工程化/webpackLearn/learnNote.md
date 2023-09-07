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
    index: './src/index.js'
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

> 如果有多个打包入口，则出口文件的名称不能相同，因此可以通过 `[name]` 来代替打包输出文件名称，该输出文件的名称与入口文件名称一致。`[name]` 只在多入口配置时才能生效

## 2.4 loader

**loader** ：[加载器](https://www.webpackjs.com/loaders/)，「一般用于实现代码编译，但是想要编译什么类型的代码就需要安装对应的加载器，并完成相关的配置需求」

### a. 处理样式资源

1. 把预编译语言（less/sass/scss 等）编译为 css
2. 给 CSS3 设置前缀（处理不同浏览器样式兼容性）
3. 处理特殊语法「@import/url」
4. 实现 CSS 的合并打包「内嵌/外链」

​	配置方法：

- 打包后 CSS 内嵌在 JS 文件内

```js
module.exports = {
  {
    // 使用正则匹配处理 .css 文件，执行顺序下->上，右->左
    test: /\.(css|less|s[ac]ss|)$/i,
    use: [
      'style-loader',
      'css-loader',
  		// 配合autoprefixer&browerlist给CSS3属性设置前缀「兼容」
      {
 				loader: 'postcss-loader',
  			options: {
  				postcssOptions: {
  					plugins: [require('autoprefixer')]
					}
				}
			}
      'less-loader',
      'sass-loader'
    ]
  }
}
```

- 打包后抽离 CSS 文件，使用外链式。需使用 MiniCssExtractPlugin 插件，插件配置详看 [MiniCssExtractPlugin 插件](# c. MiniCssExtractPlugin)

```js
module.exports = {
  {
    // 使用正则匹配处理 .css 文件，执行顺序下->上，右->左
    test: /\.(css|less|s[ac]ss|)$/i,
    use: [
      MiniCssExtractPlugin.loader, // 抽离CSS代码
      // 'style-loader', 把CSS以内嵌式导入到页面中
      'css-loader',
  		...
    ]
  }
}
```

### b. 处理图片资源

​	处理图片资源需通过 `file-loader` 和 `url-loader` 但是 webpack5 已将这两个 loader 进行内置，因此不需要像之前版本一样额外安装。

​	配置方法：

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|webp)$/i,
        // 将文件转换成 webpack 能识别的资源，同时可以根据大小处理资源形式
        type: 'asset',
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
          filename: 'static/imgs/[hash:8][ext][query]'
        }
      }
    ]
  }
}
```

### c. 处理字体、图标、音视频资源

​	与处理图片资源配置相同，所需要的 loader 都已内置在 webpack5 中

​	配置方法：

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(ttf|woff2?|map4|map3|avi)$/i,
        // 将资源转换城webpack能识别的资源
        type: 'asset/resource',
        generator: {
          filename: 'static/media/[hash:8][ext][query]'
        }
      }
    ]
  }
}
```

### d. 使用 babel 兼容 ES6 语法

​	配置方法：

1）安装相关依赖

```bash
yarn add babel babel-loader @babel/preset-env @babel/core -D
yarn add @babel/polyfill
```

2）在 webpack.config.js 中配置 babel-loader 规则

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/, // 排除 node_modules 下的内容
        include: path.resolve(__dirname, src), // 指定编译目录
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}
```

4）处理 ES6 内置 API 的兼容需要在 js 文件内引入 @babel/polyfill 。因为 ES6 部分内置 API 需要重写

```js
// index.js
import '@babel/polyfill'
```

## 2.5 plugin

**plugin** ：[插件](https://www.webpackjs.com/concepts/plugins/),「例如：压缩、编译 HTML、清空打包等」

### a. HtmlWebpackPlugin 插件

​	用于打包编译 HTML 的：

- 可以将打包后的 JS/CSS 自动导入页面中；
- 并且能够对 HTML 进行压缩处理。

​	配置方法：

​	1）首先需要安装 HtmlWebpackPlugin 插件

```bash
npm install --save-dev html-webpack-plugin
# 或
yarn add html-webpack-plugin -D
```

​	2）然后配置插件

```js
// 引入该插件
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      // 设置html的模板文件
      // 自动设置打包生成的js资源
      template: path.resolve(__dirname, 'public/index.html'),
      // 打包后文件的名字
      filename: 'index.html',
      // 是否压缩
      minify: true,
      // 多入口文件配置不同 HtmlWebpackPlugin 时，可使用 chunks 指定使用该 HtmlWebpackPlugin 配置的入口文件
      chunks: ['index']
    })
  ]
}
```

### b. CleanWebpackPlugin 插件

​	可用于清除久的打包文件。

​	配置方法：

​	1）首先需要安装 CleanWebpackPlugin 插件

```bash
npm install --save-dev clean-webpack-plugin
# 或
yarn add clean-webpack-plugin -D
```

​	2）然后配置插件

```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
  plugins: [
    // 无需配置项
    new CleanWebpackPlugin()
  ]
}
```

### c. MiniCssExtractPlugin 插件

​	配置方法：

​	1）首先需要安装 MiniCssExtractPlugin 插件

```bash
npm install --save-dev mini-css-extract-plugin
# 或
yarn add mini-css-extract-plugin -D
```

​	2）配置插件

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      // 打包后css文件的名称
      filename: 'main.[hash:8].css'
    })
  ]
}
```

### d. ESLintWebpackPlugin 插件

​	用于配置 ESLint

​	配置方法：

​	1）安装相关插件依赖

```bash
yarn add eslint-webpack-plugin -D
```

​	2）配置插件

```js
const ESLintWebpackPlugin = require('eslint-webpack-plugin')
module.exports = {
  plugins: [
    new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, 'src')
    })
  ]
}
```

## 2.6 resolve

**resolve**：解析器

### a. 配置别名

​	配置方法：

```js
module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
}
```

## 2.7 optimization

**optimization**：优化项。

### a. 压缩 CSS/JS

​	配置方法：

​	1）首先需要安装相关依赖

```bash
yarn add css-minimizer-webpack-plugin terser-webpack-plugin D
```

​	2）配置规则

```js
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
  optimization: {
    // 设置压缩方式
    minimizer: [
      new CssMinimizerWebpackPlugin(), // 压缩css
      new TerserPlugin() // 压缩js
    ]
  }
}
```

## 2.8 devServer

**devServer**：配合 webpack-dev-server，在客户端本地启动 web 服务，实现项目预览以及跨域处理。实现原理过程如下：

1） 项目进行打包，打包后的内容没有放在 dist 目录下，而是存放在虚拟内存；

2） 启动 web 服务器，从虚拟内存中获取打包内容，进行实时预览；

3） 热更新「当代码修改后，就会实时进行打包编译，自动刷新浏览器，渲染最新效果」=> vscode 中 LiveServer 插件也是同理；

4） 启动的 web 服务器可以作为数据跨域请求的代理服务器，即可以实现 Proxy 跨域代理「当客户端和服务端的协议、域名、端口都不一致时，浏览器会拦截服务端响应的请求。如需获取响应则需要进行跨域请求」。

​	运行方法：

```bash
npx webpack serve
# 或通过配置 package.json 的调试命令来运行 webpack 命令
yarn start # "start": "webpack serve" 不能直接运行 webpack serve
```

​	配置方法：

```js
module.exports = {
  devServer: {
    host: '127.0.0.1', // 域名
    port: 3000, // 端口
    open: true, // 自动打开浏览器
    hot: true, // 热更新
    compress: true, // 开启服务端的GZIP压缩
    proxy: {
      // "/xxx" 属性名代表所有包含该"/xxx"前缀的请求，都将通过此"/api"代理配置访问服务器
      '/api': {
        target: 'http://127.0.0.1:5000', // 真正请求的服务器地址
        pathRewrite: { '^/jian': '' }, // 将真正请求时的前缀替换为空
        changeOrigin: true, // 修改请求头中的origin源信息
        ws: true // 支持websocket通信机制
      },
      hello: {
        target: 'http://127.0.0.1:6500' // 真正请求的服务器地址
      }
    }
  }
}
```

> 代理请求：
>
> 由于代理服务器和前端项目都是同一个服务启动运行的，所以代理服务器和客户端的协议、域名、端口都一致，不会被浏览器的同源策略限制。而服务器与服务器之间通信，不通过浏览器进行也不会收到同源策略限制。
>
> 因此浏览器可以通过将请求发送给代理服务器，让代理服务器作为中间人和真实服务器通信进行请求的转发和响应。
>
> 举例：
>
> 假设前端向服务器发送三个 请求，请求路径为： '/api/getName'，'/api/deleteInfo' 和 '/hello/world' 。
>
> 代理服务器发送的请求地址为：'http://127.0.0.1:3000/api/getName'，'http://127.0.0.1:3000/api/deleteInfo'，'http://127.0.0.1:3000/hello/world'
>
> 则通过代理配置，真实请求地址如下：'http://127.0.0.1:5000/getName'，'http://127.0.0.1:5000/deleteInfo' 和 'http://127.0.0.1:6500/hello/world'
>
> 由于 '/api' 的跨域配置设置了路径重写，所以路径会有变化
