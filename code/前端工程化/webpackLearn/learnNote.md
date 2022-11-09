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