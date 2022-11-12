// 不会将 add 函数进行打包
import { count } from './js/count.js'
import sum from './js/sum.js'

import './font/iconfont.css'
import './css/index.css'
import './css/index.less'
import './css/index.scss'
import './css/index.sass'

if(module.hot) {
    // 判断是否支持热模块替换，支持就将 count 文件进行热模块替换
    module.hot.accept("./js/count.js");
}

console.log(count(23, 23))
console.log(sum(1, 31, 35, 21, 456))

