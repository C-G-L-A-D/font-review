import { randomInt, createRandomPicker } from './random.js'
// 生成文章
export function generate(title, {corpus, min=6000, max=10000}) {

  // 随机生成文章长度
  const articalLength = randomInt(min, max)

  // 获得对应组成部分的集合
  const { famous, bosh_before, bosh, said, conclude } = corpus
  // 批量生成随机生成器
  const [ 
    famousPicker,
    boshBeforePicker,
    boshPicker,
    saidPicker,
    concludePicker
  ] = [famous, bosh_before, bosh, said, conclude].map((item) => createRandomPicker(item))

  const artical = [] // 记录生成的段落
  let totalLength = 0 // 记录生成字数

  while(totalLength < articalLength) {
    let section = ''; //添加段落
    const sectionLenght = randomInt(200, 500)

    // 段落需要满足以。或？结尾，并且字数足够
    while(section.length < sectionLenght || !/[。?]$/.test(section)) {
      const n = randomInt(0, 100)
      if(n < 20) {
        // n < 20 ,生成一条名人名言，从而使文章有20%是名人名言
        section += sentence(famousPicker, {said: saidPicker, conclude: concludePicker})
      } else if(n < 50) {
        // 50%为带有前置从句的废话
        section += sentence(boshBeforePicker, {title}) + sentence(boshPicker, {title})
      } else {
        // 否则，随机生成一条不带前置从句的废话
        section += sentence(boshPicker, {title})
      }
    }

    // 记录生成的段落
    totalLength += section.length
    artical.push(section)
  }
  return artical
}

export function sentence(pick, replacer) {
  let ret = pick(); // 返回一个句子文本
  for(const key in replacer) { // replacer是一个对象，存放替换占位符的规则
    // 如果 replacer[key] 是一个 picker 函数（随机生成函数），那么执行它随机取一条替换占位符，否则将它直接替换占位符
    ret = ret.replace(new RegExp(`{{${key}}}`, 'g'),
      typeof replacer[key] === 'function' ? replacer[key]() : replacer[key]);
  }
  return ret;
}