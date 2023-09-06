module.exports = {
    // 继承第三方规则
    extends: [
        // 继承 Eslint 官方规则
        "eslint:recommended"
    ],
    // 解析选项配置
    parserOptions: {
        // ES6 语法版本
        ecmaVersion: 6,
        // ES 模块化
        sourceType: "module",
        ecmaFeatures: {
            // 开启 jsx 语法
            jsx: true
        }
    },
    // 具体检查规则，可覆盖继承规则
    /* 
        off | 0 - 关闭规则
        warn | 1 - 开启规则，使用警告级别的错误，不会导致退出
        error | 2 - 开启规则，使用错误级别的错误，会导致退出
    */
    rules: {
        // 禁止使用分号
        semi: "warn",
        // 要求数组方法的回调中有返回
        "array-callback-return": "warn",
        // 要求 switch 语句中有 default 分支
        "default-case": [
            "warn",
            {
                // 允许在最后注释 no default 接触警告
                commentPattern: "^no default$"
            }
        ],
        // 要求使用 全等 或 不全等
        eqeqeq: [
            "warn",
            // 少数情况下不会警告
            "smart"
        ]
    },
    // 启用全局变量
    env: {
        node: true,
        browser: true
    }
};