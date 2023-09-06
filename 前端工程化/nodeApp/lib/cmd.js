import commandLineUsage from 'command-line-usage';
import commandLineArgs from 'command-line-args';

// 定义-help帮助信息
const sections = [
    {
        header: '狗屁不通文章生成器',
        content: '生成随机的文章段落用于测试'
    },
    {
        header: 'Options',
        optionList: [
            {
                name: 'title',
                typeLabel: '{underline string}',
                description: '文章的主题。'
            },
            {
                name: 'min',
                typeLabel: '{underline number}',
                description: '文章最小字数。'
            },
            {
                name: 'max',
                typeLabel: '{underline number}',
                description: '文章最大字数。'
            }
        ]
    }
]

// 生成帮助信息
export const usage = commandLineUsage(sections)

// 检测传入参数格式
const optionsDefinitions = [
    { name: 'help' },
    {name: 'title', type: String},
    {name: 'max', type: Number},
    {name: 'min', type: Number}
]

const options = commandLineArgs(optionsDefinitions)

if('help' in options) {
    console.log(usage)
    process.exit()
}

export { options }