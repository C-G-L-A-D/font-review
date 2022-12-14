import { generate } from './lib/generator.js'
import { createRandomPicker } from './lib/random.js'
import { loadCorpus, saveCorpus } from './lib/corpus.js'
import { options } from './lib/cmd.js'
import { interact } from './lib/interact.js'

// 获取数据
const corpus = loadCorpus('corpus/data.json')

// 从输入中读取标题或随机生成标题
let title = options.title || createRandomPicker(corpus.title)()

// interact返回的是promise对象
async function cmdInput() {
    if(Object.keys(options).length <= 0) {
        console.log('命令行没有传入参数');
        // 获取输入，或使用默认值
        const answers = await interact([
            { text: '请输入文章主题', value: title },
            { text: '请输入最小字数', value: 6000 },
            { text: '请输入最大字数', value: 10000 },
        ]);
        title = answers[0];
        options.min = answers[1];
        options.max = answers[2];
        console.log(title)
    }
    const article = generate(title, {corpus, ...options})
    const output = saveCorpus(title, article)
    console.log(`生成成功！文章保存于：${output}`)
};

// cmdInput();


