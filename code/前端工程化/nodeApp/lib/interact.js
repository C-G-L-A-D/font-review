// 用户交互模块

export function interact(questions) {
    process.stdin.setEncoding('utf-8');

    return new Promise((resolve) => {
        const answers = [];
        let i = 0;
        let { text, value } = questions[i++];
        console.log(`${text}(${value})`)

        // 监听readable事件,持续读取输入
        process.stdin.on('readable', () => {
            // 读取输入
            const chunk = process.stdin.read().slice(0, -2)
            answers.push(chunk || value)

            const nextQusetion = questions[i++];
            if(nextQusetion) {
                process.stdin.read();
                text = nextQusetion.text;
                value = nextQusetion.value;
                console.log(`${text}(${value})`)
            } else {
                resolve(answers)
            }
        })
    })
}