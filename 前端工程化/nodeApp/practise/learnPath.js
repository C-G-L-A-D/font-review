import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

/* 
    因为使用了 ESModules 模块规范，
    所以只能通过获取当前文件URL,
    再通过fileURLToPath()转换成当前文件所在目录；
    如果使用 CommonJS 规范可以通过
    内置变量 __dirname 直接获取当前文件所在目录
*/
const url = import.meta.url
console.log(url)
// 文件在服务器的位置，即文件路径
console.log(fileURLToPath(url));

// 当前文件所处目录的绝对路径
console.log(dirname(fileURLToPath(url)))
/* 
    通过 dirname() 获取当前文件所处目录的绝对路径
    通过 resolve() 拼接当前文件的绝对路径 和 待查找文件的相对路径
    从而得到带查找文件的绝对路径
*/
const path = resolve(dirname(fileURLToPath(url)), '../corpus/data.json')
console.log(path);