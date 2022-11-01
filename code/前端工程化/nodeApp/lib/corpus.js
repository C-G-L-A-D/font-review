import { fileURLToPath } from 'url';
import { resolve, dirname } from 'path';
import { readFileSync, existsSync, writeFileSync, mkdirSync } from 'fs';
import moment from 'moment';

// 获取当前文件所在目录
const __dirname = dirname(fileURLToPath(import.meta.url))

// 加载获取语料库数据
export function loadCorpus (src) {
    // ..返回根目录
    const path = resolve(__dirname, '..', 'src')

    // 读取文件数据
    const data = readFileSync(path, { encoding: 'utf-8' })

    return JSON.parse(data)
}

// 保存生成的文章
export function saveCorpus(title, article) {
    const outputDir = resolve(dirname(curPath), 'output');
    const time = moment().format('YYYY-MM-DD');
    const outputFile = resolve(outputDir, `${title}${time}.txt`)

    // 检查输出文件夹是否存在
    if(!existsSync(outputDir)) {
        mkdirSync(outputDir)
    }

    const text = `${title}\n\t   ${article.join('\n\t')}`;
    writeFileSync(outputFile, text)

    return outputFile
} 