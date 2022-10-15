import { b as modelue , getA } from './ziyue.mjs'
import say from './ziyue.mjs'
import * as esMoude from './ziyue.mjs'

console.log('b = ', modelue)
console.log(getA, 'a = ', getA())
console.log(say, '孔子说：', say('这是esmodules的默认导出，只有一个。'))
console.log(esMoude.b, esMoude.getA, esMoude.default)
