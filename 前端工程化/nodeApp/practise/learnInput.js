// 1. process.argv 命令行输入获取参数
/* function parseOptions() {
    const argv = process.argv
    const options = {}
    // 参数前两个为路径和文件名
    for(let i = 2; i < argv.length; i++) {
        // 参数名
        let cmd = argv[i - 1]
        // 参数值
        let value = argv[i]
        if(cmd === '--title') {
            options.title = value
        } else if (cmd === '--min') {
            options.min = value
        } else if(cmd === '--max') {
            options.max = value
        }
    }
    return options
}
const options = parseOptions()
console.log(options)
 */

// 2. process.stdin 监听用户输入
console.log('请输入一个要求和的整数，以0结束输入');

process.stdin.setEncoding('utf-8');

let sum = 0;
process.stdin.on('readable', () => {
    // 获取当前输入的字符，包含回车
    const chunk = process.stdin.read();
    // 获取除回车外的字符并转换为数值类型
    const n = Number(chunk.slice(0, -1));
    sum += n;

    // 输入0后，程序终止；或者输入为null程序终止
    if(n === 0) {
        // 触发end事件，
        process.stdin.emit('end');
    } else {
        // 再次调用返回null可保持readable状态中，持续循环，并继续监听
        process.stdin.read();
    }
})

// 监听end事件，被触发后输出求和结果
process.stdin.on('end', () => {
    console.log(`求和结果是： ${sum}`)
})