import { generate } from '../lib/generator.js'
import { createRandomPicker } from '../lib/random.js'
import { loadCorpus, saveCorpus } from '../lib/corpus.js'

// const corpus = loadCorpus('corpus/data.json')

// // 测试生成文章，随机生成标题
// const titlePicker = createRandomPicker(corpus.title)
// const title = titlePicker()
// const article = generate(title, {corpus})
// const output = saveCorpus(title, article)
const output = 'sdg'
console.log(`生成成功！文章保存于：${output}`)
