import { generate } from './lib/generator.js'
import { createRandomPicker } from './lib/random.js'
import { loadCorpus, saveCorpus } from './lib/corpus'
import { options } from './lib/cmd'

// 获取数据
const corpus = loadCorpus('corpus/data.json')

// 测试生成文章，随机生成标题
// const titlePicker = createRandomPicker(corpus.title)
// const title = titlePicker()
// const article = generate(title, {corpus})
// const output = saveCorpus(title, article)
// console.log(`生成成功！文章保存于：${output}`)




// 测试，自动生成标题和文章
const title = options.title || createRandomPicker(corpus.title)()
const article = generate(title, {corpus, ...options})
const output = saveToFile(title, article)
console.log(`生成成功！文章保存于：${output}`)

