// const ziyue = require('./ziyue.js')
const { say, b, getA } = require('./ziyue.js')

// console.log(ziyue('这是CommonJS模块化。'))
console.log('b = ', b)
console.log(getA, '调用c方法得到 a = ', getA())
console.log(say, '孔子说：', say('这是CommonJS模块化，导出真的对象'))
console.log(say, b, getA)