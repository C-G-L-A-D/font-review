/* 
    ESModules 向下兼容 CommonJS，
    也就是ES Modules 可以引入 CommonJs 规范导出的对象，
    但是导出对象是默认引入
*/
import commonJs from '../CommonJS/ziyue.js'
console.log('b = ', commonJs.b)
console.log(commonJs.getA, '调用c方法得到 a = ', commonJs.getA())
console.log(commonJs.say, '孔子说：', commonJs.say('ESModules 兼容 CommonJs,默认引入。'))
console.log(commonJs.say, commonJs.b, commonJs.getA)