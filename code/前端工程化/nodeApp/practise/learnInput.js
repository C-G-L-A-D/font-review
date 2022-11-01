// process.argv 命令行输入获取参数
function parseOptions() {
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
