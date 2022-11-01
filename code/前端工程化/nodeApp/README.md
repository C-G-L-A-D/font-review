# 学习 NodeJS 开发小应用：随机文章生成器
## 目的
通过这个小应用学习如何使用 NodeJS 内置模块 fs、process、readline 和如何创建自己的模块，并安装引入第三方库

## 功能：
* 接收用户输入
* 允许设置字数范围
* 随机生成模板

.
├── corpus 
│   └── data.json（语料库文件）
├── practise （练习模块）
│   ├── learnFS.js （练习FS模块）
│   ├── learnInput.js （练习输入输出）
│   └── learnPath.js （练习Path模块）
├── index.js （项目主文件）
├── lib （项目依赖）
│   ├── generator.js （生成文章模块）
│   ├── corpus.js （获取语料库数据、保存文章模块）
│   ├── cmd.js （检查命令行参数输入、生成命令行输入帮助信息）
│   ├── generator.js （生成文章模块）
│   └── random.js （随机模块）
├── package.json （配置文件）
└── output （输出文件）

command-line-args包可以帮助检测命令行输入