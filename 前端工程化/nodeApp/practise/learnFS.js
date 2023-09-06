import { readFile, readFileSync } from 'fs'

/* 
readFile 是异步读取文件，适宜在读取文件较大，且不希望阻塞后续操作时使用
readFile('../corpus/data.json', (err, data) => {
    // 返回成功 err为null
    if(!err) {
        // data为 Buffer 对象，表示文件的二进制数据内容
        // console.log(data)
        // 可调用data的toString方法，传入utf-8，获取文本内容
        console.log(data.toString('utf-8'))
    } else {
        console.log(err)
    }
})
*/
// 多传入一个参数可以指定返回文本编码格式
readFile(
    '../corpus/data.json',
    { encoding:'utf-8' },
    (err, data) => {
        if(!err) {
            // console.log(data);
            console.log('异步读取文件')
        } else {
            console.log(err)
        }
    }
)

// readFileSync 同步读取文件，因此不需要callback函数，直接获取返回值即可
const data = readFileSync('../corpus/data.json', { encoding: 'utf-8' })
console.log(data, '同步读取文件');